import type { AdSet } from "./types";

export const ads: AdSet = {
  slug: "plan-wsparcia",
  angle: "W trudnym okresie łatwiej, gdy wiesz, na kogo możesz liczyć i co Ci pomaga — jednostronicowy plan wsparcia do wydruku.",
  targeting: "Kontekstowo: zdrowie psychiczne i dobrostan, psychologia, rodzicielstwo. Szeroko, bez kierowania na osoby w kryzysie i bez remarketingu.",
  meta: {
    primaryTexts: [
      "Rozstanie to bardzo trudny okres. Przygotuj prosty plan: kto Ci pomoże, co działa na Ciebie i co robić w gorszy dzień.",
      "Jednostronicowy plan wsparcia do wydruku — bez imion, bez logowania. Z numerami pomocowymi i planem na trudny dzień.",
      "Wiesz, do kogo zadzwonisz, gdy będzie ciężko? Zbierz to w jednym miejscu w 4 minuty.",
    ],
    headlines: ["Twój plan wsparcia", "Na kogo możesz liczyć?", "Plan na trudny dzień", "Bezpłatny kreator wsparcia"],
    descriptions: ["Jedna strona do wydruku", "Bez logowania i imion"],
    cta: "Dowiedz się więcej",
    creative: "Grafika 1:1: wydrukowana karta „Mój plan wsparcia” na stole obok kubka herbaty — tabelka „kto/w czym”, sekcja „gdy… to…”. Ciepłe światło, bez twarzy. Nagłówek: „Nie musisz przechodzić przez to sam(a)”.",
  },
  demandGen: {
    headlines: ["Mój plan wsparcia — bezpłatnie", "Na kogo możesz liczyć?", "Plan na trudny dzień", "Wsparcie w trudnym okresie", "Jedna strona, która pomaga"],
    longHeadlines: [
      "Osobisty plan wsparcia na czas rozstania: ludzie, strategie i plan na trudny dzień",
      "Plan wsparcia na jednej stronie — z numerami pomocowymi i cotygodniowym check-inem",
      "Nie musisz przechodzić przez to sam(a). Zbierz źródła wsparcia w jednym miejscu",
    ],
    descriptions: [
      "Wybierz role, nie imiona. Plan powstaje w przeglądarce i nie jest nigdzie zapisywany.",
      "Twoje strategie, sygnały ostrzegawcze i plan „gdy… to…”. Do pobrania jako PDF.",
      "Nie zastępuje pomocy specjalisty. Zawiera bezpłatne telefony zaufania.",
    ],
    cta: "Przygotuj plan",
    creative: "Wideo 15 s: kartka planu zapełnia się kolejnymi wierszami (kto/w czym → strategie → numery pomocowe). Spokojna muzyka, napis końcowy: „Twój plan wsparcia. Bezpłatnie.”",
  },
  search: {
    keywords: ["jak poradzić sobie z rozstaniem", "wsparcie po rozstaniu", "jak przetrwać rozwód", "pomoc psychologiczna rozstanie", "jak sobie radzić po rozstaniu", "rozstanie co robić"],
    headlines: ["Twój plan wsparcia", "Jak przetrwać rozstanie", "Plan na trudny dzień", "Bezpłatny kreator", "Jedna strona do wydruku", "Bez logowania i imion", "Numery pomocowe", "Strategie na trudne chwile", "Nowy Etap – poradnia", "Gotowe w 4 minuty"],
    descriptions: [
      "Zbierz w jednym miejscu, kto Ci pomoże, co działa na Ciebie i co robić w trudny dzień.",
      "Jednostronicowy plan do wydruku z numerami pomocowymi i cotygodniowym check-inem.",
      "Bez imion i logowania. Narzędzie porządkujące — nie zastępuje pomocy specjalisty.",
      "Nie musisz przechodzić przez to sam(a). Nowy Etap – poradnia rozwodowa.",
    ],
    paths: ["przed-decyzja", "wsparcie"],
  },
  notes: ["Unikaj komunikatów medycznych i obietnic poprawy samopoczucia (zasady dotyczące zdrowia)."],
};
