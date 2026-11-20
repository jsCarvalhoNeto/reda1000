import { NextRequest, NextResponse } from "next/server";
import {
  createServerSupabaseClient,
  isSupabaseServerConfigured,
} from "@/lib/supabase/server";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json(
      { error: "Supabase não configurado no servidor." },
      { status: 503 }
    );
  }

  try {
    const { id } = await context.params;
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Você precisa estar logado para abrir este relatório." },
        { status: 401 }
      );
    }

    const { data, error } = await supabase
      .from("relatorios_redacao")
      .select("id, titulo, tema, nota_final, resultado, criado_em")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Relatório não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ relatorio: data });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Erro ao carregar relatório.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isSupabaseServerConfigured()) {
    return NextResponse.json(
      { error: "Supabase não configurado no servidor." },
      { status: 503 }
    );
  }

  try {
    const { id } = await context.params;
    const supabase = await createServerSupabaseClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Você precisa estar logado para excluir relatórios." },
        { status: 401 }
      );
    }

    const { error } = await supabase
      .from("relatorios_redacao")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Erro ao excluir relatório.",
      },
      { status: 500 }
    );
  }
}
