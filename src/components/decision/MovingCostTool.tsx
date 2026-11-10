"use client";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import "./decision.css";
import { Seg } from "./Seg";
import { AmountInput } from "@/components/tools/AmountInput";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { Donut } from "@/components/charts/Donut";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { formatPLN, formatNum, todayPL } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Report } from "@/lib/report";
import { CATEGORIES, defaultItems, postponeList, summarizeMove, tips, type MoveInput, type MoveItem } from "@/lib/decision/koszty-wyprowadzki";

const TOOL = "koszty-wyprowadzki";
const init = (kids: boolean): MoveInput => ({ depositMultiplier: 1, firstMonthUpfront: true, transitionMonths: 1, items: defaultItems(kids) });

export function MovingCostTool() {
  const [kids, setKids] = useState<"nie" | "tak">("nie");
  const [i, setI] = useState<MoveInput>(() => init(false));
  const [shown, setShown] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const started = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const set = (p: Partial<MoveInput>) => {
    if (!started.current) { started.current = true; track("tool_start", { tool: TOOL }); }
    setI((x) => ({ ...x, ...p }));
  };
  const setItem = (id: string, p: Partial<MoveItem>) => set({ items: i.items.map((x) => (x.id === id ? { ...x, ...p } : x)) });
  const s = useMemo(() => summarizeMove(i), [i]);
  const later = useMemo(() => postponeList(i), [i]);
  const tipList = useMemo(() => tips(i, s), [i, s]);
  const hasData = s.start > 0 || s.monthly > 0;

  const switchKids = (v: "nie" | "tak") => {
    setKids(v);
    const keep = i.items.filter((x) => x.category !== "dzieci");
    set({ items: v === "tak" ? [...keep, ...defaultItems(true).filter((x) => x.category === "dzieci")] : keep });
  };
  const addItem = () => {
    const label = newLabel.trim().slice(0, 60);
    if (!label) return;
    set({ items: [...i.items, { id: `u${Date.now()}`, category: "inne", label, on: true }] });
    setNewLabel("");
  };
  const show = () => { setShown(true); track("tool_complete", { tool: TOOL }); requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const reset = () => { setKids("nie"); setI(init(false)); setShown(false); };

  const report = (): Report => ({
    title: "Ile kosztuje moja wyprowadzka — zestawienie",
    intro: `Zestawienie z ${todayPL()} na podstawie moich kwot.`,
    sections: [
      { heading: "Podsumowanie", items: [`Kwota na start: ${formatPLN(s.start)}`, `Bez pozycji, które można odłożyć: ${formatPLN(s.startWithoutDeferrable)}`, `Miesięczny koszt nowego mieszkania: ${formatPLN(s.monthly)}`, ...(s.monthsCovered !== undefined ? [`Oszczędności po starcie wystarczą na ok. ${formatNum(s.monthsCovered)} mies.`] : [])] },
      { heading: "Kategorie", items: CATEGORIES.filter((c) => s.byCategory[c.id] > 0).map((c) => `${c.label}: ${formatPLN(s.byCategory[c.id])}`) },
      { heading: "Pozycje", items: i.items.filter((x) => x.on && x.amount).map((x) => `${x.label}: ${formatPLN(x.amount)}`) },
      { heading: "Co można odłożyć w czasie", items: later },
      { heading: "Wskazówki", items: tipList },
    ],
  });

  const groups = CATEGORIES.filter((c) => c.id !== "najem" && c.id !== "przejsciowe" && (c.id !== "dzieci" || kids === "tak"));

  return (
    <div>
      <div className="tool-frame">
        <div className="tool-frame__head"><span><strong>Kalkulator wyprowadzki</strong></span><span className="muted small">Wpisz własne kwoty</span></div>
        <div className="tool-frame__body">
          <div className="card card--sand dc-card">
            <h3><Icon name="home" width={20} /> Nowe mieszkanie</h3>
            <div className="dc-grid2">
              <div className="field"><span className="field__label">Czynsz najmu (miesięcznie, z opłatami)</span><AmountInput label="Czynsz najmu" value={i.rent} onChange={(v) => set({ rent: v })} /></div>
              <div className="field"><span className="field__label">Media, internet, telefon (miesięcznie)</span><AmountInput label="Media miesięcznie" value={i.monthlyBills} onChange={(v) => set({ monthlyBills: v })} /></div>
              <div className="field"><label className="field__label" htmlFor="dep">Kaucja — ile czynszów?</label><input id="dep" className="input" type="number" min={0} max={6} step={0.5} value={i.depositMultiplier} onChange={(e) => set({ depositMultiplier: Math.max(0, Math.min(6, Number(e.target.value) || 0)) })} /><span className="field__hint">Twoje założenie — sprawdź w ofercie.</span></div>
              <div className="field"><span className="field__label">Prowizja dla pośrednika</span><AmountInput label="Prowizja" value={i.agencyFee} onChange={(v) => set({ agencyFee: v })} /></div>
            </div>
            <label className="check"><input type="checkbox" checked={i.firstMonthUpfront} onChange={(e) => set({ firstMonthUpfront: e.target.checked })} /><span>Czynsz za pierwszy miesiąc płatny z góry</span></label>
          </div>

          <div className="card card--sand dc-card">
            <h3><Icon name="calendar" width={20} /> Okres przejściowy</h3>
            <div className="dc-grid2">
              <div className="field"><label className="field__label" htmlFor="tm">Ile miesięcy podwójnych kosztów?</label><input id="tm" className="input" type="number" min={0} max={24} value={i.transitionMonths} onChange={(e) => set({ transitionMonths: Math.max(0, Math.min(24, Number(e.target.value) || 0)) })} /></div>
              <div className="field"><span className="field__label">Twój udział w kosztach dotychczasowego mieszkania (mies.)</span><AmountInput label="Koszty dotychczasowego mieszkania" value={i.transitionMonthly} onChange={(v) => set({ transitionMonthly: v })} /></div>
            </div>
            <Seg label="Czy dzieci będą u Ciebie nocować?" value={kids} onChange={switchKids} options={[{ value: "nie", label: "Nie / nie dotyczy" }, { value: "tak", label: "Tak" }]} />
          </div>

          {groups.map((g) => (
            <div key={g.id} className="card dc-card">
              <h3>{g.label}</h3>
              {i.items.filter((x) => x.category === g.id).map((x) => (
                <div key={x.id} className={`dc-chk ${x.on ? "" : "dc-chk--off"}`}>
                  <input type="checkbox" checked={x.on} onChange={(e) => setItem(x.id, { on: e.target.checked })} aria-label={`Uwzględnij: ${x.label}`} />
                  <span>{x.label}{x.deferrable && <span className="task__meta">można odłożyć</span>}</span>
                  <AmountInput label={x.label} value={x.amount} onChange={(v) => setItem(x.id, { amount: v })} />
                </div>
              ))}
              {g.id === "inne" && (
                <form className="calc-add" onSubmit={(e) => { e.preventDefault(); addItem(); }}>
                  <label style={{ flex: 1 }}><span className="visually-hidden">Nowa pozycja</span><input className="input" placeholder="Dodaj własną pozycję…" value={newLabel} maxLength={60} onChange={(e) => setNewLabel(e.target.value)} /></label>
                  <button className="btn btn--ghost btn--sm" type="submit"><Icon name="plus" width={16} /> Dodaj</button>
                </form>
              )}
            </div>
          ))}

          <div className="card card--sand dc-card">
            <h3><Icon name="wallet" width={20} /> Oszczędności (opcjonalnie)</h3>
            <div className="field"><span className="field__label">Ile masz do dyspozycji na start?</span><AmountInput label="Oszczędności" value={i.savings} onChange={(v) => set({ savings: v })} /></div>
          </div>

          <div className="dc-total">
            <div><span className="xsmall muted">Na start</span><div className="dc-total__v">{formatPLN(s.start)}</div></div>
            <button type="button" className="btn btn--gold" onClick={show} disabled={!hasData}>{shown ? "Przejdź do wyniku" : "Pokaż zestawienie"} <Icon name="arrowRight" width={18} /></button>
          </div>
          {!hasData && <p className="xsmall muted" style={{ marginTop: 8 }}>Wpisz co najmniej jedną kwotę, aby zobaczyć zestawienie.</p>}
        </div>
      </div>

      {shown && hasData && (
        <div ref={resultRef} className="tool-frame mt-lg" style={{ scrollMarginTop: 70 }} aria-live="polite">
          <div className="result-head">
            <span className="eyebrow">Twoje zestawienie</span>
            <h2 style={{ fontSize: "var(--fs-2xl)" }}>Na start potrzebujesz ok. {formatPLN(s.start)}</h2>
            <p>Wynik aktualizuje się na bieżąco przy zmianie kwot powyżej.</p>
            <div className="kpis kpis--3">
              <div className="kpi"><span className="kpi__label">Kwota na start</span><span className="kpi__value">{formatPLN(s.start)}</span><span className="kpi__note">w tym do odłożenia: {formatPLN(s.deferrable)}</span></div>
              <div className="kpi"><span className="kpi__label">Nowe mieszkanie miesięcznie</span><span className="kpi__value">{formatPLN(s.monthly)}</span></div>
              <div className={`kpi ${s.savingsAfterStart !== undefined && s.savingsAfterStart < 0 ? "kpi--neg" : ""}`}><span className="kpi__label">Oszczędności po starcie</span><span className="kpi__value">{s.savingsAfterStart !== undefined ? formatPLN(s.savingsAfterStart) : "—"}</span><span className="kpi__note">{s.monthsCovered !== undefined ? `≈ ${formatNum(s.monthsCovered)} mies. nowego mieszkania` : "podaj oszczędności, aby policzyć"}</span></div>
            </div>
          </div>
          <div className="result-section">
            <h3><Icon name="coins" width={22} /> Na co pójdą pieniądze</h3>
            <Donut title="Koszty startu według kategorii" centerLabel="na start" centerValue={formatPLN(s.start)} slices={CATEGORIES.map((c) => ({ label: c.label, value: s.byCategory[c.id], color: c.color }))} />
          </div>
          <div className="result-section">
            <div className="grid grid--2" style={{ gap: 24 }}>
              <div><h3><Icon name="clock" width={22} /> Co można odłożyć w czasie</h3><ul className="list-check">{later.map((x) => <li key={x}>{x}</li>)}</ul><p className="small">Bez tych pozycji start to <strong>{formatPLN(s.startWithoutDeferrable)}</strong>.</p></div>
              <div><h3><Icon name="info" width={22} /> Wskazówki</h3><ul className="list-dot">{tipList.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </div>
            <Alert tone="info" className="mt"><p>Chcesz zobaczyć pełny miesięczny budżet po rozstaniu? <Link href="/narzedzia/budzet-po-rozstaniu">Otwórz kalkulator „Budżet po rozstaniu”</Link>.</p></Alert>
          </div>
          <div className="result-section"><ResultActions toolId={TOOL} report={report} filename="koszty-wyprowadzki" onReset={reset} /></div>
          <div className="result-section" style={{ background: "var(--cream)" }}>
            <NextStep toolId={TOOL} offers={[
              { key: "plan-rozwodu", cta: "Zobacz, jakie ustalenia finansowe przygotować", why: "Kto płaci za dotychczasowe mieszkanie, raty i rachunki w okresie przejściowym? Plan Rozwodu pomaga to uporządkować." },
              { key: "materialy", href: "/materialy/inwentaryzacja-majatku", cta: "Pobierz arkusz: majątek i długi", why: "Spisz, co zabierasz, a co zostaje do rozliczenia." },
            ]} />
          </div>
        </div>
      )}
    </div>
  );
}
