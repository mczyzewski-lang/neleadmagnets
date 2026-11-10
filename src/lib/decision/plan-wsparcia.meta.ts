import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "plan-wsparcia",
  short: "Plan wsparcia",
  icon: "heart",
  cardTitle: "Mój plan wsparcia na czas rozstania",
  cardDesc: "Zbierz w jednym miejscu, kto i jak może Ci pomóc, co działa na Ciebie w trudnych chwilach i co robić w gorszy dzień.",
  outcome: "Jednostronicowy plan wsparcia: kto w czym pomoże, strategie „gdy… to…”, plan na trudny dzień",
  time: "ok. 4 min",
  h1: "Mój plan wsparcia na czas rozstania",
  h2: "Rozstanie to jeden z najbardziej obciążających okresów w życiu. Przygotuj prosty plan, który przypomni Ci, na kogo możesz liczyć i co Ci pomaga.",
  seo: {
    title: "Plan wsparcia na czas rozstania — bezpłatny kreator",
    description: "Przygotuj osobisty plan wsparcia: kto pomoże emocjonalnie i praktycznie, Twoje strategie, sygnały ostrzegawcze i plan na trudny dzień. Do wydruku.",
  },
  ctaLabel: "Porozmawiaj z nami, gdy będziesz gotowy/gotowa",
  primaryOffer: "konsultacja",
  how: ["Zaznacz, kto i w czym może Ci pomóc — bez imion", "Wybierz swoje strategie i trudne sytuacje", "Wydrukuj jednostronicowy plan wsparcia"],
  faq: [
    { q: "Czy to forma terapii?", a: "Nie. To proste narzędzie porządkujące. Nie zastępuje pomocy psychologa ani psychoterapeuty. Jeśli pojawiają się myśli o zrobieniu sobie krzywdy, dzwoń pod 116 123, 800 70 2222 lub 112." },
    { q: "Dlaczego nie pytacie o imiona bliskich?", a: "Nie są potrzebne. Wybierasz role (np. przyjaciel, rodzina). Jeśli chcesz, możesz dopisać krótkie inicjały — zostaną tylko w Twojej przeglądarce i na wydruku." },
    { q: "Co, jeśli nie mam nikogo, kto mógłby pomóc?", a: "To częste i nie świadczy o Tobie źle. Plan pokaże, gdzie szukać wsparcia: bezpłatne telefony zaufania, grupy wsparcia, specjaliści." },
    { q: "Jak korzystać z planu?", a: "Wydrukuj go lub zapisz jako PDF i trzymaj pod ręką. Raz w tygodniu przejdź przez krótką listę „check-in” i zaktualizuj plan." },
  ],
  sources: [SRC.niebieskaLinia],
};
