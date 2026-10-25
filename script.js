/* ═══════════════════════════════════════════
   MINX — Live Server Status & Stats
   ═══════════════════════════════════════════ */

const SERVER_HOST = 'wohixtkjsylk3md2.myfritz.net';

/* ─── Server Status via mcsrvstat.us ─── */

async function checkServerStatus() {
  const dot = document.getElementById('status-dot');
  const label = document.getElementById('status-label');
  const players = document.getElementById('status-players');

  if (!dot) return;

  try {
    const resp = await fetch(`https://api.mcsrvstat.us/2/${SERVER_HOST}`, {
      signal: AbortSignal.timeout?.(8000) ?? undefined
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();

    if (data.online) {
      dot.className = 'dot online';
      label.textContent = 'Online';
      if (players) {
        const count = data.players?.online ?? 0;
        const max   = data.players?.max   ?? '?';
        players.textContent = `${count} / ${max} Spieler`;
      }
    } else {
      dot.className = 'dot offline';
      label.textContent = 'Offline';
      if (players) players.textContent = '—';
    }
  } catch {
    dot.className = 'dot offline';
    label.textContent = 'Nicht erreichbar';
    if (players) players.textContent = '—';
  }
}

/* ─── Stat Counter Animation ─── */

function animateCounter(el, target, suffix = '') {
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    // ease-out quad
    const val = Math.floor(target * (1 - (1 - t) * (1 - t)));
    el.textContent = val.toLocaleString('de') + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ─── Death Stats Data (embedded, live-updatable) ─── */

const DEATH_STATS = {
  totalDeaths: 630,
  totalItemsLost: 630,
  topPlayers: [
    { name: 'TheRealDmseife',  deaths: 222 },
    { name: 'BobBobinson007', deaths: 152 },
    { name: 'LuisCrafter92',  deaths: 123 },
    { name: 'Captifipo',      deaths: 72 },
    { name: 'WerferHades19',  deaths: 24 },
    { name: '1carlito',       deaths: 20 },
    { name: 'PaladinEnzym661', deaths: 17 }
  ],
  recentDeaths: [
    { player: 'LuisCrafter92',  item: 'diamond_spear ×1',       coords: '3037/93/-3890', time: '2026-10-23 22:30' },
    { player: 'LuisCrafter92',  item: 'diamond_helmet ×1',      coords: '2030/118/-2513', time: '2026-10-23 22:25' },
    { player: 'LuisCrafter92',  item: 'diamond_spear ×1',       coords: '2018/114/-2546', time: '2026-10-23 22:20' },
    { player: 'PaladinEnzym661', item: 'cooked_cod ×1',         coords: '1167/217/-170', time: '2026-10-23 22:15' },
    { player: 'Captifipo',      item: 'firework_rocket ×1',     coords: '1168/205/-166', time: '2026-10-23 22:10' },
    { player: 'LuisCrafter92',  item: 'firework_rocket ×1',     coords: '1168/205/-166', time: '2026-10-23 22:05' },
    { player: 'TheRealDmseife', item: 'diamond ×1',             coords: '1168/205/-166', time: '2026-10-23 22:00' },
    { player: 'TheRealDmseife', item: 'totem_of_undying ×1',    coords: '-381/63/-143',  time: '2026-10-23 22:01' }
  ]
};

function initDeathStats() {
  const totalEl = document.getElementById('death-total');
  if (totalEl) animateCounter(totalEl, DEATH_STATS.totalDeaths, '');

  const list = document.getElementById('death-leaderboard');
  if (list) {
    list.innerHTML = '';
    DEATH_STATS.topPlayers.forEach((p, i) => {
      const li = document.createElement('li');
      const rank = document.createElement('span');
      rank.className = 'rank' + (i === 0 ? ' gold' : i === 1 ? ' silver' : i === 2 ? ' bronze' : '');
      const name = document.createElement('span');
      name.className = 'name';
      name.textContent = p.name;
      const score = document.createElement('span');
      score.className = 'score';
      score.textContent = p.deaths + ' Verluste';
      li.appendChild(rank);
      li.appendChild(name);
      li.appendChild(score);
      list.appendChild(li);
    });
  }

  const recentEl = document.getElementById('recent-deaths');
  if (recentEl) {
    // recent is static HTML in stats.html
  }
}

/* ─── Skin Data ─── */

const SKINS = [
  { name: 'Nether Knight',   file: 'nether-knight.png' },
  { name: 'Deep Diver',      file: 'deep-diver.png' },
  { name: 'Obsidian Guard',  file: 'obsidian-guard.png' },
  { name: 'Ender Scout',     file: 'ender-scout.png' },
  { name: 'Void Walker',     file: 'void-walker.png' },
  { name: 'Crystal Mage',    file: 'crystal-mage.png' },
  { name: 'Iron Forge',      file: 'iron-forge.png' },
  { name: 'Shadow Rogue',    file: 'shadow-rogue.png' },
  { name: 'Bone Warden',     file: 'bone-warden.png' },
  { name: 'Ember Champion',  file: 'ember-champion.png' },
  { name: 'Frost Sentinel',  file: 'frost-sentinel.png' },
  { name: 'Storm Bringer',   file: 'storm-bringer.png' }
];

/* ─── Init ─── */

document.addEventListener('DOMContentLoaded', () => {
  checkServerStatus();
  initDeathStats();

  // Refresh server status every 120s
  setInterval(checkServerStatus, 120_000);
});