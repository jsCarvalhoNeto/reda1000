import { EssayAnalysisResult } from "@/types/essay";

export const DEMO_ESSAYS: Record<string, EssayAnalysisResult> = {
  sus840: {
    tituloDocumento: "Análise de Redação — Tema: Valorização e Acesso ao SUS",
    temaIdentificado: "Desafios da Valorização e Acesso ao SUS",
    notaFinal: 840,
    deltaEvolucao: 80,
    transcricao: [
      {
        paragrafo: 1,
        papel: "Introdução",
        texto:
          "Durante a pandemia de Covid-19 (2020), a dificuldade de acesso digital nas periferias evidenciou que milhares de cidadãos permaneciam vulneráveis ao ambiente. Entretanto, esse cenário não é pontual e reflete a ausência de valorização do Sistema Único de Saúde. Nessa perspectiva, a falta de conhecimento social sobre a saúde e a necessidade de ampliar a equidade em políticas públicas sustentam o problema.",
      },
      {
        paragrafo: 2,
        papel: "Desenvolvimento 1",
        texto:
          "Diante desse cenário, a escassez do ensino sobre saúde compromete o uso preventivo do SUS para prevenir a proliferação de enfermidades. De forma análoga à Revolta da Vacina (1904), quando a falta de informação gerou desconfiança sobre o que poderia acontecer ao ser administrada, hoje a ausência de implementação de informação aos cidadãos sobre o uso da saúde agrava crises de epidemias ou o surgimento de doenças e reduz a proliferação de hábitos preventivos.",
      },
      {
        paragrafo: 3,
        papel: "Desenvolvimento 2",
        texto:
          'Ademais, a falta de investimento em políticas públicas gera barreiras socioeconômicas no atendimento. Na música "Sem Saúde", de Gabriel, o Pensador, retratam-se as dificuldades envolvendo filas extensas, baixos salários e privilégios de elites, expondo riscos à saúde local. Nesse contexto, a carência de recursos perpetua desigualdades estruturais no acesso universal.',
      },
      {
        paragrafo: 4,
        papel: "Conclusão",
        texto:
          "Portanto, medidas são urgentes para reverter esse quadro. Cabe às instituições de saúde e profissionais, junto ao Governo Federal, ensinar a população a usufruir de seus direitos e realizar investimentos por meio da priorização da área, por meio de postagens em redes sociais e palestras ministradas por agentes de saúde nas comunidades. Assim, será possível ampliar o número de indivíduos nas unidades, diminuir riscos de epidemias e gerar equidade e cidadania.",
      },
    ],
    introducao: {
      contexto: {
        aprovado: true,
        deveMudar: false,
        analise:
          "A alusão à pandemia de Covid-19 (2020) e à dificuldade de acesso digital nas periferias contextualiza muito bem o tema.",
        sugestaoAlternativa:
          "Abordar a criação do SUS na Carta Magna de 1988 como conquista de saúde universal, em contraponto com a exclusão digital/geográfica ocorrida na pandemia.",
      },
      temaProblema: {
        aprovado: true,
        palavrasChave: [
          "ausência de valorização do Sistema Único de Saúde",
          "equidade",
          "políticas públicas",
        ],
        analise:
          "O tema é exposto com clareza e as palavras-chave principais surgem no final da introdução.",
      },
      tese: {
        eixo1: "Falta de conhecimento social sobre a saúde",
        eixo2: "Necessidade de ampliar a equidade em políticas públicas",
        linhaRaciocinio: "Adição de Causas (Causa 1 + Causa 2)",
      },
      progressaoConexao: {
        progressaoOk: true,
        conectivosOk: true,
        conectivosUsados: ["Entretanto", "Nessa perspectiva"],
        melhoriaSintatica:
          'A expressão "vulneráveis ao ambiente" ficou vaga no contexto (melhor: "vulneráveis à desinformação e ao contágio").',
      },
    },
    desenvolvimentos: [
      {
        id: "D1",
        paragrafo: 2,
        topicoFrasal: {
          aprovado: true,
          analise:
            "Apresenta a escassez do ensino sobre saúde como causa da falta de uso preventivo do SUS. É um argumento bastante razoável.",
        },
        repertorio: {
          nome: "Revolta da Vacina (1904)",
          relacionado: true,
          convence: true,
          analise: "O paralelo histórico é pertinente e legitima a discussão sobre desinformação.",
          melhoria:
            "O texto precisa explicar melhor como a falta de comunicação oficial na Revolta da Vacina se assemelha à falta atual de educação preventiva.",
          sugestaoCriativa:
            'O conceito de "Literacia em Saúde" (OMS) ou a ideia de "Pedagogia da Autonomia" (Paulo Freire), demonstrando que sem educação emancipatória a saúde torna-se puramente reativa.',
        },
        conclusaoParagrafo: {
          conectivoInicial: "Diante desse cenário",
          conectivoFechamento: "—",
          analise:
            'Fecha confirmando a necessidade de educação preventiva. O conectivo inicial "Diante desse cenário" faz boa transição.',
        },
      },
      {
        id: "D2",
        paragrafo: 3,
        topicoFrasal: {
          aprovado: true,
          analise:
            "Argumenta que a falta de investimento em políticas públicas gera barreiras socioeconômicas no atendimento. Argumento consistente.",
        },
        repertorio: {
          nome: 'Música "Sem Saúde" (Gabriel, o Pensador)',
          relacionado: true,
          convence: true,
          analise: "O repertório da música é legítimo e produtivo.",
          melhoria:
            "A análise ficou um pouco extensa ao listar muitos problemas (filas, salários, elites), o que gerou poluição argumentativa.",
          sugestaoCriativa:
            'Conceito de "Necropolítica" (Achille Mbembe) ou "Cidadania Mutilada" (Milton Santos) para fundamentar como o subfinanciamento público seletivo deixa as classes populares à margem do direito básico.',
        },
        conclusaoParagrafo: {
          conectivoInicial: "Ademais",
          conectivoFechamento: "Nesse contexto",
          analise:
            'Encerrado com "Nesse contexto". Conectivo inicial "Ademais" conecta adequadamente com o D1.',
        },
      },
    ],
    conclusao: {
      topicoFrasal: {
        aprovado: true,
        analise:
          "Inicia diretamente com a proposta, retomando indiretamente as causas do D1 e D2.",
      },
      elementosIntervencao: {
        agente: {
          status: "PRESENTE",
          textoExtraido: "Instituições de saúde e profissionais / Governo Federal",
          observacao: "Agentes claramente definidos.",
        },
        acao: {
          status: "PRESENTE",
          textoExtraido:
            "Ensinar a população a usufruir de seus direitos / Realizar investimentos priorizando a saúde",
          observacao: "Ações duplas alinhadas aos dois eixos argumentativos.",
        },
        meioModo: {
          status: "PRESENTE",
          textoExtraido:
            "Postagens em redes sociais, palestras de agentes comunitários e priorização orçamentária",
          observacao: "Meios bem estabelecidos, embora o orçamentário possa ser mais específico.",
        },
        efeito: {
          status: "PRESENTE",
          textoExtraido:
            "Ampliar o número de indivíduos nas unidades, diminuir riscos de epidemias, gerar equidade e cidadania",
          observacao: "Finalidade clara e coerente.",
        },
        detalhamento: {
          status: "PARCIAL",
          textoExtraido: "redes sociais e palestras ministradas por agentes de saúde nas comunidades",
          observacao: "Detalhou os meios, mas faltou articulação explícita com a introdução.",
        },
      },
      fechamento: {
        retomouIntroducao: false,
        analise:
          'Encerra de forma coerente mencionando "equidade e cidadania", porém faltou uma retomada explícita ao elemento introdutório (pandemia de Covid-19 ou exclusão periférica).',
      },
    },
    avaliacaoGlobal: {
      elogioGeral:
        "O texto demonstra uma evolução significativa em relação ao planejamento argumentativo e ao uso de repertórios (Revolta da Vacina e Gabriel, o Pensador). A tese é desenvolvida com lógica clara.",
      oQueFalta:
        "Maior precisão sintática e correção de pequenas repetições de palavras e desvios de pontuação/regência.",
      notaMatrizGramatical:
        "Desvios pontuais de regência, redundância lexical e imprecisão vocabular mantêm a C1 em 160 pontos.",
      resumoConselheiro:
        'O texto evoluiu bastante em repertório e estrutura argumentativa (+80 pontos). Para atingir a nota 900+, busque variar sinônimos para evitar a repetição de palavras como "saúde" e "proliferação", e retome o gancho histórico/contextual da introdução na última frase da proposta de intervenção.',
    },
    desviosGramaticais: [
      {
        id: "err-1",
        localizacao: "§1 - L. 3",
        paragrafo: 1,
        linha: 3,
        tipoErro: "Inadequação vocabular/sintática",
        trechoOriginal: "vulneráveis ao ambiente",
        explicacaoPedagogica:
          "Sentido vago e impreciso. Faltou especificar a que tipo de ambiente ou risco estavam vulneráveis.",
        correcaoSugerida: "vulneráveis ao contágio e à desinformação.",
      },
      {
        id: "err-2",
        localizacao: "§2 - L. 2",
        paragrafo: 2,
        linha: 2,
        tipoErro: "Ambiguidade / Redundância sintática",
        trechoOriginal: "prevenir a proliferação",
        explicacaoPedagogica:
          'Repetição da palavra "proliferação" no mesmo parágrafo (linhas 2 e 6). Substitua por sinônimos como "disseminação" ou "propagação".',
        correcaoSugerida: "prevenir a disseminação de doenças.",
      },
      {
        id: "err-3",
        localizacao: "§2 - L. 4",
        paragrafo: 2,
        linha: 4,
        tipoErro: "Construção passiva truncada",
        trechoOriginal: "sobre o que poderia acontecer ao ser administrada",
        explicacaoPedagogica:
          "Falta de clareza do sujeito passivo (a vacina é que seria administrada, não a população).",
        correcaoSugerida: "sobre os efeitos da substância ao ser administrada.",
      },
      {
        id: "err-4",
        localizacao: "§2 - L. 5",
        paragrafo: 2,
        linha: 5,
        tipoErro: "Regência nominal e concisão",
        trechoOriginal: "implementação de informação aos cidadãos sobre o uso da saúde",
        explicacaoPedagogica:
          'A expressão "uso da saúde" é inadequada. O correto é "uso dos serviços de saúde" ou "cuidado com a saúde".',
        correcaoSugerida: "democratização de informações sobre os serviços de saúde...",
      },
      {
        id: "err-5",
        localizacao: "§2 - L. 7",
        paragrafo: 2,
        linha: 7,
        tipoErro: "Pleonasmo/Redundância",
        trechoOriginal: "crises de epidemias ou o surgimento de doenças",
        explicacaoPedagogica:
          "Epidemia já pressupõe crise/doença. Torna a frase redundante.",
        correcaoSugerida: "surtos epidêmicos ou agravamento de enfermidades.",
      },
      {
        id: "err-6",
        localizacao: "§3 - L. 4",
        paragrafo: 3,
        linha: 4,
        tipoErro: "Concordância verbal",
        trechoOriginal: "retratam-se as dificuldades",
        explicacaoPedagogica:
          'Embora gramaticalmente aceitável pela apassivação, fica melhor ajustado no singular concordando com a obra: "retrata-se a dificuldade...".',
        correcaoSugerida: "retrata-se a dificuldade de acesso...",
      },
      {
        id: "err-7",
        localizacao: "§3 - L. 7",
        paragrafo: 3,
        linha: 7,
        tipoErro: "Uso inadequado de adjetivo",
        trechoOriginal: "riscos à saúde local",
        explicacaoPedagogica:
          'O termo "local" reduz indevidamente o alcance do problema, que é de âmbito nacional/coletivo.',
        correcaoSugerida: "riscos à saúde coletiva.",
      },
      {
        id: "err-8",
        localizacao: "§4 - L. 4",
        paragrafo: 4,
        linha: 4,
        tipoErro: "Falta de especificidade na ação",
        trechoOriginal: "por meio da priorização da área",
        explicacaoPedagogica:
          "Expressão genérica para descrever o meio/modo de intervenção. Deve-se indicar a fonte ou mecanismo de priorização (ex: repasse do Orçamento Geral da União).",
        correcaoSugerida:
          "mediante o direcionamento de verbas do Orçamento Geral da União...",
      },
    ],
    competencias: [
      {
        id: "C1",
        nome: "Norma Culta",
        nota: 160,
        justificativa:
          "Houve diminuição significativa no número de erros formais em relação ao texto anterior. Apresenta deslizes pontuais de regência, redundância de vocabulário e escolha imprecisa de termos.",
      },
      {
        id: "C2",
        nome: "Compreensão do Tema",
        nota: 180,
        justificativa:
          "Excelente apropriação do tema. Uso de repertório legitimado e produtivo (Revolta da Vacina e Gabriel, o Pensador).",
      },
      {
        id: "C3",
        nome: "Projeto de Texto",
        nota: 160,
        justificativa:
          "Projeto bem planejado e tese consistente. O D2 acumulou muitas informações secundárias da música, prejudicando ligeiramente a profundidade de um argumento central.",
      },
      {
        id: "C4",
        nome: "Coesão / Conectivos",
        nota: 160,
        justificativa:
          'Operadores inter e intraparágrafos presentes e diversificados. Ocorre leve repetição de termos no interior dos parágrafos (ex: "proliferação", "saúde").',
      },
      {
        id: "C5",
        nome: "Proposta de Intervenção",
        nota: 180,
        justificativa:
          "Proposta completa contendo os 5 elementos (Agente, Ação, Meio, Efeito e Detalhamento dos meios). Perdeu 20 pontos por falta de articulação direta com o repertório da introdução no encerramento.",
      },
    ],
    destaquesInterativos: [
      {
        trecho: "vulneráveis ao ambiente",
        categoria: "gramatica",
        titulo: "Inadequação vocabular (§1 - L. 3)",
        detalhe: "Sentido vago e impreciso.",
        sugestao: "vulneráveis ao contágio e à desinformação.",
      },
      {
        trecho: "Entretanto",
        categoria: "conectivo",
        titulo: "Operador Adversativo",
        detalhe: "Articula a contraposição entre o recorte da pandemia e a persistência do problema.",
      },
      {
        trecho: "Revolta da Vacina (1904)",
        categoria: "repertorio",
        titulo: "Repertório Histórico (D1)",
        detalhe: "Paralelo produtivo sobre desinformação em saúde pública.",
        sugestao: "Associar à Literacia em Saúde (OMS).",
      },
      {
        trecho: 'música "Sem Saúde", de Gabriel, o Pensador',
        categoria: "repertorio",
        titulo: "Repertório Sociocultural (D2)",
        detalhe: "Legítimo, mas evite listar muitos problemas secundários da letra.",
      },
      {
        trecho: "instituições de saúde e profissionais, junto ao Governo Federal",
        categoria: "intervencao",
        titulo: "Agente (C5)",
        detalhe: "Responsáveis pela execução da proposta.",
      },
      {
        trecho: "palestras ministradas por agentes de saúde nas comunidades",
        categoria: "intervencao",
        titulo: "Meio + Detalhamento (C5)",
        detalhe: "Especificação prática de como a ação será executada.",
      },
    ],
  },
  pufendorf960: {
    tituloDocumento: "Avaliação Crítica de Redação — Samuel Pufendorf & SUS",
    temaIdentificado:
      "Os desafios para a valorização e a garantia da universalidade do Sistema Único de Saúde (SUS) no Brasil contemporâneo",
    notaFinal: 960,
    deltaEvolucao: null,
    transcricao: [
      {
        paragrafo: 1,
        papel: "Introdução",
        texto:
          "Para o jurista Samuel Pufendorf, o direito natural exige a preservação da sociedade como base do pacto social. Porém, no Brasil contemporâneo, a desvalorização do SUS e o desrespeito ao Artigo 196 da CF/88 comprometem essa garantia. Assim, tanto a falta de fiscalização estatal quanto a injustiça social impedem a universalidade da saúde.",
      },
      {
        paragrafo: 2,
        papel: "Desenvolvimento 1",
        texto:
          "Nessa perspectiva, a apatia estatal favorece a permanência de profissionais imprudentes nas unidades de atendimento. Segundo Milton Santos, a existência de direitos legais sem eficácia prática configura uma Cidadania Mutilada. Logo, a inação governamental perpetua a precarização do serviço público.",
      },
      {
        paragrafo: 3,
        papel: "Desenvolvimento 2",
        texto:
          "Ademais, a ausência de equidade social restringe o acesso pleno à um atendimento digno nas periferias. Sob a ótica de John Rawls, em Justiça como Equidade, deve-se priorizar os mais vulneráveis para corrigir assimetrias estruturais. Dessa forma, a escassez de recursos impede a consolidação da igualdade constitucional.",
      },
      {
        paragrafo: 4,
        papel: "Conclusão",
        texto:
          "Portanto, é imperativo valorizar o SUS. Cabe ao Governo Federal, por meio dos ministérios competentes, promover um Plano Nacional à Saúde Garantida, mediante o direcionamento de verbas públicas para escolas e comunidades, com palestras, debates e rodas de conversa liderados por profissionais da saúde. Com isso, busca-se incentivar a mobilização popular, garantir a equidade social e transformar o Brasil, honrando o pacto social pufendorfiano.",
      },
    ],
    introducao: {
      contexto: {
        aprovado: true,
        deveMudar: false,
        analise:
          "O repertório de Samuel Pufendorf sobre o direito natural e a preservação da sociedade é apropriado e prepara o leitor.",
        sugestaoAlternativa:
          "Para aumentar a densidade argumentativa, pode-se explicitar como o pacto social pufendorfiano exige a saúde plena como pré-requisito da sobrevivência biológica e social.",
      },
      temaProblema: {
        aprovado: true,
        palavrasChave: ["desvalorização do SUS", "Artigo 196 da CF/88", "universalidade"],
        analise:
          "O problema é apresentado de forma inequívoca através da desvalorização do SUS e do desrespeito ao Artigo 196 da CF/88. As palavras-chave centrais constam expressamente.",
      },
      tese: {
        eixo1: "Falta de fiscalização estatal (D1)",
        eixo2: "Injustiça social / ausência de equidade (D2)",
        linhaRaciocinio:
          "Causa e efeito / adição de fatores causais (dois vetores que alimentam a precariedade do sistema)",
      },
      progressaoConexao: {
        progressaoOk: true,
        conectivosOk: true,
        conectivosUsados: ["Porém", "Assim", "tanto... quanto"],
        melhoriaSintatica:
          "Ajustar a pontuação no fechamento para evitar truncamento ou encadeamento denso.",
      },
    },
    desenvolvimentos: [
      {
        id: "D1",
        paragrafo: 2,
        topicoFrasal: {
          aprovado: true,
          analise:
            'Apresenta a apatia estatal como causa da permanência de profissionais imprudentes. É um argumento razoável, porém afunila excessivamente o debate (reduz a "falta de fiscalização estatal" apenas à imprudência profissional, ignorando desvios orçamentários ou falta de infraestrutura).',
        },
        repertorio: {
          nome: 'Milton Santos ("Cidadania Mutilada")',
          relacionado: true,
          convence: true,
          analise: "A prova relaciona-se à ideia de direitos legais sem eficácia prática.",
          melhoria:
            'Conectar a teoria de Milton Santos mais à omissão de fiscalização do que à "imprudência de profissionais", tornando o nexo causal mais amplo e convincente.',
          sugestaoCriativa:
            'Empregar o conceito de "Negligência Institucional" de Hannah Arendt ou a "Banalização da Omissão" para reforçar como o Estado naturaliza a falha na fiscalização dos serviços públicos de saúde.',
        },
        conclusaoParagrafo: {
          conectivoInicial: "Nessa perspectiva",
          conectivoFechamento: "Logo",
          analise:
            'Encerra conectando a inação governamental à manutenção da mutilação social. Conectivo de início ("Nessa perspectiva") adequado.',
        },
      },
      {
        id: "D2",
        paragrafo: 3,
        topicoFrasal: {
          aprovado: true,
          analise:
            "Associa a falta de saúde plena nas periferias à ausência de equidade social. Argumento muito sólido e coerente com a tese.",
        },
        repertorio: {
          nome: 'John Rawls ("Justiça como Equidade")',
          relacionado: true,
          convence: true,
          analise:
            "A autoridade fundamenta com precisão a necessidade de priorizar os vulneráveis.",
          melhoria: "Articulação já está muito sólida.",
          sugestaoCriativa:
            'Articular Rawls com o conceito de "Biopolítica" de Michel Foucault ou a "Necropolítica" de Achille Mbembe, demonstrando como a escassez seletiva nas periferias dita a distribuição desigual da vida e da morte.',
        },
        conclusaoParagrafo: {
          conectivoInicial: "Ademais",
          conectivoFechamento: "Dessa forma",
          analise:
            'Conclui mostrando que a escassez de recursos gera assimetria estrutural e impede a consolidação da igualdade. Conectivo interparágrafo ("Ademais") perfeito.',
        },
      },
    ],
    conclusao: {
      topicoFrasal: {
        aprovado: true,
        analise: "Retoma a necessidade de valorizar o SUS, articulando os problemas discutidos.",
      },
      elementosIntervencao: {
        agente: {
          status: "PRESENTE",
          textoExtraido: "Governo Federal, por meio dos ministérios competentes",
          observacao: "Agente institucional bem especificado.",
        },
        acao: {
          status: "PRESENTE",
          textoExtraido: "Promover um Plano Nacional de Saúde Garantida",
          observacao: "Ajustar apenas a crase no nome do plano.",
        },
        meioModo: {
          status: "PRESENTE",
          textoExtraido:
            "Direcionamento de verbas públicas para escolas e comunidades, mediante palestras, debates e rodas de conversa",
          observacao: "Meio executável e concreto.",
        },
        efeito: {
          status: "PRESENTE",
          textoExtraido:
            "Incentivar a mobilização popular, garantir a equidade social e transformar o Brasil",
          observacao: "Retoma explicitamente a discussão da introdução.",
        },
        detalhamento: {
          status: "PRESENTE",
          textoExtraido: "palestras, debates e rodas de conversa liderados por profissionais da saúde",
          observacao: "As especificações do modo atuam como detalhamento completo.",
        },
      },
      fechamento: {
        retomouIntroducao: true,
        analise: "Retoma com maestria o pacto social pufendorfiano apresentado na introdução.",
      },
    },
    avaliacaoGlobal: {
      elogioGeral:
        "O texto demonstra domínio exemplar da norma culta e da estrutura dissertativo-argumentativa. A articulação dos repertórios socioculturais (Pufendorf, Milton Santos e Rawls) é perfeita e legitimada.",
      oQueFalta:
        'A única ressalva argumentativa reside na Competência 3, pois o D1 promete discutir a "falta de fiscalização estatal", mas limita a causa à "imprudência de profissionais".',
      notaMatrizGramatical:
        "Com a desconsideração da falha de digitação e a reclassificação do afunilamento do D1 para a Competência 3, registra-se apenas 1 desvio formal direto. Conforme os critérios do INEP (limite de até 2 erros leves), a pontuação na C1 é fixada na nota máxima (200 pontos).",
      resumoConselheiro:
        "Sanado o afunilamento argumentativo do D1 e corrigida a crase em D2, o texto atinge o padrão nota 1000.",
    },
    desviosGramaticais: [
      {
        id: "err-p1",
        localizacao: "D2",
        paragrafo: 3,
        linha: 1,
        tipoErro: "Crase Proibida",
        trechoOriginal: "acesso pleno à um atendimento",
        explicacaoPedagogica:
          'Ocorreu crase antes de artigo indefinido masculino ("um"). Regra: Não há crase diante de palavras masculinas ou artigos indefinidos.',
        correcaoSugerida: "acesso pleno a um atendimento",
      },
      {
        id: "err-p2",
        localizacao: "Conclusão",
        paragrafo: 4,
        linha: 2,
        tipoErro: "Regência / Crase Indevida",
        trechoOriginal: "Plano Nacional à Saúde Garantida",
        explicacaoPedagogica:
          'Em nomes formais de projetos/planos, utiliza-se a preposição "de" ou a regência adequada sem crase indevida.',
        correcaoSugerida: "Plano Nacional de Saúde Garantida",
      },
    ],
    competencias: [
      {
        id: "C1",
        nome: "Norma Culta",
        nota: 200,
        justificativa:
          "Domínio da norma culta da língua escrita (apenas 1 desvio de crase identificado, dentro da tolerância máxima do INEP).",
      },
      {
        id: "C2",
        nome: "Compreensão do Tema",
        nota: 200,
        justificativa:
          "Compreensão exemplar do tema e repertórios legitimados e produtivos (Pufendorf, Milton Santos, Rawls).",
      },
      {
        id: "C3",
        nome: "Projeto de Texto",
        nota: 160,
        justificativa:
          "Afunilamento argumentativo pontual no D1 ao focar em imprudência de profissionais em vez da omissão estatal ampla.",
      },
      {
        id: "C4",
        nome: "Coesão / Conectivos",
        nota: 200,
        justificativa: "Coesão inter e intraparágrafos excelente.",
      },
      {
        id: "C5",
        nome: "Proposta de Intervenção",
        nota: 200,
        justificativa:
          "Elaboração completa da proposta de intervenção contendo todos os 5 elementos e respeito aos direitos humanos.",
      },
    ],
    destaquesInterativos: [
      {
        trecho: "Samuel Pufendorf",
        categoria: "repertorio",
        titulo: "Repertório Filosófico (Introdução)",
        detalhe: "Excelente fundamentação pelo direito natural e pacto social.",
      },
      {
        trecho: "Milton Santos",
        categoria: "repertorio",
        titulo: "Cidadania Mutilada (D1)",
        detalhe: "Repertório produtivo para contrapor lei e prática.",
      },
      {
        trecho: "John Rawls",
        categoria: "repertorio",
        titulo: "Justiça como Equidade (D2)",
        detalhe: "Fundamenta com precisão a priorização dos vulneráveis.",
      },
      {
        trecho: "acesso pleno à um atendimento",
        categoria: "gramatica",
        titulo: "Crase Proibida (D2)",
        detalhe: 'Não ocorre crase antes de artigo indefinido masculino ("um").',
        sugestao: "acesso pleno a um atendimento",
      },
      {
        trecho: "Plano Nacional à Saúde Garantida",
        categoria: "gramatica",
        titulo: "Regência / Crase Indevida (Conclusão)",
        detalhe: 'Em nomes formais de planos, utiliza-se a preposição "de".',
        sugestao: "Plano Nacional de Saúde Garantida",
      },
      {
        trecho: "Governo Federal, por meio dos ministérios competentes",
        categoria: "intervencao",
        titulo: "Agente (C5)",
        detalhe: "Agente claramente identificado.",
      },
    ],
  },
};
