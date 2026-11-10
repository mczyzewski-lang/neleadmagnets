import { describe, it, expect } from "vitest";
import { STATEMENTS, scoreQuiz, topicsToRead } from "@/lib/decision/mity-o-rozwodzie";

describe("mity-o-rozwodzie", () => {
  it("ma 12 twierdzeń z unikalnymi id", () => {
    expect(STATEMENTS).toHaveLength(12);
    expect(new Set(STATEMENTS.map((s) => s.id)).size).toBe(12);
  });
  it("liczy poprawne odpowiedzi", () => {
    const all = Object.fromEntries(STATEMENTS.map((s) => [s.id, s.answer]));
    expect(scoreQuiz(all).correct).toBe(12);
    expect(topicsToRead(all)).toHaveLength(0);
  });
  it("„nie wiem” liczy się osobno i daje tematy do doczytania", () => {
    const r = scoreQuiz({ kredyt: "nie-wiem", oplata: "mit" });
    expect(r.unknown).toBe(11);
    expect(r.wrong).toBe(1);
    expect(topicsToRead({ kredyt: "fakt" }).length).toBeGreaterThan(0);
  });
  it("kluczowe fakty prawne", () => {
    const get = (id: string) => STATEMENTS.find((s) => s.id === id)!;
    expect(get("kredyt").answer).toBe("mit");
    expect(get("usc").answer).toBe("mit");
    expect(get("oplata").answer).toBe("fakt");
    expect(get("bez-winy").answer).toBe("fakt");
    expect(get("nazwisko").explanation).toMatch(/roku/);
  });
});
