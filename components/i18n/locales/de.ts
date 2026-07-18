export const de = {
  header: {
    title: "Einstellungen.",
    subtitle: "App-Verhalten anpassen, Benachrichtigungen verwalten, Anzeigeoptionen umschalten oder Open-Source-Referenzen einsehen."
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
    appLanguageSub: "Sprachen wechseln",
    savedGiveaways: "Meine Bibliothek.",
    savedGiveawaysSub: "Auf gespeicherte Spiele zugreifen",
    notificationSettings: "Benachrichtigungen",
    notificationSettingsSub: "Push-Benachrichtigungen umschalten",
    appIntroduction: "Onboarding",
    appIntroductionSub: "Onboarding-Kontext anzeigen",
    checkForUpdates: "App-Version",
    checkForUpdatesSub: "Nach Updates suchen"
  },
  about: {
    developer: "Über den Entwickler",
    developerSub: "Persönliches Portfolio besuchen",
    moreApps: "Weitere Anwendungen",
    moreAppsSub: "GitHub-Repositories erkunden",
    socials: "Soziale Medien",
    socialsSub: "Plattformübergreifend vernetzen",
    privacy: "Datenschutzerklärung",
    privacySub: "Sehen Sie sich unsere Datenschutzerklärung am."
  },
  community: {
    supportOpenSource: "Open Source unterstützen",
    supportOpenSourceSub: "Diese Anwendung ist unabhängig entwickelt und kostenlos gehostet. Wenn Ihnen diese Angebote gefallen, hilft uns ein Stern auf GitHub sehr weiter!",
    starGithub: "Sterne uns auf GitHub",
    buyCoffee: "Kaffee spendieren",
    buyCoffeeSub: "Helfen Sie mit, die Server am Laufen zu halten! Eine kleine Spende ermöglicht es uns, das Projekt zu pflegen und neue Funktionen hinzuzufügen.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower-Website",
    gamepowerSub: "Hauptdatenquelle für Giveaways",
    cheapshark: "CheapShark API",
    cheapsharkSub: "Spiele-Angebote API"
  },
  report: {
    title: "Fehler melden.",
    subtitle: "Probleme mit der App? Wählen Sie eine Vorlage aus, um einen Bericht einzureichen. (Berichte werden zur Überprüfung an unser GitHub-Repository übermittelt)",
    sectionTitle: "Fehlerkategorie auswählen",
    categories: {
      ui: "UI/UX-Fehler",
      api: "API- / Datenfehler",
      crash: "Leistung / Absturz",
      feature: "Funktionswunsch"
    },
    githubCard: {
      title: "Direkt über GitHub-Issues melden",
      description: "Wenn Sie auf die Schaltfläche unten klicken, werden Ihre Auswahl, die lokalen Geräteumgebungsparameter sicher gebündelt und die GitHub-Fehlerverfolgung geöffnet.",
      buttonText: "{{category}} melden"
    },
    attributionCard: {
      title: "Drittanbieter-API-Offenlegung",
      description: "Alle auf der Benutzeroberfläche sichtbaren Datenindizes werden über die offenen öffentlichen Architekturen von Gamepower und CheapShark direkt von externen Netzwerken abgerufen. Die Nutzung dieser Indizes entspricht direkt deren nativen Vertriebsregeln. Frapp manipuliert keine einzelnen Artikellisten, ändert keine Preisstrukturen und verwaltet keine Verteilungszeitpläne. Daher können wir die ununterbrochene Verfügbarkeit, Richtigkeit oder fortlaufende Unterstützung externer Server oder Schlüssel, die über diese Plattformen verteilt werden, nicht garantieren."
    },
    footerVersion: "Frapp-Version v1.1.4",
    alerts: {
      errorTitle: "Fehler",
      errorMessage: "Weiterleitung zu GitHub fehlgeschlagen. Überprüfen Sie die Browser-Berechtigungen."
    },
    github: {
      bodyDescription: "Aktion löscht alle angepinnten Giveaways dauerhaft aus Ihrer Liste. Sie müssen sie manuell neu suchen.",
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
    description: "Eine neuere Version der App ({{latest}}) is verfügbar. Aktualisieren Sie Ihre aktuelle Version ({{current}}), um auf die neuesten Änderungen zuzugreifen!",
    later: "Abbrechen",
    updateNow: "Jetzt aktualisieren"
  },
  modals: {
    dismiss: "Alles löschen",
    ok: "OK",
    testFailedTitle: "Testziel-Fehler",
    testFailedMessage: "Instanziierte Deployment-Renderschleife konnte nicht ausgeführt werden. Lokale Berechtigungen prüfen.",
    upToDateTitle: "Auf dem neuesten Stand",
    upToDateMessage: "Sie verwenden bereits unsere neueste Revision ({{version}}). Keine Updates erforderlich.",
    upToDateAction: "Genial",
    checkFailedTitle: "Überprüfung fehlgeschlagen",
    checkFailedMessage: "Abfragen konnten derzeit nicht abgeschlossen werden. Prüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
    socialsTitle: "Angebot teilen",
    languageTitle: "Sprache auswählen"
  },
  giveaways: {
    title: "Giveaways.",
    summary: {
      prefix: "Wir haben ",
      midActive: " aktive Spiele-Giveaways im Stand vom ",
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
      description: "Wir können uns derzeit nicht mit den Upstream-Pipelines synchronisieren. Überprüfen Sie Ihren Internetzugang und versuchen Sie es erneut.",
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
      instructions_title: "Anweisungen zum Einlösen:"
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
      description: "Diese Aktion löscht alle angepinnten Giveaways dauerhaft aus Ihrer gespeicherten Liste. Sie müssen sie manuell neu suchen und hinzufügen.",
      confirmButton: "Alles löschen"
    }
  },
  deals: {
    title: "Angebote.",
    titleClaim: "Deal einlösen.",
    claim: "Deal einlösen",
    retailer: "Händler",
    store: "Store",
    free_uppercase: "KOSTENLOS",
    share_message: "🔥 Deal-Alarm: {{title}} gibt es für nur {{price}} (Du sparst {{saved}}) auf {{platform}}!\nHier holen: {{url}}",
    save_amount: "{{amount}}% RABATT",
    hot_deal: "Top-Wert-Angebot",
    rating: "{{percent}}",
    released: "Endet: ",
    no_description: "Nutzen Sie dieses außergewöhnliche Angebot, bevor der Aktionszeitraum abläuft oder sich die Preisstufen ändern!",
    breakdown_title: "Details anzeigen",
    breakdown_body: "Sie sparen insgesamt {{saved}} gegenüber dem regulären Verkaufspreis von {{original}} (was einem satten Rabatt von {{percent}}% entspricht).",
    summary: {
      prefix: "Wir haben die aktiven Gaming-Storefronts durchsucht und ",
      midActive: " massive Rabatte live am ",
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
      description: "Keine Live-Angebote in dieser Storefront-Kategorie gefunden.",
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
    privacyHeader: "Datenschutz-Framework",
    privacyBody: "Frapp arbeitet vollständig als Open-Source-Datenaggregator-Tool. Wir unterhalten keine lokalisierten Speicherplattformen, erfassen keine physischen Kontostrukturen und verfolgen keine Benutzertelemetriehistorien. Da alle Prozesse direkt auf Ihrer Hardware ausgeführt werden, werden keine Daten jemals an einen internen Master-Hub oder ein zentrales administratives Netzwerk übertragen, verarbeitet oder protokolliert. Ihre lokalisierten Konfigurationsprofile, historischen Cache-Dateien und interaktiven Präferenzen verbleiben sicher auf Ihrem Gerät.",
    consentLabel: "Ich akzeptiere die Nutzungsbedingungen und die Datenschutzerklärung",
    btnStep1: "Weiter",
    btnStep2: "Erste Schritte",
    versionLabel: "Frapp • v1.1.3"
  }
} as const;