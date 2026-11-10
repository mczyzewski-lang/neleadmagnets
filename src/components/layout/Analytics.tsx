"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { captureAttribution } from "@/lib/attribution";

const GTM = process.env.NEXT_PUBLIC_GTM_ID;

function loadGtm(id: string) {
  if (document.getElementById("gtm-js")) return;
  const w = window as unknown as { dataLayer: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.id = "gtm-js";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

/** Zapis atrybucji UTM + baner zgody (wyświetlany tylko gdy skonfigurowano GTM). */
export function Analytics() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    captureAttribution();
    if (!GTM) return;
    let c: string | null = null;
    try { c = localStorage.getItem("ne_consent_analytics"); } catch {}
    if (c === "granted") loadGtm(GTM);
    else if (c !== "denied") setShow(true);
  }, []);
  if (!GTM || !show) return null;
  const decide = (v: "granted" | "denied") => {
    try { localStorage.setItem("ne_consent_analytics", v); } catch {}
    if (v === "granted") loadGtm(GTM);
    setShow(false);
  };
  return (
    <div className="cookie" role="dialog" aria-label="Zgoda na analitykę">
      <p><strong>Czy możemy mierzyć skuteczność strony?</strong></p>
      <p className="small">Za Twoją zgodą użyjemy narzędzi analitycznych, aby wiedzieć, które narzędzia są przydatne. Nigdy nie przekazujemy do nich Twoich odpowiedzi, kwot ani danych o dzieciach. <Link href="/polityka-prywatnosci#cookies">Szczegóły</Link></p>
      <div className="btn-row">
        <button className="btn btn--sm" onClick={() => decide("granted")}>Zgadzam się</button>
        <button className="btn btn--ghost btn--sm" onClick={() => decide("denied")}>Tylko niezbędne</button>
      </div>
    </div>
  );
}
