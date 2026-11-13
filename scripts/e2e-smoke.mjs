// Test dymny: przechodzi przez każde narzędzie, wybierając pierwsze odpowiedzi, i sprawdza, czy powstaje wynik.
// Użycie: npm run build && npm start; w drugim terminalu: BASE=http://localhost:3000 npm run e2e
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const BASE = process.env.BASE || "http://localhost:3000";
const WIZARDS = ["mieszkanie-i-kredyt", "plan-opieki-nad-dzieckiem", "konsekwencje-rozstania", "przed-pozwem", "separacja-czy-rozwod", "pierwsze-30-dni"];
const CALCS = ["budzet-po-rozstaniu", "koszty-utrzymania-dziecka"];
const DECISION = ["koszt-rozwodu", "rozmowa-o-rozstaniu", "kompas-decyzji", "majatek-wspolny-czy-osobisty", "wina-czy-bez-winy", "porozumienie-przejsciowe", "koszty-wyprowadzki", "plan-wsparcia", "mity-o-rozwodzie", "pozew-rozwodowy-checklista"];
const PAGES = ["/narzedzia", "/przed-decyzja", "/demo", ...DECISION.map((d) => `/przed-decyzja/${d}`), "/materialy", "/materialy/rozwod-krok-po-kroku", "/plan-rozwodu", "/pomoc", "/polityka-prywatnosci", "/zastrzezenia"];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
let failures = 0;
const fail = (m) => { failures++; console.error("✗", m); };

for (const path of PAGES) {
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  const res = await p.goto(BASE + path, { waitUntil: "networkidle" });
  if (!res || res.status() !== 200) fail(`${path} status ${res?.status()}`);
  else if (errs.length) fail(`${path} błędy JS: ${errs.join(" | ")}`);
  else console.log("✓", path);
  const h1 = await p.locator("h1").count();
  if (h1 !== 1) fail(`${path}: liczba H1 = ${h1}`);
  await p.close();
}

for (const slug of WIZARDS) {
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(`${BASE}/narzedzia/${slug}`, { waitUntil: "networkidle" });
  let ok = false;
  for (let i = 0; i < 40; i++) {
    if (await p.locator(".result-head").count()) { ok = true; break; }
    const frame = p.locator(".tool-frame form");
    // zaznacz pierwszą odpowiedź w każdej grupie bez zaznaczenia
    const sets = frame.locator("fieldset.choices");
    for (let s = 0; s < (await sets.count()); s++) {
      const set = sets.nth(s);
      if ((await set.locator("input:checked").count()) === 0) {
        const opts = set.locator("label.choice");
        // dla pytań o bezpieczeństwo wybierz „Nie”, jeśli jest dostępne
        const nie = set.locator("label.choice", { hasText: /^Nie$/ });
        await ((await nie.count()) ? nie.first() : opts.first()).click();
      }
    }
    await p.getByRole("button", { name: /Dalej|Pokaż|Zobacz/ }).last().click();
    await p.waitForTimeout(80);
  }
  if (!ok) fail(`${slug}: nie dotarto do wyniku`);
  else if (errs.length) fail(`${slug}: błędy JS: ${errs.join(" | ")}`);
  else if (!(await p.getByRole("button", { name: /PDF/ }).count())) fail(`${slug}: brak przycisku PDF`);
  else console.log("✓ wynik:", slug);
  await p.close();
}

for (const slug of CALCS) {
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(`${BASE}/narzedzia/${slug}`, { waitUntil: "networkidle" });
  const inputs = p.locator("#narzedzie input[inputmode=decimal]");
  const n = Math.min(await inputs.count(), 6);
  for (let i = 0; i < n; i++) await inputs.nth(i).fill(String(500 + i * 100));
  await p.waitForTimeout(200);
  await p.getByRole("button", { name: /Pokaż/ }).first().click();
  await p.waitForTimeout(300);
  const hasResult = (await p.locator("#narzedzie .kpi").count()) > 0;
  if (!hasResult) fail(`${slug}: brak wyników kalkulatora`);
  else if (errs.length) fail(`${slug}: błędy JS: ${errs.join(" | ")}`);
  else console.log("✓ kalkulator:", slug);
  await p.close();
}

// Strony /demo: dymek z propozycjami reklam i noindex
const demos = [...WIZARDS, ...CALCS].map((s) => `/narzedzia/${s}/demo`).concat(DECISION.map((d) => `/przed-decyzja/${d}/demo`), ["/materialy/rozwod-krok-po-kroku/demo"]);
for (const path of demos) {
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  const res = await p.goto(BASE + path, { waitUntil: "networkidle" });
  const robots = await p.locator('meta[name="robots"]').getAttribute("content").catch(() => null);
  const bubble = await p.locator('[aria-label="Propozycje treści reklam"]').count();
  if (!res || res.status() !== 200) fail(`${path} status ${res?.status()}`);
  else if (!bubble) fail(`${path}: brak dymka z reklamami`);
  else if (!robots?.includes("noindex")) fail(`${path}: brak noindex`);
  else if (errs.length) fail(`${path}: błędy JS: ${errs.join(" | ")}`);
  else console.log("✓ demo", path);
  await p.close();
}

// Materiały: wersja online na landingu — odhaczenie, wpis, podsumowanie; bez PDF
for (const slug of ["checklista-dokumentow", "komunikacja-z-drugim-rodzicem"]) {
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(`${BASE}/materialy/${slug}`, { waitUntil: "networkidle" });
  const wb = p.locator(".wb");
  let ok = false;
  for (let i = 0; i < 12; i++) {
    const cb = wb.locator('.wb__check input:not(:checked)').first();
    if (await cb.count()) await cb.check();
    const ta = wb.locator("textarea").first();
    if (await ta.count()) await ta.fill("test");
    if (await wb.locator(".kpis").count()) { ok = true; break; }
    await wb.getByRole("button", { name: /Dalej|Podsumowanie/ }).last().click();
  }
  const pdf = await p.getByText(/PDF/).count();
  if (!ok) fail(`material ${slug}: nie dotarto do podsumowania`);
  else if (!(await wb.locator(".kpi__value").first().textContent())?.match(/[1-9]/)) fail(`material ${slug}: postęp 0%`);
  else if (pdf) fail(`material ${slug}: strona nadal wspomina PDF`);
  else if (errs.length) fail(`material ${slug}: błędy JS: ${errs.join(" | ")}`);
  else console.log("✓ materiał online", slug);
  await p.close();
}

// API: brak konfiguracji e-mail → 503 (bez udawania wysyłki); zła walidacja → 400
const api = await ctx.request.post(`${BASE}/api/lead`, { data: { kind: "summary", email: "test@example.com", consents: { delivery: true }, report: { title: "T", sections: [{ heading: "H", items: ["x"] }] } }, headers: { origin: BASE } });
const caps = await (await ctx.request.get(`${BASE}/api/lead`)).json();
if (!caps.email && api.status() !== 503) fail(`API summary bez konfiguracji: oczekiwano 503, jest ${api.status()}`);
const bad = await ctx.request.post(`${BASE}/api/lead`, { data: { kind: "contact", email: "zly" }, headers: { origin: BASE } });
if (bad.status() !== 400) fail(`API walidacja: oczekiwano 400, jest ${bad.status()}`);
else console.log("✓ API");

await browser.close();
if (failures) { console.error(`\n${failures} problem(ów)`); process.exit(1); }
console.log("\nWszystko OK");
