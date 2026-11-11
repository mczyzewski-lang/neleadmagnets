// Audyt dostępności (axe-core, WCAG 2.2 AA) + kontrola poziomego przewijania na mobile.
// Użycie: uruchom serwer, potem: BASE=http://localhost:3000 npm run a11y
import { createRequire } from "node:module";
import fs from "node:fs";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const axeSrc = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const BASE = process.env.BASE || "http://localhost:3000";
const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
paths.push("/demo", "/przed-decyzja/koszt-rozwodu/demo");

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
let problems = 0;
for (const path of paths) {
  const p = await ctx.newPage();
  await p.goto(BASE + path, { waitUntil: "networkidle" });
  const ov = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  await p.evaluate(axeSrc);
  const res = await p.evaluate(async () => await globalThis.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"] } }));
  if (ov) { problems++; console.error(`✗ ${path}: poziome przewijanie na 390 px`); }
  for (const v of res.violations) {
    problems++;
    console.error(`✗ ${path}: ${v.id} (${v.impact}) ×${v.nodes.length} — ${v.nodes[0].target.join(" ")}`);
  }
  if (!ov && !res.violations.length) console.log("✓", path);
  await p.close();
}
await browser.close();
if (problems) { console.error(`\n${problems} problem(ów)`); process.exit(1); }
console.log(`\nBrak naruszeń na ${paths.length} stronach`);
