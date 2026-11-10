import { describe, it, expect } from "vitest";
import { monthlyEquivalent } from "@/lib/tools/expenses";
import { summarize, computeVariants, DEFAULT_ASSUMPTIONS, biggestBurdens, financialTodo, type BudgetLine, type BudgetState } from "@/lib/tools/budget";

const lines: BudgetLine[] = [
  { id: "1", category: "income", label: "Pensja", now: 6000, after: 6000, freq: "monthly" },
  { id: "2", category: "housing", label: "Najem", now: 1500, after: 2500, freq: "monthly" },
  { id: "3", category: "transport", label: "OC", now: 1200, after: 1200, freq: "yearly" },
  { id: "4", category: "food", label: "Jedzenie", now: 1000, after: 1200, freq: "monthly" },
  { id: "5", category: "oneoff", label: "Kaucja", after: 5000, freq: "once" },
];

describe("expenses", () => {
  it("przelicza częstotliwości na miesięczny ekwiwalent", () => {
    expect(monthlyEquivalent(1200, "yearly")).toBe(100);
    expect(monthlyEquivalent(300, "quarterly")).toBe(100);
    expect(monthlyEquivalent(600, "halfyear")).toBe(100);
    expect(monthlyEquivalent(500, "once")).toBe(0);
    expect(monthlyEquivalent(-5, "monthly")).toBe(0);
  });
});

describe("budget", () => {
  it("liczy budżet obecny i po rozstaniu", () => {
    const now = summarize(lines, "now");
    expect(now.income).toBe(6000);
    expect(now.expenses).toBe(2600);
    expect(now.oneOff).toBe(0);
    const after = summarize(lines, "after");
    expect(after.expenses).toBe(3800);
    expect(after.balance).toBe(2200);
    expect(after.oneOff).toBe(5000);
  });
  it("alimenty to wyłącznie założenie użytkownika", () => {
    const a = summarize(lines, "after", { alimonyIn: 500, alimonyOut: 0 });
    expect(a.income).toBe(6500);
  });
  it("warianty stosują widoczne założenia", () => {
    const s: BudgetState = { lines, savings: 8000, assumptions: DEFAULT_ASSUMPTIONS };
    const [cautious, base, opt] = computeVariants(s);
    expect(base.expenses).toBe(3800);
    expect(cautious.expenses).toBeCloseTo(2500 * 1.1 + 1300 * 1.1);
    expect(opt.expenses).toBeCloseTo(2500 + 1300 * 0.95);
    expect(base.cushionAfterOneOff).toBe(3000);
    expect(base.monthsUntilEmpty).toBeNull();
    expect(cautious.oneOff).toBe(6000);
  });
  it("liczy na ile miesięcy wystarczy poduszka przy deficycie", () => {
    const s: BudgetState = { lines: [{ id: "a", category: "income", label: "x", after: 3000, freq: "monthly" }, { id: "b", category: "housing", label: "y", after: 4000, freq: "monthly" }], savings: 6000, assumptions: DEFAULT_ASSUMPTIONS };
    const base = computeVariants(s)[1];
    expect(base.balance).toBe(-1000);
    expect(base.monthsUntilEmpty).toBe(6);
    expect(financialTodo(s, computeVariants(s))[0]).toMatch(/przekraczają dochody/);
  });
  it("wskazuje największe obciążenia", () => {
    expect(biggestBurdens(summarize(lines, "after"))[0].category).toBe("housing");
  });
});
