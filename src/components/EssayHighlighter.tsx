"use client";

import React, { useMemo, useState } from "react";
import { HighlightAnnotation, ParagraphTranscription } from "@/types/essay";
import { Sparkles, X } from "lucide-react";

interface EssayHighlighterProps {
  transcricao: ParagraphTranscription[];
  destaques: HighlightAnnotation[];
}

const CATEGORY_STYLES: Record<
  HighlightAnnotation["categoria"],
  { label: string; badge: string; mark: string }
> = {
  gramatica: {
    label: "Gramática (C1)",
    badge: "bg-red-100 text-red-800 border-red-200",
    mark: "bg-red-100/90 text-red-950 border-b-2 border-red-500 hover:bg-red-200/80",
  },
  conectivo: {
    label: "Conectivos (C4)",
    badge: "bg-sky-100 text-sky-800 border-sky-200",
    mark: "bg-sky-100/90 text-sky-950 border-b-2 border-sky-500 hover:bg-sky-200/80",
  },
  repertorio: {
    label: "Repertórios (C2/C3)",
    badge: "bg-violet-100 text-violet-800 border-violet-200",
    mark: "bg-violet-100/90 text-violet-950 border-b-2 border-violet-500 hover:bg-violet-200/80",
  },
  intervencao: {
    label: "Intervenção (C5)",
    badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
    mark: "bg-emerald-100/90 text-emerald-950 border-b-2 border-emerald-500 hover:bg-emerald-200/80",
  },
};

export function EssayHighlighter({ transcricao, destaques }: EssayHighlighterProps) {
  const [activeCategories, setActiveCategories] = useState<
    Record<HighlightAnnotation["categoria"], boolean>
  >({
    gramatica: true,
    conectivo: true,
    repertorio: true,
    intervencao: true,
  });

  const [selectedHighlight, setSelectedHighlight] = useState<HighlightAnnotation | null>(null);

  const visibleHighlights = useMemo(
    () => destaques.filter((d) => activeCategories[d.categoria] && d.trecho.trim().length > 0),
    [destaques, activeCategories]
  );

  const toggleCategory = (cat: HighlightAnnotation["categoria"]) => {
    setActiveCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const renderParagraphWithHighlights = (text: string) => {
    if (visibleHighlights.length === 0) return text;

    type Segment = { text: string; highlight?: HighlightAnnotation };
    let segments: Segment[] = [{ text }];

    for (const hl of visibleHighlights) {
      const nextSegments: Segment[] = [];
      for (const seg of segments) {
        if (seg.highlight) {
          nextSegments.push(seg);
          continue;
        }
        const idx = seg.text.toLowerCase().indexOf(hl.trecho.toLowerCase());
        if (idx === -1) {
          nextSegments.push(seg);
          continue;
        }
        if (idx > 0) {
          nextSegments.push({ text: seg.text.slice(0, idx) });
        }
        nextSegments.push({
          text: seg.text.slice(idx, idx + hl.trecho.length),
          highlight: hl,
        });
        if (idx + hl.trecho.length < seg.text.length) {
          nextSegments.push({ text: seg.text.slice(idx + hl.trecho.length) });
        }
      }
      segments = nextSegments;
    }

    return segments.map((seg, i) => {
      if (!seg.highlight) {
        return <React.Fragment key={i}>{seg.text}</React.Fragment>;
      }
      const style = CATEGORY_STYLES[seg.highlight.categoria];
      const isSelected = selectedHighlight?.trecho === seg.highlight.trecho;
      return (
        <button
          key={i}
          type="button"
          onClick={() => setSelectedHighlight(seg.highlight!)}
          className={`inline cursor-pointer rounded-sm px-1 py-0.5 text-left transition ${style.mark} ${
            isSelected ? "ring-2 ring-stone-900 ring-offset-1" : ""
          }`}
          title="Clique para ver detalhes"
        >
          {seg.text}
        </button>
      );
    });
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white shadow-xs">
      <div className="border-b border-stone-200 px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-stone-800">
            Folha da Redação Interativa
          </h2>
          <span className="text-xs text-stone-500">Clique nos grifos para inspecionar</span>
        </div>

        {/* Filtros de Legenda */}
        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(CATEGORY_STYLES) as HighlightAnnotation["categoria"][]).map((cat) => {
            const active = activeCategories[cat];
            const info = CATEGORY_STYLES[cat];
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                  active ? info.badge : "border-stone-200 bg-stone-50 text-stone-400 line-through"
                }`}
              >
                {info.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Texto Transcrito */}
      <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
        {transcricao.map((p) => (
          <div key={p.paragrafo} className="group">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="rounded-md bg-stone-100 px-2 py-0.5 font-mono text-xs font-semibold text-stone-700">
                §{p.paragrafo}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                {p.papel}
              </span>
            </div>
            <p className="text-[15px] leading-7 text-stone-800">
              {renderParagraphWithHighlights(p.texto)}
            </p>
          </div>
        ))}
      </div>

      {/* Card flutuante do grifo selecionado */}
      {selectedHighlight && (
        <div className="border-t border-stone-200 bg-stone-50 px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span
                className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                  CATEGORY_STYLES[selectedHighlight.categoria].badge
                }`}
              >
                {selectedHighlight.titulo}
              </span>
              <p className="mt-2 text-sm text-stone-800">{selectedHighlight.detalhe}</p>
              {selectedHighlight.sugestao && (
                <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-900">
                  <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
                  Sugestão: {selectedHighlight.sugestao}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedHighlight(null)}
              className="rounded-lg p-1 text-stone-400 hover:bg-stone-200 hover:text-stone-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
