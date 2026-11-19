import { describe, it, expect } from "vitest";
import { classify, analyze, lawyerQuestions } from "@/lib/decision/majatek-wspolny-czy-osobisty";

const A = (p: object) => ({ id: "x", type: "samochod" as const, ...p });

describe("majątek wspólny czy osobisty", () => {
  it("w trakcie wspólności ze wspólnych dochodów → wspólny (art. 31)", () => {
    expect(classify(A({ when: "w-trakcie", funds: "wspolne" }), "marriage", "wspolnosc").status).toBe("wspolny");
  });
  it("przed ślubem → osobisty; ze spłatami wspólnymi → mieszany z nakładem", () => {
    expect(classify(A({ when: "przed", laterJointFunds: "nie" }), "marriage", "wspolnosc").status).toBe("osobisty");
    const m = classify(A({ type: "nieruchomosc", when: "przed", laterJointFunds: "tak" }), "marriage", "wspolnosc");
    expect(m.status).toBe("mieszany");
    expect(m.nakład).toBeTruthy();
  });
  it("darowizna → osobisty, chyba że darczyńca postanowił inaczej", () => {
    expect(classify(A({ when: "w-trakcie", funds: "darowizna", donorJoint: "nie" }), "marriage", "wspolnosc").status).toBe("osobisty");
    expect(classify(A({ when: "w-trakcie", funds: "darowizna", donorJoint: "tak" }), "marriage", "wspolnosc").status).toBe("wspolny");
    expect(classify(A({ when: "w-trakcie", funds: "spadek", donorJoint: "nie-wiem" }), "marriage", "wspolnosc").status).toBe("analiza");
  });
  it("rozdzielność od początku: wspólny zakup → współwłasność", () => {
    expect(classify(A({ when: "w-trakcie", funds: "wspolne" }), "marriage", "rozdzielnosc-od-poczatku").status).toBe("wspolwlasnosc");
  });
  it("związek nieformalny → KC", () => {
    expect(classify(A({ owner: "razem" }), "informal", "nie-wiem").status).toBe("wspolwlasnosc");
  });
  it("długi i środki emerytalne zawsze wymagają analizy", () => {
    expect(classify(A({ type: "dlug", when: "w-trakcie", funds: "wspolne" }), "marriage", "wspolnosc").status).toBe("analiza");
    expect(classify(A({ type: "emerytalne", when: "w-trakcie", funds: "wspolne" }), "marriage", "wspolnosc").status).toBe("analiza");
  });
  it("sumy wartości bez długów", () => {
    const r = analyze([A({ id: "1", when: "w-trakcie", funds: "wspolne", value: 40000 }), A({ id: "2", type: "dlug", value: 10000 })], "marriage", "wspolnosc");
    expect(r.totals.wspolny).toBe(40000);
    expect(r.debts).toBe(10000);
  });
  it("związek nieformalny: bez treści małżeńskich w dokumentach i pytaniach", () => {
    const items = [A({ id: "1", owner: "razem", when: "przed", funds: "darowizna" }), A({ id: "2", type: "dlug", owner: "razem" })];
    const r = analyze(items, "informal", "nie-wiem");
    const t = JSON.stringify(r) + lawyerQuestions("informal", "nie-wiem", r.results).join(" ");
    expect(t).not.toMatch(/ślub|małżon|intercyz|rozwod|wspólność majątkow/i);
    expect(r.results[1].status).toBe("analiza");
    expect(r.results[1].reason).toMatch(/wierzyciel/);
  });
  it("odpowiedź o właścicielu zmienia uzasadnienie długu w związku nieformalnym", () => {
    const reasons = (["razem", "ja", "nie-wiem"] as const).map((owner) => classify(A({ type: "dlug", owner }), "informal", "nie-wiem").reason);
    expect(new Set(reasons).size).toBe(3);
  });
  it("bez myślników i przepisów w uzasadnieniach i pytaniach", () => {
    const cases = [A({ when: "przed", laterJointFunds: "tak" }), A({ when: "przed", laterJointFunds: "nie-wiem" }), A({ when: "w-trakcie", funds: "spadek", donorJoint: "nie-wiem" }), A({ type: "firma", when: "w-trakcie", funds: "mieszane" }), A({ when: "po", funds: "wspolne" }), A({ type: "dlug" })];
    const r = analyze(cases.map((c, i) => ({ ...c, id: String(i) })), "marriage", "nie-wiem");
    const t = r.results.map((x) => `${x.reason} ${x.nakład ?? ""}`).join(" ") + lawyerQuestions("marriage", "nie-wiem", r.results).join(" ");
    expect(t).not.toMatch(/—| – /);
    expect(t).not.toMatch(/art\.|§|KPC|KRO/);
  });
});
