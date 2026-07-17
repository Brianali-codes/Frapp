// src/i18n/locales/en.ts
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
    appLanguageSub: "Switch translation layers",
    savedGiveaways: "My Library",
    savedGiveawaysSub: "Access bookmarked games",
    notificationSettings: "Notification Settings",
    notificationSettingsSub: "Toggle push configurations",
    appIntroduction: "App Introduction",
    appIntroductionSub: "Review onboarding context",
    checkForUpdates: "Check for Updates",
    checkForUpdatesSub: "Verify app build iterations"
  },
  about: {
    developer: "About Developer",
    developerSub: "Visit personal portfolio",
    moreApps: "More Applications",
    moreAppsSub: "Explore GitHub repositories",
    socials: "Social Media",
    socialsSub: "Connect across platforms",
    privacy: "Privacy Policy",
    privacySub: "View Frapp policies"
  },
  community: {
    supportOpenSource: "Support Open Source",
    supportOpenSourceSub: "This application is independently crafted and hosted for free. If you find value in uncovering these deals, dropping us a star on GitHub goes a long way!",
    starGithub: "Star us on GitHub",
    buyCoffee: "Buy Me a Coffee",
    buyCoffeeSub: "Help keep the servers alive and the coffee flowing! A small donation enables us to maintain the project and add new features.",
    donateKofi: "Donate on Ko-fi",
    donatePatreon: "Donate on Patreon"
  },
  providers: {
    gamepower: "Gamepower Site",
    gamepowerSub: "Primary giveaways data source",
    cheapshark: "CheapShark API",
    cheapsharkSub: "Video game deals API matrix"
  },
  report: {
    title: "Clear Saved Library?",
    subtitle: "Encountering application issues or noticed inconsistent prices or values? Choose a category below and fire away a live tracker report.",
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
      title: "Project & API Attribution",
      description: "This open-source distribution relies completely on structural streams supplied by the Gamepower and Free To Game architectures. None of these independent APIs or associated content entities belong directly to FRAPP."
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
    socialsTitle: "Connect with me",
    languageTitle: "Select Language"
  },
  giveaways: {
    title: "Free to Claim.",
    summary: {
      prefix: "You have pinned ",
      midActive: " giveaways to claim, saving you a total of ",
      midWorth: "",
      suffix: "! Make sure to claim them before they expire."
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
      title: "Your Library is Empty",
      description: "Explore ongoing free drops and tap the heart icon to save them here for easy claiming later!",
      viewAllButton: "Explore the App"
    },
    tracking: {
      days_left: "{{count}} Days Left",
      day_left: "1 Day Left",
      ends_today: "Ends Today",
      expired: "Expired",
      keys_left: "Keys Left: {{count}}",
      instructions_title: "Instructions to Claim:"
    },
    誠ination: {
      previous: "Previous",
      next: "Next Games"
    }
  },
  deals: {
    title: "Game Deals.",
    claim: "Claim Now",
    retailer: "Retailer",
    store: "Storefront",
    free_uppercase: "FREE",
    share_message: "🔥 Deal Alert: {{title}} is down to {{price}} (Save {{saved}}) on {{platform}}!\nGrab it here: {{url}}",
    save_amount: "SAVE ${{amount}}",
    hot_deal: "VALUED",
    rating: "{{percent}}% Approval Rating",
    released: "Ends: ",
    no_description: "No additional description context found. Grab this deal payload before target values alter!",
    breakdown_title: "View Deal Info",
    breakdown_body: "You save {{saved}} off the original retail valuation of {{original}} ({{percent}}% discount overall).",
    summary: {
      prefix: "We have scrubbed current active web store indices and detected ",
      midActive: " premier value discounts live as of ",
      suffix: ". Interact with any target title card to secure keys!"
    },
    stores: {
      all: "All Stores",
      amazon: "Amazon"
    },
    empty: {
      title: "No Matches Found",
      description: "No discounted game indices cataloged matching this storefront choice.",
      resetButton: "Reset Filters"
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
  }
} as const;