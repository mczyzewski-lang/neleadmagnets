import { describe, it, expect } from "vitest";
import { classify, analyze } from "@/lib/decision/majatek-wspolny-czy-osobisty";

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
});
