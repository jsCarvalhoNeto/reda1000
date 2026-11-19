export interface ParagraphTranscription {
  paragrafo: number;
  papel: "Introdução" | "Desenvolvimento 1" | "Desenvolvimento 2" | "Conclusão";
  texto: string;
}

export interface IntroductionAnalysis {
  contexto: {
    aprovado: boolean;
    deveMudar: boolean;
    analise: string;
    sugestaoAlternativa: string;
  };
  temaProblema: {
    aprovado: boolean;
    palavrasChave: string[];
    analise: string;
  };
  tese: {
    eixo1: string;
    eixo2: string;
    linhaRaciocinio: string;
  };
  progressaoConexao: {
    progressaoOk: boolean;
    conectivosOk: boolean;
    conectivosUsados: string[];
    melhoriaSintatica: string;
  };
}

export interface DevelopmentAnalysis {
  id: "D1" | "D2";
  paragrafo: number;
  topicoFrasal: {
    aprovado: boolean;
    analise: string;
  };
  repertorio: {
    nome: string;
    relacionado: boolean;
    convence: boolean;
    analise: string;
    melhoria: string;
    sugestaoCriativa: string;
  };
  conclusaoParagrafo: {
    conectivoInicial: string;
    conectivoFechamento: string;
    analise: string;
  };
}

export type InterventionStatus = "PRESENTE" | "PARCIAL" | "AUSENTE";

export interface InterventionElement {
  status: InterventionStatus;
  textoExtraido: string;
  observacao: string;
}

export interface ConclusionAnalysis {
  topicoFrasal: {
    aprovado: boolean;
    analise: string;
  };
  elementosIntervencao: {
    agente: InterventionElement;
    acao: InterventionElement;
    meioModo: InterventionElement;
    efeito: InterventionElement;
    detalhamento: InterventionElement;
  };
  fechamento: {
    retomouIntroducao: boolean;
    analise: string;
  };
}

export interface GrammarError {
  id: string;
  localizacao: string;
  paragrafo: number;
  linha: number;
  tipoErro: string;
  trechoOriginal: string;
  explicacaoPedagogica: string;
  correcaoSugerida: string;
}

export interface CompetencyScore {
  id: "C1" | "C2" | "C3" | "C4" | "C5";
  nome: string;
  nota: number;
  justificativa: string;
}

export interface HighlightAnnotation {
  trecho: string;
  categoria: "gramatica" | "conectivo" | "repertorio" | "intervencao";
  titulo: string;
  detalhe: string;
  sugestao?: string;
}

export interface EssayAnalysisResult {
  tituloDocumento: string;
  temaIdentificado: string;
  notaFinal: number;
  deltaEvolucao?: number | null;
  transcricao: ParagraphTranscription[];
  introducao: IntroductionAnalysis;
  desenvolvimentos: DevelopmentAnalysis[];
  conclusao: ConclusionAnalysis;
  avaliacaoGlobal: {
    elogioGeral: string;
    oQueFalta: string;
    notaMatrizGramatical?: string;
    resumoConselheiro: string;
  };
  desviosGramaticais: GrammarError[];
  competencias: CompetencyScore[];
  destaquesInterativos: HighlightAnnotation[];
}
