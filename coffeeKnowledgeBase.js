/**
 * Coffee Knowledge Base for V60 Masters Brewing App
 * Structured reference data: origins, roast adjustments, water quality, glossary, common mistakes.
 * All data sourced from SCA standards, specialty coffee research, and expert brew guides.
 */

const COFFEE_KNOWLEDGE = {

  // ──────────────────────────────────────────────
  // 1. COFFEE ORIGINS — Top 10 with flavor profiles
  // ──────────────────────────────────────────────
  origins: [
    {
      id: "ethiopia",
      country: "Ethiopia",
      flag: "🇪🇹",
      region: "Africa",
      altitude: "1500–2200m",
      varieties: ["Heirloom", "Typica", "74110", "74112"],
      processing: ["Washed", "Natural"],
      flavorProfile: {
        primary: ["Fruity", "Floral", "Berry"],
        secondary: ["Bergamot", "Jasmine", "Blueberry", "Stone fruit", "Citrus"],
        body: "Light to Medium",
        acidity: "Bright, wine-like",
        sweetness: "High — honey, tropical fruit",
        finish: "Tea-like, clean, lingering floral"
      },
      notableRegions: [
        { name: "Yirgacheffe", notes: "Delicate, tea-like body with citrus and floral notes" },
        { name: "Sidamo", notes: "Well-rounded brightness with subtle sweetness" },
        { name: "Guji", notes: "Intense berry, peach, complex layered fruit" }
      ],
      brewTip: "Try a longer bloom (45s) to let the complex aromatics develop. Light roasts from Ethiopia often shine brightest at 94–96°C.",
      description: "Birthplace of coffee. Ethiopian heirloom varietals are often considered the pinnacle of specialty coffee, offering unmatched complexity and fruit-forward character."
    },
    {
      id: "colombia",
      country: "Colombia",
      flag: "🇨🇴",
      region: "South America",
      altitude: "1200–2000m",
      varieties: ["Caturra", "Castillo", "Colombia", "Typica", "Bourbon"],
      processing: ["Washed", "Honey", "Natural"],
      flavorProfile: {
        primary: ["Caramel", "Nutty", "Balanced"],
        secondary: ["Red apple", "Dark chocolate", "Toffee", "Brown sugar", "Citrus"],
        body: "Medium to Full",
        acidity: "Well-balanced, bright but not sharp",
        sweetness: "Medium-high — caramel, panela",
        finish: "Clean, sweet, lingering chocolate"
      },
      notableRegions: [
        { name: "Huila", notes: "Fruity, sweet, candy-like with complex acidity" },
        { name: "Nariño", notes: "High altitude, bright acidity, citrus and floral" },
        { name: "Antioquia", notes: "Classic chocolate, nutty, well-rounded" }
      ],
      brewTip: "Colombian coffees are forgiving across parameters. A 1:16 ratio at 93°C is a reliable starting point.",
      description: "One of the world's most consistent producers of quality coffee. Colombian Supremo is prized for its aromatic sweetness and approachable balance."
    },
    {
      id: "brazil",
      country: "Brazil",
      flag: "🇧🇷",
      region: "South America",
      altitude: "800–1400m",
      varieties: ["Bourbon", "Catuai", "Mundo Novo", "Yellow Bourbon"],
      processing: ["Natural", "Pulped Natural", "Washed"],
      flavorProfile: {
        primary: ["Chocolate", "Nutty", "Low acidity"],
        secondary: ["Maple", "Hazelnut", "Peanut", "Bittersweet chocolate", "Dried fruit"],
        body: "Medium to Full",
        acidity: "Low — smooth, mellow",
        sweetness: "Medium — brown sugar, cocoa",
        finish: "Round, clean, chocolatey"
      },
      notableRegions: [
        { name: "Cerrado", notes: "Sweet, nutty, chocolate, low acidity" },
        { name: "Mogiana", notes: "Caramel, balanced, creamy body" },
        { name: "Sul de Minas", notes: "Citrus hints, bright for a Brazilian, smooth" }
      ],
      brewTip: "Lower water temperature (90–92°C) prevents over-extraction of the chocolatey sweetness. Great as a base for blends.",
      description: "World's largest coffee producer. Brazilian naturals are staples in espresso blends and deliver comforting, approachable cups."
    },
    {
      id: "kenya",
      country: "Kenya",
      flag: "🇰🇪",
      region: "Africa",
      altitude: "1400–2100m",
      varieties: ["SL28", "SL34", "Ruiru 11", "Batian"],
      processing: ["Washed (double-fermented)", "Natural"],
      flavorProfile: {
        primary: ["Bright", "Berry", "Citrus"],
        secondary: ["Blackcurrant", "Tomato", "Grapefruit", "Cranberry", "Savory"],
        body: "Medium to Full, juicy",
        acidity: "High — vibrant, sparkling, phosphoric",
        sweetness: "Medium — brown sugar undertones",
        finish: "Long, complex, wine-like"
      },
      notableRegions: [
        { name: "Nyeri", notes: "Intense blackcurrant, bright sparkling acidity" },
        { name: "Kirinyaga", notes: "Complex berry, full body, sweet finish" },
        { name: "Kiambu", notes: "Citrus-forward, clean, refined" }
      ],
      brewTip: "Kenyan coffees demand precision. Use 94–96°C water and a finer grind to maximize the vibrant acidity. Avoid over-extracting — the savory notes can dominate.",
      description: "Immediately recognizable for their distinct savory brightness and complex fruit. Kenyan AA grade beans are among the most sought-after in specialty coffee."
    },
    {
      id: "guatemala",
      country: "Guatemala",
      flag: "🇬🇹",
      region: "Central America",
      altitude: "1300–2000m",
      varieties: ["Bourbon", "Caturra", "Catuai", "Typica", "Pache"],
      processing: ["Washed", "Honey", "Natural"],
      flavorProfile: {
        primary: ["Chocolate", "Spice", "Full body"],
        secondary: ["Dark chocolate", "Cinnamon", "Dried fruit", "Brown sugar", "Toffee"],
        body: "Full, velvety",
        acidity: "Medium — balanced, structured",
        sweetness: "High — molasses, dark caramel",
        finish: "Smoky, warm, lingering spice"
      },
      notableRegions: [
        { name: "Antigua", notes: "Rich chocolate, smooth body, volcanic soil complexity" },
        { name: "Huehuetenango", notes: "Fruity, wine-like acidity, complex structure" },
        { name: "Atitlán", notes: "Floral, citrus, clean bright cup" }
      ],
      brewTip: "The full body pairs well with slightly coarser grinds. 92–94°C brings out the chocolate and spice without bitterness.",
      description: "Volcanic soils and high altitudes produce dense, complex beans. Guatemalan coffees offer a comforting warmth with surprising depth."
    },
    {
      id: "costarica",
      country: "Costa Rica",
      flag: "🇨🇷",
      region: "Central America",
      altitude: "1200–1800m",
      varieties: ["Caturra", "Catuai", "Villa Sarchi", "SL28"],
      processing: ["Honey", "Washed", "Natural", "Anaerobic"],
      flavorProfile: {
        primary: ["Honey", "Citrus", "Clean"],
        secondary: ["Orange", "Mandarin", "Tamarind", "Vanilla", "Papaya"],
        body: "Light to Medium",
        acidity: "Bright — crisp, citric",
        sweetness: "High — honey, raw sugar",
        finish: "Clean, sweet, refreshing"
      },
      notableRegions: [
        { name: "Tarrazú", notes: "Bright citrus, clean body, high sweetness" },
        { name: "West Valley", notes: "Floral, stone fruit, honey sweetness" },
        { name: "Central Valley", notes: "Balanced, nutty, smooth" }
      ],
      brewTip: "Honey-processed Costa Ricans shine with a 1:16 ratio and 93°C water. The clarity is best on a V60 with thin paper filters.",
      description: "Known for exceptionally clean cups with honey-sweet brightness. Costa Rica is a pioneer in experimental processing methods like anaerobic honey."
    },
    {
      id: "indonesia",
      country: "Indonesia (Sumatra)",
      flag: "🇮🇩",
      region: "Asia-Pacific",
      altitude: "800–1500m",
      varieties: ["Typica", "Catimor", "Tim Tim", "Mandheling"],
      processing: ["Wet-hulled (Giling Basah)", "Natural", "Washed"],
      flavorProfile: {
        primary: ["Earthy", "Herbal", "Full body"],
        secondary: ["Cedar", "Tobacco", "Dark chocolate", "Mushroom", "Spice"],
        body: "Heavy, syrupy",
        acidity: "Low — muted, rounded",
        sweetness: "Low-medium — raw cocoa, brown sugar",
        finish: "Long, earthy, lingering spice"
      },
      notableRegions: [
        { name: "Mandheling", notes: "Classic earthy, herbal, thick body" },
        { name: "Lintong", notes: "Cleaner, more herbal, subtle spice" },
        { name: "Gayo (Aceh)", notes: "Complex, sweet, more fruit than typical Sumatra" }
      ],
      brewTip: "Use coarser grind and lower temperature (88–91°C) to tame the heavy body. Darker roasts of Sumatra can handle lower ratios (1:14).",
      description: "The unique wet-hull processing creates an unmistakable earthy, full-bodied character. Sumatran coffees are polarizing — people either love or puzzle over them."
    },
    {
      id: "yemen",
      country: "Yemen",
      flag: "🇾🇪",
      region: "Middle East",
      altitude: "1500–2500m",
      varieties: ["Yemeni Heirloom (Typica descendants)", "Dawairi", "Jaadi", "Udaini"],
      processing: ["Natural (sun-dried)"],
      flavorProfile: {
        primary: ["Wine", "Chocolate", "Complex"],
        secondary: ["Dried fruit", "Spice", "Red wine", "Cocoa", "Tobacco", "Cinnamon"],
        body: "Medium to Full",
        acidity: "Medium — winey, structured",
        sweetness: "High — dates, raisins, dried fig",
        finish: "Long, warm, complex spice trail"
      },
      notableRegions: [
        { name: "Haraz", notes: "Fruity, winey, complex chocolate notes" },
        { name: "Bani Matar", notes: "Deep spice, dried fruit, full body" },
        { name: "Hayma", notes: "Bright fruit, cleaner profile, floral" }
      ],
      brewTip: "Yemeni naturals are wild and complex. Start at 93°C with a 1:15 ratio. Expect longer bloom times due to very dry processing.",
      description: "One of the oldest coffee origins in the world. Yemeni coffees bridge African fruit-forward wildness and Asian earthy pungency, creating something truly unique."
    },
    {
      id: "panama",
      country: "Panama (Geisha)",
      flag: "🇵🇦",
      region: "Central America",
      altitude: "1600–1900m",
      varieties: ["Geisha/Gesha", "Caturra", "Typica", "Catuai"],
      processing: ["Washed", "Natural", "Honey"],
      flavorProfile: {
        primary: ["Jasmine", "Bergamot", "Tea-like"],
        secondary: ["Peach", "Mango", "Rose", "Lemongrass", "Tropical fruit"],
        body: "Light, delicate, silky",
        acidity: "Bright — elegant, refined, citric",
        sweetness: "Very high — floral honey, nectar",
        finish: "Extraordinarily long, perfumed, lingering jasmine"
      },
      notableRegions: [
        { name: "Boquete (Hacienda La Esmeralda)", notes: "World-famous Geisha origin, jasmine, bergamot, unmatched elegance" },
        { name: "Volcán", notes: "Tropical fruit, floral, bright acidity" },
        { name: "Renacimiento", notes: "Clean, sweet, subtle complexity" }
      ],
      brewTip: "Geisha demands careful extraction. Use 92–94°C, a 1:16 ratio, and gentle pours. Over-agitation will flatten the delicate florals.",
      description: "Panama Geisha is widely regarded as the most exquisite coffee variety. Auction lots have fetched over $2,000/kg. The jasmine-bergamot signature is unmistakable."
    },
    {
      id: "rwanda",
      country: "Rwanda",
      flag: "🇷🇼",
      region: "Africa",
      altitude: "1700–2200m",
      varieties: ["Red Bourbon", "Jackson", "BM 139"],
      processing: ["Washed", "Natural"],
      flavorProfile: {
        primary: ["Citrus", "Floral", "Juicy"],
        secondary: ["Orange blossom", "Red grape", "Plum", "Lemon", "Hibiscus"],
        body: "Medium, silky smooth",
        acidity: "Bright — sparkling, citric, malic",
        sweetness: "High — raw honey, cane sugar",
        finish: "Clean, juicy, sweet aftertaste"
      },
      notableRegions: [
        { name: "Nyamasheke", notes: "Bright citrus, floral, complex layered fruit" },
        { name: "Huye Mountain", notes: "Red fruit, juicy body, clean finish" },
        { name: "Gakenke", notes: "Floral, tea-like, delicate sweetness" }
      ],
      brewTip: "Rwandan coffees are similar to Kenyan but gentler. 93–95°C with a 1:16 ratio lets the juicy citrus and floral notes sing.",
      description: "East African gem producing silky-smooth cups with bright, sparkling acidity. Rwandan specialty coffee has risen dramatically in quality and recognition."
    }
  ],

  // ──────────────────────────────────────────────
  // 2. ROAST LEVEL ADJUSTMENTS FOR V60
  // ──────────────────────────────────────────────
  roastAdjustments: [
    {
      id: "light",
      level: "Light Roast",
      color: "#C4956A",
      scaName: "Cinnamon / Light City",
      description: "Beans dropped just after first crack. Dense, high acidity, origin character dominates. Requires more energy to extract.",
      parameters: {
        temperature: { value: "94–96°C", note: "Hotter water compensates for dense cell structure" },
        grindSize: { value: "Medium-fine", note: "Finer than medium to increase surface area and extraction" },
        ratio: { value: "1:15 – 1:16", note: "Slightly less water to concentrate delicate flavors" },
        bloomTime: { value: "40–50 seconds", note: "Extended bloom lets CO₂ escape from dense beans" },
        bloomRatio: { value: "2.5–3x coffee weight", note: "More bloom water for thorough saturation" },
        totalBrewTime: { value: "3:00 – 3:45", note: "Longer contact time for full extraction" },
        pourStyle: { value: "Slower, more agitation", note: "Swirl after bloom; gentle stir mid-brew helps even extraction" },
        targetTDS: { value: "1.30–1.45%", note: "Slightly higher strength to capture complexity" }
      },
      troubleshooting: {
        tooSour: "Grind finer, increase water temperature by 1–2°C, or extend brew time",
        tooBitter: "Unlikely with light roast — if it happens, grind coarser or lower temp by 1°C",
        tooWeak: "Increase dose (use 1:14) or grind finer",
        tooFlat: "Use hotter water and more agitation to unlock aromatics"
      }
    },
    {
      id: "medium",
      level: "Medium Roast",
      color: "#8B5E3C",
      scaName: "City / Full City",
      description: "Stopped between first and second crack. Balanced sweetness, acidity, and body. Most forgiving roast level for brewing.",
      parameters: {
        temperature: { value: "91–94°C", note: "Standard range; balanced extraction" },
        grindSize: { value: "Medium", note: "Sea salt consistency — the classic V60 grind" },
        ratio: { value: "1:15 – 1:17", note: "Standard range; adjust to taste" },
        bloomTime: { value: "30–40 seconds", note: "Standard bloom duration" },
        bloomRatio: { value: "2x coffee weight", note: "Standard bloom volume" },
        totalBrewTime: { value: "2:30 – 3:30", note: "The sweet spot for most V60 brews" },
        pourStyle: { value: "Steady concentric circles", note: "Consistent pour rate, gentle swirl after bloom" },
        targetTDS: { value: "1.20–1.40%", note: "The SCA-recommended sweet spot" }
      },
      troubleshooting: {
        tooSour: "Grind slightly finer or increase temperature by 1–2°C",
        tooBitter: "Grind slightly coarser or reduce temperature by 1–2°C",
        tooWeak: "Use a stronger ratio (1:15) or grind finer",
        tooStrong: "Dilute slightly or use a weaker ratio (1:17)"
      }
    },
    {
      id: "dark",
      level: "Dark Roast",
      color: "#3E2118",
      scaName: "Full City+ / Vienna / French",
      description: "Taken into or past second crack. Porous, oils on surface, low acidity, roast character dominates. Extracts very quickly — easy to over-extract.",
      parameters: {
        temperature: { value: "88–91°C", note: "Cooler water prevents over-extraction and bitterness" },
        grindSize: { value: "Medium-coarse", note: "Coarser to slow extraction; dark beans shatter easily producing fines" },
        ratio: { value: "1:16 – 1:18", note: "More water dilutes intense roast flavors" },
        bloomTime: { value: "25–35 seconds", note: "Shorter bloom — less CO₂ in porous dark beans" },
        bloomRatio: { value: "2x coffee weight", note: "Standard bloom volume" },
        totalBrewTime: { value: "2:15 – 3:00", note: "Faster drawdown to prevent harsh bitter notes" },
        pourStyle: { value: "Faster, less agitation", note: "Gentle pours, avoid swirling — dark roasts extract fast enough" },
        targetTDS: { value: "1.15–1.30%", note: "Slightly lower strength avoids harshness" }
      },
      troubleshooting: {
        tooSour: "Rare with dark roast — if sour, grind finer or increase temp slightly",
        tooBitter: "Grind much coarser, lower temperature to 88°C, pour faster",
        tooAshy: "Lower temperature and coarsen grind — the smoky/ashy taste is over-extraction",
        tooWeak: "Increase dose rather than grinding finer (fines cause clogging)"
      }
    },
    {
      id: "omni",
      level: "Omni Roast",
      color: "#6B4226",
      scaName: "City to Full City (versatile range)",
      description: "Roasted to perform across brewing methods — both filter and espresso. Has a wide usable extraction window. Start with medium parameters and dial in by taste.",
      parameters: {
        temperature: { value: "91–94°C", note: "Start in the middle and adjust — treat it like medium until you taste it" },
        grindSize: { value: "Medium", note: "Start medium; adjust based on whether the roast leans light or dark" },
        ratio: { value: "1:15 – 1:17", note: "1:16 is the safest starting point" },
        bloomTime: { value: "30–40 seconds", note: "Standard bloom; adjust based on how aggressively it degasses" },
        bloomRatio: { value: "2x coffee weight", note: "Standard bloom volume" },
        totalBrewTime: { value: "2:30 – 3:30", note: "Target the standard window and adjust" },
        pourStyle: { value: "Moderate agitation", note: "One gentle swirl after bloom; steady pours" },
        targetTDS: { value: "1.20–1.40%", note: "Standard SCA range" }
      },
      troubleshooting: {
        tooSour: "Treat it like a light roast — finer grind, hotter water, more agitation",
        tooBitter: "Treat it like a dark roast — coarser grind, cooler water, less agitation",
        unbalanced: "Omni roasts need 7–21 days rest after roast date for best results",
        hollow: "Increase ratio to 1:15 and grind slightly finer"
      }
    }
  ],

  // ──────────────────────────────────────────────
  // 3. WATER QUALITY GUIDE
  // ──────────────────────────────────────────────
  waterQuality: {
    overview: "Coffee is 98% water. Water chemistry directly affects extraction efficiency and flavor clarity. Bad water can ruin great beans.",
    scaStandard: {
      label: "SCA Gold Cup Standard",
      tds: { ideal: 150, range: [75, 250], unit: "ppm" },
      calcium: { ideal: 51, range: [17, 85], unit: "ppm" },
      magnesium: { ideal: 17, range: [5, 30], unit: "ppm" },
      alkalinity: { ideal: 40, range: [40, 70], unit: "ppm as CaCO₃" },
      ph: { ideal: 7.0, range: [6.5, 7.5] },
      sodium: { max: 10, unit: "ppm" },
      chlorine: { max: 0, note: "Zero — chlorine destroys flavor" }
    },
    minerals: [
      {
        name: "Calcium (Ca²⁺)",
        role: "Extraction power",
        detail: "Pulls flavor compounds from grounds. Higher calcium emphasizes body and mouthfeel. Too much causes scale buildup.",
        idealRange: "17–85 ppm"
      },
      {
        name: "Magnesium (Mg²⁺)",
        role: "Flavor clarity",
        detail: "Highlights acidity and bright fruity notes. Extracts more efficiently than calcium per ion. Key for specialty coffee.",
        idealRange: "5–30 ppm"
      },
      {
        name: "Bicarbonate (HCO₃⁻)",
        role: "Buffer / Alkalinity",
        detail: "Buffers acidity in the cup. Too low = sour, sharp brew. Too high = flat, chalky, muted flavors. The most critical balance.",
        idealRange: "40–70 ppm as CaCO₃"
      },
      {
        name: "Sodium (Na⁺)",
        role: "Taste modifier",
        detail: "Small amounts can enhance sweetness perception. Above 10 ppm creates salty/metallic taste.",
        idealRange: "< 10 ppm"
      }
    ],
    filterMethodTip: "For V60 / pour-over, aim for softer water (75–150 ppm TDS) to let brightness and fruit notes shine through clearly.",
    tapWaterAdvice: {
      title: "Simple advice for tap water users",
      steps: [
        {
          label: "Test your water",
          detail: "Buy a cheap TDS meter (under $15). Dip it in your tap water. If it reads 75–200 ppm, your water is likely fine for good coffee."
        },
        {
          label: "Too high (above 250 ppm)?",
          detail: "Your water is hard. Use a Brita-style activated carbon filter to reduce chlorine and some minerals. For serious improvement, try a mix of 50% filtered tap + 50% distilled water."
        },
        {
          label: "Too low (below 50 ppm)?",
          detail: "Your water is too soft — it lacks extraction power. Add mineral packets (Third Wave Water, Lotus Water, or Aquacode) to distilled/RO water. You can also blend soft water with harder tap water."
        },
        {
          label: "Chlorine smell?",
          detail: "Always filter out chlorine — it kills coffee flavor. Any carbon filter removes it, or leave water in an open container for 24 hours to off-gas."
        },
        {
          label: "Simplest approach",
          detail: "If your tap water tastes clean and neutral, it is probably good enough. If it tastes metallic, chlorinated, or has a strong mineral taste, filter it or use bottled spring water with a TDS of 100–150 ppm."
        }
      ]
    },
    brewedCoffeeTDS: {
      label: "Final brewed coffee TDS (in the cup)",
      ideal: "1.15–1.45%",
      note: "This is different from water TDS. Brewed coffee TDS measures dissolved coffee solids and indicates strength/concentration."
    }
  },

  // ──────────────────────────────────────────────
  // 4. COFFEE GLOSSARY — 30 essential terms
  // ──────────────────────────────────────────────
  glossary: [
    {
      term: "Bloom",
      definition: "The initial pour of hot water onto dry coffee grounds, causing them to release trapped CO₂ gas and puff up. Fresh coffee blooms vigorously. A good bloom ensures even extraction in the main brew.",
      category: "Brewing"
    },
    {
      term: "Drawdown",
      definition: "The phase after your final pour when water drains through the coffee bed and filter. Drawdown time is a key diagnostic — too fast means under-extraction, too slow means the grind is too fine or the bed is clogged.",
      category: "Brewing"
    },
    {
      term: "Agitation",
      definition: "Any physical disturbance of the coffee bed during brewing — swirling the dripper, stirring with a spoon, or the force of the pour itself. More agitation increases extraction speed.",
      category: "Brewing"
    },
    {
      term: "Channeling",
      definition: "When water finds a path of least resistance through cracks or gaps in the coffee bed, flowing through those channels instead of evenly through all the grounds. Causes uneven extraction — some grounds over-extracted, others under-extracted.",
      category: "Brewing"
    },
    {
      term: "TDS (Total Dissolved Solids)",
      definition: "A measurement of the concentration of dissolved compounds in liquid. For input water, measured in ppm (aim for 75–250). For brewed coffee, measured as a percentage (aim for 1.15–1.45%). Measured with a refractometer.",
      category: "Science"
    },
    {
      term: "Extraction",
      definition: "The process of dissolving flavor compounds from ground coffee into water. Target is 18–22% of the coffee's mass. Under-extraction tastes sour and thin; over-extraction tastes bitter and harsh.",
      category: "Science"
    },
    {
      term: "Bypass",
      definition: "Water that passes around or through the coffee bed without fully extracting. Some bypass is intentional (creates a cleaner cup), but too much leads to a watery, hollow-tasting brew.",
      category: "Science"
    },
    {
      term: "Dose",
      definition: "The weight of dry ground coffee you use for a brew, measured in grams. For V60, typical doses range from 12g (single cup) to 30g (large brew).",
      category: "Brewing"
    },
    {
      term: "Ratio",
      definition: "The proportion of coffee to water, expressed as 1:X (e.g., 1:16 means 1 gram of coffee per 16 grams of water). Lower ratios (1:14) = stronger; higher ratios (1:18) = lighter.",
      category: "Brewing"
    },
    {
      term: "Grind Size",
      definition: "How coarse or fine the coffee particles are after grinding. Finer grinds extract faster (more surface area), coarser grinds extract slower. V60 typically uses medium to medium-fine.",
      category: "Brewing"
    },
    {
      term: "Pour Rate",
      definition: "The speed at which you add water to the coffee bed, measured in grams per second. Slower pours give more control and extraction; faster pours reduce contact time.",
      category: "Brewing"
    },
    {
      term: "First Crack",
      definition: "An audible popping sound during roasting when beans reach ~196°C. Internal moisture turns to steam and the bean structure fractures. Light roasts stop here; medium roasts continue past it.",
      category: "Roasting"
    },
    {
      term: "Second Crack",
      definition: "A second, quieter crackling sound during roasting at ~224°C as the bean's cellulose structure breaks down. Marks the transition to dark roast. Oils begin to appear on the surface.",
      category: "Roasting"
    },
    {
      term: "Degassing",
      definition: "The release of CO₂ from roasted coffee over days and weeks. Fresh-roasted coffee needs 3–14 days of rest to degas before optimal brewing. Too fresh = aggressive bloom and uneven extraction.",
      category: "Roasting"
    },
    {
      term: "Acidity",
      definition: "The bright, lively, tangy quality in coffee — not sourness. Desirable acidity is described as citric (lemon), malic (apple), or phosphoric (sparkling). High-altitude and light-roast coffees have more acidity.",
      category: "Tasting"
    },
    {
      term: "Body",
      definition: "The physical weight and texture of coffee in your mouth. Ranges from tea-like (light body) to syrupy (heavy body). Affected by roast level, origin, processing method, and brew parameters.",
      category: "Tasting"
    },
    {
      term: "Mouthfeel",
      definition: "The tactile sensation of coffee on your palate — silky, creamy, gritty, astringent, juicy, or dry. Related to body but refers specifically to texture rather than weight.",
      category: "Tasting"
    },
    {
      term: "Finish / Aftertaste",
      definition: "The flavors that linger after swallowing. A long, pleasant finish is a hallmark of great coffee. Can be described as clean, sweet, dry, lingering, or fleeting.",
      category: "Tasting"
    },
    {
      term: "Cupping",
      definition: "The standardized SCA method for evaluating coffee. Coarsely ground coffee is steeped in hot water, the crust is broken and skimmed, then the coffee is slurped from a spoon. Used by professionals to score and compare coffees.",
      category: "Tasting"
    },
    {
      term: "SCA Score",
      definition: "A quality score from 0–100 assigned through the SCA cupping protocol. Specialty coffee must score 80+. Scores of 85+ are considered excellent; 90+ are exceptional and rare.",
      category: "Tasting"
    },
    {
      term: "Washed Process",
      definition: "Coffee processing where the fruit skin and mucilage are removed before drying using water and fermentation. Produces clean, bright, acidity-forward cups where origin character shines.",
      category: "Processing"
    },
    {
      term: "Natural Process",
      definition: "Coffee dried inside the whole cherry, allowing the fruit to ferment around the seed. Produces fruity, sweet, full-bodied, sometimes winey cups. Also called dry process.",
      category: "Processing"
    },
    {
      term: "Honey Process",
      definition: "The skin is removed but some or all of the sticky mucilage (the 'honey') is left on the bean during drying. Yellow honey = less mucilage; red/black honey = more. Creates sweetness and body between washed and natural.",
      category: "Processing"
    },
    {
      term: "Anaerobic Process",
      definition: "Coffee fermented in sealed, oxygen-free tanks before drying. Creates intense, unconventional flavors — tropical fruit, boozy, candy-like. A modern experimental method gaining popularity.",
      category: "Processing"
    },
    {
      term: "Single Origin",
      definition: "Coffee sourced from one specific country, region, farm, or lot. Highlights the unique terroir and character of that place. Contrasted with blends, which mix origins.",
      category: "General"
    },
    {
      term: "Specialty Coffee",
      definition: "Coffee that scores 80+ on the SCA scale, grown at high altitude, carefully processed, and roasted to highlight origin character. Represents roughly 5–10% of global coffee production.",
      category: "General"
    },
    {
      term: "Dialing In",
      definition: "The iterative process of adjusting grind size, dose, ratio, temperature, and technique to optimize a coffee's taste. Each new bag of beans requires dialing in. The core skill of good brewing.",
      category: "Brewing"
    },
    {
      term: "Refractometer",
      definition: "A device that measures the TDS (concentration) of brewed coffee by shining light through a small sample. Used to calculate extraction yield. Essential for data-driven brewing.",
      category: "Equipment"
    },
    {
      term: "Gooseneck Kettle",
      definition: "A kettle with a thin, curved spout that provides precise control over pour rate and placement. Essential for V60 and other pour-over methods. Temperature-controlled models are ideal.",
      category: "Equipment"
    },
    {
      term: "Burr Grinder",
      definition: "A grinder that uses two revolving abrasive surfaces (burrs) to crush beans into uniform particles. Produces far more consistent grinds than blade grinders. Flat burrs and conical burrs each have different characteristics.",
      category: "Equipment"
    }
  ],

  // ──────────────────────────────────────────────
  // 5. COMMON V60 MISTAKES
  // ──────────────────────────────────────────────
  commonMistakes: [
    {
      id: 1,
      mistake: "Skipping the bloom",
      why: "Trapped CO₂ in fresh coffee creates a gas barrier that repels water. Without blooming, water channels around dry pockets, causing uneven extraction — sour and bitter notes in the same cup.",
      fix: "Pour 2–3x the coffee weight in water (e.g., 40–50g for 18g dose), wait 30–45 seconds. The grounds should puff up and bubble. If they do not bloom, your coffee may be stale.",
      severity: "high"
    },
    {
      id: 2,
      mistake: "Wrong grind size (usually too coarse)",
      why: "V60 has a large single hole and thin paper filters — water flows through quickly. If the grind is too coarse, water rushes through without extracting enough, producing a sour, watery cup. Too fine and it clogs.",
      fix: "Start with medium-fine (finer than sea salt, coarser than table salt). Target a total brew time of 2:30–3:30 for a single cup. If drawdown is under 2 minutes, grind finer. Over 4 minutes, grind coarser.",
      severity: "high"
    },
    {
      id: 3,
      mistake: "Inconsistent pour (uneven or erratic)",
      why: "Pouring in one spot, hitting the filter walls, or pouring too aggressively creates channels where water takes the easiest path. Some grounds get over-extracted (bitter) while others are barely touched (sour).",
      fix: "Pour in slow, steady concentric circles starting from the center and spiraling outward, then back in. Keep the kettle spout close to the surface (2–4 cm above the bed). Maintain a consistent flow rate.",
      severity: "high"
    },
    {
      id: 4,
      mistake: "Not using a scale",
      why: "Eyeballing coffee and water amounts leads to wildly inconsistent ratios. A tablespoon of light roast weighs differently than dark roast. Without a scale, you cannot reproduce a good cup.",
      fix: "Use a scale that reads to 0.1g. Weigh your coffee dose and measure water by weight (grams, not milliliters of volume). A 0.5g change in dose or 10g change in water is noticeable.",
      severity: "high"
    },
    {
      id: 5,
      mistake: "Water temperature too low",
      why: "Cool water under-extracts, producing sour, thin, grassy-tasting coffee. This is especially common with light roasts, which need hotter water to break down their denser cell structure.",
      fix: "Use 90–96°C depending on roast level (see roast adjustments). Boiling water is fine for light roasts — it drops to ~94°C on contact with the grounds and ceramic dripper. Pre-heat your dripper and server.",
      severity: "medium"
    },
    {
      id: 6,
      mistake: "Not rinsing the paper filter",
      why: "Unrinsed paper filters impart a papery, cardboard-like taste to the brew. The first few ounces of water through a dry filter carry paper dust and manufacturing residues.",
      fix: "Place the filter in the V60, pour hot water through it to saturate and rinse, then discard the rinse water. This also pre-heats the dripper and server.",
      severity: "medium"
    },
    {
      id: 7,
      mistake: "Pouring onto the filter walls",
      why: "Water hitting the paper filter bypasses the coffee bed entirely. It runs down the sides without extracting anything, diluting your final brew and creating an uneven bed shape.",
      fix: "Keep your pour within the inner 2/3 of the coffee bed. Never intentionally pour onto the exposed paper above the coffee line. The bed should remain relatively flat throughout the brew.",
      severity: "medium"
    },
    {
      id: 8,
      mistake: "Using stale coffee",
      why: "Coffee begins losing volatile aromatic compounds immediately after roasting, and rapidly after grinding. Pre-ground coffee from a supermarket shelf may be months old. Stale coffee tastes flat, papery, and dull.",
      fix: "Use whole beans roasted within the last 2–4 weeks. Grind immediately before brewing. If the bloom is flat (no bubbling or expansion), the coffee is likely too old for optimal flavor.",
      severity: "medium"
    },
    {
      id: 9,
      mistake: "Ignoring total brew time",
      why: "Brew time is the simplest diagnostic for extraction. If you are not timing your brew, you have no reference point for adjusting grind size or pour technique.",
      fix: "Use a timer (most coffee scales have one built in). For a single V60 cup (250–300ml), target 2:30–3:30 total including bloom. Log your times alongside taste notes to find your preferred window.",
      severity: "medium"
    },
    {
      id: 10,
      mistake: "Not adjusting for different coffees",
      why: "Every coffee has different density, roast level, processing, and age. Using the same grind, temperature, and ratio for everything means most of your coffees are being brewed sub-optimally.",
      fix: "Treat each new bag as a dial-in session. Brew your first cup with baseline parameters, taste critically, then adjust one variable at a time. Keep notes on what worked.",
      severity: "low"
    },
    {
      id: 11,
      mistake: "Swirling or agitating too aggressively",
      why: "While some agitation helps even extraction, too much creates a dense layer of fine particles (fines migration) at the bottom of the filter, causing clogging and stalling the drawdown.",
      fix: "One gentle swirl after the bloom and optionally one after the final pour (the Rao spin) is enough. Avoid aggressive stirring or repeated swirling. If drawdown stalls, reduce agitation next time.",
      severity: "low"
    },
    {
      id: 12,
      mistake: "Brewing too much or too little for the dripper size",
      why: "A V60 01 is designed for 1–2 cups (12–20g dose). Using too little coffee creates a thin bed with high bypass; too much coffee overflows or extracts unevenly due to depth.",
      fix: "Match your dose to your dripper size. V60 01: 12–20g. V60 02: 18–30g. V60 03: 25–40g. If you need more coffee, use a larger dripper rather than overloading a small one.",
      severity: "low"
    }
  ],

  // ──────────────────────────────────────────────
  // METADATA
  // ──────────────────────────────────────────────
  meta: {
    version: "1.0.0",
    lastUpdated: "2026-03-01",
    sources: [
      "Specialty Coffee Association (SCA) standards and protocols",
      "James Hoffmann — The World Atlas of Coffee, V60 technique guides",
      "Barista Hustle — Water for Coffee, extraction theory",
      "Coffee ad Astra — brewing research by Jonathan Gagne",
      "Third Wave Water — mineral composition guides",
      "Royal Coffee — brew glossary and extraction concepts"
    ]
  }
};

// Export for use in different module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = COFFEE_KNOWLEDGE;
}
