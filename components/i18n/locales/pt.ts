export const pt = {
  header: {
    title: "Configurações.",
    subtitle: "Personalize o comportamento do aplicativo, ajuste as notificações, altere as configurações de exibição ou leia as credenciais de código aberto."
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
    notificationSettings: "Notificações",
    notificationSettingsSub: "Alternar notificações push",
    appIntroduction: "Integração",
    appIntroductionSub: "Rever o contexto de introdução",
    checkForUpdates: "Versão do App",
    checkForUpdatesSub: "Verificar Atualizações"
  },
  about: {
    developer: "Sobre o Desenvolvedor",
    developerSub: "Visitar portafólio pessoal",
    moreApps: "Mais Aplicativos",
    moreAppsSub: "Explorar repositórios no GitHub",
    socials: "Redes Sociais",
    socialsSub: "Conectar-se em várias plataformas",
    privacy: "Política de Privacidade",
    privacySub: "Veja nossa Política de Privacidade."
  },
  community: {
    supportOpenSource: "Apoiar Código Aberto",
    supportOpenSourceSub: "Este aplicativo é desenvolvido de forma independente e hospedado gratuitamente. Se você vê valor em descobrir essas ofertas, deixar uma estrela no GitHub ajuda muito!",
    starGithub: "Dê uma estrela no GitHub",
    buyCoffee: "Pague-me um Café",
    buyCoffeeSub: "Ajude a manter os servidores ativos! Uma pequena doação nos permite manter o projeto e adicionar novos recursos.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Site Gamepower",
    gamepowerSub: "Fonte principal de dados de brindes",
    cheapshark: "CheapShark API",
    cheapsharkSub: "API de ofertas de jogos"
  },
  report: {
    title: "Reportar um Erro.",
    subtitle: "Está tendo problemas com o app? Escolha um modelo para enviar um relatório. (Os relatórios serão enviados ao nosso repositório no GitHub para análise)",
    sectionTitle: "Selecione uma categoria de erro",
    categories: {
      ui: "Erro de UI/UX",
      api: "Erro de API / Dados",
      crash: "Performance / Travamento",
      feature: "Solicitação de Recurso"
    },
    githubCard: {
      title: "Enviar diretamente via GitHub Issues",
      description: "Ao clicar no botão abaixo, sua seleção e os parâmetros do dispositivo local serão empacotados com segurança para abrir a página de rastreamento de problemas do GitHub.",
      buttonText: "Reportar {{category}}"
    },
    attributionCard: {
      title: "Divulgações de APIs de Terceiros",
      description: "Todos os índices de dados visíveis na interface são obtidos diretamente de redes externas por meio das arquiteturas públicas abertas do Gamepower e CheapShark. O uso desses índices cumpre diretamente as suas regras nativas de distribuição. O Frapp não manipula listagens individuais de itens, não altera estruturas de preços ou gerencia prazos de distribuição. Portanto, não podemos garantir a disponibilidade ininterrompida, precisão ou suporte contínuo de nós externos ou chaves distribuídas por meio dessas respectivas plataformas."
    },
    footerVersion: "Versão do Frapp v1.1.4",
    alerts: {
      errorTitle: "Erro",
      errorMessage: "Não foi possível redirecionar para o GitHub. Verifique as permissões de navegação."
    },
    github: {
      bodyDescription: "Esta ação removerá permanentemente todos os brindes salvos da sua lista. Você precisará procurá-los e adicioná-los manualmente outra vez.",
      step1: "Abrir o aplicativo",
      step2: "Navegar para...",
      step3: "Observar..."
    }
  },
  footer: {
    build: "Versão do Frapp {{version}}"
  },
  updateModal: {
    title: "Atualização Disponível",
    subtitle: "O {{version}} chegou!",
    description: "Uma nova versão do aplicativo ({{latest}}) está disponível. Atualize a partir da sua versão atual ({{current}}) para acessar as mudanças mais recentes!",
    later: "Cancelar",
    updateNow: "Atualizar Agora"
  },
  modals: {
    dismiss: "Apagar Tudo",
    ok: "OK",
    testFailedTitle: "Falha no Alvo de Teste",
    testFailedMessage: "Não foi possível executar o loop de renderização de implantação instantânea. Confirme as permissões locais.",
    upToDateTitle: "Atualizado",
    upToDateMessage: "Você já está rodando a nossa build de revisão mais recente ({{version}}). Nenhuma atualização é necessária.",
    upToDateAction: "Incrível",
    checkFailedTitle: "Falha na Verificação",
    checkFailedMessage: "Não foi possível concluir as consultas de busca no momento. Verifique sua conexão e tente novamente.",
    socialsTitle: "Compartilhar Oferta",
    languageTitle: "Selecionar Idioma"
  },
  giveaways: {
    title: "Brindes.",
    summary: {
      prefix: "Encontramos ",
      midActive: " brindes de jogos ativos a partir de ",
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
      description: "Não conseguimos sincronizar com os servidores de dados principais no momento. Verifique seu acesso à internet e tente novamente.",
      retryButton: "Reintentar Conexão"
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
      keys_left: "Chaves restantes: {{count}}",
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
      viewAllButton: "Explorar o App"
    },
    delete: {
      title: "Deletar todos os jogos?",
      description: "Esta ação removerá permanentemente todos os brindes fixados da sua lista de salvos. Você precisará procurá-los e adicioná-los novamente de forma manual.",
      confirmButton: "Apagar Tudo"
    }
  },
  deals: {
    title: "Ofertas.",
    titleClaim: "Resgatar Oferta.",
    claim: "Resgatar Oferta",
    retailer: "Varejista",
    store: "Loja",
    free_uppercase: "GRÁTIS",
    share_message: "🔥 Alerta de Oferta: {{title}} baixou para {{price}} (Você economiza {{saved}}) na {{platform}}!\nPegue aqui: {{url}}",
    save_amount: "{{amount}}% DE DESCONTO",
    hot_deal: "Oferta de Alto Valor",
    rating: "{{percent}}",
    released: "Termina em: ",
    no_description: "Aproveite esta oferta de valor excepcional antes que o período promocional termine ou as faixas de preço mudem!",
    breakdown_title: "Ver Detalhes",
    breakdown_body: "Economize um total de {{saved}} em relação ao preço de varejo normal de {{original}} (representando um sólido desconto de {{percent}}%).",
    summary: {
      prefix: "Analisamos as lojas de jogos ativas e descobrimos ",
      midActive: " descontos massivos disponíveis em ",
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
      description: "Não conseguimos sincronizar com os servidores no momento. Verifique se o seu dispositivo está online e tente novamente.",
      retryButton: "Reintentar Conexão"
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
    privacyHeader: "Estrutura Central de Privacidade",
    privacyBody: "O Frapp funciona inteiramente como uma ferramenta agregadora de dados de código aberto. Não mantemos plataformas de armazenamento localizadas, não coletamos estruturas de contas físicas ou rastreamos históricos de telemetria de usuários. Como todos os processos rodam diretamente no seu hardware, nenhum dado é transmitido, processado ou registrado por uma central mestre interna ou rede administrativa centralizada. Seus perfis de configuração localizados, arquivos de cache históricos e preferências interativas permanecem armazenados de forma segura no seu dispositivo.",
    consentLabel: "Aceito os Termos de Serviço e a Declaração de Privacidade",
    btnStep1: "Continuar",
    btnStep2: "Começar",
    versionLabel: "Frapp • v1.1.3"
  }
} as const;