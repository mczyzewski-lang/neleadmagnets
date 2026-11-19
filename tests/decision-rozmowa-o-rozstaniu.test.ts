import { describe, it, expect } from "vitest";
import { buildTalkPlan, goalsFor, topicsFor } from "@/lib/decision/rozmowa-o-rozstaniu";

describe("rozmowa-o-rozstaniu", () => {
  it("tryb bezpieczeństwa: brak skryptów do rozmowy w cztery oczy, numery pomocowe", () => {
    const p = buildTalkPlan({ safety: "yes", children: "school", topics: ["money"] });
    expect(p.mode).toBe("safety");
    expect(p.openings).toHaveLength(0);
    expect(p.prepare.join(" ")).toMatch(/cztery oczy/);
    expect(p.safety.join(" ")).toMatch(/800 120 002/);
    expect(p.childrenPlan.join(" ")).toMatch(/116 111/);
  });
  it("obawa przed reakcją też włącza tryb bezpieczeństwa", () => {
    expect(buildTalkPlan({ safety: "worried" }).mode).toBe("safety");
  });
  it("otwarcia zależą od celu rozmowy", () => {
    const t = buildTalkPlan({ safety: "no", goal: "therapy" });
    const i = buildTalkPlan({ safety: "no", goal: "inform" });
    expect(t.openings[0].text).toMatch(/terapii/);
    expect(i.openings[0].text).toMatch(/rozstać/);
    expect(t.openings).toHaveLength(3);
  });
  it("dzieci → osobna rozmowa o dzieciach, bez dzieci → brak planu dla dzieci", () => {
    expect(buildTalkPlan({ safety: "no", children: "teen" }).childrenPlan.join(" ")).toMatch(/osobnej rozmowie/);
    expect(buildTalkPlan({ safety: "no", children: "none" }).childrenPlan).toHaveLength(0);
  });
  it("trudne tematy trafiają na listę spraw na później", () => {
    const p = buildTalkPlan({ safety: "no", topics: ["housing", "money", "none"] });
    expect(p.postponed).toEqual(["Mieszkanie i kto się wyprowadza", "Pieniądze, konta i kredyt"]);
  });
  it("bez dzieci: nic o dzieciach w żadnym trybie", () => {
    const plan = buildTalkPlan({ safety: "no", children: "none", goal: "interim", topics: ["children", "money"], stage: "decided" });
    const all = JSON.stringify(plan);
    expect(all).not.toMatch(/dzieci|dziećmi/);
    expect(plan.postponed).toEqual(["Pieniądze, konta i kredyt"]);
    expect(topicsFor({ children: "none" })).not.toContain("children");
    expect(JSON.stringify(buildTalkPlan({ safety: "yes", children: "none" }))).not.toMatch(/dzieci/);
  });
  it("bez podjętej decyzji nie ma wariantu „przekazać decyzję”", () => {
    expect(goalsFor({ stage: "unsure" })).not.toContain("inform");
    expect(goalsFor({ stage: "decided" })).toContain("inform");
    const p = buildTalkPlan({ safety: "no", stage: "crisis", goal: "inform" });
    expect(p.openings[0].text).not.toMatch(/chcę się rozstać/);
    expect(p.headline).not.toMatch(/decyzji o rozstaniu/);
  });
  it("każda odpowiedź o oczekiwaniach, etapie i emocjach zmienia plan", () => {
    const prep = (a: object) => buildTalkPlan({ safety: "no", ...a }).prepare.join("|");
    expect(new Set([prep({ expects: "yes" }), prep({ expects: "maybe" }), prep({ expects: "no" })]).size).toBe(3);
    expect(new Set([prep({ stage: "decided" }), prep({ stage: "crisis" }), prep({ stage: "unsure" })]).size).toBe(3);
    expect(buildTalkPlan({ safety: "no", emotions: ["calm"] }).selfCare.length).toBeGreaterThan(1);
  });
  it("bez myślników w treści", () => {
    const t = JSON.stringify([buildTalkPlan({ safety: "no", children: "teen", goal: "interim", topics: ["reasons", "family"], expects: "no", place: "walk", emotions: ["fear", "relief", "guilt"] }), buildTalkPlan({ safety: "yes", children: "small" })]);
    expect(t).not.toMatch(/—| – /);
  });
});
