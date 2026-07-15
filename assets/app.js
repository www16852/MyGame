/* 共用邏輯：所有頁面都載入這支檔，再呼叫對應的 render 函式 */

const DATA = window.GAMES_DATA || { games: [], news: [], lastUpdated: "" };

const TYPE_LABEL = {
  release:      "正式上市",
  early_access: "搶先體驗",
  demo:         "試玩 Demo",
  beta:         "測試",
  announcement: "情報"
};

function typeBadge(type) {
  const label = TYPE_LABEL[type] || "情報";
  const cls = TYPE_LABEL[type] ? type : "announcement";
  return `<span class="badge ${cls}">${label}</span>`;
}

function gameById(id) {
  return DATA.games.find(g => g.id === id);
}

/* 遊玩人數／模式顯示文字 */
function playersHtml(pc) {
  if (!pc) return "";
  return `<div class="player-stat">👥 <span>${escapeHtml(pc)}</span></div>`;
}

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* 在 header 標出目前頁面 */
function markActiveNav(page) {
  document.querySelectorAll("nav a").forEach(a => {
    if (a.dataset.page === page) a.classList.add("active");
  });
  const u = document.querySelector("[data-updated]");
  if (u && DATA.lastUpdated) u.textContent = "資料更新於 " + DATA.lastUpdated;
}

/* ── 時間軸頁 ─────────────────────────────── */
function renderTimeline() {
  const root = document.getElementById("timeline");
  // 攤平所有事件
  const items = [];
  DATA.games.forEach(g => {
    (g.events || []).forEach(ev => {
      items.push({ game: g, ev });
    });
  });
  items.sort((a, b) => (a.ev.sort || "9999").localeCompare(b.ev.sort || "9999"));

  if (!items.length) { root.innerHTML = `<p class="empty">目前沒有時程資料。</p>`; return; }

  let html = "", lastMonth = "";
  items.forEach(({ game, ev }) => {
    const month = (ev.sort || "9999-12").slice(0, 7);
    const monthLabel = month === "9999-12" ? "尚未定檔 (TBA)"
      : `${month.slice(0,4)} 年 ${parseInt(month.slice(5,7),10)} 月`;
    if (month !== lastMonth) {
      html += `<div class="tl-month">${monthLabel}</div>`;
      lastMonth = month;
    }
    html += `
      <div class="tl-item">
        <div class="tl-date">${escapeHtml(ev.date)}<br>${typeBadge(ev.type)}</div>
        <div class="tl-body">
          <div class="tl-title">${escapeHtml(game.name)}</div>
          <div class="tl-meta">${escapeHtml(game.genre || "")} · ${(game.platforms||[]).join(" / ")}</div>
          ${ev.note ? `<div class="tl-note">${escapeHtml(ev.note)}</div>` : ""}
        </div>
      </div>`;
  });
  root.innerHTML = html;
}

/* ── 遊戲導覽頁 ───────────────────────────── */
function renderGames() {
  const root = document.getElementById("games");
  if (!DATA.games.length) { root.innerHTML = `<p class="empty">尚未加入任何遊戲，請在 games.txt 填寫。</p>`; return; }

  root.innerHTML = DATA.games.map(g => {
    const events = (g.events || [])
      .slice()
      .sort((a,b)=>(a.sort||"9999").localeCompare(b.sort||"9999"))
      .map(ev => `<div class="ev">${typeBadge(ev.type)}<span class="when">${escapeHtml(ev.date)}</span></div>`)
      .join("");
    const chips = [g.developer, ...(g.platforms||[])].filter(Boolean)
      .map(c => `<span class="chip">${escapeHtml(c)}</span>`).join("");
    const links = [];
    if (g.links && g.links.steam) links.push(`<a href="${escapeHtml(g.links.steam)}" target="_blank" rel="noopener">Steam</a>`);
    if (g.links && g.links.official) links.push(`<a class="ghost" href="${escapeHtml(g.links.official)}" target="_blank" rel="noopener">官網</a>`);
    return `
      <div class="card">
        <div class="card-cover"><span class="gtype">${escapeHtml(g.genre || "遊戲")}</span></div>
        <div class="card-body">
          <h3>${escapeHtml(g.name)}</h3>
          ${g.nameEn ? `<div class="en">${escapeHtml(g.nameEn)}</div>` : ""}
          <div class="summary">${escapeHtml(g.summary || "")}</div>
          <div class="meta-row">${chips}</div>
          ${playersHtml(g.playerCount)}
          ${events ? `<div class="card-events">${events}</div>` : ""}
          ${links.length ? `<div class="card-links">${links.join("")}</div>` : ""}
        </div>
      </div>`;
  }).join("");
}

/* ── 最新情報頁 ───────────────────────────── */
function renderNews() {
  const root = document.getElementById("news");
  const list = (DATA.news || []).slice()
    .sort((a,b)=>(b.date||"").localeCompare(a.date||""));
  if (!list.length) { root.innerHTML = `<p class="empty">目前沒有最新情報。</p>`; return; }

  root.innerHTML = list.map(n => {
    const g = n.gameId ? gameById(n.gameId) : null;
    return `
      <div class="news-item">
        <div class="nh">
          <span class="ndate">${escapeHtml(n.date)}</span>
          <h3>${escapeHtml(n.title)}</h3>
          ${g ? `<span class="ngame">關於：${escapeHtml(g.name)}</span>` : ""}
        </div>
        <p>${escapeHtml(n.body)}</p>
      </div>`;
  }).join("");
}

/* ── 新品推薦頁 ───────────────────────────── */
function renderDiscover() {
  const root = document.getElementById("discover");

  // 頁首顯示目前關注的類型
  const interests = DATA.interests || [];
  const head = document.querySelector("[data-interests]");
  if (head) {
    head.innerHTML = interests.length
      ? "關注類型：" + interests.map(t => `<span class="chip">${escapeHtml(t)}</span>`).join("")
      : "";
  }

  const list = (DATA.discover || []).slice()
    .sort((a, b) => (b.sort || "").localeCompare(a.sort || ""));  // 新的在前
  if (!list.length) {
    root.innerHTML = `<p class="empty">關注的類型目前還沒有符合的好評新品，AI 會持續留意。</p>`;
    return;
  }

  root.innerHTML = list.map(d => {
    const chips = [d.developer, ...(d.platforms || [])].filter(Boolean)
      .map(c => `<span class="chip">${escapeHtml(c)}</span>`).join("");
    const links = [];
    if (d.links && d.links.steam) links.push(`<a href="${escapeHtml(d.links.steam)}" target="_blank" rel="noopener">Steam</a>`);
    if (d.links && d.links.official) links.push(`<a class="ghost" href="${escapeHtml(d.links.official)}" target="_blank" rel="noopener">官網</a>`);
    return `
      <div class="card">
        <div class="card-cover disc">
          <span class="gtype">${escapeHtml(d.genre || "遊戲")}</span>
          ${d.interest ? `<span class="interest-tag">${escapeHtml(d.interest)}</span>` : ""}
        </div>
        <div class="card-body">
          <h3>${escapeHtml(d.name)}</h3>
          ${d.nameEn ? `<div class="en">${escapeHtml(d.nameEn)}</div>` : ""}
          ${d.rating ? `<div class="rating">⭐ ${escapeHtml(d.rating)}</div>` : ""}
          ${d.reason ? `<div class="summary">${escapeHtml(d.reason)}</div>` : ""}
          <div class="meta-row">${chips}</div>
          ${playersHtml(d.playerCount)}
          ${d.released ? `<div class="card-events"><div class="ev">${typeBadge("early_access")}<span class="when">${escapeHtml(d.released)}</span></div></div>` : ""}
          ${links.length ? `<div class="card-links">${links.join("")}</div>` : ""}
        </div>
      </div>`;
  }).join("");
}
