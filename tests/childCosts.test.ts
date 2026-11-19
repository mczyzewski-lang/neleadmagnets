import { describe, it, expect } from "vitest";
import { scenarioTotals, compareScenarios, suggestedLines, childBreakdown, linesForChild, type ChildScenario, type ChildInfo } from "@/lib/tools/childCosts";

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

describe("childCosts: kilkoro dzieci", () => {
  const kids: ChildInfo[] = [{ id: "k1", name: "Młodsze", age: "0-2" }, { id: "k2", name: "", age: "13-18" }];
  const s: ChildScenario = { id: "s", name: "Obecnie", lines: [
    { id: "1", category: "care", label: "Żłobek", amount: 1200, freq: "monthly", childId: "k1" },
    { id: "2", category: "food", label: "Jedzenie", amount: 500, freq: "monthly", childId: "k1" },
    { id: "3", category: "food", label: "Jedzenie", amount: 900, freq: "monthly", childId: "k2" },
    { id: "4", category: "education", label: "Korepetycje", amount: 1200, freq: "quarterly", childId: "k2" },
    { id: "5", category: "other", label: "Komputer", amount: 3000, freq: "once", childId: "k2" },
  ]};

  it("liczy koszty osobno dla każdego dziecka, a suma zgadza się z całością", () => {
    const b = childBreakdown(s, kids);
    expect(b.map((x) => x.totals.monthly)).toEqual([1700, 1300]);
    expect(b[1].totals.oneOff).toBe(3000);
    expect(b[1].name).toBe("Dziecko 2");
    expect(b[0].name).toBe("Młodsze");
    const total = scenarioTotals(s);
    expect(b.reduce((a, x) => a + x.totals.monthly, 0)).toBe(total.monthly);
    expect(linesForChild(s, "k1")).toHaveLength(2);
  });

  it("typowe pozycje zależą od wieku i są przypisane do dziecka", () => {
    let i = 0;
    const mk = () => `x${i++}`;
    const toddler = suggestedLines("0-2", mk, "k1");
    const teen = suggestedLines("13-18", mk, "k2");
    expect(toddler.every((l) => l.childId === "k1" && l.amount === undefined)).toBe(true);
    expect(teen.every((l) => l.childId === "k2")).toBe(true);
    expect(toddler.some((l) => l.label.includes("Pieluchy"))).toBe(true);
    expect(teen.some((l) => l.label.includes("Pieluchy"))).toBe(false);
    expect(teen.some((l) => l.label.includes("Korepetycje"))).toBe(true);
    expect(toddler.some((l) => l.label.includes("Korepetycje"))).toBe(false);
  });
});
