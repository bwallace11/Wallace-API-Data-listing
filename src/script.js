console.log('👍 Criminal Case Archive — JS Connected');

// ── Killer list — removed those with no usable Wikipedia data ──
// (Javed Iqbal, Pedro López, Boston Strangler unresolved, etc.)
const KILLERS = [
  "Ted Bundy",
  "Jeffrey Dahmer",
  "John Wayne Gacy",
  "Gary Ridgway",
  "Andrei Chikatilo",
  "Harold Shipman",
  "Aileen Wuornos",
  "Richard Ramirez",
  "Edmund Kemper",
  "Dennis Rader",
  "Albert Fish",
  "David Berkowitz",
  "Samuel Little",
  "Rodney Alcala",
  "H.H. Holmes",
  "Robert Pickton",
  "Dean Corll",
  "Ed Gein",
  "Alexander Pichushkin",
  "Paul Bernardo",
  "Joachim Kroll",
  "Peter Sutcliffe",
  "Ian Brady",
  "Anatoly Onoprienko",
  "Gary Heidnik",
  "Fred West",
  "Arthur Shawcross",
  "Wayne Williams",
  "Richard Cottingham",
  "Randy Kraft",
  "Robert Hansen",
  "Joseph DeAngelo",
  "Charles Cullen",
  "Marc Dutroux",
  "Bruce McArthur",
  "William Bonin",
  "Donald Gaskins",
  "David Parker Ray",
  "Tsutomu Miyazaki",
  "Mikhail Popkov",
  "Jack the Ripper",
  "Zodiac Killer",
];

// ── SVG Crime Scene Tape Placeholder ─────────────────────────
const NO_IMAGE_SVG = `
<div class="no-image-placeholder">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 200">
    <rect width="360" height="200" fill="#E0DDD7"/>
    <!-- diagonal hatching -->
    <defs>
      <pattern id="diag" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
        <rect width="24" height="24" fill="#E0DDD7"/>
        <rect y="10" width="24" height="4" fill="#D4D0CA"/>
      </pattern>
    </defs>
    <rect width="360" height="200" fill="url(#diag)"/>
    <!-- tape band 1 -->
    <g transform="rotate(-6,180,80)">
      <rect x="-40" y="55" width="460" height="32" fill="#C9B458"/>
      <text font-family="'Courier New',monospace" font-size="10" font-weight="900" fill="#1E1E1E" letter-spacing="3" y="76" x="-20">
        DO NOT CROSS · NO PICTURE ON FILE · DO NOT CROSS · NO PICTURE ON FILE ·
      </text>
    </g>
    <!-- tape band 2 -->
    <g transform="rotate(5,180,140)">
      <rect x="-40" y="120" width="460" height="32" fill="#C9B458"/>
      <text font-family="'Courier New',monospace" font-size="10" font-weight="900" fill="#1E1E1E" letter-spacing="3" y="141" x="-20">
        · NO PICTURE ON FILE · DO NOT CROSS · NO PICTURE ON FILE · DO NOT CROSS
      </text>
    </g>
    <!-- label -->
    <rect x="120" y="172" width="120" height="18" rx="2" fill="rgba(30,30,30,0.75)"/>
    <text x="180" y="185" text-anchor="middle" font-family="monospace" font-size="8" fill="#9CA3AF" letter-spacing="2">NO IMAGE ON FILE</text>
  </svg>
</div>`;

// ── State ─────────────────────────────────────────────────────
let allData  = [];
let sortMode = 'name';
let searchQ  = '';
let letterQ  = 'ALL';
let viewMode = 'grid';

// ── Victim count extraction ───────────────────────────────────
// Looks for patterns like "killed X", "murdered X", "X victims", "at least X"
// Avoids matching years (4-digit numbers 1800–2099)
function extractVictimCount(text) {
  if (!text) return null;

  // Specific victim-count phrases (high confidence)
  const patterns = [
    /(?:killed|murdered|claimed|confessed to|convicted of(?:\s+killing)?|responsible for)(?:\s+at\s+least)?\s+(\d{1,3})\s+(?:people|women|men|children|victims|people)/i,
    /(\d{1,3})\s+(?:confirmed\s+)?(?:murders?|victims?|homicides?|killings?)/i,
    /(?:at\s+least|more\s+than)\s+(\d{1,3})\s+(?:people|victims?|murders?)/i,
  ];

  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) {
      const n = parseInt(m[1], 10);
      // sanity check: 1–999
      if (n >= 1 && n <= 999) return n;
    }
  }
  return null;
}

// ── Active years extraction ───────────────────────────────────
function extractYears(text) {
  if (!text) return null;

  // "active from 1974 to 1978" or "between 1974 and 1978"
  const range = text.match(/(?:from|between|active)\s+(1[89]\d{2}|20[012]\d)\s+(?:to|and|until|–|-)\s+(1[89]\d{2}|20[012]\d)/i);
  if (range) return `${range[1]}–${range[2]}`;

  // "operated between 1974–1978"
  const dash = text.match(/(1[89]\d{2})\s*[–\-]\s*(1[89]\d{2}|20[012]\d)/);
  if (dash) return `${dash[1]}–${dash[2]}`;

  // single year mentioned prominently
  const single = text.match(/in\s+(1[89]\d{2}|20[012]\d)/i);
  if (single) return single[1];

  return null;
}

// ── Fetch helpers ─────────────────────────────────────────────
function escHtml(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

async function fetchKiller(name) {
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
  );
  const d = await res.json();

  // Skip if Wikipedia gives us nothing useful (disambiguation, missing, etc.)
  if (!d.extract || d.type === 'disambiguation' || d.extract.length < 80) return null;

  return {
    name,
    victims:      extractVictimCount(d.extract),
    years_active: extractYears(d.extract),
    image:        d.thumbnail?.source || null,
    description:  d.extract,
    wikipedia_url: d.content_urls?.desktop?.page || null,
  };
}

// ── Load ──────────────────────────────────────────────────────
async function loadData() {
  // Try local JSON first
  try {
    const local = await fetch('/serial_killers_with_local_images.json');
    if (local.ok) {
      const json = await local.json();
      // Re-extract victims with better parser; keep structure compatible
      allData = json.map(k => ({
        name:         k.name,
        victims:      extractVictimCount(k.description) ?? (k.confirmed_victims ?? null),
        years_active: extractYears(k.description),
        image:        k.image,
        description:  k.description,
        wikipedia_url: k.wikipedia_url,
      })).filter(k => k.description && k.description.length > 60);
      renderAll(); updateStats();
      return;
    }
  } catch (_) {}

  // Wikipedia API batches
  const BATCH = 5;
  for (let i = 0; i < KILLERS.length; i += BATCH) {
    const batch   = KILLERS.slice(i, i + BATCH);
    const settled = await Promise.allSettled(batch.map(fetchKiller));
    settled.forEach(r => {
      if (r.status === 'fulfilled' && r.value) allData.push(r.value);
    });
    renderAll(); updateStats();
    if (i + BATCH < KILLERS.length) await new Promise(r => setTimeout(r, 250));
  }
}

// ── Render ─────────────────────────────────────────────────────
function renderAll() {
  const container = document.getElementById('dataContainer');
  container.className = `dataContainer${viewMode === 'list' ? ' list-view' : ''}`;

  let data = [...allData];

  // A–Z letter filter
  if (letterQ !== 'ALL') {
    data = data.filter(k => k.name.trim().toUpperCase().startsWith(letterQ));
  }

  // Search filter
  if (searchQ) {
    data = data.filter(k => k.name.toLowerCase().includes(searchQ.toLowerCase()));
  }

  // Sort
  if (sortMode === 'victims') {
    data.sort((a, b) => (b.victims ?? 0) - (a.victims ?? 0));
  } else {
    // Sort by last name
    const lastName = n => n.trim().split(/\s+/).pop().toLowerCase();
    data.sort((a, b) => lastName(a.name).localeCompare(lastName(b.name)));
  }

  document.getElementById('visibleCount').textContent = data.length;

  if (!data.length && allData.length > 0) {
    container.innerHTML = `<div class="empty-state"><p>No cases match your filters.</p></div>`;
    return;
  }
  if (!data.length) {
    container.innerHTML = `<div class="loading-state"><div class="loader-ring"></div><p>Retrieving case files…</p></div>`;
    return;
  }

  container.innerHTML = data.map(k =>
    viewMode === 'list' ? buildListCard(k) : buildGridCard(k)
  ).join('');
}

// ── Grid Card ─────────────────────────────────────────────────
function buildGridCard(k) {
  const imgContent = k.image
    ? `<img src="${escHtml(k.image.startsWith('images/') ? '/'+k.image : k.image)}" alt="${escHtml(k.name)}" loading="lazy" />`
    : NO_IMAGE_SVG;

  const badgeCls = k.victims !== null ? 'victim-badge' : 'victim-badge unknown';
  const badgeNum = k.victims !== null ? k.victims : '?';

  const yearsHtml = k.years_active
    ? `<div class="card-years"><span class="years-label">ACTIVE</span><span class="years-val">${escHtml(k.years_active)}</span></div>`
    : '';

  const wikiHtml = k.wikipedia_url
    ? `<a href="${escHtml(k.wikipedia_url)}" target="_blank" rel="noopener noreferrer" class="wiki-link">WIKIPEDIA ↗</a>`
    : '';

  return `
    <article class="case-card">
      <figure class="card-figure">${imgContent}</figure>
      <div class="card-body">
        <div class="card-header-row">
          <h2 class="card-name">${escHtml(k.name)}</h2>
          <div class="${badgeCls}">
            <span class="badge-num">${badgeNum}</span>
            <span class="badge-sub">Victims</span>
          </div>
        </div>
        ${yearsHtml}
        <p class="card-desc">${escHtml(k.description)}</p>
        <div class="card-footer">${wikiHtml}</div>
      </div>
    </article>`;
}

// ── List Card ─────────────────────────────────────────────────
function buildListCard(k) {
  const imgContent = k.image
    ? `<img src="${escHtml(k.image.startsWith('images/') ? '/'+k.image : k.image)}" alt="${escHtml(k.name)}" loading="lazy" />`
    : NO_IMAGE_SVG;

  const badgeCls = k.victims !== null ? 'victim-badge' : 'victim-badge unknown';
  const badgeNum = k.victims !== null ? k.victims : '?';

  const yearsHtml = k.years_active
    ? `<div class="card-years"><span class="years-label">ACTIVE</span> <span class="years-val">${escHtml(k.years_active)}</span></div>`
    : '';

  const wikiHtml = k.wikipedia_url
    ? `<a href="${escHtml(k.wikipedia_url)}" target="_blank" rel="noopener noreferrer" class="wiki-link">WIKI ↗</a>`
    : '';

  return `
    <article class="case-card">
      <figure class="card-figure">${imgContent}</figure>
      <div class="card-body">
        <div class="card-header-row">
          <h2 class="card-name">${escHtml(k.name)}</h2>
          ${yearsHtml}
        </div>
        <p class="card-desc">${escHtml(k.description)}</p>
        <div class="card-footer">
          ${wikiHtml}
          <div class="${badgeCls}">
            <span class="badge-num">${badgeNum}</span>
            <span class="badge-sub">Victims</span>
          </div>
        </div>
      </div>
    </article>`;
}

// ── Stats ─────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('totalCount').textContent = allData.length;
  const tv = allData.reduce((s, k) => s + (k.victims ?? 0), 0);
  document.getElementById('totalVictims').textContent = tv.toLocaleString();
}

// ── Wire controls ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // A–Z buttons
  document.querySelectorAll('.az-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.az-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      letterQ = btn.dataset.letter;
      renderAll();
    });
  });

  // Sort
  document.querySelectorAll('[data-sort]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-sort]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sortMode = btn.dataset.sort;
      renderAll();
    });
  });

  // View toggle
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

  loadData();
});
