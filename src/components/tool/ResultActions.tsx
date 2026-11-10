"use client";
import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Alert } from "@/components/ui/Alert";
import { track } from "@/lib/analytics";
import { getAttribution, setSourceTool } from "@/lib/attribution";
import { downloadText, reportToText, type Report } from "@/lib/report";
import { OFFERS } from "@/lib/offers";
import type { OfferKey } from "@/content/types";

type Caps = { email: boolean; crm: boolean } | null;

export function useCapabilities(): Caps {
  const [caps, setCaps] = useState<Caps>(null);
  useEffect(() => {
    let alive = true;
    fetch("/api/lead", { method: "GET" })
      .then((r) => r.json())
      .then((j) => alive && setCaps({ email: !!j.email, crm: !!j.crm }))
      .catch(() => alive && setCaps({ email: false, crm: false }));
    return () => { alive = false; };
  }, []);
  return caps;
}

/** Pasek akcji: druk/PDF, pobranie, e-mail */
export function ResultActions({ toolId, report, filename, onReset }: { toolId: string; report: () => Report; filename: string; onReset?: () => void }) {
  const [emailOpen, setEmailOpen] = useState(false);
  return (
    <div className="no-print">
      <div className="btn-row">
        <button type="button" className="btn" onClick={() => { track("result_print", { tool: toolId }); window.print(); }}>
          <Icon name="download" width={18} /> Pobierz PDF / drukuj
        </button>
        <button type="button" className="btn btn--ghost" onClick={() => { track("result_download", { tool: toolId }); downloadText(`${filename}.txt`, reportToText(report())); }}>
          <Icon name="doc" width={18} /> Zapisz jako plik tekstowy
        </button>
        <button type="button" className="btn btn--ghost" aria-expanded={emailOpen} onClick={() => setEmailOpen((v) => !v)}>
          <Icon name="mail" width={18} /> Wyślij mi na e-mail
        </button>
      </div>
      <p className="xsmall muted" style={{ marginTop: 8 }}>
        PDF: w oknie drukowania wybierz „Zapisz jako PDF”. Plik zapisuje się tylko na Twoim urządzeniu.
      </p>
      {emailOpen && <EmailSummaryForm toolId={toolId} report={report} />}
      {onReset && (
        <p className="small" style={{ marginTop: 12 }}>
          <button type="button" className="btn btn--link btn--sm" onClick={onReset}><Icon name="trash" width={16} /> Wyczyść moje odpowiedzi</button>
        </p>
      )}
    </div>
  );
}

function EmailSummaryForm({ toolId, report }: { toolId: string; report: () => Report }) {
  const caps = useCapabilities();
  const id = useId();
  const [email, setEmail] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error" | "unconfigured">("idle");
  const [err, setErr] = useState<string | null>(null);

  if (caps === null) return <p className="small muted" style={{ marginTop: 16 }}>Sprawdzam dostępność wysyłki…</p>;
  if (!caps.email || state === "unconfigured")
    return (
      <Alert tone="warn" className="mt">
        <p><strong>Wysyłka e-mail nie jest jeszcze włączona w tym serwisie.</strong> Niczego nie wysłaliśmy. Możesz pobrać PDF lub zapisać wynik jako plik tekstowy.</p>
      </Alert>
    );
  if (state === "sent")
    return (
      <Alert tone="ok">
        <p><strong>Wysłaliśmy podsumowanie na {email}.</strong> Jeśli nie widzisz wiadomości, sprawdź folder „Oferty” lub „Spam”. Treść wyniku nie jest przechowywana w naszej bazie.</p>
      </Alert>
    );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setErr("Wpisz poprawny adres e-mail."); return; }
    if (!delivery) { setErr("Zaznacz zgodę na wysłanie podsumowania — bez niej nie możemy go dostarczyć."); return; }
    setErr(null);
    setState("sending");
    track("email_request", { tool: toolId });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "summary", tool: toolId, email, consents: { delivery, marketing }, report: report(), attribution: getAttribution(), website: hp }),
      });
      if (res.status === 503) { setState("unconfigured"); return; }
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Nie udało się wysłać");
      setState("sent");
    } catch (e2) {
      setState("error");
      setErr(e2 instanceof Error && e2.message ? e2.message : "Nie udało się wysłać. Spróbuj ponownie lub pobierz PDF.");
    }
  };

  return (
    <form onSubmit={submit} className="card card--sand" style={{ marginTop: 16 }} noValidate>
      <h4>Wyślij podsumowanie na e-mail</h4>
      <p className="small muted">Wysyłamy tylko to, o co prosisz. Treści wyniku nie zapisujemy w bazie ani nie przekazujemy do CRM.</p>
      <div className="field">
        <label className="field__label" htmlFor={`${id}-e`}>Adres e-mail</label>
        <input id={`${id}-e`} className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label>Strona www<input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label>
      </div>
      <label className="check">
        <input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} />
        <span><strong>Wymagane:</strong> proszę o jednorazowe wysłanie wygenerowanego podsumowania na podany adres e-mail. <Link href="/polityka-prywatnosci">Jak przetwarzamy dane</Link></span>
      </label>
      <label className="check">
        <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
        <span><strong>Opcjonalnie:</strong> chcę otrzymywać od Nowego Etapu materiały edukacyjne i informacje o usługach drogą e-mailową. Zgodę mogę wycofać w każdej chwili.</span>
      </label>
      {err && <p className="field__error" role="alert">{err}</p>}
      <button type="submit" className="btn" disabled={state === "sending"} style={{ marginTop: 8 }}>
        {state === "sending" ? "Wysyłam…" : "Wyślij podsumowanie"}
      </button>
    </form>
  );
}

/** Opcjonalny kolejny krok — dopasowany do sytuacji */
export function NextStep({ toolId, offers, heading = "Co możesz zrobić dalej?", intro }: { toolId: string; offers: { key: OfferKey; cta?: string; why?: string; href?: string }[]; heading?: string; intro?: string }) {
  return (
    <div className="no-print">
      <h3>{heading}</h3>
      {intro && <p className="muted small">{intro}</p>}
      <div className="grid grid--2" style={{ marginTop: 12 }}>
        {offers.map(({ key, cta, why, href }, i) => {
          const o = OFFERS[key];
          return (
            <div key={key} className={`card ${i === 0 ? "card--green" : ""}`} style={{ display: "flex", flexDirection: "column" }}>
              <h4 style={{ color: i === 0 ? "#fff" : undefined }}>{o.title}</h4>
              <p className="small" style={{ opacity: 0.9 }}>{why || o.description}</p>
              <div style={{ marginTop: "auto" }}>
                <Link href={href || o.href} className={`btn ${i === 0 ? "btn--gold" : "btn--ghost"} btn--block`} onClick={() => { setSourceTool(toolId); track("offer_click", { tool: toolId, offer: key }); }}>
                  {cta || o.cta}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <p className="xsmall muted" style={{ marginTop: 10 }}>Skorzystanie z narzędzia nie oznacza prośby o kontakt. Odezwiemy się tylko wtedy, gdy sam(a) o to poprosisz.</p>
    </div>
  );
}
