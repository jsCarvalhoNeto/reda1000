import { NextRequest, NextResponse } from "next/server";
import { ENEM_RESPONSE_SCHEMA, ENEM_SYSTEM_PROMPT } from "@/lib/enem-prompt";
import { EssayAnalysisResult } from "@/types/essay";

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const texto = (formData.get("texto") as string | null)?.trim() || "";
    const tema = (formData.get("tema") as string | null)?.trim() || "";
    const clientApiKey = (formData.get("apiKey") as string | null)?.trim() || "";
    const model =
      (formData.get("model") as string | null)?.trim() ||
      process.env.GEMINI_MODEL ||
      "gemini-2.5-flash";

    const apiKey = clientApiKey || process.env.GEMINI_API_KEY || "";

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Chave da API Gemini não configurada. Informe sua chave nas Configurações de API ou defina GEMINI_API_KEY no arquivo .env.local.",
        },
        { status: 400 }
      );
    }

    const hasFile = file instanceof File && file.size > 0;
    const hasText = texto.length > 0;

    if (!hasFile && !hasText) {
      return NextResponse.json(
        { error: "Envie um arquivo (imagem ou PDF) ou digite/cole o texto da redação." },
        { status: 400 }
      );
    }

    const parts: Array<{ inline_data: { mime_type: string; data: string } } | { text: string }> =
      [];

    if (hasFile) {
      const mimeType = file.type === "image/jpg" ? "image/jpeg" : file.type;
      if (!ALLOWED_MIME_TYPES.has(file.type)) {
        return NextResponse.json(
          {
            error: `Formato não suportado (${file.type || "desconhecido"}). Envie um arquivo PDF, JPG, PNG ou WebP.`,
          },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: "O arquivo excede o limite de 20 MB." },
          { status: 400 }
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString("base64");

      const userInstruction = tema
        ? `Analise a redação contida no arquivo anexo seguindo rigorosamente o padrão ENEM/INEP. O tema informado pelo aluno é: "${tema}".`
        : "Analise a redação contida no arquivo anexo seguindo rigorosamente o padrão ENEM/INEP. Identifique o tema automaticamente a partir do texto.";

      parts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data,
        },
      });
      parts.push({ text: userInstruction });
    } else {
      if (texto.length < 50) {
        return NextResponse.json(
          { error: "O texto informado é muito curto para uma análise de redação ENEM." },
          { status: 400 }
        );
      }

      const temaLine = tema
        ? `O tema informado pelo aluno é: "${tema}".`
        : "Identifique o tema automaticamente a partir do texto.";

      parts.push({
        text: `Analise a redação abaixo seguindo rigorosamente o padrão ENEM/INEP. ${temaLine}\n\n--- INÍCIO DA REDAÇÃO ---\n${texto}\n--- FIM DA REDAÇÃO ---`,
      });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model
    )}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const geminiResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: ENEM_SYSTEM_PROMPT }],
        },
        contents: [
          {
            role: "user",
            parts,
          },
        ],
        generationConfig: {
          temperature: 0.2,
          response_mime_type: "application/json",
          response_schema: ENEM_RESPONSE_SCHEMA,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorPayload = await geminiResponse.json().catch(() => ({}));
      const message =
        errorPayload?.error?.message ||
        `Erro na API Gemini (HTTP ${geminiResponse.status}).`;
      return NextResponse.json({ error: message }, { status: geminiResponse.status });
    }

    const data = await geminiResponse.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json(
        {
          error:
            "A API não retornou conteúdo estruturado. Verifique se o arquivo está legível.",
        },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(rawText) as EssayAnalysisResult;

    // Garante consistência matemática da nota final somando C1..C5
    if (Array.isArray(parsed.competencias) && parsed.competencias.length === 5) {
      parsed.notaFinal = parsed.competencias.reduce(
        (acc, comp) => acc + (Number(comp.nota) || 0),
        0
      );
    }

    return NextResponse.json({ result: parsed });
  } catch (error) {
    console.error("Erro ao analisar redação:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `Falha interna ao processar a análise: ${error.message}`
            : "Falha interna inesperada ao processar a análise.",
      },
      { status: 500 }
    );
  }
}
