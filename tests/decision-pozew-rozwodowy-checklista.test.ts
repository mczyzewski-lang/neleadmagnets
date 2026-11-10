import { describe, it, expect } from "vitest";
import { buildChecklist, findCourt } from "@/lib/decision/pozew-rozwodowy-checklista";

describe("pozew-rozwodowy-checklista", () => {
  it("reguła 1: wspólne miejsce, ktoś nadal mieszka", () => {
    expect(findCourt({ commonHome: "yes", stillThere: "partner", partnerWhere: "pl", meWhere: "pl" }).rule).toBe("common");
  });
  it("reguła 2: nikt nie został, pozwany w Polsce", () => {
    expect(findCourt({ commonHome: "yes", stillThere: "none", partnerWhere: "pl", meWhere: "pl" }).rule).toBe("defendant");
  });
  it("reguła 3: pozwany za granicą lub nieznany", () => {
    const r = findCourt({ commonHome: "never", partnerWhere: "abroad", meWhere: "pl" });
    expect(r.rule).toBe("plaintiff");
    expect(r.crossBorder).toBe(true);
    expect(findCourt({ commonHome: "never", partnerWhere: "unknown", meWhere: "pl" }).rule).toBe("plaintiff");
  });
  it("oboje za granicą → konsultacja", () => {
    expect(findCourt({ commonHome: "abroad", partnerWhere: "abroad", meWhere: "abroad" }).rule).toBe("consult");
  });
  it("sekcja dzieci tylko przy małoletnich, porozumienie jako załącznik", () => {
    const ids = (a: Parameters<typeof buildChecklist>[0]) => buildChecklist(a).flatMap((g) => g.items.map((i) => i.id));
    expect(ids({ children: "none" })).not.toContain("k1");
    expect(ids({ children: "minor", agreement: "yes" })).toEqual(expect.arrayContaining(["k1", "k5", "a2"]));
  });
  it("zawsze opłata 600 zł i informacja o mediacji", () => {
    const txt = buildChecklist({}).flatMap((g) => g.items.map((i) => i.text)).join(" ");
    expect(txt).toMatch(/600 zł/);
    expect(txt).toMatch(/mediacji/);
  });
});
