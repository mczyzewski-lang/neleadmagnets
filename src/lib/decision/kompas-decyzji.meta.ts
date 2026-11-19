import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "kompas-decyzji",
  short: "Kompas decyzji",
  icon: "map",
  cardTitle: "Kompas decyzji: uporządkuj myśli",
  cardDesc: "Narzędzie do refleksji, które nie podejmuje decyzji za Ciebie. Zobacz obraz sytuacji, możliwe drogi i informacje, których Ci brakuje.",
  outcome: "Obraz sytuacji, mapa możliwych dróg, pytania do refleksji, plan na 7 dni",
  time: "ok. 4 min",
  h1: "Kompas decyzji: uporządkuj myśli, zanim zdecydujesz",
  h2: "Nie powiemy Ci, co zrobić. Pomożemy zobaczyć, co jest dla Ciebie ważne, jakie masz możliwości i czego jeszcze potrzebujesz się dowiedzieć.",
  seo: {
    title: "Kryzys w związku: kompas decyzji i możliwe drogi",
    description: "Bezpłatne narzędzie do refleksji: wartości, obraz sytuacji, możliwe drogi (terapia, czas osobno, mediacja, separacja, rozwód) i plan małych kroków na 7 dni.",
  },
  ctaLabel: "Porozmawiaj o swojej sytuacji indywidualnie",
  primaryOffer: "konsultacja",
  how: ["Zaznacz, co jest dla Ciebie ważne i jak oceniasz dziś relację", "Zobacz obraz sytuacji i mapę możliwych dróg", "Pobierz pytania do refleksji i plan na 7 dni"],
  faq: [
    { q: "Czy kompas powie mi, czy mam odejść?", a: "Nie. Celowo nie wylicza „wyniku” ani rekomendacji. Pokazuje obraz sytuacji, możliwe drogi i pytania, które pomagają podjąć własną decyzję. Nie zastępuje rozmowy ze specjalistą." },
    { q: "Czy wykres to ocena mojego związku?", a: "Nie. To wizualizacja Twoich odpowiedzi z dzisiaj. Odczucia zmieniają się w czasie i nie da się ich sprowadzić do liczby." },
    { q: "Czym różni się separacja faktyczna od sądowej?", a: "Separacja faktyczna to zamieszkanie osobno bez formalnych kroków. Sytuacja prawna (małżeństwo, wspólność majątkowa) się nie zmienia. Separację sądową orzeka sąd i oznacza ona m.in. rozdzielność majątkową." },
    { q: "Nie jesteśmy małżeństwem. Czy kompas to uwzględnia?", a: "Tak. Pary niebędące małżeństwem nie widzą separacji ani rozwodu, bo ich nie dotyczą. Zamiast tego pokazujemy, jak wygląda rozstanie w związku nieformalnym." },
    { q: "Co, jeśli czuję się zagrożony/zagrożona?", a: "Twoje bezpieczeństwo jest najważniejsze. W sytuacji zagrożenia dzwoń pod 112. Wsparcie: Niebieska Linia 800 120 002, kryzysowy telefon zaufania 116 123." },
  ],
  sources: [{ ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 54, 56, 61¹ i n." }, SRC.mediacjeGov, SRC.niebieskaLinia],
};
