import React from "react";
import { EssayAnalysisResult } from "@/types/essay";

interface PrintableReportProps {
  data: EssayAnalysisResult;
  theme: "emerald" | "sepia";
}

export function PrintableReport({ data, theme }: PrintableReportProps) {
  const accentText = theme === "emerald" ? "text-emerald-900" : "text-stone-800";
  const accentBg = theme === "emerald" ? "bg-emerald-900" : "bg-stone-700";
  const accentBorder = theme === "emerald" ? "border-emerald-900" : "border-stone-700";
  const softBg = theme === "emerald" ? "bg-emerald-50/70" : "bg-amber-50/60";

  return (
    <div className="print-only hidden bg-white p-8 text-stone-900">
      {/* Cabeçalho Editorial */}
      <div className={`flex items-start justify-between border-b-2 pb-4 ${accentBorder}`}>
        <div>
          <h1 className={`text-2xl font-bold uppercase tracking-tight ${accentText}`}>
            Análise Crítica e Avaliação Padrão ENEM
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Exame Dissertativo-Argumentativo | {data.temaIdentificado}
          </p>
        </div>
        <div className={`rounded-lg px-4 py-2 text-center text-white ${accentBg}`}>
          <div className="text-2xl font-bold leading-none">{data.notaFinal}</div>
          <div className="mt-1 text-[10px] uppercase tracking-widest">Nota Final</div>
        </div>
      </div>

      {/* 1. Introdução */}
      <section className="mt-6">
        <h2 className={`border-b pb-1 text-base font-bold uppercase ${accentText}`}>
          1. Análise da Introdução
        </h2>
        <ul className="mt-3 space-y-2 text-xs leading-relaxed">
          <li>
            <strong>(a) Contexto:</strong> {data.introducao.contexto.aprovado ? "Sim (X) Não ( )" : "Sim ( ) Não (X)"} —{" "}
            {data.introducao.contexto.analise}{" "}
            <strong>Deve mudar?</strong> {data.introducao.contexto.deveMudar ? "Sim (X) Não ( )" : "Sim ( ) Não (X)"}
            <div className="mt-1 italic text-stone-600">
              Sugestão alternativa: {data.introducao.contexto.sugestaoAlternativa}
            </div>
          </li>
          <li>
            <strong>(b) Tema/Problema:</strong> {data.introducao.temaProblema.aprovado ? "Sim (X) Não ( )" : "Sim ( ) Não (X)"} —{" "}
            {data.introducao.temaProblema.analise} Palavras-chave:{" "}
            {data.introducao.temaProblema.palavrasChave.join(", ")}.
          </li>
          <li>
            <strong>(c) Tese:</strong> 1) {data.introducao.tese.eixo1}; 2) {data.introducao.tese.eixo2}. Linha de raciocínio:{" "}
            <strong>{data.introducao.tese.linhaRaciocinio}</strong>.
          </li>
          <li>
            <strong>(d) Progressão e Conexão:</strong>{" "}
            {data.introducao.progressaoConexao.progressaoOk ? "Sim (X)" : "Não (X)"} para progressão | Conectivos:{" "}
            {data.introducao.progressaoConexao.conectivosUsados.join(", ")}.
            <div className="mt-1 italic text-stone-600">
              Melhoria sintática: {data.introducao.progressaoConexao.melhoriaSintatica}
            </div>
          </li>
        </ul>
      </section>

      {/* 2. Desenvolvimentos */}
      <section className="mt-6">
        <h2 className={`border-b pb-1 text-base font-bold uppercase ${accentText}`}>
          2. Análise do Desenvolvimento (D1 e D2)
        </h2>
        <div className="mt-3 space-y-4 text-xs leading-relaxed">
          {data.desenvolvimentos.map((dev) => (
            <div key={dev.id}>
              <h3 className="font-bold text-stone-900">
                Desenvolvimento {dev.id === "D1" ? "1 (D1)" : "2 (D2)"}
              </h3>
              <ul className="mt-1 space-y-1.5 pl-3">
                <li>
                  <strong>(a) Tópico-frasal:</strong> {dev.topicoFrasal.analise}
                </li>
                <li>
                  <strong>(b) Desenvolvimento & Repertório:</strong> {dev.repertorio.nome}. Relacionado?{" "}
                  {dev.repertorio.relacionado ? "Sim (X)" : "Não (X)"} | Convence?{" "}
                  {dev.repertorio.convence ? "Sim (X)" : "Não (X)"} — {dev.repertorio.analise}
                  <div className="italic text-stone-600">Melhoria: {dev.repertorio.melhoria}</div>
                  <div className="italic text-stone-700">
                    Sugestão alternativa/ousada: {dev.repertorio.sugestaoCriativa}
                  </div>
                </li>
                <li>
                  <strong>(c) Conclusão do {dev.id}:</strong> {dev.conclusaoParagrafo.analise}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Conclusão */}
      <section className="mt-6">
        <h2 className={`border-b pb-1 text-base font-bold uppercase ${accentText}`}>
          3. Análise da Conclusão (Proposta de Intervenção)
        </h2>
        <ul className="mt-3 space-y-1.5 text-xs leading-relaxed">
          <li>
            <strong>(a) Tópico-frasal:</strong> {data.conclusao.topicoFrasal.analise}
          </li>
          <li>
            <strong>(b) 5 Elementos Padrão ENEM:</strong>
            <ul className="mt-1 space-y-1 pl-4">
              <li>
                <strong>Agente ({data.conclusao.elementosIntervencao.agente.status}):</strong>{" "}
                {data.conclusao.elementosIntervencao.agente.textoExtraido}
              </li>
              <li>
                <strong>Ação ({data.conclusao.elementosIntervencao.acao.status}):</strong>{" "}
                {data.conclusao.elementosIntervencao.acao.textoExtraido}
              </li>
              <li>
                <strong>Meio/Modo ({data.conclusao.elementosIntervencao.meioModo.status}):</strong>{" "}
                {data.conclusao.elementosIntervencao.meioModo.textoExtraido}
              </li>
              <li>
                <strong>Efeito ({data.conclusao.elementosIntervencao.efeito.status}):</strong>{" "}
                {data.conclusao.elementosIntervencao.efeito.textoExtraido}
              </li>
              <li>
                <strong>Detalhamento ({data.conclusao.elementosIntervencao.detalhamento.status}):</strong>{" "}
                {data.conclusao.elementosIntervencao.detalhamento.textoExtraido}
              </li>
            </ul>
          </li>
          <li>
            <strong>Fechamento:</strong> {data.conclusao.fechamento.analise}
          </li>
        </ul>
      </section>

      {/* 4. Tabela Gramatical */}
      <section className="mt-6">
        <h2 className={`border-b pb-1 text-base font-bold uppercase ${accentText}`}>
          4. Análise Gramatical e Correção Detalhada
        </h2>
        <table className="mt-3 w-full border-collapse text-left text-[11px]">
          <thead>
            <tr className={`${softBg} border-b border-stone-300`}>
              <th className="p-2 font-bold">Trecho / Linha</th>
              <th className="p-2 font-bold">Erro Identificado</th>
              <th className="p-2 font-bold">Explicação e Como Evitar</th>
              <th className="p-2 font-bold">Correção Sugerida</th>
            </tr>
          </thead>
          <tbody>
            {data.desviosGramaticais.map((err) => (
              <tr key={err.id} className="border-b border-stone-200 align-top">
                <td className="p-2 font-semibold">{err.localizacao}</td>
                <td className="p-2">
                  <strong>{err.tipoErro}:</strong> &ldquo;{err.trechoOriginal}&rdquo;
                </td>
                <td className="p-2">{err.explicacaoPedagogica}</td>
                <td className="p-2 font-mono text-emerald-900">{err.correcaoSugerida}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 5. Competências */}
      <section className="mt-6">
        <h2 className={`border-b pb-1 text-base font-bold uppercase ${accentText}`}>
          5. Avaliação por Competências (Padrão ENEM / INEP)
        </h2>
        <table className="mt-3 w-full border-collapse text-left text-xs">
          <thead>
            <tr className={`${softBg} border-b border-stone-300`}>
              <th className="p-2 font-bold">Competência</th>
              <th className="p-2 font-bold">Nota</th>
              <th className="p-2 font-bold">Justificativa Pedagógica</th>
            </tr>
          </thead>
          <tbody>
            {data.competencias.map((comp) => (
              <tr key={comp.id} className="border-b border-stone-200 align-top">
                <td className="p-2 font-semibold">
                  {comp.id}: {comp.nome}
                </td>
                <td className="p-2 font-bold">{comp.nota}</td>
                <td className="p-2">{comp.justificativa}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={`mt-4 border-l-4 p-3 text-xs ${accentBorder} ${softBg}`}>
          <div className="font-bold">Nota Final Consolidada: {data.notaFinal} / 1000 Pontos</div>
          <p className="mt-1 italic">{data.avaliacaoGlobal.resumoConselheiro}</p>
        </div>
      </section>
    </div>
  );
}
