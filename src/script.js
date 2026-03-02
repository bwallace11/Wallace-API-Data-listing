console.log('📖 The Keepsake Ledger — UNHINGED EDITION');

/* ─────────────────────────────────────────────────────────────
   STATIC RECORDS
───────────────────────────────────────────────────────────── */

const STATIC = {
  "Dennis Nilsen": {
    name:"Dennis Nilsen",
    nickname:"The Muswell Hill Murderer",
    years_active:"1978–1983",
    country:"United Kingdom",
    method:"Strangulation, drowning",
    description:"Scottish serial killer who murdered at least fifteen young men in London, keeping their bodies in his home before disposal. Arrested in 1983 after human remains blocked a drain.",
    wikipedia_url:"https://en.wikipedia.org/wiki/Dennis_Nilsen",
    image:"https://upload.wikimedia.org/wikipedia/en/5/5b/Dennis_Nilsen_police_photo.jpg",
    status:"DECEASED",
    death_date:"2018",
  },
  "Peter Kürten": {
    name:"Peter Kürten",
    nickname:"The Vampire of Düsseldorf",
    years_active:"1913–1930",
    country:"Germany",
    method:"Stabbing, strangulation",
    description:"German serial killer active primarily in Düsseldorf. Committed multiple murders and assaults of extreme violence. Arrested in 1930 and guillotined the following year.",
    wikipedia_url:"https://en.wikipedia.org/wiki/Peter_K%C3%BCrten",
    image:"https://upload.wikimedia.org/wikipedia/commons/4/45/Peter_K%C3%BCrten.jpg",
    status:"EXECUTED",
    death_date:"1931",
  },
};

/* ─────────────────────────────────────────────────────────────
   STATUS MAP
───────────────────────────────────────────────────────────── */

const KNOWN_STATUS = {
  "Ted Bundy":{status:"EXECUTED",death_date:"1989"},
  "Jeffrey Dahmer":{status:"DECEASED",death_date:"1994"},
  "John Wayne Gacy":{status:"EXECUTED",death_date:"1994"},
  "Gary Ridgway":{status:"IN PRISON"},
  "Andrei Chikatilo":{status:"EXECUTED",death_date:"1994"},
  "Harold Shipman":{status:"DECEASED",death_date:"2004"},
  "Aileen Wuornos":{status:"EXECUTED",death_date:"2002"},
  "Richard Ramirez":{status:"DECEASED",death_date:"2013"},
  "Edmund Kemper":{status:"IN PRISON"},
  "Dennis Rader":{status:"IN PRISON"},
  "Albert Fish":{status:"EXECUTED",death_date:"1936"},
  "David Berkowitz":{status:"IN PRISON"},
  "Samuel Little":{status:"DECEASED",death_date:"2020"},
  "Rodney Alcala":{status:"DECEASED",death_date:"2021"},
  "H.H. Holmes":{status:"EXECUTED",death_date:"1896"},
  "Robert Pickton":{status:"IN PRISON"},
  "Dean Corll":{status:"DECEASED",death_date:"1973"},
  "Ed Gein":{status:"DECEASED",death_date:"1984"},
  "Alexander Pichushkin":{status:"IN PRISON"},
  "Paul Bernardo":{status:"IN PRISON"},
  "Joachim Kroll":{status:"DECEASED",death_date:"1991"},
  "Peter Sutcliffe":{status:"DECEASED",death_date:"2020"},
  "Ian Brady":{status:"DECEASED",death_date:"2017"},
  "Anatoly Onoprienko":{status:"DECEASED",death_date:"2013"},
  "Gary Heidnik":{status:"EXECUTED",death_date:"1999"},
  "Fred West":{status:"DECEASED",death_date:"1995"},
  "Arthur Shawcross":{status:"DECEASED",death_date:"2008"},
  "Wayne Williams":{status:"IN PRISON"},
  "Richard Cottingham":{status:"IN PRISON"},
  "Randy Kraft":{status:"IN PRISON"},
  "Robert Hansen":{status:"DECEASED",death_date:"2014"},
  "Joseph DeAngelo":{status:"IN PRISON"},
  "Charles Cullen":{status:"IN PRISON"},
  "Marc Dutroux":{status:"IN PRISON"},
  "Bruce McArthur":{status:"IN PRISON"},
  "William Bonin":{status:"EXECUTED",death_date:"1996"},
  "Donald Gaskins":{status:"EXECUTED",death_date:"1991"},
  "David Parker Ray":{status:"DECEASED",death_date:"2002"},
  "Tsutomu Miyazaki":{status:"EXECUTED",death_date:"2008"},
  "Mikhail Popkov":{status:"IN PRISON"},
  "Jack the Ripper":{status:"UNIDENTIFIED"},
  "Zodiac Killer":{status:"UNIDENTIFIED"},

  /* NEW ADDITIONS */
  "Leonard Lake":{status:"DECEASED",death_date:"1985"},
  "Charles Ng":{status:"IN PRISON"},
  "Peter Tobin":{status:"DECEASED",death_date:"2022"},
  "Robert Maudsley":{status:"IN PRISON"},
  "Israel Keyes":{status:"DECEASED",death_date:"2012"},
  "Robert Berdella":{status:"DECEASED",death_date:"1992"},
  "Steven Pennell":{status:"EXECUTED",death_date:"1992"},
  "Cary Stayner":{status:"IN PRISON"},
  "John Bunting":{status:"IN PRISON"},
  "Robert Black":{status:"DECEASED",death_date:"2016"},
};

/* ─────────────────────────────────────────────────────────────
   METHODS
───────────────────────────────────────────────────────────── */

const KNOWN_METHODS = {
  "Ted Bundy":"Strangulation, bludgeoning",
  "Jeffrey Dahmer":"Strangulation, drugging",
  "John Wayne Gacy":"Strangulation, asphyxiation",
  "Gary Ridgway":"Strangulation",
  "Andrei Chikatilo":"Stabbing, mutilation",
  "Harold Shipman":"Lethal injection",
  "Aileen Wuornos":"Shooting",
  "Richard Ramirez":"Shooting, stabbing, strangulation",
  "Edmund Kemper":"Shooting, stabbing, strangulation",
  "Dennis Rader":"Strangulation, asphyxiation",
  "Albert Fish":"Strangulation, stabbing",
  "David Berkowitz":"Shooting",
  "H.H. Holmes":"Various, including gassing",
  "Dean Corll":"Shooting, strangulation",
  "Ed Gein":"Shooting",
  "Alexander Pichushkin":"Bludgeoning",

  /* NEW */
  "Leonard Lake":"Kidnapping, torture, murder (varied)",
  "Charles Ng":"Kidnapping, torture, murder (varied)",
  "Peter Tobin":"Sexual assault, murder (varied)",
  "Robert Maudsley":"Killing in custody (varied)",
  "Israel Keyes":"Abduction, strangulation, shooting (varied)",
  "Robert Berdella":"Torture, strangulation",
  "Steven Pennell":"Stabbing, strangulation",
  "Cary Stayner":"Strangulation",
  "John Bunting":"Torture, murder (varied)",
  "Robert Black":"Abduction, sexual assault, murder",
};

/* ─────────────────────────────────────────────────────────────
   NICKNAMES
───────────────────────────────────────────────────────────── */

const KNOWN_NICKNAMES = {
  "Ted Bundy":"The Lady Killer",
  "Jeffrey Dahmer":"The Milwaukee Cannibal",
  "John Wayne Gacy":"The Killer Clown",
  "Gary Ridgway":"The Green River Killer",
  "Andrei Chikatilo":"The Butcher of Rostov",
  "Harold Shipman":"Doctor Death",
  "Aileen Wuornos":"Damsel of Death",
  "Richard Ramirez":"The Night Stalker",
  "Edmund Kemper":"The Co-ed Killer",
  "Dennis Rader":"BTK Killer",
  "Albert Fish":"The Gray Man",
  "David Berkowitz":"Son of Sam",

  /* NEW */
  "Robert Berdella":"The Kansas City Butcher",
  "Steven Pennell":"The Route 40 Killer",
  "Cary Stayner":"Yosemite Park Killer",
  "John Bunting":"The Snowtown Killer",
  "Robert Black":"The Cross-Country Killer"
};

/* ─────────────────────────────────────────────────────────────
   KILLER LIST
───────────────────────────────────────────────────────────── */

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

  /* NEW */
  "Leonard Lake","Charles Ng","Peter Tobin","Robert Maudsley",
  "Israel Keyes","Robert Berdella","Steven Pennell","Cary Stayner",
  "John Bunting","Robert Black"
];

/* ─────────────────────────────────────────────────────────────
   IMPROVED EXTRACTORS
───────────────────────────────────────────────────────────── */

function extractYears(text){
  if(!text) return null;

  const fromTo=text.match(/\bfrom\s+(1[89]\d{2}|20[012]\d)\s+(?:to|until)\s+(1[89]\d{2}|20[012]\d)/i);
  if(fromTo) return `${fromTo[1]}–${fromTo[2]}`;

  const between=text.match(/\bbetween\s+(1[89]\d{2}|20[012]\d)\s+and\s+(1[89]\d{2}|20[012]\d)/i);
  if(between) return `${between[1]}–${between[2]}`;

  const dash=text.match(/\b(1[89]\d{2}|20[012]\d)\s*[–\-]\s*(1[89]\d{2}|20[012]\d)\b/);
  if(dash) return `${dash[1]}–${dash[2]}`;

  return null;
}

function extractCountry(text){
  if(!text) return null;
  const t=text.toLowerCase();

  const map=[
    ['american','United States'],
    ['british','United Kingdom'],
    ['canadian','Canada'],
    ['german','Germany'],
    ['french','France'],
    ['italian','Italy'],
    ['russian','Russia'],
    ['australian','Australia'],
    ['japanese','Japan'],
    ['belgian','Belgium'],
    ['polish','Poland'],
    ['south african','South Africa'],
  ];

  for(const [adj,country] of map){
    if(t.includes(adj)) return country;
  }
  return null;
}