import { describe, it, expect } from "vitest";
import { buildCycle, countNights, buildMonth, monthNights, openPoints, defaultAnswers, mondayOf, toISO, cycleIndex, proposalSections } from "@/lib/tools/parentingPlan";

const base = defaultAnswers();

describe("parentingPlan", () => {
  it("co drugi weekend: 12/2 noce", () => {
    const c = buildCycle({ ...base, model: "main-a-eow", handover: "fri-school", returnTime: "sun-evening" });
    expect(countNights(c)).toMatchObject({ A: 12, B: 2 });
  });
  it("co drugi weekend z powrotem w poniedziałek: 11/3", () => {
    expect(countNights(buildCycle({ ...base, model: "main-a-eow", handover: "fri-school", returnTime: "mon-school" }))).toMatchObject({ A: 11, B: 3 });
  });
  it("popołudnie w tygodniu nie zmienia nocy", () => {
    const c = buildCycle({ ...base, model: "main-a-eow-mid", handover: "fri-school", returnTime: "sun-evening" });
    expect(c.filter((d) => d.visit === "B")).toHaveLength(2);
    expect(countNights(c).B).toBe(2);
  });
  it("modele naprzemienne dają 7/7", () => {
    for (const model of ["223", "week", "5225"] as const) expect(countNights(buildCycle({ ...base, model }))).toMatchObject({ A: 7, B: 7 });
  });
  it("własny układ", () => {
    const custom = Array(14).fill("B");
    expect(countNights(buildCycle({ ...base, model: "custom", custom })).B).toBe(14);
  });
  it("indeks cyklu i miesiąc", () => {
    const start = toISO(mondayOf(new Date(Date.UTC(2026, 10, 12))));
    expect(start).toBe("2026-11-09");
    expect(cycleIndex(start, new Date(Date.UTC(2026, 10, 23)))).toBe(0);
    expect(cycleIndex(start, new Date(Date.UTC(2026, 10, 8)))).toBe(13);
    const cells = buildMonth(buildCycle({ ...base, model: "week" }), start, 2026, 10);
    const n = monthNights(cells);
    expect(n.A + n.B).toBe(30);
    expect(cells.length % 7).toBe(0);
    expect(cells[6]).not.toBeNull(); // 1.11.2026 to niedziela
  });
  it("„do ustalenia” trafia na listę otwartych punktów", () => {
    const p = openPoints({ ...base, model: "week", summer: "tbd", christmas: "tbd" });
    expect(p).toContain("Podział wakacji letnich");
    expect(p).toContain("Boże Narodzenie i Wigilia");
  });
  it("propozycja zawiera zastrzeżenie, że nie jest wiążąca", () => {
    const s = proposalSections({ ...base, model: "223", children: "1" });
    expect(s[0].items.join(" ")).toMatch(/nie jest wiążącą umową/);
  });
});
