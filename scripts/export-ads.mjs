// Eksport propozycji reklam (src/content/ads/*.ts) do MARKETING/ADS-DEMO.md — czytelna wersja dla zespołu.
// Użycie: node scripts/export-ads.mjs
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "ne-ads-")), "ads.cjs");
execFileSync(path.resolve("node_modules/.bin/esbuild"), ["src/content/ads/index.ts", "--bundle", "--platform=node", "--format=cjs", `--outfile=${tmp}`], { stdio: "inherit" });
const { ADS } = createRequire(import.meta.url)(tmp);

const DECISION = ["koszt-rozwodu", "rozmowa-o-rozstaniu", "kompas-decyzji", "majatek-wspolny-czy-osobisty", "wina-czy-bez-winy", "porozumienie-przejsciowe", "koszty-wyprowadzki", "plan-wsparcia", "mity-o-rozwodzie", "pozew-rozwodowy-checklista"];
const TOOLS = ["mieszkanie-i-kredyt", "budzet-po-rozstaniu", "plan-opieki-nad-dzieckiem", "konsekwencje-rozstania", "przed-pozwem", "koszty-utrzymania-dziecka", "separacja-czy-rozwod", "pierwsze-30-dni"];
const pathOf = (s) => (DECISION.includes(s) ? `/przed-decyzja/${s}` : TOOLS.includes(s) ? `/narzedzia/${s}` : `/materialy/${s}`);
const list = (arr, max) => arr.map((t) => `- ${t} _(${[...t].length}/${max})_`).join("\n");

let md = `# Propozycje reklam — wersja do akceptacji\n\nWygenerowano z \`src/content/ads/*.ts\` (\`node scripts/export-ads.mjs\`). Te same treści widać w dymku na stronach \`<landing>/demo\` (spis: \`/demo\`).\nZasady zgodności i UTM: \`MARKETING/ADS.md\`, sekcja 0.\n\n`;
for (const slug of [...DECISION, ...TOOLS, ...Object.keys(ADS).filter((k) => !DECISION.includes(k) && !TOOLS.includes(k))]) {
  const a = ADS[slug];
  if (!a) continue;
  md += `---\n\n## ${slug}\n\nLanding: \`${pathOf(slug)}\` · Demo: \`${pathOf(slug)}/demo\`\n\n**Kąt:** ${a.angle}\n\n**Kierowanie:** ${a.targeting}\n\n`;
  md += `### Meta (CTA: ${a.meta.cta})\n\n**Tekst główny**\n${list(a.meta.primaryTexts, 125)}\n\n**Nagłówki**\n${list(a.meta.headlines, 40)}\n\n**Opisy**\n${list(a.meta.descriptions, 30)}\n\n**Kreacja:** ${a.meta.creative}\n\n`;
  md += `### Google Demand Gen (CTA: ${a.demandGen.cta})\n\n**Nagłówki**\n${list(a.demandGen.headlines, 40)}\n\n**Długie nagłówki**\n${list(a.demandGen.longHeadlines, 90)}\n\n**Teksty**\n${list(a.demandGen.descriptions, 90)}\n\n**Kreacja:** ${a.demandGen.creative}\n\n`;
  md += `### Google Search\n\n**Słowa kluczowe:** ${a.search.keywords.join(", ")}\n\n**Ścieżki:** /${a.search.paths.join("/")}\n\n**Nagłówki**\n${list(a.search.headlines, 30)}\n\n**Teksty**\n${list(a.search.descriptions, 90)}\n\n`;
  if (a.notes?.length) md += `**Uwagi:** ${a.notes.join(" ")}\n\n`;
}
fs.writeFileSync("MARKETING/ADS-DEMO.md", md);
console.log(`Zapisano MARKETING/ADS-DEMO.md (${Object.keys(ADS).length} zestawów)`);
