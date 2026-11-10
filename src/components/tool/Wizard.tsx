"use client";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";

export type WizardStep<A> = {
  id: string;
  title: string;
  help?: string;
  /** Logika warunkowa — krok pokazywany tylko, gdy zwraca true */
  when?: (a: A) => boolean;
  /** Zwraca true, gdy można przejść dalej; string = komunikat błędu */
  valid?: (a: A) => boolean | string;
  /** Krok można pominąć (pokazuje „Pomiń”) */
  optional?: boolean;
  /** Krótka etykieta odpowiedzi do podsumowania „Twoje odpowiedzi” */
  summary?: (a: A) => string | null;
  render: (a: A, set: (patch: Partial<A>) => void) => ReactNode;
};

export function visibleSteps<A>(steps: WizardStep<A>[], a: A) {
  return steps.filter((s) => !s.when || s.when(a));
}

export function Wizard<A>({ toolId, steps, answers, setAnswers, onComplete, startAt, finishLabel = "Pokaż mój wynik" }: {
  toolId: string;
  steps: WizardStep<A>[];
  answers: A;
  setAnswers: (fn: (a: A) => A) => void;
  onComplete: () => void;
  startAt?: string;
  finishLabel?: string;
}) {
  const visible = useMemo(() => visibleSteps(steps, answers), [steps, answers]);
  const [currentId, setCurrentId] = useState<string>(startAt || visible[0]?.id);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  const firstRender = useRef(true);

  let index = visible.findIndex((s) => s.id === currentId);
  if (index < 0) index = 0;
  const step = visible[index];
  const isLast = index === visible.length - 1;

  useEffect(() => {
    if (firstRender.current && !startAt) { firstRender.current = false; return; }
    firstRender.current = false;
    headingRef.current?.focus({ preventScroll: false });
  }, [currentId, startAt]);

  if (!step) return null;
  const set = (patch: Partial<A>) => {
    setError(null);
    if (!started.current) { started.current = true; track("tool_start", { tool: toolId }); }
    setAnswers((a) => ({ ...a, ...patch }));
  };

  const next = () => {
    const v = step.valid ? step.valid(answers) : true;
    if (v !== true) { setError(typeof v === "string" ? v : "Wybierz odpowiedź, aby przejść dalej."); return; }
    setError(null);
    track("tool_step", { tool: toolId, step: index + 1 });
    if (isLast) { onComplete(); return; }
    // ponownie oblicz widoczne kroki po zmianie odpowiedzi
    const vis = visibleSteps(steps, answers);
    const i = vis.findIndex((s) => s.id === step.id);
    setCurrentId(vis[i + 1]?.id ?? vis[vis.length - 1].id);
  };
  const back = () => {
    setError(null);
    if (index > 0) setCurrentId(visible[index - 1].id);
  };
  const pct = Math.round(((index + 1) / (visible.length + 1)) * 100);

  return (
    <div className="tool-frame">
      <div className="tool-frame__head">
        <span><strong>Krok {index + 1}</strong> <span className="muted">z {visible.length}</span></span>
        <span className="muted small"><Icon name="lock" style={{ width: 14, height: 14, display: "inline", verticalAlign: "-2px" }} /> Odpowiedzi nie są zapisywane</span>
      </div>
      <div className="progress" role="progressbar" aria-label="Postęp" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct}>
        <div className="progress__bar" style={{ width: `${pct}%` }} />
      </div>
      <form className="tool-frame__body" onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
        <h3 className="step-title" tabIndex={-1} ref={headingRef}>{step.title}</h3>
        {step.help && <p className="step-help">{step.help}</p>}
        {step.render(answers, set)}
        {error && <p className="field__error" role="alert" style={{ marginTop: 12 }}>{error}</p>}
        <div className="wizard-nav">
          {index > 0 ? (
            <button type="button" className="btn btn--ghost" onClick={back}><Icon name="arrowLeft" width={18} /> Wstecz</button>
          ) : <span />}
          {step.optional && !isLast && (
            <button type="button" className="btn btn--link btn--sm" onClick={() => { setError(null); const i = visible.findIndex((s) => s.id === step.id); setCurrentId(visible[i + 1].id); }}>Pomiń</button>
          )}
          <button type="submit" className={`btn ${isLast ? "btn--gold" : ""}`}>
            {isLast ? finishLabel : "Dalej"} <Icon name="arrowRight" width={18} />
          </button>
        </div>
      </form>
    </div>
  );
}

/** Podsumowanie odpowiedzi z możliwością edycji konkretnego kroku */
export function AnswersSummary<A>({ steps, answers, onEdit }: { steps: WizardStep<A>[]; answers: A; onEdit: (stepId: string) => void }) {
  const vis = visibleSteps(steps, answers).filter((s) => s.summary);
  return (
    <details className="card card--sand no-print" style={{ padding: 16 }}>
      <summary style={{ cursor: "pointer", fontWeight: 600 }}>Twoje odpowiedzi ({vis.length}) — kliknij, aby poprawić</summary>
      <dl style={{ margin: "12px 0 0", display: "grid", gap: 8 }}>
        {vis.map((s) => (
          <div key={s.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", borderBottom: "1px solid var(--line)", paddingBottom: 8 }}>
            <div>
              <dt className="xsmall muted">{s.title}</dt>
              <dd style={{ margin: 0, fontSize: "var(--fs-sm)", fontWeight: 600 }}>{s.summary!(answers) || "—"}</dd>
            </div>
            <button type="button" className="btn btn--link btn--sm" onClick={() => onEdit(s.id)} aria-label={`Zmień: ${s.title}`}>Zmień</button>
          </div>
        ))}
      </dl>
    </details>
  );
}

export function labelOf(options: { value: string; label: string }[], v?: string | string[]) {
  if (Array.isArray(v)) return v.map((x) => options.find((o) => o.value === x)?.label ?? x).join(", ");
  return options.find((o) => o.value === v)?.label ?? null;
}
