"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnalyzePayload, UploadPanel } from "@/components/UploadPanel";
import { AnalysisDashboard } from "@/components/AnalysisDashboard";
import { LandingPage } from "@/components/LandingPage";
import { EssayAnalysisResult } from "@/types/essay";
import { DEMO_ESSAYS } from "@/lib/demo-data";
import { DEFAULT_AI_SETTINGS, loadAISettings } from "@/lib/settings";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(DEFAULT_AI_SETTINGS.model);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [analysis, setAnalysis] = useState<EssayAnalysisResult | null>(null);
  const [openedFromSaved, setOpenedFromSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const settings = loadAISettings();
    setApiKey(settings.apiKey);
    setModel(settings.model);

    if (!isSupabaseConfigured()) {
      setAuthChecked(true);
      return;
    }

    const supabase = createClient();
    supabase.auth
      .getUser()
      .then(({ data }) => {
        setUserEmail(data.user?.email ?? null);
      })
      .finally(() => {
        setAuthChecked(true);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Carrega relatório salvo quando acessado via /?relatorio=<id>
  useEffect(() => {
    const reportId = searchParams.get("relatorio");
    const shouldPrint = searchParams.get("print") === "1";

    if (!reportId || !userEmail) return;

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch(`/api/relatorios/${encodeURIComponent(reportId)}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Não foi possível abrir o relatório.");
        }
        return data.relatorio;
      })
      .then((relatorio) => {
        if (cancelled) return;
        setAnalysis(relatorio.resultado as EssayAnalysisResult);
        setOpenedFromSaved(true);
        if (shouldPrint) {
          setTimeout(() => window.print(), 350);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Erro ao carregar relatório.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams, userEmail]);

  const handleSignOut = async () => {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    setAnalysis(null);
    router.refresh();
  };

  const handleAnalyze = async ({ file, texto, tema }: AnalyzePayload) => {
    if (!userEmail) {
      setError("Faça login para realizar a análise da redação.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setOpenedFromSaved(false);

    try {
      const currentSettings = loadAISettings();
      const formData = new FormData();
      if (file) formData.append("file", file);
      if (texto?.trim()) formData.append("texto", texto.trim());
      if (tema.trim()) formData.append("tema", tema.trim());
      if (currentSettings.apiKey.trim()) {
        formData.append("apiKey", currentSettings.apiKey.trim());
      }
      formData.append("model", currentSettings.model || model);

      const res = await fetch("/api/analisar", {
        method: "POST",
        body: formData,
      });

      const payload = await res.json();
      if (!res.ok) {
        setError(payload.error || "Erro ao analisar a redação.");
        return;
      }

      setAnalysis(payload.result as EssayAnalysisResult);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Erro de conexão com o servidor: ${err.message}`
          : "Erro de conexão com o servidor."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadDemo = (demoKey: "sus840" | "pufendorf960") => {
    setError(null);
    setOpenedFromSaved(false);
    setAnalysis(DEMO_ESSAYS[demoKey]);
  };

  const handleReset = () => {
    setAnalysis(null);
    setOpenedFromSaved(false);
    if (searchParams.get("relatorio")) {
      router.push("/");
    }
  };

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f6f2] text-sm text-stone-600">
        Verificando sessão...
      </div>
    );
  }

  // Sem usuário logado -> exibe a Landing Page com área de Login antes da submissão
  if (!userEmail) {
    return (
      <LandingPage
        onAuthSuccess={() => {
          router.refresh();
        }}
      />
    );
  }

  if (analysis) {
    return (
      <AnalysisDashboard
        data={analysis}
        userEmail={userEmail}
        alreadySaved={openedFromSaved}
        onReset={handleReset}
      />
    );
  }

  return (
    <main className="min-h-screen">
      <UploadPanel
        apiConfigured={Boolean(apiKey.trim())}
        userEmail={userEmail}
        onSignOut={handleSignOut}
        onAnalyze={handleAnalyze}
        onLoadDemo={handleLoadDemo}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-sm text-stone-600">
          Carregando Redação 1000...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
