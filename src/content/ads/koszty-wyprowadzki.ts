import type { AdSet } from "./types";

export const ads: AdSet = {
  slug: "koszty-wyprowadzki",
  angle: "Praktyczne pytanie „ile potrzebuję na start w nowym mieszkaniu” — konkretna kwota, plan zakupów i liczba miesięcy, na które starczą oszczędności.",
  targeting: "Search: frazy o kosztach wyprowadzki i najmu. Demand Gen/Meta: zainteresowania mieszkanie/najem, finanse osobiste, przeprowadzki; dorośli 25–55; bez remarketingu i podobnych odbiorców.",
  meta: {
    primaryTexts: [
      "Kaucja, przeprowadzka, łóżko, internet… Ile naprawdę kosztuje start w nowym mieszkaniu? Policz to na własnych kwotach.",
      "Wyprowadzka to nie tylko czynsz. Bezpłatny kalkulator pokaże kwotę na start i co możesz odłożyć na później.",
      "Sprawdź, na ile miesięcy wystarczą oszczędności po przeprowadzce. Bez rejestracji, wynik do pobrania.",
    ],
    headlines: ["Ile kosztuje wyprowadzka?", "Kalkulator kosztów na start", "Kwota na start w 4 minuty"],
    descriptions: ["Bezpłatnie, bez rejestracji", "Plan zakupów w PDF"],
    cta: "Dowiedz się więcej",
    creative: "1:1: kartony i klucze w minimalistycznym ujęciu (bez ludzi) + nakładka z ekranem wyniku „Na start: 8 050 zł”. Ciepłe tło, akcent złoty.",
  },
  demandGen: {
    headlines: ["Ile kosztuje wyprowadzka?", "Policz koszty na start", "Kaucja, meble, przeprowadzka", "Na ile starczą oszczędności?", "Kalkulator wyprowadzki"],
    longHeadlines: [
      "Ile kosztuje start w nowym mieszkaniu? Policz kaucję, meble i przeprowadzkę",
      "Sprawdź, na ile miesięcy wystarczą oszczędności po wyprowadzce",
      "Kalkulator wyprowadzki: kwota na start i lista zakupów, które mogą poczekać",
    ],
    descriptions: [
      "Wpisz własne kwoty, odznacz to, czego nie potrzebujesz, i zobacz kwotę na start.",
      "Bezpłatnie i bez podawania danych. Zestawienie pobierzesz jako PDF.",
      "Uwzględnij podwójne koszty w okresie przejściowym i potrzeby dzieci.",
    ],
    cta: "Policz koszty",
    creative: "1.91:1: po lewej lista z checkboxami (łóżko, internet, kaucja), po prawej wykres kołowy kosztów. Wideo 15 s: odznaczanie pozycji i spadająca kwota na start.",
  },
  search: {
    keywords: ["ile kosztuje wyprowadzka", "koszty wyprowadzki", "ile pieniędzy na wyprowadzkę", "koszt przeprowadzki do wynajmowanego mieszkania", "wyprowadzka po rozstaniu", "ile kosztuje wynajem na start", "kaucja za mieszkanie ile", "wyprowadzka od partnera koszty"],
    headlines: ["Ile kosztuje wyprowadzka?", "Kalkulator wyprowadzki", "Policz kwotę na start", "Kaucja, meble, przeprowadzka", "Na ile starczą oszczędności?", "Bezpłatnie i bez rejestracji", "Wynik do pobrania w PDF", "Co można kupić później?", "Nowy Etap — poradnia", "Policz w 4 minuty"],
    descriptions: [
      "Policz koszty startu w nowym mieszkaniu: kaucja, czynsz, przeprowadzka, meble, media.",
      "Sprawdź, na ile miesięcy wystarczą oszczędności po przeprowadzce. Bezpłatny kalkulator.",
      "Wpisujesz własne kwoty — bez średnich i zgadywania. Zestawienie pobierzesz jako PDF.",
      "Uwzględnij okres przejściowy i potrzeby dzieci. Obliczenia w Twojej przeglądarce.",
    ],
    paths: ["wyprowadzka", "kalkulator"],
  },
};
