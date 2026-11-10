"use client";
import "./decision.css";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Wizard, AnswersSummary, labelOf, type WizardStep } from "@/components/tool/Wizard";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { SingleChoice } from "@/components/ui/Choices";
import { MoneyField } from "@/components/ui/MoneyField";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import { formatPLN, todayPL } from "@/lib/format";
import type { Report } from "@/lib/report";
import { DEFAULT_BILLS, buildDocument, isSafety, reviewDate, splitBills, type Bill, type InterimAnswers } from "@/lib/decision/porozumienie-przejsciowe";

const TOOL = "porozumienie-przejsciowe";
type O = { value: string; label: string; desc?: string }[];
const TBD = { value: "tbd", label: "Do ustalenia" };
const OPT = {
  safety: [{ value: "no", label: "Nie" }, { value: "yes", label: "Tak" }, { value: "skip", label: "Wolę nie odpowiadać" }] as O,
  together: [{ value: "yes", label: "Tak, mieszkamy razem" }, { value: "partly", label: "Częściowo / to się zmienia" }, { value: "no", label: "Nie, już mieszkamy osobno" }] as O,
  yn: [{ value: "yes", label: "Tak" }, { value: "no", label: "Nie" }] as O,
  childDaily: [{ value: "both", label: "Oboje, jak dotychczas" }, { value: "me", label: "Głównie ze mną" }, { value: "partner", label: "Głównie z drugim rodzicem" }, { value: "alt", label: "Na zmianę, według grafiku" }, TBD] as O,
  childContact: [{ value: "flex", label: "Elastycznie, po uzgodnieniu" }, { value: "fixed", label: "Stałe dni i co drugi weekend" }, TBD] as O,
  tellKids: [{ value: "together", label: "Porozmawiamy z nimi wspólnie" }, { value: "done", label: "Dzieci już wiedzą" }, { value: "later", label: "Później, gdy będziemy znali ustalenia" }, TBD] as O,
  housingTogether: [{ value: "rooms", label: "Zostajemy razem, w osobnych pokojach" }, { value: "meMove", label: "Ja się tymczasowo wyprowadzam" }, { value: "partnerMove", label: "Druga osoba się wyprowadza" }, TBD] as O,
  split: [{ value: "half", label: "Po połowie" }, { value: "proportional", label: "Proporcjonalnie do dochodów" }, { value: "me", label: "Tymczasowo płacę ja" }, { value: "partner", label: "Tymczasowo płaci druga osoba" }, TBD] as O,
  account: [{ value: "keep", label: "Zostaje na wspólne wydatki" }, { value: "limits", label: "Ustalamy limity i zasady wypłat" }, { value: "close", label: "Zamkniemy po rozliczeniu" }, { value: "none", label: "Nie mamy wspólnego konta" }, TBD] as O,
  who: [{ value: "none", label: "Nie dotyczy" }, { value: "me", label: "Ja" }, { value: "partner", label: "Druga osoba" }, { value: "shared", label: "Wspólnie, według grafiku" }, TBD] as O,
  channel: [{ value: "msg", label: "Na piśmie — wiadomości lub e-mail" }, { value: "talk", label: "Rozmowa raz w tygodniu" }, TBD] as O,
  guests: [{ value: "notice", label: "Uprzedzamy się o wizytach" }, { value: "noOvernight", label: "Bez gości na noc we wspólnym mieszkaniu" }, { value: "free", label: "Swobodnie, z szacunkiem dla wspólnej przestrzeni" }, TBD] as O,
  review: [{ value: "2", label: "Za 2 tygodnie" }, { value: "4", label: "Za 4 tygodnie" }, { value: "8", label: "Za 8 tygodni" }, { value: "12", label: "Za 12 tygodni" }] as O,
};
const notSafe = (a: InterimAnswers) => !isSafety(a);
const pick = <K extends keyof InterimAnswers>(k: K, opts: O, legend: string) => (a: InterimAnswers, set: (p: Partial<InterimAnswers>) => void) => (
  <SingleChoice legend={legend} options={opts} value={a[k] as string | undefined} onChange={(v) => set({ [k]: v } as Partial<InterimAnswers>)} />
);

function BillsEditor({ bills, onChange }: { bills: Bill[]; onChange: (b: Bill[]) => void }) {
  const upd = (id: string, patch: Partial<Bill>) => onChange(bills.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  return (
    <div>
      {bills.map((b) => (
        <div key={b.id} className="bill-row">
          <div className="field" style={{ marginBottom: 10 }}>
            <label className="field__label" htmlFor={`bn-${b.id}`}>Nazwa</label>
            <input id={`bn-${b.id}`} className="input" value={b.name} maxLength={60} onChange={(e) => upd(b.id, { name: e.target.value })} />
          </div>
          <MoneyField compact label="Kwota / mies." id={`ba-${b.id}`} value={b.amount} onChange={(v) => upd(b.id, { amount: v })} max={1_000_000} />
          <button type="button" className="btn btn--link btn--sm" style={{ marginBottom: 12 }} onClick={() => onChange(bills.filter((x) => x.id !== b.id))} aria-label={`Usuń: ${b.name}`}><Icon name="trash" width={16} /></button>
        </div>
      ))}
      {bills.length < 12 && <button type="button" className="btn btn--ghost btn--sm" onClick={() => onChange([...bills, { id: `b${Date.now()}`, name: "" }])}><Icon name="plus" width={16} /> Dodaj wydatek</button>}
    </div>
  );
}

const steps: WizardStep<InterimAnswers>[] = [
  { id: "safety", title: "Czy w Waszej relacji zdarzała się przemoc lub groźby albo obawiasz się o swoje bezpieczeństwo?", help: "Jeśli tak, nie zaproponujemy ustaleń do negocjowania z drugą stroną. Nie musisz niczego opisywać.", valid: (a) => !!a.safety, summary: (a) => labelOf(OPT.safety, a.safety), render: pick("safety", OPT.safety, "Bezpieczeństwo") },
  { id: "together", title: "Czy nadal mieszkacie razem?", when: notSafe, valid: (a) => !!a.together, summary: (a) => labelOf(OPT.together, a.together), render: (a, set) => <SingleChoice legend="Mieszkanie razem" options={OPT.together} value={a.together} onChange={(v) => set({ together: v as InterimAnswers["together"], housing: v === "no" ? "settled" : a.housing === "settled" ? undefined : a.housing })} /> },
  { id: "housing", title: "Jak chcecie mieszkać w okresie przejściowym?", when: (a) => notSafe(a) && a.together !== "no", valid: (a) => !!a.housing, summary: (a) => labelOf(OPT.housingTogether, a.housing), render: pick("housing", OPT.housingTogether, "Mieszkanie") },
  { id: "children", title: "Czy macie dzieci, które mieszkają z Wami?", when: notSafe, valid: (a) => !!a.children, summary: (a) => labelOf(OPT.yn, a.children), render: pick("children", OPT.yn, "Dzieci") },
  { id: "childDaily", title: "Z kim dzieci będą na co dzień w okresie przejściowym?", help: "To tymczasowa organizacja, nie rozstrzygnięcie o opiece.", when: (a) => notSafe(a) && a.children === "yes", valid: (a) => !!a.childDaily, summary: (a) => labelOf(OPT.childDaily, a.childDaily), render: pick("childDaily", OPT.childDaily, "Codzienna opieka") },
  { id: "childContact", title: "Jak dzieci będą spędzać czas z drugim rodzicem?", when: (a) => notSafe(a) && a.children === "yes" && (a.childDaily === "me" || a.childDaily === "partner"), valid: (a) => !!a.childContact, summary: (a) => labelOf(OPT.childContact, a.childContact), render: pick("childContact", OPT.childContact, "Kontakty") },
  { id: "tellKids", title: "Jak i kiedy porozmawiacie z dziećmi?", when: (a) => notSafe(a) && a.children === "yes", valid: (a) => !!a.tellKids, summary: (a) => labelOf(OPT.tellKids, a.tellKids), render: pick("tellKids", OPT.tellKids, "Rozmowa z dziećmi") },
  { id: "split", title: "Jak chcecie dzielić wspólne rachunki?", when: notSafe, valid: (a) => !!a.split, summary: (a) => labelOf(OPT.split, a.split), render: pick("split", OPT.split, "Podział rachunków") },
  {
    id: "incomes", title: "Orientacyjne dochody netto", help: "Potrzebne tylko do policzenia proporcji. Możesz pominąć — przyjmiemy podział po połowie.", optional: true,
    when: (a) => notSafe(a) && a.split === "proportional",
    summary: (a) => (a.incomeMe && a.incomePartner !== undefined ? `${formatPLN(a.incomeMe)} / ${formatPLN(a.incomePartner)}` : "nie podano"),
    render: (a, set) => (<><MoneyField label="Mój dochód netto / mies." value={a.incomeMe} onChange={(v) => set({ incomeMe: v })} /><MoneyField label="Dochód drugiej osoby netto / mies." value={a.incomePartner} onChange={(v) => set({ incomePartner: v })} /></>),
  },
  {
    id: "bills", title: "Wspólne rachunki i raty", help: "Wpisz kwoty, które chcecie dzielić — policzymy, ile przypada na każde z Was. Możesz pominąć.", optional: true,
    when: (a) => notSafe(a) && !!a.split && a.split !== "tbd",
    summary: (a) => `${(a.bills || []).filter((b) => (b.amount ?? 0) > 0).length} pozycji`,
    render: (a, set) => <BillsEditor bills={a.bills || DEFAULT_BILLS} onChange={(b) => set({ bills: b })} />,
  },
  { id: "account", title: "Co ze wspólnym kontem?", when: notSafe, valid: (a) => !!a.account, summary: (a) => labelOf(OPT.account, a.account), render: pick("account", OPT.account, "Wspólne konto") },
  {
    id: "things", title: "Kto korzysta z samochodu i opiekuje się zwierzętami?", when: notSafe,
    valid: (a) => (a.car && a.pets ? true : "Wybierz odpowiedź w obu pytaniach (lub „Nie dotyczy”)."),
    summary: (a) => `Samochód: ${labelOf(OPT.who, a.car) ?? "—"}; zwierzęta: ${labelOf(OPT.who, a.pets) ?? "—"}`,
    render: (a, set) => (<><p className="field__label">Samochód</p><SingleChoice legend="Samochód" options={OPT.who} value={a.car} onChange={(v) => set({ car: v as InterimAnswers["car"] })} columns={2} /><p className="field__label mt">Zwierzęta</p><SingleChoice legend="Zwierzęta" options={OPT.who} value={a.pets} onChange={(v) => set({ pets: v as InterimAnswers["pets"] })} columns={2} /></>),
  },
  { id: "channel", title: "Jak będziecie ustalać sprawy organizacyjne?", when: notSafe, valid: (a) => !!a.channel, summary: (a) => labelOf(OPT.channel, a.channel), render: pick("channel", OPT.channel, "Komunikacja") },
  { id: "guests", title: "Goście i nowe relacje w okresie przejściowym", when: (a) => notSafe(a) && a.together !== "no", valid: (a) => !!a.guests, summary: (a) => labelOf(OPT.guests, a.guests), render: pick("guests", OPT.guests, "Goście") },
  { id: "review", title: "Kiedy wrócicie do tych zasad?", when: notSafe, valid: (a) => !!a.reviewWeeks, summary: (a) => (a.reviewWeeks ? `Za ${a.reviewWeeks} tyg.` : null), render: (a, set) => <SingleChoice legend="Przegląd" options={OPT.review} value={a.reviewWeeks ? String(a.reviewWeeks) : undefined} onChange={(v) => set({ reviewWeeks: Number(v) as InterimAnswers["reviewWeeks"] })} columns={2} /> },
];

export function InterimTool() {
  const [answers, setAnswers] = useState<InterimAnswers>({});
  const [done, setDone] = useState(false);
  const [editStep, setEditStep] = useState<string | undefined>();
  const [key, setKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const doc = useMemo(() => buildDocument(answers), [answers]);
  const bills = useMemo(() => splitBills(answers), [answers]);
  const safety = isSafety(answers);

  const complete = () => { setDone(true); track("tool_complete", { tool: TOOL }); requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswers({}); setDone(false); setEditStep(undefined); setKey((k) => k + 1); };
  const review = reviewDate(answers.reviewWeeks ?? 4).toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });

  const report = (): Report => safety
    ? { title: "Okres przejściowy — moje bezpieczeństwo i kolejne kroki", intro: `Przygotowano ${todayPL()}.`, sections: [{ heading: "Bezpieczeństwo", items: ["W sytuacji zagrożenia: 112.", "Niebieska Linia: 800 120 002.", "Skonsultuj sytuację indywidualnie z prawnikiem lub ośrodkiem pomocy przed rozmowami z drugą stroną."] }] }
    : {
        title: "Propozycja zasad na czas przejściowy",
        intro: `Przygotowano ${todayPL()}. To propozycja do rozmowy, nie umowa. Nie przesądza o podziale majątku ani rozstrzygnięciach sądu. Przegląd ustaleń: ${review}.`,
        sections: [
          ...doc.sections,
          ...(bills && bills.rows.length ? [{ heading: `Podział rachunków (ja ${bills.pctMe}% / druga osoba ${bills.pctPartner}%)`, items: [...bills.rows.map((r) => `${r.name}: ${formatPLN(r.amount)} → ja ${formatPLN(r.me)}, druga osoba ${formatPLN(r.partner)}`), `Razem: ${formatPLN(bills.total)} → ja ${formatPLN(bills.me)}, druga osoba ${formatPLN(bills.partner)}`] }] : []),
          { heading: "Do ustalenia", items: doc.open },
        ],
      };

  if (!done) return <Wizard key={key} toolId={TOOL} steps={steps} answers={answers} setAnswers={setAnswers} onComplete={complete} startAt={editStep} finishLabel="Pokaż propozycję zasad" />;

  if (safety) {
    return (
      <div ref={ref} className="tool-frame" style={{ scrollMarginTop: 70 }}>
        <div className="result-head">
          <span className="eyebrow">Twój wynik</span>
          <h2 style={{ fontSize: "var(--fs-2xl)" }}>Najpierw Twoje bezpieczeństwo</h2>
          <p>W sytuacji przemocy lub gróźb wspólne ustalanie zasad z drugą stroną może nie być bezpieczne. Dlatego nie proponujemy takiego dokumentu.</p>
        </div>
        <div className="result-section">
          <Alert tone="safety" title="Gdzie szukać pomocy">
            <p>W sytuacji zagrożenia dzwoń pod <strong>112</strong>. Bezpłatne wsparcie dla osób doznających przemocy domowej: <strong>Niebieska Linia 800 120 002</strong>. <Link href="/pomoc">Więcej numerów pomocowych</Link>.</p>
          </Alert>
          <h3 className="mt">Co możesz zrobić we własnym zakresie</h3>
          <ul className="list-check">
            <li>Przygotuj w bezpiecznym miejscu dokumenty, leki, klucze, ładowarkę i kontakty alarmowe.</li>
            <li>Skonsultuj swoją sytuację indywidualnie — z prawnikiem, ośrodkiem interwencji kryzysowej lub organizacją pomocową.</li>
            <li>Zadbaj o bezpieczeństwo cyfrowe: hasła, udostępnianie lokalizacji, wspólne konta w chmurze.</li>
            <li>Rozważ, kto z bliskich może Cię wesprzeć i gdzie możesz się zatrzymać, jeśli zajdzie potrzeba.</li>
          </ul>
          <p className="small"><button type="button" className="btn btn--link btn--sm" onClick={() => edit("safety")}>Zmień odpowiedź</button></p>
        </div>
        <div className="result-section"><ResultActions toolId={TOOL} report={report} filename="okres-przejsciowy-bezpieczenstwo" onReset={reset} /></div>
        <div className="result-section" style={{ background: "var(--cream)" }}>
          <NextStep toolId={TOOL} offers={[{ key: "konsultacja", cta: "Poproś o indywidualną rozmowę", why: "Rozmowa o Twojej sytuacji — bez kontaktu z drugą stroną." }, { key: "materialy", href: "/materialy/bezpieczenstwo-cyfrowe-i-finansowe", cta: "Przewodnik: bezpieczeństwo cyfrowe i finansowe" }]} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twoja propozycja</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>Propozycja zasad na czas przejściowy</h2>
        <p>Gotowa do omówienia z drugą osobą. To nie jest umowa — możecie ją dowolnie zmieniać.</p>
        <div className="kpis kpis--3">
          <div className="kpi"><span className="kpi__label">Ustalone obszary</span><span className="kpi__value">{doc.sections.length}</span></div>
          <div className="kpi"><span className="kpi__label">Do ustalenia</span><span className="kpi__value">{doc.open.length}</span></div>
          <div className="kpi"><span className="kpi__label">Przegląd zasad</span><span className="kpi__value" style={{ fontSize: "var(--fs-lg)" }}>{review}</span></div>
        </div>
      </div>
      <div className="result-section"><AnswersSummary steps={steps} answers={answers} onEdit={edit} /></div>

      <div className="result-section">
        <h3><Icon name="doc" width={22} /> Dokument do rozmowy</h3>
        <div className="doc-sheet">
          <p className="xsmall muted" style={{ marginTop: 0 }}>PROPOZYCJA DO ROZMOWY · {todayPL()}</p>
          {doc.sections.map((s) => (
            <div key={s.heading}>
              <h4>{s.heading}</h4>
              <ul className="list-dot">{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
          <p className="xsmall muted" style={{ marginBottom: 0, marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 10 }}>To propozycja do rozmowy, nie umowa. Nie przesądza o podziale majątku ani o rozstrzygnięciach sądu, w tym w sprawach dzieci.</p>
        </div>
      </div>

      {bills && (
        <div className="result-section">
          <h3><Icon name="coins" width={22} /> Podział rachunków</h3>
          {bills.note && <Alert tone="warn"><p>{bills.note}</p></Alert>}
          {bills.rows.length ? (
            <div className="table-wrap mt">
              <table className="table">
                <caption className="visually-hidden">Podział wspólnych rachunków</caption>
                <thead><tr><th scope="col">Wydatek</th><th scope="col" className="num">Kwota</th><th scope="col" className="num">Ja ({bills.pctMe}%)</th><th scope="col" className="num">Druga osoba ({bills.pctPartner}%)</th></tr></thead>
                <tbody>{bills.rows.map((r) => <tr key={r.name}><th scope="row">{r.name}</th><td className="num">{formatPLN(r.amount)}</td><td className="num">{formatPLN(r.me)}</td><td className="num">{formatPLN(r.partner)}</td></tr>)}</tbody>
                <tfoot><tr><th scope="row">Razem / mies.</th><td className="num">{formatPLN(bills.total)}</td><td className="num">{formatPLN(bills.me)}</td><td className="num">{formatPLN(bills.partner)}</td></tr></tfoot>
              </table>
            </div>
          ) : (
            <p className="small muted">Nie wpisano kwot. Podział: ja {bills.pctMe}% / druga osoba {bills.pctPartner}%. <button type="button" className="btn btn--link btn--sm" onClick={() => edit("bills")}>Dodaj kwoty</button></p>
          )}
          <p className="xsmall muted mt">Za wspólny kredyt oboje odpowiadacie wobec banku, niezależnie od tego podziału.</p>
        </div>
      )}

      {doc.open.length > 0 && (
        <div className="result-section">
          <h3><Icon name="checklist" width={22} /> Do ustalenia</h3>
          <ul className="list-q list-dot">{doc.open.map((o) => <li key={o}>{o}</li>)}</ul>
        </div>
      )}

      <div className="result-section">
        <ResultActions toolId={TOOL} report={report} filename="zasady-na-czas-przejsciowy" onReset={reset} />
        <p className="small mt">Jak rozmawiać o tych zasadach rzeczowo? Zobacz <Link href="/materialy/komunikacja-z-drugim-rodzicem">szablony wiadomości do drugiego rodzica</Link>.</p>
      </div>
      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep toolId={TOOL} offers={[
          { key: "mediacja", cta: "Dowiedz się, jak może pomóc mediacja", why: "Jeśli rozmowa o zasadach jest trudna, neutralny mediator może pomóc je wspólnie ustalić. Mediacja jest dobrowolna." },
          { key: "plan-rozwodu", cta: "Odbierz bezpłatny Plan Rozwodu", why: "Zasady przejściowe to pierwszy krok. Plan Rozwodu porządkuje sprawy do ustalenia przed pozwem." },
        ]} />
      </div>
    </div>
  );
}
