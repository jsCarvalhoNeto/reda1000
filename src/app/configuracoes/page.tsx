"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bot,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Save,
  Settings,
  ShieldCheck,
  Trash2,
  AlertCircle,
  PlugZap,
} from "lucide-react";
import {
  clearAISettings,
  DEFAULT_AI_SETTINGS,
  loadAISettings,
  saveAISettings,
} from "@/lib/settings";

type SettingsSection = "ia";
type AISubSection = "api";

export default function ConfiguracoesPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("ia");
  const [activeAISub, setActiveAISub] = useState<AISubSection>("api");

  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(DEFAULT_AI_SETTINGS.model);
  const [showKey, setShowKey] = useState(false);

  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    const loaded = loadAISettings();
    setApiKey(loaded.apiKey);
    setModel(loaded.model);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAISettings({
      provider: "gemini",
      apiKey,
      model,
    });
    setSaveFeedback("Configurações de API salvas com sucesso!");
    setTimeout(() => setSaveFeedback(null), 3500);
  };

  const handleClear = () => {
    clearAISettings();
    setApiKey("");
    setModel(DEFAULT_AI_SETTINGS.model);
    setTestResult(null);
    setSaveFeedback("Chave removida do navegador.");
    setTimeout(() => setSaveFeedback(null), 3500);
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch("/api/configuracoes/testar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, model }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setTestResult({
          ok: true,
          message: `${data.message} (Modelo: ${data.modelName})`,
        });
      } else {
        setTestResult({
          ok: false,
          message: data.error || "Não foi possível validar a chave.",
        });
      }
    } catch {
      setTestResult({
        ok: false,
        message: "Erro de rede ao tentar validar a chave com o servidor.",
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* Cabeçalho da Tela de Configurações */}
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
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-900">
                <Settings className="h-3.5 w-3.5" />
                Painel do Sistema
              </div>
              <h1 className="text-2xl font-bold text-stone-900">Configurações</h1>
            </div>
          </div>
        </div>

        {/* Layout com Menu Lateral + Conteúdo */}
        <div className="grid gap-6 md:grid-cols-12">
          {/* Menu de Configurações */}
          <aside className="md:col-span-4">
            <nav className="rounded-2xl border border-stone-200 bg-white p-3 shadow-xs">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Menu de Configurações
              </div>

              <button
                type="button"
                onClick={() => setActiveSection("ia")}
                className={`mt-1 flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm font-semibold transition ${
                  activeSection === "ia"
                    ? "bg-emerald-900 text-white shadow-2xs"
                    : "text-stone-700 hover:bg-stone-100"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Bot className="h-4 w-4" />
                  Inteligência Artificial
                </span>
              </button>

              {/* Submenu dentro de Inteligência Artificial */}
              {activeSection === "ia" && (
                <div className="mt-2 space-y-1 border-l-2 border-emerald-900/20 pl-3 ml-4">
                  <button
                    type="button"
                    onClick={() => setActiveAISub("api")}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold transition ${
                      activeAISub === "api"
                        ? "bg-emerald-50 text-emerald-900"
                        : "text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    <KeyRound className="h-3.5 w-3.5" />
                    Configurar API
                  </button>
                </div>
              )}
            </nav>
          </aside>

          {/* Área de Conteúdo: Inteligência Artificial -> Configurar API */}
          <section className="md:col-span-8">
            {activeSection === "ia" && activeAISub === "api" && (
              <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs sm:p-8">
                <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-5">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-900">
                      <Bot className="h-3 w-3" />
                      Inteligência Artificial
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-stone-900">Configurar API</h2>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">
                      Conecte sua chave da API Multimodal do Google Gemini para habilitar a
                      leitura de imagens manuscritas, PDFs e a correção automática padrão ENEM.
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      apiKey.trim()
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {apiKey.trim() ? "Chave ativa" : "Não configurada"}
                  </span>
                </div>

                <form onSubmit={handleSave} className="mt-6 space-y-5">
                  {/* Provedor */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-600">
                      Provedor de IA
                    </label>
                    <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-4 py-3">
                      <div>
                        <div className="text-sm font-semibold text-stone-900">
                          Google Gemini (Visão + PDF Nativo)
                        </div>
                        <div className="text-xs text-stone-500">
                          Suporta leitura direta de fotos e documentos PDF sem conversão externa.
                        </div>
                      </div>
                      <ShieldCheck className="h-5 w-5 text-emerald-700" />
                    </div>
                  </div>

                  {/* Chave da API */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-600">
                      Chave da API (GEMINI_API_KEY)
                    </label>
                    <div className="relative">
                      <input
                        type={showKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Cole sua chave AIza..."
                        className="w-full rounded-xl border border-stone-300 bg-stone-50 py-2.5 pl-4 pr-11 text-sm text-stone-900 outline-none transition focus:border-emerald-700 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowKey((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-stone-400 hover:text-stone-700"
                        title={showKey ? "Ocultar chave" : "Mostrar chave"}
                      >
                        {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="mt-1.5 text-[11px] text-stone-500">
                      Armazenada localmente apenas no seu navegador. Caso o servidor possua{" "}
                      <code className="rounded bg-stone-100 px-1 py-0.5">GEMINI_API_KEY</code> no{" "}
                      <code className="rounded bg-stone-100 px-1 py-0.5">.env.local</code>, ela será
                      usada como fallback.
                    </p>
                  </div>

                  {/* Modelo */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-600">
                      Nome do Modelo de Análise
                    </label>
                    <input
                      type="text"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      placeholder="Ex.: gemini-2.5-flash"
                      className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 font-mono text-sm text-stone-900 outline-none transition focus:border-emerald-700 focus:bg-white"
                    />
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="text-[11px] text-stone-500">Sugestões rápidas:</span>
                      {[
                        "gemini-2.5-flash",
                        "gemini-2.5-pro",
                        "gemini-2.5-flash-lite",
                        "gemini-2.0-flash",
                      ].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setModel(preset)}
                          className={`rounded-lg border px-2 py-0.5 font-mono text-[11px] transition ${
                            model.trim() === preset
                              ? "border-emerald-700 bg-emerald-50 font-semibold text-emerald-900"
                              : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                    <p className="mt-1.5 text-[11px] text-stone-500">
                      Digite exatamente o identificador do modelo desejado na API Gemini (o botão{" "}
                      <strong>Testar Conexão</strong> valida se o modelo existe e está acessível com
                      sua chave).
                    </p>
                  </div>

                  {/* Feedbacks */}
                  {saveFeedback && (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-900">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                      {saveFeedback}
                    </div>
                  )}

                  {testResult && (
                    <div
                      className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-xs font-medium ${
                        testResult.ok
                          ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                          : "border-red-200 bg-red-50 text-red-800"
                      }`}
                    >
                      {testResult.ok ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                      ) : (
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                      )}
                      <span>{testResult.message}</span>
                    </div>
                  )}

                  {/* Ações */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-5">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handleTestConnection}
                        disabled={testing}
                        className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-800 transition hover:bg-stone-50 disabled:opacity-50"
                      >
                        {testing ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <PlugZap className="h-4 w-4 text-emerald-800" />
                        )}
                        Testar Conexão
                      </button>

                      {apiKey && (
                        <button
                          type="button"
                          onClick={handleClear}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-800 transition hover:bg-red-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Limpar Chave
                        </button>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-800"
                    >
                      <Save className="h-4 w-4" />
                      Salvar Configurações
                    </button>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
