// =============================================================================
// V60 Masters -- Visual System v3.0
// SVG Icons + CSS Gradients (zero external images, fully offline)
// Inspired by Timer.Coffee, Onyx Coffee Lab, Fellow Products
// =============================================================================

// --- SVG ICON LIBRARY (inline, <2KB each, no attribution needed) ---
const V60_SVG = {
  // V60 dripper icon
  v60: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 18h40l-8 48H28L20 18z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M16 18h48" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M36 66v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    <path d="M40 66v10" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".6"/>
    <path d="M44 66v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".5"/>
    <ellipse cx="40" cy="28" rx="12" ry="3" fill="currentColor" opacity=".12"/>
    <path d="M30 30c3 8 6 14 10 22" stroke="currentColor" stroke-width="1.5" opacity=".2" stroke-linecap="round"/>
    <path d="M50 30c-3 8-6 14-10 22" stroke="currentColor" stroke-width="1.5" opacity=".2" stroke-linecap="round"/>
  </svg>`,

  // Gooseneck kettle
  kettle: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="44" cy="52" rx="20" ry="14" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M24 48c-6-4-10-14-6-22 2-4 6-6 10-4" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M44 38v-6c0-2 2-4 4-4h6" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M18 22l-4-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".4"/>
    <path d="M15 28l-5-2" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".3"/>
  </svg>`,

  // Coffee beans
  beans: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="36" rx="14" ry="18" transform="rotate(-20 30 36)" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M22 24c4 10 4 20 0 28" stroke="currentColor" stroke-width="1.5" opacity=".4"/>
    <ellipse cx="52" cy="44" rx="12" ry="16" transform="rotate(15 52 44)" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M46 32c3 9 3 18 0 26" stroke="currentColor" stroke-width="1.5" opacity=".4"/>
  </svg>`,

  // Scale/weight
  scale: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="30" width="56" height="36" rx="6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <rect x="22" y="38" width="36" height="16" rx="3" stroke="currentColor" stroke-width="1.5" fill="none" opacity=".6"/>
    <text x="40" y="52" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" font-weight="700" fill="currentColor" opacity=".7">20.0g</text>
    <circle cx="40" cy="62" r="2" fill="currentColor" opacity=".3"/>
  </svg>`,

  // Grinder
  grinder: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="24" y="36" width="32" height="32" rx="4" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M28 36V28c0-4 4-8 12-8s12 4 12 8v8" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="40" cy="24" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M40 20v-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M36 12h8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="30" y="56" width="20" height="6" rx="2" stroke="currentColor" stroke-width="1.5" fill="none" opacity=".5"/>
  </svg>`,

  // Timer/clock
  timer: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="40" cy="44" r="24" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M40 28v16l10 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M34 16h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M40 16v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // Water drop
  water: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 12C40 12 20 38 20 52c0 11 9 20 20 20s20-9 20-20C60 38 40 12 40 12z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M32 52c0-6 4-14 8-20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
  </svg>`,

  // Thermometer
  temp: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M44 14v38a10 10 0 11-8 0V14a4 4 0 018 0z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="40" cy="58" r="6" fill="currentColor" opacity=".3"/>
    <path d="M40 52V28" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".5"/>
    <path d="M48 24h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
    <path d="M48 32h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
    <path d="M48 40h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
  </svg>`,

  // Filter paper
  filter: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 20h44l-10 50H28L18 20z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M18 20c8 4 28 4 44 0" stroke="currentColor" stroke-width="1.5" opacity=".3"/>
    <path d="M25 36h30" stroke="currentColor" stroke-width="1" opacity=".15"/>
    <path d="M27 44h26" stroke="currentColor" stroke-width="1" opacity=".15"/>
    <path d="M29 52h22" stroke="currentColor" stroke-width="1" opacity=".15"/>
  </svg>`,

  // Pour (water stream)
  pour: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 14c0 0-4 6-4 10s2 6 4 6 4-2 4-6-4-10-4-10z" stroke="currentColor" stroke-width="1.5" fill="none" opacity=".4"/>
    <path d="M40 8c0 0-4 6-4 10s2 6 4 6 4-2 4-6-4-10-4-10z" stroke="currentColor" stroke-width="1.5" fill="none" opacity=".5"/>
    <path d="M56 14c0 0-4 6-4 10s2 6 4 6 4-2 4-6-4-10-4-10z" stroke="currentColor" stroke-width="1.5" fill="none" opacity=".4"/>
    <path d="M22 40h36l-6 30H28l-6-30z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M40 34v6" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".6"/>
    <path d="M32 34v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".4"/>
    <path d="M48 34v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".4"/>
  </svg>`,

  // Cup of coffee
  cup: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 30h40v28c0 6-4 10-10 10H26c-6 0-10-4-10-10V30z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M56 36h6c4 0 6 3 6 6s-2 6-6 6h-6" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M28 22c0-4 4-6 8-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
    <path d="M36 18c0-4 4-6 8-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".25"/>
    <path d="M44 22c0-4 3-5 6-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".2"/>
  </svg>`,

  // Ice cubes
  ice: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="32" width="22" height="22" rx="4" stroke="currentColor" stroke-width="2.5" fill="none" transform="rotate(-8 25 43)"/>
    <rect x="40" y="28" width="22" height="22" rx="4" stroke="currentColor" stroke-width="2.5" fill="none" transform="rotate(5 51 39)"/>
    <rect x="28" y="48" width="18" height="18" rx="3" stroke="currentColor" stroke-width="2" fill="none" opacity=".5" transform="rotate(3 37 57)"/>
    <path d="M20 38l8 8" stroke="currentColor" stroke-width="1" opacity=".2"/>
    <path d="M48 34l6 6" stroke="currentColor" stroke-width="1" opacity=".2"/>
  </svg>`,

  // Book/learn
  book: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 20h24c4 0 4 2 4 4v36c0-4-4-4-4-4H12V20z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M68 20H44c-4 0-4 2-4 4v36c0-4 4-4 4-4h24V20z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M20 30h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
    <path d="M20 36h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".25"/>
    <path d="M48 30h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
    <path d="M48 36h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".25"/>
  </svg>`,

  // Wrench/fix
  wrench: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M56 18a16 16 0 00-22 4L18 62l4 4 40-16a16 16 0 00-6-32z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <circle cx="50" cy="30" r="6" stroke="currentColor" stroke-width="1.5" fill="none" opacity=".4"/>
  </svg>`,

  // Heart/favorite
  heart: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 66s-24-14-24-30c0-10 8-16 16-14 4 1 6 4 8 8 2-4 4-7 8-8 8-2 16 4 16 14 0 16-24 30-24 30z" stroke="currentColor" stroke-width="2.5" fill="none"/>
  </svg>`,

  // Trophy
  trophy: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 16h32v20c0 10-8 18-16 18s-16-8-16-18V16z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M24 24H14c0 8 4 14 10 16" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M56 24h10c0 8-4 14-10 16" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M34 54v6h12v-6" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M28 60h24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // Server/carafe
  server: `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 24h32v36c0 4-3 8-8 8H32c-5 0-8-4-8-8V24z" stroke="currentColor" stroke-width="2.5" fill="none"/>
    <path d="M24 24c0-4 3-8 8-8h16c5 0 8 4 8 8" stroke="currentColor" stroke-width="2" fill="none" opacity=".5"/>
    <path d="M56 36h6c3 0 5 2 5 5s-2 5-5 5h-6" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M28 36h24" stroke="currentColor" stroke-width="1" opacity=".15"/>
    <ellipse cx="40" cy="36" rx="12" ry="2" fill="currentColor" opacity=".08"/>
  </svg>`,
};

// --- ACCENT COLORS PER RECIPE (unique identity for each master) ---
const RECIPE_ACCENTS = {
  1:  { bg: 'linear-gradient(135deg, #3D2213 0%, #5D3019 40%, #8B5E3C 100%)', accent: '#D4913F', icon: 'v60' },    // Hoffmann - warm classic
  2:  { bg: 'linear-gradient(135deg, #1A3A4A 0%, #2471A3 50%, #5DADE2 100%)', accent: '#5DADE2', icon: 'ice' },     // Hoffmann Iced - cool blue
  3:  { bg: 'linear-gradient(135deg, #4A1A0A 0%, #8B4513 50%, #CD853F 100%)', accent: '#E8BF6A', icon: 'v60' },     // Kasuya 4:6 - amber gold
  4:  { bg: 'linear-gradient(135deg, #0D1B2A 0%, #1B3A4B 50%, #3D6B8E 100%)', accent: '#6BB3D9', icon: 'ice' },     // Kasuya Ice - deep navy
  5:  { bg: 'linear-gradient(135deg, #1A0E07 0%, #4A2614 50%, #7D4A24 100%)', accent: '#C17F3E', icon: 'kettle' },   // Rao - scientific dark
  6:  { bg: 'linear-gradient(135deg, #2C1810 0%, #5C3A28 50%, #8B6242 100%)', accent: '#B88B5E', icon: 'pour' },     // Winton - precision brown
  7:  { bg: 'linear-gradient(135deg, #3E1F47 0%, #6B3A7D 50%, #9B59B6 100%)', accent: '#BB8FCE', icon: 'v60' },     // Emi Fukahori - unique purple
  8:  { bg: 'linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #52B788 100%)', accent: '#74C69D', icon: 'pour' },     // Patrik Rolf April 6-pour - green
  9:  { bg: 'linear-gradient(135deg, #3D1F00 0%, #7D4A24 50%, #B8742D 100%)', accent: '#DCA621', icon: 'v60' },     // Lance Versatile - golden
  10: { bg: 'linear-gradient(135deg, #1A2A3A 0%, #34657A 50%, #4ECDC4 100%)', accent: '#76E5D4', icon: 'ice' },     // Lance Flash Brew - teal
  11: { bg: 'linear-gradient(135deg, #1A1A2E 0%, #2A2A4E 50%, #4A4A7E 100%)', accent: '#8B8BBE', icon: 'scale' },   // Gagne - scientific indigo
  12: { bg: 'linear-gradient(135deg, #3A1C0D 0%, #6B3E24 50%, #9B6B3C 100%)', accent: '#C8956C', icon: 'pour' },    // Wendelboe - Norwegian warm
  13: { bg: 'linear-gradient(135deg, #2D1B0E 0%, #5D3B1E 50%, #8D6B3E 100%)', accent: '#B89058', icon: 'v60' },     // Ben Put - balanced brown
  14: { bg: 'linear-gradient(135deg, #1A0A2E 0%, #3A1A5E 50%, #6B3FA0 100%)', accent: '#9B6FD0', icon: 'water' },   // Osmotic Flow - deep purple
  15: { bg: 'linear-gradient(135deg, #0D3B2E 0%, #1E6B4E 50%, #2E9B6E 100%)', accent: '#5EC492', icon: 'pour' },    // Patrik April 5-pour - emerald
  16: { bg: 'linear-gradient(135deg, #2A1508 0%, #5A3018 50%, #8B5028 100%)', accent: '#E8A84C', icon: 'v60' },     // Hoffmann Updated - warm amber
};

// --- CSS GRADIENT BACKGROUNDS (for section headers) ---
const SECTION_GRADIENTS = {
  hero:     'linear-gradient(155deg, #1A0E07 0%, #3D2213 40%, #5A3320 70%, #7D4A24 100%)',
  learn:    'linear-gradient(155deg, #1A0E07 0%, #2D1B10 40%, #4A2E1A 100%)',
  fix:      'linear-gradient(155deg, #1A0E07 0%, #3A1C0D 40%, #5D3019 100%)',
  tools:    'linear-gradient(155deg, #0C0907 0%, #1A1210 40%, #2D1B10 100%)',
  mybrews:  'linear-gradient(155deg, #1A0E07 0%, #3D2213 40%, #5A3320 100%)',
  onboard:  'linear-gradient(180deg, #1A0E07 0%, #3D2213 50%, #5D3019 100%)',
};

// --- MAIN API (backward-compatible with old COFFEE_IMAGES) ---
const COFFEE_IMAGES = {
  // Hero backgrounds — now CSS gradients (no network)
  hero: [
    SECTION_GRADIENTS.hero,
  ],

  // Category arrays — return gradient strings for backgrounds
  pourOver:   [SECTION_GRADIENTS.hero],
  beans:      [SECTION_GRADIENTS.hero],
  blackCoffee:[SECTION_GRADIENTS.hero],
  equipment:  [SECTION_GRADIENTS.tools],
  farm:       [SECTION_GRADIENTS.learn],
  onboarding: [SECTION_GRADIENTS.onboard],

  // Origins — each gets a unique warm gradient
  origins: {
    ethiopia:   'linear-gradient(135deg, #3D2213, #7D4A24)',
    colombia:   'linear-gradient(135deg, #2D6A4F, #52B788)',
    kenya:      'linear-gradient(135deg, #8B0000, #CD5C5C)',
    brazil:     'linear-gradient(135deg, #5D3019, #DCA621)',
    yemen:      'linear-gradient(135deg, #4A2614, #8B6242)',
    guatemala:  'linear-gradient(135deg, #1B4332, #74C69D)',
    costaRica:  'linear-gradient(135deg, #2471A3, #5DADE2)',
    panama:     'linear-gradient(135deg, #6B3FA0, #BB8FCE)',
    indonesia:  'linear-gradient(135deg, #5C3A28, #B88B5E)',
    rwanda:     'linear-gradient(135deg, #1A3A4A, #6BB3D9)',
    saudiArabia:'linear-gradient(135deg, #3A1C0D, #DCA621)',
    honduras:   'linear-gradient(135deg, #2D1B0E, #8D6B3E)',
    peru:       'linear-gradient(135deg, #4A1A0A, #CD853F)',
    elSalvador: 'linear-gradient(135deg, #3E1F47, #9B59B6)',
    burundi:    'linear-gradient(135deg, #2C1810, #8B6242)',
  },

  // Roast level gradients
  roast: {
    light:  'linear-gradient(135deg, #C8956C, #E8BF6A)',
    medium: 'linear-gradient(135deg, #8B5E3C, #C8956C)',
    dark:   'linear-gradient(135deg, #3D2213, #5D3019)',
  },

  // Recipe "images" — now returns gradient background + SVG icon identifier
  recipes: {
    1:  'gradient', 2:  'gradient', 3:  'gradient', 4:  'gradient',
    5:  'gradient', 6:  'gradient', 7:  'gradient', 8:  'gradient',
    9:  'gradient', 10: 'gradient', 11: 'gradient', 12: 'gradient',
    13: 'gradient', 14: 'gradient', 15: 'gradient', 16: 'gradient',
  },

  // Helper: get random from category
  random(category) {
    const arr = this[category];
    if (Array.isArray(arr)) return arr[Math.floor(Math.random() * arr.length)];
    return SECTION_GRADIENTS.hero;
  },

  // Helper: get recipe visual info
  forRecipe(id) {
    return RECIPE_ACCENTS[id] || RECIPE_ACCENTS[1];
  },

  // Helper: get origin gradient
  forOrigin(name) {
    const key = name.toLowerCase().replace(/\s+/g, '');
    return this.origins[key] || 'linear-gradient(135deg, #3D2213, #5D3019)';
  },

  // NEW: Generate card thumbnail HTML (SVG icon + gradient bg)
  cardThumbnail(recipeId, height) {
    const r = RECIPE_ACCENTS[recipeId] || RECIPE_ACCENTS[1];
    const svg = V60_SVG[r.icon] || V60_SVG.v60;
    const h = height || 140;
    return `<div class="cd-gradient-thumb" style="height:${h}px;background:${r.bg};display:flex;align-items:center;justify-content:center;border-radius:20px 20px 0 0;position:relative;overflow:hidden">
      <div style="color:${r.accent};opacity:.35;width:64px;height:64px">${svg}</div>
      <div style="position:absolute;inset:0;background:radial-gradient(circle at 30% 40%,rgba(255,255,255,.06) 0%,transparent 60%)"></div>
    </div>`;
  },

  // NEW: Generate section header background (pure CSS)
  sectionBg(section) {
    return SECTION_GRADIENTS[section] || SECTION_GRADIENTS.hero;
  },

  // NEW: Get SVG icon HTML
  icon(name, size) {
    const svg = V60_SVG[name] || V60_SVG.v60;
    const s = size || 24;
    return `<span style="display:inline-flex;width:${s}px;height:${s}px;color:currentColor">${svg}</span>`;
  }
};
