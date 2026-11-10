/** Walidacja zgłoszeń — współdzielona przez klienta i serwer. */
export const CONSENT_TEXT_VERSION = "2026-11-10";
export const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]{1,190}\.[a-z]{2,24}$/i;
export const PHONE_RE = /^\+?[0-9 ()-]{9,20}$/;
export const SLUG_RE = /^[a-z0-9-]{2,60}$/;

export type LeadKind = "summary" | "material" | "contact";
export const REQUEST_TYPES = ["plan_rozwodu", "wycena", "mediacja", "duo", "konsultacja", "materialy"] as const;
export type RequestType = (typeof REQUEST_TYPES)[number];

export function cleanStr(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().replace(/[\u0000-\u001f<>]/g, "").slice(0, max) : "";
}

export function cleanUtm(input: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!input || typeof input !== "object") return out;
  const allowed = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "gbraid", "wbraid", "fbclid", "landing"];
  for (const k of allowed) {
    const v = (input as Record<string, unknown>)[k];
    if (typeof v === "string" && v) out[k] = v.replace(/[^\w\-./:%]/g, "").slice(0, 200);
  }
  return out;
}
