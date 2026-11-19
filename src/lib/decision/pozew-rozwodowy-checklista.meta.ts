import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "pozew-rozwodowy-checklista",
  short: "Pozew: gdzie i co zawiera",
  icon: "doc",
  cardTitle: "Pozew rozwodowy: gdzie złożyć i co zawiera",
  cardDesc: "Sprawdź, który sąd okręgowy jest właściwy, co zrobić przed pozwem (plan, ustalenia, próba mediacji) i co powinien zawierać pozew.",
  outcome: "Właściwy sąd, kroki przed pozwem (plan, ustalenia, próba mediacji), konspekt pozwu z checkboxami, lista załączników, PDF",
  time: "ok. 4 min",
  h1: "Pozew rozwodowy: gdzie go złożyć i co powinien zawierać",
  h2: "Odpowiedz na kilka pytań. Zobacz, który sąd jest właściwy i co powinien zawierać pozew w Twojej sytuacji.",
  seo: {
    title: "Pozew o rozwód: gdzie złożyć i co zawiera (checklista)",
    description: "Który sąd okręgowy jest właściwy do rozwodu? Lista kontrolna elementów pozwu: żądania, dzieci, majątek, załączniki, opłata 600 zł.",
  },
  ctaLabel: "Sprawdź koszt pomocy w przygotowaniu pozwu i ustaleń",
  primaryOffer: "plan-rozwodu",
  how: ["Odpowiedz na pytania o miejsce zamieszkania, dzieci, majątek i próbę mediacji", "Sprawdź, co ustalić przed pozwem, i zobacz właściwy sąd", "Odhaczaj elementy konspektu i pobierz listę kontrolną"],
  faq: [
    { q: "Który sąd rozpatruje sprawę rozwodową?", a: "Wyłącznie sąd okręgowy. Właściwy jest sąd ostatniego wspólnego miejsca zamieszkania małżonków, jeśli choć jedno z nich nadal tam mieszka. Jeśli nie, sąd miejsca zamieszkania pozwanego, a jeśli i to nie pasuje, powoda." },
    { q: "Czy mogę wziąć rozwód w urzędzie stanu cywilnego?", a: "Nie. Ustawa o rozwodach w USC została zawetowana w kwietniu 2026 r. Rozwód orzeka wyłącznie sąd okręgowy." },
    { q: "Ile kosztuje złożenie pozwu o rozwód?", a: "Opłata od pozwu to 600 zł. Przy rozwodzie bez orzekania o winie na zgodne żądanie sąd zwraca połowę opłaty. Dodatkowe koszty to np. pełnomocnik i odpisy dokumentów." },
    { q: "Czy przed pozwem trzeba próbować mediacji?", a: "Mediacja jest dobrowolna, ale w pozwie trzeba napisać, czy była próba mediacji lub innego polubownego rozwiązania, a jeśli nie, dlaczego. Mediację zwykle zaczyna zaproszenie od Ciebie albo od wybranego mediatora. Przy wyraźnej odmowie mediator może to potwierdzić na piśmie. Taka próba ma znaczenie, a strona, która bez ważnego powodu odmówiła, może ponieść koszty. Przy przemocy, groźbach lub kontroli nie musisz proponować mediacji." },
    { q: "Czy narzędzie przygotuje mi pozew?", a: "Nie. Dostajesz konspekt: listę elementów, wniosków i załączników do sprawdzenia. Treść pozwu zależy od szczegółów sprawy, warto przygotować ją z prawnikiem." },
    { q: "Co, jeśli druga strona mieszka za granicą?", a: "Wtedy kluczowe jest, czy sąd polski może rozpoznać sprawę. Decydują o tym m.in. przepisy unijne. Skonsultuj to przed złożeniem pozwu." },
  ],
  sources: [
    { ...SRC.kpc, label: "Kodeks postępowania cywilnego — art. 17 pkt 1, art. 41, art. 103, art. 187 § 1 pkt 3" },
    { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 56–58, 60" },
    { ...SRC.uksc, label: "Ustawa o kosztach sądowych w sprawach cywilnych — art. 26, 38, 79" },
  ],
};
