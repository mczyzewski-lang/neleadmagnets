import { describe, it, expect } from "vitest";
import { buildPreFiling, type PreFilingAnswers } from "@/lib/tools/preFiling";

const allText = (r: unknown) => JSON.stringify(r);

describe("preFiling", () => {
  const base: PreFilingAnswers = { decision: "taken", openness: "both", children: "minor", finances: "yes", topics: ["opieka", "kontakty", "mieszkanie", "kredyt", "wina"], agreed: ["kontakty"], contested: ["mieszkanie"] };
  const notReady: PreFilingAnswers = { decision: "taken", safety: "no", openness: "me", children: "none", finances: "no", topics: ["majatek"] };

  it("safety=yes usuwa rozmowy, mediację i DUO, oferuje tylko konsultację", () => {
    const r = buildPreFiling({ ...base, safety: "yes" });
    expect(r.mode).toBe("safety");
    expect(r.talks).toBeNull();
    expect(r.mediation).toBeNull();
    expect(r.mediatorQuestions).toHaveLength(0);
    expect(r.offers.map((o) => o.key)).toEqual(["konsultacja"]);
    expect(allText(r.sequence)).toContain("112");
    expect(r.pozew.join(" ")).toMatch(/bezpieczeństwa/);
  });
  it("brak swobody rozmowy też wyłącza mediację", () => {
    const r = buildPreFiling({ ...base, safety: "no", balance: "unequal" });
    expect(r.mode).toBe("safety");
    expect(r.offers.some((o) => o.key === "duo" || o.key === "mediacja")).toBe(false);
  });
  it("oboje otwarci + decyzja → plan-rozwodu + DUO", () => {
    const r = buildPreFiling({ ...base, safety: "no", balance: "ok" });
    expect(r.mode).toBe("standard");
    expect(r.offers.map((o) => o.key)).toEqual(["plan-rozwodu", "duo"]);
    expect(r.readiness).toEqual({ agreed: 1, open: 3, contested: 1, total: 5 });
    expect(r.analysis.map((a) => a.topic).join()).toContain("Mieszkanie");
    expect(r.notes.join()).toContain("dobrowolna");
  });
  it("tylko użytkownik gotowy → plan-rozwodu + konsultacja", () => {
    const r = buildPreFiling(notReady);
    expect(r.offers.map((o) => o.key)).toEqual(["plan-rozwodu", "konsultacja"]);
  });
  it("tematy dzieci ignorowane, gdy brak małoletnich", () => {
    const r = buildPreFiling({ decision: "taken", safety: "no", openness: "both", balance: "ok", children: "none", finances: "no", topics: ["opieka", "majatek"] });
    expect(r.readiness.total).toBe(1);
    expect(allText(r)).not.toMatch(/porozumienie rodzicielskie/);
  });

  it("rozmowy, mediacja i pozew to osobne części wyniku", () => {
    const r = buildPreFiling({ ...base, safety: "no", balance: "ok" });
    expect(r.talks?.possible).toBe(true);
    expect(r.talks?.points.length).toBeGreaterThan(0);
    expect(r.talks?.writeDown.join(" ")).toMatch(/porozumienie rodzicielskie/);
    // rozmowy nie mówią o mediatorze jako o tym samym
    expect(r.talks?.intro).not.toMatch(/mediacj/i);
    expect(r.mediation?.intro).toMatch(/mediator/);
    expect(r.mediation?.when.join(" ")).toMatch(/mieszkanie/i);
    expect(r.pozew[0]).toMatch(/próba mediacji lub innego polubownego/);
    expect(r.pozew.join(" ")).toMatch(/rozmowy między Wami nie są mediacją/i);
    const titles = r.sequence.map((s) => s.title);
    expect(titles.indexOf("Rozmowy między Wami")).toBeLessThan(titles.indexOf("Mediacja, jeśli potrzebna"));
    expect(titles.indexOf("Mediacja, jeśli potrzebna")).toBeLessThan(titles.indexOf("Pozew"));
  });

  it("mediacja zaczyna się zwykle od zaproszenia; formalny wniosek nie jest jedyną drogą", () => {
    const r = buildPreFiling(notReady);
    const start = r.mediation!.start.join(" ");
    expect(r.mediation!.start[0]).toMatch(/zaproszenie do mediacji/);
    expect(start).toMatch(/ośrodek mediacji/);
    expect(start).toMatch(/oświadczenie/);
    expect(start).toMatch(/wniosek.*nie jedyna/);
    expect(r.talks?.possible).toBe(false);
    expect(r.pozew.join(" ")).toMatch(/zaproszenie oraz oświadczenie/);
    expect(r.mediatorQuestions[0]).toMatch(/zaproszenie do mediacji/);
  });

  it("oboje otwarci: wspólne zgłoszenie, bez oświadczenia o odmowie", () => {
    const r = buildPreFiling({ ...base, safety: "no", balance: "ok" });
    expect(r.mediation!.start[0]).toMatch(/razem/);
    expect(r.mediation!.start.join(" ")).not.toMatch(/oświadczenie o braku zgody/);
  });

  it("decyzja drugiej strony → odpowiedź na pozew; rozważam → bez nacisku na pozew", () => {
    expect(buildPreFiling({ ...notReady, decision: "partner" }).pozew.join(" ")).toMatch(/odpowiedzi na pozew/);
    expect(buildPreFiling({ ...notReady, decision: "considering" }).pozew.join(" ")).toMatch(/jeszcze nie zapadła/);
  });

  it("pełnoletnie dziecko: roszczenie we własnym imieniu", () => {
    const r = buildPreFiling({ ...notReady, children: "adult" });
    expect(r.notes.join(" ")).toMatch(/we własnym imieniu/);
  });

  it("żaden wariant nie zawiera myślników ani przepisów w treści", () => {
    const variants: PreFilingAnswers[] = [
      { ...base, safety: "yes" },
      { ...base, safety: "no", balance: "ok" },
      { ...base, safety: "skip", openness: "unsure", balance: "unsure" },
      { ...base, safety: "no", openness: "partner", balance: "ok", decision: "partner" },
      notReady,
      { ...notReady, openness: "none", decision: "considering", children: "adult" },
    ];
    for (const v of variants) {
      const txt = allText(buildPreFiling(v));
      expect(txt).not.toMatch(/—| – /);
      expect(txt).not.toMatch(/\bart\.\s?\d|KPC|KRO/);
    }
  });
});
