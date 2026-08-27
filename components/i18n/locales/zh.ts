export const zh = {
  header: {
    title: "设置.",
    subtitle: "自定义应用行为、调整通知、更改显示设置或查看开源许可。"
  },
  sections: {
    preferences: "偏好设置.",
    about: "关于.",
    community: "社区与支持.",
    providers: "数据提供商."
  },
  preferences: {
    themeAppearance: "外观主题",
    themeDark: "深色模式",
    themeLight: "浅色模式",
    appLanguage: "应用语言",
    appLanguageSub: "切换语言",
    savedGiveaways: "我的游戏库.",
    savedGiveawaysSub: "查看已保存的游戏",
    notificationSettings: "通知设置",
    notificationSettingsSub: "开启/关闭推送通知",
    appIntroduction: "新手指引",
    appIntroductionSub: "重新查看引导内容",
    checkForUpdates: "应用版本",
    checkForUpdatesSub: "检查更新",
    Report: "反馈 Bug",
    ReportSub: "提交问题或漏洞反馈",
  },
  about: {
    developer: "关于开发者",
    developerSub: "访问个人作品集",
    moreApps: "更多应用",
    moreAppsSub: "探索 GitHub 仓库",
    socials: "社交媒体",
    socialsSub: "关注我们的社交账号",
    privacy: "隐私政策",
    privacySub: "查看隐私政策。"
  },
  community: {
    supportOpenSource: "支持开源",
    supportOpenSourceSub: "本应用由个人独立开发且免费提供。如果您喜欢使用 Frapp 寻找优惠，在 GitHub 上为我们点亮 Star 将是极大的鼓励！",
    starGithub: "在 GitHub 点亮 Star",
    buyCoffee: "赞助开发者",
    buyCoffeeSub: "帮助我们维持服务器运转！小额捐赠能支持项目长久维护并添加新功能。",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower 网站",
    gamepowerSub: "免费游戏主要数据源",
    cheapshark: "CheapShark API",
    cheapsharkSub: "电子游戏折扣 API"
  },
  report: {
    title: "反馈 Bug.",
    subtitle: "提交问题或漏洞",
    sectionTitle: "选择问题分类",
    categories: {
      ui: "UI/UX 界面异常",
      api: "API / 数据错误",
      crash: "性能 / 崩溃问题",
      feature: "功能建议"
    },
    githubCard: {
      title: "直接通过 GitHub Issues 提交",
      description: "点击下方按钮将自动打包您选择的模板和设备环境参数，并打开 GitHub Issue 提交页面。",
      buttonText: "反馈 {{category}}"
    },
    attributionCard: {
      title: "第三方 API 声明",
      description: "界面中展示的所有数据均直接来自 Gamepower 和 CheapShark 的开放 API。Frapp 不会篡改任何游戏列表、定价结构或分发时间表。因此，我们无法保证外部 Key 或服务的持续可用性。"
    },
    alerts: {
      errorTitle: "错误",
      errorMessage: "无法跳转至 GitHub，请检查浏览器权限设置。"
    },
    github: {
      bodyDescription: "此操作将从您的收藏库中永久移除所有已保存的游戏。",
      step1: "打开应用",
      step2: "导航至...",
      step3: "观察..."
    }
  },
  footer: {
    build: "Frapp 版本 {{version}}"
  },
  updateModal: {
    title: "发现新版本",
    subtitle: "版本 {{version}} 已发布！",
    description: "检测到新版本 ({{latest}})。请从当前版本 ({{current}}) 进行更新以体验最新功能！",
    later: "稍后再说",
    updateNow: "立即更新"
  },
  modals: {
    dismiss: "全部清空",
    ok: "确定",
    testFailedTitle: "测试失败",
    testFailedMessage: "无法执行渲染循环，请检查本地权限。",
    upToDateTitle: "已是最新版本",
    upToDateMessage: "您当前使用的是最新版本 ({{version}})，无需更新。",
    upToDateAction: "太棒了",
    checkFailedTitle: "检查失败",
    checkFailedMessage: "无法完成查询，请检查网络连接后重试。",
    failedAction: "关闭",
    socialsTitle: "分享",
    languageTitle: "选择语言"
  },
  giveaways: {
    title: "免费游戏 (Giveaways).",
    summary: {
      prefix: "截至目前，我们共找到了 ",
      midActive: " 个正在进行的免费游戏，",
      midWorth: " 总价值达到 ",
      suffix: "。快在过期前领取吧！"
    },
    platforms: {
      all: "全部",
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
      title: "网络连接中断",
      description: "当前无法连接至服务器，请确保您的设备已联网后重试。",
      retryButton: "重新连接"
    },
    empty: {
      title: "未找到免费游戏",
      description: "该平台目前暂无正在进行的免费领游戏活动。",
      viewAllButton: "查看所有平台"
    },
    tracking: {
      days_left: "还剩 {{count}} 天",
      day_left: "还剩 1 天",
      ends_today: "今天截止",
      expired: "已结束",
      keys_left: "剩余 Key 数量: {{count}}",
      instructions_title: "领取步骤说明:"
    },
    pagination: {
      previous: "上一页",
      next: "下一页"
    }
  },
  giveaways1: {
    summary: {
      prefix: "您共保存了 ",
      midActive: " 款游戏，",
      midWorth: " 总价值达到 ",
      suffix: "。请及时领取避免过期！"
    },
    empty: {
      viewAllButton: "探索应用"
    },
    delete: {
      title: "清空所有游戏？",
      description: "此操作将从您的收藏列表中永久移除所有已保存的游戏。",
      confirmButton: "全部清空"
    },
  },
  deals: {
    title: "游戏特惠.",
    titleClaim: "前往领券/购买.",
    claim: "获取优惠",
    retailer: "零售商",
    store: "商店",
    free_uppercase: "免费",
    steam_rating: "Steam 好评率 {{percent}}% {{text}}",
    metacritic_score: "Metacritic 评分: {{score}}",
    share_message: "🔥 特惠速报：{{title}} 在 {{platform}} 现仅售 {{price}} (立省 {{saved}})！\n传送门: {{url}}",
    save_amount: "立省 {{amount}}%",
    carousel_description: "折扣指数达到完美的 {{rating}}/10！立即节省 ${{saved}}。",
    hot_deal: "热门特惠",
    best_price: "史低好价",
    verified_promo: "官方认证促销",
    view: "查看特惠",
    no_competing_offers: "暂无其他商店的竞争报价。",
    rating: "{{percent}}",
    no_description: "趁活动结束或调价前抓紧入手！",
    breakdown_title: "优惠详情",
    breakdown_body: "相比原价 {{original}}，您共节省了 {{saved}}（相当打 {{percent}} 折）。",
    live_store_comparisons: "实时多平台比价",
    lowest_price_ever: "历史最低价",
    all_time_low: "新史低",
    lowest_price_recorded: "记录的最低价格",
    lowest_price_nodate: "历史记录最低价为 ${{price}}",
    summary: {
      prefix: "我们检索了多家主流游戏商店，发现 ",
      midActive: " 个巨幅优惠活动（截至 ",
      suffix: "）。点击任意游戏即可获取激活码！"
    },
    stores: {
      all: "所有商店",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "网络连接中断",
      description: "当前无法连接至服务器，请检查网络设置后重试。",
      retryButton: "重新连接"
    },
    empty: {
      title: "未找到相关优惠",
      description: "该商店分类下暂无活动中的优惠。",
      resetButton: "重置筛选"
    },
    pagination: {
      prev: "上一页",
      next: "下一页"
    }
  },
  months: {
    january: "1月",
    february: "2月",
    march: "3月",
    april: "4月",
    may: "5月",
    june: "6月",
    july: "7月",
    august: "8月",
    september: "9月",
    october: "10月",
    november: "11月",
    december: "12月"
  },
  onboarding: {
    welcome: "欢迎使用 Frapp",
    legalTitle: "法律协议",
    legalSubtitle: "在访问我们的数据同步管道之前，请阅读隐私条款。",
    title: "追踪电子游戏免费领取与特惠.",
    title2: "电子游戏喜加一与折扣特惠",
    description: "Frapp 汇总了 100% 免费领取的喜加一游戏以及各大商店的史低折扣，让您花更少的钱玩更多的游戏。",
    privacyHeader: "隐私与数据架构",
    privacyBody: "Frapp 是一款开源且本地优先的工具。我们不会维护中央服务器，也不会收集您的个人隐私或追踪用户数据。所有数据均在您的设备本地处理。",
    consentLabel: "我已阅读并同意服务条款和隐私政策",
    btnStep1: "继续",
    btnStep2: "立即体验",
    versionLabel: "v1.1.6",
    permissionsTitle: "应用权限申请",
    permissionsSubtitle: "Frapp 需要通知和闹钟权限以保证功能正常运行，请允许必要的权限（Android 14+ 设备可能需要允许精确闹钟权限）。",
    pushTitle: "推送通知",
    pushDesc: "当有免费游戏上架或重大折扣时第一时间接收提醒。",
    granted: "已就绪",
    allow: "允许",
    alarmTitle: "精确提醒",
    alarmDesc: "为收藏库中即将过期的游戏设置提前 24 小时的精确提醒。",
    setup: "去设置"
  }
} as const;