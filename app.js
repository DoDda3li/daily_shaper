'use strict';

const _d = new Date();
const TODAY = `${_d.getFullYear()}-${String(_d.getMonth() + 1).padStart(2, '0')}-${String(_d.getDate()).padStart(2, '0')}`;
let currentDay = TODAY;

const CONTENT_V2 = '2026-06-11';
const LEGACY_WORKOUT_LEN = 9;

const FOOD = [
  { id: 'chips', label: 'No chips', sub: 'All fried snacks', badge: 'd' },
  { id: 'choc', label: 'No chocolate', sub: 'Or candy bars', badge: 'd' },
  { id: 'sugar', label: 'No added sugar', sub: 'Coffee, tea — drink them plain', badge: 'd' },
  { id: 'soda', label: 'No soda / energy drinks', sub: 'Water or unsweetened drinks only', badge: 'd' },
  { id: 'fast', label: 'No fast food', sub: 'Burgers, fries, pizza', badge: 'd' },
  { id: 'bread', label: 'No white bread / refined carbs', sub: 'Choose whole grain when possible', badge: 'd' },
  { id: 'oils', label: 'No deep-fried / reused oils', sub: 'Fried food + repeatedly reheated oil + margarine — that\'s the real risk. Normal cooking oil in moderation is fine.', badge: 'd' },
  { id: 'fruit', label: 'Fruit & dates in moderation', sub: 'Max 2–3 whole fruits + 3 dates today — no juice, no smoothies', badge: 'g' },
  { id: 'nfat', label: 'Ate a natural fat today', sub: 'Olive oil, butter, avocado, nuts, eggs — these are your friends', badge: 'g' },
  { id: 'water', label: 'Drank 2L+ water', sub: 'Appetite control + steady energy through long study blocks', badge: 'g' },
  { id: 'sleep', label: 'Slept 7–8 hours', sub: 'Sleep is when your body burns fat and rebuilds muscle', badge: 'g' },
];

const WORKOUT_NORMAL = [
  { id: 'wu', label: 'Warm-up', sub: 'Gentle walking in place — wake the body up', track: 'gen', reps: '2 min' },
  { id: 'slr', label: 'Straight leg raises', sub: 'Lie on back, one leg straight, lift to 45° slowly. Head stays resting on the floor — don\'t lift it to watch the leg. Targets the VMO directly.', track: 'knee', reps: { 1: '2 × 8 each', 2: '3 × 10 each', 3: '3 × 12 each · 3s hold at top' } },
  { id: 'se', label: 'Seated leg extension', sub: 'Sit on chair, straighten one leg, hold. Pure VMO activation, zero pressure on knee joint.', track: 'knee', reps: { 1: '2 × 8 each · 5s hold', 2: '2 × 10 each · 8s hold', 3: '3 × 10 each · 10s hold' } },
  { id: 'clam', label: 'Side-lying leg raises', sub: 'Lie on your side, head resting on your arm or a pillow — never hanging. Top leg straight, lift slowly, lower slower. Glute medius — controls knee tracking from the hip.', track: 'knee', reps: { 1: '2 × 8 each', 2: '2 × 12 each', 3: '3 × 12 each · 2s hold' } },
  { id: 'ws', label: 'Wall sit (gentle)', sub: 'Back on wall, slide down only ~30°. Hold what feels safe. STOP if knee pain.', track: 'knee', reps: { 1: '2 × 10–15s', 2: '2 × 20–30s', 3: '3 × 30–40s' } },
  { id: 'gb', label: 'Glute bridges', sub: 'Lie on back, feet flat, push hips up, squeeze glutes. Shoulders relaxed, never turn your head while hips are up. Strengthens the chain that supports the knee.', track: 'knee', reps: { 1: '2 × 10', 2: '3 × 12', 3: '3 × 15 · 3s squeeze' } },
  { id: 'cr', label: 'Calf raises', sub: 'Stand tall, rise on toes slowly, lower slowly. Helps prevent night leg cramps and builds ankle stability.', track: 'knee', reps: { 1: '2 × 10', 2: '2 × 15', 3: '3 × 15 · slow' } },
  { id: 'row', label: 'Bent-over dumbbell rows', sub: 'One hand on chair, back flat, pull 3kg to your hip, squeeze the shoulder blade. Neck stays in line with your spine — eyes on the floor a step ahead, never crane up. This exercise actively reduces neck pain.', track: 'arm', reps: { 1: '2 × 8 each', 2: '3 × 10 each', 3: '3 × 12 each · 3s down' } },
  { id: 'cu', label: 'Dumbbell bicep curls', sub: '3kg each hand — slow up, slow down, elbows fixed, shoulders down away from your ears (no shrugging)', track: 'arm', reps: { 1: '2 × 8', 2: '3 × 10', 3: '3 × 12 · 3s down' } },
  { id: 'sp', label: 'Seated dumbbell shoulder press', sub: 'Back supported, chin softly tucked, press 3kg up without poking your head forward. SKIP this one on days your neck hurts — it\'s the only exercise here that loads the neck.', track: 'arm', reps: { 1: '2 × 6', 2: '2 × 8', 3: '3 × 8 · slow' } },
  { id: 'ct', label: 'Chin tucks + shoulder blade squeezes', sub: 'Pull chin straight back (make a double chin), hold 3s. Then squeeze shoulder blades together, hold 3s. Strengthens the deep neck muscles that screens and bad pillows switch off — this is your direct neck medicine.', track: 'gen', reps: '2 × 10 each' },
  { id: 'walk20', label: 'Daily walk', sub: 'Easy pace, any time of day, can be split. Knee-friendly cardio — burns more fat than everything above combined, and rebuilds knee capacity.', track: 'gen', reps: '20–30 min' },
  { id: 'st', label: 'Cool-down stretch', sub: 'Quads, hamstrings, calves, chest doorway stretch, ear-to-shoulder neck stretch (30s each side, gentle pull only). Don\'t skip this.', track: 'gen', reps: '3–4 min' },
];

const WORKOUT_FASTING = [
  { id: 'walk', label: 'Gentle walk', sub: 'After iftar only — 5 min easy, no rushing', track: 'gen', reps: '5 min' },
  { id: 'slr', label: 'Straight leg raises', sub: 'Lying down — easy on the body even when fasting', track: 'knee', reps: '1 × 8 each leg' },
  { id: 'clam', label: 'Side-lying leg raises', sub: 'Lying down — keeps the hip work going on light days', track: 'knee', reps: '1 × 8 each side' },
  { id: 'gb', label: 'Glute bridges', sub: 'Lying down, push hips up gently', track: 'knee', reps: '1 × 10' },
  { id: 'cu', label: 'Light dumbbell curls', sub: '8 reps each arm — keep it easy', track: 'arm', reps: '1 × 8' },
  { id: 'st', label: 'Full body stretch', sub: 'Quads, calves, shoulders, neck — hold 30s each', track: 'gen', reps: '3 min' },
];

const BREAKS = [
  { id: 'stand', label: 'Stand up & walk', sub: '1–2 min walk around the room — knees need this every hour' },
  { id: 'squat', label: '10 slow squats', sub: 'Activates the knee support muscles turned off by sitting' },
  { id: 'back', label: 'Back reset', sub: 'Stand tall, hands on lower back, gentle 3-second arch — releases lumbar compression' },
  { id: 'neck', label: 'Chin tucks + gentle neck turns', sub: 'Pull chin straight back 5×, then slow turns side to side + ear-to-shoulder tilts. NO full backward circles — they pinch an irritated neck' },
];

const ACH = [
  { id: 'd1', icon: '🌱', name: 'First step', desc: 'Complete your first day', check: s => s.totalDays >= 1 },
  { id: 's3', icon: '🔥', name: '3-day fire', desc: '3 days streak', check: s => s.bestStreak >= 3 },
  { id: 's7', icon: '⚡', name: 'One full week', desc: '7 days streak', check: s => s.bestStreak >= 7 },
  { id: 's14', icon: '💪', name: 'Two weeks solid', desc: '14 days streak', check: s => s.bestStreak >= 14 },
  { id: 's30', icon: '🏆', name: 'Month warrior', desc: '30 days streak', check: s => s.bestStreak >= 30 },
  { id: 'k1', icon: '⬇️', name: 'First kilo', desc: 'Lost 1 kg (7-day trend)', check: s => s.kgLost >= 1 },
  { id: 'k5', icon: '🎯', name: '5 kg down', desc: 'Lost 5 kg (7-day trend)', check: s => s.kgLost >= 5 },
  { id: 'cf7', icon: '🥗', name: 'Clean week', desc: '7 days with 80%+ food score', check: s => s.cleanFoodDays >= 7 },
  { id: 'w10', icon: '🏋️', name: '10 workouts', desc: 'Completed 10 full workouts', check: s => s.fullWorkoutDays >= 10 },
  { id: 'pf', icon: '✨', name: 'Perfect day', desc: '100% on both food and workout', check: s => s.perfectDays >= 1 },
  { id: 'b3', icon: '🧘', name: 'Break discipline', desc: '3 break rounds in one day', check: s => s.maxBreakRounds >= 3 },
  { id: 'lv2', icon: '📈', name: 'Leveled up', desc: 'Reach Level 2 on knee AND arm', check: s => s.levels && s.levels.knee >= 2 && s.levels.arm >= 2 },
];

const TIPS = [
  "💻 Set your screen's top edge at eye level to prevent strain from long hours of standing/sitting.",
  "💧 Stay hydrated! Drinking water regularly boosts active daily metabolism and brain productivity.",
  "🦒 Do simple chin tucks: Pull your chin straight back like making a double chin to release neck stress.",
  "🚶‍♂️ Take a short walk after main meals. Just 5-10 minutes improves insulin levels and burns fat.",
  "🥗 Eating natural fats like olive oil and avocado helps regulate daily appetite and hormonal levels.",
  "🏋️‍♂️ Level up your knee or arm tracks only when they feel completely pain-free and easy.",
  "💡 Sleep is when muscles repair and weight loss stabilizes. Target 7-8 hours tonight."
];

let _DATA = { 
  days: {}, 
  weights: [], 
  streak: 0, 
  bestStreak: 0, 
  lastDay: null, 
  programStart: null, 
  levels: { knee: 1, arm: 1 }, 
  lastModified: 0,
  xp: 0,
  darkMode: false,
  profile: null
};

let _READY = false;
let _CLOUD_OK = false;

function gs() { return _DATA; }

const hasCloud = () => typeof window !== 'undefined' && window.storage && typeof window.storage.get === 'function';

function isFastingDay(calDay, data) {
  const d = data || gs();
  return !!(d.days[calDay] && d.days[calDay].fasting);
}

function getWorkout(calDay, data) {
  return isFastingDay(calDay, data) ? WORKOUT_FASTING : WORKOUT_NORMAL;
}

function workDen(calDay, data) {
  if (isFastingDay(calDay, data)) return WORKOUT_FASTING.length;
  return calDay < CONTENT_V2 ? LEGACY_WORKOUT_LEN : WORKOUT_NORMAL.length;
}

function mergeData(a, b) {
  if (!a) return b;
  if (!b) return a;
  const am = a.lastModified || 0;
  const bm = b.lastModified || 0;
  let primary, secondary;
  if (am !== bm) {
    primary = am > bm ? a : b;
    secondary = am > bm ? b : a;
  } else {
    const an = Object.keys(a.days || {}).length;
    const bn = Object.keys(b.days || {}).length;
    primary = an >= bn ? a : b;
    secondary = an >= bn ? b : a;
  }
  primary.days = primary.days || {};
  Object.keys(secondary.days || {}).forEach(k => {
    if (!primary.days[k]) primary.days[k] = secondary.days[k];
  });
  primary.weights = primary.weights || [];
  const have = new Set(primary.weights.map(w => w.date));
  (secondary.weights || []).forEach(w => {
    if (!have.has(w.date)) primary.weights.push(w);
  });
  primary.weights.sort((x, y) => x.date.localeCompare(y.date));
  if (!primary.programStart && secondary.programStart) primary.programStart = secondary.programStart;
  if (!primary.levels && secondary.levels) primary.levels = secondary.levels;
  if (!primary.profile && secondary.profile) primary.profile = secondary.profile;
  if (secondary.xp > (primary.xp || 0)) primary.xp = secondary.xp;
  return primary;
}

function smoothedWeights(weights) {
  const sorted = (weights || []).slice().sort((a, b) => a.date.localeCompare(b.date));
  return sorted.map(w => {
    const t = new Date(w.date + 'T12:00:00').getTime();
    const win = sorted.filter(x => {
      const xt = new Date(x.date + 'T12:00:00').getTime();
      return xt <= t && (t - xt) < 7 * 86400000;
    });
    const avg = win.reduce((s, x) => s + x.weight, 0) / win.length;
    return { date: w.date, weight: parseFloat(avg.toFixed(2)) };
  });
}

function trendKgLost(weights) {
  const sm = smoothedWeights(weights);
  if (sm.length < 2) return null;
  return parseFloat((sm[0].weight - sm[sm.length - 1].weight).toFixed(1));
}

function dayScore(dayKey, d) {
  const den = workDen(dayKey);
  const fp = Object.values(d.food || {}).filter(Boolean).length / FOOD.length;
  const wp = Object.values(d.workout || {}).filter(Boolean).length / den;
  if (dayKey >= CONTENT_V2) {
    const bp = Math.min((d.breakRounds || 0) / 3, 1);
    return { fp, wp, bp, avg: (fp + wp + bp) / 3 };
  }
  return { fp, wp, bp: null, avg: (fp + wp) / 2 };
}

function calcStats(data) {
  const weights = (data.weights || []).slice().sort((a, b) => a.date.localeCompare(b.date));
  const keys = Object.keys(data.days).sort();
  let totalDays = keys.length;
  let fullWorkoutDays = 0;
  let cleanFoodDays = 0;
  let perfectDays = 0;
  let totalPct = 0;
  let maxBreakRounds = 0;
  keys.forEach(day => {
    const d = data.days[day];
    const s = dayScore(day, d);
    totalPct += s.avg;
    if (s.wp >= 0.8) fullWorkoutDays++;
    if (s.fp >= 0.8) cleanFoodDays++;
    if (s.fp === 1 && s.wp === 1) perfectDays++;
    if ((d.breakRounds || 0) > maxBreakRounds) maxBreakRounds = d.breakRounds || 0;
  });
  const kgLost = trendKgLost(weights) || 0;
  const avgPct = totalDays ? Math.round(totalPct / totalDays * 100) : 0;
  return { totalDays, kgLost, avgPct, fullWorkoutDays, cleanFoodDays, perfectDays, maxBreakRounds, bestStreak: data.bestStreak || 0, weights, keys, levels: data.levels };
}

// ── Browser-only code below ────────────────────────────────────────────────
if (typeof window !== 'undefined' && typeof document !== 'undefined') {

let _syncTimer = null;
let _pendingSync = false;

async function loadCloud() {
  if (!hasCloud()) return;
  let cloudData = null;
  try {
    const r = await window.storage.get('shaper_v2');
    if (r && r.value) {
      cloudData = typeof r.value === 'string' ? JSON.parse(r.value) : r.value;
      _CLOUD_OK = true;
    }
  } catch (e) { /* key missing first time — expected */ }

  if (cloudData) {
    _DATA = mergeData(_DATA, cloudData) || _DATA;
    if (!_DATA.levels) _DATA.levels = { knee: 1, arm: 1 };
  }

  try {
    await window.storage.set('shaper_v2', JSON.stringify(_DATA));
    _CLOUD_OK = true;
  } catch (e) {
    await new Promise(r => setTimeout(r, 2500));
    try {
      await window.storage.set('shaper_v2', JSON.stringify(_DATA));
      _CLOUD_OK = true;
    } catch (e2) {
      _CLOUD_OK = false;
      console.warn('Cloud storage write failed twice — using localStorage only for now. Reason:', e2 && e2.message);
    }
  }
  try { localStorage.setItem('shaper_v2', JSON.stringify(_DATA)); } catch (e) { /* ignore */ }

  updateStorageStatus();
}

function updateStorageStatus() {
  const el = document.getElementById('storage-status');
  if (!el) return;
  if (_CLOUD_OK) {
    el.innerHTML = '<span style="color:var(--gr)">●</span> Cloud-synced · also saved locally';
  } else if (hasCloud()) {
    el.innerHTML = '<span style="color:var(--yw)">●</span> Cloud sync unavailable · saved locally only · <strong>export weekly</strong>';
  } else {
    el.innerHTML = '<span style="color:var(--mu)">●</span> Saved to this browser · <strong>export weekly</strong>';
  }
}

function scheduleCloudSync() {
  if (!hasCloud()) return;
  _pendingSync = true;
  clearTimeout(_syncTimer);
  _syncTimer = setTimeout(() => flushCloudSync(false), 1500);
}

async function flushCloudSync(isRetry) {
  if (!hasCloud() || !_pendingSync) return;
  try {
    await window.storage.set('shaper_v2', JSON.stringify(_DATA));
    _pendingSync = false;
    if (!_CLOUD_OK) { _CLOUD_OK = true; updateStorageStatus(); }
  } catch (e) {
    if (!isRetry) {
      setTimeout(() => flushCloudSync(true), 4000);
    } else {
      if (_CLOUD_OK) { _CLOUD_OK = false; updateStorageStatus(); }
      console.warn('Cloud sync failed twice — data is SAFE in localStorage. Reason:', e && e.message);
    }
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && _pendingSync) {
    clearTimeout(_syncTimer);
    flushCloudSync(true);
  }
});

function ss(d) {
  d.lastModified = Date.now();
  _DATA = d;
  try { localStorage.setItem('shaper_v2', JSON.stringify(d)); } catch (e) { /* ignore */ }
  scheduleCloudSync();
}

function exportData() {
  const data = gs();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const today = new Date().toISOString().split('T')[0];
  const a = document.createElement('a');
  a.href = url;
  a.download = 'shaper-backup-' + today + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  try { navigator.clipboard.writeText(JSON.stringify(data)); } catch (e) { /* ignore */ }
  const btn = document.getElementById('export-btn');
  if (btn) {
    const o = btn.textContent;
    btn.textContent = '✓ Downloaded + copied';
    setTimeout(() => { btn.textContent = o; }, 2500);
  }
}

function importDataFromText(text) {
  try {
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== 'object') throw new Error('Invalid format');
    if (!parsed.days || !Array.isArray(parsed.weights)) throw new Error('Not a tracker backup');
    ss(parsed);
    location.reload();
  } catch (e) {
    alert('Could not import: ' + e.message);
  }
}

function importData() {
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = '.json,application/json,text/plain';
  inp.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = ev => importDataFromText(ev.target.result);
    r.readAsText(file);
  };
  inp.click();
}

function importFromPaste() {
  const text = prompt('Paste your backup data here:');
  if (text) importDataFromText(text);
}

function gd(data, day) {
  if (!data.days[day]) data.days[day] = { food: {}, workout: {}, breaks: {}, water: 0, waterLog: [], meals: [] };
  return data.days[day];
}

function switchTab(t) {
  document.querySelectorAll('.tab').forEach((el, i) => {
    el.classList.toggle('active', (i === 0 && t === 'today') || (i === 1 && t === 'progress') || (i === 2 && t === 'profile'));
  });
  
  // Mobile Nav active highlights
  document.querySelectorAll('.bottom-nav-item').forEach(el => el.classList.remove('active'));
  const activeMob = document.getElementById(`nav-item-${t}`);
  if (activeMob) activeMob.classList.add('active');

  document.getElementById('page-today').classList.toggle('active', t === 'today');
  document.getElementById('page-progress').classList.toggle('active', t === 'progress');
  const profilePage = document.getElementById('page-profile');
  if (profilePage) profilePage.classList.toggle('active', t === 'profile');

  if (t === 'progress') renderProgress();
  if (t === 'profile') renderProfile();
}

function shiftDay(delta) {
  const _nd = new Date(currentDay + 'T12:00:00');
  _nd.setDate(_nd.getDate() + delta);
  const next = `${_nd.getFullYear()}-${String(_nd.getMonth() + 1).padStart(2, '0')}-${String(_nd.getDate()).padStart(2, '0')}`;
  if (next > TODAY) return;
  currentDay = next;
  renderToday();
}

function goToday() { currentDay = TODAY; renderToday(); }

function renderNav() {
  const d = new Date(currentDay + 'T12:00:00');
  const isToday = currentDay === TODAY;
  document.getElementById('nav-dayname').textContent = d.toLocaleDateString('en-US', { weekday: 'long' });
  document.getElementById('nav-datestr').textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  document.getElementById('next-btn').disabled = isToday;
  document.getElementById('today-tag').style.display = isToday ? 'none' : 'inline';
}

function getLevels() {
  const d = gs();
  if (!d.levels) d.levels = { knee: 1, arm: 1 };
  return d.levels;
}

function setLevel(track, n) {
  const d = gs();
  if (!d.levels) d.levels = { knee: 1, arm: 1 };
  d.levels[track] = n;
  ss(d);
  renderProgramBanner();
  renderChecklist(getWorkout(currentDay), 'work-list', 'workout');
  awardXP(10, `Set ${track} Level to ${n}`);
}

function getProgramLabel(calDay) {
  const data = gs();
  if (!data.programStart) return null;
  const start = new Date(data.programStart + 'T12:00:00');
  const target = new Date(calDay + 'T12:00:00');
  const pd = Math.round((target - start) / (1000 * 60 * 60 * 24)) + 1;
  if (pd < 1) return null;
  const wk = Math.ceil(pd / 7);
  const dy = ((pd - 1) % 7) + 1;
  return 'Week ' + wk + ' · Day ' + dy;
}

function repsFor(item) {
  if (!item.reps) return item.badge === 'd' ? 'avoid' : 'do it';
  if (typeof item.reps === 'string') return item.reps;
  const lv = getLevels()[item.track] || 1;
  return item.reps[lv] || item.reps[1];
}

function renderChecklist(items, cid, cat) {
  const data = gs();
  const day = gd(data, currentDay);
  const checked = day[cat] || {};
  const el = document.getElementById(cid);
  if (!el) return;
  el.innerHTML = '';
  let done = 0;
  items.forEach(item => {
    const ok = !!checked[item.id];
    if (ok) done++;
    const div = document.createElement('div');
    div.className = 'ci' + (ok ? ' done' : '');
    div.onclick = () => toggleItem(item.id, cat);
    let bc = 'wb';
    if (item.badge === 'd') bc = 'db';
    else if (item.badge === 'g') bc = 'gb';
    else if (item.track === 'knee') bc = 'kb';
    else if (item.track === 'arm') bc = 'ab';
    const bl = repsFor(item);
    div.innerHTML = `<div class="cbox">${ok ? '✓' : ''}</div><div style="flex:1"><div class="itext">${item.label}</div><div class="isub">${item.sub}</div></div><div class="ibadge ${bc}">${bl}</div>`;
    el.appendChild(div);
  });
  const pct = Math.round(done / items.length * 100);
  if (cat === 'food') {
    const progEl = document.getElementById('food-prog');
    const pctEl = document.getElementById('food-pct');
    const barEl = document.getElementById('food-bar');
    if (progEl) progEl.textContent = `${done} / ${items.length}`;
    if (pctEl) pctEl.textContent = pct + '%';
    if (barEl) barEl.style.width = pct + '%';
  } else {
    const progEl = document.getElementById('work-prog');
    const pctEl = document.getElementById('work-pct');
    const barEl = document.getElementById('work-bar');
    if (progEl) progEl.textContent = `${done} / ${items.length}`;
    if (pctEl) pctEl.textContent = pct + '%';
    if (barEl) barEl.style.width = pct + '%';
  }
}

function toggleItem(id, cat) {
  const data = gs();
  const day = gd(data, currentDay);
  day[cat][id] = !day[cat][id];
  
  // Award / Deduct XP
  const isChecked = day[cat][id];
  const xpAmount = isChecked ? (cat === 'workout' ? 15 : 10) : (cat === 'workout' ? -15 : -10);
  awardXP(xpAmount, isChecked ? `Checked ${id}` : `Unchecked ${id}`);
  
  // Full checklist bonus
  const itemsList = cat === 'food' ? FOOD : getWorkout(currentDay);
  const totalChecked = Object.values(day[cat] || {}).filter(Boolean).length;
  if (isChecked && totalChecked === itemsList.length) {
    awardXP(50, `Completed whole ${cat} list!`);
    triggerConfetti();
  }

  computeStreak(data);
  ss(data);
  renderChecklist(cat === 'food' ? FOOD : getWorkout(currentDay), cat === 'food' ? 'food-list' : 'work-list', cat);
  document.getElementById('streak-num').textContent = data.streak || 0;
  updateKgLost(data);
}

function computeStreak(data) {
  const keys = Object.keys(data.days).sort();
  let streak = 0;
  let best = data.bestStreak || 0;
  let last = null;
  keys.forEach(day => {
    const d = data.days[day];
    const den = workDen(day);
    const fp = Object.values(d.food || {}).filter(Boolean).length / FOOD.length;
    const wp = Object.values(d.workout || {}).filter(Boolean).length / den;
    if (fp >= 0.6 && wp >= 0.6) {
      if (last) {
        const p = new Date(last + 'T12:00:00');
        p.setDate(p.getDate() + 1);
        streak = p.toISOString().split('T')[0] === day ? streak + 1 : 1;
      } else {
        streak = 1;
      }
      last = day;
      if (streak > best) best = streak;
    } else if (last && day > last) {
      streak = 0;
    }
  });
  const yst = new Date(TODAY + 'T12:00:00');
  yst.setDate(yst.getDate() - 1);
  if (last !== TODAY && last !== yst.toISOString().split('T')[0]) streak = 0;
  data.streak = streak;
  data.bestStreak = best;
}

function updateKgLost(data) {
  const lost = trendKgLost(data.weights);
  if (lost === null) { document.getElementById('total-lost').textContent = '–'; return; }
  document.getElementById('total-lost').textContent = lost > 0 ? '-' + lost : lost < 0 ? '+' + Math.abs(lost) : '0';
}

function logWeight() {
  const input = document.getElementById('wt-input');
  const val = parseFloat(input.value);
  if (isNaN(val) || val < 30 || val > 300) return;
  const data = gs();
  if (!data.weights) data.weights = [];
  const idx = data.weights.findIndex(w => w.date === currentDay);
  if (idx >= 0) data.weights[idx].weight = val;
  else data.weights.push({ date: currentDay, weight: val });
  data.weights.sort((a, b) => a.date.localeCompare(b.date));
  
  awardXP(20, 'Logged current weight');
  
  // If target weight is set and reached
  if (data.profile && Math.abs(val - data.profile.targetWeight) < 0.2) {
    awardXP(100, 'Reached target weight goal!');
    triggerConfetti();
  }

  ss(data);
  input.value = '';
  renderWeightEntries(data);
  updateKgLost(data);
}

function deleteWeight(date) {
  const data = gs();
  data.weights = data.weights.filter(w => w.date !== date);
  ss(data);
  renderWeightEntries(data);
  updateKgLost(data);
}

function renderWeightEntries(data) {
  const weights = (data.weights || []).slice().reverse();
  const el = document.getElementById('wt-entries');
  const disp = document.getElementById('wt-display');
  if (!el || !disp) return;
  if (!weights.length) {
    el.innerHTML = '<div class="nodata">No weight logged yet</div>';
    disp.textContent = '–';
    return;
  }
  disp.textContent = weights[0].weight + ' kg';
  el.innerHTML = '';
  weights.slice(0, 5).forEach((w, i) => {
    const prev = weights[i + 1];
    const diff = prev ? parseFloat((w.weight - prev.weight).toFixed(1)) : null;
    const dh = diff !== null ? `<span class="ediff ${diff < 0 ? 'down' : 'up'}">${diff < 0 ? '↓' : '↑'}${Math.abs(diff)}</span>` : '<span class="ediff" style="color:var(--mu)">—</span>';
    const row = document.createElement('div');
    row.className = 'wentry';
    row.innerHTML = `<span class="edate">${w.date}</span><span class="ewt">${w.weight} kg</span>${dh}<button class="delbtn" onclick="deleteWeight('${w.date}')">✕</button>`;
    el.appendChild(row);
  });
}

// ── XP & Gamification System ───────────────────────────────────────────────
function updateXPDisplay() {
  const data = gs();
  const xp = data.xp || 0;
  const level = Math.floor(xp / 200) + 1;
  const currentXPInLevel = xp % 200;
  const xpPct = (currentXPInLevel / 200) * 100;
  
  const badge = document.getElementById('xp-level-badge');
  const bar = document.getElementById('xp-bar-fill');
  if (badge) badge.textContent = `Lv ${level}`;
  if (bar) bar.style.width = `${xpPct}%`;

  const profXP = document.getElementById('prof-xp');
  const profLvlTitle = document.getElementById('prof-level-title');
  if (profXP) profXP.textContent = xp;
  if (profLvlTitle) {
    let title = "Initiate";
    if (level >= 15) title = "Postural Master";
    else if (level >= 10) title = "Home Workouts Sage";
    else if (level >= 6) title = "Desksitter Warrior";
    else if (level >= 3) title = "Active Achiever";
    profLvlTitle.textContent = `Lv ${level} ${title}`;
  }
}

function awardXP(amount, reason) {
  const data = gs();
  const beforeLevel = Math.floor((data.xp || 0) / 200) + 1;
  data.xp = Math.max(0, (data.xp || 0) + amount);
  const afterLevel = Math.floor(data.xp / 200) + 1;
  
  ss(data);
  updateXPDisplay();

  const pop = document.getElementById('xp-popup');
  const txt = document.getElementById('xp-popup-text');
  if (pop && txt) {
    txt.textContent = `${amount > 0 ? '+' : ''}${amount} XP (${reason})`;
    pop.classList.add('show');
    clearTimeout(window.xpTimeout);
    window.xpTimeout = setTimeout(() => {
      pop.classList.remove('show');
    }, 2500);
  }

  if (afterLevel > beforeLevel) {
    triggerConfetti();
    setTimeout(() => {
      alert(`🎉 Level Up! You reached Level ${afterLevel}! Keep shaping your daily health.`);
    }, 500);
  }
}

// ── Water Tracking Logic ───────────────────────────────────────────────────
function addWater(amount) {
  const data = gs();
  const day = gd(data, currentDay);
  if (!day.waterLog) day.waterLog = [];
  day.waterLog.push(amount);
  const beforeWater = day.water || 0;
  day.water = beforeWater + amount;
  
  const waterGoal = data.profile ? data.profile.waterGoal : 2000;
  if (beforeWater < waterGoal && day.water >= waterGoal) {
    awardXP(30, 'Reached daily water goal!');
    triggerConfetti();
  } else {
    awardXP(5, 'Logged water hydration');
  }

  ss(data);
  renderWaterSection();
}

function addWaterCustom() {
  const input = document.getElementById('water-custom');
  if (!input) return;
  const val = parseInt(input.value);
  if (isNaN(val) || val <= 0) return;
  addWater(val);
  input.value = '';
}

function undoWater() {
  const data = gs();
  const day = gd(data, currentDay);
  if (!day.waterLog || day.waterLog.length === 0) return;
  const last = day.waterLog.pop();
  day.water = Math.max(0, (day.water || 0) - last);
  
  awardXP(-5, 'Undone hydration log');
  ss(data);
  renderWaterSection();
}

function renderWaterSection() {
  const data = gs();
  const day = gd(data, currentDay);
  const water = day.water || 0;
  const goal = data.profile ? data.profile.waterGoal : 2000;
  
  const progEl = document.getElementById('water-prog');
  const amountEl = document.getElementById('water-amount');
  const ringEl = document.getElementById('water-ring');
  
  if (progEl) progEl.textContent = `${water} / ${goal} ml`;
  if (amountEl) amountEl.textContent = water;
  if (ringEl) {
    const pct = Math.min(water / goal, 1);
    ringEl.style.strokeDashoffset = 238.76 * (1 - pct);
  }
}

// ── Calorie & Nutrition tracking ───────────────────────────────────────────
function addMeal() {
  const select = document.getElementById('cal-meal-type');
  const nameInput = document.getElementById('cal-meal-name');
  const calsInput = document.getElementById('cal-meal-cals');
  if (!select || !nameInput || !calsInput) return;

  const type = select.value;
  const name = nameInput.value.trim() || type.toUpperCase();
  const cals = parseInt(calsInput.value);
  if (isNaN(cals) || cals <= 0) return;

  const data = gs();
  const day = gd(data, currentDay);
  if (!day.meals) day.meals = [];
  day.meals.push({
    id: Date.now() + Math.random(),
    type,
    name,
    cals
  });
  
  awardXP(10, `Logged meal: ${name}`);
  ss(data);
  
  nameInput.value = '';
  calsInput.value = '';
  renderCalorieSection();
}

function deleteMeal(mealId) {
  const data = gs();
  const day = gd(data, currentDay);
  if (!day.meals) return;
  const meal = day.meals.find(m => m.id === mealId);
  const cals = meal ? meal.cals : 0;
  day.meals = day.meals.filter(m => m.id !== mealId);
  
  awardXP(-10, 'Deleted meal entry');
  ss(data);
  renderCalorieSection();
}

function renderCalorieSection() {
  const data = gs();
  const day = gd(data, currentDay);
  const target = data.profile ? data.profile.calorieTarget : 2200;
  const meals = day.meals || [];
  const foodCals = meals.reduce((sum, m) => sum + m.cals, 0);
  
  // Calculate burn from workouts: let's say 200 cals for a done workout checklist item
  const workoutCheckedCount = Object.values(day.workout || {}).filter(Boolean).length;
  const workoutBurn = workoutCheckedCount * 25; // 25 kcal per workout item done

  const left = Math.max(0, target - foodCals + workoutBurn);
  
  const progEl = document.getElementById('cal-prog');
  const remEl = document.getElementById('cal-remaining');
  const ringEl = document.getElementById('cal-ring');
  const breakdownEl = document.getElementById('cal-breakdown');
  const listEl = document.getElementById('cal-meals-list');

  if (progEl) progEl.textContent = `${foodCals} / ${target} kcal`;
  if (remEl) remEl.textContent = left;
  if (ringEl) {
    const pct = Math.min(foodCals / target, 1);
    ringEl.style.strokeDashoffset = 213.63 * (1 - pct);
  }
  if (breakdownEl) {
    breakdownEl.innerHTML = `Target: ${target} kcal<br>Logged: ${foodCals} kcal<br>Workout burn: ${workoutBurn} kcal`;
  }
  if (listEl) {
    listEl.innerHTML = '';
    if (meals.length === 0) {
      listEl.innerHTML = '<div style="font-size: 11px; color: var(--mu); font-family: monospace;">No meals logged today</div>';
    } else {
      meals.forEach(m => {
        const item = document.createElement('div');
        item.className = 'cal-meal-item';
        let emoji = '🍏';
        if (m.type === 'breakfast') emoji = '🌅';
        else if (m.type === 'lunch') emoji = '☀️';
        else if (m.type === 'dinner') emoji = '🌙';
        else if (m.type === 'snack') emoji = '🍎';
        
        item.innerHTML = `
          <div class="cal-meal-info">
            <span>${emoji}</span>
            <div>
              <strong>${m.name}</strong>
              <div style="font-size: 10px; color: var(--mu); text-transform: uppercase;">${m.type}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-family: monospace; font-weight: 700;">${m.cals} kcal</span>
            <button class="cal-meal-delete" onclick="deleteMeal(${m.id})">✕</button>
          </div>
        `;
        listEl.appendChild(item);
      });
    }
  }
}

// ── Daily tips ─────────────────────────────────────────────────────────────
function renderDailyTip() {
  const data = gs();
  const day = gd(data, currentDay);
  const tipEl = document.getElementById('daily-tip');
  if (!tipEl) return;
  
  if (day.tipDismissed) {
    tipEl.style.display = 'none';
    return;
  }
  
  tipEl.style.display = 'flex';
  const dayNum = new Date(currentDay + 'T12:00:00').getDate();
  const tipIdx = dayNum % TIPS.length;
  const textEl = document.getElementById('tip-text');
  if (textEl) textEl.textContent = TIPS[tipIdx];
}

function dismissTip() {
  const data = gs();
  const day = gd(data, currentDay);
  day.tipDismissed = true;
  ss(data);
  const tipEl = document.getElementById('daily-tip');
  if (tipEl) tipEl.style.display = 'none';
}

// ── Onboarding / Profile Setup Wizard ──────────────────────────────────────
function showOnboarding() {
  const overlay = document.getElementById('onboarding-overlay');
  if (!overlay) return;
  overlay.classList.add('active');
  nextOnboardingStep(1);
  // Pre-fill profile info if exists
  const data = gs();
  if (data.profile) {
    document.getElementById('on-name').value = data.profile.name || '';
    document.getElementById('on-age').value = data.profile.age || '';
    document.getElementById('on-gender').value = data.profile.gender || 'male';
    document.getElementById('on-height').value = data.profile.height || '';
    document.getElementById('on-weight').value = data.profile.weight || '';
    document.getElementById('on-target-weight').value = data.profile.targetWeight || '';
    document.getElementById('on-knee-lvl').value = data.profile.kneeLvl || 1;
    document.getElementById('on-arm-lvl').value = data.profile.armLvl || 1;
    onSelectedActivity = data.profile.activity || 'sedentary';
    document.querySelectorAll('#group-activity .onboarding-radio').forEach(r => {
      r.classList.toggle('selected', r.getAttribute('onclick').includes(`'${onSelectedActivity}'`));
    });
    const goals = data.profile.goals || [];
    document.getElementById('goal-chk-weight').checked = goals.includes('Lose weight');
    document.getElementById('goal-chk-posture').checked = goals.includes('Better posture');
    document.getElementById('goal-chk-energy').checked = goals.includes('Daily energy');
    document.getElementById('goal-chk-hydration').checked = goals.includes('Hydration habit');
  }
}

function nextOnboardingStep(n) {
  document.querySelectorAll('.onboarding-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.onboarding-dot').forEach(d => d.classList.remove('active'));
  
  const step = document.getElementById(`onstep-${n}`);
  const dot = document.getElementById(`ondot-${n}`);
  if (step) step.classList.add('active');
  if (dot) dot.classList.add('active');
}

function validateStep2() {
  const name = document.getElementById('on-name').value.trim();
  const age = parseInt(document.getElementById('on-age').value);
  if (!name || isNaN(age) || age < 1 || age > 120) {
    alert('Please enter a valid name and biological age.');
    return;
  }
  nextOnboardingStep(3);
}

function validateStep3() {
  const h = parseFloat(document.getElementById('on-height').value);
  const w = parseFloat(document.getElementById('on-weight').value);
  const tw = parseFloat(document.getElementById('on-target-weight').value);
  if (isNaN(h) || h < 80 || h > 250 || isNaN(w) || w < 20 || w > 300 || isNaN(tw) || tw < 20 || tw > 300) {
    alert('Please enter realistic height, current weight, and target weight values.');
    return;
  }
  nextOnboardingStep(4);
}

let onSelectedActivity = 'sedentary';
function selectRadio(type, value, el) {
  if (type === 'activity') {
    onSelectedActivity = value;
    document.querySelectorAll('#group-activity .onboarding-radio').forEach(r => r.classList.remove('selected'));
    el.classList.add('selected');
  }
}

function completeOnboarding() {
  const name = document.getElementById('on-name').value.trim();
  const age = parseInt(document.getElementById('on-age').value);
  const gender = document.getElementById('on-gender').value;
  const height = parseFloat(document.getElementById('on-height').value);
  const weight = parseFloat(document.getElementById('on-weight').value);
  const targetWeight = parseFloat(document.getElementById('on-target-weight').value);
  const kneeLvl = parseInt(document.getElementById('on-knee-lvl').value);
  const armLvl = parseInt(document.getElementById('on-arm-lvl').value);
  
  // Calculate BMR & TDEE
  let bmr = 0;
  if (gender === 'male') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }
  bmr = Math.round(bmr);

  let multiplier = 1.2;
  if (onSelectedActivity === 'lightly') multiplier = 1.375;
  else if (onSelectedActivity === 'moderately') multiplier = 1.55;
  const tdee = Math.round(bmr * multiplier);

  // Calorie target (if lose weight chosen, subtract 500 kcal, baseline at 1200 / 1500)
  const goalWeight = document.getElementById('goal-chk-weight').checked;
  let calorieTarget = goalWeight ? tdee - 500 : tdee;
  const baseline = gender === 'female' ? 1200 : 1500;
  if (calorieTarget < baseline) calorieTarget = baseline;

  // Water goal: 35ml per kg of weight
  const waterGoal = Math.round(weight * 35);

  const bmi = parseFloat((weight / ((height / 100) ** 2)).toFixed(1));

  const goals = [];
  if (document.getElementById('goal-chk-weight').checked) goals.push('Lose weight');
  if (document.getElementById('goal-chk-posture').checked) goals.push('Better posture');
  if (document.getElementById('goal-chk-energy').checked) goals.push('Daily energy');
  if (document.getElementById('goal-chk-hydration').checked) goals.push('Hydration habit');

  const data = gs();
  
  // Onboarding reward
  const firstTime = !data.profile;
  
  data.profile = {
    name, age, gender, height, weight, targetWeight,
    activity: onSelectedActivity, kneeLvl, armLvl, goals,
    bmi, bmr, tdee, calorieTarget, waterGoal
  };

  data.levels = { knee: kneeLvl, arm: armLvl };

  if (firstTime) {
    data.xp = (data.xp || 0) + 100; // Welcome reward
  }

  ss(data);

  // Hide overlay
  const overlay = document.getElementById('onboarding-overlay');
  if (overlay) overlay.classList.remove('active');

  // Trigger celebration
  triggerConfetti();
  
  // Reload updates
  renderToday();
  updateXPDisplay();
  renderProfile();
}

function renderProfile() {
  const data = gs();
  if (!data.profile) return;
  
  const nameEl = document.getElementById('profile-name');
  const bmiEl = document.getElementById('prof-bmi');
  const bmiBadgeEl = document.getElementById('prof-bmi-badge');
  const bmrEl = document.getElementById('prof-bmr');
  const tdeeEl = document.getElementById('prof-tdee');
  const calEl = document.getElementById('prof-target-cal');
  const waterEl = document.getElementById('prof-water-goal');

  if (nameEl) nameEl.textContent = data.profile.name;
  if (bmiEl) bmiEl.textContent = data.profile.bmi;
  if (bmiBadgeEl) {
    const bmiVal = data.profile.bmi;
    let desc = "Normal";
    if (bmiVal < 18.5) desc = "Underweight";
    else if (bmiVal >= 30) desc = "Obese";
    else if (bmiVal >= 25) desc = "Overweight";
    bmiBadgeEl.textContent = desc;
  }
  if (bmrEl) bmrEl.textContent = data.profile.bmr;
  if (tdeeEl) tdeeEl.textContent = data.profile.tdee;
  if (calEl) calEl.textContent = data.profile.calorieTarget;
  if (waterEl) waterEl.textContent = data.profile.waterGoal;
  
  updateXPDisplay();
}

// ── Theme Management ────────────────────────────────────────────────────────
function toggleDarkMode() {
  const data = gs();
  data.darkMode = !data.darkMode;
  ss(data);
  renderTheme();
}

function renderTheme() {
  const data = gs();
  const isDark = !!data.darkMode;
  document.body.classList.toggle('dark', isDark);
  
  const toggleBtn = document.getElementById('dark-mode-toggle');
  if (toggleBtn) {
    toggleBtn.classList.toggle('on', isDark);
  }
}

// ── Progress & Charts Page overrides ───────────────────────────────────────
function renderProgress() {
  const data = gs();
  const s = calcStats(data);
  document.getElementById('p-days').textContent = s.totalDays;
  document.getElementById('p-days-sub').textContent = s.totalDays ? 'since ' + s.keys[0] : 'no data yet';
  document.getElementById('p-bstreak').textContent = s.bestStreak;
  if (s.weights.length >= 2) {
    document.getElementById('p-lost').textContent = (s.kgLost > 0 ? '-' : s.kgLost < 0 ? '+' : '') + Math.abs(s.kgLost) + ' kg';
    document.getElementById('p-lost-sub').textContent = s.weights[0].weight + ' → ' + s.weights[s.weights.length - 1].weight + ' kg raw';
  } else {
    document.getElementById('p-lost').textContent = '–';
    document.getElementById('p-lost-sub').textContent = 'log weight to track';
  }
  document.getElementById('p-avg').textContent = s.avgPct + '%';
  document.getElementById('p-avg-sub').textContent = s.avgPct >= 70 ? 'excellent pace' : 'keep pushing';
  renderWeightChart(s.weights);
  renderComplianceChart(data);
  renderWaterHistoryChart(data);
  renderHeatmap(data);
  renderInsight(s);
  renderAchievements(s);
}

function renderWeightChart(weights) {
  const el = document.getElementById('wt-chart');
  if (!el) return;
  if (weights.length < 2) { el.innerHTML = '<div class="nodata">Need at least 2 weight entries to draw chart</div>'; return; }
  const smooth = smoothedWeights(weights);
  const vals = weights.map(w => w.weight);
  const minV = Math.min(...vals) - 0.5;
  const maxV = Math.max(...vals) + 0.5;
  const range = maxV - minV;
  const W = 540;
  const H = 100;
  const pad = 22;
  const pts = vals.map((v, i) => ({ x: pad + (i / (vals.length - 1)) * (W - pad * 2), y: pad + ((maxV - v) / range) * (H - pad * 2), v, date: weights[i].date }));
  const spts = smooth.map((w, i) => ({ x: pad + (i / (smooth.length - 1)) * (W - pad * 2), y: pad + ((maxV - w.weight) / range) * (H - pad * 2) }));
  const poly = pts.map(p => `${p.x},${p.y}`).join(' ');
  const spoly = spts.map(p => `${p.x},${p.y}`).join(' ');
  const area = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ` L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`;
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:90px">
    <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#7c5cd6" stop-opacity="0.18"/><stop offset="100%" stop-color="#7c5cd6" stop-opacity="0"/></linearGradient></defs>
    <path d="${area}" fill="url(#wg)"/>
    <polyline points="${poly}" fill="none" stroke="#7c5cd6" stroke-width="1.5" stroke-opacity="0.4" stroke-linejoin="round" stroke-linecap="round"/>
    <polyline points="${spoly}" fill="none" stroke="#e2407e" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    ${pts.map(p => `<circle cx="${p.x}" cy="${p.y}" r="2.5" fill="#7c5cd6"><title>${p.date}: ${p.v} kg</title></circle>`).join('')}
    <text x="${pts[0].x}" y="${H - 3}" font-size="9" fill="#a9849a" font-family="Space Mono,monospace">${weights[0].date.slice(5)}</text>
    <text x="${pts[pts.length - 1].x}" y="${H - 3}" font-size="9" fill="#a9849a" font-family="Space Mono,monospace" text-anchor="end">${weights[weights.length - 1].date.slice(5)}</text>
    <text x="${W - 2}" y="${pad + 4}" font-size="9" fill="#a9849a" font-family="Space Mono,monospace" text-anchor="end">${maxV.toFixed(1)}</text>
    <text x="${W - 2}" y="${H - pad + 10}" font-size="9" fill="#a9849a" font-family="Space Mono,monospace" text-anchor="end">${minV.toFixed(1)}</text>
  </svg>
  <div style="display:flex;gap:12px;margin-top:6px">
    <span style="display:flex;align-items:center;gap:4px"><span style="width:14px;height:2px;background:#7c5cd6;opacity:.4;display:inline-block"></span><span style="font-size:9px;color:#a9849a;font-family:'Space Mono',monospace">daily (noisy)</span></span>
    <span style="display:flex;align-items:center;gap:4px"><span style="width:14px;height:2px;background:#e2407e;display:inline-block"></span><span style="font-size:9px;color:#a9849a;font-family:'Space Mono',monospace">7-day trend</span></span>
  </div>`;
}

function renderComplianceChart(data) {
  const el = document.getElementById('comp-chart');
  if (!el) return;
  const last14 = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(TODAY + 'T12:00:00');
    d.setDate(d.getDate() - i);
    last14.push(d.toISOString().split('T')[0]);
  }
  if (!last14.some(day => data.days[day])) { el.innerHTML = '<div class="nodata">No data in the last 14 days</div>'; return; }
  const bars = last14.map(day => {
    const d = data.days[day];
    if (!d) return { day, fp: 0, wp: 0, bp: day >= CONTENT_V2 ? 0 : null };
    const s = dayScore(day, d);
    return { day, fp: Math.round(s.fp * 100), wp: Math.round(s.wp * 100), bp: s.bp === null ? null : Math.round(s.bp * 100) };
  });
  el.innerHTML = `<div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;flex-wrap:wrap">
    <span style="width:8px;height:8px;border-radius:2px;background:var(--gr);display:inline-block"></span><span style="font-size:10px;color:var(--mu);font-family:'Space Mono',monospace">Food</span>
    <span style="width:8px;height:8px;border-radius:2px;background:var(--bl);display:inline-block;margin-left:6px"></span><span style="font-size:10px;color:var(--mu);font-family:'Space Mono',monospace">Workout</span>
    <span style="width:8px;height:8px;border-radius:2px;background:var(--yw);display:inline-block;margin-left:6px"></span><span style="font-size:10px;color:var(--mu);font-family:'Space Mono',monospace">Breaks</span>
  </div><div class="barwrap">${bars.map(b => {
    const short = new Date(b.day + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'narrow' });
    const breakBar = b.bp === null ? '' : `<div class="bar-fill" style="width:6px;background:var(--yw);height:${b.bp * 0.7}px"></div>`;
    return `<div class="bar-col"><div style="display:flex;gap:2px;height:70px;align-items:flex-end"><div class="bar-fill" style="width:6px;background:var(--gr);height:${b.fp * 0.7}px"></div><div class="bar-fill" style="width:6px;background:var(--bl);height:${b.wp * 0.7}px"></div>${breakBar}</div><div class="bar-lbl">${short}</div></div>`;
  }).join('')}</div>`;
}

function renderWaterHistoryChart(data) {
  const el = document.getElementById('water-chart');
  if (!el) return;
  const last7 = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(TODAY + 'T12:00:00');
    d.setDate(d.getDate() - i);
    last7.push(d.toISOString().split('T')[0]);
  }
  const hasWater = last7.some(day => data.days[day] && data.days[day].water > 0);
  if (!hasWater) {
    el.innerHTML = '<div class="nodata">No water logs in the last 7 days</div>';
    return;
  }
  const maxGoal = data.profile ? data.profile.waterGoal : 2000;
  const bars = last7.map(day => {
    const d = data.days[day];
    const w = d ? d.water || 0 : 0;
    const pct = Math.min(w / maxGoal, 1.2); // allow overflow bar
    return { day, ml: w, pct: Math.round(pct * 100) };
  });

  el.innerHTML = `
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
      <span style="width:8px;height:8px;border-radius:2px;background:var(--water);display:inline-block"></span>
      <span style="font-size:10px;color:var(--mu);font-family:'Space Mono',monospace">Hydration percentage (Target: ${maxGoal}ml)</span>
    </div>
    <div class="barwrap">${bars.map(b => {
      const short = new Date(b.day + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'narrow' });
      return `<div class="bar-col"><div style="display:flex;gap:2px;height:70px;align-items:flex-end;width:14px;"><div class="bar-fill" style="width:14px;background:var(--water);height:${b.pct * 0.58}px" title="${b.ml} ml"></div></div><div class="bar-lbl">${short}</div></div>`;
    }).join('')}</div>
  `;
}

function renderHeatmap(data) {
  const el = document.getElementById('heatmap');
  if (!el) return;
  const cells = [];
  for (let i = 69; i >= 0; i--) {
    const d = new Date(TODAY + 'T12:00:00');
    d.setDate(d.getDate() - i);
    cells.push(d.toISOString().split('T')[0]);
  }
  const firstDow = new Date(cells[0] + 'T12:00:00').getDay();
  const padded = [...Array(firstDow).fill(null), ...cells];
  el.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'heatmap';
  padded.forEach(day => {
    const div = document.createElement('div');
    div.className = 'hcell';
    if (!day) { div.style.visibility = 'hidden'; wrap.appendChild(div); return; }
    if (day === TODAY) div.classList.add('tcell');
    const d = data.days[day];
    if (d) {
      const avg = dayScore(day, d).avg;
      if (avg > 0 && avg <= 0.4) div.classList.add('l1');
      else if (avg > 0.4 && avg <= 0.6) div.classList.add('l2');
      else if (avg > 0.6 && avg <= 0.8) div.classList.add('l3');
      else if (avg > 0.8) div.classList.add('l4');
    }
    div.title = day;
    div.onclick = () => { currentDay = day; switchTab('today'); renderToday(); };
    wrap.appendChild(div);
  });
  el.appendChild(wrap);
}

function renderInsight(s) {
  const el = document.getElementById('insight-text');
  if (!el) return;
  if (s.totalDays === 0) { el.textContent = 'Start checking off today and come back here tomorrow — your insights will appear as your data builds up.'; return; }
  const msgs = [];
  if (s.bestStreak >= 14) msgs.push(`A ${s.bestStreak}-day streak is genuine transformation. At this point your identity is changing, not just your habits.`);
  else if (s.bestStreak >= 7) msgs.push(`${s.bestStreak} days in a row — this is where most people quit and you did not. That is the difference.`);
  else if (s.bestStreak >= 3) msgs.push(`You have a ${s.bestStreak}-day streak going. Reach 7 and your habits start to feel automatic, not forced.`);
  else msgs.push('The hardest part is the first 3 days. Protect the streak — do not let today be the break.');
  if (s.kgLost >= 1) msgs.push(`${s.kgLost} kg lost on the 7-day trend. At a healthy pace of 0.5–1 kg per week, you are right on track. Slow and steady is the only method that sticks.`);
  else if (s.kgLost < 0) msgs.push('The trend line filters out daily water swings — if it is rising over 2+ weeks, adjust food, not effort. Judge by trend, never by a single morning.');
  else if (s.weights.length < 2) msgs.push('Log your weight daily even if it feels the same. The 7-day trend tells the real story the scale hides.');
  if (s.avgPct >= 80) msgs.push(`Your ${s.avgPct}% average compliance is elite. Most people manage 40–50% — you are building a real system.`);
  else if (s.avgPct >= 55) msgs.push('Consistency above 60% is already better than most. Push toward 75% and the results will start becoming visible.');
  else if (s.totalDays > 3) msgs.push('Focus on removing one item at a time — start with soda and sugar. These two alone cause most of the damage.');
  if (s.maxBreakRounds >= 3) msgs.push('You hit 3 break rounds in a day — that is exactly the habit that protects your knees and back for the next two years of study.');
  if (s.perfectDays > 0) msgs.push(`${s.perfectDays} perfect day${s.perfectDays > 1 ? 's' : ''} so far. Chase the next one.`);
  el.textContent = msgs.slice(0, 3).join(' ');
}

function renderAchievements(s) {
  const el = document.getElementById('ach-grid');
  if (!el) return;
  el.innerHTML = '';
  ACH.forEach(a => {
    const ok = a.check(s);
    const div = document.createElement('div');
    div.className = 'ach' + (ok ? ' unlocked' : '');
    div.innerHTML = `<div class="ach-icon">${a.icon}</div><div><div class="ach-name">${a.name}${ok ? ' <span style="font-size:10px;color:var(--gr);font-family:Space Mono,monospace">✓</span>' : ''}</div><div class="ach-desc">${a.desc}</div></div>`;
    el.appendChild(div);
  });
}

function triggerConfetti() {
  const container = document.getElementById('confetti-container');
  if (!container) return;
  container.innerHTML = '';
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.backgroundColor = ['#e2407e', '#7c5cd6', '#f59e1f', '#2e8b4f', '#4aa8d8'][Math.floor(Math.random() * 5)];
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    p.style.animationDelay = Math.random() * 0.5 + 's';
    p.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
    container.appendChild(p);
  }
  setTimeout(() => { container.innerHTML = ''; }, 3500);
}

function renderProgramBanner() {
  const data = gs();
  const el = document.getElementById('program-banner');
  if (!el) return;
  const fasting = isFastingDay(currentDay);
  const lbl = getProgramLabel(currentDay);
  const lv = getLevels();
  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        ${lbl ? `<span style="font-size:11px;font-family:'Space Mono',monospace;color:var(--mu)">${lbl}</span>` : ''}
        ${fasting ? `<span style="font-size:10px;background:#fdf2df;color:#b06c08;border:1px solid #f5ddb0;border-radius:4px;padding:2px 8px;font-family:'Space Mono',monospace;text-transform:uppercase">☀ Fasting · light mode</span>` : ''}
      </div>
      <button onclick="toggleFasting()" style="background:${fasting ? '#fdf2df' : 'var(--s2)'};border:1px solid ${fasting ? '#f59e1f' : 'var(--bd)'};border-radius:6px;padding:4px 12px;font-family:'Syne',sans-serif;font-weight:700;font-size:11px;cursor:pointer;color:${fasting ? '#b06c08' : 'var(--mu)'};text-transform:uppercase;letter-spacing:.5px">
        ${fasting ? 'Fasting day ✓' : 'Mark fasting day'}
      </button>
    </div>
    ${fasting ? '' : `<div class="lvlrow">
      <div class="lvlgroup">
        <span class="lvllbl" style="color:var(--bl)">Knee Lv</span>
        ${[1, 2, 3].map(n => `<button class="lvlbtn${lv.knee === n ? ' on' : ''}" onclick="setLevel('knee',${n})">${n}</button>`).join('')}
      </div>
      <div class="lvlgroup">
        <span class="lvllbl" style="color:var(--yw)">Arm Lv</span>
        ${[1, 2, 3].map(n => `<button class="lvlbtn${lv.arm === n ? ' on arm' : ''}" onclick="setLevel('arm',${n})">${n}</button>`).join('')}
      </div>
    </div>`}
    ${!data.programStart ? `<div style="margin-top:8px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-size:11px;color:var(--mu);font-family:'Space Mono',monospace">Set start date:</span>
      <input type="date" id="start-date-input" value="${TODAY}" max="${TODAY}" style="background:var(--s2);border:1px solid var(--bd);border-radius:6px;padding:4px 8px;color:var(--tx);font-family:'Space Mono',monospace;font-size:12px;outline:none"/>
      <button onclick="setProgramStart()" style="background:var(--gr);color:#fff;border:none;border-radius:6px;padding:5px 12px;font-family:'Syne',sans-serif;font-weight:700;font-size:12px;cursor:pointer">Start</button>
    </div>` : ''}`;
}

function toggleFasting() {
  const data = gs();
  const day = gd(data, currentDay);
  const before = day.workout || {};
  day.fasting = !day.fasting;
  const allowed = new Set(getWorkout(currentDay).map(i => i.id));
  const kept = {};
  Object.keys(before).forEach(k => { if (allowed.has(k) && before[k]) kept[k] = true; });
  day.workout = kept;
  computeStreak(data);
  ss(data);
  renderProgramBanner();
  renderChecklist(getWorkout(currentDay), 'work-list', 'workout');
  document.getElementById('streak-num').textContent = data.streak || 0;
}

function setProgramStart() {
  const input = document.getElementById('start-date-input');
  if (!input) return;
  const val = input.value;
  if (!val) return;
  const data = gs();
  data.programStart = val;
  ss(data);
  renderProgramBanner();
  renderChecklist(getWorkout(currentDay), 'work-list', 'workout');
}

function renderBreaks() {
  const data = gs();
  const dayData = data.days[currentDay] || {};
  const breaks = dayData.breaks || {};
  const rounds = dayData.breakRounds || 0;
  const container = document.getElementById('break-list');
  if (!container) return;
  let done = 0;
  container.innerHTML = '';
  BREAKS.forEach(item => {
    const checked = !!breaks[item.id];
    if (checked) done++;
    const div = document.createElement('div');
    div.className = 'ci' + (checked ? ' done' : '');
    div.onclick = () => {
      const d = gs();
      if (!d.days[currentDay]) d.days[currentDay] = { food: {}, workout: {}, breaks: {} };
      if (!d.days[currentDay].breaks) d.days[currentDay].breaks = {};
      
      const willBeChecked = !d.days[currentDay].breaks[item.id];
      d.days[currentDay].breaks[item.id] = willBeChecked;
      
      const xpVal = willBeChecked ? 10 : -10;
      awardXP(xpVal, willBeChecked ? `Finished break stretch: ${item.id}` : `Undone break stretch`);

      ss(d);
      renderBreaks();
      const checkedCount = Object.values(d.days[currentDay].breaks).filter(Boolean).length;
      if (checkedCount === BREAKS.length) {
        setTimeout(() => {
          const d2 = gs();
          if (!d2.days[currentDay]) return;
          const cc = Object.values(d2.days[currentDay].breaks || {}).filter(Boolean).length;
          if (cc !== BREAKS.length) return;
          d2.days[currentDay].breakRounds = (d2.days[currentDay].breakRounds || 0) + 1;
          d2.days[currentDay].breaks = {};
          
          awardXP(30, 'Completed a break round!');
          triggerConfetti();
          
          ss(d2);
          renderBreaks();
        }, 700);
      }
    };
    div.innerHTML = `<div class="cbox">${checked ? '✓' : ''}</div><div style="flex:1"><div class="itext">${item.label}</div><div class="isub">${item.sub}</div></div><div class="ibadge wb">do it</div>`;
    container.appendChild(div);
  });
  const prog = document.getElementById('break-prog');
  if (prog) prog.textContent = `round ${rounds + 1}: ${done}/4 exercises · banked ${rounds}/3${rounds >= 3 ? ' ✓ full' : ''}`;
}

function resetBreaks() {
  const data = gs();
  if (!data.days[currentDay]) return;
  data.days[currentDay].breaks = {};
  ss(data);
  renderBreaks();
}

function resetDay() {
  const btn = document.getElementById('reset-day-btn');
  if (btn.dataset.confirm === '1') {
    const data = gs();
    delete data.days[currentDay];
    computeStreak(data);
    ss(data);
    renderToday();
    btn.textContent = 'Reset this day';
    btn.dataset.confirm = '0';
    btn.style.borderColor = '';
    btn.style.color = '';
  } else {
    btn.textContent = 'Tap again to confirm';
    btn.dataset.confirm = '1';
    btn.style.borderColor = 'var(--yw)';
    btn.style.color = 'var(--yw)';
    setTimeout(() => {
      btn.textContent = 'Reset this day';
      btn.dataset.confirm = '0';
      btn.style.borderColor = '';
      btn.style.color = '';
    }, 3000);
  }
}

async function resetAll() {
  const btn = document.getElementById('reset-all-btn');
  if (btn.dataset.confirm === '2') {
    btn.textContent = 'Wiping...';
    if (hasCloud()) {
      try { await window.storage.delete('shaper_v2'); } catch (e) { /* ignore */ }
    }
    try {
      localStorage.removeItem('shaper_v2');
      localStorage.removeItem('shaper_data');
    } catch (e) { /* ignore */ }
    location.reload();
  } else if (btn.dataset.confirm === '1') {
    btn.textContent = '⚠ Tap once more — irreversible';
    btn.dataset.confirm = '2';
    btn.style.borderColor = 'var(--rd)';
    btn.style.color = 'var(--rd)';
    btn.style.background = '#fdeae7';
    setTimeout(() => {
      btn.textContent = '⚠ Reset everything';
      btn.dataset.confirm = '0';
      btn.style.borderColor = '#f6c5be';
      btn.style.color = 'var(--rd)';
      btn.style.background = 'none';
    }, 4000);
  } else {
    btn.textContent = '⚠ Are you sure?';
    btn.dataset.confirm = '1';
    btn.style.borderColor = 'var(--yw)';
    btn.style.color = 'var(--yw)';
    setTimeout(() => {
      btn.textContent = '⚠ Reset everything';
      btn.dataset.confirm = '0';
      btn.style.borderColor = '#f6c5be';
      btn.style.color = 'var(--rd)';
      btn.style.background = 'none';
    }, 4000);
  }
}

function updateNotifBar() {
  const bar = document.getElementById('notif-bar');
  const txt = document.getElementById('notif-status-text');
  const btn = document.getElementById('notif-btn');
  if (!bar || !txt) return;

  if (location.protocol === 'file:') {
    bar.style.background = 'var(--s2)';
    bar.style.borderColor = 'var(--bd)';
    txt.innerHTML = 'Notifications do not run when opening local file directly. Serve the app from a live local port, or just keep this tab visible to hear break sounds.';
    txt.style.color = 'var(--tx)';
    if (btn) btn.style.display = 'none';
    return;
  }

  if (!('Notification' in window)) {
    txt.textContent = 'Your browser does not support notifications — keep this tab visible.';
    txt.style.color = 'var(--mu)';
    if (btn) btn.style.display = 'none';
    return;
  }
  if (Notification.permission === 'granted') {
    bar.style.background = 'var(--s1)';
    bar.style.borderColor = 'var(--bd)';
    txt.textContent = 'Notifications enabled — you\'ll be alerted even in the background ✓';
    txt.style.color = 'var(--gn)';
    if (btn) btn.style.display = 'none';
  } else if (Notification.permission === 'denied') {
    bar.style.background = 'var(--s2)';
    bar.style.borderColor = 'var(--bd)';
    txt.textContent = 'Notifications blocked in browser settings. Go to browser Settings to allow.';
    txt.style.color = 'var(--rd)';
    if (btn) btn.style.display = 'none';
  } else {
    bar.style.background = 'var(--s2)';
    bar.style.borderColor = 'var(--bd)';
    txt.textContent = 'Allow notifications so you get alerted even when this tab is in the background.';
    txt.style.color = 'var(--yw)';
    if (btn) { btn.style.display = ''; btn.textContent = 'Allow'; }
  }
}

function requestNotifPermission() {
  if (!('Notification' in window)) return;
  Notification.requestPermission().then(() => updateNotifBar());
}

function fireNotification() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.35, 0.7, 1.05].forEach(t => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);
      o.frequency.value = t < 0.7 ? 880 : 1100;
      g.gain.setValueAtTime(0.5, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.35);
      o.start(ctx.currentTime + t);
      o.stop(ctx.currentTime + t + 0.35);
    });
  } catch (e) { /* ignore */ }
  if ('Notification' in window && Notification.permission === 'granted') {
    const n = new Notification('⏰ Study Break Time!', {
      body: 'You\'ve been studying for a while. Stand up, do 10 squats, reset your neck. 2 minutes is all it takes.',
      icon: 'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A//www.w3.org/2000/svg%22 viewBox%3D%220 0 100 100%22%3E%3Ctext y%3D%22.9em%22 font-size%3D%2290%22%3E%E2%8F%B0%3C/text%3E%3C/svg%3E',
      requireInteraction: true,
    });
    n.onclick = () => { window.focus(); n.close(); };
    setTimeout(() => n.close(), 15000);
  }
}

let timerDuration = 60 * 60;
let timerRemaining = timerDuration;
let timerEndTime = null;
let timerInterval = null;
let timerRunning = false;
const RING_CIRC = 326.7;

function getTimerSessionsToday() {
  const d = gs();
  return (d.days[TODAY] && d.days[TODAY].timerSessions) || 0;
}

function renderTimerSessions() {
  const el = document.getElementById('timer-sessions');
  if (!el) return;
  const n = getTimerSessionsToday();
  el.textContent = n + ' timer' + (n !== 1 ? 's' : '') + ' finished today';
}

function setTimer(mins, el) {
  if (timerRunning) return;
  timerDuration = mins * 60;
  timerRemaining = timerDuration;
  document.querySelectorAll('.tpreset').forEach(p => p.classList.remove('active'));
  if (el) el.classList.add('active');
  updateTimerDisplay();
}

function timerTick() {
  if (!timerRunning || timerEndTime === null) return;
  timerRemaining = Math.max(0, Math.round((timerEndTime - Date.now()) / 1000));
  updateTimerDisplay();
  if (timerRemaining <= 0) timerFinish();
}

function timerStartStop() {
  if (timerRunning) {
    timerRemaining = Math.max(0, Math.round((timerEndTime - Date.now()) / 1000));
    clearInterval(timerInterval);
    timerInterval = null;
    timerRunning = false;
    timerEndTime = null;
    document.getElementById('timer-start-btn').textContent = 'Resume';
    document.getElementById('timer-status').textContent = 'paused';
  } else {
    if (timerRemaining <= 0) { timerReset(); return; }
    timerRunning = true;
    timerEndTime = Date.now() + timerRemaining * 1000;
    document.getElementById('timer-start-btn').textContent = 'Pause';
    document.getElementById('timer-status').textContent = 'studying...';
    timerInterval = setInterval(timerTick, 500);
    timerTick();
  }
}

function timerFinish() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
  timerEndTime = null;
  timerRemaining = 0;
  const d = gs();
  const day = gd(d, TODAY);
  day.timerSessions = (day.timerSessions || 0) + 1;
  
  awardXP(30, 'Completed focused study break timer!');
  triggerConfetti();

  ss(d);
  renderTimerSessions();
  document.getElementById('timer-start-btn').textContent = 'Start';
  document.getElementById('timer-status').textContent = 'take a break!';
  document.getElementById('timer-ring').style.stroke = 'var(--rd)';
  fireNotification();
}

function timerReset() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
  timerEndTime = null;
  timerRemaining = timerDuration;
  document.getElementById('timer-start-btn').textContent = 'Start';
  document.getElementById('timer-status').textContent = 'ready';
  document.getElementById('timer-ring').style.stroke = 'var(--gr)';
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const m = Math.floor(timerRemaining / 60);
  const s = timerRemaining % 60;
  const str = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const disp = document.getElementById('timer-display');
  const ring = document.getElementById('timer-ring');
  if (!disp || !ring) return;
  disp.textContent = str;
  const pct = timerDuration ? timerRemaining / timerDuration : 0;
  ring.style.strokeDashoffset = RING_CIRC * (1 - pct);
  if (timerRemaining <= 300 && timerRemaining > 0 && timerRunning) {
    ring.style.stroke = 'var(--yw)';
    disp.style.color = 'var(--yw)';
  } else if (timerRunning) {
    ring.style.stroke = 'var(--gr)';
    disp.style.color = 'var(--tx)';
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && timerRunning) timerTick();
});

function renderToday() {
  renderNav();
  const data = gs();
  document.getElementById('streak-num').textContent = data.streak || 0;
  renderChecklist(FOOD, 'food-list', 'food');
  renderChecklist(getWorkout(currentDay), 'work-list', 'workout');
  renderProgramBanner();
  renderBreaks();
  renderWeightEntries(data);
  updateKgLost(data);
  renderTimerSessions();
  renderWaterSection();
  renderCalorieSection();
  renderDailyTip();
  updateXPDisplay();
  const wtTitle = document.getElementById('wt-title');
  const wtLabel = document.getElementById('wt-label');
  if (wtTitle) wtTitle.textContent = 'Weight log · ' + currentDay;
  if (wtLabel) wtLabel.textContent = currentDay === TODAY ? 'Weight (kg) — today' : 'Weight (kg) — logs to ' + currentDay;
}

function showFatal(e) {
  document.body.innerHTML = '<div style="padding:30px;font-family:\'Space Mono\',monospace;color:#c4382d;background:#fff7f0;min-height:100vh"><h3 style="margin-bottom:10px">Something broke while loading</h3><p style="font-size:13px;line-height:1.6;color:#46243c">' + String(e && e.message || e).replace(/</g, '&lt;') + '</p><p style="font-size:12px;color:#a9849a;margin-top:14px">Clear browser data and refresh the app.</p></div>';
}

window.onerror = function (msg, src, line) { showFatal(msg + ' (line ' + line + ')'); return false; };

Object.assign(window, {
  switchTab, shiftDay, goToday, setLevel, toggleItem, logWeight, deleteWeight,
  toggleFasting, setProgramStart, resetBreaks, resetDay, resetAll,
  exportData, importData, importFromPaste, requestNotifPermission,
  setTimer, timerStartStop, timerReset,
  // New variables and functions
  addWater, addWaterCustom, undoWater,
  addMeal, deleteMeal, dismissTip,
  showOnboarding, nextOnboardingStep, validateStep2, validateStep3,
  selectRadio, completeOnboarding, toggleDarkMode
});

function init() {
  try {
    const bw = document.getElementById('boot-warn');
    if (bw) bw.remove();
  } catch (e) { /* ignore */ }

  try {
    const d = localStorage.getItem('shaper_v2') || localStorage.getItem('shaper_data');
    if (d) _DATA = JSON.parse(d);
  } catch (e) { /* ignore */ }

  if (!_DATA || typeof _DATA !== 'object') _DATA = { days: {}, weights: [], streak: 0, bestStreak: 0, lastDay: null, programStart: null, levels: { knee: 1, arm: 1 }, lastModified: 0, xp: 0, darkMode: false, profile: null };
  if (!_DATA.days) _DATA.days = {};
  if (!Array.isArray(_DATA.weights)) _DATA.weights = [];
  if (!_DATA.levels) _DATA.levels = { knee: 1, arm: 1 };
  if (!_DATA.xp) _DATA.xp = 0;
  
  _READY = true;

  try {
    renderToday();
    updateNotifBar();
    updateStorageStatus();
    renderTheme();

    // Trigger onboarding wizard if profile not setup yet
    if (!_DATA.profile) {
      setTimeout(() => {
        showOnboarding();
      }, 600);
    } else {
      renderProfile();
    }
  } catch (e) { showFatal(e); return; }

  const cap = new Promise(r => setTimeout(r, 6000));
  Promise.race([loadCloud(), cap]).catch(() => {}).then(() => {
    try { 
      renderToday(); 
      updateStorageStatus(); 
      renderTheme();
      if (_DATA.profile) {
        renderProfile();
      }
    } catch (e) { /* ignore */ }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

} // end browser-only block

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    FOOD,
    WORKOUT_NORMAL,
    WORKOUT_FASTING,
    BREAKS,
    mergeData,
    smoothedWeights,
    trendKgLost,
    dayScore,
    calcStats,
    isFastingDay,
    getWorkout,
    workDen,
    CONTENT_V2,
    LEGACY_WORKOUT_LEN,
  };
}
