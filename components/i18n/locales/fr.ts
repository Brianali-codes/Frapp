export const fr = {
  header: {
    title: "Paramètres.",
    subtitle: "Personnalisez le comportement de l'application, gérez les notifications, modifiez l'affichage ou consultez les licences open source."
  },
  sections: {
    preferences: "Préférences.",
    about: "À propos.",
    community: "Communauté & Support.",
    providers: "Fournisseurs de données."
  },
  preferences: {
    themeAppearance: "Apparence du thème",
    themeDark: "Mode sombre",
    themeLight: "Mode clair",
    appLanguage: "Langue de l'application",
    appLanguageSub: "Changer de langue",
    savedGiveaways: "Ma bibliothèque.",
    savedGiveawaysSub: "Accéder aux jeux enregistrés",
    notificationSettings: "Paramètres de notification",
    notificationSettingsSub: "Gérer les notifications push",
    appIntroduction: "Présentation",
    appIntroductionSub: "Revoir la présentation",
    checkForUpdates: "Version de l'application",
    checkForUpdatesSub: "Vérifier les mises à jour",
    Report: "Signaler un bug",
    ReportSub: "Signaler un problème ou un bug",
  },
  about: {
    developer: "À propos du développeur",
    developerSub: "Consulter le portfolio personnel",
    moreApps: "Autres applications",
    moreAppsSub: "Explorer les dépôts GitHub",
    socials: "Réseaux sociaux",
    socialsSub: "Se connecter sur les réseaux",
    privacy: "Politique de confidentialité",
    privacySub: "Consulter notre politique de confidentialité."
  },
  community: {
    supportOpenSource: "Soutenir l'Open Source",
    supportOpenSourceSub: "Cette application est développée indépendamment et hébergée gratuitement. Si vous appréciez ces offres, ajouter une étoile sur GitHub nous aide énormément !",
    starGithub: "Nous donner une étoile sur GitHub",
    buyCoffee: "Offrez-moi un café",
    buyCoffeeSub: "Aidez-nous à maintenir les serveurs en ligne ! Un petit don nous permet de maintenir le projet et d'ajouter de nouvelles fonctionnalités.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Site Gamepower",
    gamepowerSub: "Source principale des giveaways",
    cheapshark: "CheapShark API",
    cheapsharkSub: "API des offres de jeux vidéo"
  },
  report: {
    title: "Signaler un bug.",
    subtitle: "Signaler un bug ou un problème",
    sectionTitle: "Sélectionner une catégorie de bug",
    categories: {
      ui: "Problème d'interface (UI/UX)",
      api: "Erreur API / Données",
      crash: "Performance / Plante",
      feature: "Demande de fonctionnalité"
    },
    githubCard: {
      title: "Soumettre directement via GitHub Issues",
      description: "En cliquant sur le bouton ci-dessous, votre modèle ainsi que les paramètres de votre appareil seront préparés pour ouvrir la page GitHub.",
      buttonText: "Signaler {{category}}"
    },
    attributionCard: {
      title: "Mentions concernant les API tierces",
      description: "Toutes les données affichées proviennent directement de réseaux externes via les architectures publiques de Gamepower et CheapShark. Frapp ne modifie pas les prix ni la disponibilité."
    },
    footerVersion: "Version de Frapp v1.1.4",
    alerts: {
      errorTitle: "Erreur",
      errorMessage: "Impossible de rediriger vers GitHub. Vérifiez les autorisations de votre navigateur."
    },
    github: {
      bodyDescription: "Cette action supprimera définitivement tous les giveaways enregistrés. Vous devrez les rechercher et les ajouter à nouveau manuellement.",
      step1: "Ouvrir l'application",
      step2: "Naviguer vers...",
      step3: "Observer..."
    }
  },
  footer: {
    build: "Version de Frapp {{version}}"
  },
  updateModal: {
    title: "Mise à jour disponible",
    subtitle: "{{version}} est disponible !",
    description: "Une nouvelle version ({{latest}}) est disponible. Mettez à jour votre version actuelle ({{current}}) pour profiter des dernières nouveautés !",
    later: "Annuler",
    updateNow: "Mettre à jour"
  },
  modals: {
    dismiss: "Tout effacer",
    ok: "OK",
    testFailedTitle: "Échec du test",
    testFailedMessage: "Impossible d'exécuter la boucle de rendu. Vérifiez vos autorisations locales.",
    upToDateTitle: "À jour",
    upToDateMessage: "Vous utilisez déjà la version la plus récente ({{version}}). Aucune mise à jour requise.",
    upToDateAction: "Parfait",
    checkFailedTitle: "Échec de vérification",
    checkFailedMessage: "Impossible de vérifier les mises à jour. Vérifiez votre connexion Internet et réessayez.",
    failedAction: "Fermer",
    socialsTitle: "Partager la promo",
    languageTitle: "Choisir la langue"
  },
  giveaways: {
    title: "Giveaways.",
    summary: {
      prefix: "Nous avons trouvé ",
      midActive: " giveaways de jeux actifs en date du ",
      midWorth: ", d'une valeur totale de ",
      suffix: ". Profitez-en avant leur expiration !"
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
      drmFree: "DRM-Free",
      itchio: "itch.io"
    },
    error: {
      title: "Connexion interrompue",
      description: "Impossible de synchroniser avec les serveurs pour le moment. Vérifiez votre connexion et réessayez.",
      retryButton: "Réessayer"
    },
    empty: {
      title: "Aucun giveaway trouvé",
      description: "Aucun giveaway actif n'est disponible pour cette plateforme actuellement.",
      viewAllButton: "Voir toutes les plateformes"
    },
    tracking: {
      days_left: "Encore {{count}} jours",
      day_left: "Encore 1 jour",
      ends_today: "Se termine aujourd'hui",
      expired: "Expiré",
      keys_left: "Clés restantes : {{count}}",
      instructions_title: "Instructions pour récupérer :"
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
      description: "Cette action supprimera définitivement tous les giveaways épinglés de votre liste enregistrée.",
      confirmButton: "Tout effacer"
    },
  },
  deals: {
    title: "Bons plans jeux.",
    titleClaim: "Profiter de l'offre.",
    claim: "Profiter de l'offre",
    retailer: "Revendeur",
    store: "Boutique",
    free_uppercase: "GRATUIT",
    share_message: "🔥 Alerte bon plan : {{title}} est à {{price}} (Économie : {{saved}}) sur {{platform}} !\nProfitez-en ici : {{url}}",
    save_amount: "-{{amount}}%",
    hot_deal: "Meilleure offre",
    rating: "{{percent}}",
    released: "Fin : ",
    no_description: "Profitez de cette offre exceptionnelle avant la fin de la promotion !",
    breakdown_title: "Voir les détails",
    breakdown_body: "Économisez un total de {{saved}} par rapport au prix officiel de {{original}} (soit une réduction de {{percent}}%).",
    summary: {
      prefix: "Nous avons analysé les boutiques et découvert ",
      midActive: " réductions importantes en date du ",
      suffix: ". Cliquez sur un jeu pour obtenir votre clé !"
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
      description: "Impossible de contacter les serveurs. Assurez-vous que votre appareil est connecté à Internet.",
      retryButton: "Réessayer"
    },
    empty: {
      title: "Aucun résultat",
      description: "Aucune offre trouvée dans cette catégorie.",
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
    legalSubtitle: "Veuillez lire les conditions de confidentialité avant de continuer.",
    title: "Suivez les giveaways et les meilleures réductions de jeux vidéo.",
    title2: "Obtenez des giveaways et des offres",
    description: "Frapp réunit jeux gratuits et promotions avantageuses sur plusieurs plateformes pour vous permettre de jouer plus tout en dépensant moins.",
    privacyHeader: "Confidentialité & Données",
    privacyBody: "Frapp est un agrégateur de données open source axé sur la confidentialité. Toutes vos données restent stockées localement sur votre appareil.",
    consentLabel: "J'accepte les conditions d'utilisation et la politique de confidentialité",
    btnStep1: "Continuer",
    btnStep2: "Commencer",
    versionLabel: "Frapp • v1.1.4"
  }
} as const;