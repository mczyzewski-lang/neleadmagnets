"use client";
import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { SingleChoice } from "@/components/ui/Choices";
import { Alert } from "@/components/ui/Alert";
import { getAttribution, getSourceTool } from "@/lib/attribution";
import { track } from "@/lib/analytics";
import { EMAIL_RE, PHONE_RE } from "@/lib/leadSchema";

const TYPES = [
  { value: "plan_rozwodu", label: "Bezpłatny Plan Rozwodu", desc: "Lista spraw do ustalenia przed pozwem + informacja o kosztach" },
  { value: "wycena", label: "Informacja o koszcie pomocy", desc: "Ile kosztowałaby pomoc w mojej sytuacji" },
  { value: "mediacja", label: "Informacje o mediacji" },
  { value: "duo", label: "Ścieżka DUO — razem z drugą osobą" },
  { value: "konsultacja", label: "Indywidualna rozmowa" },
];

export function ContactForm({ defaultType = "plan_rozwodu" }: { defaultType?: string }) {
  const id = useId();
  const [type, setType] = useState(defaultType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState<"email" | "phone">("email");
  const [contact, setContact] = useState(false);
  const [phoneOk, setPhoneOk] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [err, setErr] = useState<string | null>(null);
  const [source, setSource] = useState<string | undefined>();
  useEffect(() => {
    setSource(getSourceTool());
    const h = window.location.hash.replace("#", "");
    if (h === "mediacja" || h === "duo") setType(h);
    if (h === "kontakt") setType("konsultacja");
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return setErr("Wpisz poprawny adres e-mail.");
    if (phone && !PHONE_RE.test(phone)) return setErr("Sprawdź numer telefonu (np. 500 600 700).");
    if (channel === "phone" && (!phone || !phoneOk)) return setErr("Aby zadzwonić, potrzebujemy numeru i zgody na kontakt telefoniczny.");
    if (!contact) return setErr("Zaznacz zgodę na kontakt w sprawie zgłoszenia.");
    setErr(null);
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "contact", requestType: type, source: source || "plan-rozwodu", name, email, phone: phone || undefined, preferredChannel: channel, consents: { contact, phone: phoneOk, marketing }, attribution: getAttribution(), website: hp }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Nie udało się wysłać zgłoszenia.");
      track("lead_submit", { offer: type.replace("_", "-"), tool: source });
      setState("sent");
    } catch (e2) {
      setState("idle");
      setErr(e2 instanceof Error ? e2.message : "Nie udało się wysłać zgłoszenia.");
    }
  };

  if (state === "sent")
    return (
      <Alert tone="ok" title="Dziękujemy — zgłoszenie dotarło">
        <p>Odezwiemy się {channel === "phone" ? "telefonicznie" : "e-mailem"} w sprawie, o którą prosisz. Nie przekazaliśmy żadnych odpowiedzi z narzędzi — tylko dane z tego formularza.</p>
      </Alert>
    );

  return (
    <form onSubmit={submit} noValidate className="card">
      <h3>W czym możemy pomóc?</h3>
      <SingleChoice legend="Typ prośby" options={TYPES} value={type} onChange={setType} />
      <div className="grid grid--2 mt">
        <div className="field"><label className="field__label" htmlFor={`${id}-n`}>Imię <span className="muted">(opcjonalnie)</span></label><input id={`${id}-n`} className="input" autoComplete="given-name" value={name} maxLength={80} onChange={(e) => setName(e.target.value)} /></div>
        <div className="field"><label className="field__label" htmlFor={`${id}-e`}>E-mail</label><input id={`${id}-e`} className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      </div>
      <div className="field"><label className="field__label" htmlFor={`${id}-p`}>Telefon <span className="muted">(opcjonalnie)</span></label><input id={`${id}-p`} className="input" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /><span className="field__hint">Podaj, tylko jeśli wolisz rozmowę telefoniczną.</span></div>
      {phone && (
        <div className="segmented" role="group" aria-label="Preferowany kontakt" style={{ marginBottom: 12 }}>
          <button type="button" aria-pressed={channel === "email"} onClick={() => setChannel("email")}>Wolę e-mail</button>
          <button type="button" aria-pressed={channel === "phone"} onClick={() => setChannel("phone")}>Wolę telefon</button>
        </div>
      )}
      <p className="xsmall muted">Nie opisuj tu szczegółów swojej sytuacji — porozmawiamy o nich, gdy się skontaktujemy.</p>
      <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true"><input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></div>
      <label className="check"><input type="checkbox" checked={contact} onChange={(e) => setContact(e.target.checked)} /><span><strong>Wymagane:</strong> proszę o kontakt w sprawie mojego zgłoszenia na podany adres e-mail. <Link href="/polityka-prywatnosci">Jak przetwarzamy dane</Link></span></label>
      {phone && <label className="check"><input type="checkbox" checked={phoneOk} onChange={(e) => setPhoneOk(e.target.checked)} /><span>Zgadzam się na kontakt telefoniczny w sprawie mojego zgłoszenia.</span></label>}
      <label className="check"><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} /><span><strong>Opcjonalnie:</strong> chcę otrzymywać materiały edukacyjne i informacje o usługach Nowego Etapu e-mailem. Mogę zrezygnować w każdej chwili.</span></label>
      {err && <p className="field__error" role="alert">{err}</p>}
      <button type="submit" className="btn btn--gold btn--block" disabled={state === "sending"} style={{ marginTop: 10 }}>{state === "sending" ? "Wysyłam…" : "Wyślij zgłoszenie"}</button>
      <p className="xsmall muted" style={{ marginTop: 8, marginBottom: 0 }}>Bez zobowiązań. Zgłoszenie nie zawiera odpowiedzi z narzędzi.</p>
    </form>
  );
}
