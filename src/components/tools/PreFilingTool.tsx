"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Wizard, AnswersSummary, labelOf, type WizardStep } from "@/components/tool/Wizard";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { SingleChoice, MultiChoice } from "@/components/ui/Choices";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { todayPL } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Report } from "@/lib/report";
import { type PreFilingAnswers, availableTopics, buildPreFiling, isSafetyConcern } from "@/lib/tools/preFiling";
import "./tools-extra.css";

const TOOL = "przed-pozwem";
type Opt = { value: string; label: string; desc?: string };

const O: Record<string, Opt[]> = {
  decision: [
    { value: "taken", label: "Tak, decyzja zapadła" },
    { value: "considering", label: "Jeszcze to rozważam" },
    { value: "partner", label: "Decyzję podjęła druga strona" },
  ],
  safety: [
    { value: "no", label: "Nie" },
    { value: "yes", label: "Tak" },
    { value: "skip", label: "Wolę nie odpowiadać" },
  ],
  openness: [
    { value: "both", label: "Tak, oboje jesteśmy otwarci" },
    { value: "me", label: "Ja tak, druga strona raczej nie" },
    { value: "partner", label: "Druga strona tak, ja mam wątpliwości" },
    { value: "none", label: "Raczej żadne z nas" },
    { value: "unsure", label: "Trudno powiedzieć" },
  ],
  children: [
    { value: "minor", label: "Tak, małoletnie" },
    { value: "adult", label: "Tak, dorosłe" },
    { value: "none", label: "Nie" },
  ],
  finances: [
    { value: "yes", label: "Tak", desc: "Np. mieszkanie, kredyt, firma, oszczędności" },
    { value: "some", label: "W niewielkim zakresie" },
    { value: "no", label: "Nie" },
  ],
  balance: [
    { value: "ok", label: "Tak, oboje możemy mówić swobodnie" },
    { value: "unequal", label: "Nie zawsze — czuję presję lub boję się reakcji" },
    { value: "unsure", label: "Nie wiem" },
  ],
};

const topicOpts = (a: PreFilingAnswers): Opt[] => availableTopics(a).map((t) => ({ value: t.value, label: t.label }));
const selectedOpts = (a: PreFilingAnswers): Opt[] => topicOpts(a).filter((o) => (a.topics || []).includes(o.value));
const notSafety = (a: PreFilingAnswers) => !isSafetyConcern(a) && a.safety !== "yes";

const steps: WizardStep<PreFilingAnswers>[] = [
  { id: "decision", title: "Czy decyzja o rozwodzie została podjęta?", valid: (a) => !!a.decision, summary: (a) => labelOf(O.decision, a.decision),
    render: (a, set) => <SingleChoice legend="Decyzja" options={O.decision} value={a.decision} onChange={(v) => set({ decision: v as PreFilingAnswers["decision"] })} /> },
  { id: "safety", title: "Czy w Waszej relacji zdarzała się przemoc, groźby lub czy obawiasz się o swoje bezpieczeństwo albo bezpieczeństwo dzieci?",
    help: "Pytamy, aby nie proponować rozwiązań, które mogłyby nie być bezpieczne. Nie musisz niczego opisywać. Odpowiedź nie jest nigdzie zapisywana.",
    valid: (a) => !!a.safety, summary: (a) => labelOf(O.safety, a.safety),
    render: (a, set) => (
      <>
        <SingleChoice legend="Bezpieczeństwo" options={O.safety} value={a.safety} onChange={(v) => set({ safety: v as PreFilingAnswers["safety"] })} />
        {a.safety === "yes" && (
          <Alert tone="safety" className="mt">
            <p>Dziękujemy za odpowiedź. W sytuacji zagrożenia dzwoń pod <strong>112</strong>. Bezpłatne wsparcie: Niebieska Linia <strong>800 120 002</strong>. Dalsze pytania dopasujemy tak, aby nie kierować Cię do wspólnych negocjacji.</p>
          </Alert>
        )}
      </>
    ) },
  { id: "openness", title: "Czy obie strony są otwarte na rozmowę o warunkach?", when: notSafety, valid: (a) => !!a.openness, summary: (a) => labelOf(O.openness, a.openness),
    render: (a, set) => <SingleChoice legend="Otwartość" options={O.openness} value={a.openness} onChange={(v) => set({ openness: v as PreFilingAnswers["openness"] })} /> },
  { id: "balance", title: "Czy w rozmowach oboje możecie swobodnie przedstawiać swoje zdanie?", help: "Mediacja ma sens, gdy żadna ze stron nie czuje presji ani strachu.",
    when: (a) => notSafety(a) && (a.openness === "both" || a.openness === "unsure" || a.openness === "partner"),
    valid: (a) => !!a.balance, summary: (a) => labelOf(O.balance, a.balance),
    render: (a, set) => <SingleChoice legend="Swoboda rozmowy" options={O.balance} value={a.balance} onChange={(v) => set({ balance: v as PreFilingAnswers["balance"] })} /> },
  { id: "children", title: "Czy macie wspólne dzieci?", help: "Nie pytamy o imiona ani dane dzieci.", valid: (a) => !!a.children, summary: (a) => labelOf(O.children, a.children),
    render: (a, set) => <SingleChoice legend="Dzieci" options={O.children} value={a.children} onChange={(v) => set({ children: v as PreFilingAnswers["children"], topics: (a.topics || []).filter((t) => v === "minor" || !["opieka", "kontakty", "alimenty"].includes(t)) })} /> },
  { id: "finances", title: "Czy istnieją istotne kwestie finansowe lub majątkowe?", valid: (a) => !!a.finances, summary: (a) => labelOf(O.finances, a.finances),
    render: (a, set) => <SingleChoice legend="Finanse" options={O.finances} value={a.finances} onChange={(v) => set({ finances: v as PreFilingAnswers["finances"] })} /> },
  { id: "topics", title: "Jakie tematy wymagają uzgodnienia?", help: "Zaznacz wszystkie, które Was dotyczą.",
    valid: (a) => ((a.topics || []).length ? true : "Zaznacz przynajmniej jeden temat."), summary: (a) => labelOf(topicOpts(a), a.topics) || "—",
    render: (a, set) => <MultiChoice legend="Tematy" options={topicOpts(a)} value={a.topics || []} onChange={(v) => set({ topics: v, agreed: (a.agreed || []).filter((x) => v.includes(x)), contested: (a.contested || []).filter((x) => v.includes(x)) })} columns={2} /> },
  { id: "agreed", title: "Czy któreś z tych tematów macie już wstępnie uzgodnione?", optional: true, when: (a) => notSafety(a) && (a.topics || []).length > 0,
    summary: (a) => (a.agreed?.length ? labelOf(selectedOpts(a), a.agreed) : "żadne"),
    render: (a, set) => <MultiChoice legend="Uzgodnione" options={selectedOpts(a)} value={a.agreed || []} onChange={(v) => set({ agreed: v, contested: (a.contested || []).filter((x) => !v.includes(x)) })} columns={2} /> },
  { id: "contested", title: "Które tematy są szczególnie sporne?", help: "Wystarczy zaznaczyć — nie musisz opisywać szczegółów konfliktu.", optional: true,
    when: (a) => notSafety(a) && (a.topics || []).filter((t) => !(a.agreed || []).includes(t)).length > 0,
    summary: (a) => (a.contested?.length ? labelOf(selectedOpts(a), a.contested) : "żadne"),
    render: (a, set) => <MultiChoice legend="Sporne" options={selectedOpts(a).filter((o) => !(a.agreed || []).includes(o.value))} value={a.contested || []} onChange={(v) => set({ contested: v })} columns={2} /> },
];

export function PreFilingTool() {
  const [answers, setAnswersState] = useState<PreFilingAnswers>({});
  const [done, setDone] = useState(false);
  const [editStep, setEditStep] = useState<string | undefined>();
  const [wizardKey, setWizardKey] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const r = useMemo(() => buildPreFiling(answers), [answers]);

  const complete = () => {
    setDone(true);
    track("tool_complete", { tool: TOOL });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setWizardKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswersState({}); setDone(false); setEditStep(undefined); setWizardKey((k) => k + 1); };

  const report = (): Report => ({
    title: r.mode === "safety" ? "Ustalenia przed pozwem — moje kolejne kroki" : "Mapa możliwych ustaleń przed pozwem",
    intro: `Zestawienie przygotowane ${todayPL()} na podstawie moich odpowiedzi.`,
    sections: [
      ...(r.mode === "safety" ? [{ heading: "Bezpieczeństwo", items: ["W sytuacji zagrożenia: 112.", "Niebieska Linia (wsparcie dla osób doznających przemocy domowej): 800 120 002.", ...r.notes] }] : []),
      { heading: "Kwestie, które można spróbować uzgodnić", items: r.agreeable },
      { heading: "Kwestie wymagające indywidualnej analizy", items: r.analysis.map((x) => `${x.topic}: ${x.reason}`) },
      { heading: "Potencjalne kroki mediacyjne", items: r.mediationSteps },
      { heading: "Dokumenty do przygotowania", items: r.documents },
      { heading: "Pytania do mediatora", items: r.mediatorQuestions },
      { heading: "Wstępna kolejność działań", items: r.sequence.map((s, i) => `${i + 1}. ${s.title} — ${s.text}`) },
      ...(r.mode === "standard" ? [{ heading: "Ważne", items: r.notes }] : []),
    ],
  });

  if (!done) return <Wizard key={wizardKey} toolId={TOOL} steps={steps} answers={answers} setAnswers={setAnswersState} onComplete={complete} startAt={editStep} />;

  const { readiness: rd } = r;
  const pct = (n: number) => (rd.total ? (n / rd.total) * 100 : 0);

  return (
    <div ref={resultRef} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twój wynik</span>
        {r.mode === "safety" ? (
          <>
            <h2 style={{ fontSize: "var(--fs-2xl)" }}>Najpierw Twoje bezpieczeństwo</h2>
            <p style={{ margin: 0 }}>Na podstawie Twoich odpowiedzi nie proponujemy wspólnych negocjacji ani mediacji. Poniżej znajdziesz kroki, które możesz podjąć indywidualnie.</p>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "var(--fs-2xl)" }}>Mapa możliwych ustaleń przed pozwem</h2>
            <p style={{ marginBottom: 16 }}>Stan Waszych ustaleń w {rd.total} {rd.total === 1 ? "temacie" : "tematach"}. To nie jest ocena, czy powinniście się rozwieść — tylko obraz tego, co już jest, a co zostaje do omówienia.</p>
            <div className="readiness" role="img" aria-label={`Uzgodnione: ${rd.agreed}, otwarte: ${rd.open}, sporne: ${rd.contested}`}>
              <span className="readiness__agreed" style={{ width: `${pct(rd.agreed)}%` }} />
              <span className="readiness__open" style={{ width: `${pct(rd.open)}%` }} />
              <span className="readiness__contested" style={{ width: `${pct(rd.contested)}%` }} />
            </div>
            <div className="kpis kpis--3" style={{ marginTop: 14 }}>
              <div className="kpi"><span className="kpi__label">Wstępnie uzgodnione</span><span className="kpi__value">{rd.agreed}</span></div>
              <div className="kpi"><span className="kpi__label">Do omówienia</span><span className="kpi__value">{rd.open}</span></div>
              <div className="kpi"><span className="kpi__label">Szczególnie sporne</span><span className="kpi__value">{rd.contested}</span></div>
            </div>
          </>
        )}
      </div>

      <div className="result-section">
        <AnswersSummary steps={steps} answers={answers} onEdit={edit} />
      </div>

      {r.mode === "safety" ? (
        <div className="result-section">
          <Alert tone="safety" title="Gdzie szukać pomocy">
            <p>W sytuacji bezpośredniego zagrożenia zadzwoń pod numer alarmowy <strong>112</strong>.</p>
            <p>Niebieska Linia — ogólnopolski telefon dla osób doznających przemocy domowej: <strong>800 120 002</strong>.</p>
            <p>Możesz też skorzystać z indywidualnej pomocy prawnika, który reprezentuje wyłącznie Ciebie, oraz z lokalnego ośrodka interwencji kryzysowej. <Link href="/pomoc">Więcej kontaktów</Link></p>
          </Alert>
          <p className="small muted mt">{r.notes.join(" ")}</p>
        </div>
      ) : (
        <div className="result-section">
          <h3><Icon name="map" width={22} /> Co można uzgodnić, a co wymaga analizy</h3>
          <div className="pf-cols">
            <div className="pf-col pf-col--ok">
              <h4><Icon name="handshake" width={20} /> Można spróbować uzgodnić</h4>
              {r.agreeable.length ? <ul className="list-check">{r.agreeable.map((x) => <li key={x}>{x}</li>)}</ul> : <p className="small">Wszystkie zaznaczone tematy wymagają w pierwszej kolejności indywidualnej analizy.</p>}
            </div>
            <div className="pf-col pf-col--analysis">
              <h4><Icon name="scale" width={20} /> Wymaga indywidualnej analizy</h4>
              {r.analysis.length ? (
                <ul className="list-dot">{r.analysis.map((x) => <li key={x.topic}><strong>{x.topic}</strong> — {x.reason}</li>)}</ul>
              ) : <p className="small">Brak tematów oznaczonych jako szczególnie złożone.</p>}
            </div>
          </div>
        </div>
      )}

      {r.mode === "safety" && r.analysis.length > 0 && (
        <div className="result-section">
          <h3><Icon name="scale" width={22} /> Tematy do omówienia indywidualnie ze specjalistą</h3>
          <ul className="list-dot">{r.analysis.map((x) => <li key={x.topic}>{x.topic}</li>)}</ul>
        </div>
      )}

      <div className="result-section">
        <h3><Icon name="checklist" width={22} /> Wstępna kolejność działań</h3>
        <ol className="timeline">
          {r.sequence.map((s) => <li key={s.title}><strong>{s.title}</strong><p>{s.text}</p></li>)}
        </ol>
      </div>

      {r.mediationSteps.length > 0 && (
        <div className="result-section">
          <h3><Icon name="handshake" width={22} /> Jak może wyglądać mediacja</h3>
          <ul className="list-check">{r.mediationSteps.map((x) => <li key={x}>{x}</li>)}</ul>
          <Alert tone="info" className="mt"><p>{r.notes.join(" ")}</p></Alert>
        </div>
      )}

      <div className="result-section">
        <div className="grid grid--2" style={{ gap: 24 }}>
          <div>
            <h3><Icon name="doc" width={22} /> Dokumenty do przygotowania</h3>
            <ul className="list-check">{r.documents.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          {r.mediatorQuestions.length > 0 && (
            <div>
              <h3><Icon name="message" width={22} /> Pytania do mediatora</h3>
              <ul className="list-dot list-q">{r.mediatorQuestions.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          )}
        </div>
      </div>

      <div className="result-section">
        <ResultActions toolId={TOOL} report={report} filename="ustalenia-przed-pozwem" onReset={reset} />
      </div>

      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep
          toolId={TOOL}
          heading={r.mode === "safety" ? "Jeśli chcesz, porozmawiajmy indywidualnie" : "Co możesz zrobić dalej?"}
          intro={r.mode === "safety" ? "Rozmowa dotyczy wyłącznie Ciebie i nie wymaga kontaktu z drugą stroną." : "Najpierw plan i ustalenia. Dopiero potem pozew — jeśli to dla Was możliwe."}
          offers={r.offers}
        />
      </div>
    </div>
  );
}

