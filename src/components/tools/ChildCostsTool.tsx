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
  type AgeBand, type ChildCategory, type ChildLine, type ChildScenario,
  AGE_BANDS, CHILD_CATEGORIES, CHILD_CATEGORY_LABELS, compareScenarios, scenarioTotals, suggestedLines,
} from "@/lib/tools/childCosts";

const TOOL = "koszty-utrzymania-dziecka";
const MAX_SCENARIOS = 3;
const SCENARIO_COLORS = ["var(--green-700)"];
const CHILDREN = ["1", "2", "3", "4+"] as const;

const freqLabel = (f: Frequency) => FREQUENCIES.find((x) => x.value === f)!.label;

export function ChildCostsTool() {
  const [children, setChildren] = useState<(typeof CHILDREN)[number]>("1");
  const [age, setAge] = useState<AgeBand | undefined>();
  const [scenarios, setScenarios] = useState<ChildScenario[]>(() => [{ id: uid("s"), name: "Obecnie", lines: suggestedLines(undefined, () => uid("c")) }]);
  const [activeId, setActiveId] = useState(scenarios[0].id);
  const [shown, setShown] = useState(false);
  const [newCat, setNewCat] = useState<ChildCategory>("other");
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const active = scenarios.find((s) => s.id === activeId) ?? scenarios[0];
  const totals = useMemo(() => scenarioTotals(active), [active]);
  const comparison = useMemo(() => compareScenarios(scenarios), [scenarios]);
  const hasData = totals.monthly + totals.oneOff > 0;

  const touch = () => { if (!started.current) { started.current = true; track("tool_start", { tool: TOOL }); } };
  const patchActive = (fn: (lines: ChildLine[]) => ChildLine[]) => {
    touch();
    setScenarios((list) => list.map((s) => (s.id === active.id ? { ...s, lines: fn(s.lines) } : s)));
  };
  const updateLine = (id: string, patch: Partial<ChildLine>) => patchActive((ls) => ls.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const removeLine = (id: string) => patchActive((ls) => ls.filter((l) => l.id !== id));
  const addLine = (category: ChildCategory) => {
    const id = uid("c");
    patchActive((ls) => [...ls, { id, category, label: "", freq: "monthly", custom: true }]);
    requestAnimationFrame(() => document.getElementById(`lbl-${id}`)?.focus());
  };
  const applyAge = (a: AgeBand) => {
    setAge(a);
    const allEmpty = active.lines.every((l) => !l.amount);
    if (allEmpty) patchActive(() => suggestedLines(a, () => uid("c")));
  };
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
    const s = { id: uid("s"), name: "Obecnie", lines: suggestedLines(undefined, () => uid("c")) };
    setScenarios([s]); setActiveId(s.id); setAge(undefined); setChildren("1"); setShown(false);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const show = () => {
    if (!shown) track("tool_complete", { tool: TOOL });
    setShown(true);
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const childLabel = `${children === "4+" ? "4 lub więcej dzieci" : children === "1" ? "1 dziecko" : `${children} dzieci`}${age ? `, wiek: ${AGE_BANDS.find((a) => a.value === age)!.label}` : ""}`;

  const report = (): Report => ({
    title: "Koszty utrzymania dziecka — moje zestawienie",
    intro: `Zestawienie przygotowane ${todayPL()} (${childLabel}). To zestawienie wydatków, a nie wyliczenie alimentów.`,
    sections: [
      ...comparison.totals.map((t, i) => ({
        heading: `${scenarios[i].name}: ${formatPLN(t.monthly)} / mies., ${formatPLN(t.yearly)} / rok`,
        items: [
          ...t.byCategory.filter((c) => c.monthly > 0).map((c) => `${c.label}: ${formatPLN(c.monthly)} / mies. (${formatPLN(c.yearly)} / rok)`),
          ...(t.oneOff ? [`Wydatki jednorazowe: ${formatPLN(t.oneOff)}`] : []),
        ],
      })),
      { heading: `Lista wydatków — ${active.name}`, items: active.lines.filter((l) => l.amount).map((l) => `${CHILD_CATEGORY_LABELS[l.category]} — ${l.label || "pozycja"}: ${formatPLN(l.amount)} ${freqLabel(l.freq)}`) },
      { heading: "Ważne", items: ["Zestawienie nie jest kalkulatorem alimentów. Zakres obowiązku alimentacyjnego zależy od usprawiedliwionych potrzeb dziecka oraz zarobkowych i majątkowych możliwości rodziców (art. 133, 135 KRO); w razie sporu decyduje sąd."] },
    ],
  });

  const grouped = CHILD_CATEGORIES.map((c) => ({ c, lines: active.lines.filter((l) => l.category === c) })).filter((g) => g.lines.length);

  return (
    <div>
      <div className="tool-frame" ref={formRef}>
        <div className="tool-frame__head">
          <span><strong>Kalkulator kosztów</strong></span>
          <span className="muted small"><Icon name="lock" style={{ width: 14, height: 14, display: "inline", verticalAlign: "-2px" }} /> Bez danych identyfikujących dziecko</span>
        </div>
        <div className="tool-frame__body">
          <h3 className="step-title" style={{ marginTop: 0 }}>Kogo dotyczy zestawienie?</h3>
          <p className="step-help">Opcjonalnie. Wiek pomoże dopasować listę typowych pozycji — kwoty wpisujesz sam(a). Nie pytamy o imiona ani daty urodzenia.</p>
          <div className="field">
            <span className="field__label" id="kids-l">Liczba dzieci w zestawieniu</span>
            <div className="segmented" role="group" aria-labelledby="kids-l">
              {CHILDREN.map((c) => <button key={c} type="button" aria-pressed={children === c} onClick={() => setChildren(c)}>{c}</button>)}
            </div>
          </div>
          <div className="field">
            <span className="field__label" id="age-l">Wiek (przedział)</span>
            <div className="segmented" role="group" aria-labelledby="age-l">
              {AGE_BANDS.map((a) => <button key={a.value} type="button" aria-pressed={age === a.value} onClick={() => applyAge(a.value)}>{a.label}</button>)}
            </div>
            {age && active.lines.some((l) => l.amount) && (
              <button type="button" className="btn btn--link btn--sm" onClick={() => patchActive((ls) => [...ls, ...suggestedLines(age, () => uid("c")).filter((n) => !ls.some((l) => l.label === n.label))])}>Dodaj typowe pozycje dla tego wieku</button>
            )}
          </div>

          <div className="calc-tabs" style={{ margin: "20px 0 12px" }}>
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
          {scenarios.length > 1 && <p className="xsmall muted">Scenariusze możesz porównać w wyniku — np. obecne koszty i koszty po zmianie szkoły czy opieki.</p>}

          {grouped.map(({ c, lines }) => {
            const sum = lines.reduce((s, l) => s + monthlyEquivalent(l.amount, l.freq), 0);
            const once = lines.reduce((s, l) => s + oneOffAmount(l.amount, l.freq), 0);
            return (
              <section key={c} className="card calc-cat" aria-labelledby={`cc-${c}`}>
                <div className="calc-cat__head">
                  <h4 id={`cc-${c}`}>{CHILD_CATEGORY_LABELS[c]}</h4>
                  <span className="calc-cat__sum">{formatPLN(sum)} / mies.{once ? ` + ${formatPLN(once)} jednor.` : ""}</span>
                </div>
                <div className="calc-colheads" aria-hidden="true"><div>Pozycja</div><div><span>Częstotliwość</span><span>Kwota</span></div><div /></div>
                {lines.map((l) => (
                  <div key={l.id} className="calc-row">
                    <div className="calc-row__label">
                      {l.custom ? <input id={`lbl-${l.id}`} className="input" placeholder="Nazwa wydatku" aria-label="Nazwa wydatku" value={l.label} maxLength={60} onChange={(e) => updateLine(l.id, { label: e.target.value })} /> : l.label}
                    </div>
                    <div className="calc-row__inputs">
                      <div>
                        <label htmlFor={`f-${l.id}`}>Częstotliwość</label>
                        <select id={`f-${l.id}`} className="select" value={l.freq} onChange={(e) => updateLine(l.id, { freq: e.target.value as Frequency })}>
                          {FREQUENCIES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label>Kwota</label>
                        <AmountInput label={`${l.label || "Wydatek"} — kwota`} value={l.amount} onChange={(v) => updateLine(l.id, { amount: v })} />
                      </div>
                    </div>
                    <button type="button" className="calc-row__remove" onClick={() => removeLine(l.id)} aria-label={`Usuń: ${l.label || "nowa pozycja"}`}><Icon name="x" width={18} /></button>
                  </div>
                ))}
                <div className="calc-add"><button type="button" className="btn btn--link btn--sm" onClick={() => addLine(c)}><Icon name="plus" width={16} /> Dodaj wydatek</button></div>
              </section>
            );
          })}

          <div className="card card--sand calc-cat">
            <label className="field__label" htmlFor="new-cat">Dodaj wydatek w innej kategorii</label>
            <div className="calc-add">
              <select id="new-cat" className="select" style={{ flex: 1, minWidth: 180 }} value={newCat} onChange={(e) => setNewCat(e.target.value as ChildCategory)}>
                {CHILD_CATEGORIES.map((c) => <option key={c} value={c}>{CHILD_CATEGORY_LABELS[c]}</option>)}
              </select>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => addLine(newCat)}><Icon name="plus" width={16} /> Dodaj</button>
            </div>
          </div>

          <div className="calc-sticky">
            <div>
              <span className="xsmall muted">{active.name} — miesięcznie</span>
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
            <span className="eyebrow">Twoje zestawienie · {childLabel}</span>
            <h2 style={{ fontSize: "var(--fs-2xl)" }}>Miesięczny koszt utrzymania: {formatPLN(totals.monthly)}</h2>
            <p>Scenariusz „{active.name}”. Wydatki nieregularne przeliczyliśmy na miesięczny ekwiwalent.</p>
            <div className="kpis kpis--3">
              <div className="kpi"><span className="kpi__label">Miesięcznie</span><span className="kpi__value">{formatPLN(totals.monthly)}</span></div>
              <div className="kpi"><span className="kpi__label">Rocznie</span><span className="kpi__value">{formatPLN(totals.yearly)}</span><span className="kpi__note">bez wydatków jednorazowych</span></div>
              <div className="kpi"><span className="kpi__label">Jednorazowo</span><span className="kpi__value">{formatPLN(totals.oneOff)}</span><span className="kpi__note">rok łącznie: {formatPLN(totals.yearlyWithOneOff)}</span></div>
            </div>
          </div>

          <div className="result-section" style={{ paddingBottom: 0, borderTop: 0 }}>
            <Alert tone="warn" title="To nie jest kalkulator alimentów">
              <p>Zestawienie pokazuje wydatki, które wpisałeś/wpisałaś. Zakres obowiązku alimentacyjnego zależy od <strong>usprawiedliwionych potrzeb dziecka</strong> oraz <strong>zarobkowych i majątkowych możliwości rodziców</strong>; obowiązek może być wykonywany także przez osobiste starania o utrzymanie i wychowanie dziecka (art. 133 i 135 KRO). Niektóre świadczenia, np. 800+, nie wpływają na zakres obowiązku alimentacyjnego (art. 135 § 3 KRO). W razie sporu wysokość alimentów ustala sąd.</p>
            </Alert>
          </div>

          <div className="result-section">
            <h3><Icon name="coins" width={22} /> Podział na kategorie (miesięcznie)</h3>
            <Donut
              title="Podział kosztów na kategorie"
              centerValue={formatPLN(totals.monthly)}
              centerLabel="miesięcznie"
              slices={totals.byCategory.map((c) => ({ label: c.label, value: c.monthly, color: c.color }))}
            />
          </div>

          <div className="result-section">
            <h3><Icon name="doc" width={22} /> Lista wydatków</h3>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th scope="col">Wydatek</th><th className="num" scope="col">Mies.</th><th className="num" scope="col">Rocznie</th></tr></thead>
                <tbody>
                  {active.lines.filter((l) => l.amount).map((l) => (
                    <tr key={l.id}>
                      <th scope="row" style={{ fontWeight: 500 }}>{l.label || "Pozycja"}<span className="xsmall muted" style={{ display: "block" }}>{formatPLN(l.amount)} {freqLabel(l.freq)} · {CHILD_CATEGORY_LABELS[l.category]}</span></th>
                      <td className="num">{l.freq === "once" ? "—" : formatPLN(monthlyEquivalent(l.amount, l.freq))}</td>
                      <td className="num">{l.freq === "once" ? `${formatPLN(l.amount)}*` : formatPLN(monthlyEquivalent(l.amount, l.freq) * 12)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot><tr><th scope="row">Razem</th><td className="num">{formatPLN(totals.monthly)}</td><td className="num">{formatPLN(totals.yearlyWithOneOff)}</td></tr></tfoot>
              </table>
            </div>
            {totals.oneOff > 0 && <p className="xsmall muted" style={{ marginTop: 6 }}>* wydatek jednorazowy — doliczony tylko do sumy rocznej.</p>}
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
              <div className="table-wrap mt">
                <table className="table">
                  <thead><tr><th scope="col">Kategoria (mies.)</th>{scenarios.map((s) => <th key={s.id} className="num" scope="col">{s.name}</th>)}<th className="num" scope="col">Różnica</th></tr></thead>
                  <tbody>
                    {comparison.rows.map((r) => (
                      <tr key={r.category}><th scope="row">{r.label}</th>{r.values.map((v, i) => <td key={i} className="num">{formatPLN(v)}</td>)}<td className={`num ${r.delta > 0 ? "num-neg" : r.delta < 0 ? "num-pos" : ""}`}>{r.delta > 0 ? "+" : ""}{formatPLN(r.delta)}</td></tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr><th scope="row">Miesięcznie</th>{comparison.totals.map((t, i) => <td key={i} className="num">{formatPLN(t.monthly)}</td>)}<td className="num">{formatPLN(comparison.totals[comparison.totals.length - 1].monthly - comparison.totals[0].monthly)}</td></tr>
                    <tr><th scope="row">Rocznie</th>{comparison.totals.map((t, i) => <td key={i} className="num">{formatPLN(t.yearly)}</td>)}<td className="num">{formatPLN(comparison.totals[comparison.totals.length - 1].yearly - comparison.totals[0].yearly)}</td></tr>
                  </tfoot>
                </table>
              </div>
              <p className="xsmall muted" style={{ marginTop: 6 }}>Różnica = ostatni scenariusz minus pierwszy.</p>
            </div>
          )}

          <div className="result-section">
            <h3><Icon name="message" width={22} /> Jak wykorzystać zestawienie w rozmowie</h3>
            <ul className="list-check">
              <li>Pokaż drugiemu rodzicowi, z czego wynikają kwoty — szczególnie przy kosztach mieszkania i wydatkach rocznych.</li>
              <li>Oddzielcie wydatki stałe (np. przedszkole) od zmiennych i jednorazowych (np. wyprawka, wyjazdy).</li>
              <li>Ustalcie, kto płaci za co bezpośrednio, a co rozliczacie wspólnie — i jak będziecie to dokumentować.</li>
              <li>Zachowuj faktury, umowy i potwierdzenia przelewów za większe lub regularne wydatki.</li>
              <li>Wróćcie do zestawienia przy zmianie sytuacji dziecka (szkoła, zdrowie, zajęcia).</li>
            </ul>
          </div>

          <div className="result-section">
            <ResultActions toolId={TOOL} report={report} filename="koszty-utrzymania-dziecka" onReset={reset} />
          </div>

          <div className="result-section" style={{ background: "var(--cream)" }}>
            <NextStep
              toolId={TOOL}
              intro="Rozmowy o pieniądzach na dzieci są łatwiejsze, gdy obie strony widzą te same liczby i mają wspólny plan."
              offers={[
                { key: "plan-rozwodu", cta: "Zobacz, jak uporządkować kwestie finansowe dotyczące dzieci przed rozwodem", why: "Bezpłatny Plan Rozwodu pomaga przygotować ustalenia dotyczące dzieci — opiekę, kontakty i koszty — zanim trafią do sądu." },
                { key: "mediacja", why: "Jeśli rozmowa o kosztach jest trudna, mediacja może pomóc wypracować porozumienie. Jest dobrowolna." },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
