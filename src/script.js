console.log('📖 The Keepsake Ledger — UNHINGED EDITION');

// ── STATIC RECORDS ────────────────────────────────────────────
const STATIC = {
  "Dennis Nilsen": {
    name:"Dennis Nilsen", nickname:"The Muswell Hill Murderer",
    years_active:"1978–1983", country:"United Kingdom",
    method:"Strangulation, drowning",
    description:"Scottish serial killer who murdered at least fifteen young men in London, keeping their bodies in his home before disposal. Arrested in 1983 after human remains blocked a drain.",
    wikipedia_url:"https://en.wikipedia.org/wiki/Dennis_Nilsen",
    image:"https://upload.wikimedia.org/wikipedia/en/5/5b/Dennis_Nilsen_police_photo.jpg",
    status:"DECEASED", death_date:"2018",
  },
  "Peter Kürten": {
    name:"Peter Kürten", nickname:"The Vampire of Düsseldorf",
    years_active:"1913–1930", country:"Germany",
    method:"Stabbing, strangulation",
    description:"German serial killer active primarily in Düsseldorf. Committed multiple murders and assaults of extreme violence. Arrested in 1930 and guillotined the following year.",
    wikipedia_url:"https://en.wikipedia.org/wiki/Peter_K%C3%BCrten",
    image:"https://upload.wikimedia.org/wikipedia/commons/4/45/Peter_K%C3%BCrten.jpg",
    status:"EXECUTED", death_date:"1931",
  },
};

const KNOWN_STATUS = {
  "Ted Bundy":           {status:"EXECUTED",  death_date:"1989"},
  "Jeffrey Dahmer":      {status:"DECEASED",  death_date:"1994"},
  "John Wayne Gacy":     {status:"EXECUTED",  death_date:"1994"},
  "Gary Ridgway":        {status:"IN PRISON"},
  "Andrei Chikatilo":    {status:"EXECUTED",  death_date:"1994"},
  "Harold Shipman":      {status:"DECEASED",  death_date:"2004"},
  "Aileen Wuornos":      {status:"EXECUTED",  death_date:"2002"},
  "Richard Ramirez":     {status:"DECEASED",  death_date:"2013"},
  "Edmund Kemper":       {status:"IN PRISON"},
  "Dennis Rader":        {status:"IN PRISON"},
  "Albert Fish":         {status:"EXECUTED",  death_date:"1936"},
  "David Berkowitz":     {status:"IN PRISON"},
  "Samuel Little":       {status:"DECEASED",  death_date:"2020"},
  "Rodney Alcala":       {status:"DECEASED",  death_date:"2021"},
  "H.H. Holmes":         {status:"EXECUTED",  death_date:"1896"},
  "Robert Pickton":      {status:"IN PRISON"},
  "Dean Corll":          {status:"DECEASED",  death_date:"1973"},
  "Ed Gein":             {status:"DECEASED",  death_date:"1984"},
  "Alexander Pichushkin":{status:"IN PRISON"},
  "Paul Bernardo":       {status:"IN PRISON"},
  "Joachim Kroll":       {status:"DECEASED",  death_date:"1991"},
  "Peter Sutcliffe":     {status:"DECEASED",  death_date:"2020"},
  "Ian Brady":           {status:"DECEASED",  death_date:"2017"},
  "Anatoly Onoprienko":  {status:"DECEASED",  death_date:"2013"},
  "Gary Heidnik":        {status:"EXECUTED",  death_date:"1999"},
  "Fred West":           {status:"DECEASED",  death_date:"1995"},
  "Arthur Shawcross":    {status:"DECEASED",  death_date:"2008"},
  "Wayne Williams":      {status:"IN PRISON"},
  "Richard Cottingham":  {status:"IN PRISON"},
  "Randy Kraft":         {status:"IN PRISON"},
  "Robert Hansen":       {status:"DECEASED",  death_date:"2014"},
  "Joseph DeAngelo":     {status:"IN PRISON"},
  "Charles Cullen":      {status:"IN PRISON"},
  "Marc Dutroux":        {status:"IN PRISON"},
  "Bruce McArthur":      {status:"IN PRISON"},
  "William Bonin":       {status:"EXECUTED",  death_date:"1996"},
  "Donald Gaskins":      {status:"EXECUTED",  death_date:"1991"},
  "David Parker Ray":    {status:"DECEASED",  death_date:"2002"},
  "Tsutomu Miyazaki":    {status:"EXECUTED",  death_date:"2008"},
  "Mikhail Popkov":      {status:"IN PRISON"},
  "Jack the Ripper":     {status:"UNIDENTIFIED"},
  "Zodiac Killer":       {status:"UNIDENTIFIED"},
  "Dennis Nilsen":       {status:"DECEASED",  death_date:"2018"},
  "Peter Kürten":        {status:"EXECUTED",  death_date:"1931"},
};

const KNOWN_METHODS = {
  "Ted Bundy":           "Strangulation, bludgeoning",
  "Jeffrey Dahmer":      "Strangulation, drugging",
  "John Wayne Gacy":     "Strangulation, asphyxiation",
  "Gary Ridgway":        "Strangulation",
  "Andrei Chikatilo":    "Stabbing, mutilation",
  "Harold Shipman":      "Lethal injection (diamorphine)",
  "Aileen Wuornos":      "Shooting",
  "Richard Ramirez":     "Shooting, stabbing, strangulation",
  "Edmund Kemper":       "Shooting, stabbing, strangulation",
  "Dennis Rader":        "Strangulation, asphyxiation",
  "Albert Fish":         "Strangulation, stabbing",
  "David Berkowitz":     "Shooting",
  "H.H. Holmes":         "Various, including gassing",
  "Dean Corll":          "Shooting, strangulation",
  "Ed Gein":             "Shooting",
  "Alexander Pichushkin":"Bludgeoning",
  "Peter Sutcliffe":     "Bludgeoning, stabbing",
  "Ian Brady":           "Strangulation, shooting",
  "Gary Heidnik":        "Strangulation, electrocution",
  "Fred West":           "Strangulation, mutilation",
  "Arthur Shawcross":    "Strangulation",
  "Wayne Williams":      "Strangulation, asphyxiation",
  "Richard Cottingham":  "Strangulation, stabbing",
  "William Bonin":       "Strangulation",
  "Donald Gaskins":      "Various methods",
  "Tsutomu Miyazaki":    "Strangulation",
  "Mikhail Popkov":      "Stabbing, axe",
  "Dennis Nilsen":       "Strangulation, drowning",
  "Peter Kürten":        "Stabbing, strangulation",
};

const KNOWN_NICKNAMES = {
  "Ted Bundy":           "The Lady Killer",
  "Jeffrey Dahmer":      "The Milwaukee Cannibal",
  "John Wayne Gacy":     "The Killer Clown",
  "Gary Ridgway":        "The Green River Killer",
  "Andrei Chikatilo":    "The Butcher of Rostov",
  "Harold Shipman":      "Doctor Death",
  "Aileen Wuornos":      "Damsel of Death",
  "Richard Ramirez":     "The Night Stalker",
  "Edmund Kemper":       "The Co-ed Killer",
  "Dennis Rader":        "BTK Killer",
  "Albert Fish":         "The Gray Man",
  "David Berkowitz":     "Son of Sam",
  "Samuel Little":       "The Traveling Man",
  "Rodney Alcala":       "The Dating Game Killer",
  "H.H. Holmes":         "America's First Serial Killer",
  "Robert Pickton":      "The Pig Farmer Killer",
  "Dean Corll":          "The Candy Man",
  "Alexander Pichushkin":"The Chessboard Killer",
  "Peter Sutcliffe":     "The Yorkshire Ripper",
  "Ian Brady":           "The Moors Murderer",
  "Fred West":           "The Gloucester Murderer",
  "Donald Gaskins":      "Pee Wee",
  "Jack the Ripper":     "Saucy Jacky",
  "Zodiac Killer":       "The Zodiac",
  "Dennis Nilsen":       "The Muswell Hill Murderer",
  "Peter Kürten":        "The Vampire of Düsseldorf",
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
  "Jack the Ripper","Zodiac Killer","Dennis Nilsen","Peter Kürten",
];

const ROTATIONS = ['rotate-n1','rotate-p1','rotate-n2','rotate-p2','rotate-p3','rotate-p1'];

const ANNOTATIONS = [
  "WHY?","again.","note this.","confirmed.","?","look closer.",
  "still here.","not the last.","remember this.","how many more?",
  "never found.","i saw him.","it fits.","the same hand.",
];

const MARGIN_NOTES = [
  "see\nnewspaper\nclipping","check\ndates","cross\nreference",
  "photo\nmissing","read\nagain","why\nhere?","pattern\nmatches",
  "not\nalone","still\nwatching","ask\nwho?","look\nbackward",
];

// ── SKETCHY INLINE SVG DRAWINGS ──────────────────────────────
// These get inserted between entries at various intervals
const SKETCHES = [

  // Tally marks sketch — 5 marks, hand drawn
  `<svg class="inline-sketch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 50" height="50">
    <line x1="20" y1="10" x2="18" y2="42" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.3" transform="rotate(-2,19,26)"/>
    <line x1="35" y1="10" x2="33" y2="42" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.3" transform="rotate(1,34,26)"/>
    <line x1="50" y1="10" x2="48" y2="42" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.3" transform="rotate(-1,49,26)"/>
    <line x1="65" y1="10" x2="63" y2="42" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.3" transform="rotate(2,64,26)"/>
    <line x1="20" y1="16" x2="72" y2="32" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
    <line x1="90" y1="10" x2="88" y2="42" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.3" transform="rotate(-3,89,26)"/>
    <line x1="105" y1="10" x2="103" y2="42" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.3" transform="rotate(1,104,26)"/>
    <line x1="120" y1="10" x2="118" y2="42" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
    <line x1="135" y1="10" x2="133" y2="42" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.3" transform="rotate(-1,134,26)"/>
    <line x1="90" y1="14" x2="142" y2="30" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
    <text x="165" y="30" font-family="HelpMe,cursive" font-size="11" fill="#4A1515" opacity="0.3" transform="rotate(-1,165,30)">how many more</text>
  </svg>`,

  // Eyeball sketch
  `<svg class="inline-sketch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 70" height="70">
    <g transform="translate(110,35)" opacity="0.22">
      <path d="M-80,0 Q-40,-22 0,0 Q40,22 80,0" stroke="#1C1410" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path d="M-80,0 Q-40,22 0,0 Q40,-22 80,0" stroke="#1C1410" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="16" stroke="#1C1410" stroke-width="1.3" fill="none"/>
      <circle cx="0" cy="0" r="7" stroke="#1C1410" stroke-width="1" fill="none"/>
      <circle cx="2" cy="-2" r="2.5" fill="#1C1410"/>
      <!-- scratchy eyelashes -->
      <line x1="-55" y1="-8" x2="-58" y2="-16" stroke="#1C1410" stroke-width="0.8" stroke-linecap="round"/>
      <line x1="-35" y1="-16" x2="-36" y2="-26" stroke="#1C1410" stroke-width="0.8" stroke-linecap="round"/>
      <line x1="0" y1="-22" x2="0" y2="-32" stroke="#1C1410" stroke-width="0.8" stroke-linecap="round"/>
      <line x1="35" y1="-16" x2="38" y2="-26" stroke="#1C1410" stroke-width="0.8" stroke-linecap="round"/>
      <line x1="55" y1="-8" x2="60" y2="-16" stroke="#1C1410" stroke-width="0.8" stroke-linecap="round"/>
    </g>
    <text x="10" y="45" font-family="HelpMe,cursive" font-size="10" fill="#4A1515" opacity="0.25" transform="rotate(-1.5,10,45)">always watching</text>
  </svg>`,

  // Spiral + scrawl
  `<svg class="inline-sketch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 60" height="60">
    <path d="M40,30 Q42,20 50,20 Q62,20 62,30 Q62,44 46,44 Q28,44 28,26 Q28,8 52,8 Q72,8 72,30" stroke="#1C1410" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.2"/>
    <text x="88" y="22" font-family="HelpMe,cursive" font-size="13" fill="#4A1515" opacity="0.25" font-weight="600" transform="rotate(-1,88,22)">WHY WHY WHY WHY WHY WHY</text>
    <text x="88" y="42" font-family="HelpMe,cursive" font-size="10" fill="#1C1410" opacity="0.18" transform="rotate(0.5,88,42)">i keep coming back to this</text>
  </svg>`,

  // Cross / X marks
  `<svg class="inline-sketch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 55" height="55">
    <g opacity="0.2">
      <line x1="15" y1="12" x2="35" y2="42" stroke="#4A1515" stroke-width="2" stroke-linecap="round" transform="rotate(-2,25,27)"/>
      <line x1="35" y1="12" x2="15" y2="42" stroke="#4A1515" stroke-width="2" stroke-linecap="round" transform="rotate(1,25,27)"/>
      <line x1="55" y1="12" x2="75" y2="42" stroke="#4A1515" stroke-width="2" stroke-linecap="round" transform="rotate(3,65,27)"/>
      <line x1="75" y1="12" x2="55" y2="42" stroke="#4A1515" stroke-width="2" stroke-linecap="round" transform="rotate(-1,65,27)"/>
      <line x1="95" y1="12" x2="115" y2="42" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="115" y1="12" x2="95" y2="42" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round"/>
    </g>
    <text x="140" y="32" font-family="HelpMe,cursive" font-size="12" fill="#1C1410" opacity="0.2" transform="rotate(-0.8,140,32)">these are the ones I know about</text>
  </svg>`,

  // Scrawled face — oval, eyes, frown
  `<svg class="inline-sketch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 80" height="80">
    <g transform="translate(50,40)" opacity="0.18">
      <ellipse cx="0" cy="0" rx="26" ry="32" stroke="#1C1410" stroke-width="1.3" fill="none" transform="rotate(-3)"/>
      <!-- eyes -->
      <ellipse cx="-9" cy="-8" rx="4" ry="5" stroke="#1C1410" stroke-width="1" fill="none"/>
      <ellipse cx="9" cy="-8" rx="4" ry="5" stroke="#1C1410" stroke-width="1" fill="none"/>
      <circle cx="-8" cy="-7" r="1.5" fill="#1C1410"/>
      <circle cx="10" cy="-7" r="1.5" fill="#1C1410"/>
      <!-- frown -->
      <path d="M-10,14 Q0,8 10,14" stroke="#1C1410" stroke-width="1.2" fill="none" stroke-linecap="round"/>
      <!-- scratchy hair -->
      <path d="M-20,-28 Q-15,-38 -5,-30" stroke="#1C1410" stroke-width="1" fill="none"/>
      <path d="M0,-32 Q5,-42 12,-30" stroke="#1C1410" stroke-width="1" fill="none"/>
      <path d="M14,-26 Q22,-34 20,-18" stroke="#1C1410" stroke-width="1" fill="none"/>
    </g>
    <text x="90" y="28" font-family="HelpMe,cursive" font-size="11" fill="#4A1515" opacity="0.22" transform="rotate(-1.5,90,28)">i know this face</text>
    <text x="90" y="48" font-family="HelpMe,cursive" font-size="10" fill="#1C1410" opacity="0.18" transform="rotate(0.5,90,48)">they always look the same</text>
    <text x="90" y="66" font-family="HelpMe,cursive" font-size="9" fill="#4A1515" opacity="0.15" transform="rotate(-0.8,90,66)">the eyes. always the eyes.</text>
  </svg>`,

  // Dagger / knife sketch
  `<svg class="inline-sketch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 55" height="55">
    <g transform="translate(40,27) rotate(-8)" opacity="0.17">
      <path d="M0,-22 L4,-4 L2,6 L0,18 L-2,6 L-4,-4 Z" stroke="#4A1515" stroke-width="1" fill="none"/>
      <line x1="0" y1="18" x2="0" y2="26" stroke="#4A1515" stroke-width="2" stroke-linecap="round"/>
      <line x1="-6" y1="20" x2="6" y2="20" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="-5" y1="23" x2="5" y2="23" stroke="#4A1515" stroke-width="1" stroke-linecap="round"/>
    </g>
    <text x="75" y="22" font-family="HelpMe,cursive" font-size="13" fill="#4A1515" opacity="0.22" font-weight="700" transform="rotate(-0.5,75,22)">AGAIN</text>
    <text x="75" y="40" font-family="HelpMe,cursive" font-size="10" fill="#1C1410" opacity="0.18" transform="rotate(1,75,40)">and again</text>
    <text x="75" y="54" font-family="HelpMe,cursive" font-size="9" fill="#1C1410" opacity="0.14" transform="rotate(-0.5,75,54)">and again</text>
  </svg>`,

  // Zigzag / frantic lines + text
  `<svg class="inline-sketch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 45" height="45">
    <polyline points="10,22 25,8 40,36 55,8 70,36 85,8 100,36 115,22" stroke="#1C1410" stroke-width="1.2" fill="none" opacity="0.18" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="130" y="20" font-family="HelpMe,cursive" font-size="11" fill="#4A1515" opacity="0.25" transform="rotate(-2,130,20)">the pattern never stops</text>
    <text x="130" y="38" font-family="HelpMe,cursive" font-size="9" fill="#1C1410" opacity="0.18">i can see it now</text>
  </svg>`,

  // Map-pin / location dots + names
  `<svg class="inline-sketch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 55" height="55">
    <g opacity="0.2">
      <circle cx="30" cy="20" r="5" stroke="#4A1515" stroke-width="1.2" fill="none"/>
      <line x1="30" y1="25" x2="30" y2="40" stroke="#4A1515" stroke-width="1" stroke-linecap="round"/>
      <circle cx="30" cy="20" r="2" fill="#4A1515"/>
      <circle cx="90" cy="18" r="5" stroke="#4A1515" stroke-width="1.2" fill="none"/>
      <line x1="90" y1="23" x2="90" y2="40" stroke="#4A1515" stroke-width="1" stroke-linecap="round"/>
      <circle cx="90" cy="18" r="2" fill="#4A1515"/>
      <circle cx="150" cy="22" r="5" stroke="#4A1515" stroke-width="1.2" fill="none"/>
      <line x1="150" y1="27" x2="150" y2="40" stroke="#4A1515" stroke-width="1" stroke-linecap="round"/>
      <circle cx="150" cy="22" r="2" fill="#4A1515"/>
      <!-- connecting dotted line -->
      <line x1="35" y1="30" x2="85" y2="28" stroke="#1C1410" stroke-width="0.8" stroke-dasharray="3,3"/>
      <line x1="95" y1="28" x2="145" y2="30" stroke="#1C1410" stroke-width="0.8" stroke-dasharray="3,3"/>
    </g>
    <text x="175" y="28" font-family="HelpMe,cursive" font-size="11" fill="#1C1410" opacity="0.2" transform="rotate(-1)">connected. all connected.</text>
  </svg>`,
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

function sortLastName(name) {
  const n = name.trim();
  if (n === 'Jack the Ripper') return 'ripper';
  if (n === 'Zodiac Killer')   return 'zodiac';
  if (n === 'H.H. Holmes')     return 'holmes';
  if (n === 'Ed Gein')         return 'gein';
  return n.split(/\s+/).pop().toLowerCase().replace(/[^a-z]/g, '');
}

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
    return {...STATIC[name], status:st.status||'UNKNOWN', death_date:st.death_date||STATIC[name].death_date};
  }
  const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
  const d = await res.json();
  if (!d.extract || d.type==='disambiguation' || d.extract.length<80) return null;
  const st = KNOWN_STATUS[name] || {};
  return {
    name,
    nickname:     KNOWN_NICKNAMES[name]||null,
    years_active: extractYears(d.extract),
    country:      extractCountry(d.extract),
    method:       KNOWN_METHODS[name]||null,
    description:  d.extract,
    wikipedia_url: d.content_urls?.desktop?.page||null,
    image:        d.thumbnail?.source||null,
    status:       st.status||'UNKNOWN',
    death_date:   st.death_date||null,
  };
}

async function loadData() {
  try {
    const local = await fetch('/serial_killers_with_local_images.json');
    if (local.ok) {
      const json = await local.json();
      allData = json.map(k => {
        const st=KNOWN_STATUS[k.name]||{}, sc=STATIC[k.name]||{};
        return {
          name: sc.name||k.name,
          nickname: sc.nickname||KNOWN_NICKNAMES[k.name]||null,
          years_active: sc.years_active||k.years_active||extractYears(k.description),
          country: sc.country||extractCountry(k.description||''),
          method: sc.method||KNOWN_METHODS[k.name]||null,
          description: sc.description||k.description,
          wikipedia_url: sc.wikipedia_url||k.wikipedia_url,
          image: sc.image||(k.image?.startsWith('images/')?'/'+k.image:k.image),
          status: st.status||sc.status||'UNKNOWN',
          death_date: st.death_date||sc.death_date||null,
        };
      }).filter(k=>k.description&&k.description.length>60);
      for (const [nm,rec] of Object.entries(STATIC)) {
        if (!allData.find(k=>k.name===nm)) {
          const st=KNOWN_STATUS[nm]||{};
          allData.push({...rec,status:st.status||rec.status,death_date:st.death_date||rec.death_date});
        }
      }
      renderAll(); updateStats(); markEmptyLetters();
      return;
    }
  } catch(_) {}

  const BATCH=5;
  for (let i=0;i<KILLERS.length;i+=BATCH) {
    const settled=await Promise.allSettled(KILLERS.slice(i,i+BATCH).map(fetchKiller));
    settled.forEach(r=>{if(r.status==='fulfilled'&&r.value)allData.push(r.value);});
    renderAll(); updateStats();
    if(i+BATCH<KILLERS.length) await new Promise(r=>setTimeout(r,250));
  }
  markEmptyLetters();
}

function markEmptyLetters() {
  const present = new Set(allData.map(k=>indexLetter(k.name)));
  document.querySelectorAll('.az-tab').forEach(btn=>{
    const l=btn.dataset.letter;
    if(l!=='ALL'&&!present.has(l)) btn.classList.add('empty');
    else btn.classList.remove('empty');
  });
}

// ── RENDER ─────────────────────────────────────────────────────
function renderAll() {
  const container = document.getElementById('dataContainer');
  let data = [...allData];

  if (letterQ!=='ALL') data=data.filter(k=>indexLetter(k.name)===letterQ);
  if (statusQ!=='ALL') data=data.filter(k=>k.status===statusQ);
  if (searchQ) data=data.filter(k=>k.name.toLowerCase().includes(searchQ.toLowerCase()));

  data.sort((a,b)=>sortLastName(a.name).localeCompare(sortLastName(b.name)));

  document.getElementById('visibleCount').textContent=data.length;

  if (!data.length&&allData.length>0) {
    container.innerHTML=`<div class="empty-state"><p>— no entries found —</p></div>`;
    return;
  }
  if (!data.length) {
    container.innerHTML=`<div class="loading-state"><p class="loading-text">gathering files<span class="dots">...</span></p></div>`;
    return;
  }

  let html='', lastLetter='', sketchIdx=0;
  data.forEach((k,i)=>{
    const letter=indexLetter(k.name);
    if(letterQ==='ALL'&&statusQ==='ALL'&&!searchQ&&letter!==lastLetter) {
      html+=`<div class="letter-divider">${letter.toLowerCase()}</div>`;
      lastLetter=letter;
    }
    // If followed by a sketch divider, entry surrenders its bottom margin
    const hasSketchAfter = (i+1)%3===0 && i<data.length-1;
    html+=buildEntry(k, i+1, hasSketchAfter);
    if(hasSketchAfter) {
      html+=`<div class="sketch-divider">${SKETCHES[sketchIdx%SKETCHES.length]}</div>`;
      sketchIdx++;
    }
  });
  container.innerHTML=html;
}

// ── STATUS ────────────────────────────────────────────────────
function statusLabel(k) {
  const s=k.status||'UNKNOWN';
  let cls='entry-status ', label;
  if(s==='EXECUTED')       {cls+='status-executed';     label=k.death_date?`EXECUTED — ${k.death_date}`:'EXECUTED';}
  else if(s==='IN PRISON') {cls+='status-prison';       label='IMPRISONED';}
  else if(s==='DECEASED')  {cls+='status-deceased';     label=k.death_date?`DECEASED — ${k.death_date}`:'DECEASED';}
  else if(s==='UNIDENTIFIED'){cls+='status-unidentified';label='IDENTITY UNKNOWN';}
  else                     {cls+='status-deceased';     label='STATUS UNKNOWN';}
  return `<span class="${cls}">${esc(label)}</span>`;
}

// ── NO-PHOTO ──────────────────────────────────────────────────
function noPhotoSvg() {
  return `<div class="no-photo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 240">
    <rect width="180" height="240" fill="#B8A080"/>
    <defs><pattern id="h" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
      <rect width="20" height="20" fill="#B8A080"/>
      <rect y="9" width="20" height="2" fill="#A89070" opacity="0.6"/>
    </pattern></defs>
    <rect width="180" height="240" fill="url(#h)"/>
    <g transform="rotate(-7,90,90)">
      <rect x="-20" y="82" width="230" height="30" fill="#A09070"/>
      <text font-family="monospace" font-size="8" font-weight="bold" fill="#1C1410" letter-spacing="2" y="101" x="6">NO IMAGE ON FILE</text>
    </g>
    <g transform="rotate(5,90,152)">
      <rect x="-20" y="140" width="230" height="24" fill="#4A1515" opacity="0.5"/>
      <text font-family="monospace" font-size="7" font-weight="bold" fill="#C8B49A" letter-spacing="2" y="156" x="6">DO NOT CROSS</text>
    </g>
  </svg></div>`;
}

// ── BUILD ENTRY ───────────────────────────────────────────────
function buildEntry(k, rank, noBottomMargin=false) {
  const rot       = ROTATIONS[rank%ROTATIONS.length];
  const showAnnot = rank%4===0;
  const annotation= showAnnot?ANNOTATIONS[rank%ANNOTATIONS.length]:'';
  const showMargin= rank%5===0;
  const marginNote= showMargin?MARGIN_NOTES[rank%MARGIN_NOTES.length]:'';
  const showTally = rank%7===0;

  const imgHtml=k.image
    ?`<div class="photo-tape ${rot}"><img src="${esc(k.image)}" alt="${esc(k.name)}" loading="lazy"/></div>`
    :noPhotoSvg();

  const nicknameHtml=k.nickname?`<p class="entry-nickname">"${esc(k.nickname)}"</p>`:'';

  const facts=[];
  if(k.years_active) facts.push(`<div class="fact-row"><span class="fact-key">ACTIVE</span><span class="fact-val">${esc(k.years_active)}</span></div>`);
  if(k.country)      facts.push(`<div class="fact-row"><span class="fact-key">COUNTRY</span><span class="fact-val">${esc(k.country)}</span></div>`);
  if(k.method)       facts.push(`<div class="fact-row"><span class="fact-key">METHOD</span><span class="fact-val method-val">${esc(k.method)}</span></div>`);

  const marginHtml=marginNote?`<div class="entry-margin-note">${esc(marginNote)}</div>`:'';

  // Tally SVG for some entries
  const tallyHtml=showTally?`<div class="entry-tally">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 80" width="50" height="80">
      <line x1="8" y1="5" x2="6" y2="35" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.35" transform="rotate(-2,7,20)"/>
      <line x1="18" y1="5" x2="16" y2="35" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.35" transform="rotate(1,17,20)"/>
      <line x1="28" y1="5" x2="26" y2="35" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
      <line x1="38" y1="5" x2="36" y2="35" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.35" transform="rotate(-1,37,20)"/>
      <line x1="5" y1="12" x2="42" y2="28" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
      <line x1="8" y1="48" x2="6" y2="75" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.25" transform="rotate(2,7,60)"/>
      <line x1="18" y1="48" x2="16" y2="75" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.25"/>
      <line x1="28" y1="48" x2="26" y2="75" stroke="#4A1515" stroke-width="1.5" stroke-linecap="round" opacity="0.25" transform="rotate(-1,27,60)"/>
    </svg>
  </div>`:'';

  const wikiHtml=k.wikipedia_url
    ?`<a href="${esc(k.wikipedia_url)}" target="_blank" rel="noopener noreferrer" class="wiki-link">open record ↗</a>`
    :'<span></span>';

  return `
    <div class="entry" style="${noBottomMargin ? 'margin-bottom:0' : ''}">
      ${marginHtml}
      ${tallyHtml}
      <div class="entry-paper">
        <div class="entry-spread">
          <div class="entry-photo-col">
            ${imgHtml}
            ${annotation?`<p class="photo-annotation">${esc(annotation)}</p>`:''}
          </div>
          <div class="entry-text-col">
            <span class="entry-case-num">FILE NO. ${String(rank).padStart(3,'0')}</span>
            <h2 class="entry-name">${esc(k.name)}</h2>
            ${nicknameHtml}
            ${statusLabel(k)}
            <div class="entry-rule"></div>
            ${facts.length?`<div class="entry-facts">${facts.join('')}</div>`:''}
            <p class="entry-desc">${esc(k.description)}</p>
            <div class="entry-footer">
              ${wikiHtml}
              ${annotation?`<span class="entry-annotation">${esc(annotation)}</span>`:'<span></span>'}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

// ── STATS ──────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('totalCount').textContent=allData.length;
}

// ── BACK TO TOP ───────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const quarterDown = document.documentElement.scrollHeight * 0.25;
    btn.classList.toggle('visible', window.scrollY > quarterDown);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── CONTROLS ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.az-tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(btn.classList.contains('empty')) return;
      document.querySelectorAll('.az-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      letterQ=btn.dataset.letter;
      renderAll();
    });
  });
  document.querySelectorAll('.status-tab').forEach(btn=>{
    btn.addEventListener('click',()=>{
      document.querySelectorAll('.status-tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      statusQ=btn.dataset.status;
      renderAll();
    });
  });
  document.getElementById('searchInput').addEventListener('input',e=>{
    searchQ=e.target.value.trim();
    renderAll();
  });
  initBackToTop();
  loadData();
});
