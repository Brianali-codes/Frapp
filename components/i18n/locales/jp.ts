// src/i18n/locales/ja.ts
export const ja = {
  header: {
    title: "設定",
    subtitle: "アプリケーションの動作のカスタマイズ、通知の調整、ディスプレイ設定の切り替え、オープンソース認証情報の確認ができます。"
  },
  sections: {
    preferences: "環境設定",
    about: "アプリについて",
    community: "コミュニティ & サポート",
    providers: "データプロバイダー"
  },
  preferences: {
    themeAppearance: "テーマの外観",
    themeDark: "ダークモード",
    themeLight: "ライトモード",
    appLanguage: "アプリの言語",
    appLanguageSub: "翻訳レイヤーの切り替え",
    savedGiveaways: "マイライブラリ",
    savedGiveawaysSub: "ブックマークしたゲームにアクセス",
    notificationSettings: "通知設定",
    notificationSettingsSub: "プッシュ通知の切り替え",
    appIntroduction: "アプリの紹介",
    appIntroductionSub: "オンボーディングの再確認",
    checkForUpdates: "アップデートを確認",
    checkForUpdatesSub: "アプリのビルドバージョンの確認"
  },
  about: {
    developer: "開発者について",
    developerSub: "ポートフォリオサイトを訪問",
    moreApps: "その他のアプリ",
    moreAppsSub: "GitHubリポジトリを探索",
    socials: "ソーシャルメディア",
    socialsSub: "各プラットフォームでつながる",
    privacy: "プライバシーポリシー",
    privacySub: "Frappのポリシーを表示"
  },
  community: {
    supportOpenSource: "オープンソースを支援",
    supportOpenSourceSub: "このアプリケーションは、個人で開発され無料で提供されています。これらのセール情報が役に立った場合は、GitHubでスターを付けていただけると励みになります！",
    starGithub: "GitHubでスターを付ける",
    buyCoffee: "プロジェクトを支援",
    buyCoffeeSub: "サーバーの維持にご協力ください！少額の寄付をいただくことで、プロジェクトの維持や新機能の追加が可能になります。",
    donateKofi: "Ko-fiで寄付する",
    donatePatreon: "Patreonで寄付する"
  },
  providers: {
    gamepower: "Gamepower サイト",
    gamepowerSub: "主なギブアウェイのデータソース",
    cheapshark: "CheapShark API",
    cheapsharkSub: "ゲームセールのAPIマトリックス"
  },
  report: {
    title: "保存されたライブラリをクリアしますか？",
    subtitle: "アプリケーションの問題が発生した場合、または価格や値の不一致に気付いた場合は、以下のカテゴリを選択してレポートを送信してください。",
    sectionTitle: "バグカテゴリの選択",
    categories: {
      ui: "UI/UXのバグ",
      api: "API / データエラー",
      crash: "パフォーマンス / クラッシュ",
      feature: "機能リクエスト"
    },
    githubCard: {
      title: "GitHub Issuesから直接送信",
      description: "下のボタンをクリックすると、選択したカテゴリとローカルデバイスの環境パラメータがパッケージ化され、GitHubのIssueページが開きます。",
      buttonText: "{{category}}を報告"
    },
    attributionCard: {
      title: "プロジェクトとAPIの帰属",
      description: "このオープンソース配信は、GamepowerおよびFree To Gameのアーキテクチャから提供されるストリームに完全に依存しています。これらの独立したAPIまたは関連コンテンツは、FRAPPに直接帰属するものではありません。"
    },
    footerVersion: "Frapp バージョン v1.1.4",
    alerts: {
      errorTitle: "エラー",
      errorMessage: "GitHubにリダイレクトできませんでした。ブラウザの権限を確認してください。"
    },
    github: {
      bodyDescription: "この操作を行うと、ピン留めされたすべてのギブアウェイがリストから完全に削除されます。手動で再度検索して追加する必要があります。",
      step1: "アプリを開く",
      step2: "画面を移動...",
      step3: "現象を確認..."
    }
  },
  footer: {
    build: "Frapp バージョン {{version}}"
  },
  updateModal: {
    title: "アップデートがあります",
    subtitle: "{{version}} が利用可能です！",
    description: "アプリの新しいバージョン ({{latest}}) があります。現在のバージョン ({{current}}) からアップデートして、最新の変更を適用してください！",
    later: "キャンセル",
    updateNow: "今すぐアップデート"
  },
  modals: {
    dismiss: "すべて削除",
    ok: "OK",
    testFailedTitle: "テストターゲットの失敗",
    testFailedMessage: "レンダリングループを実行できませんでした。ローカルの権限を確認してください。",
    upToDateTitle: "最新の状態です",
    upToDateMessage: "すでに最新のビルド ({{version}}) を実行しています。アップデートは不要です。",
    upToDateAction: "素晴らしい",
    checkFailedTitle: "検証失敗",
    checkFailedMessage: "現在、ルックアップクエリを完了できませんでした。接続を確認して再試行してください。",
    socialsTitle: "開発者とつながる",
    languageTitle: "言語を選択"
  },
  giveaways: {
    title: "無料で受け取る",
    summary: {
      prefix: "あなたは ",
      midActive: " 個のギブアウェイをピン留めしており、合計 ",
      midWorth: "",
      suffix: " 節約できます！有効期限が切れる前に受け取ってください。"
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
      title: "接続が切断されました",
      description: "現在、データパイプラインと同期できません。インターネット接続を確認して再試行してください。",
      retryButton: "接続を再試行"
    },
    empty: {
      title: "ライブラリが空です",
      description: "開催中のフリードロップを探索し、ハートアイコンをタップしてここに保存し、後で簡単に受け取れるようにしましょう！",
      viewAllButton: "アプリを探索"
    },
    tracking: {
      days_left: "残り {{count}} 日",
      day_left: "残り 1 日",
      ends_today: "本日終了",
      expired: "期間終了",
      keys_left: "残りキー数: {{count}}",
      instructions_title: "獲得手順:"
    },
    pagination: {
      previous: "前へ",
      next: "次のゲーム"
    }
  },
  deals: {
    title: "ゲームセール",
    claim: "今すぐ獲得",
    retailer: "小売店",
    store: "ストア",
    free_uppercase: "無料",
    share_message: "🔥 セール情報: {{platform}}で{{title}}が{{price}}に値下げされました（{{saved}}の節約）！\nこちらからチェック: {{url}}",
    save_amount: "${{amount}} 節約",
    hot_deal: "価値",
    rating: "支持率 {{percent}}%",
    released: "終了: ",
    no_description: "追加の説明コンテキストが見つかりません。価格が変更される前にこのセール情報を獲得してください！",
    breakdown_title: "セール情報の詳細を表示",
    breakdown_body: "元の小売価格 {{original}} から {{saved}} 節約できます（全体で {{percent}}% 割引）。",
    summary: {
      prefix: "アクティブなウェブストアのインデックスをスクラブし、",
      midActive: " にライブ配信されたプレミア価値の割引を検出しました ",
      suffix: "。任意のカードを操作してキーを確保してください！"
    },
    stores: {
      all: "すべてのストア",
      amazon: "Amazon"
    },
    empty: {
      title: "一致する結果が見つかりません",
      description: "このストアの選択に一致する割引ゲームのインデックスはカタログに登録されていません。",
      resetButton: "フィルターをリセット"
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
  }
} as const;