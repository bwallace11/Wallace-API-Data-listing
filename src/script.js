console.log('👍 CASE ARCHIVE — JS Connected');

// ── STATIC OVERRIDES ──────────────────────────────────────────
// These records have hand-curated data that will merge/override Wikipedia
const STATIC_RECORDS = {
  "Dennis Nilsen": {
    name:               "Dennis Nilsen",
    nickname:           "The Muswell Hill Murderer",
    country:            "United Kingdom",
    years_active:       "1978–1983",
    confirmed_victims:  15,
    method:             "Strangulation, drowning",
    description:        "Scottish serial killer who murdered young men in London. He kept victims' bodies in his home before disposing of them.",
    wikipedia_url:      "https://en.wikipedia.org/wiki/Dennis_Nilsen",
    image:              "https://upload.wikimedia.org/wikipedia/en/5/5b/Dennis_Nilsen_police_photo.jpg",
    status:             "DECEASED", // died in prison 2018
    death_date:         "2018",
  },
  "Peter Kürten": {
    name:               "Peter Kürten",
    nickname:           "The Vampire of Düsseldorf",
    country:            "Germany",
    years_active:       "1913–1930",
    confirmed_victims:  9,
    method:             "Stabbing, strangulation",
    description:        "German serial killer active primarily in Düsseldorf. He committed multiple murders and assaults and was executed in 1931.",
    wikipedia_url:      "https://en.wikipedia.org/wiki/Peter_K%C3%BCrten",
    image:              "https://upload.wikimedia.org/wikipedia/commons/4/45/Peter_K%C3%BCrten.jpg",
    status:             "EXECUTED",
    death_date:         "1931",
  },
};

// ── KILLER LIST ───────────────────────────────────────────────
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
  // Static-only additions:
  "Dennis Nilsen",
  "Peter Kürten",
];

// ── STATUS LOOKUP ─────────────────────────────────────────────
// Based on known facts; Wikipedia extract will confirm/supplement
const KNOWN_STATUS = {
  "Ted Bundy":            { status: "EXECUTED",     death_date: "1989" },
  "Jeffrey Dahmer":       { status: "DECEASED",     death_date: "1994" },
  "John Wayne Gacy":      { status: "EXECUTED",     death_date: "1994" },
  "Gary Ridgway":         { status: "IN PRISON" },
  "Andrei Chikatilo":     { status: "EXECUTED",     death_date: "1994" },
  "Harold Shipman":       { status: "DECEASED",     death_date: "2004" },
  "Aileen Wuornos":       { status: "EXECUTED",     death_date: "2002" },
  "Richard Ramirez":      { status: "DECEASED",     death_date: "2013" },
  "Edmund Kemper":        { status: "IN PRISON" },
  "Dennis Rader":         { status: "IN PRISON" },
  "Albert Fish":          { status: "EXECUTED",     death_date: "1936" },
  "David Berkowitz":      { status: "IN PRISON" },
  "Samuel Little":        { status: "DECEASED",     death_date: "2020" },
  "Rodney Alcala":        { status: "DECEASED",     death_date: "2021" },
  "H.H. Holmes":          { status: "EXECUTED",     death_date: "1896" },
  "Robert Pickton":       { status: "IN PRISON" },
  "Dean Corll":           { status: "DECEASED",     death_date: "1973" },
  "Ed Gein":              { status: "DECEASED",     death_date: "1984" },
  "Alexander Pichushkin": { status: "IN PRISON" },
  "Paul Bernardo":        { status: "IN PRISON" },
  "Joachim Kroll":        { status: "DECEASED",     death_date: "1991" },
  "Peter Sutcliffe":      { status: "DECEASED",     death_date: "2020" },
  "Ian Brady":            { status: "DECEASED",     death_date: "2017" },
  "Anatoly Onoprienko":   { status: "DECEASED",     death_date: "2013" },
  "Gary Heidnik":         { status: "EXECUTED",     death_date: "1999" },
  "Fred West":            { status: "DECEASED",     death_date: "1995" },
  "Arthur Shawcross":     { status: "DECEASED",     death_date: "2008" },
  "Wayne Williams":       { status: "IN PRISON" },
  "Richard Cottingham":   { status: "IN PRISON" },
  "Randy Kraft":          { status: "IN PRISON" },
  "Robert Hansen":        { status: "DECEASED",     death_date: "2014" },
  "Joseph DeAngelo":      { status: "IN PRISON" },
  "Charles Cullen":       { status: "IN PRISON" },
  "Marc Dutroux":         { status: "IN PRISON" },
  "Bruce McArthur":       { status: "IN PRISON" },
  "William Bonin":        { status: "EXECUTED",     death_date: "1996" },
  "Donald Gaskins":       { status: "EXECUTED",     death_date: "1991" },
  "David Parker Ray":     { status: "DECEASED",     death_date: "2002" },
  "Tsutomu Miyazaki":     { status: "EXECUTED",     death_date: "2008" },
  "Mikhail Popkov":       { status: "IN PRISON" },
  "Jack the Ripper":      { status: "UNIDENTIFIED" },
  "Zodiac Killer":        { status: "UNIDENTIFIED" },
  "Dennis Nilsen":        { status: "DECEASED",     death_date: "2018" },
  "Peter Kürten":         { status: "EXECUTED",     death_date: "1931" },
};

// ── HELPERS ───────────────────────────────────────────────────
function escHtml(s) {
  return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function extractVictimCount(text) {
  if (!text) return null;
  const patterns = [
    /(?:killed|murdered|claimed|confessed to|convicted of(?:\s+killing)?|responsible for)(?:\s+at\s+least)?\s+(\d{1,3})\s+(?:people|women|men|children|victims?)/i,
    /(\d{1,3})\s+(?:confirmed\s+)?(?:murders?|victims?|homicides?|killings?)/i,
    /(?:at\s+least|more\s+than)\s+(\d{1,3})\s+(?:people|victims?|murders?)/i,
  ];
  for (const p of patterns) {
    const m = text.match(p);
    if (m) { const n = parseInt(m[1], 10); if (n >= 1 && n <= 999) return n; }
  }
  return null;
}

function extractYears(text) {
  if (!text) return null;
  const range = text.match(/(?:from|between|active)\s+(1[89]\d{2}|20[012]\d)\s+(?:to|and|until|–|-)\s+(1[89]\d{2}|20[012]\d)/i);
  if (range) return `${range[1]}–${range[2]}`;
  const dash = text.match(/(1[89]\d{2})\s*[–\-]\s*(1[89]\d{2}|20[012]\d)/);
  if (dash) return `${dash[1]}–${dash[2]}`;
  return null;
}

function extractCountry(text) {
  const countries = [
    'American','British','Canadian','German','Russian','Australian',
    'French','Italian','Scottish','English','Ukrainian','Colombian',
    'Pakistani','Belgian','Japanese','South African'
  ];
  for (const c of countries) {
    if (text.includes(c)) return c;
  }
  return null;
}

function extractNickname(text) {
  // Looks for patterns like "known as "The X"" or "nicknamed "X""
  const m = text.match(/(?:known as|nicknamed?|called)\s+[""]([^"""]+)["""]/i);
  return m ? m[1] : null;
}

function extractMethod(text) {
  const methods = [
    ['Strangulation', /strangl/i],
    ['Shooting',      /shot|shoot|firearm|gun/i],
    ['Stabbing',      /stabb|knife|bludgeon/i],
    ['Drowning',      /drown/i],
    ['Poisoning',     /poison/i],
    ['Hanging',       /hang/i],
  ];
  const found = [];
  for (const [label, re] of methods) {
    if (re.test(text) && found.length < 2) found.push(label);
  }
  return found.length ? found.join(', ') : null;
}

// ── STATE ─────────────────────────────────────────────────────
let allData    = [];
let sortMode   = 'name';
let searchQ    = '';
let letterQ    = 'ALL';
let statusQ    = 'ALL';
let viewMode   = 'grid';
let caseIndex  = 0;

// ── FETCH ─────────────────────────────────────────────────────
async function fetchKiller(name) {
  // If we have a fully static record, skip the API call
  if (STATIC_RECORDS[name] && STATIC_RECORDS[name].image) {
    const s = STATIC_RECORDS[name];
    const st = KNOWN_STATUS[name] || {};
    return { ...s, status: st.status || s.status || 'UNKNOWN', death_date: st.death_date || s.death_date || null };
  }

  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
  );
  const d = await res.json();
  if (!d.extract || d.type === 'disambiguation' || d.extract.length < 80) return null;

  const st = KNOWN_STATUS[name] || {};
  const override = STATIC_RECORDS[name] || {};

  return {
    name:         override.name    || name,
    nickname:     override.nickname || extractNickname(d.extract),
    country:      override.country  || extractCountry(d.extract),
    years_active: override.years_active || extractYears(d.extract),
    confirmed_victims: override.confirmed_victims || extractVictimCount(d.extract),
    method:       override.method  || extractMethod(d.extract),
    image:        override.image   || d.thumbnail?.source || null,
    description:  override.description || d.extract,
    wikipedia_url: override.wikipedia_url || d.content_urls?.desktop?.page || null,
    status:       st.status   || override.status || 'UNKNOWN',
    death_date:   st.death_date || override.death_date || null,
  };
}

async function loadData() {
  try {
    const local = await fetch('/serial_killers_with_local_images.json');
    if (local.ok) {
      const json = await local.json();
      allData = json.map(k => {
        const st = KNOWN_STATUS[k.name] || {};
        const or = STATIC_RECORDS[k.name] || {};
        return {
          name: k.name,
          nickname: or.nickname || extractNickname(k.description),
          country:  or.country  || extractCountry(k.description),
          years_active: or.years_active || k.years_active || extractYears(k.description),
          confirmed_victims: or.confirmed_victims || extractVictimCount(k.description) || k.confirmed_victims,
          method:   or.method  || extractMethod(k.description),
          image:    or.image   || (k.image?.startsWith('images/') ? '/'+k.image : k.image),
          description: or.description || k.description,
          wikipedia_url: or.wikipedia_url || k.wikipedia_url,
          status:    st.status   || or.status || 'UNKNOWN',
          death_date: st.death_date || or.death_date || null,
        };
      }).filter(k => k.description && k.description.length > 60);
      // Add static-only records not in local JSON
      for (const [name, rec] of Object.entries(STATIC_RECORDS)) {
        if (!allData.find(k => k.name === name)) {
          const st = KNOWN_STATUS[name] || {};
          allData.push({ ...rec, status: st.status || rec.status || 'UNKNOWN', death_date: st.death_date || rec.death_date });
        }
      }
      renderAll(); updateStats();
      return;
    }
  } catch (_) {}

  // Wikipedia API batches
  const BATCH = 5;
  for (let i = 0; i < KILLERS.length; i += BATCH) {
    const settled = await Promise.allSettled(KILLERS.slice(i, i + BATCH).map(fetchKiller));
    settled.forEach(r => { if (r.status === 'fulfilled' && r.value) allData.push(r.value); });
    renderAll(); updateStats();
    if (i + BATCH < KILLERS.length) await new Promise(r => setTimeout(r, 250));
  }
}

// ── RENDER ─────────────────────────────────────────────────────
function renderAll() {
  const container = document.getElementById('dataContainer');
  container.className = `dataContainer${viewMode === 'list' ? ' list-view' : ''}`;

  let data = [...allData];

  if (letterQ !== 'ALL') {
    const lastName = n => n.trim().split(/\s+/).pop().toUpperCase();
    data = data.filter(k => lastName(k.name).startsWith(letterQ));
  }
  if (statusQ !== 'ALL') {
    data = data.filter(k => k.status === statusQ);
  }
  if (searchQ) {
    data = data.filter(k => k.name.toLowerCase().includes(searchQ.toLowerCase()));
  }

  if (sortMode === 'victims') {
    data.sort((a, b) => (b.confirmed_victims ?? 0) - (a.confirmed_victims ?? 0));
  } else {
    const ln = n => n.trim().split(/\s+/).pop().toLowerCase();
    data.sort((a, b) => ln(a.name).localeCompare(ln(b.name)));
  }

  document.getElementById('visibleCount').textContent = data.length;
  document.getElementById('footerCount').textContent = `${data.length} RECORDS DISPLAYED`;

  if (!data.length && allData.length > 0) {
    container.innerHTML = `<div class="empty-state"><p>NO CASES MATCH FILTERS</p></div>`;
    return;
  }
  if (!data.length) {
    container.innerHTML = `<div class="loading-state"><div class="loader-bar"><div class="loader-fill"></div></div><p>RETRIEVING CASE FILES</p></div>`;
    return;
  }

  container.innerHTML = data.map((k, i) =>
    viewMode === 'list' ? buildListCard(k, i + 1) : buildGridCard(k, i + 1)
  ).join('');
}

// ── STATUS TAG HTML ───────────────────────────────────────────
function statusTagHtml(k) {
  const s = k.status || 'UNKNOWN';
  let cls = '';
  let label = s;

  if (s === 'EXECUTED') {
    cls = 'status-executed';
    label = k.death_date ? `EXECUTED ${k.death_date}` : 'EXECUTED';
  } else if (s === 'IN PRISON') {
    cls = 'status-prison';
    label = 'IN PRISON';
  } else if (s === 'DECEASED') {
    cls = 'status-deceased';
    label = k.death_date ? `DECEASED ${k.death_date}` : 'DECEASED';
  } else if (s === 'UNIDENTIFIED') {
    cls = 'status-unidentified';
    label = 'UNIDENTIFIED';
  }

  return `<span class="tag ${cls}">${escHtml(label)}</span>`;
}

// ── GRID CARD ─────────────────────────────────────────────────
function buildGridCard(k, rank) {
  const imgHtml = k.image
    ? `<img src="${escHtml(k.image)}" alt="${escHtml(k.name)}" loading="lazy" />`
    : noImgSvg();

  const nicknameHtml = k.nickname
    ? `<p class="card-nickname">"${escHtml(k.nickname)}"</p>` : '';

  const metaRows = [
    k.years_active ? `<div class="card-meta-row"><span class="meta-key">ACTIVE</span><span class="meta-val">${escHtml(k.years_active)}</span></div>` : '',
    k.country      ? `<div class="card-meta-row"><span class="meta-key">COUNTRY</span><span class="meta-val">${escHtml(k.country)}</span></div>` : '',
    k.method       ? `<div class="card-meta-row"><span class="meta-key">METHOD</span><span class="meta-val">${escHtml(k.method)}</span></div>` : '',
    k.confirmed_victims != null ? `<div class="card-meta-row"><span class="meta-key">VICTIMS</span><span class="meta-val">${k.confirmed_victims}</span></div>` : '',
  ].filter(Boolean).join('');

  const wikiHtml = k.wikipedia_url
    ? `<a href="${escHtml(k.wikipedia_url)}" target="_blank" rel="noopener noreferrer" class="wiki-link">WIKIPEDIA ↗</a>` : '';

  return `
    <article class="case-card">
      <figure class="card-figure">${imgHtml}</figure>
      <div class="card-body">
        <span class="card-case-num">CASE #${String(rank).padStart(3,'0')}</span>
        <h2 class="card-name">${escHtml(k.name)}</h2>
        ${nicknameHtml}
        <div class="card-tags">
          ${statusTagHtml(k)}
          ${k.country ? `<span class="tag country">${escHtml(k.country.toUpperCase())}</span>` : ''}
        </div>
        ${metaRows ? `<div class="card-meta">${metaRows}</div>` : ''}
        <p class="card-desc">${escHtml(k.description)}</p>
        <div class="card-footer">${wikiHtml}</div>
      </div>
    </article>`;
}

// ── LIST CARD ─────────────────────────────────────────────────
function buildListCard(k, rank) {
  const imgHtml = k.image
    ? `<img src="${escHtml(k.image)}" alt="${escHtml(k.name)}" loading="lazy" />`
    : noImgSvg();

  const wikiHtml = k.wikipedia_url
    ? `<a href="${escHtml(k.wikipedia_url)}" target="_blank" rel="noopener noreferrer" class="wiki-link">WIKI ↗</a>` : '';

  return `
    <article class="case-card">
      <figure class="card-figure">${imgHtml}</figure>
      <div class="card-body">
        <div class="card-header-row" style="display:flex;flex-direction:column;gap:2px;min-width:180px;flex-shrink:0;">
          <h2 class="card-name">${escHtml(k.name)}</h2>
          ${k.years_active ? `<span style="font-size:0.65rem;color:var(--gray3);letter-spacing:0.06em;">${escHtml(k.years_active)}</span>` : ''}
        </div>
        <p class="card-desc">${escHtml(k.description)}</p>
        <div class="card-tags">${statusTagHtml(k)}</div>
        <div class="card-footer">${wikiHtml}</div>
      </div>
    </article>`;
}

// ── PLACEHOLDER SVG ───────────────────────────────────────────
function noImgSvg() {
  return `
  <svg class="no-img-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 220">
    <rect width="360" height="220" fill="#F0F0F0"/>
    <defs>
      <pattern id="hatch" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(-40)">
        <rect width="30" height="30" fill="#F0F0F0"/>
        <rect y="13" width="30" height="4" fill="#E0E0E0"/>
      </pattern>
    </defs>
    <rect width="360" height="220" fill="url(#hatch)"/>
    <g transform="rotate(-5,180,80)">
      <rect x="-40" y="60" width="460" height="34" fill="#0066FF"/>
      <text font-family="monospace" font-size="11" font-weight="900" fill="#FFFFFF" letter-spacing="4" y="82" x="-10">
        DO NOT CROSS · NO IMAGE ON FILE · DO NOT CROSS · NO IMAGE ON FILE ·
      </text>
    </g>
    <g transform="rotate(4,180,145)">
      <rect x="-40" y="128" width="460" height="34" fill="#000000"/>
      <text font-family="monospace" font-size="11" font-weight="900" fill="#FFFFFF" letter-spacing="4" y="150" x="-10">
        · NO IMAGE ON FILE · DO NOT CROSS · NO IMAGE ON FILE · DO NOT CROSS
      </text>
    </g>
  </svg>`;
}

// ── STATS ──────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('totalCount').textContent   = allData.length;
  document.getElementById('totalVictims').textContent = allData.reduce((s, k) => s + (k.confirmed_victims ?? 0), 0).toLocaleString();
}

// ── LIVE TIME ─────────────────────────────────────────────────
function updateTime() {
  const el = document.getElementById('liveTime');
  if (el) el.textContent = new Date().toUTCString().replace('GMT','UTC');
}
setInterval(updateTime, 1000);
updateTime();

// ── CONTROLS ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.az-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.az-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      letterQ = btn.dataset.letter;
      renderAll();
    });
  });

  document.querySelectorAll('[data-sort]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-sort]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sortMode = btn.dataset.sort;
      renderAll();
    });
  });

  document.querySelectorAll('[data-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-status]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      statusQ = btn.dataset.status;
      renderAll();
    });
  });

  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-view]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      viewMode = btn.dataset.view;
      renderAll();
    });
  });

  document.getElementById('searchInput').addEventListener('input', e => {
    searchQ = e.target.value.trim();
    renderAll();
  });

  loadData();
});
