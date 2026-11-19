import { describe, it, expect } from "vitest";
import { buildCards, summaryLine, type ConsequencesAnswers } from "@/lib/tools/consequences";

const txt = (cards: ReturnType<typeof buildCards>) => JSON.stringify(cards);
const base: ConsequencesAnswers = { relation: "marriage", children: "minor", property: "yes", loan: "joint", business: "none", debts: "no", steps: "none" };

describe("consequences", () => {
  it("związek nieformalny: brak intercyzy, wspólności, rozwodu, separacji i sądu okręgowego", () => {
    for (const steps of ["none", "filed", "judgment"] as const) {
      const c = buildCards({ ...base, relation: "informal", steps });
      const s = txt(c);
      expect(s).toContain("Kodeksu cywilnego");
      expect(s).not.toMatch(/intercyz/i);
      expect(s).not.toMatch(/wspólność ustawowa/i);
      expect(s).not.toMatch(/rozw[oó]d/i);
      expect(s).not.toMatch(/separacj/i);
      expect(s).not.toContain("sąd okręgowy");
    }
    expect(txt(buildCards({ ...base, relation: "informal" }))).toContain("sąd rejonowy");
  });
  it("małżeństwo: pytanie o intercyzę, sąd okręgowy i nazwisko w ciągu roku", () => {
    const s = txt(buildCards({ ...base, children: "none", property: "no", loan: "none" }));
    expect(s).toMatch(/intercyz/);
    expect(s).toContain("sąd okręgowy");
    expect(s).toContain("w ciągu roku");
  });
  it("brak dzieci → brak karty dzieci i treści o dzieciach; brak kredytu → brak karty kredytu", () => {
    const c = buildCards({ ...base, children: "none", property: "no", loan: "none" });
    expect(c.find((x) => x.id === "dzieci")).toBeUndefined();
    expect(c.find((x) => x.id === "kredyt")).toBeUndefined();
    expect(c.find((x) => x.id === "mieszkanie")).toBeUndefined();
    expect(txt(c)).not.toMatch(/porozumienie rodzicielskie|aktów urodzenia/);
  });
  it("pozew złożony → brak przygotowania pozwu, są sprawy w toku", () => {
    const c = buildCards({ ...base, steps: "filed" });
    const s = txt(c);
    expect(s).not.toMatch(/przed pozwem|przed złożeniem pozwu|W pozwie trzeba|Opłata od pozwu o rozwód to|Który sąd byłby właściwy/);
    expect(s).toContain("zabezpieczenie");
    expect(s).toContain("rozprawy");
    expect(c.find((x) => x.id === "procedury")!.title).toBe("W trakcie sprawy");
    expect(summaryLine({ ...base, steps: "filed" })).toContain("w sądzie");
  });
  it("po wyroku → brak składania pozwu, są sprawy po wyroku", () => {
    const c = buildCards({ ...base, steps: "judgment" });
    const s = txt(c);
    expect(s).not.toMatch(/pozew|pozwu|przed rozwodem|zabezpieczenie na czas/i);
    expect(s).toContain("prawomocn");
    expect(s).toContain("nazwiska sprzed ślubu");
    expect(s).toContain("Po separacji ta możliwość nie przysługuje");
    expect(s).toMatch(/nie został(?:a|o)? podzielony/);
    expect(c.find((x) => x.id === "procedury")!.title).toBe("Sprawy po wyroku");
  });
  it("pełnoletnie uczące się dziecko: występuje o alimenty we własnym imieniu", () => {
    const s = txt(buildCards({ ...base, children: "adultLearning" }));
    expect(s).toContain("we własnym imieniu");
    expect(s).not.toMatch(/w imieniu dziecka/);
  });
  it("terminologia i forma: porozumienie rodzicielskie, bez myślników i przepisów", () => {
    const all = [
      ...["none", "talks", "mediation", "filed", "judgment"].flatMap((steps) =>
        (["marriage", "informal"] as const).flatMap((relation) =>
          (["minor", "adultLearning", "none"] as const).map((children) => txt(buildCards({ ...base, relation, children, steps: steps as ConsequencesAnswers["steps"], debts: "unsure", business: "one", property: "unsure" })))
        )
      ),
    ].join(" ");
    expect(all).not.toContain("—");
    expect(all).not.toContain(" – ");
    expect(all).not.toMatch(/\bart\. ?\d|KPC|KRO\b/);
    expect(all).not.toMatch(/wychowaniu dzieci|sposobie wykonywania władzy/);
  });
  it("priorytety trafiają na początek", () => {
    const c = buildCards({ ...base, business: "joint", debts: "yes", steps: "filed", priorities: ["mieszkanie"] });
    expect(c[0].id).toBe("mieszkanie");
    expect(c[0].relevance).toBe("priorytet");
    expect(c.find((x) => x.id === "dzialalnosc")).toBeDefined();
  });
  it("wspólny kredyt → informacja o solidarnej odpowiedzialności", () => {
    const c = buildCards({ ...base, children: "none" });
    expect(txt(c.filter((x) => x.id === "kredyt"))).toContain("solidarnie");
  });
});
