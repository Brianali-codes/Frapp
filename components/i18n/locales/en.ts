export const en = {
  header: {
    title: "Settings.",
    subtitle: "Customize application behavior, adjust notifications, toggle display settings, or read open-source credentials."
  },
  sections: {
    preferences: "Preferences.",
    about: "About.",
    community: "Community & Support.",
    providers: "Data Providers."
  },
  preferences: {
    themeAppearance: "Theme Appearance",
    themeDark: "Dark Mode",
    themeLight: "Light Mode",
    appLanguage: "App Language",
    appLanguageSub: "Switch Languages",
    savedGiveaways: "My Library.",
    savedGiveawaysSub: "Access Saved games",
    notificationSettings: "Notification Settings",
    notificationSettingsSub: "Toggle push notifications",
    appIntroduction: "Onboarding",
    appIntroductionSub: "Review onboarding context",
    checkForUpdates: "App Version",
    checkForUpdatesSub: "Check For Updates"
  },
  about: {
    developer: "About Developer",
    developerSub: "Visit personal portfolio",
    moreApps: "More Applications",
    moreAppsSub: "Explore GitHub repositories",
    socials: "Social Media",
    socialsSub: "Connect across platforms",
    privacy: "Privacy Policy",
    privacySub: "View Our Privacy Policy."
  },
  community: {
    supportOpenSource: "Support Open Source",
    supportOpenSourceSub: "This application is independently crafted and hosted for free. If you find value in uncovering these deals, dropping us a star on GitHub goes a long way!",
    starGithub: "Star us on GitHub",
    buyCoffee: "Buy Me a Coffee",
    buyCoffeeSub: "Help keep the servers alive and the coffee flowing! A small donation enables us to maintain the project and add new features.",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower Site",
    gamepowerSub: "Primary giveaways data source",
    cheapshark: "CheapShark API",
    cheapsharkSub: "Video game deals API"
  },
  report: {
    title: "Report a Bug.",
    subtitle: "Having Issues with the app, choose your template to submit a report. (Reports will be submitted to our GitHub repository for review )",
    sectionTitle: "Select a Bug Category",
    categories: {
      ui: "UI/UX Glitch",
      api: "API / Data Error",
      crash: "Performance / Crash",
      feature: "Feature Request"
    },
    githubCard: {
      title: "Submit directly via GitHub Issues",
      description: "Clicking the action button below securely bundles your selection choice template, local device environment parameters, and opens the GitHub issue tracking page.",
      buttonText: "Report {{category}}"
    },
    attributionCard: {
      title: "Third-Party API Disclosures",
      description: "All data indexes visible throughout the interface are fetched directly from external networks via the Gamepower and CheapShark open public architectures. Use of these indexes complies directly with their native distribution rules. Frapp does not manipulate individual item listings, alter pricing structures, or manage distribution timelines. Consequently, we cannot guarantee the uninterrupted availability, accuracy, or ongoing support of external nodes or keys distributed through those respective platforms."
    },
    footerVersion: "Frapp Version v1.1.4",
    alerts: {
      errorTitle: "Error",
      errorMessage: "Could not redirect to GitHub. Verify browser routing permissions."
    },
    github: {
      bodyDescription: "This action will permanently remove all pinned giveaways from your saved list. You'll need to explore and re-add them manually.",
      step1: "Open the app",
      step2: "Navigate to...",
      step3: "Observe..."
    }
  },
  footer: {
    build: "Frapp Version {{version}}"
  },
  updateModal: {
    title: "Update Available",
    subtitle: "{{version}} is here!",
    description: "A newer version of the app ({{latest}}) is available. Update from your current version ({{current}}) to access the latest changes!",
    later: "Cancel",
    updateNow: "Update Now"
  },
  modals: {
    dismiss: "Wipe All",
    ok: "OK",
    testFailedTitle: "Test Target Failure",
    testFailedMessage: "Could not execute instantaneous deployment rendering loop. Confirm local permissions.",
    upToDateTitle: "Up to Date",
    upToDateMessage: "You are already running our most recent revision build ({{version}}). No updates needed.",
    upToDateAction: "Awesome",
    checkFailedTitle: "Verification Failure",
    checkFailedMessage: "Could not complete lookup queries at this moment. Check your connectivity index and retry.",
    socialsTitle: "Share Promo",
    languageTitle: "Select Language"
  },

  giveaways: {
    title: "Giveaways.",
    summary: {
      prefix: "We found ",
      midActive: " active game giveaways as of ",
      midWorth: ", valued at a total of ",
      suffix: ". Claim them before they expire!"
    },
    platforms: {
      all: "All",
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
      title: "Connection Disrupted",
      description: "We are unable to sync up with upstream lookup pipelines right now. Check your internet access and try again.",
      retryButton: "Retry Connection"
    },
    empty: {
      title: "No Giveaways Found",
      description: "There are no active giveaways available for this platform right now.",
      viewAllButton: "View All Platforms"
    },
    tracking: {
      days_left: "{{count}} Days Left",
      day_left: "1 Day Left",
      ends_today: "Ends Today",
      expired: "Expired",
      keys_left: "Keys Left: {{count}}",
      instructions_title: "Instructions to Claim:"
    },
    pagination: {
      previous: "Previous",
      next: "Next Page"
    }
  },

  giveaways1: {
        
      summary: {
      prefix: "You have ",
      midActive: " saved games ",
      midWorth: ", valued at a total of ",
      suffix: ". Claim them before they expire!"
      },
      empty: {
        viewAllButton: "Explore the App"
      },
      delete: {
        title: "Delete All games?",
        description: "This action will permanently remove all pinned giveaways from your saved list. You'll need to explore and re-add them manually.",
        confirmButton: "Wipe All"
      },
    },
  deals: {
    title: "Game Deals.",
    titleClaim: "Claim Deal.",
    claim: "Claim Deal",
    retailer: "Retailer",
    store: "Store",
    free_uppercase: "FREE",
    share_message: "🔥 Deal Alert: {{title}} is down to {{price}} (Saved {{saved}}) on {{platform}}!\nGet it here: {{url}}",
    save_amount: "{{amount}}% OFF",
    hot_deal: "Top Value Deal",
    rating: "{{percent}}",
    released: "Ends: ",
    no_description: "Grab this exceptional value offer before the promotion period expires or pricing tiers change!",
    breakdown_title: "View Details",
    breakdown_body: "Pocket a total of {{saved}} off the regular retail price list of {{original}} (reflecting a solid {{percent}}% value markdown layout).",
    summary: {
      prefix: "We parsed through active gaming storefronts and discovered ",
      midActive: " massive discounts live as of ",
      suffix: ". Tap any title to secure your key!"
    },
    stores: {
      all: "All Stores",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "Connection Interrupted",
      description: "We can't sync up with the servers right now. Make sure your device is online and let's try that again.",
      retryButton: "Retry Connection"
    },
    empty: {
      title: "No Matches Found",
      description: "No live deals found under this storefront category.",
      resetButton: "Reset Filters"
    },
    pagination: {
      prev: "Previous",
      next: "Next Games"
    }
  },
  months: {
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December"
  },
 onboarding: {
    welcome: "Welcome to Frapp",
    legalTitle: "Legal Agreements",
    legalSubtitle: "Please review the privacy conditions before accessing our global data sync pipelines.",
    title: "Track Video game giveaways and premium game deals.",
    title2: "Get Giveaways and Deals",
    description: "Frapp deals in both game giveaways and massive video game Deals, We aggregate the latest 100% free claimable rewards alongside deep retail discounts across storefronts so you always play more for less.",
    privacyHeader: "Privacy & Data Core Framework",
    privacyBody: "Frapp is an open-source data aggregator that unifies your disparate data streams, API feeds, and digital touchpoints into a single, cohesive dashboard. Because we operate entirely as a local-first tool, we do not maintain centralized storage, harvest physical account structures, or trace user telemetry histories. All aggregation, processing, and visualization run directly on your hardware—meaning your data is never transmitted to, or logged by, an external master hub. Your localized configuration profiles, historical cache files, and interactive preferences remain securely on your device.",
    consentLabel: "I accept the Terms of Service & Privacy Statement",
    btnStep1: "Continue",
    btnStep2: "Get Started",
    versionLabel: "Frapp • v1.1.4"
}
} as const;