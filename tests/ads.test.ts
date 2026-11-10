/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";
import { LIMITS, type AdSet } from "@/content/ads/types";

const len = (s: string) => [...s].length;
// Sformułowania sugerujące znajomość sytuacji odbiorcy (Meta: personal attributes)
const BANNED = [/rozwodzisz się/i, /twój rozwód/i, /twoje małżeństwo/i, /twój mąż/i, /twoja żona/i, /twój partner/i, /rozstajesz się/i];

function over(a: AdSet) {
  const errs: string[] = [];
  const chk = (arr: string[], max: number, name: string) => arr.forEach((t) => len(t) > max && errs.push(`${name} (${len(t)}/${max}): ${t}`));
  chk(a.meta.primaryTexts, LIMITS.metaPrimary, "meta.primary");
  chk(a.meta.headlines, LIMITS.metaHeadline, "meta.headline");
  chk(a.meta.descriptions, LIMITS.metaDescription, "meta.description");
  chk(a.demandGen.headlines, LIMITS.dgHeadline, "dg.headline");
  chk(a.demandGen.longHeadlines, LIMITS.dgLong, "dg.long");
  chk(a.demandGen.descriptions, LIMITS.dgDescription, "dg.description");
  chk(a.search.headlines, LIMITS.searchHeadline, "search.headline");
  chk(a.search.descriptions, LIMITS.searchDescription, "search.description");
  chk(a.search.paths, LIMITS.searchPath, "search.path");
  return errs;
}

// Wszystkie pliki z propozycjami (niezależnie od rejestru)
const files = import.meta.glob<{ ads: AdSet }>(["../src/content/ads/*.ts", "!../src/content/ads/index.ts", "!../src/content/ads/types.ts"], { eager: true });
const SETS: Record<string, AdSet> = {};
for (const [path, mod] of Object.entries(files)) {
  if (/\/(index|types)\.ts$/.test(path) || !mod.ads) continue;
  SETS[mod.ads.slug] = mod.ads;
}

describe("propozycje reklam", () => {
  it("rejestr ADS zawiera wszystkie 28 zestawów", async () => {
    const { ADS } = await import("@/content/ads");
    expect(Object.keys(ADS).sort()).toEqual(Object.keys(SETS).sort());
    expect(Object.keys(ADS)).toHaveLength(28);
  });
  it("nazwa pliku = slug", () => {
    for (const [path, mod] of Object.entries(files)) if (mod.ads) expect(path).toContain(`/${mod.ads.slug}.ts`);
  });
  for (const [slug, a] of Object.entries(SETS)) {
    describe(slug, () => {
      it("mieści się w limitach znaków", () => expect(over(a)).toEqual([]));
      it("ma wymagane liczności", () => {
        expect(a.meta.primaryTexts.length).toBeGreaterThanOrEqual(3);
        expect(a.meta.headlines.length).toBeGreaterThanOrEqual(3);
        expect(a.demandGen.headlines.length).toBeGreaterThanOrEqual(5);
        expect(a.demandGen.longHeadlines.length).toBeGreaterThanOrEqual(3);
        expect(a.search.headlines.length).toBeGreaterThanOrEqual(10);
        expect(a.search.descriptions.length).toBeGreaterThanOrEqual(4);
      });
      it("nie sugeruje znajomości sytuacji odbiorcy (Meta)", () => {
        const texts = [...a.meta.primaryTexts, ...a.meta.headlines, ...a.demandGen.headlines, ...a.demandGen.longHeadlines, ...a.demandGen.descriptions];
        for (const t of texts) for (const b of BANNED) expect(t, t).not.toMatch(b);
      });
    });
  }
});
