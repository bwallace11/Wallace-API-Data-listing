console.log('👍 Criminal Analysis Platform — JS Connected');

// ── Killer list ───────────────────────────────────────────────
const KILLERS = [
  "Ted Bundy","Jeffrey Dahmer","John Wayne Gacy","Gary Ridgway",
  "Andrei Chikatilo","Pedro López","Harold Shipman","Aileen Wuornos",
  "Richard Ramirez","Edmund Kemper","Dennis Rader","Henry Lee Lucas",
  "Albert Fish","David Berkowitz","Samuel Little","Rodney Alcala",
  "H.H. Holmes","Robert Pickton","Dean Corll","Ed Gein",
  "Israel Keyes","Alexander Pichushkin","Paul Bernardo","Joachim Kroll",
  "Peter Sutcliffe","Ian Brady","Anatoly Onoprienko","Gary Heidnik",
  "Fred West","Arthur Shawcross","Wayne Williams","Lonnie Franklin Jr.",
  "Richard Cottingham","Randy Kraft","Robert Hansen","Joseph DeAngelo",
  "Charles Cullen","Marc Dutroux","Bruce McArthur","William Bonin",
  "Donald Gaskins","Angel Maturino Reséndiz","David Parker Ray",
  "Tsutomu Miyazaki","Mikhail Popkov","Pedro Rodrigues Filho",
  "Javed Iqbal","Jack the Ripper","Zodiac Killer","Boston Strangler"
];

// ── SVG Crime Scene Tape Placeholder ─────────────────────────
// Inline SVG — no external image needed
const NO_IMAGE_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220" style="width:100%;height:100%;position:absolute;top:0;left:0;">
  <defs>
    <pattern id="hatch" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
      <rect width="20" height="20" fill="#0d1117"/>
      <rect x="0" y="8" width="20" height="4" fill="#1a2436" opacity="0.6"/>
    </pattern>
  </defs>
  <!-- Background -->
  <rect width="400" height="220" fill="url(#hatch)"/>

  <!-- Crime scene tape stripe 1 -->
  <g transform="rotate(-8, 200, 80)">
    <rect x="-60" y="60" width="540" height="36" fill="#F59E0B"/>
    <text font-family="monospace" font-size="13" font-weight="bold" fill="#111827" letter-spacing="2">
      <tspan x="0" dy="0">
        <animate attributeName="x" from="-100" to="0" dur="0s" fill="freeze"/>
      </tspan>
    </text>
    <!-- Repeating tape text -->
    <text font-family="'Courier New', monospace" font-size="12" font-weight="900" fill="#111827" letter-spacing="3">
      <tspan x="-40" y="84">DO NOT CROSS · NO PICTURE ON FILE · DO NOT CROSS · NO PICTURE ON FILE · DO NOT CROSS ·</tspan>
    </text>
  </g>

  <!-- Crime scene tape stripe 2 -->
  <g transform="rotate(6, 200, 150)">
    <rect x="-60" y="128" width="540" height="36" fill="#F59E0B"/>
    <text font-family="'Courier New', monospace" font-size="12" font-weight="900" fill="#111827" letter-spacing="3">
      <tspan x="-20" y="152">· NO PICTURE ON FILE · DO NOT CROSS · NO PICTURE ON FILE · DO NOT CROSS · NO PICTURE</tspan>
    </text>
  </g>

  <!-- Icon: silhouette / file -->
  <circle cx="200" cy="105" r="28" fill="rgba(20,184,166,0.08)" stroke="rgba(20,184,166,0.25)" stroke-width="1.5"/>
  <text x="200" y="112" text-anchor="middle" font-size="22" fill="rgba(20,184,166,0.5)">?</text>

  <!-- Label at bottom -->
  <rect x="100" y="185" width="200" height="22" rx="4" fill="rgba(17,24,39,0.85)"/>
  <text x="200" y="200" text-anchor="middle" font-family="monospace" font-size="9" fill="#9CA3AF" letter-spacing="2">NO IMAGE ON FILE</text>
</svg>`;

// ── State ─────────────────────────────────────────────────────
let allData  = [];
let sortMode = 'victims';
let minVic   = 0;
let searchQ  = '';
let viewMode = 'grid';

// ── Helpers ───────────────────────────────────────────────────
function extractNumber(text) {
  if (!text) return null;
  const m = text.match(/\b(\d{1,4})\b/);
  return m ? parseInt(m[1], 10) : null;
}

function escHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function fetchKillerSummary(name) {
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
  );
  const d = await res.json();
  return {
    name,
    confirmed_victims: extractNumber(d.extract),
    image:            d.thumbnail?.source || null,
    description:      d.extract || 'No description available.',
    wikipedia_url:    d.content_urls?.desktop?.page || null,
  };
}

// ── Fetch Data ────────────────────────────────────────────────
async function loadData() {
  // Try local JSON first (if user has generated it)
  try {
    const local = await fetch('/serial_killers_with_local_images.json');
    if (local.ok) {
      allData = await local.json();
      console.log('✅ Loaded from local JSON');
      renderAll();
      updateStats();
      return;
    }
  } catch (_) {}

  // Fall back to live Wikipedia API in batches
  console.log('🌐 Fetching from Wikipedia API…');
  const BATCH = 6;
  for (let i = 0; i < KILLERS.length; i += BATCH) {
    const batch = KILLERS.slice(i, i + BATCH);
    const settled = await Promise.allSettled(batch.map(fetchKillerSummary));
    settled.forEach(r => { if (r.status === 'fulfilled') allData.push(r.value); });
    renderAll();
    updateStats();
    if (i + BATCH < KILLERS.length) await new Promise(r => setTimeout(r, 250));
  }
}

// ── Render ─────────────────────────────────────────────────────
function renderAll() {
  const container = document.getElementById('dataContainer');

  // Apply view class
  container.className = `dataContainer${viewMode === 'list' ? ' list-view' : ''}`;

  // Filter
  let filtered = allData.filter(k => {
    const vic       = k.confirmed_victims ?? 0;
    const matchName = k.name.toLowerCase().includes(searchQ.toLowerCase());
    return vic >= minVic && matchName;
  });

  // Sort
  if (sortMode === 'victims') {
    filtered.sort((a, b) => (b.confirmed_victims ?? 0) - (a.confirmed_victims ?? 0));
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Update visible count
  document.getElementById('visibleCount').textContent = filtered.length;

  if (filtered.length === 0 && allData.length > 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span style="font-size:2rem">🔍</span>
        <p>No cases match your filters.</p>
        <p style="font-size:0.75rem; color:var(--text-muted)">Try lowering the minimum kill count or clearing the search.</p>
      </div>`;
    return;
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="loading-state"><div class="loader-ring"></div><p>Retrieving case files…</p></div>`;
    return;
  }

  container.innerHTML = filtered.map((k, i) =>
    viewMode === 'list' ? buildListCard(k, i + 1) : buildGridCard(k, i + 1)
  ).join('');
}

// ── Grid Card ─────────────────────────────────────────────────
function buildGridCard(k, rank) {
  const vic     = k.confirmed_victims;
  const hasImg  = !!k.image;
  const imgSrc  = hasImg
    ? (k.image.startsWith('images/') ? `/${k.image}` : k.image)
    : null;

  const badgeClass = vic !== null ? 'victim-badge' : 'victim-badge unknown';
  const badgeNum   = vic !== null ? vic : '?';

  const imageContent = imgSrc
    ? `<img src="${imgSrc}" alt="${escHtml(k.name)}" loading="lazy" />`
    : NO_IMAGE_SVG;

  const wikiLink = k.wikipedia_url
    ? `<a href="${escHtml(k.wikipedia_url)}" target="_blank" rel="noopener noreferrer" class="wiki-link">WIKIPEDIA ↗</a>`
    : `<span></span>`;

  return `
    <article class="case-card">
      <figure class="card-figure">
        ${imageContent}
        <figcaption>
          <h2 class="card-name">${escHtml(k.name)}</h2>
          <div class="${badgeClass}">
            <span class="badge-num">${badgeNum}</span>
            <span class="badge-sub">victims</span>
          </div>
        </figcaption>
      </figure>
      <div class="card-body">
        <p class="card-desc">${escHtml(k.description)}</p>
        <div class="card-footer">
          <span class="card-rank">RANK #${rank}</span>
          ${wikiLink}
        </div>
      </div>
    </article>`;
}

// ── List Card ─────────────────────────────────────────────────
function buildListCard(k, rank) {
  const vic    = k.confirmed_victims;
  const hasImg = !!k.image;
  const imgSrc = hasImg
    ? (k.image.startsWith('images/') ? `/${k.image}` : k.image)
    : null;

  const badgeClass = vic !== null ? 'victim-badge' : 'victim-badge unknown';
  const badgeNum   = vic !== null ? vic : '?';

  const imageContent = imgSrc
    ? `<img src="${imgSrc}" alt="${escHtml(k.name)}" loading="lazy" />`
    : NO_IMAGE_SVG;

  const wikiLink = k.wikipedia_url
    ? `<a href="${escHtml(k.wikipedia_url)}" target="_blank" rel="noopener noreferrer" class="wiki-link">WIKI ↗</a>`
    : '';

  return `
    <article class="case-card">
      <figure class="card-figure">
        ${imageContent}
      </figure>
      <div class="card-body">
        <span class="card-name-list">${escHtml(k.name)}</span>
        <p class="card-desc">${escHtml(k.description)}</p>
        <div class="card-footer">
          <span class="card-rank">#${rank}</span>
          ${wikiLink}
          <div class="${badgeClass}">
            <span class="badge-num">${badgeNum}</span>
            <span class="badge-sub">victims</span>
          </div>
        </div>
      </div>
    </article>`;
}

// ── Stats ─────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('totalCount').textContent = allData.length;
  const total = allData.reduce((s, k) => s + (k.confirmed_victims ?? 0), 0);
  document.getElementById('totalVictims').textContent = total.toLocaleString();
}

// ── Controls wiring ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Sort buttons
  document.querySelectorAll('[data-sort]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-sort]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sortMode = btn.dataset.sort;
      renderAll();
    });
  });

  // View buttons
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-view]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      viewMode = btn.dataset.view;
      renderAll();
    });
  });

  // Search
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQ = e.target.value.trim();
    renderAll();
  });

  // ── Min kill count (number input) ──────────────────────────
  const minInput = document.getElementById('minVictimsInput');
  minInput.addEventListener('input', e => {
    const val = parseInt(e.target.value, 10);
    minVic = isNaN(val) || val < 0 ? 0 : val;
    renderAll();
  });

  // Also fire on Enter key
  minInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') minInput.blur();
  });

  // Start fetching
  loadData();
});
