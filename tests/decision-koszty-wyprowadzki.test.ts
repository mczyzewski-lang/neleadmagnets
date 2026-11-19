import { describe, it, expect } from "vitest";
import { defaultItems, summarizeMove, postponeList, tips, type MoveInput } from "@/lib/decision/koszty-wyprowadzki";

const base = (): MoveInput => ({ rent: 2500, depositMultiplier: 2, agencyFee: 1000, firstMonthUpfront: true, monthlyBills: 400, transitionMonths: 2, transitionMonthly: 1000, savings: 20000, items: defaultItems(false).map((x) => ({ ...x, amount: 100 })) });

describe("koszty-wyprowadzki", () => {
  it("najem na start = kaucja + prowizja + pierwszy miesiąc", () => {
    const s = summarizeMove(base());
    expect(s.byCategory.najem).toBe(2500 * 2 + 1000 + 2500);
    expect(s.byCategory.przejsciowe).toBe(2000);
  });
  it("odznaczone pozycje nie są liczone", () => {
    const i = base();
    const on = i.items.filter((x) => x.on).length;
    expect(summarizeMove(i).byCategory.przeprowadzka + summarizeMove(i).byCategory.wyposazenie + summarizeMove(i).byCategory.media + summarizeMove(i).byCategory.inne).toBe(on * 100);
  });
  it("miesiące pokrycia z oszczędności po starcie", () => {
    const s = summarizeMove(base());
    expect(s.monthly).toBe(2900);
    expect(s.savingsAfterStart).toBe(20000 - s.start);
    expect(s.monthsCovered).toBeCloseTo((20000 - s.start) / 2900);
  });
  it("dzieci dodają kategorię", () => {
    expect(defaultItems(true).some((x) => x.category === "dzieci")).toBe(true);
    expect(defaultItems(false).some((x) => x.category === "dzieci")).toBe(false);
  });
  it("lista do odłożenia zawiera pozycje odkładalne", () => {
    expect(postponeList(base()).some((x) => x.includes("Dekoracje"))).toBe(true);
  });
  it("wskazówki o dzieciach tylko przy dzieciach", () => {
    const noKids = base();
    expect(tips(noKids, summarizeMove(noKids)).join(" ")).not.toMatch(/dzieć|dziećmi|dzieci/);
    const kids = { ...base(), items: defaultItems(true) };
    expect(tips(kids, summarizeMove(kids)).join(" ")).toMatch(/z dziećmi/);
  });
  it("okres przejściowy i oszczędności zmieniają wskazówki", () => {
    const a = { ...base(), transitionMonths: 0 };
    expect(tips(a, summarizeMove(a)).join(" ")).not.toMatch(/dotychczasowego mieszkania/);
    const b = { ...base(), savings: 100 };
    expect(tips(b, summarizeMove(b)).join(" ")).toMatch(/przekraczają oszczędności/);
  });
  it("bez myślników w treści", () => {
    const t = [...tips(base(), summarizeMove(base())), ...postponeList(base())].join(" ");
    expect(t).not.toMatch(/—| – /);
  });
});
