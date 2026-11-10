import { describe, it, expect } from "vitest";
import { buildPlan, planProgress } from "@/lib/tools/first30";

describe("first30", () => {
  it("dodaje zadania bezpieczeństwa i usuwa wspólne negocjacje przy zagrożeniu", () => {
    const p = buildPlan({ children: "yes", together: "yes", property: "yes", loan: "yes", decision: "joint", urgent: ["safety"], filed: "no" });
    expect(p.some((t) => t.id === "s1")).toBe(true);
    expect(p.some((t) => t.id === "u2")).toBe(false);
    expect(p.some((t) => t.id === "u3")).toBe(false);
    expect(p.some((t) => t.id === "u4")).toBe(true);
  });
  it("bez dzieci nie ma zadań dotyczących dzieci", () => {
    const p = buildPlan({ children: "no", together: "no", property: "no", loan: "no", decision: "mine", urgent: ["none"], filed: "no" });
    expect(p.some((t) => t.category === "Dzieci")).toBe(false);
    expect(p.every((t) => t.period >= 1 && t.period <= 4)).toBe(true);
  });
  it("pozew drugiej strony → priorytet terminu odpowiedzi", () => {
    const p = buildPlan({ filed: "partner", urgent: ["none"] });
    expect(p.find((t) => t.id === "p1")?.priority).toBe(true);
  });
  it("postęp", () => {
    const p = buildPlan({ urgent: ["none"] });
    expect(planProgress(p, new Set([p[0].id])).completed).toBe(1);
  });
});
