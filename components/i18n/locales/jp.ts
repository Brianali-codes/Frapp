export const jp = {
  header: {
    title: "設定.",
    subtitle: "アプリの動作カスタマイズ、通知の調整、ディスプレイ設定の切り替え、またはオープンソース認証情報の確認を行います。"
  },
  sections: {
    preferences: "環境設定.",
    about: "アプリについて.",
    community: "コミュニティ & サポート.",
    providers: "データプロバイダー."
  },
  preferences: {
    themeAppearance: "テーマの外観",
    themeDark: "ダークモード",
    themeLight: "ライトモード",
    appLanguage: "アプリの言語",
    appLanguageSub: "言語の切り替え",
    savedGiveaways: "マイライブラリ.",
    savedGiveawaysSub: "保存されたゲームにアクセス",
    notificationSettings: "通知設定",
    notificationSettingsSub: "プッシュ通知の切り替え",
    appIntroduction: "オンボーディング",
    appIntroductionSub: "オンボーディングの内容を確認",
    checkForUpdates: "アプリのバージョン",
    checkForUpdatesSub: "アップデートを確認"
  },
  about: {
    developer: "開発者について",
    developerSub: "個人ポートフォリオを表示",
    moreApps: "その他のアプリ",
    moreAppsSub: "GitHubリポジトリを探索",
    socials: "ソーシャルメディア",
    socialsSub: "各種プラットフォームでつながる",
    privacy: "プライバシーポリシー",
    privacySub: "プライバシーポリシーを表示します。"
  },
  community: {
    supportOpenSource: "オープンソースを支援",
    supportOpenSourceSub: "このアプリは個人で開発され、無料でホストされています。もしこれらのセール情報が役に立ったなら、GitHubでスターを付けていただけると大変励みになります！",
    starGithub: "GitHubでスターを付ける",
    buyCoffee: "開発者をコーヒーで応援",
    buyCoffeeSub: "サーバーの維持にご協力ください！少額の寄付をいただくことで、プロジェクトの維持や新機能の追加を行うことができます。",
    donateKofi: "Ko-fi",
    donatePatreon: "Patreon"
  },
  providers: {
    gamepower: "Gamepower サイト",
    gamepowerSub: "主要な無料配布データソース",
    cheapshark: "CheapShark API",
    cheapsharkSub: "ビデオゲームセールAPI"
  },
  report: {
    title: "バグを報告する.",
    subtitle: "アプリでお困りの場合は、テンプレートを選択して報告を送信してください。(報告は確認のためGitHubリポジトリに送信されます)",
    sectionTitle: "バグのカテゴリを選択",
    categories: {
      ui: "UI/UXの不具合",
      api: "API / データエラー",
      crash: "パフォーマンス / 強制終了",
      feature: "機能要望"
    },
    githubCard: {
      title: "GitHub Issuesから直接報告する",
      description: "下のボタンをクリックすると、選択した内容とローカルデバイスの環境パラメータが安全にバンドルされ、GitHubのバグ追跡ページが開きます。",
      buttonText: "{{category}}を報告する"
    },
    attributionCard: {
      title: "サードパーティAPIに関する開示",
      description: "インターフェース上に表示されるすべてのデータインデックスは、GamepowerおよびCheapSharkのオープンパブリックアーキテクチャを介して外部ネットワークから直接取得されています。これらのインデックスの使用は、それぞれのネイティブ配信ルールに準拠しています。Frappは、個々のアイテムリストの操作、価格構造の変更、または配信スケジュールの管理を行いません。したがって、これらのプラットフォームを通じて配信される外部ノードまたはキーの継続的な利用可能性、正確性、または継続的なサポートを保証することはできません。"
    },
    footerVersion: "Frapp バージョン v1.1.4",
    alerts: {
      errorTitle: "エラー",
      errorMessage: "GitHubにリダイレクトできませんでした。ブラウザのルーティング権限を確認してください。"
    },
    github: {
      bodyDescription: "この操作を行うと、保存されたリストからピン留めされたすべての無料配布が完全に削除されます。手動で再度探して追加する必要があります。",
      step1: "アプリを開く",
      step2: "次へ進む...",
      step3: "状態を確認する..."
    }
  },
  footer: {
    build: "Frapp バージョン {{version}}"
  },
  updateModal: {
    title: "アップデートがあります",
    subtitle: "{{version}} が利用可能です！",
    description: "アプリの新しいバージョン ({{latest}}) が利用可能です。最新の変更を適用するために、現在のバージョン ({{current}}) からアップデートしてください！",
    later: "キャンセル",
    updateNow: "今すぐアップデート"
  },
  modals: {
    dismiss: "すべて消去",
    ok: "OK",
    testFailedTitle: "テストターゲットの失敗",
    testFailedMessage: "即時展開レンダリングループを実行できませんでした。ローカルの権限を確認してください。",
    upToDateTitle: "最新の状態です",
    upToDateMessage: "すでに最新のリビジョンビルド ({{version}}) を実行しています。アップデートは必要ありません。",
    upToDateAction: "素晴らしい",
    checkFailedTitle: "検証失敗",
    checkFailedMessage: "現時点で検索クエリを完了できませんでした。接続状態を確認して再試行してください。",
    socialsTitle: "セールを共有",
    languageTitle: "言語を選択"
  },
  giveaways: {
    title: "無料配布.",
    summary: {
      prefix: "現在、",
      midActive: " 時点でアクティブなゲームの無料配布が ",
      midWorth: " 個見つかりました。総額価値は ",
      suffix: " です。期限が切れる前に手に入れましょう！"
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
      description: "現在、データパイプラインとの同期ができません。インターネット接続を確認して再試行してください。",
      retryButton: "接続を再試行"
    },
    empty: {
      title: "無料配布が見つかりません",
      description: "現在、このプラットフォームで利用可能なアクティブな無料配布はありません。",
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
      prefix: "保存されたゲームが ",
      midActive: " 件あります ",
      midWorth: "、総額価値は ",
      suffix: " です。期限が切れる前に手に入れましょう！"
    },
    empty: {
      viewAllButton: "アプリを探索"
    },
    delete: {
      title: "すべてのゲームを削除しますか？",
      description: "この操作を行うと、保存されたリストからピン留めされたすべての無料配布が完全に削除されます。手動で再度探して追加する必要があります。",
      confirmButton: "すべて消去"
    }
  },
  deals: {
    title: "ゲームセール.",
    titleClaim: "セールを利用する.",
    claim: "セールを利用する",
    retailer: "小売業者",
    store: "ストア",
    free_uppercase: "無料",
    share_message: "🔥 セール情報: {{platform}} で {{title}} が {{price}} に値下げされました（{{saved}} お得）！\nこちらからチェック: {{url}}",
    save_amount: "{{amount}}% OFF",
    hot_deal: "圧倒的バリューセール",
    rating: "{{percent}}",
    released: "終了日: ",
    no_description: "プロモーション期間が終了するか、価格が変更される前に、この特別な価値の特典を手に入れましょう！",
    breakdown_title: "詳細を見る",
    breakdown_body: "通常の小売価格 {{original}} から合計 {{saved}} の割引（{{percent}}% の値引き）が適用されています。",
    summary: {
      prefix: "アクティブなゲームストアを解析した結果、",
      midActive: " に実施中の大規模な割引を ",
      suffix: " 件発見しました。タイトルをタップしてキーを確保しましょう！"
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
      description: "サーバーと同期できません。デバイスがオンラインであることを確認して、もう一度お試しください。",
      retryButton: "接続を再試行"
    },
    empty: {
      title: "一致する情報が見つかりません",
      description: "このストアカテゴリの下に現在有効なセールはありません。",
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
    legalTitle: "法的同意事項",
    privacyHeader: "プライバシー コア フレームワーク",
    privacyBody: "Frappは、完全にオープンソースのデータアグリゲーターツールとして動作します。ローカルストレージプラットフォームの維持、物理的なアカウント構造の収集、ユーザーのテレメトリ履歴の追跡は一切行いません。すべてのプロセスはハードウェア上で直接実行されるため、内部のマスターハブや中央の管理ネットワークにデータが送信、処理、またはログ記録されることはありません。ローカルの設定プロファイル、履歴キャッシュファイル、インタラクティブな設定は、デバイス内に安全に保持されます。",
    consentLabel: "利用規約およびプライバシーに関する声明に同意します",
    btnStep1: "次へ",
    btnStep2: "始める",
    versionLabel: "Frapp • v1.1.3"
  }
} as const;