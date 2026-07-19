export const pt = {
  header: {
    title: "Configurações.",
    subtitle: "Personalize o comportamento do aplicativo, ajuste as notificações, alterne as configurações de exibição ou leia as credenciais de código aberto."
  },
  sections: {
    preferences: "Preferências.",
    about: "Sobre.",
    community: "Comunidade e Suporte.",
    providers: "Provedores de Dados."
  },
  preferences: {
    themeAppearance: "Aparência do Tema",
    themeDark: "Modo Escuro",
    themeLight: "Modo Claro",
    appLanguage: "Idioma do App",
    appLanguageSub: "Alterar Idiomas",
    savedGiveaways: "Minha Biblioteca.",
    savedGiveawaysSub: "Acessar jogos salvos",
    notificationSettings: "Configurações de Notificação",
    notificationSettingsSub: "Alternar notificações push",
    appIntroduction: "Integração",
    appIntroductionSub: "Rever o contexto de introdução",
    checkForUpdates: "Versão do App",
    checkForUpdatesSub: "Verificar Atualizações"
  },
  about: {
    developer: "Sobre o Desenvolvedor",
    developerSub: "Visitar portfólio pessoal",
    moreApps: "Mais Aplicativos",
    moreAppsSub: "Explorar repositórios no GitHub",
    socials: "Redes Sociais",
    socialsSub: "Conectar em várias plataformas",
    privacy: "Política de Privacidade",
    privacySub: "Ver Nossa Política de Privacidade."
  },
  community: {
    supportOpenSource: "Apoie o Código Aberto",
    supportOpenSourceSub: "Este aplicativo foi desenvolvido de forma independente e é hospedado gratuitamente. Se você acha útil descobrir essas ofertas, deixar uma estrela no GitHub ajuda muito!",
    starGithub: "Dê-nos uma estrela no GitHub",
    buyCoffee: "Pague-me um Café",
    buyCoffeeSub: "Ajude a manter os servidores ativos e o café fluindo! Uma pequena doação nos permite manter o projeto e adicionar novos recursos.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Site Gamepower",
    gamepowerSub: "Fonte primária de dados de brindes",
    cheapshark: "API CheapShark",
    cheapsharkSub: "API de ofertas de jogos eletrônicos"
  },
  report: {
    title: "Reportar um Erro.",
    subtitle: "Se tiver problemas com o aplicativo, escolha um modelo para enviar um relatório. (Os relatórios serão enviados ao nosso repositório no GitHub para revisão)",
    sectionTitle: "Selecione uma Categoria de Erro",
    categories: {
      ui: "Problema de UI/UX",
      api: "Erro de API / Dados",
      crash: "Desempenho / Fechamento Forçado",
      feature: "Solicitação de Recurso"
    },
    githubCard: {
      title: "Enviar diretamente via GitHub Issues",
      description: "Ao clicar no botão de ação abaixo, o modelo escolhido e os parâmetros do ambiente do seu dispositivo local são compactados com segurança, abrindo a página de rastreamento de problemas do GitHub.",
      buttonText: "Reportar {{category}}"
    },
    attributionCard: {
      title: "Divulgações de APIs de Terceiros",
      description: "Todos os índices de dados visíveis na interface são obtidos diretamente de redes externas através das arquiteturas públicas abertas da Gamepower e da CheapShark. O uso desses índices cumpre diretamente as suas regras de distribuição nativas. O Frapp não manipula listagens de itens individuais, não altera estruturas de preços ou gerencia cronogramas de distribuição. Consequentemente, não podemos garantir a disponibilidade ininterrupta, a precisão ou o suporte contínuo de nós externos ou chaves distribuídas por meio dessas respectivas plataformas."
    },
    footerVersion: "Versão do Frapp v1.1.4",
    alerts: {
      errorTitle: "Erro",
      errorMessage: "Não foi possível redirecionar para o GitHub. Verifique as permissões de roteamento do navegador."
    },
    github: {
      bodyDescription: "Esta ação removerá permanentemente todos os brindes fixados da sua lista de salvos. Você precisará explorar e adicioná-los novamente de forma manual.",
      step1: "Abra o aplicativo",
      step2: "Navegue até...",
      step3: "Observe..."
    }
  },
  footer: {
    build: "Versão do Frapp {{version}}"
  },
  updateModal: {
    title: "Atualização Disponível",
    subtitle: "A {{version}} chegou!",
    description: "Uma nova versão do aplicativo ({{latest}}) está disponível. Atualize a partir da sua versão atual ({{current}}) para acessar as alterações mais recentes!",
    later: "Cancelar",
    updateNow: "Atualizar Agora"
  },
  modals: {
    dismiss: "Apagar Tudo",
    ok: "OK",
    testFailedTitle: "Falha no Alvo de Teste",
    testFailedMessage: "Não foi possível executar o loop de renderização de implantação instantânea. Confirme as permissões locais.",
    upToDateTitle: "Atualizado",
    upToDateMessage: "Você já está executando nossa versão de revisão mais recente ({{version}}). Nenhuma atualização é necessária.",
    upToDateAction: "Incrível",
    checkFailedTitle: "Falha na Verificação",
    checkFailedMessage: "Não foi possível concluir as consultas de busca neste momento. Verifique seu índice de conectividade e tente novamente.",
    socialsTitle: "Compartilhar Promo",
    languageTitle: "Selecionar Idioma"
  },
  giveaways: {
    title: "Brindes.",
    summary: {
      prefix: "Encontramos ",
      midActive: " brindes de jogos ativos em ",
      midWorth: ", avaliados em um total de ",
      suffix: ". Resgate-os antes que expirem!"
    },
    platforms: {
      all: "Todos",
      pc: "PC",
      steam: "Steam",
      epic: "Epic",
      gog: "GOG",
      ps4: "PS4",
      ps5: "PS5",
      xboxSeries: "Xbox Series",
      xboxOne: "Xbox One",
      switch: "Switch",
      android: "Android",
      ios: "iOS",
      drmFree: "Sem DRM",
      itchio: "itch.io"
    },
    error: {
      title: "Conexão Interrompida",
      description: "Não conseguimos sincronizar com os canais de busca ascendentes no momento. Verifique seu acesso à internet e tente novamente.",
      retryButton: "Repetir Conexão"
    },
    empty: {
      title: "Nenhum Brinde Encontrado",
      description: "Não há brindes ativos disponíveis para esta plataforma no momento.",
      viewAllButton: "Ver Todas as Plataformas"
    },
    tracking: {
      days_left: "Restam {{count}} Dias",
      day_left: "Resta 1 Dia",
      ends_today: "Termina Hoje",
      expired: "Expirado",
      keys_left: "Chaves Restantes: {{count}}",
      instructions_title: "Instruções para Resgatar:"
    },
    pagination: {
      previous: "Anterior",
      next: "Próxima Página"
    }
  },
  giveaways1: {
    summary: {
      prefix: "Você tem ",
      midActive: " jogos salvos ",
      midWorth: ", avaliados em um total de ",
      suffix: ". Resgate-os antes que expirem!"
    },
    empty: {
      viewAllButton: "Explorar o Aplicativo"
    },
    delete: {
      title: "Excluir todos os jogos?",
      description: "Esta ação removerá permanentemente todos os brindes fixados da sua lista de salvos. Você precisará explorar e adicioná-los novamente de forma manual.",
      confirmButton: "Apagar Tudo"
    }
  },
  deals: {
    title: "Ofertas de Jogos.",
    titleClaim: "Resgatar Oferta.",
    claim: "Resgatar Oferta",
    retailer: "Vendedor",
    store: "Loja",
    free_uppercase: "GRÁTIS",
    share_message: "🔥 Alerta de Oferta: {{title}} baixou para {{price}} (Economia de {{saved}}) no {{platform}}!\nConsiga aqui: {{url}}",
    save_amount: "{{amount}}% DE DESCONTO",
    hot_deal: "Oferta de Alto Valor",
    rating: "{{percent}}",
    released: "Termina em: ",
    no_description: "Aproveite esta oferta de valor excepcional antes que o período promocional termine ou as faixas de preço mudem!",
    breakdown_title: "Ver Detalhes",
    breakdown_body: "Economize um total de {{saved}} em relação ao preço de tabela normal de {{original}} (refletindo um sólido desconto de valor de {{percent}}%).",
    summary: {
      prefix: "Analisamos lojas de jogos ativas e descobrimos ",
      midActive: " descontos massivos ao vivo em ",
      suffix: ". Toque em qualquer título para garantir sua chave!"
    },
    stores: {
      all: "Todas as Lojas",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "Conexão Interrompida",
      description: "Não conseguimos sincronizar com os servidores agora. Certifique-se de que seu dispositivo está online e vamos tentar novamente.",
      retryButton: "Repetir Conexão"
    },
    empty: {
      title: "Nenhum Resultado Encontrado",
      description: "Nenhuma oferta ativa encontrada nesta categoria de loja.",
      resetButton: "Redefinir Filtros"
    },
    pagination: {
      prev: "Anterior",
      next: "Próximos Jogos"
    }
  },
  months: {
    january: "Janeiro",
    february: "Fevereiro",
    march: "Março",
    april: "Abril",
    may: "Maio",
    june: "Junho",
    july: "Julho",
    august: "Agosto",
    september: "Setembro",
    october: "Outubro",
    november: "Novembro",
    december: "Dezembro"
  },
  onboarding: {
    welcome: "Bem-vindo ao Frapp",
    legalTitle: "Acordos Legais",
    legalSubtitle: "Por favor, revise as condições de privacidade antes de acessar nossos canais globais de sincronização de dados.",
    title: "Acompanhe brindes de jogos eletrônicos e ofertas de jogos premium.",
    title2: "Receba Brindes e Ofertas",
    description: "O Frapp lida tanto com brindes de jogos quanto com ofertas massivas de jogos eletrônicos. Agregamos as recompensas mais recentes 100% gratuitas e resgatáveis junto com grandes descontos de varejo em todas as lojas para que você sempre jogue mais por menos.",
    privacyHeader: "Estrutura Central de Privacidade e Dados",
    privacyBody: "O Frapp é um agregador de dados de código aberto que unifica seus fluxos de dados dispersos, feeds de API e pontos de contato digitais em um painel único e coeso. Como operamos inteiramente como uma ferramenta local-first, não mantemos armazenamento centralizado, não coletamos estruturas de contas físicas ou rastreamos históricos de telemetria dos usuários. Toda a agregação, processamento e visualização são executados diretamente no seu hardware — o que significa que seus dados nunca são transmitidos ou registrados por um hub mestre externo ou rede administrativa centralizada. Seus perfis de configuração localizados, arquivos de cache históricos e preferências interativas permanecem de forma segura no seu dispositivo.",
    consentLabel: "Aceito os Terminos de Serviço e a Declaração de Privacidade",
    btnStep1: "Continuar",
    btnStep2: "Começar",
    versionLabel: "Frapp • v1.1.4"
  }
} as const;