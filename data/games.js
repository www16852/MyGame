/* ============================================================
   遊戲情報資料檔  ——  data/games.js

   這是整個網站唯一的「資料來源」。所有頁面都讀這份檔。
   更新網站 = 更新這份檔（AI 會依 UPDATE_PROMPT.md 自動維護）。

   ── 資料格式說明 ──────────────────────────────────────────

   window.GAMES_DATA = {
     lastUpdated: "YYYY-MM-DD",   // 這份資料最後更新的日期

     games: [                      // 每款遊戲一個物件
       {
         id:        "唯一英文代號，例如 silksong（小寫、不含空白）",
         name:      "顯示用遊戲名稱（中文）",
         nameEn:    "英文名稱（可留空字串）",
         genre:     "類型，例如 動作 / RPG / 開放世界",
         platforms: ["PC", "PS5", "Switch", ...],
         developer: "開發商（可留空）",
         summary:   "2~4 句遊戲簡介",
         tags:      ["關鍵字", "標籤"],          // 用於導覽分類，可留空陣列
         status:    "等待中 / 已上市 / 跳票 等簡短狀態",
         links:     { steam: "網址或空字串", official: "網址或空字串" },

         playerCount: "支援的遊玩人數／模式，例如 單人 / 1~4 人合作 / 大型多人線上(MMO)；查不到留空字串",

         events: [   // 這款遊戲的所有時程事件
           {
             type: "release | early_access | demo | beta | announcement",
             //  release       = 正式上市
             //  early_access  = 搶先體驗 / 搶先測試
             //  demo          = 試玩版 Demo
             //  beta          = 封測 / 公測 / Beta
             //  announcement  = 一般情報 / 重大公告
             date: "顯示用日期字串，例如 2026年7月15日 / 2026 Q3 / 未定(TBA)",
             sort: "YYYY-MM-DD 排序用日期；不確定就用該期間第一天；TBA 用 9999-12-31",
             note: "這個事件的補充說明（可留空字串）"
           }
         ]
       }
     ],

     news: [   // 「最新情報」頁的條列消息（最新的放前面也沒關係，程式會自動排序）
       {
         date:   "2026-06-08",   // YYYY-MM-DD
         gameId: "對應的遊戲 id，可留空字串",
         title:  "情報標題",
         body:   "情報內容（1~3 句）"
       }
     ],

     interests: ["關注的遊戲類型字串", ...],   // 「新品推薦」頁用；對齊 games.txt 的「類型:」設定

     discover: [   // 關注類型中「已上市／搶先體驗、且評價不錯」的新作（詳見 UPDATE_PROMPT.md 第 3.7 步）
       {
         id, name, nameEn,
         interest: "命中的關注類型（需與 interests 內字串一致）",
         genre, developer, platforms: [...], playerCount,
         released: "顯示用上市/搶先體驗日期",
         sort: "YYYY-MM-DD",
         rating: "評價文字，例如「壓倒性好評 92%（64,000+ 則）」",
         reason: "2~3 句推薦理由／評價亮點",
         links: { steam: "", official: "" }
       }
     ]
   };
   ============================================================ */

window.GAMES_DATA = {
  lastUpdated: "2026-08-22",

  games: [
    {
      id: "themound",
      name: "The Mound: Omen of Cthulhu",
      nameEn: "The Mound: Omen of Cthulhu",
      genre: "合作恐怖 / 克蘇魯",
      platforms: ["PC", "PS5", "Xbox Series"],
      developer: "ACE Team（發行：Nacon）",
      summary: "改編自 H.P. Lovecraft 世界觀、設定於 16 世紀南美叢林的合作心理恐怖遊戲，最多支援 4 人連線。透過鄰近語音與燧發槍械對抗宇宙恐怖，理智崩潰時連隊友都可能被你視為敵人。標榜大量暴力與血腥場面，並支援跨平台連線。",
      tags: ["合作", "恐怖", "多人連線"],
      status: "已上市",
      links: {
        steam: "https://store.steampowered.com/app/2569760/The_Mound_Omen_of_Cthulhu/",
        official: "https://store.epicgames.com/p/the-mound-c7a7dc"
      },
      playerCount: "單人 / 1~4 人合作（線上）",
      events: [
        { type: "beta", date: "2026年6月5日 ~ 6月8日", sort: "2026-06-05", note: "封閉測試（Closed Beta），同步開放主機版預購" },
        { type: "demo", date: "2026年6月15日起開放", sort: "2026-06-15", note: "配合 Steam 新品節（Steam Next Fest）釋出免費 PC 試玩版，支援最多 4 人線上合作；Next Fest（6/15~6/22）結束後開發商宣布無限期持續開放；截至 7 月上旬累積逾 45 萬次下載、30 萬名玩家完成超過百萬次探索" },
        { type: "release", date: "2026年7月15日", sort: "2026-07-15", note: "PC（Steam / Epic Games Store）/ PS5 / Xbox Series 正式上市，台灣時間 7月15日 16:00（PDT 01:00）同步解鎖，支援跨平台連線；標準版 $29.99、豪華版 $39.99（含 2 位額外可玩角色、獨家「Temple of Yig」任務及原聲帶，僅主機擁有即可讓全隊享用）；Steam 願望清單於 7月13日提前突破第三里程碑 80 萬，上市當日全員自動享 20% 折扣（標準版約 $23.99、豪華版約 $31.99）；主機版預購享 10% 折扣；裝飾武器包「Lost Explorers' Swords Pack」上市首兩週向全體玩家免費開放（需手動至 Steam 商店頁領取）" },
        { type: "announcement", date: "2026年7月15日（上市首日）", sort: "2026-07-15", note: "首日 Patch 上線：主船新增武器升級鑄造台（Weapon Upgrade Anvil）、追加即時語音推撥通話（Push-to-Talk）、移除強制任務結束計時器（玩家可自行決定何時撤離）、木筏手記旁白附加手繪插圖、新增戰鬥機制教學圖鑑頁、調整高階任務難度平衡、動暈輔助中心點與 FOV 滑桿（75~125）；已知問題：跨平台直接邀請功能異常，目前官方暫行對策為透過伺服器清單找到房主（修復日期未定）；媒體評測出爐：Metacritic 70（15 篇，褒貶不一）、OpenCritic 71（Fair 評級，34 篇），多數評測肯定理智崩潰機制與合作深度，惟指出難度平衡與火槍手感仍有改善空間" },
        { type: "announcement", date: "2026年7月（上市後）", sort: "2026-07-17", note: "開發商公布上市後更新路線圖：Q3 2026 聚焦 UE5 效能優化（減少 shader 卡頓）與理智崩潰事件擴充；秋季版本計劃推出沼澤地形、大型廢墟等新環境，及守點、追蹤超自然目標、心理攻擊生存等多樣任務類型；冬季版本引入 Sanity Anchor（穩定隊友理智）與 Vanguard Scout（機動偵察）兩個專精角色職能，以及歷史武器客製化系統；跨平台全球社群里程碑活動（達標解鎖限定外觀與世界觀故事）亦在規劃中。Week-One Patch 同步新增密碼保護伺服器（Password-Protected Servers）功能，讓不同平台玩家可建立私人房間繞開跨平台邀請異常問題（正式修復更新日期仍未定）；Steam 累積用戶評論 2,490 則，整體好評率 68%（褒貶不一），批評集中於移動手感偏重、武器耐久消耗快及無跳躍設計，合作深度與恐怖氛圍仍廣受肯定" },
        { type: "announcement", date: "2026年7月17日", sort: "2026-07-17", note: "Steam Beta Branch 推出效能優化 Patch，針對嚴重卡頓與資源串流瓶頸進行修正，受影響區域幀率最高提升約 25%；跨平台直接邀請功能異常仍在修復中" },
        { type: "announcement", date: "2026年7月21日", sort: "2026-07-21", note: "Patch 1.01 正式推送至穩定主分支：包含後啟動熱修復（Post Launch Hotfixes）與平衡調整，新增「Crossplay Friend Finder」功能（可在伺服器清單中依好友名稱搜尋，部分緩解跨平台直接邀請異常問題）；新增進場相機模式預選畫面（Cinematic / Default）；支援在木筏互動時以滑鼠整理背包；共 17 項相容性與效能修正" },
        { type: "announcement", date: "2026年7月29日", sort: "2026-07-29", note: "Patch 1.02「Block Ability & Hotfixes」正式推送至全平台：為全角色新增格擋 / 擋反機制（預設鍵盤 Q、手把 RB/R1，持續按壓消耗耐力），大幅改變近戰戰鬥節奏；同步包含多項熱修復；「Lost Explorers' Swords Pack」免費領取期限亦已於 7/29 到期（售價回復 $4.99）；跨平台直接邀請異常問題仍未修復，密碼保護伺服器搜尋仍為官方暫行對策" },
        { type: "release", date: "2026年8月6日（實體版）", sort: "2026-08-06", note: "PS5 / Xbox Series X|S 盒裝光碟版正式發售（數位版已於 7月15日全平台上架）" },
        { type: "announcement", date: "2026年8月上旬", sort: "2026-08-04", note: "上市三週後評論持續累積：Steam 3,328 則、好評率 69%（褒貶不一），Metacritic 66（17 篇評測），OpenCritic 69（45 篇，33% 媒體推薦）；正面評論肯定恐怖氛圍與合作深度，負面評論集中於森林區域微卡頓、移動手感偏重及單人模式薄弱；跨平台直接邀請功能修復時程仍未公布" },
        { type: "announcement", date: "2026年8月7日", sort: "2026-08-07", note: "Patch 1.03「Quality of Life Hotfixes」正式推送至全平台：新增 Quickmatch 快速媒合功能（一鍵加入對局，無需手動瀏覽伺服器清單）、伺服器媒合篩選器（可依地區與語言過濾對局）、遊戲內語音聊天品質改善、效能優化，以及卡入地形時可自行傳送脫困的功能；跨平台直接邀請功能修復時程仍未公布，密碼保護伺服器搜尋仍為官方暫行對策" }
      ]
    },
    {
      id: "neverwither",
      name: "不朽之樹",
      nameEn: "Never Wither",
      genre: "多人線上生存製作 ARPG",
      platforms: ["PC"],
      developer: "Geo Seed Games（發行：Luckycalf）",
      summary: "以「收集生物」為核心的多人線上生存動作 RPG。在 Eda 大陸捕捉並化身為幻想生物、建造神殿與聚落，與其他玩家合作淨化世界，亦支援公會與私人伺服器。",
      tags: ["生存", "收集", "建造", "多人連線"],
      status: "等待中",
      links: {
        steam: "https://store.steampowered.com/app/3809080/",
        official: ""
      },
      playerCount: "單人 / 線上合作 / PvP / 大型多人線上 (MMO)",
      events: [
        { type: "beta", date: "2026年5月30日 ~ 6月2日", sort: "2026-05-30", note: "首次限時限量技術測試（小規模）已結束，開放首個區域「翠影谷地」，含 19 種可收集生物與 4 名頭目，約 3~5 小時內容；本次僅支援單人模式，多人功能仍在開發中" },
        { type: "announcement", date: "2026年7月6日", sort: "2026-07-06", note: "開啟社群「生物命名活動」，邀請玩家為兩種即將亮相的新生物投票命名（徵集期 7/6~7/19，社群投票期 7/23~7/29）；入選玩家名字將永久記錄於遊戲圖鑑" },
        { type: "announcement", date: "2026年7月9日", sort: "2026-07-09", note: "開發日誌 #4 公開第二區域「狂風高地（Windhowl Plateau）」：峭壁與荒原交錯的惡劣地帶，介紹三種全新戰鬥型生物——鋼臂養蜂人（Steel-arm Beekeepers）、迴旋鼬（Boomerang Weasels）與岩石騎士（Rock Knights）" },
        { type: "announcement", date: "2026年7月23日~7月29日（投票期）", sort: "2026-07-23", note: "生物命名活動「Name Me」進入社群投票階段（7/23~7/29）：玩家票選鑽地礦工型（挖掘突襲特性）與羽翼劍客型（結合飛行與劍術）兩種新生物的最終名稱，結果預計 7/30~8/1 公布；入選命名玩家的名字將永久載入遊戲圖鑑" },
        { type: "announcement", date: "2026年7月30日", sort: "2026-07-30", note: "參加 ChinaJoy 2026 Steam 展示（7/31~8/3）：開發商於 7/30 在 Steam 社群發布公告邀請玩家加入願望清單，遊戲 Steam 頁同步標記為 ChinaJoy 2026 展出作品；正式上市與次輪測試日期仍未公布" },
        { type: "announcement", date: "2026年8月1日（公示期截止）", sort: "2026-08-01", note: "「Name Me」生物命名活動公示期（7/30~8/1）正式結束：鑽地礦工型生物最終命名為「岩脊地龍（Stone Ridge Earth Dragon）」、羽翼劍客型生物最終命名為「青翎劍梟（Green Feather Sword Owl）」；入選命名玩家的名字將永久載入遊戲圖鑑" },
        { type: "beta", date: "2026年8月（週末試玩，開放申請中）", sort: "2026-08-03", note: "配合亮相 ChinaJoy 2026 Steam 展示，開發商透過 Steam 發布公告「現可申請測試！亮相2026東方遊戲文化週」，宣布開放新一輪週末試玩（Weekend Playtest）報名；距首輪技術測試（5/30~6/2）約兩個月，開發商表示仍在積極開發新內容並準備下一個試玩版本；具體測試時程待官方後續公告" },
        { type: "release", date: "未定 (TBA)", sort: "9999-12-31", note: "正式上市日期仍未定，目前為 Coming Soon" }
      ]
    },
    {
      id: "dungeonsettlers",
      name: "地城拓荒",
      nameEn: "Dungeon Settlers",
      genre: "策略模擬 / 殖民地經營 / 地城探索",
      platforms: ["PC", "Mac"],
      developer: "CanOpener",
      summary: "結合殖民地模擬與地城探索的硬派策略遊戲。在荒地上建立聚落、管理資源與人口、訓練隊伍，並帶領他們深入永無止境的地城，以策略攻克可暫停的即時戰術戰鬥——角色一旦陣亡便永久死亡，無法復活。",
      tags: ["策略", "模擬", "經營", "地城探索"],
      status: "等待中",
      links: {
        steam: "https://store.steampowered.com/app/2798330/Dungeon_Settlers/",
        official: ""
      },
      playerCount: "單人（隊伍最多 4 人作戰）",
      events: [
        { type: "demo", date: "2026年5月24日起開放", sort: "2026-05-24", note: "Steam 免費試玩版上架，Steam 新品節期間獲媒體廣泛報導，目前好評率 93%（349 則）" },
        { type: "announcement", date: "2026年6月（EA 前公告）", sort: "2026-06-01", note: "宣布 EA 上市時將加入新可玩種族「Lycan（狼族）」（白天偏弱、夜晚增強，擅長靈活物理輸出，適配弓與長槍）以及新武器「長槍（Spear）」，開放新的戰鬥配置組合" },
        { type: "beta", date: "2026年7月23日 ~ 7月29日", sort: "2026-07-23", note: "第 3 次 Supporters Program 封測，開放 Region 1~2、新種族 Lycan（狼族）、新武器長槍（Spear）、新特性 / 道具 / 效果及難度平衡調整；Steam 頁申請資格、限量隨機抽選；封測存檔不保證相容於 9/4 EA 版" },
        { type: "announcement", date: "2026年8月7日", sort: "2026-08-07", note: "官方宣布 EA 上市日期由 9 月 10 日提前至 9 月 4 日（UTC 08:00）；開發商表示進度超前預期、對提前一週與玩家見面感到雀躍；EA 版仍包含區域 1~2 與「深淵」挑戰內容，同步新增巴西葡萄牙語支援" },
        { type: "announcement", date: "2026年8月8日", sort: "2026-08-08", note: "Steam 願望清單正式突破 20 萬人里程碑；開發商 CanOpener 向社群表達感謝，表示「20 萬不只是一個數字，它代表著你們每一個人的支持與期待，讓這款遊戲得以實現」" },
        { type: "announcement", date: "2026年8月14日", sort: "2026-08-14", note: "亮相 BIC Festival 2026（韓國 BIC Incubator 獨立遊戲展，線上展覽 8/7~8/28，實體展覽 8/14~8/16 於釜山 BEXCO）：InvenGlobal 於 8/14 發布試玩預覽「Dungeon Settlers: A game that smells like a hardcore deep dive from the very first impression」，高度肯定硬核策略深度；官方 Gameplay Trailer 同期釋出於 YouTube，進一步展示殖民地建造與地城探索玩法；EA 正式上市（9/4 UTC 08:00）進入最後倒數兩週" },
        { type: "early_access", date: "2026年9月4日（UTC 08:00）", sort: "2026-09-04", note: "以搶先體驗（Early Access）形式上市（比原訂 9/10 提前一週）；初期開放區域 1~2 與「深淵」挑戰內容；完整版預計共 6 個區域；同步新增巴西葡萄牙語支援" }
      ]
    },
    {
      id: "guildrun",
      name: "Guildrun",
      nameEn: "Guildrun",
      genre: "Roguelike 自動戰鬥 (Autobattler)",
      platforms: ["PC", "Mac"],
      developer: "Leyline",
      summary: "PvE 自動戰鬥 roguelike。組建各具特色的英雄隊伍、深入致命裂隙，透過特性、道具與遺物在一次次遊玩中不斷進化 build，粉碎成群的怪物浪潮；可突破職業限制、發掘無數組合與協同效果。主創團隊具《爐石戰記》與《The Bazaar》資歷。",
      tags: ["Roguelike", "自動戰鬥", "策略", "單人"],
      status: "等待中",
      links: {
        steam: "https://store.steampowered.com/app/3669200/",
        official: ""
      },
      playerCount: "單人（含全球排行榜無盡模式）",
      events: [
        { type: "demo", date: "2026年7月16日起開放", sort: "2026-07-16", note: "Steam 免費試玩版上架；初上架特別好評 92%，截至 8 月 19 日評論數約 1,783 則、好評率約 90%（特別好評）；峰值同時上線約 12,000 人，10 天內吸引逾 30 萬試玩玩家（GameDiscover.co 統計），兩週累積逾 20 萬玩家完成約 200 萬次通關；含 8 種難度、每週更新與社群活動；此前經歷 3,000+ 人封閉 Alpha 測試" },
        { type: "announcement", date: "2026年7月23日", sort: "2026-07-23", note: "試玩版首次平衡更新 Patch 0.5.1.718：針對社群回饋大幅擴充可行策略並加入 QoL 優化；截至上線一週試玩人數突破 20 萬；傳奇探索遺物（Legendary Quest Relics）商店費用由 30 降至 25" },
        { type: "announcement", date: "2026年7月28日（約）", sort: "2026-07-28", note: "試玩版第二次平衡更新 Patch 0.5.2：Boss 代幣每場由 1 個增至 2 個（加快遺物獲取節奏）、新增事件圖片與視覺更新、多項英雄專精調整（Aria、Sal、Irini、Kai、Gustav 等）及物品縮放與急救回退 Bug 修復；同步重置排行榜（全球分數清零）" },
        { type: "announcement", date: "2026年7月底", sort: "2026-07-31", note: "Demo 好評率升至 95%（特別好評，1,200+ 則）；開發商官方確認完整版將加入雙人合作（Two-Player Co-op）模式，目前試玩版仍為單人；Demo 進度預計可移轉至正式版（官方 FAQ 確認）" },
        { type: "announcement", date: "2026年8月4日", sort: "2026-08-04", note: "美國遊戲媒體 Kotaku 發布特集報導「Guildrun's Free Demo Is Good Enough To Take On Slay The Spire」，高度評價試玩版品質堪比成熟商業作品，並直接與《殺戮尖塔》相比較；截至同日 Steam 試玩版評論達 1,445 則，好評率 95%（特別好評）；GameDiscover.co 統計 10 天內吸引逾 30 萬試玩玩家" },
        { type: "announcement", date: "2026年8月4日", sort: "2026-08-04", note: "Demo Patch 0.5.3 推送：英雄平衡大幅調整——Hoyoung、Fiona 魔力消耗下調，Karsu 魔力與攻擊力上調，Sal 攻速下調；技能調整包含 Killshot 傷害係數 2.5→3.0、Petrification 每層毒素傷害翻倍（1→2）；遺物重平衡（Shard Resonator 護盾 1000→600、多件典藏遺物 legacy stack 增量提升）；Rogue's Cowl 完整改版（新增全新機制）、Squire 套裝血量與攻擊力增強；為持續 Demo 週更節奏的第三次正式 patch" },
        { type: "announcement", date: "2026年8月11日", sort: "2026-08-11", note: "Demo Patch 0.5.4 推送：英雄數值調整（Rowan 最大魔力升至 115、Skorn 最大血量升至 950、Kai 防禦升至 41）；多項技能重平衡（護盾倍率、傷害輸出與狀態效果調整）；道具大幅強化（Toxic Ring 暴擊 7→15、Freezing Ring 魔力 12→25 等戒指類全面提升）；遺物更新（Shield Investment Filigree 移除觸發間隔限制）；為第四次週更節奏的 Demo 平衡 Patch" },
        { type: "announcement", date: "2026年8月18日", sort: "2026-08-18", note: "Demo Patch 0.5.5 推送（第五次週更平衡 Patch）：延續每週更新節奏，進行英雄數值、技能、道具與遺物等平衡調整；Steam 試玩版好評率持續維持特別好評水準（詳細更新內容見 Steam 官方公告）" },
        { type: "release", date: "2027 年（預計，官方 FAQ 目標，尚未定檔）", sort: "2027-07-01", note: "開發商 Leyline 官方 Steam FAQ 確認目標上市年份為 2027；早期媒體報導提及「2026 年下半」為舊資訊，Steam 頁仍標示確切日期 TBA；完整版含雙人合作、更多英雄與地圖等大幅擴充內容" }
      ]
    }
  ],

  news: [
    {
      date: "2026-08-22",
      gameId: "subnautica2",
      title: "《深海迷航 2》Update 1.2「Buddy System」8/19 正式上線：近距語音聊天、道具交易、復活機制全上",
      body: "Unknown Worlds 於 8 月 19 日推出 1.2「Buddy System」合作大更新：新增近距語音聊天（Proximity Chat，遠距自動切換為無線電並逐漸斷訊）、玩家物品交易（Inventory Sharing）、死亡後可復活機制（含倒數計時）、角色表情動作（Emotes）；新增追蹤標籤（Tracking Tag，可作信標或延長死亡後黑盒訊號）；新增 2 位可玩角色及更多潛水衣配色；HUD 圖示動態縮放（靠近目標放大）與食譜鎖定介面優化；基地建造工具新增無法施工提示。開發商同步預告 Update 2.0 將帶來全新載具、新探索區域與「收藏者利維坦」遭遇事件。"
    },
    {
      date: "2026-08-22",
      gameId: "farfarwest",
      title: "《Far Far West》EA 首個重大更新「Frostburn」將於 8/27 上線",
      body: "Evil Raptor 宣布《Far Far West》首個重大更新「Frostburn」將於 2026 年 8 月 27 日正式上線，為 4 月 28 日搶先體驗上市以來規模最大的一次更新。「Frostburn（冰霜燃燒）」更名預示新環境或新機制的加入，詳細內容開發商尚未完整公開，更新後 Steam 評價與玩家迴響值得關注。"
    },
    {
      date: "2026-08-15",
      gameId: "slaythespire2",
      title: "《殺戮尖塔 2》宣布下一大目標：第六位角色與 Act 2 替代生態區",
      body: "Mega Crit 於 8 月 14 日電子報公告：在連續五個月的雙週 Beta Patch 節奏後，開發重心正式轉向兩大「玩家期待已久的大型內容」——第六位可玩角色（Sixth Character）與 Act 2 替代生態區（Alternate Act 2 Biome）。更新間隔將明顯拉長，8 月 27 日不推送更新（Mega Crit 年度團隊假期），下一次更新預計至少需等候一個月以上。"
    },
    {
      date: "2026-08-21",
      gameId: "",
      title: "「新品推薦」輪替：以《Sephiria》取代《Shape of Dreams》，多人RogueLike 類補入壓倒性好評動作 Roguelite",
      body: "多人RogueLike 推薦輪替：《Shape of Dreams》（2025 年 9 月 11 日上市，已逾 11 個月）移出；補入 2026 年 7 月 31 日 1.0 正式上線的《Sephiria》（TEAM HORAY 開發，即《Dungreed》主創；俯視角動作 Roguelite，1~4 人線上合作，6 種武器各有 50+ 升級路線、60+ 種敵人與 10+ 個 Boss，上線峰值逾 24,000 人同時在線；壓倒性好評 97%（英語 2,149 則）/ 整體特別好評（全語言約 5,900+ 則））。"
    },
    {
      date: "2026-08-20",
      gameId: "",
      title: "「新品推薦」新增《Shape of Dreams》，多人RogueLike 類再添韓國頂評合作 Roguelite",
      body: "多人RogueLike 推薦新增《Shape of Dreams》：由韓國獨立工作室 Lizard Smoothie 開發、NEOWIZ 發行的動作 Roguelite，2025 年 9 月 11 日正式上市。融合 MOBA 概念與割草 Roguelite 玩法，8 位個性鮮明的「旅行者」各有截然不同的戰鬥風格，150+ 個「記憶」組合讓每次通關 Build 幾乎不重複；最多 4 人線上合作共闖夢境異界。上線即吸引逾 45,000 名玩家、首週累積 4,000+ 好評，Steam 長期維持 94% 特別好評（17,000+ 則），是 2025~2026 年合作 Roguelite 類中評分最穩定的作品之一。"
    },
    {
      date: "2026-08-18",
      gameId: "guildrun",
      title: "《Guildrun》Demo Patch 0.5.5 推送：第五次週更平衡更新",
      body: "Leyline 依循每週更新節奏，於 8 月 18 日推出試玩版第五次平衡更新 Patch 0.5.5，進行英雄數值、技能、道具與遺物等調整；詳細內容見 Steam 官方公告。自 7/16 Demo 上線以來，開發商已連續五週不間斷推送週更 Patch，Steam 試玩版持續維持特別好評水準。"
    },
    {
      date: "2026-08-19",
      gameId: "",
      title: "「新品推薦」新增《Far Far West》與《StarRupture》兩款好評新作",
      body: "多人RogueLike 推薦新增《Far Far West》：由 Evil Raptor 開發、Fireshine Games 發行的西部奇幻合作 Roguelite FPS，2026 年 4 月 28 日搶先體驗，1~4 人隊伍深入程序生成荒野接取賞金任務，玩法融合《深岩銀河》風格，上線即獲壓倒性好評 96%（35,000+ 則），銷量突破 50 萬份。多人生存推薦新增《StarRupture》：開放世界科幻生存兼工廠建造，2026 年 1 月 6 日搶先體驗，最多 4 人合作探索行星並建立自動化產線，上線首日峰值 28,000 同時在線，Steam 特別好評 81%（13,000+ 則）。"
    },
    {
      date: "2026-08-14",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》亮相 BIC Festival 2026，官方 Gameplay Trailer 同期釋出",
      body: "《地城拓荒（Dungeon Settlers）》參加韓國 BIC Festival 2026（線上展覽 8/7~8/28，實體展覽 8/14~8/16 於釜山 BEXCO）；InvenGlobal 於 8/14 發布試玩預覽文章，高度肯定其硬核策略深度，形容「從第一印象就散發出硬核深潛的氣息」。官方 Gameplay Trailer 同期釋出於 YouTube，進一步展示殖民地建造與地城探索玩法。EA 正式上市（9 月 4 日 UTC 08:00）進入最後倒數兩週。"
    },
    {
      date: "2026-08-17",
      gameId: "",
      title: "「新品推薦」新增《Windrose》，多人生存類迎來海盜合作生存建造新秀",
      body: "多人生存推薦新增《Windrose》：由《Palworld》發行商 Pocketpair 發行，2026 年 4 月 14 日登陸 Steam 搶先體驗。最多 8 人合作出海（官方建議 4 人以內效能最佳），一人掌舵、一人操炮、一人接舷突擊，陸地可建造基地與採集資源；嚴格線上合作、無 PvP。EA 首日同時在線突破 69,000 人、銷量逾 50 萬份，Steam 好評率 88%（特別好評，27,000+ 則），持續更新擴充內容。"
    },
    {
      date: "2026-08-13",
      gameId: "slaythespire2",
      title: "《殺戮尖塔 2》Beta v0.111.0 推送：Expect a Fight／Hyperbeam 改版、印尼語本地化",
      body: "Mega Crit 於 8 月 13 日推送 Beta v0.111.0：改版「Expect a Fight」（費 3 技能，獲得 15(16) 格擋＋每點 Strength 額外 5(8) 格擋，取代舊版消耗型攻擊手牌換費效果）；「Hyperbeam」傷害調整為對全體敵人 24(30)（舊版 30/38），且集中力損失改為僅當回合有效；大量英雄 / 道具平衡調整與 UX / 效能改善；正式加入印尼語本地化；新增部分卡牌圖稿與所有角色低血量待機動畫。開發組同步公告：8 月 27 日不推送更新（團隊休假），且後續更新間隔可能拉長，因工作重心已轉至「大型期待新內容」（具體內容未透露）。"
    },
    {
      date: "2026-08-07",
      gameId: "themound",
      title: "《The Mound》Patch 1.03 上線：Quickmatch 快速媒合、地區篩選器與傳送脫困功能",
      body: "ACE Team 於 8 月 7 日推出 Patch 1.03「Quality of Life Hotfixes」，為全平台推送以下改善：新增 Quickmatch 快速媒合功能（一鍵加入對局，無需手動瀏覽伺服器清單）、伺服器地區與語言篩選器、遊戲內語音聊天品質改善、效能優化，以及卡入地形時可自行傳送脫困的功能。跨平台直接邀請功能修復時程仍未公布，密碼保護伺服器搜尋仍為官方暫行對策。"
    },
    {
      date: "2026-08-14",
      gameId: "",
      title: "「新品推薦」輪替：以《Grain Rot》取代《Abyssus》，多人RogueLike類補入新上市好評之作",
      body: "多人RogueLike 推薦輪替：《Abyssus》（2025 年 8 月上市，已逾 12 個月）移出；補入 2026 年 8 月 7 日正式上線的《Grain Rot》（最多 4 人合作取材恐怖 Roguelite，首週即獲 89% 特別好評、994 則評論；試玩版曾在 Steam Next Fest 衝進前 15 名並累積逾 35 萬次下載）。另：《深海迷航 2》Update 1.2（合作導向）持續開發中，預計 9 月前後推出，將帶來近距語音聊天、玩家物品交易與死亡復活機制。"
    },
    {
      date: "2026-08-13",
      gameId: "",
      title: "「新品推薦」新增 3 款好評多人新作",
      body: "新品推薦頁擴充：多人生存新增《Scrap Mechanic》（7/25 推出 1.0，特別好評）與《Funnel Runners》（7/16 上線，最多 8 人合作、87% 特別好評）；多人 RogueLike 新增《Abyssus》（1~4 人合作 roguelite FPS，特別好評，2026 夏季 v1.3 加入跨平台）。"
    },
    {
      date: "2026-08-11",
      gameId: "guildrun",
      title: "《Guildrun》Demo Patch 0.5.4 推送：英雄數值加強、戒指類道具全面提升",
      body: "Leyline 於 8 月 11 日推出試玩版第四次平衡更新 Patch 0.5.4：英雄數值調整（Rowan 最大魔力升至 115、Skorn 最大血量升至 950、Kai 防禦升至 41）；多項技能護盾倍率、傷害輸出與狀態效果重平衡；道具大幅強化（Toxic Ring 暴擊 7→15、Freezing Ring 魔力 12→25，戒指類全面提升）；遺物更新含 Shield Investment Filigree 移除觸發間隔限制。Steam 試玩版持續維持每週更新節奏，好評率仍在特別好評水準。"
    },
    {
      date: "2026-08-07",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》EA 上市日期由 9/10 提前至 9/4，比原計劃提早一週",
      body: "CanOpener 於 8 月 7 日宣布《地城拓荒（Dungeon Settlers）》搶先體驗版上市日期由原訂 9 月 10 日提前至 9 月 4 日（UTC 08:00）；開發商表示進度超前預期、對提前與玩家見面感到雀躍。EA 版仍將包含區域 1~2 與「深淵」挑戰內容，同步新增巴西葡萄牙語支援。"
    },
    {
      date: "2026-08-07",
      gameId: "tearsofmetal",
      title: "《Tears of Metal》預告下一位同伴「Aodh, The Vigil」，測試修改合作復活耗費",
      body: "Paper Cult 於 8 月 7 日釋出開發預告：下一位即將加入的同伴（Companion）名為「Aodh, The Vigil」；同時宣布正在測試將合作復活的費用由消耗 Coin 改為消耗 HP，以調整多人合作平衡；另提及大廳改善功能正在開發中。上述功能均尚未確認上線版本號與時程，目前最新版本仍為 8/9 熱修復（v0.11.57874.1）。"
    },
    {
      date: "2026-08-08",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》Steam 願望清單突破 20 萬",
      body: "開發商 CanOpener 於 8 月 8 日宣布《地城拓荒（Dungeon Settlers）》Steam 願望清單正式突破 20 萬人里程碑，感謝社群的支持與期待。距 9 月 4 日（UTC 08:00）搶先體驗上市（比原訂 9/10 提前一週）還有不到一個月，開發商表示這個里程碑代表著玩家每一個人的支持，讓這款遊戲得以實現。"
    },
    {
      date: "2026-08-09",
      gameId: "tearsofmetal",
      title: "《Tears of Metal》8/9 熱修復：修正滑鼠卡頓問題，下版本預告新同伴與復活機制",
      body: "Paper Cult 於 8 月 9 日推出熱修復，解決部分玩家在遊玩時遭遇的滑鼠卡頓（Mouse Stutter）問題；Windows Store / Xbox Game Pass 版本因需通過平台認證程序，補丁可能延遲一天到達。開發商同步預告下一版本較大更新將加入全新同伴（Companion）系統、同伴死亡後可復活機制（Revive with HP）等多項新功能，目前仍在積極開發打磨中。"
    },
    {
      date: "2026-08-04",
      gameId: "guildrun",
      title: "《Guildrun》Demo Patch 0.5.3 推送：英雄平衡調整，試玩版評論達 1,500+ 則",
      body: "Leyline 於 8 月 4 日推出試玩版第三次平衡更新 Patch 0.5.3：英雄大幅調整（Hoyoung/Fiona 魔力消耗下調、Karsu 攻擊力增強、Sal 攻速降低）；Killshot 傷害係數 2.5→3.0、Petrification 每層毒素傷害翻倍；Rogue's Cowl 完整改版；截至此時 Steam 試玩版評論已突破 1,500 則，好評率維持 95%（特別好評）。同日 Kotaku 刊載特集報導「Guildrun's Free Demo Is Good Enough To Take On Slay The Spire」，GameDiscover.co 統計 10 天內逾 30 萬名試玩玩家。"
    },
    {
      date: "2026-08-03",
      gameId: "neverwither",
      title: "《不朽之樹》ChinaJoy 2026 期間開放新一輪週末試玩申請",
      body: "Geo Seed Games 於 ChinaJoy 2026 Steam 展示（7/31~8/3）期間透過 Steam 發布公告「現可申請測試！亮相2026東方遊戲文化週」，宣布開放新一輪週末試玩（Weekend Playtest）申請。開發商同步表示距首輪技術測試（5/30~6/2）已約兩個月，團隊持續開發新內容並準備下一個試玩版本，具體測試時程待後續公告。"
    },
    {
      date: "2026-08-01",
      gameId: "tearsofmetal",
      title: "《Tears of Metal》Patch 0.11.57863：大幅平衡調整與經濟系統重塑",
      body: "Paper Cult 於 8 月 1 日推出 Patch 0.11.57863（同步發布「Last Week-end of 10% Launch Discount, Big Balancing Patch & What's to Come!」公告）：進行大幅平衡調整、經濟系統重塑與魅力（Charm）重新分類，並修復多項 Bug；同時公布後續優先開發方向，包含同伴復活機制修訂、中途存檔完善、效能優化與連線改善。跨平台（Crossplay）功能仍停用於主分支，可切換 Steam「Crossplay」Beta 分支維持跨平台連線。Steam 整體好評率目前約 85%（特別好評，1,786 則）。"
    },
    {
      date: "2026-07-30",
      gameId: "neverwither",
      title: "《不朽之樹》加入 ChinaJoy 2026 Steam 展示",
      body: "Geo Seed Games 於 7 月 30 日在 Steam 社群發布公告，宣布《不朽之樹》參加 ChinaJoy 2026 Steam 展示（7/31~8/3），邀請玩家加入願望清單；遊戲 Steam 頁同步標記為展出作品。遊戲正式上市日期與次輪測試時程仍未公布。"
    },
    {
      date: "2026-07-29",
      gameId: "themound",
      title: "《The Mound》Patch 1.02 上線：新增格擋機制，「Lost Explorers' Swords Pack」免費期結束",
      body: "ACE Team 推出 Patch 1.02「Block Ability & Hotfixes」：為全角色新增格擋 / 擋反機制（預設鍵盤 Q、手把 RB/R1，持續按壓消耗耐力），大幅調整近戰戰鬥節奏；同步修復多項問題。「Lost Explorers' Swords Pack」免費領取期限亦已於 7/29 到期（售價回復 $4.99）。跨平台直接邀請功能仍未正式修復，密碼保護伺服器搜尋仍為官方暫行對策。"
    },
    {
      date: "2026-08-01",
      gameId: "neverwither",
      title: "《不朽之樹》生物命名結果揭曉：「岩脊地龍」與「青翎劍梟」正式定名",
      body: "Geo Seed Games「Name Me」生物命名活動公示期（7/30~8/1）已結束：鑽地礦工型生物最終命名為「岩脊地龍（Stone Ridge Earth Dragon）」，羽翼劍客型生物最終命名為「青翎劍梟（Green Feather Sword Owl）」。入選命名玩家的名字將永久載入遊戲圖鑑，遊戲正式上市日期仍為待定（TBA），開發商尚未公布次輪測試時程。"
    },
    {
      date: "2026-07-31",
      gameId: "slaythespire2",
      title: "《殺戮尖塔 2》Beta v0.110.0 推送：Mirage/Pillar 效果回滾，新增鍵盤純操作模式",
      body: "Mega Crit 於 7 月 31 日推送 Beta v0.110.0：將 Mirage 恢復為毒素倍增機制（不再棄置）、將 Pillar of Creation 恢復至無限觸發效果（格擋由 3 降至 2）；新增鍵盤純操作模式（Keyboard-Only Mode）、角色專屬形態 VFX 動畫、地圖截圖分享功能；Haze 改版為費 2 技能對全敵施加毒素與弱化，Outbreak 升格為稀有技能；Well-Laid Plans 費用由 1 升至 2；共修復 20+ 個 Bug，含多人遊戲軟鎖問題。"
    },
    {
      date: "2026-07-31",
      gameId: "tearsofmetal",
      title: "《Tears of Metal》Patch 0.10.57598：材質解析度優化，Act 1 & 2 效能與穩定性改善",
      body: "Paper Cult 於 7 月 31 日推出 Patch 0.10.57598：針對材質解析度（texture resolution）進行優化，並改善第一幕（Act 1）與第二幕（Act 2）的運行效能與穩定性；跨平台（Crossplay）功能仍暫停於預設分支，可切換「Crossplay」Beta 分支維持舊版相容性。"
    },
    {
      date: "2026-07-31",
      gameId: "guildrun",
      title: "《Guildrun》Demo 好評率升至 95%，完整版確認加入雙人合作",
      body: "《Guildrun》Steam 試玩版評分從上架時的 92% 穩步升至 95%（特別好評，1,200+ 則），峰值同時上線達約 12,000 人，兩週累積逾 20 萬玩家完成約 200 萬次通關。開發商官方確認完整版（2027 年）將加入雙人合作（Two-Player Co-op）模式，試玩版進度亦預計可移轉至正式版（官方 FAQ 確認）。"
    },
    {
      date: "2026-07-31",
      gameId: "slaythespire2",
      title: "《殺戮尖塔 2》v0.109.0 與 v0.109.1 正式推送至穩定主分支",
      body: "Mega Crit 確認將 v0.109.0（調降 Aeonglass 傷害、重作 Pillar of Creation、新增兩個 Neow 開局遺物）與 v0.109.1（修復繁體中文複數判斷邏輯）從 Beta 分支正式推送至穩定主分支；未切換 Beta 的玩家現已自動收到此兩版更新。Steam 整體評論（含中文評論轟炸）好評率目前約 56~60%，但近 30 天評論已回升至 62% 並持續改善中；Metacritic 媒體評分仍維持 90。"
    },
    {
      date: "2026-07-30",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》第 3 次 Supporters Program 封測落幕，參與者收到回饋問卷",
      body: "CanOpener 第 3 次 Supporters Program 封測（7/23~7/29）已正式結束。開發商向所有測試參與者致謝，並發出問卷蒐集回饋意見；問卷填答者可選擇將自己的名字列入遊戲片尾字幕「3rd Supporter」。開發商提醒：封測存檔與 9/10 搶先體驗版不相容。EA 上市日期維持 2026 年 9 月 10 日。"
    },
    {
      date: "2026-07-30",
      gameId: "neverwither",
      title: "《不朽之樹》生物命名投票截止，結果預計今日起至 8/1 公布",
      body: "Geo Seed Games「Name Me」生物命名活動投票階段已於 7 月 29 日結束，玩家完成了對鑽地礦工型與羽翼劍客型兩種新生物最終名稱的投票。開發商預告結果將於 7/30~8/1 公布，獲選命名的玩家名字將永久記錄於遊戲圖鑑，實際公告尚待開發商官方發布。"
    },
    {
      date: "2026-07-29",
      gameId: "tearsofmetal",
      title: "《Tears of Metal》Patch 0.9.57408 上線：城堡記錄優化、沼澤與白樺樹關卡更新",
      body: "Paper Cult 推出 Patch 0.9.57408，涵蓋城堡記錄（Castle Records）介面優化、存檔復原系統改善，以及沼澤生物群落（Swamp biome）與白樺樹地區（Birchtrees area）關卡內容更新；跨平台（Crossplay）功能仍暫時停用，可切換「Crossplay」Beta 分支維持舊版跨平台連線能力。"
    },
    {
      date: "2026-07-28",
      gameId: "guildrun",
      title: "《Guildrun》Demo 第二次平衡更新 Patch 0.5.2：Boss 代幣加倍、排行榜重置",
      body: "Leyline 推出試玩版第二次平衡更新 Patch 0.5.2：Boss 代幣每場由 1 個增至 2 個（加快遺物獲取節奏）、新增事件圖片與視覺優化、多項英雄專精調整（Aria、Sal、Irini、Kai、Gustav 等），以及物品縮放與急救回退（Emergency Rewind）等 Bug 修復；同步重置排行榜（全球分數清零）。"
    },
    {
      date: "2026-07-27",
      gameId: "tearsofmetal",
      title: "《Tears of Metal》EA 上線五日銷量突破 10 萬份",
      body: "Paper Cult 宣布《Tears of Metal》搶先體驗版發售約五天內累積銷量突破 10 萬份，感謝社群熱情支持。開發商說明目前優先事項為持續修復多人去同步（Desync）問題與完善中途存檔；大量同人創作與實況主內容持續湧入，社群活躍度高。Steam 評價已升至約 87%（特別好評）。"
    },
    {
      date: "2026-07-23",
      gameId: "guildrun",
      title: "《Guildrun》Demo 首次平衡更新 Patch 0.5.1.718：擴充可行策略，試玩人數破 20 萬",
      body: "Leyline 推出試玩版首次平衡更新 Patch 0.5.1.718，針對社群回饋大幅擴充可行策略並加入多項 QoL 操作優化；截至上線一週（7/23）試玩人數已突破 20 萬。傳奇探索遺物（Legendary Quest Relics）商店費用由 30 降至 25，為遊戲體驗重大改善。"
    },
    {
      date: "2026-07-28",
      gameId: "guildrun",
      title: "《Guildrun》官方 FAQ 確認正式版目標年份為 2027，並非 2026",
      body: "Leyline 官方 Steam FAQ 說明，《Guildrun》完整版（1.0）目標上市年份為 2027，尚無精確月份或日期；部分早期媒體報導提及「2026 年下半」為舊資訊。試玩版（免費，7/16 上架，已獲特別好評 92%）持續開放，並保持每週更新節奏。"
    },
    {
      date: "2026-07-27",
      gameId: "guildrun",
      title: "新增追蹤：《Guildrun》PvE 自動戰鬥 roguelike，試玩版特別好評",
      body: "由 Leyline 開發的 roguelike 自動戰鬥新作《Guildrun》加入追蹤清單。7/16 上架的 Steam 免費試玩版獲特別好評 92%（1,000+ 則）；玩法主打組建英雄隊伍、闖裂隙、以特性與遺物強化 build。主創具《爐石戰記》《The Bazaar》資歷，正式版預計 2026 年稍晚推出、官方尚未定檔。"
    },
    {
      date: "2026-07-25",
      gameId: "slaythespire2",
      title: "《殺戮尖塔 2》Beta 熱修復 v0.109.1：修正繁體中文複數判斷錯誤",
      body: "Mega Crit 於 7 月 25 日推出 Beta 熱修復 v0.109.1，專門修正繁體中文翻譯的複數評估邏輯錯誤（broken plural evaluation in Traditional Chinese），為小型針對性修補，無其他內容或平衡變動。此前 v0.109.0（7/17）已大幅調整 Aeonglass 傷害並新增兩個 Neow 開局遺物。"
    },
    {
      date: "2026-07-26",
      gameId: "tearsofmetal",
      title: "《Tears of Metal》Patch 0.8.57278：新增中途存檔、修復多人去同步，跨平台暫時停用",
      body: "Paper Cult 於 7 月 26 日推出 Patch 0.8.57278：修復多人連線去同步（Desync）問題、新增中途存檔（Mid-run Saves）功能、新增 Banshee 解鎖路徑（Ruadh 角色）、調整 Wallace 武器費用（Flamberge 9→3 Dragonstones，Celtic Longsword 改 500 Triskelle 購買）、Boss 破格攻擊現可格擋；同時暫時停用預設分支上的跨平台功能（Crossplay）待修復後恢復。Steam 評論累積至 919+ 則，好評率 85%。"
    },
    {
      date: "2026-07-14",
      gameId: "subnautica2",
      title: "《深海迷航 2》1.1 Hotfix 4 修復 Angel Combs 進度阻擋問題",
      body: "Unknown Worlds 於 7 月 14 日推出 1.1 Hotfix 4：修復部分玩家 Angel Combs 無法開啟的進度阻擋問題、修正玩家基地內出現水流的視覺 bug，並修復 Xbox 平台 FOV 滑桿不顯示及接受邀請崩潰等問題。Update 1.2（合作導向，含近距語音聊天、玩家物品交易、死亡復活系統等）仍在開發中，尚無確切發布日期。"
    },
    {
      date: "2026-07-21",
      gameId: "themound",
      title: "《The Mound》Patch 1.01 正式推送：Crossplay Friend Finder 與平衡調整",
      body: "ACE Team 於 7 月 21 日將 Patch 1.01 推送至穩定主分支，涵蓋後啟動熱修復（Post Launch Hotfixes）、整體平衡調整，及全新「Crossplay Friend Finder」功能（可在伺服器清單輸入好友名稱搜尋，部分緩解跨平台直接邀請異常問題）；另新增進場相機預選畫面（Cinematic / Default）、木筏互動時可用滑鼠整理背包，共 17 項相容性與效能修正。跨平台直接邀請功能的完整修復仍無確切時程。"
    },
    {
      date: "2026-07-23",
      gameId: "tearsofmetal",
      title: "《Tears of Metal》EA 評論持續累積：Steam 特別好評 92%（300+ 則），登上 Steam 新遊戲 Top 10",
      body: "《Tears of Metal》搶先體驗版於 2026 年 7 月 22 日上線後，Steam 評論快速累積至 300+ 則，好評率約 92%（特別好評），並登上 Steam 新遊戲銷售 Top 10。多家媒體評測肯定其 musou 式割草結合 Roguelike 輪迴的流暢設計與手繪漫畫風美術，部分玩家反映初期難度偏高與治療資源稀缺。EA 版包含 3 幕關卡、3 位可玩英雄與村莊升級系統，Xbox Game Pass（PC）同步可遊玩。"
    },
    {
      date: "2026-07-22",
      gameId: "tearsofmetal",
      title: "《Tears of Metal》搶先體驗今日正式上線，Xbox Game Pass 同步加入",
      body: "Paper Cult 的割草 Roguelike《Tears of Metal》已於台灣時間 2026年7月22日 23:00（UTC 15:00）在 Steam 與 Microsoft Store 以搶先體驗形式正式上線，定價 $24.99（上市首兩週享 10% 折扣）。EA 版包含 3 幕關卡、3 位可玩英雄與村莊升級系統，支援最多 4 人線上合作；Xbox Game Pass（PC）同步加入，Xbox 主機版預計 2026 年內推出；Steam 用戶評論仍在累積中（試玩版曾獲壓倒性好評 96%，逾 977 則）。"
    },
    {
      date: "2026-07-22",
      gameId: "neverwither",
      title: "《不朽之樹》生物命名活動進入社群投票階段（7/23~7/29）",
      body: "Geo Seed Games 的生物命名活動「Name Me」完成徵名後，7月23日起正式進入社群投票階段（投票至 7/29）：玩家為鑽地礦工型（挖掘突襲特性）與羽翼劍客型（結合飛行與劍術）兩種即將登場的新生物各票選最終名稱，結果預計 7/30~8/1 公布；入選命名者的玩家名字將永久載入遊戲圖鑑。"
    },
    {
      date: "2026-07-22",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》第 3 次 Supporters Program 封測明日開跑（7/23~7/29）",
      body: "CanOpener 的第 3 次 Supporters Program 封測將於台灣時間 7月23日 23:00（UTC 15:00）正式開放，測試至 7/29。開放內容包含 Region 1~2、新種族 Lycan（狼族）、新武器長槍（Spear）及全新特性與道具，難度平衡亦已調整；已於 Steam 頁申請資格者等待隨機抽選通知，封測存檔不保證相容於 9/10 EA 版。"
    },
    {
      date: "2026-07-21",
      gameId: "themound",
      title: "《The Mound》實體光碟版確認 8/6 發售，Steam Beta Branch 效能優化 Patch 上線",
      body: "Nacon 確認《The Mound: Omen of Cthulhu》PS5 / Xbox Series X|S 盒裝實體光碟版將於 2026 年 8 月 6 日正式上架（數位版已於 7/15 發售）。ACE Team 透過 Steam Beta Branch 推出效能優化 Patch，針對嚴重卡頓與資源串流瓶頸進行修正，受影響區域幀率最高可提升約 25%；跨平台直接邀請功能異常問題仍在修復中，無確切時程。"
    },
    {
      date: "2026-07-17",
      gameId: "slaythespire2",
      title: "《殺戮尖塔 2》7 月中旬再遭評論轟炸，整體好評率跌至約 66%",
      body: "7 月中旬，《殺戮尖塔 2》再度遭大規模評論轟炸，12 小時內湧入主要來自中國的 3,609 則負評，起因為玩家抗議移除無限連擊組合及難度調整。繼 4 月首波轟炸後，Steam 整體好評率已降至約 66%（褒貶不一）；Steam 持續以評論轟炸偵測機制標記排除，Metacritic 早期體驗評分仍維持 90。7 月電子報同時確認遊戲加入繁體中文翻譯，並引入兩款新 Neow 遺物。"
    },
    {
      date: "2026-07-20",
      gameId: "tearsofmetal",
      title: "《Tears of Metal》確認 7 月 22 日搶先體驗如期上線，同步登陸 Xbox Game Pass",
      body: "Paper Cult 確認《Tears of Metal》將於 2026 年 7 月 22 日在 Steam 與 Microsoft Store 同步以搶先體驗形式上線，定價 $24.99（上市首兩週享 10% 折扣）。遊戲同步加入 Xbox Game Pass（PC 版），Xbox 主機版預計 2026 年內推出；EA 期間預計持續 4~12 個月，包含 3 幕關卡、3 位可玩英雄與村莊升級系統，後續將持續擴充英雄、徽章及夥伴內容。"
    },
    {
      date: "2026-07-17",
      gameId: "themound",
      title: "《The Mound》Week-One Patch 新增密碼保護伺服器，Steam 用戶評測 65%（褒貶不一）",
      body: "ACE Team 推出 Week-One Patch，加入密碼保護伺服器（Password-Protected Servers）功能，讓不同平台玩家可建立私人房間繞開跨平台直接邀請異常問題（正式修復更新日期仍未定）。截至目前 Steam 累積 1,126 則用戶評論，整體好評率 65%（褒貶不一），批評集中於戰鬥移動感偏重、武器耐久消耗快及無跳躍設計；合作深度與恐怖氛圍仍廣受肯定。"
    },
    {
      date: "2026-07-16",
      gameId: "themound",
      title: "《The Mound》確認跨平台直接邀請異常，Push-to-Talk 與計時器移除同步上線",
      body: "ACE Team 確認上市首日已知問題：跨平台直接邀請（Cross-play Invite）功能異常，目前官方暫行對策為由房主開房後，讓其他平台玩家透過線上伺服器清單搜尋加入，修復更新日期尚未公布。首日 Patch 另同步加入推撥語音通話（Push-to-Talk）以及移除強制任務結束計時器，隊伍現在可自行選擇撤離時機或繼續留守搜刮。"
    },
    {
      date: "2026-07-17",
      gameId: "themound",
      title: "《The Mound》公布上市後更新路線圖：秋季新環境、冬季新角色職能",
      body: "ACE Team 宣布《The Mound: Omen of Cthulhu》上市後的長期更新計劃：Q3 2026 聚焦 UE5 效能優化與理智崩潰事件擴充；秋季版本預計加入沼澤地形、大型廢墟等新環境及守點、心理攻擊生存等多樣任務類型；冬季版本將引入 Sanity Anchor（穩定隊友理智）與 Vanguard Scout（機動偵察）兩種專精角色職能及歷史武器客製化系統，並規劃跨平台全球社群里程碑活動。"
    },
    {
      date: "2026-07-16",
      gameId: "themound",
      title: "《The Mound》媒體評測出爐：Metacritic 69 / OpenCritic 72，首日 Patch 已上線",
      body: "《The Mound: Omen of Cthulhu》上市後媒體評測陸續出爐，Metacritic 約 69 分、OpenCritic 72 分（14 篇，Fair 評級），整體反應褒貶不一。多數評測肯定理智崩潰（Madness）機制與 4 人合作深度，惟指出難度平衡與火槍手感仍需打磨。開發商同日推出首日 Patch，新增武器升級鑄造台（Weapon Upgrade Anvil）、木筏手記手繪插圖及戰鬥教學圖鑑頁，並調整高階任務難度。"
    },
    {
      date: "2026-07-15",
      gameId: "themound",
      title: "《The Mound: Omen of Cthulhu》正式上市，全員享 20% 首發折扣",
      body: "《The Mound: Omen of Cthulhu》已於台灣時間 2026年7月15日 16:00 在 PC（Steam / Epic Games Store）、PS5 與 Xbox Series 全平台同步解鎖。由於 Steam 願望清單於 7月13日提前突破第三里程碑 80 萬，全體玩家首發折扣從 15% 升至 20%（標準版 $29.99 → 約 $23.99，豪華版 $39.99 → 約 $31.99）。裝飾武器包「Lost Explorers' Swords Pack」於上市首兩週免費開放領取（需至 Steam 商店頁手動領取）。"
    },
    {
      date: "2026-07-13",
      gameId: "themound",
      title: "《The Mound》發布上市前最終公告「Are You Ready, Explorers?」，距解鎖倒數 2 天",
      body: "Nacon 在 Steam 社群發布《The Mound: Omen of Cthulhu》上市前最終公告「Are You Ready, Explorers?」，確認 7 月 15 日如期在 PC（Steam / Epic Games Store）、PS5 與 Xbox Series 全平台同步解鎖。Steam 願望清單於同日（7月13日）正式突破第三里程碑 80 萬，首發折扣確認從 15% 升至 20%（標準版 $29.99 → 約 $23.99）；試玩版持續對外開放中。"
    },
    {
      date: "2026-07-07",
      gameId: "themound",
      title: "《The Mound》發布上市前新預告，聚焦島嶼危機與理智崩潰機制",
      body: "Nacon 釋出《The Mound: Omen of Cthulhu》最新預告片，集中展示叢林島嶼的各種威脅與令玩家隊友相互為敵的理智崩潰（Madness）機制，為 7 月 15 日正式上市造勢。此前 7 月 9 日正式上市版將支援 NVIDIA DLSS 4.5 亦已確認。"
    },
    {
      date: "2026-07-09",
      gameId: "neverwither",
      title: "《不朽之樹》開發日誌 #4：第二區域「狂風高地」首度公開",
      body: "Geo Seed Games 發布《不朽之樹》第四篇開發日誌，揭露第二個可探索區域「狂風高地（Windhowl Plateau）」——峭壁與荒原交錯的惡劣地形，並介紹三種全新戰鬥型生物：鋼臂養蜂人（Steel-arm Beekeepers）、迴旋鼬（Boomerang Weasels）與岩石騎士（Rock Knights）。正式上市日期仍未定。"
    },
    {
      date: "2026-07-08",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》宣布第 3 次 Supporters Program 封測，7/23~7/29 限量開放",
      body: "開發商 CanOpener 宣布將於 2026 年 7 月 23 日至 29 日舉辦第 3 次 Supporters Program 封測，內容包含 Region 1~2、新種族 Lycan（狼族）、新武器長槍（Spear）及全新特性 / 道具 / 效果；難度平衡亦經過調整。資格採 Steam 頁申請、限量隨機抽選；封測存檔不保證相容於 9/10 EA 正式版。EA 上市日期仍維持 2026 年 9 月 10 日。"
    },
    {
      date: "2026-07-06",
      gameId: "neverwither",
      title: "《不朽之樹》發起生物命名活動，社群為兩種新生物命名",
      body: "Geo Seed Games 啟動「Name Me」生物命名活動，邀請玩家為即將亮相的兩種新生物提案並投票命名（徵集期 7/6~7/19，社群投票 7/23~7/29）；入選玩家名字將永久記錄於遊戲圖鑑。活動顯示開發商正積極推進新區域生物設計。"
    },
    {
      date: "2026-07-09",
      gameId: "themound",
      title: "《The Mound》Steam 願望清單突破 70 萬，衝刺 80 萬里程碑倒數 5 天",
      body: "《The Mound: Omen of Cthulhu》Steam 願望清單截至 7 月 7 日已突破 70 萬人，正朝第三階段里程碑「80 萬人」最後衝刺。若 7 月 15 日上市前達標，首發折扣將從已解鎖的 15% 再提升至 20%（標準版 $29.99 → 約 $23.99）。目前距正式上市僅剩 5 天，試玩版仍持續對外開放中。"
    },
    {
      date: "2026-07-07",
      gameId: "themound",
      title: "《The Mound》衝刺新願望清單里程碑：達標可將首發折扣從 15% 提升至 20%",
      body: "Nacon 確認，若社群在 7 月 15 日上市前達成第三階段願望清單里程碑，所有玩家首發折扣將從已解鎖的 15% 再提升至 20%（標準版 $29.99 → 約 $23.99）。折扣適用於標準版與豪華版兩個版本。距上市僅剩 8 天，官方同步發出倒數公告：「On July 15th, the gates to the cursed jungle swing wide open.」"
    },
    {
      date: "2026-07-06",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》試玩版評論增至 304 則，好評率回升至 94%",
      body: "《地城拓荒 (Dungeon Settlers)》Steam 免費試玩版評論數已增至 304 則，整體好評率從 93% 回升至 94%（極度好評）。EA 版本仍確定於 2026 年 9 月 10 日上線；開發商表示搶先體驗完成後（預計約 2 年）將在正式版推出時提高售價。"
    },
    {
      date: "2026-07-05",
      gameId: "themound",
      title: "《The Mound》上市倒數 10 天：「Lost Explorers' Swords Pack」首兩週限免、Temple of Yig DLC 細節公布",
      body: "Nacon 確認《The Mound: Omen of Cthulhu》7月15日正式上市後，裝飾武器包「Lost Explorers' Swords Pack」將於上市首兩週向全體玩家免費開放（需至 Steam 商店頁手動領取，不自動發放）。豪華版獨家「Temple of Yig」任務已確認只需由隊伍主機擁有，全隊即可免費同享。試玩版則宣布無限期持續開放。"
    },
    {
      date: "2026-07-03",
      gameId: "themound",
      title: "《The Mound》確認同步登陸 Epic Games Store，主機版預購享 10% 折扣",
      body: "Nacon 確認《The Mound: Omen of Cthulhu》7 月 15 日上市時將同步登陸 Steam 與 Epic Games Store，PC 玩家兩大平台均可購買。主機版（PS5 / Xbox Series X|S）預購玩家可享 10% 折扣；Steam 版則維持上市首日 15% 折扣（標準版 $29.99 → 約 $25.49）。距正式上市僅剩 12 天。"
    },
    {
      date: "2026-07-02",
      gameId: "themound",
      title: "《The Mound》上市倒數 13 天，確認台灣時間 7月15日 16:00 解鎖",
      body: "官方確認《The Mound: Omen of Cthulhu》將於台灣時間 2026年7月15日下午4時（PDT 01:00）同步在 PC / PS5 / Xbox Series 解鎖。首發 15% 折扣（標準版 $29.99 → 約 $25.49）已確定，豪華版 $39.99 除武器外觀包外還含 2 位額外角色與獨家叢林合約關卡。"
    },
    {
      date: "2026-06-29",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》試玩版評論數成長至 283 則，整體好評率 93%",
      body: "《地城拓荒 (Dungeon Settlers)》Steam 免費試玩版評論數持續增長至 283 則，整體好評率由 94% 微調至 93%（極度好評），仍為高度評價。EA 版本預定 2026 年 9 月 10 日上線，定價尚未公布。"
    },
    {
      date: "2026-06-24",
      gameId: "themound",
      title: "《The Mound》Steam 願望清單突破 60 萬，首發 15% 折扣正式解鎖",
      body: "Nacon 確認《The Mound: Omen of Cthulhu》Steam 願望清單已突破第二里程碑 60 萬人，意味著 7 月 15 日正式上市當日，所有玩家將自動享有 15% 首發折扣（標準版 $29.99 → 約 $25.49）。距上市不到 3 週，預購附贈「Lost Explorers' Swords Pack」武器外觀包仍持續開放。"
    },
    {
      date: "2026-06-25",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》試玩版評論數持續成長至 253 則，好評率 94%",
      body: "《地城拓荒 (Dungeon Settlers)》Steam 免費試玩版評論數已從 241 則成長至 253 則，好評率持續維持 94%（極度好評）。EA 版本仍定於 2026 年 9 月 10 日上線，尚未公布定價。"
    },
    {
      date: "2026-06-23",
      gameId: "themound",
      title: "《The Mound》Next Fest 落幕，試玩版持續開放、逾 20 萬玩家體驗",
      body: "Steam 新品節（6/15~6/22）結束後，《The Mound: Omen of Cthulhu》免費試玩版仍持續對外開放，期間共吸引逾 20 萬名探索者體驗。距 7 月 15 日正式上市不到 3 週，預購仍開放中（$39.99）。"
    },
    {
      date: "2026-06-22",
      gameId: "themound",
      title: "《The Mound》Wishlist 逼近 60 萬里程碑，達標解鎖全社群 15% 首發折扣",
      body: "Nacon 宣布《The Mound: Omen of Cthulhu》Steam 願望清單數量正接近第二個里程碑 60 萬人。若於 7 月 15 日上市前達標，所有玩家首發當日可自動享有 15% 折扣；官方呼籲尚未加入願望清單的玩家協助解鎖此優惠。"
    },
    {
      date: "2026-06-22",
      gameId: "themound",
      title: "《The Mound》Steam Next Fest Demo 今日結束，上市倒數 23 天",
      body: "《The Mound: Omen of Cthulhu》Steam 新品節試玩版（6/15~6/22）今日正式結束。目前預購已開放，定價 $39.99，預購可獲得獨家「Lost Explorers' Swords Pack」武器外觀包。正式版仍預定 7 月 15 日登陸 PC / PS5 / Xbox Series，並支援跨平台連線。"
    },
    {
      date: "2026-06-08",
      gameId: "neverwither",
      title: "《不朽之樹》首測結束、開發商公布改善計畫",
      body: "Geo Seed Games 在首次技術測試（5/30~6/2）結束後，於 6 月 8 日發布詳細玩家回饋摘要。收到的改善重點包含：生物夥伴探索時的主動技能使用、庫存與儲存管理、捕獲目標鎖定系統，以及新增稀有生物與裝飾建築等。開發商表示「需要一些時間敲定下一個里程碑的安排」，次輪測試日期尚未公布。"
    },
    {
      date: "2026-06-18",
      gameId: "themound",
      title: "《The Mound》Steam Next Fest Demo 推送更新版本",
      body: "ACE Team 在 Steam Next Fest 期間（6/15~6/22）為試玩版推出新版本，加入武器拾取機制、更多理智崩潰效果與 Codex 頁面，並改善槍枝掉落率及多項 Bug 修正。正式版仍預計 7 月 15 日登陸 PC / PS5 / Xbox Series。"
    },
    {
      date: "2026-06-19",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》Steam 新品節試玩版好評持續升溫",
      body: "配合 Steam 新品節（Steam Next Fest，6/15～6/22）的曝光，《地城拓荒》試玩版評論數從 145+ 增至 178 則，好評率仍維持 94%。多家媒體將其列為本屆新品節必試清單，稱其殖民地建造結合地城探索的玩法「深度出乎意料」。EA 版本仍定於 9 月 10 日上線。"
    },
    {
      date: "2026-06-11",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》Steam Wishlist 突破 10 萬",
      body: "開發商 CanOpener 宣布《地城拓荒》Steam Wishlist 正式突破 10 萬人，感謝社群支持。開發團隊表示將持續推進 EA 版本內容，試玩版仍於 Steam Next Fest（6/15~6/22）期間免費開放，EA 正式上線日期仍為 2026 年 9 月 10 日。"
    },
    {
      date: "2026-06-17",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》EA 前公布新種族「Lycan（狼族）」與新武器「長槍（Spear）」",
      body: "開發商 CanOpener 宣布搶先體驗上市時將加入全新可玩種族「Lycan（狼族）」（白天偏弱、夜晚大幅增強，敏捷與感知見長）以及全新武器「長槍（Spear）」，為戰鬥配置帶來新組合。EA 版本包含區域 1~2 與「深淵」挑戰，完整版預計含 6 個區域。"
    },
    {
      date: "2026-06-17",
      gameId: "dungeonsettlers",
      title: "《地城拓荒》確定 9/10 搶先體驗、試玩版好評如潮",
      body: "殖民地經營結合地城探索的硬派策略新作《地城拓荒 (Dungeon Settlers)》確認將於 2026 年 9 月 10 日以搶先體驗形式登陸 PC / Mac。Steam 免費試玩版自 5/24 上架以來好評率高達 94%（145+ 則評論）。"
    },
    {
      date: "2026-06-15",
      gameId: "themound",
      title: "《The Mound: Omen of Cthulhu》確認上市支援 NVIDIA DLSS 4.5",
      body: "Nacon 官方宣布，《The Mound》正式上市版本將支援 NVIDIA DLSS 4.5，涵蓋 Dynamic Multi Frame Generation 與第二代 Transformer 模式的 Super Resolution，適用於 GeForce RTX 50 系列顯卡，以最高效能體驗克蘇魯宇宙恐怖。"
    },
    {
      date: "2026-06-15",
      gameId: "themound",
      title: "《The Mound: Omen of Cthulhu》Steam 新品節釋出免費試玩版",
      body: "克蘇魯合作恐怖新作配合 Steam 新品節（Steam Next Fest）推出免費 PC 試玩版，6/15~6/22 開放，支援最多 4 人線上合作。正式版仍定於 7 月 15 日登陸 PC / PS5 / Xbox Series，並支援跨平台連線。"
    },
    {
      date: "2026-06-05",
      gameId: "themound",
      title: "《The Mound: Omen of Cthulhu》封閉測試開跑、開放預購",
      body: "克蘇魯主題合作恐怖新作展開封閉測試（6/5~6/8），並同步開放主機版預購，正式版確定 7 月 15 日登陸 PC / PS5 / Xbox Series。"
    },
    {
      date: "2026-05-30",
      gameId: "neverwither",
      title: "《不朽之樹》首次技術測試登場",
      body: "Geo Seed Games 的多人生存 ARPG《不朽之樹》於 5/30~6/2 舉辦首次限時限量小規模技術測試，開放首個區域「翠影谷地」，可建造家園、收集 19 種生物並挑戰 4 名頭目。本次僅開放單人模式，多人連線功能仍在開發中，正式上市日期尚未公布。"
    }
  ],

  // 我目前關注的遊戲「類型」（給「新品推薦」頁用；來源見 games.txt 的「類型:」設定）
  interests: ["多人RogueLike", "多人生存"],

  // 新品推薦：關注類型中「已上市／搶先體驗、且評價不錯」的新作（由 AI 依 UPDATE_PROMPT.md 維護）
  discover: [
    {
      id: "tearsofmetal",
      name: "Tears of Metal",
      nameEn: "Tears of Metal",
      interest: "多人RogueLike",
      genre: "割草 / Roguelike",
      developer: "Paper Cult",
      platforms: ["PC"],
      playerCount: "1~4 人線上合作",
      released: "2026年7月22日 搶先體驗",
      sort: "2026-07-22",
      rating: "試玩版（已下架）壓倒性好評 96%（977+ 則，逾 25 萬人遊玩）；EA 版：特別好評 約 85%（1,928 則）",
      reason: "musou 式割草結合 Roguelike 輪迴，最多 4 人線上合作；試玩版曾獲壓倒性好評 96%（977+ 則，逾 25 萬人遊玩），已於 7/6 正式下架。EA 版已於 7/22 正式上線（$24.99，首兩週 9 折，折扣已於 8/5 截止），同步登陸 Steam 與 Microsoft Store，包含 3 幕關卡、3 位可玩英雄與村莊升級系統；同步加入 Xbox Game Pass（PC），Xbox 主機版預計 2026 年內推出；上線後五日銷量突破 10 萬份，首週登上 Steam 新遊戲 Top 10；Steam 評價約 85%（特別好評，1,928 則）。7/26 Patch 0.8.57278 修復多人去同步問題、新增中途存檔，跨平台暫時停用；7/29 Patch 0.9.57408 進一步優化城堡記錄介面；7/31 Patch 0.10.57598 優化材質解析度；8/1 Patch 0.11.57863 大幅平衡調整（含經濟系統重塑、魅力重新分類）並公布後續開發優先項（同伴復活機制、中途存檔、效能優化、連線改善）；跨平台（Crossplay）功能仍停用於主分支，可切換 Steam「Crossplay」Beta 分支維持跨平台連線；8/9 熱修復推出，修復部分玩家遭遇的滑鼠卡頓（Mouse Stutter）問題（Windows Store / Xbox Game Pass 版因需通過認證程序，補丁可能延遲一天到達）；8/7 開發預告確認下一位同伴名為「Aodh, The Vigil」，並測試將合作復活費用由 Coin 改為消耗 HP（Revive with HP）；大廳改善功能亦在開發中；上述功能均尚未確認上線版本號與時程。",
      links: { steam: "https://store.steampowered.com/app/1913120/Tears_of_Metal/", official: "" }
    },
    {
      id: "slaythespire2",
      name: "殺戮尖塔 2",
      nameEn: "Slay the Spire 2",
      interest: "多人RogueLike",
      genre: "Roguelike 卡牌構築",
      developer: "Mega Crit",
      platforms: ["PC"],
      playerCount: "1~4 人線上合作",
      released: "2026年3月5日 搶先體驗",
      sort: "2026-03-05",
      rating: "英文版特別好評 91%（66,197 則）；所有語言近 30 天 64% Mixed（多波評論轟炸，中文負評為主）；Metacritic Early Access Score 90（Steam 已標記轟炸排除計分）",
      reason: "經典卡牌 Roguelike 續作，首度加入最多 4 人合作模式（含多人專屬卡牌與隊伍協同）。Major Update 2（v0.107.1）已發布至正式分支：完全移除爭議 Act 3 Boss Doormaker、以全新 Boss Aeonglass 取代，並正式加入 Steam Workshop 模組支援（可直接透過 Steam 客戶端下載模組）；Beta v0.108.0（7/3）新增自訂局隨機按鈕（Custom Run Randomize）、多人每日挑戰 Event RNG 種子統一、補充 Aeonglass 動畫及新多人合作牌；v0.109.0（7/17）進一步調降 Aeonglass 傷害、重作 Pillar of Creation 效果，並新增兩個 Neow 開局遺物：Neow's Sacrifice（加入詛咒牌換取強力藥水）與 Dowsing Rod（進入 5 間事件室後化為 Abundance 強力技能）；v0.109.0 與 v0.109.1 已於 7 月底正式推送至穩定主分支（非 Beta 玩家現已同步收到）；EA 期間已累積逾 15 張多人合作專用新牌。注意：自 4 月起歷經多波評論轟炸（平衡改動爭議），7 月中旬再遭中國玩家集中轟炸（12 小時湧入 3,609 則負評），Steam 整體好評率（不含排除計分）已降至約 56~60%；近 30 天評論已回升至 62%，Steam 已標記轟炸排除計分，Metacritic 媒體評分仍維持 90；遊戲本身玩法口碑仍高，購前建議留意爭議背景。7 月電子報確認加入繁體中文翻譯；v0.109.1（7/25）修正繁體中文複數判斷邏輯（plural evaluation）；v0.110.0 Beta（7/31）將 Mirage 與 Pillar of Creation 恢復至 0.109.0 前版本並微調（Pillar 格擋 3→2），新增鍵盤純操作模式與角色形態 VFX 動畫；v0.111.0 Beta（8/13）：改版 Expect a Fight（費 3 技能，格擋加成與 Strength 掛鉤）與 Hyperbeam（全體傷害 24/30，Focus 損失僅當回合有效）、大量平衡調整、正式加入印尼語本地化、新卡牌圖稿與角色低血量待機動畫；開發組於 8/14 電子報公告更新重心正式轉向兩大「玩家期待已久的大型內容」：第六位可玩角色（Sixth Character）與 Act 2 替代生態區（Alternate Act 2 Biome）；8/27 無更新（Mega Crit 年度假期），後續更新間隔預計至少拉長一個月以上。",
      links: { steam: "https://store.steampowered.com/app/2868840/Slay_the_Spire_2/", official: "" }
    },
    {
      id: "sephiria",
      name: "Sephiria",
      nameEn: "Sephiria",
      interest: "多人RogueLike",
      genre: "動作 Roguelite / 俯視角合作",
      developer: "TEAM HORAY",
      platforms: ["PC", "Mac"],
      playerCount: "單人 / 1~4 人線上合作",
      released: "2026年7月31日（1.0 正式版）",
      sort: "2026-07-31",
      rating: "壓倒性好評 97%（英語 2,149 則）；整體特別好評（全語言約 5,900+ 則）",
      reason: "《Dungreed》主創 TEAM HORAY 的最新力作。俯視角動作 Roguelite，6 種武器各有 50+ 升級路線，搭配神器與石板打造千變萬化的 Build；最多 4 人線上合作，隊友間可交易道具並互相復活。2026 年 7 月 31 日 1.0 正式上線後峰值逾 24,000 人同時在線，英語評論壓倒性好評 97%（2,149 則），是 2026 年合作 Roguelite 中口碑最突出的作品之一。",
      links: { steam: "https://store.steampowered.com/app/2436940/Sephiria/", official: "" }
    },
    {
      id: "subnautica2",
      name: "深海迷航 2",
      nameEn: "Subnautica 2",
      interest: "多人生存",
      genre: "海洋生存探索",
      developer: "Unknown Worlds",
      platforms: ["PC", "Xbox Series"],
      playerCount: "單人 / 最多 4 人合作",
      released: "2026年5月14日 搶先體驗",
      sort: "2026-05-14",
      rating: "特別好評 93%（英語 70,356 則，全語言 124,953 則）；近 30 天 90%",
      reason: "系列首度支援 4 人合作的外星海洋生存續作，新增 DNA 改造系統與全新生態海域。EA 上市不到兩個月突破 500 萬份銷量。7月8日大更新「Adaptive Measures（1.1）」新增 Coral Gardens 與 Axum Ruins 兩座 Biolab、Biomod 槽位從 4 擴充至 6；7月14日推出 1.1 Hotfix 4，修復 Angel Combs 進度阻擋問題及多項 Xbox 崩潰問題。8 月 19 日「1.2 Buddy System」合作大更新正式上線：近距語音聊天（Proximity Chat，遠距切換為無線電）、玩家物品交易（Inventory Sharing）、死亡復活機制、角色表情（Emotes）、追蹤標籤（Tracking Tag）、2 位新角色及更多潛水衣配色、HUD 動態縮放與食譜鎖定優化；同步預告 Update 2.0 將帶來全新載具、新探索區域與「收藏者利維坦」遭遇事件。年底預計推出 EA2 大版本，計劃加入全新探索區域、新生物種類、新載具與故事劇情。近 30 天評價維持 90% 好評，口碑穩健。可加入 Xbox Game Pass 遊玩。",
      links: { steam: "https://store.steampowered.com/app/1962700/Subnautica_2/", official: "" }
    },
    {
      id: "scrapmechanic",
      name: "Scrap Mechanic",
      nameEn: "Scrap Mechanic",
      interest: "多人生存",
      genre: "沙盒生存建造",
      developer: "Axolot Games",
      platforms: ["PC"],
      playerCount: "單人 / 多人合作",
      released: "2026年7月25日（1.0 正式版）",
      sort: "2026-07-25",
      rating: "特別好評 90%（47,500+ 則）",
      reason: "動態生成開放世界的沙盒生存建造：打造載具與基地、採集資源、對抗危險機器人。歷經 10 年搶先體驗後於 2026/7/25 推出 1.0（完整故事線＋「Drilling Thunder」第二章劇情），Steam 整體評價 90%（特別好評，47,500+ 則）；新增重製世界、新敵人、建造零件與外觀，為系列最完整版本。",
      links: { steam: "https://store.steampowered.com/app/387990/Scrap_Mechanic/", official: "" }
    },
    {
      id: "funnelrunners",
      name: "Funnel Runners",
      nameEn: "Funnel Runners",
      interest: "多人生存",
      genre: "合作生存 / 逃脫",
      developer: "",
      platforms: ["PC"],
      playerCount: "1~8 人合作",
      released: "2026年7月16日",
      sort: "2026-07-16",
      rating: "特別好評 83%（1,933 則）",
      reason: "最多 8 人合作的限時生存：在龍捲風夷平小鎮前約 20 分鐘內搜刮物資、修好廂型車逃出生天。2026/7/16 上線即獲 87% 特別好評，主打歡樂的多人混亂體驗。",
      links: { steam: "https://store.steampowered.com/app/3712080/Funnel_Runners/", official: "" }
    },
    {
      id: "grainrot",
      name: "Grain Rot",
      nameEn: "GRAIN ROT",
      interest: "多人RogueLike",
      genre: "合作取材恐怖 Roguelite",
      developer: "Beck & Branch Games（發行：Neem）",
      platforms: ["PC"],
      playerCount: "1~4 人合作",
      released: "2026年8月7日",
      sort: "2026-08-07",
      rating: "特別好評 88%（1,389 則）",
      reason: "在焦土世界的程序生成廢墟遺址中，帶著最多 3 名隊友採集家具、搜刮資源，並在腐化生物包圍前撤離重建前哨站。玩法融合恐怖取材生存與 Roguelite 輪迴，2026 年 8 月 7 日上線首週即獲 89% 特別好評（994 則）；試玩版曾在 Steam Next Fest 登上前 15 名，累積逾 35 萬次下載、近 20 萬人加入願望清單。",
      links: { steam: "https://store.steampowered.com/app/4450620/GRAIN_ROT/", official: "" }
    },
    {
      id: "windrose",
      name: "Windrose",
      nameEn: "Windrose",
      interest: "多人生存",
      genre: "海盜生存建造 / 海洋合作",
      developer: "Windrose Crew（發行：Pocketpair）",
      platforms: ["PC"],
      playerCount: "1~8 人合作（建議最多 4 人）",
      released: "2026年4月14日 搶先體驗",
      sort: "2026-04-14",
      rating: "特別好評 88%（27,000+ 則）",
      reason: "由《Palworld》發行商 Pocketpair 發行的海盜主題合作生存建造新作。最多 8 人共乘一艘船出海：一人掌舵、一人操炮、一人接舷突擊，陸地可建造基地與採集資源。EA 上線首日即突破 69,000 人同時在線、上市首週銷量逾 50 萬份，Steam 維持 88% 特別好評（27,000+ 則）。嚴格線上合作、無 PvP，主打海戰與基地建造的協作體驗；開發組持續更新修復多人效能與擴充艦船、武器等內容。",
      links: { steam: "https://store.steampowered.com/app/3041230/Windrose/", official: "" }
    },
    {
      id: "farfarwest",
      name: "Far Far West",
      nameEn: "Far Far West",
      interest: "多人RogueLike",
      genre: "合作 Roguelite FPS / 西部奇幻",
      developer: "Evil Raptor（發行：Fireshine Games）",
      platforms: ["PC"],
      playerCount: "1~4 人合作",
      released: "2026年4月28日 搶先體驗",
      sort: "2026-04-28",
      rating: "壓倒性好評 96%（35,000+ 則）",
      reason: "西部奇幻風合作 Roguelite FPS：1~4 人隊伍在程序生成荒野中接取賞金獵人任務，融合《深岩銀河》式的任務框架與 Roguelite 輪迴進度。2026 年 4 月 28 日搶先體驗上線即獲壓倒性好評 96%（35,000+ 則），銷量突破 50 萬份，多家媒體譽為「2026 年最令人驚喜的合作 Roguelite」。EA 首個重大更新「Frostburn」將於 8 月 27 日上線，為上市以來最大規模更新。",
      links: { steam: "https://store.steampowered.com/app/3124540/Far_Far_West/", official: "" }
    },
    {
      id: "starrupture",
      name: "StarRupture",
      nameEn: "StarRupture",
      interest: "多人生存",
      genre: "開放世界科幻生存 / 工廠建造",
      developer: "",
      platforms: ["PC"],
      playerCount: "最多 4 人合作",
      released: "2026年1月6日 搶先體驗",
      sort: "2026-01-06",
      rating: "特別好評 81%（13,000+ 則）",
      reason: "開放世界科幻生存兼工廠建造遊戲，融合行星探索與《Satisfactory》式自動化產線的玩法組合。最多 4 人合作從零建立採礦基地並擴展為全自動資源帝國，同時應對外星威脅與環境挑戰。2026 年 1 月 6 日搶先體驗上線首日峰值達 28,000 人同時在線，Steam 累積 13,000+ 則評論維持特別好評 81%。",
      links: { steam: "https://store.steampowered.com/app/1631270/StarRupture/", official: "" }
    }
  ]
};
