import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "rozmowa-o-rozstaniu",
  short: "Rozmowa o rozstaniu",
  icon: "message",
  cardTitle: "Jak przygotować się do rozmowy o rozstaniu?",
  cardDesc: "Spersonalizowany plan trudnej rozmowy: przygotowanie, pierwsze zdania, czego unikać i co zrobić po rozmowie.",
  outcome: "Plan rozmowy, 3 warianty otwarcia, plan na wypadek eskalacji, co zrobić w ciągu 72 h",
  time: "ok. 3 min",
  h1: "Jak przygotować się do rozmowy o rozstaniu?",
  h2: "Odpowiedz na kilka pytań i otrzymaj plan rozmowy dopasowany do Twojej sytuacji — od pierwszego zdania po pierwsze dni po rozmowie.",
  seo: {
    title: "Jak powiedzieć partnerowi o rozstaniu? Plan rozmowy",
    description: "Bezpłatne narzędzie: przygotuj trudną rozmowę o rozstaniu lub kryzysie. Przykładowe pierwsze zdania, czego unikać, co po rozmowie. Z ścieżką bezpieczeństwa.",
  },
  ctaLabel: "Sprawdź, jak przygotować kolejne kroki",
  primaryOffer: "plan-rozwodu",
  how: ["Odpowiedz na 8 krótkich pytań — bez opisywania szczegółów", "Zobacz plan rozmowy i przykładowe pierwsze zdania", "Pobierz plan lub wyślij go sobie na e-mail"],
  faq: [
    { q: "Czy narzędzie mówi, czy powinienem/powinnam się rozstać?", a: "Nie. Narzędzie pomaga przygotować rozmowę — niezależnie od tego, czy chcesz przekazać decyzję, zaproponować terapię, czy porozmawiać o kryzysie. Decyzja należy do Ciebie." },
    { q: "Co, jeśli boję się reakcji drugiej osoby?", a: "Wtedy Twoje bezpieczeństwo jest najważniejsze. Narzędzie nie zaproponuje rozmowy w cztery oczy — pokaże, jak przekazać informację bezpieczniej (np. przez pełnomocnika lub przy osobie trzeciej) i gdzie szukać pomocy: 112, Niebieska Linia 800 120 002." },
    { q: "Czy powiedzieć dzieciom w tej samej rozmowie?", a: "Zwykle zaleca się, by rozmowa dorosłych odbyła się bez dzieci, a o tym, jak i kiedy powiedzieć dzieciom, rodzice zdecydowali osobno — najlepiej wspólnie." },
    { q: "Czy w pierwszej rozmowie trzeba ustalić mieszkanie i finanse?", a: "Nie. Pierwsza rozmowa rzadko jest dobrym momentem na wiążące ustalenia. Lepiej umówić kolejną rozmowę i przygotować się do niej, np. za pomocą naszych narzędzi o mieszkaniu i budżecie." },
    { q: "Czy zapisujecie moje odpowiedzi?", a: "Nie. Plan powstaje w Twojej przeglądarce i znika po zamknięciu strony, chyba że sam(a) go pobierzesz lub wyślesz na e-mail." },
  ],
  sources: [SRC.niebieskaLinia, SRC.mediacjeGov],
};
