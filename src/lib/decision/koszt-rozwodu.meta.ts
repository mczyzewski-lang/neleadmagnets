import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "koszt-rozwodu",
  short: "Ile kosztuje rozwód?",
  icon: "coins",
  cardTitle: "Ile kosztuje rozwód? Kalkulator kosztów",
  cardDesc: "Policz opłaty sądowe, mediację, podział majątku i pomoc prawną — i porównaj ścieżkę porozumienia ze sporem.",
  outcome: "Suma kosztów (min–max), podział na koszty sądowe i pozostałe, porównanie 2 ścieżek, ukryte koszty",
  time: "ok. 3 min",
  h1: "Ile kosztuje rozwód? Policz to na swoich założeniach.",
  h2: "Opłaty sądowe, mediacja, podział majątku i pomoc prawna w jednym zestawieniu — oraz porównanie ścieżki porozumienia i sporu.",
  seo: {
    title: "Ile kosztuje rozwód? Kalkulator kosztów 2026",
    description: "Bezpłatny kalkulator: opłata od pozwu, zwrot połowy opłaty, podział majątku, mediacja, pełnomocnik. Porównaj koszty porozumienia i sporu.",
  },
  ctaLabel: "Sprawdź koszt pomocy Nowego Etapu",
  primaryOffer: "plan-rozwodu",
  how: ["Zaznacz drogę, sposób podziału majątku, mediację i pomoc prawną", "Zobacz sumę, podział kosztów i porównanie ścieżek", "Pobierz zestawienie albo zmień założenia"],
  faq: [
    { q: "Ile wynosi opłata od pozwu o rozwód?", a: "600 zł. Tyle samo wynosi opłata od pozwu o separację, a od zgodnego wniosku o separację — 100 zł (ustawa o kosztach sądowych w sprawach cywilnych). Jeśli sąd orzeknie rozwód bez orzekania o winie na zgodny wniosek, możliwy jest zwrot połowy opłaty — sprawdź szczegóły ze specjalistą." },
    { q: "Czy kalkulator podaje ceny prawników?", a: "Nie. Wynagrodzenie pełnomocnika jest ustalane indywidualnie, dlatego wpisujesz własne kwoty (np. z otrzymanych wycen). Kalkulator nie zgaduje stawek rynkowych." },
    { q: "Ile kosztuje mediacja?", a: "Przy mediacji prowadzonej na skierowanie sądu wynagrodzenie mediatora określa rozporządzenie — w sprawach niemajątkowych są to określone kwoty za posiedzenia z górnym limitem. Mediację prywatną wycenia mediator. Kalkulator pokazuje te kwoty z oznaczeniem „do weryfikacji”." },
    { q: "Czy podział majątku jest droższy osobno?", a: "Opłata od wniosku o podział majątku wynosi co do zasady 1000 zł, a 300 zł przy zgodnym projekcie podziału. Przy umowie u notariusza koszt zależy od wartości majątku — podaje go notariusz." },
    { q: "Dlaczego porównanie ścieżek jest tylko ilustracją?", a: "Bo zbudowane jest z Twoich założeń. Rzeczywiste koszty zależą od przebiegu sprawy, liczby rozpraw, dowodów i decyzji stron." },
  ],
  sources: [
    { ...SRC.uksc, label: "Ustawa o kosztach sądowych w sprawach cywilnych — art. 26, 38, 79" },
    { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 57, 58" },
    { ...SRC.kpc, label: "Kodeks postępowania cywilnego — mediacja (art. 183¹ i n.)" },
  ],
};
