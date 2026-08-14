export const jp = {
  header: {
    title: "設定",
    subtitle: "アプリの動作調整、通知設定、画面表示の切り替え、オープンソースライセンスの確認ができます。"
  },
  sections: {
    preferences: "環境設定",
    about: "アプリについて",
    community: "コミュニティ＆サポート",
    providers: "データプロバイダー"
  },
  preferences: {
    themeAppearance: "テーマ設定",
    themeDark: "ダークモード",
    themeLight: "ライトモード",
    appLanguage: "アプリの言語",
    appLanguageSub: "言語を切り替える",
    savedGiveaways: "マイライブラリ",
    savedGiveawaysSub: "保存したゲームを見る",
    notificationSettings: "通知設定",
    notificationSettingsSub: "プッシュ通知のオン/オフ",
    appIntroduction: "オンボーディング",
    appIntroductionSub: "初期説明を再確認",
    checkForUpdates: "アプリバージョン",
    checkForUpdatesSub: "アップデートを確認",
    Report: "バグを報告",
    ReportSub: "不具合や問題を報告",
  },
  about: {
    developer: "開発者について",
    developerSub: "ポートフォリオを見る",
    moreApps: "その他のアプリ",
    moreAppsSub: "GitHubリポジトリを閲覧",
    socials: "ソーシャルメディア",
    socialsSub: "SNSでつながる",
    privacy: "プライバシーポリシー",
    privacySub: "プライバシーポリシーを表示"
  },
  community: {
    supportOpenSource: "オープンソースを支援",
    supportOpenSourceSub: "このアプリは個人によって開発され、無料で提供されています。役立つと感じた場合は、GitHubでスターをつけていただけると励みになります！",
    starGithub: "GitHubでスターをつける",
    buyCoffee: "開発者を支援する（Buy Me a Coffee）",
    buyCoffeeSub: "サーバーの維持と継続的な開発のためにご協力をお願いします！少額の寄付でも新機能追加の大きな力になります。",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower サイト",
    gamepowerSub: "ギブアウェイのメインデータソース",
    cheapshark: "CheapShark API",
    cheapsharkSub: "ゲームセール情報のAPI"
  },
  report: {
    title: "バグを報告",
    subtitle: "不具合や問題を報告",
    sectionTitle: "バグのカテゴリを選択",
    categories: {
      ui: "UI/UXの表示崩れ",
      api: "API / データエラー",
      crash: "パフォーマンス / クラッシュ",
      feature: "機能のリクエスト"
    },
    githubCard: {
      title: "GitHub Issues から直接送信",
      description: "下のボタンをタップすると、選択した内容とデバイス情報がまとめられ、GitHubのIssueページが開きます。",
      buttonText: "{{category}} を報告"
    },
    attributionCard: {
      title: "サードパーティAPIに関する注記",
      description: "表示されるデータはGamepowerおよびCheapSharkの公開APIから取得されています。Frappが価格や配信スケジュールを直接操作することはありません。"
    },
    footerVersion: "Frapp バージョン v1.1.5",
    alerts: {
      errorTitle: "エラー",
      errorMessage: "GitHubに移動できませんでした。ブラウザのアクセス許可を確認してください。"
    },
    github: {
      bodyDescription: "この操作を行うと、保存されたギブアウェイがすべて削除されます。必要に応じて手動で再追加してください。",
      step1: "アプリを開く",
      step2: "～へ移動する",
      step3: "確認する"
    }
  },
  footer: {
    build: "Frapp バージョン {{version}}"
  },
  updateModal: {
    title: "アップデート利用可能",
    subtitle: "{{version}} がリリースされました！",
    description: "新しいバージョン（{{latest}}）が利用可能です。現在のバージョン（{{current}}）から更新して最新機能を利用しましょう！",
    later: "キャンセル",
    updateNow: "今すぐ更新"
  },
  modals: {
    dismiss: "すべて消去",
    ok: "OK",
    testFailedTitle: "テスト失敗",
    testFailedMessage: "レンダリングループを実行できませんでした。権限を確認してください。",
    upToDateTitle: "最新の状態です",
    upToDateMessage: "すでに最新ビルド（{{version}}）をご利用中です。アップデートの必要はありません。",
    upToDateAction: "了解",
    checkFailedTitle: "確認失敗",
    checkFailedMessage: "情報を取得できませんでした。ネットワーク接続を確認して再試行してください。",
    failedAction: "閉じる",
    socialsTitle: "プロモを共有",
    languageTitle: "言語を選択"
  },
  giveaways: {
    title: "ギブアウェイ（無料配布）",
    summary: {
      prefix: "現在、",
      midActive: " 件の無料配布ゲームが見つかりました（取得日: ",
      midWorth: "、総額: ",
      suffix: "）。配布終了前に受け取りましょう！"
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
      title: "接続エラー",
      description: "サーバーに接続できません。通信環境を確認のうえ、再度お試しください。",
      retryButton: "再試行"
    },
    empty: {
      title: "ギブアウェイが見つかりません",
      description: "現在このプラットフォームで利用可能な無料配布はありません。",
      viewAllButton: "すべてのプラットフォームを表示"
    },
    tracking: {
      days_left: "残り {{count}} 日",
      day_left: "残り 1 日",
      ends_today: "本日終了",
      expired: "終了しました",
      keys_left: "残りキー数: {{count}}",
      instructions_title: "受け取り手順:"
    },
    pagination: {
      previous: "前へ",
      next: "次へ"
    }
  },
  giveaways1: {
    summary: {
      prefix: "保存済みゲーム: ",
      midActive: " 件 ",
      midWorth: "（総額: ",
      suffix: "）。期限が切れる前に取得しましょう！"
    },
    empty: {
      viewAllButton: "アプリを探索"
    },
    delete: {
      title: "すべてのゲームを削除しますか？",
      description: "この操作により、ブックマークしたギブアウェイがすべて削除されます。",
      confirmButton: "すべて消去"
    },
  },
  deals: {
    title: "ゲームセール情報",
    titleClaim: "セールを利用",
    claim: "セールを利用",
    retailer: "販売元",
    store: "ストア",
    free_uppercase: "無料",
    share_message: "🔥 セール情報: {{title}} が {{platform}} で {{price}} に値下げ中（{{saved}} お得）！\n詳細はこちら: {{url}}",
    save_amount: "{{amount}}% OFF",
    hot_deal: "おすすめセール",
    rating: "{{percent}}",
    released: "終了日: ",
    no_description: "セール期間が終了する前にこのお得な機会をお見逃しなく！",
    breakdown_title: "詳細を見る",
    breakdown_body: "定価 {{original}} から {{saved}} 引き（{{percent}}% オフ）で購入可能です。",
    summary: {
      prefix: "各ストアを検索し、",
      midActive: " 件の大型割引が見つかりました（取得日: ",
      suffix: "）。タイトルをタップしてキーを獲得しましょう！"
    },
    stores: {
      all: "すべてのストア",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "接続エラー",
      description: "サーバーとの通信に失敗しました。インターネット接続を確認してください。",
      retryButton: "再試行"
    },
    empty: {
      title: "該当する情報がありません",
      description: "このカテゴリに該当するセール情報は現在ありません。",
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
    welcome: "Frapp へようこそ",
    legalTitle: "利用規約とポリシー",
    legalSubtitle: "利用を開始する前にプライバシー条件をご確認ください。",
    title: "無料配布ゲームや格安セール情報をいち早くチェック。",
    title2: "ギブアウェイとセール情報を入手",
    description: "Frappは無料配布情報と大幅割引セールをひとつに集約し、より手軽にゲームを楽しめるようサポートします。",
    privacyHeader: "プライバシーとデータ方針",
    privacyBody: "Frappはローカルファーストで動作するオープンソースツールです。サーバーに個人情報を保存・追跡することはありません。すべての設定やキャッシュは端末内に安全に保管されます。",
    consentLabel: "利用規約およびプライバシーポリシーに同意します",
    btnStep1: "次へ",
    btnStep2: "はじめる",
    versionLabel: "Frapp • v1.1.5"
  }
} as const;