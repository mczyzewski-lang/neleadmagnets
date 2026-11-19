import { describe, it, expect } from "vitest";
import { buildDocument, shares, splitBills } from "@/lib/decision/porozumienie-przejsciowe";

describe("porozumienie-przejsciowe", () => {
  it("podział proporcjonalny do dochodów", () => {
    const s = splitBills({ split: "proportional", incomeMe: 6000, incomePartner: 4000, bills: [{ id: "1", name: "Czynsz", amount: 2000 }, { id: "2", name: "Media", amount: 500 }] });
    expect(s?.pctMe).toBe(60);
    expect(s?.me).toBe(1500);
    expect(s?.partner).toBe(1000);
    expect(s?.total).toBe(2500);
  });
  it("brak dochodów → po połowie z notatką", () => {
    const s = shares({ split: "proportional" });
    expect(s?.me).toBe(0.5);
    expect(s?.note).toBeTruthy();
  });
  it("do ustalenia → brak wyliczeń", () => {
    expect(splitBills({ split: "tbd" })).toBeNull();
  });
  it("sekcja dzieci tylko gdy są dzieci; braki trafiają do listy do ustalenia", () => {
    const a = buildDocument({ children: "no", housing: "rooms", split: "half", account: "keep", channel: "msg", guests: "notice" });
    expect(a.sections.some((s) => s.heading === "Dzieci")).toBe(false);
    const b = buildDocument({ children: "yes", childDaily: "tbd" });
    expect(b.sections.some((s) => s.heading === "Dzieci")).toBe(true);
    expect(b.open.some((o) => o.startsWith("Dzieci"))).toBe(true);
    expect(b.open.some((o) => o.startsWith("Rachunki"))).toBe(true);
  });
  it("zawsze ostrzega przed jednostronnym opróżnianiem kont", () => {
    expect(buildDocument({ account: "keep" }).sections.flatMap((s) => s.items).join(" ")).toMatch(/jednostronnie/);
  });
  it("osobne mieszkanie: bez zasad o gościach we wspólnym mieszkaniu", () => {
    const d = buildDocument({ together: "no", housing: "settled", guests: "free" });
    expect(d.open.some((o) => o.startsWith("Goście"))).toBe(false);
    expect(d.sections.flatMap((s) => s.items).join(" ")).not.toMatch(/gości/);
    expect(buildDocument({ together: "yes", housing: "rooms" }).open.some((o) => o.startsWith("Goście"))).toBe(true);
  });
  it("częściowo razem zmienia sekcję mieszkania", () => {
    const h = (together: "yes" | "partly") => buildDocument({ together, housing: "rooms" }).sections.find((s) => s.heading === "Mieszkanie")!.items.join(" ");
    expect(h("partly")).not.toBe(h("yes"));
  });
  it("nagłówek sekcji rzeczy zależy od samochodu i zwierząt", () => {
    const heads = (car: "none" | "me", pets: "none" | "me") => buildDocument({ car, pets }).sections.map((s) => s.heading);
    expect(heads("none", "none")).toContain("Rzeczy");
    expect(heads("me", "none")).toContain("Samochód i rzeczy");
    expect(heads("me", "me")).toContain("Samochód, zwierzęta i rzeczy");
  });
  it("bez myślników w dokumencie", () => {
    const d = buildDocument({ children: "yes", childDaily: "me", childContact: "fixed", tellKids: "later", split: "half", account: "close", car: "shared", pets: "me", channel: "msg", guests: "notice" });
    expect(d.sections.flatMap((s) => s.items).join(" ") + d.open.join(" ")).not.toMatch(/—| – /);
  });
});
