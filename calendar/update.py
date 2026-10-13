#!/usr/bin/env python3
"""抓行事曆用的賽程資料，輸出到 data/ 給 index.html 讀。

  data/dodgers.js  道奇整季賽程（MLB Stats API）
  data/worlds.js   英雄聯盟世界賽（LoL Esports API）

用法：python3 update.py [年份]（預設今年）
用 curl 抓檔，避開本機 Python 的 SSL 憑證問題。
"""
import json, subprocess, sys, datetime, pathlib, urllib.parse

season = sys.argv[1] if len(sys.argv) > 1 else str(datetime.date.today().year)
DATA = pathlib.Path(__file__).parent / "data"
STAMP = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")


def get(url, *headers):
    args = ["curl", "-sf", url]
    for h in headers:
        args += ["-H", h]
    return json.loads(subprocess.run(args, capture_output=True, check=True).stdout)


def write(name, var, items):
    (DATA / name).write_text(
        f"// 自動產生（update.py），請勿手改。更新時間：{STAMP}\n"
        f"window.UPDATED = {json.dumps(STAMP)};\n"
        f"window.{var} = {json.dumps(items, ensure_ascii=False, indent=1)};\n",
        encoding="utf-8")


# ── 道奇 ────────────────────────────────────────────────────
def dodgers():
    url = ("https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=119"
           f"&season={season}&gameType=S,R,F,D,L,W&hydrate=venue")

    def side(t):
        return {"name": t["team"]["name"], "score": t.get("score"), "win": t.get("isWinner")}

    games = []
    for day in get(url)["dates"]:
        for g in day["games"]:
            games.append({
                "id": g["gamePk"],
                "utc": g["gameDate"],
                "tbd": g["status"].get("startTimeTBD", False),
                "type": g["gameType"],          # S 熱身 / R 例行 / F D L W 季後
                "state": g["status"]["detailedState"],
                "series": g.get("seriesDescription", ""),
                "seriesGame": g.get("seriesGameNumber"),
                "ifNec": g.get("ifNecessary") == "Y",
                "venue": g.get("venue", {}).get("name", ""),
                "away": side(g["teams"]["away"]),
                "home": side(g["teams"]["home"]),
            })
    write("dodgers.js", "DODGERS_GAMES", games)
    print(f"道奇 {season} 球季：{len(games)} 場")


# ── 英雄聯盟世界賽 ──────────────────────────────────────────
# x-api-key 是 lolesports.com 官網前端公開使用的 key
LOL_KEY = "x-api-key: 0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"
WORLDS_LEAGUE = "98767975604431411"


def worlds():
    base = ("https://esports-api.lolesports.com/persisted/gw/getSchedule"
            f"?hl=zh-TW&leagueId={WORLDS_LEAGUE}")
    # 預設那一頁落在「現在」附近，往前、往後翻頁直到超出本年度
    events, seen = [], set()
    first = get(base, LOL_KEY)["data"]["schedule"]
    pending = [(first, None)]
    while pending:
        page, direction = pending.pop()
        evs = [e for e in page["events"] if e.get("match")]
        in_season = [e for e in evs if e["startTime"].startswith(season)]
        for e in in_season:
            if e["match"]["id"] not in seen:
                seen.add(e["match"]["id"])
                events.append(e)
        for d in ("older", "newer"):
            token = page["pages"].get(d)
            if not token or (direction and d != direction):
                continue
            # 這一頁已經整頁跑出本年度就不用再往同方向翻
            if direction and not in_season:
                continue
            nxt = get(f"{base}&pageToken={urllib.parse.quote(token)}", LOL_KEY)["data"]["schedule"]
            pending.append((nxt, d))

    # 賽程裡沒有賽區，另外抓全部隊伍對照（同名的二軍/舊隊沒有 homeLeague，優先取有的）
    leagues = {}
    for t in get("https://esports-api.lolesports.com/persisted/gw/getTeams?hl=zh-TW", LOL_KEY)["data"]["teams"]:
        hl = t.get("homeLeague") or {}
        if hl and (t["name"], t["code"]) not in leagues or t["status"] == "active" and hl:
            leagues[(t["name"], t["code"])] = {"league": hl.get("name"), "region": hl.get("region")}

    def team(t):
        r = t.get("result") or {}
        return {"name": t["name"], "code": t["code"], "wins": r.get("gameWins"),
                "outcome": r.get("outcome"),
                **leagues.get((t["name"], t["code"]), {"league": None, "region": None})}

    matches = [{
        "id": e["match"]["id"],
        "utc": e["startTime"],
        "state": e["state"],            # unstarted / inProgress / completed
        "stage": e.get("blockName", ""),
        "bo": e["match"]["strategy"]["count"],
        "teams": [team(t) for t in e["match"]["teams"]],
    } for e in sorted(events, key=lambda e: e["startTime"])]
    write("worlds.js", "WORLDS_MATCHES", matches)
    print(f"世界賽 {season}：{len(matches)} 場")


dodgers()
worlds()
