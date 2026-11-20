import { NextRequest, NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";
import { EssayAnalysisResult } from "@/types/essay";

export async function GET() {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json(
      { error: "Supabase não configurado no servidor." },
      { status: 503 }
    );
  }

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Você precisa estar logado para acessar seus relatórios." },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("relatorios_redacao")
      .select("id, titulo, tema, nota_final, criado_em")
      .eq("user_id", user.id)
      .order("criado_em", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ relatorios: data || [] });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Erro ao listar relatórios.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json(
      { error: "Supabase não configurado no servidor." },
      { status: 503 }
    );
  }

  try {
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Faça login para salvar o relatório na sua conta." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const result = body?.result as EssayAnalysisResult | undefined;

    if (!result || !result.temaIdentificado || typeof result.notaFinal !== "number") {
      return NextResponse.json(
        { error: "Dados do relatório inválidos para salvamento." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("relatorios_redacao")
      .insert({
        user_id: user.id,
        titulo: result.tituloDocumento || `Redação — ${result.temaIdentificado}`,
        tema: result.temaIdentificado,
        nota_final: result.notaFinal,
        resultado: result,
      })
      .select("id, titulo, tema, nota_final, criado_em")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ relatorio: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Erro ao salvar relatório.",
      },
      { status: 500 }
    );
  }
}
