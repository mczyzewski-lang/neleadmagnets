/**
 * Propozycje treści reklam dla stron /demo.
 * Limity (stan na 11.2026 — sprawdź przed publikacją):
 *  Meta: tekst główny ≤125 zn. (zalecane), nagłówek ≤40, opis ≤30
 *  Google Demand Gen: nagłówek ≤40, długi nagłówek ≤90, opis ≤90
 *  Google Search (RSA): nagłówek ≤30 (3–15 szt.), tekst reklamy ≤90 (2–4 szt.), ścieżka ≤15
 * Zasady: bez sugerowania znajomości sytuacji osobistej odbiorcy (Meta: personal attributes),
 * bez remarketingu i list klientów (Google: kategoria wrażliwa „trudności w związku”).
 */
export type MetaCta = "Dowiedz się więcej" | "Pobierz" | "Zobacz więcej" | "Zarejestruj się" | "Skontaktuj się z nami" | "Wypróbuj";

export type AdSet = {
  slug: string;
  /** Główny kąt komunikacji (1 zdanie) */
  angle: string;
  /** Sugerowane kierowanie — kontekstowe / tematyczne, bez wnioskowania o kryzysie */
  targeting: string;
  meta: {
    primaryTexts: string[]; // 3
    headlines: string[]; // 3–5, ≤40
    descriptions: string[]; // 2, ≤30
    cta: MetaCta;
    /** Krótki opis kreacji (grafika/wideo) */
    creative: string;
  };
  demandGen: {
    headlines: string[]; // 5, ≤40
    longHeadlines: string[]; // 3, ≤90
    descriptions: string[]; // 3, ≤90
    cta: string;
    creative: string;
  };
  search: {
    keywords: string[]; // 8–12 fraz
    headlines: string[]; // 10–15, ≤30
    descriptions: string[]; // 4, ≤90
    paths: [string, string]; // ≤15 każda
  };
  /** Uwagi zgodności (opcjonalnie) */
  notes?: string[];
};

export const LIMITS = {
  metaPrimary: 125,
  metaHeadline: 40,
  metaDescription: 30,
  dgHeadline: 40,
  dgLong: 90,
  dgDescription: 90,
  searchHeadline: 30,
  searchDescription: 90,
  searchPath: 15,
} as const;
