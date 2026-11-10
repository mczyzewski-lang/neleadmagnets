import type { AdSet } from "./types";

export const ads: AdSet = {
  slug: "kompas-decyzji",
  angle: "Nie podpowiadamy, co zrobić — pomagamy uporządkować myśli, wartości i możliwe drogi, zanim zapadnie decyzja.",
  targeting: "Kontekstowo: psychologia, relacje, rozwój osobisty, zdrowie psychiczne (bez kierowania na osoby w kryzysie). Słowa kluczowe informacyjne. Bez remarketingu i list klientów.",
  meta: {
    primaryTexts: [
      "Kryzys w związku nie wymaga decyzji z dnia na dzień. Uporządkuj to, co ważne, i zobacz wszystkie możliwe drogi.",
      "Bez oceniania i bez podpowiadania decyzji. Zobacz swój obraz sytuacji, pytania do refleksji i plan małych kroków na 7 dni.",
      "Co jest dla Ciebie najważniejsze: spokój, dzieci, bezpieczeństwo? Bezpłatne narzędzie do refleksji w 4 minuty.",
    ],
    headlines: ["Uporządkuj myśli spokojnie", "Kompas decyzji — bezpłatnie", "Wszystkie możliwe drogi", "Bez oceniania, bez presji"],
    descriptions: ["Plan małych kroków na 7 dni", "Nie podpowiadamy decyzji"],
    cta: "Wypróbuj",
    creative: "Grafika 1:1: ekran telefonu z wykresem „Twój obraz sytuacji” (poziome paski) i chipami dróg (terapia par, czas osobno, mediacja, separacja, rozwód). Nagłówek: „Uporządkuj myśli, zanim zdecydujesz”.",
  },
  demandGen: {
    headlines: ["Kompas decyzji w 4 minuty", "Uporządkuj myśli, zanim zdecydujesz", "Kryzys w związku? Zobacz drogi", "Bez oceniania i bez presji", "Pytania, które pomagają zdecydować"],
    longHeadlines: [
      "Kompas decyzji: uporządkuj wartości, obraz sytuacji i drogi — bez gotowych odpowiedzi",
      "Terapia, czas osobno, mediacja, separacja czy rozwód? Poznaj drogi i ich konsekwencje",
      "Bezpłatne narzędzie do refleksji z planem małych kroków na najbliższe 7 dni",
    ],
    descriptions: [
      "Narzędzie nie wylicza wyniku i nie mówi, co zrobić. Porządkuje Twoje odpowiedzi.",
      "Sprawdź, czego Ci brakuje i gdzie to znaleźć: finanse, mieszkanie, dzieci, prawo.",
      "Bez logowania. Odpowiedzi nie są zapisywane. Wynik możesz pobrać jako PDF.",
    ],
    cta: "Zacznij",
    creative: "Wideo 20 s: kompas obracający się nad mapą z sześcioma ścieżkami (ilustracja liniowa w zieleni i złocie) → ekran wyniku w telefonie. VO: „Nie powiemy Ci, co zrobić. Pomożemy zobaczyć, co jest ważne.”",
  },
  search: {
    keywords: ["kryzys w związku co robić", "czy się rozstać", "jak podjąć decyzję o rozstaniu", "rozstanie czy terapia", "separacja czy terapia par", "kryzys w małżeństwie", "jak uratować związek czy odejść", "czas osobno w związku"],
    headlines: ["Kompas decyzji", "Kryzys w związku?", "Uporządkuj myśli", "Bez oceniania i presji", "Poznaj możliwe drogi", "Terapia, separacja, rozwód", "Plan na 7 dni", "Bezpłatne narzędzie", "Wynik w 4 minuty", "Pytania do refleksji", "Nowy Etap – poradnia", "Bez podawania danych"],
    descriptions: [
      "Nie podpowiadamy decyzji. Pomagamy zobaczyć wartości, obraz sytuacji i możliwe drogi.",
      "Terapia par, czas osobno, mediacja, separacja czy rozwód — neutralnie, bez rankingu.",
      "Pytania do refleksji i plan małych kroków na 7 dni. Do pobrania jako PDF.",
      "Bez logowania. Twoje odpowiedzi nie są zapisywane. Nowy Etap – poradnia rozwodowa.",
    ],
    paths: ["przed-decyzja", "kompas"],
  },
  notes: ["Nie obiecuj „odpowiedzi, czy się rozstać” — narzędzie celowo jej nie daje."],
};
