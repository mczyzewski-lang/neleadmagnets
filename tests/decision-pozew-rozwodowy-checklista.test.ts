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
  it("najpierw plan, ustalenia i próba mediacji — przed treścią pozwu", () => {
    const g = buildChecklist({ children: "minor", agreement: "no" });
    expect(g[0].id).toBe("before");
    expect(g[0].items.map((i) => i.id)).toEqual(["b1", "b2", "b3", "b4"]);
    const b4 = g[0].items.find((i) => i.id === "b4")!;
    expect(b4.text).toMatch(/zaproszenie do mediacji/i);
    expect(b4.note).toMatch(/mediator może to potwierdzić na piśmie/);
    expect(b4.note).toMatch(/dobrowolna/);
    expect(b4.note).not.toMatch(/doręcz/);
  });
  it("odmowa drugiej strony: dokumenty próby jako załącznik i informacja w pozwie", () => {
    const g = buildChecklist({ mediation: "refused" });
    const items = g.flatMap((x) => x.items);
    expect(items.find((i) => i.id === "u3")?.text).toMatch(/braku zgody drugiej strony/);
    expect(items.some((i) => i.id === "a6")).toBe(true);
    expect(items.find((i) => i.id === "b4")?.note).toMatch(/koszty/);
  });
  it("brak bezpieczeństwa: nie namawia do mediacji, wymaga wyjaśnienia w pozwie", () => {
    const items = buildChecklist({ mediation: "unsafe" }).flatMap((x) => x.items);
    expect(items.find((i) => i.id === "b4")?.text).toMatch(/nie musisz proponować mediacji/);
    expect(items.find((i) => i.id === "u3")?.text).toMatch(/wyjaśnieniem przyczyn/);
    expect(items.some((i) => i.id === "a6")).toBe(false);
  });

  const all = (a: Parameters<typeof buildChecklist>[0]) => buildChecklist(a).flatMap((g) => g.items);
  const text = (a: Parameters<typeof buildChecklist>[0]) => all(a).map((i) => `${i.text} ${i.note ?? ""}`).join(" ");
  it("bez myślników i przepisów w treści", () => {
    const t = text({ children: "minor", agreement: "maybe", mediation: "refused", fault: "fault", alimony: "request", flat: "yes", property: "together" }) + text({ mediation: "unsafe", children: "adult", property: "later" });
    expect(t).not.toMatch(/—| – /);
    expect(t).not.toMatch(/art\.|§|KPC|KRO/);
  });
  it("brak dzieci: nic o dzieciach w żądaniach i uzasadnieniu", () => {
    const t = text({ children: "none", alimony: "request" });
    expect(t).not.toMatch(/małoletni|kontakty z dziećmi|alimenty na dzieci/i);
    expect(all({ children: "none" }).find((i) => i.id === "u1")?.text).toMatch(/nie macie wspólnych dzieci/);
  });
  it("pełnoletnie dziecko: roszczenie we własnym imieniu", () => {
    expect(all({ children: "adult" }).find((i) => i.id === "k6")?.text).toMatch(/we własnym imieniu/);
  });
  it("odpowiedzi o mieszkaniu i majątku zmieniają listę", () => {
    expect(all({ flat: "no", property: "none" }).some((i) => i.id.startsWith("p"))).toBe(false);
    expect(all({ flat: "yes" }).some((i) => i.id === "p1")).toBe(true);
    expect(all({ property: "later" }).some((i) => i.id === "p3")).toBe(true);
  });
  it("porozumienie rodzicielskie: terminologia", () => {
    expect(text({ children: "minor", agreement: "no" })).toMatch(/porozumienie rodzicielskie/);
  });
});
