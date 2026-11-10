import { describe, it, expect } from "vitest";
import { buildPreFiling, type PreFilingAnswers } from "@/lib/tools/preFiling";

describe("preFiling", () => {
  const base: PreFilingAnswers = { decision: "taken", openness: "both", children: "minor", finances: "yes", topics: ["opieka", "kontakty", "mieszkanie", "kredyt", "wina"], agreed: ["kontakty"], contested: ["mieszkanie"] };

  it("safety=yes usuwa mediację i DUO, oferuje tylko konsultację", () => {
    const r = buildPreFiling({ ...base, safety: "yes", });
    expect(r.mode).toBe("safety");
    expect(r.mediationSteps).toHaveLength(0);
    expect(r.mediatorQuestions).toHaveLength(0);
    expect(r.offers.map((o) => o.key)).toEqual(["konsultacja"]);
    expect(JSON.stringify(r.sequence)).toContain("112");
  });
  it("brak swobody rozmowy też wyłącza mediację", () => {
    const r = buildPreFiling({ ...base, safety: "no", balance: "unequal" });
    expect(r.mode).toBe("safety");
    expect(r.offers.some((o) => o.key === "duo" || o.key === "mediacja")).toBe(false);
  });
  it("oboje otwarci + decyzja → plan-rozwodu + DUO", () => {
    const r = buildPreFiling({ ...base, safety: "no", balance: "ok", });
    expect(r.mode).toBe("standard");
    expect(r.offers.map((o) => o.key)).toEqual(["plan-rozwodu", "duo"]);
    expect(r.readiness).toEqual({ agreed: 1, open: 3, contested: 1, total: 5 });
    expect(r.analysis.map((a) => a.topic).join()).toContain("Mieszkanie");
    expect(r.notes.join()).toContain("dobrowolna");
  });
  it("tylko użytkownik gotowy → plan-rozwodu + konsultacja", () => {
    const r = buildPreFiling({ decision: "taken", safety: "no", openness: "me", children: "none", finances: "no", topics: ["majatek"] });
    expect(r.offers.map((o) => o.key)).toEqual(["plan-rozwodu", "konsultacja"]);
  });
  it("tematy dzieci ignorowane, gdy brak małoletnich", () => {
    const r = buildPreFiling({ decision: "taken", safety: "no", openness: "both", balance: "ok", children: "none", finances: "no", topics: ["opieka", "majatek"] });
    expect(r.readiness.total).toBe(1);
  });
});
