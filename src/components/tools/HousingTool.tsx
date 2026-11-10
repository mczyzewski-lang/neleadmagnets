"use client";
import { useMemo, useRef, useState } from "react";
import { Wizard, AnswersSummary, labelOf, type WizardStep } from "@/components/tool/Wizard";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { SingleChoice } from "@/components/ui/Choices";
import { MoneyField } from "@/components/ui/MoneyField";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { formatPLN, todayPL } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Report } from "@/lib/report";
import {
  type HousingAnswers, DEFAULT_SALE_COST_PCT, agreementsToDiscuss, bankChecklist, buildRisks, buildScenarios, computeMoney,
  documentsList, hasLoan, isMarriage, propertyStatus, questionsForExperts, someoneStays,
} from "@/lib/tools/housing";

const TOOL = "mieszkanie-i-kredyt";

const O = {
  relation: [
    { value: "marriage", label: "Tak, jesteśmy małżeństwem" },
    { value: "informal", label: "Nie, jesteśmy w związku nieformalnym" },
  ],
  owner: [
    { value: "both", label: "Oboje jesteśmy właścicielami" },
    { value: "me", label: "Tylko ja" },
    { value: "partner", label: "Tylko druga osoba" },
    { value: "unsure", label: "Nie jestem pewien/pewna" },
  ],
  purchase: [
    { value: "before", label: "Przed ślubem" },
    { value: "during", label: "Po ślubie" },
    { value: "unsure", label: "Nie pamiętam / to skomplikowane" },
  ],
  regime: [
    { value: "wspolnosc", label: "Wspólność majątkowa", desc: "Najczęstsza sytuacja — jeśli nie podpisywaliście intercyzy" },
    { value: "rozdzielnosc", label: "Rozdzielność majątkowa", desc: "Np. intercyza u notariusza" },
    { value: "inny", label: "Inny ustrój", desc: "Np. rozszerzona lub ograniczona wspólność" },
    { value: "unsure", label: "Nie wiem" },
  ],
  ownFunds: [
    { value: "no", label: "Nie" },
    { value: "yes", label: "Tak, częściowo" },
    { value: "unsure", label: "Nie wiem" },
  ],
  loan: [
    { value: "joint", label: "Tak, wspólny kredyt", desc: "Oboje jesteście kredytobiorcami" },
    { value: "me", label: "Kredyt tylko na mnie" },
    { value: "partner", label: "Kredyt tylko na drugą osobę" },
    { value: "none", label: "Nie ma kredytu" },
    { value: "unsure", label: "Nie wiem" },
  ],
  stay: [
    { value: "me", label: "Ja chciał(a)bym zostać" },
    { value: "partner", label: "Druga osoba chciałaby zostać" },
    { value: "both", label: "Oboje chcielibyśmy zostać" },
    { value: "nobody", label: "Nikt nie planuje zostać" },
    { value: "unsure", label: "Jeszcze nie wiem" },
  ],
  sale: [
    { value: "yes", label: "Tak, oboje rozważylibyśmy sprzedaż" },
    { value: "maybe", label: "Być może / nie rozmawialiśmy o tym" },
    { value: "no", label: "Nie, sprzedaż nie wchodzi w grę" },
  ],
  afford: [
    { value: "yes", label: "Raczej tak" },
    { value: "unsure", label: "Nie wiem" },
    { value: "no", label: "Raczej nie" },
  ],
} as const;

const opts = (k: keyof typeof O) => O[k] as unknown as { value: string; label: string; desc?: string }[];

const steps: WizardStep<HousingAnswers>[] = [
  {
    id: "relation", title: "Czy jesteście małżeństwem?", help: "Od tego zależą przepisy: małżeństwo — Kodeks rodzinny, związek nieformalny — Kodeks cywilny.",
    valid: (a) => !!a.relation, summary: (a) => labelOf(opts("relation"), a.relation),
    render: (a, set) => <SingleChoice legend="Status związku" options={opts("relation")} value={a.relation} onChange={(v) => set({ relation: v as HousingAnswers["relation"] })} />,
  },
  {
    id: "owner", title: "Kto jest właścicielem nieruchomości?", help: "Według aktu notarialnego lub księgi wieczystej.",
    valid: (a) => !!a.owner, summary: (a) => labelOf(opts("owner"), a.owner),
    render: (a, set) => <SingleChoice legend="Właściciel" options={opts("owner")} value={a.owner} onChange={(v) => set({ owner: v as HousingAnswers["owner"] })} />,
  },
  {
    id: "purchase", title: "Kiedy kupiliście nieruchomość?", when: isMarriage,
    valid: (a) => !!a.purchase, summary: (a) => labelOf(opts("purchase"), a.purchase),
    render: (a, set) => <SingleChoice legend="Data zakupu" options={opts("purchase")} value={a.purchase} onChange={(v) => set({ purchase: v as HousingAnswers["purchase"] })} />,
  },
  {
    id: "regime", title: "Jaki ustrój majątkowy obowiązuje w Waszym małżeństwie?", when: isMarriage,
    valid: (a) => !!a.regime, summary: (a) => labelOf(opts("regime"), a.regime),
    render: (a, set) => <SingleChoice legend="Ustrój majątkowy" options={opts("regime")} value={a.regime} onChange={(v) => set({ regime: v as HousingAnswers["regime"] })} />,
  },
  {
    id: "ownFunds", title: "Czy przy zakupie lub spłacie użyto pieniędzy z darowizny, spadku albo zgromadzonych przed ślubem?",
    help: "Np. wkład własny od rodziców. To może mieć znaczenie dla rozliczeń.",
    when: (a) => isMarriage(a) && a.purchase !== "before" && a.regime !== "rozdzielnosc",
    valid: (a) => !!a.ownFunds, summary: (a) => labelOf(opts("ownFunds"), a.ownFunds),
    render: (a, set) => <SingleChoice legend="Środki osobiste" options={opts("ownFunds")} value={a.ownFunds} onChange={(v) => set({ ownFunds: v as HousingAnswers["ownFunds"] })} />,
  },
  {
    id: "loan", title: "Czy na mieszkaniu jest kredyt hipoteczny?",
    valid: (a) => !!a.loan, summary: (a) => labelOf(opts("loan"), a.loan),
    render: (a, set) => <SingleChoice legend="Kredyt" options={opts("loan")} value={a.loan} onChange={(v) => set({ loan: v as HousingAnswers["loan"] })} />,
  },
  {
    id: "numbers", title: "Orientacyjne kwoty", optional: true,
    help: "Wystarczą przybliżenia. Możesz pominąć ten krok — scenariusze pokażemy także bez liczb.",
    summary: (a) => [a.value ? `wartość ${formatPLN(a.value)}` : null, hasLoan(a) && a.balance !== undefined ? `kredyt ${formatPLN(a.balance)}` : null].filter(Boolean).join(", ") || "nie podano",
    render: (a, set) => (
      <div>
        <MoneyField label="Orientacyjna wartość nieruchomości" value={a.value} onChange={(v) => set({ value: v })} hint="Np. na podstawie cen podobnych mieszkań w okolicy." />
        {hasLoan(a) && <MoneyField label="Ile kredytu pozostało do spłaty?" value={a.balance} onChange={(v) => set({ balance: v })} hint="Saldo znajdziesz w bankowości internetowej." />}
        {hasLoan(a) && <MoneyField label="Miesięczna rata (opcjonalnie)" value={a.installment} onChange={(v) => set({ installment: v })} />}
      </div>
    ),
  },
  {
    id: "stay", title: "Czy któreś z Was chciałoby zostać w mieszkaniu?",
    valid: (a) => !!a.stay, summary: (a) => labelOf(opts("stay"), a.stay),
    render: (a, set) => <SingleChoice legend="Kto chce zostać" options={opts("stay")} value={a.stay} onChange={(v) => set({ stay: v as HousingAnswers["stay"] })} />,
  },
  {
    id: "afford", title: "Czy osoba, która chce zostać, mogłaby samodzielnie ponosić koszty mieszkania i raty?",
    when: (a) => someoneStays(a),
    valid: (a) => !!a.afford, summary: (a) => labelOf(opts("afford"), a.afford),
    render: (a, set) => <SingleChoice legend="Samodzielna spłata" options={opts("afford")} value={a.afford} onChange={(v) => set({ afford: v as HousingAnswers["afford"] })} />,
  },
  {
    id: "sale", title: "Czy oboje bylibyście skłonni rozważyć sprzedaż?",
    valid: (a) => !!a.sale, summary: (a) => labelOf(opts("sale"), a.sale),
    render: (a, set) => <SingleChoice legend="Sprzedaż" options={opts("sale")} value={a.sale} onChange={(v) => set({ sale: v as HousingAnswers["sale"] })} />,
  },
];

export function HousingTool() {
  const [answers, setAnswersState] = useState<HousingAnswers>({});
  const [done, setDone] = useState(false);
  const [editStep, setEditStep] = useState<string | undefined>();
  const [wizardKey, setWizardKey] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);
  const setAnswers = (fn: (a: HousingAnswers) => HousingAnswers) => setAnswersState(fn);

  const status = useMemo(() => propertyStatus(answers), [answers]);
  const money = useMemo(() => computeMoney(answers), [answers]);
  const scenarios = useMemo(() => buildScenarios(answers), [answers]);
  const risks = useMemo(() => buildRisks(answers), [answers]);
  const bank = useMemo(() => bankChecklist(answers), [answers]);
  const agree = useMemo(() => agreementsToDiscuss(answers), [answers]);
  const docs = useMemo(() => documentsList(answers), [answers]);
  const questions = useMemo(() => questionsForExperts(answers), [answers]);

  const complete = () => {
    setDone(true);
    track("tool_complete", { tool: TOOL });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const edit = (id: string) => {
    track("result_edit", { tool: TOOL });
    setEditStep(id);
    setWizardKey((k) => k + 1);
    setDone(false);
  };
  const reset = () => {
    setAnswersState({});
    setDone(false);
    setEditStep(undefined);
    setWizardKey((k) => k + 1);
  };

  const situation = [
    labelOf(opts("relation"), answers.relation),
    `Właściciel: ${labelOf(opts("owner"), answers.owner)?.toLowerCase()}`,
    answers.purchase ? `Zakup: ${labelOf(opts("purchase"), answers.purchase)?.toLowerCase()}` : null,
    answers.regime ? `Ustrój: ${labelOf(opts("regime"), answers.regime)?.toLowerCase()}` : null,
    `Kredyt: ${labelOf(opts("loan"), answers.loan)?.toLowerCase()}`,
  ].filter(Boolean) as string[];

  const report = (): Report => ({
    title: "Mieszkanie i kredyt po rozstaniu — moje scenariusze",
    intro: `Zestawienie przygotowane ${todayPL()} na podstawie moich odpowiedzi.`,
    sections: [
      { heading: "Moja sytuacja", items: [...situation, `Status mieszkania: ${status.label} (${status.certainty}). ${status.text}`] },
      ...(money.equity !== undefined
        ? [{ heading: "Orientacyjne liczby (nie jest to podział majątku)", items: [
            `Wartość: ${formatPLN(money.value)}`, `Saldo kredytu: ${formatPLN(money.balance)}`,
            `Różnica wartość − kredyt: ${formatPLN(money.equity)}`,
            `Po założonych kosztach sprzedaży (${answers.saleCostPct ?? DEFAULT_SALE_COST_PCT}%): ${formatPLN(money.equityAfterCosts)}`,
          ] }]
        : []),
      ...scenarios.map((s, i) => ({ heading: `Scenariusz ${i + 1}: ${s.title}`, items: [s.summary, ...s.why.map((w) => `Dlaczego: ${w}`), ...s.steps.map((x) => `Krok: ${x}`), ...s.watch.map((w) => `Uwaga: ${w}`)] })),
      { heading: "Potencjalne ryzyka", items: risks },
      ...(bank.length ? [{ heading: "Co sprawdzić w banku", items: bank }] : []),
      { heading: "Co warto ustalić z drugą stroną", items: agree },
      { heading: "Dokumenty, które mogą być potrzebne", items: docs },
      { heading: "Pytania do prawnika lub banku", items: questions },
    ],
  });

  if (!done) {
    return <Wizard key={wizardKey} toolId={TOOL} steps={steps} answers={answers} setAnswers={setAnswers} onComplete={complete} startAt={editStep} />;
  }

  const max = Math.max(money.value || 0, money.balance || 0, 1);

  return (
    <div ref={resultRef} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twój wynik</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>3 możliwe scenariusze dla Waszego mieszkania</h2>
        <p style={{ marginBottom: 16 }}>Ułożone według dopasowania do Twoich odpowiedzi. To możliwości do rozważenia — nie rekomendacja ani ocena prawna.</p>
        {money.equity !== undefined ? (
          <div className="kpis kpis--3">
            <div className="kpi"><span className="kpi__label">Wartość mieszkania</span><span className="kpi__value">{formatPLN(money.value)}</span></div>
            <div className="kpi"><span className="kpi__label">Saldo kredytu</span><span className="kpi__value">{formatPLN(money.balance)}</span></div>
            <div className={`kpi ${money.negative ? "kpi--neg" : ""}`}><span className="kpi__label">Różnica (orientacyjnie)</span><span className="kpi__value">{formatPLN(money.equity)}</span><span className="kpi__note">przed kosztami sprzedaży</span></div>
          </div>
        ) : (
          <p className="small" style={{ margin: 0, opacity: 0.85 }}>Nie podano kwot — scenariusze oparte są na pozostałych odpowiedziach. <button type="button" className="btn btn--link btn--sm no-print" style={{ color: "#fff" }} onClick={() => edit("numbers")}>Dodaj kwoty</button></p>
        )}
      </div>

      <div className="result-section">
        <AnswersSummary steps={steps} answers={answers} onEdit={edit} />
      </div>

      <div className="result-section">
        <h3><Icon name="home" width={22} /> Twoja sytuacja</h3>
        <div className="btn-row" style={{ gap: 8, marginBottom: 12 }}>
          {situation.map((s) => <span key={s} className="tag">{s}</span>)}
        </div>
        <div className="card card--sand">
          <p className="small" style={{ marginBottom: 4 }}><strong>{status.label}</strong> <span className={`tag ${status.certainty === "prawdopodobnie" ? "tag--ok" : "tag--warn"}`}>{status.certainty}</span></p>
          <p className="small" style={{ margin: 0 }}>{status.text}</p>
        </div>
      </div>

      {money.equity !== undefined && (
        <div className="result-section">
          <h3><Icon name="coins" width={22} /> Orientacyjne liczby</h3>
          <div className="hbar" role="img" aria-label={`Wartość ${formatPLN(money.value)}, kredyt ${formatPLN(money.balance)}, różnica ${formatPLN(money.equity)}`}>
            <div className="hbar__row"><span>Wartość</span><div className="hbar__track"><div className="hbar__fill" style={{ width: `${((money.value || 0) / max) * 100}%` }} /></div><span className="hbar__val">{formatPLN(money.value)}</span></div>
            <div className="hbar__row"><span>Kredyt</span><div className="hbar__track"><div className="hbar__fill" style={{ width: `${((money.balance || 0) / max) * 100}%`, background: "var(--gold-500)" }} /></div><span className="hbar__val">{formatPLN(money.balance)}</span></div>
            <div className="hbar__row"><span>Koszty sprzedaży</span><div className="hbar__track"><div className="hbar__fill" style={{ width: `${((money.saleCosts || 0) / max) * 100}%`, background: "var(--ink-3)" }} /></div><span className="hbar__val">{formatPLN(money.saleCosts)}</span></div>
          </div>
          <div className="grid grid--2" style={{ marginTop: 16 }}>
            <div className={`kpi ${money.negative ? "kpi--neg" : ""}`}>
              <span className="kpi__label">Po kosztach sprzedaży</span>
              <span className="kpi__value">{formatPLN(money.equityAfterCosts)}</span>
              <span className="kpi__note">
                Założenie kosztów:{" "}
                <label className="no-print">
                  <span className="visually-hidden">Koszty sprzedaży w procentach</span>
                  <input type="number" min={0} max={15} step={0.5} value={answers.saleCostPct ?? DEFAULT_SALE_COST_PCT}
                    onChange={(e) => setAnswersState((a) => ({ ...a, saleCostPct: Math.max(0, Math.min(15, Number(e.target.value) || 0)) }))}
                    style={{ width: 60, font: "inherit", padding: "2px 4px", border: "1px solid var(--line-strong)", borderRadius: 6 }} />
                </label>
                <span className="print-only-inline">{answers.saleCostPct ?? DEFAULT_SALE_COST_PCT}</span> % wartości (prowizja, notariusz, inne — zmień według siebie)
              </span>
            </div>
            {money.ltv !== undefined && (
              <div className="kpi">
                <span className="kpi__label">Kredyt / wartość (LTV)</span>
                <span className="kpi__value">{Math.round(money.ltv * 100)}%</span>
                <span className="kpi__note">Im wyższy, tym trudniej o refinansowanie przez jedną osobę</span>
              </div>
            )}
          </div>
          {money.halfIllustration !== undefined && (
            <p className="small muted" style={{ marginTop: 12 }}>Ilustracyjnie: przy równych udziałach i bez innych rozliczeń połowa różnicy to ok. <strong>{formatPLN(money.halfIllustration)}</strong>.</p>
          )}
          <Alert tone="warn" className="mt">
            <p><strong>To nie jest podział majątku ani kwota do wypłaty.</strong> Rzeczywiste rozliczenie zależy m.in. od statusu mieszkania, nakładów, innych składników majątku, podatków i kosztów, a także od Waszych ustaleń lub orzeczenia sądu.</p>
          </Alert>
        </div>
      )}

      {answers.loan === "joint" && (
        <div className="result-section" style={{ paddingTop: 0, borderTop: 0 }}>
          <Alert tone="danger" title="Ważne: rozwód nie zwalnia z kredytu">
            <p>Rozwód, separacja ani podział mieszkania nie zmieniają umowy z bankiem. Oboje odpowiadacie za cały kredyt, dopóki bank nie zgodzi się na zmianę (np. zwolnienie jednej osoby lub refinansowanie). Nie da się jednostronnie „przepisać” kredytu.</p>
          </Alert>
        </div>
      )}

      <div className="result-section">
        <h3><Icon name="map" width={22} /> Możliwe scenariusze</h3>
        <div className="stack">
          {scenarios.map((s, i) => (
            <article key={s.id} className={`scenario ${i === 0 && s.fit === "dobre" ? "scenario--fit" : ""}`}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <span className="scenario__num">0{i + 1}</span>
                <span className={`tag ${s.fit === "dobre" ? "tag--ok" : s.fit === "trudniejsze" ? "tag--warn" : ""}`}>
                  {s.fit === "dobre" ? "Najbliższy Twoim odpowiedziom" : s.fit === "trudniejsze" ? "Trudniejszy w Twojej sytuacji" : "Możliwy"}
                </span>
              </div>
              <h4>{s.title}</h4>
              <p className="small" style={{ margin: 0 }}>{s.summary}</p>
              {s.why.length > 0 && (<><p className="xsmall muted" style={{ margin: "12px 0 0", fontWeight: 600 }}>DLACZEGO TEN SCENARIUSZ</p><ul>{s.why.map((w) => <li key={w}>{w}</li>)}</ul></>)}
              <p className="xsmall muted" style={{ margin: "12px 0 0", fontWeight: 600 }}>JAK MOŻE WYGLĄDAĆ</p>
              <ul>{s.steps.map((w) => <li key={w}>{w}</li>)}</ul>
              <p className="xsmall" style={{ margin: "12px 0 0", fontWeight: 600, color: "var(--warn)" }}>NA CO UWAŻAĆ</p>
              <ul>{s.watch.map((w) => <li key={w}>{w}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>

      <div className="result-section">
        <h3><Icon name="alert" width={22} /> Potencjalne ryzyka</h3>
        <ul className="list-dot">{risks.map((r) => <li key={r}>{r}</li>)}</ul>
      </div>

      <div className="result-section">
        <div className="grid grid--2" style={{ gap: 24 }}>
          {bank.length > 0 && (
            <div>
              <h3><Icon name="bank" width={22} /> Co sprawdzić w banku</h3>
              <ul className="list-check">{bank.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          )}
          <div>
            <h3><Icon name="handshake" width={22} /> Co ustalić z drugą stroną</h3>
            <ul className="list-check">{agree.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <div>
            <h3><Icon name="doc" width={22} /> Dokumenty</h3>
            <ul className="list-check">{docs.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
          <div>
            <h3><Icon name="message" width={22} /> Pytania do prawnika lub banku</h3>
            <ul className="list-dot list-q">{questions.map((r) => <li key={r}>{r}</li>)}</ul>
          </div>
        </div>
      </div>

      <div className="result-section">
        <ResultActions toolId={TOOL} report={report} filename="mieszkanie-i-kredyt-scenariusze" onReset={reset} />
      </div>

      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep
          toolId={TOOL}
          intro="Mieszkanie i kredyt to zwykle jedne z najtrudniejszych tematów. Łatwiej o nich rozmawiać, gdy macie wspólny plan."
          offers={[
            { key: "plan-rozwodu", cta: "Sprawdź, jakie kwestie warto ustalić przed pozwem", why: "Bezpłatny Plan Rozwodu porządkuje wszystkie sprawy do ustalenia — w tym mieszkanie, kredyt i podział majątku." },
            { key: "materialy", href: "/materialy/rozmowa-z-bankiem", cta: "Pobierz: jak przygotować rozmowę z bankiem", why: "Skrypt rozmowy z bankiem, lista dokumentów i arkusz z najważniejszymi liczbami." },
          ]}
        />
      </div>
    </div>
  );
}
