"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, RefreshCw, Smartphone, AlertCircle, X } from "lucide-react";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onCancel: () => void;
}

export function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nativeInputRef = useRef<HTMLInputElement>(null);

  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");
  const [isStarting, setIsStarting] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function startCamera() {
      setIsStarting(true);
      setCameraError(null);
      stopStream();

      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        if (active) {
          setCameraError(
            "A câmera ao vivo não está disponível neste navegador ou conexão. Use o botão abaixo para abrir a câmera do dispositivo."
          );
          setIsStarting(false);
        }
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });

        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {
            // Alguns navegadores iniciam automaticamente via autoPlay
          });
        }
      } catch (err) {
        if (!active) return;
        const name = err instanceof DOMException ? err.name : "";
        if (name === "NotAllowedError" || name === "PermissionDeniedError") {
          setCameraError(
            "Permissão de câmera negada. Libere o acesso à câmera nas configurações do navegador ou use a câmera nativa do dispositivo."
          );
        } else if (name === "NotFoundError" || name === "DevicesNotFoundError") {
          setCameraError(
            "Nenhuma câmera foi encontrada neste dispositivo. Você pode enviar uma imagem ou usar a câmera nativa."
          );
        } else {
          setCameraError(
            "Não foi possível iniciar a câmera ao vivo. Tente usar a câmera do dispositivo abaixo."
          );
        }
      } finally {
        if (active) {
          setIsStarting(false);
        }
      }
    }

    startCamera();

    return () => {
      active = false;
      stopStream();
    };
  }, [facingMode, stopStream]);

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) return;

    setIsCapturing(true);
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsCapturing(false);
      return;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        setIsCapturing(false);
        if (!blob) return;

        const fileName = `redacao-foto-${Date.now()}.jpg`;
        const file = new File([blob], fileName, { type: "image/jpeg" });
        stopStream();
        onCapture(file);
      },
      "image/jpeg",
      0.92
    );
  };

  const handleNativeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopStream();
    onCapture(file);
  };

  return (
    <div className="flex flex-col items-center rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/60 p-4 sm:p-6">
      <input
        ref={nativeInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleNativeFileChange}
      />

      {cameraError ? (
        <div className="flex max-w-md flex-col items-center py-6 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
            <AlertCircle className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-stone-800">{cameraError}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => nativeInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-800"
            >
              <Smartphone className="h-4 w-4" />
              Abrir Câmera do Dispositivo
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              Voltar
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="relative overflow-hidden rounded-2xl bg-stone-900 shadow-sm">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="aspect-[4/3] w-full object-cover sm:aspect-video"
            />

            {/* Guia visual para enquadramento da folha */}
            <div className="pointer-events-none absolute inset-4 rounded-xl border border-white/30" />

            {isStarting && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-900/80 text-xs font-medium text-white">
                Iniciando câmera...
              </div>
            )}
          </div>

          <p className="mt-2.5 text-center text-xs text-stone-500">
            Posicione a folha da redação bem iluminada e legível dentro do quadro antes de capturar.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={handleCapturePhoto}
              disabled={isStarting || isCapturing}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            >
              <Camera className="h-4 w-4" />
              {isCapturing ? "Capturando..." : "Capturar Foto"}
            </button>

            <button
              type="button"
              onClick={() =>
                setFacingMode((prev) => (prev === "environment" ? "user" : "environment"))
              }
              disabled={isStarting}
              title="Alternar entre câmera traseira e frontal"
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50 disabled:opacity-50"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Inverter Câmera
            </button>

            <button
              type="button"
              onClick={() => nativeInputRef.current?.click()}
              title="Abrir aplicativo nativo de câmera"
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              <Smartphone className="h-3.5 w-3.5" />
              Câmera Nativa
            </button>

            <button
              type="button"
              onClick={() => {
                stopStream();
                onCancel();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              <X className="h-3.5 w-3.5" />
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
