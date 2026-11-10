"use client";
/**
 * Bezpieczna warstwa analityczna.
 * - Działa tylko, gdy ustawiono NEXT_PUBLIC_GTM_ID ORAZ użytkownik zgodził się na analitykę.
 * - Przyjmuje WYŁĄCZNIE nazwy zdarzeń z listy i identyfikator narzędzia/materiału.
 *   Nigdy nie przekazujemy odpowiedzi, kwot, informacji o dzieciach ani danych kontaktowych.
 */
export type SafeEvent =
  | "tool_start"
  | "tool_step"
  | "tool_complete"
  | "result_print"
  | "result_download"
  | "result_edit"
  | "email_request"
  | "lead_submit"
  | "offer_click"
  | "material_view"
  | "material_open"
  | "quick_exit";

type SafeParams = { tool?: string; step?: number; offer?: string; material?: string };

const ALLOWED_KEYS = new Set(["tool", "step", "offer", "material"]);

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem("ne_consent_analytics") === "granted";
  } catch {
    return false;
  }
}

export function track(event: SafeEvent, params: SafeParams = {}) {
  if (typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_GTM_ID || !hasAnalyticsConsent()) return;
  const clean: Record<string, string | number> = {};
  for (const [k, v] of Object.entries(params)) {
    if (!ALLOWED_KEYS.has(k)) continue;
    if (typeof v === "number" && Number.isFinite(v)) clean[k] = v;
    else if (typeof v === "string" && /^[a-z0-9-]{1,60}$/.test(v)) clean[k] = v;
  }
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: `ne_${event}`, ...clean });
}
