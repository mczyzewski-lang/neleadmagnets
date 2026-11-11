"use client";
import { useMemo, useRef, useState } from "react";
import "./parenting.css";
import { Wizard, AnswersSummary, labelOf, type WizardStep } from "@/components/tool/Wizard";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { SingleChoice, MultiChoice } from "@/components/ui/Choices";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { todayPL } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Report } from "@/lib/report";
import {
  type ParentingAnswers, type Parent, type ModelId, DAYS_SHORT, MODEL_LABELS, ageConsiderations, arrangementsSummary, buildCycle,
  buildMonth, countNights, defaultAnswers, mondayOf, monthNights, openPoints, proposalSections, toISO, parseISO,
} from "@/lib/tools/parentingPlan";

const TOOL = "plan-opieki-nad-dzieckiem";
type Opt = { value: string; label: string; desc?: string };
const TBD: Opt = { value: "tbd", label: "Do ustalenia", desc: "Trafi na listę punktów nierozstrzygniętych" };

const O: Record<string, Opt[]> = {
  children: [{ value: "1", label: "Jedno dziecko" }, { value: "2", label: "Dwoje dzieci" }, { value: "3+", label: "Troje lub więcej" }],
  ages: [{ value: "0-3", label: "0–3 lata" }, { value: "4-6", label: "4–6 lat" }, { value: "7-12", label: "7–12 lat" }, { value: "13-18", label: "13–18 lat" }],
  distance: [{ value: "near", label: "Blisko", desc: "Do ok. 15 minut drogi" }, { value: "mid", label: "Średnio", desc: "Ok. 15–45 minut" }, { value: "far", label: "Daleko", desc: "Ponad 45 minut lub inne miasto" }],
  school: [{ value: "zlobek", label: "Żłobek / opieka domowa" }, { value: "przedszkole", label: "Przedszkole" }, { value: "szkola", label: "Szkoła" }, { value: "mixed", label: "Różnie — mam dzieci w różnych placówkach" }, { value: "none", label: "Nie dotyczy" }],
  model: (Object.keys(MODEL_LABELS) as ModelId[]).map((k) => ({ value: k, label: MODEL_LABELS[k].label, desc: MODEL_LABELS[k].desc })),
  handover: [{ value: "fri-school", label: "Piątek — odbiór ze szkoły/przedszkola" }, { value: "fri-evening", label: "Piątek wieczorem" }, { value: "sat-morning", label: "Sobota rano" }, TBD],
  returnTime: [{ value: "sun-evening", label: "Niedziela wieczorem" }, { value: "mon-school", label: "Poniedziałek — odprowadzenie do szkoły/przedszkola" }, TBD],
  summer: [{ value: "half", label: "Po połowie", desc: "Np. lipiec / sierpień, z zamianą co roku" }, { value: "two-weeks", label: "Bloki po dwa tygodnie na zmianę" }, { value: "custom", label: "Ustalamy co roku do określonego terminu" }, TBD],
  christmas: [{ value: "alternate", label: "Naprzemiennie co roku" }, { value: "split", label: "Podział dni (Wigilia / święta), z zamianą co roku" }, { value: "fixed", label: "Stały podział każdego roku" }, TBD],
  easter: [{ value: "alternate", label: "Naprzemiennie co roku" }, { value: "split", label: "Podział dni, z zamianą co roku" }, { value: "fixed", label: "Stały podział każdego roku" }, TBD],
  birthdays: [{ value: "both-short", label: "Każdy rodzic spędza z dzieckiem część dnia lub osobne świętowanie" }, { value: "where-falls", label: "Świętowanie u rodzica, u którego dziecko akurat jest, drugi — krótkie spotkanie/telefon" }, { value: "parents-days", label: "Dzień Matki/Ojca i urodziny rodziców — z danym rodzicem" }, TBD],
  transport: [{ value: "giver", label: "Odwozi rodzic, u którego dziecko było" }, { value: "receiver", label: "Odbiera rodzic, do którego dziecko jedzie" }, { value: "school", label: "Przekazanie przez szkołę/przedszkole" }, { value: "shared", label: "Dzielimy przejazdy / spotkanie w połowie drogi" }, TBD],
  calls: [{ value: "daily", label: "Codziennie, krótko, o stałej porze" }, { value: "set-days", label: "W ustalone dni" }, { value: "flexible", label: "Elastycznie, z inicjatywy dziecka" }, TBD],
  activities: [{ value: "both-agree", label: "Nowe zajęcia po uzgodnieniu obojga" }, { value: "own-time", label: "Każdy organizuje w swoim czasie, stałe zajęcia kontynuujemy" }, { value: "shared-cost", label: "Uzgadniamy wspólnie i dzielimy koszty" }, TBD],
  decisions: [{ value: "jointly", label: "Istotne sprawy podejmujemy wspólnie" }, { value: "inform", label: "Bieżące — rodzic, u którego jest dziecko; istotne — wspólnie" }, TBD],
  safety: [{ value: "ok", label: "Tak, możemy rozmawiać spokojnie" }, { value: "hard", label: "Rozmowy są trudne, ale bezpieczne" }, { value: "unsafe", label: "Nie czuję się bezpiecznie w kontakcie z drugim rodzicem" }],
};

type K = keyof ParentingAnswers;
const single = (k: K, legend: string) => (a: ParentingAnswers, set: (p: Partial<ParentingAnswers>) => void) => (
  <SingleChoice legend={legend} options={O[k as string]} value={a[k] as string | undefined} onChange={(v) => set({ [k]: v } as Partial<ParentingAnswers>)} />
);
const sum = (k: K) => (a: ParentingAnswers) => labelOf(O[k as string], a[k] as string);

function CustomGrid({ a, set }: { a: ParentingAnswers; set: (p: Partial<ParentingAnswers>) => void }) {
  const toggle = (i: number) => {
    const c = [...a.custom];
    c[i] = c[i] === "A" ? "B" : "A";
    set({ custom: c });
  };
  return (
    <div>
      {[0, 1].map((w) => (
        <div key={w} style={{ marginBottom: 12 }}>
          <p className="xsmall muted" style={{ margin: "0 0 6px", fontWeight: 600 }}>TYDZIEŃ {w + 1}</p>
          <div className="week">
            {DAYS_SHORT.map((d, i) => {
              const idx = w * 7 + i;
              const p = a.custom[idx];
              return (
                <button key={idx} type="button" className={`week__day pp-toggle ${p === "A" ? "parent-a" : "parent-b"}`} onClick={() => toggle(idx)} aria-label={`Tydzień ${w + 1}, ${d}: noc u ${p === "A" ? a.labelA : a.labelB}. Kliknij, aby zmienić.`}>
                  <span>{d}</span><span>{p}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <p className="xsmall muted">Dotknij dnia, aby zmienić, u którego rodzica dziecko nocuje.</p>
    </div>
  );
}

const steps: WizardStep<ParentingAnswers>[] = [
  { id: "children", title: "Ile dzieci obejmuje plan?", help: "Nie pytamy o imiona ani inne dane dzieci — nie są potrzebne.", valid: (a) => !!a.children, summary: sum("children"), render: single("children", "Liczba dzieci") },
  { id: "ages", title: "W jakim wieku są dzieci?", help: "Zaznacz wszystkie pasujące przedziały.", valid: (a) => a.ages.length > 0 || "Zaznacz co najmniej jeden przedział wieku.", summary: (a) => labelOf(O.ages, a.ages), render: (a, set) => <MultiChoice legend="Wiek dzieci" options={O.ages} value={a.ages} onChange={(v) => set({ ages: v })} columns={2} /> },
  { id: "distance", title: "Jak daleko od siebie będą mieszkać rodzice?", valid: (a) => !!a.distance, summary: sum("distance"), render: single("distance", "Odległość") },
  { id: "school", title: "Czy dziecko chodzi do żłobka, przedszkola lub szkoły?", valid: (a) => !!a.school, summary: sum("school"), render: single("school", "Placówka") },
  {
    id: "labels", title: "Jak opisać rodziców w planie?", optional: true,
    help: "Domyślnie „Rodzic A” i „Rodzic B”. Możesz wpisać np. „Mama” i „Tata” albo „Ja” i „Drugi rodzic”. Nie wpisuj imion dzieci.",
    summary: (a) => `${a.labelA} / ${a.labelB}`,
    valid: (a) => (a.labelA.trim() && a.labelB.trim() ? true : "Uzupełnij obie etykiety."),
    render: (a, set) => (
      <div className="grid grid--2">
        <div className="field"><label className="field__label" htmlFor="pp-la">Rodzic A</label><input id="pp-la" className="input" maxLength={20} value={a.labelA} onChange={(e) => set({ labelA: e.target.value.replace(/[<>]/g, "") })} autoComplete="off" /></div>
        <div className="field"><label className="field__label" htmlFor="pp-lb">Rodzic B</label><input id="pp-lb" className="input" maxLength={20} value={a.labelB} onChange={(e) => set({ labelB: e.target.value.replace(/[<>]/g, "") })} autoComplete="off" /></div>
      </div>
    ),
  },
  { id: "model", title: "Jaki podstawowy rytm tygodnia chcesz rozpisać?", help: "Nie rekomendujemy żadnego modelu — wybierz ten, który chcesz przemyśleć lub omówić. Później łatwo go zmienisz.", valid: (a) => !!a.model, summary: (a) => (a.model ? MODEL_LABELS[a.model].label : null), render: single("model", "Model opieki") },
  { id: "custom", title: "Rozpisz swój dwutygodniowy cykl", when: (a) => a.model === "custom", summary: (a) => `${countNights(buildCycle(a)).A} nocy u ${a.labelA} / ${countNights(buildCycle(a)).B} u ${a.labelB}`, render: (a, set) => <CustomGrid a={a} set={set} /> },
  {
    id: "weekend", title: "Weekendy: przekazanie i powrót", when: (a) => a.model !== "custom",
    valid: (a) => (a.handover && a.returnTime ? true : "Wybierz odpowiedź w obu pytaniach (możesz wybrać „Do ustalenia”)."),
    summary: (a) => [labelOf(O.handover, a.handover), labelOf(O.returnTime, a.returnTime)].filter(Boolean).join(" → "),
    render: (a, set) => (
      <div className="stack">
        <SingleChoice legend="Kiedy dziecko przechodzi do drugiego rodzica na weekend?" hideLegend={false} options={O.handover} value={a.handover} onChange={(v) => set({ handover: v as ParentingAnswers["handover"] })} />
        <SingleChoice legend="Kiedy wraca?" hideLegend={false} options={O.returnTime} value={a.returnTime} onChange={(v) => set({ returnTime: v as ParentingAnswers["returnTime"] })} />
      </div>
    ),
  },
  { id: "summer", title: "Jak chcecie podzielić wakacje letnie?", valid: (a) => !!a.summer, summary: sum("summer"), render: single("summer", "Wakacje") },
  {
    id: "holidays", title: "Święta",
    valid: (a) => (a.christmas && a.easter ? true : "Wybierz odpowiedź w obu pytaniach."),
    summary: (a) => `BN: ${labelOf(O.christmas, a.christmas) ?? "—"}; Wielkanoc: ${labelOf(O.easter, a.easter) ?? "—"}`,
    render: (a, set) => (
      <div className="stack">
        <SingleChoice legend="Boże Narodzenie i Wigilia" hideLegend={false} options={O.christmas} value={a.christmas} onChange={(v) => set({ christmas: v as ParentingAnswers["christmas"] })} />
        <SingleChoice legend="Wielkanoc" hideLegend={false} options={O.easter} value={a.easter} onChange={(v) => set({ easter: v as ParentingAnswers["easter"] })} />
      </div>
    ),
  },
  { id: "birthdays", title: "Urodziny dziecka i inne ważne okazje", valid: (a) => !!a.birthdays, summary: sum("birthdays"), render: single("birthdays", "Urodziny") },
  { id: "transport", title: "Kto przewozi dziecko między domami?", valid: (a) => !!a.transport, summary: sum("transport"), render: single("transport", "Transport") },
  { id: "calls", title: "Kontakt telefoniczny lub wideo z drugim rodzicem", valid: (a) => !!a.calls, summary: sum("calls"), render: single("calls", "Kontakt") },
  {
    id: "decisions", title: "Zajęcia dodatkowe, edukacja i zdrowie",
    valid: (a) => (a.activities && a.decisions ? true : "Wybierz odpowiedź w obu pytaniach."),
    summary: (a) => [labelOf(O.activities, a.activities), labelOf(O.decisions, a.decisions)].filter(Boolean).join("; "),
    render: (a, set) => (
      <div className="stack">
        <SingleChoice legend="Zajęcia dodatkowe" hideLegend={false} options={O.activities} value={a.activities} onChange={(v) => set({ activities: v as ParentingAnswers["activities"] })} />
        <SingleChoice legend="Decyzje o edukacji i zdrowiu" hideLegend={false} options={O.decisions} value={a.decisions} onChange={(v) => set({ decisions: v as ParentingAnswers["decisions"] })} />
      </div>
    ),
  },
  { id: "safety", title: "Czy możesz bezpiecznie rozmawiać z drugim rodzicem o tych sprawach?", help: "To pytanie pomaga dobrać kolejne kroki. Nie musisz niczego wyjaśniać.", valid: (a) => !!a.safety, summary: sum("safety"), render: single("safety", "Bezpieczeństwo") },
];

const MONTHS = ["styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"];

export function ParentingTool() {
  const [answers, setAnswersState] = useState<ParentingAnswers>(defaultAnswers);
  const [done, setDone] = useState(false);
  const [editStep, setEditStep] = useState<string | undefined>();
  const [wizardKey, setWizardKey] = useState(0);
  const [ym, setYm] = useState<{ y: number; m: number } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const cycleStart = answers.cycleStart || toISO(mondayOf(new Date()));
  const cycle = useMemo(() => buildCycle(answers), [answers]);
  const nights = countNights(cycle);
  const now = new Date();
  const cur = ym || { y: now.getFullYear(), m: now.getMonth() };
  const month = useMemo(() => buildMonth(cycle, cycleStart, cur.y, cur.m), [cycle, cycleStart, cur.y, cur.m]);
  const mN = monthNights(month);
  const summary = arrangementsSummary(answers);
  const open = openPoints(answers);
  const hints = ageConsiderations(answers);
  const proposal = proposalSections(answers);
  const A = answers.labelA || "Rodzic A";
  const B = answers.labelB || "Rodzic B";
  const nameOf = (p: Parent) => (p === "A" ? A : B);

  const complete = () => {
    setDone(true);
    track("tool_complete", { tool: TOOL });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setWizardKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswersState(defaultAnswers()); setDone(false); setEditStep(undefined); setWizardKey((k) => k + 1); setYm(null); };
  const shiftMonth = (d: number) => { const m = cur.m + d; setYm({ y: cur.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 }); };

  const report = (): Report => ({
    title: "Wstępna propozycja planu rodzicielskiego",
    intro: `Propozycja do rozmowy — nie jest wiążącą umową. Przygotowano ${todayPL()}. Cykl liczony od ${parseISO(cycleStart).toLocaleDateString("pl-PL", { timeZone: "UTC" })} (poniedziałek tygodnia 1).`,
    sections: [...proposal, { heading: "Do przemyślenia (zależnie od wieku i sytuacji dzieci)", items: hints }],
  });

  if (!done) return <Wizard key={wizardKey} toolId={TOOL} steps={steps} answers={answers} setAnswers={(fn) => setAnswersState(fn)} onComplete={complete} startAt={editStep} finishLabel="Pokaż mój plan" />;

  return (
    <div ref={resultRef} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twoja propozycja planu</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>Życie dziecka w dwóch domach — wstępny harmonogram</h2>
        <p style={{ marginBottom: 16 }}>Propozycja do rozmowy z drugim rodzicem. Nie jest wiążącą umową i nie przesądza, jaki model jest najlepszy dla Waszej rodziny.</p>
        <div className="kpis kpis--3">
          <div className="kpi"><span className="kpi__label">Noce u: {A}</span><span className="kpi__value">{nights.A} / 14</span><span className="kpi__note">{nights.pctA}% cyklu</span></div>
          <div className="kpi"><span className="kpi__label">Noce u: {B}</span><span className="kpi__value">{nights.B} / 14</span><span className="kpi__note">{nights.pctB}% cyklu</span></div>
          <div className="kpi"><span className="kpi__label">Punkty do ustalenia</span><span className="kpi__value">{open.length}</span></div>
        </div>
      </div>

      {answers.safety === "unsafe" && (
        <div className="result-section">
          <Alert tone="safety" title="Twoje bezpieczeństwo jest najważniejsze">
            <p>Jeśli kontakt z drugim rodzicem jest dla Ciebie niebezpieczny, nie musisz omawiać tego planu bezpośrednio ani uczestniczyć we wspólnych negocjacjach. Warto skorzystać z indywidualnej pomocy prawnej lub psychologicznej. W sytuacji zagrożenia dzwoń pod <strong>112</strong>. Wsparcie dla osób doznających przemocy domowej: <strong>Niebieska Linia 800 120 002</strong>.</p>
          </Alert>
        </div>
      )}

      <div className="result-section"><AnswersSummary steps={steps} answers={answers} onEdit={edit} /></div>

      <div className="result-section">
        <h3><Icon name="calendar" width={22} /> Tydzień po tygodniu</h3>
        {[0, 1].map((w) => (
          <div key={w} style={{ marginBottom: 14 }}>
            <p className="xsmall muted" style={{ margin: "0 0 6px", fontWeight: 600 }}>TYDZIEŃ {w + 1}</p>
            <div className="week" role="list" aria-label={`Tydzień ${w + 1}`}>
              {cycle.slice(w * 7, w * 7 + 7).map((d, i) => (
                <div key={i} role="listitem" className={`week__day ${d.night === "A" ? "parent-a" : "parent-b"}`} aria-label={`${DAYS_SHORT[i]}: noc u ${nameOf(d.night)}${d.visit ? `, popołudnie z ${nameOf(d.visit)}` : ""}`}>
                  <span>{DAYS_SHORT[i]}</span>
                  <span className="pp-who">{nameOf(d.night)}</span>
                  {d.visit && <span className="pp-visit" title={`Popołudnie z: ${nameOf(d.visit)}`}>+{nameOf(d.visit).slice(0, 1)}</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
        <ul className="legend">
          <li><i className="parent-a" /> Noc u: {A}</li>
          <li><i className="parent-b" /> Noc u: {B}</li>
          {cycle.some((d) => d.visit) && <li><i style={{ background: "var(--gold-500)" }} /> Popołudnie bez nocowania</li>}
        </ul>
      </div>

      <div className="result-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: 10 }}><Icon name="calendar" width={22} /> Widok miesiąca</h3>
          <div className="btn-row no-print" style={{ gap: 6 }}>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => shiftMonth(-1)} aria-label="Poprzedni miesiąc"><Icon name="arrowLeft" width={16} /></button>
            <span style={{ fontWeight: 600, minWidth: 130, textAlign: "center" }} aria-live="polite">{MONTHS[cur.m]} {cur.y}</span>
            <button type="button" className="btn btn--ghost btn--sm" onClick={() => shiftMonth(1)} aria-label="Następny miesiąc"><Icon name="arrowRight" width={16} /></button>
          </div>
        </div>
        <p className="print-only" style={{ fontWeight: 600 }}>{MONTHS[cur.m]} {cur.y}</p>
        <div className="field no-print" style={{ maxWidth: 280, marginTop: 12 }}>
          <label className="field__label" htmlFor="pp-start">Początek cyklu (tydzień 1)</label>
          <input id="pp-start" type="date" className="input" value={cycleStart} onChange={(e) => e.target.value && setAnswersState((a) => ({ ...a, cycleStart: toISO(mondayOf(parseISO(e.target.value))) }))} />
          <span className="field__hint">Wybrana data zostanie przesunięta na poniedziałek.</span>
        </div>
        <div className="month pp-month" style={{ marginTop: 8 }}>
          {DAYS_SHORT.map((d) => <div key={d} className="month__h">{d}</div>)}
          {month.map((c, i) => c ? (
            <div key={i} className={`month__d ${c.night === "A" ? "parent-a" : "parent-b"}`} title={`${c.day}: noc u ${nameOf(c.night)}`}>{c.day}{c.visit && <span className="pp-dot" aria-hidden="true" />}</div>
          ) : <div key={i} className="month__d month__d--empty" />)}
        </div>
        <p className="small muted" style={{ marginTop: 10 }}>W tym miesiącu: {A} — {mN.A} nocy, {B} — {mN.B} nocy. Wakacje i święta mają pierwszeństwo przed rytmem tygodniowym.</p>
      </div>

      <div className="result-section">
        <h3><Icon name="checklist" width={22} /> Podsumowanie ustaleń</h3>
        <div tabIndex={0} role="region" aria-label="Tabela — przewiń w poziomie, jeśli nie mieści się na ekranie" className="table-wrap">
          <table className="table">
            <tbody>
              {summary.map((s) => (
                <tr key={s.label}><th scope="row" style={{ width: "38%" }}>{s.label}</th><td>{s.open ? <span className="tag tag--warn">do ustalenia</span> : s.value}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="result-section">
        <h3><Icon name="alert" width={22} /> Punkty nierozstrzygnięte</h3>
        <ul className="list-dot">{open.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>

      <div className="result-section">
        <h3><Icon name="heart" width={22} /> Do przemyślenia</h3>
        <ul className="list-check">{hints.map((h) => <li key={h}>{h}</li>)}</ul>
      </div>

      <div className="result-section">
        <h3><Icon name="doc" width={22} /> Wstępna propozycja planu rodzicielskiego</h3>
        <div className="card card--sand pp-doc">
          <p className="tag tag--gold" style={{ marginBottom: 12 }}>Propozycja do rozmowy — nie jest wiążącą umową</p>
          {proposal.map((s) => (
            <div key={s.heading} style={{ marginBottom: 14 }}>
              <h4 style={{ marginBottom: 6 }}>{s.heading}</h4>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: "var(--fs-sm)" }}>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
          <p className="xsmall muted" style={{ margin: 0 }}>W sprawie rozwodowej sąd uwzględnia pisemne porozumienie rodziców o sposobie wykonywania władzy rodzicielskiej i kontaktach, jeżeli jest zgodne z dobrem dziecka (art. 58 § 1 KRO). Przed podpisaniem porozumienia warto skonsultować jego treść ze specjalistą.</p>
        </div>
      </div>

      <div className="result-section">
        <ResultActions toolId={TOOL} report={report} filename="propozycja-planu-rodzicielskiego" onReset={reset} />
      </div>

      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep
          toolId={TOOL}
          intro="Plan dotyczący dzieci to często najważniejsza część ustaleń przed rozwodem."
          offers={answers.safety === "unsafe" ? [
            { key: "konsultacja", cta: "Poproś o indywidualną rozmowę", why: "Porozmawiamy o Twojej sytuacji indywidualnie — bez wspólnych spotkań z drugim rodzicem." },
            { key: "materialy", href: "/materialy/jak-powiedziec-dzieciom", cta: "Jak rozmawiać z dziećmi o rozstaniu", why: "Przewodnik z przykładowymi sformułowaniami dopasowanymi do wieku dziecka." },
          ] : [
            { key: "plan-rozwodu", cta: "Sprawdź, jakie ustalenia dotyczące dzieci można przygotować przed rozwodem", why: "Bezpłatny Plan Rozwodu pokazuje, jak przygotować porozumienie dotyczące dzieci i pozostałe ustalenia przed pozwem." },
            { key: "mediacja", cta: "Jak może pomóc mediacja rodzinna", why: "Mediacja jest dobrowolna. Pomaga rodzicom wypracować plan, gdy rozmowy we dwoje są trudne." },
          ]}
        />
      </div>
    </div>
  );
}
