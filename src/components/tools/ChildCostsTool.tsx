"use client";
import "./calculator.css";
import { useMemo, useRef, useState } from "react";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { Donut } from "@/components/charts/Donut";
import { BarCompare } from "@/components/charts/BarCompare";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { AmountInput } from "./AmountInput";
import { formatPLN, todayPL } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Report } from "@/lib/report";
import { FREQUENCIES, monthlyEquivalent, oneOffAmount, uid, type Frequency } from "@/lib/tools/expenses";
import {
  type AgeBand, type ChildCategory, type ChildInfo, type ChildLine, type ChildScenario,
  AGE_BANDS, CHILD_CATEGORIES, CHILD_CATEGORY_LABELS, MAX_CHILDREN,
  ageLabel, childBreakdown, childDisplayName, compareScenarios, defaultChildName, linesForChild, scenarioTotals, suggestedLines,
} from "@/lib/tools/childCosts";

const TOOL = "koszty-utrzymania-dziecka";
const MAX_SCENARIOS = 3;
const SCENARIO_COLORS = ["var(--green-700)"];

const freqLabel = (f: Frequency) => FREQUENCIES.find((x) => x.value === f)!.label;
const mkLine = () => uid("c");

function initialState() {
  const child: ChildInfo = { id: uid("k"), name: defaultChildName(0) };
  const scenario: ChildScenario = { id: uid("s"), name: "Obecnie", lines: suggestedLines(undefined, mkLine, child.id) };
  return { child, scenario };
}

export function ChildCostsTool() {
  const [init] = useState(initialState);
  const [children, setChildren] = useState<ChildInfo[]>([init.child]);
  const [scenarios, setScenarios] = useState<ChildScenario[]>([init.scenario]);
  const [activeId, setActiveId] = useState(init.scenario.id);
  const [activeChildId, setActiveChildId] = useState(init.child.id);
  const [shown, setShown] = useState(false);
  const [newCat, setNewCat] = useState<ChildCategory>("other");
  const [status, setStatus] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const active = scenarios.find((s) => s.id === activeId) ?? scenarios[0];
  const activeChildIndex = Math.max(0, children.findIndex((c) => c.id === activeChildId));
  const activeChild = children[activeChildIndex];
  const totals = useMemo(() => scenarioTotals(active), [active]);
  const perChild = useMemo(() => childBreakdown(active, children), [active, children]);
  const comparison = useMemo(() => compareScenarios(scenarios), [scenarios]);
  const comparisonPerChild = useMemo(() => scenarios.map((s) => childBreakdown(s, children)), [scenarios, children]);
  const hasData = totals.monthly + totals.oneOff > 0;
  const many = children.length > 1;
  const hasAdult = children.some((c) => c.age === "18+");

  const touch = () => { if (!started.current) { started.current = true; track("tool_start", { tool: TOOL }); } };
  const patchActive = (fn: (lines: ChildLine[]) => ChildLine[]) => {
    touch();
    setScenarios((list) => list.map((s) => (s.id === active.id ? { ...s, lines: fn(s.lines) } : s)));
  };
  const updateLine = (id: string, patch: Partial<ChildLine>) => patchActive((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const removeLine = (id: string) => patchActive((ls) => ls.filter((l) => l.id !== id));
  const addLine = (category: ChildCategory) => {
    const id = uid("c");
    patchActive((ls) => [...ls, { id, category, label: "", freq: "monthly", custom: true, childId: activeChild.id }]);
    requestAnimationFrame(() => document.getElementById(`lbl-${id}`)?.focus());
  };

  /* --- Dzieci --- */
  const addChild = () => {
    if (children.length >= MAX_CHILDREN) return;
    touch();
    const child: ChildInfo = { id: uid("k"), name: defaultChildName(children.length) };
    setChildren((list) => [...list, child]);
    setScenarios((list) => list.map((s) => ({ ...s, lines: [...s.lines, ...suggestedLines(undefined, mkLine, child.id)] })));
    setActiveChildId(child.id);
    setStatus(`Dodano: ${child.name}. Wybierz wiek, aby dopasować listę wydatków.`);
    requestAnimationFrame(() => document.getElementById(`child-name-${child.id}`)?.focus());
  };
  const removeChild = (id: string) => {
    if (children.length <= 1) return;
    const idx = children.findIndex((c) => c.id === id);
    const name = childDisplayName(children[idx], idx);
    const rest = children.filter((c) => c.id !== id);
    setChildren(rest);
    setScenarios((list) => list.map((s) => ({ ...s, lines: s.lines.filter((l) => l.childId !== id) })));
    if (activeChildId === id) setActiveChildId(rest[0].id);
    setStatus(`Usunięto: ${name} wraz z wydatkami.`);
    requestAnimationFrame(() => document.getElementById("add-child")?.focus());
  };
  const renameChild = (id: string, name: string) => setChildren((list) => list.map((c) => (c.id === id ? { ...c, name: name.slice(0, 30) } : c)));
  const applyAge = (id: string, age: AgeBand) => {
    touch();
    setChildren((list) => list.map((c) => (c.id === id ? { ...c, age } : c)));
    // Lista typowych pozycji zmienia się tylko tam, gdzie dla tego dziecka nie wpisano jeszcze kwot.
    setScenarios((list) => list.map((s) => {
      const mine = linesForChild(s, id);
      if (mine.some((l) => l.amount)) return s;
      return { ...s, lines: [...s.lines.filter((l) => l.childId !== id), ...suggestedLines(age, mkLine, id)] };
    }));
  };
  const addTypicalForAge = (child: ChildInfo) => patchActive((ls) => [
    ...ls,
    ...suggestedLines(child.age, mkLine, child.id).filter((n) => !ls.some((l) => l.childId === child.id && l.label === n.label)),
  ]);

  /* --- Scenariusze --- */
  const duplicate = () => {
    if (scenarios.length >= MAX_SCENARIOS) return;
    const copy: ChildScenario = { id: uid("s"), name: `Scenariusz ${scenarios.length + 1}`, lines: active.lines.map((l) => ({ ...l, id: uid("c") })) };
    setScenarios((l) => [...l, copy]);
    setActiveId(copy.id);
  };
  const removeScenario = (id: string) => {
    if (scenarios.length <= 1) return;
    const rest = scenarios.filter((s) => s.id !== id);
    setScenarios(rest);
    setActiveId(rest[0].id);
  };
  const rename = (name: string) => setScenarios((l) => l.map((s) => (s.id === active.id ? { ...s, name: name.slice(0, 40) } : s)));
  const reset = () => {
    const { child, scenario } = initialState();
    setChildren([child]); setScenarios([scenario]); setActiveId(scenario.id); setActiveChildId(child.id); setShown(false); setStatus("");
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const show = () => {
    if (!shown) track("tool_complete", { tool: TOOL });
    setShown(true);
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const childSummary = (c: ChildInfo, i: number) => `${childDisplayName(c, i)}${c.age ? ` (${ageLabel(c.age)})` : ""}`;
  const whoLabel = many ? `${children.length} dzieci: ${children.map(childSummary).join(", ")}` : childSummary(children[0], 0);

  const report = (): Report => ({
    title: "Koszty utrzymania dzieci: moje zestawienie",
    intro: `Zestawienie z ${todayPL()} (${whoLabel}). To zestawienie wydatków, a nie wyliczenie alimentów.`,
    sections: [
      ...comparison.totals.map((t, i) => ({
        heading: `${scenarios[i].name}: razem ${formatPLN(t.monthly)} / mies., ${formatPLN(t.yearly)} / rok`,
        items: [
          ...(many ? comparisonPerChild[i].map((b) => `${childSummary(b.child, b.index)}: ${formatPLN(b.totals.monthly)} / mies.${b.totals.oneOff ? ` + ${formatPLN(b.totals.oneOff)} jednorazowo` : ""}`) : []),
          ...t.byCategory.filter((c) => c.monthly > 0).map((c) => `${c.label}: ${formatPLN(c.monthly)} / mies. (${formatPLN(c.yearly)} / rok)`),
          ...(t.oneOff ? [`Wydatki jednorazowe: ${formatPLN(t.oneOff)}`] : []),
        ],
      })),
      ...perChild.map((b) => ({
        heading: `${childSummary(b.child, b.index)}: lista wydatków (${active.name})`,
        items: [
          `Razem: ${formatPLN(b.totals.monthly)} / mies., ${formatPLN(b.totals.yearlyWithOneOff)} / rok z wydatkami jednorazowymi`,
          ...linesForChild(active, b.child.id).filter((l) => l.amount).map((l) => `${CHILD_CATEGORY_LABELS[l.category]}, ${l.label || "pozycja"}: ${formatPLN(l.amount)} ${freqLabel(l.freq)}`),
        ],
      })),
      { heading: "Ważne", items: [
        "To nie jest kalkulator alimentów. Zakres alimentów zależy od usprawiedliwionych potrzeb dziecka oraz możliwości zarobkowych i majątkowych rodziców. W razie sporu decyduje sąd.",
        ...(hasAdult ? ["Pełnoletnie dziecko, które się uczy, występuje o alimenty we własnym imieniu."] : []),
      ] },
    ],
  });

  const childLines = linesForChild(active, activeChild.id);
  const grouped = CHILD_CATEGORIES.map((c) => ({ c, lines: childLines.filter((l) => l.category === c) })).filter((g) => g.lines.length);
  const activeChildName = childDisplayName(activeChild, activeChildIndex);

  return (
    <div>
      <div className="tool-frame" ref={formRef}>
        <div className="tool-frame__head">
          <span><strong>Kalkulator kosztów</strong></span>
          <span className="muted small"><Icon name="lock" style={{ width: 14, height: 14, display: "inline", verticalAlign: "-2px" }} /> Bez danych identyfikujących dziecko</span>
        </div>
        <div className="tool-frame__body">
          <h3 className="step-title" style={{ marginTop: 0 }}>Dzieci w zestawieniu</h3>
          <p className="step-help">Każde dziecko ma własny wiek i własną listę wydatków. Wiek dopasowuje typowe pozycje, a kwoty wpisujesz sam(a). Nie pytamy o imiona ani daty urodzenia.</p>

          <ul className="stack" style={{ listStyle: "none", padding: 0, margin: 0 }} aria-label="Lista dzieci">
            {children.map((c, i) => {
              const name = childDisplayName(c, i);
              const hasAmounts = scenarios.some((s) => linesForChild(s, c.id).some((l) => l.amount));
              return (
                <li key={c.id} className="card calc-cat" style={{ marginBottom: 0 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                    <div className="field" style={{ flex: 1, marginBottom: 8 }}>
                      <label className="field__label" htmlFor={`child-name-${c.id}`}>Nazwa w zestawieniu</label>
                      <input id={`child-name-${c.id}`} className="input" value={c.name} maxLength={30} placeholder={defaultChildName(i)} onChange={(e) => renameChild(c.id, e.target.value)} aria-describedby="child-name-hint" />
                    </div>
                    {many && (
                      <button type="button" className="btn btn--ghost btn--sm" style={{ marginBottom: 8 }} onClick={() => removeChild(c.id)} aria-label={`Usuń: ${name} wraz z wydatkami`}>
                        <Icon name="trash" width={16} /> <span className="visually-hidden">Usuń</span>
                      </button>
                    )}
                  </div>
                  <div className="field" style={{ marginBottom: 0 }}>
                    <span className="field__label" id={`age-l-${c.id}`}>Wiek: {name}</span>
                    <div className="segmented" role="group" aria-labelledby={`age-l-${c.id}`}>
                      {AGE_BANDS.map((a) => <button key={a.value} type="button" aria-pressed={c.age === a.value} onClick={() => applyAge(c.id, a.value)}>{a.label}</button>)}
                    </div>
                    {c.age && hasAmounts && (
                      <button type="button" className="btn btn--link btn--sm" onClick={() => addTypicalForAge(c)}>Dodaj brakujące typowe pozycje dla tego wieku</button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <p id="child-name-hint" className="xsmall muted" style={{ marginTop: 6 }}>Np. „Dziecko 1”, „Starsze”, „Młodsze”.</p>
          {children.length < MAX_CHILDREN ? (
            <button id="add-child" type="button" className="btn btn--ghost btn--sm" onClick={addChild}><Icon name="plus" width={16} /> Dodaj dziecko</button>
          ) : <p className="xsmall muted">Możesz dodać maksymalnie {MAX_CHILDREN} dzieci.</p>}
          <p className="visually-hidden" role="status" aria-live="polite">{status}</p>

          <div className="calc-tabs" style={{ margin: "24px 0 12px" }}>
            <div className="segmented" role="tablist" aria-label="Scenariusze">
              {scenarios.map((s) => (
                <button key={s.id} type="button" role="tab" aria-selected={s.id === active.id} onClick={() => setActiveId(s.id)}>{s.name || "Bez nazwy"}</button>
              ))}
            </div>
            {scenarios.length < MAX_SCENARIOS && (
              <button type="button" className="btn btn--ghost btn--sm" onClick={duplicate}><Icon name="plus" width={16} /> Kopiuj jako nowy scenariusz</button>
            )}
          </div>
          <div className="field" style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <label className="field__label" htmlFor="sc-name">Nazwa scenariusza</label>
              <input id="sc-name" className="input" value={active.name} maxLength={40} onChange={(e) => rename(e.target.value)} />
            </div>
            {scenarios.length > 1 && <button type="button" className="btn btn--ghost btn--sm" onClick={() => removeScenario(active.id)} aria-label={`Usuń scenariusz ${active.name}`}><Icon name="trash" width={16} /></button>}
          </div>
          {scenarios.length > 1 && <p className="xsmall muted">Scenariusze porównasz w wyniku, np. obecne koszty i koszty po zmianie szkoły.</p>}

          {many && (
            <div className="field" style={{ marginTop: 16 }}>
              <span className="field__label" id="edit-child-l">Wydatki dla</span>
              <div className="segmented" role="group" aria-labelledby="edit-child-l">
                {perChild.map((b) => (
                  <button key={b.child.id} type="button" aria-pressed={b.child.id === activeChild.id} aria-controls="child-expenses" onClick={() => setActiveChildId(b.child.id)}>
                    {b.name} <span className="xsmall" style={{ opacity: 0.8 }}>· {formatPLN(b.totals.monthly)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div id="child-expenses" role="region" aria-labelledby="child-expenses-h">
            <h4 id="child-expenses-h" style={{ margin: "16px 0 8px" }}>
              Wydatki: {activeChildName}{activeChild.age ? `, ${ageLabel(activeChild.age)}` : ""}
            </h4>
            {grouped.length === 0 && <p className="small muted">Brak pozycji. Dodaj wydatek poniżej.</p>}
            {grouped.map(({ c, lines }) => {
              const sum = lines.reduce((s, l) => s + monthlyEquivalent(l.amount, l.freq), 0);
              const once = lines.reduce((s, l) => s + oneOffAmount(l.amount, l.freq), 0);
              return (
                <section key={c} className="card calc-cat" aria-labelledby={`cc-${c}`}>
                  <div className="calc-cat__head">
                    <h5 id={`cc-${c}`} style={{ margin: 0, fontSize: "var(--fs-md)" }}>{CHILD_CATEGORY_LABELS[c]}</h5>
                    <span className="calc-cat__sum">{formatPLN(sum)} / mies.{once ? ` + ${formatPLN(once)} jednor.` : ""}</span>
                  </div>
                  <div className="calc-colheads" aria-hidden="true"><div>Pozycja</div><div><span>Częstotliwość</span><span>Kwota</span></div><div /></div>
                  {lines.map((l) => (
                    <div key={l.id} className="calc-row">
                      <div className="calc-row__label">
                        {l.custom ? <input id={`lbl-${l.id}`} className="input" placeholder="Nazwa wydatku" aria-label={`Nazwa wydatku (${activeChildName})`} value={l.label} maxLength={60} onChange={(e) => updateLine(l.id, { label: e.target.value })} /> : l.label}
                      </div>
                      <div className="calc-row__inputs">
                        <div>
                          <label htmlFor={`f-${l.id}`}>Częstotliwość</label>
                          <select id={`f-${l.id}`} className="select" value={l.freq} onChange={(e) => updateLine(l.id, { freq: e.target.value as Frequency })} aria-label={`Częstotliwość: ${l.label || "wydatek"} (${activeChildName})`}>
                            {FREQUENCIES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label>Kwota</label>
                          <AmountInput label={`Kwota: ${l.label || "wydatek"} (${activeChildName})`} value={l.amount} onChange={(v) => updateLine(l.id, { amount: v })} />
                        </div>
                      </div>
                      <button type="button" className="calc-row__remove" onClick={() => removeLine(l.id)} aria-label={`Usuń: ${l.label || "nowa pozycja"} (${activeChildName})`}><Icon name="x" width={18} /></button>
                    </div>
                  ))}
                  <div className="calc-add"><button type="button" className="btn btn--link btn--sm" onClick={() => addLine(c)}><Icon name="plus" width={16} /> Dodaj wydatek</button></div>
                </section>
              );
            })}

            <div className="card card--sand calc-cat">
              <label className="field__label" htmlFor="new-cat">Dodaj wydatek w innej kategorii ({activeChildName})</label>
              <div className="calc-add">
                <select id="new-cat" className="select" style={{ flex: 1, minWidth: 180 }} value={newCat} onChange={(e) => setNewCat(e.target.value as ChildCategory)}>
                  {CHILD_CATEGORIES.map((c) => <option key={c} value={c}>{CHILD_CATEGORY_LABELS[c]}</option>)}
                </select>
                <button type="button" className="btn btn--ghost btn--sm" onClick={() => addLine(newCat)}><Icon name="plus" width={16} /> Dodaj</button>
              </div>
            </div>
          </div>

          <div className="calc-sticky">
            <div>
              <span className="xsmall muted">{many ? `${active.name}: razem ${children.length} dzieci` : `${active.name}: miesięcznie`}</span>
              <div className="calc-sticky__val">{formatPLN(totals.monthly)}</div>
            </div>
            <button type="button" className="btn btn--gold" onClick={show} disabled={!hasData} aria-disabled={!hasData}>{shown ? "Przejdź do wyniku" : "Pokaż zestawienie"} <Icon name="arrowRight" width={18} /></button>
          </div>
          {!hasData && <p className="xsmall muted" style={{ marginTop: 8 }}>Wpisz co najmniej jedną kwotę, aby zobaczyć zestawienie.</p>}
        </div>
      </div>

      {shown && hasData && (
        <div ref={resultRef} className="tool-frame mt-lg calc-result" style={{ scrollMarginTop: 70 }} aria-live="polite">
          <div className="result-head">
            <span className="eyebrow">Twoje zestawienie · {whoLabel}</span>
            <h2 style={{ fontSize: "var(--fs-2xl)" }}>{many ? "Łącznie miesięcznie" : "Miesięczny koszt utrzymania"}: {formatPLN(totals.monthly)}</h2>
            <p>Scenariusz „{active.name}”. Wydatki nieregularne przeliczyliśmy na kwotę miesięczną.</p>
            <div className="kpis kpis--3">
              <div className="kpi"><span className="kpi__label">Miesięcznie</span><span className="kpi__value">{formatPLN(totals.monthly)}</span></div>
              <div className="kpi"><span className="kpi__label">Rocznie</span><span className="kpi__value">{formatPLN(totals.yearly)}</span><span className="kpi__note">bez wydatków jednorazowych</span></div>
              <div className="kpi"><span className="kpi__label">Jednorazowo</span><span className="kpi__value">{formatPLN(totals.oneOff)}</span><span className="kpi__note">rok łącznie: {formatPLN(totals.yearlyWithOneOff)}</span></div>
            </div>
          </div>

          <div className="result-section" style={{ paddingBottom: 0, borderTop: 0 }}>
            <Alert tone="warn" title="To nie jest kalkulator alimentów">
              <p>Zestawienie pokazuje wpisane przez Ciebie wydatki. Zakres alimentów zależy od <strong>usprawiedliwionych potrzeb dziecka</strong> oraz <strong>możliwości zarobkowych i majątkowych rodziców</strong>. Liczą się też osobiste starania rodzica o wychowanie i utrzymanie dziecka. Niektóre świadczenia, np. 800+, nie wpływają na zakres alimentów. W razie sporu decyduje sąd.</p>
              {hasAdult && <p>Pełnoletnie dziecko, które się uczy, występuje o alimenty we własnym imieniu.</p>}
            </Alert>
          </div>

          {many && (
            <div className="result-section">
              <h3><Icon name="user" width={22} /> Koszty każdego dziecka</h3>
              <div tabIndex={0} role="region" aria-label="Koszty każdego dziecka. Tabelę można przewinąć w poziomie." className="table-wrap">
                <table className="table">
                  <thead><tr><th scope="col">Dziecko</th><th className="num" scope="col">Mies.</th><th className="num" scope="col">Rocznie</th><th className="num" scope="col">Jednorazowo</th></tr></thead>
                  <tbody>
                    {perChild.map((b) => (
                      <tr key={b.child.id}>
                        <th scope="row">{b.name}{b.child.age && <span className="xsmall muted" style={{ display: "block", fontWeight: 400 }}>{ageLabel(b.child.age)}</span>}</th>
                        <td className="num">{formatPLN(b.totals.monthly)}</td>
                        <td className="num">{formatPLN(b.totals.yearly)}</td>
                        <td className="num">{formatPLN(b.totals.oneOff)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot><tr><th scope="row">Razem</th><td className="num">{formatPLN(totals.monthly)}</td><td className="num">{formatPLN(totals.yearly)}</td><td className="num">{formatPLN(totals.oneOff)}</td></tr></tfoot>
                </table>
              </div>
            </div>
          )}

          <div className="result-section">
            <h3><Icon name="coins" width={22} /> Podział na kategorie (miesięcznie{many ? ", wszystkie dzieci" : ""})</h3>
            <Donut
              title="Podział kosztów na kategorie"
              centerValue={formatPLN(totals.monthly)}
              centerLabel="miesięcznie"
              slices={totals.byCategory.map((c) => ({ label: c.label, value: c.monthly, color: c.color }))}
            />
          </div>

          <div className="result-section">
            <h3><Icon name="doc" width={22} /> Lista wydatków</h3>
            {perChild.map((b) => {
              const rows = linesForChild(active, b.child.id).filter((l) => l.amount);
              if (!rows.length) return many ? <p key={b.child.id} className="small muted">{b.name}: brak wpisanych kwot.</p> : null;
              return (
                <div key={b.child.id} style={{ marginBottom: 16 }}>
                  {many && <h4 style={{ margin: "0 0 6px" }}>{b.name}{b.child.age ? `, ${ageLabel(b.child.age)}` : ""}</h4>}
                  <div tabIndex={0} role="region" aria-label={`Wydatki: ${b.name}. Tabelę można przewinąć w poziomie.`} className="table-wrap">
                    <table className="table">
                      <thead><tr><th scope="col">Wydatek</th><th className="num" scope="col">Mies.</th><th className="num" scope="col">Rocznie</th></tr></thead>
                      <tbody>
                        {rows.map((l) => (
                          <tr key={l.id}>
                            <th scope="row" style={{ fontWeight: 500 }}>{l.label || "Pozycja"}<span className="xsmall muted" style={{ display: "block" }}>{formatPLN(l.amount)} {freqLabel(l.freq)} · {CHILD_CATEGORY_LABELS[l.category]}</span></th>
                            <td className="num">{l.freq === "once" ? <span aria-label="nie dotyczy">–</span> : formatPLN(monthlyEquivalent(l.amount, l.freq))}</td>
                            <td className="num">{l.freq === "once" ? `${formatPLN(l.amount)}*` : formatPLN(monthlyEquivalent(l.amount, l.freq) * 12)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot><tr><th scope="row">Razem{many ? `: ${b.name}` : ""}</th><td className="num">{formatPLN(b.totals.monthly)}</td><td className="num">{formatPLN(b.totals.yearlyWithOneOff)}</td></tr></tfoot>
                    </table>
                  </div>
                </div>
              );
            })}
            {totals.oneOff > 0 && <p className="xsmall muted" style={{ marginTop: 6 }}>* wydatek jednorazowy, doliczony tylko do sumy rocznej.</p>}
          </div>

          {scenarios.length > 1 && (
            <div className="result-section">
              <h3><Icon name="split" width={22} /> Porównanie scenariuszy</h3>
              <BarCompare
                title="Miesięczny koszt w scenariuszach"
                series={[{ key: "m", label: "Koszt miesięczny", color: SCENARIO_COLORS[0] }]}
                groups={scenarios.map((s, i) => ({ label: s.name || `Scenariusz ${i + 1}`, values: { m: comparison.totals[i].monthly } }))}
                height={200}
              />
              <div tabIndex={0} role="region" aria-label="Porównanie scenariuszy. Tabelę można przewinąć w poziomie." className="table-wrap mt">
                <table className="table">
                  <thead><tr><th scope="col">Miesięcznie</th>{scenarios.map((s) => <th key={s.id} className="num" scope="col">{s.name}</th>)}<th className="num" scope="col">Różnica</th></tr></thead>
                  <tbody>
                    {comparison.rows.map((r) => (
                      <tr key={r.category}><th scope="row">{r.label}</th>{r.values.map((v, i) => <td key={i} className="num">{formatPLN(v)}</td>)}<td className={`num ${r.delta > 0 ? "num-neg" : r.delta < 0 ? "num-pos" : ""}`}>{r.delta > 0 ? "+" : ""}{formatPLN(r.delta)}</td></tr>
                    ))}
                  </tbody>
                  {many && (
                    <tbody>
                      {children.map((c, ci) => {
                        const vals = comparisonPerChild.map((list) => list[ci].totals.monthly);
                        const d = vals[vals.length - 1] - vals[0];
                        return (
                          <tr key={c.id}><th scope="row">Razem: {childDisplayName(c, ci)}</th>{vals.map((v, i) => <td key={i} className="num">{formatPLN(v)}</td>)}<td className={`num ${d > 0 ? "num-neg" : d < 0 ? "num-pos" : ""}`}>{d > 0 ? "+" : ""}{formatPLN(d)}</td></tr>
                        );
                      })}
                    </tbody>
                  )}
                  <tfoot>
                    <tr><th scope="row">Wszystko, miesięcznie</th>{comparison.totals.map((t, i) => <td key={i} className="num">{formatPLN(t.monthly)}</td>)}<td className="num">{formatPLN(comparison.totals[comparison.totals.length - 1].monthly - comparison.totals[0].monthly)}</td></tr>
                    <tr><th scope="row">Wszystko, rocznie</th>{comparison.totals.map((t, i) => <td key={i} className="num">{formatPLN(t.yearly)}</td>)}<td className="num">{formatPLN(comparison.totals[comparison.totals.length - 1].yearly - comparison.totals[0].yearly)}</td></tr>
                  </tfoot>
                </table>
              </div>
              <p className="xsmall muted" style={{ marginTop: 6 }}>Różnica = ostatni scenariusz minus pierwszy.</p>
            </div>
          )}

          <div className="result-section">
            <h3><Icon name="message" width={22} /> Jak wykorzystać zestawienie w rozmowie</h3>
            <ul className="list-check">
              <li>Pokaż drugiemu rodzicowi, skąd biorą się kwoty, zwłaszcza koszty mieszkania i wydatki roczne.</li>
              {many && <li>Omawiajcie każde dziecko osobno. Potrzeby małego dziecka i nastolatka zwykle są inne.</li>}
              <li>Oddzielcie wydatki stałe od zmiennych i jednorazowych.</li>
              <li>Ustalcie, kto płaci za co bezpośrednio, a co rozliczacie wspólnie.</li>
              <li>Zachowuj faktury i potwierdzenia przelewów za większe lub regularne wydatki.</li>
              <li>Wróćcie do zestawienia, gdy zmieni się sytuacja dziecka (szkoła, zdrowie, zajęcia).</li>
            </ul>
          </div>

          <div className="result-section">
            <ResultActions toolId={TOOL} report={report} filename="koszty-utrzymania-dziecka" onReset={reset} />
          </div>

          <div className="result-section" style={{ background: "var(--cream)" }}>
            <NextStep
              toolId={TOOL}
              intro="O pieniądzach na dzieci łatwiej rozmawiać, gdy oboje widzicie te same liczby."
              offers={[
                { key: "plan-rozwodu", cta: "Zobacz, jak uporządkować kwestie finansowe dotyczące dzieci przed rozwodem", why: "Bezpłatny Plan Rozwodu pomaga przygotować ustalenia o opiece, kontaktach i kosztach, zanim trafią do sądu." },
                { key: "mediacja", why: "Jeśli rozmowa o kosztach jest trudna, mediacja może pomóc dojść do porozumienia. Jest dobrowolna." },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
