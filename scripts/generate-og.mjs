// Generuje grafiki Open Graph (public/og/*.png) i zastępcze okładki (public/covers/*.webp → png)
// Użycie: uruchom serwer (npm run dev / npm start), następnie: BASE=http://localhost:3000 node scripts/generate-og.mjs
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright"); // preinstalowany Playwright lub: npm i -D playwright
import fs from "node:fs";

const BASE = process.env.BASE || "http://localhost:3000";
const tools = ["narzedzia", "mieszkanie-i-kredyt", "budzet-po-rozstaniu", "plan-opieki-nad-dzieckiem", "konsekwencje-rozstania", "przed-pozwem", "koszty-utrzymania-dziecka", "separacja-czy-rozwod", "pierwsze-30-dni"];
const materials = fs.readdirSync("src/content/materials").filter((f) => f !== "index.ts").map((f) => f.replace(/\.ts$/, ""));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
for (const slug of tools) {
  await page.goto(`${BASE}/og-karta/${slug}`, { waitUntil: "networkidle" });
  await page.locator("#og").screenshot({ path: `public/og/${slug}.png` });
  console.log("og", slug);
}
const coverPage = await browser.newPage({ viewport: { width: 1000, height: 1000 }, deviceScaleFactor: 2.6 });
for (const slug of materials) {
  await coverPage.goto(`${BASE}/og-karta/cover-${slug}`, { waitUntil: "networkidle" });
  await coverPage.locator("#og").screenshot({ path: `public/covers/${slug}-placeholder.png` });
  console.log("cover", slug);
}
await browser.close();
