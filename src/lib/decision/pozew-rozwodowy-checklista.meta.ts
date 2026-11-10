import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "pozew-rozwodowy-checklista",
  short: "Pozew — gdzie i co zawiera",
  icon: "doc",
  cardTitle: "Pozew rozwodowy: gdzie złożyć i co zawiera",
  cardDesc: "Sprawdź, który sąd okręgowy jest właściwy (art. 41 KPC), i otrzymaj listę kontrolną elementów pozwu dopasowaną do Twojej sytuacji.",
  outcome: "Właściwy sąd według reguł art. 41 KPC, konspekt pozwu z checkboxami, lista załączników, PDF",
  time: "ok. 4 min",
  h1: "Pozew rozwodowy: gdzie go złożyć i co powinien zawierać",
  h2: "Odpowiedz na kilka pytań i zobacz, który sąd jest właściwy oraz jakie elementy, wnioski i załączniki powinien zawierać pozew w Twojej sytuacji.",
  seo: {
    title: "Pozew o rozwód — gdzie złożyć i co zawiera (checklista)",
    description: "Który sąd okręgowy jest właściwy do rozwodu (art. 41 KPC)? Lista kontrolna elementów pozwu: żądania, dzieci, majątek, załączniki, opłata 600 zł.",
  },
  ctaLabel: "Sprawdź koszt pomocy w przygotowaniu pozwu i ustaleń",
  primaryOffer: "plan-rozwodu",
  how: ["Odpowiedz na pytania o miejsce zamieszkania, dzieci i majątek", "Zobacz właściwy sąd i konspekt pozwu", "Odhaczaj elementy i pobierz listę kontrolną"],
  faq: [
    { q: "Który sąd rozpatruje sprawę rozwodową?", a: "Wyłącznie sąd okręgowy. Właściwy jest sąd ostatniego wspólnego miejsca zamieszkania małżonków, jeśli choć jedno z nich nadal tam mieszka. Gdy tej podstawy brak — sąd miejsca zamieszkania pozwanego, a gdy i tej brak — powoda (art. 41 KPC)." },
    { q: "Czy mogę wziąć rozwód w urzędzie stanu cywilnego?", a: "Nie. Ustawa o rozwodach przed kierownikiem USC została zawetowana w kwietniu 2026 r. i nie obowiązuje. Rozwód orzeka wyłącznie sąd okręgowy." },
    { q: "Ile kosztuje złożenie pozwu o rozwód?", a: "Opłata od pozwu wynosi 600 zł. Przy rozwodzie bez orzekania o winie na zgodne żądanie możliwy jest zwrot połowy opłaty po uprawomocnieniu wyroku. Dodatkowe koszty to np. pełnomocnik czy odpisy dokumentów." },
    { q: "Czy narzędzie przygotuje mi pozew?", a: "Nie. Otrzymujesz konspekt — listę elementów, wniosków i załączników do sprawdzenia. Treść pozwu zależy od szczegółów sprawy i warto przygotować ją z prawnikiem." },
    { q: "Co, jeśli druga strona mieszka za granicą?", a: "Wtedy kluczowe jest, czy sąd polski ma jurysdykcję — decydują o tym m.in. przepisy unijne. Taka sytuacja wymaga konsultacji przed złożeniem pozwu." },
  ],
  sources: [
    { ...SRC.kpc, label: "Kodeks postępowania cywilnego — art. 17 pkt 1, art. 41, art. 187" },
    { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 56–58, 60" },
    { ...SRC.uksc, label: "Ustawa o kosztach sądowych w sprawach cywilnych — art. 26, 38, 79" },
  ],
};
