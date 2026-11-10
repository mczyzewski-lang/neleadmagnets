"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./mity-o-rozwodzie.css";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import { todayPL } from "@/lib/format";
import type { Report } from "@/lib/report";
import { STATEMENTS, scoreQuiz, scoreMessage, topicsToRead, type Choice, type QuizAnswers } from "@/lib/decision/mity-o-rozwodzie";

const TOOL = "mity-o-rozwodzie";
const LABEL: Record<Choice, string> = { mit: "Mit", fakt: "Fakt", "nie-wiem": "Nie wiem" };

function Verdict({ v }: { v: "mit" | "fakt" }) {
  return <span className={`quiz-verdict quiz-verdict--${v}`}>{v === "mit" ? "MIT" : "FAKT"}</span>;
}

export function MythsQuizTool() {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const headRef = useRef<HTMLParagraphElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    headRef.current?.focus();
  }, [i]);

  const s = STATEMENTS[i];
  const chosen = answers[s?.id];
  const total = STATEMENTS.length;

  const choose = (c: Choice) => {
    if (chosen) return;
    if (!started.current) { started.current = true; track("tool_start", { tool: TOOL }); }
    setAnswers((a) => ({ ...a, [s.id]: c }));
    track("tool_step", { tool: TOOL, step: i + 1 });
  };
  const next = () => {
    if (i < total - 1) setI(i + 1);
    else {
      setDone(true);
      track("tool_complete", { tool: TOOL });
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };
  const reset = () => { setAnswers({}); setI(0); setDone(false); started.current = false; };

  const r = scoreQuiz(answers);
  const topics = topicsToRead(answers);

  const report = (): Report => ({
    title: "Mity i fakty o rozwodzie — moje podsumowanie",
    intro: `Przegląd wiedzy z ${todayPL()}. Trafione odpowiedzi: ${r.correct}/${total}.`,
    sections: [
      { heading: "Wszystkie twierdzenia i wyjaśnienia", items: STATEMENTS.map((x) => `${x.text} → ${x.answer.toUpperCase()} (moja odpowiedź: ${answers[x.id] ? LABEL[answers[x.id]!] : "brak"}). ${x.explanation} Źródło: ${x.source}.`) },
      { heading: "Tematy, które warto doczytać", items: topics.map((t) => `${t.label}: nowyetap.pl${t.href}`) },
    ],
  });

  if (!done) {
    const pct = Math.round(((i + (chosen ? 1 : 0)) / total) * 100);
    const correct = chosen && chosen === s.answer;
    return (
      <div className="tool-frame">
        <div className="tool-frame__head">
          <span><strong>Twierdzenie {i + 1}</strong> <span className="muted">z {total}</span></span>
          <span className="muted small">Trafione: {r.correct}</span>
        </div>
        <div className="progress" role="progressbar" aria-label="Postęp quizu" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}><div className="progress__bar" style={{ width: `${pct}%` }} /></div>
        <div className="tool-frame__body">
          <span className="eyebrow">Mit czy fakt?</span>
          <p className="quiz-statement" tabIndex={-1} ref={headRef}>„{s.text}”</p>
          <div className="quiz-choices" role="group" aria-label="Twoja odpowiedź">
            {(["mit", "fakt", "nie-wiem"] as Choice[]).map((c) => (
              <button key={c} type="button" className="quiz-btn" aria-pressed={chosen === c} disabled={!!chosen} onClick={() => choose(c)}>{LABEL[c]}</button>
            ))}
          </div>
          {chosen && (
            <div className={`alert ${correct ? "alert--ok" : chosen === "nie-wiem" ? "" : "alert--warn"} mt`} role="status" aria-live="polite">
              <Icon name={correct ? "check" : "info"} />
              <div>
                <p style={{ marginBottom: 6 }}>
                  <strong>{correct ? "Dobrze! " : chosen === "nie-wiem" ? "Odpowiedź: " : "Niezupełnie. "}</strong>
                  <Verdict v={s.answer} />
                </p>
                <p style={{ marginBottom: 4 }}>{s.explanation}</p>
                <p className="xsmall muted" style={{ margin: 0 }}>Źródło: {s.source}</p>
              </div>
            </div>
          )}
          <div className="wizard-nav">
            {i > 0 ? <button type="button" className="btn btn--ghost" onClick={() => setI(i - 1)}><Icon name="arrowLeft" width={18} /> Wstecz</button> : <span />}
            <button type="button" className={`btn ${i === total - 1 ? "btn--gold" : ""}`} disabled={!chosen} onClick={next}>
              {i === total - 1 ? "Pokaż podsumowanie" : "Następne"} <Icon name="arrowRight" width={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const C = 2 * Math.PI * 40;
  return (
    <div ref={resultRef} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twoje podsumowanie</span>
        <div className="quiz-score">
          <svg className="quiz-ring" viewBox="0 0 100 100" role="img" aria-label={`Trafione ${r.correct} z ${total}`}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="10" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#C79B59" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(r.correct / total) * C} ${C}`} transform="rotate(-90 50 50)" />
            <text x="50" y="57" textAnchor="middle" fontSize="22" fontWeight="700" fill="#fff">{r.correct}/{total}</text>
          </svg>
          <div>
            <h2 style={{ fontSize: "var(--fs-2xl)", marginBottom: 6 }}>{r.correct} z {total} trafionych</h2>
            <p style={{ margin: 0 }}>To nie test, tylko przegląd. {scoreMessage(r.correct, total)}</p>
          </div>
        </div>
        <div className="kpis kpis--3 mt">
          <div className="kpi"><span className="kpi__label">Trafione</span><span className="kpi__value">{r.correct}</span></div>
          <div className="kpi"><span className="kpi__label">Do sprostowania</span><span className="kpi__value">{r.wrong}</span></div>
          <div className="kpi"><span className="kpi__label">„Nie wiem”</span><span className="kpi__value">{r.unknown}</span></div>
        </div>
      </div>

      {topics.length > 0 && (
        <div className="result-section">
          <h3><Icon name="book" width={22} /> Tematy, które warto doczytać</h3>
          <div className="grid grid--2">
            {topics.map((t) => (
              <Link key={t.href} href={t.href} className="card card-link card--sand" style={{ padding: 16 }}>
                <strong>{t.label}</strong>
                <span className="card-link__more" style={{ paddingTop: 6 }}>Otwórz <Icon name="arrowRight" width={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="result-section">
        <h3><Icon name="checklist" width={22} /> Wszystkie twierdzenia z wyjaśnieniami</h3>
        {STATEMENTS.map((x, n) => {
          const a = answers[x.id];
          const ok = a === x.answer;
          return (
            <article key={x.id} className="quiz-item">
              <div className="quiz-item__head">
                <span className="scenario__num" style={{ fontSize: "1.2rem" }}>{String(n + 1).padStart(2, "0")}</span>
                <Verdict v={x.answer} />
                <span className={`tag ${ok ? "tag--ok" : a === "nie-wiem" ? "" : "tag--warn"}`}>Twoja odpowiedź: {a ? LABEL[a] : "—"}</span>
              </div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>{x.text}</p>
              <p className="small" style={{ marginBottom: 4 }}>{x.explanation}</p>
              <p className="xsmall muted" style={{ margin: 0 }}>Źródło: {x.source}</p>
            </article>
          );
        })}
        <p className="xsmall muted">Stan prawny na 10.11.2026. Materiał informacyjny — nie stanowi porady prawnej.</p>
      </div>

      <div className="result-section">
        <ResultActions toolId={TOOL} report={report} filename="mity-i-fakty-o-rozwodzie" onReset={reset} />
      </div>

      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep
          toolId={TOOL}
          offers={[
            { key: "materialy", href: "/materialy/rozwod-krok-po-kroku", cta: "Pobierz przewodnik: rozwód krok po kroku", why: "Cały proces na jednej mapie: dokumenty, sąd, koszty, wyrok i to, co dzieje się po nim." },
            { key: "plan-rozwodu", why: "Jeśli chcesz uporządkować swoją sytuację: bezpłatny Plan Rozwodu i informacja o koszcie pomocy." },
          ]}
        />
      </div>
    </div>
  );
}
