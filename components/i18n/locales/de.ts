export const de = {
  header: {
    title: "Einstellungen.",
    subtitle: "Anwendungsverhalten anpassen, Benachrichtigungen verwalten, Anzeigeeinstellungen ändern oder Open-Source-Quellangaben lesen."
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
    savedGiveawaysSub: "Auf gespeicherte Spiele zugreifen",
    notificationSettings: "Benachrichtigungseinstellungen",
    notificationSettingsSub: "Push-Benachrichtigungen aktivieren",
    appIntroduction: "Onboarding",
    appIntroductionSub: "Onboarding-Kontext überprüfen",
    checkForUpdates: "App-Version",
    checkForUpdatesSub: "Nach Updates suchen"
  },
  about: {
    developer: "Über den Entwickler",
    developerSub: "Persönliches Portfolio besuchen",
    moreApps: "Weitere Anwendungen",
    moreAppsSub: "GitHub-Repositories erkunden",
    socials: "Soziale Medien",
    socialsSub: "Plattformübergreifend verbinden",
    privacy: "Datenschutz-Bestimmungen",
    privacySub: "Unsere Datenschutzrichtlinie anzeigen."
  },
  community: {
    supportOpenSource: "Open Source unterstützen",
    supportOpenSourceSub: "Diese Anwendung wird unabhängig entwickelt und kostenlos gehostet. Wenn Sie Nutzen aus diesen Angeboten ziehen, hilft uns ein Stern auf GitHub sehr weiter!",
    starGithub: "Stern auf GitHub geben",
    buyCoffee: "Kaffee spenden",
    buyCoffeeSub: "Helfen Sie mit, die Server online und den Kaffee im Fluss zu halten! Eine kleine Spende ermöglicht es uns, das Projekt zu warten und neue Funktionen hinzuzufügen.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower-Webseite",
    gamepowerSub: "Hauptdatenquelle für Werbegeschenke",
    cheapshark: "CheapShark API",
    cheapsharkSub: "API für Videospiel-Angebote"
  },
  report: {
    title: "Fehler melden.",
    subtitle: "Haben Sie Probleme mit der App? Wählen Sie eine Vorlage aus, um einen Bericht einzureichen. (Berichte werden zur Überprüfung an unser GitHub-Repository übermittelt)",
    sectionTitle: "Wählen Sie eine Fehlerkategorie",
    categories: {
      ui: "UI/UX-Fehler",
      api: "API- / Datenfehler",
      crash: "Leistung / Absturz",
      feature: "Funktionsanfrage"
    },
    githubCard: {
      title: "Direkt über GitHub Issues einreichen",
      description: "Durch Klicken auf die Schaltfläche unten wird Ihre Auswahl mit den lokalen Geräteparametern gebündelt und die GitHub Issue-Tracking-Seite geöffnet.",
      buttonText: "Kategorie {{category}} melden"
    },
    attributionCard: {
      title: "Drittanbieter-API-Offenlegungen",
      description: "Alle in der Benutzeroberfläche sichtbaren Datenindizes werden direkt von externen Netzwerken über die öffentlichen Architekturen von Gamepower und CheapShark abgerufen. Die Nutzung dieser Indizes entspricht direkt deren nativen Verteilungsregeln. Frapp manipuliert keine einzelnen Angebote, ändert keine Preisstrukturen und verwaltet keine Verteilungszeitpläne. Infolgedessen können wir die ununterbrochene Verfügbarkeit, Genauigkeit oder fortlaufende Unterstützung externer Knoten oder Schlüssel nicht garantieren."
    },
    footerVersion: "Frapp Version v1.1.4",
    alerts: {
      errorTitle: "Fehler",
      errorMessage: "Weiterleitung zu GitHub nicht möglich. Überprüfen Sie die Browser-Routing-Berechtigungen."
    },
    github: {
      bodyDescription: "Diese Aktion entfernt alle angehefteten Werbegeschenke dauerhaft aus Ihrer gespeicherten Liste. Sie müssen sie manuell neu suchen und hinzufügen.",
      step1: "Öffnen Sie die App",
      step2: "Navigieren Sie zu...",
      step3: "Beobachten Sie..."
    }
  },
  footer: {
    build: "Frapp Version {{version}}"
  },
  updateModal: {
    title: "Update verfügbar",
    subtitle: "{{version}} ist da!",
    description: "Eine neuere Version der App ({{latest}}) ist verfügbar. Aktualisieren Sie Ihre aktuelle Version ({{current}}), um auf die neuesten Änderungen zuzugreifen!",
    later: "Abbrechen",
    updateNow: "Jetzt aktualisieren"
  },
  modals: {
    dismiss: "Alle löschen",
    ok: "OK",
    testFailedTitle: "Testziel-Fehler",
    testFailedMessage: "Die Bereitstellungs-Renderschleife konnte nicht ausgeführt werden. Bestätigen Sie die lokalen Berechtigungen.",
    upToDateTitle: "Auf dem neuesten Stand",
    upToDateMessage: "Sie führen bereits unsere neueste Build-Version ({{version}}) aus. Keine Updates erforderlich.",
    upToDateAction: "Super",
    checkFailedTitle: "Überprüfungsfehler",
    checkFailedMessage: "Suchanfragen konnten derzeit nicht abgeschlossen werden. Überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
    failedAction: "Schließen",
    socialsTitle: "Aktion teilen",
    languageTitle: "Sprache auswählen"
  },
  giveaways: {
    title: "Werbegeschenke.",
    summary: {
      prefix: "Wir haben ",
      midActive: " aktive Spiel-Werbegeschenke gefunden seit ",
      midWorth: ", mit einem Gesamtwert von ",
      suffix: ". Fordern Sie diese an, bevor sie ablaufen!"
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
      description: "Wir können derzeit keine Verbindung zu den Servern herstellen. Stellen Sie sicher, dass Ihr Gerät online ist, und versuchen Sie es erneut.",
      retryButton: "Verbindung erneut versuchen"
    },
    empty: {
      title: "Keine Werbegeschenke gefunden",
      description: "Für diese Plattform sind derzeit keine aktiven Werbegeschenke verfügbar.",
      viewAllButton: "Alle Plattformen anzeigen"
    },
    tracking: {
      days_left: "Noch {{count}} Tage",
      day_left: "Noch 1 Tag",
      ends_today: "Endet heute",
      expired: "Abgelaufen",
      keys_left: "Verbleibende Schlüssel: {{count}}",
      instructions_title: "Anleitung zum Anfordern:"
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
      midWorth: ", mit einem Gesamtwert von ",
      suffix: ". Fordern Sie diese an, bevor sie ablaufen!"
    },
    empty: {
      viewAllButton: "App erkunden"
    },
    delete: {
      title: "Alle Spiele löschen?",
      description: "Diese Aktion entfernt alle angehefteten Werbegeschenke dauerhaft aus Ihrer gespeicherten Liste. Sie müssen sie manuell neu suchen und hinzufügen.",
      confirmButton: "Alle löschen"
    }
  },
  deals: {
    title: "Spiele-Angebote.",
    titleClaim: "Angebot einlösen.",
    claim: "Angebot einlösen",
    retailer: "Händler",
    store: "Shop",
    free_uppercase: "KOSTENLOS",
    share_message: "🔥 Angebotsalarm: {{title}} ist runter auf {{price}} (Ersparnis {{saved}}) auf {{platform}}!\nHier holen: {{url}}",
    save_amount: "{{amount}}% RABATT",
    hot_deal: "Top-Angebot",
    rating: "{{percent}}",
    released: "Endet: ",
    no_description: "Sichern Sie sich dieses außergewöhnliche Angebot, bevor der Aktionszeitraum abläuft oder sich die Preise ändern!",
    breakdown_title: "Details anzeigen",
    breakdown_body: "Sparen Sie insgesamt {{saved}} gegenüber dem regulären Verkaufspreis von {{original}} (was einem Rabatt von {{percent}}% entspricht).",
    summary: {
      prefix: "Wir haben aktive Gaming-Shops durchsucht und ",
      midActive: " riesige Rabatte gefunden seit ",
      suffix: ". Tippen Sie auf einen Titel, um Ihren Schlüssel zu sichern!"
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
      description: "Wir können derzeit keine Verbindung zu den Servern herstellen. Stellen Sie sicher, dass Ihr Gerät online ist, und versuchen Sie es erneut.",
      retryButton: "Verbindung erneut versuchen"
    },
    empty: {
      title: "Keine Treffer gefunden",
      description: "Keine Live-Angebote in dieser Shop-Kategorie gefunden.",
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
    legalTitle: "Rechtliche Vereinbarungen",
    legalSubtitle: "Bitte überprüfen Sie die Datenschutzbedingungen, bevor Sie auf unsere globalen Datensynchronisations-Pipelines zugreifen.",
    title: "Verfolgen Sie Videospiel-Werbegeschenke und erstklassige Spiele-Angebote.",
    title2: "Holen Sie sich Werbegeschenke und Angebote",
    description: "Frapp bietet sowohl Spiel-Werbegeschenke als auch riesige Rabatte auf Videospiele. Wir aggregieren die neuesten 100% kostenlos anforderbaren Belohnungen zusammen mit tiefen Händlerrabatten über verschiedene Shops hinweg.",
    privacyHeader: "Datenschutz- & Datenkern-Framework",
    privacyBody: "Frapp ist ein Open-Source-Datenaggregator, der Ihre unterschiedlichen Datenströme, API-Feeds und digitalen Berührungspunkte in einem einzigen Dashboard zusammenführt. Da wir vollständig als Lokales-First-Tool arbeiten, unterhalten wir keine zentrale Speicherung, erfassen keine physischen Kontostrukturen und verfolgen keine Benutzer-Telemetriedaten.",
    consentLabel: "Ich akzeptiere die Nutzungsbedingungen & Datenschutzerklärung",
    btnStep1: "Weiter",
    btnStep2: "Loslegen",
    versionLabel: "Frapp • v1.1.4"
  }
} as const;