// 手動維護的賽程（沒有公開 API 可抓，update.py 不會動這個檔）
// 時間一律寫台灣時間 "YYYY-MM-DDTHH:MM"；還沒公布開賽時間就只寫日期並加 tbd: true
// 比賽打完可以補 score: [客隊分, 主隊分]
window.MANUAL_EVENTS = [
  // ── 中華職棒 台灣大賽（七戰四勝，全部在臺北大巨蛋）──
  // 來源：Yahoo 運動、yam 蕃新聞（2026-10-13）
  ...[
    ["G1", "2026-10-17T17:05", "dragons", false],
    ["G2", "2026-10-18T17:05", "dragons", false],
    ["G3", "2026-10-20T18:35", "brothers", false],
    ["G4", "2026-10-21T18:35", "brothers", false],
    ["G5", "2026-10-23T18:35", "dragons", true],
    ["G6", "2026-10-24T17:05", "dragons", true],
    ["G7", "2026-10-25T17:05", "dragons", true],
  ].map(([g, tw, home, ifNec]) => ({
    id: "cpbl-ts-" + g,
    layer: "cpbl",
    tw,
    home: home === "dragons" ? "味全龍" : "中信兄弟",
    away: home === "dragons" ? "中信兄弟" : "味全龍",
    tag: `台灣大賽 ${g}`,
    ifNec,
    venue: "臺北大巨蛋",
    score: null,
  })),

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
