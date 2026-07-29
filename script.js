/* ============================================================================
   ERASMUS LETTER — script.js
   No build step, no dependencies. Just edit the values marked ✏️ below.
   ============================================================================ */

/* ────────────────────────────────────────────────────────────────────────
   ✏️ 1. SET THE ERASMUS START DATE HERE
   Format: "YYYY-MM-DD"  (this counts as Day 1)
   ──────────────────────────────────────────────────────────────────────── */
const START_DATE = "2026-09-01";

/* Total length of the exchange. Day TOTAL_DAYS is the last day of letters. */
const TOTAL_DAYS = 180;

/* ────────────────────────────────────────────────────────────────────────
   ✏️ 2. SPOTIFY PLAYLIST LINK
   Replace the URL below with a real playlist whenever you have one ready.
   ──────────────────────────────────────────────────────────────────────── */
const SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/";

/* ────────────────────────────────────────────────────────────────────────
   ✏️ 3. GREEK WORD OF THE DAY
   Add, remove, or reorder entries freely — the list just loops.
   ──────────────────────────────────────────────────────────────────────── */
const GREEK_WORDS = [
  { word: "Kalimera", meaning: "good morning" },
  { word: "Kalispera", meaning: "good evening" },
  { word: "Efcharistó", meaning: "thank you" },
  { word: "Parakaló", meaning: "please / you're welcome" },
  { word: "Yassou", meaning: "hello (to a friend)" },
  { word: "Filos", meaning: "friend" },
  { word: "Thálassa", meaning: "sea" },
  { word: "Ílios", meaning: "sun" },
  { word: "Eleftheria", meaning: "freedom" },
  { word: "Omorfia", meaning: "beauty" },
  { word: "Perípeteia", meaning: "adventure" },
  { word: "Agápi", meaning: "love" },
  { word: "Zoí", meaning: "life" },
  { word: "Xénos", meaning: "stranger / foreigner" },
  { word: "Spíti", meaning: "home" },
  { word: "Drómos", meaning: "road / path" },
  { word: "Óneiro", meaning: "dream" },
  { word: "Fantasía", meaning: "imagination" },
  { word: "Élia", meaning: "olive" },
  { word: "Galázio", meaning: "blue / azure" },
  { word: "Taxídi", meaning: "journey / trip" },
  { word: "Yeia sou", meaning: "cheers / to your health" },
  { word: "Kaló taxídi", meaning: "safe travels" },
  { word: "Chará", meaning: "joy" },
  { word: "Élpida", meaning: "hope" },
  { word: "Sofía", meaning: "wisdom" },
  { word: "Anoixi", meaning: "spring (the season)" },
  { word: "Nisí", meaning: "island" },
  { word: "Fengári", meaning: "moon" },
  { word: "Asteri", meaning: "star" },
];

/* ──────────────────────────────────────────────────────────────────────── */

/**
 * Calculates the current Erasmus day number (1-indexed).
 * Day 1 = START_DATE. Anything before START_DATE also shows Day 1,
 * so the page never breaks if opened early.
 */
function getCurrentDay() {
  const start = new Date(START_DATE + "T00:00:00");
  const today = new Date();
  const startMidnight = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.round((todayMidnight - startMidnight) / msPerDay);

  return diff + 1; // Day 1 on the start date itself
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

async function loadQuotes() {
  const response = await fetch("quotes.json");
  if (!response.ok) throw new Error("Could not load quotes.json");
  return response.json();
}

function renderJourneyEnded() {
  document.getElementById("quoteCard").classList.add("hidden");
  document.getElementById("messageCard").classList.add("hidden");
  document.getElementById("greekCard").classList.add("hidden");
  document.getElementById("endingCard").classList.remove("hidden");
  document.getElementById("endingCard").classList.add("fade-in");

  setText("dayLabel", `Day ${TOTAL_DAYS} of ${TOTAL_DAYS}`);
  setText("daySub", "the journey is complete");
  positionSun(TOTAL_DAYS);
}

function positionSun(day) {
  const clamped = Math.min(Math.max(day, 1), TOTAL_DAYS);
  const percent = ((clamped - 1) / (TOTAL_DAYS - 1)) * 100;
  const sun = document.getElementById("sunMarker");
  if (sun) sun.style.left = percent + "%";
}

function renderDay(entry, day) {
  setText("dayLabel", `Day ${day} of ${TOTAL_DAYS}`);
  setText("quoteText", entry.quote);
  setText("quoteAuthor", entry.author ? entry.author : "");

  const messageEl = document.getElementById("messageText");
  if (messageEl) messageEl.textContent = entry.message;

  positionSun(day);

  ["quoteCard", "messageCard", "greekCard"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("fade-in");
  });
}

function renderGreekWord(day) {
  const idx = (day - 1) % GREEK_WORDS.length;
  const entry = GREEK_WORDS[idx];
  setText("greekWord", entry.word);
  setText("greekMeaning", `— ${entry.meaning}`);
}

function setupSpotifyButton() {
  const btn = document.getElementById("spotifyButton");
  if (btn) btn.href = SPOTIFY_PLAYLIST_URL;
}

async function init() {
  setupSpotifyButton();

  const day = getCurrentDay();

  if (day > TOTAL_DAYS) {
    renderJourneyEnded();
    return;
  }

  const safeDay = Math.max(day, 1);
  renderGreekWord(safeDay);

  try {
    const quotes = await loadQuotes();
    const entry = quotes.find((q) => q.day === safeDay) || quotes[0];
    renderDay(entry, safeDay);
  } catch (err) {
    setText("quoteText", "Today's letter couldn't be loaded — but you're still exactly where you're meant to be.");
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", init);
