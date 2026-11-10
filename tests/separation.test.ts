import { describe, it, expect } from "vitest";
import { orderedRows, highlighted, consultIssues, ROWS } from "@/lib/tools/separation";

describe("separation", () => {
  it("zawsze pokazuje wszystkie wiersze, kluczowe na górze", () => {
    const r = orderedRows({ topics: [] });
    expect(r).toHaveLength(ROWS.length);
    expect(r.slice(0, 3).map((x) => x.id)).toEqual(["przeslanki", "status", "malzenstwo"]);
  });
  it("wybrane tematy są wyróżnione", () => {
    const h = highlighted({ topics: ["nazwisko"], reconcile: "maybe" });
    expect(h.has("nazwisko")).toBe(true);
    expect(h.has("powrot")).toBe(true);
  });
  it("małoletnie dzieci → informacja o braku zgodnego wniosku", () => {
    expect(consultIssues({ topics: [], children: "minor" }).join(" ")).toMatch(/zgodny wniosek nie jest dostępna/);
  });
  it("nazwisko: termin 1 roku", () => {
    expect(ROWS.find((r) => r.id === "nazwisko")!.divorce).toMatch(/1 roku/);
  });
  it("nie zawiera rekomendacji wyboru", () => {
    const txt = JSON.stringify(ROWS);
    expect(txt).not.toMatch(/powinieneś|powinnaś|zalecamy/i);
  });
});
