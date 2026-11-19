import { describe, it, expect } from "vitest";
import { buildScenarios, computeMoney, propertyStatus, buildRisks, bankChecklist, normalizeAnswers, LTV_HIGH } from "@/lib/tools/housing";

describe("housing", () => {
  it("liczy różnicę wartość − kredyt i koszty sprzedaży", () => {
    const m = computeMoney({ relation: "marriage", owner: "both", purchase: "during", regime: "wspolnosc", loan: "joint", value: 650000, balance: 380000 });
    expect(m.equity).toBe(270000);
    expect(m.saleCosts).toBe(19500);
    expect(m.equityAfterCosts).toBe(250500);
    expect(m.halfIllustration).toBe(135000);
    expect(m.negative).toBe(false);
  });
  it("wykrywa ujemną różnicę", () => {
    const m = computeMoney({ loan: "joint", value: 300000, balance: 350000 });
    expect(m.negative).toBe(true);
    expect(buildRisks({ loan: "joint", value: 300000, balance: 350000 }).some((r) => r.includes("wyższe niż"))).toBe(true);
  });
  it("bez kredytu saldo = 0", () => {
    expect(computeMoney({ loan: "none", value: 500000 }).equity).toBe(500000);
  });
  it("scenariusze zależą od odpowiedzi", () => {
    const a = buildScenarios({ relation: "marriage", owner: "both", loan: "joint", stay: "me", afford: "yes", sale: "no" });
    const b = buildScenarios({ relation: "marriage", owner: "both", loan: "joint", stay: "nobody", sale: "yes" });
    expect(a[0].id).toBe("buyout");
    expect(b[0].id).toBe("sale");
    expect(a).toHaveLength(3);
  });
  it("związek nieformalny to nie wspólność małżeńska", () => {
    expect(propertyStatus({ relation: "informal", owner: "both" }).label).toContain("Kodeks cywilny");
  });
  it("właściciel jednej osoby w związku nieformalnym → scenariusz ownerKeeps", () => {
    const s = buildScenarios({ relation: "informal", owner: "me", loan: "me", stay: "me", sale: "no", afford: "yes" });
    expect(s.map((x) => x.id)).toContain("ownerKeeps");
  });
  it("wspólny kredyt zawsze ostrzega o braku zwolnienia z długu", () => {
    expect(buildRisks({ loan: "joint" })[0]).toMatch(/nie zwalnia/);
  });
  it("LTV = saldo kredytu / wartość; brak LTV bez kredytu", () => {
    expect(computeMoney({ loan: "joint", value: 500000, balance: 300000 }).ltv).toBeCloseTo(0.6);
    expect(computeMoney({ loan: "none", value: 500000 }).ltv).toBeUndefined();
    expect(computeMoney({ loan: "joint", value: 500000 }).ltv).toBeUndefined();
    expect(LTV_HIGH).toBe(0.8);
  });
  it("ostrzeżenie o wysokim LTV tylko powyżej progu i z zastrzeżeniem o bankach", () => {
    const high = buildRisks({ loan: "joint", value: 500000, balance: 450000 });
    const low = buildRisks({ loan: "joint", value: 500000, balance: 350000 });
    expect(high.some((r) => r.includes("ponad 80%") && r.includes("Każdy bank"))).toBe(true);
    expect(low.some((r) => r.includes("ponad 80%"))).toBe(false);
  });
  it("ukryte odpowiedzi nie wpływają na wynik", () => {
    const stale = { relation: "informal" as const, owner: "both" as const, purchase: "before" as const, regime: "rozdzielnosc" as const, loan: "none" as const, balance: 100000, stay: "nobody" as const, afford: "no" as const, sale: "yes" as const };
    const n = normalizeAnswers(stale);
    expect(n.purchase).toBeUndefined();
    expect(n.afford).toBeUndefined();
    expect(n.balance).toBeUndefined();
    expect(buildRisks(stale).some((r) => r.includes("zdolności kredytowej"))).toBe(false);
    expect(propertyStatus(stale).label).toContain("Kodeks cywilny");
    expect(bankChecklist(stale)).toEqual([]);
  });
  it("teksty bez przepisów i myślników", () => {
    const a = { relation: "marriage" as const, owner: "both" as const, purchase: "during" as const, regime: "wspolnosc" as const, ownFunds: "yes" as const, loan: "joint" as const, value: 400000, balance: 380000, stay: "me" as const, afford: "unsure" as const, sale: "maybe" as const };
    const texts = [propertyStatus(a).text, ...buildRisks(a), ...buildScenarios(a).flatMap((s) => [s.summary, ...s.why, ...s.steps, ...s.watch])];
    for (const t of texts) {
      expect(t).not.toMatch(/art\. \d/);
      expect(t).not.toMatch(/—| – /);
    }
  });
});
