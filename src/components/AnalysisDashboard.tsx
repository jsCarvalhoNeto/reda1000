"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EssayAnalysisResult, InterventionStatus } from "@/types/essay";
import { EssayHighlighter } from "./EssayHighlighter";
import { PrintableReport } from "./PrintableReport";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Printer,
  BookOpen,
  Layers,
  SpellCheck2,
  TrendingUp,
  BookmarkPlus,
  Loader2,
  FolderHeart,
} from "lucide-react";

interface AnalysisDashboardProps {
  data: EssayAnalysisResult;
  userEmail: string | null;
  alreadySaved?: boolean;
  onReset: () => void;
}

type TabKey = "competencias" | "estrutura" | "gramatica";

function StatusBadge({ status }: { status: InterventionStatus }) {
  if (status === "PRESENTE") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
        <CheckCircle2 className="h-3.5 w-3.5" /> Presente
      </span>
    );
  }
  if (status === "PARCIAL") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
        <AlertTriangle className="h-3.5 w-3.5" /> Parcial
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">
      <XCircle className="h-3.5 w-3.5" /> Ausente
    </span>
  );
}

export function AnalysisDashboard({
  data,
  userEmail,
  alreadySaved = false,
  onReset,
}: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("competencias");
  const [pdfTheme, setPdfTheme] = useState<"emerald" | "sepia">("emerald");
  const [saving, setSaving] = useState(false);
  const [savedOk, setSavedOk] = useState(alreadySaved);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSaveReport = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const res = await fetch("/api/relatorios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result: data }),
      });
      const payload = await res.json();
      if (!res.ok) {
        setSaveError(payload.error || "Não foi possível salvar o relatório.");
        return;
      }
      setSavedOk(true);
    } catch {
      setSaveError("Erro de rede ao salvar o relatório.");
    } finally {
      setSaving(false);
    }
  };

  const interventionItems = [
    { key: "Agente", data: data.conclusao.elementosIntervencao.agente },
    { key: "Ação", data: data.conclusao.elementosIntervencao.acao },
    { key: "Meio / Modo", data: data.conclusao.elementosIntervencao.meioModo },
    { key: "Efeito / Finalidade", data: data.conclusao.elementosIntervencao.efeito },
    { key: "Detalhamento", data: data.conclusao.elementosIntervencao.detalhamento },
  ];

  const presentCount = interventionItems.filter((i) => i.data.status === "PRESENTE").length;

  return (
    <>
      <div className="no-print mx-auto max-w-7xl px-4 py-6">
        {/* Top Bar */}
        {saveError && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-medium text-red-800">
            {saveError}
          </div>
        )}
        <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-xs lg:flex-row lg:items-center">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={onReset}
              className="mt-0.5 inline-flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-100"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Nova Redação
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-emerald-900/10 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                  Padrão ENEM / INEP
                </span>
                {typeof data.deltaEvolucao === "number" && data.deltaEvolucao > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                    <TrendingUp className="h-3 w-3" /> +{data.deltaEvolucao} pontos
                  </span>
                )}
              </div>
              <h1 className="mt-1 text-lg font-bold text-stone-900 sm:text-xl">
                {data.temaIdentificado}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Seletor de layout do PDF */}
            <div className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-stone-50 p-1 text-xs">
              <button
                type="button"
                onClick={() => setPdfTheme("emerald")}
                className={`rounded-lg px-2.5 py-1.5 font-medium transition ${
                  pdfTheme === "emerald"
                    ? "bg-emerald-900 text-white shadow-2xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                PDF Esmeralda
              </button>
              <button
                type="button"
                onClick={() => setPdfTheme("sepia")}
                className={`rounded-lg px-2.5 py-1.5 font-medium transition ${
                  pdfTheme === "sepia"
                    ? "bg-stone-800 text-white shadow-2xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                PDF Clássico
              </button>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-800 shadow-2xs transition hover:bg-stone-50"
            >
              <Printer className="h-4 w-4 text-emerald-800" />
              Exportar Laudo PDF
            </button>

            {userEmail ? (
              savedOk ? (
                <Link
                  href="/relatorios"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-700/20 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-900 transition hover:bg-emerald-100"
                >
                  <FolderHeart className="h-4 w-4" />
                  Salvo • Ver Meus Relatórios
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveReport}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-800 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <BookmarkPlus className="h-4 w-4" />
                  )}
                  Salvar na Conta
                </button>
              )
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-800/30 bg-emerald-50 px-4 py-2.5 text-xs font-semibold text-emerald-900 transition hover:bg-emerald-100"
              >
                <BookmarkPlus className="h-4 w-4" />
                Entrar para Salvar
              </Link>
            )}

            <div className="flex items-center gap-2.5 rounded-2xl bg-emerald-900 px-5 py-2.5 text-white shadow-sm">
              <Award className="h-6 w-6 text-emerald-300" />
              <div>
                <div className="text-2xl font-extrabold leading-none">{data.notaFinal}</div>
                <div className="text-[10px] font-medium uppercase tracking-wider text-emerald-200">
                  Nota Final
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Split-Screen Principal */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Coluna Esquerda: Folha Interativa */}
          <div className="lg:col-span-5">
            <EssayHighlighter
              transcricao={data.transcricao}
              destaques={data.destaquesInterativos}
            />
          </div>

          {/* Coluna Direita: Abas Analíticas */}
          <div className="flex flex-col rounded-2xl border border-stone-200 bg-white shadow-xs lg:col-span-7">
            {/* Navegação de Abas */}
            <div className="flex border-b border-stone-200 px-4 pt-3">
              <button
                type="button"
                onClick={() => setActiveTab("competencias")}
                className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold transition sm:text-sm ${
                  activeTab === "competencias"
                    ? "border-emerald-800 text-emerald-900"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                <BookOpen className="h-4 w-4" />
                Competências & Resumo
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("estrutura")}
                className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold transition sm:text-sm ${
                  activeTab === "estrutura"
                    ? "border-emerald-800 text-emerald-900"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                <Layers className="h-4 w-4" />
                Estrutura & Repertórios
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("gramatica")}
                className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold transition sm:text-sm ${
                  activeTab === "gramatica"
                    ? "border-emerald-800 text-emerald-900"
                    : "border-transparent text-stone-500 hover:text-stone-800"
                }`}
              >
                <SpellCheck2 className="h-4 w-4" />
                Gramática ({data.desviosGramaticais.length})
              </button>
            </div>

            {/* Conteúdo da Aba */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "competencias" && (
                <div className="space-y-6">
                  {/* Lista de Competências */}
                  <div className="space-y-4">
                    {data.competencias.map((comp) => {
                      const pct = Math.min(100, Math.max(0, (comp.nota / 200) * 100));
                      return (
                        <div
                          key={comp.id}
                          className="rounded-xl border border-stone-200 bg-stone-50/60 p-4"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-bold text-stone-900">
                              {comp.id} — {comp.nome}
                            </span>
                            <span className="rounded-lg bg-emerald-900/10 px-2.5 py-1 text-xs font-extrabold text-emerald-900">
                              {comp.nota} / 200
                            </span>
                          </div>
                          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200">
                            <div
                              className="h-full rounded-full bg-emerald-700 transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <p className="mt-2.5 text-xs leading-relaxed text-stone-600">
                            {comp.justificativa}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Avaliação Global e Conselheiro */}
                  <div className="rounded-2xl border border-emerald-900/15 bg-emerald-50/60 p-5">
                    <h3 className="text-sm font-bold text-emerald-950">
                      Resumo do Conselheiro (Rumo ao 900+ / 1000)
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                      {data.avaliacaoGlobal.resumoConselheiro}
                    </p>
                    <div className="mt-4 grid gap-3 border-t border-emerald-900/10 pt-3 text-xs sm:grid-cols-2">
                      <div>
                        <span className="font-bold text-stone-800">Pontos Fortes: </span>
                        <span className="text-stone-700">{data.avaliacaoGlobal.elogioGeral}</span>
                      </div>
                      <div>
                        <span className="font-bold text-stone-800">O que falta: </span>
                        <span className="text-stone-700">{data.avaliacaoGlobal.oQueFalta}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "estrutura" && (
                <div className="space-y-6">
                  {/* Introdução */}
                  <div className="rounded-xl border border-stone-200 p-5">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-900">
                      1. Introdução
                    </h3>
                    <div className="mt-3 space-y-3 text-xs leading-relaxed text-stone-700">
                      <div>
                        <span className="font-bold text-stone-900">Contexto: </span>
                        {data.introducao.contexto.analise}
                        <div className="mt-1.5 flex items-start gap-2 rounded-lg bg-amber-50 p-2.5 text-amber-950">
                          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-700" />
                          <span>
                            <strong>Sugestão alternativa:</strong>{" "}
                            {data.introducao.contexto.sugestaoAlternativa}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-stone-900">Tese ({data.introducao.tese.linhaRaciocinio}): </span>
                        Eixo 1: {data.introducao.tese.eixo1} • Eixo 2: {data.introducao.tese.eixo2}
                      </div>
                      <div>
                        <span className="font-bold text-stone-900">Melhoria sintática: </span>
                        {data.introducao.progressaoConexao.melhoriaSintatica}
                      </div>
                    </div>
                  </div>

                  {/* Desenvolvimentos */}
                  {data.desenvolvimentos.map((dev) => (
                    <div key={dev.id} className="rounded-xl border border-stone-200 p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-900">
                          {dev.id === "D1" ? "2. Desenvolvimento 1 (D1)" : "3. Desenvolvimento 2 (D2)"}
                        </h3>
                        <span className="rounded-md bg-violet-100 px-2 py-0.5 text-[11px] font-semibold text-violet-900">
                          {dev.repertorio.nome}
                        </span>
                      </div>
                      <div className="mt-3 space-y-2.5 text-xs leading-relaxed text-stone-700">
                        <p>
                          <strong className="text-stone-900">Tópico-frasal: </strong>
                          {dev.topicoFrasal.analise}
                        </p>
                        <p>
                          <strong className="text-stone-900">Análise do Repertório: </strong>
                          {dev.repertorio.analise} {dev.repertorio.melhoria}
                        </p>
                        <div className="flex items-start gap-2 rounded-lg bg-violet-50 p-3 text-violet-950">
                          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-violet-700" />
                          <span>
                            <strong>Sugestão Criativa / Ousada: </strong>
                            {dev.repertorio.sugestaoCriativa}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Conclusão & 5 Elementos */}
                  <div className="rounded-xl border border-stone-200 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-emerald-900">
                        4. Conclusão — 5 Elementos (C5)
                      </h3>
                      <span className="rounded-full bg-emerald-900 px-2.5 py-0.5 text-xs font-bold text-white">
                        {presentCount}/5 completos
                      </span>
                    </div>

                    <div className="mt-4 space-y-2.5">
                      {interventionItems.map((item) => (
                        <div
                          key={item.key}
                          className="flex flex-col justify-between gap-2 rounded-lg border border-stone-200 bg-stone-50/70 p-3 sm:flex-row sm:items-center"
                        >
                          <div className="text-xs">
                            <span className="font-bold text-stone-900">{item.key}: </span>
                            <span className="text-stone-700">{item.data.textoExtraido}</span>
                          </div>
                          <div className="shrink-0">
                            <StatusBadge status={item.data.status} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="mt-3 text-xs text-stone-600">
                      <strong className="text-stone-900">Fechamento: </strong>
                      {data.conclusao.fechamento.analise}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "gramatica" && (
                <div className="space-y-4">
                  {data.avaliacaoGlobal.notaMatrizGramatical && (
                    <div className="rounded-xl border border-stone-200 bg-stone-50 p-3.5 text-xs text-stone-700">
                      <strong className="text-stone-900">Nota da Matriz Gramatical: </strong>
                      {data.avaliacaoGlobal.notaMatrizGramatical}
                    </div>
                  )}

                  {data.desviosGramaticais.length === 0 ? (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center text-sm text-emerald-900">
                      Nenhum desvio gramatical relevante encontrado!
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.desviosGramaticais.map((err) => (
                        <div
                          key={err.id}
                          className="rounded-xl border border-stone-200 bg-white p-4 shadow-2xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="rounded-md bg-red-100 px-2 py-0.5 font-mono text-xs font-bold text-red-900">
                              {err.localizacao}
                            </span>
                            <span className="text-xs font-semibold text-stone-700">
                              {err.tipoErro}
                            </span>
                          </div>
                          <div className="mt-2.5 grid gap-2 text-xs sm:grid-cols-2">
                            <div className="rounded-lg bg-red-50/70 p-2.5">
                              <div className="font-semibold text-red-900">Original</div>
                              <div className="mt-0.5 font-mono text-red-950">
                                &ldquo;{err.trechoOriginal}&rdquo;
                              </div>
                            </div>
                            <div className="rounded-lg bg-emerald-50/70 p-2.5">
                              <div className="font-semibold text-emerald-900">
                                Correção Sugerida
                              </div>
                              <div className="mt-0.5 font-mono text-emerald-950">
                                &ldquo;{err.correcaoSugerida}&rdquo;
                              </div>
                            </div>
                          </div>
                          <p className="mt-2.5 text-xs leading-relaxed text-stone-600">
                            {err.explicacaoPedagogica}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Versão Editorial para Impressão / PDF */}
      <PrintableReport data={data} theme={pdfTheme} />
    </>
  );
}
