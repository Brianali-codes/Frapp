export const zh = {
  header: {
    title: "设置.",
    subtitle: "自定义应用行为、调整通知、切换显示设置或查看开源凭证。"
  },
  sections: {
    preferences: "偏好设置.",
    about: "关于应用.",
    community: "社区与支持.",
    providers: "数据提供商."
  },
  preferences: {
    themeAppearance: "主题外观",
    themeDark: "深色模式",
    themeLight: "浅色模式",
    appLanguage: "应用语言",
    appLanguageSub: "切换语言",
    savedGiveaways: "我的收藏.",
    savedGiveawaysSub: "查看已收藏的游戏",
    notificationSettings: "通知设置",
    notificationSettingsSub: "切换推送通知",
    appIntroduction: "新手引导",
    appIntroductionSub: "回顾新手引导内容",
    checkForUpdates: "应用版本",
    checkForUpdatesSub: "检查更新"
  },
  about: {
    developer: "关于开发者",
    developerSub: "访问个人作品集",
    moreApps: "更多应用",
    moreAppsSub: "探索 GitHub 仓库",
    socials: "社交媒体",
    socialsSub: "跨平台建立联系",
    privacy: "隐私政策",
    privacySub: "查看我们的隐私政策。"
  },
  community: {
    supportOpenSource: "支持开源项目",
    supportOpenSourceSub: "本应用为独立开发且免费托管。如果您觉得这些优惠信息对您有价值，在 GitHub 上为我们点亮一颗星星就是对我们最大的帮助！",
    starGithub: "在 GitHub 上为我们点星",
    buyCoffee: "请我喝杯咖啡",
    buyCoffeeSub: "帮助维持服务器运行！小额捐赠将使我们能够维护该项目并添加更多新功能。",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower 网站",
    gamepowerSub: "免费游戏主要数据源",
    cheapshark: "CheapShark API",
    cheapsharkSub: "视频游戏特惠 API"
  },
  report: {
    title: "报告错误.",
    subtitle: "应用出现问题？请选择模板提交报告。(报告将提交至我们的 GitHub 仓库以供审核)",
    sectionTitle: "选择错误类别",
    categories: {
      ui: "UI/UX 界面缺陷",
      api: "API / 数据错误",
      crash: "性能问题 / 崩溃",
      feature: "功能建议"
    },
    githubCard: {
      title: "通过 GitHub Issues 直接提交",
      description: "点击下方的操作按钮将安全地打包您选择的类别模板、本地设备环境参数，并直接打开 GitHub 的问题追踪页面。",
      buttonText: "报告 {{category}}"
    },
    attributionCard: {
      title: "第三方 API 信息披露",
      description: "本界面中所有可见的数据索引均通过 Gamepower 和 CheapShark 的开放公共架构直接从外部网络获取。使用这些索引直接符合其原生分发规则。Frapp 不操作任何单品列表、不篡改价格结构，也不管理分发时间线。因此，我们无法保证通过这些相应平台分发的外部节点或激活码的持续可用性、准确性或持续维护支持。"
    },
    footerVersion: "Frapp 版本 v1.1.4",
    alerts: {
      errorTitle: "错误",
      errorMessage: "无法重定向到 GitHub。请检查浏览器的路由权限。"
    },
    github: {
      bodyDescription: "此操作将从您的收藏列表中永久移除所有已固定的免费福利。您需要重新手动搜索并添加它们。",
      step1: "打开应用",
      step2: "导航至...",
      step3: "观察并确认..."
    }
  },
  footer: {
    build: "Frapp 版本 {{version}}"
  },
  updateModal: {
    title: "有可用更新",
    subtitle: "{{version}} 现已推出！",
    description: "检测到应用有新版本 ({{latest}})。请从您当前的旧版本 ({{current}}) 进行升级，以体验最新的优化和改动！",
    later: "取消",
    updateNow: "立即更新"
  },
  modals: {
    dismiss: "清除全部",
    ok: "确 定",
    testFailedTitle: "测试目标失败",
    testFailedMessage: "无法执行即时部署渲染循环。请确认本地权限。",
    upToDateTitle: "已是最新版本",
    upToDateMessage: "您当前运行的已是我们的最新修订构建版本 ({{version}})。无需任何更新。",
    upToDateAction: "太棒了",
    checkFailedTitle: "验证失败",
    checkFailedMessage: "目前无法完成查询。请检查网络连接状态并重试。",
    socialsTitle: "分享特惠",
    languageTitle: "选择语言"
  },
  giveaways: {
    title: "免费福利.",
    summary: {
      prefix: "截至 ",
      midActive: "，我们发现了 ",
      midWorth: " 个仍在开放领取的免费游戏，总价值高达 ",
      suffix: "。在它们过期前赶快领取吧！"
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
      drmFree: "免 DRM",
      itchio: "itch.io"
    },
    error: {
      title: "连接已断开",
      description: "我们目前无法与上游数据管道保持同步。请检查您的互联网连接并重试。",
      retryButton: "重试连接"
    },
    empty: {
      title: "未找到免费福利",
      description: "当前该平台下没有正在进行的免费游戏领取活动。",
      viewAllButton: "查看所有平台"
    },
    tracking: {
      days_left: "剩余 {{count}} 天",
      day_left: "剩余 1 天",
      ends_today: "今天截止",
      expired: "已过期",
      keys_left: "剩余激活码: {{count}}",
      instructions_title: "领取指南:"
    },
    pagination: {
      previous: "上一页",
      next: "下一页"
    }
  },
  giveaways1: {
    summary: {
      prefix: "您有 ",
      midActive: " 个已收藏的游戏 ",
      midWorth: "，总价值高达 ",
      suffix: "。在它们过期前赶快领取吧！"
    },
    empty: {
      viewAllButton: "探索应用"
    },
    delete: {
      title: "删除所有游戏吗？",
      description: "此操作将从您的收藏列表中永久移除所有已固定的免费福利。您需要重新手动搜索并添加它们。",
      confirmButton: "清除全部"
    }
  },
  deals: {
    title: "游戏特惠.",
    titleClaim: "前往领取.",
    claim: "前往领取",
    retailer: "零售商",
    store: "商店平台",
    free_uppercase: "免费",
    share_message: "🔥 降价线报：{{platform}} 平台上的《{{title}}》目前跌至 {{price}}（立省 {{saved}}）！\n传送门：{{url}}",
    save_amount: "享 {{amount}}% 折扣",
    hot_deal: "高价值特惠精选",
    rating: "{{percent}}",
    released: "截止于：",
    no_description: "在此特惠活动结束或价格档位变动前，抓紧时间入手该超值特惠吧！",
    breakdown_title: "查看详情分析",
    breakdown_body: "相比普通零售价 {{original}}，您将累计节省 {{saved}}（相当于整体折让了 {{percent}}%）。",
    summary: {
      prefix: "我们对各大活跃的游戏商店进行了扫描，发现了 ",
      midActive: " 个正在生效的大幅折扣活动（更新于 ",
      suffix: "）。点击任何名称即可锁定您的激活码！"
    },
    stores: {
      all: "所有商店",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "连接被中断",
      description: "我们无法与服务器进行数据同步。请确保您的设备处于联网状态并重试。",
      retryButton: "重试连接"
    },
    empty: {
      title: "未找到匹配结果",
      description: "在该商店分类下未找到任何有效的促销折扣。",
      resetButton: "重置筛选条件"
    },
    pagination: {
      prev: "上一页",
      next: "更多游戏"
    }
  },
  months: {
    january: "1 月",
    february: "2 月",
    march: "3 月",
    april: "4 月",
    may: "5 月",
    june: "6 月",
    july: "7 月",
    august: "8 月",
    september: "9 月",
    october: "10 月",
    november: "11 月",
    december: "12 月"
  },
  onboarding: {
    welcome: "欢迎使用 Frapp",
    legalTitle: "法律协议条款",
    privacyHeader: "核心隐私保障框架",
    privacyBody: "Frapp 完全作为一个开源的数据聚合工具运行。我们不维护本地化的存储平台，不搜集任何物理账户结构，也不追踪用户的任何遥测历史。因为所有处理流程都在您的硬件上本地运行，没有任何数据会被传输、加工或记录到内部主中枢或中央行政网络。您的本地配置文件、历史缓存文件以及交互偏好都将安全地保留在您的设备中。",
    consentLabel: "我接受服务条款与隐私政策声明",
    btnStep1: "继 续",
    btnStep2: "立即开启",
    versionLabel: "Frapp • v1.1.3"
  }
} as const;