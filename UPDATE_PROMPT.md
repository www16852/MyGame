# 更新指令 — 遊戲情報站

> 使用方式：當你想更新網站時，對 AI 說：
> **「請依照 MyGame/UPDATE_PROMPT.md 的指示更新我的遊戲情報站」**
> AI 就會照下面的步驟執行。

---

## 你的任務

你是這個靜態網站的維護者。網站位於 `/Users/a01-0225-0615/Documents/Work/MyGame`。
你的工作是：**讀取使用者的遊戲清單 → 查證最新情報 → 更新資料檔 `data/games.js`**。
**除非使用者另外要求，否則只改 `data/games.js` 這一個檔案**，其他 HTML/CSS/JS 不要動。

## 執行步驟

1. **讀取 `games.txt`**
   - 取得使用者目前感興趣的遊戲清單（忽略 `#` 開頭的註解行與空行）。
   - 每行格式為 `遊戲名稱` 或 `遊戲名稱 | 補充線索`。
   - **`類型:` 開頭的行不是遊戲**，而是使用者關注的「遊戲類型」，供第 3.7 步「新品推薦」使用（例如 `類型: 多人RogueLike`）。

2. **讀取現有的 `data/games.js`**
   - 了解目前已收錄哪些遊戲、上次的情報內容與 `lastUpdated` 日期。

3. **查證每款遊戲的最新情報**（用 WebSearch / WebFetch）
   針對 `games.txt` 中的每款遊戲，查詢並更新：
   - 正式上市日期（release）
   - 搶先體驗 / 搶先測試（early_access）
   - 試玩版 Demo（demo）
   - 封測 / 公測 / Beta（beta）
   - 近期重大公告或預告（announcement）
   - 基本資料：類型、平台、開發商、簡介、Steam / 官網連結
   - **遊玩人數／模式**（playerCount 欄位），見下方第 3.5 步。
   - **查證原則**：以官方來源或可信遊戲媒體為主；日期不確定就用較粗略的字串（如 `2026 Q3`、`2026年內`、`未定(TBA)`），不要捏造精確日期。

3.5. **查遊玩人數／模式（playerCount 欄位）**
   - 指這款遊戲「支援幾人遊玩、什麼模式」，**不是**同時在線人數。
   - 來源：Steam 商店頁的功能標籤（單人 Single-player、多人 Multi-player、線上合作 Online Co-op、PvP…）以及遊戲說明中標示的人數（例如「最多 4 人合作」）。
   - 用簡短中文字串描述，範例：
     - 只能單人 → `單人`
     - 最多四人合作 → `1~4 人合作`
     - 大型多人線上 → `大型多人線上 (MMO)`，若也能單人玩 → `單人 / 大型多人線上 (MMO)`
   - 查不到就填空字串 `""`，不要捏造。

3.6. **查 Steam 價格與特價（`price` 欄位；`games[]` 與 `discover[]` 每款都要）**
   - 對每款「有 Steam app id」的遊戲，用 Bash + curl 查台幣價格（比爬網頁可靠）：
     ```
     curl -s "https://store.steampowered.com/api/appdetails?appids=<APPID>&cc=tw&l=tchinese&filters=price_overview"
     ```
     回傳 JSON 的 `price_overview`：`final_formatted`＝現價、`initial_formatted`＝原價、`discount_percent`＝折扣%。
   - 依此填 `price` 物件：
     - 有售價：`current` = `final_formatted`；若 `discount_percent > 0`，另填 `original` = `initial_formatted`、`discount` = `-XX%`（否則兩者留空字串）。
     - 未上市／無價格（API 的 `data` 為空陣列或 `success` 為 false）：`current` 留空，`note` 填「尚未定價（Coming Soon）」之類；免費遊戲 `note` 填「免費」。
     - `asOf` 一律填今天日期。
   - **每次更新都要重查已上市遊戲的價格**（特價會變動）；真的查不到就保留上次的值，不要亂填。
   - **歷史低價（`low` / `lowCut` / `lowDate`）** ——來源 IsThereAnyDeal (ITAD)，API key 由排程以環境變數 `$ITAD_KEY` 提供（**切勿把 key 寫進 games.js 或任何 commit**）。步驟：
     1. Steam appid 換 ITAD game id：`curl -s "https://api.isthereanydeal.com/games/lookup/v1?key=$ITAD_KEY&appid=<APPID>"` → 取 `.game.id`。
     2. 查台灣區 Steam 歷史低價：`curl -s -X POST "https://api.isthereanydeal.com/games/storelow/v2?key=$ITAD_KEY&country=TW&shops=61" -H "Content-Type: application/json" -d '["<GAMEID>"]"'` → 取 `[0].lows[0]`：`price.amount`＝史低金額（幣別 TWD）、`cut`＝當時折扣%、`timestamp`＝日期。
     3. 填 `low`＝`NT$ <amount>`、`lowCut`＝`-<cut>%`（cut 為 0 就留空）、`lowDate`＝`timestamp` 前 10 碼。未上市／查無資料就三個都留空字串。

3.7. **新品推薦（`interests` 與 `discover` 欄位）**
   - 讀取 `games.txt` 裡所有 `類型:` 行，整理成 `interests` 陣列（例如 `["多人RogueLike", "多人生存"]`）。
   - **每次更新都要「主動發掘」新候選，不能只更新既有那幾款。** 針對每個關注類型，實際用網路搜尋查最近 3~6 個月「已上市或搶先體驗、且評價不錯」的新作（例如搜 `best new co-op <類型> 2026 steam very positive`、Steam 熱門新品 / 新品節榜、遊戲媒體年度榜單），**每次至少嘗試找出 1~2 款目前清單上還沒有的新遊戲**加入。
   - **目標數量**：每個關注類型維持約 **3~5 款**、整體約 **6~10 款**；不足就補新的，過多就留「最新且最高評價」者。
   - **輪替 / 汰換**：把「上市已超過約 9~12 個月」「評價跌破門檻」「熱度明顯消退」或「已被更新更好的同類取代」的項目移出，讓位給更新的好評新作——**清單要保持新鮮、會流動，不要長期一成不變**。
   - **不要與追蹤清單 `games[]` 重複**：同一款遊戲不要同時出現在 `games` 與 `discover`。
   - **評價門檻**：以 Steam「特別好評 / 極度好評 / 壓倒性好評（Very / Overwhelmingly Positive）」等級為主；**「褒貶不一 / 普通好評（Mixed / Mostly Positive，約 ≤ 80%）」的不要放**。查不到明確評價就不要收錄，寧缺勿濫、不要捏造評分。
   - `discover[]` 每筆格式：
     ```
     {
       id, name, nameEn, interest (命中的關注類型，需與 interests 內字串一致),
       genre, developer, platforms:[...], playerCount,
       released (顯示用上市/搶先體驗日期字串), sort ("YYYY-MM-DD" 排序用),
       rating (評價文字，例如「壓倒性好評 92%（64,000+ 則）」),
       reason (2~3 句推薦理由／評價亮點),
       links: { steam, official }
     }
     ```

4. **更新 `data/games.js`**
   - 嚴格遵守檔案開頭註解所定義的資料格式。
   - `games[]`：與 `games.txt` 對齊——清單裡新增的要加進來，移除的要刪掉。保留既有資料，只更新有變動的欄位。
   - 每個事件的 `sort` 欄位務必填 `YYYY-MM-DD`（粗略日期用該期間第一天，TBA 用 `9999-12-31`），時間軸排序才會正確。
   - 每款遊戲都要有 `playerCount` 欄位（依第 3.5 步查得的遊玩人數／模式填寫）。
   - `interests[]` 與 `discover[]`：依第 3.7 步維護。`interests` 要與 `games.txt` 的 `類型:` 設定對齊；`discover` 只放符合評價門檻的好評新作。
   - `news[]`：把這次查到的「重要新變化」寫成 1～5 則最新情報（最新的日期在前）。
     - 例如：定檔、跳票、開放 Demo、開放預購、釋出新預告等。
     - 沒有實質新變化的遊戲就不必硬寫新聞。
   - 把 `lastUpdated` 改成今天的日期（`YYYY-MM-DD`）。
   - **移除所有「（範例資料）」字樣**——那是初版佔位內容，第一次正式更新時應整批換成真實情報。

5. **回報**
   - 簡短告訴使用者這次更新了哪些遊戲、有哪些重要時程變化（例如「○○ 確定 7/15 上市」「○○ 跳票到明年」）。

## 注意事項
- 只輸出/修改 `data/games.js`，不要改動頁面結構。
- 保持 `id` 穩定（同一款遊戲沿用舊 `id`），避免重複。
- 資料格式錯誤會讓網頁壞掉，務必比對檔案開頭的格式範例。
- 全站文字以繁體中文為主。
