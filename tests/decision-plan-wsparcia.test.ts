import { describe, it, expect } from "vitest";
import { childrenPlan, gaps, hardDayPlan, ifThenPlan, roleName, supportMatrix } from "@/lib/decision/plan-wsparcia";

describe("plan-wsparcia", () => {
  const a = { help: { emotional: ["friend", "sibling"], crisis: ["friend"], children: ["none"] }, labels: { friend: "A." }, strategies: ["move", "talk"], signals: ["sleep", "hopeless"], triggers: ["evenings"], children: "yes" as const };
  it("macierz wsparcia i luki", () => {
    const m = supportMatrix(a);
    expect(m.find((r) => r.help === "Wsparcie emocjonalne")?.who).toEqual(["Przyjaciel / przyjaciółka (A.)", "Rodzeństwo"]);
    expect(gaps(a)).toEqual(["Pomoc przy dzieciach", "Pomoc praktyczna", "Wsparcie finansowe"]);
  });
  it("etykieta obcinana do 20 znaków", () => {
    expect(roleName({ labels: { family: "x".repeat(30) } }, "family")).toBe(`Ktoś z rodziny (${"x".repeat(20)})`);
  });
  it("plan gdy-to z sygnałów i sytuacji; beznadzieja → numery kryzysowe", () => {
    const r = ifThenPlan(a);
    expect(r).toHaveLength(3);
    expect(r.find((x) => x.when.includes("beznadziei"))?.then).toMatch(/116 123/);
  });
  it("plan na trudny dzień używa osób kryzysowych i strategii", () => {
    const h = hardDayPlan(a).join(" ");
    expect(h).toMatch(/Przyjaciel/);
    expect(h).toMatch(/112/);
    expect(hardDayPlan({}).join(" ")).toMatch(/116 123/);
  });
  it("plan dla dzieci tylko gdy są dzieci", () => {
    expect(childrenPlan(a).join(" ")).toMatch(/116 111/);
    expect(childrenPlan({ children: "no" })).toHaveLength(0);
  });
});
