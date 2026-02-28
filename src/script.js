console.log('👍 Criminal Analysis Platform — JS Connected');

// ── Data Source ──────────────────────────────────────────────
// Option A: Use your generated local JSON file (recommended)
// const url = "/serial_killers_with_local_images.json";

// Option B: Live Wikipedia API (CORS-friendly summary endpoint)
// We build the data ourselves from the killer list below.

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

// ── State ─────────────────────────────────────────────────────
let allData   = [];
let sortMode  = 'victims';
let minVic    = 0;
let searchQ   = '';

// ── Helpers ───────────────────────────────────────────────────
function extractNumber(text) {
  if (!text) return null;
  const m = text.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

async function fetchKillerSummary(name) {
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
  );
  const data = await res.json();
  return {
    name:             name,
    confirmed_victims: extractNumber(data.extract),
    image:            data.thumbnail?.source || null,
    description:      data.extract || 'No description available.',
    wikipedia_url:    data.content_urls?.desktop?.page || null,
  };
}

// ── Fetch all data ─────────────────────────────────────────────
async function loadData() {
  const container = document.getElementById('dataContainer');

  // Try local JSON first; fall back to Wikipedia API
  try {
    const localRes = await fetch('/serial_killers_with_local_images.json');
    if (localRes.ok) {
      allData = await localRes.json();
      console.log('✅ Loaded from local JSON');
    } else {
      throw new Error('No local file');
    }
  } catch {
    console.log('🌐 Fetching from Wikipedia API…');
    // Fetch in small batches to avoid hammering API
    const results = [];
    const BATCH = 5;
    for (let i = 0; i < KILLERS.length; i += BATCH) {
      const batch = KILLERS.slice(i, i + BATCH);
      const settled = await Promise.allSettled(batch.map(fetchKillerSummary));
      settled.forEach(r => { if (r.status === 'fulfilled') results.push(r.value); });
      // small pause between batches
      if (i + BATCH < KILLERS.length) {
        await new Promise(r => setTimeout(r, 300));
      }
    }
    allData = results;
  }

  renderAll();
  updateStats();
}

// ── Render ─────────────────────────────────────────────────────
function renderAll() {
  const container = document.getElementById('dataContainer');

  // Filter
  let filtered = allData.filter(k => {
    const vic = k.confirmed_victims ?? 0;
    const matchSearch = k.name.toLowerCase().includes(searchQ.toLowerCase());
    return vic >= minVic && matchSearch;
  });

  // Sort
  if (sortMode === 'victims') {
    filtered.sort((a, b) => (b.confirmed_victims ?? 0) - (a.confirmed_victims ?? 0));
  } else {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    container.innerHTML = `<div class="error-state"><h2>No Cases Found</h2><p>Try adjusting your filters.</p></div>`;
    return;
  }

  container.innerHTML = filtered.map((k, i) => buildCard(k, i + 1)).join('');
}

function buildCard(k, rank) {
  const vic    = k.confirmed_victims;
  const hasImg = k.image;
  const imgSrc = hasImg
    ? (k.image.startsWith('images/') ? `/${k.image}` : k.image)
    : null;

  const badgeClass = vic ? 'victim-badge' : 'victim-badge unknown';
  const badgeNum   = vic ?? '?';

  const imageMarkup = imgSrc
    ? `<img src="${imgSrc}" alt="Photo of ${escHtml(k.name)}" loading="lazy" />`
    : `<div class="no-image">NO IMAGE ON FILE</div>`;

  const wikiMarkup = k.wikipedia_url
    ? `<a href="${k.wikipedia_url}" target="_blank" rel="noopener noreferrer" class="wiki-link">WIKIPEDIA ↗</a>`
    : '';

  return `
    <article class="case-card">
      <figure class="card-figure">
        ${imageMarkup}
        <figcaption>
          <h2 class="card-name-fig">${escHtml(k.name)}</h2>
          <div class="${badgeClass}">
            <span>${badgeNum}</span>
            <span class="badge-label">VICTIMS</span>
          </div>
        </figcaption>
      </figure>
      <div class="card-body">
        <p class="card-desc">${escHtml(k.description)}</p>
        <div class="card-footer">
          <span class="card-rank">RANK #${rank}</span>
          ${wikiMarkup}
        </div>
      </div>
    </article>
  `;
}

function escHtml(str) {
  return (str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function updateStats() {
  const total = allData.length;
  const victims = allData.reduce((sum, k) => sum + (k.confirmed_victims ?? 0), 0);
  document.getElementById('totalCount').textContent = total;
  document.getElementById('totalVictims').textContent = victims.toLocaleString();
}

// ── Controls ───────────────────────────────────────────────────
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

  // Search
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQ = e.target.value;
    renderAll();
  });

  // Victim range filter
  const rangeEl = document.getElementById('victimFilter');
  const rangeVal = document.getElementById('rangeVal');
  rangeEl.addEventListener('input', e => {
    minVic = parseInt(e.target.value, 10);
    rangeVal.textContent = `${minVic}+`;
    renderAll();
  });

  // Load data
  loadData();
});
