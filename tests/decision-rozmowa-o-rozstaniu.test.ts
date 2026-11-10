import { describe, it, expect } from "vitest";
import { buildTalkPlan } from "@/lib/decision/rozmowa-o-rozstaniu";

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
});
