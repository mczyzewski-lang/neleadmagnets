"use client";
import { useId, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Alert } from "@/components/ui/Alert";
import { useCapabilities } from "@/components/tool/ResultActions";
import { getAttribution } from "@/lib/attribution";
import { track } from "@/lib/analytics";

/** Dostęp do materiału: od razu online (bez danych) albo — opcjonalnie — link na e-mail. */
export function MaterialGetForm({ slug, title }: { slug: string; title: string }) {
  const caps = useCapabilities();
  const id = useId();
  const [email, setEmail] = useState("");
  const [delivery, setDelivery] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [hp, setHp] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return setErr("Wpisz poprawny adres e-mail.");
    if (!delivery) return setErr("Zaznacz zgodę na wysłanie materiału.");
    setErr(null);
    setState("sending");
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "material", material: slug, email, consents: { delivery, marketing }, attribution: getAttribution(), website: hp }) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Nie udało się wysłać.");
      track("lead_submit", { material: slug });
      setState("sent");
    } catch (e2) {
      setState("error");
      setErr(e2 instanceof Error ? e2.message : "Nie udało się wysłać.");
    }
  };

  return (
    <div className="card" id="pobierz" style={{ scrollMarginTop: 80 }}>
      <h2 style={{ fontSize: "var(--fs-xl)" }}>Odbierz bezpłatnie: {title}</h2>
      <Link href={`/materialy/${slug}/czytaj`} className="btn btn--gold btn--block" onClick={() => track("material_open", { material: slug })}>
        <Icon name="book" width={18} /> Otwórz teraz — bez podawania danych
      </Link>
      <p className="xsmall muted" style={{ marginTop: 8 }}>Możesz go od razu wydrukować lub zapisać jako PDF.</p>

      {caps?.email && state !== "sent" && (
        <form onSubmit={submit} noValidate style={{ borderTop: "1px solid var(--line)", marginTop: 16, paddingTop: 16 }}>
          <p className="small" style={{ fontWeight: 600 }}>Wolisz mieć link pod ręką? Wyślemy go na e-mail.</p>
          <div className="field">
            <label className="field__label" htmlFor={`${id}-e`}>Adres e-mail</label>
            <input id={`${id}-e`} className="input" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true"><input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></div>
          <label className="check"><input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} /><span><strong>Wymagane:</strong> proszę o wysłanie linku do materiału na podany adres. <Link href="/polityka-prywatnosci">Jak przetwarzamy dane</Link></span></label>
          <label className="check"><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} /><span><strong>Opcjonalnie:</strong> chcę otrzymywać od Nowego Etapu kolejne materiały edukacyjne i informacje o usługach e-mailem. Mogę zrezygnować w każdej chwili.</span></label>
          {err && <p className="field__error" role="alert">{err}</p>}
          <button className="btn btn--ghost btn--block" type="submit" disabled={state === "sending"} style={{ marginTop: 8 }}>{state === "sending" ? "Wysyłam…" : "Wyślij link na e-mail"}</button>
        </form>
      )}
      {state === "sent" && <div className="mt"><Alert tone="ok"><p>Wysłaliśmy link na <strong>{email}</strong>.</p></Alert></div>}
    </div>
  );
}
