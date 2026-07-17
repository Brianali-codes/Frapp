// src/i18n/locales/de.ts
export const de = {
  header: {
    title: "Einstellungen.",
    subtitle: "Passen Sie das Anwendungsverhalten an, ändern Sie Benachrichtigungen, wechseln Sie die Anzeigeeinstellungen oder lesen Sie Open-Source-Anmeldeinformationen."
  },
  sections: {
    preferences: "Präferenzen.",
    about: "Über uns.",
    community: "Community & Support.",
    providers: "Datenanbieter."
  },
  preferences: {
    themeAppearance: "Design-Erscheinungsbild",
    themeDark: "Dunkelmodus",
    themeLight: "Hellmodus",
    appLanguage: "App-Sprache",
    appLanguageSub: "Übersetzungsebenen wechseln",
    savedGiveaways: "Meine Bibliothek",
    savedGiveawaysSub: "Auf lesezeichengespeicherte Spiele zugreifen",
    notificationSettings: "Benachrichtigungseinstellungen",
    notificationSettingsSub: "Push-Konfigurationen umschalten",
    appIntroduction: "App-Einführung",
    appIntroductionSub: "Onboarding-Kontext überprüfen",
    checkForUpdates: "Nach Updates suchen",
    checkForUpdatesSub: "App-Build-Iterationen überprüfen"
  },
  about: {
    developer: "Über den Entwickler",
    developerSub: "Persönliches Portfolio besuchen",
    moreApps: "Weitere Anwendungen",
    moreAppsSub: "GitHub-Repositories durchsuchen",
    socials: "Soziale Medien",
    socialsSub: "Plattformübergreifend verbinden",
    privacy: "Datenschutzerklärung",
    privacySub: "Frapp-Richtlinien anzeigen"
  },
  community: {
    supportOpenSource: "Open Source unterstützen",
    supportOpenSourceSub: "Diese Anwendung wird unabhängig entwickelt und kostenlos gehostet. Wenn Sie einen Mehrwert darin sehen, diese Angebote zu entdecken, hilft uns ein Stern auf GitHub sehr weiter!",
    starGithub: "Uns einen Stern auf GitHub geben",
    buyCoffee: "Projekt unterstützen",
    buyCoffeeSub: "Helfen Sie mit, die Server am Laufen zu halten! Eine kleine Spende ermöglicht es uns, das Projekt zu warten und neue Funktionen hinzuzufügen.",
    donateKofi: "Auf Ko-fi spenden",
    donatePatreon: "Auf Patreon spenden"
  },
  providers: {
    gamepower: "Gamepower-Webseite",
    gamepowerSub: "Hauptdatenquelle für Giveaways",
    cheapshark: "CheapShark-API",
    cheapsharkSub: "API-Matrix für Videospiel-Angebote"
  },
  report: {
    title: "Gespeicherte Bibliothek löschen?",
    subtitle: "Haben Sie Probleme mit der App oder sind Ihnen fehlerhafte Preise aufgefallen? Wählen Sie unten eine Kategorie aus und senden Sie einen Bericht.",
    sectionTitle: "Fehlerkategorie auswählen",
    categories: {
      ui: "UI/UX-Fehler",
      api: "API- / Datenfehler",
      crash: "Leistung / Absturz",
      feature: "Funktionsanfrage"
    },
    githubCard: {
      title: "Direkt über GitHub Issues einreichen",
      description: "Wenn Sie auf die Schaltfläche unten klicken, wird Ihre Auswahl mit den Umgebungsparametern Ihres lokalen Geräts gebündelt und die GitHub-Fehlerverfolgungsseite geöffnet.",
      buttonText: "{{category}} melden"
    },
    attributionCard: {
      title: "Projekt- & API-Attribution",
      description: "Diese Open-Source-Distribution basiert vollständig auf Datenströmen, die von den Architekturen Gamepower und Free To Game bereitgestellt werden. Keine dieser unabhängigen APIs oder zugehörigen Inhaltselemente gehören direkt zu FRAPP."
    },
    footerVersion: "Frapp-Version v1.1.4",
    alerts: {
      errorTitle: "Fehler",
      errorMessage: "Weiterleitung zu GitHub fehlgeschlagen. Überprüfen Sie die Browser-Berechtigungen."
    },
    github: {
      bodyDescription: "Diese Aktion entfernt alle angepinnten Giveaways dauerhaft aus Ihrer Liste. Sie müssen sie manuell neu suchen und hinzufügen.",
      step1: "App öffnen",
      step2: "Navigieren zu...",
      step3: "Beobachten..."
    }
  },
  footer: {
    build: "Frapp-Version {{version}}"
  },
  updateModal: {
    title: "Update verfügbar",
    subtitle: "{{version}} ist da!",
    description: "Eine neuere Version der App ({{latest}}) ist verfügbar. Aktualisieren Sie Ihre aktuelle Version ({{current}}), um auf die neuesten Änderungen zuzugreifen!",
    later: "Abbrechen",
    updateNow: "Jetzt aktualisieren"
  },
  modals: {
    dismiss: "Alles löschen",
    ok: "OK",
    testFailedTitle: "Testzielfehler",
    testFailedMessage: "Rendering-Schleife konnte nicht ausgeführt werden. Lokale Berechtigungen bestätigen.",
    upToDateTitle: "Auf dem neuesten Stand",
    upToDateMessage: "Sie verwenden bereits unsere neueste Version ({{version}}). Keine Updates erforderlich.",
    upToDateAction: "Genial",
    checkFailedTitle: "Verifizierungsfehler",
    checkFailedMessage: "Suchanfragen konnten momentan nicht abgeschlossen werden. Überprüfen Sie Ihre Konnektivität und versuchen Sie es erneut.",
    socialsTitle: "Verbinden Sie sich mit mir",
    languageTitle: "Sprache auswählen"
  },
  giveaways: {
    title: "Kostenlos beanspruchen.",
    summary: {
      prefix: "Sie haben ",
      midActive: " Giveaways angepinnt, wodurch Sie insgesamt ",
      midWorth: "",
      suffix: " sparen! Beanspruchen Sie diese, bevor sie ablaufen."
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
      description: "Wir können uns derzeit nicht mit den Daten-Pipelines synchronisieren. Überprüfen Sie Ihren Internetzugang und versuchen Sie es erneut.",
      retryButton: "Verbindung erneut versuchen"
    },
    empty: {
      title: "Ihre Bibliothek ist leer",
      description: "Entdecken Sie laufende kostenlose Drops und tippen Sie auf das Herz-Symbol, um sie hier für das spätere Beanspruchen zu speichern!",
      viewAllButton: "App erkunden"
    },
    tracking: {
      days_left: "Noch {{count}} Tage",
      day_left: "Noch 1 Tag",
      ends_today: "Endet heute",
      expired: "Abgelaufen",
      keys_left: "Verbleibende Keys: {{count}}",
      instructions_title: "Anweisungen zum Beanspruchen:"
    },
    pagination: {
      previous: "Vorherige",
      next: "Nächste Spiele"
    }
  },
  deals: {
    title: "Spiel-Angebote.",
    claim: "Jetzt beanspruchen",
    retailer: "Händler",
    store: "Storefront",
    free_uppercase: "KOSTENLOS",
    share_message: "🔥 Angebotsalarm: {{title}} ist runter auf {{price}} (Ersparnis {{saved}}) auf {{platform}}!\nHier holen: {{url}}",
    save_amount: "${{amount}} SPAREN",
    hot_deal: "BEWERTET MIT",
    rating: "{{percent}}% Zustimmungsrate",
    released: "Endet: ",
    no_description: "Kein zusätzlicher Beschreibungskontext gefunden. Sichern Sie sich dieses Angebot, bevor sich die Werte ändern!",
    breakdown_title: "Angebotsinfo anzeigen",
    breakdown_body: "Sie sparen {{saved}} gegenüber dem ursprünglichen Preis von {{original}} (insgesamt {{percent}}% Rabatt).",
    summary: {
      prefix: "Wir haben die aktuellen Web-Store-Indizes durchsucht und ",
      midActive: " erstklassige Rabatte live am ",
      suffix: " entdeckt. Interagieren Sie mit einer beliebigen Karte, um Keys zu sichern!"
    },
    stores: {
      all: "Alle Stores",
      amazon: "Amazon"
    },
    empty: {
      title: "Keine Treffer gefunden",
      description: "Es wurden keine rabattierten Spiele gefunden, die dieser Store-Auswahl entsprechen.",
      resetButton: "Filter zurücksetzen"
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
  }
} as const;