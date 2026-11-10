import type { SourceRef } from "@/content/types";

const V = "2026-11-10";

/** Oficjalne źródła prawne (ISAP — Internetowy System Aktów Prawnych, gov.pl). */
export const SRC = {
  kro: { label: "Kodeks rodzinny i opiekuńczy (ISAP)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: V },
  kc: { label: "Kodeks cywilny (ISAP)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640160093", verified: V },
  kpc: { label: "Kodeks postępowania cywilnego (ISAP)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296", verified: V },
  uksc: { label: "Ustawa o kosztach sądowych w sprawach cywilnych (ISAP)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20051671398", verified: V },
  przemoc: { label: "Ustawa o przeciwdziałaniu przemocy domowej (ISAP)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20051801493", verified: V },
  mediacjeGov: { label: "gov.pl — Rozwiąż spór przez mediacje", url: "https://www.gov.pl/web/gov/rozwiaz-spor-przez-mediacje", verified: V },
  mediacjeMS: { label: "Ministerstwo Sprawiedliwości — Postępowanie mediacyjne w sprawach cywilnych", url: "https://www.gov.pl/web/sprawiedliwosc/postepowanie-mediacyjne-w-sprawach-cywilnych", verified: V },
  eli: { label: "Europejski identyfikator prawodawstwa (ELI) — Polska", url: "https://eli.gov.pl/", verified: V },
  niebieskaLinia: { label: "Niebieska Linia — pomoc dla osób doznających przemocy domowej", url: "https://www.niebieskalinia.info/", verified: V },
} satisfies Record<string, SourceRef>;
