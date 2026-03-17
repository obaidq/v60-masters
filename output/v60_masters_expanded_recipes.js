/**
 * V60 Masters — Expanded Recipe Database (16 Masters + Variants)
 * Compiled from: YouTube videos, competition brew sheets, coffee blogs,
 * Reddit r/Coffee & r/pourover, official websites, Hario ambassador pages,
 * timer.coffee, BeanBook, Honest Coffee Guide, and published books.
 *
 * GRINDER CROSS-REFERENCE KEY:
 *   ode2     = Fellow Ode Gen 2 (stock burrs) — 1-11 scale, 31 steps
 *   ode2SSP  = Fellow Ode Gen 2 w/ SSP MP burrs — typically 0.5-1 step coarser
 *   comandante = Comandante C40 clicks (from zero)
 *   zpresso  = 1Zpresso JX/JX-Pro clicks (from zero)
 *   timemore = Timemore C2/C3 clicks (from zero)
 *
 * STATUS CODES: "verified" = confirmed from primary source; "community" = widely reported but not from expert directly
 */

const V60_MASTERS_RECIPES = [

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. JAMES HOFFMANN — Ultimate V60 Technique
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "hoffmann-ultimate",
    expert: "James Hoffmann",
    method: "Ultimate V60 Technique",
    methodAr: "تقنية V60 النهائية",
    year: 2019, // original video; updated 2022
    type: "hot",
    source: "YouTube (15M+ views), Hario Europe ambassador page, timer.coffee",
    status: "verified",

    // ── DOSE & WATER ──
    dose_g: 30,
    water_g: 500,
    ratio: "1:16.7",
    ratioNum: 16.7,
    yields_ml: 470, // ~94% of water weight

    // ── TEMPERATURE ──
    temp_c: 97,
    tempNote: "\"As hot as possible\" — Hario Europe page lists 97°C. In practice, boiling off the kettle. Updated video (2022) says \"I just use boiling.\"",

    // ── GRIND SIZE ──
    grind: {
      description: "Medium-fine. Hoffmann says \"finer than you think\" for light roasts.",
      ode2Stock: { min: 4, max: 5, sweet: 4.5 },
      ode2SSP: { min: 4.5, max: 5.5, sweet: 5 },
      comandante: { min: 22, max: 26, sweet: 24 },
      zpresso: { min: 80, max: 88, sweet: 84 },
      timemoreC2: { min: 20, max: 24, sweet: 22 },
      micronEstimate: "500-700μm"
    },

    // ── BREW TIMELINE ──
    totalTime: "3:00-3:30",
    totalTimeSec: 210,

    bloom: {
      water_g: 60,
      multiplier: "2x dose",
      time_sec: 45,
      technique: "Pour 60g in a spiral, then swirl/shake the brewer to saturate all grounds",
      agitation: "Swirl the V60 itself (don't stir with spoon)"
    },

    pourSteps: [
      {
        step: 1,
        label: "Bloom",
        timestamp: "0:00",
        addWater: 60,
        totalWater: 60,
        duration: "45 seconds wait",
        technique: "Gentle spiral pour center-to-edge, then swirl brewer",
        temp_c: 97
      },
      {
        step: 2,
        label: "Main Pour 1",
        timestamp: "0:45",
        addWater: 240,
        totalWater: 300,
        duration: "~30 seconds pour",
        technique: "Vigorous spiral pour from center outward — aim to agitate the bed",
        temp_c: 97
      },
      {
        step: 3,
        label: "Main Pour 2",
        timestamp: "1:15",
        addWater: 200,
        totalWater: 500,
        duration: "~30 seconds pour",
        technique: "Gentle center pour — minimal disturbance to the bed",
        temp_c: 97
      },
      {
        step: 4,
        label: "Agitation + Drawdown",
        timestamp: "1:45",
        addWater: 0,
        totalWater: 500,
        duration: "Drawdown ~1:45",
        technique: "Stir once clockwise, once counter-clockwise with spoon, then gentle swirl of the brewer. Let drain completely.",
        temp_c: null
      }
    ],

    // ── FILTER & SETUP ──
    filter: {
      rinse: true,
      rinseNote: "Rinse with hot water to remove paper taste and preheat brewer",
      type: "Hario V60 tabbed or untabbed white paper",
      preference: "No strong preference stated; uses standard Hario filters",
      foldNote: "Fold seam of tabbed filter, place in V60"
    },

    // ── AGITATION ──
    agitation: {
      bloom: "Swirl the entire V60 dripper",
      midBrew: "Stir 1x clockwise + 1x counter-clockwise with spoon after final pour",
      final: "Gentle swirl of entire brewer after stirring",
      raoSpin: false,
      notes: "Hoffmann swirl is distinct from Rao spin — it's a gentle shake/swirl, not a circular spin"
    },

    // ── BEST FOR ──
    bestBeans: {
      origins: ["Ethiopia (Yirgacheffe, Guji)", "Colombia (Huila)", "Guatemala", "Kenya"],
      roastLevel: "Light to medium-light",
      processing: ["Washed", "Natural"],
      note: "Works well with almost anything. Extremely forgiving method."
    },

    flavorEmphasis: "Even, balanced extraction. Clean cup with good sweetness. Not optimized for one dimension — designed to get the most out of any coffee without bias toward acidity or body.",

    commonMistakes: [
      "Pouring too slowly during pour 1 (should be vigorous to agitate)",
      "Not swirling during bloom — grounds stay dry in center",
      "Grinding too coarse — Hoffmann explicitly says 'finer than you think' for light roasts",
      "Skipping the stir after final pour",
      "Total time under 2:30 or over 4:00 — adjust grind",
      "Using water below 90°C — he recommends as hot as possible"
    ],

    v60SizeAdjust: {
      "01": { dose: "12-15g", water: "200-250g", bloom: "24-30g", note: "Same technique, scale down proportionally. Faster drawdown ~2:00-2:30" },
      "02": { dose: "15-30g", water: "250-500g", bloom: "30-60g", note: "Default size for this recipe" },
      "03": { dose: "30-50g", water: "500-850g", bloom: "60-100g", note: "May need slightly coarser grind. Drawdown can reach 4:00+" }
    },

    difficulty: "beginner",
    popularity: 5
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. TETSU KASUYA — 4:6 Method
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "kasuya-46",
    expert: "Tetsu Kasuya",
    method: "4:6 Method",
    methodAr: "طريقة 4:6",
    year: 2016,
    type: "hot",
    source: "WBrC 2016 competition, Philocoffea blog, Hario ambassador pages, Sprudge",
    status: "verified",

    dose_g: 20,
    water_g: 300,
    ratio: "1:15",
    ratioNum: 15,
    yields_ml: 282,

    temp_c: 92,
    tempNote: "92°C at competition. Philocoffea recommends ~93°C for light roasts. Never boiling — lower temp is deliberate for this coarse-grind method.",

    grind: {
      description: "Coarse — notably coarser than most V60 recipes. Kasuya compares to 'coarse sea salt' or 'raw sugar'.",
      ode2Stock: { min: 5.5, max: 6.5, sweet: 6 },
      ode2SSP: { min: 6, max: 7, sweet: 6.5 },
      comandante: { min: 28, max: 32, sweet: 30 },
      zpresso: { min: 90, max: 100, sweet: 95 },
      timemoreC2: { min: 26, max: 30, sweet: 28 },
      micronEstimate: "800-1000μm"
    },

    totalTime: "3:00-3:30",
    totalTimeSec: 210,

    bloom: {
      water_g: null,
      multiplier: "N/A — no distinct bloom phase; first pour IS the first 'taste' pour",
      time_sec: null,
      technique: "Pour #1 is effectively the bloom. Wait until bed runs dry before next pour.",
      agitation: "None — no swirl, no stir, nothing"
    },

    pourSteps: [
      {
        step: 1,
        label: "Pour 1 (sweetness/acidity control)",
        timestamp: "0:00",
        addWater: 50,
        totalWater: 50,
        duration: "Wait until bed drains completely (~45s)",
        technique: "Gentle center pour. COMPETITION version: 50g. SIMPLIFIED: 60g.",
        temp_c: 92,
        note: "First 2 pours = 40% of water. Control sweetness vs acidity here."
      },
      {
        step: 2,
        label: "Pour 2 (sweetness/acidity control)",
        timestamp: "~0:45",
        addWater: 70,
        totalWater: 120,
        duration: "Wait until bed drains completely (~35s)",
        technique: "Gentle center pour. COMPETITION: 70g. SIMPLIFIED: 60g.",
        temp_c: 92,
        note: "Larger pour 1 + smaller pour 2 = more sweet. Equal pours = more acidic."
      },
      {
        step: 3,
        label: "Pour 3 (strength control)",
        timestamp: "~1:20",
        addWater: 60,
        totalWater: 180,
        duration: "Wait until bed drains (~30s)",
        technique: "Gentle center pour",
        temp_c: 92
      },
      {
        step: 4,
        label: "Pour 4 (strength control)",
        timestamp: "~1:50",
        addWater: 60,
        totalWater: 240,
        duration: "Wait until bed drains (~30s)",
        technique: "Gentle center pour",
        temp_c: 92
      },
      {
        step: 5,
        label: "Pour 5 (strength control)",
        timestamp: "~2:20",
        addWater: 60,
        totalWater: 300,
        duration: "Final drawdown ~1:00",
        technique: "Gentle center pour, let drain completely",
        temp_c: 92,
        note: "Last 3 pours = 60% of water. More pours = stronger. Fewer = lighter."
      }
    ],

    adjustmentSystem: {
      sweetnessControl: "To increase sweetness, make pour 1 larger (e.g., 70g) and pour 2 smaller (50g). To increase acidity, reverse.",
      strengthControl: "For stronger coffee, use more pours in the 60% phase (e.g., 4 pours of 45g instead of 3 of 60g). For lighter, use fewer pours.",
      note: "This is the core innovation — separating taste control from strength control."
    },

    filter: {
      rinse: true,
      rinseNote: "Standard paper rinse",
      type: "Hario V60 white paper filter (tabbed)",
      preference: "Standard Hario. Kasuya also collaborated on Cafec filters."
    },

    agitation: {
      bloom: "None",
      midBrew: "None",
      final: "None",
      raoSpin: false,
      notes: "Kasuya uses ZERO agitation. No swirl, no stir, no spin. This is deliberate — the coarse grind and pulse pours provide sufficient extraction without agitation."
    },

    bestBeans: {
      origins: ["Colombia", "Brazil", "Guatemala", "El Salvador"],
      roastLevel: "Light to medium. Works especially well with medium roasts.",
      processing: ["Washed", "Natural"],
      note: "The low temp and coarse grind make this forgiving for darker roasts too. Competition used a washed Ethiopian."
    },

    flavorEmphasis: "The key selling point: adjustable sweetness-to-acidity ratio. Tends toward a sweeter, rounder cup with less emphasis on bright acidity. The coarse grind and no agitation produce a clean but not overly complex cup.",

    commonMistakes: [
      "Grinding too fine — this method uses the coarsest grind of any V60 recipe",
      "Not waiting for bed to fully drain between pours",
      "Using boiling water — 92°C is deliberate; higher temps will over-extract at this grind",
      "Pouring too aggressively — gentle center pour only, no spirals",
      "Confusing the simplified (5x60g) with competition (50/70/60/60/60) version"
    ],

    v60SizeAdjust: {
      "01": { dose: "10-12g", water: "150-180g", note: "Scale pours proportionally. 5 pours of 30-36g." },
      "02": { dose: "20g", water: "300g", note: "Default size" },
      "03": { dose: "30-40g", water: "450-600g", note: "Same 5-pour technique, just larger pours" }
    },

    difficulty: "beginner",
    popularity: 5
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. SCOTT RAO — V60 Method
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "rao-v60",
    expert: "Scott Rao",
    method: "Two-Pour V60 Method",
    methodAr: "طريقة الصبّتين",
    year: 2017,
    type: "hot",
    source: "Hario UK ambassador interview, scottrao.com blog, coffeeadastra.com cross-reference",
    status: "verified",

    dose_g: 20,
    water_g: 330,
    ratio: "~1:16.5",
    ratioNum: 16.5,
    yields_ml: 310,

    temp_c: 97,
    tempNote: "\"As hot as possible.\" 97°C is the measured kettle temp. Philosophy: higher temp compensates for heat loss through brewer and produces more even extraction. Prefers boiling for light roasts.",

    grind: {
      description: "Medium-fine. Similar to Hoffmann. Rao insists on even particle distribution — advocates EK43 or high-quality flat burrs.",
      ode2Stock: { min: 4, max: 5, sweet: 4.5 },
      ode2SSP: { min: 4.5, max: 5.5, sweet: 5 },
      comandante: { min: 22, max: 26, sweet: 24 },
      zpresso: { min: 80, max: 88, sweet: 84 },
      timemoreC2: { min: 20, max: 24, sweet: 22 },
      micronEstimate: "500-700μm"
    },

    totalTime: "4:00-4:30",
    totalTimeSec: 255,

    bloom: {
      water_g: 60,
      multiplier: "3x dose",
      time_sec: 40,
      technique: "Pour 60g, then immediately perform an aggressive Rao spin",
      agitation: "Aggressive Rao spin — pick up brewer and swirl in circular motion to fully saturate grounds"
    },

    pourSteps: [
      {
        step: 1,
        label: "Bloom",
        timestamp: "0:00",
        addWater: 60,
        totalWater: 60,
        duration: "40 seconds",
        technique: "Pour 60g in center, then aggressive Rao spin",
        temp_c: 97
      },
      {
        step: 2,
        label: "Pour 1",
        timestamp: "0:40",
        addWater: 140,
        totalWater: 200,
        duration: "Wait until ~70% drained",
        technique: "Steady center pour to 200g, then gentle Rao spin. Wait until slurry has dropped ~70% (his exact words).",
        temp_c: 97,
        note: "Don't wait for full drain — 70% is key"
      },
      {
        step: 3,
        label: "Pour 2",
        timestamp: "~1:30-2:00",
        addWater: 130,
        totalWater: 330,
        duration: "Full drawdown ~2:00-2:30",
        technique: "Pour to 330g, gentle Rao spin. Let drain completely.",
        temp_c: 97,
        note: "Start pour 2 when slurry is ~70% through. Aim for flat bed at finish."
      }
    ],

    filter: {
      rinse: true,
      rinseNote: "Thorough rinse with hot water. Rao emphasizes this.",
      type: "Hario V60 white paper",
      preference: "Strongly recommends PLASTIC V60 (not ceramic or glass) for heat retention. The plastic brewer maintains temperature far better."
    },

    agitation: {
      bloom: "Aggressive Rao spin — the defining move of this method",
      midBrew: "Gentle Rao spin after each pour",
      final: "Gentle spin after pour 2; nothing more",
      raoSpin: true,
      raoSpinNote: "Pick up V60, swirl in a circular motion. Bloom = aggressive (saturate all grounds). Pours = gentle (knock grounds off sidewalls, level bed). Never stir with a spoon.",
      notes: "The Rao spin is the signature technique. It knocks grounds off the paper walls back into the bed and creates a level, even surface for uniform extraction."
    },

    bestBeans: {
      origins: ["Colombia", "Guatemala", "Ethiopia (washed)", "Costa Rica"],
      roastLevel: "Light to medium. His method targets high extraction (22-24.5% EY).",
      processing: ["Washed"],
      note: "Rao's method is designed for achieving very high extractions. Works best with high-quality, well-roasted light coffees."
    },

    flavorEmphasis: "Maximum extraction yield (22-24.5% target). Produces a full-bodied, well-developed cup with high sweetness. The long brew time and high temperature pull out everything the coffee has. Clean finish with a flat bed.",

    commonMistakes: [
      "Not spinning aggressively enough on bloom — all grounds MUST be saturated",
      "Waiting for full drain before pour 2 — should be at 70% drained",
      "Using ceramic/glass V60 — heat loss significantly affects this method; use plastic",
      "Grinding too coarse — this is a medium-fine method, not coarse",
      "Spinning too aggressively after pours (only bloom gets aggressive spin)",
      "Total time under 3:30 = too coarse; over 5:00 = too fine"
    ],

    v60SizeAdjust: {
      "01": { dose: "12-15g", water: "200-250g", bloom: "36-45g", note: "Scale proportionally. Drawdown faster: 3:00-3:30 total." },
      "02": { dose: "20g", water: "330g", bloom: "60g", note: "Default" },
      "03": { dose: "30-40g", water: "500-660g", bloom: "90-120g", note: "May need slightly coarser grind. Longer brew time is normal." }
    },

    extractionTarget: "22-24.5% EY measured with refractometer",
    difficulty: "intermediate",
    popularity: 4
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. MATT WINTON — World Brewers Cup 2021
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "winton-fivepour",
    expert: "Matt Winton",
    method: "Five-Pour Method",
    methodAr: "طريقة الخمس صبّات",
    year: 2021,
    type: "hot",
    source: "WBrC 2021 competition, Barista Hustle interview, Honest Coffee Guide, acaia interview",
    status: "verified",

    dose_g: 20,
    water_g: 300,
    ratio: "1:15",
    ratioNum: 15,
    yields_ml: 282,

    temp_c: 93,
    tempNote: "DUAL TEMPERATURE SYSTEM: 93°C for bloom/first pour, ~88°C for pours 2-5. Uses two kettles at competition. At home, let kettle cool ~30 seconds between bloom and subsequent pours.",

    grind: {
      description: "Coarse for a V60 method. Similar to Kasuya. The coarse grind compensates for the high agitation from pour height.",
      ode2Stock: { min: 5, max: 6, sweet: 5.5 },
      ode2SSP: { min: 5.5, max: 6.5, sweet: 6 },
      comandante: { min: 26, max: 32, sweet: 29 },
      zpresso: { min: 88, max: 96, sweet: 92 },
      timemoreC2: { min: 24, max: 28, sweet: 26 },
      micronEstimate: "750-950μm"
    },

    totalTime: "3:00-3:30",
    totalTimeSec: 210,

    bloom: {
      water_g: 60,
      multiplier: "3x dose",
      time_sec: null,
      technique: "Pour 60g from height. No swirl. Wait until bed nearly drains before next pour.",
      agitation: "None — agitation comes from pour height only"
    },

    pourSteps: [
      {
        step: 1,
        label: "Pour 1 (bloom)",
        timestamp: "0:00",
        addWater: 60,
        totalWater: 60,
        duration: "Until bed nearly drains (~35-40s)",
        technique: "Pour from height (15-20cm above bed). 93°C. Center pour.",
        temp_c: 93,
        note: "Higher temperature for first pour to kickstart extraction"
      },
      {
        step: 2,
        label: "Pour 2",
        timestamp: "~0:40",
        addWater: 60,
        totalWater: 120,
        duration: "Until bed nearly drains (~30s)",
        technique: "Pour from height. Switch to ~88°C kettle.",
        temp_c: 88
      },
      {
        step: 3,
        label: "Pour 3",
        timestamp: "~1:10",
        addWater: 60,
        totalWater: 180,
        duration: "Until bed nearly drains (~30s)",
        technique: "Pour from height, center. ~88°C.",
        temp_c: 88
      },
      {
        step: 4,
        label: "Pour 4",
        timestamp: "~1:40",
        addWater: 60,
        totalWater: 240,
        duration: "Until bed nearly drains (~30s)",
        technique: "Pour from height, center. ~88°C.",
        temp_c: 88
      },
      {
        step: 5,
        label: "Pour 5",
        timestamp: "~2:10",
        addWater: 60,
        totalWater: 300,
        duration: "Final drawdown ~1:00-1:20",
        technique: "Pour from height. Let drain completely.",
        temp_c: 88
      }
    ],

    filter: {
      rinse: true,
      rinseNote: "Standard rinse",
      type: "Hario V60 white tabbed paper filter",
      preference: "Used Hario plastic V60 02 at competition"
    },

    agitation: {
      bloom: "None — no swirl, no stir",
      midBrew: "None",
      final: "None",
      raoSpin: false,
      notes: "Winton's innovation: ALL agitation comes from pour HEIGHT. He pours from ~15-20cm above the bed, creating turbulence naturally. This replaces swirling/stirring entirely. The physics: higher pour = more kinetic energy when water hits bed = more agitation."
    },

    bestBeans: {
      origins: ["Ethiopia (washed)", "Kenya", "Panama Geisha", "Colombia (competition lots)"],
      roastLevel: "Very light / Nordic-style roasts",
      processing: ["Washed"],
      note: "Competition used a blend (unusual for WBrC). The dual-temp system excels with delicate, complex light roasts."
    },

    flavorEmphasis: "Clarity and complexity. The dual-temperature approach extracts bright top-notes with the hot first pour, then uses cooler water to gently extract sweetness without pulling bitterness. Produces a juicy, tea-like cup with high clarity.",

    commonMistakes: [
      "Not pouring from sufficient height — the height IS the agitation method",
      "Using single temperature — the dual-temp is essential to this recipe's character",
      "Grinding too fine — coarse grind is needed because pour height adds significant agitation",
      "Not letting bed drain between pours — each pour starts with a nearly-dry bed",
      "At home: trying to replicate exact competition protocol (dual kettles, specific blends)"
    ],

    v60SizeAdjust: {
      "01": { dose: "12-13g", water: "180-195g", note: "5 pours of ~36-39g" },
      "02": { dose: "20g", water: "300g", note: "Default" },
      "03": { dose: "30g", water: "450g", note: "5 pours of 90g" }
    },

    difficulty: "advanced",
    popularity: 3
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. LANCE HEDRICK — Crystal Clear / Versatile V60
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "hedrick-versatile",
    expert: "Lance Hedrick",
    method: "Versatile V60 Recipe",
    methodAr: "الوصفة المرنة",
    year: 2022,
    type: "hot",
    source: "YouTube 'Ultimate Pourover Recipe', BeanBook, timer.coffee",
    status: "verified",

    dose_g: 20,
    water_g: 340,
    ratio: "1:17",
    ratioNum: 17,
    yields_ml: 320,

    temp_c: 100,
    tempNote: "Boiling water (100°C at sea level). Hedrick is a firm believer in boiling water for all pour-over. He argues lower temps don't extract enough from light roasts.",

    grind: {
      description: "Medium. Hedrick cites ~720 microns as target. He consulted on Fellow Ode Gen 2 burr design.",
      ode2Stock: { min: 4, max: 5, sweet: 4.5 },
      ode2SSP: { min: 4.5, max: 5.5, sweet: 5 },
      comandante: { min: 22, max: 26, sweet: 24 },
      zpresso: { min: 80, max: 88, sweet: 84 },
      timemoreC2: { min: 20, max: 24, sweet: 22 },
      micronEstimate: "~720μm target"
    },

    totalTime: "2:30-3:30",
    totalTimeSec: 180,

    bloom: {
      water_g: 100,
      multiplier: "5x dose (combined double bloom: 50g + 50g)",
      time_sec: 60,
      technique: "Two small pours of 50g each, 30 seconds apart. Swirl after each.",
      agitation: "Swirl/spin the brewer after each 50g pour"
    },

    pourSteps: [
      {
        step: 1,
        label: "Bloom A",
        timestamp: "0:00",
        addWater: 50,
        totalWater: 50,
        duration: "30 seconds",
        technique: "Center pour 50g, swirl brewer",
        temp_c: 100
      },
      {
        step: 2,
        label: "Bloom B",
        timestamp: "0:30",
        addWater: 50,
        totalWater: 100,
        duration: "30 seconds",
        technique: "Center pour 50g, swirl brewer. This second bloom saturates any remaining dry pockets.",
        temp_c: 100
      },
      {
        step: 3,
        label: "Main Pour 1",
        timestamp: "1:00",
        addWater: 120,
        totalWater: 220,
        duration: "~30 seconds pour",
        technique: "Steady center pour, then swirl",
        temp_c: 100
      },
      {
        step: 4,
        label: "Main Pour 2",
        timestamp: "1:30",
        addWater: 120,
        totalWater: 340,
        duration: "Drawdown 1:00-2:00",
        technique: "Steady center pour, gentle swirl. Let drain completely.",
        temp_c: 100
      }
    ],

    filter: {
      rinse: true,
      rinseNote: "Rinse with hot water",
      type: "Hario V60 tabbed white paper",
      preference: "Has also used Sibarist FAST specialty filters. Standard Hario is fine."
    },

    agitation: {
      bloom: "Swirl after each of the two bloom pours",
      midBrew: "Swirl after each main pour",
      final: "Final swirl after pour 4",
      raoSpin: true,
      notes: "Swirl after EVERY pour. This is the key consistency mechanism. The double bloom (2x50g instead of 1x100g) ensures even saturation. Hedrick calls this approach 'versatile' because it works across all roast levels and origins."
    },

    bestBeans: {
      origins: ["Any origin — designed as universal recipe", "Ethiopian", "Colombian", "Kenyan"],
      roastLevel: "Light to medium. Also works for medium-dark with minor adjustments (lower temp to 93°C).",
      processing: ["Washed", "Natural", "Honey"],
      note: "Specifically designed to work with ANY coffee. That's the 'versatile' part."
    },

    flavorEmphasis: "Balanced clarity with good sweetness. The 1:17 ratio produces a lighter, more tea-like cup than 1:15 methods. The double bloom ensures complete saturation and even extraction from the start. Clean, sweet, drinkable.",

    commonMistakes: [
      "Treating the two bloom pours as one big pour — they should be distinct with a swirl between",
      "Not swirling after each pour — this is essential to the method",
      "Using water below 96°C — Hedrick insists on boiling",
      "Grinding too fine — this should be medium, not medium-fine",
      "Expecting heavy body — 1:17 is intentionally lighter/cleaner"
    ],

    v60SizeAdjust: {
      "01": { dose: "12g", water: "204g", note: "Bloom: 2x30g. Main: 2x72g." },
      "02": { dose: "20g", water: "340g", note: "Default" },
      "03": { dose: "30g", water: "510g", note: "Bloom: 2x75g. Main: 2x180g." }
    },

    difficulty: "beginner",
    popularity: 4
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. PATRIK ROLF — April Coffee / SEY Coffee V60
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "rolf-april",
    expert: "Patrik Rolf",
    method: "April Coffee V60 Method",
    methodAr: "طريقة April Coffee",
    year: 2018,
    type: "hot",
    source: "aprilcoffeeroasters.com blog (August 2018), WBrC 2019 silver routine",
    status: "verified",

    dose_g: 20,
    water_g: 300,
    ratio: "1:15",
    ratioNum: 15,
    yields_ml: 282,

    temp_c: 92,
    tempNote: "92°C. A moderate temperature typical of Scandinavian/Nordic light-roast methods. Some April Coffee guides suggest 90-94°C depending on roast.",

    grind: {
      description: "Coarse for V60. Similar to Kasuya 4:6. The many small pulses compensate for the coarse grind.",
      ode2Stock: { min: 5.5, max: 6.5, sweet: 6 },
      ode2SSP: { min: 6, max: 7, sweet: 6.5 },
      comandante: { min: 28, max: 32, sweet: 30 },
      zpresso: { min: 90, max: 100, sweet: 95 },
      timemoreC2: { min: 26, max: 30, sweet: 28 },
      micronEstimate: "800-1000μm"
    },

    totalTime: "3:10-3:30",
    totalTimeSec: 205,

    bloom: {
      water_g: 50,
      multiplier: "2.5x dose (first pour = bloom)",
      time_sec: 40,
      technique: "First of 6 equal pours. Aggressive circular pour.",
      agitation: "Aggressive circular pouring technique — not a swirl of the brewer, but the pour pattern itself"
    },

    pourSteps: [
      {
        step: 1,
        label: "Pour 1 (bloom)",
        timestamp: "0:00",
        addWater: 50,
        totalWater: 50,
        duration: "40s until next pour",
        technique: "Aggressive circular pour",
        temp_c: 92
      },
      {
        step: 2,
        label: "Pour 2",
        timestamp: "0:40",
        addWater: 50,
        totalWater: 100,
        duration: "30s until next pour",
        technique: "Aggressive circular pour",
        temp_c: 92
      },
      {
        step: 3,
        label: "Pour 3",
        timestamp: "1:10",
        addWater: 50,
        totalWater: 150,
        duration: "30s until next pour",
        technique: "Aggressive circular pour",
        temp_c: 92
      },
      {
        step: 4,
        label: "Pour 4",
        timestamp: "1:40",
        addWater: 50,
        totalWater: 200,
        duration: "30s until next pour",
        technique: "Aggressive circular pour",
        temp_c: 92
      },
      {
        step: 5,
        label: "Pour 5",
        timestamp: "2:10",
        addWater: 50,
        totalWater: 250,
        duration: "30s until next pour",
        technique: "Aggressive circular pour",
        temp_c: 92
      },
      {
        step: 6,
        label: "Pour 6",
        timestamp: "2:40",
        addWater: 50,
        totalWater: 300,
        duration: "Final drawdown ~30-50s",
        technique: "Aggressive circular pour, let drain",
        temp_c: 92
      }
    ],

    filter: {
      rinse: true,
      rinseNote: "Standard rinse",
      type: "Hario V60 white paper or Cafec filters",
      preference: "April Coffee sometimes uses Cafec Abaca+ filters for increased clarity"
    },

    agitation: {
      bloom: "Aggressive circular pour pattern (not brewer swirl)",
      midBrew: "Each pour uses aggressive circular motion",
      final: "No additional agitation after final pour",
      raoSpin: false,
      notes: "Rolf uses the POUR PATTERN as agitation — aggressive circular pours create turbulence in the bed. No swirling or spinning the brewer. No stirring. The agitation is built into the pouring technique itself."
    },

    bestBeans: {
      origins: ["Ethiopia (washed Yirgacheffe)", "Kenya", "Rwanda", "Nordic light roasts"],
      roastLevel: "Very light. This is a Nordic-style brew recipe.",
      processing: ["Washed"],
      note: "April Coffee is known for extremely light Scandinavian-style roasts. This recipe is optimized for that profile."
    },

    flavorEmphasis: "Extreme clarity and transparency. The many small pulses with aggressive circular pours create uniform extraction with high clarity — you can taste individual flavor notes distinctly. Tea-like body with bright, well-defined acidity. This recipe favors acidity and clarity over body and sweetness.",

    commonMistakes: [
      "Pouring too gently — the circular pours should be aggressive",
      "Not maintaining the exact timing intervals (30-40s between pours)",
      "Grinding too fine — this is a coarse-grind method",
      "Using boiling water — 92°C is intentional for this light-roast recipe",
      "Expecting heavy body — this produces a light, clear cup"
    ],

    v60SizeAdjust: {
      "01": { dose: "12g", water: "180g", note: "6 pours of 30g" },
      "02": { dose: "20g", water: "300g", note: "Default" },
      "03": { dose: "30g", water: "450g", note: "6 pours of 75g" }
    },

    difficulty: "intermediate",
    popularity: 3
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. JONATHAN GAGNÉ — Blooming/Scientific V60
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "gagne-v60",
    expert: "Jonathan Gagné",
    method: "V60 Recipe (coffeeadastra.com)",
    methodAr: "وصفة V60 العلمية",
    year: 2019,
    type: "hot",
    source: "coffeeadastra.com (June 2019 blog post + video), The Physics of Filter Coffee (book)",
    status: "verified",

    dose_g: 22,
    water_g: 374,
    ratio: "1:17",
    ratioNum: 17,
    yields_ml: 352,

    temp_c: 100,
    tempNote: "Boiling (100°C). Gagné is adamant about this. His physics analysis shows boiling water provides the highest and most consistent thermal energy for extraction. Lower temperatures are an uncontrolled variable.",

    grind: {
      description: "Medium-fine. Similar to Rao. Gagné measures with laser particle analysis — he targets a specific distribution curve, not just average size.",
      ode2Stock: { min: 4, max: 5, sweet: 4.5 },
      ode2SSP: { min: 4.5, max: 5.5, sweet: 5 },
      comandante: { min: 22, max: 26, sweet: 24 },
      zpresso: { min: 80, max: 88, sweet: 84 },
      timemoreC2: { min: 20, max: 24, sweet: 22 },
      micronEstimate: "500-700μm"
    },

    totalTime: "~4:03",
    totalTimeSec: 243,

    bloom: {
      water_g: 77,
      multiplier: "3.5x dose — notably higher than most methods",
      time_sec: 40,
      technique: "Pour 77g, then spin the brewer. The 3.5x ratio ensures complete saturation of grounds — his research shows 2x is often insufficient.",
      agitation: "Spin (Rao-style) after bloom pour"
    },

    pourSteps: [
      {
        step: 1,
        label: "Bloom",
        timestamp: "0:00",
        addWater: 77,
        totalWater: 77,
        duration: "~40 seconds",
        technique: "Pour 77g (3.5x dose), spin the brewer",
        temp_c: 100,
        note: "3.5x bloom is based on his research showing 2x often leaves dry pockets"
      },
      {
        step: 2,
        label: "Pour 1",
        timestamp: "~0:40",
        addWater: 123,
        totalWater: 200,
        duration: "Wait until most water has drained",
        technique: "Steady pour to 200g, then spin the brewer",
        temp_c: 100
      },
      {
        step: 3,
        label: "Pour 2",
        timestamp: "~1:40",
        addWater: 174,
        totalWater: 374,
        duration: "Final drawdown ~2:20",
        technique: "Pour to 374g, spin the brewer. Let drain completely.",
        temp_c: 100,
        note: "Target flat bed at finish"
      }
    ],

    filter: {
      rinse: true,
      rinseNote: "Rinse with boiling water",
      type: "Hario V60 tabbed white paper",
      preference: "Prefers tabbed filters. Has tested many — standard Hario works."
    },

    agitation: {
      bloom: "Spin after bloom",
      midBrew: "Spin after each pour",
      final: "Spin after final pour",
      raoSpin: true,
      notes: "Credits Scott Rao as primary influence. Uses Rao spin after every pour. His contribution is the scientific rigor — he verified Rao's intuitions with physics measurements."
    },

    bestBeans: {
      origins: ["Ethiopia (washed)", "Kenya", "Panama Geisha", "Any high-quality light roast"],
      roastLevel: "Very light. Method is designed for maximum extraction of light roasts.",
      processing: ["Washed"],
      note: "Gagné's scientific approach is designed to maximize the potential of expensive, light-roasted specialty coffee."
    },

    flavorEmphasis: "High-extraction clarity. The 3.5x bloom, boiling water, and Rao spins combine for very thorough, even extraction. Produces a clean cup with full flavor development — both acidity and sweetness are well-extracted. Scientific precision in a cup.",

    commonMistakes: [
      "Using lower bloom ratio (2x instead of 3.5x) — his research shows 2x is insufficient",
      "Not using boiling water — he's proven this matters for light roasts",
      "Not spinning after each pour",
      "Total time significantly off from 4:03 — adjust grind",
      "Expecting the recipe to work well with dark roasts — optimized for light"
    ],

    v60SizeAdjust: {
      "01": { dose: "13g", water: "221g", bloom: "~46g (3.5x)", note: "Scale proportionally" },
      "02": { dose: "22g", water: "374g", bloom: "77g", note: "Default" },
      "03": { dose: "33g", water: "561g", bloom: "~116g", note: "Longer drawdown expected" }
    },

    difficulty: "intermediate",
    popularity: 3
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 8. EMI FUKAHORI — World Brewers Cup 2018
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "fukahori-hybrid",
    expert: "Emi Fukahori",
    method: "Hybrid Immersion Method",
    methodAr: "الطريقة الهجينة (غمر + تقطير)",
    year: 2018,
    type: "hot",
    source: "WBrC 2018 competition, Goat Story blog, European Coffee Trip, Ovalware profile",
    status: "verified",

    dose_g: 17,
    water_g: 220,
    ratio: "~1:12.9",
    ratioNum: 12.9,
    yields_ml: 207,

    temp_c: 80,
    tempNote: "DUAL TEMPERATURE: 80°C for immersion stages, 95°C for drip stage. This is the most temperature-dynamic recipe of all 16 masters.",

    grind: {
      description: "Coarse. The immersion stages require coarser grind to prevent over-extraction during soak periods.",
      ode2Stock: { min: null, max: null, sweet: null },
      ode2SSP: { min: null, max: null, sweet: null },
      comandante: { min: 28, max: 34, sweet: 31 },
      zpresso: { min: 90, max: 100, sweet: 95 },
      timemoreC2: { min: 26, max: 30, sweet: 28 },
      micronEstimate: "800-1100μm",
      note: "Original uses GINA brewer, not standard V60. Ode settings not applicable without Hario Switch adaptation."
    },

    totalTime: "~2:55",
    totalTimeSec: 175,

    bloom: {
      water_g: 50,
      multiplier: "~3x dose (stage 1 acts as bloom)",
      time_sec: 45,
      technique: "50g of 80°C water with valve CLOSED. This is an immersion bloom — the grounds sit in water rather than draining through.",
      agitation: "Gentle stir to saturate"
    },

    pourSteps: [
      {
        step: 1,
        label: "Stage 1 — Immersion",
        timestamp: "0:00",
        addWater: 50,
        totalWater: 50,
        duration: "0:00 to 0:45 (45 seconds)",
        technique: "Valve CLOSED. Pour 50g at 80°C. Grounds steep in water.",
        temp_c: 80,
        note: "Low temp immersion extracts sweetness and body without harsh acids"
      },
      {
        step: 2,
        label: "Stage 2 — Drip/Percolation",
        timestamp: "0:45",
        addWater: 100,
        totalWater: 150,
        duration: "0:45 to 1:45 (60 seconds)",
        technique: "Open valve. Pour 100g at 95°C. Water drips through bed.",
        temp_c: 95,
        note: "Higher temp percolation extracts acidity and aromatic compounds"
      },
      {
        step: 3,
        label: "Stage 3 — Immersion",
        timestamp: "1:45",
        addWater: 70,
        totalWater: 220,
        duration: "1:45 to 2:30 (45 seconds)",
        technique: "Close valve. Pour 70g at 80°C. Steep again.",
        temp_c: 80,
        note: "Final immersion rounds out body and sweetness"
      },
      {
        step: 4,
        label: "Stage 4 — Drain",
        timestamp: "2:30",
        addWater: 0,
        totalWater: 220,
        duration: "2:30 to 2:55 (25 seconds)",
        technique: "Open valve. Let all liquid drain through.",
        temp_c: null
      }
    ],

    filter: {
      rinse: true,
      rinseNote: "Pre-wet filter",
      type: "GINA brewer uses its own paper filter (cone-shaped, similar to V60)",
      preference: "GINA by Goat Story is the original brewer. Can be adapted to Hario Switch (V60 with valve).",
      adaptationNote: "To replicate with Hario Switch: close valve for immersion stages, open for drip. Use V60 02 tabbed filter."
    },

    agitation: {
      bloom: "Gentle stir during stage 1",
      midBrew: "None during stages 2-3",
      final: "None",
      raoSpin: false,
      notes: "Minimal agitation. The immersion stages handle extraction through time and temperature, not turbulence."
    },

    bestBeans: {
      origins: ["Ethiopia", "Colombia", "Costa Rica (honey)"],
      roastLevel: "Light to medium. Competition used Laurina varietal (naturally low caffeine).",
      processing: ["Natural", "Honey", "Washed"],
      note: "The low ratio (~1:12.9) was specifically chosen for Laurina (resistant to over-extraction). For normal coffee, you may want to increase to 1:14-1:15 or use a slightly coarser grind."
    },

    flavorEmphasis: "Creamy body combined with clean finish. The hybrid method gets the best of both worlds: immersion gives body and sweetness (like French press), percolation gives clarity and brightness (like V60). Complex, layered cup. Often described as 'silky' or 'velvety'.",

    commonMistakes: [
      "Using a standard V60 without a valve — you need a switch/valve mechanism",
      "Not switching temperatures between stages — the dual temp is essential",
      "Using the same ratio with normal (non-Laurina) beans — reduce ratio or coarsen grind",
      "Opening valve too late in stage 4 — the 25-second drain is intentional",
      "Over-stirring during immersion stages"
    ],

    v60SizeAdjust: {
      "01": { dose: "10g", water: "130g", note: "Scale stages proportionally: 30g/60g/40g/drain" },
      "02": { dose: "17g", water: "220g", note: "Default (requires Hario Switch or GINA)" },
      "03": null // GINA/Switch only comes in 02 equivalent
    },

    brewerNote: "This recipe requires a VALVE BREWER. Standard Hario V60 cannot replicate this. Options: GINA by Goat Story, Hario Switch, December Dripper, Clever Dripper (conical).",
    difficulty: "advanced",
    popularity: 3
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 9. TIM WENDELBOE — Nordic Approach
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "wendelboe-staged",
    expert: "Tim Wendelboe",
    method: "Staged Pour Method",
    methodAr: "الصبّ المرحلي — الأسلوب النوردي",
    year: 2015,
    type: "hot",
    source: "timwendelboe.no brew guide, Home-Barista forum, WBC 2004 background",
    status: "partial",

    dose_g: 32.5,
    water_g: 500,
    ratio: "1:15.4",
    ratioNum: 15.4,
    yields_ml: 470,

    temp_c: 98,
    tempNote: "Temperature NOT published on timwendelboe.no. Community consensus is ~98°C. His philosophy aligns with Nordic tradition: hot water, light roast, maximum extraction.",

    grind: {
      description: "Adjust by taste — Wendelboe doesn't specify a fixed grind. Start medium and adjust based on brew time and flavor.",
      ode2Stock: { min: 3.5, max: 5, sweet: 4.5 },
      ode2SSP: { min: 4, max: 5.5, sweet: 5 },
      comandante: { min: 20, max: 26, sweet: 23 },
      zpresso: { min: 78, max: 88, sweet: 83 },
      timemoreC2: { min: 18, max: 24, sweet: 21 },
      micronEstimate: "Variable — 500-800μm"
    },

    totalTime: "3:00-3:30",
    totalTimeSec: 195,

    bloom: {
      water_g: 60,
      multiplier: "~1.85x dose",
      time_sec: 30,
      technique: "Pour ~60g, stir with a spoon to saturate all grounds. 30 seconds.",
      agitation: "Stir with spoon — one of the few masters who uses a spoon during bloom"
    },

    pourSteps: [
      {
        step: 1,
        label: "Bloom",
        timestamp: "0:00",
        addWater: 60,
        totalWater: 60,
        duration: "30 seconds",
        technique: "Pour ~60g, stir with spoon to fully saturate",
        temp_c: 98,
        note: "Stirring is key — ensures no dry pockets in this large-dose brew"
      },
      {
        step: 2,
        label: "Pour 1",
        timestamp: "0:30",
        addWater: 140,
        totalWater: 200,
        duration: "Until most water has drained",
        technique: "Steady circular pour to 200g",
        temp_c: 98
      },
      {
        step: 3,
        label: "Pour 2",
        timestamp: "~1:15",
        addWater: 300,
        totalWater: 500,
        duration: "Drawdown ~2:00-2:15",
        technique: "Continuous circular motion pour to 500g",
        temp_c: 98,
        note: "Large final pour — Wendelboe doesn't break this into sub-pours"
      }
    ],

    filter: {
      rinse: true,
      rinseNote: "Thorough rinse",
      type: "Hario V60 white paper filter",
      preference: "Standard Hario. Uses V60 02 or 03 for this large batch size."
    },

    agitation: {
      bloom: "Stir with spoon during bloom",
      midBrew: "None explicit",
      final: "None explicit",
      raoSpin: false,
      notes: "Wendelboe's distinctive technique: spoon stir during bloom. This is unusual — most experts swirl the brewer. He finds the spoon more effective at breaking up dry clumps in larger doses."
    },

    bestBeans: {
      origins: ["Ethiopia", "Colombia", "Kenya", "Guatemala"],
      roastLevel: "Light — Tim Wendelboe pioneered Nordic light roasting. His roastery is known for extremely light profiles.",
      processing: ["Washed"],
      note: "This recipe is designed for the Nordic light-roast style he helped define. His own coffees are some of the lightest commercially available."
    },

    flavorEmphasis: "Nordic clarity. Tim's approach is all about letting the coffee's origin character shine. Bright acidity, delicate sweetness, tea-like body. The large batch size (500g) is for sharing — his café culture emphasizes hospitality. The recipe is deliberately simple and unfussy.",

    commonMistakes: [
      "Not stirring the bloom — the spoon stir is essential for this large dose",
      "Grinding too coarse — despite the large batch, this should be medium to medium-fine",
      "Using a V60 01 — this recipe needs 02 or 03 for 32.5g dose",
      "Pouring too slowly on the final pour — it should be a confident, steady stream",
      "Overcomplicating it — Wendelboe's philosophy is simplicity"
    ],

    v60SizeAdjust: {
      "01": null, // Too much coffee for 01
      "02": { dose: "15-20g", water: "230-310g", note: "Scale down proportionally; use 1:15.4 ratio" },
      "03": { dose: "32.5g", water: "500g", note: "Default — designed for V60 03 batch brewing" }
    },

    difficulty: "beginner",
    popularity: 3
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 10. BEN PUT — Monogram Coffee
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "put-monogram",
    expert: "Ben Put",
    method: "Monogram Coffee V60 Recipe",
    methodAr: "وصفة Monogram Coffee",
    year: 2021,
    type: "hot",
    source: "monogramcoffee.com blog (July 2021, by Jill Hoff — house recipe)",
    status: "verified",

    dose_g: 21,
    water_g: 340,
    ratio: "1:16",
    ratioNum: 16,
    yields_ml: 320,

    temp_c: 93,
    tempNote: "93°C (200°F). A moderate, safe temperature that works across most roast levels. Not as aggressive as Hoffmann/Rao's boiling approach.",

    grind: {
      description: "Medium to medium-coarse. A safe middle ground — not as fine as Rao, not as coarse as Kasuya.",
      ode2Stock: { min: 4.5, max: 5.5, sweet: 5 },
      ode2SSP: { min: 5, max: 6, sweet: 5.5 },
      comandante: { min: 24, max: 28, sweet: 26 },
      zpresso: { min: 84, max: 92, sweet: 88 },
      timemoreC2: { min: 22, max: 26, sweet: 24 },
      micronEstimate: "600-850μm"
    },

    totalTime: "2:30-3:00",
    totalTimeSec: 165,

    bloom: {
      water_g: 50,
      multiplier: "~2.4x dose",
      time_sec: 30,
      technique: "Pour 50g, wait 30 seconds",
      agitation: "None specified"
    },

    pourSteps: [
      {
        step: 1,
        label: "Bloom",
        timestamp: "0:00",
        addWater: 50,
        totalWater: 50,
        duration: "30 seconds",
        technique: "Gentle pour 50g, wait",
        temp_c: 93
      },
      {
        step: 2,
        label: "Pour 1",
        timestamp: "0:30",
        addWater: 200,
        totalWater: 250,
        duration: "Until most water drains",
        technique: "Steady circular pour to 250g",
        temp_c: 93
      },
      {
        step: 3,
        label: "Pour 2",
        timestamp: "~1:15",
        addWater: 90,
        totalWater: 340,
        duration: "Final drawdown ~1:15-1:45",
        technique: "Gentle pour to 340g, let drain",
        temp_c: 93
      }
    ],

    filter: {
      rinse: true,
      rinseNote: "Rinse with hot water",
      type: "Hario V60 white paper filter",
      preference: "Standard Hario V60 02"
    },

    agitation: {
      bloom: "None specified",
      midBrew: "None specified",
      final: "None specified",
      raoSpin: false,
      notes: "The Monogram recipe is deliberately minimal on agitation. Straightforward and accessible — designed as a cafe house recipe for customers to replicate at home."
    },

    bestBeans: {
      origins: ["Colombia", "Ethiopia (washed)", "Costa Rica", "Guatemala"],
      roastLevel: "Light to medium. Works well with Monogram's own roast profile.",
      processing: ["Washed", "Honey"],
      note: "This is a house recipe — designed to work with Monogram's coffee lineup."
    },

    flavorEmphasis: "Balanced and approachable. The 1:16 ratio is the SCA golden ratio. 93°C is a safe temperature. This recipe doesn't try to be extreme in any dimension — it's a reliable, repeatable daily driver. Clean, sweet, balanced.",

    commonMistakes: [
      "Overcomplicating it — this is intentionally simple",
      "Grinding too fine for this moderate-temperature recipe",
      "Total time over 3:30 — should be 2:30-3:00",
      "Not using freshly roasted coffee (7-30 days off roast)"
    ],

    v60SizeAdjust: {
      "01": { dose: "12g", water: "192g", note: "Scale proportionally" },
      "02": { dose: "21g", water: "340g", note: "Default" },
      "03": { dose: "32g", water: "512g", note: "Scale up" }
    },

    difficulty: "beginner",
    popularity: 3
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 11. OSMOTIC FLOW — Trending Method 2024-2025
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "osmotic-flow",
    expert: "Community / Multiple Creators",
    method: "Osmotic Flow V60",
    methodAr: "التدفق الأسموزي",
    year: 2024,
    type: "hot",
    source: "Reddit r/pourover, YouTube (multiple creators including Lance Hedrick, Cafede Kona), social media 2024-2025",
    status: "community",

    dose_g: 20,
    water_g: 300,
    ratio: "1:15",
    ratioNum: 15,
    yields_ml: 282,

    temp_c: 93,
    tempNote: "90-96°C depending on roast. The method is forgiving on temperature because the slow-drip bloom stage handles much of the early extraction gently.",

    grind: {
      description: "Medium to medium-fine. The extended bloom means you don't need to grind as fine as a standard V60 recipe.",
      ode2Stock: { min: 4, max: 5.5, sweet: 4.5 },
      ode2SSP: { min: 4.5, max: 6, sweet: 5 },
      comandante: { min: 22, max: 28, sweet: 25 },
      zpresso: { min: 80, max: 92, sweet: 86 },
      timemoreC2: { min: 20, max: 26, sweet: 23 },
      micronEstimate: "550-800μm"
    },

    totalTime: "3:30-5:00",
    totalTimeSec: 240,

    bloom: {
      water_g: 60,
      multiplier: "3x dose",
      time_sec: 60,
      technique: "Extended bloom (45-90 seconds). Some versions use a Melodrip or very slow kettle pour to create a gentle, drip-like saturation instead of a standard pour.",
      agitation: "Gentle swirl or none. The 'osmotic' part is about slow, even saturation."
    },

    pourSteps: [
      {
        step: 1,
        label: "Osmotic Bloom",
        timestamp: "0:00",
        addWater: 60,
        totalWater: 60,
        duration: "45-90 seconds",
        technique: "Very slow, gentle pour. Optionally through Melodrip diffuser. The idea: water slowly permeates grounds via osmosis rather than forced flow. Gentle swirl.",
        temp_c: 93,
        note: "The defining characteristic of osmotic flow — ultra-gentle initial saturation"
      },
      {
        step: 2,
        label: "Low-Bypass Pour",
        timestamp: "~1:00",
        addWater: 120,
        totalWater: 180,
        duration: "Slow pour ~30-45 seconds",
        technique: "Very low, gentle pour close to the bed surface. Center pour. Some versions pour through cloth/Melodrip to diffuse water.",
        temp_c: 93,
        note: "Keep water level low — never fill the brewer more than halfway. This reduces bypass (water flowing down the sides of the filter without contacting coffee)."
      },
      {
        step: 3,
        label: "Second Pour",
        timestamp: "~2:00",
        addWater: 120,
        totalWater: 300,
        duration: "Slow pour + drawdown",
        technique: "Same gentle, low pour. Let drain completely. Target flat bed.",
        temp_c: 93
      }
    ],

    filter: {
      rinse: true,
      rinseNote: "Rinse thoroughly",
      type: "Hario V60 or Cafec/Sibarist specialty filter",
      preference: "Some practitioners prefer Cafec Abaca+ or Sibarist FAST filters for flow rate control. The thicker Cafec filters slow flow and enhance the osmotic effect."
    },

    agitation: {
      bloom: "Gentle swirl or none",
      midBrew: "None — minimal agitation is core to the philosophy",
      final: "Optional gentle swirl to level bed",
      raoSpin: false,
      notes: "Osmotic flow is the ANTI-agitation method. The entire philosophy is: let water gently permeate the bed through osmotic pressure rather than forcing it through with aggressive pours. Low water level, low pour height, slow flow rate."
    },

    bestBeans: {
      origins: ["Ethiopia (natural)", "Panama Geisha", "Kenya", "Any high-quality light roast"],
      roastLevel: "Light. This method excels at extracting delicate, aromatic compounds without harsh extraction.",
      processing: ["Natural", "Washed"],
      note: "Trending with expensive, competition-grade coffees where you want to maximize flavor clarity without any harshness."
    },

    flavorEmphasis: "Extremely clean, sweet, and delicate. The slow osmotic saturation extracts sugars and delicate aromatics gently, while the low-bypass technique ensures water contacts coffee rather than running down paper walls. Produces a 'crystalline' cup — very transparent with highly defined flavor notes. Often described as the 'highest clarity' method.",

    commonMistakes: [
      "Pouring too fast or from too high — defeats the osmotic principle",
      "Filling the brewer too high — low water level is essential to reduce bypass",
      "Expecting fast brew times — this method takes 3:30-5:00 and that's intentional",
      "Over-agitating at any stage",
      "Using with dark roasts — designed for light roasts; dark roasts may taste thin"
    ],

    v60SizeAdjust: {
      "01": { dose: "12-15g", water: "180-225g", note: "01 works great — smaller brewer means naturally lower water level" },
      "02": { dose: "20g", water: "300g", note: "Default" },
      "03": null // Method doesn't work well in 03 — too hard to maintain low water level
    },

    accessories: "Melodrip (diffusion tool), Cafede Kona osmotic-flow kettle attachment, or simply a very slow, controlled pour from a gooseneck kettle.",
    difficulty: "advanced",
    popularity: 4
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 12. HARIO SWITCH — Immersion/Hybrid Method
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "hario-switch",
    expert: "Hario / Community",
    method: "Hario Switch Immersion-Hybrid",
    methodAr: "Hario Switch — هجين غمر وتقطير",
    year: 2020,
    type: "hot",
    source: "Hario official guide, James Hoffmann YouTube review, r/Coffee community consensus, Lance Hedrick",
    status: "community",

    dose_g: 20,
    water_g: 320,
    ratio: "1:16",
    ratioNum: 16,
    yields_ml: 300,

    temp_c: 96,
    tempNote: "95-100°C. Since immersion brewing loses more heat, starting hotter compensates. Boiling is fine.",

    grind: {
      description: "Medium to medium-coarse. Coarser than standard V60 because the immersion stage provides extended contact time. Similar to French press grind for full-immersion mode; medium for hybrid.",
      ode2Stock: { min: 5, max: 7, sweet: 6 },
      ode2SSP: { min: 5.5, max: 7.5, sweet: 6.5 },
      comandante: { min: 25, max: 32, sweet: 28 },
      zpresso: { min: 85, max: 96, sweet: 90 },
      timemoreC2: { min: 23, max: 28, sweet: 25 },
      micronEstimate: "700-1000μm"
    },

    totalTime: "3:30-4:30",
    totalTimeSec: 240,

    bloom: {
      water_g: 50,
      multiplier: "2.5x dose",
      time_sec: 45,
      technique: "Valve CLOSED (down position). Pour 50g, stir gently. Let sit for 45 seconds as immersion bloom.",
      agitation: "Gentle stir with spoon"
    },

    pourSteps: [
      {
        step: 1,
        label: "Immersion Bloom",
        timestamp: "0:00",
        addWater: 50,
        totalWater: 50,
        duration: "45 seconds",
        technique: "Valve CLOSED. Pour 50g, gentle stir. Grounds steep.",
        temp_c: 96,
        note: "The glass ball valve keeps all water in contact with grounds"
      },
      {
        step: 2,
        label: "Full Immersion Fill",
        timestamp: "0:45",
        addWater: 270,
        totalWater: 320,
        duration: "Steep for 2:00 (valve still closed)",
        technique: "Pour remaining 270g with valve closed. Stir gently once. Let steep for 2 full minutes.",
        temp_c: 96,
        note: "Total immersion time: 2:00-2:30. This is the core extraction phase."
      },
      {
        step: 3,
        label: "Release / Drip Phase",
        timestamp: "2:45",
        addWater: 0,
        totalWater: 320,
        duration: "Drawdown: 45-90 seconds",
        technique: "Flip switch UP to open valve. Liquid drains through V60 paper filter. The filter removes fines and oils — cleaner than French press.",
        temp_c: null,
        note: "Drawdown should take 45-90 seconds. If longer, grind coarser."
      }
    ],

    alternateFullImmersion: {
      note: "Some people use the Switch as full immersion only (like a Clever Dripper): close valve, pour all water, steep 4 minutes, open valve. Coarser grind (Ode 6-8).",
      dose: 20,
      water: 320,
      steepTime: "4:00",
      grind: "Coarse (French press level)"
    },

    filter: {
      rinse: true,
      rinseNote: "Rinse with hot water while valve is open (to warm brewer and remove paper taste), then close valve before adding coffee",
      type: "Hario V60 02 tabbed paper filter",
      preference: "Standard Hario V60 filters. The Switch uses standard V60 02 filters — no special filters needed."
    },

    agitation: {
      bloom: "Gentle stir",
      midBrew: "One gentle stir after full pour (optional)",
      final: "None after valve opens",
      raoSpin: false,
      notes: "Minimal agitation. The immersion stage handles extraction through time, not turbulence. One stir after the full pour to ensure even saturation."
    },

    bestBeans: {
      origins: ["Any origin — very forgiving method", "Ethiopian natural (great with immersion)", "Colombian", "Brazilian"],
      roastLevel: "Medium to medium-dark works exceptionally well. Also good with light roasts.",
      processing: ["Natural", "Honey", "Washed"],
      note: "The Switch is the most forgiving V60 variant. It produces consistent results regardless of pouring skill — the immersion phase dominates the extraction."
    },

    flavorEmphasis: "Full body with paper-filter clarity. The best of both worlds: immersion gives you the rich body and sweetness of a French press, while the paper filter removes oils and fines for a clean finish. Compared to standard V60, the Switch produces a sweeter, rounder, less acidic cup.",

    commonMistakes: [
      "Forgetting to close the valve before adding coffee",
      "Steeping too long (over 4 minutes with standard grind = bitter)",
      "Not pre-rinsing with valve open (water pools in brewer)",
      "Grinding as fine as standard V60 — need coarser for immersion",
      "Opening valve while pouring — open only after steeping is complete"
    ],

    v60SizeAdjust: {
      note: "Hario Switch only comes in 02 and 03 sizes",
      "02": { dose: "15-20g", water: "240-320g", note: "Default" },
      "03": { dose: "25-35g", water: "400-560g", note: "Same technique, larger batch" }
    },

    difficulty: "beginner",
    popularity: 4
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 13. ICED V60 — Japanese Iced Coffee Method
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "japanese-iced",
    expert: "Traditional Japanese Method",
    method: "Japanese Iced Coffee (Flash Brew)",
    methodAr: "القهوة المثلّجة اليابانية (فلاش برو)",
    year: null, // traditional method
    type: "iced",
    source: "Widely documented: Counter Culture Coffee, Handground, Kurasu Kyoto, James Hoffmann, Peter Giuliano",
    status: "verified",

    dose_g: 25,
    water_g: 300,
    ice_g: 200,
    ratio: "1:15 (total liquid) / 1:12 (hot water only)",
    ratioNum: 15,
    yields_ml: 470,

    temp_c: 96,
    tempNote: "95-100°C. High temperature compensates for the reduced water volume — need to extract fully with less water. Some versions use boiling.",

    grind: {
      description: "Finer than hot V60. The reduced water-to-coffee ratio means you need finer grind for adequate extraction.",
      ode2Stock: { min: 3, max: 4.5, sweet: 3.5 },
      ode2SSP: { min: 3.5, max: 5, sweet: 4 },
      comandante: { min: 18, max: 24, sweet: 21 },
      zpresso: { min: 72, max: 84, sweet: 78 },
      timemoreC2: { min: 16, max: 22, sweet: 19 },
      micronEstimate: "400-600μm"
    },

    totalTime: "2:30-3:00",
    totalTimeSec: 170,

    bloom: {
      water_g: 50,
      multiplier: "2x dose",
      time_sec: 45,
      technique: "Standard bloom pour into V60 sitting on ice-filled server",
      agitation: "Gentle swirl"
    },

    pourSteps: [
      {
        step: 0,
        label: "Setup",
        timestamp: "—",
        addWater: 0,
        totalWater: 0,
        duration: "—",
        technique: "Place 200g ice in server/carafe. Set V60 on top of ice-filled server.",
        temp_c: null,
        note: "The ice is in the server BELOW the V60 — coffee drips directly onto ice"
      },
      {
        step: 1,
        label: "Bloom",
        timestamp: "0:00",
        addWater: 50,
        totalWater: 50,
        duration: "45 seconds",
        technique: "Pour 50g, gentle swirl",
        temp_c: 96
      },
      {
        step: 2,
        label: "Pour 1",
        timestamp: "0:45",
        addWater: 125,
        totalWater: 175,
        duration: "~30 seconds pour",
        technique: "Steady spiral pour",
        temp_c: 96
      },
      {
        step: 3,
        label: "Pour 2",
        timestamp: "1:15",
        addWater: 125,
        totalWater: 300,
        duration: "Drawdown onto ice",
        technique: "Steady spiral pour. Hot coffee drips directly onto ice, melting it and cooling instantly.",
        temp_c: 96,
        note: "All ice should be melted by the time brewing finishes. If not, stir gently."
      }
    ],

    waterToIceRatio: {
      standard: "60:40 (hot water : ice)",
      range: "55-70% hot water / 30-45% ice",
      example: "25g dose, 300g hot water, 200g ice = 500g total liquid at 1:20 ratio. Effective brewing ratio is 1:12 (concentrated) which dilutes to ~1:20 with ice.",
      note: "Hoffmann uses ~60:40. Counter Culture suggests 60:40. Some prefer 70:30 for stronger iced coffee."
    },

    filter: {
      rinse: true,
      rinseNote: "Rinse filter — discard rinse water from server, then add ice to server",
      type: "Hario V60 white paper filter",
      preference: "Standard Hario"
    },

    agitation: {
      bloom: "Gentle swirl",
      midBrew: "None",
      final: "Swirl server after brewing to ensure all ice is melted and coffee is uniformly cold",
      raoSpin: false,
      notes: "Keep it simple. The focus is on the hot brew contacting ice immediately."
    },

    bestBeans: {
      origins: ["Ethiopia (natural — fruity flavors shine cold)", "Kenya", "Rwanda", "Colombia"],
      roastLevel: "Light to medium-light. Bright, fruity coffees make the best iced pour-over.",
      processing: ["Natural", "Washed"],
      note: "Natural-process Ethiopians are the classic choice — blueberry, strawberry, citrus notes are amplified when cold. Avoid dark roasts — they taste bitter and ashy when cold."
    },

    flavorEmphasis: "Bright, aromatic, sweet. Flash brewing captures volatile aromatic compounds that cold brew loses. The result is a livelier, more complex iced coffee than cold brew. Acidity is prominent but balanced by sweetness. Retains the 'hot-brewed' flavor profile but served cold.",

    commonMistakes: [
      "Not adjusting grind finer — you're brewing with less water, need finer grind",
      "Not enough ice — all ice should melt during brewing; if ice remains, coffee isn't concentrated enough",
      "Too much ice — over-dilutes the brew",
      "Using dark roast — tastes bitter and flat when cold",
      "Brewing at normal V60 grind without compensating for reduced water",
      "Forgetting to rinse filter BEFORE adding ice to server"
    ],

    v60SizeAdjust: {
      "01": { dose: "12-15g", water: "150-180g", ice: "100-120g", note: "Single serving" },
      "02": { dose: "20-25g", water: "250-300g", ice: "165-200g", note: "Default" },
      "03": { dose: "35-40g", water: "420-480g", ice: "280-320g", note: "Large batch" }
    },

    difficulty: "beginner",
    popularity: 5
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 14. ONYX COFFEE LAB — 1-Pour Method
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "onyx-onepour",
    expert: "Onyx Coffee Lab",
    method: "1-Pour V60 Method",
    methodAr: "طريقة الصبّة الواحدة — Onyx",
    year: 2020,
    type: "hot",
    source: "onyxcoffeelab.com brew guide, YouTube, widely referenced on r/Coffee and r/pourover",
    status: "verified",

    dose_g: 21,
    water_g: 315,
    ratio: "1:15",
    ratioNum: 15,
    yields_ml: 296,

    temp_c: 100,
    tempNote: "Boiling (100°C / 212°F). Onyx is firm on boiling water for light roasts — their signature style.",

    grind: {
      description: "Medium. Onyx specifies 'medium' — not as fine as Rao, not as coarse as Kasuya. Starting point for Baratza Encore: 12. For EK43: 9.5.",
      ode2Stock: { min: 4.5, max: 5.5, sweet: 5 },
      ode2SSP: { min: 5, max: 6, sweet: 5.5 },
      comandante: { min: 24, max: 28, sweet: 26 },
      zpresso: { min: 84, max: 92, sweet: 88 },
      timemoreC2: { min: 22, max: 26, sweet: 24 },
      micronEstimate: "600-800μm"
    },

    totalTime: "2:45-3:15",
    totalTimeSec: 180,

    bloom: {
      water_g: 50,
      multiplier: "~2.4x dose",
      time_sec: 40,
      technique: "Pour 50g in a spiral. Excavate with spoon (dig through bed to ensure all grounds are wet). Wait 40 seconds.",
      agitation: "EXCAVATION — stir/dig through bed with spoon. This is Onyx's signature bloom technique."
    },

    pourSteps: [
      {
        step: 1,
        label: "Bloom + Excavate",
        timestamp: "0:00",
        addWater: 50,
        totalWater: 50,
        duration: "40 seconds",
        technique: "Pour 50g, then excavate: use spoon to dig through the bed, breaking up any dry clumps. Make sure every particle is wet.",
        temp_c: 100,
        note: "EXCAVATION is the key differentiator. More aggressive than swirl/stir — physically dig through the grounds."
      },
      {
        step: 2,
        label: "Single Continuous Pour",
        timestamp: "0:40",
        addWater: 265,
        totalWater: 315,
        duration: "Pour in ~45-60 seconds, drawdown ~1:30-2:00",
        technique: "One continuous, steady spiral pour from center outward to 315g. Aim for the coffee bed, not the paper walls. Slow, controlled, even spiral. After pour is complete, give a gentle swirl.",
        temp_c: 100,
        note: "ONE POUR — the simplicity is intentional. No second pour, no multiple pulses. Just bloom + one pour."
      }
    ],

    filter: {
      rinse: true,
      rinseNote: "Rinse with hot water",
      type: "Tabbed Hario V60 02 white paper filter",
      preference: "Onyx uses standard Hario tabbed filters. They specifically mention tabbed."
    },

    agitation: {
      bloom: "Excavation — dig through bed with spoon (Onyx signature)",
      midBrew: "None during pour",
      final: "Gentle swirl after pour completes, before drawdown",
      raoSpin: false,
      excavate: true,
      notes: "Onyx's 'excavation' technique during bloom is their hallmark. It's more aggressive than stirring or swirling — you literally dig/scrape through the coffee bed with a spoon to ensure 100% saturation. After the main pour, a single gentle swirl levels the bed."
    },

    bestBeans: {
      origins: ["Any — Onyx roasts a wide range", "Ethiopia", "Colombia", "Guatemala", "Honduras"],
      roastLevel: "Light. Onyx is known for high-quality light roasts. This method is tuned for their roast style.",
      processing: ["Washed", "Natural", "Honey"],
      note: "Designed for Onyx's coffees but works broadly. Their light roast style demands high temp and good extraction."
    },

    flavorEmphasis: "Clean, sweet, balanced. The single-pour approach after aggressive bloom excavation produces a remarkably consistent cup. Less complexity than multi-pour methods but higher repeatability. Onyx prioritizes sweetness and balance over extreme acidity or heavy body.",

    commonMistakes: [
      "Not excavating aggressively enough — you should physically dig through the bed",
      "Pouring too fast in the main pour — should take 45-60 seconds",
      "Pouring onto paper walls instead of coffee bed",
      "Grinding too fine — this is medium, not medium-fine",
      "Adding unnecessary extra pours — the method is ONE pour after bloom, that's it"
    ],

    v60SizeAdjust: {
      "01": { dose: "12g", water: "180g", bloom: "30g", note: "Same technique, scale down" },
      "02": { dose: "21g", water: "315g", bloom: "50g", note: "Default" },
      "03": { dose: "32g", water: "480g", bloom: "75g", note: "Scale up proportionally" }
    },

    difficulty: "beginner",
    popularity: 4
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 15. MATT PERGER
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "perger-v60",
    expert: "Matt Perger",
    method: "V60 Pour-Over Technique",
    methodAr: "تقنية Matt Perger",
    year: 2015,
    type: "hot",
    source: "Barista Hustle educational content, YouTube presentations, St Ali / Barista Hustle courses",
    status: "community",

    dose_g: 22,
    water_g: 360,
    ratio: "~1:16.4",
    ratioNum: 16.4,
    yields_ml: 338,

    temp_c: 98,
    tempNote: "97-99°C. Perger advocates for near-boiling water. As founder of Barista Hustle, his teaching materials consistently recommend high temperatures for light roasts.",

    grind: {
      description: "Medium-fine. Perger is known for advocating precise particle size distribution (PSD). He popularized the concept of 'fines' management in pour-over brewing.",
      ode2Stock: { min: 4, max: 5, sweet: 4.5 },
      ode2SSP: { min: 4.5, max: 5.5, sweet: 5 },
      comandante: { min: 22, max: 26, sweet: 24 },
      zpresso: { min: 80, max: 88, sweet: 84 },
      timemoreC2: { min: 20, max: 24, sweet: 22 },
      micronEstimate: "500-700μm"
    },

    totalTime: "3:00-3:30",
    totalTimeSec: 200,

    bloom: {
      water_g: 66,
      multiplier: "3x dose",
      time_sec: 30,
      technique: "Pour 3x dose, aggressive stir/agitation to saturate all grounds",
      agitation: "Aggressive stir with spoon or Rao-style spin"
    },

    pourSteps: [
      {
        step: 1,
        label: "Bloom",
        timestamp: "0:00",
        addWater: 66,
        totalWater: 66,
        duration: "30 seconds",
        technique: "Pour 66g (3x dose), stir aggressively or spin. Ensure complete saturation.",
        temp_c: 98
      },
      {
        step: 2,
        label: "Main Pour",
        timestamp: "0:30",
        addWater: 194,
        totalWater: 260,
        duration: "~45 seconds pour",
        technique: "Steady, controlled spiral pour to ~260g. Slow and even. Keep the water level in the brewer relatively constant — match your pour rate to the drain rate.",
        temp_c: 98,
        note: "Perger emphasizes maintaining consistent water level throughout the pour"
      },
      {
        step: 3,
        label: "Final Top-Up",
        timestamp: "~1:30",
        addWater: 100,
        totalWater: 360,
        duration: "Drawdown ~1:30-2:00",
        technique: "Top up to 360g with gentle center pour. Swirl to level bed. Let drain.",
        temp_c: 98
      }
    ],

    filter: {
      rinse: true,
      rinseNote: "Thorough rinse — Perger is meticulous about removing paper taste",
      type: "Hario V60 white paper filter",
      preference: "Standard Hario. Perger has also used Chemex and other methods — his teachings are method-agnostic."
    },

    agitation: {
      bloom: "Aggressive stir or spin",
      midBrew: "Maintain consistent water level (continuous pour technique)",
      final: "Swirl to level bed after final pour",
      raoSpin: true,
      notes: "Perger's approach is influenced by Rao but with more emphasis on continuous pour technique (maintaining water level) rather than distinct pulse pours. His Barista Hustle courses teach the physics of even extraction — consistent water level = consistent flow through bed = even extraction."
    },

    bestBeans: {
      origins: ["Any specialty-grade", "Ethiopia", "Kenya", "Colombia", "Guatemala"],
      roastLevel: "Light to medium-light",
      processing: ["Washed"],
      note: "Perger's teaching is method-focused rather than origin-focused. His recipes are designed as universal starting points for optimization."
    },

    flavorEmphasis: "Even, high extraction. Perger is one of the coffee world's leading thinkers on extraction theory. His method targets uniform extraction across all particles. The result is a well-developed cup with good sweetness and balanced acidity. His focus on particle size distribution (PSD) means grinder quality matters most for this method.",

    commonMistakes: [
      "Not maintaining consistent water level during main pour",
      "Using a grinder with excessive fines — Perger's method is very sensitive to PSD",
      "Rushing the pour — should be slow, controlled, steady",
      "Under-extracting — his target is high extraction, similar to Rao (22%+)",
      "Ignoring bed levelness after final pour"
    ],

    v60SizeAdjust: {
      "01": { dose: "12-15g", water: "200-250g", note: "Scale proportionally" },
      "02": { dose: "22g", water: "360g", note: "Default" },
      "03": { dose: "33g", water: "540g", note: "Scale up" }
    },

    background: "2012 World Brewers Cup Champion (Australia). 3x WBC competitor. Founder of Barista Hustle (online coffee education platform). Co-founder of St Ali. One of the most influential figures in modern coffee education.",
    difficulty: "intermediate",
    popularity: 3
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 16. POUR STEADY / MELODRIP — Low-Bypass V60 (2024-2025 Trending)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: "lowbypass-2025",
    expert: "Community / Cafede Kona / Melodrip",
    method: "Low-Bypass / No-Bypass V60",
    methodAr: "V60 بدون تجاوز (ترند 2024-2025)",
    year: 2024,
    type: "hot",
    source: "Reddit r/pourover trends 2024-2025, YouTube (multiple creators), Cafede Kona bypass theory, Melodrip device",
    status: "community",

    dose_g: 18,
    water_g: 288,
    ratio: "1:16",
    ratioNum: 16,
    yields_ml: 270,

    temp_c: 95,
    tempNote: "93-100°C. The temperature matters less than pour technique in this method — the focus is on WHERE the water goes, not how hot it is.",

    grind: {
      description: "Medium. The focus on reducing bypass means extraction is more efficient, so you don't need to go as fine.",
      ode2Stock: { min: 4, max: 5.5, sweet: 5 },
      ode2SSP: { min: 4.5, max: 6, sweet: 5.5 },
      comandante: { min: 22, max: 28, sweet: 25 },
      zpresso: { min: 80, max: 92, sweet: 86 },
      timemoreC2: { min: 20, max: 26, sweet: 23 },
      micronEstimate: "550-800μm"
    },

    totalTime: "3:00-4:30",
    totalTimeSec: 225,

    bloom: {
      water_g: 45,
      multiplier: "2.5x dose",
      time_sec: 45,
      technique: "Very gentle pour, center only. Small circle no wider than a coin. Optionally through Melodrip diffuser.",
      agitation: "Gentle swirl"
    },

    pourSteps: [
      {
        step: 1,
        label: "Bloom",
        timestamp: "0:00",
        addWater: 45,
        totalWater: 45,
        duration: "45 seconds",
        technique: "Tiny circle pour in dead center. Gentle swirl.",
        temp_c: 95,
        note: "Never pour near the paper walls"
      },
      {
        step: 2,
        label: "Pour 1 — Center-Only",
        timestamp: "0:45",
        addWater: 80,
        totalWater: 125,
        duration: "Slow pour ~30-45 seconds",
        technique: "Pour ONLY in the center of the bed. Keep pour in a tight circle (1-2cm diameter). The water should percolate through coffee rather than running down paper walls. Keep water level LOW — never more than 1cm above the bed.",
        temp_c: 95,
        note: "This is the key: center-only pour eliminates bypass channels along paper walls"
      },
      {
        step: 3,
        label: "Pour 2 — Center-Only",
        timestamp: "~1:45",
        addWater: 80,
        totalWater: 205,
        duration: "Slow pour ~30-45 seconds",
        technique: "Same center-only technique. Low water level.",
        temp_c: 95
      },
      {
        step: 4,
        label: "Pour 3 — Center-Only",
        timestamp: "~2:30",
        addWater: 83,
        totalWater: 288,
        duration: "Drawdown",
        technique: "Final center pour. Let drain completely. Bed may be concave (not flat) — this is expected with center-only pouring.",
        temp_c: 95,
        note: "Unlike most V60 methods, the bed will NOT be flat — it'll be concave/volcano-shaped. This is correct."
      }
    ],

    bypassTheory: {
      explanation: "In a standard V60, 20-40% of water travels along the paper filter walls without ever contacting coffee. This 'bypass water' dilutes the brew without extracting flavor. Low-bypass techniques force water through the coffee bed by pouring only in the center and keeping water level low.",
      benefit: "Higher effective extraction. A 1:16 ratio with low bypass tastes like 1:14 with standard technique because less water is wasted.",
      measurement: "Jonathan Gagné and others have measured bypass at 20-40% in standard V60 technique. Low-bypass methods reduce this to 5-15%."
    },

    filter: {
      rinse: true,
      rinseNote: "Rinse with hot water",
      type: "Hario V60 white paper or Cafec/Sibarist",
      preference: "Some practitioners fold the paper filter inward at the top to reduce channels along the top edge. Cafec Abaca+ filters can reduce bypass due to thicker paper."
    },

    agitation: {
      bloom: "Gentle swirl",
      midBrew: "None — let the water percolate naturally",
      final: "Optional gentle swirl to level bed",
      raoSpin: false,
      notes: "Minimal agitation. The center-only pour creates its own gentle agitation in the center of the bed. No spinning or stirring mid-brew."
    },

    bestBeans: {
      origins: ["Ethiopia (natural)", "Kenya", "Panama Geisha", "Any expensive light roast"],
      roastLevel: "Light. The higher effective extraction makes this ideal for light roasts that are hard to extract.",
      processing: ["Natural", "Washed"],
      note: "This technique is trending specifically because it helps extract more from expensive, light-roasted coffees. When a bag costs $30-100, reducing bypass = getting more value."
    },

    flavorEmphasis: "Intense clarity with high concentration. Because less water is 'wasted' as bypass, the cup is more concentrated and flavorful than the same ratio brewed conventionally. Very sweet, very clear, with pronounced origin character. Some describe it as 'espresso-like intensity from a pour-over.'",

    commonMistakes: [
      "Pouring too wide — the pour should be in a tiny center circle, not a spiral",
      "Water level too high — keep it just above the bed",
      "Expecting a flat bed — the bed will be concave/volcano-shaped, which is CORRECT for this method",
      "Using standard spiral technique — this method deliberately AVOIDS spiral pours",
      "Not adjusting expectations — the cup will be stronger/more concentrated than standard V60"
    ],

    v60SizeAdjust: {
      "01": { dose: "12-15g", water: "192-240g", note: "01 is actually IDEAL for low-bypass — smaller brewer naturally reduces bypass" },
      "02": { dose: "18g", water: "288g", note: "Default" },
      "03": null // Not recommended — too large, hard to avoid bypass
    },

    accessories: "Melodrip (shower-head diffuser), Cafede Kona WDT tool, ultra-fine gooseneck kettle (0.6L size helps with precision)",
    difficulty: "intermediate",
    popularity: 4
  }
];


// ═══════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE GRINDER CROSS-REFERENCE TABLE
// Maps each recipe to all 4 grinder platforms
// ═══════════════════════════════════════════════════════════════════════════
const GRINDER_CROSS_REFERENCE = {
  // General V60 ranges for each grinder
  generalRanges: {
    "Fellow Ode Gen 2 (stock)": { v60Fine: "3.5-4.5", v60Medium: "4.5-5.5", v60Coarse: "5.5-6.5" },
    "Fellow Ode Gen 2 (SSP MP)": { v60Fine: "4-5", v60Medium: "5-6", v60Coarse: "6-7" },
    "Comandante C40": { v60Fine: "20-24", v60Medium: "24-28", v60Coarse: "28-32" },
    "1Zpresso JX-Pro": { v60Fine: "78-84", v60Medium: "84-92", v60Coarse: "92-100" },
    "Timemore C2": { v60Fine: "18-22", v60Medium: "22-26", v60Coarse: "26-30" }
  },

  // Per-recipe recommendations
  recipes: [
    { id: "hoffmann-ultimate", ode2: "4-5", ode2SSP: "4.5-5.5", comandante: "22-26", zpresso: "80-88", timemore: "20-24" },
    { id: "kasuya-46", ode2: "5.5-6.5", ode2SSP: "6-7", comandante: "28-32", zpresso: "90-100", timemore: "26-30" },
    { id: "rao-v60", ode2: "4-5", ode2SSP: "4.5-5.5", comandante: "22-26", zpresso: "80-88", timemore: "20-24" },
    { id: "winton-fivepour", ode2: "5-6", ode2SSP: "5.5-6.5", comandante: "26-32", zpresso: "88-96", timemore: "24-28" },
    { id: "hedrick-versatile", ode2: "4-5", ode2SSP: "4.5-5.5", comandante: "22-26", zpresso: "80-88", timemore: "20-24" },
    { id: "rolf-april", ode2: "5.5-6.5", ode2SSP: "6-7", comandante: "28-32", zpresso: "90-100", timemore: "26-30" },
    { id: "gagne-v60", ode2: "4-5", ode2SSP: "4.5-5.5", comandante: "22-26", zpresso: "80-88", timemore: "20-24" },
    { id: "fukahori-hybrid", ode2: "N/A", ode2SSP: "N/A", comandante: "28-34", zpresso: "90-100", timemore: "26-30" },
    { id: "wendelboe-staged", ode2: "3.5-5", ode2SSP: "4-5.5", comandante: "20-26", zpresso: "78-88", timemore: "18-24" },
    { id: "put-monogram", ode2: "4.5-5.5", ode2SSP: "5-6", comandante: "24-28", zpresso: "84-92", timemore: "22-26" },
    { id: "osmotic-flow", ode2: "4-5.5", ode2SSP: "4.5-6", comandante: "22-28", zpresso: "80-92", timemore: "20-26" },
    { id: "hario-switch", ode2: "5-7", ode2SSP: "5.5-7.5", comandante: "25-32", zpresso: "85-96", timemore: "23-28" },
    { id: "japanese-iced", ode2: "3-4.5", ode2SSP: "3.5-5", comandante: "18-24", zpresso: "72-84", timemore: "16-22" },
    { id: "onyx-onepour", ode2: "4.5-5.5", ode2SSP: "5-6", comandante: "24-28", zpresso: "84-92", timemore: "22-26" },
    { id: "perger-v60", ode2: "4-5", ode2SSP: "4.5-5.5", comandante: "22-26", zpresso: "80-88", timemore: "20-24" },
    { id: "lowbypass-2025", ode2: "4-5.5", ode2SSP: "4.5-6", comandante: "22-28", zpresso: "80-92", timemore: "20-26" }
  ]
};


// ═══════════════════════════════════════════════════════════════════════════
// RECIPE COMPARISON MATRIX
// Quick-reference for all 16 recipes side by side
// ═══════════════════════════════════════════════════════════════════════════
const RECIPE_COMPARISON = [
  { id: "hoffmann-ultimate",  expert: "James Hoffmann",     dose: 30,   water: 500, ratio: "1:16.7", temp: 97,    grindCategory: "medium-fine", pours: 2, time: "3:30", agitation: "swirl+stir+swirl", difficulty: "beginner" },
  { id: "kasuya-46",          expert: "Tetsu Kasuya",       dose: 20,   water: 300, ratio: "1:15",   temp: 92,    grindCategory: "coarse",      pours: 5, time: "3:30", agitation: "none",             difficulty: "beginner" },
  { id: "rao-v60",            expert: "Scott Rao",          dose: 20,   water: 330, ratio: "1:16.5", temp: 97,    grindCategory: "medium-fine", pours: 2, time: "4:15", agitation: "Rao spin x3",       difficulty: "intermediate" },
  { id: "winton-fivepour",    expert: "Matt Winton",        dose: 20,   water: 300, ratio: "1:15",   temp: "93/88", grindCategory: "coarse",    pours: 5, time: "3:30", agitation: "pour height",       difficulty: "advanced" },
  { id: "hedrick-versatile",  expert: "Lance Hedrick",      dose: 20,   water: 340, ratio: "1:17",   temp: 100,   grindCategory: "medium",      pours: 4, time: "3:00", agitation: "swirl x4",         difficulty: "beginner" },
  { id: "rolf-april",         expert: "Patrik Rolf",        dose: 20,   water: 300, ratio: "1:15",   temp: 92,    grindCategory: "coarse",      pours: 6, time: "3:20", agitation: "circular pours",    difficulty: "intermediate" },
  { id: "gagne-v60",          expert: "Jonathan Gagné",     dose: 22,   water: 374, ratio: "1:17",   temp: 100,   grindCategory: "medium-fine", pours: 2, time: "4:03", agitation: "spin x3",           difficulty: "intermediate" },
  { id: "fukahori-hybrid",    expert: "Emi Fukahori",       dose: 17,   water: 220, ratio: "1:12.9", temp: "80/95", grindCategory: "coarse",    pours: 3, time: "2:55", agitation: "gentle stir",       difficulty: "advanced" },
  { id: "wendelboe-staged",   expert: "Tim Wendelboe",      dose: 32.5, water: 500, ratio: "1:15.4", temp: 98,    grindCategory: "variable",    pours: 2, time: "3:15", agitation: "spoon stir bloom",  difficulty: "beginner" },
  { id: "put-monogram",       expert: "Ben Put",            dose: 21,   water: 340, ratio: "1:16",   temp: 93,    grindCategory: "medium",      pours: 2, time: "2:45", agitation: "none specified",     difficulty: "beginner" },
  { id: "osmotic-flow",       expert: "Community",          dose: 20,   water: 300, ratio: "1:15",   temp: 93,    grindCategory: "medium",      pours: 2, time: "4:00", agitation: "minimal",           difficulty: "advanced" },
  { id: "hario-switch",       expert: "Hario/Community",    dose: 20,   water: 320, ratio: "1:16",   temp: 96,    grindCategory: "medium-coarse", pours: 1, time: "3:30", agitation: "gentle stir",     difficulty: "beginner" },
  { id: "japanese-iced",      expert: "Traditional",        dose: 25,   water: 300, ratio: "1:15*",  temp: 96,    grindCategory: "fine",        pours: 2, time: "2:45", agitation: "swirl bloom",       difficulty: "beginner" },
  { id: "onyx-onepour",       expert: "Onyx Coffee Lab",    dose: 21,   water: 315, ratio: "1:15",   temp: 100,   grindCategory: "medium",      pours: 1, time: "3:00", agitation: "excavate+swirl",    difficulty: "beginner" },
  { id: "perger-v60",         expert: "Matt Perger",        dose: 22,   water: 360, ratio: "1:16.4", temp: 98,    grindCategory: "medium-fine", pours: 2, time: "3:15", agitation: "stir+swirl",        difficulty: "intermediate" },
  { id: "lowbypass-2025",     expert: "Community 2024-25",  dose: 18,   water: 288, ratio: "1:16",   temp: 95,    grindCategory: "medium",      pours: 3, time: "3:45", agitation: "minimal",           difficulty: "intermediate" }
];


// ═══════════════════════════════════════════════════════════════════════════
// EXPERT PROFILES — Background info for all 16
// ═══════════════════════════════════════════════════════════════════════════
const EXPERT_PROFILES = {
  "hoffmann": {
    name: "James Hoffmann",
    titles: ["2007 World Barista Champion", "Author", "YouTuber"],
    affiliation: "Square Mile Coffee Roasters, London",
    philosophy: "Structured, approachable, data-informed. Makes specialty coffee accessible to everyone.",
    publications: ["The World Atlas of Coffee", "How to Make the Best Coffee at Home"],
    influence: "Most-watched V60 tutorial on YouTube (15M+ views). Arguably the most influential coffee educator alive."
  },
  "kasuya": {
    name: "Tetsu Kasuya",
    titles: ["2016 World Brewers Cup Champion", "Hario Ambassador"],
    affiliation: "Philocoffea, Japan",
    philosophy: "Systematic, controllable. Separates taste from strength in a simple framework.",
    influence: "First Asian WBrC winner. 4:6 method adopted worldwide for its simplicity and control."
  },
  "rao": {
    name: "Scott Rao",
    titles: ["Author", "Consultant", "Extraction theorist"],
    affiliation: "Independent",
    philosophy: "Science-first. Maximum extraction. Plastic V60 for heat retention. Fewer pours, more control.",
    publications: ["Everything but Espresso", "The Professional Barista's Handbook", "The Coffee Roaster's Companion"],
    influence: "Defined the modern understanding of extraction yield. The 'Rao spin' is named after him."
  },
  "winton": {
    name: "Matt Winton",
    titles: ["2021 World Brewers Cup Champion"],
    affiliation: "Previously Competition Coffee, now independent",
    philosophy: "Temperature manipulation over mechanical agitation. Pour height as the control variable.",
    influence: "Popularized dual-temperature brewing. Australian by birth, represented Switzerland."
  },
  "hedrick": {
    name: "Lance Hedrick",
    titles: ["Coffee Educator", "YouTuber", "US Brewers Cup competitor"],
    affiliation: "Independent, consulted on Fellow Ode Gen 2",
    philosophy: "Versatility — one method that works for everything. Boiling water always.",
    influence: "One of the most popular coffee YouTubers. Helped design Fellow Ode Gen 2 burrs."
  },
  "rolf": {
    name: "Patrik Rolf",
    titles: ["2019 WBrC Silver Medalist", "Coffee Masters finalist"],
    affiliation: "April Coffee Roasters, Copenhagen",
    philosophy: "Nordic clarity through systematic pulse pours. Let coffee speak for itself.",
    influence: "Founded one of Scandinavia's leading specialty roasters. Popularized ultra-light Nordic roast style."
  },
  "gagne": {
    name: "Jonathan Gagné",
    titles: ["Astrophysicist (PhD)", "Author", "Plaskett Medal recipient"],
    affiliation: "Université de Montréal / coffeeadastra.com",
    philosophy: "Physics-driven. Every decision backed by measurement and data.",
    publications: ["The Physics of Filter Coffee"],
    influence: "The most scientifically rigorous voice in coffee brewing. His blog coffeeadastra.com is a primary reference for extraction science."
  },
  "fukahori": {
    name: "Emi Fukahori",
    titles: ["2018 World Brewers Cup Champion"],
    affiliation: "Independent, based in Switzerland",
    philosophy: "Hybrid innovation — combine immersion and percolation for the best of both worlds.",
    influence: "First woman to win WBrC. Pioneered hybrid immersion/drip technique that inspired Hario Switch adoption."
  },
  "wendelboe": {
    name: "Tim Wendelboe",
    titles: ["2004 World Barista Champion", "Roaster"],
    affiliation: "Tim Wendelboe (roastery/café), Oslo, Norway",
    philosophy: "Simplicity. Let the coffee do the work. Buy great coffee, use simple technique.",
    influence: "Pioneer of Nordic light roasting. His Oslo café is a pilgrimage site for coffee enthusiasts."
  },
  "put": {
    name: "Ben Put",
    titles: ["7x Canadian Barista Champion (record)", "3x WBC Top 6"],
    affiliation: "Monogram Coffee, Calgary, Canada",
    philosophy: "Accessible quality. Competition-level skill applied to everyday brewing.",
    influence: "Most-decorated barista in Canadian history. Monogram Coffee is one of Canada's top roasters."
  },
  "perger": {
    name: "Matt Perger",
    titles: ["2012 World Brewers Cup Champion", "3x WBC competitor"],
    affiliation: "Barista Hustle (founder), formerly St Ali Melbourne",
    philosophy: "Education-first. Understanding extraction science makes better brewers.",
    publications: ["Barista Hustle online courses", "Water for Coffee (contributor)"],
    influence: "Founded the most influential online coffee education platform. Popularized PSD (particle size distribution) as a concept in home brewing."
  }
};

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { V60_MASTERS_RECIPES, GRINDER_CROSS_REFERENCE, RECIPE_COMPARISON, EXPERT_PROFILES };
}
