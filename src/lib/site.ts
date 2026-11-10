export const SITE = {
  name: "Nowy Etap",
  tagline: "Poradnia rozwodowa",
  claim: "Najpierw plan i ustalenia. Dopiero potem pozew.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://nowyetap.pl").replace(/\/$/, ""),
  /** Data ostatniej weryfikacji treści prawnych — aktualizuj po każdym przeglądzie prawnika. */
  legalReviewDate: "2026-11-10",
  /** Ustaw na true dopiero po akceptacji treści przez polskiego prawnika rodzinnego. */
  legalApproved: false,
};

export function absoluteUrl(path: string) {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}
