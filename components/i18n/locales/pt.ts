// src/i18n/locales/pt.ts
export const pt = {
  header: {
    title: "Configurações.",
    subtitle: "Personalize o comportamento do aplicativo, ajuste notificações, altere as configurações de exibição ou leia as credenciais de código aberto."
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
    appLanguageSub: "Alterar as camadas de tradução",
    savedGiveaways: "Minha Biblioteca",
    savedGiveawaysSub: "Acessar jogos favoritados",
    notificationSettings: "Configurações de Notificação",
    notificationSettingsSub: "Alternar notificações push",
    appIntroduction: "Introdução do Aplicativo",
    appIntroductionSub: "Rever o contexto de boas-vindas",
    checkForUpdates: "Verificar Atualizações",
    checkForUpdatesSub: "Verificar versões de compilação do app"
  },
  about: {
    developer: "Sobre o Desenvolvedor",
    developerSub: "Visitar portfólio pessoal",
    moreApps: "Mais Aplicativos",
    moreAppsSub: "Explorar repositórios no GitHub",
    socials: "Redes Sociais",
    socialsSub: "Conectar-se em várias plataformas",
    privacy: "Política de Privacidade",
    privacySub: "Ver as políticas do Frapp"
  },
  community: {
    supportOpenSource: "Apoie o Código Aberto",
    supportOpenSourceSub: "Este aplicativo é desenvolvido de forma independente e hospedado gratuitamente. Se você achar útil descobrir essas ofertas, deixar uma estrela no GitHub ajuda muito!",
    starGithub: "Deixar uma estrela no GitHub",
    buyCoffee: "Ajude o Projeto",
    buyCoffeeSub: "Ajude a manter os servidores ativos! Uma pequena doação nos permite manter o projeto e adicionar novos recursos.",
    donateKofi: "Doar no Ko-fi",
    donatePatreon: "Doar no Patreon"
  },
  providers: {
    gamepower: "Site Gamepower",
    gamepowerSub: "Fonte primária de dados de sorteios",
    cheapshark: "API CheapShark",
    cheapsharkSub: "Matriz de API de ofertas de jogos"
  },
  report: {
    title: "Limpar Biblioteca Salva?",
    subtitle: "Encontrando problemas no aplicativo ou notou preços inconsistentes? Escolha uma categoria abaixo e envie um relatório de bug.",
    sectionTitle: "Selecione uma Categoria de Bug",
    categories: {
      ui: "Problema de Interface (UI/UX)",
      api: "Erro de API / Dados",
      crash: "Desempenho / Fechamento Inesperado",
      feature: "Solicitação de Recurso"
    },
    githubCard: {
      title: "Enviar diretamente via GitHub Issues",
      description: "Clicar no botão de ação abaixo inclui sua escolha de categoria, os parâmetros do seu dispositivo local e abre a página de problemas do GitHub.",
      buttonText: "Reportar {{category}}"
    },
    attributionCard: {
      title: "Atribuição do Projeto e API",
      description: "Esta distribuição de código aberto depende inteiramente dos fluxos fornecidos pelas arquiteturas da Gamepower e Free To Game. Nenhuma dessas APIs independentes ou entidades associadas pertence diretamente ao FRAPP."
    },
    footerVersion: "Versão do Frapp v1.1.4",
    alerts: {
      errorTitle: "Erro",
      errorMessage: "Não foi possível redirecionar para o GitHub. Verifique as permissões do seu navegador."
    },
    github: {
      bodyDescription: "Esta ação removerá permanentemente todos os sorteios fixados da sua lista de salvos. Você precisará explorar e adicioná-los novamente de forma manual.",
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
    subtitle: "A versão {{version}} chegou!",
    description: "Uma versão mais recente do app ({{latest}}) está disponível. Atualize sua versão atual ({{current}}) para acessar as alterações mais recentes!",
    later: "Cancelar",
    updateNow: "Atualizar Agora"
  },
  modals: {
    dismiss: "Limpar Tudo",
    ok: "OK",
    testFailedTitle: "Falha no Alvo de Teste",
    testFailedMessage: "Não foi possível executar o loop de renderização. Confirme as permissões locais.",
    upToDateTitle: "Atualizado",
    upToDateMessage: "Você já está executando a nossa versão mais recente ({{version}}). Nenhuma atualização é necessária.",
    upToDateAction: "Incrível",
    checkFailedTitle: "Falha na Verificação",
    checkFailedMessage: "Não foi possível concluir as consultas de busca neste momento. Verifique sua conexão e tente novamente.",
    socialsTitle: "Conecte-se comigo",
    languageTitle: "Selecionar Idioma"
  },
  giveaways: {
    title: "Gratuito para Reclamar.",
    summary: {
      prefix: "Você fixou ",
      midActive: " sorteos para resgatar, economizando um total de ",
      midWorth: "",
      suffix: "! Certifique-se de resgatá-los antes que expirem."
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
      drmFree: "Livre de DRM",
      itchio: "itch.io"
    },
    error: {
      title: "Conexão Interrompida",
      description: "Não conseguimos sincronizar com os servidores de dados no momento. Verifique seu acesso à internet e tente novamente.",
      retryButton: "Reintentar Conexão"
    },
    empty: {
      title: "Sua Biblioteca está Vazia",
      description: "Explore os sorteios ativos e toque no ícone de coração para salvá-los aqui e resgatá-los facilmente mais tarde!",
      viewAllButton: "Explorar o Aplicativo"
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
      next: "Próximos Jogos"
    }
  },
  deals: {
    title: "Ofertas de Jogos.",
    claim: "Reclamar Agora",
    retailer: "Revendedor",
    store: "Loja",
    free_uppercase: "GRÁTIS",
    share_message: "🔥 Alerta de Oferta: {{title}} baixou para {{price}} (Economize {{saved}}) no {{platform}}!\nPegue aqui: {{url}}",
    save_amount: "ECONOMIZE ${{amount}}",
    hot_deal: "VALORADO EM",
    rating: "{{percent}}% de Aprovação",
    released: "Termina: ",
    no_description: "Nenhum contexto de descrição adicional encontrado. Aproveite esta oferta antes que os valores mudem!",
    breakdown_title: "Ver Informações da Oferta",
    breakdown_body: "Você economiza {{saved}} em relação ao valor original de {{original}} ({{percent}}% de desconto total).",
    summary: {
      prefix: "Analisamos os índices atuais das lojas web e detectamos ",
      midActive: " descontos de grande valor ao vivo em ",
      suffix: ". Interaja com qualquer cartão para garantir suas chaves!"
    },
    stores: {
      all: "Todas as Lojas",
      amazon: "Amazon"
    },
    empty: {
      title: "Nenhum Resultado Encontrado",
      description: "Nenhuma oferta de jogo catalogada corresponde a esta seleção de loja.",
      resetButton: "Redefinir Filtros"
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
  }
} as const;