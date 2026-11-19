import { describe, it, expect } from "vitest";
import { buildPlan, planProgress, sortTasks, tasksForPeriod, PERIODS, type First30Answers, type Task } from "@/lib/tools/first30";

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
  it("przed pozwem: najpierw plan i ustalenia, próba mediacji (bez zagrożenia)", () => {
    const p = buildPlan({ decision: "mine", urgent: ["none"], filed: "no" });
    expect(p.some((t) => t.id === "u9")).toBe(true);
    expect(p.find((t) => t.id === "z3")?.text).toMatch(/najpierw plan, potem ustalenia/);
    const s = buildPlan({ urgent: ["safety"], filed: "no" });
    expect(s.some((t) => t.id === "u9" || t.id === "z3")).toBe(false);
    expect(s.some((t) => t.id === "z7")).toBe(true);
  });

  it("zadania pilne są na górze listy każdego okresu", () => {
    const p = buildPlan({ children: "yes", together: "yes", property: "yes", loan: "yes", decision: "partner", urgent: ["safety", "money", "housing", "kids"], filed: "partner" });
    for (const period of PERIODS) {
      const list = tasksForPeriod(p, period.id);
      const firstNormal = list.findIndex((t) => !t.priority);
      if (firstNormal >= 0) expect(list.slice(firstNormal).some((t) => t.priority)).toBe(false);
    }
    expect(tasksForPeriod(p, 1)[0].priority).toBe(true);
    expect(tasksForPeriod(p, 2)[0].id).toBe("f6");
  });
  it("sortowanie działa także po edycji i dla własnych zadań", () => {
    const tasks: Task[] = [
      { id: "a", period: 2, category: "x", text: "zwykłe" },
      { id: "c1", period: 2, category: "Moje zadanie", text: "własne", custom: true },
      { id: "c2", period: 2, category: "Moje zadanie", text: "własne pilne", custom: true, priority: true },
      { id: "b", period: 1, category: "x", text: "okres 1" },
    ];
    expect(sortTasks(tasks).map((t) => t.id)).toEqual(["b", "c2", "a", "c1"]);
    expect(tasksForPeriod(tasks, 2).map((t) => t.id)).toEqual(["c2", "a", "c1"]);
  });
  it("sygnatura sprawy nie pojawia się w pierwszym tygodniu", () => {
    const p = buildPlan({ filed: "me", urgent: ["none"] });
    const sig = p.filter((t) => /sygnatur/i.test(t.text));
    expect(sig.length).toBeGreaterThan(0);
    expect(sig.every((t) => t.period >= 3)).toBe(true);
    expect(sig[0].text).toMatch(/Gdy dostaniesz sygnaturę/);
    expect(p.filter((t) => t.period === 1).some((t) => /korespondencj/i.test(t.text))).toBe(false);
  });
  it("pozew złożony: brak instrukcji przygotowania pozwu i próby mediacji przed pozwem", () => {
    for (const f of ["me", "partner"] as const) {
      const p = buildPlan({ filed: f, urgent: ["none"], decision: "joint" });
      expect(p.some((t) => t.id === "u9" || t.id === "z3" || t.id === "u7")).toBe(false);
      expect(p.some((t) => t.id === "u8")).toBe(true);
    }
  });
  it("każda odpowiedź na każde pytanie zmienia plan", () => {
    const base: First30Answers = { children: "yes", together: "yes", property: "yes", loan: "yes", decision: "joint", urgent: ["none"], filed: "no" };
    const options: { [K in keyof First30Answers]-?: First30Answers[K][] } = {
      children: ["yes", "no"],
      together: ["yes", "partly", "no"],
      property: ["yes", "no"],
      loan: ["yes", "no"],
      decision: ["joint", "mine", "partner", "unsure"],
      urgent: [["none"], ["safety"], ["money"], ["housing"], ["kids"]],
      filed: ["no", "me", "partner"],
    };
    const key = (a: First30Answers) => buildPlan(a).map((t) => t.id).sort().join(",");
    for (const [q, vals] of Object.entries(options) as [keyof First30Answers, unknown[]][]) {
      const plans = vals.map((v) => key({ ...base, [q]: v }));
      expect(new Set(plans).size, `pytanie: ${q}`).toBe(vals.length);
    }
  });
  it("plan dla różnych sytuacji wyraźnie się różni", () => {
    const a = buildPlan({ children: "yes", together: "yes", property: "yes", loan: "yes", decision: "joint", urgent: ["none"], filed: "no" });
    const b = buildPlan({ children: "no", together: "no", property: "no", loan: "no", decision: "partner", urgent: ["money"], filed: "partner" });
    const ida = new Set(a.map((t) => t.id));
    const idb = new Set(b.map((t) => t.id));
    const shared = [...ida].filter((id) => idb.has(id));
    expect(shared.length).toBeLessThan(Math.min(ida.size, idb.size) / 2);
  });
});
