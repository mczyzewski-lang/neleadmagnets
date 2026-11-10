import { describe, it, expect } from "vitest";
import { scenarioTotals, compareScenarios, suggestedLines, type ChildScenario } from "@/lib/tools/childCosts";

const s1: ChildScenario = { id: "a", name: "Obecnie", lines: [
  { id: "1", category: "food", label: "Jedzenie", amount: 800, freq: "monthly" },
  { id: "2", category: "clothes", label: "Ubrania", amount: 600, freq: "quarterly" },
  { id: "3", category: "holidays", label: "Kolonie", amount: 2400, freq: "yearly" },
  { id: "4", category: "other", label: "Rower", amount: 1500, freq: "once" },
]};

describe("childCosts", () => {
  it("liczy koszt miesięczny, roczny i jednorazowy", () => {
    const t = scenarioTotals(s1);
    expect(t.monthly).toBe(1200);
    expect(t.yearly).toBe(14400);
    expect(t.oneOff).toBe(1500);
    expect(t.yearlyWithOneOff).toBe(15900);
  });
  it("porównuje scenariusze", () => {
    const s2: ChildScenario = { ...s1, id: "b", lines: s1.lines.map((l) => (l.category === "food" ? { ...l, amount: 1000 } : l)) };
    const c = compareScenarios([s1, s2]);
    expect(c.totals[1].monthly - c.totals[0].monthly).toBe(200);
    expect(c.rows.find((r) => r.category === "food")!.delta).toBe(200);
  });
  it("sugerowane pozycje nie mają z góry przyjętych kwot", () => {
    let i = 0;
    const lines = suggestedLines("3-6", () => `x${i++}`);
    expect(lines.every((l) => l.amount === undefined)).toBe(true);
    expect(lines.some((l) => l.category === "care")).toBe(true);
  });
});
