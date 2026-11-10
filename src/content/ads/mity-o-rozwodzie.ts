import type { AdSet } from "./types";

export const ads: AdSet = {
  slug: "mity-o-rozwodzie",
  angle: "Ciekawość i weryfikacja popularnych przekonań: krótki quiz „mit czy fakt” z wyjaśnieniem w przepisach.",
  targeting: "Demand Gen: zainteresowania ogólne (prawo i finanse osobiste, rodzina, poradniki), kontekst treści edukacyjnych; Search: frazy informacyjne o zasadach rozwodu. Bez list remarketingowych i podobnych odbiorców.",
  meta: {
    primaryTexts: [
      "Czy rozwód zwalnia ze wspólnego kredytu? Czy mediacja jest obowiązkowa? Sprawdź 12 popularnych mitów — z wyjaśnieniem.",
      "Mit czy fakt? 12 przekonań o rozwodzie, majątku i dzieciach. Przy każdym krótkie wyjaśnienie i źródło w przepisach.",
      "Rozwód w urzędzie stanu cywilnego? 600 zł opłaty? Sprawdź w 3 minuty, co jest prawdą. Bezpłatnie, bez logowania.",
    ],
    headlines: ["Mit czy fakt? 12 pytań o rozwód", "Sprawdź 12 mitów o rozwodzie", "Quiz: co wiesz o rozwodzie?", "Rozwód a kredyt: mit czy fakt?"],
    descriptions: ["Wyjaśnienia i źródła", "3 minuty, bez logowania"],
    cta: "Wypróbuj",
    creative: "Karta 1:1 z dużym napisem w cudzysłowie „Rozwód zwalnia ze wspólnego kredytu” i dwoma przyciskami MIT / FAKT (złoty i biały obrys) na tle #263D3A. Wersja karuzeli: 4 karty z różnymi twierdzeniami, ostatnia — wynik 10/12 i CTA.",
  },
  demandGen: {
    headlines: ["Mit czy fakt? Quiz o rozwodzie", "12 mitów o rozwodzie", "Sprawdź swoją wiedzę w 3 minuty", "Rozwód w USC? Sprawdź", "Co mówią przepisy? Quiz"],
    longHeadlines: [
      "Czy rozwód zwalnia ze wspólnego kredytu? Sprawdź 12 popularnych mitów w 3 minuty",
      "Mit czy fakt: rozwód, majątek, dzieci, nazwisko. Krótki quiz z wyjaśnieniami",
      "12 przekonań o rozwodzie, które warto sprawdzić. Przy każdym źródło w przepisach",
    ],
    descriptions: [
      "Bezpłatny quiz Nowego Etapu. Po każdej odpowiedzi krótkie wyjaśnienie i podstawa prawna.",
      "To nie test, tylko przegląd. Na końcu lista tematów, które warto doczytać. Bez logowania.",
      "Kredyt, mediacja, nazwisko, majątek, dzieci — 12 twierdzeń, które często słychać.",
    ],
    cta: "Sprawdź",
    creative: "Wideo 9:16, 15 s: na ekranie telefonu pojawia się twierdzenie, palec wybiera „Fakt”, karta odwraca się na „MIT” z jednym zdaniem wyjaśnienia; trzy szybkie powtórzenia, end card z wynikiem 10/12 i logo.",
  },
  search: {
    keywords: ["czy rozwód zwalnia z kredytu", "czy mediacja jest obowiązkowa", "rozwód w usc", "rozwód bez orzekania o winie warunki", "ile kosztuje pozew o rozwód", "powrót do nazwiska po rozwodzie", "separacja a nowy ślub", "podział majątku po rozwodzie", "od ilu lat dziecko decyduje", "alimenty dla byłej żony"],
    headlines: ["Mit czy fakt? Quiz o rozwodzie", "12 mitów o rozwodzie", "Rozwód a wspólny kredyt", "Czy mediacja jest obowiązkowa", "Rozwód w USC? Sprawdź", "Wyjaśnienia i podstawa prawna", "Bezpłatnie, bez logowania", "Sprawdź w 3 minuty", "Nowy Etap — poradnia", "Najpierw wiedza, potem decyzje"],
    descriptions: [
      "12 popularnych przekonań o rozwodzie. Przy każdym wyjaśnienie i źródło w przepisach.",
      "Kredyt, mediacja, nazwisko, majątek, dzieci. Krótki quiz z podsumowaniem do pobrania.",
      "To nie test, tylko przegląd wiedzy. Bezpłatne narzędzie Nowego Etapu, bez logowania.",
      "Stan prawny na listopad 2026. Na końcu lista tematów, które warto doczytać.",
    ],
    paths: ["mity", "rozwod"],
  },
  notes: ["Nie używaj w reklamie sformułowań typu „Twój rozwód”, „Rozwodzisz się?”. Twierdzenia quizu są neutralne i ogólne."],
};
