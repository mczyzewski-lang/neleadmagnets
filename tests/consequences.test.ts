import { describe, it, expect } from "vitest";
import { buildCards } from "@/lib/tools/consequences";

const txt = (cards: ReturnType<typeof buildCards>) => JSON.stringify(cards);

describe("consequences", () => {
  it("związek nieformalny nie zawiera wspólności ani rozwodu jako procedury", () => {
    const c = buildCards({ relation: "informal", children: "minor", property: "yes", loan: "joint", business: "none", debts: "no", steps: "none" });
    const s = txt(c);
    expect(s).toContain("Kodeksu cywilnego");
    expect(s).toContain("sąd rejonowy");
    expect(s).not.toContain("wspólność ustawowa");
    expect(s).not.toContain("sąd okręgowy");
  });
  it("małżeństwo: procedury z sądem okręgowym i nazwiskiem w ciągu roku", () => {
    const s = txt(buildCards({ relation: "marriage", children: "none", property: "no", loan: "none", business: "none", debts: "no", steps: "none" }));
    expect(s).toContain("sąd okręgowy");
    expect(s).toContain("w ciągu roku");
  });
  it("brak dzieci → brak karty dzieci; brak kredytu i długów → brak karty kredytu", () => {
    const c = buildCards({ relation: "marriage", children: "none", property: "no", loan: "none", business: "none", debts: "no", steps: "none" });
    expect(c.find((x) => x.id === "dzieci")).toBeUndefined();
    expect(c.find((x) => x.id === "kredyt")).toBeUndefined();
    expect(c.find((x) => x.id === "mieszkanie")).toBeUndefined();
  });
  it("priorytety trafiają na początek", () => {
    const c = buildCards({ relation: "marriage", children: "minor", property: "yes", loan: "joint", business: "joint", debts: "yes", steps: "filed", priorities: ["mieszkanie"] });
    expect(c[0].id).toBe("mieszkanie");
    expect(c[0].relevance).toBe("priorytet");
    expect(c.find((x) => x.id === "dzialalnosc")).toBeDefined();
    expect(txt(c)).toContain("pozew został już złożony".slice(0, 10));
  });
  it("wspólny kredyt → informacja o solidarnej odpowiedzialności", () => {
    const c = buildCards({ relation: "marriage", children: "none", property: "yes", loan: "joint", business: "none", debts: "no", steps: "none" });
    expect(txt(c.filter((x) => x.id === "kredyt"))).toContain("solidarnie");
  });
});
