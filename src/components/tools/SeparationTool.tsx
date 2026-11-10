"use client";
import { useMemo, useRef, useState } from "react";
import "./separation.css";
import { Wizard, AnswersSummary, labelOf, type WizardStep } from "@/components/tool/Wizard";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { SingleChoice, MultiChoice } from "@/components/ui/Choices";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { todayPL } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Report } from "@/lib/report";
import { type SeparationAnswers, type OrderedRow, type UserTopic, commonEffects, consultIssues, keyDifferences, orderedRows, specialistQuestions } from "@/lib/tools/separation";

const TOOL = "separacja-czy-rozwod";
type Opt = { value: string; label: string; desc?: string };
const O: Record<string, Opt[]> = {
  children: [{ value: "minor", label: "Tak, mamy wspólne małoletnie dzieci" }, { value: "adult", label: "Mamy wspólne dzieci, ale są pełnoletnie" }, { value: "none", label: "Nie mamy wspólnych dzieci" }],
  property: [{ value: "yes", label: "Tak" }, { value: "no", label: "Nie" }, { value: "unsure", label: "Nie wiem" }],
  agreement: [{ value: "agree", label: "Raczej tak — myślimy podobnie" }, { value: "differ", label: "Raczej nie — mamy różne oczekiwania" }, { value: "unknown", label: "Nie wiem / nie rozmawialiśmy" }],
  reconcile: [{ value: "yes", label: "Tak, nie wykluczam powrotu" }, { value: "maybe", label: "Nie wiem" }, { value: "no", label: "Nie" }],
  remarry: [{ value: "yes", label: "Tak, to możliwe" }, { value: "unsure", label: "Nie wiem" }, { value: "no", label: "Nie" }],
  worldview: [{ value: "yes", label: "Tak, mają znaczenie" }, { value: "no", label: "Nie" }, { value: "skip", label: "Wolę nie odpowiadać" }],
  topics: [
    { value: "majatek", label: "Majątek i mieszkanie" }, { value: "dzieci", label: "Dzieci" }, { value: "alimenty", label: "Alimenty i wzajemna pomoc" },
    { value: "nazwisko", label: "Nazwisko" }, { value: "dziedziczenie", label: "Dziedziczenie" }, { value: "koszty", label: "Koszty i procedura" },
    { value: "powrot", label: "Możliwość powrotu / zmiany decyzji" },
  ],
};
const single = (k: keyof SeparationAnswers, legend: string) => (a: SeparationAnswers, set: (p: Partial<SeparationAnswers>) => void) => (
  <SingleChoice legend={legend} options={O[k]} value={a[k] as string | undefined} onChange={(v) => set({ [k]: v } as Partial<SeparationAnswers>)} />
);
const sum = (k: keyof SeparationAnswers) => (a: SeparationAnswers) => labelOf(O[k], a[k] as string);

const steps: WizardStep<SeparationAnswers>[] = [
  { id: "children", title: "Czy macie wspólne dzieci?", help: "To wpływa m.in. na to, czy możliwa jest separacja na zgodny wniosek.", valid: (a) => !!a.children, summary: sum("children"), render: single("children", "Dzieci") },
  { id: "property", title: "Czy macie wspólny majątek (np. mieszkanie, oszczędności, kredyt)?", valid: (a) => !!a.property, summary: sum("property"), render: single("property", "Majątek") },
  { id: "agreement", title: "Czy oboje myślicie o podobnym rozwiązaniu?", help: "Nie musisz opisywać szczegółów.", valid: (a) => !!a.agreement, summary: sum("agreement"), render: single("agreement", "Zgodność") },
  { id: "reconcile", title: "Czy bierzesz pod uwagę, że w przyszłości możecie się zejść?", valid: (a) => !!a.reconcile, summary: sum("reconcile"), render: single("reconcile", "Powrót") },
  { id: "remarry", title: "Czy w przyszłości możesz chcieć zawrzeć nowe małżeństwo?", valid: (a) => !!a.remarry, summary: sum("remarry"), render: single("remarry", "Nowe małżeństwo") },
  { id: "worldview", title: "Czy przekonania religijne lub światopoglądowe mają znaczenie dla Twojej decyzji?", help: "Zadajemy to pytanie tylko po to, aby wyróżnić odpowiednie informacje. Możesz pominąć.", valid: (a) => !!a.worldview, summary: sum("worldview"), render: single("worldview", "Przekonania") },
  { id: "topics", title: "Które tematy są dla Ciebie najważniejsze?", help: "Zaznacz dowolne — wyróżnimy je w porównaniu. Pozostałe też będą dostępne.", optional: true, summary: (a) => labelOf(O.topics, a.topics) || "brak", render: (a, set) => <MultiChoice legend="Tematy" options={O.topics} value={a.topics} onChange={(v) => set({ topics: v as UserTopic[] })} columns={2} /> },
];

function Row({ r }: { r: OrderedRow }) {
  return (
    <article className={`cmp__row ${r.relevant ? "cmp__row--rel" : ""}`}>
      <div className="cmp__head">
        <h4>{r.label}</h4>
        <span style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {r.same && <span className="tag">skutek zbliżony</span>}
          {r.verify && <span className="tag tag--warn">do weryfikacji przez prawnika</span>}
        </span>
      </div>
      <div className="cmp__cells">
        <div className="cmp__cell"><span className="cmp__k cmp__k--sep">Separacja</span>{r.separation}</div>
        <div className="cmp__cell"><span className="cmp__k cmp__k--div">Rozwód</span>{r.divorce}</div>
      </div>
      <div className="cmp__basis">Podstawa: {r.basis}</div>
    </article>
  );
}

export function SeparationTool() {
  const [answers, setAnswersState] = useState<SeparationAnswers>({ topics: [] });
  const [done, setDone] = useState(false);
  const [editStep, setEditStep] = useState<string | undefined>();
  const [wizardKey, setWizardKey] = useState(0);
  const [more, setMore] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const rows = useMemo(() => orderedRows(answers), [answers]);
  const rel = rows.filter((r) => r.relevant);
  const rest = rows.filter((r) => !r.relevant);
  const common = commonEffects(answers);
  const diffs = keyDifferences(answers);
  const consult = consultIssues(answers);
  const questions = specialistQuestions(answers);

  const complete = () => { setDone(true); track("tool_complete", { tool: TOOL }); requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setWizardKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswersState({ topics: [] }); setDone(false); setEditStep(undefined); setWizardKey((k) => k + 1); };

  const report = (): Report => ({
    title: "Separacja czy rozwód — moje porównanie",
    intro: `Zestawienie przygotowane ${todayPL()}. Porównanie skutków prawnych według prawa polskiego. Nie wskazuje, którą drogę wybrać.`,
    sections: [
      { heading: "Porównanie: separacja | rozwód", items: rows.map((r) => `${r.label}${r.verify ? " (do weryfikacji przez prawnika)" : ""} — SEPARACJA: ${r.separation} ROZWÓD: ${r.divorce} [${r.basis}]`) },
      { heading: "Skutki wspólne", items: common },
      { heading: "Najważniejsze różnice", items: diffs },
      { heading: "Kwestie do konsultacji", items: consult },
      { heading: "Pytania do specjalisty", items: questions },
    ],
  });

  if (!done) return <Wizard key={wizardKey} toolId={TOOL} steps={steps} answers={answers} setAnswers={(fn) => setAnswersState(fn)} onComplete={complete} startAt={editStep} finishLabel="Pokaż porównanie" />;

  return (
    <div ref={resultRef} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twoje porównanie</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>Separacja i rozwód — co je łączy, a co różni</h2>
        <p style={{ marginBottom: 16 }}>Na górze tematy najważniejsze w Twojej sytuacji. To porównanie skutków prawnych — decyzja należy do Ciebie.</p>
        <div className="kpis kpis--3">
          <div className="kpi"><span className="kpi__label">Tematy wyróżnione</span><span className="kpi__value">{rel.length}</span></div>
          <div className="kpi"><span className="kpi__label">Skutki zbliżone</span><span className="kpi__value">{rows.filter((r) => r.same).length}</span></div>
          <div className="kpi"><span className="kpi__label">Pytania do specjalisty</span><span className="kpi__value">{questions.length}</span></div>
        </div>
      </div>

      <div className="result-section"><AnswersSummary steps={steps} answers={answers} onEdit={edit} /></div>

      {answers.children === "minor" && (
        <div className="result-section" style={{ paddingBottom: 0, borderTop: 0 }}>
          <Alert tone="info"><p>Macie wspólne małoletnie dzieci — <strong>separacja na zgodny wniosek nie jest wtedy dostępna</strong>. W obu drogach sąd rozstrzyga o sprawach dzieci, uwzględniając ich dobro.</p></Alert>
        </div>
      )}

      <div className="result-section">
        <h3><Icon name="split" width={22} /> Najważniejsze dla Ciebie</h3>
        <div className="cmp">{rel.map((r) => <Row key={r.id} r={r} />)}</div>
        {rest.length > 0 && (
          <>
            <button type="button" className="btn btn--ghost btn--sm no-print mt" aria-expanded={more} onClick={() => setMore((v) => !v)}>
              {more ? "Ukryj pozostałe różnice" : `Pokaż pozostałe różnice (${rest.length})`}
            </button>
            <div className={`cmp cmp-more mt ${more ? "is-open" : ""}`}>{rest.map((r) => <Row key={r.id} r={r} />)}</div>
          </>
        )}
      </div>

      <div className="result-section">
        <div className="grid grid--2" style={{ gap: 24 }}>
          <div><h3><Icon name="check" width={22} /> Skutki wspólne</h3><ul className="list-check">{common.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div><h3><Icon name="scale" width={22} /> Najważniejsze różnice</h3><ul className="list-dot">{diffs.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div><h3><Icon name="alert" width={22} /> Kwestie do konsultacji</h3><ul className="list-dot">{consult.map((x) => <li key={x}>{x}</li>)}</ul></div>
          <div><h3><Icon name="message" width={22} /> Pytania do specjalisty</h3><ul className="list-dot list-q">{questions.map((x) => <li key={x}>{x}</li>)}</ul></div>
        </div>
        <Alert tone="warn" className="mt"><p>Narzędzie nie ocenia, czy w Twojej sprawie są spełnione przesłanki separacji lub rozwodu, i nie podpowiada wyboru. Przepisy mogą się zmieniać — przed decyzją skonsultuj aktualny stan prawny ze specjalistą.</p></Alert>
      </div>

      <div className="result-section"><ResultActions toolId={TOOL} report={report} filename="separacja-czy-rozwod-porownanie" onReset={reset} /></div>

      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep
          toolId={TOOL}
          intro="Niezależnie od wybranej drogi, wiele spraw — dzieci, majątek, finanse — można uporządkować wcześniej."
          offers={[
            { key: "konsultacja", cta: "Poznaj dostępne drogi i uporządkuj kolejne kroki", why: "Porozmawiaj o swojej sytuacji indywidualnie — bez zobowiązań i bez decydowania za Ciebie." },
            { key: "plan-rozwodu", why: "Bezpłatny Plan Rozwodu porządkuje sprawy do ustalenia — przydaje się także przy separacji." },
          ]}
        />
      </div>
    </div>
  );
}
