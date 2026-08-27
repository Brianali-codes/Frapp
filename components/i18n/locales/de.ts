export const de = {
  header: {
    title: "Einstellungen.",
    subtitle: "App-Verhalten anpassen, Benachrichtigungen verwalten, Anzeigeoptionen ändern oder Open-Source-Lizenzen lesen."
  },
  sections: {
    preferences: "Einstellungen.",
    about: "Über.",
    community: "Community & Support.",
    providers: "Datenanbieter."
  },
  preferences: {
    themeAppearance: "Erscheinungsbild",
    themeDark: "Dunkelmodus",
    themeLight: "Hellmodus",
    appLanguage: "App-Sprache",
    appLanguageSub: "Sprache wechseln",
    savedGiveaways: "Meine Bibliothek.",
    savedGiveawaysSub: "Gespeicherte Spiele anzeigen",
    notificationSettings: "Benachrichtigungen",
    notificationSettingsSub: "Push-Mitteilungen einstellen",
    appIntroduction: "Einführung",
    appIntroductionSub: "Einführungstext erneut anzeigen",
    checkForUpdates: "App-Version",
    checkForUpdatesSub: "Nach Updates suchen",
    Report: "Fehler melden",
    ReportSub: "Problem oder Fehler melden",
  },
  about: {
    developer: "Über den Entwickler",
    developerSub: "Entwickler-Portfolio besuchen",
    moreApps: "Weitere Apps",
    moreAppsSub: "GitHub-Repositorys erkunden",
    socials: "Soziale Medien",
    socialsSub: "Auf allen Plattformen verbinden",
    privacy: "Datenschutzrichtlinie",
    privacySub: "Datenschutzerklärung lesen."
  },
  community: {
    supportOpenSource: "Open Source unterstützen",
    supportOpenSourceSub: "Diese App ist unabhängig entwickelt und kostenlos gehostet. Wenn dir das Entdecken von Angeboten gefällt, lass uns gerne einen Stern auf GitHub da!",
    starGithub: "Stern auf GitHub geben",
    buyCoffee: "Kaffee spendieren",
    buyCoffeeSub: "Hilf uns, die Server aktiv zu halten! Eine kleine Spende hilft dabei, das Projekt zu pflegen und neue Funktionen hinzuzufügen.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower-Website",
    gamepowerSub: "Hauptdatenquelle für Giveaways",
    cheapshark: "CheapShark API",
    cheapsharkSub: "API für Spiele-Angebote"
  },
  report: {
    title: "Fehler melden.",
    subtitle: "Fehler oder Probleme melden",
    sectionTitle: "Fehlerkategorie auswählen",
    categories: {
      ui: "UI/UX-Fehler",
      api: "API- / Datenfehler",
      crash: "Leistung / Absturz",
      feature: "Funktionswunsch"
    },
    githubCard: {
      title: "Direkt über GitHub Issues einreichen",
      description: "Ein Klick auf die Schaltfläche erstellt eine Vorlage mit deinen Angaben sowie System-Informationen und öffnet die GitHub-Fehlerverfolgung.",
      buttonText: "{{category}} melden"
    },
    attributionCard: {
      title: "Drittanbieter-API-Hinweis",
      description: "Alle Daten in der App stammen direkt aus externen Netzwerken über die offenen APIs von Gamepower und CheapShark. Die Nutzung dieser Daten erfolgt gemäß deren Richtlinien. Frapp verändere weder Einträge noch Preise oder Verteilungszeiträume. Wir übernehmen keine Garantie für die ständige Verfügbarkeit oder Genauigkeit externer Schlüssel oder Dienste."
    },
    alerts: {
      errorTitle: "Fehler",
      errorMessage: "Weiterleitung zu GitHub fehlgeschlagen. Bitte Browser-Berechtigungen prüfen."
    },
    github: {
      bodyDescription: "Dadurch werden alle gespeicherten Giveaways dauerhaft aus deiner Bibliothek entfernt. Du musst sie bei Bedarf manuell erneut hinzufügen.",
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
    description: "Eine neue Version der App ({{latest}}) ist verfügbar. Aktualisiere von deiner aktuellen Version ({{current}}), um die neuesten Funktionen zu nutzen!",
    later: "Abbrechen",
    updateNow: "Jetzt aktualisieren"
  },
  modals: {
    dismiss: "Alles löschen",
    ok: "OK",
    testFailedTitle: "Test-Fehler",
    testFailedMessage: "Rendering-Schleife konnte nicht ausgeführt werden. Bitte Berechtigungen überprüfen.",
    upToDateTitle: "Auf dem neuesten Stand",
    upToDateMessage: "Du verwendest bereits die aktuellste Version ({{version}}). Keine Updates erforderlich.",
    upToDateAction: "Super",
    checkFailedTitle: "Prüfung fehlgeschlagen",
    checkFailedMessage: "Abfrage konnte nicht abgeschlossen werden. Bitte überprüfe deine Internetverbindung und versuche es erneut.",
    failedAction: "Schließen",
    socialsTitle: "Teilen",
    languageTitle: "Sprache auswählen"
  },
  giveaways: {
    title: "Giveaways.",
    summary: {
      prefix: "Wir haben ",
      midActive: " aktive Spiele-Giveaways am ",
      midWorth: " im Gesamtwert von ",
      suffix: " gefunden. Hole sie dir, bevor sie ablaufen!"
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
      description: "Keine Verbindung zum Server möglich. Stelle sicher, dass dein Gerät online ist, und versuche es erneut.",
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
      prefix: "Du hast ",
      midActive: " gespeicherte Spiele ",
      midWorth: " im Gesamtwert von ",
      suffix: ". Hole sie dir, bevor sie ablaufen!"
    },
    empty: {
      viewAllButton: "App erkunden"
    },
    delete: {
      title: "Alle Spiele löschen?",
      description: "Dadurch werden alle gespeicherten Giveaways dauerhaft aus deiner Liste entfernt. Du musst sie manuell neu hinzufügen.",
      confirmButton: "Alles löschen"
    },
  },
  deals: {
    title: "Spiele-Angebote.",
    titleClaim: "Angebot sichern.",
    claim: "Angebot sichern",
    retailer: "Händler",
    store: "Shop",
    free_uppercase: "GRATIS",
    steam_rating: "{{percent}}% Steam-Bewertung {{text}}",
    metacritic_score: "Metacritic: {{score}}",
    share_message: "🔥 Angebot-Alarm: {{title}} gibt es jetzt für {{price}} (Ersparnis: {{saved}}) auf {{platform}}!\nHier holen: {{url}}",
    save_amount: "{{amount}}% RABATT",
    carousel_description: "Perfekter Deal-Index von {{rating}}/10! Spare sofort ${{saved}}.",
    hot_deal: "Top-Angebot",
    best_price: "Bester Preis",
    verified_promo: "Geprüftes Angebot",
    view: "Angebot ansehen",
    no_competing_offers: "Keine weiteren Shop-Angebote für diesen Titel registriert.",
    rating: "{{percent}}",
    no_description: "Sichere dir dieses Angebot, bevor der Aktionszeitraum abläuft!",
    breakdown_title: "Details anzeigen",
    breakdown_body: "Du sparst insgesamt {{saved}} gegenüber dem regulären Preis von {{original}} (das entspricht {{percent}}% Rabatt).",
    live_store_comparisons: "Live-Shop-Vergleich",
    lowest_price_ever: "Bisheriger Tiefstpreis",
    all_time_low: "Allzeittief",
    lowest_price_recorded: "Niedrigster erfasster Preis",
    lowest_price_nodate: "Historischer Tiefstpreis: ${{price}}",
    summary: {
      prefix: "Wir haben Spiele-Stores durchsucht und ",
      midActive: " riesige Rabatte am ",
      suffix: " entdeckt. Tippe auf einen Titel, um dir deinen Key zu sichern!"
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
      description: "Keine Verbindung zum Server möglich. Stelle sicher, dass dein Gerät online ist, und versuche es erneut.",
      retryButton: "Erneut versuchen"
    },
    empty: {
      title: "Keine Treffer gefunden",
      description: "Keine aktiven Angebote in dieser Shop-Kategorie gefunden.",
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
    legalSubtitle: "Bitte lies die Datenschutzbedingungen, bevor du auf unsere Daten-Pipelines zugreifst.",
    title: "Verfolge Giveaways & Angebote für Videospiele.",
    title2: "Videospiel-Giveaways und Angebote",
    description: "Frapp vereint 100% kostenlose Giveaways und riesige Spiele-Rabatte aus verschiedenen Stores, damit du immer mehr für weniger Geld spielst.",
    privacyHeader: "Datenschutz & Architektur",
    privacyBody: "Frapp ist ein Open-Source-Datenaggregator. Da die Anwendung nach dem Local-First-Prinzip arbeitet, werden keine Daten auf zentralen Servern gespeichert oder Nutzer-Telemetriedaten erfasst. Alle Berechnungen erfolgen direkt auf deinem Gerät. Deine Einstellungen und gespeicherte Daten bleiben sicher lokal gespeichert.",
    consentLabel: "Ich akzeptiere die Nutzungsbedingungen & Datenschutzerklärung",
    btnStep1: "Weiter",
    btnStep2: "Loslegen",
    versionLabel: "v1.1.6",
    permissionsTitle: "App-Berechtigungen",
    permissionsSubtitle: "Frapp benötigt Zugriff auf Benachrichtigungen und Weckfunktionen. Bitte erteile die Berechtigungen für ein optimales Erlebnis. Auf Android 14+ Geräten ist eventuell die Berechtigung für exakte Alarme erforderlich.",
    pushTitle: "Push-Benachrichtigungen",
    pushDesc: "Erhalte sofortige Benachrichtigungen, wenn neue Gratisspiele oder Rabatte verfügbar sind.",
    granted: "Bereit",
    allow: "Erlauben",
    alarmTitle: "Exakte Erinnerungen",
    alarmDesc: "Plane präzise 24-Stunden-Erinnerungen für ablaufende Spiele in deiner Bibliothek.",
    setup: "Einrichten"
  }
} as const;