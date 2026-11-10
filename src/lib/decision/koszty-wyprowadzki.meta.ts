import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "koszty-wyprowadzki",
  short: "Koszty wyprowadzki",
  icon: "home",
  cardTitle: "Ile kosztuje wyprowadzka po rozstaniu?",
  cardDesc: "Kaucja, przeprowadzka, meble, media i podwójne koszty na start — policz, ile potrzebujesz i na jak długo starczą oszczędności.",
  outcome: "Kwota na start, miesięczny koszt nowego mieszkania, liczba miesięcy z oszczędności, lista zakupów do odłożenia",
  time: "ok. 4 min",
  h1: "Ile kosztuje wyprowadzka po rozstaniu?",
  h2: "Policz koszty startu w nowym mieszkaniu i sprawdź, na ile miesięcy wystarczą Twoje oszczędności.",
  seo: {
    title: "Ile kosztuje wyprowadzka po rozstaniu? Kalkulator",
    description: "Bezpłatny kalkulator wyprowadzki: kaucja, czynsz, przeprowadzka, meble, media, okres przejściowy. Kwota na start i plan zakupów.",
  },
  ctaLabel: "Zobacz, jakie ustalenia finansowe warto przygotować przed rozwodem",
  primaryOffer: "plan-rozwodu",
  how: ["Wpisz koszty najmu i odznacz to, czego nie potrzebujesz", "Zobacz kwotę na start i miesięczny koszt", "Sprawdź, co można odłożyć, i pobierz zestawienie"],
  faq: [
    { q: "Skąd wziąć kwoty?", a: "Najlepiej z konkretnych ofert najmu, wycen przeprowadzki i sklepów. Kalkulator nie podstawia „średnich cen” — wpisujesz własne liczby, więc wynik odpowiada Twojej sytuacji." },
    { q: "Czy wyprowadzka ma znaczenie prawne?", a: "Może mieć — np. dla ustaleń dotyczących dzieci, korzystania ze wspólnego mieszkania czy rozliczeń kosztów. Zanim podejmiesz decyzję o wyprowadzce, zwłaszcza z dziećmi, warto to skonsultować." },
    { q: "Kto płaci za dotychczasowe mieszkanie po wyprowadzce?", a: "To zależy od umów (najem, kredyt) i Waszych ustaleń. Wyprowadzka nie zwalnia z umowy kredytu ani najmu, której jesteś stroną. Warto spisać zasady na okres przejściowy." },
    { q: "Czy dane są gdzieś zapisywane?", a: "Nie. Obliczenia wykonuje Twoja przeglądarka. Możesz pobrać zestawienie lub wysłać je sobie e-mailem." },
  ],
  sources: [{ ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 27 (przyczynianie się do potrzeb rodziny), art. 58 § 2" }, { ...SRC.kc, label: "Kodeks cywilny — art. 366 (odpowiedzialność solidarna)" }],
};
