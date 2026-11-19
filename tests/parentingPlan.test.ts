import { describe, it, expect } from "vitest";
import {
  buildCycle, countNights, buildMonth, monthNights, openPoints, defaultAnswers, mondayOf, toISO, cycleIndex, proposalSections,
  presetGrid, transitions, handoverText, holidayParent, holidayYearText, describeHoliday, arrangementsSummary, PRESETS, type Parent, type PresetId,
} from "@/lib/tools/parentingPlan";

const base = { ...defaultAnswers(), form: "two-homes" as const, school: "szkola" as const };
const withPreset = (preset: PresetId) => ({ ...base, preset, ...presetGrid(preset) });

describe("parentingPlan: układy startowe", () => {
  it("co drugi weekend: 12/2", () => expect(countNights(buildCycle(withPreset("eow")))).toMatchObject({ A: 12, B: 2 }));
  it("co drugi weekend wydłużony: 11/3", () => expect(countNights(buildCycle(withPreset("eow-ext")))).toMatchObject({ A: 11, B: 3 }));
  it("co drugi weekend + nocleg w tygodniu: 10/4", () => expect(countNights(buildCycle(withPreset("eow-overnight")))).toMatchObject({ A: 10, B: 4 }));
  it("popołudnie w tygodniu nie zmienia nocy", () => {
    const c = buildCycle(withPreset("eow-afternoon"));
    expect(c.filter((d) => d.visit === "B")).toHaveLength(2);
    expect(countNights(c)).toMatchObject({ B: 2, visitsB: 2 });
  });
  it("układy naprzemienne dają 7/7", () => {
    for (const p of ["223", "week", "2255"] as const) expect(countNights(buildCycle(withPreset(p)))).toMatchObject({ A: 7, B: 7 });
  });
  it("każdy układ ma 14 dni", () => {
    for (const p of Object.keys(PRESETS) as PresetId[]) expect(PRESETS[p].grid).toHaveLength(14);
  });
});

describe("parentingPlan: własna siatka", () => {
  it("liczy noce u każdego rodzica", () => {
    const grid: Parent[] = ["A", "B", "B", "A", "A", "B", "B", "A", "A", "A", "A", "B", "B", "B"];
    expect(countNights(buildCycle({ ...base, grid, visits: Array(14).fill(null) }))).toMatchObject({ A: 7, B: 7, pctA: 50 });
    const allB: Parent[] = Array(14).fill("B");
    expect(countNights(buildCycle({ ...base, grid: allB, visits: Array(14).fill(null) })).B).toBe(14);
  });
  it("popołudnie u rodzica, który ma noc, jest ignorowane", () => {
    const a = withPreset("eow");
    const visits = [...a.visits]; visits[0] = "A";
    expect(buildCycle({ ...a, visits })[0].visit).toBeUndefined();
  });
  it("przekazania wykrywa także na przełomie cyklu", () => {
    const t = transitions(presetGrid("week").grid);
    expect(t).toEqual([{ day: 0, from: "B", to: "A" }, { day: 7, from: "A", to: "B" }]);
  });
  it("przekazanie ma dzień, godzinę i sposób; można je zmienić", () => {
    const a = withPreset("eow");
    const [fri, sun] = transitions(a.grid);
    expect(handoverText(a, fri)).toBe("piątek (tydzień 2), 16:00: odbiór ze szkoły, odbiera: Rodzic B");
    expect(handoverText(a, sun)).toMatch(/^niedziela \(tydzień 2\), 18:00: przywozi: Rodzic B, do: Rodzic A/);
    const edited = { ...a, handovers: { 11: { time: "17:00", how: "meet" as const, place: "parking przy szkole" } } };
    expect(handoverText(edited, fri)).toBe("piątek (tydzień 2), 17:00: spotkanie w ustalonym miejscu, przekazuje: Rodzic A, odbiera: Rodzic B, parking przy szkole");
    expect(openPoints({ ...a, handovers: { 11: { time: "", how: "school", place: "" } } })).toContain("Przekazanie: piątek (tydzień 2), godzina lub sposób");
  });
});

describe("parentingPlan: gniazdowanie i elastyczne ustalenia", () => {
  it("gniazdowanie: przekazanie w domu dziecka i oznaczenie jako przejściowe", () => {
    const a = { ...withPreset("week"), form: "nesting" as const, nestingUntil: "6m" as const };
    expect(handoverText(a, transitions(a.grid)[1])).toMatch(/zmiana w domu dziecka, przychodzi: Rodzic B, wychodzi: Rodzic A/);
    const text = proposalSections(a).flatMap((s) => s.items).join(" ");
    expect(text).toMatch(/rozwiązanie przejściowe, przez około 6 miesięcy/);
    expect(arrangementsSummary(a)[0].value).toMatch(/^gniazdowanie/);
  });
  it("gniazdowanie bez terminu trafia do punktów do ustalenia", () => {
    expect(openPoints({ ...withPreset("week"), form: "nesting", nestingUntil: "tbd" })).toContain("Do kiedy trwa gniazdowanie i co dalej");
  });
  it("ustalanie na bieżąco: bez harmonogramu i przekazań, z rytmem zastępczym", () => {
    const a = { ...base, form: "flexible" as const };
    const s = proposalSections(a);
    expect(s.some((x) => /Przekazania/.test(x.heading))).toBe(false);
    expect(s[1].items.join(" ")).toMatch(/rytm zastępczy: co drugi weekend/);
  });
});

describe("parentingPlan: święta w latach parzystych i nieparzystych", () => {
  it("naprzemiennie zmienia rodzica co rok", () => {
    const r = { mode: "alternate" as const, even: "A" as const, details: "" };
    expect(holidayParent(r, 2026)).toBe("A");
    expect(holidayParent(r, 2027)).toBe("B");
    expect(holidayParent({ ...r, mode: "fixed" }, 2027)).toBe("A");
    expect(holidayParent({ ...r, mode: "shared" }, 2026)).toBeNull();
  });
  it("podział dni Bożego Narodzenia i wakacji", () => {
    const bn = { mode: "split" as const, even: "B" as const, details: "" };
    expect(holidayYearText("bn", bn, 2026, "Mama", "Tata")).toBe("25 grudnia: Tata, 26 grudnia: Mama");
    expect(holidayYearText("bn", bn, 2027, "Mama", "Tata")).toBe("25 grudnia: Mama, 26 grudnia: Tata");
    const w = { mode: "months" as const, even: "A" as const, details: "" };
    expect(describeHoliday("wakacje", w, "Mama", "Tata")).toBe("w latach parzystych lipiec u: Mama, sierpień u: Tata; w nieparzystych odwrotnie");
  });
  it("„do ustalenia” trafia na listę otwartych punktów", () => {
    const a = withPreset("week");
    const p = openPoints({ ...a, holidays: { ...a.holidays, wakacje: { ...a.holidays.wakacje, mode: "tbd" } } });
    expect(p).toContain("Wakacje letnie");
    expect(p).not.toContain("Wigilia");
  });
});

describe("parentingPlan: decyzje, kontakt, projekt", () => {
  it("bieżące, istotne i nagłe sprawy są osobno", () => {
    const items = proposalSections({ ...withPreset("223"), calls: "free" }).find((s) => /Decyzje/.test(s.heading))!.items;
    expect(items[0]).toMatch(/^Bieżące sprawy: .*rodzic, u którego dziecko akurat jest/);
    expect(items[1]).toMatch(/^Istotne sprawy: .*wybór i zmiana żłobka, przedszkola lub szkoły/);
    expect(items[2]).toMatch(/^Sytuacje nagłe: .*informuje niezwłocznie/);
  });
  it("kontakt telefoniczny: swobodny domyślnie bez godzin, stałe pory wymagają opisu", () => {
    expect(openPoints({ ...base, calls: "free" })).not.toContain("Kontakt telefoniczny z drugim rodzicem");
    expect(openPoints({ ...base, calls: "fixed", callsText: "" })).toContain("Kontakt telefoniczny z drugim rodzicem");
  });
  it("wyczyszczony zapis trafia do punktów do ustalenia", () => {
    expect(openPoints({ ...base, other: { ...base.other, illness: " " } })).toContain("Choroba dziecka i odwołane przekazanie");
  });
  it("projekt: nie jest wiążący, bez myślników i przepisów", () => {
    const s = proposalSections({ ...withPreset("223"), children: "1", calls: "free" });
    const all = s.map((x) => [x.heading, ...x.items].join(" ")).join(" ");
    expect(s[0].items.join(" ")).toMatch(/nie jest wiążącą umową/);
    expect(all).not.toMatch(/—| – |art\. \d/);
    expect(s.map((x) => x.heading)[0]).toBe("1. Cel i zasady");
  });
});

describe("parentingPlan: kalendarz", () => {
  it("indeks cyklu i miesiąc", () => {
    const start = toISO(mondayOf(new Date(Date.UTC(2026, 10, 12))));
    expect(start).toBe("2026-11-09");
    expect(cycleIndex(start, new Date(Date.UTC(2026, 10, 23)))).toBe(0);
    expect(cycleIndex(start, new Date(Date.UTC(2026, 10, 8)))).toBe(13);
    const cells = buildMonth(buildCycle(withPreset("week")), start, 2026, 10);
    const n = monthNights(cells);
    expect(n.A + n.B).toBe(30);
    expect(cells.length % 7).toBe(0);
    expect(cells[6]).not.toBeNull(); // 1.11.2026 to niedziela
  });
});
