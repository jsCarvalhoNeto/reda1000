"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Award,
  Calendar,
  ExternalLink,
  FileText,
  Loader2,
  Printer,
  Trash2,
  AlertCircle,
} from "lucide-react";

interface SavedReportSummary {
  id: string;
  titulo: string;
  tema: string;
  nota_final: number;
  criado_em: string;
}

export default function RelatoriosPage() {
  const router = useRouter();
  const [reports, setReports] = useState<SavedReportSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/relatorios");
      const data = await res.json();
      if (res.status === 401) {
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setError(data.error || "Não foi possível carregar os relatórios.");
        return;
      }
      setReports(data.relatorios || []);
    } catch {
      setError("Erro de conexão ao buscar seus relatórios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/relatorios/${id}`, { method: "DELETE" });
      if (res.ok) {
        setReports((prev) => prev.filter((item) => item.id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 shadow-2xs transition hover:bg-stone-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao App
            </Link>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                Histórico na Nuvem
              </div>
              <h1 className="text-2xl font-bold text-stone-900">Meus Relatórios</h1>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center rounded-2xl border border-stone-200 bg-white py-16 text-sm text-stone-600">
            <Loader2 className="mr-2 h-5 w-5 animate-spin text-emerald-800" />
            Carregando relatórios salvos...
          </div>
        ) : error ? (
          <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : reports.length === 0 ? (
          <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center shadow-xs">
            <FileText className="mx-auto h-10 w-10 text-stone-400" />
            <h2 className="mt-3 text-base font-bold text-stone-900">
              Nenhum relatório salvo ainda
            </h2>
            <p className="mt-1 text-xs text-stone-600">
              Faça a análise de uma redação e clique em &ldquo;Salvar na Minha Conta&rdquo; para
              acessar e baixar o laudo quando quiser.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-800"
            >
              Analisar Primeira Redação
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs sm:flex-row sm:items-center"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-900 px-2.5 py-0.5 text-xs font-bold text-white">
                      <Award className="h-3.5 w-3.5 text-emerald-300" />
                      {rep.nota_final} / 1000
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-stone-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(rep.criado_em).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-stone-900">{rep.tema}</h2>
                  <p className="text-xs text-stone-500">{rep.titulo}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/?relatorio=${rep.id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-800 transition hover:bg-stone-50"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-emerald-800" />
                    Abrir Análise
                  </Link>
                  <Link
                    href={`/?relatorio=${rep.id}&print=1`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Baixar PDF
                  </Link>
                  <button
                    type="button"
                    disabled={deletingId === rep.id}
                    onClick={() => handleDelete(rep.id)}
                    className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-800 transition hover:bg-red-100 disabled:opacity-50"
                    title="Excluir relatório"
                  >
                    {deletingId === rep.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
