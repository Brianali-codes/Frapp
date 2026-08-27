export const jp = {
  header: {
    title: "設定.",
    subtitle: "アプリの動作カスタマイズ、通知調整、画面表示設定、オープンソースライセンスの確認ができます。"
  },
  sections: {
    preferences: "環境設定.",
    about: "アプリについて.",
    community: "コミュニティ＆サポート.",
    providers: "データプロバイダー."
  },
  preferences: {
    themeAppearance: "テーマの外観",
    themeDark: "ダークモード",
    themeLight: "ライトモード",
    appLanguage: "アプリの言語",
    appLanguageSub: "言語を切り替える",
    savedGiveaways: "マイライブラリ.",
    savedGiveawaysSub: "保存したゲームにアクセス",
    notificationSettings: "通知設定",
    notificationSettingsSub: "プッシュ通知のオン/オフ",
    appIntroduction: "オンボーディング",
    appIntroductionSub: "初期ガイドを再確認",
    checkForUpdates: "アプリバージョン",
    checkForUpdatesSub: "アップデートを確認",
    Report: "バグを報告",
    ReportSub: "不具合や問題点を報告",
  },
  about: {
    developer: "開発者について",
    developerSub: "ポートフォリオを見る",
    moreApps: "その他のアプリ",
    moreAppsSub: "GitHubリポジトリを見る",
    socials: "公式SNS",
    socialsSub: "各プラットフォームで接続",
    privacy: "プライバシーポリシー",
    privacySub: "プライバシーポリシーを確認"
  },
  community: {
    supportOpenSource: "オープンソースを支援",
    supportOpenSourceSub: "このアプリは個人開発され、無料で公開されています。役立つと感じたら、ぜひGitHubでスターをお願いします！",
    starGithub: "GitHubでスターをつける",
    buyCoffee: "開発者をサポート",
    buyCoffeeSub: "サーバーの維持と開発の継続にご協力ください。少額の寄付が新機能追加の大きな励みになります。",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower サイト",
    gamepowerSub: "無料配布情報のメインソース",
    cheapshark: "CheapShark API",
    cheapsharkSub: "ゲームセール情報のAPI"
  },
  report: {
    title: "バグを報告.",
    subtitle: "不具合や問題点を報告",
    sectionTitle: "バグのカテゴリを選択",
    categories: {
      ui: "UI/UXの表示崩れ",
      api: "API / データエラー",
      crash: "パフォーマンス / クラッシュ",
      feature: "機能のリクエスト"
    },
    githubCard: {
      title: "GitHub Issuesから直接報告",
      description: "下のボタンをタップすると、デバイスの環境情報を含むテンプレートが生成され、GitHubのIssueページが開きます。",
      buttonText: "{{category}} を報告"
    },
    attributionCard: {
      title: "サードパーティAPIに関する注記",
      description: "表示されているすべてのデータは、GamepowerおよびCheapSharkの公開APIから取得されています。Frappは価格や配布期間を変更・操作していません。配布キーや外部サービスの利用可能性を保証するものではありません。"
    },
    alerts: {
      errorTitle: "エラー",
      errorMessage: "GitHubを開けませんでした。ブラウザのアクセス権限を確認してください。"
    },
    github: {
      bodyDescription: "この操作を行うと、保存されたすべてのゲーム配布情報がライブラリから削除されます。",
      step1: "アプリを開く",
      step2: "移動する...",
      step3: "確認する..."
    }
  },
  footer: {
    build: "Frapp バージョン {{version}}"
  },
  updateModal: {
    title: "アップデート利用可能",
    subtitle: "バージョン {{version}} がリリースされました！",
    description: "新しいバージョン ({{latest}}) が利用可能です。現在のバージョン ({{current}}) から更新して最新機能を体験しましょう！",
    later: "キャンセル",
    updateNow: "今すぐ更新"
  },
  modals: {
    dismiss: "すべて消去",
    ok: "OK",
    testFailedTitle: "テスト失敗",
    testFailedMessage: "レンダリングループを実行できませんでした。権限を確認してください。",
    upToDateTitle: "最新の状態です",
    upToDateMessage: "すでに最新のバージョン ({{version}}) を使用しています。",
    upToDateAction: "了解",
    checkFailedTitle: "確認失敗",
    checkFailedMessage: "情報を取得できませんでした。インターネット接続を確認して再試行してください。",
    failedAction: "閉じる",
    socialsTitle: "共有する",
    languageTitle: "言語を選択"
  },
  giveaways: {
    title: "無料配布ゲーム.",
    summary: {
      prefix: "現在 ",
      midActive: " 件の無料配布ゲームが見つかりました（合計 ",
      midWorth: " 相当：",
      suffix: "）。期限が切れる前に獲得しましょう！"
    },
    platforms: {
      all: "すべて",
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
      drmFree: "DRMフリー",
      itchio: "itch.io"
    },
    error: {
      title: "通信エラー",
      description: "サーバーに接続できません。ネットワーク接続を確認して再試行してください。",
      retryButton: "再試行"
    },
    empty: {
      title: "配布情報が見つかりません",
      description: "現在このプラットフォーム向けの配布情報はありません。",
      viewAllButton: "すべてのプラットフォームを表示"
    },
    tracking: {
      days_left: "残り {{count}} 日",
      day_left: "残り 1 日",
      ends_today: "本日終了",
      expired: "配布終了",
      keys_left: "残りキー数: {{count}}",
      instructions_title: "獲得手順:"
    },
    pagination: {
      previous: "前へ",
      next: "次へ"
    }
  },
  giveaways1: {
    summary: {
      prefix: "保存済みゲーム: ",
      midActive: " 件（合計 ",
      midWorth: " 相当：",
      suffix: "）。配布終了前に受け取りましょう！"
    },
    empty: {
      viewAllButton: "アプリを探索する"
    },
    delete: {
      title: "すべてのゲームを削除しますか？",
      description: "保存リストからすべてのゲームが完全に削除されます。",
      confirmButton: "すべて消去"
    },
  },
  deals: {
    title: "ゲームセール情報.",
    titleClaim: "セールを見る.",
    claim: "セールを見る",
    retailer: "販売元",
    store: "ストア",
    free_uppercase: "無料",
    steam_rating: "Steam評価: {{percent}}% {{text}}",
    metacritic_score: "Metacriticスコア: {{score}}",
    share_message: "🔥 セール情報: {{title}} が {{platform}} で {{price}} ({{saved}} お得) に値下げ中！\n詳細はこちら: {{url}}",
    save_amount: "{{amount}}% OFF",
    carousel_description: "セール評価指数 {{rating}}/10！ 今すぐ ${{saved}} 節約。",
    hot_deal: "注目のセール",
    best_price: "最安値",
    verified_promo: "確認済みプロモ",
    view: "詳細を見る",
    no_competing_offers: "他ストアの取り扱い情報はありません。",
    rating: "{{percent}}",
    no_description: "期間終了前にこのお得なセールを活用しましょう！",
    breakdown_title: "セールの詳細",
    breakdown_body: "定価 {{original}} から {{saved}} 割引中（{{percent}}% オフ）。",
    live_store_comparisons: "リアルタイム ストア比較",
    lowest_price_ever: "過去最安値",
    all_time_low: "史上最安値",
    lowest_price_recorded: "記録された最安値",
    lowest_price_nodate: "過去最安値記録: ${{price}}",
    summary: {
      prefix: "主要ストアから ",
      midActive: " 件の大幅割引セールを発見しました（",
      suffix: " 時点）。タイトルをタップしてキーを獲得しましょう！"
    },
    stores: {
      all: "すべてのストア",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "通信エラー",
      description: "サーバーに接続できません。ネット接続を確認してください。",
      retryButton: "再試行"
    },
    empty: {
      title: "該当するセールがありません",
      description: "このストアカテゴリのセールは見つかりませんでした。",
      resetButton: "フィルターをリセット"
    },
    pagination: {
      prev: "前へ",
      next: "次のゲーム"
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
    welcome: "Frappへようこそ",
    legalTitle: "利用規約とプライバシー",
    legalSubtitle: "利用を開始する前にプライバシー条件をご確認ください。",
    title: "無料配布とセールをトラッキング.",
    title2: "無料配布＆ゲームセール情報",
    description: "Frappは100%無料配布と各種ストアのゲームセール情報を集約し、より安くゲームを楽しめるようサポートします。",
    privacyHeader: "プライバシーとデータ保護",
    privacyBody: "Frappはオープンソースかつローカル優先設計です。ユーザーの個人情報や行動履歴を外部サーバーに送信・保存することはありません。",
    consentLabel: "利用規約とプライバシーポリシーに同意します",
    btnStep1: "次へ",
    btnStep2: "始める",
    versionLabel: "v1.1.6",
    permissionsTitle: "アプリの権限",
    permissionsSubtitle: "Frappは通知とリマインダーのアクセス許可が必要です（Android 14以降では正確なアラーム権限が必要です）。",
    pushTitle: "プッシュ通知",
    pushDesc: "無料配布や大特価セール情報をいち早く受け取れます。",
    granted: "準備完了",
    allow: "許可する",
    alarmTitle: "正確なリマインダー",
    alarmDesc: "保存したゲームの終了24時間前にアラートを設定できます。",
    setup: "設定する"
  }
} as const;