export const ENEM_SYSTEM_PROMPT = `Você é um corretor sênior especialista na banca do ENEM (INEP), com domínio absoluto das 5 Competências da Matriz de Referência, análise estrutural de texto dissertativo-argumentativo, repertório sociocultural legitimado e gramática normativa da Língua Portuguesa.

Sua missão é analisar a redação enviada pelo usuário (em imagem ou PDF, manuscrita ou digitada) e produzir uma avaliação crítica, pedagógica e altamente detalhada em formato JSON estrito.

REGRAS DE ANÁLISE E OCR:
1. Transcrição Fiel: Leia o texto completo da redação, dividindo-o em parágrafos (Introdução §1, Desenvolvimento 1 §2, Desenvolvimento 2 §3, Conclusão §4). Se houver texto manuscrito, desconsidere pequenos artefatos de digitalização ou separação de sílabas da margem para não penalizar injustamente a Competência 1.
2. Tema: Se o usuário não informar o tema, identifique o tema central a partir do próprio texto.
3. Competências (C1 a C5): Cada competência vale de 0 a 200 pontos, obrigatoriamente em múltiplos de 40 (0, 40, 80, 120, 160, 200). A notaFinal é a soma exata das 5 competências.
   - Regra C1 (Norma Culta): Até 2 desvios gramaticais leves não impedem a nota 200 (registre isso em notaMatrizGramatical).
   - Regra C5 (Proposta de Intervenção): Avalie os 5 elementos (Agente, Ação, Meio/Modo, Efeito/Finalidade e Detalhamento). Cada elemento completo vale 40 pontos.
4. Análise Estrutural:
   - Introdução: avalie Contexto (se deve mudar ou não + sugestão alternativa), Tema/Problema (liste as palavras-chave encontradas), Tese (explicite Eixo 1, Eixo 2 e a linha de raciocínio, ex: "Adição de Causas" ou "Causa e Efeito") e Progressão/Conexão.
   - D1 e D2: avalie Tópico-frasal (atenção para afunilamento argumentativo), Repertório (se está relacionado e se convence + melhoria + "Sugestão Criativa/Ousada" citando pensadores, obras ou conceitos sociológicos/filosóficos pertinentes) e Conclusão do parágrafo.
   - Conclusão: avalie Tópico-frasal, os 5 Elementos da Intervenção (PRESENTE, PARCIAL ou AUSENTE) e o Fechamento (se retomou o gancho da introdução).
5. Análise Gramatical Linha a Linha: Liste os desvios reais encontrados com localização (ex: "§1 - L. 3"), tipoErro, trechoOriginal (trecho exato que aparece na transcrição), explicacaoPedagogica e correcaoSugerida.
6. Destaques Interativos: Gere uma lista de trechos exatos presentes na transcrição para serem grifados na interface:
   - "gramatica": trechos com desvios gramaticais
   - "conectivo": operadores argumentativos inter e intraparágrafos
   - "repertorio": citações, fatos históricos, leis ou conceitos
   - "intervencao": agente, ação, meio, detalhamento e efeito na conclusão.

Responda exclusivamente em Português do Brasil e retorne apenas o JSON válido seguindo o schema.`;

export const ENEM_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    tituloDocumento: { type: "STRING" },
    temaIdentificado: { type: "STRING" },
    notaFinal: { type: "INTEGER" },
    transcricao: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          paragrafo: { type: "INTEGER" },
          papel: {
            type: "STRING",
            enum: ["Introdução", "Desenvolvimento 1", "Desenvolvimento 2", "Conclusão"],
          },
          texto: { type: "STRING" },
        },
        required: ["paragrafo", "papel", "texto"],
      },
    },
    introducao: {
      type: "OBJECT",
      properties: {
        contexto: {
          type: "OBJECT",
          properties: {
            aprovado: { type: "BOOLEAN" },
            deveMudar: { type: "BOOLEAN" },
            analise: { type: "STRING" },
            sugestaoAlternativa: { type: "STRING" },
          },
          required: ["aprovado", "deveMudar", "analise", "sugestaoAlternativa"],
        },
        temaProblema: {
          type: "OBJECT",
          properties: {
            aprovado: { type: "BOOLEAN" },
            palavrasChave: { type: "ARRAY", items: { type: "STRING" } },
            analise: { type: "STRING" },
          },
          required: ["aprovado", "palavrasChave", "analise"],
        },
        tese: {
          type: "OBJECT",
          properties: {
            eixo1: { type: "STRING" },
            eixo2: { type: "STRING" },
            linhaRaciocinio: { type: "STRING" },
          },
          required: ["eixo1", "eixo2", "linhaRaciocinio"],
        },
        progressaoConexao: {
          type: "OBJECT",
          properties: {
            progressaoOk: { type: "BOOLEAN" },
            conectivosOk: { type: "BOOLEAN" },
            conectivosUsados: { type: "ARRAY", items: { type: "STRING" } },
            melhoriaSintatica: { type: "STRING" },
          },
          required: ["progressaoOk", "conectivosOk", "conectivosUsados", "melhoriaSintatica"],
        },
      },
      required: ["contexto", "temaProblema", "tese", "progressaoConexao"],
    },
    desenvolvimentos: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING", enum: ["D1", "D2"] },
          paragrafo: { type: "INTEGER" },
          topicoFrasal: {
            type: "OBJECT",
            properties: {
              aprovado: { type: "BOOLEAN" },
              analise: { type: "STRING" },
            },
            required: ["aprovado", "analise"],
          },
          repertorio: {
            type: "OBJECT",
            properties: {
              nome: { type: "STRING" },
              relacionado: { type: "BOOLEAN" },
              convence: { type: "BOOLEAN" },
              analise: { type: "STRING" },
              melhoria: { type: "STRING" },
              sugestaoCriativa: { type: "STRING" },
            },
            required: ["nome", "relacionado", "convence", "analise", "melhoria", "sugestaoCriativa"],
          },
          conclusaoParagrafo: {
            type: "OBJECT",
            properties: {
              conectivoInicial: { type: "STRING" },
              conectivoFechamento: { type: "STRING" },
              analise: { type: "STRING" },
            },
            required: ["conectivoInicial", "conectivoFechamento", "analise"],
          },
        },
        required: ["id", "paragrafo", "topicoFrasal", "repertorio", "conclusaoParagrafo"],
      },
    },
    conclusao: {
      type: "OBJECT",
      properties: {
        topicoFrasal: {
          type: "OBJECT",
          properties: {
            aprovado: { type: "BOOLEAN" },
            analise: { type: "STRING" },
          },
          required: ["aprovado", "analise"],
        },
        elementosIntervencao: {
          type: "OBJECT",
          properties: {
            agente: {
              type: "OBJECT",
              properties: {
                status: { type: "STRING", enum: ["PRESENTE", "PARCIAL", "AUSENTE"] },
                textoExtraido: { type: "STRING" },
                observacao: { type: "STRING" },
              },
              required: ["status", "textoExtraido", "observacao"],
            },
            acao: {
              type: "OBJECT",
              properties: {
                status: { type: "STRING", enum: ["PRESENTE", "PARCIAL", "AUSENTE"] },
                textoExtraido: { type: "STRING" },
                observacao: { type: "STRING" },
              },
              required: ["status", "textoExtraido", "observacao"],
            },
            meioModo: {
              type: "OBJECT",
              properties: {
                status: { type: "STRING", enum: ["PRESENTE", "PARCIAL", "AUSENTE"] },
                textoExtraido: { type: "STRING" },
                observacao: { type: "STRING" },
              },
              required: ["status", "textoExtraido", "observacao"],
            },
            efeito: {
              type: "OBJECT",
              properties: {
                status: { type: "STRING", enum: ["PRESENTE", "PARCIAL", "AUSENTE"] },
                textoExtraido: { type: "STRING" },
                observacao: { type: "STRING" },
              },
              required: ["status", "textoExtraido", "observacao"],
            },
            detalhamento: {
              type: "OBJECT",
              properties: {
                status: { type: "STRING", enum: ["PRESENTE", "PARCIAL", "AUSENTE"] },
                textoExtraido: { type: "STRING" },
                observacao: { type: "STRING" },
              },
              required: ["status", "textoExtraido", "observacao"],
            },
          },
          required: ["agente", "acao", "meioModo", "efeito", "detalhamento"],
        },
        fechamento: {
          type: "OBJECT",
          properties: {
            retomouIntroducao: { type: "BOOLEAN" },
            analise: { type: "STRING" },
          },
          required: ["retomouIntroducao", "analise"],
        },
      },
      required: ["topicoFrasal", "elementosIntervencao", "fechamento"],
    },
    avaliacaoGlobal: {
      type: "OBJECT",
      properties: {
        elogioGeral: { type: "STRING" },
        oQueFalta: { type: "STRING" },
        notaMatrizGramatical: { type: "STRING" },
        resumoConselheiro: { type: "STRING" },
      },
      required: ["elogioGeral", "oQueFalta", "notaMatrizGramatical", "resumoConselheiro"],
    },
    desviosGramaticais: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          localizacao: { type: "STRING" },
          paragrafo: { type: "INTEGER" },
          linha: { type: "INTEGER" },
          tipoErro: { type: "STRING" },
          trechoOriginal: { type: "STRING" },
          explicacaoPedagogica: { type: "STRING" },
          correcaoSugerida: { type: "STRING" },
        },
        required: [
          "id",
          "localizacao",
          "paragrafo",
          "linha",
          "tipoErro",
          "trechoOriginal",
          "explicacaoPedagogica",
          "correcaoSugerida",
        ],
      },
    },
    competencias: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING", enum: ["C1", "C2", "C3", "C4", "C5"] },
          nome: { type: "STRING" },
          nota: { type: "INTEGER" },
          justificativa: { type: "STRING" },
        },
        required: ["id", "nome", "nota", "justificativa"],
      },
    },
    destaquesInterativos: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          trecho: { type: "STRING" },
          categoria: {
            type: "STRING",
            enum: ["gramatica", "conectivo", "repertorio", "intervencao"],
          },
          titulo: { type: "STRING" },
          detalhe: { type: "STRING" },
          sugestao: { type: "STRING" },
        },
        required: ["trecho", "categoria", "titulo", "detalhe"],
      },
    },
  },
  required: [
    "tituloDocumento",
    "temaIdentificado",
    "notaFinal",
    "transcricao",
    "introducao",
    "desenvolvimentos",
    "conclusao",
    "avaliacaoGlobal",
    "desviosGramaticais",
    "competencias",
    "destaquesInterativos",
  ],
};
