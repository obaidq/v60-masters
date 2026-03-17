// ═══════════════════════════════════════════════════════════════════════════
// V60 Masters — Complete App Engine (_build_app.js)
// Loaded AFTER coffeeKnowledgeBase.js and troubleshooting-data.js
// ═══════════════════════════════════════════════════════════════════════════

'use strict';

// ─── CORE UTILS ──────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

function toast(msg, type = 'info') {
  try {
    let box = $('toasts');
    if (!box) {
      box = document.createElement('div');
      box.id = 'toasts';
      box.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:999;display:flex;flex-direction:column;gap:8px;width:90%;max-width:360px;pointer-events:none';
      document.body.appendChild(box);
    }
    const t = document.createElement('div');
    const colors = { info: '#6b3a1f', ok: '#1e8449', warn: '#d4890a', error: '#c0392b' };
    t.style.cssText = 'padding:12px 16px;border-radius:12px;font-size:13px;font-weight:700;font-family:Cairo,sans-serif;color:#fff;background:' + (colors[type] || colors.info) + ';box-shadow:0 4px 16px rgba(0,0,0,.2);opacity:0;transform:translateY(-10px);transition:all .3s;pointer-events:auto;direction:rtl;text-align:center';
    t.textContent = msg;
    box.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
    setTimeout(() => {
      t.style.opacity = '0'; t.style.transform = 'translateY(-10px)';
      setTimeout(() => t.remove(), 300);
    }, 2800);
  } catch (e) { /* silent */ }
}

function debounce(fn, ms) {
  let t;
  return function (...a) { clearTimeout(t); t = setTimeout(() => fn.apply(this, a), ms); };
}

function safeJSON(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch (e) { return fallback; }
}

function animate(el, animation, duration) {
  if (!el) return;
  el.classList.add(animation);
  setTimeout(() => el.classList.remove(animation), duration || 500);
}

function safeSave(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); }
  catch (e) { toast('التخزين ممتلئ', 'warn'); }
}

// ─── AUDIO ───────────────────────────────────────────────────────────────────
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
  return audioCtx;
}

function beep(freq, dur) {
  const ctx = getAudioCtx(); if (!ctx) return;
  try {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = freq || 880;
    g.gain.value = 0.15;
    o.connect(g); g.connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + (dur || 0.12));
  } catch (e) {}
}

function doubleBeep() { beep(880, 0.12); setTimeout(() => beep(1100, 0.2), 180); }

// ─── STATE ───────────────────────────────────────────────────────────────────
let favs = safeJSON('v60f', []);
let brewLog = safeJSON('v60log', []);
let curS = 'home';
let curSub = 'fav';
let learnSub = 'origins';
let curCups = 1, curScale = 1, curRecipeId = null;
let searchQuery = '';
let onboardDone = localStorage.getItem('v60ob') === '1';
let brewRating = 0, brewRecipeForLog = null;
let wakeLockObj = null;
let aT = ''; // active type filter
let diagStep = null, diagAnswers = [];
let sugAnswers = { type: '', str: '', lv: '', flav: '', time: '' };
let brewTimerState = null; // for resume
let statsAnimated = false;

// ─── RECIPE DATA (13 recipes) ────────────────────────────────────────────────
const D = [
  {
    id: 1,
    ex: "James Hoffmann",
    m: "Structured Even Extraction",
    mA: "الاستخلاص المتساوي",
    type: "hot",
    dose: 30, water: 500, ice: 0,
    ratio: "1:16.7", rn: 16.7,
    temp: 97, tn: '\"أعلى حرارة ممكنة\" — Hario Europe: 97\u00B0C',
    ode: "4-5", oMin: 4, oMax: 5,
    time: "~3:30", ts: 210,
    agit: "دوران + تحريك ملعقة + دوران",
    st: "موثّقة", diff: "مبتدئ", pop: 5,
    fl: { sw: 3, ac: 3, bd: 4, cl: 5 },
    bio: "بطل العالم باريستا 2007. مؤسس Square Mile Coffee. أشهر فيديو V60 على يوتيوب.",
    bioLong: "James Hoffmann بطل العالم باريستا 2007 ومؤسس Square Mile Coffee Roasters في لندن. فيديو وصفته على يوتيوب تجاوز 15 مليون مشاهدة وصار المرجع الأول لمستخدمي V60 حول العالم. كتابه The World Atlas of Coffee من أهم المراجع في عالم القهوة المختصة.",
    videoUrl: "https://www.youtube.com/watch?v=AI4ynXzkSQo",
    bestFor: ["أول وصفة للمبتدئين", "كوب يومي متوازن", "استضافة ضيوف"],
    bestBeans: ["Ethiopian light", "Colombian medium", "Guatemalan"],
    tags: ["hoffmann", "beginner", "classic", "even", "structured", "مبتدئ", "كلاسيك"],
    theory: "الفكرة إن التحريك القوي بالبداية يكسر كل الكتل ويتأكد إن كل حبّة بن تتبلل. الصبّتين الكبيرتين بعدها تخلّي الماء يمر بشكل متساوي على كل البن. الدوران الأخير ينزّل البن من الجوانب ويسوّي سطح مستوي — أساس الاستخلاص المتساوي.",
    steps: [
      { l: "التفتيح", add: 60, total: 60, t: "0:00", w: "45 ثانية", n: "حرّك الفلتر دوران عشان تتبلل الحبوب", tmp: 97 },
      { l: "الصبّة 1", add: 240, total: 300, t: "0:45", w: "30 ثانية صب", n: "صبّ حلزوني قوي من الوسط للخارج", tmp: 97 },
      { l: "الصبّة 2", add: 200, total: 500, t: "1:15", w: "30 ثانية صب", n: "صبّ هادي في الوسط", tmp: 97 },
      { l: "التحريك", add: 0, total: 500, t: "1:45", w: "تصفية ~1:45", n: "حرّك مع الساعة + عكسها، ثم دوران أخير" }
    ]
  },
  {
    id: 2,
    ex: "James Hoffmann",
    m: "Iced V60",
    mA: "V60 مثلّج",
    type: "iced",
    dose: 32.5, water: 300, ice: 200,
    ratio: "~1:15.4", rn: 15.4,
    temp: 95, tn: "95\u00B0C",
    ode: "3.5-4.5", oMin: 3.5, oMax: 4.5,
    time: "~2:55", ts: 175,
    agit: "",
    st: "موثّقة", diff: "مبتدئ", pop: 4,
    fl: { sw: 3, ac: 4, bd: 3, cl: 4 },
    bio: "نسبة ~1:15.4 مع 500g سائل (300 ماء + 200 ثلج).",
    bioLong: "James Hoffmann طوّر هالوصفة كطريقة يابانية كلاسيكية للمثلّج. الفكرة إنك تحضّر قهوة مركّزة على ثلج مباشرة — الثلج يبرّد القهوة فوراً ويحبس كل الروائح والنكهات. النتيجة كوب مثلّج بنكهة أوضح وأحلى من أي cold brew.",
    videoUrl: "https://www.youtube.com/watch?v=PApBycDrPo0",
    bestFor: ["صيف حار", "قهوة مثلّجة سريعة", "ضيوف يحبون البارد"],
    bestBeans: ["Ethiopian natural", "Kenyan", "Rwandan"],
    tags: ["hoffmann", "iced", "japanese", "مثلّج", "صيف", "بارد"],
    theory: "الطريقة اليابانية تعتمد على تقليل كمية الماء الساخن واستبدال الباقي بثلج. الماء الساخن يستخلص كل النكهة بشكل كامل، والثلج يبرّد القهوة فوراً ويحافظ على المركّبات العطرية اللي عادة تتبخر لو تركت القهوة تبرد طبيعي.",
    steps: [
      { l: "التجهيز", add: 0, total: 0, t: "\u2014", w: "", n: "حط 200g ثلج في السيرفر", tmp: null },
      { l: "التفتيح", add: 65, total: 65, t: "0:00", w: "45 ثانية", n: "صبّ 65g وخلّه يتفتّح", tmp: 95 },
      { l: "الصبّة 1", add: 235, total: 300, t: "0:45", w: "تصفية ~2:10", n: "صبّ كل الماء. ينزل على الثلج.", tmp: 95 }
    ]
  },
  {
    id: 3,
    ex: "Tetsu Kasuya",
    m: "4:6 Method",
    mA: "طريقة 4:6",
    type: "hot",
    dose: 20, water: 300, ice: 0,
    ratio: "1:15", rn: 15,
    temp: 92, tn: '92\u00B0C (بطولة) / ~93\u00B0C (فاتحة)',
    ode: "5.5-6.5", oMin: 5.5, oMax: 6.5,
    time: "~3:30", ts: 210,
    agit: "بدون",
    st: "موثّقة", diff: "مبتدئ", pop: 5,
    fl: { sw: 4, ac: 3, bd: 3, cl: 3 },
    bio: "بطل العالم Brewers Cup 2016 (اليابان). أول صبّتين (40%) = حلاوة/حموضة. آخر 3 (60%) = القوة.",
    bioLong: "Tetsu Kasuya بطل العالم Brewers Cup 2016 من اليابان. ابتكر طريقة 4:6 اللي تقسم الماء لقسمين: أول 40% يتحكم بالحلاوة والحموضة، وآخر 60% يتحكم بالقوة. هالطريقة خلّت التحكم بالنكهة سهل حتى للمبتدئين — تقدر تعدّل الطعم بتغيير نسبة أول صبّتين.",
    videoUrl: "https://www.youtube.com/watch?v=wmCW8xSWGZY",
    bestFor: ["تحكم بالنكهة", "تحضير سهل ومتكرر", "بن متوسط التحميص"],
    bestBeans: ["Colombian", "Brazilian", "Guatemalan"],
    tags: ["tetsu", "kasuya", "4:6", "beginner", "control", "مبتدئ", "تحكم"],
    theory: "طريقة 4:6 مبنية على مبدأ إن أول ماء يلمس البن يستخلص الأحماض (حموضة) والسكريات (حلاوة). بتغيير نسبة أول صبّتين تقدر تتحكم: صبّة أولى أكبر = حلاوة أكثر. صبّة أولى أصغر = حموضة أكثر. الثلاث صبّات الأخيرة بس تتحكم بقوة الكوب.",
    steps: [
      { l: "الصبّة 1", add: 60, total: 60, t: "0:00", w: "انتظر لين ينشف", n: "مبسّطة: 60g متساوية. البطولة: 50g", tmp: 92 },
      { l: "الصبّة 2", add: 60, total: 120, t: "~0:45", w: "انتظر لين ينشف", n: "البطولة: 70g", tmp: 92 },
      { l: "الصبّة 3", add: 60, total: 180, t: "~1:20", w: "انتظر لين ينشف", n: "", tmp: 92 },
      { l: "الصبّة 4", add: 60, total: 240, t: "~2:00", w: "انتظر لين ينشف", n: "", tmp: 92 },
      { l: "الصبّة 5", add: 60, total: 300, t: "~2:30", w: "تصفية ~1 دقيقة", n: "", tmp: 92 }
    ]
  },
  {
    id: 4,
    ex: "Tetsu Kasuya",
    m: "Ice Brew",
    mA: "بروّ الثلج (تجريبية)",
    type: "iced",
    dose: 50, water: 100, ice: 500,
    ratio: "1:12", rn: 12,
    temp: 0, tn: "بدون حرارة",
    ode: "\u2014", oMin: null, oMax: null,
    time: "4-15 hrs", ts: null,
    agit: "بدون",
    st: "موثّقة", diff: "متقدم", pop: 2,
    fl: { sw: 5, ac: 2, bd: 5, cl: 2 },
    bio: 'تجريبية — \"ما تعطي نتائج ثابتة\". استخلاص بارد بطيء.',
    bioLong: "Tetsu Kasuya ابتكر هالطريقة التجريبية اللي تعتمد على ذوبان الثلج البطيء لاستخلاص القهوة. الثلج يذوب تدريجياً ويمر على البن الخشن ببطء شديد — النتيجة قهوة بقوام كثيف ونكهة حلوة غير عادية. Tetsu نفسه يقول إن النتائج ما تكون ثابتة كل مرة.",
    videoUrl: "https://www.youtube.com/watch?v=2yrAWsembSs",
    bestFor: ["تجربة مختلفة", "قهوة بقوام كثيف", "محبّي التجارب"],
    bestBeans: ["Ethiopian natural", "Colombian", "Brazilian natural"],
    tags: ["tetsu", "kasuya", "ice", "experimental", "cold", "تجريبية", "ثلج"],
    theory: "الاستخلاص البارد بالثلج يعتمد على الوقت بدل الحرارة. الثلج يذوب ببطء شديد — قطرة قطرة — ويمر على البن الخشن. هالبطء يستخلص السكريات والزيوت بدون ما يسحب المرارة والأحماض الحادّة. النتيجة قهوة smooth جداً بس ما تكون ثابتة لأن سرعة ذوبان الثلج تتغير.",
    steps: [
      { l: "التجهيز", add: 0, total: 0, t: "\u2014", w: "", n: "50g بن خشن في V60", tmp: null },
      { l: "الثلج", add: 500, total: 500, t: "0:00", w: "", n: "500g ثلج مباشرة على البن", tmp: 0 },
      { l: "الماء", add: 100, total: 600, t: "0:01", w: "4-15 ساعة", n: "100g ماء بارد. خلّ الثلج يذوب.", tmp: 0 }
    ]
  },
  {
    id: 5,
    ex: "Scott Rao",
    m: "Two-Pour Method",
    mA: "طريقة الصبّتين",
    type: "hot",
    dose: 20, water: 330, ice: 0,
    ratio: "~1:16.5", rn: 16.5,
    temp: 97, tn: '97\u00B0C — \"أعلى حرارة ممكنة\"',
    ode: "4-5", oMin: 4, oMax: 5,
    time: "4:00-4:30", ts: 255,
    agit: "دوران بعد كل صبّة",
    st: "موثّقة", diff: "متوسط", pop: 4,
    fl: { sw: 3, ac: 3, bd: 5, cl: 4 },
    bio: "مؤلف كتب علم القهوة. يستهدف استخلاص 22-24.5%. ينصح بـV60 بلاستيك.",
    bioLong: "Scott Rao مؤلف عدة كتب أساسية في علم القهوة مثل Everything but Espresso و The Professional Barista's Handbook. يعتبر من أهم المراجع العلمية في الصناعة. يستهدف استخلاص عالي (22-24.5%) ويعتبر V60 البلاستيك أفضل من السيراميك لأنه يحافظ على الحرارة أحسن.",
    videoUrl: "https://www.youtube.com/watch?v=ji4085BZNIE",
    bestFor: ["استخلاص عالي", "كوب بقوام كامل", "محبّي العلم"],
    bestBeans: ["Colombian", "Guatemalan", "Ethiopian washed"],
    tags: ["rao", "science", "two-pour", "extraction", "متوسط", "علمي"],
    theory: "Scott Rao يؤمن إن البساطة أفضل — صبّتين كبيرتين بدل 5 أو 6 صغيرة. كل صبّة تتبعها Rao Spin (دوران خفيف) عشان تنزّل البن من الجوانب وتسوّي سطح مستوي. النتيجة استخلاص عالي ومتساوي. الحرارة العالية (97°C) تكسر بنية البن الفاتح وتطلع كل النكهة.",
    steps: [
      { l: "التفتيح", add: 60, total: 60, t: "0:00", w: "40 ثانية", n: "دوران قوي بعد الصب", tmp: 97 },
      { l: "الصبّة 1", add: 140, total: 200, t: "0:40", w: "انتظر ~70% ينزل", n: "دوران خفيف", tmp: 97 },
      { l: "الصبّة 2", add: 130, total: 330, t: "~1:30", w: "تصفية ~2:30-3:00", n: "دوران خفيف. تصفية كاملة.", tmp: 97 }
    ]
  },
  {
    id: 6,
    ex: "Matt Winton",
    m: "Five-Pour Method",
    mA: "طريقة الخمس صبّات",
    type: "hot",
    dose: 20, water: 300, ice: 0,
    ratio: "1:15", rn: 15,
    temp: 93, tn: '93\u00B0C تفتيح / ~88\u00B0C باقي (كتلتين)',
    ode: "5-6", oMin: 5, oMax: 6,
    time: "~3:30", ts: 210,
    agit: "بدون (ارتفاع الصب)",
    st: "موثّقة", diff: "متقدم", pop: 3,
    fl: { sw: 4, ac: 4, bd: 3, cl: 4 },
    bio: "بطل العالم Brewers Cup 2021. يعتمد ارتفاع الصب بدل التحريك.",
    bioLong: "Matt Winton بطل العالم Brewers Cup 2021 من سويسرا. طريقته فريدة لأنه يستخدم حرارتين مختلفتين: 93°C للتفتيح و88°C للباقي. بدل التحريك أو الدوران، يتحكم بالاستخلاص عن طريق ارتفاع الصب — كل ما صبّ من أعلى كل ما زاد التحريك الطبيعي.",
    videoUrl: "https://www.youtube.com/watch?v=0hcLATSeKtc",
    bestFor: ["تجربة متقدمة", "بن فاتح جداً", "تحكم بالتحريك"],
    bestBeans: ["Ethiopian washed", "Kenyan", "Panama Geisha"],
    tags: ["winton", "advanced", "five-pour", "two-temp", "متقدم", "بطولة"],
    theory: "Matt Winton يستخدم حرارتين عشان يتحكم بالاستخلاص بدقة. الصبّة الأولى بـ93°C تبدأ الاستخلاص بقوة وتكسر البن. باقي الصبّات بـ88°C تكمل الاستخلاص ببطء بدون ما تسحب مرارة. ارتفاع الصب يعطي تحريك طبيعي بدون لمس البن — طريقة ذكية لتحكم أدق.",
    steps: [
      { l: "الصبّة 1", add: 60, total: 60, t: "0:00", w: "لين يقارب ينشف", n: "93\u00B0C. صبّ من ارتفاع.", tmp: 93 },
      { l: "الصبّة 2", add: 60, total: 120, t: "~0:40", w: "لين يقارب ينشف", n: "غيّر لـ~88\u00B0C", tmp: 88 },
      { l: "الصبّة 3", add: 60, total: 180, t: "~1:15", w: "لين يقارب ينشف", n: "", tmp: 88 },
      { l: "الصبّة 4", add: 60, total: 240, t: "~1:50", w: "لين يقارب ينشف", n: "", tmp: 88 },
      { l: "الصبّة 5", add: 60, total: 300, t: "~2:25", w: "تصفية ~1 دقيقة", n: "", tmp: 88 }
    ]
  },
  {
    id: 7,
    ex: "Emi Fukahori",
    m: "Hybrid Immersion (GINA)",
    mA: "الطريقة الهجينة",
    type: "hot",
    dose: 17, water: 220, ice: 0,
    ratio: "~1:12.9", rn: 12.9,
    temp: 80, tn: '80\u00B0C غمر / 95\u00B0C تقطير',
    ode: "\u2014", oMin: null, oMax: null,
    time: "~2:55", ts: 175,
    agit: "",
    st: "موثّقة", diff: "متقدم", pop: 3,
    fl: { sw: 5, ac: 2, bd: 4, cl: 3 },
    bio: "بطلة العالم Brewers Cup 2018. أول امرأة تفوز. GINA by Goat Story.",
    bioLong: "Emi Fukahori بطلة العالم Brewers Cup 2018 من سويسرا (أصل ياباني). أول امرأة تفوز بهالبطولة. طريقتها تستخدم GINA dripper (من Goat Story) اللي فيه صمّام — تقدر تقفله للغمر وتفتحه للتقطير. تجمع بين مزايا French Press (قوام) وV60 (صفاء).",
    videoUrl: "https://www.youtube.com/watch?v=JwikBbFOXuA",
    bestFor: ["تجربة فريدة", "قوام كريمي", "محبّي الحلاوة"],
    bestBeans: ["Ethiopian natural", "Colombian", "Costa Rican honey"],
    tags: ["emi", "fukahori", "hybrid", "immersion", "gina", "متقدم", "هجين"],
    theory: "الطريقة الهجينة تجمع بين الغمر (immersion) والتقطير (percolation). الغمر بـ80°C يستخلص الحلاوة والقوام بدون مرارة. التقطير بـ95°C يستخلص الحموضة والصفاء. الجمع بينهم يعطي كوب معقّد: حلو وكريمي مع حموضة خفيفة — شي صعب تحققه بطريقة وحدة.",
    steps: [
      { l: "المرحلة 1", add: 50, total: 50, t: "0:00", w: "غمر 45 ثانية", n: "الصمّام مقفل. 80\u00B0C.", tmp: 80 },
      { l: "المرحلة 2", add: 100, total: 150, t: "0:45", w: "تقطير 60 ثانية", n: "الصمّام مفتوح. 95\u00B0C.", tmp: 95 },
      { l: "المرحلة 3", add: 70, total: 220, t: "1:45", w: "غمر 45 ثانية", n: "الصمّام مقفل. 80\u00B0C.", tmp: 80 },
      { l: "التصفية", add: 0, total: 220, t: "2:30", w: "25 ثانية", n: "الصمّام مفتوح.", tmp: null }
    ]
  },
  {
    id: 8,
    ex: "Patrik Rolf",
    m: "April Coffee V60",
    mA: "طريقة April Coffee",
    type: "hot",
    dose: 20, water: 300, ice: 0,
    ratio: "1:15", rn: 15,
    temp: 92, tn: "92\u00B0C",
    ode: "5.5-6.5", oMin: 5.5, oMax: 6.5,
    time: "~3:20", ts: 205,
    agit: "صبّ دائري قوي",
    st: "موثّقة", diff: "متوسط", pop: 3,
    fl: { sw: 3, ac: 4, bd: 3, cl: 5 },
    bio: "مؤسس April Coffee كوبنهاغن. فضية Brewers Cup 2019.",
    bioLong: "Patrik Rolf مؤسس April Coffee Roasters في كوبنهاغن، الدنمارك. حصل على فضية بطولة العالم Brewers Cup 2019. طريقته تعتمد على 6 صبّات متساوية (50g كل وحدة) بفاصل زمني ثابت. البساطة والانتظام هم أساس فلسفته في التحضير.",
    videoUrl: "https://www.youtube.com/watch?v=ggCK_oOS-YA",
    bestFor: ["صفاء عالي", "بن فاتح فاكهي", "تحضير منتظم"],
    bestBeans: ["Ethiopian washed", "Kenyan", "Rwandan"],
    tags: ["patrik", "rolf", "april", "six-pour", "clarity", "متوسط", "صفاء"],
    theory: "فلسفة Patrik Rolf إن الصبّات الصغيرة المتساوية تعطي استخلاص أكثر تساوي من الصبّات الكبيرة. كل صبّة 50g تنزل بالكامل قبل الثانية — هذا يمنع الغمر الزائد ويخلّي الماء يمر على كل البن. النتيجة كوب بصفاء عالي جداً — تقدر تميّز كل نكهة لحالها.",
    steps: [
      { l: "الصبّة 1", add: 50, total: 50, t: "0:00", w: "40 ثانية", n: "صبّ دائري قوي", tmp: 92 },
      { l: "الصبّة 2", add: 50, total: 100, t: "0:40", w: "30 ثانية", n: "", tmp: 92 },
      { l: "الصبّة 3", add: 50, total: 150, t: "1:10", w: "30 ثانية", n: "", tmp: 92 },
      { l: "الصبّة 4", add: 50, total: 200, t: "1:40", w: "30 ثانية", n: "", tmp: 92 },
      { l: "الصبّة 5", add: 50, total: 250, t: "2:10", w: "30 ثانية", n: "", tmp: 92 },
      { l: "الصبّة 6", add: 50, total: 300, t: "2:40", w: "تصفية ~50 ثانية", n: "", tmp: 92 }
    ]
  },
  {
    id: 9,
    ex: "Lance Hedrick",
    m: "Versatile V60",
    mA: "الوصفة المرنة",
    type: "hot",
    dose: 20, water: 340, ice: 0,
    ratio: "1:17", rn: 17,
    temp: 100, tn: '100\u00B0C (غليان)',
    ode: "4-5", oMin: 4, oMax: 5,
    time: "~3:00", ts: 180,
    agit: "دوران بعد كل صبّة",
    st: "موثّقة", diff: "مبتدئ", pop: 4,
    fl: { sw: 3, ac: 3, bd: 3, cl: 4 },
    bio: "يوتيوبر ومثقّف قهوة. ساهم بتصميم Fellow Ode Gen 2.",
    bioLong: "Lance Hedrick يوتيوبر ومثقّف قهوة من أمريكا — من أشهر صنّاع محتوى القهوة على يوتيوب. ساهم بتصميم طاحونة Fellow Ode Gen 2. وصفته المرنة (Versatile V60) صُمّمت عشان تشتغل مع أي نوع بن — فاتح أو غامق، طازج أو قديم.",
    videoUrl: "https://www.youtube.com/watch?v=eLHYOR0InQQ",
    bestFor: ["وصفة لكل أنواع البن", "كوب يومي سهل", "مبتدئين يبون ثبات"],
    bestBeans: ["Any light-medium", "Ethiopian", "Colombian"],
    tags: ["lance", "hedrick", "versatile", "beginner", "daily", "مبتدئ", "مرن", "يومي"],
    theory: "Lance يستخدم ماء مغلي (100°C) لأنه يؤمن إن الحرارة العالية تعطي أفضل استخلاص لأغلب أنواع البن. 4 صبّات بسيطة مع دوران بعد كل وحدة تضمن تساوي الاستخلاص. النسبة 1:17 تعطي كوب خفيف ونظيف — مناسب للشرب اليومي بدون ما يكون ثقيل.",
    steps: [
      { l: "الصبّة 1", add: 50, total: 50, t: "0:00", w: "30 ثانية", n: "دوران", tmp: 100 },
      { l: "الصبّة 2", add: 50, total: 100, t: "0:30", w: "30 ثانية", n: "دوران", tmp: 100 },
      { l: "الصبّة 3", add: 120, total: 220, t: "1:00", w: "30 ثانية", n: "دوران", tmp: 100 },
      { l: "الصبّة 4", add: 120, total: 340, t: "1:30", w: "تصفية ~1-2 دقيقة", n: "دوران", tmp: 100 }
    ]
  },
  {
    id: 10,
    ex: "Lance Hedrick",
    m: "Ultimate Flash Brew",
    mA: "فلاش برو مثلّج",
    type: "iced",
    dose: 20, water: 240, ice: 60,
    ratio: "~1:15", rn: 15,
    temp: 97, tn: '93-100\u00B0C',
    ode: "\u2014", oMin: null, oMax: null,
    time: "~2:45", ts: 178,
    agit: "خفيف",
    st: "موثّقة", diff: "متوسط", pop: 3,
    fl: { sw: 3, ac: 4, bd: 3, cl: 5 },
    bio: "نسبة ماء:ثلج 8:2. الثلج يُحرّك بالقهوة بعد التحضير.",
    bioLong: "Lance Hedrick طوّر طريقة Flash Brew كبديل للطريقة اليابانية التقليدية. بدل ما يحط الثلج بالسيرفر من البداية، يحضّر القهوة بكمية ماء أكثر (80%) ويضيف الثلج بعد التحضير. النتيجة استخلاص أكمل ونكهة أوضح من الطريقة اليابانية.",
    videoUrl: "https://www.youtube.com/watch?v=QhNdBBYfBGg",
    bestFor: ["مثلّج بنكهة أوضح", "صيف", "بن فاكهي"],
    bestBeans: ["Ethiopian natural", "Kenyan", "Costa Rican"],
    tags: ["lance", "hedrick", "flash", "iced", "مثلّج", "فلاش"],
    theory: "Flash Brew يختلف عن الطريقة اليابانية بإن القهوة تُحضّر بنسبة ماء أعلى (80% بدل 60%). هذا يعني استخلاص أكمل وأكثر تساوي. الثلج يُضاف بعد التحضير ويُحرّك — التبريد السريع يحبس النكهات بنفس الطريقة بس مع استخلاص أفضل.",
    steps: [
      { l: "التفتيح", add: 60, total: 60, t: "0:00", w: "60 ثانية", n: "دقيقة كاملة تفتيح", tmp: 97 },
      { l: "الصبّة 1", add: 90, total: 150, t: "1:00", w: "45 ثانية", n: "", tmp: 97 },
      { l: "الصبّة 2", add: 90, total: 240, t: "1:45", w: "تصفية ~1 دقيقة", n: "", tmp: 97 },
      { l: "التبريد", add: 0, total: 240, t: "~2:45", w: "", n: "حرّك 60g ثلج بالقهوة لين 5-15\u00B0C. قدّم على ثلج جديد.", tmp: null }
    ]
  },
  {
    id: 11,
    ex: "Jonathan Gagn\u00E9",
    m: "V60 Recipe",
    mA: "وصفة V60",
    type: "hot",
    dose: 22, water: 374, ice: 0,
    ratio: "1:17", rn: 17,
    temp: 100, tn: '100\u00B0C (غليان)',
    ode: "4-5", oMin: 4, oMax: 5,
    time: "~4:03", ts: 243,
    agit: "دوران بعد كل صبّة",
    st: "موثّقة", diff: "متوسط", pop: 3,
    fl: { sw: 3, ac: 3, bd: 4, cl: 5 },
    bio: 'عالم فيزياء فلكية. مؤلف \"The Physics of Filter Coffee\". متأثر بـScott Rao.',
    bioLong: "Jonathan Gagn\u00E9 عالم فيزياء فلكية كندي حوّل شغفه بالقهوة لعلم. كتابه The Physics of Filter Coffee يعتبر أعمق مرجع علمي في فيزياء تحضير القهوة. متأثر بـScott Rao ويستخدم نسبة 1:17 مع ماء مغلي. يؤمن إن البيانات والقياس أهم من الحدس.",
    videoUrl: "https://www.youtube.com/watch?v=LifhYeFBOk8",
    bestFor: ["محبّي الدقة العلمية", "بن فاتح جداً", "كوب كبير"],
    bestBeans: ["Ethiopian washed", "Kenyan", "Panama Geisha"],
    tags: ["gagne", "science", "physics", "precision", "متوسط", "علمي", "دقة"],
    theory: "Jonathan يعتمد على العلم: ماء مغلي (100°C) يعطي أعلى طاقة حرارية للاستخلاص. نسبة 1:17 تعطي تركيز مثالي حسب معايير SCA. التفتيح بـ3.5x وزن البن يضمن تبلل كامل. كل قرار مبني على بيانات وقياسات — مو تجربة وخطأ.",
    steps: [
      { l: "التفتيح", add: 77, total: 77, t: "0:00", w: "~40 ثانية", n: "3.5x الجرعة", tmp: 100 },
      { l: "الصبّة 1", add: 123, total: 200, t: "~0:40", w: "لين ينزل أغلبه", n: "دوران", tmp: 100 },
      { l: "الصبّة 2", add: 174, total: 374, t: "~1:40", w: "تصفية ~2:20", n: "دوران", tmp: 100 }
    ]
  },
  {
    id: 12,
    ex: "Tim Wendelboe",
    m: "Staged Pour",
    mA: "الصبّ المرحلي",
    type: "hot",
    dose: 32.5, water: 500, ice: 0,
    ratio: "1:15.4", rn: 15.4,
    temp: 98, tn: '~98\u00B0C (تقدير المجتمع)',
    ode: "3.5-5", oMin: 3.5, oMax: 5,
    time: "~3:15", ts: 195,
    agit: "تحريك بالتفتيح",
    st: "جزئية", diff: "مبتدئ", pop: 3,
    fl: { sw: 4, ac: 3, bd: 4, cl: 3 },
    bio: "بطل العالم باريستا 2004. محمصة ومقهى في أوسلو.",
    bioLong: "Tim Wendelboe بطل العالم باريستا 2004 من النرويج. يملك محمصة ومقهى في أوسلو تعتبر من أفضل المقاهي في العالم. أسلوبه بسيط ومباشر — يركّز على جودة البن أكثر من تعقيد الطريقة. وصفته سهلة وتناسب الكميات الكبيرة.",
    videoUrl: "https://www.youtube.com/watch?v=7HIGdYy5of4",
    bestFor: ["كمية كبيرة", "استضافة", "بن متوسط التحميص"],
    bestBeans: ["Colombian", "Ethiopian", "Guatemalan"],
    tags: ["tim", "wendelboe", "staged", "large", "مبتدئ", "كمية"],
    theory: "Tim يؤمن بالبساطة — 3 صبّات فقط. التفتيح مع تحريك بالملعقة يضمن تبلل كامل. الصبّة الثانية الكبيرة (300g) تعطي غمر عالي يسوّي استخلاص متساوي. الطريقة مصمّمة للكميات الكبيرة (500g ماء) وتشتغل مع أغلب أنواع البن.",
    steps: [
      { l: "التفتيح", add: 60, total: 60, t: "0:00", w: "30 ثانية", n: "حرّك بالملعقة", tmp: 98 },
      { l: "الصبّة 1", add: 140, total: 200, t: "0:30", w: "لين ينزل أغلبه", n: "", tmp: 98 },
      { l: "الصبّة 2", add: 300, total: 500, t: "~1:15", w: "تصفية ~2:00", n: "صبّ دائري مستمر", tmp: 98 }
    ]
  },
  {
    id: 13,
    ex: "Ben Put",
    m: "Monogram Coffee V60",
    mA: "وصفة Monogram Coffee",
    type: "hot",
    dose: 21, water: 340, ice: 0,
    ratio: "1:16", rn: 16,
    temp: 93, tn: '93\u00B0C (200\u00B0F)',
    ode: "4.5-5.5", oMin: 4.5, oMax: 5.5,
    time: "~2:45", ts: 165,
    agit: "",
    st: "موثّقة", diff: "مبتدئ", pop: 3,
    fl: { sw: 4, ac: 3, bd: 3, cl: 4 },
    bio: "بطل كندا باريستا 7 مرات. مؤسس Monogram Coffee.",
    bioLong: "Ben Put بطل كندا باريستا 7 مرات ومؤسس Monogram Coffee في كالجاري. وصفته بسيطة ومتوازنة — 3 صبّات بنسبة 1:16 اللي تعتبر المعيار الذهبي حسب SCA. مناسبة جداً للمبتدئين اللي يبون نتيجة ممتازة بدون تعقيد.",
    videoUrl: "https://www.youtube.com/watch?v=wQwzWk3sFBI",
    bestFor: ["المعيار الذهبي", "كوب متوازن", "مبتدئين"],
    bestBeans: ["Colombian", "Ethiopian washed", "Costa Rican"],
    tags: ["ben", "put", "monogram", "balanced", "standard", "مبتدئ", "متوازن"],
    theory: "Ben Put يعتمد نسبة 1:16 اللي تعتبر المعيار الذهبي لـSCA — أفضل توازن بين القوة والاستخلاص. 93°C حرارة آمنة لأغلب أنواع البن. 3 صبّات بسيطة بدون تعقيد. الفلسفة: خلّ البن يتكلم — لا تبالغ بالتقنية.",
    steps: [
      { l: "التفتيح", add: 50, total: 50, t: "0:00", w: "30 ثانية", n: "", tmp: 93 },
      { l: "الصبّة 1", add: 200, total: 250, t: "0:30", w: "لين ينزل أغلبه", n: "", tmp: 93 },
      { l: "الصبّة 2", add: 90, total: 340, t: "~1:15", w: "تصفية ~1:15-1:45", n: "", tmp: 93 }
    ]
  }
];

// ─── LEARN TIPS ──────────────────────────────────────────────────────────────
const TIPS = [
  "ما تشطف الفلتر — الشطف يزيل طعم الورق ويسخّن الأداة",
  "تستخدم بن مطحون جاهز — اطحن طازج دايم، الفرق واضح جدا",
  "ما تستخدم ميزان — بدون ميزان مستحيل تضبط النتيجة",
  "حرارة الماء منخفضة — لازم 90\u00B0C على الأقل للقهوة الفاتحة",
  "تصبّ على الجوانب — خلّ الماء على البن مو الفلتر",
  "بن قديم — استخدم بن 7-30 يوم من التحميص",
  "تتجاهل وقت التحضير — الوقت مؤشر مهم على صحة الاستخلاص",
  "ما تسوي تفتيح — التفتيح يطلع الغاز ويسوّي استخلاص متساوي",
  "تحريك زيادة — التحريك الزيادة يسبب استخلاص زايد ومرارة",
  "حجم الفلتر غلط — 01 لكوب واحد، 02 لـ1-4 أكواب"
];

// ─── GRINDER CROSS-REFERENCE ─────────────────────────────────────────────────
const GRINDER_REF = [
  { method: "Espresso", ode2: "1-2", comandante: "5-12", zpresso: "48-60", timemore: "10-14" },
  { method: "Moka Pot", ode2: "2-3", comandante: "12-18", zpresso: "60-72", timemore: "14-18" },
  { method: "AeroPress", ode2: "3-4", comandante: "18-24", zpresso: "72-84", timemore: "18-22" },
  { method: "V60 (fine)", ode2: "3.5-4.5", comandante: "20-24", zpresso: "78-84", timemore: "20-24" },
  { method: "V60 (medium)", ode2: "4.5-5.5", comandante: "24-28", zpresso: "84-90", timemore: "24-26" },
  { method: "V60 (coarse)", ode2: "5.5-6.5", comandante: "28-32", zpresso: "90-96", timemore: "26-28" },
  { method: "Chemex", ode2: "5-6", comandante: "26-30", zpresso: "88-94", timemore: "25-28" },
  { method: "French Press", ode2: "7-9", comandante: "30-36", zpresso: "96-108", timemore: "28-32" },
  { method: "Cold Brew", ode2: "8-11", comandante: "32-40", zpresso: "100-116", timemore: "30-36" }
];

// ─── BADGES ──────────────────────────────────────────────────────────────────
const BADGE_DEFS = [
  { id: 'first', icon: '\u2615', title: 'أول تحضير', desc: 'حضّرت أول كوب V60', check: log => log.length >= 1 },
  { id: 'ten', icon: '\u{1F3C5}', title: '10 تحضيرات', desc: 'حضّرت 10 أكواب', check: log => log.length >= 10 },
  { id: 'fifty', icon: '\u{1F3C6}', title: '50 تحضير', desc: 'حضّرت 50 كوب — محترف!', check: log => log.length >= 50 },
  { id: 'hundred', icon: '\u{1F451}', title: '100 تحضير', desc: 'حضّرت 100 كوب — أسطورة!', check: log => log.length >= 100 },
  { id: 'allRecipes', icon: '\u{1F30D}', title: 'كل الوصفات', desc: 'جرّبت كل 13 وصفة', check: log => { const ids = new Set(log.map(e => e.recipeId)); return ids.size >= 13; } },
  { id: 'icedExp', icon: '\u2744\uFE0F', title: 'مستكشف المثلّج', desc: 'جرّبت كل الوصفات المثلّجة', check: log => { const icedIds = D.filter(r => r.type === 'iced').map(r => r.id); const done = new Set(log.map(e => e.recipeId)); return icedIds.every(id => done.has(id)); } },
  { id: 'fiveStar', icon: '\u2B50', title: 'خمس نجوم', desc: 'حصلت على تقييم 5 نجوم', check: log => log.some(e => e.rating === 5) },
  { id: 'streak7', icon: '\u{1F525}', title: 'أسبوع متواصل', desc: 'حضّرت 7 أيام متواصلة', check: log => {
    if (log.length < 7) return false;
    const dates = [...new Set(log.map(e => e.date ? e.date.split(' ')[0] : ''))].sort();
    let streak = 1, maxStreak = 1;
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]), cur = new Date(dates[i]);
      const diff = (cur - prev) / 86400000;
      if (diff === 1) { streak++; maxStreak = Math.max(maxStreak, streak); }
      else if (diff > 1) streak = 1;
    }
    return maxStreak >= 7;
  }},
  { id: 'earlyBird', icon: '\u{1F426}', title: 'الطائر المبكّر', desc: 'حضّرت قبل 7 الصبح', check: log => log.some(e => { if (!e.date) return false; const h = parseInt(e.date.split(' ')[1]); return h < 7; }) }
];

// ═══════════════════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════
document.querySelectorAll('.nb').forEach(b => b.onclick = () => {
  showS(b.dataset.s);
  if (b.dataset.s === 'mybrews') renderMyBrews();
  if (b.dataset.s === 'learn') renderLearn();
  if (b.dataset.s === 'fix') renderFix();
  if (b.dataset.s === 'tools') renderTools();
});

function showS(id) {
  curS = id;
  document.querySelectorAll('.scr').forEach(s => s.classList.toggle('on', s.id === id));
  document.querySelectorAll('.nb').forEach(b => b.classList.toggle('on', b.dataset.s === id));
  if (id !== 'detail') scrollTo(0, 0);
}

// ═══════════════════════════════════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════════════════════════════════
function initTheme() {
  const saved = localStorage.getItem('v60t');
  if (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.dataset.theme = 'dark';
    if ($('thB')) $('thB').innerHTML = '\u2600';
  }
}
initTheme();

if ($('thB')) {
  $('thB').onclick = () => {
    const d = document.body.dataset.theme === 'dark' ? '' : 'dark';
    document.body.dataset.theme = d;
    localStorage.setItem('v60t', d);
    $('thB').innerHTML = d ? '\u2600' : '\u263D';
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// SEARCH
// ═══════════════════════════════════════════════════════════════════════════
function initSearch() {
  const inp = $('searchInput'), clr = $('searchClear');
  if (!inp) return;
  inp.oninput = debounce(() => {
    searchQuery = inp.value.trim().toLowerCase();
    if (clr) clr.style.display = searchQuery ? 'block' : 'none';
    render();
  }, 200);
  if (clr) clr.onclick = () => { inp.value = ''; searchQuery = ''; clr.style.display = 'none'; render(); };
}
initSearch();

function matchesSearch(r, q) {
  if (!q) return true;
  const fields = [r.ex, r.m, r.mA, r.ratio, r.diff, ...(r.tags || [])].join(' ').toLowerCase();
  return fields.includes(q);
}

function highlightText(text, q) {
  if (!q || !text) return text;
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return text;
  return text.slice(0, idx) + '<mark style="background:var(--a4);padding:0 2px;border-radius:2px">' + text.slice(idx, idx + q.length) + '</mark>' + text.slice(idx + q.length);
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME — FILTERS & RENDERING
// ═══════════════════════════════════════════════════════════════════════════
// Filter chips
document.querySelectorAll('#tF .ch').forEach(c => c.onclick = () => {
  document.querySelectorAll('#tF .ch').forEach(x => x.classList.remove('on'));
  c.classList.add('on');
  aT = c.dataset.v;
  render();
});

// Dropdowns
if ($('fE')) $('fE').onchange = render;
if ($('fR')) $('fR').onchange = render;
if ($('fS')) $('fS').onchange = render;

// Populate expert dropdown
const exps = [...new Set(D.map(r => r.ex))];
exps.forEach(e => {
  const o = document.createElement('option');
  o.value = e; o.textContent = e;
  if ($('fE')) $('fE').appendChild(o);
});

// Helpers
function cups(r) { return Math.round((r.water + (r.ice || 0)) * 0.94 / 120 * 10) / 10; }
function yieldML(r) { return Math.round((r.water + (r.ice || 0)) * 0.94); }
function starsHTML(p) { return '\u2605'.repeat(p) + '\u2606'.repeat(5 - p); }

function getF() {
  let res = D.filter(r => {
    if (aT === 'hot' && r.type !== 'hot') return false;
    if (aT === 'iced' && r.type !== 'iced') return false;
    if (aT === 'beg' && r.diff !== 'مبتدئ') return false;
    if (aT === 'adv' && r.diff === 'مبتدئ') return false;
    if (aT === 'top' && r.pop < 4) return false;
    const ex = $('fE') ? $('fE').value : '';
    if (ex && r.ex !== ex) return false;
    const rat = $('fR') ? $('fR').value : '';
    if (rat && Math.round(r.rn) !== +rat) return false;
    if (searchQuery && !matchesSearch(r, searchQuery)) return false;
    return true;
  });
  const s = $('fS') ? $('fS').value : 'pop';
  if (s === 'fast') res.sort((a, b) => (a.ts || 9e3) - (b.ts || 9e3));
  else if (s === 'easy') res.sort((a, b) => ({ 'مبتدئ': 0, 'متوسط': 1, 'متقدم': 2 }[a.diff] || 1) - ({ 'مبتدئ': 0, 'متوسط': 1, 'متقدم': 2 }[b.diff] || 1));
  else if (s === 'strong') res.sort((a, b) => a.rn - b.rn);
  else res.sort((a, b) => b.pop - a.pop);
  return res;
}

// Flavor bar mini
function flB(v, mx, c) {
  return '<div class="fl-m"><div class="fl-m-bar"><div class="fl-m-fill" style="width:' + (v / mx * 100) + '%;background:' + c + '"></div></div></div>';
}

// Mini timeline
function mtl(r) {
  const ps = r.steps.filter(s => s.add > 0);
  if (!ps.length) return '';
  let h = '<div class="mtl">';
  ps.forEach((s, i) => {
    if (i) h += '<div class="mt-l"></div>';
    h += '<div class="mt-s"><span class="mt-w">' + s.total + 'g</span><div class="mt-d"></div><span class="mt-t">' + s.t + '</span></div>';
  });
  return h + '</div>';
}

// Card HTML
function cardH(r, idx) {
  const f = r.fl, pc = r.steps.filter(s => s.add > 0).length, iF = favs.includes(r.id);
  const ym = yieldML(r), yc = cups(r);
  const delay = (idx || 0) * 50;
  const exName = searchQuery ? highlightText(r.ex, searchQuery) : r.ex;
  return '<div class="cd ' + (r.type === 'iced' ? 'ic' : 'ht') + '" data-id="' + r.id + '" style="animation-delay:' + delay + 'ms">' +
    '<div class="cd-r1"><div><div class="cd-name"><span class="en">' + exName + '</span></div><div class="cd-meth">' + r.mA + '</div></div>' +
    '<div class="bgs"><span class="bg ' + (r.type === 'iced' ? 'b-iced' : 'b-hot') + '">' + (r.type === 'iced' ? 'مثلّج' : 'حار') + '</span>' +
    '<span class="bg" style="background:var(--bg2);color:var(--t2)">' + r.diff + '</span></div></div>' +
    '<div class="rating"><span class="stars">' + starsHTML(r.pop) + '</span><span class="rating-txt">شعبية المجتمع</span></div>' +
    '<div class="fl-mini">' +
    flB(f.sw, 5, '#e74c3c') + '<span class="fl-m-l">حلاوة</span>' +
    flB(f.ac, 5, '#f1c40f') + '<span class="fl-m-l">حموضة</span>' +
    flB(f.bd, 5, '#8b4513') + '<span class="fl-m-l">قوام</span>' +
    flB(f.cl, 5, '#3498db') + '<span class="fl-m-l">صفاء</span></div>' +
    '<div class="cd-stats">' +
    '<div class="cs"><b><span class="en">' + r.dose + 'g</span></b><span>البن</span></div>' +
    '<div class="cs"><b><span class="en">' + r.ratio + '</span></b><span>النسبة</span></div>' +
    '<div class="cs"><b><span class="en">' + (r.temp || '\u2014') + '\u00B0</span></b><span>الحرارة</span></div>' +
    '<div class="cs"><b><span class="en">' + r.time + '</span></b><span>الوقت</span></div></div>' +
    '<div class="yield"><div class="yield-cup">\u2615</div>' +
    '<div class="yield-info"><b><span class="en">~' + ym + 'ml</span> \u2248 ' + (yc >= 2 ? Math.round(yc) : yc) + ' كوب</b>' +
    '<span><span class="en">' + r.dose + 'g</span> بن \u2192 <span class="en">' + r.water + 'g</span> ماء' + (r.ice ? ' + <span class="en">' + r.ice + 'g</span> ثلج' : '') + ' \u2192 <span class="en">' + ym + 'ml</span> قهوة</span></div></div>' +
    mtl(r) +
    '<div class="cd-bot"><span class="cd-meta"><span class="en">' + pc + '</span> صبّة \u00B7 <span class="en">Ode ' + r.ode + '</span></span>' +
    '<div class="cd-acts"><button class="fb ' + (iF ? 'on' : '') + '" onclick="event.stopPropagation();tFav(' + r.id + ')">' + (iF ? '\u2764' : '\u2661') + '</button>' +
    '<button class="bb" onclick="event.stopPropagation();startB(' + r.id + ')">\u2615 حضّر</button></div></div></div>';
}

function render() {
  const f = getF();
  const g = $('grid');
  if (!g) return;
  if ($('rc')) $('rc').textContent = f.length + ' وصفة';
  if (!f.length) {
    g.innerHTML = '<div class="empty"><b>\u2615</b><h3>ما لقينا وصفات</h3><p>عدّل الفلاتر</p></div>';
    return;
  }
  g.innerHTML = f.map((r, i) => cardH(r, i)).join('');
  g.querySelectorAll('.cd').forEach(c => c.onclick = () => openD(+c.dataset.id));

  // Animate stats on first load
  if (!statsAnimated) {
    statsAnimated = true;
    document.querySelectorAll('.st b').forEach(el => {
      const target = parseInt(el.textContent);
      if (isNaN(target)) return;
      let cur = 0;
      const step = Math.max(1, Math.floor(target / 15));
      el.textContent = '0';
      const iv = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(iv);
      }, 40);
    });
  }
}

// FAVORITES
function tFav(id) {
  if (favs.includes(id)) favs = favs.filter(x => x !== id);
  else favs.push(id);
  safeSave('v60f', favs);
  render();
  if (curS === 'mybrews') renderMyBrews();
  if (curS === 'detail') {
    const btn = document.querySelector('#detail .fb');
    if (btn) { btn.classList.toggle('on'); btn.innerHTML = favs.includes(id) ? '\u2764' : '\u2661'; }
  }
}
window.tFav = tFav;

// ═══════════════════════════════════════════════════════════════════════════
// DETAIL VIEW
// ═══════════════════════════════════════════════════════════════════════════
function openD(id) {
  const r = D.find(x => x.id === id);
  if (!r) return;
  curRecipeId = id;
  curCups = 1;
  curScale = 1;
  showS('detail');
  renderDetail(r, 1);
  scrollTo(0, 0);
}
window.openD = openD;

function renderDetail(r, scale) {
  const d = $('detail');
  if (!d) return;
  const iF = favs.includes(r.id);
  const ym = yieldML(r), yc = cups(r);
  const sD = (v) => +(v * scale).toFixed(1);
  const notes = safeJSON('v60notes', {});
  const myNote = notes[r.id] || '';

  // Find similar recipes (same flavor profile +/- 1)
  const similar = D.filter(x => x.id !== r.id && Math.abs(x.fl.sw - r.fl.sw) + Math.abs(x.fl.ac - r.fl.ac) + Math.abs(x.fl.bd - r.fl.bd) + Math.abs(x.fl.cl - r.fl.cl) <= 4).slice(0, 3);

  d.innerHTML =
    '<div class="dh">' +
    '<button class="dh-back" onclick="showS(\'home\');render()">\u2190 رجوع</button>' +
    '<h2><span class="en">' + r.ex + '</span></h2>' +
    '<div class="dh-sub">' + r.mA + ' \u2022 <span class="en">' + r.m + '</span></div>' +
    '<div class="dh-badges">' +
    '<span class="bg ' + (r.type === 'iced' ? 'b-iced' : 'b-hot') + '">' + (r.type === 'iced' ? 'مثلّج' : 'حار') + '</span>' +
    '<span class="bg b-ok">' + r.st + '</span>' +
    '<span class="bg" style="background:var(--warnBg);color:var(--warn)">' + r.diff + '</span>' +
    '</div></div>' +
    '<div class="db">' +

    // Bio
    '<div class="bio">' + (r.bioLong || r.bio) + '</div>' +

    // Video link
    (r.videoUrl ? '<a href="' + r.videoUrl + '" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:var(--card);border:1.5px solid var(--border);border-radius:var(--r);margin:12px 0;font-size:13px;font-weight:700;color:var(--hot)">\u25B6 شاهد الفيديو على يوتيوب</a>' : '') +

    // Cup selector
    '<div class="sc"><h3>\u2615 عدد الأكواب</h3>' +
    '<div class="cup-sel">' +
    '<button class="cup-btn ' + (curCups === 1 ? 'on' : '') + '" onclick="setCups(' + r.id + ',1)">1 كوب</button>' +
    '<button class="cup-btn ' + (curCups === 2 ? 'on' : '') + '" onclick="setCups(' + r.id + ',2)">2 كوب</button>' +
    '<button class="cup-btn ' + (curCups === 3 ? 'on' : '') + '" onclick="setCups(' + r.id + ',3)">3 أكواب</button>' +
    '<input class="cup-custom" type="number" min="0.5" max="5" step="0.5" value="" placeholder="..." oninput="setCustomCups(' + r.id + ',this.value)">' +
    '</div></div>' +

    // What you get
    '<div class="wyg"><h3>\u2615 اللي بتحصل عليه</h3><div class="wyg-grid">' +
    '<div class="wyg-i"><b class="en" id="dd-dose">' + sD(r.dose) + 'g</b><span>بن</span></div>' +
    '<div class="wyg-i"><b class="en" id="dd-water">' + sD(r.water) + 'g</b><span>ماء</span></div>' +
    (r.ice ? '<div class="wyg-i"><b class="en" id="dd-ice">' + sD(r.ice) + 'g</b><span>ثلج</span></div>' : '<div class="wyg-i"><b class="en">~' + Math.round(ym * scale) + 'ml</b><span>ناتج</span></div>') +
    '</div></div>' +

    // Dose calculator
    '<div class="calc"><h3>\u{1F522} حاسبة الجرعة</h3>' +
    '<div class="calc-r"><input class="calc-in" type="number" id="calcDose" value="' + sD(r.dose) + '" oninput="calcFromDose(' + r.id + ')"><span class="calc-lab">g بن</span>' +
    '<span class="calc-lab">\u00D7</span>' +
    '<span class="calc-lab en">1:' + r.rn + '</span>' +
    '<span class="calc-lab">=</span>' +
    '<span class="calc-lab en" id="calcWater">' + sD(r.water) + 'g ماء</span></div></div>' +

    // Info grid
    '<div class="sc"><h3>\u{1F4CA} المعلومات</h3><div class="ig">' +
    '<div class="ig-i"><span class="ig-l">النسبة</span><span class="ig-v en">' + r.ratio + '</span></div>' +
    '<div class="ig-i"><span class="ig-l">الحرارة</span><span class="ig-v en">' + (r.temp || '\u2014') + '\u00B0C</span></div>' +
    '<div class="ig-i"><span class="ig-l">الوقت</span><span class="ig-v en">' + r.time + '</span></div>' +
    '<div class="ig-i"><span class="ig-l">التحريك</span><span class="ig-v">' + (r.agit || 'بدون') + '</span></div>' +
    '<div class="ig-i"><span class="ig-l">Ode Gen 2</span><span class="ig-v en">' + r.ode + '</span></div>' +
    '<div class="ig-i"><span class="ig-l">الصعوبة</span><span class="ig-v">' + r.diff + '</span></div>' +
    '</div></div>' +

    // Flavor bars
    '<div class="sc"><h3>\u{1F3A8} ملف النكهة</h3>' +
    flRow('حلاوة', r.fl.sw, '#e74c3c') +
    flRow('حموضة', r.fl.ac, '#f1c40f') +
    flRow('قوام', r.fl.bd, '#8b4513') +
    flRow('صفاء', r.fl.cl, '#3498db') +
    '</div>' +

    // Theory
    (r.theory ? '<div class="sc"><h3>\u{1F4A1} ليش هالطريقة تشتغل؟</h3><p style="font-size:12px;font-family:Tajawal;line-height:1.8;color:var(--t2)">' + r.theory + '</p></div>' : '') +

    // Best beans
    (r.bestBeans && r.bestBeans.length ? '<div class="sc"><h3>\u{1FAD8} أفضل أنواع البن</h3><div style="display:flex;gap:6px;flex-wrap:wrap">' + r.bestBeans.map(b => '<span class="ch" style="cursor:default">' + b + '</span>').join('') + '</div></div>' : '') +

    // Best for
    (r.bestFor && r.bestFor.length ? '<div class="sc"><h3>\u{1F3AF} مناسبة لـ</h3><div style="display:flex;gap:6px;flex-wrap:wrap">' + r.bestFor.map(b => '<span style="padding:5px 10px;background:var(--okBg);color:var(--ok);border-radius:12px;font-size:11px;font-weight:700;font-family:Tajawal">' + b + '</span>').join('') + '</div></div>' : '') +

    // Steps
    '<div class="sc"><h3>\u{1F4DD} الخطوات</h3>' +
    r.steps.map(s =>
      '<div class="stp">' +
      '<div class="s-t">' + s.t + '</div>' +
      '<div class="s-sc"><div class="s-sv">' + (s.add > 0 ? sD(s.total) + 'g' : '\u2014') + '</div>' +
      (s.add > 0 ? '<div class="s-add">+' + sD(s.add) + 'g</div>' : '') + '</div>' +
      '<div class="s-bd"><div class="s-lb">' + s.l + (s.tmp != null ? ' <small class="en">' + s.tmp + '\u00B0C</small>' : '') + '</div>' +
      '<div class="s-ds">' + (s.n || '') + '</div>' +
      (s.w ? '<div class="s-wt">\u23F1 ' + s.w + '</div>' : '') + '</div></div>'
    ).join('') +
    '</div>' +

    // Notes
    '<div class="sc"><h3>\u{1F4DD} ملاحظاتي</h3>' +
    '<textarea class="notes-area" id="detailNotes" placeholder="سجّل ملاحظاتك هنا...">' + myNote + '</textarea>' +
    '<div class="notes-saved" id="notesSaved">تم الحفظ</div></div>' +

    // Similar recipes
    (similar.length ? '<div class="sc"><h3>\u{1F504} وصفات مشابهة</h3><div class="cg">' + similar.map(s => '<div class="cd ' + (s.type === 'iced' ? 'ic' : 'ht') + '" style="padding:12px;cursor:pointer" onclick="openD(' + s.id + ')"><div class="cd-name" style="font-size:14px"><span class="en">' + s.ex + '</span></div><div class="cd-meth">' + s.mA + '</div></div>').join('') + '</div></div>' : '') +

    // Actions
    '<button class="bcta" onclick="startB(' + r.id + ')">\u2615 ابدأ التحضير</button>' +
    '<div style="display:flex;gap:8px;margin-bottom:20px">' +
    '<button class="fb ' + (iF ? 'on' : '') + '" style="width:44px;height:44px;font-size:18px" onclick="tFav(' + r.id + ')">' + (iF ? '\u2764' : '\u2661') + '</button>' +
    '<button class="bb" style="flex:1;justify-content:center;padding:12px" onclick="openShare(' + r.id + ')">\u{1F4E4} مشاركة</button>' +
    '<button class="bb" style="flex:1;justify-content:center;padding:12px;background:var(--bg2);color:var(--t1);border:1.5px solid var(--border)" onclick="openCompare(' + r.id + ')">\u{1F504} مقارنة</button>' +
    '</div></div>';

  // Notes auto-save
  const notesEl = $('detailNotes');
  if (notesEl) {
    notesEl.oninput = debounce(() => {
      const all = safeJSON('v60notes', {});
      all[r.id] = notesEl.value;
      safeSave('v60notes', all);
      const saved = $('notesSaved');
      if (saved) { saved.classList.add('show'); setTimeout(() => saved.classList.remove('show'), 1500); }
    }, 600);
  }

  // Animate flavor bars on scroll
  observeFlavorBars();
}

function flRow(label, val, color) {
  return '<div class="fl-row"><span class="fl-lbl">' + label + '</span><div class="fl-tr"><div class="fl-f" data-val="' + (val * 20) + '" style="width:0;background:' + color + '"></div></div><span class="fl-v">' + val + '</span></div>';
}

function observeFlavorBars() {
  try {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('.fl-f').forEach(bar => {
            bar.style.width = bar.dataset.val + '%';
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.fl-row').forEach(r => obs.observe(r));
  } catch (e) {}
}

// Cup scaling — targeted DOM updates only
function setCups(id, n) {
  const r = D.find(x => x.id === id);
  if (!r) return;
  curCups = n;
  curScale = n;
  updateScaledValues(r, n);
  document.querySelectorAll('.cup-btn').forEach(b => b.classList.remove('on'));
  const btns = document.querySelectorAll('.cup-btn');
  if (n === 1 && btns[0]) btns[0].classList.add('on');
  if (n === 2 && btns[1]) btns[1].classList.add('on');
  if (n === 3 && btns[2]) btns[2].classList.add('on');
}
window.setCups = setCups;

function setCustomCups(id, v) {
  const n = parseFloat(v);
  if (!n || n <= 0) return;
  const r = D.find(x => x.id === id);
  if (!r) return;
  curCups = n;
  curScale = n;
  document.querySelectorAll('.cup-btn').forEach(b => b.classList.remove('on'));
  updateScaledValues(r, n);
}
window.setCustomCups = setCustomCups;

function updateScaledValues(r, scale) {
  const sD = v => +(v * scale).toFixed(1);
  const ddDose = $('dd-dose'), ddWater = $('dd-water'), ddIce = $('dd-ice');
  if (ddDose) ddDose.textContent = sD(r.dose) + 'g';
  if (ddWater) ddWater.textContent = sD(r.water) + 'g';
  if (ddIce) ddIce.textContent = sD(r.ice) + 'g';
  // Update step values
  document.querySelectorAll('.s-sv').forEach((el, i) => {
    const s = r.steps[i];
    if (s && s.add > 0) el.textContent = sD(s.total) + 'g';
  });
  document.querySelectorAll('.s-add').forEach((el, i) => {
    const s = r.steps.filter(st => st.add > 0)[i];
    if (s) el.textContent = '+' + sD(s.add) + 'g';
  });
  if ($('calcDose')) $('calcDose').value = sD(r.dose);
  if ($('calcWater')) $('calcWater').textContent = sD(r.water) + 'g ماء';
}

function calcFromDose(id) {
  const r = D.find(x => x.id === id);
  if (!r) return;
  const dose = parseFloat($('calcDose').value);
  if (!dose || dose <= 0) return;
  const water = +(dose * r.rn).toFixed(1);
  if ($('calcWater')) $('calcWater').textContent = water + 'g ماء';
}
window.calcFromDose = calcFromDose;

// ═══════════════════════════════════════════════════════════════════════════
// BREW TIMER
// ═══════════════════════════════════════════════════════════════════════════
let brewInterval = null, brewStartTime = null, brewElapsed = 0, brewPaused = false;
let brewStepIdx = 0, brewStepStart = 0, brewAutoAdvance = true;
let brewRecipe = null, brewScale2 = 1;

function startB(id) {
  const r = D.find(x => x.id === id);
  if (!r) return;

  // Check for resume
  const saved = sessionStorage.getItem('v60brew');
  if (saved) {
    try {
      const s = JSON.parse(saved);
      if (s.id === id && s.elapsed > 0) {
        if (confirm('عندك تحضير سابق لهالوصفة. تبي تكمل؟')) {
          brewElapsed = s.elapsed;
          brewStepIdx = s.stepIdx;
        } else {
          sessionStorage.removeItem('v60brew');
          brewElapsed = 0;
          brewStepIdx = 0;
        }
      } else {
        brewElapsed = 0;
        brewStepIdx = 0;
      }
    } catch (e) { brewElapsed = 0; brewStepIdx = 0; }
  } else {
    brewElapsed = 0;
    brewStepIdx = 0;
  }

  brewRecipe = r;
  brewScale2 = curScale;
  brewPaused = false;
  brewRecipeForLog = r;
  brewStepStart = brewElapsed;

  const bw = $('brew');
  if (!bw) return;

  renderBrewUI(r);
  bw.classList.add('on');

  // Wake lock
  acquireWakeLock();

  // Start timer
  brewStartTime = Date.now() - brewElapsed * 1000;
  clearInterval(brewInterval);
  brewInterval = setInterval(tickBrew, 100);
}
window.startB = startB;

function renderBrewUI(r) {
  const bw = $('brew');
  const s = r.steps[brewStepIdx] || r.steps[r.steps.length - 1];
  const sD = v => +(v * brewScale2).toFixed(1);
  const totalWater = sD(r.water + (r.ice || 0));
  const currentPoured = sD(s.total);
  const pct = r.ts ? Math.min(100, Math.round(brewElapsed / r.ts * 100)) : 0;

  bw.innerHTML =
    '<div class="brew-top"><span class="brew-nm"><span class="en">' + r.ex + '</span> \u2022 ' + r.mA + '</span><button class="brew-x" onclick="closeBrew()">\u2715 إغلاق</button></div>' +
    '<div class="brew-c">' +
    // Progress bar
    '<div style="width:90%;height:4px;background:rgba(255,255,255,.1);border-radius:2px;margin-bottom:12px"><div id="brewProg" style="height:100%;background:var(--a3);border-radius:2px;transition:width .3s;width:' + pct + '%"></div></div>' +
    // Total elapsed
    '<div class="brew-tm" id="brewTime">0:00</div>' +
    // Step elapsed
    '<div style="font-size:14px;opacity:.4;font-family:Inter;direction:ltr;margin-top:4px" id="brewStepTime">step 0:00</div>' +
    // Step info
    '<div class="brew-sc">' +
    '<div class="brew-sv" id="brewStepVal">' + (s.add > 0 ? sD(s.total) + 'g' : '\u2014') + '</div>' +
    '<div class="brew-sl">' + (s.add > 0 ? 'الهدف' : '') + '</div>' +
    (s.add > 0 ? '<div class="brew-sa" id="brewStepAdd">+' + sD(s.add) + 'g</div>' : '') +
    '</div>' +
    '<div class="brew-sn" id="brewStepName">' + s.l + '</div>' +
    '<div class="brew-sd" id="brewStepDesc">' + (s.n || '') + '</div>' +
    (s.w ? '<div class="brew-sw" id="brewStepWait">\u23F1 ' + s.w + '</div>' : '') +
    (s.tmp != null ? '<div style="font-size:12px;color:var(--a4);margin-top:4px;font-family:Inter">' + s.tmp + '\u00B0C</div>' : '') +
    // Water poured tracker
    '<div style="font-size:12px;opacity:.5;margin-top:8px;font-family:Inter;direction:ltr" id="brewWaterTrack">' + currentPoured + 'g / ' + totalWater + 'g</div>' +
    // Dots
    '<div class="brew-dots" id="brewDots">' + r.steps.map((_, i) => '<div class="bd' + (i < brewStepIdx ? ' dn' : (i === brewStepIdx ? ' cr' : '')) + '"></div>').join('') + '</div>' +
    // Auto-advance toggle
    '<label style="font-size:11px;opacity:.5;display:flex;align-items:center;gap:6px;cursor:pointer;font-family:Tajawal"><input type="checkbox" id="brewAuto" ' + (brewAutoAdvance ? 'checked' : '') + ' onchange="brewAutoAdvance=this.checked"> تقدّم تلقائي</label>' +
    '</div>' +
    '<div class="brew-bot">' +
    '<button class="brew-btn bpause" id="brewPauseBtn" onclick="toggleBrewPause()">\u23F8 وقف</button>' +
    '<button class="brew-btn bnext" id="brewNextBtn" onclick="nextBrewStep()">' + (brewStepIdx < r.steps.length - 1 ? 'التالي \u2192' : '\u2705 خلاص!') + '</button>' +
    '</div>';
}

function tickBrew() {
  if (brewPaused || !brewRecipe) return;
  brewElapsed = (Date.now() - brewStartTime) / 1000;
  const mins = Math.floor(brewElapsed / 60);
  const secs = Math.floor(brewElapsed % 60);
  const tmEl = $('brewTime');
  if (tmEl) tmEl.textContent = mins + ':' + String(secs).padStart(2, '0');

  // Step time
  const stepTime = brewElapsed - brewStepStart;
  const stEl = $('brewStepTime');
  if (stEl) stEl.textContent = 'step ' + Math.floor(stepTime / 60) + ':' + String(Math.floor(stepTime % 60)).padStart(2, '0');

  // Progress bar
  const prog = $('brewProg');
  if (prog && brewRecipe.ts) prog.style.width = Math.min(100, brewElapsed / brewRecipe.ts * 100) + '%';

  // Save state for resume
  try { sessionStorage.setItem('v60brew', JSON.stringify({ id: brewRecipe.id, elapsed: brewElapsed, stepIdx: brewStepIdx })); } catch (e) {}

  // Auto-advance
  if (brewAutoAdvance && brewStepIdx < brewRecipe.steps.length - 1) {
    const nextStep = brewRecipe.steps[brewStepIdx + 1];
    if (nextStep && nextStep.t && nextStep.t !== '\u2014') {
      const parts = nextStep.t.replace('~', '').split(':');
      if (parts.length === 2) {
        const targetSec = parseInt(parts[0]) * 60 + parseInt(parts[1]);
        if (brewElapsed >= targetSec && brewElapsed < targetSec + 1) {
          nextBrewStep();
        }
      }
    }
  }
}

function toggleBrewPause() {
  brewPaused = !brewPaused;
  const btn = $('brewPauseBtn');
  if (btn) btn.textContent = brewPaused ? '\u25B6 كمّل' : '\u23F8 وقف';
  if (!brewPaused) brewStartTime = Date.now() - brewElapsed * 1000;
}
window.toggleBrewPause = toggleBrewPause;

function nextBrewStep() {
  if (!brewRecipe) return;
  if (brewStepIdx >= brewRecipe.steps.length - 1) {
    finishBrew();
    return;
  }
  brewStepIdx++;
  brewStepStart = brewElapsed;

  // Beep & vibrate
  beep(880, 0.12);
  try { navigator.vibrate && navigator.vibrate(200); } catch (e) {}

  // Update UI
  const r = brewRecipe;
  const s = r.steps[brewStepIdx];
  const sD = v => +(v * brewScale2).toFixed(1);

  const sv = $('brewStepVal');
  if (sv) sv.textContent = s.add > 0 ? sD(s.total) + 'g' : '\u2014';
  const sa = $('brewStepAdd');
  if (sa) sa.textContent = s.add > 0 ? '+' + sD(s.add) + 'g' : '';
  const sn = $('brewStepName');
  if (sn) sn.textContent = s.l;
  const sd = $('brewStepDesc');
  if (sd) sd.textContent = s.n || '';
  const sw = $('brewStepWait');
  if (sw) sw.textContent = s.w ? '\u23F1 ' + s.w : '';

  // Water tracker
  const wt = $('brewWaterTrack');
  if (wt) wt.textContent = sD(s.total) + 'g / ' + sD(r.water + (r.ice || 0)) + 'g';

  // Dots
  const dots = document.querySelectorAll('#brewDots .bd');
  dots.forEach((d, i) => { d.className = 'bd' + (i < brewStepIdx ? ' dn' : (i === brewStepIdx ? ' cr' : '')); });

  // Next button text
  const nb = $('brewNextBtn');
  if (nb) nb.textContent = brewStepIdx < r.steps.length - 1 ? 'التالي \u2192' : '\u2705 خلاص!';
}
window.nextBrewStep = nextBrewStep;

function finishBrew() {
  clearInterval(brewInterval);
  brewInterval = null;
  sessionStorage.removeItem('v60brew');
  releaseWakeLock();
  doubleBeep();
  try { navigator.vibrate && navigator.vibrate([200, 100, 200]); } catch (e) {}

  // Close brew screen
  const bw = $('brew');
  if (bw) bw.classList.remove('on');

  // Show rating dialog
  brewRating = 0;
  const bd = $('brewDone');
  if (bd) {
    bd.classList.add('on');
    renderRateStars();
  }
}

function closeBrew() {
  // Save state for resume
  if (brewRecipe && brewElapsed > 5) {
    try { sessionStorage.setItem('v60brew', JSON.stringify({ id: brewRecipe.id, elapsed: brewElapsed, stepIdx: brewStepIdx })); } catch (e) {}
    toast('يمكنك استكمال التحضير لاحقاً', 'info');
  }
  clearInterval(brewInterval);
  brewInterval = null;
  releaseWakeLock();
  const bw = $('brew');
  if (bw) bw.classList.remove('on');
}
window.closeBrew = closeBrew;

// Wake Lock
async function acquireWakeLock() {
  try { if ('wakeLock' in navigator) wakeLockObj = await navigator.wakeLock.request('screen'); } catch (e) {}
}
function releaseWakeLock() {
  try { if (wakeLockObj) { wakeLockObj.release(); wakeLockObj = null; } } catch (e) {}
}

// ═══════════════════════════════════════════════════════════════════════════
// BREW DONE RATING
// ═══════════════════════════════════════════════════════════════════════════
function renderRateStars() {
  const rs = $('rateStars');
  if (!rs) return;
  rs.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const s = document.createElement('span');
    s.className = 'rate-star' + (i <= brewRating ? ' on' : '');
    s.textContent = '\u2605';
    s.onclick = () => { brewRating = i; renderRateStars(); };
    rs.appendChild(s);
  }
}

if ($('brewSaveBtn')) {
  $('brewSaveBtn').onclick = () => {
    const note = $('brewNote') ? $('brewNote').value : '';
    const grind = $('brewGrind') ? $('brewGrind').value : '';
    const now = new Date();
    const dateStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0') + ' ' + String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

    const entry = {
      recipeId: brewRecipeForLog ? brewRecipeForLog.id : null,
      recipeName: brewRecipeForLog ? brewRecipeForLog.ex + ' - ' + brewRecipeForLog.mA : 'Unknown',
      dose: brewRecipeForLog ? +(brewRecipeForLog.dose * brewScale2).toFixed(1) : 0,
      rating: brewRating,
      note: note,
      grind: grind,
      brewTime: Math.round(brewElapsed),
      temp: brewRecipeForLog ? brewRecipeForLog.temp : 0,
      date: dateStr
    };
    brewLog.push(entry);
    safeSave('v60log', brewLog);
    closeDone();
    toast('تم الحفظ!', 'ok');
  };
}

if ($('brewSkipBtn')) {
  $('brewSkipBtn').onclick = () => closeDone();
}

function closeDone() {
  const bd = $('brewDone');
  if (bd) bd.classList.remove('on');
  if ($('brewNote')) $('brewNote').value = '';
  brewRating = 0;
}

// ═══════════════════════════════════════════════════════════════════════════
// LEARN SECTION
// ═══════════════════════════════════════════════════════════════════════════
// Add new learn chips dynamically
function initLearnChips() {
  const lc = $('learnChips');
  if (!lc) return;
  const extraChips = [
    { v: 'water', label: '\u{1F4A7} جودة الماء' },
    { v: 'mistakes', label: '\u26A0\uFE0F أخطاء شائعة' },
    { v: 'variables', label: '\u{1F527} متغيرات التحضير' },
    { v: 'seasonal', label: '\u{1F326}\uFE0F نصائح موسمية' }
  ];
  extraChips.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'ch';
    btn.dataset.v = ch.v;
    btn.innerHTML = ch.label;
    lc.appendChild(btn);
  });
}
initLearnChips();

document.addEventListener('click', e => {
  const chip = e.target.closest('#learnChips .ch');
  if (!chip) return;
  document.querySelectorAll('#learnChips .ch').forEach(c => c.classList.remove('on'));
  chip.classList.add('on');
  learnSub = chip.dataset.v;
  renderLearn();
});

function renderLearn() {
  const c = $('learnContent');
  if (!c) return;

  switch (learnSub) {
    case 'origins': c.innerHTML = renderOrigins(); break;
    case 'glossary': c.innerHTML = renderGlossary(); break;
    case 'roast': c.innerHTML = renderRoast(); break;
    case 'tips': c.innerHTML = renderTips(); break;
    case 'water': c.innerHTML = renderWater(); break;
    case 'mistakes': c.innerHTML = renderMistakes(); break;
    case 'variables': c.innerHTML = renderVariables(); break;
    case 'seasonal': c.innerHTML = renderSeasonal(); break;
    default: c.innerHTML = renderOrigins();
  }
}

function renderOrigins() {
  const origins = (typeof COFFEE_KNOWLEDGE !== 'undefined' && COFFEE_KNOWLEDGE.origins) || [];
  if (!origins.length) return '<div class="empty"><b>\u{1F30D}</b><h3>لا توجد بيانات</h3></div>';
  return '<div class="learn-sec">' + origins.map(o =>
    '<div class="lc" onclick="this.classList.toggle(\'expanded\')" style="cursor:pointer">' +
    '<h4>' + o.flag + ' ' + o.country + '</h4>' +
    '<div class="lc-flav">' + o.flavorProfile.primary.map(f => '<span class="lc-tag">' + f + '</span>').join('') + '</div>' +
    '<div class="lc-meta">القوام: ' + o.flavorProfile.body + ' \u2022 الحموضة: ' + o.flavorProfile.acidity + '</div>' +
    '<div style="max-height:0;overflow:hidden;transition:max-height .4s ease" class="origin-detail">' +
    '<p style="font-size:12px;color:var(--t2);font-family:Tajawal;line-height:1.8;margin:8px 0">' + o.description + '</p>' +
    '<div style="margin:8px 0"><b style="font-size:11px;color:var(--a2)">الارتفاع:</b> <span class="en" style="font-size:11px">' + o.altitude + '</span></div>' +
    '<div style="margin:4px 0"><b style="font-size:11px;color:var(--a2)">الأصناف:</b> <span class="en" style="font-size:11px">' + o.varieties.join(', ') + '</span></div>' +
    '<div style="margin:4px 0"><b style="font-size:11px;color:var(--a2)">المعالجة:</b> <span class="en" style="font-size:11px">' + o.processing.join(', ') + '</span></div>' +
    '<div style="margin:4px 0"><b style="font-size:11px;color:var(--a2)">الحلاوة:</b> <span style="font-size:11px;font-family:Tajawal">' + o.flavorProfile.sweetness + '</span></div>' +
    '<div style="margin:4px 0"><b style="font-size:11px;color:var(--a2)">النهاية:</b> <span style="font-size:11px;font-family:Tajawal">' + o.flavorProfile.finish + '</span></div>' +
    (o.notableRegions ? '<div style="margin:8px 0"><b style="font-size:11px;color:var(--a2)">مناطق مشهورة:</b>' + o.notableRegions.map(nr => '<div style="font-size:11px;font-family:Tajawal;margin:2px 0;padding:4px 8px;background:var(--bg2);border-radius:6px"><b class="en">' + nr.name + '</b>: ' + nr.notes + '</div>').join('') + '</div>' : '') +
    '<div class="lc-tip">\u{1F4A1} ' + o.brewTip + '</div>' +
    '</div></div>'
  ).join('') + '</div>' +
  '<style>.lc.expanded .origin-detail{max-height:500px!important}</style>';
}

function renderGlossary() {
  const glossary = (typeof COFFEE_KNOWLEDGE !== 'undefined' && COFFEE_KNOWLEDGE.glossary) || [];
  if (!glossary.length) return '<div class="empty"><b>\u{1F4D6}</b><h3>لا توجد بيانات</h3></div>';

  // Group by category
  const cats = {};
  glossary.forEach(g => { const c = g.category || 'General'; if (!cats[c]) cats[c] = []; cats[c].push(g); });

  let h = '';
  Object.keys(cats).forEach(cat => {
    h += '<div class="sc"><h3>' + cat + '</h3>';
    cats[cat].forEach(g => {
      h += '<div class="gl-item"><div><span class="gl-en">' + g.term + '</span></div><div class="gl-def">' + g.definition + '</div></div>';
    });
    h += '</div>';
  });
  return h;
}

function renderRoast() {
  const roasts = (typeof COFFEE_KNOWLEDGE !== 'undefined' && COFFEE_KNOWLEDGE.roastAdjustments) || [];
  if (!roasts.length) return '';
  return roasts.map(r => {
    const p = r.parameters;
    return '<div class="roast-card" style="background:linear-gradient(135deg,' + r.color + ',' + r.color + 'cc)">' +
      '<h4>' + r.level + ' <small class="en">(' + r.scaName + ')</small></h4>' +
      '<p style="font-size:11px;opacity:.8;margin-bottom:8px;font-family:Tajawal;line-height:1.6">' + r.description + '</p>' +
      '<div class="roast-params">' +
      Object.keys(p).map(k => '<div class="rp"><b>' + p[k].value + '</b><span>' + k + '</span></div>').join('') +
      '</div></div>';
  }).join('');
}

function renderTips() {
  return TIPS.map((t, i) =>
    '<div class="tip-item"><div class="tip-num">' + (i + 1) + '</div><div class="tip-txt">' + t + '</div></div>'
  ).join('');
}

function renderWater() {
  const w = (typeof COFFEE_KNOWLEDGE !== 'undefined' && COFFEE_KNOWLEDGE.waterQuality) || null;
  if (!w) return '<div class="empty"><b>\u{1F4A7}</b><h3>لا توجد بيانات</h3></div>';

  let h = '<div class="sc"><h3>\u{1F4A7} جودة الماء</h3><p style="font-size:12px;font-family:Tajawal;line-height:1.8;color:var(--t2)">' + w.overview + '</p></div>';

  // SCA Standard
  const sca = w.scaStandard;
  h += '<div class="sc"><h3>' + sca.label + '</h3><div class="ig">';
  h += '<div class="ig-i"><span class="ig-l">TDS</span><span class="ig-v en">' + sca.tds.ideal + ' ppm (' + sca.tds.range[0] + '-' + sca.tds.range[1] + ')</span></div>';
  h += '<div class="ig-i"><span class="ig-l">pH</span><span class="ig-v en">' + sca.ph.ideal + ' (' + sca.ph.range[0] + '-' + sca.ph.range[1] + ')</span></div>';
  h += '</div></div>';

  // Minerals
  h += '<div class="sc"><h3>دور المعادن</h3>';
  w.minerals.forEach(m => {
    h += '<div style="padding:8px 0;border-bottom:1px solid var(--border)"><b style="font-size:13px">' + m.name + '</b> <span style="font-size:11px;color:var(--a2)">' + m.role + '</span><div style="font-size:11px;font-family:Tajawal;color:var(--t2);margin-top:2px">' + m.detail + '</div><div style="font-size:10px;color:var(--ok);font-weight:700;margin-top:2px">المدى المثالي: ' + m.idealRange + '</div></div>';
  });
  h += '</div>';

  // Tap water advice
  if (w.tapWaterAdvice) {
    h += '<div class="sc"><h3>' + w.tapWaterAdvice.title + '</h3>';
    w.tapWaterAdvice.steps.forEach((s, i) => {
      h += '<div class="tip-item"><div class="tip-num">' + (i + 1) + '</div><div><b style="font-size:12px">' + s.label + '</b><div class="tip-txt">' + s.detail + '</div></div></div>';
    });
    h += '</div>';
  }

  return h;
}

function renderMistakes() {
  const mistakes = (typeof COFFEE_KNOWLEDGE !== 'undefined' && COFFEE_KNOWLEDGE.commonMistakes) || [];
  if (!mistakes.length) return '';
  const sevColors = { high: 'var(--hot)', medium: 'var(--warn)', low: 'var(--t3)' };
  return '<div class="learn-sec">' + mistakes.map(m =>
    '<div class="lc"><h4 style="display:flex;align-items:center;gap:6px"><span style="width:8px;height:8px;border-radius:50%;background:' + (sevColors[m.severity] || 'var(--t3)') + '"></span>' + m.mistake + '</h4>' +
    '<p style="font-size:12px;font-family:Tajawal;color:var(--t2);line-height:1.8;margin-bottom:6px">' + m.why + '</p>' +
    '<div style="padding:8px 12px;background:var(--okBg);border-radius:var(--r3);font-size:12px;font-family:Tajawal;color:var(--ok);line-height:1.6"><b>الحل:</b> ' + m.fix + '</div>' +
    '</div>'
  ).join('') + '</div>';
}

function renderVariables() {
  const vars = (typeof BREW_VARIABLES !== 'undefined') ? BREW_VARIABLES : [];
  if (!vars.length) return '<div class="empty"><b>\u{1F527}</b><h3>لا توجد بيانات</h3></div>';
  return vars.map(v => {
    const whenUp = v.whenHigher || v.whenFiner || v.whenMore || v.whenFaster || {};
    const whenDown = v.whenLower || v.whenCoarser || v.whenLess || v.whenSlower || {};
    const upItems = whenUp.conditions || [];
    const downItems = whenDown.conditions || [];
    return '<div class="lc" style="cursor:pointer" onclick="this.classList.toggle(\'expanded\')">' +
      '<h4>' + v.icon + ' ' + v.variable + ' <small class="en">(' + v.variableEn + ')</small></h4>' +
      '<p style="font-size:12px;font-family:Tajawal;color:var(--t2);line-height:1.6">' + v.summary + '</p>' +
      '<div style="max-height:0;overflow:hidden;transition:max-height .4s" class="origin-detail">' +
      (upItems.length ? '<div style="margin:8px 0;padding:8px;background:var(--hotBg);border-radius:var(--r3)"><b style="font-size:11px;color:var(--hot)">' + (whenUp.label || '') + '</b>' + upItems.map(c => '<div style="font-size:11px;font-family:Tajawal;padding:2px 0">\u2022 ' + c + '</div>').join('') + '</div>' : '') +
      (downItems.length ? '<div style="margin:8px 0;padding:8px;background:var(--iceBg);border-radius:var(--r3)"><b style="font-size:11px;color:var(--ice)">' + (whenDown.label || '') + '</b>' + downItems.map(c => '<div style="font-size:11px;font-family:Tajawal;padding:2px 0">\u2022 ' + c + '</div>').join('') + '</div>' : '') +
      (v.techniques ? '<div style="margin:8px 0"><b style="font-size:11px;color:var(--a2)">تقنيات:</b>' + v.techniques.map(t => '<div style="font-size:11px;font-family:Tajawal;padding:4px 8px;background:var(--bg2);border-radius:6px;margin:2px 0"><b class="en">' + t.name + '</b>: ' + t.desc + '</div>').join('') + '</div>' : '') +
      (v.proTip ? '<div class="lc-tip">\u{1F4A1} ' + v.proTip + '</div>' : '') +
      (v.commonMistake ? '<div style="font-size:11px;color:var(--hot);font-family:Tajawal;margin-top:4px">\u26A0\uFE0F ' + v.commonMistake + '</div>' : '') +
      '</div></div>';
  }).join('') +
  '<style>.lc.expanded .origin-detail{max-height:800px!important}</style>';
}

function renderSeasonal() {
  const tips = (typeof SEASONAL_TIPS !== 'undefined') ? SEASONAL_TIPS : [];
  if (!tips.length) return '<div class="empty"><b>\u{1F326}\uFE0F</b><h3>لا توجد بيانات</h3></div>';
  return tips.map(t =>
    '<div class="lc" style="cursor:pointer" onclick="this.classList.toggle(\'expanded\')">' +
    '<h4>' + t.icon + ' ' + t.title + '</h4>' +
    '<div style="display:flex;gap:4px;margin-bottom:4px"><span class="lc-tag">' + t.season + '</span><span class="lc-tag">' + t.category + '</span></div>' +
    '<p style="font-size:12px;font-family:Tajawal;color:var(--t2);line-height:1.6">' + t.tip + '</p>' +
    '<div style="max-height:0;overflow:hidden;transition:max-height .4s" class="origin-detail">' +
    '<p style="font-size:12px;font-family:Tajawal;color:var(--t2);line-height:1.8;margin:8px 0">' + t.details + '</p>' +
    (t.adjustments ? '<div style="margin:8px 0">' + t.adjustments.map(a => '<div style="font-size:11px;font-family:Tajawal;padding:4px 8px;background:var(--bg2);border-radius:6px;margin:2px 0"><b class="en">' + a.variable + '</b>: ' + a.change + '</div>').join('') + '</div>' : '') +
    '</div></div>'
  ).join('') +
  '<style>.lc.expanded .origin-detail{max-height:500px!important}</style>';
}

// ═══════════════════════════════════════════════════════════════════════════
// FIX / TROUBLESHOOTING
// ═══════════════════════════════════════════════════════════════════════════
function renderFix() {
  renderFixGrid();
  renderBedAnalysis();
  renderDiagWizard();
  renderExtractionCompass();
  renderBeginnerMistakes();
}

function renderFixGrid() {
  const grid = $('fixGrid');
  if (!grid) return;
  const problems = (typeof TASTE_PROBLEMS !== 'undefined') ? TASTE_PROBLEMS : [];
  grid.innerHTML = problems.map(p =>
    '<div class="fix-btn" onclick="showFixDetail(\'' + p.id + '\')">' +
    '<div class="fix-icon">' + p.icon + '</div>' +
    '<div class="fix-name">' + p.symptom + '</div>' +
    '<div style="font-size:9px;color:var(--t3);font-family:Inter;margin-top:2px">' + p.symptomEn + '</div></div>'
  ).join('');
}

function showFixDetail(id) {
  const problems = (typeof TASTE_PROBLEMS !== 'undefined') ? TASTE_PROBLEMS : [];
  const p = problems.find(x => x.id === id);
  if (!p) return;
  const fd = $('fixDetail');
  if (!fd) return;

  // Toggle
  if (fd.classList.contains('on') && fd.dataset.id === id) {
    fd.classList.remove('on');
    fd.dataset.id = '';
    return;
  }

  fd.dataset.id = id;
  fd.innerHTML =
    '<h3>' + p.icon + ' ' + p.symptom + '</h3>' +
    '<div class="fix-cause">' + p.cause + '</div>' +
    '<ul class="fix-list">' + p.fixes.map(f => '<li><span class="num">' + f.priority + '</span> ' + f.action + '</li>').join('') + '</ul>' +
    '<div class="fix-pro">\u{1F4A1} ' + p.tip + '</div>';
  fd.classList.add('on');
  fd.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
window.showFixDetail = showFixDetail;

function renderBedAnalysis() {
  const el = $('bedAnalysis');
  if (!el) return;
  const beds = (typeof BED_ANALYSIS !== 'undefined') ? BED_ANALYSIS : [];
  el.innerHTML = beds.map(b => {
    const vColor = b.verdict === 'good' ? 'var(--ok)' : (b.verdict === 'warning' ? 'var(--warn)' : 'var(--hot)');
    return '<div class="bed-item" style="cursor:pointer" onclick="this.classList.toggle(\'expanded\')">' +
      '<div class="bed-icon">' + b.icon + '</div>' +
      '<div class="bed-txt">' +
      '<b style="color:' + vColor + '">' + b.pattern + '</b>' +
      '<div style="font-size:11px;color:var(--t3);margin:2px 0">' + b.meaning + '</div>' +
      '<div style="font-size:11px;color:var(--ok);font-weight:700">' + b.action + '</div>' +
      '<div style="max-height:0;overflow:hidden;transition:max-height .3s" class="origin-detail"><p style="font-size:11px;color:var(--t2);margin-top:6px;line-height:1.7">' + b.details + '</p></div>' +
      '</div></div>';
  }).join('') +
  '<style>.bed-item.expanded .origin-detail{max-height:200px!important}</style>';
}

function renderDiagWizard() {
  // Add wizard section if not present
  const fixPad = document.querySelector('.fix-pad');
  if (!fixPad) return;
  let wizEl = $('diagWizard');
  if (!wizEl) {
    wizEl = document.createElement('div');
    wizEl.id = 'diagWizard';
    wizEl.className = 'sc';
    wizEl.style.marginTop = '16px';
    fixPad.appendChild(wizEl);
  }
  const flow = (typeof DIAGNOSIS_FLOW !== 'undefined') ? DIAGNOSIS_FLOW : [];
  if (!flow.length) { wizEl.innerHTML = ''; return; }

  // Start button or active wizard
  if (!diagStep) {
    wizEl.innerHTML = '<h3>\u{1F50D} معالج التشخيص</h3><p style="font-size:12px;font-family:Tajawal;color:var(--t2);margin-bottom:8px">جاوب الأسئلة وبنحدد لك المشكلة والحل</p>' +
      '<button class="bcta" style="margin:0" onclick="startDiag()"><span id="startDiag">\u{1F50D}</span> ابدأ التشخيص</button>';
    return;
  }

  const q = flow.find(x => x.id === diagStep);
  if (!q) {
    // Show result
    showDiagResult();
    return;
  }

  wizEl.innerHTML = '<h3>\u{1F50D} معالج التشخيص</h3>' +
    '<p style="font-size:14px;font-weight:800;margin-bottom:12px">' + q.question + '</p>' +
    '<div style="display:flex;flex-direction:column;gap:6px">' +
    q.options.map(o =>
      '<button class="sq-o" style="text-align:right;padding:12px 14px" onclick="diagAnswer(\'' + (o.next || '') + '\',\'' + (o.result || '') + '\')">' + o.label + '</button>'
    ).join('') + '</div>' +
    '<button style="margin-top:12px;font-size:11px;color:var(--t3);background:none;border:none;cursor:pointer;font-family:Tajawal" onclick="resetDiag()">\u{1F504} ابدأ من جديد</button>';
}

function startDiag() {
  diagStep = 'q1';
  diagAnswers = [];
  renderDiagWizard();
}
window.startDiag = startDiag;

function diagAnswer(next, result) {
  if (result) {
    diagStep = null;
    showDiagResult(result);
    return;
  }
  if (next) {
    diagStep = next;
    renderDiagWizard();
  }
}
window.diagAnswer = diagAnswer;

function showDiagResult(resultId) {
  const wizEl = $('diagWizard');
  if (!wizEl) return;
  const problems = (typeof TASTE_PROBLEMS !== 'undefined') ? TASTE_PROBLEMS : [];
  const p = problems.find(x => x.id === resultId);
  if (!p) { resetDiag(); return; }

  wizEl.innerHTML = '<h3>\u2705 التشخيص</h3>' +
    '<div style="padding:14px;background:var(--card2);border-radius:var(--r);margin-bottom:8px">' +
    '<div style="font-size:20px;text-align:center;margin-bottom:6px">' + p.icon + '</div>' +
    '<div style="font-size:15px;font-weight:900;text-align:center;margin-bottom:4px">' + p.symptom + '</div>' +
    '<div style="font-size:11px;color:var(--t3);text-align:center;font-family:Inter">' + p.symptomEn + '</div></div>' +
    '<div class="fix-cause">' + p.cause + '</div>' +
    '<ul class="fix-list">' + p.fixes.map(f => '<li><span class="num">' + f.priority + '</span> ' + f.action + '</li>').join('') + '</ul>' +
    '<div class="fix-pro">\u{1F4A1} ' + p.tip + '</div>' +
    '<button class="bcta" style="margin-top:12px" onclick="resetDiag()">\u{1F504} تشخيص جديد</button>';
}

function resetDiag() {
  diagStep = null;
  diagAnswers = [];
  renderDiagWizard();
}
window.resetDiag = resetDiag;

function renderExtractionCompass() {
  const fixPad = document.querySelector('.fix-pad');
  if (!fixPad) return;
  let el = $('extractionCompass');
  if (!el) {
    el = document.createElement('div');
    el.id = 'extractionCompass';
    el.className = 'sc';
    el.style.marginTop = '16px';
    fixPad.appendChild(el);
  }

  const compass = (typeof EXTRACTION_COMPASS !== 'undefined') ? EXTRACTION_COMPASS : null;
  if (!compass) { el.innerHTML = ''; return; }

  el.innerHTML = '<h3>\u{1F9ED} بوصلة الاستخلاص</h3>' +
    '<p style="font-size:12px;font-family:Tajawal;color:var(--t2);margin-bottom:12px">اضغط على المربع اللي يوصف طعم قهوتك</p>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">' +
    compass.quadrants.filter(q => q.position !== 'center').map(q =>
      '<div style="padding:14px 10px;background:' + q.color + '18;border:2px solid ' + q.color + ';border-radius:var(--r);cursor:pointer;text-align:center" onclick="this.querySelector(\'.compass-detail\').style.display=this.querySelector(\'.compass-detail\').style.display===\'block\'?\'none\':\'block\'">' +
      '<div style="font-size:14px;font-weight:900;color:' + q.color + '">' + q.taste + '</div>' +
      '<div style="font-size:10px;color:var(--t3);font-family:Inter">' + q.tasteEn + '</div>' +
      '<div class="compass-detail" style="display:none;margin-top:8px;text-align:right">' +
      '<div style="font-size:11px;font-family:Tajawal;color:var(--t2)">' + q.descriptors.join(' \u2022 ') + '</div>' +
      '<div style="font-size:11px;color:var(--ok);font-weight:700;margin-top:4px">' + q.fix + '</div>' +
      '</div></div>'
    ).join('') + '</div>' +
    // Center (ideal)
    '<div style="margin-top:8px;padding:12px;background:' + compass.quadrants[4].color + '18;border:2px solid ' + compass.quadrants[4].color + ';border-radius:var(--r);text-align:center">' +
    '<div style="font-size:16px;font-weight:900;color:' + compass.quadrants[4].color + '">' + compass.quadrants[4].taste + '</div>' +
    '<div style="font-size:11px;color:var(--t2);font-family:Tajawal">' + compass.quadrants[4].descriptors.join(' \u2022 ') + '</div>' +
    '</div>' +
    '<div style="font-size:10px;color:var(--t3);font-family:Tajawal;margin-top:8px">الهدف: استخلاص ' + compass.targetRange.extraction.ideal + ' \u2022 TDS ' + compass.targetRange.tds.ideal + '</div>';
}

function renderBeginnerMistakes() {
  const fixPad = document.querySelector('.fix-pad');
  if (!fixPad) return;
  let el = $('beginnerMistakes');
  if (!el) {
    el = document.createElement('div');
    el.id = 'beginnerMistakes';
    el.className = 'sc';
    el.style.marginTop = '16px';
    fixPad.appendChild(el);
  }

  const mistakes = (typeof BEGINNER_MISTAKES !== 'undefined') ? BEGINNER_MISTAKES : [];
  if (!mistakes.length) { el.innerHTML = ''; return; }

  el.innerHTML = '<h3>\u{1F476} أخطاء المبتدئين</h3>' +
    mistakes.map(m => {
      const pColor = m.priority === 1 ? 'var(--hot)' : m.priority === 2 ? 'var(--warn)' : 'var(--t3)';
      return '<div style="display:flex;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);align-items:flex-start">' +
        '<span style="font-size:18px">' + m.icon + '</span>' +
        '<div style="flex:1"><b style="font-size:12px;color:' + pColor + '">' + m.mistake + '</b>' +
        '<div style="font-size:11px;font-family:Tajawal;color:var(--t2);margin:2px 0">' + m.impact + '</div>' +
        '<div style="font-size:11px;font-family:Tajawal;color:var(--ok);font-weight:700">' + m.fix + '</div></div></div>';
    }).join('');
}

// ═══════════════════════════════════════════════════════════════════════════
// TOOLS SECTION
// ═══════════════════════════════════════════════════════════════════════════
function renderTools() {
  const el = $('tools');
  if (!el) {
    // Tools screen might need to be created if not in HTML
    const scr = document.querySelector('.scr#tools');
    if (!scr) return;
  }
  const toolsContent = $('toolsContent') || $('tools');
  if (!toolsContent) return;

  // Only render inner content if tools screen exists
  const inner = toolsContent.querySelector('.tools-inner') || toolsContent;

  inner.innerHTML =
    // Ratio Calculator
    '<div class="sc"><h3>\u{1F522} حاسبة النسبة</h3>' +
    '<div class="calc-r"><input class="calc-in" type="number" id="toolDose" value="20" oninput="calcRatio()"><span class="calc-lab">g بن</span>' +
    '<span class="calc-lab">\u00D7 1:</span>' +
    '<input class="calc-in" type="number" id="toolRatio" value="16" oninput="calcRatio()" style="width:50px"><span class="calc-lab">=</span>' +
    '<span class="calc-lab en" id="toolResult" style="font-size:18px;font-weight:900;color:var(--a1)">320g ماء</span></div>' +
    '<div style="font-size:11px;color:var(--t3);font-family:Tajawal;margin-top:4px">أو أدخل كمية الماء:</div>' +
    '<div class="calc-r" style="margin-top:4px"><input class="calc-in" type="number" id="toolWater" value="" placeholder="ماء" oninput="calcRatioReverse()"><span class="calc-lab">g ماء</span>' +
    '<span class="calc-lab">\u00F7 1:</span>' +
    '<span class="calc-lab en" id="toolDoseResult" style="font-weight:900;color:var(--a1)"></span></div></div>' +

    // Iced Coffee Calculator
    '<div class="sc"><h3>\u2744\uFE0F حاسبة المثلّج</h3>' +
    '<div class="calc-r"><input class="calc-in" type="number" id="icedDose" value="20" oninput="calcIced()"><span class="calc-lab">g بن</span></div>' +
    '<div class="calc-r"><input class="calc-in" type="number" id="icedTotal" value="300" oninput="calcIced()"><span class="calc-lab">g سائل إجمالي</span></div>' +
    '<div class="calc-r"><input class="calc-in" type="number" id="icedIcePct" value="35" oninput="calcIced()" style="width:50px"><span class="calc-lab">% ثلج</span></div>' +
    '<div class="calc-out" id="icedResult"></div></div>' +

    // Yield Calculator
    '<div class="sc"><h3>\u2615 حاسبة الناتج</h3>' +
    '<div class="calc-r"><input class="calc-in" type="number" id="yieldDose" value="20" oninput="calcYield()"><span class="calc-lab">g بن</span>' +
    '<input class="calc-in" type="number" id="yieldWater" value="320" oninput="calcYield()"><span class="calc-lab">g ماء</span></div>' +
    '<div class="calc-out" id="yieldResult"></div></div>' +

    // Caffeine Estimator
    '<div class="sc"><h3>\u26A1 تقدير الكافيين</h3>' +
    '<div class="calc-r"><input class="calc-in" type="number" id="cafDose" value="20" oninput="calcCaffeine()"><span class="calc-lab">g بن</span></div>' +
    '<div id="cafResult" style="font-size:16px;font-weight:900;color:var(--a1);font-family:Inter;margin-top:6px;text-align:center">~120mg كافيين</div>' +
    '<div style="font-size:10px;color:var(--t3);font-family:Tajawal;text-align:center;margin-top:2px">تقدير تقريبي لـArabica V60 (~6mg/g)</div></div>' +

    // Grinder Cross-Reference
    '<div class="sc"><h3>\u2699\uFE0F جدول مقارنة الطواحين</h3>' +
    '<div style="overflow-x:auto;font-size:11px">' +
    '<table style="width:100%;border-collapse:collapse;font-family:Inter">' +
    '<thead><tr style="background:var(--bg2);font-weight:800"><th style="padding:8px 6px;text-align:right;font-family:Cairo">الطريقة</th><th style="padding:8px 4px">Ode 2</th><th style="padding:8px 4px">Comandante</th><th style="padding:8px 4px">1Zpresso</th><th style="padding:8px 4px">Timemore</th></tr></thead><tbody>' +
    GRINDER_REF.map(g => '<tr style="border-bottom:1px solid var(--border)"><td style="padding:6px;font-weight:700;font-family:Cairo;font-size:10px">' + g.method + '</td><td style="padding:6px;text-align:center">' + g.ode2 + '</td><td style="padding:6px;text-align:center">' + g.comandante + '</td><td style="padding:6px;text-align:center">' + g.zpresso + '</td><td style="padding:6px;text-align:center">' + g.timemore + '</td></tr>').join('') +
    '</tbody></table></div>' +
    '<div style="font-size:9px;color:var(--t3);font-family:Tajawal;margin-top:6px">\u26A0\uFE0F أرقام تقريبية من تجارب المجتمع — كل طاحونة تختلف. استخدمها كنقطة بداية.</div></div>';

  // Calculate initial values
  calcIced();
  calcYield();
}

function calcRatio() {
  const dose = parseFloat($('toolDose') ? $('toolDose').value : 0);
  const ratio = parseFloat($('toolRatio') ? $('toolRatio').value : 0);
  if (dose > 0 && ratio > 0 && $('toolResult')) {
    $('toolResult').textContent = Math.round(dose * ratio) + 'g ماء';
  }
}
window.calcRatio = calcRatio;

function calcRatioReverse() {
  const water = parseFloat($('toolWater') ? $('toolWater').value : 0);
  const ratio = parseFloat($('toolRatio') ? $('toolRatio').value : 0);
  if (water > 0 && ratio > 0 && $('toolDoseResult')) {
    $('toolDoseResult').textContent = (water / ratio).toFixed(1) + 'g بن';
  }
}
window.calcRatioReverse = calcRatioReverse;

function calcIced() {
  const dose = parseFloat($('icedDose') ? $('icedDose').value : 0);
  const total = parseFloat($('icedTotal') ? $('icedTotal').value : 0);
  const pct = parseFloat($('icedIcePct') ? $('icedIcePct').value : 0);
  const el = $('icedResult');
  if (!el || !dose || !total || !pct) return;
  const ice = Math.round(total * pct / 100);
  const hotWater = total - ice;
  el.innerHTML = '<div class="co-i"><b>' + hotWater + 'g</b><span>ماء ساخن</span></div>' +
    '<div class="co-i"><b>' + ice + 'g</b><span>ثلج</span></div>';
}
window.calcIced = calcIced;

function calcYield() {
  const dose = parseFloat($('yieldDose') ? $('yieldDose').value : 0);
  const water = parseFloat($('yieldWater') ? $('yieldWater').value : 0);
  const el = $('yieldResult');
  if (!el || !dose || !water) return;
  const ml = Math.round(water * 0.94);
  const c = Math.round(ml / 120 * 10) / 10;
  el.innerHTML = '<div class="co-i"><b>~' + ml + 'ml</b><span>ناتج تقريبي</span></div>' +
    '<div class="co-i"><b>~' + c + '</b><span>كوب (120ml)</span></div>';
}
window.calcYield = calcYield;

function calcCaffeine() {
  const dose = parseFloat($('cafDose') ? $('cafDose').value : 0);
  const el = $('cafResult');
  if (!el || !dose) return;
  el.textContent = '~' + Math.round(dose * 6) + 'mg كافيين';
}
window.calcCaffeine = calcCaffeine;

// ═══════════════════════════════════════════════════════════════════════════
// MY BREWS
// ═══════════════════════════════════════════════════════════════════════════
// Sub tabs
document.querySelectorAll('.stab').forEach(t => t.onclick = () => {
  document.querySelectorAll('.stab').forEach(x => x.classList.remove('on'));
  t.classList.add('on');
  curSub = t.dataset.sub;
  renderMyBrews();
});

// Add extra tabs dynamically
function initMyBrewsTabs() {
  const tabsEl = document.querySelector('.stabs');
  if (!tabsEl) return;
  if (!tabsEl.querySelector('[data-sub="stats"]')) {
    const statsTab = document.createElement('button');
    statsTab.className = 'stab';
    statsTab.dataset.sub = 'stats';
    statsTab.textContent = '\u{1F4CA} إحصائيات';
    statsTab.onclick = () => { document.querySelectorAll('.stab').forEach(x => x.classList.remove('on')); statsTab.classList.add('on'); curSub = 'stats'; renderMyBrews(); };
    tabsEl.appendChild(statsTab);
  }
  if (!tabsEl.querySelector('[data-sub="badges"]')) {
    const badgesTab = document.createElement('button');
    badgesTab.className = 'stab';
    badgesTab.dataset.sub = 'badges';
    badgesTab.textContent = '\u{1F3C5} إنجازات';
    badgesTab.onclick = () => { document.querySelectorAll('.stab').forEach(x => x.classList.remove('on')); badgesTab.classList.add('on'); curSub = 'badges'; renderMyBrews(); };
    tabsEl.appendChild(badgesTab);
  }
}
initMyBrewsTabs();

function renderMyBrews() {
  const c = $('myContent');
  if (!c) return;

  switch (curSub) {
    case 'fav': renderFavs(c); break;
    case 'log': renderLog(c); break;
    case 'stats': renderStats(c); break;
    case 'badges': renderBadges(c); break;
    default: renderFavs(c);
  }
}

function renderFavs(c) {
  const fr = D.filter(r => favs.includes(r.id));
  if (!fr.length) {
    c.innerHTML = '<div class="empty"><b>\u2661</b><h3>ما عندك مفضلات</h3><p>اضغط القلب \u2661 على أي وصفة</p></div>';
    return;
  }
  c.innerHTML = '<div class="cg">' + fr.map((r, i) => cardH(r, i)).join('') + '</div>';
  c.querySelectorAll('.cd').forEach(cd => cd.onclick = () => openD(+cd.dataset.id));
}

function renderLog(c) {
  if (!brewLog.length) {
    c.innerHTML = '<div class="empty"><b>\u{1F4CB}</b><h3>ما عندك تحضيرات</h3><p>حضّر وصفة وقيّمها عشان تنحفظ هنا</p></div>';
    return;
  }
  c.innerHTML = brewLog.slice().reverse().map((e, i) => {
    const ri = brewLog.length - 1 - i;
    return '<div class="log-entry">' +
      '<div class="log-top"><span class="log-name">' + e.recipeName + '</span><span class="log-date">' + e.date + '</span></div>' +
      '<div class="log-stars">' + starsHTML(e.rating) + '</div>' +
      '<div class="log-info"><span class="en">' + e.dose + 'g</span> بن' +
      (e.grind ? ' \u2022 طحنة: <span class="en">' + e.grind + '</span>' : '') +
      (e.brewTime ? ' \u2022 وقت: <span class="en">' + Math.floor(e.brewTime / 60) + ':' + String(Math.floor(e.brewTime % 60)).padStart(2, '0') + '</span>' : '') + '</div>' +
      (e.note ? '<div class="log-note">' + e.note + '</div>' : '') +
      '<div style="display:flex;gap:6px;margin-top:6px">' +
      '<button class="log-del" onclick="delLog(' + ri + ')">حذف</button>' +
      '<button style="font-size:10px;color:var(--a2);background:none;border:none;cursor:pointer;font-family:Tajawal;font-weight:700" onclick="startB(' + (e.recipeId || 1) + ')">حضّر مرة ثانية</button></div></div>';
  }).join('');
}

function delLog(idx) {
  brewLog.splice(idx, 1);
  safeSave('v60log', brewLog);
  renderMyBrews();
}
window.delLog = delLog;

function renderStats(c) {
  if (!brewLog.length) {
    c.innerHTML = '<div class="empty"><b>\u{1F4CA}</b><h3>ما عندك إحصائيات بعد</h3><p>حضّر أكواب عشان تشوف إحصائياتك</p></div>';
    return;
  }

  const totalBrews = brewLog.length;
  const avgRating = (brewLog.reduce((s, e) => s + (e.rating || 0), 0) / totalBrews).toFixed(1);
  const totalCoffee = brewLog.reduce((s, e) => s + (e.dose || 0), 0);

  // Most brewed recipe
  const recipeCount = {};
  brewLog.forEach(e => { const id = e.recipeId; if (id) recipeCount[id] = (recipeCount[id] || 0) + 1; });
  const topRecipeId = Object.keys(recipeCount).sort((a, b) => recipeCount[b] - recipeCount[a])[0];
  const topRecipe = D.find(r => r.id === +topRecipeId);

  // Brews this week/month
  const now = new Date();
  const weekAgo = new Date(now - 7 * 86400000);
  const monthAgo = new Date(now - 30 * 86400000);
  const thisWeek = brewLog.filter(e => new Date(e.date) >= weekAgo).length;
  const thisMonth = brewLog.filter(e => new Date(e.date) >= monthAgo).length;

  // Rating distribution
  const rDist = [0, 0, 0, 0, 0];
  brewLog.forEach(e => { if (e.rating >= 1 && e.rating <= 5) rDist[e.rating - 1]++; });
  const maxR = Math.max(...rDist, 1);

  // Top 3 recipes
  const top3 = Object.keys(recipeCount).sort((a, b) => recipeCount[b] - recipeCount[a]).slice(0, 3).map(id => {
    const r = D.find(x => x.id === +id);
    return { name: r ? r.ex + ' - ' + r.mA : 'Unknown', count: recipeCount[id] };
  });

  c.innerHTML = '<div class="sc"><h3>\u{1F4CA} الإحصائيات</h3>' +
    '<div class="ig">' +
    '<div class="ig-i"><span class="ig-l">إجمالي التحضيرات</span><span class="ig-v en">' + totalBrews + '</span></div>' +
    '<div class="ig-i"><span class="ig-l">متوسط التقييم</span><span class="ig-v en">' + avgRating + ' \u2605</span></div>' +
    '<div class="ig-i"><span class="ig-l">إجمالي البن المستخدم</span><span class="ig-v en">' + Math.round(totalCoffee) + 'g</span></div>' +
    '<div class="ig-i"><span class="ig-l">هالأسبوع</span><span class="ig-v en">' + thisWeek + '</span></div>' +
    '<div class="ig-i"><span class="ig-l">هالشهر</span><span class="ig-v en">' + thisMonth + '</span></div>' +
    '<div class="ig-i"><span class="ig-l">الأكثر تحضيراً</span><span class="ig-v" style="font-size:12px">' + (topRecipe ? topRecipe.mA : '\u2014') + '</span></div>' +
    '</div></div>' +

    // Rating distribution
    '<div class="sc"><h3>توزيع التقييمات</h3>' +
    '<div style="display:flex;align-items:flex-end;gap:12px;height:80px;padding:8px 0">' +
    rDist.map((count, i) =>
      '<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">' +
      '<span style="font-size:10px;font-weight:800;font-family:Inter;color:var(--a2)">' + count + '</span>' +
      '<div style="width:100%;background:var(--a3);border-radius:4px;height:' + (count / maxR * 50) + 'px;min-height:2px;transition:height .5s"></div>' +
      '<span style="font-size:10px;color:var(--t3)">' + (i + 1) + '\u2605</span></div>'
    ).join('') + '</div></div>' +

    // Top 3
    (top3.length ? '<div class="sc"><h3>\u{1F3C6} أكثر الوصفات تحضيراً</h3>' + top3.map((t, i) =>
      '<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border)">' +
      '<span style="font-size:16px;font-weight:900;color:var(--a2);font-family:Inter;width:24px">' + (i + 1) + '</span>' +
      '<span style="flex:1;font-size:12px;font-weight:700">' + t.name + '</span>' +
      '<span style="font-size:12px;color:var(--t3);font-family:Inter">' + t.count + 'x</span></div>'
    ).join('') + '</div>' : '');
}

function renderBadges(c) {
  c.innerHTML = '<div class="sc"><h3>\u{1F3C5} إنجازاتك</h3>' +
    BADGE_DEFS.map(b => {
      const unlocked = b.check(brewLog);
      return '<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);opacity:' + (unlocked ? '1' : '0.4') + '">' +
        '<span style="font-size:28px;' + (unlocked ? '' : 'filter:grayscale(1)') + '">' + b.icon + '</span>' +
        '<div style="flex:1"><b style="font-size:13px">' + b.title + '</b>' +
        '<div style="font-size:11px;font-family:Tajawal;color:var(--t2)">' + b.desc + '</div></div>' +
        '<span style="font-size:11px;font-weight:800;color:' + (unlocked ? 'var(--ok)' : 'var(--t3)') + '">' + (unlocked ? '\u2705' : '\u{1F512}') + '</span></div>';
    }).join('') + '</div>';
}

// ═══════════════════════════════════════════════════════════════════════════
// SUGGEST / RECOMMENDATION
// ═══════════════════════════════════════════════════════════════════════════
// Add extra suggest questions
function initSuggest() {
  const ssheet = document.querySelector('.ssheet');
  if (!ssheet) return;

  // Add flavor preference question
  const flavorQ = document.createElement('div');
  flavorQ.className = 'sq';
  flavorQ.innerHTML = '<div class="sq-l">تفضّل أي نكهة؟</div><div class="sq-os" data-q="flav"><button class="sq-o" data-v="sweet">حلاوة</button><button class="sq-o" data-v="acidity">حموضة</button><button class="sq-o" data-v="body">قوام</button><button class="sq-o on" data-v="">ما يفرق</button></div>';
  const goBtn = $('sgo');
  if (goBtn) ssheet.insertBefore(flavorQ, goBtn);

  // Add time constraint question
  const timeQ = document.createElement('div');
  timeQ.className = 'sq';
  timeQ.innerHTML = '<div class="sq-l">عندك وقت؟</div><div class="sq-os" data-q="time"><button class="sq-o" data-v="fast">أسرع شي</button><button class="sq-o" data-v="slow">عندي وقت</button><button class="sq-o on" data-v="">عادي</button></div>';
  if (goBtn) ssheet.insertBefore(timeQ, goBtn);
}
initSuggest();

// Suggest overlay
if ($('sugO')) $('sugO').onclick = () => { const s = $('sov'); if (s) s.classList.add('on'); };

// Click outside to close
if ($('sov')) $('sov').onclick = e => { if (e.target === $('sov')) $('sov').classList.remove('on'); };

// Option selection
document.querySelectorAll('.sq-os').forEach(group => {
  group.querySelectorAll('.sq-o').forEach(btn => {
    btn.onclick = () => {
      group.querySelectorAll('.sq-o').forEach(x => x.classList.remove('on'));
      btn.classList.add('on');
      const q = group.dataset.q;
      sugAnswers[q] = btn.dataset.v;
    };
  });
});

if ($('sgo')) {
  $('sgo').onclick = () => {
    const results = suggestRecipes();
    showSuggestResults(results);
  };
}

function suggestRecipes() {
  let candidates = [...D];

  // Type filter
  if (sugAnswers.type === 'hot') candidates = candidates.filter(r => r.type === 'hot');
  if (sugAnswers.type === 'iced') candidates = candidates.filter(r => r.type === 'iced');

  // Score each candidate
  candidates = candidates.map(r => {
    let score = r.pop; // base score

    // Strength
    if (sugAnswers.str === 's' && r.rn <= 15.5) score += 2;
    if (sugAnswers.str === 'l' && r.rn >= 16.5) score += 2;

    // Level
    if (sugAnswers.lv === 'b' && r.diff === 'مبتدئ') score += 3;
    if (sugAnswers.lv === 'a' && r.diff !== 'مبتدئ') score += 2;

    // Flavor
    if (sugAnswers.flav === 'sweet' && r.fl.sw >= 4) score += 2;
    if (sugAnswers.flav === 'acidity' && r.fl.ac >= 4) score += 2;
    if (sugAnswers.flav === 'body' && r.fl.bd >= 4) score += 2;

    // Time
    if (sugAnswers.time === 'fast' && r.ts && r.ts <= 180) score += 2;
    if (sugAnswers.time === 'slow' && r.ts && r.ts >= 210) score += 1;

    return { recipe: r, score };
  });

  candidates.sort((a, b) => b.score - a.score);
  return candidates.slice(0, 3);
}

function showSuggestResults(results) {
  let el = $('sugResults');
  if (!el) {
    el = document.createElement('div');
    el.id = 'sugResults';
    const ssheet = document.querySelector('.ssheet');
    if (ssheet) ssheet.appendChild(el);
  }

  el.innerHTML = '<div style="margin-top:16px;padding-top:16px;border-top:2px solid var(--border)">' +
    '<h3 style="font-size:16px;font-weight:900;margin-bottom:12px">\u{1F3AF} نرشّح لك:</h3>' +
    results.map((r, i) =>
      '<div style="padding:12px;background:var(--card2);border-radius:var(--r);margin-bottom:8px;cursor:pointer;border:1.5px solid ' + (i === 0 ? 'var(--a2)' : 'var(--border)') + '" onclick="$(' + "'sov'" + ').classList.remove(' + "'on'" + ');openD(' + r.recipe.id + ')">' +
      '<div style="display:flex;justify-content:space-between;align-items:center">' +
      '<div><span style="font-size:14px;font-weight:900" class="en">' + r.recipe.ex + '</span><div style="font-size:11px;color:var(--t2)">' + r.recipe.mA + '</div></div>' +
      '<span class="bg ' + (r.recipe.type === 'iced' ? 'b-iced' : 'b-hot') + '">' + (r.recipe.type === 'iced' ? 'مثلّج' : 'حار') + '</span></div>' +
      '<div style="font-size:10px;color:var(--t3);font-family:Tajawal;margin-top:4px">' + r.recipe.diff + ' \u2022 <span class="en">' + r.recipe.ratio + '</span> \u2022 <span class="en">' + r.recipe.time + '</span></div></div>'
    ).join('') + '</div>';
}

// ═══════════════════════════════════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════════════════════════════════
function initOnboard() {
  if (onboardDone) return;

  let onboardEl = $('onboard');
  if (!onboardEl) {
    onboardEl = document.createElement('div');
    onboardEl.id = 'onboard';
    onboardEl.style.cssText = 'position:fixed;inset:0;z-index:500;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);display:flex;justify-content:center;align-items:center';
    document.body.appendChild(onboardEl);
  }

  const steps = [
    { icon: '\u2615', title: 'مرحباً بـ V60 Masters', desc: '13 وصفة موثّقة من 10 خبراء عالميين — اختار وصفتك وحضّرها بالمؤقت المدمج' },
    { icon: '\u{1F4DA}', title: 'تعلّم كل شي', desc: 'مناشئ القهوة، المصطلحات، درجات التحميص، جودة الماء — كل شي تحتاجه في مكان واحد' },
    { icon: '\u{1F527}', title: 'أصلح قهوتك', desc: 'وصف المشكلة وبنعطيك الحل. معالج تشخيص تفاعلي + بوصلة الاستخلاص' }
  ];

  let step = 0;
  renderOnboardStep();

  function renderOnboardStep() {
    onboardEl.innerHTML =
      '<div style="background:var(--card);border-radius:var(--r);padding:40px 24px;width:85%;max-width:340px;text-align:center;animation:fi .3s ease">' +
      '<div style="font-size:48px;margin-bottom:12px">' + steps[step].icon + '</div>' +
      '<h2 style="font-size:20px;font-weight:900;margin-bottom:8px">' + steps[step].title + '</h2>' +
      '<p style="font-size:13px;color:var(--t2);font-family:Tajawal;line-height:1.7;margin-bottom:20px">' + steps[step].desc + '</p>' +
      '<div style="display:flex;justify-content:center;gap:6px;margin-bottom:16px">' +
      steps.map((_, i) => '<div style="width:8px;height:8px;border-radius:50%;background:' + (i === step ? 'var(--a2)' : 'var(--border)') + '"></div>').join('') + '</div>' +
      '<button id="onboardNext" style="width:100%;padding:12px;background:linear-gradient(135deg,var(--a1),var(--a2));color:#fff;border:none;border-radius:var(--r2);font-size:14px;font-weight:800;font-family:Cairo;cursor:pointer">' + (step < steps.length - 1 ? 'التالي \u2192' : '\u2615 يلّا نبدأ!') + '</button>' +
      '<button id="onboardSkip" style="background:none;border:none;color:var(--t3);font-size:12px;margin-top:8px;cursor:pointer;font-family:Tajawal">تخطّي</button>' +
      '</div>';

    $('onboardNext').onclick = () => {
      if (step < steps.length - 1) { step++; renderOnboardStep(); }
      else finishOnboard();
    };
    $('onboardSkip').onclick = finishOnboard;
  }

  function finishOnboard() {
    onboardDone = true;
    localStorage.setItem('v60ob', '1');
    onboardEl.remove();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPARE
// ═══════════════════════════════════════════════════════════════════════════
function openCompare(preselect) {
  let modal = $('compareModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'compareModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.6);backdrop-filter:blur(5px);display:flex;justify-content:center;align-items:flex-end;z-index:400';
    document.body.appendChild(modal);
  }

  modal.innerHTML =
    '<div style="background:var(--card);border-radius:20px 20px 0 0;width:100%;max-width:500px;padding:24px 20px 32px;max-height:85dvh;overflow-y:auto;animation:su .3s ease">' +
    '<h2 style="font-size:18px;font-weight:900;margin-bottom:12px">\u{1F504} مقارنة وصفتين</h2>' +
    '<div style="display:flex;gap:8px;margin-bottom:16px">' +
    '<select class="fs" id="compareA" style="flex:1" onchange="renderCompareTable()">' + D.map(r => '<option value="' + r.id + '"' + (r.id === preselect ? ' selected' : '') + '>' + r.ex + ' - ' + r.mA + '</option>').join('') + '</select>' +
    '<select class="fs" id="compareB" style="flex:1" onchange="renderCompareTable()">' + D.map(r => '<option value="' + r.id + '"' + (r.id !== preselect && r.id === D[1].id ? ' selected' : '') + '>' + r.ex + ' - ' + r.mA + '</option>').join('') + '</select></div>' +
    '<div id="compareTable"></div>' +
    '<button style="width:100%;padding:12px;background:var(--bg2);border:1.5px solid var(--border);border-radius:var(--r2);font-size:13px;font-weight:700;font-family:Cairo;margin-top:12px;cursor:pointer;color:var(--t1)" onclick="$(' + "'compareModal'" + ').remove()">إغلاق</button>' +
    '</div>';

  modal.onclick = e => { if (e.target === modal) modal.remove(); };
  renderCompareTable();
}
window.openCompare = openCompare;

function renderCompareTable() {
  const aId = $('compareA') ? +$('compareA').value : 1;
  const bId = $('compareB') ? +$('compareB').value : 2;
  const a = D.find(r => r.id === aId);
  const b = D.find(r => r.id === bId);
  const el = $('compareTable');
  if (!el || !a || !b) return;

  const rows = [
    ['البن', a.dose + 'g', b.dose + 'g'],
    ['الماء', a.water + 'g', b.water + 'g'],
    ['النسبة', a.ratio, b.ratio],
    ['الحرارة', (a.temp || '\u2014') + '\u00B0C', (b.temp || '\u2014') + '\u00B0C'],
    ['الوقت', a.time, b.time],
    ['التحريك', a.agit || 'بدون', b.agit || 'بدون'],
    ['الصعوبة', a.diff, b.diff],
    ['حلاوة', '\u2605'.repeat(a.fl.sw), '\u2605'.repeat(b.fl.sw)],
    ['حموضة', '\u2605'.repeat(a.fl.ac), '\u2605'.repeat(b.fl.ac)],
    ['قوام', '\u2605'.repeat(a.fl.bd), '\u2605'.repeat(b.fl.bd)],
    ['صفاء', '\u2605'.repeat(a.fl.cl), '\u2605'.repeat(b.fl.cl)]
  ];

  el.innerHTML = '<table style="width:100%;border-collapse:collapse;font-size:12px">' +
    '<thead><tr style="background:var(--bg2)"><th style="padding:8px;text-align:right;font-weight:800;font-family:Cairo"></th><th style="padding:8px;font-weight:800;font-family:Cairo;font-size:11px">' + a.ex + '</th><th style="padding:8px;font-weight:800;font-family:Cairo;font-size:11px">' + b.ex + '</th></tr></thead><tbody>' +
    rows.map(r => {
      const diff = r[1] !== r[2];
      return '<tr style="border-bottom:1px solid var(--border);' + (diff ? 'background:var(--warnBg)' : '') + '"><td style="padding:8px;font-weight:700;font-family:Tajawal">' + r[0] + '</td><td style="padding:8px;font-family:Inter;text-align:center">' + r[1] + '</td><td style="padding:8px;font-family:Inter;text-align:center">' + r[2] + '</td></tr>';
    }).join('') + '</tbody></table>';
}
window.renderCompareTable = renderCompareTable;

// ═══════════════════════════════════════════════════════════════════════════
// SHARE
// ═══════════════════════════════════════════════════════════════════════════
function openShare(id) {
  const r = D.find(x => x.id === id);
  if (!r) return;

  let modal = $('shareModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'shareModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:400;background:rgba(0,0,0,.6);backdrop-filter:blur(5px);display:flex;justify-content:center;align-items:center';
    document.body.appendChild(modal);
  }

  const text = r.ex + ' - ' + r.mA + '\n' +
    'البن: ' + r.dose + 'g | الماء: ' + r.water + 'g | النسبة: ' + r.ratio + '\n' +
    'الحرارة: ' + (r.temp || '-') + '\u00B0C | الوقت: ' + r.time + '\n' +
    '#V60Masters';

  modal.innerHTML =
    '<div id="sharePreview" style="background:var(--card);border-radius:var(--r);padding:24px;width:85%;max-width:340px;text-align:center;animation:fi .3s ease">' +
    '<h2 style="font-size:18px;font-weight:900;margin-bottom:12px">\u{1F4E4} مشاركة الوصفة</h2>' +
    '<div style="background:var(--bg2);border-radius:var(--r3);padding:14px;text-align:right;font-size:12px;font-family:Tajawal;line-height:1.8;margin-bottom:12px;white-space:pre-line;color:var(--t2)">' + text + '</div>' +
    '<button style="width:100%;padding:12px;background:linear-gradient(135deg,var(--a1),var(--a2));color:#fff;border:none;border-radius:var(--r2);font-size:14px;font-weight:800;font-family:Cairo;cursor:pointer;margin-bottom:8px" onclick="copyShare()">نسخ النص</button>' +
    '<button style="width:100%;padding:10px;background:var(--bg2);border:1.5px solid var(--border);border-radius:var(--r2);font-size:13px;font-weight:700;font-family:Cairo;cursor:pointer;color:var(--t1)" onclick="$(' + "'shareModal'" + ').remove()">إغلاق</button>' +
    '</div>';

  modal.onclick = e => { if (e.target === modal) modal.remove(); };

  // Store text for copying
  modal.dataset.text = text;
}
window.openShare = openShare;

function copyShare() {
  const modal = $('shareModal');
  if (!modal) return;
  const text = modal.dataset.text;
  try {
    navigator.clipboard.writeText(text).then(() => toast('تم النسخ!', 'ok'));
  } catch (e) {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    toast('تم النسخ!', 'ok');
  }
}
window.copyShare = copyShare;

// ═══════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════
try {
  render();
  initOnboard();

  // System theme listener
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('v60t')) {
        document.body.dataset.theme = e.matches ? 'dark' : '';
        if ($('thB')) $('thB').innerHTML = e.matches ? '\u2600' : '\u263D';
      }
    });
  }

  // Check for saved brew timer on reload
  const savedBrew = sessionStorage.getItem('v60brew');
  if (savedBrew) {
    try {
      const s = JSON.parse(savedBrew);
      if (s.elapsed > 5) {
        setTimeout(() => toast('عندك تحضير سابق — اضغط حضّر على نفس الوصفة للاستكمال', 'info'), 1000);
      }
    } catch (e) {}
  }

} catch (e) {
  console.error('V60 Masters init error:', e);
}

// ═══════════════════════════════════════════════════════════════════════════
// END OF FILE
// ═══════════════════════════════════════════════════════════════════════════
