import type { AdSet } from "./types";

export const ads: AdSet = {
  slug: "pozew-rozwodowy-checklista",
  angle: "Konkret dla osób przed pozwem: który sąd jest właściwy i czego nie pominąć w pozwie — z listą kontrolną.",
  targeting: "Search (główny kanał — wysoka intencja): frazy o pozwie rozwodowym, właściwym sądzie, załącznikach. Demand Gen: tematy prawo, poradniki prawne; szeroka demografia 28–60. Bez remarketingu i list klientów.",
  meta: {
    primaryTexts: [
      "Który sąd jest właściwy do rozwodu i co musi zawierać pozew? Odpowiedz na kilka pytań i pobierz bezpłatną listę kontrolną.",
      "Żądania, dzieci, majątek, załączniki, opłata 600 zł — sprawdź, czego nie pominąć w pozwie. Konspekt do wydruku.",
      "Rozwód orzeka wyłącznie sąd okręgowy. Sprawdź, który (art. 41 KPC) i jakie dokumenty przygotować. Bez podawania danych.",
    ],
    headlines: ["Pozew o rozwód — checklista", "Który sąd jest właściwy?", "Czego nie pominąć w pozwie", "Konspekt pozwu w 4 minuty"],
    descriptions: ["Bezpłatna lista kontrolna", "Wynik do wydruku i PDF"],
    cta: "Pobierz",
    creative: "Grafika 1:1: lista kontrolna z 5 pozycjami (2 odhaczone) i plakietka „Właściwy sąd · art. 41 KPC”. Wideo 15 s: odpowiedzi → podświetlenie właściwej reguły → checklista.",
  },
  demandGen: {
    headlines: ["Pozew o rozwód — checklista", "Który sąd rozpatrzy rozwód?", "Co musi zawierać pozew?", "Załączniki do pozwu — lista", "Konspekt pozwu za darmo"],
    longHeadlines: [
      "Gdzie złożyć pozew o rozwód i co powinien zawierać? Bezpłatna lista kontrolna",
      "Sprawdź właściwy sąd okręgowy według art. 41 KPC i pobierz konspekt pozwu",
      "Żądania, dzieci, majątek, załączniki — nie pomiń niczego w pozwie o rozwód",
    ],
    descriptions: [
      "Odpowiedz na kilka pytań i pobierz konspekt pozwu dopasowany do Twojej sytuacji.",
      "To lista kontrolna, nie gotowy pozew — pomoże przygotować się do rozmowy z prawnikiem.",
      "Bez zakładania konta i bez podawania danych. Wynik pobierzesz jako PDF.",
    ],
    cta: "Sprawdź",
    creative: "Obraz 1.91:1: dokument z nagłówkiem „Konspekt pozwu” i trzema regułami właściwości (jedna podświetlona), jasne tło, logo.",
  },
  search: {
    keywords: ["pozew o rozwód", "pozew rozwodowy co musi zawierać", "gdzie złożyć pozew o rozwód", "który sąd rozwód", "właściwość sądu rozwód", "załączniki do pozwu o rozwód", "jak napisać pozew o rozwód", "opłata od pozwu o rozwód", "pozew o rozwód bez orzekania o winie", "pozew rozwodowy wzór"],
    headlines: ["Pozew o rozwód – checklista", "Który sąd jest właściwy?", "Co musi zawierać pozew", "Załączniki do pozwu", "Konspekt pozwu za darmo", "Właściwy sąd – art. 41 KPC", "Opłata od pozwu 600 zł", "Wynik w 4 minuty", "Lista do wydruku (PDF)", "Bez podawania danych", "Nowy Etap – poradnia", "Przygotuj się do pozwu"],
    descriptions: [
      "Sprawdź, który sąd okręgowy jest właściwy, i pobierz listę kontrolną elementów pozwu.",
      "Żądania, dzieci, majątek, załączniki, opłata. Konspekt dopasowany do Twojej sytuacji.",
      "To nie gotowy wzór pozwu — to lista kontrolna, która pomoże niczego nie pominąć.",
      "Najpierw plan i ustalenia, potem pozew. Bezpłatne narzędzia Nowego Etapu.",
    ],
    paths: ["pozew", "checklista"],
  },
  notes: ["Fraza „pozew rozwodowy wzór” ma intencję pobrania wzoru — w reklamie jasno komunikuj, że to lista kontrolna, nie wzór pozwu."],
};
