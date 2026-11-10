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
import {
  STATUS_LABEL, TYPE_LABEL, analyze, classify, lawyerQuestions,
  type Asset, type AssetType, type Regime, type Relation, type Status,
} from "@/lib/decision/majatek-wspolny-czy-osobisty";

const TOOL = "majatek-wspolny-czy-osobisty";
const STATUS_COLOR: Record<Status, string> = { wspolny: "#295550", osobisty: "#C79B59", mieszany: "#8a5a12", analiza: "#9fb5b1", wspolwlasnosc: "#4a6d68" };
const SHORT: Record<Status, string> = { wspolny: "Wspólne", osobisty: "Osobiste", mieszany: "Mieszane (nakłady)", analiza: "Do analizy", wspolwlasnosc: "Współwłasność" };
const TYPES = Object.keys(TYPE_LABEL) as AssetType[];

export function AssetsTool() {
  const [relation, setRelation] = useState<Relation>("marriage");
  const [regime, setRegime] = useState<Regime>("wspolnosc");
  const [items, setItems] = useState<Asset[]>([]);
  const [shown, setShown] = useState(false);
  const started = useRef(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const touch = () => { if (!started.current) { started.current = true; track("tool_start", { tool: TOOL }); } };

  const add = (type: AssetType) => {
    touch();
    setItems((x) => [...x, { id: `a${Date.now()}${x.length}`, type }]);
  };
  const upd = (id: string, p: Partial<Asset>) => setItems((x) => x.map((a) => (a.id === id ? { ...a, ...p } : a)));
  const del = (id: string) => setItems((x) => x.filter((a) => a.id !== id));

  const res = useMemo(() => analyze(items, relation, regime), [items, relation, regime]);
  const questions = useMemo(() => lawyerQuestions(relation, regime, res.results), [relation, regime, res.results]);
  const show = () => { setShown(true); track("tool_complete", { tool: TOOL }); requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })); };
  const reset = () => { setItems([]); setShown(false); setRelation("marriage"); setRegime("wspolnosc"); };
  const name = (a: Asset) => a.label?.trim() || TYPE_LABEL[a.type];
  const isMarriage = relation === "marriage";
  const sepRegime = regime === "rozdzielnosc-od-poczatku";

  const report = (): Report => ({
    title: "Majątek wspólny czy osobisty — moje zestawienie",
    intro: `Zestawienie z ${todayPL()}. ${isMarriage ? "Małżeństwo" : "Związek nieformalny"}. Statusy są wstępne i wymagają weryfikacji.`,
    sections: [
      { heading: "Składniki", items: res.results.map((r) => `${name(r)}${r.value ? ` (${formatPLN(r.value)})` : ""}: ${STATUS_LABEL[r.status]} — ${r.reason} [${r.basis}]`) },
      ...(res.nakłady.length ? [{ heading: "Nakłady do rozważenia", items: res.nakłady }] : []),
      { heading: "Dokumenty do zebrania", items: [...new Set(res.results.flatMap((r) => r.docs))] },
      { heading: "Pytania do prawnika", items: questions },
    ],
  });

  return (
    <div>
      <div className="tool-frame">
        <div className="tool-frame__head"><span><strong>Twoje składniki majątku</strong></span><span className="muted small">Bez nazw i danych osobowych</span></div>
        <div className="tool-frame__body">
          <div className="card card--sand dc-card">
            <h3><Icon name="scale" width={20} /> Podstawy</h3>
            <Seg label="Czy jesteście małżeństwem?" value={relation} onChange={(v) => { touch(); setRelation(v); }} options={[{ value: "marriage", label: "Tak" }, { value: "informal", label: "Nie — związek nieformalny" }]} />
            {isMarriage ? (
              <Seg label="Jaki ustrój majątkowy obowiązuje?" value={regime} onChange={(v) => { touch(); setRegime(v); }}
                options={[{ value: "wspolnosc", label: "Wspólność (brak intercyzy)" }, { value: "rozdzielnosc-w-trakcie", label: "Rozdzielność od jakiegoś momentu" }, { value: "rozdzielnosc-od-poczatku", label: "Rozdzielność od ślubu" }, { value: "nie-wiem", label: "Nie wiem" }]}
                hint={regime === "rozdzielnosc-w-trakcie" ? "Przy składnikach wybieraj „po ustaniu wspólności” dla rzeczy kupionych po zawarciu umowy o rozdzielności. Data umowy ma znaczenie." : undefined} />
            ) : (
              <Alert tone="info"><p>Między partnerami w związku nieformalnym <strong>nie ma wspólności majątkowej</strong>. Rzeczy kupione razem są zwykle współwłasnością w częściach ułamkowych (Kodeks cywilny), a pozostałe należą do osoby, która je nabyła. Dla każdego składnika zaznacz, kto jest właścicielem.</p></Alert>
            )}
          </div>

          <h3 style={{ fontSize: "var(--fs-md)", marginTop: 8 }}>Dodaj składnik</h3>
          <div className="btn-row" style={{ gap: 8, marginBottom: 16 }}>
            {TYPES.map((t) => <button key={t} type="button" className="btn btn--ghost btn--sm" onClick={() => add(t)}><Icon name="plus" width={14} /> {TYPE_LABEL[t]}</button>)}
          </div>

          {items.length === 0 && <p className="small muted">Dodaj co najmniej jeden składnik, np. mieszkanie, samochód lub oszczędności.</p>}

          {items.map((a) => {
            const c = classify(a, relation, regime);
            return (
              <div key={a.id} className="dc-item">
                <div className="dc-item__head">
                  <strong>{TYPE_LABEL[a.type]}</strong>
                  <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span className={`dc-status dc-status--${c.status}`}>{STATUS_LABEL[c.status]}</span>
                    <button type="button" className="calc-row__remove" onClick={() => del(a.id)} aria-label={`Usuń: ${name(a)}`}><Icon name="trash" width={16} /></button>
                  </span>
                </div>
                <div className="dc-grid2">
                  <div className="field"><label className="field__label" htmlFor={`l-${a.id}`}>Własna etykieta <span className="muted">(opcjonalnie)</span></label><input id={`l-${a.id}`} className="input" maxLength={40} placeholder="np. mieszkanie na Woli" value={a.label || ""} onChange={(e) => upd(a.id, { label: e.target.value })} /></div>
                  <div className="field"><span className="field__label">{a.type === "dlug" ? "Saldo (opcjonalnie)" : "Orientacyjna wartość (opcjonalnie)"}</span><AmountInput label={`Wartość: ${name(a)}`} value={a.value} onChange={(v) => upd(a.id, { value: v })} /></div>
                </div>
                {!isMarriage ? (
                  <Seg label="Kto jest właścicielem?" value={a.owner || ("" as never)} onChange={(v) => upd(a.id, { owner: v })} options={[{ value: "razem", label: "Kupiliśmy razem" }, { value: "ja", label: "Ja" }, { value: "partner", label: "Partner/ka" }, { value: "nie-wiem", label: "Nie wiem" }]} />
                ) : a.type !== "dlug" && (
                  <>
                    {!sepRegime && <Seg label="Kiedy nabyty?" value={a.when || ("" as never)} onChange={(v) => upd(a.id, { when: v })} options={[{ value: "przed", label: "Przed ślubem" }, { value: "w-trakcie", label: "W trakcie wspólności" }, { value: "po", label: "Po ustaniu wspólności" }]} />}
                    {a.when === "przed" && !sepRegime && (
                      <Seg label="Czy w trakcie małżeństwa spłacano go lub ulepszano ze wspólnych pieniędzy?" value={a.laterJointFunds || ("" as never)} onChange={(v) => upd(a.id, { laterJointFunds: v })} options={[{ value: "tak", label: "Tak" }, { value: "nie", label: "Nie" }, { value: "nie-wiem", label: "Nie wiem" }]} />
                    )}
                    {(a.when === "w-trakcie" || a.when === "po" || sepRegime) && (
                      <Seg label="Z jakich środków?" value={a.funds || ("" as never)} onChange={(v) => upd(a.id, { funds: v })} options={[{ value: "wspolne", label: "Wspólne dochody" }, { value: "przedslubne", label: "Pieniądze sprzed ślubu" }, { value: "darowizna", label: "Darowizna" }, { value: "spadek", label: "Spadek" }, { value: "mieszane", label: "Mieszane" }, { value: "nie-wiem", label: "Nie wiem" }]} />
                    )}
                    {(a.funds === "darowizna" || a.funds === "spadek") && a.when === "w-trakcie" && !sepRegime && (
                      <Seg label={`Czy ${a.funds === "darowizna" ? "darczyńca" : "spadkodawca"} postanowił, że ma to należeć do Was obojga?`} value={a.donorJoint || ("" as never)} onChange={(v) => upd(a.id, { donorJoint: v })} options={[{ value: "nie", label: "Nie" }, { value: "tak", label: "Tak" }, { value: "nie-wiem", label: "Nie wiem" }]} />
                    )}
                  </>
                )}
                <p className="xsmall muted" style={{ margin: 0 }}>{c.reason} <em>({c.basis})</em></p>
              </div>
            );
          })}

          <div className="dc-total">
            <div><span className="xsmall muted">Składników</span><div className="dc-total__v">{items.length}</div></div>
            <button type="button" className="btn btn--gold" onClick={show} disabled={!items.length}>{shown ? "Przejdź do wyniku" : "Pokaż zestawienie"} <Icon name="arrowRight" width={18} /></button>
          </div>
        </div>
      </div>

      {shown && items.length > 0 && (
        <div ref={resultRef} className="tool-frame mt-lg" style={{ scrollMarginTop: 70 }} aria-live="polite">
          <div className="result-head">
            <span className="eyebrow">Twoje zestawienie</span>
            <h2 style={{ fontSize: "var(--fs-2xl)" }}>{items.length} {items.length === 1 ? "składnik" : items.length < 5 ? "składniki" : "składników"} — wstępna mapa majątku</h2>
            <p>Statusy są prawdopodobne, nie przesądzone. Zmieniaj odpowiedzi powyżej — wynik zaktualizuje się od razu.</p>
            <div className="kpis kpis--4">
              {(isMarriage ? (["wspolny", "osobisty", "mieszany", "analiza"] as Status[]) : (["wspolwlasnosc", "osobisty", "analiza"] as Status[])).map((s) => (
                <div key={s} className="kpi"><span className="kpi__label">{SHORT[s]}</span><span className="kpi__value">{res.counts[s]}</span><span className="kpi__note">{res.totals[s] ? formatPLN(res.totals[s]) : "—"}</span></div>
              ))}
            </div>
          </div>

          <div className="result-section">
            <h3><Icon name="doc" width={22} /> Składniki i ich prawdopodobny status</h3>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Składnik</th><th>Status</th><th>Dlaczego</th><th className="num">Wartość</th></tr></thead>
                <tbody>
                  {res.results.map((r) => (
                    <tr key={r.id}><td><strong>{name(r)}</strong></td><td><span className={`dc-status dc-status--${r.status}`}>{STATUS_LABEL[r.status]}</span></td><td>{r.reason}<span className="task__meta">{r.basis}</span></td><td className="num">{r.value ? formatPLN(r.value) : "—"}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            {Object.values(res.totals).some((v) => v > 0) && (
              <div className="mt">
                <Donut title="Wartość składników według statusu (bez długów)" centerLabel="wartość" centerValue={formatPLN(Object.values(res.totals).reduce((a, b) => a + b, 0))}
                  slices={(Object.keys(res.totals) as Status[]).map((s) => ({ label: STATUS_LABEL[s], value: res.totals[s], color: STATUS_COLOR[s] }))} />
              </div>
            )}
            {res.debts > 0 && <p className="small mt">Długi i kredyty łącznie: <strong>{formatPLN(res.debts)}</strong> — nie odejmujemy ich automatycznie, bo odpowiedzialność za długi wymaga osobnej analizy.</p>}
          </div>

          {res.nakłady.length > 0 && (
            <div className="result-section">
              <h3><Icon name="split" width={22} /> Nakłady do rozważenia (art. 45 KRO)</h3>
              <ul className="list-dot">{res.nakłady.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          )}

          <div className="result-section">
            <div className="grid grid--2" style={{ gap: 24 }}>
              <div><h3><Icon name="checklist" width={22} /> Dokumenty do zebrania</h3><ul className="list-check">{[...new Set(res.results.flatMap((r) => r.docs))].map((d) => <li key={d}>{d}</li>)}</ul></div>
              <div><h3><Icon name="message" width={22} /> Pytania do prawnika</h3><ul className="list-dot list-q">{questions.map((q) => <li key={q}>{q}</li>)}</ul></div>
            </div>
            <Alert tone="warn" className="mt">
              <p><strong>Ważne:</strong> długi zaciągnięte przez jednego małżonka nie zawsze obciążają majątek wspólny — zależy to m.in. od zgody drugiego małżonka i celu zadłużenia. {isMarriage && "Jeśli zawarliście umowę o rozdzielności, znaczenie ma jej data. "}Udziały w majątku wspólnym są co do zasady równe, ale z ważnych powodów sąd może ustalić je inaczej (art. 43 KRO).</p>
            </Alert>
          </div>

          <div className="result-section"><ResultActions toolId={TOOL} report={report} filename="majatek-wspolny-czy-osobisty" onReset={reset} /></div>
          <div className="result-section" style={{ background: "var(--cream)" }}>
            <NextStep toolId={TOOL} offers={[
              { key: "plan-rozwodu", cta: "Sprawdź, jakie kwestie majątkowe ustalić przed pozwem", why: "Plan Rozwodu porządkuje majątek, mieszkanie i kredyt — razem z możliwą drogą podziału: umową, w wyroku albo osobno." },
              { key: "materialy", href: "/materialy/inwentaryzacja-majatku", cta: "Pobierz arkusz: majątek i długi", why: "Arkusz do spisania wszystkich składników, długów i nakładów." },
            ]} />
          </div>
        </div>
      )}
    </div>
  );
}
