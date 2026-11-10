"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Wizard, AnswersSummary, labelOf, type WizardStep } from "@/components/tool/Wizard";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { SingleChoice, MultiChoice, type Option } from "@/components/ui/Choices";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import { todayPL } from "@/lib/format";
import type { Report } from "@/lib/report";
import { ASPECTS, VALUES, aspectsList, buildPaths, infoToGather, isSafety, reflectionQuestions, sevenDayPlan, type CompassAnswers, type AspectKey } from "@/lib/decision/kompas-decyzji";
import "./kompas-decyzji.css";

const TOOL = "kompas-decyzji";

const O: Record<string, Option[]> = {
  tried: [
    { value: "talks", label: "Szczere rozmowy we dwoje" },
    { value: "therapy", label: "Terapia par" },
    { value: "individual", label: "Wsparcie indywidualne (psycholog, terapeuta)" },
    { value: "time-apart", label: "Czas osobno" },
    { value: "nothing", label: "Jeszcze nic z tych rzeczy" },
  ],
  missing: [
    { value: "finances", label: "Finanse — jak sobie poradzę" },
    { value: "housing", label: "Mieszkanie — gdzie będę mieszkać" },
    { value: "children", label: "Dzieci — jak zorganizować opiekę" },
    { value: "law", label: "Prawo — jakie są procedury i skutki" },
    { value: "emotions", label: "Emocje — czego naprawdę chcę" },
  ],
  time: [
    { value: "urgent", label: "Czuję presję, sprawa jest pilna" },
    { value: "weeks", label: "Mam kilka tygodni" },
    { value: "nopressure", label: "Nie mam presji czasu" },
  ],
  safety: [
    { value: "no", label: "Nie" },
    { value: "yes", label: "Tak" },
    { value: "skip", label: "Wolę nie odpowiadać" },
  ],
};

const SCALE = [1, 2, 3, 4, 5];
const SCALE_LABEL: Record<number, string> = { 1: "bardzo źle", 2: "raczej źle", 3: "różnie", 4: "raczej dobrze", 5: "bardzo dobrze" };

function AspectScale({ value, onChange }: { value: CompassAnswers["aspects"]; onChange: (k: AspectKey, v: number) => void }) {
  return (
    <div className="scale-list">
      {ASPECTS.map((a) => (
        <fieldset key={a.key} className="scale-row">
          <legend>{a.label}</legend>
          <div className="scale-btns">
            {SCALE.map((n) => (
              <label key={n} className={`scale-btn ${value?.[a.key] === n ? "is-on" : ""}`}>
                <input type="radio" name={`asp-${a.key}`} value={n} checked={value?.[a.key] === n} onChange={() => onChange(a.key, n)} />
                <span aria-hidden="true">{n}</span>
                <span className="visually-hidden">{SCALE_LABEL[n]}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <p className="xsmall muted" style={{ margin: 0 }}>1 — bardzo źle · 3 — różnie · 5 — bardzo dobrze</p>
    </div>
  );
}

const steps: WizardStep<CompassAnswers>[] = [
  {
    id: "safety", title: "Czy w Waszej relacji zdarzała się przemoc, groźby lub czy obawiasz się o swoje bezpieczeństwo?",
    help: "Pytamy każdego. Twoja odpowiedź nie jest nigdzie zapisywana.",
    valid: (a) => !!a.safety, summary: (a) => labelOf(O.safety, a.safety),
    render: (a, set) => (
      <>
        <SingleChoice legend="Bezpieczeństwo" options={O.safety} value={a.safety} onChange={(v) => set({ safety: v as CompassAnswers["safety"] })} />
        {a.safety === "yes" && <Alert tone="safety" className="mt" title="Bezpieczeństwo jest najważniejsze"><p>W sytuacji zagrożenia dzwoń pod <strong>112</strong>. Niebieska Linia: <strong>800 120 002</strong>.</p></Alert>}
      </>
    ),
  },
  { id: "tried", title: "Co już próbowaliście?", help: "Zaznacz wszystko, co pasuje.", valid: (a) => ((a.tried || []).length ? true : "Zaznacz co najmniej jedną odpowiedź."), summary: (a) => labelOf(O.tried, a.tried || []), render: (a, set) => <MultiChoice legend="Co próbowaliście" options={O.tried} value={a.tried || []} onChange={(v) => set({ tried: v })} exclusive="nothing" /> },
  { id: "values", title: "Co jest dla Ciebie teraz najważniejsze?", help: "Wybierz do 4 wartości.", valid: (a) => ((a.values || []).length ? ((a.values || []).length <= 4 ? true : "Wybierz maksymalnie 4.") : "Wybierz co najmniej jedną wartość."), summary: (a) => labelOf(VALUES, a.values || []), render: (a, set) => <MultiChoice legend="Wartości" options={VALUES} value={a.values || []} onChange={(v) => set({ values: v.slice(0, 4) })} columns={2} /> },
  {
    id: "aspects", title: "Jak oceniasz dziś te obszary Waszej relacji?", help: "Nie ma dobrych ani złych odpowiedzi. To nie jest test.",
    valid: (a) => (ASPECTS.every((x) => a.aspects?.[x.key]) ? true : "Oceń wszystkie obszary (możesz wybrać „3 — różnie”)."),
    summary: (a) => ASPECTS.map((x) => `${x.label}: ${a.aspects?.[x.key] ?? "—"}`).join(", "),
    render: (a, set) => <AspectScale value={a.aspects} onChange={(k, v) => set({ aspects: { ...(a.aspects || {}), [k]: v } })} />,
  },
  { id: "missing", title: "Jakich informacji najbardziej Ci brakuje?", valid: (a) => ((a.missing || []).length ? true : "Zaznacz co najmniej jedną odpowiedź."), summary: (a) => labelOf(O.missing, a.missing || []), render: (a, set) => <MultiChoice legend="Brakujące informacje" options={O.missing} value={a.missing || []} onChange={(v) => set({ missing: v })} /> },
  { id: "time", title: "Ile masz czasu na decyzję?", valid: (a) => !!a.time, summary: (a) => labelOf(O.time, a.time), render: (a, set) => <SingleChoice legend="Czas" options={O.time} value={a.time} onChange={(v) => set({ time: v as CompassAnswers["time"] })} /> },
];

export function CompassTool() {
  const [answers, setAnswers] = useState<CompassAnswers>({});
  const [done, setDone] = useState(false);
  const [editStep, setEditStep] = useState<string | undefined>();
  const [wizardKey, setWizardKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const aspects = useMemo(() => aspectsList(answers), [answers]);
  const paths = useMemo(() => buildPaths(answers), [answers]);
  const questions = useMemo(() => reflectionQuestions(answers), [answers]);
  const info = useMemo(() => infoToGather(answers), [answers]);
  const days = useMemo(() => sevenDayPlan(answers), [answers]);
  const safety = isSafety(answers);

  const complete = () => { setDone(true); track("tool_complete", { tool: TOOL }); requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setWizardKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswers({}); setDone(false); setEditStep(undefined); setWizardKey((k) => k + 1); };

  const report = (): Report => ({
    title: "Kompas decyzji — mój obraz sytuacji",
    intro: `Zestawienie z ${todayPL()}. To nie jest ocena ani rekomendacja — tylko uporządkowanie moich odpowiedzi.`,
    sections: [
      { heading: "Co jest dla mnie ważne", items: labelOf(VALUES, answers.values || [])?.split(", ") || [] },
      { heading: "Mój obraz sytuacji dziś (1–5)", items: aspects.map((x) => `${x.label}: ${x.value ?? "—"}`) },
      ...paths.map((p) => ({ heading: `Droga: ${p.title}`, items: [p.what, ...p.mayHelp.map((x) => `Może pomóc: ${x}`), ...p.consider.map((x) => `Warto wziąć pod uwagę: ${x}`), ...p.infoNeeded.map((x) => `Do sprawdzenia: ${x}`)] })),
      { heading: "Pytania do refleksji", items: questions },
      { heading: "Informacje, które warto zdobyć", items: info.map((i) => `${i.label} — ${i.why}`) },
      { heading: "Plan małych kroków na 7 dni", items: days },
    ],
  });

  if (!done) return <Wizard key={wizardKey} toolId={TOOL} steps={steps} answers={answers} setAnswers={setAnswers} onComplete={complete} startAt={editStep} finishLabel="Pokaż mój kompas" />;

  return (
    <div ref={ref} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twój kompas</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>Twój obraz sytuacji i możliwe drogi</h2>
        <p style={{ marginBottom: 0 }}>Nie wyliczamy wyniku i nie podpowiadamy, co wybrać. To uporządkowanie Twoich odpowiedzi — decyzja należy do Ciebie.</p>
      </div>
      <div className="result-section"><AnswersSummary steps={steps} answers={answers} onEdit={edit} /></div>
      {safety && (
        <div className="result-section">
          <Alert tone="safety" title="Najpierw bezpieczeństwo">
            <p>Skoro w relacji pojawiła się przemoc lub groźby, wspólne rozmowy i mediacja mogą nie być bezpieczne. W sytuacji zagrożenia dzwoń pod <strong>112</strong>. Wsparcie: <strong>Niebieska Linia 800 120 002</strong>, kryzysowy telefon zaufania <strong>116 123</strong>. <Link href="/pomoc">Więcej numerów pomocowych</Link>.</p>
          </Alert>
        </div>
      )}
      <div className="result-section">
        <h3><Icon name="sparkle" width={22} /> Twój obraz sytuacji dziś</h3>
        <p className="xsmall muted">To nie jest ocena związku. Odczucia zmieniają się w czasie.</p>
        <div className="hbar" role="img" aria-label={aspects.map((x) => `${x.label}: ${x.value} z 5`).join(", ")}>
          {aspects.map((x) => (
            <div key={x.key} className="hbar__row">
              <span>{x.label}</span>
              <div className="hbar__track"><div className="hbar__fill" style={{ width: `${((x.value || 0) / 5) * 100}%`, background: (x.value || 0) <= 2 ? "var(--gold-500)" : "var(--green-700)" }} /></div>
              <span className="hbar__val">{x.value ?? "—"}/5</span>
            </div>
          ))}
        </div>
        {(answers.values || []).length > 0 && (
          <div className="btn-row mt" style={{ gap: 8 }}>
            <span className="xsmall muted" style={{ fontWeight: 600 }}>WAŻNE DLA CIEBIE:</span>
            {(answers.values || []).map((v) => <span key={v} className="tag tag--gold">{labelOf(VALUES, v)}</span>)}
          </div>
        )}
      </div>

      <div className="result-section">
        <h3><Icon name="map" width={22} /> Mapa możliwych dróg</h3>
        <p className="small muted">Kolejność nie jest rankingiem. Oznaczyliśmy drogi związane z informacjami, których — jak piszesz — Ci brakuje.</p>
        <div className="grid grid--2">
          {paths.map((p) => {
            const hidden = safety && (p.id === "talk" || p.id === "mediation");
            return (
              <article key={p.id} className={`scenario ${p.relevant ? "scenario--fit" : ""}`}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {p.relevant && <span className="tag tag--ok">Związane z Twoimi pytaniami</span>}
                  {hidden && <span className="tag tag--warn">Przy zagrożeniu — tylko po konsultacji</span>}
                </div>
                <h4>{p.title}</h4>
                <p className="small" style={{ margin: 0 }}>{p.what}</p>
                <p className="xsmall muted" style={{ margin: "10px 0 0", fontWeight: 600 }}>MOŻE POMÓC</p>
                <ul>{p.mayHelp.map((x) => <li key={x}>{x}</li>)}</ul>
                <p className="xsmall muted" style={{ margin: "10px 0 0", fontWeight: 600 }}>WARTO WZIĄĆ POD UWAGĘ</p>
                <ul>{p.consider.map((x) => <li key={x}>{x}</li>)}</ul>
                <p className="xsmall muted" style={{ margin: "10px 0 0", fontWeight: 600 }}>DO SPRAWDZENIA</p>
                <ul>{p.infoNeeded.map((x) => <li key={x}>{x}</li>)}</ul>
                {p.link && <p className="small no-print" style={{ margin: "10px 0 0" }}><Link href={p.link.href}>{p.link.label} →</Link></p>}
              </article>
            );
          })}
        </div>
      </div>

      <div className="result-section">
        <h3><Icon name="message" width={22} /> Pytania do refleksji</h3>
        <ul className="list-dot list-q">{questions.map((q) => <li key={q}>{q}</li>)}</ul>
      </div>

      {info.length > 0 && (
        <div className="result-section">
          <h3><Icon name="book" width={22} /> Informacje, które warto zdobyć</h3>
          <div className="grid grid--2">
            {info.map((i) => (
              <Link key={i.href} href={i.href} className="card card-link card--sand" style={{ padding: 14 }}>
                <strong>{i.label}</strong>
                <span className="small muted">{i.why}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="result-section">
        <h3><Icon name="calendar" width={22} /> Plan małych kroków na 7 dni</h3>
        <ul className="list-check">{days.map((d) => <li key={d}>{d}</li>)}</ul>
        <p className="xsmall muted">Jeśli czujesz, że sobie nie radzisz — kryzysowy telefon zaufania dla dorosłych: 116 123.</p>
      </div>

      <div className="result-section"><ResultActions toolId={TOOL} report={report} filename="kompas-decyzji" onReset={reset} /></div>
      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep toolId={TOOL} offers={[
          { key: "konsultacja", cta: "Porozmawiaj o swojej sytuacji indywidualnie", why: "Bez zobowiązań i bez nacisku na konkretną decyzję. Możesz po prostu zadać pytania." },
          { key: "materialy", cta: "Zobacz bezpłatne materiały", why: "Przewodniki i checklisty do przeczytania we własnym tempie." },
        ]} />
      </div>
    </div>
  );
}
