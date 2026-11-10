/**
 * Wspólne typy treści. Treści prawne są materiałem informacyjnym
 * i przed publikacją produkcyjną wymagają akceptacji prawnika rodzinnego.
 */

export type SourceRef = {
  /** Krótka nazwa źródła, np. "Kodeks rodzinny i opiekuńczy, art. 58" */
  label: string;
  /** Pełny URL do oficjalnego źródła (ISAP, gov.pl, eli.gov.pl) */
  url: string;
  /** Data weryfikacji w formacie RRRR-MM-DD */
  verified?: string;
};

export type FaqItem = { q: string; a: string };

/** Klucze ofert zdefiniowanych w src/lib/offers.ts */
export type OfferKey = "plan-rozwodu" | "mediacja" | "materialy" | "duo" | "konsultacja";

/* ---------- Materiały do pobrania (10 dodatkowych lead magnetów) ---------- */

export type MaterialBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "checklist"; items: string[] }
  | { type: "callout"; tone: "info" | "warning" | "safety"; title?: string; text: string }
  | { type: "table"; head: string[]; rows: string[][]; caption?: string }
  /** Pola do samodzielnego wypełnienia (drukowane jako puste linie) */
  | { type: "worksheet"; title?: string; fields: string[] }
  /** Przykładowe sformułowania / wiadomości */
  | { type: "script"; title?: string; lines: { label: string; text: string }[] };

export type MaterialSection = {
  heading: string;
  intro?: string;
  blocks: MaterialBlock[];
};

export type Material = {
  slug: string;
  /** Typ materiału widoczny na okładce */
  format: "Przewodnik" | "Checklista" | "Arkusz" | "Planer" | "Zeszyt ćwiczeń" | "Skrypt rozmowy" | "Zestaw szablonów";
  /** Tytuł na okładce (krótki) */
  coverTitle: string;
  /** Podtytuł na okładce */
  coverSubtitle: string;
  /** Akcent kolorystyczny okładki */
  coverTone: "green" | "gold" | "dark" | "cream";
  /** Landing */
  h1: string;
  h2: string;
  /** Jedno zdanie obietnicy dla karty na stronie głównej */
  promise: string;
  /** Dla kogo — 3–4 punkty */
  forWho: string[];
  /** Co jest w środku — 5–7 punktów */
  inside: string[];
  /** Szacowany czas lektury/wypełnienia, np. "15 min" */
  time: string;
  faq: FaqItem[];
  sources: SourceRef[];
  /** Oferta Nowego Etapu adekwatna jako kolejny krok */
  nextOffer: OfferKey;
  /** Kontekstowe CTA pod materiałem */
  ctaLabel: string;
  seo: { title: string; description: string };
  /** Prompt do wygenerowania okładki 3D (OpenAI Images) */
  coverPrompt: string;
  /** Właściwa treść materiału */
  sections: MaterialSection[];
};
