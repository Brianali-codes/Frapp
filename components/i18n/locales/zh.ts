export const zh = {
  header: {
    title: "设置。",
    subtitle: "自定义应用行为、调整通知、切换显示设置或查看开源凭证。"
  },
  sections: {
    preferences: "偏好设置。",
    about: "关于。",
    community: "社区与支持。",
    providers: "数据提供商。"
  },
  preferences: {
    themeAppearance: "主题外观",
    themeDark: "深色模式",
    themeLight: "浅色模式",
    appLanguage: "应用语言",
    appLanguageSub: "切换语言",
    savedGiveaways: "我的库。",
    savedGiveawaysSub: "查看已保存的游戏",
    notificationSettings: "通知设置",
    notificationSettingsSub: "切换推送通知",
    appIntroduction: "新手引导",
    appIntroductionSub: "查看引导内容",
    checkForUpdates: "应用版本",
    checkForUpdatesSub: "检查更新"
  },
  about: {
    developer: "关于开发者",
    developerSub: "访问个人作品集",
    moreApps: "更多应用",
    moreAppsSub: "浏览 GitHub 仓库",
    socials: "社交媒体",
    socialsSub: "多平台互动联系",
    privacy: "隐私政策",
    privacySub: "查看我们的隐私政策。"
  },
  community: {
    supportOpenSource: "支持开源",
    supportOpenSourceSub: "本应用由独立开发者精心打造并免费托管。如果您觉得这些优惠信息对您有价值，在 GitHub 上为我们点亮一颗星星就是对我们最大的支持！",
    starGithub: "在 GitHub 上为我们点星",
    buyCoffee: "请我喝杯咖啡",
    buyCoffeeSub: "帮助我们维持服务器运行并提供创作动力！小额赞助能让我们更好地维护项目并开发新功能。",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower 网站",
    gamepowerSub: "主要赠礼数据源",
    cheapshark: "CheapShark API",
    cheapsharkSub: "电子游戏优惠 API"
  },
  report: {
    title: "报告错误。",
    subtitle: "如果在使用应用时遇到问题，请选择对应模板提交报告。（报告将被提交至我们的 GitHub 仓库以供审核）",
    sectionTitle: "选择错误类别",
    categories: {
      ui: "UI/UX 界面缺陷",
      api: "API / 数据错误",
      crash: "性能问题 / 崩溃",
      feature: "功能功能请求"
    },
    githubCard: {
      title: "直接通过 GitHub Issues 提交",
      description: "点击下方的操作按钮将安全地打包您选择的模板和本地设备环境参数，并打开 GitHub 议题追踪页面。",
      buttonText: "报告 {{category}}"
    },
    attributionCard: {
      title: "第三方 API 信息披露",
      description: "整个界面中可见的所有数据索引均通过 Gamepower 和 CheapShark 的开放公共架构直接从外部网络获取。这些索引的使用直接符合其原生分发规则。Frapp 不会操纵单个商品列表、不会更改价格结构、也不会管理分发时间线。因此，我们无法保证通过这些相应平台分发的外部节点或密钥的持续不间断可用性、准确性或持续的技术支持。"
    },
    footerVersion: "Frapp 版本 v1.1.4",
    alerts: {
      errorTitle: "错误",
      errorMessage: "无法重定向至 GitHub。请检查浏览器的路由权限。"
    },
    github: {
      bodyDescription: "此操作将从您的保存列表中永久移除所有固定的赠礼活动。您需要重新浏览并手动添加它们。",
      step1: "打开应用",
      step2: "导航至...",
      step3: "观察现象..."
    }
  },
  footer: {
    build: "Frapp 版本 {{version}}"
  },
  updateModal: {
    title: "有可用更新",
    subtitle: "{{version}} 现已推出！",
    description: "检测到新版本程序 ({{latest}})。请从您当前的旧版本 ({{current}}) 进行升级以获取最新的功能变更！",
    later: "取消",
    updateNow: "立即更新"
  },
  modals: {
    dismiss: "清除全部",
    ok: "确定",
    testFailedTitle: "测试目标失败",
    testFailedMessage: "无法执行瞬时部署渲染循环。请确认本地权限。",
    upToDateTitle: "已是最新",
    upToDateMessage: "您当前运行的已经是我们的最新修订版本 ({{version}})。无需更新。",
    upToDateAction: "太棒了",
    checkFailedTitle: "验证失败",
    checkFailedMessage: "当前无法完成查找查询。请检查您的网络连接指标并重试。",
    socialsTitle: "分享推广",
    languageTitle: "选择语言"
  },
  giveaways: {
    title: "限时赠礼。",
    summary: {
      prefix: "截至 ",
      midActive: "，我们共找到了 ",
      midWorth: " 个处于激活状态的游戏赠礼活动，总价值达 ",
      suffix: "。请在它们过期前尽快领取！"
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
      drmFree: "无 DRM 加密",
      itchio: "itch.io"
    },
    error: {
      title: "连接中断",
      description: "我们目前无法与上游查找管道同步。请检查您的互联网接入并重试。",
      retryButton: "重试连接"
    },
    empty: {
      title: "未找到赠礼活动",
      description: "该平台当前没有可用的激活赠礼活动。",
      viewAllButton: "查看所有平台"
    },
    tracking: {
      days_left: "还剩 {{count}} 天",
      day_left: "还剩 1 天",
      ends_today: "今日结束",
      expired: "已过期",
      keys_left: "剩余密钥: {{count}}",
      instructions_title: "领取指南："
    },
    pagination: {
      previous: "上一页",
      next: "下一页"
    }
  },
  giveaways1: {
    summary: {
      prefix: "您有 ",
      midActive: " 个已保存的游戏 ",
      midWorth: "，总价值达 ",
      suffix: "。请在它们过期前尽快领取！"
    },
    empty: {
      viewAllButton: "探索应用"
    },
    delete: {
      title: "删除所有游戏？",
      description: "此操作将从您的保存列表中永久移除所有固定的赠礼活动。您需要重新浏览并手动添加它们。",
      confirmButton: "清除全部"
    }
  },
  deals: {
    title: "游戏特惠。",
    titleClaim: "获取优惠。",
    claim: "获取优惠",
    retailer: "分销商",
    store: "商店",
    free_uppercase: "免费",
    share_message: "🔥 降价预警：{{platform}} 平台上的《{{title}}》现已降至 {{price}}（省去了 {{saved}}）！\n传送门：{{url}}",
    save_amount: "{{amount}}% 折扣",
    hot_deal: "高价值推荐",
    rating: "{{percent}}",
    released: "截止日期：",
    no_description: "赶在促销期结束或价格梯度变动前，抓紧入手这一超值特惠吧！",
    breakdown_title: "查看详情",
    breakdown_body: "在原零售价 {{original}} 的基础上共节省了 {{saved}}（带来了高达 {{percent}}% 的实打实降价折扣）。",
    summary: {
      prefix: "我们解析了活跃的游戏前端商店，并发现了截至 ",
      midActive: " 正在生效的 ",
      suffix: " 个超大幅度折扣。点击任意游戏即可锁定您的激活密钥！"
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
      description: "我们现在无法与服务器同步。请确保您的设备处于联网状态，然后我们再试一次。",
      retryButton: "重试连接"
    },
    empty: {
      title: "未找到匹配项",
      description: "在此商店类别下未发现进行中的促销特惠。",
      resetButton: "重置筛选条件"
    },
    pagination: {
      prev: "上一页",
      next: "下一批游戏"
    }
  },
  months: {
    january: "一月",
    february: "二月",
    march: "三月",
    april: "四月",
    may: "五月",
    june: "六月",
    july: "七月",
    august: "八月",
    september: "九月",
    october: "十月",
    november: "十一月",
    december: "十二月"
  },
  onboarding: {
    welcome: "欢迎使用 Frapp",
    legalTitle: "法律协议",
    legalSubtitle: "在访问我们的全球数据同步管道之前，请先仔细阅读隐私条款。",
    title: "追踪电子游戏免费赠送与高端游戏特惠信息。",
    title2: "获取限时赠礼与折扣特惠",
    description: "Frapp 专注于聚合最新的 100% 免费可领取的游戏奖励，以及跨多个商店的前端深度零售折扣，让您总是花得更少，玩得更多。",
    privacyHeader: "隐私与数据核心框架",
    privacyBody: "Frapp 是一款开源的数据聚合工具，能将您分散的数据流、API 动态和数字触点统一整合到一个简洁、凝聚的仪表盘中。因为我们完全采用本地优先（Local-first）的机制运行，所以我们不维护任何中心化存储、不抓取物理账户结构，也不追踪用户的遥测历史记录。所有的聚合、处理和可视化操作全部直接在您的硬件本地运行——这意味着您的数据绝不会传输给外部主集线器或中央管理网络，也不会被其记录。您的本地化配置配置文件、历史缓存文件以及交互偏好设置都会安全地保留在您的设备中。",
    consentLabel: "我接受服务条款和隐私声明",
    btnStep1: "继续",
    btnStep2: "开始使用",
    versionLabel: "Frapp • v1.1.4"
  }
} as const;