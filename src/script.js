console.log('📖 The Keepsake Ledger — loaded');

// ── STATIC RECORDS ────────────────────────────────────────────
const STATIC = {
  "Dennis Nilsen": {
    name: "Dennis Nilsen", nickname: "The Muswell Hill Murderer",
    years_active: "1978–1983", country: "United Kingdom",
    method: "Strangulation, drowning",
    description: "Scottish serial killer who murdered at least fifteen young men in London, keeping their bodies in his home before disposal. Arrested in 1983 after human remains blocked a drain.",
    wikipedia_url: "https://en.wikipedia.org/wiki/Dennis_Nilsen",
    image: "https://upload.wikimedia.org/wikipedia/en/5/5b/Dennis_Nilsen_police_photo.jpg",
    status: "DECEASED", death_date: "2018",
  },
  "Peter Kürten": {
    name: "Peter Kürten", nickname: "The Vampire of Düsseldorf",
    years_active: "1913–1930", country: "Germany",
    method: "Stabbing, strangulation",
    description: "German serial killer active primarily in Düsseldorf. Committed multiple murders and assaults of extreme violence. Arrested in 1930 and guillotined the following year.",
    wikipedia_url: "https://en.wikipedia.org/wiki/Peter_K%C3%BCrten",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/45/Peter_K%C3%BCrten.jpg",
    status: "EXECUTED", death_date: "1931",
  },
};

const KNOWN_STATUS = {
  "Ted Bundy":            { status:"EXECUTED",   death_date:"1989" },
  "Jeffrey Dahmer":       { status:"DECEASED",   death_date:"1994" },
  "John Wayne Gacy":      { status:"EXECUTED",   death_date:"1994" },
  "Gary Ridgway":         { status:"IN PRISON" },
  "Andrei Chikatilo":     { status:"EXECUTED",   death_date:"1994" },
  "Harold Shipman":       { status:"DECEASED",   death_date:"2004" },
  "Aileen Wuornos":       { status:"EXECUTED",   death_date:"2002" },
  "Richard Ramirez":      { status:"DECEASED",   death_date:"2013" },
  "Edmund Kemper":        { status:"IN PRISON" },
  "Dennis Rader":         { status:"IN PRISON" },
  "Albert Fish":          { status:"EXECUTED",   death_date:"1936" },
  "David Berkowitz":      { status:"IN PRISON" },
  "Samuel Little":        { status:"DECEASED",   death_date:"2020" },
  "Rodney Alcala":        { status:"DECEASED",   death_date:"2021" },
  "H.H. Holmes":          { status:"EXECUTED",   death_date:"1896" },
  "Robert Pickton":       { status:"IN PRISON" },
  "Dean Corll":           { status:"DECEASED",   death_date:"1973" },
  "Ed Gein":              { status:"DECEASED",   death_date:"1984" },
  "Alexander Pichushkin": { status:"IN PRISON" },
  "Paul Bernardo":        { status:"IN PRISON" },
  "Joachim Kroll":        { status:"DECEASED",   death_date:"1991" },
  "Peter Sutcliffe":      { status:"DECEASED",   death_date:"2020" },
  "Ian Brady":            { status:"DECEASED",   death_date:"2017" },
  "Anatoly Onoprienko":   { status:"DECEASED",   death_date:"2013" },
  "Gary Heidnik":         { status:"EXECUTED",   death_date:"1999" },
  "Fred West":            { status:"DECEASED",   death_date:"1995" },
  "Arthur Shawcross":     { status:"DECEASED",   death_date:"2008" },
  "Wayne Williams":       { status:"IN PRISON" },
  "Richard Cottingham":   { status:"IN PRISON" },
  "Randy Kraft":          { status:"IN PRISON" },
  "Robert Hansen":        { status:"DECEASED",   death_date:"2014" },
  "Joseph DeAngelo":      { status:"IN PRISON" },
  "Charles Cullen":       { status:"IN PRISON" },
  "Marc Dutroux":         { status:"IN PRISON" },
  "Bruce McArthur":       { status:"IN PRISON" },
  "William Bonin":        { status:"EXECUTED",   death_date:"1996" },
  "Donald Gaskins":       { status:"EXECUTED",   death_date:"1991" },
  "David Parker Ray":     { status:"DECEASED",   death_date:"2002" },
  "Tsutomu Miyazaki":     { status:"EXECUTED",   death_date:"2008" },
  "Mikhail Popkov":       { status:"IN PRISON" },
  "Jack the Ripper":      { status:"UNIDENTIFIED" },
  "Zodiac Killer":        { status:"UNIDENTIFIED" },
  "Dennis Nilsen":        { status:"DECEASED",   death_date:"2018" },
  "Peter Kürten":         { status:"EXECUTED",   death_date:"1931" },
};

const KNOWN_METHODS = {
  "Ted Bundy":            "Strangulation, bludgeoning",
  "Jeffrey Dahmer":       "Strangulation, drugging",
  "John Wayne Gacy":      "Strangulation, asphyxiation",
  "Gary Ridgway":         "Strangulation",
  "Andrei Chikatilo":     "Stabbing, mutilation",
  "Harold Shipman":       "Lethal injection (diamorphine)",
  "Aileen Wuornos":       "Shooting",
  "Richard Ramirez":      "Shooting, stabbing, strangulation",
  "Edmund Kemper":        "Shooting, stabbing, strangulation",
  "Dennis Rader":         "Strangulation, asphyxiation",
  "Albert Fish":          "Strangulation, stabbing",
  "David Berkowitz":      "Shooting",
  "H.H. Holmes":          "Various, including gassing",
  "Dean Corll":           "Shooting, strangulation",
  "Ed Gein":              "Shooting",
  "Alexander Pichushkin": "Bludgeoning",
  "Peter Sutcliffe":      "Bludgeoning, stabbing",
  "Ian Brady":            "Strangulation, shooting",
  "Gary Heidnik":         "Strangulation, electrocution",
  "Fred West":            "Strangulation, mutilation",
  "Arthur Shawcross":     "Strangulation",
  "Wayne Williams":       "Strangulation, asphyxiation",
  "Richard Cottingham":   "Strangulation, stabbing",
  "William Bonin":        "Strangulation",
  "Donald Gaskins":       "Various methods",
  "Tsutomu Miyazaki":     "Strangulation",
  "Mikhail Popkov":       "Stabbing, axe",
  "Dennis Nilsen":        "Strangulation, drowning",
  "Peter Kürten":         "Stabbing, strangulation",
};

const KNOWN_NICKNAMES = {
  "Ted Bundy":            "The Lady Killer",
  "Jeffrey Dahmer":       "The Milwaukee Cannibal",
  "John Wayne Gacy":      "The Killer Clown",
  "Gary Ridgway":         "The Green River Killer",
  "Andrei Chikatilo":     "The Butcher of Rostov",
  "Harold Shipman":       "Doctor Death",
  "Aileen Wuornos":       "Damsel of Death",
  "Richard Ramirez":      "The Night Stalker",
  "Edmund Kemper":        "The Co-ed Killer",
  "Dennis Rader":         "BTK Killer",
  "Albert Fish":          "The Gray Man",
  "David Berkowitz":      "Son of Sam",
  "Samuel Little":        "The Traveling Man",
  "Rodney Alcala":        "The Dating Game Killer",
  "H.H. Holmes":          "America's First Serial Killer",
  "Robert Pickton":       "The Pig Farmer Killer",
  "Dean Corll":           "The Candy Man",
  "Alexander Pichushkin": "The Chessboard Killer",
  "Peter Sutcliffe":      "The Yorkshire Ripper",
  "Ian Brady":            "The Moors Murderer",
  "Fred West":            "The Gloucester Murderer",
  "Donald Gaskins":       "Pee Wee",
  "Jack the Ripper":      "Saucy Jacky",
  "Zodiac Killer":        "The Zodiac",
  "Dennis Nilsen":        "The Muswell Hill Murderer",
  "Peter Kürten":         "The Vampire of Düsseldorf",
};

const KILLERS = [
  "Ted Bundy","Jeffrey Dahmer","John Wayne Gacy","Gary Ridgway",
  "Andrei Chikatilo","Harold Shipman","Aileen Wuornos","Richard Ramirez",
  "Edmund Kemper","Dennis Rader","Albert Fish","David Berkowitz",
  "Samuel Little","Rodney Alcala","H.H. Holmes","Robert Pickton",
  "Dean Corll","Ed Gein","Alexander Pichushkin","Paul Bernardo",
  "Joachim Kroll","Peter Sutcliffe","Ian Brady","Anatoly Onoprienko",
  "Gary Heidnik","Fred West","Arthur Shawcross","Wayne Williams",
  "Richard Cottingham","Randy Kraft","Robert Hansen","Joseph DeAngelo",
  "Charles Cullen","Marc Dutroux","Bruce McArthur","William Bonin",
  "Donald Gaskins","David Parker Ray","Tsutomu Miyazaki","Mikhail Popkov",
  "Jack the Ripper","Zodiac Killer",
  "Dennis Nilsen","Peter Kürten",
];

// Rotation classes for photo tilt
const ROTATIONS = ['rotate-n1','rotate-p1','rotate-n2','rotate-p2','rotate-p3','rotate-p1'];

// Handwritten margin annotations — more unhinged
const ANNOTATIONS = [
  "WHY?", "again.", "note this.", "confirmed.", "?",
  "look closer.", "still here.", "not the last.",
  "remember this.", "how many more?", "never found.",
];

// Per-entry margin notes — obsessive journal owner
const MARGIN_NOTES = [
  "see\nnewspaper\nclipping", "check\ndates", "cross\nreference",
  "photo\nmissing", "read\nagain", "why\nhere?",
  "pattern\nmatches", "not\nalone", "still\nwatching",
];

// ── STATE ─────────────────────────────────────────────────────
let allData = [];
let letterQ = 'ALL';
let statusQ = 'ALL';
let searchQ = '';

// ── HELPERS ───────────────────────────────────────────────────
function esc(s) {
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// Get the "sort key" last name — for Jack the Ripper use "Ripper", Zodiac Killer use "Zodiac"
function sortLastName(name) {
  const n = name.trim();
  // Special cases
  if (n === 'Jack the Ripper') return 'ripper';
  if (n === 'Zodiac Killer')   return 'zodiac';
  if (n === 'H.H. Holmes')     return 'holmes';
  if (n === 'Ed Gein')         return 'gein';
  // General: last word
  return n.split(/\s+/).pop().toLowerCase().replace(/[^a-z]/g, '');
}

// Get the "index letter" for A-Z — first letter of sort key
function indexLetter(name) {
  return sortLastName(name).charAt(0).toUpperCase();
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
  if (!text) return null;
  const map = [
    ['American','United States'],['British','United Kingdom'],
    ['Canadian','Canada'],['German','Germany'],
    ['Russian','Russia'],['Australian','Australia'],
    ['French','France'],['Italian','Italy'],
    ['Scottish','United Kingdom'],['English','United Kingdom'],
    ['Ukrainian','Ukraine'],['Colombian','Colombia'],
    ['Belgian','Belgium'],['Japanese','Japan'],
    ['South African','South Africa'],['Polish','Poland'],
    ['Dutch','Netherlands'],
  ];
  for (const [adj, country] of map) {
    if (text.includes(adj)) return country;
  }
  return null;
}

// ── FETCH ─────────────────────────────────────────────────────
async function fetchKiller(name) {
  if (STATIC[name]) {
    const st = KNOWN_STATUS[name] || {};
    return { ...STATIC[name], status: st.status || 'UNKNOWN', death_date: st.death_date || STATIC[name].death_date };
  }
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
  const d   = await res.json();
  if (!d.extract || d.type === 'disambiguation' || d.extract.length < 80) return null;
  const st = KNOWN_STATUS[name] || {};
  return {
    name,
    nickname:     KNOWN_NICKNAMES[name] || null,
    years_active: extractYears(d.extract),
    country:      extractCountry(d.extract),
    method:       KNOWN_METHODS[name] || null,
    description:  d.extract,
    wikipedia_url: d.content_urls?.desktop?.page || null,
    image:        d.thumbnail?.source || null,
    status:       st.status || 'UNKNOWN',
    death_date:   st.death_date || null,
  };
}

async function loadData() {
  try {
    const local = await fetch('/serial_killers_with_local_images.json');
    if (local.ok) {
      const json = await local.json();
      allData = json.map(k => {
        const st = KNOWN_STATUS[k.name] || {};
        const sc = STATIC[k.name] || {};
        return {
          name:         sc.name || k.name,
          nickname:     sc.nickname || KNOWN_NICKNAMES[k.name] || null,
          years_active: sc.years_active || k.years_active || extractYears(k.description),
          country:      sc.country || extractCountry(k.description || ''),
          method:       sc.method || KNOWN_METHODS[k.name] || null,
          description:  sc.description || k.description,
          wikipedia_url: sc.wikipedia_url || k.wikipedia_url,
          image:        sc.image || (k.image?.startsWith('images/') ? '/'+k.image : k.image),
          status:       st.status || sc.status || 'UNKNOWN',
          death_date:   st.death_date || sc.death_date || null,
        };
      }).filter(k => k.description && k.description.length > 60);

      for (const [nm, rec] of Object.entries(STATIC)) {
        if (!allData.find(k => k.name === nm)) {
          const st = KNOWN_STATUS[nm] || {};
          allData.push({ ...rec, status: st.status || rec.status, death_date: st.death_date || rec.death_date });
        }
      }
      renderAll(); updateStats(); markEmptyLetters();
      return;
    }
  } catch (_) {}

  const BATCH = 5;
  for (let i = 0; i < KILLERS.length; i += BATCH) {
    const settled = await Promise.allSettled(KILLERS.slice(i, i + BATCH).map(fetchKiller));
    settled.forEach(r => { if (r.status === 'fulfilled' && r.value) allData.push(r.value); });
    renderAll(); updateStats();
    if (i + BATCH < KILLERS.length) await new Promise(r => setTimeout(r, 250));
  }
  markEmptyLetters();
}

// Mark A-Z tabs that have no entries as dim
function markEmptyLetters() {
  const presentLetters = new Set(allData.map(k => indexLetter(k.name)));
  document.querySelectorAll('.az-tab').forEach(btn => {
    const l = btn.dataset.letter;
    if (l !== 'ALL' && !presentLetters.has(l)) {
      btn.classList.add('empty');
    } else {
      btn.classList.remove('empty');
    }
  });
}

// ── RENDER ─────────────────────────────────────────────────────
function renderAll() {
  const container = document.getElementById('dataContainer');
  let data = [...allData];

  // Filter by first letter of last name
  if (letterQ !== 'ALL') {
    data = data.filter(k => indexLetter(k.name) === letterQ);
  }
  if (statusQ !== 'ALL') {
    data = data.filter(k => k.status === statusQ);
  }
  if (searchQ) {
    data = data.filter(k => k.name.toLowerCase().includes(searchQ.toLowerCase()));
  }

  // Always sort alphabetically by last name
  data.sort((a, b) => sortLastName(a.name).localeCompare(sortLastName(b.name)));

  document.getElementById('visibleCount').textContent = data.length;

  if (!data.length && allData.length > 0) {
    container.innerHTML = `<div class="empty-state"><p>— no entries found —</p></div>`;
    return;
  }
  if (!data.length) {
    container.innerHTML = `<div class="loading-state"><p class="loading-text">gathering files<span class="dots">...</span></p></div>`;
    return;
  }

  // When showing ALL with no letter filter, insert letter dividers
  let html = '';
  let lastLetter = '';
  data.forEach((k, i) => {
    const letter = indexLetter(k.name);
    if (letterQ === 'ALL' && statusQ === 'ALL' && !searchQ && letter !== lastLetter) {
      html += `<div class="letter-divider">${letter.toLowerCase()}</div>`;
      lastLetter = letter;
    }
    html += buildEntry(k, i + 1);
  });
  container.innerHTML = html;
}

// ── STATUS LABEL ──────────────────────────────────────────────
function statusLabel(k) {
  const s = k.status || 'UNKNOWN';
  let cls = 'entry-status ';
  let label;
  if (s === 'EXECUTED') {
    cls += 'status-executed';
    label = k.death_date ? `EXECUTED — ${k.death_date}` : 'EXECUTED';
  } else if (s === 'IN PRISON') {
    cls += 'status-prison';
    label = 'IMPRISONED';
  } else if (s === 'DECEASED') {
    cls += 'status-deceased';
    label = k.death_date ? `DECEASED — ${k.death_date}` : 'DECEASED';
  } else if (s === 'UNIDENTIFIED') {
    cls += 'status-unidentified';
    label = 'IDENTITY UNKNOWN';
  } else {
    cls += 'status-deceased';
    label = 'STATUS UNKNOWN';
  }
  return `<span class="${cls}">${esc(label)}</span>`;
}

// ── NO-PHOTO SVG ──────────────────────────────────────────────
function noPhotoSvg() {
  return `<div class="no-photo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 240">
    <rect width="180" height="240" fill="#D4C9B5"/>
    <defs><pattern id="h" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
      <rect width="20" height="20" fill="#D4C9B5"/>
      <rect y="9" width="20" height="2" fill="#C8BBAA" opacity="0.5"/>
    </pattern></defs>
    <rect width="180" height="240" fill="url(#h)"/>
    <g transform="rotate(-6,90,90)">
      <rect x="-20" y="85" width="230" height="28" fill="#CBBFA5"/>
      <text font-family="monospace" font-size="8" font-weight="bold" fill="#2B2620" letter-spacing="2" y="103" x="4">NO IMAGE ON FILE</text>
    </g>
    <g transform="rotate(4,90,150)">
      <rect x="-20" y="140" width="230" height="22" fill="#5A1E1E" opacity="0.55"/>
      <text font-family="monospace" font-size="7" font-weight="bold" fill="#EFE6D6" letter-spacing="2" y="155" x="4">DO NOT CROSS</text>
    </g>
  </svg></div>`;
}

// ── BUILD ENTRY ───────────────────────────────────────────────
function buildEntry(k, rank) {
  const rot        = ROTATIONS[rank % ROTATIONS.length];
  const showAnnot  = rank % 4 === 0;
  const annotation = showAnnot ? ANNOTATIONS[rank % ANNOTATIONS.length] : '';
  const showMargin = rank % 6 === 0;
  const marginNote = showMargin ? MARGIN_NOTES[rank % MARGIN_NOTES.length] : '';

  const imgHtml = k.image
    ? `<div class="photo-tape ${rot}"><img src="${esc(k.image)}" alt="${esc(k.name)}" loading="lazy" /></div>`
    : noPhotoSvg();

  const nicknameHtml = k.nickname
    ? `<p class="entry-nickname">"${esc(k.nickname)}"</p>` : '';

  const facts = [];
  if (k.years_active) facts.push(`<div class="fact-row"><span class="fact-key">ACTIVE</span><span class="fact-val">${esc(k.years_active)}</span></div>`);
  if (k.country)      facts.push(`<div class="fact-row"><span class="fact-key">COUNTRY</span><span class="fact-val">${esc(k.country)}</span></div>`);
  if (k.method)       facts.push(`<div class="fact-row"><span class="fact-key">METHOD</span><span class="fact-val method-val">${esc(k.method)}</span></div>`);

  const marginHtml = marginNote
    ? `<div class="entry-margin-note">${esc(marginNote)}</div>` : '';

  const wikiHtml = k.wikipedia_url
    ? `<a href="${esc(k.wikipedia_url)}" target="_blank" rel="noopener noreferrer" class="wiki-link">open record ↗</a>` : '<span></span>';

  return `
    <div class="entry">
      ${marginHtml}
      <div class="entry-paper">
        <div class="entry-spread">
          <div class="entry-photo-col">
            ${imgHtml}
            ${annotation ? `<p class="photo-annotation">${esc(annotation)}</p>` : ''}
          </div>
          <div class="entry-text-col">
            <span class="entry-case-num">FILE NO. ${String(rank).padStart(3,'0')}</span>
            <h2 class="entry-name">${esc(k.name)}</h2>
            ${nicknameHtml}
            ${statusLabel(k)}
            <div class="entry-rule"></div>
            ${facts.length ? `<div class="entry-facts">${facts.join('')}</div>` : ''}
            <p class="entry-desc">${esc(k.description)}</p>
            <div class="entry-footer">
              ${wikiHtml}
              ${annotation ? `<span class="entry-annotation">${esc(annotation)}</span>` : '<span></span>'}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// ── STATS ──────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('totalCount').textContent = allData.length;
}

// ── BACK TO TOP ───────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── WIRE CONTROLS ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // A-Z tabs
  document.querySelectorAll('.az-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('empty')) return; // skip empty letters
      document.querySelectorAll('.az-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      letterQ = btn.dataset.letter;
      renderAll();
    });
  });

  // Status tabs
  document.querySelectorAll('.status-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.status-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      statusQ = btn.dataset.status;
      renderAll();
    });
  });

  // Search
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQ = e.target.value.trim();
    renderAll();
  });

  initBackToTop();
  loadData();
});
