"use client";
import { useMemo, useRef, useState } from "react";
import { Wizard, AnswersSummary, labelOf, type WizardStep } from "@/components/tool/Wizard";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { SingleChoice, MultiChoice, type Option } from "@/components/ui/Choices";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import { todayPL } from "@/lib/format";
import type { Report } from "@/lib/report";
import { buildTalkPlan, isSafetyMode, type TalkAnswers } from "@/lib/decision/rozmowa-o-rozstaniu";
import type { OfferKey } from "@/content/types";

const TOOL = "rozmowa-o-rozstaniu";

const O: Record<string, Option[]> = {
  safety: [
    { value: "no", label: "Nie, czuję się bezpiecznie" },
    { value: "worried", label: "Obawiam się reakcji drugiej osoby", desc: "Np. gwałtownej złości, gróźb" },
    { value: "yes", label: "Tak, zdarzała się przemoc lub groźby" },
  ],
  expects: [
    { value: "yes", label: "Tak, rozmawialiśmy już o problemach" },
    { value: "maybe", label: "Może się domyślać" },
    { value: "no", label: "Raczej się nie spodziewa" },
  ],
  stage: [
    { value: "decided", label: "Decyzja o rozstaniu jest podjęta" },
    { value: "crisis", label: "Chcę porozmawiać o kryzysie" },
    { value: "unsure", label: "Nie mam jeszcze pewności" },
  ],
  children: [
    { value: "none", label: "Nie mamy dzieci" },
    { value: "small", label: "Tak, małe (do 6 lat)" },
    { value: "school", label: "Tak, w wieku szkolnym (7–12)" },
    { value: "teen", label: "Tak, nastolatki" },
  ],
  topics: [
    { value: "children", label: "Dzieci i opieka" },
    { value: "housing", label: "Mieszkanie, kto się wyprowadza" },
    { value: "money", label: "Pieniądze, konta, kredyt" },
    { value: "reasons", label: "Powody, pytanie „dlaczego”" },
    { value: "family", label: "Reakcje rodziny i znajomych" },
    { value: "timing", label: "Tempo i terminy" },
    { value: "none", label: "Trudno powiedzieć" },
  ],
  goal: [
    { value: "inform", label: "Przekazać decyzję o rozstaniu" },
    { value: "therapy", label: "Zaproponować terapię par" },
    { value: "interim", label: "Ustalić zasady na najbliższy czas" },
    { value: "future", label: "Porozmawiać o przyszłości związku" },
  ],
  place: [
    { value: "home-alone", label: "W domu, gdy będziemy sami" },
    { value: "neutral", label: "W spokojnym, neutralnym miejscu" },
    { value: "walk", label: "Na spacerze" },
    { value: "third", label: "Z udziałem terapeuty lub mediatora" },
  ],
  emotions: [
    { value: "fear", label: "Lęk, stres" },
    { value: "guilt", label: "Poczucie winy" },
    { value: "anger", label: "Złość, frustracja" },
    { value: "sadness", label: "Smutek" },
    { value: "relief", label: "Ulga" },
    { value: "calm", label: "Spokój" },
  ],
};

const notSafety = (a: TalkAnswers) => !isSafetyMode(a);

const steps: WizardStep<TalkAnswers>[] = [
  {
    id: "safety", title: "Czy obawiasz się o swoje bezpieczeństwo w kontakcie z drugą osobą?",
    help: "Zadajemy to pytanie każdemu. Odpowiedź zmienia proponowany plan.",
    valid: (a) => !!a.safety, summary: (a) => labelOf(O.safety, a.safety),
    render: (a, set) => (
      <>
        <SingleChoice legend="Bezpieczeństwo" options={O.safety} value={a.safety} onChange={(v) => set({ safety: v as TalkAnswers["safety"] })} />
        {(a.safety === "yes" || a.safety === "worried") && (
          <Alert tone="safety" className="mt" title="Twoje bezpieczeństwo jest najważniejsze">
            <p>W sytuacji zagrożenia dzwoń pod <strong>112</strong>. Bezpłatna pomoc: <strong>Niebieska Linia 800 120 002</strong>. Przygotujemy plan, który nie zakłada rozmowy w cztery oczy.</p>
          </Alert>
        )}
      </>
    ),
  },
  { id: "stage", title: "O czym chcesz porozmawiać?", valid: (a) => !!a.stage, summary: (a) => labelOf(O.stage, a.stage), render: (a, set) => <SingleChoice legend="Etap" options={O.stage} value={a.stage} onChange={(v) => set({ stage: v as TalkAnswers["stage"] })} /> },
  { id: "children", title: "Czy macie dzieci?", help: "Nie pytamy o imiona — tylko o przedział wieku najmłodszego dziecka.", valid: (a) => !!a.children, summary: (a) => labelOf(O.children, a.children), render: (a, set) => <SingleChoice legend="Dzieci" options={O.children} value={a.children} onChange={(v) => set({ children: v as TalkAnswers["children"] })} /> },
  { id: "expects", title: "Czy druga osoba spodziewa się takiej rozmowy?", when: notSafety, valid: (a) => !!a.expects, summary: (a) => labelOf(O.expects, a.expects), render: (a, set) => <SingleChoice legend="Oczekiwania" options={O.expects} value={a.expects} onChange={(v) => set({ expects: v as TalkAnswers["expects"] })} /> },
  { id: "goal", title: "Jaki jest Twój główny cel tej rozmowy?", when: notSafety, valid: (a) => !!a.goal, summary: (a) => labelOf(O.goal, a.goal), render: (a, set) => <SingleChoice legend="Cel" options={O.goal} value={a.goal} onChange={(v) => set({ goal: v as TalkAnswers["goal"] })} /> },
  {
    id: "topics", title: "Które tematy mogą być najtrudniejsze?", help: "Zaznacz dowolne. Nie musisz niczego opisywać.",
    valid: (a) => ((a.topics || []).length ? true : "Zaznacz co najmniej jedną odpowiedź."), summary: (a) => labelOf(O.topics, a.topics || []),
    render: (a, set) => <MultiChoice legend="Trudne tematy" options={O.topics} value={a.topics || []} onChange={(v) => set({ topics: v })} exclusive="none" columns={2} />,
  },
  { id: "place", title: "Gdzie i jak chcesz porozmawiać?", when: notSafety, valid: (a) => !!a.place, summary: (a) => labelOf(O.place, a.place), render: (a, set) => <SingleChoice legend="Miejsce" options={O.place} value={a.place} onChange={(v) => set({ place: v as TalkAnswers["place"] })} /> },
  {
    id: "emotions", title: "Co czujesz, myśląc o tej rozmowie?", help: "Wszystkie emocje są w porządku. Wybierz dowolne.", optional: true,
    summary: (a) => labelOf(O.emotions, a.emotions || []) || "—",
    render: (a, set) => <MultiChoice legend="Emocje" options={O.emotions} value={a.emotions || []} onChange={(v) => set({ emotions: v })} columns={2} />,
  },
];

export function TalkTool() {
  const [answers, setAnswers] = useState<TalkAnswers>({});
  const [done, setDone] = useState(false);
  const [editStep, setEditStep] = useState<string | undefined>();
  const [wizardKey, setWizardKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const plan = useMemo(() => buildTalkPlan(answers), [answers]);

  const complete = () => { setDone(true); track("tool_complete", { tool: TOOL }); requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setWizardKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswers({}); setDone(false); setEditStep(undefined); setWizardKey((k) => k + 1); };

  const report = (): Report => ({
    title: plan.headline,
    intro: `Plan przygotowany ${todayPL()} na podstawie moich odpowiedzi. To propozycja — dopasuj ją do siebie.`,
    sections: [
      { heading: plan.mode === "safety" ? "Bezpieczne przygotowanie" : "Przygotowanie", items: plan.prepare },
      { heading: "Przykładowe otwarcie", items: plan.openings.map((o) => `${o.label}: „${o.text}”`) },
      { heading: "Czego unikać", items: plan.avoid },
      { heading: "Jak zakończyć rozmowę", items: plan.closing },
      { heading: "Gdy rozmowa się zaostrza", items: plan.escalation },
      { heading: "Po rozmowie (24–72 h)", items: plan.after },
      { heading: "Dzieci", items: plan.childrenPlan },
      { heading: "Tematy na później", items: plan.postponed },
      { heading: "Dla Ciebie", items: plan.selfCare },
      { heading: "Kontakty pomocowe", items: plan.safety },
    ],
  });

  if (!done) return <Wizard key={wizardKey} toolId={TOOL} steps={steps} answers={answers} setAnswers={setAnswers} onComplete={complete} startAt={editStep} finishLabel="Pokaż mój plan rozmowy" />;

  const safe = plan.mode === "safety";
  const hasKids = !!answers.children && answers.children !== "none";
  const offers: { key: OfferKey; cta?: string; why?: string; href?: string }[] = safe
    ? [{ key: "konsultacja", cta: "Poproś o indywidualną rozmowę", why: "Porozmawiaj o swojej sytuacji indywidualnie — bez kontaktu z drugą stroną." }, { key: "materialy", href: "/materialy/bezpieczenstwo-cyfrowe-i-finansowe", cta: "Przewodnik: bezpieczeństwo cyfrowe i finansowe" }]
    : answers.stage === "decided"
      ? [{ key: "plan-rozwodu", cta: "Sprawdź, jak przygotować kolejne kroki", why: "Bezpłatny Plan Rozwodu pomoże uporządkować sprawy do ustalenia po rozmowie — zanim padną decyzje o pozwie." }, hasKids ? { key: "materialy", href: "/materialy/komunikacja-z-drugim-rodzicem", cta: "Szablony rzeczowych wiadomości do drugiego rodzica" } : { key: "materialy", href: "/przed-decyzja/plan-wsparcia", cta: "Przygotuj swój plan wsparcia" }]
      : [{ key: "konsultacja", cta: "Porozmawiaj o swojej sytuacji", why: "Jeśli potrzebujesz uporządkować myśli przed rozmową, możesz porozmawiać z nami indywidualnie." }, hasKids ? { key: "materialy", href: "/materialy/komunikacja-z-drugim-rodzicem", cta: "Szablony rzeczowych wiadomości do drugiego rodzica" } : { key: "materialy", href: "/przed-decyzja/kompas-decyzji", cta: "Kompas decyzji: uporządkuj myśli" }];

  const Section = ({ icon, title, items, kind = "check" }: { icon: Parameters<typeof Icon>[0]["name"]; title: string; items: string[]; kind?: "check" | "dot" }) =>
    items.length ? (
      <div className="result-section">
        <h3><Icon name={icon} width={22} /> {title}</h3>
        <ul className={kind === "check" ? "list-check" : "list-dot"}>{items.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
    ) : null;

  return (
    <div ref={ref} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head" style={safe ? { background: "#5b2621" } : undefined}>
        <span className="eyebrow">Twój plan</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>{plan.headline}</h2>
        <p style={{ marginBottom: 0 }}>{safe ? "Nie proponujemy rozmowy w cztery oczy. Poniżej znajdziesz, jak zadbać o siebie i gdzie szukać pomocy." : "To propozycja — nie scenariusz do odegrania. Mów własnymi słowami i dostosuj plan do siebie."}</p>
      </div>
      <div className="result-section">
        <AnswersSummary steps={steps} answers={answers} onEdit={edit} />
      </div>
      {safe && (
        <div className="result-section">
          <Alert tone="safety" title="Gdy potrzebujesz pomocy">
            <ul style={{ margin: 0, paddingLeft: 18 }}>{plan.safety.map((s) => <li key={s}>{s}</li>)}</ul>
          </Alert>
        </div>
      )}
      <Section icon="checklist" title={safe ? "Bezpieczne przygotowanie" : "Przygotowanie"} items={plan.prepare} />
      {plan.openings.length > 0 && (
        <div className="result-section">
          <h3><Icon name="message" width={22} /> Jak możesz zacząć</h3>
          {plan.openings.map((o) => (
            <div key={o.label} className="script"><span className="script__label">{o.label}</span><p style={{ margin: "4px 0 0" }}>„{o.text}”</p></div>
          ))}
        </div>
      )}
      <Section icon="x" title="Czego unikać" items={plan.avoid} kind="dot" />
      <Section icon="check" title="Jak zakończyć rozmowę" items={plan.closing} />
      <Section icon="alert" title="Gdy rozmowa się zaostrza" items={plan.escalation} kind="dot" />
      <div className="result-section">
        <h3><Icon name="clock" width={22} /> Po rozmowie</h3>
        <ol className="small" style={{ paddingLeft: 20 }}>{plan.after.map((x) => <li key={x} style={{ marginBottom: 6 }}>{x}</li>)}</ol>
      </div>
      <Section icon="heart" title="Dzieci" items={plan.childrenPlan} />
      {plan.postponed.length > 0 && (
        <div className="result-section">
          <h3><Icon name="doc" width={22} /> Tematy na kolejne rozmowy</h3>
          <p className="small muted">Te sprawy są ważne, ale rzadko da się je dobrze ustalić w pierwszej rozmowie.</p>
          <div className="btn-row" style={{ gap: 8 }}>{plan.postponed.map((t) => <span key={t} className="tag tag--gold">{t}</span>)}</div>
        </div>
      )}
      <Section icon="sparkle" title="Dla Ciebie" items={plan.selfCare} kind="dot" />
      {!safe && (
        <div className="result-section">
          <p className="xsmall muted" style={{ margin: 0 }}>Jeśli w trakcie rozmowy poczujesz zagrożenie — przerwij ją i dzwoń pod 112. Wsparcie: Niebieska Linia 800 120 002, kryzysowy telefon zaufania 116 123.</p>
        </div>
      )}
      <div className="result-section">
        <ResultActions toolId={TOOL} report={report} filename="plan-rozmowy" onReset={reset} />
      </div>
      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep toolId={TOOL} offers={offers} />
      </div>
    </div>
  );
}
