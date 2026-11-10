"use client";
/**
 * Atrybucja kampanii: zapisujemy parametry UTM i identyfikatory kliknięć w sessionStorage
 * (znikają po zamknięciu karty). Przekazywane są do CRM wyłącznie wraz z dobrowolnym zgłoszeniem.
 * Nigdy nie dopisujemy do URL odpowiedzi użytkownika.
 */
const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "gbraid", "wbraid", "fbclid"] as const;
export type Attribution = Partial<Record<(typeof KEYS)[number] | "landing", string>>;

export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const k of KEYS) {
      const v = params.get(k);
      if (v) found[k] = v.slice(0, 200);
    }
    if (Object.keys(found).length) {
      found.landing = window.location.pathname.slice(0, 200);
      window.sessionStorage.setItem("ne_attr", JSON.stringify(found));
    }
  } catch {
    /* sessionStorage niedostępny — pomijamy */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.sessionStorage.getItem("ne_attr") || "{}");
  } catch {
    return {};
  }
}

/** Ostatnie narzędzie, z którego użytkownik przeszedł do oferty (bez odpowiedzi). */
export function setSourceTool(tool: string) {
  try {
    window.sessionStorage.setItem("ne_source", tool);
  } catch {}
}
export function getSourceTool(): string | undefined {
  try {
    return window.sessionStorage.getItem("ne_source") || undefined;
  } catch {
    return undefined;
  }
}
