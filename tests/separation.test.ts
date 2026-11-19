import { describe, it, expect } from "vitest";
import { orderedRows, highlighted, consultIssues, commonEffects, keyDifferences, situationNotes, specialistQuestions, ROWS, type SeparationAnswers } from "@/lib/tools/separation";

const all = (a: SeparationAnswers) =>
  JSON.stringify([orderedRows(a), situationNotes(a), commonEffects(a), keyDifferences(a), consultIssues(a), specialistQuestions(a)]);

describe("separation", () => {
  it("kluczowe wiersze na górze", () => {
    const r = orderedRows({ topics: [], children: "minor" });
    expect(r).toHaveLength(ROWS.length);
    expect(r.slice(0, 2).map((x) => x.id)).toEqual(["przeslanki", "status"]);
  });
  it("brak dzieci → brak sekcji i treści o dzieciach", () => {
    const a: SeparationAnswers = { topics: ["dzieci"], children: "none", property: "yes", agreement: "agree", reconcile: "no", remarry: "no", worldview: "no" };
    expect(orderedRows(a).find((r) => r.id === "dzieci")).toBeUndefined();
    const s = JSON.stringify([situationNotes(a), commonEffects(a), consultIssues(a), specialistQuestions(a)]);
    expect(s).not.toMatch(/władzy rodzicielskiej|porozumienie rodzicielskie|kontaktach/i);
  });
  it("dzieci pełnoletnie → brak sekcji o władzy rodzicielskiej, informacja o roszczeniu we własnym imieniu", () => {
    const a: SeparationAnswers = { topics: [], children: "adult" };
    expect(orderedRows(a).find((r) => r.id === "dzieci")).toBeUndefined();
    expect(all(a)).toContain("we własnym imieniu");
  });
  it("małoletnie dzieci → wiersz dzieci wyróżniony i brak zgodnego wniosku", () => {
    const a: SeparationAnswers = { topics: [], children: "minor" };
    expect(orderedRows(a).find((r) => r.id === "dzieci")!.relevant).toBe(true);
    expect(consultIssues(a).join(" ")).toMatch(/zgodny wniosek nie jest dostępna/);
  });
  it("powrót i nowe małżeństwo zmieniają wyróżnienia i pytania", () => {
    const yes: SeparationAnswers = { topics: [], reconcile: "yes", remarry: "yes" };
    const no: SeparationAnswers = { topics: [], reconcile: "no", remarry: "no" };
    expect(highlighted(yes).has("powrot")).toBe(true);
    expect(highlighted(no).has("powrot")).toBe(false);
    expect(highlighted(no).has("malzenstwo")).toBe(false);
    expect(keyDifferences(yes).join(" ")).toMatch(/znieść/);
    expect(keyDifferences(no).join(" ")).not.toMatch(/znieść/);
    expect(specialistQuestions(yes).join(" ")).toMatch(/zmienimy zdanie/);
    expect(specialistQuestions(no).join(" ")).not.toMatch(/zmienimy zdanie/);
  });
  it("przekonania i zgodność wpływają na podsumowanie", () => {
    expect(situationNotes({ topics: [], worldview: "yes" }).join(" ")).toMatch(/wyznaniowych/);
    expect(situationNotes({ topics: [], worldview: "no" }).join(" ")).not.toMatch(/wyznaniowych/);
    expect(situationNotes({ topics: [], agreement: "agree", children: "none" }).join(" ")).toMatch(/zgodny wniosek/);
    expect(situationNotes({ topics: [], agreement: "differ" }).join(" ")).toMatch(/sąd orzeka rozwód/);
  });
  it("brak majątku → brak pytań o podział", () => {
    const a: SeparationAnswers = { topics: [], property: "no" };
    expect(consultIssues(a).join(" ")).not.toMatch(/podzielić majątek/);
    expect(orderedRows(a).find((r) => r.id === "majatek")!.relevant).toBe(false);
  });
  it("nazwisko: termin 1 roku", () => {
    expect(ROWS.find((r) => r.id === "nazwisko")!.divorce).toMatch(/1 roku/);
  });
  it("bez rekomendacji wyboru, myślników i przepisów w treści", () => {
    const a: SeparationAnswers = { topics: ["majatek", "dzieci", "alimenty", "nazwisko", "dziedziczenie", "koszty", "powrot"], children: "minor", property: "unsure", agreement: "differ", reconcile: "maybe", remarry: "unsure", worldview: "yes" };
    const visible = JSON.stringify([ROWS.map(({ basis: _b, ...r }) => r), situationNotes(a), commonEffects(a), keyDifferences(a), consultIssues(a), specialistQuestions(a)]);
    expect(visible).not.toMatch(/powinieneś|powinnaś|zalecamy/i);
    expect(visible).not.toContain("—");
    expect(visible).not.toMatch(/\bart\. ?\d|KPC|KRO\b/);
  });
});
