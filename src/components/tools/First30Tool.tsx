"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Wizard, AnswersSummary, labelOf, type WizardStep } from "@/components/tool/Wizard";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { SingleChoice, MultiChoice } from "@/components/ui/Choices";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import { todayPL } from "@/lib/format";
import type { Report } from "@/lib/report";
import { buildPlan, planProgress, PERIODS, type First30Answers, type Period, type Task } from "@/lib/tools/first30";

const TOOL = "pierwsze-30-dni";
const STORE_KEY = "ne_plan30";

type O = { value: string; label: string; desc?: string }[];
const YN: O = [{ value: "yes", label: "Tak" }, { value: "no", label: "Nie" }];
const opts = {
  together: [{ value: "yes", label: "Tak, nadal mieszkamy razem" }, { value: "partly", label: "Częściowo / to się zmienia" }, { value: "no", label: "Nie, mieszkamy osobno" }] as O,
  decision: [{ value: "joint", label: "Tak, to wspólna decyzja" }, { value: "mine", label: "To moja decyzja" }, { value: "partner", label: "To decyzja drugiej osoby" }, { value: "unsure", label: "Trudno powiedzieć" }] as O,
  urgent: [
    { value: "safety", label: "Bezpieczeństwo moje lub dzieci", desc: "Obawiam się o swoje bezpieczeństwo" },
    { value: "money", label: "Pieniądze na najbliższe tygodnie" },
    { value: "housing", label: "Gdzie będę mieszkać" },
    { value: "kids", label: "Opieka nad dziećmi na co dzień" },
    { value: "none", label: "Nic pilnego" },
  ] as O,
  filed: [{ value: "no", label: "Nie" }, { value: "me", label: "Tak, ja złożyłem/złożyłam pozew" }, { value: "partner", label: "Tak, druga strona złożyła pozew" }] as O,
};

const steps: WizardStep<First30Answers>[] = [
  { id: "children", title: "Czy macie dzieci?", valid: (a) => !!a.children, summary: (a) => labelOf(YN, a.children), render: (a, set) => <SingleChoice legend="Dzieci" options={YN} value={a.children} onChange={(v) => set({ children: v as "yes" | "no" })} /> },
  { id: "together", title: "Czy nadal mieszkacie razem?", valid: (a) => !!a.together, summary: (a) => labelOf(opts.together, a.together), render: (a, set) => <SingleChoice legend="Mieszkanie razem" options={opts.together} value={a.together} onChange={(v) => set({ together: v as First30Answers["together"] })} /> },
  { id: "property", title: "Czy posiadacie wspólną nieruchomość?", valid: (a) => !!a.property, summary: (a) => labelOf(YN, a.property), render: (a, set) => <SingleChoice legend="Nieruchomość" options={YN} value={a.property} onChange={(v) => set({ property: v as "yes" | "no" })} /> },
  { id: "loan", title: "Czy macie wspólny kredyt?", valid: (a) => !!a.loan, summary: (a) => labelOf(YN, a.loan), render: (a, set) => <SingleChoice legend="Kredyt" options={YN} value={a.loan} onChange={(v) => set({ loan: v as "yes" | "no" })} /> },
  { id: "decision", title: "Czy decyzja o rozstaniu jest wspólna?", valid: (a) => !!a.decision, summary: (a) => labelOf(opts.decision, a.decision), render: (a, set) => <SingleChoice legend="Decyzja" options={opts.decision} value={a.decision} onChange={(v) => set({ decision: v as First30Answers["decision"] })} /> },
  {
    id: "urgent", title: "Czy są sprawy, które wymagają pilnej uwagi?", help: "Możesz zaznaczyć kilka odpowiedzi. Nie musisz niczego opisywać.",
    valid: (a) => (a.urgent?.length ? true : "Zaznacz co najmniej jedną odpowiedź (lub „Nic pilnego”)."), summary: (a) => labelOf(opts.urgent, a.urgent || []),
    render: (a, set) => (
      <>
        <MultiChoice legend="Pilne sprawy" options={opts.urgent} value={a.urgent || []} onChange={(v) => set({ urgent: v })} exclusive="none" />
        {a.urgent?.includes("safety") && (
          <Alert tone="safety" className="mt" title="Twoje bezpieczeństwo jest najważniejsze">
            <p>W sytuacji zagrożenia dzwoń pod <strong>112</strong>. Bezpłatne wsparcie dla osób doznających przemocy domowej: <strong>Niebieska Linia 800 120 002</strong>. Plan uwzględni to w pierwszej kolejności.</p>
          </Alert>
        )}
      </>
    ),
  },
  { id: "filed", title: "Czy złożono już pozew o rozwód lub separację?", valid: (a) => !!a.filed, summary: (a) => labelOf(opts.filed, a.filed), render: (a, set) => <SingleChoice legend="Pozew" options={opts.filed} value={a.filed} onChange={(v) => set({ filed: v as First30Answers["filed"] })} /> },
];

type Saved = { answers: First30Answers; tasks: Task[]; done: string[]; savedAt: string };

function readSaved(): Saved | null {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

export function First30Tool() {
  const [answers, setAnswersState] = useState<First30Answers>({});
  const [done, setDone] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState(false);
  const [editStep, setEditStep] = useState<string | undefined>();
  const [wizardKey, setWizardKey] = useState(0);
  const [hasSaved, setHasSaved] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<number, string>>({});
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setHasSaved(!!readSaved()); }, []);

  const progress = useMemo(() => planProgress(tasks, checked), [tasks, checked]);

  const complete = () => {
    // Zachowaj odhaczenia i własne zadania przy ponownym generowaniu po edycji odpowiedzi
    const fresh = buildPlan(answers);
    const custom = tasks.filter((t) => t.custom);
    setTasks([...fresh, ...custom]);
    setDone(true);
    track("tool_complete", { tool: TOOL });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setWizardKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswersState({}); setTasks([]); setChecked(new Set()); setDone(false); setEditStep(undefined); setWizardKey((k) => k + 1); };

  const toggle = (id: string) => setChecked((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const removeTask = (id: string) => setTasks((t) => t.filter((x) => x.id !== id));
  const updateTask = (id: string, text: string) => setTasks((t) => t.map((x) => (x.id === id ? { ...x, text: text.slice(0, 300) } : x)));
  const addTask = (period: Period) => {
    const text = (drafts[period] || "").trim();
    if (!text) return;
    setTasks((t) => [...t, { id: `c${Date.now()}`, period, category: "Moje zadanie", text: text.slice(0, 300), custom: true }]);
    setDrafts((d) => ({ ...d, [period]: "" }));
  };

  const saveLocal = () => {
    try {
      const data: Saved = { answers, tasks, done: [...checked], savedAt: new Date().toISOString() };
      window.localStorage.setItem(STORE_KEY, JSON.stringify(data));
      setHasSaved(true);
      setSavedMsg("Plan zapisany w tej przeglądarce. Usuń go, jeśli korzystasz ze wspólnego urządzenia.");
    } catch {
      setSavedMsg("Nie udało się zapisać — przeglądarka blokuje pamięć lokalną. Pobierz PDF.");
    }
  };
  const loadLocal = () => {
    const s = readSaved();
    if (!s) return;
    setAnswersState(s.answers);
    setTasks(s.tasks);
    setChecked(new Set(s.done));
    setDone(true);
  };
  const deleteLocal = () => {
    try { window.localStorage.removeItem(STORE_KEY); } catch {}
    setHasSaved(false);
    setSavedMsg("Zapisany plan został usunięty z tej przeglądarki.");
  };

  const report = (): Report => ({
    title: "Pierwsze 30 dni po decyzji o rozstaniu — mój plan",
    intro: `Plan przygotowany ${todayPL()}. To propozycja kolejności — dostosuj ją do siebie. Wykonane: ${progress.completed}/${progress.total}.`,
    sections: PERIODS.map((p) => ({
      heading: `${p.label}: ${p.focus}`,
      items: tasks.filter((t) => t.period === p.id).map((t) => `${checked.has(t.id) ? "[x]" : "[ ]"} ${t.text}${t.note ? ` (${t.note})` : ""}`),
    })),
  });

  if (!done) {
    return (
      <>
        {hasSaved && (
          <div className="card card--sand no-print" style={{ marginBottom: 16 }}>
            <p className="small" style={{ marginBottom: 8 }}><strong>W tej przeglądarce jest zapisany Twój plan.</strong></p>
            <div className="btn-row">
              <button type="button" className="btn btn--sm" onClick={loadLocal}>Otwórz zapisany plan</button>
              <button type="button" className="btn btn--ghost btn--sm" onClick={deleteLocal}><Icon name="trash" width={16} /> Usuń zapisany plan</button>
            </div>
          </div>
        )}
        <Wizard key={wizardKey} toolId={TOOL} steps={steps} answers={answers} setAnswers={setAnswersState} onComplete={complete} startAt={editStep} finishLabel="Pokaż mój plan" />
      </>
    );
  }

  const isSafety = !!answers.urgent?.includes("safety");

  return (
    <div ref={resultRef} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twój plan</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>Twoje pierwsze 30 dni — {tasks.length} kroków w 4 etapach</h2>
        <p>To propozycja kolejności, a nie obowiązkowy harmonogram. Usuń to, co Cię nie dotyczy, i dodaj własne zadania.</p>
        <div className="kpis kpis--3">
          <div className="kpi"><span className="kpi__label">Wykonane</span><span className="kpi__value">{progress.completed}/{progress.total}</span></div>
          <div className="kpi"><span className="kpi__label">Postęp</span><span className="kpi__value">{progress.pct}%</span></div>
          <div className="kpi"><span className="kpi__label">Priorytety na start</span><span className="kpi__value">{tasks.filter((t) => t.priority).length}</span></div>
        </div>
        <div className="progress" style={{ marginTop: 14, background: "rgba(255,255,255,.15)" }} role="progressbar" aria-label="Postęp planu" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress.pct}>
          <div className="progress__bar" style={{ width: `${progress.pct}%`, background: "var(--gold-500)" }} />
        </div>
      </div>

      <div className="result-section">
        <AnswersSummary steps={steps} answers={answers} onEdit={edit} />
        {isSafety && (
          <Alert tone="safety" className="mt" title="Bezpieczeństwo na pierwszym miejscu">
            <p>Jeśli grozi Ci niebezpieczeństwo — dzwoń pod <strong>112</strong>. Wsparcie: <strong>Niebieska Linia 800 120 002</strong>. W planie nie proponujemy wspólnych negocjacji z drugą stroną.</p>
          </Alert>
        )}
        <div className="btn-row no-print mt">
          <button type="button" className={`btn btn--sm ${editing ? "" : "btn--ghost"}`} aria-pressed={editing} onClick={() => setEditing((v) => !v)}>
            <Icon name="edit" width={16} /> {editing ? "Zakończ edycję" : "Edytuj plan"}
          </button>
        </div>
      </div>

      {PERIODS.map((p) => {
        const list = tasks.filter((t) => t.period === p.id);
        const pd = list.filter((t) => checked.has(t.id)).length;
        return (
          <section key={p.id} className="result-section" aria-labelledby={`p${p.id}`}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <h3 id={`p${p.id}`} style={{ margin: 0 }}><span className="scenario__num" style={{ fontSize: "1.5rem", marginRight: 6 }}>{p.days}</span> dni</h3>
              <span className="tag">{pd}/{list.length} wykonane</span>
            </div>
            <p className="small muted" style={{ margin: "4px 0 8px" }}>{p.focus}</p>
            <div>
              {list.length === 0 && <p className="small muted">Brak zadań w tym okresie.</p>}
              {list.map((t) => (
                <div key={t.id} className={`task ${checked.has(t.id) ? "task--done" : ""}`}>
                  <input type="checkbox" id={`t-${t.id}`} checked={checked.has(t.id)} onChange={() => toggle(t.id)} />
                  <div style={{ flex: 1 }}>
                    {editing ? (
                      <label>
                        <span className="visually-hidden">Treść zadania</span>
                        <textarea className="textarea" rows={2} value={t.text} onChange={(e) => updateTask(t.id, e.target.value)} />
                      </label>
                    ) : (
                      <label htmlFor={`t-${t.id}`} className="task__text" style={{ cursor: "pointer" }}>
                        {t.priority && <span className="tag tag--danger" style={{ marginRight: 6, fontSize: 11 }}>pilne</span>}
                        {t.text}
                      </label>
                    )}
                    <span className="task__meta">{t.category}{t.note ? ` · ${t.note}` : ""}</span>
                  </div>
                  {editing && (
                    <button type="button" className="btn btn--link btn--sm no-print" onClick={() => removeTask(t.id)} aria-label={`Usuń zadanie: ${t.text}`}><Icon name="trash" width={16} /></button>
                  )}
                </div>
              ))}
            </div>
            {editing && (
              <form className="no-print" style={{ display: "flex", gap: 8, marginTop: 10 }} onSubmit={(e) => { e.preventDefault(); addTask(p.id); }}>
                <label style={{ flex: 1 }}>
                  <span className="visually-hidden">Nowe zadanie ({p.label})</span>
                  <input className="input" placeholder="Dodaj własne zadanie…" value={drafts[p.id] || ""} maxLength={300} onChange={(e) => setDrafts((d) => ({ ...d, [p.id]: e.target.value }))} />
                </label>
                <button className="btn btn--sm" type="submit"><Icon name="plus" width={16} /> Dodaj</button>
              </form>
            )}
          </section>
        );
      })}

      <div className="result-section">
        <ResultActions toolId={TOOL} report={report} filename="pierwsze-30-dni-plan" onReset={reset} />
        <div className="card card--outline no-print mt" style={{ padding: 16 }}>
          <h4 style={{ marginBottom: 4 }}>Zapisz plan na tym urządzeniu (opcjonalnie)</h4>
          <p className="small muted">Plan nie zapisuje się automatycznie. Jeśli zapiszesz go w tej przeglądarce, zobaczy go każdy, kto ma dostęp do urządzenia. Nie zapisuj na komputerze współdzielonym z drugą stroną.</p>
          <div className="btn-row">
            <button type="button" className="btn btn--ghost btn--sm" onClick={saveLocal}><Icon name="lock" width={16} /> Zapisz w tej przeglądarce</button>
            {hasSaved && <button type="button" className="btn btn--link btn--sm" onClick={deleteLocal}><Icon name="trash" width={16} /> Usuń zapisany plan</button>}
          </div>
          {savedMsg && <p className="small" role="status" style={{ marginTop: 8, marginBottom: 0 }}>{savedMsg}</p>}
        </div>
      </div>

      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep
          toolId={TOOL}
          offers={
            isSafety
              ? [{ key: "konsultacja", cta: "Poproś o indywidualną rozmowę", why: "Indywidualna rozmowa o Twojej sytuacji — bez kontaktu z drugą stroną. Odezwiemy się wybranym przez Ciebie kanałem." }, { key: "materialy", href: "/materialy/bezpieczenstwo-cyfrowe-i-finansowe", cta: "Przewodnik: bezpieczeństwo cyfrowe i finansowe" }]
              : [{ key: "plan-rozwodu", cta: "Sprawdź, jak przygotować indywidualny Plan Rozwodu", why: "Po pierwszych tygodniach łatwiej zaplanować dalej: Plan Rozwodu pomaga ułożyć ustalenia przed pozwem." }, { key: "materialy", href: "/materialy/checklista-dokumentow", cta: "Pobierz checklistę dokumentów" }]
          }
        />
      </div>
    </div>
  );
}
