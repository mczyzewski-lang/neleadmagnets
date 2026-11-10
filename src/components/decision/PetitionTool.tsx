"use client";
import "./decision-legal.css";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Wizard, AnswersSummary, labelOf, type WizardStep } from "@/components/tool/Wizard";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { SingleChoice } from "@/components/ui/Choices";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
import { todayPL } from "@/lib/format";
import type { Report } from "@/lib/report";
import { COURT_RULES, buildChecklist, countItems, findCourt, type PetitionAnswers } from "@/lib/decision/pozew-rozwodowy-checklista";

const TOOL = "pozew-rozwodowy-checklista";
type O = { value: string; label: string; desc?: string }[];
const OPT = {
  commonHome: [{ value: "yes", label: "Tak, w Polsce" }, { value: "abroad", label: "Tylko za granicą" }, { value: "never", label: "Nie mieszkaliśmy razem" }] as O,
  stillThere: [{ value: "me", label: "Tak, ja", desc: "Mieszkam nadal w tej samej miejscowości / okolicy" }, { value: "partner", label: "Tak, druga strona" }, { value: "both", label: "Tak, oboje" }, { value: "none", label: "Nie, żadne z nas" }] as O,
  partnerWhere: [{ value: "pl", label: "W Polsce" }, { value: "abroad", label: "Za granicą" }, { value: "unknown", label: "Nie wiem" }] as O,
  meWhere: [{ value: "pl", label: "W Polsce" }, { value: "abroad", label: "Za granicą" }] as O,
  fault: [{ value: "none", label: "Bez orzekania o winie", desc: "Wymaga zgodnego żądania obojga" }, { value: "fault", label: "Z orzekaniem o winie" }, { value: "unsure", label: "Jeszcze nie wiem" }] as O,
  children: [{ value: "minor", label: "Tak, małoletnie" }, { value: "adult", label: "Tak, tylko pełnoletnie" }, { value: "none", label: "Nie mamy wspólnych dzieci" }] as O,
  agreement: [{ value: "yes", label: "Tak, mamy porozumienie" }, { value: "maybe", label: "Pracujemy nad nim / możliwe" }, { value: "no", label: "Nie" }] as O,
  yn: [{ value: "yes", label: "Tak" }, { value: "no", label: "Nie" }] as O,
  property: [{ value: "together", label: "Chcemy podziału w wyroku rozwodowym", desc: "Zwykle przy zgodnym projekcie podziału" }, { value: "later", label: "Podział osobno, później" }, { value: "none", label: "Nie dotyczy (brak majątku wspólnego)" }, { value: "unsure", label: "Nie wiem" }] as O,
  alimony: [{ value: "request", label: "Rozważam żądanie alimentów od małżonka" }, { value: "no", label: "Nie" }, { value: "unsure", label: "Nie wiem" }] as O,
};
const pick = <K extends keyof PetitionAnswers>(k: K, opts: O, legend: string) => (a: PetitionAnswers, set: (p: Partial<PetitionAnswers>) => void) => (
  <SingleChoice legend={legend} options={opts} value={a[k] as string | undefined} onChange={(v) => set({ [k]: v } as Partial<PetitionAnswers>)} />
);

const steps: WizardStep<PetitionAnswers>[] = [
  { id: "commonHome", title: "Czy mieliście wspólne miejsce zamieszkania w Polsce?", help: "Chodzi o ostatnie miejsce, w którym mieszkaliście razem.", valid: (a) => !!a.commonHome, summary: (a) => labelOf(OPT.commonHome, a.commonHome), render: pick("commonHome", OPT.commonHome, "Wspólne miejsce zamieszkania") },
  { id: "stillThere", title: "Czy któreś z Was nadal mieszka w tym samym okręgu (miejscowości lub okolicy)?", when: (a) => a.commonHome === "yes", valid: (a) => !!a.stillThere, summary: (a) => labelOf(OPT.stillThere, a.stillThere), render: pick("stillThere", OPT.stillThere, "Nadal w okręgu") },
  { id: "partnerWhere", title: "Gdzie mieszka druga strona?", valid: (a) => !!a.partnerWhere, summary: (a) => labelOf(OPT.partnerWhere, a.partnerWhere), render: pick("partnerWhere", OPT.partnerWhere, "Miejsce zamieszkania drugiej strony") },
  { id: "meWhere", title: "Gdzie mieszkasz Ty?", valid: (a) => !!a.meWhere, summary: (a) => labelOf(OPT.meWhere, a.meWhere), render: pick("meWhere", OPT.meWhere, "Twoje miejsce zamieszkania") },
  { id: "fault", title: "Jakie masz stanowisko co do winy?", valid: (a) => !!a.fault, summary: (a) => labelOf(OPT.fault, a.fault), render: pick("fault", OPT.fault, "Wina") },
  { id: "children", title: "Czy macie wspólne dzieci?", valid: (a) => !!a.children, summary: (a) => labelOf(OPT.children, a.children), render: pick("children", OPT.children, "Dzieci") },
  { id: "agreement", title: "Czy macie pisemne porozumienie dotyczące dzieci?", help: "Porozumienie o wykonywaniu władzy rodzicielskiej i kontaktach.", when: (a) => a.children === "minor", valid: (a) => !!a.agreement, summary: (a) => labelOf(OPT.agreement, a.agreement), render: pick("agreement", OPT.agreement, "Porozumienie rodzicielskie") },
  { id: "flat", title: "Czy nadal wspólnie zajmujecie mieszkanie?", valid: (a) => !!a.flat, summary: (a) => labelOf(OPT.yn, a.flat), render: pick("flat", OPT.yn, "Wspólne mieszkanie") },
  { id: "property", title: "Co z podziałem majątku wspólnego?", valid: (a) => !!a.property, summary: (a) => labelOf(OPT.property, a.property), render: pick("property", OPT.property, "Majątek") },
  { id: "alimony", title: "Czy rozważasz żądanie alimentów od małżonka dla siebie?", valid: (a) => !!a.alimony, summary: (a) => labelOf(OPT.alimony, a.alimony), render: pick("alimony", OPT.alimony, "Alimenty od małżonka") },
  { id: "mediation", title: "Czy próbowaliście mediacji lub innego polubownego rozwiązania?", help: "Pozew powinien zawierać taką informację.", valid: (a) => !!a.mediation, summary: (a) => labelOf(OPT.yn, a.mediation), render: pick("mediation", OPT.yn, "Mediacja") },
];

export function PetitionTool() {
  const [answers, setAnswers] = useState<PetitionAnswers>({});
  const [done, setDone] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [editStep, setEditStep] = useState<string | undefined>();
  const [key, setKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const court = useMemo(() => findCourt(answers), [answers]);
  const groups = useMemo(() => buildChecklist(answers), [answers]);
  const total = countItems(groups);
  const doneCount = groups.flatMap((g) => g.items).filter((i) => checked.has(i.id)).length;

  const complete = () => { setDone(true); track("tool_complete", { tool: TOOL }); requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswers({}); setChecked(new Set()); setDone(false); setEditStep(undefined); setKey((k) => k + 1); };
  const toggle = (id: string) => setChecked((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  const report = (): Report => ({
    title: "Konspekt pozwu o rozwód — lista kontrolna",
    intro: `Przygotowano ${todayPL()}. To lista kontrolna, nie gotowy pozew — pozew warto przygotować z prawnikiem.`,
    sections: [
      { heading: "Który sąd (art. 41 KPC)", items: [court.court, court.explanation, ...court.notes] },
      ...groups.map((g) => ({ heading: g.title, items: g.items.map((i) => `${checked.has(i.id) ? "[x]" : "[ ]"} ${i.text}${i.note ? ` (${i.note})` : ""}`) })),
    ],
  });

  if (!done) return <Wizard key={key} toolId={TOOL} steps={steps} answers={answers} setAnswers={setAnswers} onComplete={complete} startAt={editStep} finishLabel="Pokaż konspekt pozwu" />;

  const activeIdx = COURT_RULES.findIndex((r) => r.id === court.rule);
  return (
    <div ref={ref} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twój konspekt</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>Konspekt pozwu o rozwód — lista kontrolna</h2>
        <p>Gdzie złożyć pozew i co powinien zawierać w Twojej sytuacji. To lista kontrolna, nie gotowy pozew.</p>
        <div className="kpis kpis--3">
          <div className="kpi"><span className="kpi__label">Właściwy sąd</span><span className="kpi__value" style={{ fontSize: "var(--fs-md)", lineHeight: 1.3 }}>{court.court}</span></div>
          <div className="kpi"><span className="kpi__label">Elementy do sprawdzenia</span><span className="kpi__value">{doneCount}/{total}</span></div>
          <div className="kpi"><span className="kpi__label">Opłata od pozwu</span><span className="kpi__value">600 zł</span></div>
        </div>
      </div>
      <div className="result-section"><AnswersSummary steps={steps} answers={answers} onEdit={edit} /></div>

      <div className="result-section">
        <h3><Icon name="map" width={22} /> Gdzie złożyć pozew</h3>
        <p className="small">Rozwód orzeka wyłącznie sąd okręgowy. O tym, który, decyduje kolejność reguł z art. 41 KPC:</p>
        <ol className="court-rule">
          {COURT_RULES.map((r, i) => (
            <li key={r.id} className={i === activeIdx ? "is-active" : activeIdx >= 0 && i < activeIdx ? "is-skip" : undefined}>
              {r.text}
              {i === activeIdx && <><br /><strong style={{ color: "var(--green-800)" }}>Twoja sytuacja: {court.explanation}</strong></>}
            </li>
          ))}
        </ol>
        {court.rule === "consult" && <Alert tone="warn" className="mt"><p><strong>{court.explanation}</strong></p></Alert>}
        <div className="mt"><Alert tone="info"><p><strong>Jak znaleźć konkretny sąd?</strong> Sprawdź, który sąd okręgowy obejmuje daną miejscowość — na stronie internetowej sądu (zakładka o właściwości/obszarze) albo w wyszukiwarce sądów Ministerstwa Sprawiedliwości.</p></Alert></div>
        {court.notes.length > 0 && <ul className="list-dot mt">{court.notes.map((n) => <li key={n}>{n}</li>)}</ul>}
      </div>

      <div className="result-section">
        <h3><Icon name="checklist" width={22} /> Co powinien zawierać pozew</h3>
        <div className="progress" style={{ margin: "4px 0 14px" }} role="progressbar" aria-label="Sprawdzone elementy" aria-valuemin={0} aria-valuemax={total} aria-valuenow={doneCount}>
          <div className="progress__bar" style={{ width: `${total ? (doneCount / total) * 100 : 0}%` }} />
        </div>
        {groups.map((g) => (
          <section key={g.id} aria-labelledby={`g-${g.id}`} style={{ marginBottom: 14 }}>
            <h4 id={`g-${g.id}`} style={{ marginBottom: 2 }}>{g.title}</h4>
            {g.items.map((i) => (
              <div key={i.id} className={`task ${checked.has(i.id) ? "task--done" : ""}`}>
                <input type="checkbox" id={`c-${i.id}`} checked={checked.has(i.id)} onChange={() => toggle(i.id)} />
                <div>
                  <label htmlFor={`c-${i.id}`} className="task__text" style={{ cursor: "pointer" }}>{i.text}</label>
                  {i.note && <span className="task__meta">{i.note}</span>}
                </div>
              </div>
            ))}
          </section>
        ))}
        <Alert tone="warn"><p><strong>To nie jest gotowy pozew.</strong> Treść żądań, uzasadnienia i wniosków dowodowych zależy od szczegółów sprawy — pozew warto przygotować z prawnikiem.</p></Alert>
      </div>

      <div className="result-section">
        <h3><Icon name="handshake" width={22} /> Co warto ustalić przed złożeniem</h3>
        <ul className="list-check">
          <li>Które sprawy możecie uzgodnić wcześniej (dzieci, mieszkanie, finanse) — <Link href="/narzedzia/przed-pozwem">mapa ustaleń przed pozwem</Link>.</li>
          {answers.fault !== "none" && <li>Stanowisko co do winy i jego skutki — <Link href="/przed-decyzja/wina-czy-bez-winy">porównanie: z winą czy bez</Link>.</li>}
          {answers.children === "minor" && <li>Plan opieki i kontaktów — <Link href="/narzedzia/plan-opieki-nad-dzieckiem">kreator planu opieki</Link>; koszty dzieci — <Link href="/narzedzia/koszty-utrzymania-dziecka">kalkulator kosztów</Link>.</li>}
          {answers.flat === "yes" && <li>Scenariusze dla mieszkania i kredytu — <Link href="/narzedzia/mieszkanie-i-kredyt">narzędzie Mieszkanie i kredyt</Link>.</li>}
          <li>Komplet dokumentów — <Link href="/materialy/checklista-dokumentow">checklista dokumentów</Link>.</li>
        </ul>
      </div>

      <div className="result-section"><ResultActions toolId={TOOL} report={report} filename="konspekt-pozwu-rozwodowego" onReset={reset} /></div>
      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep toolId={TOOL} offers={[
          { key: "plan-rozwodu", cta: "Sprawdź koszt pomocy w przygotowaniu pozwu i ustaleń", why: "Bezpłatny Plan Rozwodu: co ustalić przed pozwem, jakie dokumenty przygotować i ile kosztowałaby pomoc Nowego Etapu." },
          { key: "konsultacja", cta: "Porozmawiaj o swojej sprawie", why: "Masz element zagraniczny, spór o winę albo dzieci? Omów szczegóły indywidualnie." },
        ]} />
      </div>
    </div>
  );
}
