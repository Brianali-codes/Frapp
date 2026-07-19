export const jp = {
  header: {
    title: "設定。",
    subtitle: "アプリケーションの動作のカスタマイズ、通知の調整、表示設定の切り替え、またはオープンソースの認証情報の確認を行います。"
  },
  sections: {
    preferences: "環境設定。",
    about: "アプリについて。",
    community: "コミュニティ & サポート。",
    providers: "データプロバイダー。"
  },
  preferences: {
    themeAppearance: "テーマの外観",
    themeDark: "ダークモード",
    themeLight: "ライトモード",
    appLanguage: "アプリの言語",
    appLanguageSub: "言語を切り替える",
    savedGiveaways: "マイライブラリ。",
    savedGiveawaysSub: "保存されたゲームにアクセス",
    notificationSettings: "通知設定",
    notificationSettingsSub: "プッシュ通知の切り替え",
    appIntroduction: "オンボーディング",
    appIntroductionSub: "オンボーディング内容の再確認",
    checkForUpdates: "アプリのバージョン",
    checkForUpdatesSub: "アップデートを確認"
  },
  about: {
    developer: "開発者について",
    developerSub: "ポートフォリオサイトを訪問",
    moreApps: "その他のアプリ",
    moreAppsSub: "GitHubリポジトリを探索",
    socials: "ソーシャルメディア",
    socialsSub: "各プラットフォームでつながる",
    privacy: "プライバシーポリシー",
    privacySub: "プライバシーポリシーを表示。"
  },
  community: {
    supportOpenSource: "オープンソースを支援する",
    supportOpenSourceSub: "このアプリケーションは個人によって開発され、無料でホストされています。もしこれらのセール情報に価値を感じていただけたなら、GitHubでスターを付けていただけると励みになります！",
    starGithub: "GitHubでスターを付ける",
    buyCoffee: "コーヒーを一杯ごちそうする",
    buyCoffeeSub: "サーバーの維持と開発者のカフェイン補給のためにご協力をお願いします！少額の寄付により、プロジェクトの維持や新機能の追加が可能になります。",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower サイト",
    gamepowerSub: "メインのギブアウェイデータソース",
    cheapshark: "CheapShark API",
    cheapsharkSub: "ビデオゲームセール API"
  },
 report: {
    title: "バグを報告する。",
    subtitle: "アプリで問題が発生した場合は、テンプレートを選択してレポートを送信してください。（レポートはレビューのためにGitHubリポジトリへ提出されます）",
    sectionTitle: "バグのカテゴリを選択",
    categories: {
      ui: "UI/UXの不具合",
      api: "API / データの異常",
      crash: "パフォーマンス / 強制終了",
      feature: "機能の要望"
    },
    githubCard: {
      title: "GitHub Issuesから直接提出する",
      description: "下のボタンをクリックすると、選択したテンプレートとローカルデバイスの環境パラメータが安全にバンドルされ、GitHubのIssueトラックページが開きます。",
      buttonText: "{{category}} を報告"
    },
    attributionCard: {
      title: "サードパーティAPIに関する開示",
      description: "インターフェース全体に表示されるすべてのデータインデックスは、GamepowerおよびCheapSharkのオープンなパブリックアーキテクチャを介して、外部ネットワークから直接取得されています。これらのインデックスの使用は、提供元の配信ルールに直接準拠しています。Frappは、個々のアイテムリストの操作、価格構造の変更、または配信スケジュールの管理を行いません。したがって、それぞれのプラットフォームを通じて配信される外部ノードやキーの継続的な利用可能性、正確性、または継続的なサポートを保証することはできません。"
    },
    footerVersion: "Frapp バージョン v1.1.4",
    alerts: {
      errorTitle: "エラー",
      errorMessage: "GitHubにリダイレクトできませんでした。ブラウザのルーティング権限を確認してください。"
    },
    github: {
      bodyDescription: "この操作を行うと、ピン留めされたすべてのギブアウェイが保存リストから永久に削除されます。手動で再度探し出して追加する必要があります。",
      step1: "アプリを開く",
      step2: "次へ移動...",
      step3: "現象を確認する..."
    }
  },
  footer: {
    build: "Frapp バージョン {{version}}"
  },
  updateModal: {
    title: "アップデートがあります",
    subtitle: "{{version}} がリリースされました！",
    description: "アプリの新しいバージョン ({{latest}}) が利用可能です。最新の変更を適用するために、現在のバージョン ({{current}}) からアップデートしてください！",
    later: "キャンセル",
    updateNow: "今すぐアップデート"
  },
  modals: {
    dismiss: "すべて削除",
    ok: "OK",
    testFailedTitle: "テストターゲットの失敗",
    testFailedMessage: "即時展開のレンダリングループを実行できませんでした。ローカルの権限を確認してください。",
    upToDateTitle: "最新の状態です",
    upToDateMessage: "すでに最新の修正ビルド ({{version}}) が実行されています。アップデートは不要です。",
    upToDateAction: "素晴らしい",
    checkFailedTitle: "検証失敗",
    checkFailedMessage: "現時点でルックアップクエリを完了できませんでした。接続状況を確認して再試行してください。",
    socialsTitle: "プロモを共有",
    languageTitle: "言語を選択"
  },
  giveaways: {
    title: "ギブアウェイ。",
    summary: {
      prefix: "",
      midActive: " 時点で、合計 ",
      midWorth: " 相当となる、合計 ",
      suffix: " 個のアクティブなゲームギブアウェイが見つかりました。有効期限が切れる前に獲得しましょう！"
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
      description: "現在、アップストリームの検索パイプラインと同期できません。インターネットアクセスを確認して、もう一度お試しください。",
      retryButton: "接続を再試行"
    },
    empty: {
      title: "ギブアウェイが見つかりません",
      description: "現在、このプラットフォームで利用可能なアクティブなギブアウェイはありません。",
      viewAllButton: "すべてのプラットフォームを表示"
    },
    tracking: {
      days_left: "残り {{count}} 日",
      day_left: "残り 1 日",
      ends_today: "本日終了",
      expired: "期限切れ",
      keys_left: "残りキー数: {{count}}",
      instructions_title: "獲得手順:"
    },
    pagination: {
      previous: "前へ",
      next: "次のページ"
    }
  },
  giveaways1: {
    summary: {
      prefix: "現在、合計 ",
      midActive: " 個の保存されたゲーム（合計 ",
      midWorth: " 相当）があります",
      suffix: "。有効期限が切れる前に獲得しましょう！"
    },
    empty: {
      viewAllButton: "アプリを探索する"
    },
    delete: {
      title: "すべてのゲームを削除しますか？",
      description: "この操作を行うと、ピン留めされたすべてのギブアウェイが保存リストから永久に削除されます。手動で再度探し出して追加する必要があります。",
      confirmButton: "すべて削除"
    }
  },
  deals: {
    title: "ゲームセール。",
    titleClaim: "セールへ移動。",
    claim: "セールへ移動",
    retailer: "リテイラー",
    store: "ストア",
    free_uppercase: "無料",
    share_message: "🔥 セール情報: {{platform}} で『{{title}}』が {{price}} に値下がりしました（{{saved}} のお得）！\nこちらからチェック: {{url}}",
    save_amount: "{{amount}}% OFF",
    hot_deal: "注目のセール",
    rating: "{{percent}}",
    released: "終了日: ",
    no_description: "プロモーション期間が終了するか、価格帯が変更される前に、この特別な価値のあるオファーを掴み取りましょう！",
    breakdown_title: "詳細を表示",
    breakdown_body: "通常の小売価格 {{original}} から合計 {{saved}} の値引き（実質 {{percent}}% の確実なプライスダウン）となります。",
    summary: {
      prefix: "稼働中のゲームストアフロントを解析した結果、",
      midActive: " 時点で、",
      suffix: " 個の大型割引セールがライブ配信されているのを発見しました。タイトルをタップしてキーを確保しましょう！"
    },
    stores: {
      all: "すべてのストア",
      steam: "Steam",
      epic: "Epic Games",
      gog: "GOG",
      amazon: "Amazon"
    },
    error: {
      title: "接続が中断されました",
      description: "現在サーバーと同期できません。デバイスがオンラインであることを確認して、もう一度お試しください。",
      retryButton: "接続を再試行"
    },
    empty: {
      title: "一致する結果が見つかりません",
      description: "このストアカテゴリの下で現在実施中のセールは見つかりませんでした。",
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
    legalTitle: "法的合意",
    legalSubtitle: "グローバルデータ同期パイプラインにアクセスする前に、プライバシー条件を確認してください。",
    title: "ビデオゲームの無料配布やプレミアムなゲームセール情報を追跡します。",
    title2: "ギブアウェイとセール情報を入手",
    description: "Frappはゲームの無料配布（ギブアウェイ）と、大幅なビデオゲームセールの両方を取り扱っています。ストアフロント全体の最新の100%無料の特典と深い小売割引を統合しているため、いつでもより少ない費用でより多くのゲームをプレイできます。",
    privacyHeader: "プライバシー & データコアフレームワーク",
    privacyBody: "Frappは、分散したデータストリーム、APIフィード、デジタルタッチポイントを単一のまとまったダッシュボードに統合するオープンソースのデータアグリゲーターツールです。完全にローカルファーストのツールとして動作するため、中央ストレージの維持、物理的なアカウント構造の収集、またはユーザーのテレメトリ履歴の追跡は一切行いません。すべての集約、処理、および可視化はハードウェア上で直接実行されるため、データが外部のマスターハブや中央の管理ネットワークに送信されたり、ログに記録されたりすることはありません。ローカルに配置された設定プロファイル、履歴キャッシュファイル、およびインタラクティブな好みは、デバイス上に安全に保持されます。",
    consentLabel: "利用規約とプライバシーに関する声明に同意します",
    btnStep1: "次へ進む",
    btnStep2: "始める",
    versionLabel: "Frapp • v1.1.4"
  }
} as const;