"use client";
import { useMemo, useRef, useState } from "react";
import { Wizard, AnswersSummary, labelOf, type WizardStep } from "@/components/tool/Wizard";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { SingleChoice, MultiChoice } from "@/components/ui/Choices";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { todayPL } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Report } from "@/lib/report";
import { type ConsequencesAnswers, type TopicCard, PRIORITY_OPTIONS, buildCards, summaryLine } from "@/lib/tools/consequences";
import "./tools-extra.css";

const TOOL = "konsekwencje-rozstania";

type Opt = { value: string; label: string; desc?: string };
const O: Record<string, Opt[]> = {
  relation: [
    { value: "marriage", label: "Małżeństwo" },
    { value: "informal", label: "Związek nieformalny", desc: "Bez ślubu cywilnego lub konkordatowego" },
  ],
  children: [
    { value: "minor", label: "Tak, małoletnie (poniżej 18 lat)" },
    { value: "adultLearning", label: "Tak, pełnoletnie, ale jeszcze się uczą" },
    { value: "adult", label: "Tak, samodzielne dorosłe dzieci" },
    { value: "none", label: "Nie mamy wspólnych dzieci" },
  ],
  property: [
    { value: "yes", label: "Tak" },
    { value: "no", label: "Nie" },
    { value: "unsure", label: "Nie jestem pewien/pewna" },
  ],
  loan: [
    { value: "joint", label: "Tak, wspólny kredyt" },
    { value: "single", label: "Tak, kredyt jednej osoby" },
    { value: "none", label: "Nie" },
  ],
  business: [
    { value: "joint", label: "Tak, wspólną" },
    { value: "one", label: "Jedno z nas prowadzi firmę" },
    { value: "none", label: "Nie" },
  ],
  debts: [
    { value: "yes", label: "Tak" },
    { value: "no", label: "Nie" },
    { value: "unsure", label: "Nie wiem" },
  ],
  steps: [
    { value: "none", label: "Jeszcze nic" },
    { value: "talks", label: "Rozmawiamy o warunkach" },
    { value: "mediation", label: "Jesteśmy w mediacji" },
    { value: "filed", label: "Pozew / wniosek został złożony" },
    { value: "judgment", label: "Jest już wyrok" },
  ],
};

const steps: WizardStep<ConsequencesAnswers>[] = [
  { id: "relation", title: "Małżeństwo czy związek nieformalny?", help: "Przepisy dla obu sytuacji są różne — pokażemy właściwe informacje.", valid: (a) => !!a.relation, summary: (a) => labelOf(O.relation, a.relation),
    render: (a, set) => <SingleChoice legend="Rodzaj związku" options={O.relation} value={a.relation} onChange={(v) => set({ relation: v as ConsequencesAnswers["relation"] })} /> },
  { id: "children", title: "Czy macie wspólne dzieci?", help: "Nie pytamy o imiona ani inne dane dzieci.", valid: (a) => !!a.children, summary: (a) => labelOf(O.children, a.children),
    render: (a, set) => <SingleChoice legend="Dzieci" options={O.children} value={a.children} onChange={(v) => set({ children: v as ConsequencesAnswers["children"] })} /> },
  { id: "property", title: "Czy macie wspólną nieruchomość?", valid: (a) => !!a.property, summary: (a) => labelOf(O.property, a.property),
    render: (a, set) => <SingleChoice legend="Nieruchomość" options={O.property} value={a.property} onChange={(v) => set({ property: v as ConsequencesAnswers["property"] })} /> },
  { id: "loan", title: "Czy macie kredyt hipoteczny?", valid: (a) => !!a.loan, summary: (a) => labelOf(O.loan, a.loan),
    render: (a, set) => <SingleChoice legend="Kredyt" options={O.loan} value={a.loan} onChange={(v) => set({ loan: v as ConsequencesAnswers["loan"] })} /> },
  { id: "business", title: "Czy prowadzicie działalność gospodarczą?", valid: (a) => !!a.business, summary: (a) => labelOf(O.business, a.business),
    render: (a, set) => <SingleChoice legend="Działalność" options={O.business} value={a.business} onChange={(v) => set({ business: v as ConsequencesAnswers["business"] })} /> },
  { id: "debts", title: "Czy istnieją inne wspólne zobowiązania?", help: "Np. pożyczki, karty kredytowe, leasing, kredyt na samochód.", valid: (a) => !!a.debts, summary: (a) => labelOf(O.debts, a.debts),
    render: (a, set) => <SingleChoice legend="Zobowiązania" options={O.debts} value={a.debts} onChange={(v) => set({ debts: v as ConsequencesAnswers["debts"] })} /> },
  { id: "steps", title: "Czy podjęto już jakieś formalne kroki?", valid: (a) => !!a.steps, summary: (a) => labelOf(O.steps, a.steps),
    render: (a, set) => <SingleChoice legend="Kroki" options={O.steps} value={a.steps} onChange={(v) => set({ steps: v as ConsequencesAnswers["steps"] })} /> },
  { id: "priorities", title: "Które tematy są dla Ciebie najważniejsze?", help: "Możesz zaznaczyć kilka. Pokażemy je na początku mapy.", optional: true,
    summary: (a) => (a.priorities?.length ? labelOf(PRIORITY_OPTIONS as unknown as Opt[], a.priorities) : "nie wybrano"),
    render: (a, set) => <MultiChoice legend="Priorytety" options={PRIORITY_OPTIONS as unknown as Opt[]} value={a.priorities || []} onChange={(v) => set({ priorities: v })} columns={2} /> },
];

const REL_LABEL = { priorytet: "Twój priorytet", dotyczy: "Dotyczy Ciebie", "warto-sprawdzic": "Warto sprawdzić" } as const;

function CardView({ c }: { c: TopicCard }) {
  return (
    <article id={`temat-${c.id}`} className={`card topic-card topic-card--${c.relevance}`}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <span className={`tag ${c.relevance === "priorytet" ? "tag--gold" : c.relevance === "dotyczy" ? "" : "tag--ok"}`}>{REL_LABEL[c.relevance]}</span>
        {c.dependsOnDetails && <span className="tag tag--warn">Zależy od szczegółów</span>}
      </div>
      <h4 style={{ fontSize: "var(--fs-lg)" }}>{c.title}</h4>
      {c.know.length > 0 && (<><p className="topic-card__h">Co warto wiedzieć</p><ul className="list-dot">{c.know.map((x) => <li key={x}>{x}</li>)}</ul></>)}
      {c.check.length > 0 && (<><p className="topic-card__h">Co warto sprawdzić</p><ul className="list-check">{c.check.map((x) => <li key={x}>{x}</li>)}</ul></>)}
      {c.ask.length > 0 && (<><p className="topic-card__h">Pytania do specjalisty</p><ul className="list-dot list-q">{c.ask.map((x) => <li key={x}>{x}</li>)}</ul></>)}
    </article>
  );
}

export function ConsequencesTool() {
  const [answers, setAnswersState] = useState<ConsequencesAnswers>({});
  const [done, setDone] = useState(false);
  const [editStep, setEditStep] = useState<string | undefined>();
  const [wizardKey, setWizardKey] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const cards = useMemo(() => buildCards(answers), [answers]);

  const complete = () => {
    setDone(true);
    track("tool_complete", { tool: TOOL });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setWizardKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswersState({}); setDone(false); setEditStep(undefined); setWizardKey((k) => k + 1); };

  const report = (): Report => ({
    title: "Mapa prawnych konsekwencji rozstania",
    intro: `Zestawienie przygotowane ${todayPL()} na podstawie moich odpowiedzi. ${summaryLine(answers)}`,
    sections: cards.flatMap((c) => [
      { heading: `${c.title} (${REL_LABEL[c.relevance]}${c.dependsOnDetails ? ", zależy od szczegółów" : ""})`, items: [
        ...c.know.map((x) => `Warto wiedzieć: ${x}`),
        ...c.check.map((x) => `Sprawdź: ${x}`),
        ...c.ask.map((x) => `Pytanie do specjalisty: ${x}`),
      ] },
    ]),
  });

  if (!done) return <Wizard key={wizardKey} toolId={TOOL} steps={steps} answers={answers} setAnswers={setAnswersState} onComplete={complete} startAt={editStep} />;

  const counts = { priorytet: cards.filter((c) => c.relevance === "priorytet").length, dotyczy: cards.filter((c) => c.relevance === "dotyczy").length, warto: cards.filter((c) => c.relevance === "warto-sprawdzic").length };

  return (
    <div ref={resultRef} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twoja mapa</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>{cards.length} obszarów do sprawdzenia w Twojej sytuacji</h2>
        <p style={{ marginBottom: 16 }}>{summaryLine(answers)}</p>
        <div className="kpis kpis--3">
          <div className="kpi"><span className="kpi__label">Twoje priorytety</span><span className="kpi__value">{counts.priorytet}</span></div>
          <div className="kpi"><span className="kpi__label">Dotyczy Ciebie</span><span className="kpi__value">{counts.dotyczy}</span></div>
          <div className="kpi"><span className="kpi__label">Warto sprawdzić</span><span className="kpi__value">{counts.warto}</span></div>
        </div>
      </div>

      <div className="result-section">
        <AnswersSummary steps={steps} answers={answers} onEdit={edit} />
      </div>

      <div className="result-section">
        <h3><Icon name="map" width={22} /> Mapa tematów</h3>
        <p className="small muted">Kliknij kafelek, aby przejść do szczegółów.</p>
        <nav className="topic-map" aria-label="Mapa tematów">
          {cards.map((c) => (
            <a key={c.id} href={`#temat-${c.id}`} className={`topic-tile topic-tile--${c.relevance}`}>
              <span className="topic-tile__title">{c.title}</span>
              <span className="topic-tile__meta">{REL_LABEL[c.relevance]}{c.dependsOnDetails ? " · zależy od szczegółów" : ""}</span>
            </a>
          ))}
        </nav>
        <ul className="legend" aria-hidden="true">
          <li><i style={{ background: "var(--gold-500)" }} /> Twój priorytet</li>
          <li><i style={{ background: "var(--green-700)" }} /> Dotyczy Ciebie</li>
          <li><i style={{ background: "var(--green-100)", border: "1px solid var(--green-500)" }} /> Warto sprawdzić</li>
        </ul>
      </div>

      <div className="result-section">
        <Alert tone="info">
          <p>Mapa pokazuje tematy, które zwykle warto sprawdzić w podobnej sytuacji. <strong>Nie jest oceną Twoich uprawnień</strong> — konkretne skutki zależą od szczegółów. Oznaczenie „zależy od szczegółów” wskazuje kwestie wymagające indywidualnej analizy.</p>
        </Alert>
        <div className="stack mt">
          {cards.map((c) => <CardView key={c.id} c={c} />)}
        </div>
      </div>

      <div className="result-section">
        <ResultActions toolId={TOOL} report={report} filename="mapa-konsekwencji-rozstania" onReset={reset} />
      </div>

      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep
          toolId={TOOL}
          intro="Gdy wiesz już, które tematy Cię dotyczą, łatwiej ułożyć kolejność działań."
          offers={[
            { key: "plan-rozwodu", cta: "Poznaj możliwe kolejne kroki i przygotuj plan działania", why: answers.relation === "informal" ? "Bezpłatny plan pomoże uporządkować sprawy dzieci, mieszkania i finansów — także bez sprawy rozwodowej." : "Bezpłatny Plan Rozwodu porządkuje tematy z mapy w kolejność działań — zanim złożysz pozew." },
            answers.relation === "marriage"
              ? { key: "materialy", href: "/narzedzia/separacja-czy-rozwod", cta: "Porównaj separację i rozwód", why: "Interaktywna tabela różnic między separacją a rozwodem." }
              : { key: "materialy", href: "/materialy/przygotowanie-do-konsultacji", cta: "Jak przygotować się do konsultacji", why: "Checklista: co zabrać i o co zapytać na pierwszym spotkaniu ze specjalistą." },
          ]}
        />
      </div>
    </div>
  );
}
