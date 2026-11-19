"use client";
import { useMemo, useRef, useState, type ReactNode } from "react";
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
  type ParentingAnswers, type Parent, type PresetId, type CareForm, type HolidayId, type HolidayMode, type HandoverHow, type Transition,
  DAYS_SHORT, DAYS_LONG, FORM_LABELS, PRESETS, HOLIDAYS, IMPORTANT, OTHER_TERMS, HOW_LABELS,
  ageConsiderations, arrangementsSummary, buildCycle, buildMonth, countNights, defaultAnswers, mondayOf, monthNights, openPoints,
  proposalSections, toISO, parseISO, presetGrid, transitions, handoverFor, handoverText, dayName, describeHoliday, holidayYearText,
  modeLabel, needsParent, parentFieldLabel, careFormText, callsText, other,
} from "@/lib/tools/parentingPlan";

const TOOL = "plan-opieki-nad-dzieckiem";
type Opt = { value: string; label: string; desc?: string };
type Set = (p: Partial<ParentingAnswers>) => void;

const O: Record<string, Opt[]> = {
  children: [{ value: "1", label: "Jedno dziecko" }, { value: "2", label: "Dwoje dzieci" }, { value: "3+", label: "Troje lub więcej" }],
  ages: [{ value: "0-3", label: "0–3 lata" }, { value: "4-6", label: "4–6 lat" }, { value: "7-12", label: "7–12 lat" }, { value: "13-18", label: "13–18 lat" }],
  distance: [{ value: "near", label: "Blisko", desc: "Do ok. 15 minut drogi" }, { value: "mid", label: "Średnio", desc: "Ok. 15–45 minut" }, { value: "far", label: "Daleko", desc: "Ponad 45 minut lub inne miasto" }],
  school: [{ value: "zlobek", label: "Żłobek" }, { value: "przedszkole", label: "Przedszkole" }, { value: "szkola", label: "Szkoła" }, { value: "mixed", label: "Różnie, dzieci są w różnych placówkach" }, { value: "none", label: "Nie dotyczy (opieka domowa)" }],
  form: (Object.keys(FORM_LABELS) as CareForm[]).map((k) => ({ value: k, label: FORM_LABELS[k].label, desc: FORM_LABELS[k].desc })),
  preset: (Object.keys(PRESETS) as PresetId[]).map((k) => ({ value: k, label: PRESETS[k].label, desc: PRESETS[k].desc })),
  nestingUntil: [{ value: "3m", label: "Około 3 miesiące" }, { value: "6m", label: "Około 6 miesięcy" }, { value: "school-year", label: "Do końca roku szkolnego" }, { value: "other", label: "Inny termin" }, { value: "tbd", label: "Do ustalenia" }],
  calls: [
    { value: "free", label: "Swobodny kontakt telefoniczny", desc: "Dziecko i rodzic dzwonią, kiedy chcą, z szacunkiem dla rytmu dnia. Zwykle wystarcza, gdy kontakty nie są ograniczone." },
    { value: "fixed", label: "Stałe pory kontaktu", desc: "Tylko jeśli oboje tego chcecie, np. gdy dziecko jest małe albo pomaga mu przewidywalność." },
    { value: "tbd", label: "Do ustalenia" },
  ],
  safety: [{ value: "ok", label: "Tak, możemy rozmawiać spokojnie" }, { value: "hard", label: "Rozmowy są trudne, ale bezpieczne" }, { value: "unsafe", label: "Nie czuję się bezpiecznie w kontakcie z drugim rodzicem" }],
};

const sum = (k: keyof ParentingAnswers) => (a: ParentingAnswers) => labelOf(O[k as string], a[k] as string);
const single = (k: keyof ParentingAnswers, legend: string) => (a: ParentingAnswers, set: Set) => (
  <SingleChoice legend={legend} options={O[k as string]} value={a[k] as string | undefined} onChange={(v) => set({ [k]: v } as Partial<ParentingAnswers>)} />
);
const names = (a: ParentingAnswers) => ({ A: a.labelA || "Rodzic A", B: a.labelB || "Rodzic B" });
const hasSchedule = (a: ParentingAnswers) => a.form === "two-homes" || a.form === "nesting";
const clean = (s: string) => s.replace(/[<>]/g, "");

function Note({ children }: { children?: ReactNode }) {
  return <p className="pp-note"><Icon name="info" width={16} /> <span>{children ?? "To przykłady. Każdy zapis możesz zmienić albo usunąć."}</span></p>;
}

function TextArea({ id, label, value, onChange, hint, rows = 3, placeholder }: { id: string; label: string; value: string; onChange: (v: string) => void; hint?: string; rows?: number; placeholder?: string }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>{label}</label>
      <textarea id={id} className="textarea" rows={rows} maxLength={400} value={value} placeholder={placeholder} onChange={(e) => onChange(clean(e.target.value))} aria-describedby={hint ? `${id}-h` : undefined} />
      {hint && <span className="field__hint" id={`${id}-h`}>{hint}</span>}
    </div>
  );
}

function WeekView({ a, editable }: { a: ParentingAnswers; editable?: boolean }) {
  const cycle = buildCycle(a);
  const { A, B } = names(a);
  const nameOf = (p: Parent) => (p === "A" ? A : B);
  const nest = a.form === "nesting";
  return (
    <div aria-hidden={editable ? true : undefined}>
      {[0, 1].map((w) => (
        <div key={w} style={{ marginBottom: 12 }}>
          <p className="xsmall muted" style={{ margin: "0 0 6px", fontWeight: 600 }}>TYDZIEŃ {w + 1}</p>
          <div className="week" role={editable ? undefined : "list"} aria-label={editable ? undefined : `Tydzień ${w + 1}`}>
            {cycle.slice(w * 7, w * 7 + 7).map((d, i) => (
              <div key={i} role={editable ? undefined : "listitem"} className={`week__day ${d.night === "A" ? "parent-a" : "parent-b"}`} aria-label={editable ? undefined : `${DAYS_LONG[i]}: ${nest ? "z dzieckiem" : "noc u"} ${nameOf(d.night)}${d.visit ? `, popołudnie z: ${nameOf(d.visit)}` : ""}`}>
                <span>{DAYS_SHORT[i]}</span>
                <span className="pp-who">{nameOf(d.night)}</span>
                {d.visit && <span className="pp-visit">+{nameOf(d.visit).slice(0, 1)}</span>}
              </div>
            ))}
          </div>
        </div>
      ))}
      <ul className="legend">
        <li><i className="parent-a" /> {nest ? "Z dzieckiem" : "Noc u"}: {A}</li>
        <li><i className="parent-b" /> {nest ? "Z dzieckiem" : "Noc u"}: {B}</li>
        {cycle.some((d) => d.visit) && <li><i style={{ background: "var(--gold-500)" }} /> Popołudnie bez noclegu</li>}
      </ul>
    </div>
  );
}

function GridEditor({ a, set }: { a: ParentingAnswers; set: Set }) {
  const { A, B } = names(a);
  const n = countNights(buildCycle(a));
  const nest = a.form === "nesting";
  const valueOf = (i: number) => (a.visits[i] && a.visits[i] !== a.grid[i] ? `${a.grid[i]}+${a.visits[i]}` : a.grid[i]);
  const change = (i: number, v: string) => {
    const [night, visit] = v.split("+") as [Parent, Parent | undefined];
    const grid = [...a.grid]; const visits = [...a.visits];
    grid[i] = night; visits[i] = visit ?? null;
    set({ grid, visits });
  };
  const swap = () => set({ grid: a.grid.map(other), visits: a.visits.map((v) => (v ? other(v) : null)), handovers: {} });
  const opts = [
    { v: "A", l: `${nest ? "Z dzieckiem" : "Noc u"}: ${A}` },
    { v: "B", l: `${nest ? "Z dzieckiem" : "Noc u"}: ${B}` },
    { v: "A+B", l: `${nest ? "Z dzieckiem" : "Noc u"}: ${A}, popołudnie z: ${B}` },
    { v: "B+A", l: `${nest ? "Z dzieckiem" : "Noc u"}: ${B}, popołudnie z: ${A}` },
  ];
  return (
    <div>
      <Note>Siatka startuje z wybranego układu. Zmień dowolny dzień, aby dopasować ją do Waszego życia.</Note>
      <WeekView a={a} editable />
      <p className="small" aria-live="polite" style={{ fontWeight: 600 }}>W cyklu 14 {nest ? "dni" : "nocy"}: {A}: {n.A}, {B}: {n.B}{n.visitsA + n.visitsB ? `, popołudnia bez noclegu: ${n.visitsA + n.visitsB}` : ""}</p>
      <div className="pp-grid-edit">
        {[0, 1].map((w) => (
          <fieldset key={w} className="pp-fieldset">
            <legend className="field__label">Tydzień {w + 1}</legend>
            {DAYS_LONG.map((d, i) => {
              const idx = w * 7 + i;
              return (
                <div key={idx} className="pp-row">
                  <label htmlFor={`pp-g${idx}`} className="pp-row__label">{d}</label>
                  <select id={`pp-g${idx}`} className="select" value={valueOf(idx)} onChange={(e) => change(idx, e.target.value)}>
                    {opts.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
                  </select>
                </div>
              );
            })}
          </fieldset>
        ))}
      </div>
      <p className="xsmall muted">{nest ? "Każdy dzień oznacza, który rodzic jest z dzieckiem w domu dziecka (od dnia do rana następnego dnia)." : "Każdy dzień oznacza noc z tego dnia na następny."}</p>
      <div className="btn-row">
        <button type="button" className="btn btn--ghost btn--sm" onClick={swap}>Zamień rodziców miejscami</button>
        {a.preset && <button type="button" className="btn btn--ghost btn--sm" onClick={() => set({ ...presetGrid(a.preset!), handovers: {} })}>Przywróć układ „{PRESETS[a.preset].label}”</button>}
      </div>
    </div>
  );
}

function HandoverEditor({ a, set }: { a: ParentingAnswers; set: Set }) {
  const ts = transitions(a.grid);
  const { A, B } = names(a);
  const upd = (t: Transition, patch: Partial<{ time: string; how: HandoverHow; place: string }>) => set({ handovers: { ...a.handovers, [t.day]: { ...handoverFor(a, t), ...patch } } });
  const hows = (Object.keys(HOW_LABELS) as HandoverHow[]).filter((h) => (a.form === "nesting" ? h === "nest" || h === "other" : h !== "nest"));
  const hasVisits = buildCycle(a).some((d) => d.visit);
  return (
    <div className="stack">
      <Note>Podpowiedzi to przykłady. Wpisz dzień, godzinę i sposób, który pasuje Wam obojgu.</Note>
      {ts.length === 0 && <p>W tym układzie dziecko nie zmienia domu w cyklu. Wróć, jeśli chcesz to zmienić.</p>}
      {ts.map((t) => {
        const h = handoverFor(a, t);
        const id = `pp-h${t.day}`;
        return (
          <fieldset key={t.day} className="pp-fieldset">
            <legend className="field__label">{dayName(t.day)[0].toUpperCase() + dayName(t.day).slice(1)}: od {t.from === "A" ? A : B} do {t.to === "A" ? A : B}</legend>
            <div className="pp-handover">
              <div className="field"><label className="field__label" htmlFor={`${id}-t`}>Godzina</label><input id={`${id}-t`} type="time" className="input" value={h.time} onChange={(e) => upd(t, { time: e.target.value })} /></div>
              <div className="field"><label className="field__label" htmlFor={`${id}-m`}>Sposób</label>
                <select id={`${id}-m`} className="select" value={h.how} onChange={(e) => upd(t, { how: e.target.value as HandoverHow })}>
                  {hows.map((x) => <option key={x} value={x}>{HOW_LABELS[x]}</option>)}
                </select>
              </div>
              <div className="field"><label className="field__label" htmlFor={`${id}-p`}>Miejsce lub uwagi</label><input id={`${id}-p`} className="input" maxLength={80} value={h.place} placeholder="np. pod szkołą, parking przy ul. …" onChange={(e) => upd(t, { place: clean(e.target.value) })} autoComplete="off" /></div>
            </div>
            <p className="xsmall muted" style={{ margin: 0 }}>W planie: {handoverText(a, t)}</p>
          </fieldset>
        );
      })}
      {hasVisits && (
        <fieldset className="pp-fieldset">
          <legend className="field__label">Popołudnia bez noclegu</legend>
          <div className="grid grid--2">
            <div className="field"><label className="field__label" htmlFor="pp-vf">Od</label><input id="pp-vf" type="time" className="input" value={a.visitFrom} onChange={(e) => set({ visitFrom: e.target.value })} /></div>
            <div className="field"><label className="field__label" htmlFor="pp-vt">Do</label><input id="pp-vt" type="time" className="input" value={a.visitTo} onChange={(e) => set({ visitTo: e.target.value })} /></div>
          </div>
        </fieldset>
      )}
    </div>
  );
}

function HolidayEditor({ id, a, set }: { id: HolidayId; a: ParentingAnswers; set: Set }) {
  const def = HOLIDAYS.find((h) => h.id === id)!;
  const r = a.holidays[id];
  const { A, B } = names(a);
  const upd = (patch: Partial<typeof r>) => set({ holidays: { ...a.holidays, [id]: { ...r, ...patch } } });
  const y = new Date().getFullYear();
  const yEven = y % 2 === 0 ? y : y + 1;
  return (
    <fieldset className="pp-fieldset">
      <legend className="field__label">{def.label}</legend>
      <div className="pp-holiday">
        <div className="field"><label className="field__label" htmlFor={`pp-${id}-m`}>Zasada</label>
          <select id={`pp-${id}-m`} className="select" value={r.mode} onChange={(e) => upd({ mode: e.target.value as HolidayMode })}>
            {def.modes.map((m) => <option key={m} value={m}>{modeLabel(id, m)}</option>)}
          </select>
        </div>
        {needsParent(r.mode) && (
          <div className="field"><label className="field__label" htmlFor={`pp-${id}-p`}>{parentFieldLabel(id, r.mode)}</label>
            <select id={`pp-${id}-p`} className="select" value={r.even} onChange={(e) => upd({ even: e.target.value as Parent })}>
              <option value="A">{A}</option><option value="B">{B}</option>
            </select>
          </div>
        )}
        <div className="field"><label className="field__label" htmlFor={`pp-${id}-d`}>Godziny i szczegóły{r.mode === "other" ? "" : " (opcjonalnie)"}</label>
          <input id={`pp-${id}-d`} className="input" maxLength={160} value={r.details} placeholder={def.placeholder} onChange={(e) => upd({ details: clean(e.target.value) })} autoComplete="off" />
        </div>
      </div>
      {r.mode !== "tbd" && r.mode !== "fixed" && needsParent(r.mode) && (
        <p className="xsmall muted" style={{ margin: 0 }}>Np. {yEven}: {holidayYearText(id, r, yEven, A, B)}; {yEven + 1}: {holidayYearText(id, r, yEven + 1, A, B)}.</p>
      )}
    </fieldset>
  );
}

const holidayStep = (ids: HolidayId[]) => ({
  summary: (a: ParentingAnswers) => { const { A, B } = names(a); return ids.map((id) => `${HOLIDAYS.find((h) => h.id === id)!.label}: ${describeHoliday(id, a.holidays[id], A, B) ?? "do ustalenia"}`).join("; "); },
  render: (a: ParentingAnswers, set: Set) => (
    <div className="stack">
      <Note />
      {ids.map((id) => <HolidayEditor key={id} id={id} a={a} set={set} />)}
    </div>
  ),
});

const steps: WizardStep<ParentingAnswers>[] = [
  { id: "children", title: "Ile dzieci obejmuje plan?", help: "Nie pytamy o imiona ani inne dane dzieci. Nie są potrzebne.", valid: (a) => !!a.children, summary: sum("children"), render: single("children", "Liczba dzieci") },
  { id: "ages", title: "W jakim wieku są dzieci?", help: "Zaznacz wszystkie pasujące przedziały.", valid: (a) => a.ages.length > 0 || "Zaznacz co najmniej jeden przedział wieku.", summary: (a) => labelOf(O.ages, a.ages), render: (a, set) => <MultiChoice legend="Wiek dzieci" options={O.ages} value={a.ages} onChange={(v) => set({ ages: v })} columns={2} /> },
  { id: "distance", title: "Jak daleko od siebie będą mieszkać rodzice?", valid: (a) => !!a.distance, summary: sum("distance"), render: single("distance", "Odległość") },
  { id: "school", title: "Czy dziecko chodzi do żłobka, przedszkola lub szkoły?", help: "Od tego zależą podpowiedzi przekazań, np. odbiór ze szkoły.", valid: (a) => !!a.school, summary: sum("school"), render: single("school", "Placówka") },
  {
    id: "labels", title: "Jak opisać rodziców w planie?", optional: true,
    help: "Domyślnie „Rodzic A” i „Rodzic B”. Możesz wpisać np. „Mama” i „Tata”. Nie wpisuj imion dzieci.",
    summary: (a) => `${a.labelA} / ${a.labelB}`,
    valid: (a) => (a.labelA.trim() && a.labelB.trim() ? true : "Uzupełnij obie etykiety."),
    render: (a, set) => (
      <div className="grid grid--2">
        <div className="field"><label className="field__label" htmlFor="pp-la">Rodzic A</label><input id="pp-la" className="input" maxLength={20} value={a.labelA} onChange={(e) => set({ labelA: clean(e.target.value) })} autoComplete="off" /></div>
        <div className="field"><label className="field__label" htmlFor="pp-lb">Rodzic B</label><input id="pp-lb" className="input" maxLength={20} value={a.labelB} onChange={(e) => set({ labelB: clean(e.target.value) })} autoComplete="off" /></div>
      </div>
    ),
  },
  {
    id: "form", title: "Jak chcecie zorganizować opiekę?", help: "Nie rekomendujemy żadnej formy. Wybierz tę, którą chcesz przemyśleć lub omówić.",
    valid: (a) => !!a.form, summary: (a) => careFormText(a) ?? null,
    render: (a, set) => (
      <div className="stack">
        <SingleChoice legend="Forma opieki" options={O.form} value={a.form} onChange={(v) => set({ form: v as CareForm, handovers: {} })} />
        {a.form === "nesting" && <Alert tone="info" title="Gniazdowanie to zwykle rozwiązanie przejściowe"><p>Dziecko zostaje w swoim domu, a rodzice wprowadzają się do niego na zmianę. Pomaga przejść przez pierwsze miesiące po rozstaniu. Na dłużej bywa trudne: dwa mieszkania, wspólne koszty, mniej prywatności. Warto od razu ustalić, do kiedy trwa.</p></Alert>}
        {a.form === "flexible" && <Alert tone="info" title="Kiedy sprawdza się ustalanie na bieżąco?"><p>Gdy dobrze się dogadujecie i elastyczność służy dziecku, np. przy nastolatku z własnym planem dnia. Wtedy w porozumieniu można nie określać kontaktów szczegółowo. Ryzyko: gdy współpraca się pogorszy, nie ma jasnych zasad, do których można wrócić. Dlatego warto dopisać rytm zastępczy.</p></Alert>}
      </div>
    ),
  },
  {
    id: "nesting", title: "Gniazdowanie: na jak długo i na jakich zasadach?", when: (a) => a.form === "nesting",
    valid: (a) => !!a.nestingUntil || "Wybierz termin (możesz wybrać „Do ustalenia”).",
    summary: (a) => [labelOf(O.nestingUntil, a.nestingUntil), a.nestingUntil === "other" ? a.nestingUntilText : null].filter(Boolean).join(": "),
    render: (a, set) => (
      <div className="stack">
        <SingleChoice legend="Do kiedy?" hideLegend={false} options={O.nestingUntil} value={a.nestingUntil} onChange={(v) => set({ nestingUntil: v as ParentingAnswers["nestingUntil"] })} />
        {a.nestingUntil === "other" && <div className="field"><label className="field__label" htmlFor="pp-nu">Termin</label><input id="pp-nu" className="input" maxLength={80} value={a.nestingUntilText} placeholder="np. do 31 sierpnia, potem tydzień / tydzień" onChange={(e) => set({ nestingUntilText: clean(e.target.value) })} autoComplete="off" /></div>}
        <Note />
        <TextArea id="pp-nr" label="Zasady gniazdowania" value={a.nestingRules} onChange={(v) => set({ nestingRules: v })} hint="Np. gdzie mieszka rodzic poza domem, podział kosztów, prywatność, co po zakończeniu." />
      </div>
    ),
  },
  {
    id: "flexible", title: "Ustalanie na bieżąco: zasady i rytm zastępczy", when: (a) => a.form === "flexible",
    summary: (a) => (a.fallback ? `Rytm zastępczy: ${a.fallbackText || "do ustalenia"}` : "Bez rytmu zastępczego"),
    render: (a, set) => (
      <div className="stack">
        <Note />
        <TextArea id="pp-fr" label="Jak ustalacie kontakty" value={a.flexibleRules} onChange={(v) => set({ flexibleRules: v })} />
        <label className="choice choice--multi">
          <input type="checkbox" checked={a.fallback} onChange={(e) => set({ fallback: e.target.checked })} />
          <span className="choice__mark" aria-hidden="true" />
          <span className="choice__text"><span className="choice__label">Dopisz rytm zastępczy na wypadek braku porozumienia</span><span className="choice__desc">Obowiązuje tylko wtedy, gdy nie uda się Wam ustalić inaczej.</span></span>
        </label>
        {a.fallback && <TextArea id="pp-fb" label="Rytm zastępczy" value={a.fallbackText} onChange={(v) => set({ fallbackText: v })} rows={2} />}
      </div>
    ),
  },
  {
    id: "preset", title: "Wybierz układ na start", when: hasSchedule,
    help: "To przykłady, nie jedyne możliwości. W następnym kroku zmienisz każdy dzień. Wybranie układu ustawia siatkę od nowa.",
    valid: (a) => !!a.preset, summary: (a) => (a.preset ? PRESETS[a.preset].label : null),
    render: (a, set) => <SingleChoice legend="Układ na start" options={O.preset} value={a.preset} onChange={(v) => set({ preset: v as PresetId, ...presetGrid(v as PresetId), handovers: {} })} />,
  },
  {
    id: "grid", title: "Ułóż dwutygodniowy rytm", when: hasSchedule,
    summary: (a) => { const n = countNights(buildCycle(a)); const { A, B } = names(a); return `${A}: ${n.A}, ${B}: ${n.B} z 14`; },
    render: (a, set) => <GridEditor a={a} set={set} />,
  },
  {
    id: "handovers", title: "Przekazania: dzień, godzina, miejsce", when: hasSchedule,
    help: "Dokładne zapisy, np. „piątek 16:00, odbiór ze szkoły”, zapobiegają nieporozumieniom.",
    summary: (a) => transitions(a.grid).map((t) => handoverText(a, t)).join("; ") || "brak zmian",
    render: (a, set) => <HandoverEditor a={a} set={set} />,
  },
  { id: "holidays", title: "Święta", help: "Lata parzyste i nieparzyste pozwalają zamieniać się co roku.", ...holidayStep(["wigilia", "bn", "sylwester", "wielkanoc"]) },
  { id: "vacations", title: "Ferie, wakacje i dni wolne", ...holidayStep(["ferie", "wakacje", "dlugie-weekendy"]) },
  { id: "occasions", title: "Urodziny i ważne dni", ...holidayStep(["urodziny", "dni-rodzicow"]) },
  {
    id: "decisions", title: "Decyzje: bieżące, istotne i nagłe",
    help: "Codzienne sprawy to co innego niż szkoła czy leczenie. Warto rozdzielić je w porozumieniu.",
    summary: (a) => `Wspólnie: ${IMPORTANT.filter((x) => a.important.includes(x.id)).map((x) => x.label).join(", ") || "do ustalenia"}`,
    render: (a, set) => (
      <div className="stack">
        <Note />
        <TextArea id="pp-ev" label="Bieżące sprawy" value={a.everyday} onChange={(v) => set({ everyday: v })} />
        <MultiChoice legend="Istotne sprawy, które rozstrzygacie wspólnie" hideLegend={false} options={IMPORTANT.map((x) => ({ value: x.id, label: x.label[0].toUpperCase() + x.label.slice(1) }))} value={a.important} onChange={(v) => set({ important: v as ParentingAnswers["important"] })} />
        <div className="field"><label className="field__label" htmlFor="pp-io">Inne istotne sprawy (opcjonalnie)</label><input id="pp-io" className="input" maxLength={160} value={a.importantOther} onChange={(e) => set({ importantOther: clean(e.target.value) })} autoComplete="off" /></div>
        <TextArea id="pp-ur" label="Sytuacje nagłe" value={a.urgent} onChange={(v) => set({ urgent: v })} />
      </div>
    ),
  },
  {
    id: "calls", title: "Kontakt telefoniczny z drugim rodzicem",
    help: "Gdy kontakty nie są ograniczone, zwykle nie trzeba sztywnych zasad.",
    valid: (a) => !!a.calls, summary: (a) => callsText(a) ?? "do ustalenia",
    render: (a, set) => (
      <div className="stack">
        <SingleChoice legend="Kontakt telefoniczny" options={O.calls} value={a.calls} onChange={(v) => set({ calls: v as ParentingAnswers["calls"] })} />
        {a.calls === "fixed" && <div className="field"><label className="field__label" htmlFor="pp-ct">Jakie pory?</label><input id="pp-ct" className="input" maxLength={120} value={a.callsText} placeholder="np. wideo we wtorki i czwartki ok. 19:00" onChange={(e) => set({ callsText: clean(e.target.value) })} autoComplete="off" /></div>}
      </div>
    ),
  },
  {
    id: "other", title: "Inne ustalenia",
    summary: (a) => `${OTHER_TERMS.filter((t) => a.other[t.id].trim()).length} z ${OTHER_TERMS.length} uzupełnione`,
    render: (a, set) => (
      <div className="stack">
        <Note>To przykłady. Zmień je albo wyczyść pole, a punkt trafi na listę „do ustalenia”.</Note>
        {OTHER_TERMS.map((t) => <TextArea key={t.id} id={`pp-o-${t.id}`} label={t.label} value={a.other[t.id]} rows={2} onChange={(v) => set({ other: { ...a.other, [t.id]: v } })} />)}
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
  const { A, B } = names(answers);
  const nameOf = (p: Parent) => (p === "A" ? A : B);
  const sched = hasSchedule(answers);
  const nest = answers.form === "nesting";
  const ts = sched ? transitions(answers.grid) : [];
  const years = [now.getFullYear(), now.getFullYear() + 1];
  const yearRows = HOLIDAYS.map((h) => ({ h, cells: years.map((y) => holidayYearText(h.id, answers.holidays[h.id], y, A, B)) })).filter((r) => r.cells[0] && answers.holidays[r.h.id].mode !== "fixed");

  const complete = () => {
    setDone(true);
    track("tool_complete", { tool: TOOL });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const edit = (id: string) => { track("result_edit", { tool: TOOL }); setEditStep(id); setWizardKey((k) => k + 1); setDone(false); };
  const reset = () => { setAnswersState(defaultAnswers()); setDone(false); setEditStep(undefined); setWizardKey((k) => k + 1); setYm(null); };
  const shiftMonth = (d: number) => { const m = cur.m + d; setYm({ y: cur.y + Math.floor(m / 12), m: ((m % 12) + 12) % 12 }); };

  const report = (): Report => ({
    title: "Projekt porozumienia rodzicielskiego",
    intro: `Projekt do rozmowy, nie jest wiążącą umową. Przygotowano ${todayPL()}.${sched ? ` Cykl liczony od ${parseISO(cycleStart).toLocaleDateString("pl-PL", { timeZone: "UTC" })} (poniedziałek tygodnia 1).` : ""}`,
    sections: [...proposal, { heading: "Do przemyślenia (zależnie od wieku i sytuacji dzieci)", items: hints }],
  });

  if (!done) return <Wizard key={wizardKey} toolId={TOOL} steps={steps} answers={answers} setAnswers={(fn) => setAnswersState(fn)} onComplete={complete} startAt={editStep} finishLabel="Pokaż mój projekt" />;

  return (
    <div ref={resultRef} className="tool-frame" style={{ scrollMarginTop: 70 }}>
      <div className="result-head">
        <span className="eyebrow">Twój projekt do rozmowy</span>
        <h2 style={{ fontSize: "var(--fs-2xl)" }}>Projekt porozumienia rodzicielskiego</h2>
        <p style={{ marginBottom: 16 }}>Do omówienia z drugim rodzicem, także z pomocą mediatora. Nie jest wiążącą umową i nie przesądza, co jest najlepsze dla Waszej rodziny. Każdy zapis możesz zmienić.</p>
        <div className="kpis kpis--3">
          {sched ? (
            <>
              <div className="kpi"><span className="kpi__label">{nest ? "Dni z dzieckiem" : "Noce u"}: {A}</span><span className="kpi__value">{nights.A} / 14</span><span className="kpi__note">{nights.pctA}% cyklu</span></div>
              <div className="kpi"><span className="kpi__label">{nest ? "Dni z dzieckiem" : "Noce u"}: {B}</span><span className="kpi__value">{nights.B} / 14</span><span className="kpi__note">{nights.pctB}% cyklu</span></div>
            </>
          ) : (
            <div className="kpi" style={{ gridColumn: "span 2" }}><span className="kpi__label">Forma opieki</span><span className="kpi__value" style={{ fontSize: "var(--fs-lg)" }}>Ustalanie na bieżąco</span></div>
          )}
          <div className="kpi"><span className="kpi__label">Punkty do ustalenia</span><span className="kpi__value">{open.length}</span></div>
        </div>
      </div>

      {answers.safety === "unsafe" && (
        <div className="result-section">
          <Alert tone="safety" title="Twoje bezpieczeństwo jest najważniejsze">
            <p>Jeśli kontakt z drugim rodzicem jest dla Ciebie niebezpieczny, nie musisz omawiać tego projektu bezpośrednio ani uczestniczyć we wspólnych negocjacjach. Warto skorzystać z indywidualnej pomocy prawnej lub psychologicznej. W sytuacji zagrożenia dzwoń pod <strong>112</strong>. Wsparcie dla osób doznających przemocy domowej: <strong>Niebieska Linia 800 120 002</strong>.</p>
          </Alert>
        </div>
      )}
      {answers.form === "flexible" && answers.safety && answers.safety !== "ok" && (
        <div className="result-section">
          <Alert tone="info" title="Przy trudnej komunikacji warto rozważyć stały harmonogram">
            <p>Ustalanie kontaktów na bieżąco wymaga częstych rozmów. Gdy rozmowy są trudne, jasny harmonogram zwykle oznacza mniej sporów.</p>
          </Alert>
        </div>
      )}
      {nest && (
        <div className="result-section">
          <Alert tone="info" title="Gniazdowanie to rozwiązanie przejściowe"><p>Warto od razu ustalić, jaki układ obowiązuje po jego zakończeniu.</p></Alert>
        </div>
      )}

      <div className="result-section"><AnswersSummary steps={steps} answers={answers} onEdit={edit} /></div>

      {sched && (
        <div className="result-section">
          <h3><Icon name="calendar" width={22} /> Tydzień po tygodniu</h3>
          <WeekView a={answers} />
          {ts.length > 0 && (
            <>
              <h4 style={{ margin: "16px 0 6px" }}>Przekazania</h4>
              <ul className="list-dot">{ts.map((t) => <li key={t.day}>{handoverText(answers, t)}</li>)}</ul>
            </>
          )}
        </div>
      )}

      {sched && (
        <div className="result-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: 10 }}><Icon name="calendar" width={22} /> Widok miesiąca</h3>
            <div className="btn-row no-print" style={{ gap: 6 }}>
              <button type="button" className="btn btn--ghost btn--sm pp-iconbtn" onClick={() => shiftMonth(-1)} aria-label="Poprzedni miesiąc"><Icon name="arrowLeft" width={16} /></button>
              <span style={{ fontWeight: 600, minWidth: 130, textAlign: "center" }} aria-live="polite">{MONTHS[cur.m]} {cur.y}</span>
              <button type="button" className="btn btn--ghost btn--sm pp-iconbtn" onClick={() => shiftMonth(1)} aria-label="Następny miesiąc"><Icon name="arrowRight" width={16} /></button>
            </div>
          </div>
          <p className="print-only" style={{ fontWeight: 600 }}>{MONTHS[cur.m]} {cur.y}</p>
          <div className="field no-print" style={{ maxWidth: 280, marginTop: 12 }}>
            <label className="field__label" htmlFor="pp-start">Początek cyklu (tydzień 1)</label>
            <input id="pp-start" type="date" className="input" value={cycleStart} onChange={(e) => e.target.value && setAnswersState((a) => ({ ...a, cycleStart: toISO(mondayOf(parseISO(e.target.value))) }))} aria-describedby="pp-start-h" />
            <span className="field__hint" id="pp-start-h">Wybrana data zostanie przesunięta na poniedziałek.</span>
          </div>
          <div className="month pp-month" style={{ marginTop: 8 }}>
            {DAYS_SHORT.map((d) => <div key={d} className="month__h">{d}</div>)}
            {month.map((c, i) => c ? (
              <div key={i} className={`month__d ${c.night === "A" ? "parent-a" : "parent-b"}`} title={`${c.day}: ${nest ? "z dzieckiem" : "noc u"} ${nameOf(c.night)}`}>
                {c.day}<span className="pp-mwho" aria-hidden="true">{nameOf(c.night).slice(0, 1)}</span>{c.visit && <span className="pp-dot" aria-hidden="true" />}
              </div>
            ) : <div key={i} className="month__d month__d--empty" />)}
          </div>
          <p className="small muted" style={{ marginTop: 10 }}>W tym miesiącu: {A}: {mN.A} {nest ? "dni" : "nocy"}, {B}: {mN.B} {nest ? "dni" : "nocy"}. Litera w dniu to pierwsza litera nazwy rodzica. Święta i wakacje mają pierwszeństwo przed rytmem tygodniowym.</p>
        </div>
      )}

      {yearRows.length > 0 && (
        <div className="result-section">
          <h3><Icon name="calendar" width={22} /> Święta i wakacje w najbliższych latach</h3>
          <div tabIndex={0} role="region" aria-label="Święta w kolejnych latach. Przewiń w poziomie, jeśli tabela nie mieści się na ekranie" className="table-wrap">
            <table className="table">
              <thead><tr><th scope="col">Okres</th>{years.map((y) => <th key={y} scope="col">{y}</th>)}</tr></thead>
              <tbody>{yearRows.map(({ h, cells }) => <tr key={h.id}><th scope="row">{h.label}</th>{cells.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </div>
      )}

      <div className="result-section">
        <h3><Icon name="checklist" width={22} /> Podsumowanie ustaleń</h3>
        <div tabIndex={0} role="region" aria-label="Podsumowanie ustaleń. Przewiń w poziomie, jeśli tabela nie mieści się na ekranie" className="table-wrap">
          <table className="table">
            <tbody>
              {summary.map((s) => (
                <tr key={s.label}><th scope="row" style={{ width: "34%" }}>{s.label}</th><td>{s.open ? <span className="tag tag--warn">do ustalenia</span> : s.value}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="result-section">
        <h3><Icon name="alert" width={22} /> Punkty do ustalenia</h3>
        {open.length ? <ul className="list-dot">{open.map((p) => <li key={p}>{p}</li>)}</ul> : <p>Wszystkie punkty mają wstępny zapis.</p>}
      </div>

      <div className="result-section">
        <h3><Icon name="heart" width={22} /> Do przemyślenia</h3>
        <ul className="list-check">{hints.map((h) => <li key={h}>{h}</li>)}</ul>
      </div>

      <div className="result-section">
        <h3><Icon name="doc" width={22} /> Projekt porozumienia rodzicielskiego</h3>
        <div className="card card--sand pp-doc">
          <p className="tag tag--gold" style={{ marginBottom: 12 }}>Projekt do rozmowy, nie jest wiążącą umową</p>
          {proposal.map((s) => (
            <div key={s.heading} style={{ marginBottom: 14 }}>
              <h4 style={{ marginBottom: 6 }}>{s.heading}</h4>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: "var(--fs-sm)" }}>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          ))}
          <p className="xsmall muted" style={{ margin: 0 }}>W sprawie rozwodowej sąd uwzględnia pisemne porozumienie rodzicielskie, jeśli jest zgodne z dobrem dziecka. Przed podpisaniem warto omówić treść z mediatorem lub prawnikiem.</p>
        </div>
      </div>

      <div className="result-section">
        <ResultActions toolId={TOOL} report={report} filename="projekt-porozumienia-rodzicielskiego" onReset={reset} />
      </div>

      <div className="result-section" style={{ background: "var(--cream)" }}>
        <NextStep
          toolId={TOOL}
          intro="Porozumienie rodzicielskie to często najważniejsza część ustaleń przed rozwodem."
          offers={answers.safety === "unsafe" ? [
            { key: "konsultacja", cta: "Poproś o indywidualną rozmowę", why: "Porozmawiamy o Twojej sytuacji indywidualnie, bez wspólnych spotkań z drugim rodzicem." },
            { key: "materialy", href: "/materialy/jak-powiedziec-dzieciom", cta: "Jak rozmawiać z dziećmi o rozstaniu", why: "Przewodnik z przykładowymi sformułowaniami dopasowanymi do wieku dziecka." },
          ] : [
            { key: "plan-rozwodu", cta: "Sprawdź, jakie ustalenia dotyczące dzieci można przygotować przed rozwodem", why: "Bezpłatny Plan Rozwodu pokazuje, jak przygotować porozumienie rodzicielskie i pozostałe ustalenia przed pozwem." },
            { key: "mediacja", cta: "Jak może pomóc mediacja rodzinna", why: "Mediacja jest dobrowolna. Mediator pomaga rodzicom dopracować porozumienie, gdy rozmowy we dwoje są trudne." },
          ]}
        />
      </div>
    </div>
  );
}
