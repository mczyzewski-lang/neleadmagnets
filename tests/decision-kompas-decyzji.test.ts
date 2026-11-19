import { describe, it, expect } from "vitest";
import { buildPaths, infoToGather, lowAspects, missingFor, reflectionQuestions, sevenDayPlan, valuesFor } from "@/lib/decision/kompas-decyzji";

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
  it("związek nieformalny: bez separacji i rozwodu", () => {
    const a = { ...base, relation: "informal" as const, kids: "none" as const };
    const ids = buildPaths(a).map((p) => p.id);
    expect(ids).not.toContain("separation");
    expect(ids).not.toContain("divorce");
    expect(ids).toContain("breakup");
    const t = JSON.stringify(buildPaths(a)) + JSON.stringify(infoToGather(a));
    expect(t).not.toMatch(/rozwód|rozwodu|separacj|wspólność majątkowa(?! małżeńska)|intercyz/i);
    expect(buildPaths({ ...base, relation: "married" }).map((p) => p.id)).toContain("divorce");
  });
  it("bez dzieci: brak wartości, pytań i treści o dzieciach", () => {
    const a = { ...base, relation: "married" as const, kids: "none" as const, values: ["children", "peace"], missing: ["children", "finances"] };
    expect(valuesFor(a).some((v) => v.value === "children")).toBe(false);
    expect(missingFor(a).some((v) => v.value === "children")).toBe(false);
    expect(reflectionQuestions(a).join(" ")).not.toMatch(/dzieci/);
    expect(sevenDayPlan(a).join(" ")).not.toMatch(/dzieci/);
    expect(infoToGather(a).map((i) => i.href)).not.toContain("/narzedzia/plan-opieki-nad-dzieckiem");
    expect(JSON.stringify(buildPaths(a))).not.toMatch(/dzieci/);
  });
  it("czas na decyzję i dotychczasowe próby zmieniają wynik", () => {
    const d = (time: "urgent" | "weeks" | "nopressure") => sevenDayPlan({ ...base, time })[6];
    expect(new Set([d("urgent"), d("weeks"), d("nopressure")]).size).toBe(3);
    const apart = (tried: string[]) => buildPaths({ ...base, tried }).find((p) => p.id === "apart")!.consider.join(" ");
    expect(apart(["time-apart"])).not.toBe(apart(["talks"]));
    const talk = (tried: string[]) => buildPaths({ ...base, tried }).find((p) => p.id === "talk")!.consider.join(" ");
    expect(talk(["talks"])).not.toBe(talk(["nothing"]));
  });
  it("mediacja: zaproszenie, bez myślników i przepisów", () => {
    const t = JSON.stringify(buildPaths(base)) + reflectionQuestions(base).join(" ") + sevenDayPlan(base).join(" ");
    expect(t).toMatch(/zaproszenia do mediacji/);
    expect(t).not.toMatch(/—| – /);
    expect(t).not.toMatch(/art\.|§|KPC|KRO/);
  });
});
