export const de = {
  header: {
    title: "Einstellungen.",
    subtitle: "Passen Sie das App-Verhalten an, ändern Sie Benachrichtigungen, schalten Sie Anzeigeoptionen um oder lesen Sie Open-Source-Referenzen."
  },
  sections: {
    preferences: "Präferenzen.",
    about: "Über uns.",
    community: "Community & Support.",
    providers: "Datenanbieter."
  },
  preferences: {
    themeAppearance: "Design-Erscheinungsbild",
    themeDark: "Dark Mode",
    themeLight: "Light Mode",
    appLanguage: "App-Sprache",
    appLanguageSub: "Sprache wechseln",
    savedGiveaways: "Meine Bibliothek.",
    savedGiveawaysSub: "Auf gespeicherte Spiele zugreifen",
    notificationSettings: "Benachrichtigungen",
    notificationSettingsSub: "Push-Benachrichtigungen umschalten",
    appIntroduction: "Onboarding",
    appIntroductionSub: "Onboarding-Kontext anzeigen",
    checkForUpdates: "App-Version",
    checkForUpdatesSub: "Auf Updates prüfen"
  },
  about: {
    developer: "Über den Entwickler",
    developerSub: "Persönliches Portfolio besuchen",
    moreApps: "Weitere Anwendungen",
    moreAppsSub: "GitHub-Repositories durchsuchen",
    socials: "Social Media",
    socialsSub: "Auf Plattformen vernetzen",
    privacy: "Datenschutzerklärung",
    privacySub: "Unsere Datenschutzerklärung ansehen."
  },
  community: {
    supportOpenSource: "Open Source unterstützen",
    supportOpenSourceSub: "Diese Anwendung wird unabhängig entwickelt und kostenlos bereitgestellt. Wenn Ihnen das Finden dieser Angebote gefällt, hilft uns ein Stern auf GitHub sehr weiter!",
    starGithub: "Uns auf GitHub bewerten",
    buyCoffee: "Kaffee spendieren",
    buyCoffeeSub: "Helfen Sie mit, die Server am Laufen und den Kaffee im Fluss zu halten! Eine kleine Spende ermöglicht es uns, das Projekt zu pflegen und neue Funktionen hinzuzufügen.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower-Seite",
    gamepowerSub: "Primäre Datenquelle für Giveaways",
    cheapshark: "CheapShark-API",
    cheapsharkSub: "API für Videospiel-Angebote"
  },
  report: {
    title: "Fehler melden.",
    subtitle: "Haben Sie Probleme mit der App? Wählen Sie eine Vorlage aus, um einen Bericht zu senden. (Berichte werden zur Überprüfung an unser GitHub-Repository übermittelt)",
    sectionTitle: "Fehlerkategorie auswählen",
    categories: {
      ui: "UI/UX-Fehler",
      api: "API- / Datenfehler",
      crash: "Performance / Absturz",
      feature: "Feature-Wunsch"
    },
    githubCard: {
      title: "Direkt via GitHub Issues einreichen",
      description: "Durch Klicken auf die Schaltfläche unten wird Ihre ausgewählte Vorlage mitsamt den lokalen Geräteumgebungsparametern sicher gebündelt und die GitHub-Fehlerverfolgungsseite geöffnet.",
      buttonText: "{{category}} melden"
    },
    attributionCard: {
      title: "API-Offenlegung von Drittanbietern",
      description: "Alle auf der Benutzeroberfläche sichtbaren Datenindizes werden über die offenen öffentlichen Architekturen von Gamepower und CheapShark direkt aus externen Netzwerken geladen. Die Nutzung dieser Indizes entspricht direkt deren nativen Verteilungsregeln. Frapp manipuliert keine einzelnen Artikellisten, ändert keine Preisstrukturen und verwaltet keine Verteilungszeitpläne. Daher können wir die ununterbrochene Verfügbarkeit, Genauigkeit oder fortlaufende Unterstützung externer Knoten oder Schlüssel, die über diese jeweiligen Plattformen verteilt werden, nicht garantieren."
    },
    footerVersion: "Frapp-Version v1.1.4",
    alerts: {
      errorTitle: "Fehler",
      errorMessage: "Weiterleitung zu GitHub fehlgeschlagen. Überprüfen Sie die Routing-Berechtigungen des Browsers."
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
    testFailedTitle: "Testziel-Fehler",
    testFailedMessage: "Die Rendering-Schleife für die sofortige Bereitstellung konnte nicht ausgeführt werden. Bestätigen Sie die lokalen Berechtigungen.",
    upToDateTitle: "Auf dem neuesten Stand",
    upToDateMessage: "Sie verwenden bereits unsere neueste Build-Version ({{version}}). Keine Updates erforderlich.",
    upToDateAction: "Genial",
    checkFailedTitle: "Verifizierungsfehler",
    checkFailedMessage: "Suchabfragen konnten derzeit nicht abgeschlossen werden. Überprüfen Sie Ihren Verbindungsindex und versuchen Sie es erneut.",
    socialsTitle: "Promo teilen",
    languageTitle: "Sprache auswählen"
  },
  giveaways: {
    title: "Giveaways.",
    summary: {
      prefix: "Wir haben ",
      midActive: " aktive Spiele-Giveaways mit Stand vom ",
      midWorth: " gefunden, im Gesamtwert von ",
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
      description: "Wir können uns derzeit nicht mit den Upstream-Such-Pipelines synchronisieren. Überprüfen Sie Ihren Internetzugang und versuchen Sie es erneut.",
      retryButton: "Verbindung erneut versuchen"
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
      description: "Diese Aktion entfernt alle angepinnten Giveaways dauerhaft aus Ihrer Liste. Sie müssen sie manuell neu suchen und hinzufügen.",
      confirmButton: "Alles löschen"
    }
  },
  deals: {
    title: "Spiele-Angebote.",
    titleClaim: "Angebot sichern.",
    claim: "Angebot sichern",
    retailer: "Händler",
    store: "Store",
    free_uppercase: "GRATIS",
    share_message: "🔥 Deal-Alarm: {{title}} gibt es jetzt für nur {{price}} (Du sparst {{saved}}) auf {{platform}}!\nHier holen: {{url}}",
    save_amount: "{{amount}}% RABATT",
    hot_deal: "Top-Angebot",
    rating: "{{percent}}",
    released: "Endet: ",
    no_description: "Nutzen Sie dieses außergewöhnliche Angebot, bevor der Aktionszeitraum abläuft oder sich die Preisstufen ändern!",
    breakdown_title: "Details anzeigen",
    breakdown_body: "Sparen Sie insgesamt {{saved}} gegenüber dem regulären Listenpreis von {{original}} (was einem satten Rabatt von {{percent}}% entspricht).",
    summary: {
      prefix: "Wir haben aktive Gaming-Storefronts durchsucht und ",
      midActive: " massive Rabatte live ab dem ",
      suffix: " entdeckt. Tippen Sie auf einen Titel, um Ihren Key zu sichern!"
    },
    stores: {
      all: "Alle Stores",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "Verbindung unterbrochen",
      description: "Wir können uns derzeit nicht mit den Servern synchronisieren. Stellen Sie sicher, dass Ihr Gerät online ist, und versuchen Sie es erneut.",
      retryButton: "Verbindung erneut versuchen"
    },
    empty: {
      title: "Keine Treffer gefunden",
      description: "Keine aktuellen Angebote in dieser Storefront-Kategorie gefunden.",
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
    title: "Verfolgen Sie Videospiel-Giveaways und Premium-Spiele-Angebote.",
    title2: "Giveaways und Deals erhalten",
    description: "Frapp bietet sowohl Spiele-Giveaways als auch massive Videospiel-Deals. Wir bündeln die neuesten zu 100% kostenlos einlösbaren Prämien mit tiefen Rabatten über verschiedene Stores hinweg, damit Sie immer mehr für weniger Geld spielen können.",
    privacyHeader: "Zentrales Datenschutz- & Daten-Framework",
    privacyBody: "Frapp ist ein Open-Source-Datenaggregator, der Ihre verstreuten Datenströme, API-Feeds und digitalen Touchpoints in einem einzigen, übersichtlichen Dashboard vereint. Da wir vollständig als Local-First-Tool arbeiten, unterhalten wir keine zentralen Speicher, erfassen keine physischen Kontostrukturen und verfolgen keine Telemetriehistorien der Nutzer. Die gesamte Aggregation, Verarbeitung und Visualisierung läuft direkt auf Ihrer Hardware – das bedeutet, dass Ihre Daten niemals an einen externen Master-Hub oder ein zentrales Verwaltungsnetzwerk übertragen oder von diesem protokolliert werden. Ihre lokalisierten Konfigurationsprofile, historischen Cache-Dateien und interaktiven Präferenzen verbleiben sicher auf Ihrem Gerät.",
    consentLabel: "Ich akzeptiere die Nutzungsbedingungen und die Datenschutzerklärung",
    btnStep1: "Weiter",
    btnStep2: "Loslegen",
    versionLabel: "Frapp • v1.1.4"
  }
} as const;