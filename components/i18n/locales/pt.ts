export const pt = {
  header: {
    title: "Configurações.",
    subtitle: "Personalize o comportamento do aplicativo, ajuste notificações, altere a exibição ou leia as licenças de código aberto."
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
    appLanguageSub: "Alterar Idioma",
    savedGiveaways: "Minha Biblioteca.",
    savedGiveawaysSub: "Acessar jogos salvos",
    notificationSettings: "Configurações de Notificação",
    notificationSettingsSub: "Ativar/desativar notificações push",
    appIntroduction: "Introdução",
    appIntroductionSub: "Rever apresentação do aplicativo",
    checkForUpdates: "Versão do App",
    checkForUpdatesSub: "Verificar Atualizações",
    Report: "Reportar um Bug",
    ReportSub: "Reportar falhas ou problemas",
  },
  about: {
    developer: "Sobre o Desenvolvedor",
    developerSub: "Visitar portfólio pessoal",
    moreApps: "Mais Aplicativos",
    moreAppsSub: "Explorar repositórios no GitHub",
    socials: "Redes Sociais",
    socialsSub: "Conecte-se em nossas redes",
    privacy: "Política de Privacidade",
    privacySub: "Ver nossa Política de Privacidade."
  },
  community: {
    supportOpenSource: "Apoie o Código Aberto",
    supportOpenSourceSub: "Este aplicativo é desenvolvido independentemente e hospedado gratuitamente. Se ele te ajuda a encontrar ofertas, deixar uma estrela no GitHub nos ajuda muito!",
    starGithub: "Dar uma estrela no GitHub",
    buyCoffee: "Pague-me um Café",
    buyCoffeeSub: "Ajude a manter os servidores ativos! Uma pequena doação nos permite manter o projeto e adicionar novos recursos.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Site Gamepower",
    gamepowerSub: "Fonte principal de jogos gratuitos",
    cheapshark: "CheapShark API",
    cheapsharkSub: "API de ofertas de jogos"
  },
  report: {
    title: "Reportar um Bug.",
    subtitle: "Informar Erros ou Problemas",
    sectionTitle: "Selecione uma Categoria de Bug",
    categories: {
      ui: "Problema de Interface (UI/UX)",
      api: "Erro de API / Dados",
      crash: "Desempenho / Bloqueio",
      feature: "Sugestão de Recurso"
    },
    githubCard: {
      title: "Enviar diretamente via GitHub Issues",
      description: "Ao clicar no botão abaixo, um modelo com os dados do seu dispositivo será gerado e a página de Issues do GitHub será aberta.",
      buttonText: "Reportar {{category}}"
    },
    attributionCard: {
      title: "Avisos de APIs de Terceiros",
      description: "Todos os dados exibidos são obtidos diretamente de redes externas por meio das APIs abertas do Gamepower e CheapShark. O Frapp não manipula listagens, preços ou prazos de distribuição. Portanto, não podemos garantir a disponibilidade ininterrupta de chaves ou serviços externos."
    },
    alerts: {
      errorTitle: "Erro",
      errorMessage: "Não foi possível redirecionar para o GitHub. Verifique as permissões do seu navegador."
    },
    github: {
      bodyDescription: "Esta ação removerá permanentemente todos os jogos salvos da sua biblioteca. Você precisará buscá-los e adicioná-los novamente manualmente.",
      step1: "Abra o aplicativo",
      step2: "Navegue até...",
      step3: "Observe..."
    }
  },
  footer: {
    build: "Frapp Versão {{version}}"
  },
  updateModal: {
    title: "Atualização Disponível",
    subtitle: "A versão {{version}} chegou!",
    description: "Uma nova versão do aplicativo ({{latest}}) está disponível. Atualize sua versão atual ({{current}}) para acessar as últimas novidades!",
    later: "Mais tarde",
    updateNow: "Atualizar Agora"
  },
  modals: {
    dismiss: "Limpar Tudo",
    ok: "OK",
    testFailedTitle: "Falha no Teste",
    testFailedMessage: "Não foi possível executar o loop de renderização. Verifique as permissões locais.",
    upToDateTitle: "Atualizado",
    upToDateMessage: "Você já está usando a versão mais recente ({{version}}). Nenhuma atualização necessária.",
    upToDateAction: "Ótimo",
    checkFailedTitle: "Falha na Verificação",
    checkFailedMessage: "Não foi possível realizar a busca no momento. Verifique sua conexão com a Internet e tente novamente.",
    failedAction: "Fechar",
    socialsTitle: "Compartilhar",
    languageTitle: "Selecionar Idioma"
  },
  giveaways: {
    title: "Jogos Gratuitos.",
    summary: {
      prefix: "Encontramos ",
      midActive: " jogos gratuitos ativos em ",
      midWorth: ", avaliados num total de ",
      suffix: ". Resgate-os antes que expirem!"
    },
    platforms: {
      all: "Todas",
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
      description: "Não foi possível sincronizar com os servidores. Verifique se seu dispositivo está conectado e tente novamente.",
      retryButton: "Tentar Novamente"
    },
    empty: {
      title: "Nenhum Jogo Encontrado",
      description: "Não há jogos gratuitos disponíveis para esta plataforma no momento.",
      viewAllButton: "Ver Todas as Plataformas"
    },
    tracking: {
      days_left: "Restam {{count}} Dias",
      day_left: "Resta 1 Dia",
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
      description: "Esta ação removerá permanentemente todos os jogos salvos da sua lista.",
      confirmButton: "Limpar Tudo"
    },
  },
  deals: {
    title: "Ofertas de Jogos.",
    titleClaim: "Resgatar Oferta.",
    claim: "Resgatar Oferta",
    retailer: "Revendedor",
    store: "Loja",
    free_uppercase: "GRÁTIS",
    steam_rating: "{{percent}}% Análises da Steam {{text}}",
    metacritic_score: "Metacritic: {{score}}",
    share_message: "🔥 Alerta de Oferta: {{title}} está por apenas {{price}} (Economia de {{saved}}) na {{platform}}!\nGaranta o seu aqui: {{url}}",
    save_amount: "{{amount}}% OFF",
    carousel_description: "Índice de oferta impecável de {{rating}}/10! Economize ${{saved}} instantaneamente.",
    hot_deal: "Destaque",
    best_price: "Melhor Preço",
    verified_promo: "Promoção Verificada",
    view: "Ver Oferta",
    no_competing_offers: "Nenhuma outra oferta registrada para este título.",
    rating: "{{percent}}",
    no_description: "Aproveite esta grande oferta antes que a promoção termine!",
    breakdown_title: "Ver Detalhes",
    breakdown_body: "Economize um total de {{saved}} em relação ao preço original de {{original}} (desconto de {{percent}}%).",
    live_store_comparisons: "Comparativo de Lojas ao Vivo",
    lowest_price_ever: "Menor Preço Histórico",
    all_time_low: "Mínimo Histórico",
    lowest_price_recorded: "Menor Preço Registrado",
    lowest_price_nodate: "Mínimo histórico registrado em ${{price}}",
    summary: {
      prefix: "Analisamos as lojas de jogos e encontramos ",
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
      description: "Não foi possível conectar aos servidores. Verifique sua conexão com a Internet e tente novamente.",
      retryButton: "Tentar Novamente"
    },
    empty: {
      title: "Nenhum Resultado",
      description: "Nenhuma oferta encontrada nesta categoria de loja.",
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
    legalSubtitle: "Por favor, leia as condições de privacidade antes de usar o aplicativo.",
    title: "Acompanhe jogos grátis e promoções.",
    title2: "Jogos Grátis e Ofertas de Games",
    description: "O Frapp reúne jogos 100% gratuitos e grandes promoções das principais lojas para você jogar mais gastando menos.",
    privacyHeader: "Privacidade e Estrutura de Dados",
    privacyBody: "O Frapp é um aplicativo de código aberto focado em privacidade. Todos os dados são processados localmente no seu dispositivo sem armazenamento em servidores centrais.",
    consentLabel: "Aceito os Termos de Serviço e a Política de Privacidade",
    btnStep1: "Continuar",
    btnStep2: "Começar",
    versionLabel: "v1.1.6",
    permissionsTitle: "Permissões do App",
    permissionsSubtitle: "O Frapp precisa de permissões para notificações e alarmes. Conceda as permissões necessárias para uma melhor experiência (dispositivos Android 14+ podem exigir permissão de alarme exato).",
    pushTitle: "Notificações Push",
    pushDesc: "Receba alertas instantâneos quando jogos grátis ou grandes descontos estiverem disponíveis.",
    granted: "Pronto",
    allow: "Permitir",
    alarmTitle: "Lembretes Precisos",
    alarmDesc: "Programe alertas de 24 horas antes dos jogos salvos expirarem.",
    setup: "Configurar"
  }
} as const;