// 手動維護的賽程（沒有公開 API 可抓，update.py 不會動這個檔）
// 時間一律寫台灣時間 "YYYY-MM-DDTHH:MM"；還沒公布開賽時間就只寫日期並加 tbd: true
// 比賽打完可以補 score: [客隊分, 主隊分]
// （台灣大賽已改由 update.py 從中職官網自動抓，見 data/cpbl.js）
window.MANUAL_EVENTS = [
  // ── TFT 亞太區 Regional Finals（Set 18 Enchanted Wilds）──
  // 來源：官方規則書 10.2.6、Liquipedia；開賽時間尚未公布
  ...[
    ["2026-10-23", "入圍賽", "16 人打 5 場，前 4 晉級第一週；剩 8 人再打 2 場，前 4 晉級"],
    ["2026-10-24", "第一週 Day 2", "40 人打 6 場，前 32 晉級"],
    ["2026-10-25", "第一週 Day 3", "32 人淘汰制，每輪前 4 晉級第二週並取得下個賽季 TPC 資格"],
    ["2026-10-30", "第二週 Day 1", "32 人打 6 場，前 24 晉級"],
    ["2026-10-31", "第二週 Day 2", "24 人淘汰制，決出 8 人進總決賽"],
    ["2026-11-01", "總決賽", "8 人決賽（全員已取得世界賽資格時改用 Checkmate 制）"],
  ].map(([date, stage, note], i) => ({
    id: "tft-rf-" + i,
    layer: "tft",
    tw: date,
    tbd: true,
    title: `RF ${stage}`,
    tag: `亞太區 Regional Finals · ${stage}`,
    note,
    stream: "Twitch：teamfighttactics_tw",
  })),
];

// ── 英雄聯盟世界賽：各隊是賽區的第幾種子（API 沒有，手動整理）──
// 來源：Liquipedia World Championship/2026 瑞士制第一輪抽籤分組、各隊晉級方式
window.WORLDS_SEEDS = {
  GEN: 1, HLE: 2, T1: 3, DK: 4,          // LCK
  AL: 1, BLG: 2, TES: 3, IG: 4,          // LPL
  TLAW: 1, LYON: 2, C9: 3,               // LCS
  G2: 1, MKOI: 2, KC: 3,                 // LEC（KC 從入圍賽晉級）
  TSW: 1, CFO: 2, MVK: 3,                // LCP
  LOS: 1, FUR: 2,                        // CBLOL
};
