import { describe, it, expect } from "vitest";
import { buildPaths, infoToGather, lowAspects, reflectionQuestions, sevenDayPlan } from "@/lib/decision/kompas-decyzji";

describe("kompas-decyzji", () => {
  const base = { tried: ["talks"], values: ["children", "peace"], aspects: { communication: 1, trust: 3, safety: 5, plans: 2, finances: 4, support: 3 }, missing: ["finances", "law"], time: "weeks" as const, safety: "no" as const };
  it("zawsze pokazuje 6 dróg bez rankingu (kolejność stała)", () => {
    const ids = buildPaths(base).map((p) => p.id);
    expect(ids).toEqual(["talk", "individual", "apart", "mediation", "separation", "divorce"]);
    expect(buildPaths({ ...base, missing: ["emotions"] }).map((p) => p.id)).toEqual(ids);
  });
  it("oznacza drogi związane z brakującymi informacjami", () => {
    const p = buildPaths(base);
    expect(p.find((x) => x.id === "separation")?.relevant).toBe(true);
    expect(p.find((x) => x.id === "talk")?.relevant).toBe(false);
  });
  it("przy zagrożeniu rozmowa/terapia par i mediacja nie są oznaczane jako związane", () => {
    const p = buildPaths({ ...base, safety: "yes", missing: ["emotions", "children"] });
    expect(p.find((x) => x.id === "talk")?.relevant).toBe(false);
    expect(p.find((x) => x.id === "mediation")?.relevant).toBe(false);
    expect(p.find((x) => x.id === "individual")?.relevant).toBe(true);
  });
  it("pytania wynikają z wartości i nisko ocenionych obszarów", () => {
    expect(lowAspects(base).map((x) => x.key)).toEqual(["communication", "plans"]);
    const q = reflectionQuestions(base).join(" ");
    expect(q).toMatch(/dzieci/);
    expect(q).toMatch(/rozmawiać o trudnych sprawach/);
  });
  it("informacje do zdobycia linkują do narzędzi", () => {
    const links = infoToGather(base).map((i) => i.href);
    expect(links).toContain("/narzedzia/budzet-po-rozstaniu");
    expect(links).toContain("/narzedzia/separacja-czy-rozwod");
    expect(sevenDayPlan(base)).toHaveLength(7);
  });
});
