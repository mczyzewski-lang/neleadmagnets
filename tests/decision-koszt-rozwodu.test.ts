import { describe, it, expect } from "vitest";
import { DEFAULT_INPUT, hiddenCosts, summarize, courtMediatorFee, buildLines, comparePaths, refundPossible } from "@/lib/decision/koszt-rozwodu";

describe("koszt-rozwodu", () => {
  it("podstawowy rozwód bez winy: 600 zł + odpisy, zwrot 300 zł", () => {
    const s = summarize({ ...DEFAULT_INPUT, docsCount: 0 });
    expect(s.min).toBe(600);
    expect(s.refund).toBe(300);
    expect(s.minAfterRefund).toBe(300);
  });
  it("z orzekaniem o winie — brak zwrotu", () => {
    expect(refundPossible({ ...DEFAULT_INPUT, fault: "z" })).toBe(false);
  });
  it("zgodny wniosek o separację 100 zł", () => {
    const s = summarize({ ...DEFAULT_INPUT, procedure: "separacja-zgodna", docsCount: 0 });
    expect(s.court).toBe(100);
    expect(s.refund).toBe(0);
  });
  it("podział majątku 1000 / 300", () => {
    expect(buildLines({ ...DEFAULT_INPUT, property: "sad", propertyAgreed: false }).find((l) => l.id === "property")?.min).toBe(1000);
    expect(buildLines({ ...DEFAULT_INPUT, property: "sad", propertyAgreed: true }).find((l) => l.id === "property")?.min).toBe(300);
  });
  it("mediator niemajątkowa max 900, majątkowa 1% min 300 max 4000", () => {
    expect(courtMediatorFee("niemajatkowa", 1)).toBe(300);
    expect(courtMediatorFee("niemajatkowa", 3)).toBe(700);
    expect(courtMediatorFee("niemajatkowa", 10)).toBe(900);
    expect(courtMediatorFee("majatkowa", 1, 10_000)).toBe(300);
    expect(courtMediatorFee("majatkowa", 1, 150_000)).toBe(1500);
    expect(courtMediatorFee("majatkowa", 1, 300_000)).toBe(5000);
    expect(courtMediatorFee("majatkowa", 1, 2_000_000)).toBe(8000);
  });
  it("pełnomocnicy: zakres × liczba + pełnomocnictwo 17 zł", () => {
    const s = summarize({ ...DEFAULT_INPUT, docsCount: 0, lawyers: 2, lawyerMin: 3000, lawyerMax: 5000 });
    expect(s.min).toBe(600 + 6000 + 34);
    expect(s.max).toBe(600 + 10000 + 34);
  });
  it("porównanie ścieżek: spór droższy przy pomocy prawnej", () => {
    const [a, b] = comparePaths({ ...DEFAULT_INPUT, property: "sad", lawyers: 1, lawyerMin: 3000, lawyerMax: 3000 });
    expect(b.summary.max).toBeGreaterThan(a.summary.max);
  });
  it("porównanie ścieżek dla separacji dotyczy separacji, nie rozwodu", () => {
    const [a, b] = comparePaths({ ...DEFAULT_INPUT, procedure: "separacja-pozew" });
    expect(a.lines.find((l) => l.id === "court")?.label).toMatch(/separację/);
    expect(b.lines.find((l) => l.id === "court")?.label).toMatch(/separację/);
    expect(a.desc).toMatch(/Separacja/);
  });
  it("bez majątku: opis ścieżek nie wspomina o podziale", () => {
    expect(comparePaths(DEFAULT_INPUT).map((p) => p.desc).join(" ")).not.toMatch(/podział/);
  });
  it("ukryte koszty zależą od odpowiedzi", () => {
    expect(hiddenCosts({ ...DEFAULT_INPUT, procedure: "separacja-zgodna", fault: "z" }).join(" ")).not.toMatch(/orzekaniem o winie/);
    expect(hiddenCosts({ ...DEFAULT_INPUT, fault: "z" }).join(" ")).toMatch(/orzekaniem o winie/);
    expect(hiddenCosts({ ...DEFAULT_INPUT, mediation: "prywatna" }).join(" ")).not.toMatch(/Odmowa mediacji/);
    expect(hiddenCosts(DEFAULT_INPUT).join(" ")).toMatch(/zaproszenie/);
    expect(hiddenCosts({ ...DEFAULT_INPUT, property: "sad" }).join(" ")).toMatch(/Wycena majątku/);
  });
  it("bez myślników i przepisów w treści", () => {
    const i = { ...DEFAULT_INPUT, property: "w-wyroku" as const, mediation: "sad" as const, lawyers: 1 as const, fault: "z" as const };
    const t = [...buildLines(i).map((l) => `${l.label} ${l.note ?? ""}`), ...hiddenCosts(i), ...comparePaths(i).map((p) => p.desc)].join(" ");
    expect(t).not.toMatch(/—| – /);
    expect(t).not.toMatch(/art\.|§|KPC|KRO|UKSC/);
  });
});
