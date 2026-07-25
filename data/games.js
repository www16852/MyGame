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
  lastUpdated: "2026-07-25",

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
        { type: "announcement", date: "2026年7月15日（上市首日）", sort: "2026-07-15", note: "首日 Patch 上線：主船新增武器升級鑄造台（Weapon Upgrade Anvil）、追加即時語音推撥通話（Push-to-Talk）、移除強制任務結束計時器（玩家可自行決定何時撤離）、木筏手記旁白附加手繪插圖、新增戰鬥機制教學圖鑑頁、調整高階任務難度平衡、動暈輔助中心點與 FOV 滑桿（75~125）；已知問題：跨平台直接邀請功能異常，目前官方暫行對策為透過伺服器清單找到房主（修復日期未定）；媒體評測出爐：Metacritic 70（15 篇，褒貶不一）、OpenCritic 72（Fair 評級），多數評測肯定理智崩潰機制與合作深度，惟指出難度平衡與火槍手感仍有改善空間" },
        { type: "announcement", date: "2026年7月（上市後）", sort: "2026-07-17", note: "開發商公布上市後更新路線圖：Q3 2026 聚焦 UE5 效能優化（減少 shader 卡頓）與理智崩潰事件擴充；秋季版本計劃推出沼澤地形、大型廢墟等新環境，及守點、追蹤超自然目標、心理攻擊生存等多樣任務類型；冬季版本引入 Sanity Anchor（穩定隊友理智）與 Vanguard Scout（機動偵察）兩個專精角色職能，以及歷史武器客製化系統；跨平台全球社群里程碑活動（達標解鎖限定外觀與世界觀故事）亦在規劃中。Week-One Patch 同步新增密碼保護伺服器（Password-Protected Servers）功能，讓不同平台玩家可建立私人房間繞開跨平台邀請異常問題（正式修復更新日期仍未定）；Steam 累積用戶評論 1,942 則，整體好評率 66%（褒貶不一），批評集中於移動手感偏重、武器耐久消耗快及無跳躍設計，合作深度與恐怖氛圍仍廣受肯定" },
        { type: "announcement", date: "2026年7月17日", sort: "2026-07-17", note: "Steam Beta Branch 推出效能優化 Patch，針對嚴重卡頓與資源串流瓶頸進行修正，受影響區域幀率最高提升約 25%；跨平台直接邀請功能異常仍在修復中" },
        { type: "announcement", date: "2026年7月21日", sort: "2026-07-21", note: "Patch 1.01 正式推送至穩定主分支：包含後啟動熱修復（Post Launch Hotfixes）與平衡調整，新增「Crossplay Friend Finder」功能（可在伺服器清單中依好友名稱搜尋，部分緩解跨平台直接邀請異常問題）；新增進場相機模式預選畫面（Cinematic / Default）；支援在木筏互動時以滑鼠整理背包；共 17 項相容性與效能修正" },
        { type: "release", date: "2026年8月6日（實體版）", sort: "2026-08-06", note: "PS5 / Xbox Series X|S 盒裝光碟版正式發售（數位版已於 7月15日全平台上架）" }
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
        { type: "release", date: "未定 (TBA)", sort: "9999-12-31", note: "預計 2026 年內推出，尚未公布正式上市日期，目前為 Coming Soon；下一個里程碑（測試）時程待開發商公告" }
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
        { type: "demo", date: "2026年5月24日起開放", sort: "2026-05-24", note: "Steam 免費試玩版上架，Steam 新品節期間獲媒體廣泛報導，目前好評率 94%（324 則）" },
        { type: "announcement", date: "2026年6月（EA 前公告）", sort: "2026-06-01", note: "宣布 EA 上市時將加入新可玩種族「Lycan（狼族）」（白天偏弱、夜晚增強，擅長靈活物理輸出，適配弓與長槍）以及新武器「長槍（Spear）」，開放新的戰鬥配置組合" },
        { type: "beta", date: "2026年7月23日 ~ 7月29日", sort: "2026-07-23", note: "第 3 次 Supporters Program 封測，開放 Region 1~2、新種族 Lycan（狼族）、新武器長槍（Spear）、新特性 / 道具 / 效果及難度平衡調整；Steam 頁申請資格、限量隨機抽選；封測存檔不保證相容於 9/10 EA 版" },
        { type: "early_access", date: "2026年9月10日", sort: "2026-09-10", note: "以搶先體驗（Early Access）形式上市，初期開放區域 1~2 與「深淵」挑戰內容；完整版預計共 6 個區域" }
      ]
    }
  ],

  news: [
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
      rating: "試玩版（已下架）壓倒性好評 96%（977+ 則，逾 25 萬人遊玩）；EA 版（2026-07-22 上線）：好評 87%（735+ 則）",
      reason: "musou 式割草結合 Roguelike 輪迴，最多 4 人線上合作；試玩版曾獲壓倒性好評 96%（977+ 則，逾 25 萬人遊玩），已於 7/6 正式下架（開發商表示 Demo 內容已過時、存檔不繼承）。EA 版已於 7/22 正式上線（$24.99，首兩週 9 折，折扣至 8/5 止，同步登陸 Steam 與 Microsoft Store），包含 3 幕關卡、3 位可玩英雄與村莊升級系統；同步加入 Xbox Game Pass（PC），Xbox 主機版預計 2026 年內推出；上線後累積 735+ 則 Steam 評論，好評率 87%，首週登上 Steam 新遊戲 Top 10、峰值約 4,000 名同時在線；媒體普遍肯定手繪漫畫風美術與合作流暢度，部分玩家反映初期難度較高。",
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
      rating: "Steam 整體好評約 66%（褒貶不一，歷經多波評論轟炸）；Metacritic Early Access Score 90（Steam 已標記轟炸排除計分）",
      reason: "經典卡牌 Roguelike 續作，首度加入最多 4 人合作模式（含多人專屬卡牌與隊伍協同）。Major Update 2（v0.107.1）已發布至正式分支：完全移除爭議 Act 3 Boss Doormaker、以全新 Boss Aeonglass 取代，並正式加入 Steam Workshop 模組支援（可直接透過 Steam 客戶端下載模組）；Beta v0.108.0（7/3）新增自訂局隨機按鈕（Custom Run Randomize）、多人每日挑戰 Event RNG 種子統一、補充 Aeonglass 動畫及新多人合作牌；v0.109.0（7/17）進一步調降 Aeonglass 傷害、重作 Pillar of Creation 效果，並新增兩個 Neow 開局遺物：Neow's Sacrifice（加入詛咒牌換取強力藥水）與 Dowsing Rod（進入 5 間事件室後化為 Abundance 強力技能）；EA 期間已累積逾 15 張多人合作專用新牌。注意：自 4 月起歷經多波評論轟炸（平衡改動爭議），7 月中旬再遭中國玩家集中轟炸（12 小時湧入 3,609 則負評），Steam 整體好評率已跌至約 66%；Steam 已標記排除計分，Metacritic 媒體評分仍維持 90；遊戲本身玩法口碑仍高，購前建議留意爭議背景。7 月電子報確認加入繁體中文翻譯。",
      links: { steam: "https://store.steampowered.com/app/2868840/Slay_the_Spire_2/", official: "" }
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
      rating: "特別好評 93%（130,000+ 則）；近 30 天 90%",
      reason: "系列首度支援 4 人合作的外星海洋生存續作，新增 DNA 改造系統與全新生態海域。EA 上市不到兩個月突破 500 萬份銷量。7月8日大更新「Adaptive Measures（1.1）」新增 Coral Gardens 與 Axum Ruins 兩座 Biolab、Biomod 槽位從 4 擴充至 6；下一大更新「1.2」為合作導向版本，已確認加入近距語音聊天（Proximity Chat）、玩家物品交易（Player Trading）、死亡復活系統、HUD 界面調整與聚落建造工具（Habitat Builder），官方保守預計最遲 2026 年 9 月發布（無精確日期）；年底預計推出 EA2 大版本，計劃加入全新探索區域、新生物種類、新載具與故事劇情。近 30 天評價維持 90% 好評，口碑穩健。可加入 Xbox Game Pass 遊玩。",
      links: { steam: "https://store.steampowered.com/app/1962700/Subnautica_2/", official: "" }
    }
  ]
};
