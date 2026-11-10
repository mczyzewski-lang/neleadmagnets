import { describe, it, expect } from "vitest";
import { buildScenarios, computeMoney, propertyStatus, buildRisks } from "@/lib/tools/housing";

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
});
