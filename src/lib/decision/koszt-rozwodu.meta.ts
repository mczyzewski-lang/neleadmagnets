import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "koszt-rozwodu",
  short: "Ile kosztuje rozwód?",
  icon: "coins",
  cardTitle: "Ile kosztuje rozwód? Kalkulator kosztów",
  cardDesc: "Policz opłaty sądowe, mediację, podział majątku i pomoc prawną. Porównaj ścieżkę porozumienia ze sporem.",
  outcome: "Suma kosztów (min–max), podział na koszty sądowe i pozostałe, porównanie 2 ścieżek, ukryte koszty",
  time: "ok. 3 min",
  h1: "Ile kosztuje rozwód? Policz to na swoich założeniach.",
  h2: "Opłaty sądowe, mediacja, podział majątku i pomoc prawna w jednym zestawieniu. Plus porównanie porozumienia i sporu.",
  seo: {
    title: "Ile kosztuje rozwód? Kalkulator kosztów 2026",
    description: "Bezpłatny kalkulator: opłata od pozwu, zwrot połowy opłaty, podział majątku, mediacja, pełnomocnik. Porównaj koszty porozumienia i sporu.",
  },
  ctaLabel: "Sprawdź koszt pomocy Nowego Etapu",
  primaryOffer: "plan-rozwodu",
  how: ["Zaznacz drogę, sposób podziału majątku, mediację i pomoc prawną", "Zobacz sumę, podział kosztów i porównanie ścieżek", "Pobierz zestawienie albo zmień założenia"],
  faq: [
    { q: "Ile wynosi opłata od pozwu o rozwód?", a: "600 zł. Tyle samo kosztuje pozew o separację, a zgodny wniosek o separację 100 zł. Przy rozwodzie bez orzekania o winie na zgodny wniosek sąd zwraca połowę opłaty. Szczegóły sprawdź ze specjalistą." },
    { q: "Czy kalkulator podaje ceny prawników?", a: "Nie. Wynagrodzenie pełnomocnika ustala się indywidualnie, więc wpisujesz własne kwoty (np. z wycen). Kalkulator nie zgaduje stawek." },
    { q: "Ile kosztuje mediacja?", a: "Przy mediacji na skierowanie sądu wynagrodzenie mediatora określa rozporządzenie. W sprawach niemajątkowych to kwoty za posiedzenia z górnym limitem. Mediację prywatną wycenia mediator. Kalkulator oznacza te kwoty jako „do weryfikacji”." },
    { q: "Czy podział majątku jest droższy osobno?", a: "Opłata od wniosku o podział majątku to zwykle 1000 zł, a przy zgodnym projekcie podziału 300 zł. Koszt umowy u notariusza zależy od wartości majątku i podaje go notariusz." },
    { q: "Dlaczego porównanie ścieżek jest tylko ilustracją?", a: "Bo opiera się na Twoich założeniach. Rzeczywiste koszty zależą od przebiegu sprawy, liczby rozpraw, dowodów i decyzji stron." },
  ],
  sources: [
    { ...SRC.uksc, label: "Ustawa o kosztach sądowych w sprawach cywilnych — art. 26, 38, 79" },
    { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 57, 58" },
    { ...SRC.kpc, label: "Kodeks postępowania cywilnego — art. 103, mediacja (art. 183¹ i n.), art. 187 § 1 pkt 3" },
  ],
};
