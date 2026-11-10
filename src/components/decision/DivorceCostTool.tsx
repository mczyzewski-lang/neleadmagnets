"use client";
import { useMemo, useRef, useState } from "react";
import "./decision.css";
import { Seg } from "./Seg";
import { AmountInput } from "@/components/tools/AmountInput";
import { ResultActions, NextStep } from "@/components/tool/ResultActions";
import { Donut } from "@/components/charts/Donut";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/ui/Icon";
import { formatPLN, todayPL } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { Report } from "@/lib/report";
import { DEFAULT_INPUT, buildLines, comparePaths, hiddenCosts, refundPossible, summarize, type CostInput } from "@/lib/decision/koszt-rozwodu";

const TOOL = "koszt-rozwodu";
const range = (a: number, b: number) => (a === b ? formatPLN(a) : `${formatPLN(a)} – ${formatPLN(b)}`);

export function DivorceCostTool() {
  const [i, setI] = useState<CostInput>(DEFAULT_INPUT);
  const [shown, setShown] = useState(false);
  const started = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const set = (p: Partial<CostInput>) => {
    if (!started.current) { started.current = true; track("tool_start", { tool: TOOL }); }
    setI((x) => ({ ...x, ...p }));
  };
  const lines = useMemo(() => buildLines(i), [i]);
  const sum = useMemo(() => summarize(i), [i]);
  const paths = useMemo(() => comparePaths(i), [i]);
  const hidden = useMemo(() => hiddenCosts(i), [i]);
  const isSep = i.procedure !== "rozwod";

  const show = () => {
    setShown(true);
    track("tool_complete", { tool: TOOL });
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const reset = () => { setI(DEFAULT_INPUT); setShown(false); };

  const report = (): Report => ({
    title: "Ile kosztuje rozwód — moje zestawienie",
    intro: `Zestawienie z ${todayPL()} na podstawie moich założeń. Kwoty pełnomocników, notariusza i mediacji prywatnej wpisałem/wpisałam samodzielnie.`,
    sections: [
      { heading: "Suma", items: [`Łącznie: ${range(sum.min, sum.max)}`, `Koszty sądowe i urzędowe: ${formatPLN(sum.court)}`, `Pozostałe: ${range(sum.others.min, sum.others.max)}`, ...(sum.refund ? [`Możliwy zwrot połowy opłaty: ${formatPLN(sum.refund)} (do weryfikacji) → po zwrocie ${range(sum.minAfterRefund, sum.maxAfterRefund)}`] : [])] },
      { heading: "Pozycje", items: lines.map((l) => `${l.label}: ${range(l.min, l.max)}${l.verify ? " (do weryfikacji)" : ""}`) },
      ...paths.map((p) => ({ heading: `Ścieżka: ${p.title}`, items: [p.desc, `Szacunkowo: ${range(p.summary.min, p.summary.max)}`] })),
      { heading: "Koszty, o których łatwo zapomnieć", items: hidden },
    ],
  });

  return (
    <div>
      <div className="tool-frame">
        <div className="tool-frame__head"><span><strong>Kalkulator kosztów</strong></span><span className="muted small"><Icon name="lock" style={{ width: 14, height: 14, display: "inline", verticalAlign: "-2px" }} /> Liczone w przeglądarce</span></div>
        <div className="tool-frame__body">
          <div className="card card--sand dc-card">
            <h3><Icon name="scale" width={20} /> Droga</h3>
            <Seg label="Co rozważasz?" value={i.procedure} onChange={(v) => set({ procedure: v })} options={[{ value: "rozwod", label: "Rozwód" }, { value: "separacja-pozew", label: "Separacja (pozew)" }, { value: "separacja-zgodna", label: "Separacja (zgodny wniosek)" }]}
              hint={i.procedure === "separacja-zgodna" ? "Zgodny wniosek o separację jest możliwy, gdy małżonkowie nie mają wspólnych małoletnich dzieci." : undefined} />
            {i.procedure !== "separacja-zgodna" && (
              <>
                <Seg label="Orzekanie o winie" value={i.fault} onChange={(v) => set({ fault: v, jointNoFault: v === "bez" ? i.jointNoFault : false })} options={[{ value: "bez", label: "Bez orzekania o winie" }, { value: "z", label: "Z orzekaniem o winie" }]} />
                {i.fault === "bez" && (
                  <label className="check"><input type="checkbox" checked={i.jointNoFault} onChange={(e) => set({ jointNoFault: e.target.checked })} /><span>Oboje zgodnie wnosimy o zaniechanie orzekania o winie (art. 57 § 2 KRO)</span></label>
                )}
              </>
            )}
          </div>

          <div className="card card--sand dc-card">
            <h3><Icon name="home" width={20} /> Podział majątku</h3>
            <Seg label="Jak chcecie podzielić majątek?" value={i.property} onChange={(v) => set({ property: v })} options={[{ value: "brak", label: "Nie dotyczy / później" }, { value: "w-wyroku", label: "W wyroku" }, { value: "sad", label: "Osobno w sądzie" }, { value: "notariusz", label: "U notariusza" }]} />
            {(i.property === "w-wyroku" || i.property === "sad") && (
              <label className="check"><input type="checkbox" checked={i.propertyAgreed} onChange={(e) => set({ propertyAgreed: e.target.checked })} /><span>Mamy zgodny projekt podziału (opłata 300 zł zamiast 1000 zł)</span></label>
            )}
            {i.property === "notariusz" && (
              <div className="field"><span className="field__label">Koszt notarialny (taksa, opłaty) — wpisz po zapytaniu notariusza</span><AmountInput label="Koszt notarialny" value={i.notaryCost} onChange={(v) => set({ notaryCost: v })} /></div>
            )}
          </div>

          <div className="card card--sand dc-card">
            <h3><Icon name="handshake" width={20} /> Mediacja</h3>
            <Seg label="Czy zakładasz mediację?" value={i.mediation} onChange={(v) => set({ mediation: v })} options={[{ value: "brak", label: "Nie" }, { value: "sad", label: "Na skierowanie sądu" }, { value: "prywatna", label: "Prywatna" }]} />
            {i.mediation === "sad" && (
              <div className="dc-grid2">
                <Seg label="Rodzaj sprawy" value={i.mediationKind} onChange={(v) => set({ mediationKind: v })} options={[{ value: "niemajatkowa", label: "Niemajątkowa" }, { value: "majatkowa", label: "Majątkowa" }]} />
                {i.mediationKind === "niemajatkowa" ? (
                  <div className="field"><label className="field__label" htmlFor="med-s">Liczba posiedzeń</label><input id="med-s" className="input" type="number" min={1} max={10} value={i.mediationSessions} onChange={(e) => set({ mediationSessions: Math.max(1, Math.min(10, Number(e.target.value) || 1)) })} /></div>
                ) : (
                  <div className="field"><span className="field__label">Wartość przedmiotu mediacji</span><AmountInput label="Wartość przedmiotu mediacji" value={i.mediationValue} onChange={(v) => set({ mediationValue: v })} /></div>
                )}
              </div>
            )}
            {i.mediation === "prywatna" && (
              <div className="field"><span className="field__label">Koszt mediacji prywatnej (łącznie)</span><AmountInput label="Koszt mediacji prywatnej" value={i.mediationPrivate} onChange={(v) => set({ mediationPrivate: v })} /></div>
            )}
          </div>

          <div className="card card--sand dc-card">
            <h3><Icon name="user" width={20} /> Pomoc prawna</h3>
            <Seg label="Pełnomocnik" value={String(i.lawyers) as "0" | "1" | "2"} onChange={(v) => set({ lawyers: Number(v) as 0 | 1 | 2 })} options={[{ value: "0", label: "Bez pełnomocnika" }, { value: "1", label: "Jeden" }, { value: "2", label: "Każde z nas swój" }]} />
            {i.lawyers > 0 && (
              <div className="dc-grid2">
                <div className="field"><span className="field__label">Wynagrodzenie od (za osobę)</span><AmountInput label="Wynagrodzenie pełnomocnika od" value={i.lawyerMin} onChange={(v) => set({ lawyerMin: v })} /></div>
                <div className="field"><span className="field__label">do (za osobę)</span><AmountInput label="Wynagrodzenie pełnomocnika do" value={i.lawyerMax} onChange={(v) => set({ lawyerMax: v })} /></div>
                <p className="xsmall muted" style={{ gridColumn: "1 / -1", marginTop: -6 }}>Wpisz kwoty z wycen, które otrzymałeś/otrzymałaś. Nie podajemy „stawek rynkowych”.</p>
              </div>
            )}
          </div>

          <div className="card card--sand dc-card">
            <h3><Icon name="doc" width={20} /> Dokumenty i inne</h3>
            <div className="dc-grid2">
              <div className="field"><label className="field__label" htmlFor="docs-n">Odpisy aktów (szt.)</label><input id="docs-n" className="input" type="number" min={0} max={10} value={i.docsCount} onChange={(e) => set({ docsCount: Math.max(0, Math.min(10, Number(e.target.value) || 0)) })} /><span className="field__hint">Np. odpis aktu małżeństwa, akty urodzenia dzieci.</span></div>
              <div className="field"><span className="field__label">Opłata za odpis <span className="dc-verify">sprawdź aktualną opłatę</span></span><AmountInput label="Opłata za odpis" value={i.docFee} onChange={(v) => set({ docFee: v ?? 0 })} /></div>
            </div>
            <div className="field"><span className="field__label">Inne koszty (np. opinia biegłego, wycena)</span><AmountInput label="Inne koszty" value={i.other} onChange={(v) => set({ other: v })} /></div>
          </div>

          <div className="dc-total">
            <div><span className="xsmall muted">Szacunkowo łącznie</span><div className="dc-total__v">{range(sum.min, sum.max)}</div></div>
            <button type="button" className="btn btn--gold" onClick={show}>{shown ? "Przejdź do wyniku" : "Pokaż zestawienie"} <Icon name="arrowRight" width={18} /></button>
          </div>
        </div>
      </div>

      {shown && (
        <div ref={resultRef} className="tool-frame mt-lg" style={{ scrollMarginTop: 70 }} aria-live="polite">
          <div className="result-head">
            <span className="eyebrow">Twoje zestawienie</span>
            <h2 style={{ fontSize: "var(--fs-2xl)" }}>{isSep ? "Separacja" : "Rozwód"}: szacunkowo {range(sum.min, sum.max)}</h2>
            <p>Wynik aktualizuje się na bieżąco — możesz zmieniać założenia powyżej.</p>
            <div className="kpis kpis--3">
              <div className="kpi"><span className="kpi__label">Koszty sądowe i urzędowe</span><span className="kpi__value">{formatPLN(sum.court)}</span></div>
              <div className="kpi"><span className="kpi__label">Pozostałe koszty</span><span className="kpi__value">{range(sum.others.min, sum.others.max)}</span></div>
              <div className="kpi"><span className="kpi__label">Możliwy zwrot opłaty</span><span className="kpi__value">{formatPLN(sum.refund)}</span><span className="kpi__note">{sum.refund ? "do weryfikacji" : "nie dotyczy"}</span></div>
            </div>
          </div>

          <div className="result-section">
            <h3><Icon name="coins" width={22} /> Struktura kosztów</h3>
            <Donut title="Struktura kosztów (wartości maksymalne)" centerLabel="łącznie do" centerValue={formatPLN(sum.max)}
              slices={lines.map((l, k) => ({ label: l.label, value: l.max, color: ["#295550", "#C79B59", "#4a6d68", "#ead9bb", "#7E5B26", "#9fb5b1", "#263D3A", "#c9a96e"][k % 8] }))} />
            <div className="table-wrap mt">
              <table className="table">
                <thead><tr><th>Pozycja</th><th className="num">Kwota</th></tr></thead>
                <tbody>
                  {lines.map((l) => (
                    <tr key={l.id}><td>{l.label}{l.verify && <span className="dc-verify">do weryfikacji</span>}{l.note && <span className="task__meta">{l.note}</span>}</td><td className="num">{range(l.min, l.max)}</td></tr>
                  ))}
                </tbody>
                <tfoot><tr><th>Razem</th><td className="num">{range(sum.min, sum.max)}</td></tr></tfoot>
              </table>
            </div>
            {refundPossible(i) && (
              <p className="small mt">Po ewentualnym zwrocie połowy opłaty ({formatPLN(sum.refund)}) — <strong>{range(sum.minAfterRefund, sum.maxAfterRefund)}</strong>. Zwrot dotyczy rozwodu lub separacji bez orzekania o winie na zgodny wniosek, po uprawomocnieniu wyroku <span className="dc-verify">do weryfikacji</span>.</p>
            )}
          </div>

          <div className="result-section">
            <h3><Icon name="split" width={22} /> Porozumienie czy spór? Porównanie na Twoich kwotach</h3>
            <div className="dc-paths">
              {paths.map((p, k) => (
                <div key={p.id} className={`scenario ${k === 0 ? "scenario--fit" : ""}`}>
                  <span className="scenario__num">0{k + 1}</span>
                  <h4>{p.title}</h4>
                  <p className="small muted">{p.desc}</p>
                  <p style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--green-800)", margin: "8px 0" }}>{range(p.summary.min, p.summary.max)}</p>
                  <ul>{p.lines.map((l) => <li key={l.id}>{l.label}: {range(l.min, l.max)}</li>)}</ul>
                </div>
              ))}
            </div>
            <p className="xsmall muted mt">To ilustracja zbudowana z Twoich założeń. Wybór drogi zależy od Waszej sytuacji, a nie tylko od kosztów — porozumienie nie zawsze jest możliwe ani bezpieczne.</p>
          </div>

          <div className="result-section">
            <h3><Icon name="alert" width={22} /> Koszty, o których łatwo zapomnieć</h3>
            <ul className="list-dot">{hidden.map((h) => <li key={h}>{h}</li>)}</ul>
            <Alert tone="warn" className="mt"><p>Zestawienie ma charakter orientacyjny. Opłaty mogą się zmienić; w niektórych sytuacjach możliwe jest zwolnienie od kosztów sądowych. Ostateczne koszty zależą od przebiegu sprawy.</p></Alert>
          </div>

          <div className="result-section">
            <ResultActions toolId={TOOL} report={report} filename="koszt-rozwodu-zestawienie" onReset={reset} />
          </div>
          <div className="result-section" style={{ background: "var(--cream)" }}>
            <NextStep toolId={TOOL} offers={[
              { key: "plan-rozwodu", cta: "Sprawdź koszt pomocy Nowego Etapu", why: "Odbierz bezpłatny Plan Rozwodu i zapytaj o koszt pomocy w przygotowaniu ustaleń przed pozwem — bez zobowiązań." },
              { key: "materialy", href: "/materialy/rozwod-krok-po-kroku", cta: "Przewodnik: rozwód krok po kroku", why: "Cały proces na jednej mapie: od decyzji i ustaleń po wyrok." },
            ]} />
          </div>
        </div>
      )}
    </div>
  );
}
