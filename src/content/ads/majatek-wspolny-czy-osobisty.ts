import type { AdSet } from "./types";

export const ads: AdSet = {
  slug: "majatek-wspolny-czy-osobisty",
  angle: "Rozwiewa częste wątpliwości („mieszkanie jest na mnie”, „to darowizna od rodziców”) — pokazuje prawdopodobny status każdego składnika z uzasadnieniem.",
  targeting: "Search: frazy o majątku wspólnym/osobistym, darowiźnie, mieszkaniu sprzed ślubu. Demand Gen/Meta: zainteresowania prawo, finanse osobiste, nieruchomości; dorośli 28–60; bez remarketingu i podobnych odbiorców.",
  meta: {
    primaryTexts: [
      "Mieszkanie sprzed ślubu, a raty płacone razem? Darowizna od rodziców? Sprawdź, co może być wspólne, a co osobiste.",
      "„Jest zapisane na mnie, więc jest moje” — nie zawsze. Sprawdź prawdopodobny status każdego składnika majątku.",
      "Majątek wspólny czy osobisty? Dodaj składniki i zobacz uzasadnienie, dokumenty do zebrania i pytania do prawnika.",
    ],
    headlines: ["Majątek wspólny czy osobisty?", "Darowizna, spadek, mieszkanie", "Sprawdź składniki w 5 minut"],
    descriptions: ["Bezpłatnie, bez rejestracji", "Wynik do pobrania w PDF"],
    cta: "Dowiedz się więcej",
    creative: "1:1: lista składników z kolorowymi etykietami (Wspólny / Osobisty / Mieszany / Do analizy) na ekranie telefonu. Bez symboli prawniczych. Tekst: „Wspólne czy moje?”.",
  },
  demandGen: {
    headlines: ["Majątek wspólny czy osobisty?", "Co jest wspólne, a co moje?", "Darowizna a majątek wspólny", "Mieszkanie sprzed ślubu", "Sprawdź składniki majątku"],
    longHeadlines: [
      "Mieszkanie sprzed ślubu, darowizna, spadek — sprawdź, co może być majątkiem wspólnym",
      "Dodaj składniki majątku i zobacz ich prawdopodobny status z uzasadnieniem",
      "Wspólne czy osobiste? Bezpłatne narzędzie z listą dokumentów i pytań do prawnika",
    ],
    descriptions: [
      "Prawdopodobny status każdego składnika: wspólny, osobisty, mieszany lub do analizy.",
      "Zobacz możliwe nakłady do rozliczenia i dokumenty, które warto zebrać. Bezpłatnie.",
      "Bez nazw i danych osobowych. Obliczenia w przeglądarce, wynik do pobrania.",
    ],
    cta: "Sprawdź składniki",
    creative: "1.91:1: tabela czterech składników z etykietami statusów; po lewej nagłówek. Wideo 15 s: dodanie „Samochód — darowizna” i zmiana etykiety na „Osobisty”.",
  },
  search: {
    keywords: ["majątek wspólny czy osobisty", "co wchodzi w skład majątku wspólnego", "mieszkanie kupione przed ślubem a rozwód", "darowizna a majątek wspólny", "spadek a rozwód", "majątek osobisty małżonka", "nakłady z majątku wspólnego na osobisty", "podział majątku po rozwodzie co komu się należy"],
    headlines: ["Majątek wspólny czy osobisty?", "Sprawdź składniki majątku", "Darowizna a majątek wspólny", "Mieszkanie sprzed ślubu", "Spadek a podział majątku", "Co to są nakłady?", "Bezpłatne narzędzie online", "Wynik do pobrania w PDF", "Bez rejestracji", "Nowy Etap — poradnia", "Dokumenty do zebrania", "Pytania do prawnika"],
    descriptions: [
      "Dodaj składniki i zobacz ich status: wspólny, osobisty, mieszany albo do analizy.",
      "Darowizna, spadek, mieszkanie sprzed ślubu — uzasadnienie z przepisami KRO. Bezpłatnie.",
      "Lista możliwych nakładów, dokumentów i pytań do prawnika. Bez podawania danych.",
      "Najpierw plan i ustalenia, potem pozew. Uporządkuj majątek z Nowym Etapem.",
    ],
    paths: ["majatek", "sprawdz"],
  },
};
