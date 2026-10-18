#!/usr/bin/env python3
"""抓行事曆用的賽程資料，輸出到 data/ 給 index.html 讀。

  data/dodgers.js  道奇整季賽程（MLB Stats API）
  data/worlds.js   英雄聯盟世界賽（LoL Esports API）
  data/mlbpost.js  MLB 其他隊的聯盟冠軍賽、世界大賽（道奇自己的場次已在 dodgers.js）
  data/cpbl.js     中華職棒台灣大賽（中職官網的賽程 API）

用法：python3 update.py [年份]（預設今年）
用 curl 抓檔，避開本機 Python 的 SSL 憑證問題。

資料沒變就不重寫檔案（避免排程每次都產生 commit）。
原本未定的對戰組合確定時，印出以 NOTIFY:: 開頭的行，給排程腳本發通知。
"""
import json, re, subprocess, sys, datetime, pathlib, tempfile, urllib.parse

season = sys.argv[1] if len(sys.argv) > 1 else str(datetime.date.today().year)
DATA = pathlib.Path(__file__).parent / "data"
STAMP = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")


def get(url, *headers):
    args = ["curl", "-sf", url]
    for h in headers:
        args += ["-H", h]
    return json.loads(subprocess.run(args, capture_output=True, check=True).stdout)


def load(name, var):
    """讀回上一次產生的資料；沒有檔案就回傳 None。"""
    try:
        text = (DATA / name).read_text(encoding="utf-8")
        return json.loads(text.split(f"window.{var} = ", 1)[1].rstrip().rstrip(";"))
    except (FileNotFoundError, IndexError, ValueError):
        return None


def notify(msg):
    print(f"NOTIFY::{msg}")


def write(name, var, items):
    if load(name, var) == items:
        return False
    (DATA / name).write_text(
        f"// 自動產生（update.py），請勿手改。更新時間：{STAMP}\n"
        f"window.UPDATED = {json.dumps(STAMP)};\n"
        f"window.{var} = {json.dumps(items, ensure_ascii=False, indent=1)};\n",
        encoding="utf-8")
    return True


# ── 道奇 ────────────────────────────────────────────────────
DODGERS_NAME = "Los Angeles Dodgers"


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
    # 季後賽下一輪的對手確定後，MLB 才會把那幾場排進賽程 → 新出現的季後賽就是「對戰確定」
    old = load("dodgers.js", "DODGERS_GAMES")
    if old is not None:
        old_ids = {g["id"] for g in old}
        new_series = {}
        for g in games:
            if g["id"] not in old_ids and g["type"] in ("F", "D", "L", "W"):
                new_series.setdefault(g["series"], []).append(g)
        for series, gs in new_series.items():
            first = gs[0]
            tw = datetime.datetime.fromisoformat(first["utc"].replace("Z", "+00:00")) + datetime.timedelta(hours=8)
            notify(f"⚾ 道奇{series}對戰確定：{first['away']['name']} vs {first['home']['name']}，"
                   f"共 {len(gs)} 場，首戰台灣時間 {tw:%m/%d %H:%M}")
    changed = write("dodgers.js", "DODGERS_GAMES", games)
    print(f"道奇 {season} 球季：{len(games)} 場{'（有更新）' if changed else '（沒有變化）'}")


# ── MLB 聯盟冠軍賽、世界大賽（不含道奇） ─────────────────────
def mlbpost():
    url = ("https://statsapi.mlb.com/api/v1/schedule?sportId=1"
           f"&season={season}&gameType=L,W&hydrate=venue")

    def side(t):
        return {"name": t["team"]["name"], "score": t.get("score"), "win": t.get("isWinner")}

    # 延賽的場次會在原日期留一筆 Postponed、新日期再出現一次（同一個 gamePk）→ 只留後面那筆
    by_id = {}
    for day in get(url)["dates"]:
        for g in day["games"]:
            if DODGERS_NAME in (g["teams"]["away"]["team"]["name"], g["teams"]["home"]["team"]["name"]):
                continue
            by_id[g["gamePk"]] = {
                "id": g["gamePk"],
                "utc": g["gameDate"],
                "tbd": g["status"].get("startTimeTBD", False),
                "type": g["gameType"],
                "state": g["status"]["detailedState"],
                "series": g.get("seriesDescription", ""),
                "seriesGame": g.get("seriesGameNumber"),
                "ifNec": g.get("ifNecessary") == "Y",
                "venue": g.get("venue", {}).get("name", ""),
                "away": side(g["teams"]["away"]),
                "home": side(g["teams"]["home"]),
            }
    games = sorted(by_id.values(), key=lambda g: g["utc"])

    # 對手未定時隊名是「TB/CLE」這種，變成正式隊名就是對戰確定；整個系列第一次出現也算
    old = load("mlbpost.js", "MLB_POST_GAMES")
    if old is not None:
        undecided = lambda g: "/" in g["away"]["name"] + g["home"]["name"]
        was = {g["id"]: g for g in old}
        hits = {}
        for g in games:
            o = was.get(g["id"])
            if not undecided(g) and (o is None or undecided(o)):
                hits.setdefault(g["series"], []).append(g)
        for series, gs in hits.items():
            first = gs[0]
            tw = datetime.datetime.fromisoformat(first["utc"].replace("Z", "+00:00")) + datetime.timedelta(hours=8)
            notify(f"⚾ MLB {series} 對戰確定：{first['away']['name']} vs {first['home']['name']}，"
                   f"首戰（G{first['seriesGame']}）台灣時間 {tw:%m/%d %H:%M}")
    changed = write("mlbpost.js", "MLB_POST_GAMES", games)
    print(f"MLB 聯盟冠軍賽／世界大賽 {season}（不含道奇）：{len(games)} 場{'（有更新）' if changed else '（沒有變化）'}")


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
    # 原本有 TBD 的場次，兩隊都確定了就通知
    old = {m["id"]: m for m in load("worlds.js", "WORLDS_MATCHES") or []}
    for m in matches:
        before = old.get(m["id"])
        codes = [t["code"] for t in m["teams"]]
        if before and "TBD" in [t["code"] for t in before["teams"]] and "TBD" not in codes:
            tw = datetime.datetime.fromisoformat(m["utc"].replace("Z", "+00:00")) + datetime.timedelta(hours=8)
            star = "⭐ " if {"T1", "CFO"} & set(codes) else ""
            notify(f"{star}🎮 世界賽{m['stage']}對戰確定：{codes[0]} vs {codes[1]}（BO{m['bo']}），"
                   f"台灣時間 {tw:%m/%d %H:%M}")
    changed = write("worlds.js", "WORLDS_MATCHES", matches)
    print(f"世界賽 {season}：{len(matches)} 場{'（有更新）' if changed else '（沒有變化）'}")


# ── 中華職棒台灣大賽 ────────────────────────────────────────
CPBL_TEAMS = {
    "AAA011": "味全龍", "ACN011": "中信兄弟", "ADD011": "統一獅",
    "AEO011": "富邦悍將", "AJL011": "樂天桃猿", "AKP011": "台鋼雄鷹",
}


def cpbl():
    # 官網要先 GET 頁面拿 cookie 與 RequestVerificationToken，再帶 X-Requested-With 去 POST
    url = "https://www.cpbl.com.tw/schedule"
    ua = "Mozilla/5.0"
    with tempfile.NamedTemporaryFile(suffix=".txt") as jar:
        page = subprocess.run(["curl", "-sfL", "-c", jar.name, "-b", jar.name, "-A", ua, url],
                              capture_output=True, check=True, text=True).stdout
        m = re.search(r"url: '/schedule/getgamedatas'.*?RequestVerificationToken: '([^']+)'", page, re.S)
        if not m:
            raise RuntimeError("中職官網頁面找不到 RequestVerificationToken，網站可能改版了")
        raw = subprocess.run(
            ["curl", "-sfL", "-c", jar.name, "-b", jar.name, "-A", ua,
             "-H", "X-Requested-With: XMLHttpRequest", "-H", f"RequestVerificationToken: {m.group(1)}",
             "--data", f"calendar={season}/01/01&location=&kindCode=C", f"{url}/getgamedatas"],
            capture_output=True, check=True, text=True).stdout
    res = json.loads(raw)
    if not res.get("Success"):
        raise RuntimeError(f"中職官網回傳失敗：{raw[:200]}")

    def state(g):
        # GameResult：0 已打完、1 延賽（會另有一筆補賽）、2 取消／保留；空字串為尚未開打
        if g["GameResult"] == "1":
            return "postponed"
        if g["GameResult"] == "2":
            return "cancelled"
        if g["GameResult"] == "0" and g["GameDateTimeE"]:
            return "final"
        return "scheduled"

    games = []
    for g in json.loads(res["GameDatas"]):
        tw = g["GameDateTimeS"] or g["PreExeDate"]
        done = state(g) == "final"
        games.append({
            "id": f"{g['KindCode']}{g['GameSno']}-{tw[:10]}",
            "tw": tw[:16],                     # 官網本來就是台灣時間
            "game": g["GameSno"],
            "state": state(g),
            "venue": g["FieldAbbe"],
            "away": {"name": CPBL_TEAMS.get(g["VisitingTeamCode"], g["VisitingTeamCode"]),
                     "score": g["VisitingScore"] if done else None},
            "home": {"name": CPBL_TEAMS.get(g["HomeTeamCode"], g["HomeTeamCode"]),
                     "score": g["HomeScore"] if done else None},
        })
    games.sort(key=lambda g: g["tw"])

    old = load("cpbl.js", "CPBL_GAMES")
    if old is not None:
        old_ids = {g["id"] for g in old}
        for g in games:
            if g["id"] not in old_ids:
                notify(f"⚾ 台灣大賽賽程新增：G{g['game']} {g['away']['name']} vs {g['home']['name']}，"
                       f"台灣時間 {g['tw'][5:10].replace('-', '/')} {g['tw'][11:]}")
    changed = write("cpbl.js", "CPBL_GAMES", games)
    print(f"台灣大賽 {season}：{len(games)} 場{'（有更新）' if changed else '（沒有變化）'}")


dodgers()
mlbpost()
worlds()
cpbl()
