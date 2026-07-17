// src/i18n/locales/sw.ts
export const sw = {
  header: {
    title: "Mipangilio.",
    subtitle: "Badilisha tabia ya programu, rekebisha arifa, badilisha mipangilio ya onyesho, au soma taarifa za programu huria (open-source)."
  },
  sections: {
    preferences: "Mapendeleo.",
    about: "Kuhusu.",
    community: "Jumuiya na Usaidizi.",
    providers: "Watoa Data."
  },
  preferences: {
    themeAppearance: "Mwonekano wa Mandhari",
    themeDark: "Hali ya Giza",
    themeLight: "Hali ya Mwanga",
    appLanguage: "Lugha ya Programu",
    appLanguageSub: "Badilisha lugha ya tafsiri",
    savedGiveaways: "Maktaba Yangu",
    savedGiveawaysSub: "Fikia michezo uliyohifadhi",
    notificationSettings: "Mipangilio ya Arifa",
    notificationSettingsSub: "Washa au zima arifa za papo hapo",
    appIntroduction: "Utangulizi wa Programu",
    appIntroductionSub: "Pitia mwongozo wa kuanza",
    checkForUpdates: "Angalia Masasisho",
    checkForUpdatesSub: "Thibitisha toleo la programu"
  },
  about: {
    developer: "Kuhusu Msanidi",
    developerSub: "Tembelea kwingineko (portfolio) ya kibinafsi",
    moreApps: "Programu Nyingine",
    moreAppsSub: "Chunguza hazina (repositories) za GitHub",
    socials: "Mitandao ya Kijamii",
    socialsSub: "Ungana nasi kwenye majukwaa mbalimbali",
    privacy: "Sera ya Faragha",
    privacySub: "Tazama sera za Frapp"
  },
  community: {
    supportOpenSource: "Saidia Programu Huria",
    supportOpenSourceSub: "Programu hii imetengenezwa kwa kujitegemea na kuhudumiwa bila malipo. Ikiwa unaona thamani katika kugundua ofa hizi, kutupa 'nyota' (star) kwenye GitHub inasaidia sana!",
    starGithub: "Tupe nyota kwenye GitHub",
    buyCoffee: "Saidia Mradi",
    buyCoffeeSub: "Saidia kuweka seva zikiwa hai! Mchango mdogo unatuwezesha kudumisha mradi na kuongeza vipengele vipya.",
    donateKofi: "Changia kupitia Ko-fi",
    donatePatreon: "Changia kupitia Patreon"
  },
  providers: {
    gamepower: "Tovuti ya Gamepower",
    gamepowerSub: "Chanzo kikuu cha data ya zawadi",
    cheapshark: "API ya CheapShark",
    cheapsharkSub: "API ya ofa za michezo ya video"
  },
  report: {
    title: "Futa Maktaba uliyohifadhi?",
    subtitle: "Je, unakumbana na matatizo kwenye programu au umeona bei zisizo sahihi? Chagua kategoria hapa chini na utume ripoti ya mdudu (bug).",
    sectionTitle: "Chagua Kategoria ya Hitilafu",
    categories: {
      ui: "Hitilafu ya Muonekano (UI/UX)",
      api: "Hitilafu ya API / Data",
      crash: "Utendaji / Programu Kujifunga",
      feature: "Ombi la Kipengele Kipya"
    },
    githubCard: {
      title: "Wasilisha moja kwa moja kupitia GitHub Issues",
      description: "Kubofya kitufe cha kitendo hapa chini kutaweka pamoja chaguo lako, vigezo vya kifaa chako, na kufungua ukurasa wa kufuatilia matatizo kwenye GitHub.",
      buttonText: "Ripoti {{category}}"
    },
    attributionCard: {
      title: "Uhusika wa Mradi na API",
      description: "Usambazaji huu wa programu huria unategemea kabisa mitiririko ya data iliyotolewa na Gamepower na Free To Game. Hakuna hata moja ya API hizi au maudhui yanayohusiana yanayomilikiwa moja kwa moja na FRAPP."
    },
    footerVersion: "Toleo la Frapp v1.1.4",
    alerts: {
      errorTitle: "Hitilafu",
      errorMessage: "Imeshindwa kuelekeza kwenye GitHub. Hakikisha ruhusa za kivinjari chako."
    },
    github: {
      bodyDescription: "Kitendo hiki kitafuta kabisa zawadi zote ulizozihifadhi kwenye orodha yako. Utahitaji kuzitafuta na kuziongeza tena mwenyewe.",
      step1: "Fungua programu",
      step2: "Nenda kwenye...",
      step3: "Angalia..."
    }
  },
  footer: {
    build: "Toleo la Frapp {{version}}"
  },
  updateModal: {
    title: "Masasisho Yanapatikana",
    subtitle: "{{version}} imefika!",
    description: "Toleo jipya la programu ({{latest}}) linapatikana. Sasisha kutoka toleo lako la sasa ({{current}}) ili kupata mabadiliko ya hivi punde!",
    later: "Ghairi",
    updateNow: "Sasisha Sasa"
  },
  modals: {
    dismiss: "Futa Yote",
    ok: "SAWA",
    testFailedTitle: "Jaribio la Lengo Imeshindwa",
    testFailedMessage: "Imeshindwa kutekeleza mzunguko wa uonyeshaji. Thibitisha ruhusa za kifaa.",
    upToDateTitle: "Ipo katika Toleo la Hivi Punde",
    upToDateMessage: "Tayari unatumia toleo letu la hivi punde ({{version}}). Hakuna masasisho yanayohitajika.",
    upToDateAction: "Safi sana",
    checkFailedTitle: "Imeshindwa Kuthibitisha",
    checkFailedMessage: "Imeshindwa kukamilisha utafutaji kwa wakati huu. Angalia muunganisho wako wa intaneti na ujaribu tena.",
    socialsTitle: "Ungana nami",
    languageTitle: "Chagua Lugha"
  },
  giveaways: {
    title: "Zawadi za Kudai.",
    summary: {
      prefix: "Umehifadhi ",
      midActive: " zawadi za kudai, ukijiokoa jumla ya ",
      midWorth: "",
      suffix: "! Hakikisha unazidai kabla muda wake haujaisha."
    },
    platforms: {
      all: "Zote",
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
      drmFree: "Haina DRM",
      itchio: "itch.io"
    },
    error: {
      title: "Muunganisho Umekatizwa",
      description: "Hatuwezi kusawazisha na seva za data kwa wakati huu. Angalia muunganisho wako wa intaneti na ujaribu tena.",
      retryButton: "Jaribu tena"
    },
    empty: {
      title: "Maktaba Yako haina kitu",
      description: "Chunguza zawadi zinazoendelea na uguse ikoni ya moyo ili kuzihifadhi hapa ili uweze kuzidai kwa urahisi baadaye!",
      viewAllButton: "Chunguza Programu"
    },
    tracking: {
      days_left: "Zimesalia Siku {{count}}",
      day_left: "Imesalia Siku 1",
      ends_today: "Inaisha Leo",
      expired: "Muda Umeisha",
      keys_left: "Funguo Zilizobaki: {{count}}",
      instructions_title: "Maagizo ya Kudai:"
    },
    pagination: {
      previous: "Iliyotangulia",
      next: "Michezo Inayofuata"
    }
  },
  deals: {
    title: "Ofa za Michezo.",
    claim: "Dai Sasa",
    retailer: "Muuzaji",
    store: "Duka",
    free_uppercase: "BURE",
    share_message: "🔥 Ofa ya Moto: {{title}} imeshuka hadi {{price}} (Okoa {{saved}}) kwenye {{platform}}!\nIchukue hapa: {{url}}",
    save_amount: "OKOA ${{amount}}",
    hot_deal: "THAMANI YA",
    rating: "Ukadiriaji wa {{percent}}%",
    released: "Inaisha: ",
    no_description: "Hakuna maelezo ya ziada yaliyopatikana. Chukua ofa hii kabla bei haijabadilika!",
    breakdown_title: "Tazama Taarifa za Ofa",
    breakdown_body: "Unaokoa {{saved}} kutoka kwa thamani ya awali ya {{original}} (punguzo la jumla la {{percent}}%).",
    summary: {
      prefix: "Tumekagua maduka ya mtandaoni na tumegundua ",
      midActive: " ofa za kipekee zilizopo hadi ",
      suffix: ". Gusa kadi yoyote ili kupata funguo!"
    },
    stores: {
      all: "Maduka Yote",
      amazon: "Amazon"
    },
    empty: {
      title: "Hakuna Matokeo Yaliyopatikana",
      description: "Hakuna michezo iliyopunguzwa bei inayolingana na duka hili.",
      resetButton: "Weka Upya Vichujio"
    }
  },
  months: {
    january: "Januari",
    february: "Februari",
    march: "Machi",
    april: "Aprili",
    may: "Mei",
    june: "Juni",
    july: "Julai",
    august: "Agosti",
    september: "Septemba",
    october: "Oktoba",
    november: "Novemba",
    december: "Desemba"
  }
} as const;