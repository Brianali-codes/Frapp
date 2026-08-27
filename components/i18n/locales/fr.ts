export const fr = {
  header: {
    title: "Paramètres.",
    subtitle: "Personnalisez le comportement de l'application, gérez les notifications, modifiez l'affichage ou lisez les licences open source."
  },
  sections: {
    preferences: "Préférences.",
    about: "À propos.",
    community: "Communauté & Support.",
    providers: "Fournisseurs de données."
  },
  preferences: {
    themeAppearance: "Apparence du thème",
    themeDark: "Mode Sombre",
    themeLight: "Mode Clair",
    appLanguage: "Langue de l'application",
    appLanguageSub: "Changer de langue",
    savedGiveaways: "Ma bibliothèque.",
    savedGiveawaysSub: "Accéder aux jeux enregistrés",
    notificationSettings: "Paramètres des notifications",
    notificationSettingsSub: "Activer ou désactiver les notifications push",
    appIntroduction: "Présentation",
    appIntroductionSub: "Revoir le guide d'accueil",
    checkForUpdates: "Version de l'application",
    checkForUpdatesSub: "Vérifier les mises à jour",
    Report: "Signaler un bug",
    ReportSub: "Signaler un bug ou un problème",
  },
  about: {
    developer: "À propos du développeur",
    developerSub: "Découvrir le portfolio",
    moreApps: "Plus d'applications",
    moreAppsSub: "Explorer les dépôts GitHub",
    socials: "Réseaux sociaux",
    socialsSub: "Rejoignez-nous sur les réseaux",
    privacy: "Politique de confidentialité",
    privacySub: "Consulter notre politique de confidentialité."
  },
  community: {
    supportOpenSource: "Soutenir l'Open Source",
    supportOpenSourceSub: "Cette application est développée indépendamment et hébergée gratuitement. Si vous aimez dénicher ces bons plans, nous laisser une étoile sur GitHub nous aide énormément !",
    starGithub: "Nous donner une étoile sur GitHub",
    buyCoffee: "Offrez-moi un café",
    buyCoffeeSub: "Aidez-nous à maintenir les serveurs en ligne ! Un petit don permet de maintenir le projet et d'ajouter de nouvelles fonctionnalités.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Site Gamepower",
    gamepowerSub: "Source principale des jeux gratuits",
    cheapshark: "API CheapShark",
    cheapsharkSub: "API de bons plans jeux vidéo"
  },
  report: {
    title: "Signaler un bug.",
    subtitle: "Signaler un bug ou un dysfonctionnement",
    sectionTitle: "Sélectionner une catégorie",
    categories: {
      ui: "Problème d'interface (UI/UX)",
      api: "Erreur d'API / Données",
      crash: "Performance / Plante",
      feature: "Demande de fonctionnalité"
    },
    githubCard: {
      title: "Soumettre directement via GitHub Issues",
      description: "En cliquant sur le bouton ci-dessous, un modèle prérempli avec les informations de votre appareil sera généré sur la page GitHub d'assistance.",
      buttonText: "Signaler {{category}}"
    },
    attributionCard: {
      title: "Mentions d'API tierces",
      description: "Toutes les données affichées proviennent directement des API ouvertes de Gamepower et CheapShark. L'utilisation de ces informations respecte leurs règles de distribution. Frapp ne modifie pas les prix, les offres ni les périodes de distribution. Nous ne pouvons donc pas garantir la disponibilité continue des clés ou des services externes."
    },
    alerts: {
      errorTitle: "Erreur",
      errorMessage: "Impossible d'ouvrir GitHub. Veuillez vérifier les autorisations de votre navigateur."
    },
    github: {
      bodyDescription: "Cette action supprimera définitivement tous les jeux enregistrés de votre bibliothèque. Vous devrez les chercher et les rajouter manuellement.",
      step1: "Ouvrez l'application",
      step2: "Accédez à...",
      step3: "Observez..."
    }
  },
  footer: {
    build: "Frapp Version {{version}}"
  },
  updateModal: {
    title: "Mise à jour disponible",
    subtitle: "La version {{version}} est disponible !",
    description: "Une nouvelle version ({{latest}}) est disponible. Mettez à jour votre version actuelle ({{current}}) pour profiter des dernières nouveautés !",
    later: "Plus tard",
    updateNow: "Mettre à jour"
  },
  modals: {
    dismiss: "Tout effacer",
    ok: "OK",
    testFailedTitle: "Échec du test",
    testFailedMessage: "Impossible de lancer la boucle de rendu. Vérifiez les autorisations locales.",
    upToDateTitle: "À jour",
    upToDateMessage: "Vous utilisez déjà la version la plus récente ({{version}}). Aucune mise à jour requise.",
    upToDateAction: "Parfait",
    checkFailedTitle: "Échec de vérification",
    checkFailedMessage: "Impossible d'effectuer la recherche pour le moment. Vérifiez votre connexion Internet et réessayez.",
    failedAction: "Fermer",
    socialsTitle: "Partager",
    languageTitle: "Choisir la langue"
  },
  giveaways: {
    title: "Jeux Gratuits.",
    summary: {
      prefix: "Nous avons trouvé ",
      midActive: " jeux gratuits actifs au ",
      midWorth: ", pour une valeur totale de ",
      suffix: ". Réclamez-les avant expiration !"
    },
    platforms: {
      all: "Toutes",
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
      drmFree: "Sans DRM",
      itchio: "itch.io"
    },
    error: {
      title: "Connexion interrompue",
      description: "Impossible de contacter les serveurs. Assurez-vous d'être connecté à Internet et réessayez.",
      retryButton: "Réessayer la connexion"
    },
    empty: {
      title: "Aucun jeu gratuit trouvé",
      description: "Aucun jeu gratuit n'est disponible pour cette plateforme actuellement.",
      viewAllButton: "Voir toutes les plateformes"
    },
    tracking: {
      days_left: "Encore {{count}} jours",
      day_left: "Encore 1 jour",
      ends_today: "Se termine aujourd'hui",
      expired: "Expiré",
      keys_left: "Clés restantes : {{count}}",
      instructions_title: "Instructions pour réclamer :"
    },
    pagination: {
      previous: "Précédent",
      next: "Page suivante"
    }
  },
  giveaways1: {
    summary: {
      prefix: "Vous avez ",
      midActive: " jeux enregistrés ",
      midWorth: ", d'une valeur totale de ",
      suffix: ". Réclamez-les avant expiration !"
    },
    empty: {
      viewAllButton: "Explorer l'application"
    },
    delete: {
      title: "Supprimer tous les jeux ?",
      description: "Cette action supprimera définitivement tous les jeux enregistrés de votre liste. Vous devrez les réajouter manuellement.",
      confirmButton: "Tout effacer"
    },
  },
  deals: {
    title: "Bons Plans Jeux.",
    titleClaim: "Profiter de l'offre.",
    claim: "Profiter de l'offre",
    retailer: "Revendeur",
    store: "Boutique",
    free_uppercase: "GRATUIT",
    steam_rating: "{{percent}}% d'avis positifs Steam {{text}}",
    metacritic_score: "Metacritic : {{score}}",
    share_message: "🔥 Bon plan : {{title}} est à {{price}} (Économie : {{saved}}) sur {{platform}} !\nProfitez-en ici : {{url}}",
    save_amount: "-{{amount}}%",
    carousel_description: "Excellente note de {{rating}}/10 ! Économisez ${{saved}} immédiatement.",
    hot_deal: "Meilleure Offre",
    best_price: "Meilleur Prix",
    verified_promo: "Offre Vérifiée",
    view: "Voir l'offre",
    no_competing_offers: "Aucune autre offre enregistrée pour ce jeu.",
    rating: "{{percent}}",
    no_description: "Profitez de cette offre exceptionnelle avant la fin de la promotion !",
    breakdown_title: "Détails de l'offre",
    breakdown_body: "Économisez au total {{saved}} par rapport au prix d'origine de {{original}} (soit une réduction de {{percent}}%).",
    live_store_comparisons: "Comparateur de boutiques en direct",
    lowest_price_ever: "Prix le plus bas historique",
    all_time_low: "Plus bas historique",
    lowest_price_recorded: "Prix minimum enregistré",
    lowest_price_nodate: "Plus bas historique enregistré à ${{price}}",
    summary: {
      prefix: "Nous avons analysé les boutiques et trouvé ",
      midActive: " réductions majeures actives au ",
      suffix: ". Cliquez sur un titre pour récupérer votre offre !"
    },
    stores: {
      all: "Toutes les boutiques",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "Connexion interrompue",
      description: "Impossible de contacter les serveurs. Vérifiez votre connexion Internet et réessayez.",
      retryButton: "Réessayer la connexion"
    },
    empty: {
      title: "Aucun résultat",
      description: "Aucun bon plan trouvé pour cette catégorie de boutique.",
      resetButton: "Réinitialiser les filtres"
    },
    pagination: {
      prev: "Précédent",
      next: "Jeux suivants"
    }
  },
  months: {
    january: "Janvier",
    february: "Février",
    march: "Mars",
    april: "Avril",
    may: "Mai",
    june: "Juin",
    july: "Juillet",
    august: "Août",
    september: "Septembre",
    october: "Octobre",
    november: "Novembre",
    december: "Décembre"
  },
  onboarding: {
    welcome: "Bienvenue sur Frapp",
    legalTitle: "Informations légales",
    legalSubtitle: "Veuillez lire la politique de confidentialité avant d'accéder à nos flux de données.",
    title: "Suivez les jeux gratuits et promos.",
    title2: "Jeux Gratuits & Bons Plans Video",
    description: "Frapp rassemble les offres 100% gratuites et les meilleures réductions sur les jeux vidéo pour vous faire faire des économies au quotidien.",
    privacyHeader: "Confidentialité & Architecture",
    privacyBody: "Frapp est un agrégateur open-source axé sur la confidentialité. Toutes les données sont traitées directement en local sur votre appareil sans passer par des serveurs centraux ni collecter de données personnelles.",
    consentLabel: "J'accepte les Conditions d'utilisation & la Politique de confidentialité",
    btnStep1: "Continuer",
    btnStep2: "Commencer",
    versionLabel: "v1.1.6",
    permissionsTitle: "Autorisations de l'application",
    permissionsSubtitle: "Frapp nécessite l'accès aux notifications et aux alarmes. Veuillez accorder ces autorisations pour un fonctionnement optimal (l'autorisation des alarmes exactes peut être requise sur Android 14+).",
    pushTitle: "Notifications Push",
    pushDesc: "Recevez une alerte immédiate dès qu'un jeu gratuit ou une promo importante est disponible.",
    granted: "Prêt",
    allow: "Autoriser",
    alarmTitle: "Rappels Précis",
    alarmDesc: "Programmez des rappels 24h avant l'expiration des jeux enregistrés dans votre bibliothèque.",
    setup: "Configurer"
  }
} as const;