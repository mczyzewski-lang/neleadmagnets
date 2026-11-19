import type { ToolMeta } from "@/lib/tools";
import { SRC } from "@/lib/sources";

export const meta: ToolMeta = {
  slug: "wina-czy-bez-winy",
  short: "Z winą czy bez?",
  icon: "scale",
  cardTitle: "Rozwód z orzekaniem o winie czy bez?",
  cardDesc: "Porównaj skutki obu wariantów: alimenty, dowody, czas, koszty, dzieci. Bez podpowiadania, co wybrać.",
  outcome: "Tabela różnic wyróżniona pod Twoją sytuację, kwestie do przemyślenia, pytania do prawnika",
  time: "ok. 3 min",
  h1: "Rozwód z orzekaniem o winie czy bez? Sprawdź różnice",
  h2: "Zobacz, jak każdy wariant może wpłynąć na alimenty, dowody, czas i koszty w Twojej sytuacji.",
  seo: {
    title: "Rozwód z orzekaniem o winie czy bez? Różnice",
    description: "Porównaj rozwód z orzekaniem o winie i bez: alimenty, dowody, czas, koszty, zwrot opłaty, dzieci. Bezpłatne narzędzie z tabelą różnic.",
  },
  ctaLabel: "Sprawdź koszt i odbierz bezpłatny Plan Rozwodu",
  primaryOffer: "plan-rozwodu",
  how: ["Zaznacz, co jest dla Ciebie ważne, bez opisywania szczegółów", "Zobacz tabelę różnic z wyróżnionymi wierszami", "Pobierz pytania do prawnika"],
  faq: [
    { q: "Kiedy sąd nie orzeka o winie?", a: "Gdy oboje małżonkowie zgodnie o to wnoszą. Skutki są wtedy takie, jakby żaden nie ponosił winy. Jeśli choć jedna strona chce ustalenia winy, sąd ją bada." },
    { q: "Czy wina wpływa na opiekę nad dziećmi?", a: "Nie bezpośrednio. O władzy rodzicielskiej, kontaktach i alimentach na dzieci sąd rozstrzyga według dobra dziecka, niezależnie od winy." },
    { q: "Jak wina wpływa na alimenty między byłymi małżonkami?", a: "Niewinny małżonek może żądać alimentów od wyłącznie winnego, gdy rozwód istotnie pogarsza jego sytuację. Bez limitu 5 lat. W innych przypadkach alimentów można żądać w niedostatku, a obowiązek niewinnego zobowiązanego zwykle wygasa po 5 latach." },
    { q: "Czy rozwód bez orzekania o winie jest tańszy?", a: "Opłata od pozwu to 600 zł w obu wariantach. Przy rozwodzie bez orzekania o winie na zgodne żądanie sąd zwraca połowę. Na koszty wpływa też długość sprawy i pełnomocnik." },
    { q: "Czy narzędzie podpowie, który wariant wybrać?", a: "Nie. Decyzja należy do Ciebie. Narzędzie porządkuje różnice i pokazuje, które mogą mieć znaczenie w Twojej sytuacji. Nie ocenia przesłanek rozwodu i nie zastępuje konsultacji z prawnikiem." },
  ],
  sources: [
    { ...SRC.kro, label: "Kodeks rodzinny i opiekuńczy — art. 56, 57, 58, 59, 60" },
    { ...SRC.kc, label: "Kodeks cywilny — art. 940 (wyłączenie małżonka od dziedziczenia)" },
    { ...SRC.uksc, label: "Ustawa o kosztach sądowych w sprawach cywilnych — art. 26, 79" },
    { ...SRC.kpc, label: "Kodeks postępowania cywilnego — art. 103, art. 187 § 1 pkt 3 (próba mediacji)" },
  ],
};
