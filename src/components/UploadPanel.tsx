"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Sparkles,
  Settings,
  AlertCircle,
  Loader2,
  BookOpenCheck,
  Type,
  FolderHeart,
  LogIn,
  LogOut,
  Camera,
  RotateCcw,
} from "lucide-react";
import { CameraCapture } from "@/components/CameraCapture";

export interface AnalyzePayload {
  file?: File | null;
  texto?: string;
  tema: string;
}

interface UploadPanelProps {
  apiConfigured: boolean;
  userEmail: string | null;
  onSignOut: () => Promise<void>;
  onAnalyze: (payload: AnalyzePayload) => Promise<void>;
  onLoadDemo: (demoKey: "sus840" | "pufendorf960") => void;
  isLoading: boolean;
  error: string | null;
}

type InputMode = "file" | "camera" | "text";

export function UploadPanel({
  apiConfigured,
  userEmail,
  onSignOut,
  onAnalyze,
  onLoadDemo,
  isLoading,
  error,
}: UploadPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputMode, setInputMode] = useState<InputMode>("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [essayText, setEssayText] = useState("");
  const [tema, setTema] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (file: File | undefined) => {
    if (!file) return;
    setSelectedFile(file);
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
  const paragraphCount = essayText.trim()
    ? essayText.trim().split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
    : 0;

  const isFileOrCameraMode = inputMode === "file" || inputMode === "camera";
  const canSubmit = isFileOrCameraMode ? Boolean(selectedFile) : essayText.trim().length >= 50;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    if (isFileOrCameraMode) {
      await onAnalyze({ file: selectedFile, tema });
    } else {
      await onAnalyze({ texto: essayText, tema });
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Cabeçalho Hero com Menu de Configurações */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-900/10 px-3 py-1 text-xs font-semibold text-emerald-900">
            <BookOpenCheck className="h-3.5 w-3.5" />
            Padrão Oficial INEP / ENEM
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Redação 1000
          </h1>
          <p className="mt-1 text-sm text-stone-600 sm:text-base">
            Envie a foto da sua folha, um PDF ou digite/cole o texto diretamente. O sistema audita
            cada parágrafo, mapeia desvios linha a linha e calcula suas 5 competências.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {userEmail ? (
            <>
              <Link
                href="/relatorios"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-800/20 bg-emerald-50 px-3.5 py-2.5 text-xs font-semibold text-emerald-900 shadow-2xs transition hover:bg-emerald-100"
              >
                <FolderHeart className="h-4 w-4" />
                Meus Relatórios
              </Link>
              <button
                type="button"
                onClick={onSignOut}
                title={`Logado como ${userEmail}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-stone-700 shadow-2xs transition hover:bg-stone-50"
              >
                <LogOut className="h-3.5 w-3.5 text-stone-500" />
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-800 shadow-2xs transition hover:bg-stone-50"
            >
              <LogIn className="h-4 w-4 text-emerald-800" />
              Entrar / Criar Conta
            </Link>
          )}

          <Link
            href="/configuracoes"
            className="inline-flex items-center gap-2.5 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-xs transition hover:bg-stone-50"
          >
            <Settings className="h-4 w-4 text-emerald-800" />
            <span>Configurações</span>
            <span
              className={`h-2 w-2 rounded-full ${
                apiConfigured ? "bg-emerald-500" : "bg-amber-400"
              }`}
              title={apiConfigured ? "API Configurada" : "API não configurada"}
            />
          </Link>
        </div>
      </div>

      {/* Card Principal */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Seletor de Modo de Entrada */}
        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-stone-200 bg-stone-100/80 p-1.5">
          <button
            type="button"
            onClick={() => setInputMode("file")}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
              inputMode === "file"
                ? "bg-white text-emerald-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Upload className="h-4 w-4" />
            Enviar Imagem ou PDF
          </button>
          <button
            type="button"
            onClick={() => setInputMode("camera")}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
              inputMode === "camera"
                ? "bg-white text-emerald-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Camera className="h-4 w-4" />
            Tirar Foto
          </button>
          <button
            type="button"
            onClick={() => setInputMode("text")}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
              inputMode === "text"
                ? "bg-white text-emerald-900 shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Type className="h-4 w-4" />
            Digitar ou Colar Texto
          </button>
        </div>

        {inputMode === "file" ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
              isDragging
                ? "border-emerald-700 bg-emerald-50/70"
                : "border-stone-300 bg-stone-50/60 hover:border-emerald-600 hover:bg-emerald-50/30"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0])}
            />

            {selectedFile ? (
              <div className="flex w-full max-w-md flex-col items-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Pré-visualização da redação"
                    className="mb-4 max-h-56 rounded-xl border border-stone-200 object-contain shadow-xs"
                  />
                ) : (
                  <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-900/10 text-emerald-800">
                    <FileText className="h-7 w-7" />
                  </div>
                )}
                <p className="text-sm font-semibold text-stone-900">{selectedFile.name}</p>
                <p className="mt-0.5 text-xs text-stone-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Clique para trocar o arquivo
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-900/10 text-emerald-800">
                  <Upload className="h-7 w-7" />
                </div>
                <p className="text-base font-semibold text-stone-900">
                  Arraste sua redação aqui ou clique para selecionar
                </p>
                <p className="mt-1.5 text-xs text-stone-500">
                  Suporta fotos manuscritas/digitadas (JPG, PNG, WebP) ou documentos PDF até 20 MB
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-500">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 shadow-2xs ring-1 ring-stone-200">
                    <ImageIcon className="h-3.5 w-3.5 text-emerald-700" /> Imagem
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 shadow-2xs ring-1 ring-stone-200">
                    <FileText className="h-3.5 w-3.5 text-emerald-700" /> PDF
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInputMode("camera");
                    }}
                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-900/10 px-2.5 py-1 font-semibold text-emerald-900 shadow-2xs ring-1 ring-emerald-800/20 transition hover:bg-emerald-900/15"
                  >
                    <Camera className="h-3.5 w-3.5 text-emerald-800" /> Tirar foto agora
                  </button>
                </div>
              </>
            )}
          </div>
        ) : inputMode === "camera" ? (
          selectedFile && previewUrl ? (
            <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-emerald-600/50 bg-emerald-50/20 px-6 py-8 text-center">
              <img
                src={previewUrl}
                alt="Foto capturada da redação"
                className="mb-4 max-h-72 rounded-xl border border-stone-200 object-contain shadow-xs"
              />
              <p className="text-sm font-semibold text-stone-900">{selectedFile.name}</p>
              <p className="mt-0.5 text-xs text-stone-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Pronta para análise
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={handleClearFile}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-2xs transition hover:bg-stone-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Tirar outra foto
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode("file")}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-700 shadow-2xs transition hover:bg-stone-50"
                >
                  <Upload className="h-3.5 w-3.5" />
                  Escolher arquivo
                </button>
              </div>
            </div>
          ) : (
            <CameraCapture
              onCapture={(file) => handleFileSelect(file)}
              onCancel={() => setInputMode("file")}
            />
          )
        ) : (
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-stone-600">
                Texto da Redação
              </label>
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span>{paragraphCount} parágrafo(s)</span>
                <span>•</span>
                <span>{wordCount} palavra(s)</span>
                {essayText.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setEssayText("")}
                    className="font-semibold text-stone-600 underline hover:text-stone-900"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              rows={11}
              placeholder="Cole ou digite aqui os parágrafos da sua redação (Introdução, D1, D2 e Conclusão)..."
              className="w-full rounded-2xl border border-stone-300 bg-stone-50 p-4 text-sm leading-relaxed text-stone-900 outline-none transition focus:border-emerald-700 focus:bg-white"
            />
            <p className="mt-1.5 text-[11px] text-stone-500">
              Dica: separe os parágrafos com uma linha em branco para facilitar a identificação de
              §1, §2, §3 e §4.
            </p>
          </div>
        )}

        {/* Tema opcional */}
        <div className="mt-6">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-stone-600">
            Tema da Redação (opcional)
          </label>
          <input
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Ex.: Desafios para a valorização e acesso ao SUS (deixe vazio para detectar automaticamente)"
            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-900 outline-none transition focus:border-emerald-700 focus:bg-white"
          />
        </div>

        {error && (
          <div className="mt-5 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
            <Link
              href="/configuracoes"
              className="shrink-0 rounded-lg bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-900 hover:bg-red-200"
            >
              Configurar API
            </Link>
          </div>
        )}

        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-stone-500">
            A análise inclui Raio-X interativo, sugestões de repertório e laudo PDF.
          </p>

          <button
            type="submit"
            disabled={!canSubmit || isLoading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analisando Redação...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analisar Redação
              </>
            )}
          </button>
        </div>
      </form>

      {/* Demonstração Instantânea */}
      <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-100/80 p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-sm font-semibold text-stone-900">
              Quer testar a interface agora sem gastar API?
            </h3>
            <p className="mt-0.5 text-xs text-stone-600">
              Carregue um dos dois casos reais extraídos dos relatórios de referência:
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => onLoadDemo("sus840")}
              className="rounded-xl border border-emerald-800/20 bg-white px-4 py-2 text-xs font-semibold text-emerald-900 shadow-2xs transition hover:bg-emerald-50"
            >
              Demo 1: Redação SUS (Nota 840)
            </button>
            <button
              type="button"
              onClick={() => onLoadDemo("pufendorf960")}
              className="rounded-xl border border-amber-800/20 bg-white px-4 py-2 text-xs font-semibold text-amber-900 shadow-2xs transition hover:bg-amber-50"
            >
              Demo 2: Pufendorf & SUS (Nota 960)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
