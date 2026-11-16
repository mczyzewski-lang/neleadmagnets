import type { Stage } from "@/content/philosophy";

/** Etap ścieżki (Plan → Ustalenia → Pozew i sąd), któremu służy dane narzędzie */
export const TOOL_STAGE: Record<string, Stage> = {
  // /narzedzia
  "mieszkanie-i-kredyt": 1,
  "budzet-po-rozstaniu": 1,
  "plan-opieki-nad-dzieckiem": 2,
  "konsekwencje-rozstania": 1,
  "przed-pozwem": 2,
  "koszty-utrzymania-dziecka": 1,
  "separacja-czy-rozwod": 1,
  "pierwsze-30-dni": 1,
  // /przed-decyzja
  "koszt-rozwodu": 1,
  "rozmowa-o-rozstaniu": 2,
  "kompas-decyzji": 1,
  "majatek-wspolny-czy-osobisty": 1,
  "wina-czy-bez-winy": 2,
  "porozumienie-przejsciowe": 2,
  "koszty-wyprowadzki": 1,
  "plan-wsparcia": 1,
  "mity-o-rozwodzie": 1,
  "pozew-rozwodowy-checklista": 3,
};
