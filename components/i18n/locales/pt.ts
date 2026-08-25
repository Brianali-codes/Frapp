export const pt = {
  header: {
    title: "Configurações.",
    subtitle: "Personalize o comportamento do aplicativo, ajuste notificações, altere temas de exibição ou leia as licenças de código aberto."
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
    appLanguageSub: "Mudar Idioma",
    savedGiveaways: "Minha Biblioteca.",
    savedGiveawaysSub: "Acessar jogos salvos",
    notificationSettings: "Configurações de Notificação",
    notificationSettingsSub: "Ativar ou desativar notificações push",
    appIntroduction: "Apresentação",
    appIntroductionSub: "Rever apresentação do app",
    checkForUpdates: "Versão do App",
    checkForUpdatesSub: "Verificar Atualizações",
    Report: "Reportar um Bug",
    ReportSub: "Reportar erros ou problemas",
  },
  about: {
    developer: "Sobre o Desenvolvedor",
    developerSub: "Visitar portfólio pessoal",
    moreApps: "Mais Aplicativos",
    moreAppsSub: "Explorar repositórios no GitHub",
    socials: "Redes Sociais",
    socialsSub: "Conectar-se nas redes",
    privacy: "Política de Privacidade",
    privacySub: "Ver nossa Política de Privacidade."
  },
  community: {
    supportOpenSource: "Apoie o Código Aberto",
    supportOpenSourceSub: "Este aplicativo é desenvolvido de forma independente e hospedado gratuitamente. Se você gosta das ofertas, deixar uma estrela no GitHub ajuda muito!",
    starGithub: "Dar uma estrela no GitHub",
    buyCoffee: "Pague-me um Café",
    buyCoffeeSub: "Ajude a manter os servidores ativos! Uma pequena doação nos permite manter o projeto e adicionar novas funcionalidades.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Site Gamepower",
    gamepowerSub: "Fonte principal de jogos gratuitos",
    cheapshark: "CheapShark API",
    cheapsharkSub: "API de promoções de jogos"
  },
  report: {
    title: "Reportar um Bug.",
    subtitle: "Reportar erros ou problemas",
    sectionTitle: "Selecione uma Categoria de Bug",
    categories: {
      ui: "Problema de UI/UX",
      api: "Erro de API / Dados",
      crash: "Desempenho / Erro Inesperado",
      feature: "Sugestão de Recurso"
    },
    githubCard: {
      title: "Enviar diretamente via GitHub Issues",
      description: "Ao clicar no botão abaixo, seus dados selecionados e informações do dispositivo serão preparados para abrir a página do GitHub.",
      buttonText: "Reportar {{category}}"
    },
    attributionCard: {
      title: "Avisos de API de Terceiros",
      description: "Todos os dados exibidos são obtidos diretamente de redes externas pelas arquiteturas públicas do Gamepower e CheapShark. O Frapp não altera preços ou disponibilidades."
    },
    alerts: {
      errorTitle: "Erro",
      errorMessage: "Não foi possível redirecionar para o GitHub. Verifique as permissões do seu navegador."
    },
    github: {
      bodyDescription: "Esta ação removerá permanentemente todos os giveaways salvos da sua lista. Você precisará buscá-los e adicioná-los novamente.",
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
    subtitle: "A versão {{version}} chegou!",
    description: "Uma nova versão do app ({{latest}}) está disponível. Atualize de sua versão atual ({{current}}) para aproveitar as novidades!",
    later: "Cancelar",
    updateNow: "Atualizar Agora"
  },
  modals: {
    dismiss: "Limpar Tudo",
    ok: "OK",
    testFailedTitle: "Falha no Teste",
    testFailedMessage: "Não foi possível executar o ciclo de renderização. Verifique as permissões locais.",
    upToDateTitle: "Atualizado",
    upToDateMessage: "Você já está usando a versão mais recente ({{version}}). Nenhuma atualização necessária.",
    upToDateAction: "Perfeito",
    checkFailedTitle: "Falha na Verificação",
    checkFailedMessage: "Não foi possível verificar no momento. Verifique sua conexão com a internet e tente novamente.",
    failedAction: "Fechar",
    socialsTitle: "Compartilhar Promoção",
    languageTitle: "Selecionar Idioma"
  },
  giveaways: {
    title: "Jogos Grátis (Giveaways).",
    summary: {
      prefix: "Encontramos ",
      midActive: " giveaways ativos em ",
      midWorth: ", avaliados em um total de ",
      suffix: ". Resgate antes que expirem!"
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
      drmFree: "DRM-Free",
      itchio: "itch.io"
    },
    error: {
      title: "Conexão Interrompida",
      description: "Não foi possível conectar aos servidores. Verifique se o seu dispositivo está online e tente novamente.",
      retryButton: "Tentar Novamente"
    },
    empty: {
      title: "Nenhum Giveaway Encontrado",
      description: "Não há giveaways ativos disponíveis para esta plataforma no momento.",
      viewAllButton: "Ver Todas as Plataformas"
    },
    tracking: {
      days_left: "Restam {{count}} dias",
      day_left: "Resta 1 dia",
      ends_today: "Termina Hoje",
      expired: "Expirado",
      keys_left: "Chaves restantes: {{count}}",
      instructions_title: "Instruções para resgatar:"
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
      viewAllButton: "Explorar o App"
    },
    delete: {
      title: "Excluir todos os jogos?",
      description: "Esta ação removerá permanentemente todos os giveaways salvos da sua lista.",
      confirmButton: "Limpar Tudo"
    },
  },
  deals: {
    title: "Promoções de Jogos.",
    titleClaim: "Resgatar Oferta.",
    claim: "Resgatar Oferta",
    retailer: "Vendedor",
    store: "Loja",
    free_uppercase: "GRÁTIS",
    share_message: "🔥 Alerta de Oferta: {{title}} está por apenas {{price}} (Economia de {{saved}}) na plataforma {{platform}}!\nGaranta o seu aqui: {{url}}",
    save_amount: "{{amount}}% OFF",
    hot_deal: "Oferta Destaque",
    rating: "{{percent}}",
    released: "Termina em: ",
    no_description: "Aproveite esta oferta especial antes que o período de promoção termine!",
    breakdown_title: "Ver Detalhes",
    breakdown_body: "Economize {{saved}} em relação ao preço original de {{original}} (desconto de {{percent}}%).",
    summary: {
      prefix: "Buscamos nas lojas digitais e encontramos ",
      midActive: " grandes descontos ativos em ",
      suffix: ". Toque em qualquer jogo para garantir sua chave!"
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
      description: "Não conseguimos sincronizar com os servidores. Certifique-se de estar conectado à internet.",
      retryButton: "Tentar Novamente"
    },
    empty: {
      title: "Nenhum Resultado Encontrado",
      description: "Nenhuma oferta encontrada nesta categoria.",
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
    legalTitle: "Termos Legais",
    legalSubtitle: "Por favor, leia a política de privacidade antes de continuar.",
    title: "Acompanhe jogos grátis e grandes promoções.",
    title2: "Receba Giveaways e Ofertas",
    description: "O Frapp reúne jogos 100% gratuitos e grandes descontos de várias lojas para você jogar mais gastando menos.",
    privacyHeader: "Privacidade e Dados",
    privacyBody: "O Frapp é um agregador de código aberto que funciona totalmente local. Não armazenamos dados em servidores nem rastreamos usuários. Suas preferências ficam salvas apenas no seu dispositivo.",
    consentLabel: "Eu aceito os Termos de Serviço e a Política de Privacidade",
    btnStep1: "Continuar",
    btnStep2: "Começar",
    versionLabel: "Frapp • v1.1.6"
  }
} as const;