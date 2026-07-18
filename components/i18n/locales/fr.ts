export const fr = {
  header: {
    title: "Paramètres.",
    subtitle: "Personnalisez le comportement de l'application, ajustez les notifications, changez les paramètres d'affichage ou lisez les crédits open-source."
  },
  sections: {
    preferences: "Préférences.",
    about: "À propos.",
    community: "Communauté & Support.",
    providers: "Fournisseurs de Données."
  },
  preferences: {
    themeAppearance: "Apparence du Thème",
    themeDark: "Mode Sombre",
    themeLight: "Mode Clair",
    appLanguage: "Langue de l'App",
    appLanguageSub: "Changer de Langue",
    savedGiveaways: "Ma Bibliothèque.",
    savedGiveawaysSub: "Accéder aux jeux enregistrés",
    notificationSettings: "Notifications",
    notificationSettingsSub: "Basculer les notifications push",
    appIntroduction: "Intégration",
    appIntroductionSub: "Revoir le contexte d'intégration",
    checkForUpdates: "Version de l'App",
    checkForUpdatesSub: "Vérifier les Mises à Jour"
  },
  about: {
    developer: "À propos du Développeur",
    developerSub: "Visiter le portfolio personnel",
    moreApps: "Plus d'Applications",
    moreAppsSub: "Explorer les dépôts GitHub",
    socials: "Réseaux Sociaux",
    socialsSub: "Se connecter sur les plateformes",
    privacy: "Politique de Confidentialité",
    privacySub: "Consulter notre Politique de Confidentialité."
  },
  community: {
    supportOpenSource: "Soutenir l'Open Source",
    supportOpenSourceSub: "Cette application est développée indépendamment et hébergée gratuitement. Si vous appréciez de dénicher ces offres, nous laisser une étoile sur GitHub nous aide énormément !",
    starGithub: "Nous donner une étoile sur GitHub",
    buyCoffee: "Offrez-moi un Café",
    buyCoffeeSub: "Aidez-nous à maintenir les serveurs en vie ! Un petit don nous permet de maintenir le projet et d'ajouter de nouvelles fonctionnalités.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Site Gamepower",
    gamepowerSub: "Source principale de données des cadeaux",
    cheapshark: "CheapShark API",
    cheapsharkSub: "API des offres de jeux vidéo"
  },
  report: {
    title: "Signaler un bug.",
    subtitle: "Vous rencontrez des problèmes avec l'application ? Choisissez un modèle pour soumettre un rapport. (Les rapports seront soumis à notre dépôt GitHub pour examen)",
    sectionTitle: "Sélectionnez une catégorie de bug",
    categories: {
      ui: "Bug UI/UX",
      api: "Erreur API / Données",
      crash: "Performance / Crash",
      feature: "Demande de Fonctionnalité"
    },
    githubCard: {
      title: "Soumettre directement via les tickets GitHub",
      description: "En cliquant sur le bouton ci-dessous, votre sélection ainsi que les paramètres d'environnement de votre appareil local seront empaquetés de manière sécurisée pour ouvrir la page de suivi des tickets GitHub.",
      buttonText: "Signaler {{category}}"
    },
    attributionCard: {
      title: "Divulgations d'API Tierces",
      description: "Toutes les données visibles sur l'interface sont récupérées directement depuis des réseaux externes via les architectures publiques ouvertes de Gamepower et CheapShark. L'utilisation de ces données respecte directement leurs règles de distribution natives. Frapp ne manipule pas les listes d'articles individuelles, ne modifie pas les structures de prix et ne gère pas les délais de distribution. Par conséquent, nous ne pouvons garantir la disponibilité ininterrompue, l'exactitude ou le support continu des nœuds externes ou des clés distribuées via ces plateformes respectives."
    },
    footerVersion: "Version de Frapp v1.1.4",
    alerts: {
      errorTitle: "Erreur",
      errorMessage: "Impossible de rediriger vers GitHub. Vérifiez les autorisations de routage du navigateur."
    },
    github: {
      bodyDescription: "Cette action supprimera définitivement tous les cadeaux épinglés de votre liste. Vous devrez les rechercher et les rajouter manuellement.",
      step1: "Ouvrir l'application",
      step2: "Naviguer vers...",
      step3: "Observer..."
    }
  },
  footer: {
    build: "Version de Frapp {{version}}"
  },
  updateModal: {
    title: "Mise à jour Disponible",
    subtitle: "{{version}} est là !",
    description: "Une nouvelle version de l'application ({{latest}}) est disponible. Mettez à jour votre version actuelle ({{current}}) pour accéder aux derniers changements !",
    later: "Annuler",
    updateNow: "Mettre à jour Maintenant"
  },
  modals: {
    dismiss: "Tout effacer",
    ok: "OK",
    testFailedTitle: "Échec de la Cible de Test",
    testFailedMessage: "Impossible d'exécuter la boucle de rendu de déploiement instantané. Confirmez les autorisations locales.",
    upToDateTitle: "À Jour",
    upToDateMessage: "Vous utilisez déjà notre build de révision le plus récent ({{version}}). Aucune mise à jour requise.",
    upToDateAction: "Génial",
    checkFailedTitle: "Échec de la Vérification",
    checkFailedMessage: "Impossible de terminer les requêtes de recherche pour le moment. Vérifiez votre connexion et réessayez.",
    socialsTitle: "Partager l'Offre",
    languageTitle: "Choisir la Langue"
  },
  giveaways: {
    title: "Cadeaux.",
    summary: {
      prefix: "Nous avons trouvé ",
      midActive: " cadeaux de jeux actifs en date du ",
      midWorth: ", évalués à un total de ",
      suffix: ". Récupérez-les avant qu'ils n'expirent !"
    },
    platforms: {
      all: "Tous",
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
      title: "Connexion Interrompue",
      description: "Nous sommes actuellement incapables de nous synchroniser avec les serveurs de données principaux. Vérifiez votre accès Internet et réessayez.",
      retryButton: "Réessayer la Connexion"
    },
    empty: {
      title: "Aucun Cadeau Trouvé",
      description: "Il n'y a aucun cadeau actif disponible pour cette plateforme en ce moment.",
      viewAllButton: "Voir Toutes les Plateformes"
    },
    tracking: {
      days_left: "{{count}} Jours Restants",
      day_left: "1 Jour Restant",
      ends_today: "Se Termine Aujourd'hui",
      expired: "Expiré",
      keys_left: "Clés restantes : {{count}}",
      instructions_title: "Instructions pour Récupérer :"
    },
    pagination: {
      previous: "Précédent",
      next: "Page Suivante"
    }
  },
  giveaways1: {
    summary: {
      prefix: "Vous avez ",
      midActive: " jeux enregistrés ",
      midWorth: ", évalués à un total de ",
      suffix: ". Récupérez-les avant qu'ils n'expirent !"
    },
    empty: {
      viewAllButton: "Explorer l'App"
    },
    delete: {
      title: "Supprimer tous les jeux ?",
      description: "Cette action supprimera définitivement tous les cadeaux épinglés de votre liste enregistrée. Vous devrez les rechercher et les rajouter manuellement.",
      confirmButton: "Tout effacer"
    }
  },
  deals: {
    title: "Offres.",
    titleClaim: "Profiter de l'Offre.",
    claim: "Profiter de l'Offre",
    retailer: "Revendeur",
    store: "Boutique",
    free_uppercase: "GRATUIT",
    share_message: "🔥 Alerte Bon Plan : {{title}} est à seulement {{price}} (Économie de {{saved}}) sur {{platform}} !\nProfitez-en ici : {{url}}",
    save_amount: "{{amount}}% DE RÉDUCTION",
    hot_deal: "Offre Excellente Valeur",
    rating: "{{percent}}",
    released: "Se termine le : ",
    no_description: "Saisissez cette offre d'une valeur exceptionnelle avant la fin de la période de promotion ou le changement des tarifs !",
    breakdown_title: "Voir les Détails",
    breakdown_body: "Économisez un total de {{saved}} par rapport au prix de vente habituel de {{original}} (soit une solide réduction de {{percent}}%).",
    summary: {
      prefix: "Nous avons analysé les boutiques de jeux actives et découvert ",
      midActive: " remises massives disponibles le ",
      suffix: ". Appuyez sur n'importe quel titre pour sécuriser votre clé !"
    },
    stores: {
      all: "Toutes les Boutiques",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "Connexion Interrompue",
      description: "Nous ne pouvons pas nous synchroniser avec les serveurs pour le moment. Vérifiez que votre appareil est en ligne et réessayez.",
      retryButton: "Réessayer la Connexion"
    },
    empty: {
      title: "Aucun Résultat Trouvé",
      description: "Aucun bon plan en cours trouvé dans cette catégorie de boutique.",
      resetButton: "Réinitialiser les Filtres"
    },
    pagination: {
      prev: "Précédent",
      next: "Jeux Suivants"
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
    legalTitle: "Accords Légaux",
    privacyHeader: "Cadre de Confidentialité Fondamental",
    privacyBody: "Frapp fonctionne entièrement comme un outil agrégateur de données open source. Nous ne gérons pas de plateformes de stockage localisées, ne collectons pas de structures de comptes physiques et ne suivons pas les historiques de télémétrie des utilisateurs. Comme tous les processus s'exécutent directement sur votre matériel, aucune donnée n'est jamais transmise, traitée ou enregistrée par un serveur maître interne ou un réseau administratif centralisé. Vos profils de configuration localisés, vos fichiers cache d'historique et vos préférences interactives restent stockés en toute sécurité sur votre appareil.",
    consentLabel: "J'accepte les Conditions d'utilisation et la Déclaration de confidentialité",
    btnStep1: "Continuer",
    btnStep2: "Démarrer",
    versionLabel: "Frapp • v1.1.3"
  }
} as const;