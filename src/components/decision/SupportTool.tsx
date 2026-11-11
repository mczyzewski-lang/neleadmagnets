"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Wizard, AnswersSummary, labelOf, type WizardStep } from "@/components/tool/Wizard";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { SingleChoice, MultiChoice } from "@/components/ui/Choices";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import { todayPL } from "@/lib/format";
import type { Report } from "@/lib/report";
import {
  HELP_TYPES, HELPLINES, ROLES, SIGNALS, SPECIALISTS, STRATEGIES, TRIGGERS, WEEKLY_CHECKIN,
  childrenPlan, gaps, hardDayPlan, ifThenPlan, myStrategies, specialistsList, supportMatrix, type HelpType, type SupportAnswers,
} from "@/lib/decision/plan-wsparcia";
import "./plan-wsparcia.css";

const TOOL = "plan-wsparcia";

function HelpMatrix({ a, set }: { a: SupportAnswers; set: (p: Partial<SupportAnswers>) => void }) {
  const toggle = (h: HelpType, r: string) => {
    const cur = a.help?.[h] || [];
    let next = cur.includes(r) ? cur.filter((x) => x !== r) : [...cur.filter((x) => x !== "none"), r];
    if (r === "none" && !cur.includes("none")) next = ["none"];
    set({ help: { ...(a.help || {}), [h]: next } });
  };
  return (
    <div className="pw-matrix">
      {HELP_TYPES.map((h) => (
        <fieldset key={h.key} className="pw-row">
          <legend>{h.q}</legend>
          <div className="pw-chips">
            {ROLES.map((r) => {
              const on = (a.help?.[h.key] || []).includes(r.value);
              return (
                <label key={r.value} className={`pw-chip ${on ? "is-on" : ""}`}>
                  <input type="checkbox" checked={on} onChange={() => toggle(h.key, r.value)} />
                  {r.label}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

const usedRoles = (a: SupportAnswers) => Array.from(new Set(Object.values(a.help || {}).flat().filter((r): r is string => !!r && r !== "none")));

const steps: WizardStep<SupportAnswers>[] = [
  {
    id: "help", title: "Kto może Ci pomóc — i w czym?", help: "Zaznacz role, nie imiona. Możesz wybrać kilka osób przy każdym pytaniu.",
    valid: (a) => (HELP_TYPES.some((h) => (a.help?.[h.key] || []).length) ? true : "Zaznacz co najmniej jedną odpowiedź (także „Na razie nikt”)."),
    summary: (a) => HELP_TYPES.map((h) => `${h.label}: ${(a.help?.[h.key] || []).length ? labelOf(ROLES, a.help?.[h.key] || []) : "—"}`).join("; "),
    render: (a, set) => <HelpMatrix a={a} set={set} />,
  },
  {
    id: "labels", title: "Chcesz dopisać inicjały, żeby łatwiej było korzystać z planu?", optional: true,
    help: "Opcjonalnie, maks. 20 znaków. Nie wpisuj pełnych danych. Zostaną tylko w Twojej przeglądarce i na wydruku.",
    when: (a) => usedRoles(a).length > 0,
    summary: (a) => Object.values(a.labels || {}).filter(Boolean).length ? "dodano" : "bez etykiet",
    render: (a, set) => (
      <div>
        {usedRoles(a).map((r) => (
          <div key={r} className="field">
            <label className="field__label" htmlFor={`lbl-${r}`}>{labelOf(ROLES, r)}</label>
            <input id={`lbl-${r}`} className="input" maxLength={20} autoComplete="off" placeholder="np. „A.”, „siostra”" value={a.labels?.[r] || ""} onChange={(e) => set({ labels: { ...(a.labels || {}), [r]: e.target.value.slice(0, 20) } })} />
          </div>
        ))}
      </div>
    ),
  },
  { id: "specialists", title: "Z jakiego wsparcia specjalistów chcesz lub możesz skorzystać?", optional: true, summary: (a) => labelOf(SPECIALISTS, a.specialists || []) || "—", render: (a, set) => <MultiChoice legend="Specjaliści" options={SPECIALISTS} value={a.specialists || []} onChange={(v) => set({ specialists: v })} columns={2} /> },
  { id: "strategies", title: "Co zwykle pomaga Ci w trudnych chwilach?", valid: (a) => ((a.strategies || []).length ? true : "Wybierz co najmniej jedną rzecz."), summary: (a) => labelOf(STRATEGIES, a.strategies || []), render: (a, set) => <MultiChoice legend="Strategie" options={STRATEGIES} value={a.strategies || []} onChange={(v) => set({ strategies: v })} columns={2} /> },
  { id: "signals", title: "Po czym poznajesz, że jest Ci coraz trudniej?", help: "To nie jest diagnoza — tylko Twoje sygnały ostrzegawcze.", optional: true, summary: (a) => labelOf(SIGNALS, a.signals || []) || "—", render: (a, set) => <MultiChoice legend="Sygnały" options={SIGNALS} value={a.signals || []} onChange={(v) => set({ signals: v })} columns={2} /> },
  { id: "triggers", title: "Które sytuacje mogą być szczególnie trudne?", optional: true, summary: (a) => labelOf(TRIGGERS, a.triggers || []) || "—", render: (a, set) => <MultiChoice legend="Trudne sytuacje" options={TRIGGERS} value={a.triggers || []} onChange={(v) => set({ triggers: v })} columns={2} /> },
  { id: "children", title: "Czy masz dzieci?", valid: (a) => !!a.children, summary: (a) => (a.children === "yes" ? "Tak" : "Nie"), render: (a, set) => <SingleChoice legend="Dzieci" options={[{ value: "yes", label: "Tak" }, { value: "no", label: "Nie" }]} value={a.children} onChange={(v) => set({ children: v as "yes" | "no" })} /> },
];

export function SupportTool() {
  const [answers, setAnswers] = useState<SupportAnswers>({});
  const [done, setDone] = useState(false);
  const [editStep, setEditStep] = useState<string | undefined>();
  const [wizardKey, setWizardKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const matrix = useMemo(() => supportMatrix(answers), [answers]);
  const missing = useMemo(() => gaps(answers), [answers]);
  const ifThen = useMemo(() => ifThenPlan(answers), [answers]);
  const strategies = useMemo(() => myStrategies(answers), [answers]);
  const hardDay = useMemo(() => hardDayPlan(answers), [answers]);
  const kids = useMemo(() => childrenPlan(answers), [answers]);
  const specs = useMemo(() => specialistsList(answers), [answers]);
  const hopeless = (answers.signals || []).includes("hopeless");

  const complete = () => { setDone(true); track("tool_complete", { tool: TOOL }); requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setWizardKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswers({}); setDone(false); setEditStep(undefined); setWizardKey((k) => k + 1); };

  const report = (): Report => ({
    title: "Mój plan wsparcia na czas rozstania",
    intro: `Plan z ${todayPL()}. To narzędzie porządkujące — nie zastępuje pomocy specjalisty.`,
    sections: [
      { heading: "Kto może mi pomóc", items: matrix.map((r) => `${r.help}: ${r.who.length ? r.who.join(", ") : "— do znalezienia"}`) },
      { heading: "Specjaliści", items: specs },
      { heading: "Co mi pomaga", items: strategies },
      { heading: "Gdy… to…", items: ifThen.map((r) => `${r.when} → ${r.then}`) },
      { heading: "Plan na trudny dzień", items: hardDay },
      { heading: "Wsparcie dla dzieci", items: kids },
      { heading: "Cotygodniowy check-in", items: WEEKLY_CHECKIN },
      { heading: "Kontakty pomocowe", items: HELPLINES.map((h) => `${h.n} — ${h.t}`) },
    ],
  });

  if (!done) return <Wizard key={wizardKey} toolId={TOOL} steps={steps} answers={answers} setAnswers={setAnswers} onComplete={complete} startAt={editStep} finishLabel="Pokaż mój plan wsparcia" />;

  return (
    <div ref={ref} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twój plan wsparcia</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>Nie musisz przechodzić przez to sam(a)</h2>
        <div className="kpis kpis--3">
          <div className="kpi"><span className="kpi__label">Obszary wsparcia z osobą</span><span className="kpi__value">{matrix.filter((r) => r.who.length).length}/{matrix.length}</span></div>
          <div className="kpi"><span className="kpi__label">Twoje strategie</span><span className="kpi__value">{strategies.length}</span></div>
          <div className="kpi"><span className="kpi__label">Plany „gdy… to…”</span><span className="kpi__value">{ifThen.length}</span></div>
        </div>
      </div>
      <div className="result-section"><AnswersSummary steps={steps} answers={answers} onEdit={edit} /></div>

      {hopeless && (
        <div className="result-section">
          <Alert tone="safety" title="Jeśli jest Ci bardzo ciężko">
            <p>Poczucie beznadziei to sygnał, by porozmawiać z kimś jeszcze dziś. Jeśli pojawiają się myśli o zrobieniu sobie krzywdy — dzwoń pod <strong>116 123</strong>, <strong>800 70 2222</strong> lub <strong>112</strong>.</p>
          </Alert>
        </div>
      )}

      <div className="result-section pw-card">
        <h3><Icon name="user" width={22} /> Kto może mi pomóc</h3>
        <div tabIndex={0} role="region" aria-label="Tabela — przewiń w poziomie, jeśli nie mieści się na ekranie" className="table-wrap">
          <table className="table">
            <thead><tr><th scope="col">W czym</th><th scope="col">Kto</th></tr></thead>
            <tbody>{matrix.map((r) => <tr key={r.help}><th scope="row">{r.help}</th><td>{r.who.length ? r.who.join(", ") : <span className="muted">— do znalezienia</span>}</td></tr>)}</tbody>
          </table>
        </div>
        {missing.length > 0 && (
          <p className="small mt">Brakuje Ci wsparcia w obszarach: <strong>{missing.join(", ").toLowerCase()}</strong>. Pomocne mogą być: grupy wsparcia, ośrodki interwencji kryzysowej, bezpłatne telefony zaufania i — w sprawach praktycznych — sąsiedzi lub znajomi z pracy.</p>
        )}
        {specs.length > 0 && <p className="small"><strong>Specjaliści, z których chcę skorzystać:</strong> {specs.join(", ")}.</p>}
      </div>

      <div className="result-section">
        <h3><Icon name="sparkle" width={22} /> Co mi pomaga</h3>
        <div className="btn-row" style={{ gap: 8 }}>{strategies.map((s) => <span key={s} className="tag">{s}</span>)}</div>
      </div>

      {ifThen.length > 0 && (
        <div className="result-section">
          <h3><Icon name="split" width={22} /> Gdy… to…</h3>
          <div tabIndex={0} role="region" aria-label="Tabela — przewiń w poziomie, jeśli nie mieści się na ekranie" className="table-wrap">
            <table className="table">
              <thead><tr><th scope="col">Gdy</th><th scope="col">To</th></tr></thead>
              <tbody>{ifThen.map((r) => <tr key={r.when}><th scope="row" style={{ fontWeight: 600 }}>{r.when}</th><td>{r.then}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      )}

      <div className="result-section">
        <h3><Icon name="heart" width={22} /> Plan na trudny dzień</h3>
        <ol className="small" style={{ paddingLeft: 20 }}>{hardDay.map((x) => <li key={x} style={{ marginBottom: 6 }}>{x}</li>)}</ol>
      </div>

      {kids.length > 0 && (
        <div className="result-section">
          <h3><Icon name="calendar" width={22} /> Wsparcie dla dzieci</h3>
          <ul className="list-check">{kids.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
      )}

      <div className="result-section">
        <h3><Icon name="checklist" width={22} /> Cotygodniowy check-in</h3>
        <ul className="list-check">{WEEKLY_CHECKIN.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>

      <div className="result-section">
        <h3><Icon name="phone" width={22} /> Kontakty pomocowe</h3>
        <div className="grid grid--2">
          {HELPLINES.map((h) => (
            <div key={h.n} className="card card--sand" style={{ padding: 14 }}>
              <a href={`tel:${h.n.replace(/\s/g, "")}`} style={{ fontSize: "var(--fs-lg)", fontWeight: 700 }}>{h.n}</a>
              <p className="small muted" style={{ margin: 0 }}>{h.t}</p>
            </div>
          ))}
        </div>
        <p className="xsmall muted mt">Ten plan nie jest terapią ani diagnozą. <Link href="/pomoc">Więcej miejsc, gdzie szukać pomocy</Link>.</p>
      </div>

      <div className="result-section"><ResultActions toolId={TOOL} report={report} filename="plan-wsparcia" onReset={reset} /></div>
      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep toolId={TOOL} heading="Gdy poczujesz, że to dobry moment" offers={[
          { key: "materialy", href: "/materialy", cta: "Zobacz bezpłatne materiały", why: "Przewodniki i planery do wykorzystania we własnym tempie — bez podawania danych." },
          { key: "konsultacja", cta: "Porozmawiaj z nami, gdy będziesz gotowy/gotowa", why: "Jeśli zechcesz uporządkować sprawy praktyczne i prawne, możesz poprosić o rozmowę. Bez pośpiechu." },
        ]} />
      </div>
    </div>
  );
}
