"use client";
import "./calculator.css";
import { useMemo, useRef, useState } from "react";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { BarCompare } from "@/components/charts/BarCompare";
import { MoneyField } from "@/components/ui/MoneyField";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { AmountInput } from "./AmountInput";
import { formatPLN, formatNum, todayPL, plural } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Report } from "@/lib/report";
import { FREQUENCIES, monthlyEquivalent, uid, type Frequency } from "@/lib/tools/expenses";
import {
  type Assumptions, type BudgetCategory, type BudgetLine, type BudgetState, type VariantKey,
  CATEGORY_LABELS, DEFAULT_ASSUMPTIONS, EXPENSE_CATEGORIES, VARIANT_LABELS,
  biggestBurdens, computeVariants, defaultBudgetLines, financialTodo, summarize,
} from "@/lib/tools/budget";

const TOOL = "budzet-po-rozstaniu";
const GROUPS: { cat: BudgetCategory; hint?: string }[] = [
  { cat: "income", hint: "Twoje dochody netto. „Teraz” — to, czym dysponujesz obecnie; „Po rozstaniu” — czego się spodziewasz." },
  { cat: "housing", hint: "„Teraz” — Twoja obecna część kosztów; „Po rozstaniu” — koszt Twojego osobnego mieszkania." },
  { cat: "bills" },
  { cat: "food" },
  { cat: "transport" },
  { cat: "children", hint: "Wydatki na dzieci, które będziesz ponosić. Szczegółowe zestawienie przygotujesz w kalkulatorze kosztów utrzymania dziecka." },
  { cat: "debts" },
  { cat: "other" },
  { cat: "oneoff", hint: "Wydatki, które pojawią się raz — liczymy je osobno, nie w budżecie miesięcznym." },
];

function freqLabel(f: Frequency) {
  return FREQUENCIES.find((x) => x.value === f)!.label;
}

export function BudgetTool() {
  const [state, setState] = useState<BudgetState>(() => ({ lines: defaultBudgetLines(() => uid("b")), assumptions: structuredClone(DEFAULT_ASSUMPTIONS) }));
  const [shown, setShown] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const now = useMemo(() => summarize(state.lines, "now"), [state.lines]);
  const variants = useMemo(() => computeVariants(state), [state]);
  const base = variants.find((v) => v.key === "base")!;
  const burdens = useMemo(() => biggestBurdens(base), [base]);
  const todo = useMemo(() => financialTodo(state, variants), [state, variants]);
  const hasData = now.income + now.expenses + base.income + base.expenses + base.oneOff > 0;

  const touch = () => {
    if (!started.current) { started.current = true; track("tool_start", { tool: TOOL }); }
  };
  const updateLine = (id: string, patch: Partial<BudgetLine>) => {
    touch();
    setState((s) => ({ ...s, lines: s.lines.map((l) => (l.id === id ? { ...l, ...patch } : l)) }));
  };
  const removeLine = (id: string) => setState((s) => ({ ...s, lines: s.lines.filter((l) => l.id !== id) }));
  const addLine = (cat: BudgetCategory) => {
    const id = uid("b");
    setState((s) => ({ ...s, lines: [...s.lines, { id, category: cat, label: "", freq: cat === "oneoff" ? "once" : "monthly", custom: true }] }));
    requestAnimationFrame(() => document.getElementById(`lbl-${id}`)?.focus());
  };
  const copyNowToAfter = () => {
    touch();
    setState((s) => ({ ...s, lines: s.lines.map((l) => (l.after === undefined && l.now !== undefined ? { ...l, after: l.now } : l)) }));
  };
  const setAssumption = (k: VariantKey, field: keyof Assumptions, v: number) =>
    setState((s) => ({ ...s, assumptions: { ...s.assumptions, [k]: { ...s.assumptions[k], [field]: v } } }));
  const reset = () => {
    setState({ lines: defaultBudgetLines(() => uid("b")), assumptions: structuredClone(DEFAULT_ASSUMPTIONS) });
    setShown(false);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const show = () => {
    if (!shown) track("tool_complete", { tool: TOOL });
    setShown(true);
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const cushionText = (v: (typeof variants)[number]) => {
    if (v.monthsUntilEmpty !== null) return `wystarczy na ok. ${formatNum(v.monthsUntilEmpty)} mies. deficytu`;
    if (v.monthsOfExpenses !== null) return `pokrywa ok. ${formatNum(v.monthsOfExpenses)} mies. wydatków`;
    return "—";
  };

  const report = (): Report => ({
    title: "Budżet po rozstaniu — moje zestawienie",
    intro: `Zestawienie przygotowane ${todayPL()} na podstawie moich kwot. Warianty to moje dane skorygowane o założenia opisane niżej.`,
    sections: [
      { heading: "Budżet obecny (miesięcznie)", items: [`Dochody: ${formatPLN(now.income)}`, `Wydatki: ${formatPLN(now.expenses)}`, `Saldo: ${formatPLN(now.balance)}`] },
      ...variants.map((v) => ({
        heading: `Wariant ${v.label.toLowerCase()} po rozstaniu`,
        items: [
          `Założenia: dochody ${signed(state.assumptions[v.key].income)}%, mieszkanie ${signed(state.assumptions[v.key].housing)}%, pozostałe koszty ${signed(state.assumptions[v.key].other)}%, koszty jednorazowe ${signed(state.assumptions[v.key].oneOff)}%`,
          `Dochody: ${formatPLN(v.income)} / mies.`, `Wydatki: ${formatPLN(v.expenses)} / mies.`, `Saldo: ${formatPLN(v.balance)} / mies.`,
          `Koszty jednorazowe: ${formatPLN(v.oneOff)}`, `Poduszka po kosztach jednorazowych: ${formatPLN(v.cushionAfterOneOff)} (${cushionText(v)})`,
        ],
      })),
      { heading: "Największe obciążenia (wariant bazowy)", items: burdens.map((b) => `${b.label}: ${formatPLN(b.monthly)} / mies.`) },
      { heading: "Pozycje budżetu", items: state.lines.filter((l) => l.now || l.after).map((l) => `${CATEGORY_LABELS[l.category].split(" (")[0]} — ${l.label || "pozycja"}: teraz ${formatPLN(l.now ?? 0)}, po rozstaniu ${formatPLN(l.after ?? 0)} (${freqLabel(l.freq)})`) },
      ...(state.alimonyIn || state.alimonyOut ? [{ heading: "Moje założenia dotyczące alimentów (nie prognoza)", items: [`Otrzymywane: ${formatPLN(state.alimonyIn ?? 0)} / mies.`, `Płacone: ${formatPLN(state.alimonyOut ?? 0)} / mies.`] }] : []),
      { heading: "Kwestie finansowe do uporządkowania", items: todo },
    ],
  });

  const changes = EXPENSE_CATEGORIES.map((c) => {
    const n = now.byCategory.find((x) => x.category === c)!.monthly;
    const a = base.byCategory.find((x) => x.category === c)!.monthly;
    return { c, label: CATEGORY_LABELS[c].split(" (")[0], n, a, d: a - n };
  }).filter((r) => r.n || r.a);

  return (
    <div>
      <div className="tool-frame" ref={formRef}>
        <div className="tool-frame__head">
          <span><strong>Kalkulator budżetu</strong></span>
          <span className="muted small"><Icon name="lock" style={{ width: 14, height: 14, display: "inline", verticalAlign: "-2px" }} /> Liczone w Twojej przeglądarce</span>
        </div>
        <div className="tool-frame__body">
          <h3 className="step-title" style={{ marginTop: 0 }}>Wpisz swoje dochody i wydatki</h3>
          <p className="step-help">
            Dla każdej pozycji podaj kwotę <strong>teraz</strong> (Twoja część obecnego budżetu) i <strong>po rozstaniu</strong> (Twoje osobne gospodarstwo). Wystarczą przybliżenia, puste pola liczymy jako 0. Wydatki nieregularne przeliczymy na miesięczny ekwiwalent.
          </p>
          <div className="btn-row" style={{ marginBottom: 16 }}>
            <button type="button" className="btn btn--ghost btn--sm" onClick={copyNowToAfter}><Icon name="arrowRight" width={16} /> Skopiuj „teraz” do pustych pól „po rozstaniu”</button>
          </div>

          {GROUPS.map(({ cat, hint }) => {
            const lines = state.lines.filter((l) => l.category === cat);
            const isOneOff = cat === "oneoff";
            const sumAfter = lines.reduce((s, l) => s + (isOneOff ? l.after || 0 : monthlyEquivalent(l.after, l.freq)), 0);
            return (
              <section key={cat} className="card calc-cat" aria-labelledby={`cat-${cat}`}>
                <div className="calc-cat__head">
                  <h4 id={`cat-${cat}`}>{CATEGORY_LABELS[cat]}</h4>
                  <span className="calc-cat__sum">{formatPLN(sumAfter)}{isOneOff ? "" : " / mies."}</span>
                </div>
                {hint && <p className="xsmall muted" style={{ marginBottom: 6 }}>{hint}</p>}
                <div className={`calc-colheads ${isOneOff ? "" : "calc-colheads--3"}`} aria-hidden="true">
                  <div>Pozycja</div>
                  <div>{isOneOff ? <><span>Częstotliwość</span><span>Kwota</span></> : <><span>Częstotliwość</span><span>Teraz</span><span>Po rozstaniu</span></>}</div>
                  <div />
                </div>
                {lines.map((l) => (
                  <div key={l.id} className="calc-row">
                    <div className="calc-row__label">
                      {l.custom ? (
                        <input id={`lbl-${l.id}`} className="input" placeholder="Nazwa pozycji" aria-label="Nazwa pozycji" value={l.label} maxLength={60} onChange={(e) => updateLine(l.id, { label: e.target.value })} />
                      ) : l.label}
                    </div>
                    <div className={`calc-row__inputs ${isOneOff ? "" : "calc-row__inputs--3"}`}>
                      <div>
                        <label htmlFor={`f-${l.id}`}>Częstotliwość</label>
                        {isOneOff ? (
                          <span className="small muted" style={{ display: "block", padding: "10px 0" }}>jednorazowo</span>
                        ) : (
                          <select id={`f-${l.id}`} className="select" value={l.freq} onChange={(e) => updateLine(l.id, { freq: e.target.value as Frequency })} aria-label={`Częstotliwość: ${l.label || "pozycja"}`}>
                            {FREQUENCIES.filter((f) => cat !== "income" || f.value !== "once").map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                          </select>
                        )}
                      </div>
                      {!isOneOff && (
                        <div>
                          <label>Teraz</label>
                          <AmountInput label={`${l.label || "Pozycja"} — teraz`} value={l.now} onChange={(v) => updateLine(l.id, { now: v })} />
                        </div>
                      )}
                      <div>
                        <label>{isOneOff ? "Kwota" : "Po rozstaniu"}</label>
                        <AmountInput label={`${l.label || "Pozycja"} — ${isOneOff ? "kwota" : "po rozstaniu"}`} value={l.after} onChange={(v) => updateLine(l.id, { after: v })} />
                      </div>
                    </div>
                    <button type="button" className="calc-row__remove" onClick={() => removeLine(l.id)} aria-label={`Usuń pozycję: ${l.label || "nowa pozycja"}`}><Icon name="x" width={18} /></button>
                  </div>
                ))}
                <div className="calc-add">
                  <button type="button" className="btn btn--link btn--sm" onClick={() => addLine(cat)}><Icon name="plus" width={16} /> Dodaj pozycję</button>
                </div>
              </section>
            );
          })}

          <section className="card card--sand calc-cat" aria-labelledby="cat-savings">
            <h4 id="cat-savings" style={{ marginBottom: 12 }}>Oszczędności i Twoje założenia</h4>
            <MoneyField label="Oszczędności, którymi będziesz dysponować" value={state.savings} onChange={(v) => { touch(); setState((s) => ({ ...s, savings: v })); }} hint="Np. Twoja część oszczędności. Posłuży do policzenia poduszki finansowej." />
            <details>
              <summary className="small" style={{ cursor: "pointer", fontWeight: 600, marginBottom: 8 }}>Opcjonalnie: uwzględnij alimenty jako własne założenie</summary>
              <Alert tone="warn"><p>Kalkulator <strong>nie przewiduje</strong> wysokości alimentów. Wysokość alimentów zależy m.in. od usprawiedliwionych potrzeb uprawnionego oraz możliwości zarobkowych i majątkowych zobowiązanego, a w razie sporu ustala ją sąd. Jeśli wpiszesz kwotę, potraktujemy ją wyłącznie jako Twoje założenie.</p></Alert>
              <div className="grid grid--2 mt">
                <MoneyField label="Alimenty, które zakładasz otrzymywać (mies.)" value={state.alimonyIn} onChange={(v) => setState((s) => ({ ...s, alimonyIn: v }))} />
                <MoneyField label="Alimenty, które zakładasz płacić (mies.)" value={state.alimonyOut} onChange={(v) => setState((s) => ({ ...s, alimonyOut: v }))} />
              </div>
            </details>
          </section>

          <div className="calc-sticky">
            <div>
              <span className="xsmall muted">Saldo po rozstaniu (bazowo)</span>
              <div className={`calc-sticky__val ${base.balance < 0 ? "num-neg" : ""}`}>{formatPLN(base.balance)} <span className="xsmall muted">/ mies.</span></div>
            </div>
            <button type="button" className="btn btn--gold" onClick={show} disabled={!hasData} aria-disabled={!hasData}>{shown ? "Przejdź do wyniku" : "Pokaż mój wynik"} <Icon name="arrowRight" width={18} /></button>
          </div>
          {!hasData && <p className="xsmall muted" style={{ marginTop: 8 }}>Wpisz co najmniej jedną kwotę, aby zobaczyć wynik.</p>}
        </div>
      </div>

      {shown && hasData && (
        <div ref={resultRef} className="tool-frame mt-lg calc-result" style={{ scrollMarginTop: 70 }} aria-live="polite">
          <div className="result-head">
            <span className="eyebrow">Twój wynik</span>
            <h2 style={{ fontSize: "var(--fs-2xl)" }}>Twoje finanse teraz i po rozstaniu</h2>
            <p>Wynik aktualizuje się na bieżąco — zmieniaj kwoty powyżej lub założenia wariantów poniżej.</p>
            <div className="kpis kpis--4">
              <div className={`kpi ${now.balance < 0 ? "kpi--neg" : ""}`}><span className="kpi__label">Saldo teraz</span><span className="kpi__value">{formatPLN(now.balance)}</span><span className="kpi__note">miesięcznie</span></div>
              <div className={`kpi ${base.balance < 0 ? "kpi--neg" : ""}`}><span className="kpi__label">Saldo po rozstaniu</span><span className="kpi__value">{formatPLN(base.balance)}</span><span className="kpi__note">wariant bazowy</span></div>
              <div className="kpi"><span className="kpi__label">Koszty jednorazowe</span><span className="kpi__value">{formatPLN(base.oneOff)}</span><span className="kpi__note">wariant bazowy</span></div>
              <div className={`kpi ${base.cushionAfterOneOff < 0 ? "kpi--neg" : ""}`}><span className="kpi__label">Poduszka finansowa</span><span className="kpi__value">{formatPLN(base.cushionAfterOneOff)}</span><span className="kpi__note">{cushionText(base)}</span></div>
            </div>
          </div>

          <div className="result-section">
            <h3><Icon name="wallet" width={22} /> Dochody i wydatki: teraz i w 3 wariantach</h3>
            <BarCompare
              title="Miesięczne dochody i wydatki"
              series={[{ key: "inc", label: "Dochody", color: "var(--green-700)" }, { key: "exp", label: "Wydatki", color: "var(--gold-500)" }]}
              groups={[{ label: "Teraz", values: { inc: now.income, exp: now.expenses } }, ...variants.map((v) => ({ label: v.label, values: { inc: v.income, exp: v.expenses } }))]}
            />
            <div className="table-wrap mt">
              <table className="table">
                <thead><tr><th scope="col">Miesięcznie</th><th className="num" scope="col">Teraz</th>{variants.map((v) => <th key={v.key} className="num" scope="col">{v.label}</th>)}</tr></thead>
                <tbody>
                  <tr><th scope="row">Dochody</th><td className="num">{formatPLN(now.income)}</td>{variants.map((v) => <td key={v.key} className="num">{formatPLN(v.income)}</td>)}</tr>
                  <tr><th scope="row">Wydatki</th><td className="num">{formatPLN(now.expenses)}</td>{variants.map((v) => <td key={v.key} className="num">{formatPLN(v.expenses)}</td>)}</tr>
                  <tr><th scope="row">Saldo</th><td className={`num ${now.balance < 0 ? "num-neg" : "num-pos"}`}><strong>{formatPLN(now.balance)}</strong></td>{variants.map((v) => <td key={v.key} className={`num ${v.balance < 0 ? "num-neg" : "num-pos"}`}><strong>{formatPLN(v.balance)}</strong></td>)}</tr>
                  <tr><th scope="row">Jednorazowo</th><td className="num">—</td>{variants.map((v) => <td key={v.key} className="num">{formatPLN(v.oneOff)}</td>)}</tr>
                  <tr><th scope="row">Poduszka</th><td className="num">—</td>{variants.map((v) => <td key={v.key} className={`num ${v.cushionAfterOneOff < 0 ? "num-neg" : ""}`}>{formatPLN(v.cushionAfterOneOff)}</td>)}</tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="result-section">
            <h3><Icon name="edit" width={22} /> Założenia wariantów</h3>
            <p className="small muted">Wariant bazowy to dokładnie Twoje kwoty „po rozstaniu”. Pozostałe to Twoje kwoty zmienione o poniższe procenty — to przykładowe założenia, nie prognozy. Dopasuj je do swojej sytuacji.</p>
            <div className="table-wrap">
              <table className="table calc-assump">
                <thead><tr><th scope="col">Zmiana względem Twoich kwot</th>{(Object.keys(VARIANT_LABELS) as VariantKey[]).map((k) => <th key={k} className="num" scope="col">{VARIANT_LABELS[k]}</th>)}</tr></thead>
                <tbody>
                  {([["income", "Dochody"], ["housing", "Koszty mieszkania"], ["other", "Pozostałe koszty miesięczne"], ["oneOff", "Koszty jednorazowe"]] as [keyof Assumptions, string][]).map(([field, lbl]) => (
                    <tr key={field}>
                      <th scope="row">{lbl}</th>
                      {(Object.keys(VARIANT_LABELS) as VariantKey[]).map((k) => (
                        <td key={k} className="num">
                          <input type="number" step={1} min={-90} max={300} value={state.assumptions[k][field]} aria-label={`${lbl} — wariant ${VARIANT_LABELS[k]}, zmiana w %`}
                            onChange={(e) => setAssumption(k, field, Math.max(-90, Math.min(300, Number(e.target.value) || 0)))} /> %
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" className="btn btn--link btn--sm no-print" onClick={() => setState((s) => ({ ...s, assumptions: structuredClone(DEFAULT_ASSUMPTIONS) }))}>Przywróć przykładowe założenia</button>
          </div>

          <div className="result-section">
            <div className="grid grid--2" style={{ gap: 24 }}>
              <div>
                <h3><Icon name="alert" width={22} /> Największe obciążenia</h3>
                {burdens.length ? (
                  <div className="hbar">
                    {burdens.map((b) => (
                      <div key={b.category} className="hbar__row">
                        <span>{b.label.split(" (")[0]}</span>
                        <div className="hbar__track"><div className="hbar__fill" style={{ width: `${(b.monthly / burdens[0].monthly) * 100}%` }} /></div>
                        <span className="hbar__val">{formatPLN(b.monthly)}</span>
                      </div>
                    ))}
                    {base.income > 0 && <p className="xsmall muted">Największa pozycja to {Math.round((burdens[0].monthly / base.income) * 100)}% Twoich dochodów po rozstaniu.</p>}
                  </div>
                ) : <p className="small muted">Uzupełnij wydatki po rozstaniu.</p>}
              </div>
              <div>
                <h3><Icon name="split" width={22} /> Jak zmienią się koszty</h3>
                <div className="table-wrap">
                  <table className="table">
                    <thead><tr><th scope="col">Kategoria</th><th className="num" scope="col">Teraz</th><th className="num" scope="col">Po</th><th className="num" scope="col">Zmiana</th></tr></thead>
                    <tbody>{changes.map((r) => (
                      <tr key={r.c}><th scope="row">{r.label}</th><td className="num">{formatPLN(r.n)}</td><td className="num">{formatPLN(r.a)}</td><td className={`num ${r.d > 0 ? "num-neg" : r.d < 0 ? "num-pos" : ""}`}>{r.d > 0 ? "+" : ""}{formatPLN(r.d)}</td></tr>
                    ))}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {base.monthsUntilEmpty !== null && (
            <div className="result-section" style={{ paddingTop: 0, borderTop: 0 }}>
              <Alert tone="warn" title="W wariancie bazowym brakuje pieniędzy każdego miesiąca">
                <p>Deficyt wynosi ok. {formatPLN(-base.balance)} miesięcznie. Przy obecnych oszczędnościach (po kosztach jednorazowych) wystarczy to na ok. {formatNum(base.monthsUntilEmpty)} {plural(Math.round(base.monthsUntilEmpty), "miesiąc", "miesiące", "miesięcy")}. To sygnał, by wcześniej zaplanować źródła finansowania lub zmiany kosztów.</p>
              </Alert>
            </div>
          )}

          <div className="result-section">
            <h3><Icon name="checklist" width={22} /> Kwestie finansowe do uporządkowania</h3>
            <ul className="list-check">{todo.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>

          <div className="result-section">
            <ResultActions toolId={TOOL} report={report} filename="budzet-po-rozstaniu" onReset={reset} />
          </div>

          <div className="result-section" style={{ background: "var(--cream)" }}>
            <NextStep
              toolId={TOOL}
              intro="Spokojniej planuje się finanse, gdy wiadomo, co z mieszkaniem, kosztami dzieci i wspólnymi zobowiązaniami."
              offers={[
                { key: "plan-rozwodu", cta: "Zobacz, jakie ustalenia finansowe warto przygotować przed rozwodem", why: "Bezpłatny Plan Rozwodu pokazuje, które sprawy finansowe warto uzgodnić przed pozwem — i jak możemy w tym pomóc." },
                { key: "materialy", href: "/narzedzia/koszty-utrzymania-dziecka", cta: "Policz koszty utrzymania dziecka", why: "Szczegółowe zestawienie wydatków na dziecko — miesięcznie i rocznie, z porównaniem scenariuszy." },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function signed(n: number) {
  return n > 0 ? `+${n}` : `${n}`;
}
