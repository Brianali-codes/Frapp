export const fr = {
  header: {
    title: "Paramètres.",
    subtitle: "Personnalisez le comportement de l'application, ajustez les notifications, basculez les paramètres d'affichage ou lisez les informations open source."
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
    appLanguage: "Langue de l'app",
    appLanguageSub: "Changer de langue",
    savedGiveaways: "Ma bibliothèque.",
    savedGiveawaysSub: "Accéder aux jeux sauvegardés",
    notificationSettings: "Paramètres de notification",
    notificationSettingsSub: "Activer/désactiver les notifications push",
    appIntroduction: "Bienvenue",
    appIntroductionSub: "Revoir le contexte de bienvenue",
    checkForUpdates: "Version de l'app",
    checkForUpdatesSub: "Vérifier les mises à jour"
  },
  about: {
    developer: "À propos du développeur",
    developerSub: "Visiter le portfolio personnel",
    moreApps: "Plus d'applications",
    moreAppsSub: "Explorer les dépôts GitHub",
    socials: "Réseaux sociaux",
    socialsSub: "Se connecter sur les plateformes",
    privacy: "Politique de confidentialité",
    privacySub: "Consulter notre politique de confidentialité."
  },
  community: {
    supportOpenSource: "Soutenir l'open source",
    supportOpenSourceSub: "Cette application est conçue de manière indépendante et hébergée gratuitement. Si vous appréciez la découverte de ces offres, nous laisser une étoile sur GitHub nous aide énormément !",
    starGithub: "Nous donner une étoile sur GitHub",
    buyCoffee: "Offrez-moi un café",
    buyCoffeeSub: "Aidez à maintenir les serveurs actifs et le café à flot ! Un petit don nous permet de maintenir le projet et d'ajouter de nouvelles fonctionnalités.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Site Gamepower",
    gamepowerSub: "Source principale de données des cadeaux",
    cheapshark: "API CheapShark",
    cheapsharkSub: "API d'offres de jeux vidéo"
  },
  report: {
    title: "Signaler un bug.",
    subtitle: "Vous rencontrez des problèmes avec l'application ? Choisissez votre modèle pour soumettre un rapport. (Les rapports seront soumis à notre dépôt GitHub pour examen)",
    sectionTitle: "Sélectionnez une catégorie de bug",
    categories: {
      ui: "Problème UI/UX",
      api: "Erreur API / Données",
      crash: "Performance / Crash",
      feature: "Demande de fonctionnalité"
    },
    githubCard: {
      title: "Soumettre directement via GitHub Issues",
      description: "En cliquant sur le bouton d'action ci-dessous, votre modèle de sélection ainsi que les paramètres de l'environnement de votre appareil local sont empaquetés en toute sécurité, puis la page de suivi des tickets GitHub s'ouvre.",
      buttonText: "Signaler {{category}}"
    },
    attributionCard: {
      title: "Divulgations concernant les API tierces",
      description: "Toutes les données visibles sur l'interface sont récupérées directement depuis des réseaux externes via les architectures publiques ouvertes de Gamepower et CheapShark. L'utilisation de ces données est directement conforme à leurs règles de distribution natives. Frapp ne manipule pas les listes d'articles individuelles, ne modifie pas les structures de prix et ne gère pas les délais de distribution. Par conséquent, nous ne pouvons garantir la disponibilité ininterrompue, l'exactitude ou le support continu des nœuds externes ou des clés distribués par ces plateformes respectives."
    },
    footerVersion: "Version Frapp v1.1.4",
    alerts: {
      errorTitle: "Erreur",
      errorMessage: "Impossible de rediriger vers GitHub. Vérifiez les autorisations de routage de votre navigateur."
    },
    github: {
      bodyDescription: "Cette action supprimera définitivement tous les cadeaux épinglés de votre liste de sauvegarde. Vous devrez les explorer et les rajouter manuellement.",
      step1: "Ouvrir l'application",
      step2: "Naviguer vers...",
      step3: "Observer..."
    }
  },
  footer: {
    build: "Version Frapp {{version}}"
  },
  updateModal: {
    title: "Mise à jour disponible",
    subtitle: "{{version}} est disponible !",
    description: "Une nouvelle version de l'application ({{latest}}) est disponible. Mettez à jour votre version actuelle ({{current}}) pour accéder aux derniers changements !",
    later: "Annuler",
    updateNow: "Mettre à jour maintenant"
  },
  modals: {
    dismiss: "Tout effacer",
    ok: "OK",
    testFailedTitle: "Échec de la cible de test",
    testFailedMessage: "Impossible d'exécuter la boucle de rendu de déploiement instantané. Confirmez les autorisations locales.",
    upToDateTitle: "À jour",
    upToDateMessage: "Vous utilisez déjà notre build de révision le plus récent ({{version}}). Aucune mise à jour n'est nécessaire.",
    upToDateAction: "Super",
    checkFailedTitle: "Échec de la vérification",
    checkFailedMessage: "Impossible de terminer les requêtes de recherche pour le moment. Vérifiez votre index de connectivité et réessayez.",
    socialsTitle: "Partager la promo",
    languageTitle: "Choisir la langue"
  },
  giveaways: {
    title: "Cadeaux.",
    summary: {
      prefix: "Nous avons trouvé ",
      midActive: " cadeaux de jeux actifs en date du ",
      midWorth: ", d'une valeur totale de ",
      suffix: ". Réclamez-les avant qu'ils n'expirent !"
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
      title: "Connexion interrompue",
      description: "Nous ne sommes pas en mesure de nous synchroniser avec les serveurs de recherche pour le moment. Vérifiez votre accès internet et réessayez.",
      retryButton: "Réessayer la connexion"
    },
    empty: {
      title: "Aucun cadeau trouvé",
      description: "Il n'y a aucun cadeau actif disponible pour cette plateforme pour le moment.",
      viewAllButton: "Voir toutes les plateformes"
    },
    tracking: {
      days_left: "{{count}} jours restants",
      day_left: "1 jour restant",
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
      midActive: " jeux sauvegardés ",
      midWorth: ", d'une valeur totale de ",
      suffix: ". Réclamez-les avant qu'ils n'expirent !"
    },
    empty: {
      viewAllButton: "Explorer l'application"
    },
    delete: {
      title: "Supprimer tous les jeux ?",
      description: "Cette action supprimera définitivement tous les cadeaux épinglés de votre liste de sauvegarde. Vous devrez les explorer et les rajouter manuellement.",
      confirmButton: "Tout effacer"
    }
  },
  deals: {
    title: "Offres de jeux.",
    titleClaim: "Réclamer l'offre.",
    claim: "Réclamer l'offre",
    retailer: "Revendeur",
    store: "Boutique",
    free_uppercase: "GRATUIT",
    share_message: "🔥 Alerte bon plan : {{title}} est à seulement {{price}} (Économie de {{saved}}) sur {{platform}} !\nProfitez-en ici : {{url}}",
    save_amount: "-{{amount}}%",
    hot_deal: "Meilleure offre",
    rating: "{{percent}}",
    released: "Fin : ",
    no_description: "Saisissez cette offre à la valeur exceptionnelle avant la fin de la période promotionnelle ou le changement des tarifs !",
    breakdown_title: "Voir les détails",
    breakdown_body: "Économisez un total de {{saved}} par rapport au prix de vente standard de {{original}} (soit une solide réduction de {{percent}}%).",
    summary: {
      prefix: "Nous avons parcouru les boutiques de jeux actives et découvert ",
      midActive: " remises massives en direct à la date du ",
      suffix: ". Appuyez sur n'importe quel titre pour sécuriser votre clé !"
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
      description: "Nous ne pouvons pas nous synchroniser avec les serveurs pour le moment. Assurez-vous que votre appareil est connecté et réessayons.",
      retryButton: "Réessayer la connexion"
    },
    empty: {
      title: "Aucun résultat trouvé",
      description: "Aucune offre en cours trouvée dans cette catégorie de boutique.",
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
    legalTitle: "Accords légaux",
    legalSubtitle: "Veuillez consulter les conditions de confidentialité avant d'accéder à nos flux mondiaux de synchronisation de données.",
    title: "Suivez les cadeaux de jeux vidéo et les offres de jeux premium.",
    title2: "Obtenez des cadeaux et des offres",
    description: "Frapp propose à la fois des cadeaux de jeux et des offres massives de jeux vidéo. Nous agrégeons les dernières récompenses 100 % gratuites à réclamer ainsi que d'importantes remises chez les revendeurs sur l'ensemble des boutiques pour que vous jouiez toujours plus en dépensant moins.",
    privacyHeader: "Cadre central de confidentialité et de données",
    privacyBody: "Frapp est un agrégateur de données open-source qui unifie vos flux de données disparates, vos flux d'API et vos points de contact numériques au sein d'un tableau de bord unique et cohérent. Parce que nous fonctionnons entièrement comme un outil local-first, nous ne gérons aucun stockage centralisé, ne collectons aucune structure de compte physique et ne suivons aucun historique de télémétrie utilisateur. L'ensemble de l'agrégation, du traitement et de la visualisation s'exécute directement sur votre matériel — ce qui signifie que vos données ne sont jamais transmises à, ni enregistrées par, un concentrateur maître externe ou un réseau administratif centralisé. Vos profils de configuration localisés, vos fichiers de cache historiques et vos préférences interactives restent stockés en toute sécurité sur votre appareil.",
    consentLabel: "J'accepte les conditions d'utilisation et la déclaration de confidentialité",
    btnStep1: "Continuer",
    btnStep2: "Commencer",
    versionLabel: "Frapp • v1.1.4"
  }
} as const;