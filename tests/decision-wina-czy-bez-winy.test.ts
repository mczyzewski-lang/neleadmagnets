import { describe, it, expect } from "vitest";
import { buildRows, considerations, lawyerQuestions, prioritiesFor, ROWS } from "@/lib/decision/wina-czy-bez-winy";

describe("wina-czy-bez-winy", () => {
  it("zawsze pokazuje wszystkie wiersze", () => {
    expect(buildRows({}).length).toBe(ROWS.length);
  });
  it("wyróżnia alimenty przy ryzyku trudnej sytuacji i stawia je wysoko", () => {
    const r = buildRows({ hardship: "me", priorities: ["costs"] });
    expect(r.find((x) => x.id === "alimony")?.highlight).toBe(true);
    expect(r.findIndex((x) => x.id === "alimony")).toBeLessThan(3);
    expect(r.find((x) => x.id === "name")?.highlight).toBe(false);
  });
  it("brak zgody drugiej strony wyróżnia przesłankę z art. 56 § 3", () => {
    expect(buildRows({ consent: "no" }).find((x) => x.id === "negative")?.highlight).toBe(true);
  });
  it("nie zawiera rekomendacji wariantu", () => {
    const txt = considerations({ consent: "yes", hardship: "partner", priorities: ["justice", "privacy"], children: "minor" }).join(" ");
    expect(txt).not.toMatch(/powinieneś|powinnaś|zalecamy|wybierz/i);
  });
  it("pytanie o bezpieczeństwo przy przemocy", () => {
    expect(lawyerQuestions({ safety: "yes" }).some((q) => q.includes("bezpieczeństwo"))).toBe(true);
  });
  it("bez małoletnich dzieci: brak wierszy i priorytetu o dzieciach", () => {
    for (const children of ["none", "adult"] as const) {
      const ids = buildRows({ children, priorities: ["coparenting"] }).map((r) => r.id);
      expect(ids).not.toContain("children");
      expect(ids).not.toContain("coparenting");
      expect(prioritiesFor({ children }).some((p) => p.value === "coparenting")).toBe(false);
    }
    expect(considerations({ children: "none" }).join(" ")).not.toMatch(/dzieci|rodzicielsk/i);
    expect(buildRows({ children: "minor" }).find((r) => r.id === "children")?.highlight).toBe(true);
  });
  it("pełnoletnie dziecko: alimenty we własnym imieniu", () => {
    expect(considerations({ children: "adult" }).join(" ")).toMatch(/we własnym imieniu/);
  });
  it("każda odpowiedź o sytuacji materialnej zmienia wynik", () => {
    const outs = (["me", "partner", "none", "unsure"] as const).map((h) => considerations({ hardship: h }).join("|"));
    expect(new Set(outs).size).toBe(4);
    expect(lawyerQuestions({ hardship: "none" }).join(" ")).not.toMatch(/alimenty między nami/);
  });
  it("brak zgody: zaproszenie do mediacji, ale nie przy przemocy", () => {
    expect(considerations({ consent: "no", safety: "no" }).join(" ")).toMatch(/zaproszenie do mediacji/);
    expect(considerations({ consent: "no", safety: "yes" }).join(" ")).not.toMatch(/zaproszenie do mediacji/);
  });
  it("bez myślników i przepisów w treści", () => {
    const t = [...ROWS.flatMap((r) => [r.topic, r.noFault, r.withFault]), ...considerations({ consent: "no", hardship: "me", children: "minor", priorities: ["justice", "privacy"] })].join(" ");
    expect(t).not.toMatch(/—| – /);
    expect(t).not.toMatch(/art\.|§|KPC|KRO/);
  });
});
