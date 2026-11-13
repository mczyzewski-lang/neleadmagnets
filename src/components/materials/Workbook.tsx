"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Material, MaterialBlock } from "@/content/types";
import { Block } from "./MaterialBlocks";
import { OFFERS } from "@/lib/offers";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";

type Key = string;
const k = (s: number, b: number, i: number): Key => `${s}.${b}.${i}`;

/** Ile pól interaktywnych ma blok (checklista: punkty, arkusz: pola) */
const countOf = (b: MaterialBlock) => (b.type === "checklist" ? b.items.length : b.type === "worksheet" ? b.fields.length : 0);

/**
 * Wersja online materiału: checklisty do odhaczania, arkusze do wpisywania,
 * na końcu podsumowanie (postęp, lista „do zrobienia”, notatki).
 * Domyślnie odpowiedzi żyją tylko w pamięci karty. Zapamiętanie na urządzeniu (localStorage)
 * włącza się wyłącznie świadomie — przełącznikiem; nic nie jest wysyłane na serwer.
 */
export function Workbook({ m }: { m: Material }) {
  const [step, setStep] = useState(0);
  const [checks, setChecks] = useState<Record<Key, boolean>>({});
  const [fields, setFields] = useState<Record<Key, string>>({});
  const [started, setStarted] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const uid = useId();
  const [remember, setRemember] = useState(false);
  const storeKey = `ne-material-${m.slug}`;
  const total = m.sections.length;

  // Wczytaj tylko, jeśli użytkownik wcześniej sam włączył zapamiętywanie
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storeKey);
      if (!raw) return;
      const d = JSON.parse(raw) as { checks?: Record<Key, boolean>; fields?: Record<Key, string> };
      setChecks(d.checks || {});
      setFields(d.fields || {});
      setRemember(true);
    } catch { /* brak dostępu do pamięci — działamy bez niej */ }
  }, [storeKey]);
  useEffect(() => {
    try {
      if (remember) localStorage.setItem(storeKey, JSON.stringify({ checks, fields }));
      else localStorage.removeItem(storeKey);
    } catch { /* ignoruj */ }
  }, [remember, checks, fields, storeKey]);
  const offer = OFFERS[m.nextOffer];
  const isSummary = step === total;

  const stats = useMemo(() => {
    let all = 0, done = 0;
    const per = m.sections.map((s, si) => {
      let t = 0, d = 0;
      s.blocks.forEach((b, bi) => {
        t += countOf(b);
        if (b.type === "checklist") b.items.forEach((_, ii) => checks[k(si, bi, ii)] && d++);
        if (b.type === "worksheet") b.fields.forEach((_, ii) => fields[k(si, bi, ii)]?.trim() && d++);
      });
      all += t; done += d;
      return { t, d };
    });
    return { all, done, per, pct: all ? Math.round((done / all) * 100) : 0 };
  }, [m.sections, checks, fields]);

  const go = (n: number) => {
    setStep(n);
    if (!started) { setStarted(true); track("material_online_start", { material: m.slug }); }
    if (n === total) track("material_online_summary", { material: m.slug });
    requestAnimationFrame(() => {
      titleRef.current?.focus();
      titleRef.current?.closest(".tool-frame")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const todo = m.sections.map((s, si) => ({
    heading: s.heading,
    items: s.blocks.flatMap((b, bi) => (b.type === "checklist" ? b.items.filter((_, ii) => !checks[k(si, bi, ii)]) : [])),
    done: s.blocks.flatMap((b, bi) => (b.type === "checklist" ? b.items.filter((_, ii) => checks[k(si, bi, ii)]) : [])),
    notes: s.blocks.flatMap((b, bi) => (b.type === "worksheet" ? b.fields.map((f, ii) => ({ f, v: fields[k(si, bi, ii)]?.trim() || "" })).filter((x) => x.v) : [])),
  }));

  const reset = () => {
    if (!window.confirm("Wyczyścić wszystkie odpowiedzi w tym materiale?")) return;
    setChecks({}); setFields({}); setRemember(false); go(0);
  };

  const rememberToggle = (
    <label className="check wb__remember no-print">
      <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
      <span><strong>Zapamiętaj moje odpowiedzi na tym urządzeniu</strong> — wrócisz do nich później. Zapisują się tylko w tej przeglądarce, nie u nas. Nie włączaj na wspólnym lub cudzym komputerze.</span>
    </label>
  );

  return (
    <div className="tool-frame wb" aria-labelledby={`${uid}-t`}>
      <div className="wb__top no-print">
        <div className="wb__meta small">
          <span>{isSummary ? "Podsumowanie" : `Część ${step + 1} z ${total}`}</span>
          <span><strong>{stats.done}</strong> z {stats.all} punktów · {stats.pct}%</span>
        </div>
        <div className="progress" role="progressbar" aria-label="Postęp wypełniania" aria-valuemin={0} aria-valuemax={100} aria-valuenow={stats.pct}>
          <div className="progress__bar" style={{ width: `${stats.pct}%` }} />
        </div>
        <ol className="wb__nav" aria-label="Części materiału">
          {m.sections.map((s, i) => (
            <li key={s.heading}>
              <button type="button" onClick={() => go(i)} aria-current={i === step ? "step" : undefined} title={s.heading}
                className={stats.per[i].t && stats.per[i].d === stats.per[i].t ? "is-done" : ""}>
                {i + 1}
              </button>
            </li>
          ))}
          <li><button type="button" onClick={() => go(total)} aria-current={isSummary ? "step" : undefined} title="Podsumowanie"><Icon name="check" width={14} /></button></li>
        </ol>
      </div>

      {!isSummary ? (
        <div className="tool-frame__body wb__body">
          <h3 ref={titleRef} tabIndex={-1} id={`${uid}-t`} className="step-title">{m.sections[step].heading}</h3>
          {m.sections[step].intro && <p className="muted">{m.sections[step].intro}</p>}
          {m.sections[step].blocks.map((b, bi) => {
            if (b.type === "checklist")
              return (
                <fieldset key={bi} className="wb__checks">
                  <legend className="visually-hidden">Lista do odhaczenia</legend>
                  {b.items.map((it, ii) => {
                    const key = k(step, bi, ii);
                    return (
                      <label key={key} className={`wb__check${checks[key] ? " is-on" : ""}`}>
                        <input type="checkbox" checked={!!checks[key]} onChange={(e) => setChecks((c) => ({ ...c, [key]: e.target.checked }))} />
                        <span>{it}</span>
                      </label>
                    );
                  })}
                </fieldset>
              );
            if (b.type === "worksheet")
              return (
                <div key={bi} className="card card--sand wb__sheet">
                  {b.title && <h4>{b.title}</h4>}
                  {b.fields.map((f, ii) => {
                    const key = k(step, bi, ii);
                    const fid = `${uid}-${key}`;
                    return (
                      <div key={key} className="field">
                        <label htmlFor={fid} className="field__label">{f}</label>
                        <textarea id={fid} className="input wb__ta" rows={2} maxLength={600} value={fields[key] || ""}
                          onChange={(e) => setFields((v) => ({ ...v, [key]: e.target.value }))} />
                      </div>
                    );
                  })}
                </div>
              );
            return <Block key={bi} b={b} />;
          })}
          {step === 0 && rememberToggle}
          <div className="wizard-nav no-print">
            <button type="button" className="btn btn--ghost" onClick={() => go(step - 1)} disabled={step === 0}><Icon name="arrowLeft" width={18} /> Wstecz</button>
            <button type="button" className="btn" onClick={() => go(step + 1)}>{step === total - 1 ? "Podsumowanie" : "Dalej"} <Icon name="arrowRight" width={18} /></button>
          </div>
        </div>
      ) : (
        <div className="tool-frame__body wb__body">
          <h3 ref={titleRef} tabIndex={-1} id={`${uid}-t`} className="step-title">Twoje podsumowanie: {m.coverTitle}</h3>
          <div className="kpis kpis--4">
            <div className="kpi"><span className="kpi__label">Postęp</span><span className="kpi__value">{stats.pct}%</span></div>
            <div className="kpi"><span className="kpi__label">Zrobione</span><span className="kpi__value">{todo.reduce((a, t) => a + t.done.length, 0)}</span></div>
            <div className="kpi"><span className="kpi__label">Do zrobienia</span><span className="kpi__value">{todo.reduce((a, t) => a + t.items.length, 0)}</span></div>
            <div className="kpi"><span className="kpi__label">Notatki</span><span className="kpi__value">{todo.reduce((a, t) => a + t.notes.length, 0)}</span></div>
          </div>
          {stats.done === 0 && <p className="muted">Nie masz jeszcze żadnych odpowiedzi. Wróć do dowolnej części i odhacz lub wpisz, co już wiesz — podsumowanie ułoży się samo.</p>}
          {todo.some((t) => t.notes.length) && (
            <section className="result-section">
              <h4>Twoje notatki</h4>
              {todo.filter((t) => t.notes.length).map((t) => (
                <div key={t.heading} className="wb__notes">
                  <strong className="small">{t.heading}</strong>
                  <dl>{t.notes.map((n) => <div key={n.f}><dt>{n.f.replace(/:$/, "")}</dt><dd className="hand">{n.v}</dd></div>)}</dl>
                </div>
              ))}
            </section>
          )}
          {todo.some((t) => t.items.length) && (
            <section className="result-section">
              <h4>Do zrobienia</h4>
              {todo.filter((t) => t.items.length).map((t) => (
                <div key={t.heading} style={{ marginBottom: 12 }}>
                  <strong className="small">{t.heading}</strong>
                  <ul className="list-dot small">{t.items.map((i) => <li key={i}>{i}</li>)}</ul>
                </div>
              ))}
            </section>
          )}
          {rememberToggle}
          {!remember && <p className="xsmall muted">Bez zaznaczenia powyżej odpowiedzi znikną po zamknięciu karty.</p>}
          <p className="small"><button type="button" className="btn btn--link btn--sm" onClick={reset}><Icon name="trash" width={16} /> Wyczyść moje odpowiedzi</button></p>
          <div className="card card--green" style={{ marginTop: 20 }}>
            <h4 style={{ color: "inherit" }}>{offer.title}</h4>
            <p>{offer.description}</p>
            <Link className="btn btn--gold" href={offer.href}>{m.ctaLabel}</Link>
          </div>
          <div className="wizard-nav no-print">
            <button type="button" className="btn btn--ghost" onClick={() => go(total - 1)}><Icon name="arrowLeft" width={18} /> Wróć do materiału</button>
          </div>
        </div>
      )}
    </div>
  );
}
