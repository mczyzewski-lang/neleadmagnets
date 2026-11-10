"use client";
import "./decision.css";
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
import { PRIORITIES, buildRows, considerations, lawyerQuestions, type FaultAnswers } from "@/lib/decision/wina-czy-bez-winy";

const TOOL = "wina-czy-bez-winy";
type O = { value: string; label: string; desc?: string }[];
const OPT = {
  safety: [{ value: "no", label: "Nie" }, { value: "yes", label: "Tak" }, { value: "skip", label: "Wolę nie odpowiadać" }] as O,
  children: [{ value: "minor", label: "Tak, małoletnie" }, { value: "adult", label: "Tak, pełnoletnie" }, { value: "none", label: "Nie mamy wspólnych dzieci" }] as O,
  consent: [{ value: "yes", label: "Raczej tak" }, { value: "no", label: "Raczej nie — będzie chciała ustalenia winy" }, { value: "unsure", label: "Nie wiem" }] as O,
  hardship: [
    { value: "me", label: "Tak, ja mógłbym/mogłabym", desc: "Np. brak lub niskie dochody, opieka nad dziećmi" },
    { value: "partner", label: "Tak, druga strona mogłaby" },
    { value: "none", label: "Raczej nie" },
    { value: "unsure", label: "Trudno powiedzieć" },
  ] as O,
};

const steps: WizardStep<FaultAnswers>[] = [
  {
    id: "safety", title: "Czy w Waszej relacji zdarzała się przemoc lub groźby albo obawiasz się o swoje bezpieczeństwo?",
    help: "Pytamy, aby nie proponować rozwiązań, które mogłyby być dla Ciebie niebezpieczne. Nie musisz niczego opisywać.",
    valid: (a) => !!a.safety, summary: (a) => labelOf(OPT.safety, a.safety),
    render: (a, set) => <SingleChoice legend="Bezpieczeństwo" options={OPT.safety} value={a.safety} onChange={(v) => set({ safety: v as FaultAnswers["safety"] })} />,
  },
  {
    id: "children", title: "Czy macie wspólne dzieci?",
    valid: (a) => !!a.children, summary: (a) => labelOf(OPT.children, a.children),
    render: (a, set) => <SingleChoice legend="Dzieci" options={OPT.children} value={a.children} onChange={(v) => set({ children: v as FaultAnswers["children"] })} />,
  },
  {
    id: "consent", title: "Czy druga strona zgodziłaby się na rozwód bez orzekania o winie?",
    help: "Rozwód bez orzekania o winie wymaga zgodnego żądania obojga małżonków.",
    valid: (a) => !!a.consent, summary: (a) => labelOf(OPT.consent, a.consent),
    render: (a, set) => <SingleChoice legend="Zgoda drugiej strony" options={OPT.consent} value={a.consent} onChange={(v) => set({ consent: v as FaultAnswers["consent"] })} />,
  },
  {
    id: "hardship", title: "Czy któreś z Was mogłoby po rozwodzie znaleźć się w trudnej sytuacji materialnej?",
    help: "Nie pytamy o kwoty. To pomaga ocenić, czy temat alimentów między byłymi małżonkami może Cię dotyczyć.",
    valid: (a) => !!a.hardship, summary: (a) => labelOf(OPT.hardship, a.hardship),
    render: (a, set) => <SingleChoice legend="Sytuacja materialna" options={OPT.hardship} value={a.hardship} onChange={(v) => set({ hardship: v as FaultAnswers["hardship"] })} />,
  },
  {
    id: "priorities", title: "Co jest dla Ciebie najważniejsze?", help: "Zaznacz dowolną liczbę. Te kwestie wyróżnimy w tabeli.",
    valid: (a) => (a.priorities?.length ? true : "Zaznacz co najmniej jedną kwestię."), summary: (a) => labelOf(PRIORITIES, a.priorities || []),
    render: (a, set) => <MultiChoice legend="Priorytety" options={PRIORITIES} value={a.priorities || []} onChange={(v) => set({ priorities: v })} />,
  },
];

export function FaultTool() {
  const [answers, setAnswers] = useState<FaultAnswers>({});
  const [done, setDone] = useState(false);
  const [editStep, setEditStep] = useState<string | undefined>();
  const [key, setKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const rows = useMemo(() => buildRows(answers), [answers]);
  const cons = useMemo(() => considerations(answers), [answers]);
  const qs = useMemo(() => lawyerQuestions(answers), [answers]);
  const safety = answers.safety === "yes";

  const complete = () => { setDone(true); track("tool_complete", { tool: TOOL }); requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswers({}); setDone(false); setEditStep(undefined); setKey((k) => k + 1); };

  const report = (): Report => ({
    title: "Rozwód z orzekaniem o winie czy bez? — moje porównanie",
    intro: `Zestawienie z ${todayPL()}. Narzędzie nie rekomenduje żadnego wariantu.`,
    sections: [
      ...rows.map((r) => ({ heading: `${r.highlight ? "★ " : ""}${r.topic} (${r.basis}${r.verify ? ", do weryfikacji" : ""})`, items: [`Bez orzekania o winie: ${r.noFault}`, `Z orzekaniem o winie: ${r.withFault}`] })),
      { heading: "Co warto przemyśleć", items: cons },
      { heading: "Pytania do prawnika", items: qs },
    ],
  });

  if (!done) return <Wizard key={key} toolId={TOOL} steps={steps} answers={answers} setAnswers={setAnswers} onComplete={complete} startAt={editStep} finishLabel="Pokaż porównanie" />;

  const hl = rows.filter((r) => r.highlight).length;
  return (
    <div ref={ref} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twoje porównanie</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>Z orzekaniem o winie czy bez — różnice w Twojej sytuacji</h2>
        <p>To porównanie skutków, nie rekomendacja. Wyróżniliśmy {hl} z {rows.length} kwestii, które wynikają z Twoich odpowiedzi.</p>
        <div className="kpis kpis--3">
          <div className="kpi"><span className="kpi__label">Opłata od pozwu</span><span className="kpi__value">600 zł</span><span className="kpi__note">w obu wariantach</span></div>
          <div className="kpi"><span className="kpi__label">Zgoda drugiej strony</span><span className="kpi__value">{answers.consent === "yes" ? "Raczej tak" : answers.consent === "no" ? "Raczej nie" : "Nie wiadomo"}</span><span className="kpi__note">potrzebna do wariantu bez winy</span></div>
          <div className="kpi"><span className="kpi__label">Kwestie wyróżnione</span><span className="kpi__value">{hl}</span><span className="kpi__note">ważne dla Ciebie</span></div>
        </div>
      </div>

      <div className="result-section">
        <AnswersSummary steps={steps} answers={answers} onEdit={edit} />
        {safety && (
          <Alert tone="safety" className="mt" title="Twoje bezpieczeństwo jest najważniejsze">
            <p>W sytuacji zagrożenia dzwoń pod <strong>112</strong>. Wsparcie: <strong>Niebieska Linia 800 120 002</strong> (<Link href="/pomoc">więcej numerów</Link>). Przemoc może mieć znaczenie dla oceny winy i dla spraw dzieci — skonsultuj swoją sytuację indywidualnie z prawnikiem, zanim podejmiesz rozmowy z drugą stroną.</p>
          </Alert>
        )}
      </div>

      <div className="result-section">
        <h3><Icon name="scale" width={22} /> Tabela różnic</h3>
        <div className="cmp-desktop table-wrap">
          <table className="table">
            <caption className="visually-hidden">Porównanie rozwodu bez orzekania o winie i z orzekaniem o winie</caption>
            <thead><tr><th scope="col" style={{ width: "20%" }}>Kwestia</th><th scope="col">Bez orzekania o winie</th><th scope="col">Z orzekaniem o winie</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={r.highlight ? "cmp-row--hl" : undefined}>
                  <th scope="row">
                    {r.topic}
                    <span className="xsmall muted" style={{ display: "block", fontWeight: 400 }}>{r.basis}</span>
                    {r.highlight && <span className="tag tag--ok" style={{ marginTop: 6 }}>ważne dla Ciebie</span>}
                    {r.verify && <span className="tag tag--warn" style={{ marginTop: 6 }}>do weryfikacji przez prawnika</span>}
                  </th>
                  <td>{r.noFault}</td>
                  <td>{r.withFault}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cmp-mobile cmp-cards">
          {rows.map((r) => (
            <article key={r.id} className={`cmp-card ${r.highlight ? "cmp-card--hl" : ""}`}>
              <h4>{r.topic}</h4>
              <div className="btn-row" style={{ gap: 6, marginBottom: 8 }}>
                {r.highlight && <span className="tag tag--ok">ważne dla Ciebie</span>}
                {r.verify && <span className="tag tag--warn">do weryfikacji</span>}
                <span className="tag">{r.basis}</span>
              </div>
              <dl>
                <div><dt>Bez orzekania o winie</dt><dd>{r.noFault}</dd></div>
                <div><dt>Z orzekaniem o winie</dt><dd>{r.withFault}</dd></div>
              </dl>
            </article>
          ))}
        </div>
      </div>

      <div className="result-section">
        <div className="grid grid--2" style={{ gap: 24 }}>
          <div>
            <h3><Icon name="sparkle" width={22} /> Co warto przemyśleć</h3>
            <ul className="list-dot">{cons.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div>
            <h3><Icon name="message" width={22} /> Pytania do prawnika</h3>
            <ul className="list-dot list-q">{qs.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
        </div>
        <div className="mt"><Alert tone="info"><p>Informacje mają charakter ogólny i opierają się na przepisach obowiązujących w dniu weryfikacji. Ocena, czy i jakie skutki wystąpią w Twojej sprawie, wymaga indywidualnej analizy.</p></Alert></div>
      </div>

      <div className="result-section">
        <ResultActions toolId={TOOL} report={report} filename="wina-czy-bez-winy-porownanie" onReset={reset} />
      </div>

      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep
          toolId={TOOL}
          offers={safety
            ? [{ key: "konsultacja", cta: "Poproś o indywidualną rozmowę", why: "Porozmawiaj o swojej sytuacji indywidualnie — bez kontaktu z drugą stroną." }, { key: "materialy", href: "/pomoc", cta: "Zobacz, gdzie szukać pilnej pomocy", why: "Numery pomocowe i informacje o indywidualnej pomocy prawnej." }]
            : [{ key: "plan-rozwodu", cta: "Sprawdź koszt i odbierz bezpłatny Plan Rozwodu", why: "Plan Rozwodu pomaga ustalić, które sprawy da się uzgodnić przed pozwem — także stanowisko co do winy." }, { key: "konsultacja", cta: "Porozmawiaj o swojej sytuacji", why: "Jeśli forma wyroku może wpłynąć na alimenty lub inne sprawy, warto omówić to indywidualnie." }]}
        />
      </div>
    </div>
  );
}
