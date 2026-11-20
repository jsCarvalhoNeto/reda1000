"use client";

import React, { useState } from "react";
import {
  BookOpenCheck,
  Camera,
  FileText,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Award,
  Loader2,
  LogIn,
  UserPlus,
  AlertCircle,
  SpellCheck2,
  Lightbulb,
  FolderHeart,
} from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

interface LandingPageProps {
  onAuthSuccess: () => void;
}

export function LandingPage({ onAuthSuccess }: LandingPageProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const supabaseReady = isSupabaseConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabaseReady) {
      setError(
        "Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const supabase = createClient();

      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) {
          setError(signInError.message);
          return;
        }
        onAuthSuccess();
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (signUpError) {
          setError(signUpError.message);
          return;
        }
        if (data.session) {
          onAuthSuccess();
        } else {
          setMessage(
            "Conta criada! Verifique seu e-mail para confirmar o cadastro e depois faça login."
          );
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado ao autenticar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-stone-900">
      {/* Navbar */}
      <header className="border-b border-stone-200/80 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-900 text-white">
              <BookOpenCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-stone-900">
                Redação 1000
              </span>
              <span className="ml-2 hidden rounded-full bg-emerald-900/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-900 sm:inline-block">
                Padrão ENEM / INEP
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-xs font-semibold text-stone-600 md:flex">
            <a href="#como-funciona" className="hover:text-emerald-900">
              Como funciona
            </a>
            <a href="#recursos" className="hover:text-emerald-900">
              Recursos
            </a>
            <a href="#acesso" className="rounded-xl bg-emerald-900 px-4 py-2 text-white hover:bg-emerald-800">
              Acessar Plataforma
            </a>
          </nav>
        </div>
      </header>

      {/* Hero + Card de Login Obrigatório */}
      <section id="acesso" className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Coluna Esquerda: Proposta de Valor */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-emerald-900/5 px-3.5 py-1 text-xs font-semibold text-emerald-900">
              <Sparkles className="h-3.5 w-3.5" />
              Correção Pedagógica Inteligente com Visão Multimodal
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-5xl sm:leading-[1.12]">
              Sua redação do ENEM auditada com rigor de{" "}
              <span className="text-emerald-900">banca oficial.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-600">
              Envie a foto da folha manuscrita, um arquivo PDF ou cole seu texto. Receba
              análise linha a linha, nota nas 5 competências, sugestões de repertório e salve
              seus laudos em PDF na sua conta para baixar quando quiser.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-2xs">
                <Camera className="h-5 w-5 text-emerald-800" />
                <div className="mt-2 text-xs font-bold text-stone-900">Foto ou PDF</div>
                <div className="mt-0.5 text-[11px] text-stone-500">
                  Leitura direta de manuscritos e documentos.
                </div>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-2xs">
                <Award className="h-5 w-5 text-emerald-800" />
                <div className="mt-2 text-xs font-bold text-stone-900">Notas C1 a C5</div>
                <div className="mt-0.5 text-[11px] text-stone-500">
                  Critérios oficiais do INEP de 0 a 1000 pontos.
                </div>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-2xs">
                <FolderHeart className="h-5 w-5 text-emerald-800" />
                <div className="mt-2 text-xs font-bold text-stone-900">Laudos na Nuvem</div>
                <div className="mt-0.5 text-[11px] text-stone-500">
                  Salve na conta e baixe em PDF a qualquer hora.
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Área de Login / Cadastro */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-md sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">
                    {mode === "login" ? "Entrar no Redação 1000" : "Criar Conta Gratuita"}
                  </h2>
                  <p className="mt-0.5 text-xs text-stone-500">
                    Faça login para enviar redações e salvar seus relatórios.
                  </p>
                </div>
                <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-800" />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-1.5 rounded-xl border border-stone-200 bg-stone-100 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError(null);
                    setMessage(null);
                  }}
                  className={`rounded-lg py-2 text-xs font-semibold transition ${
                    mode === "login"
                      ? "bg-white text-emerald-900 shadow-2xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Já tenho conta
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError(null);
                    setMessage(null);
                  }}
                  className={`rounded-lg py-2 text-xs font-semibold transition ${
                    mode === "signup"
                      ? "bg-white text-emerald-900 shadow-2xs"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  Criar Conta
                </button>
              </div>

              {!supabaseReady && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Configure <code>NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
                    <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> para habilitar a autenticação.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-600">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aluno@exemplo.com"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 outline-none transition focus:border-emerald-700 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-600">
                    Senha
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 outline-none transition focus:border-emerald-700 focus:bg-white"
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-800">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {message && (
                  <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{message}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : mode === "login" ? (
                    <LogIn className="h-4 w-4" />
                  ) : (
                    <UserPlus className="h-4 w-4" />
                  )}
                  {mode === "login" ? "Entrar e Submeter Redação" : "Criar Conta e Acessar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="border-t border-stone-200 bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-stone-900">Como funciona em 3 passos</h2>
            <p className="mt-1 text-sm text-stone-600">
              Do envio da redação ao laudo pedagógico completo em segundos.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-900 text-xs font-bold text-white">
                1
              </div>
              <h3 className="mt-4 text-base font-bold text-stone-900">
                Envie sua redação
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
                Após fazer login, envie uma foto da folha manuscrita, um arquivo PDF ou cole o
                texto digitado diretamente no editor.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-900 text-xs font-bold text-white">
                2
              </div>
              <h3 className="mt-4 text-base font-bold text-stone-900">
                Auditoria Padrão INEP
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
                O motor de IA analisa Introdução, D1, D2 e Conclusão, verifica os 5 elementos da
                Proposta de Intervenção e aponta desvios gramaticais.
              </p>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-900 text-xs font-bold text-white">
                3
              </div>
              <h3 className="mt-4 text-base font-bold text-stone-900">
                Salve e Baixe em PDF
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
                Explore o Raio-X interativo no texto, salve a correção na sua conta e baixe o
                relatório oficial em PDF no momento que preferir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recursos Detalhados */}
      <section id="recursos" className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-2xs">
            <SpellCheck2 className="h-6 w-6 text-red-700" />
            <h3 className="mt-3 text-base font-bold text-stone-900">
              Gramática Linha a Linha (C1)
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
              Localização exata por parágrafo e linha, explicação pedagógica do desvio e reescrita
              pronta para elevar sua nota na Competência 1.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-2xs">
            <Lightbulb className="h-6 w-6 text-violet-700" />
            <h3 className="mt-3 text-base font-bold text-stone-900">
              Repertórios Nota 1000 (C2/C3)
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
              Avalia se sua citação está produtiva e sugere repertórios ousados de filósofos,
              sociólogos e obras para fortalecer seus argumentos.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-2xs">
            <FileText className="h-6 w-6 text-emerald-800" />
            <h3 className="mt-3 text-base font-bold text-stone-900">
              Laudo Editorial em PDF
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-stone-600">
              Exporte seus relatórios com visual editorial limpo (Esmeralda ou Clássico) direto da
              análise ou da sua área de Meus Relatórios.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white py-6 text-center text-xs text-stone-500">
        Redação 1000 • Plataforma de Análise Crítica e Avaliação Padrão ENEM
      </footer>
    </div>
  );
}
