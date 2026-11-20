"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpenCheck,
  Loader2,
  LogIn,
  UserPlus,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
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
        "Supabase não configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY nas variáveis de ambiente."
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
        router.push("/");
        router.refresh();
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
          router.push("/");
          router.refresh();
        } else {
          setMessage(
            "Conta criada! Verifique seu e-mail para confirmar o cadastro antes de entrar."
          );
        }
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro inesperado ao autenticar."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f6f2] px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-2xs transition hover:bg-stone-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao App
          </Link>
        </div>

        <div className="rounded-3xl border border-stone-200 bg-white p-7 shadow-sm">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-900/10 px-3 py-1 text-xs font-semibold text-emerald-900">
            <BookOpenCheck className="h-3.5 w-3.5" />
            Redação 1000 • Conta do Aluno
          </div>

          <h1 className="mt-3 text-2xl font-bold text-stone-900">
            {mode === "login" ? "Entrar na sua conta" : "Criar nova conta"}
          </h1>
          <p className="mt-1 text-xs text-stone-600">
            Salve seus relatórios de correção na nuvem e baixe em PDF quando quiser.
          </p>

          {/* Seletor Entrar / Cadastrar */}
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
              Entrar
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
                As variáveis <code>NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
                <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> ainda não foram configuradas no ambiente.
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
                placeholder="seuemail@exemplo.com"
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-emerald-800 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : mode === "login" ? (
                <LogIn className="h-4 w-4" />
              ) : (
                <UserPlus className="h-4 w-4" />
              )}
              {mode === "login" ? "Entrar" : "Criar Conta"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
