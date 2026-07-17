// src/i18n/locales/zh.ts
export const zh = {
  header: {
    title: "设置.",
    subtitle: "自定义应用行为、调整通知、切换显示设置或阅读开源凭证。"
  },
  sections: {
    preferences: "偏好设置.",
    about: "关于.",
    community: "社区与支持.",
    providers: "数据提供商."
  },
  preferences: {
    themeAppearance: "主题外观",
    themeDark: "深色模式",
    themeLight: "浅色模式",
    appLanguage: "应用语言",
    appLanguageSub: "切换翻译语言",
    savedGiveaways: "我的库",
    savedGiveawaysSub: "查看已收藏的游戏",
    notificationSettings: "通知设置",
    notificationSettingsSub: "切换推送配置",
    appIntroduction: "应用介绍",
    appIntroductionSub: "重新查看欢迎引导",
    checkForUpdates: "检查更新",
    checkForUpdatesSub: "验证应用构建版本"
  },
  about: {
    developer: "关于开发者",
    developerSub: "访问个人作品集",
    moreApps: "更多应用",
    moreAppsSub: "浏览 GitHub 仓库",
    socials: "社交媒体",
    socialsSub: "跨平台建立联系",
    privacy: "隐私政策",
    privacySub: "查看 Frapp 政策"
  },
  community: {
    supportOpenSource: "支持开源",
    supportOpenSourceSub: "本应用为独立开发并免费托管。如果您觉得发现这些优惠很有价值，在 GitHub 上为我们点个 Star 将是巨大的支持！",
    starGithub: "在 GitHub 上为我们点亮星星",
    buyCoffee: "支持项目",
    buyCoffeeSub: "帮助维持服务器运行！小额捐赠能让我们维护项目并持续添加新功能。",
    donateKofi: "在 Ko-fi 上捐赠",
    donatePatreon: "在 Patreon 上捐赠"
  },
  providers: {
    gamepower: "Gamepower 网站",
    gamepowerSub: "主要福利赠送数据源",
    cheapshark: "CheapShark API",
    cheapsharkSub: "游戏优惠 API 矩阵"
  },
  report: {
    title: "清空已保存的库？",
    subtitle: "遇到应用问题或注意到价格、数值不一致？选择下方的一个类别并提交实时追踪报告。",
    sectionTitle: "选择错误类别",
    categories: {
      ui: "UI/UX 异常",
      api: "API / 数据错误",
      crash: "性能问题 / 崩溃",
      feature: "功能建议"
    },
    githubCard: {
      title: "直接通过 GitHub Issues 提交",
      description: "点击下方的操作按钮将安全地打包您的选择模版、本地设备环境参数，并打开 GitHub 错误追踪页面。",
      buttonText: "报告 {{category}}"
    },
    attributionCard: {
      title: "项目与 API 归属声明",
      description: "此开源分发完全依赖于 Gamepower 和 Free To Game 架构提供的结构化数据流。这些独立的 API 或相关内容实体均不直接属于 FRAPP。"
    },
    footerVersion: "Frapp 版本 v1.1.4",
    alerts: {
      errorTitle: "错误",
      errorMessage: "无法重定向至 GitHub。请检查浏览器路由权限。"
    },
    github: {
      bodyDescription: "此操作将从您的保存列表中永久移除所有固定福利。您将需要手动探索并重新添加它们。",
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
    subtitle: "{{version}} 现 pl 登场！",
    description: "应用已有新版本 ({{latest}}) 可用。请从您当前的旧版本 ({{current}}) 进行更新，以获取最新的改动内容！",
    later: "取消",
    updateNow: "立即更新"
  },
  modals: {
    dismiss: "清除全部",
    ok: "确 定",
    testFailedTitle: "测试目标失败",
    testFailedMessage: "无法执行瞬时部署渲染循环。请确认本地权限。",
    upToDateTitle: "已是最新版本",
    upToDateMessage: "您已经在运行最新的构建版本 ({{version}})。无需更新。",
    upToDateAction: "太棒了",
    checkFailedTitle: "验证失败",
    checkFailedMessage: "目前无法完成查询。请检查您的网络连接并重试。",
    socialsTitle: "与我取得联系",
    languageTitle: "选择语言"
  },
  giveaways: {
    title: "免费领取.",
    summary: {
      prefix: "您已固定了 ",
      midActive: " 个福利待领取，共为您节省了 ",
      midWorth: "",
      suffix: "！请务必在它们过期之前完成领取。"
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
      title: "连接已中断",
      description: "我们目前无法与上游查询管线完成同步。请检查您的互联网连接并重试。",
      retryButton: "重试连接"
    },
    empty: {
      title: "您的库是空的",
      description: "探索正在进行的免费活动，点击心形图标将其保存在这里，以便稍后轻松领取！",
      viewAllButton: "探索应用"
    },
    tracking: {
      days_left: "剩余 {{count}} 天",
      day_left: "剩余 1 天",
      ends_today: "今日截止",
      expired: "已过期",
      keys_left: "剩余 Key 数量: {{count}}",
      instructions_title: "领取指南:"
    },
    pagination: {
      previous: "上一页",
      next: "下一波游戏"
    }
  },
  deals: {
    title: "游戏优惠.",
    claim: "立即领取",
    retailer: "零售商",
    store: "商店平台",
    free_uppercase: "免费",
    share_message: "🔥 优惠特报: {{platform}} 上的 {{title}} 已降至 {{price}} (节省了 {{saved}})！\n立即前往获取: {{url}}",
    save_amount: "节省 ${{amount}}",
    hot_deal: "价值",
    rating: "{{percent}}% 好评率",
    released: "截止日期: ",
    no_description: "未找到其他描述背景。请在目标价值变动之前捕获此优惠数据！",
    breakdown_title: "查看优惠详情",
    breakdown_body: "您从原始零售估值 {{original}} 中节省了 {{saved}}（总体折扣达 {{percent}}%）。",
    summary: {
      prefix: "我们已经清洗了当前活跃的网页商店索引，并检测到 ",
      midActive: " 顶级价值折扣实时发布于 ",
      suffix: "。点击任何目标卡片以获取 Key！"
    },
    stores: {
      all: "所有商店",
      amazon: "Amazon"
    },
    empty: {
      title: "未找到匹配项",
      description: "没有与该商店选择相匹配的降价游戏数据记录。",
      resetButton: "重置筛选"
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
  }
} as const;