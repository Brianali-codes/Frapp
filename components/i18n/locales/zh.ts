export const zh = {
  header: {
    title: "设置。",
    subtitle: "自定义应用行为、调整通知、切换显示模式或查看开源许可。"
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
    savedGiveaways: "我的游戏库。",
    savedGiveawaysSub: "查看已保存的游戏",
    notificationSettings: "通知设置",
    notificationSettingsSub: "开关推送通知",
    appIntroduction: "新手指引",
    appIntroductionSub: "重温指引内容",
    checkForUpdates: "应用版本",
    checkForUpdatesSub: "检查更新",
    Report: "反馈 Bug",
    ReportSub: "提交 Bug 或问题",
  },
  about: {
    developer: "关于开发者",
    developerSub: "访问个人作品集",
    moreApps: "更多应用",
    moreAppsSub: "浏览 GitHub 仓库",
    socials: "社交媒体",
    socialsSub: "在社交平台关注我们",
    privacy: "隐私政策",
    privacySub: "查看我们的隐私政策。"
  },
  community: {
    supportOpenSource: "支持开源",
    supportOpenSourceSub: "本应用为独立开发且完全免费。如果您觉得有所帮助，欢迎在 GitHub 上为我们点亮 Star！",
    starGithub: "在 GitHub 上点亮 Star",
    buyCoffee: "赞助开发者（Buy Me a Coffee）",
    buyCoffeeSub: "帮助我们维持服务器运行！一份微小的赞助将支持我们继续维护项目并添加新功能。",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower 网站",
    gamepowerSub: "赠品游戏主要数据源",
    cheapshark: "CheapShark API",
    cheapsharkSub: "游戏折扣 API"
  },
  report: {
    title: "反馈 Bug。",
    subtitle: "提交 Bug 或问题",
    sectionTitle: "选择 Bug 类型",
    categories: {
      ui: "界面 / 交互故障 (UI/UX)",
      api: "API / 数据错误",
      crash: "性能问题 / 崩溃",
      feature: "功能建议"
    },
    githubCard: {
      title: "通过 GitHub Issues 提交",
      description: "点击下方按钮将打包您的设备参数并跳转打开 GitHub Issue 提交页面。",
      buttonText: "反馈 {{category}}"
    },
    attributionCard: {
      title: "第三方 API 说明",
      description: "应用内展示的所有数据均直接通过 Gamepower 和 CheapShark 的公开 API 接口获取。Frapp 不会干预商品列表、价格或分发时间。"
    },
    alerts: {
      errorTitle: "错误",
      errorMessage: "无法跳转至 GitHub，请检查浏览器权限设置。"
    },
    github: {
      bodyDescription: "此操作将永久移除您收藏列表中的所有赠品游戏。您需要手动重新查找并添加。",
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
    subtitle: "{{version}} 已发布！",
    description: "检测到新版本 ({{latest}})。请从当前版本 ({{current}}) 更新以体验最新功能！",
    later: "取消",
    updateNow: "立即更新"
  },
  modals: {
    dismiss: "全部清除",
    ok: "确定",
    testFailedTitle: "测试失败",
    testFailedMessage: "无法执行渲染循环，请检查本地权限设置。",
    upToDateTitle: "已是最新版本",
    upToDateMessage: "您当前已在运行最新版本 ({{version}})，无需更新。",
    upToDateAction: "太棒了",
    checkFailedTitle: "检查失败",
    checkFailedMessage: "暂时无法完成查询，请检查网络连接后重试。",
    failedAction: "关闭",
    socialsTitle: "分享推广",
    languageTitle: "选择语言"
  },
  giveaways: {
    title: "限时免费 (Giveaways)。",
    summary: {
      prefix: "截至 ",
      midActive: "，我们共找到 ",
      midWorth: " 个活动中的免费游戏，总价值 ",
      suffix: "。请在过期前领取！"
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
      description: "当前无法连接至服务器，请确保设备已联网后重试。",
      retryButton: "重新连接"
    },
    empty: {
      title: "未找到免费游戏",
      description: "当前该平台暂无活动中的免费领取活动。",
      viewAllButton: "查看所有平台"
    },
    tracking: {
      days_left: "还剩 {{count}} 天",
      day_left: "还剩 1 天",
      ends_today: "今天截止",
      expired: "已截止",
      keys_left: "剩余 Key 数量: {{count}}",
      instructions_title: "领取说明:"
    },
    pagination: {
      previous: "上一页",
      next: "下一页"
    }
  },
  giveaways1: {
    summary: {
      prefix: "您有 ",
      midActive: " 个已保存的游戏，",
      midWorth: "总价值为 ",
      suffix: "。请在截止前尽快领取！"
    },
    empty: {
      viewAllButton: "探索应用"
    },
    delete: {
      title: "删除所有保存的游戏？",
      description: "此操作将从您的保存列表中永久移除所有已标记的免费游戏。",
      confirmButton: "全部删除"
    },
  },
  deals: {
    title: "特惠折扣。",
    titleClaim: "获取优惠。",
    claim: "获取优惠",
    retailer: "零售商",
    store: "商店",
    free_uppercase: "免费",
    share_message: "🔥 优惠速报：{{title}} 在 {{platform}} 降价至 {{price}}（立省 {{saved}}）！\n立即查看：{{url}}",
    save_amount: "省 {{amount}}%",
    hot_deal: "热门特惠",
    rating: "{{percent}}",
    released: "截止日期: ",
    no_description: "在促销期结束或价格调整前赶紧入手吧！",
    breakdown_title: "查看详情",
    breakdown_body: "在原价 {{original}} 的基础上共可节省 {{saved}}（相当于享受 {{percent}}% 的折扣优惠）。",
    summary: {
      prefix: "截至 ",
      midActive: "，我们在各大游戏商店中发现了 ",
      suffix: " 个超级折扣。点击任意游戏即可锁定您的优惠！"
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
      description: "无法与服务器同步，请检查您的网络连接。",
      retryButton: "重新连接"
    },
    empty: {
      title: "未找到匹配项",
      description: "该商店分类下暂无活动优惠。",
      resetButton: "重置筛选"
    },
    pagination: {
      prev: "上一页",
      next: "下一页"
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
    legalTitle: "法律条款",
    legalSubtitle: "在使用数据同步前，请先阅读隐私条款。",
    title: "追踪免费游戏与超值游戏折扣。",
    title2: "随时获取限免与折扣",
    description: "Frapp 汇集各大平台的 100% 免费游戏和超低折扣，助您花更少的钱玩更多的游戏。",
    privacyHeader: "隐私与数据框架",
    privacyBody: "Frapp 是一个注重本地隐私的开源数据聚合工具。我们不会在服务器上存储个人数据，也不会追踪用户轨迹。所有偏好和缓存均安全保存在您的设备本地。",
    consentLabel: "我同意服务条款与隐私声明",
    btnStep1: "继续",
    btnStep2: "立即体验",
    versionLabel: "Frapp • v1.1.6"
  }
} as const;