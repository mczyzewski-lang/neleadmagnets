import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "wina-czy-bez-winy",
  short: "Z winą czy bez?",
  icon: "scale",
  cardTitle: "Rozwód z orzekaniem o winie czy bez?",
  cardDesc: "Porównaj skutki obu wariantów — alimenty, dowody, czas, koszty, dzieci. Bez podpowiadania, co wybrać.",
  outcome: "Tabela różnic wyróżniona pod Twoją sytuację, kwestie do przemyślenia, pytania do prawnika",
  time: "ok. 3 min",
  h1: "Rozwód z orzekaniem o winie czy bez? Sprawdź różnice",
  h2: "Zobacz, jak każdy z wariantów może wpłynąć na alimenty, dowody, czas trwania sprawy i koszty — w odniesieniu do Twojej sytuacji.",
  seo: {
    title: "Rozwód z orzekaniem o winie czy bez? Różnice",
    description: "Porównaj rozwód z orzekaniem o winie i bez: alimenty (art. 60 KRO), dowody, czas, koszty, zwrot opłaty, dzieci. Bezpłatne narzędzie z tabelą różnic.",
  },
  ctaLabel: "Sprawdź koszt i odbierz bezpłatny Plan Rozwodu",
  primaryOffer: "plan-rozwodu",
  how: ["Zaznacz, co jest dla Ciebie ważne — bez opisywania szczegółów", "Zobacz tabelę różnic z wyróżnionymi wierszami", "Pobierz pytania do prawnika"],
  faq: [
    { q: "Kiedy sąd nie orzeka o winie?", a: "Na zgodne żądanie obojga małżonków sąd zaniecha orzekania o winie (art. 57 § 2 KRO). Wtedy skutki są takie, jakby żaden z małżonków nie ponosił winy. Jeśli choć jedna strona żąda ustalenia winy, sąd ją bada." },
    { q: "Czy wina wpływa na opiekę nad dziećmi?", a: "Nie bezpośrednio. O władzy rodzicielskiej, kontaktach i alimentach na dzieci sąd rozstrzyga, kierując się dobrem dziecka — niezależnie od tego, kto ponosi winę rozkładu pożycia." },
    { q: "Jak wina wpływa na alimenty między byłymi małżonkami?", a: "Małżonek niewinny może żądać alimentów od wyłącznie winnego, gdy rozwód istotnie pogarsza jego sytuację materialną — bez 5-letniego limitu. W pozostałych przypadkach alimentów można żądać w razie niedostatku, a obowiązek wobec niewinnego zobowiązanego co do zasady wygasa po 5 latach (art. 60 KRO)." },
    { q: "Czy rozwód bez orzekania o winie jest tańszy?", a: "Opłata od pozwu wynosi 600 zł w obu wariantach. Przy rozwodzie bez orzekania o winie na zgodne żądanie możliwy jest zwrot połowy opłaty. Na koszty wpływa też długość postępowania i pomoc pełnomocnika." },
    { q: "Czy narzędzie podpowie, który wariant wybrać?", a: "Nie. Decyzja należy do Ciebie. Narzędzie porządkuje różnice i wskazuje, które z nich mogą mieć znaczenie w Twojej sytuacji." },
  ],
  sources: [
    { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 56, 57, 58, 59, 60" },
    { ...SRC.kc, label: "Kodeks cywilny — art. 940 (wyłączenie małżonka od dziedziczenia)" },
    { ...SRC.uksc, label: "Ustawa o kosztach sądowych w sprawach cywilnych — art. 26, 79" },
  ],
};
