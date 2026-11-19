import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientApiKey = (body?.apiKey as string | undefined)?.trim() || "";
    const model = (body?.model as string | undefined)?.trim() || "gemini-2.5-flash";
    const apiKey = clientApiKey || process.env.GEMINI_API_KEY || "";

    if (!apiKey) {
      return NextResponse.json(
        { ok: false, error: "Informe uma chave de API para testar a conexão." },
        { status: 400 }
      );
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
      model
    )}?key=${encodeURIComponent(apiKey)}`;

    const res = await fetch(endpoint, { method: "GET" });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return NextResponse.json(
        {
          ok: false,
          error:
            errData?.error?.message ||
            `Falha na validação da chave (HTTP ${res.status}).`,
        },
        { status: res.status }
      );
    }

    const modelInfo = await res.json();
    return NextResponse.json({
      ok: true,
      modelName: modelInfo?.displayName || model,
      message: "Conexão validada com sucesso! A API está pronta para analisar redações.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? `Erro ao testar conexão: ${error.message}`
            : "Erro inesperado ao testar conexão.",
      },
      { status: 500 }
    );
  }
}
