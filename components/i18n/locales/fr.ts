// src/i18n/locales/fr.ts
export const fr = {
  header: {
    title: "Paramètres.",
    subtitle: "Personnalisez le comportement de l'application, ajustez les notifications, changez les paramètres d'affichage ou lisez les informations open-source."
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
    savedGiveaways: "Ma Bibliothèque",
    savedGiveawaysSub: "Accéder aux jeux enregistrés",
    notificationSettings: "Paramètres de notification",
    notificationSettingsSub: "Gérer les notifications push",
    appIntroduction: "Introduction de l'application",
    appIntroductionSub: "Revoir l'introduction d'accueil",
    checkForUpdates: "Vérifier les mises à jour",
    checkForUpdatesSub: "Vérifier la version de l'application"
  },
  about: {
    developer: "À propos du développeur",
    developerSub: "Visiter le portfolio personnel",
    moreApps: "Plus d'applications",
    moreAppsSub: "Explorer les dépôts GitHub",
    socials: "Réseaux Sociaux",
    socialsSub: "Se connecter sur les plateformes",
    privacy: "Politique de confidentialité",
    privacySub: "Voir les politiques de Frapp"
  },
  community: {
    supportOpenSource: "Soutenir l'Open Source",
    supportOpenSourceSub: "Cette application est développée de manière indépendante et hébergée gratuitement. Si vous aimez découvrir ces offres, nous laisser une étoile sur GitHub nous aide énormément !",
    starGithub: "Nous donner une étoile sur GitHub",
    buyCoffee: "Soutenir le projet",
    buyCoffeeSub: "Aidez-nous à maintenir les serveurs actifs ! Un petit don nous permet de poursuivre le projet et d'ajouter de nouvelles fonctionnalités.",
    donateKofi: "Faire un don sur Ko-fi",
    donatePatreon: "Faire un don sur Patreon"
  },
  providers: {
    gamepower: "Site Gamepower",
    gamepowerSub: "Source principale pour les cadeaux",
    cheapshark: "API CheapShark",
    cheapsharkSub: "Matrice d'API pour les offres de jeux"
  },
  report: {
    title: "Vider la bibliothèque sauvegardée ?",
    subtitle: "Vous rencontrez un problème avec l'application ou vous remarquez des prix incohérents ? Choisissez une catégorie ci-dessous et envoyez un rapport.",
    sectionTitle: "Sélectionnez une catégorie de bug",
    categories: {
      ui: "Problème d'interface (UI/UX)",
      api: "Erreur API / Données",
      crash: "Performance / Crash",
      feature: "Demande de fonctionnalité"
    },
    githubCard: {
      title: "Soumettre directement via GitHub Issues",
      description: "En cliquant sur le bouton ci-dessous, votre sélection ainsi que les paramètres de votre appareil seront intégrés pour ouvrir un ticket sur GitHub.",
      buttonText: "Signaler un bug : {{category}}"
    },
    attributionCard: {
      title: "Attribution du projet et de l'API",
      description: "Cette distribution open-source repose entièrement sur les flux fournis par les architectures de Gamepower et Free To Game. Aucune de ces API indépendantes ou entités associées n'appartient directement à FRAPP."
    },
    footerVersion: "Version Frapp v1.1.4",
    alerts: {
      errorTitle: "Erreur",
      errorMessage: "Impossible de rediriger vers GitHub. Vérifiez les autorisations de votre navigateur."
    },
    github: {
      bodyDescription: "Cette action supprimera définitivement tous les cadeaux épinglés de votre liste. Vous devrez les explorer et les rajouter manuellement.",
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
    subtitle: "{{version}} est là !",
    description: "Une nouvelle version de l'application ({{latest}}) est disponible. Mettez à jour votre version actuelle ({{current}}) pour accéder aux derniers changements !",
    later: "Annuler",
    updateNow: "Mettre à jour maintenant"
  },
  modals: {
    dismiss: "Tout effacer",
    ok: "OK",
    testFailedTitle: "Échec de la cible de test",
    testFailedMessage: "Impossible d'exécuter la boucle de rendu. Confirmez les autorisations locales.",
    upToDateTitle: "À jour",
    upToDateMessage: "Vous utilisez déjà la version la plus récente ({{version}}). Aucune mise à jour nécessaire.",
    upToDateAction: "Super",
    checkFailedTitle: "Échec de la vérification",
    checkFailedMessage: "Impossible de terminer la recherche pour le moment. Vérifiez votre connexion et réessayez.",
    socialsTitle: "Me rejoindre",
    languageTitle: "Choisir la langue"
  },
  giveaways: {
    title: "Gratuit à réclamer.",
    summary: {
      prefix: "Vous avez épinglé ",
      midActive: " cadeaux à réclamer, vous économisant un total de ",
      midWorth: "",
      suffix: " ! Assurez-vous de les réclamer avant leur expiration."
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
      description: "Nous ne pouvons pas nous synchroniser avec les serveurs pour le moment. Vérifiez votre accès Internet et réessayez.",
      retryButton: "Réessayer la connexion"
    },
    empty: {
      title: "Votre bibliothèque est vide",
      description: "Explorez les cadeaux en cours et appuyez sur l'icône de cœur pour les enregistrer ici afin de les réclamer facilement plus tard !",
      viewAllButton: "Explorer l'application"
    },
    tracking: {
      days_left: "Plus que {{count}} jours",
      day_left: "Plus que 1 jour",
      ends_today: "Se termine aujourd'hui",
      expired: "Expiré",
      keys_left: "Clés restantes : {{count}}",
      instructions_title: "Instructions pour réclamer :"
    },
    pagination: {
      previous: "Précédent",
      next: "Jeux suivants"
    }
  },
  deals: {
    title: "Offres de jeux.",
    claim: "Réclamer maintenant",
    retailer: "Revendeur",
    store: "Boutique",
    free_uppercase: "GRATUIT",
    share_message: "🔥 Alerte Offre : {{title}} est à seulement {{price}} (Économie de {{saved}}) sur {{platform}} !\nProfitez-en ici : {{url}}",
    save_amount: "ÉCONOMISEZ ${{amount}}",
    hot_deal: "ESTIMÉ À",
    rating: "{{percent}}% d'avis positifs",
    released: "Fin : ",
    no_description: "Aucun contexte de description supplémentaire trouvé. Saisissez cette offre avant que son prix ne change !",
    breakdown_title: "Voir les détails de l'offre",
    breakdown_body: "Vous économisez {{saved}} par rapport au prix d'origine de {{original}} (soit {{percent}}% de réduction globale).",
    summary: {
      prefix: "Nous avons analysé les boutiques en ligne et détecté ",
      midActive: " remises exceptionnelles en direct au ",
      suffix: ". Interagissez avec n'importe quelle carte pour obtenir vos clés !"
    },
    stores: {
      all: "Toutes les boutiques",
      amazon: "Amazon"
    },
    empty: {
      title: "Aucun résultat trouvé",
      description: "Aucune offre de jeu répertoriée ne correspond à cette boutique.",
      resetButton: "Réinitialiser les filtres"
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
  }
} as const;