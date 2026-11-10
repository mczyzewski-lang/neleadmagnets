import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "porozumienie-przejsciowe",
  short: "Zasady na czas przejściowy",
  icon: "handshake",
  cardTitle: "Zasady na czas przejściowy",
  cardDesc: "Mieszkanie, dzieci, rachunki, wspólne konto, komunikacja — przygotuj propozycję zasad na okres, zanim zapadną decyzje.",
  outcome: "Dokument z propozycją zasad, wyliczony podział rachunków, lista spraw do ustalenia, PDF",
  time: "ok. 5 min",
  h1: "Zasady na czas przejściowy: zanim zapadną decyzje",
  h2: "Przygotuj spokojną propozycję tymczasowych zasad — kto gdzie mieszka, jak dzielicie rachunki, jak organizujecie czas z dziećmi — i omów ją z drugą osobą.",
  seo: {
    title: "Zasady na czas rozstania — porozumienie przejściowe",
    description: "Bezpłatny kreator zasad na okres przejściowy: mieszkanie, dzieci, podział rachunków, wspólne konto, komunikacja. Propozycja do rozmowy w PDF.",
  },
  ctaLabel: "Odbierz bezpłatny Plan Rozwodu",
  primaryOffer: "plan-rozwodu",
  how: ["Odpowiedz na pytania o mieszkanie, dzieci i rachunki", "Zobacz propozycję zasad i wyliczony podział kosztów", "Pobierz dokument do rozmowy z drugą osobą"],
  faq: [
    { q: "Czy taki dokument jest wiążący?", a: "Nie. To propozycja do rozmowy, która pomaga uporządkować codzienność. Nie jest umową i nie przesądza o podziale majątku ani o tym, jak sąd rozstrzygnie sprawy dzieci." },
    { q: "Czy wyprowadzka oznacza utratę prawa do mieszkania?", a: "Sama tymczasowa wyprowadzka nie odbiera praw do mieszkania wynikających z własności czy umowy. Warto jednak zapisać, że jest to rozwiązanie tymczasowe, i skonsultować swoją sytuację z prawnikiem." },
    { q: "Jak podzielić rachunki, gdy zarabiamy różnie?", a: "Możesz wybrać podział proporcjonalny do dochodów — narzędzie policzy procent i kwoty dla każdej osoby. Pamiętaj, że za wspólny kredyt oboje odpowiadacie wobec banku niezależnie od Waszych ustaleń." },
    { q: "Co, jeśli boję się drugiej osoby?", a: "Wtedy wspólne ustalanie zasad może nie być bezpieczne i narzędzie nie zaproponuje takiego dokumentu. W sytuacji zagrożenia dzwoń pod 112, wsparcie znajdziesz też w Niebieskiej Linii: 800 120 002." },
    { q: "Czy zapisujecie moje odpowiedzi?", a: "Nie. Dokument powstaje w Twojej przeglądarce. Znika po zamknięciu strony, chyba że go pobierzesz lub wyślesz sobie na e-mail." },
  ],
  sources: [
    { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 23, 27 (obowiązki małżonków), art. 58 (wyrok rozwodowy)" },
    { ...SRC.kc, label: "Kodeks cywilny — art. 366 (odpowiedzialność solidarna)" },
    SRC.mediacjeGov,
    SRC.niebieskaLinia,
  ],
};
