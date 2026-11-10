import { describe, it, expect } from "vitest";
import { buildRows, considerations, lawyerQuestions, ROWS } from "@/lib/decision/wina-czy-bez-winy";

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
});
