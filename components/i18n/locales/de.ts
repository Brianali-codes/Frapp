export const de = {
  header: {
    title: "Einstellungen.",
    subtitle: "App-Verhalten anpassen, Benachrichtigungen verwalten, Anzeigeeinstellungen ändern oder Open-Source-Lizenzen lesen."
  },
  sections: {
    preferences: "Einstellungen.",
    about: "Über uns.",
    community: "Community & Support.",
    providers: "Datenanbieter."
  },
  preferences: {
    themeAppearance: "Erscheinungsbild",
    themeDark: "Dunkler Modus",
    themeLight: "Heller Modus",
    appLanguage: "App-Sprache",
    appLanguageSub: "Sprache wechseln",
    savedGiveaways: "Meine Bibliothek.",
    savedGiveawaysSub: "Gespeicherte Spiele anzeigen",
    notificationSettings: "Benachrichtigungen",
    notificationSettingsSub: "Push-Benachrichtigungen einstellen",
    appIntroduction: "Einführung",
    appIntroductionSub: "Einführungskontext anzeigen",
    checkForUpdates: "App-Version",
    checkForUpdatesSub: "Auf Updates prüfen",
    Report: "Fehler melden",
    ReportSub: "Fehler oder Probleme melden",
  },
  about: {
    developer: "Über den Entwickler",
    developerSub: "Persönliches Portfolio besuchen",
    moreApps: "Weitere Anwendungen",
    moreAppsSub: "GitHub-Repositories erkunden",
    socials: "Soziale Medien",
    socialsSub: "Auf Plattformen vernetzen",
    privacy: "Datenschutzrichtlinie",
    privacySub: "Datenschutzrichtlinie anzeigen."
  },
  community: {
    supportOpenSource: "Open Source unterstützen",
    supportOpenSourceSub: "Diese Anwendung wird unabhängig entwickelt und kostenlos bereitgestellt. Wenn Ihnen diese Angebote gefallen, hilft uns ein Stern auf GitHub sehr!",
    starGithub: "Stern auf GitHub geben",
    buyCoffee: "Kaffee spenden",
    buyCoffeeSub: "Helfen Sie mit, die Server online und den Kaffee am Laufen zu halten! Eine kleine Spende hilft uns, das Projekt zu pflegen und neue Funktionen hinzuzufügen.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower-Website",
    gamepowerSub: "Hauptquelle für Giveaways",
    cheapshark: "CheapShark API",
    cheapsharkSub: "API für Videospiel-Angebote"
  },
  report: {
    title: "Fehler melden.",
    subtitle: "Fehler oder Probleme melden",
    sectionTitle: "Fehlerkategorie auswählen",
    categories: {
      ui: "UI/UX-Fehler",
      api: "API-/Datenfehler",
      crash: "Leistung / Absturz",
      feature: "Funktionswunsch"
    },
    githubCard: {
      title: "Direkt über GitHub Issues einreichen",
      description: "Durch Klicken auf die Schaltfläche unten wird Ihre Auswahl mit den Gerätedaten gebündelt und die GitHub-Problemverfolgung geöffnet.",
      buttonText: "{{category}} melden"
    },
    attributionCard: {
      title: "Drittanbieter-API-Hinweis",
      description: "Alle in der Benutzeroberfläche angezeigten Daten werden direkt aus externen Netzwerken über die offenen Schnittstellen von Gamepower und CheapShark abgerufen. Frapp manipuliert keine Angebote oder Preise."
    },
    alerts: {
      errorTitle: "Fehler",
      errorMessage: "Weiterleitung zu GitHub fehlgeschlagen. Bitte Browser-Berechtigungen prüfen."
    },
    github: {
      bodyDescription: "Diese Aktion entfernt alle gespeicherten Giveaways dauerhaft aus Ihrer Liste. Sie müssen diese manuell erneut suchen und hinzufügen.",
      step1: "App öffnen",
      step2: "Navigieren zu...",
      step3: "Beobachten..."
    }
  },
  footer: {
    build: "Frapp Version {{version}}"
  },
  updateModal: {
    title: "Update verfügbar",
    subtitle: "{{version}} ist da!",
    description: "Eine neue Version der App ({{latest}}) ist verfügbar. Aktualisieren Sie Ihre aktuelle Version ({{current}}), um die neuesten Funktionen zu nutzen!",
    later: "Abbrechen",
    updateNow: "Jetzt aktualisieren"
  },
  modals: {
    dismiss: "Alle löschen",
    ok: "OK",
    testFailedTitle: "Test-Fehler",
    testFailedMessage: "Rendering-Schleife konnte nicht ausgeführt werden. Bitte lokale Berechtigungen prüfen.",
    upToDateTitle: "Auf dem neuesten Stand",
    upToDateMessage: "Sie verwenden bereits die neueste Version ({{version}}). Keine Updates erforderlich.",
    upToDateAction: "Super",
    checkFailedTitle: "Überprüfung fehlgeschlagen",
    checkFailedMessage: "Abfrage konnte nicht abgeschlossen werden. Bitte Internetverbindung prüfen und erneut versuchen.",
    failedAction: "Schließen",
    socialsTitle: "Promo teilen",
    languageTitle: "Sprache auswählen"
  },
  giveaways: {
    title: "Giveaways.",
    summary: {
      prefix: "Wir haben ",
      midActive: " aktive Spiel-Giveaways gefunden am ",
      midWorth: ", im Gesamtwert von ",
      suffix: ". Sichern Sie sich diese, bevor sie ablaufen!"
    },
    platforms: {
      all: "Alle",
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
      drmFree: "DRM-Frei",
      itchio: "itch.io"
    },
    error: {
      title: "Verbindung unterbrochen",
      description: "Keine Verbindung zum Server möglich. Stellen Sie sicher, dass Ihr Gerät online ist, und versuchen Sie es erneut.",
      retryButton: "Erneut versuchen"
    },
    empty: {
      title: "Keine Giveaways gefunden",
      description: "Für diese Plattform sind derzeit keine aktiven Giveaways verfügbar.",
      viewAllButton: "Alle Plattformen anzeigen"
    },
    tracking: {
      days_left: "Noch {{count}} Tage",
      day_left: "Noch 1 Tag",
      ends_today: "Endet heute",
      expired: "Abgelaufen",
      keys_left: "Verbleibende Keys: {{count}}",
      instructions_title: "Anleitung zum Einlösen:"
    },
    pagination: {
      previous: "Zurück",
      next: "Nächste Seite"
    }
  },
  giveaways1: {
    summary: {
      prefix: "Sie haben ",
      midActive: " gespeicherte Spiele ",
      midWorth: ", im Gesamtwert von ",
      suffix: ". Sichern Sie sich diese, bevor sie ablaufen!"
    },
    empty: {
      viewAllButton: "App erkunden"
    },
    delete: {
      title: "Alle Spiele löschen?",
      description: "Diese Aktion entfernt alle gespeicherten Giveaways dauerhaft aus Ihrer Liste.",
      confirmButton: "Alle löschen"
    },
  },
  deals: {
    title: "Spiel-Angebote.",
    titleClaim: "Angebot sichern.",
    claim: "Angebot sichern",
    retailer: "Händler",
    store: "Shop",
    free_uppercase: "GRATIS",
    share_message: "🔥 Deal-Alarm: {{title}} gibt es jetzt für {{price}} (Ersparnis {{saved}}) auf {{platform}}!\nHier holen: {{url}}",
    save_amount: "{{amount}}% RABATT",
    hot_deal: "Top-Angebot",
    rating: "{{percent}}",
    released: "Endet: ",
    no_description: "Sichern Sie sich dieses Angebot, bevor der Aktionszeitraum endet!",
    breakdown_title: "Details anzeigen",
    breakdown_body: "Sparen Sie insgesamt {{saved}} gegenüber dem regulären Preis von {{original}} (das entspricht einem Rabatt von {{percent}}%).",
    summary: {
      prefix: "Wir haben Shop-Angebote durchsucht und ",
      midActive: " riesige Rabatte gefunden am ",
      suffix: ". Tippen Sie auf einen Titel, um sich den Key zu sichern!"
    },
    stores: {
      all: "Alle Shops",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "Verbindung unterbrochen",
      description: "Keine Verbindung zum Server möglich. Bitte stellen Sie sicher, dass Ihr Gerät online ist.",
      retryButton: "Erneut versuchen"
    },
    empty: {
      title: "Keine Treffer gefunden",
      description: "Keine aktiven Angebote in dieser Kategorie gefunden.",
      resetButton: "Filter zurücksetzen"
    },
    pagination: {
      prev: "Zurück",
      next: "Nächste Spiele"
    }
  },
  months: {
    january: "Januar",
    february: "Februar",
    march: "März",
    april: "April",
    may: "Mai",
    june: "Juni",
    july: "Juli",
    august: "August",
    september: "September",
    october: "Oktober",
    november: "November",
    december: "Dezember"
  },
  onboarding: {
    welcome: "Willkommen bei Frapp",
    legalTitle: "Rechtliche Hinweise",
    legalSubtitle: "Bitte lesen Sie die Datenschutzbedingungen, bevor Sie fortfahren.",
    title: "Verfolgen Sie Gratis-Spiele und Top-Angebote.",
    title2: "Giveaways und Angebote erhalten",
    description: "Frapp aggregiert kostenlose Giveaways und riesige Rabatte auf verschiedenen Plattformen, damit Sie immer mehr für weniger Geld spielen.",
    privacyHeader: "Datenschutz & Architektur",
    privacyBody: "Frapp ist ein Open-Source-Datenaggregator, der als lokales Tool arbeitet. Wir speichern keine Daten auf zentralen Servern und verfolgen keine Nutzerdaten. Alle Daten verbleiben lokal auf Ihrem Gerät.",
    consentLabel: "Ich akzeptiere die Nutzungsbedingungen und Datenschutzbestimmungen",
    btnStep1: "Weiter",
    btnStep2: "Los geht's",
    versionLabel: "Frapp • v1.1.6"
  }
} as const;