"use client";

import React, { useEffect, useState } from "react";
import { AnalyzePayload, UploadPanel } from "@/components/UploadPanel";
import { AnalysisDashboard } from "@/components/AnalysisDashboard";
import { EssayAnalysisResult } from "@/types/essay";
import { DEMO_ESSAYS } from "@/lib/demo-data";
import { DEFAULT_AI_SETTINGS, loadAISettings } from "@/lib/settings";

export default function HomePage() {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(DEFAULT_AI_SETTINGS.model);
  const [analysis, setAnalysis] = useState<EssayAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const settings = loadAISettings();
    setApiKey(settings.apiKey);
    setModel(settings.model);
  }, []);

  const handleAnalyze = async ({ file, texto, tema }: AnalyzePayload) => {
    setIsLoading(true);
    setError(null);

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
    setAnalysis(DEMO_ESSAYS[demoKey]);
  };

  if (analysis) {
    return <AnalysisDashboard data={analysis} onReset={() => setAnalysis(null)} />;
  }

  return (
    <main className="min-h-screen">
      <UploadPanel
        apiConfigured={Boolean(apiKey.trim())}
        onAnalyze={handleAnalyze}
        onLoadDemo={handleLoadDemo}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
}
