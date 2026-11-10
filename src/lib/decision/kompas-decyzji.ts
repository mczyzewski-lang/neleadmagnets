/**
 * Przed decyzją — Kompas decyzji. Narzędzie refleksyjne: NIGDY nie rekomenduje
 * pozostania ani rozstania. Porządkuje obraz sytuacji, możliwe drogi i brakujące informacje.
 */
export type CompassAnswers = {
  tried?: string[]; // therapy | talks | time-apart | individual | nothing
  values?: string[];
  aspects?: Partial<Record<AspectKey, number>>; // 1–5
  missing?: string[]; // finances | housing | children | law | emotions
  time?: "urgent" | "weeks" | "nopressure";
  safety?: "no" | "yes" | "skip";
};

export const ASPECTS = [
  { key: "communication", label: "Komunikacja" },
  { key: "trust", label: "Zaufanie" },
  { key: "safety", label: "Poczucie bezpieczeństwa" },
  { key: "plans", label: "Wspólne plany" },
  { key: "finances", label: "Finanse" },
  { key: "support", label: "Wzajemne wsparcie" },
] as const;
export type AspectKey = (typeof ASPECTS)[number]["key"];

export const VALUES: { value: string; label: string }[] = [
  { value: "safety", label: "Bezpieczeństwo" },
  { value: "children", label: "Dobro dzieci" },
  { value: "stability", label: "Stabilność finansowa" },
  { value: "peace", label: "Spokój" },
  { value: "respect", label: "Szacunek" },
  { value: "closeness", label: "Bliskość" },
  { value: "independence", label: "Niezależność" },
  { value: "family", label: "Rodzina i relacje z bliskimi" },
  { value: "growth", label: "Rozwój osobisty" },
];

export type Path = {
  id: string;
  title: string;
  what: string;
  mayHelp: string[];
  consider: string[];
  infoNeeded: string[];
  relevant: boolean;
  relevantWhy?: string;
  link?: { href: string; label: string };
};

export const isSafety = (a: CompassAnswers) => a.safety === "yes";

export function aspectsList(a: CompassAnswers) {
  return ASPECTS.map((x) => ({ ...x, value: a.aspects?.[x.key] ?? null }));
}

export function lowAspects(a: CompassAnswers) {
  return aspectsList(a).filter((x) => x.value !== null && (x.value as number) <= 2);
}

export function buildPaths(a: CompassAnswers): Path[] {
  const tried = new Set(a.tried || []);
  const missing = new Set(a.missing || []);
  const safety = isSafety(a);
  const paths: Path[] = [
    {
      id: "talk",
      title: "Rozmowa lub terapia par",
      what: "Wspólna praca nad relacją — samodzielnie albo z terapeutą par.",
      mayHelp: ["Daje przestrzeń, by usłyszeć perspektywę drugiej osoby.", "Pomaga zrozumieć, co się dzieje, zanim zapadną decyzje."],
      consider: ["Wymaga gotowości obu stron.", tried.has("therapy") ? "Masz już doświadczenie z terapią — warto zastanowić się, co wtedy pomogło, a co nie." : "Pierwsza konsultacja nie zobowiązuje do dalszej terapii."],
      infoNeeded: ["Czy druga osoba jest otwarta na taką rozmowę?"],
      relevant: !safety && missing.has("emotions"),
      relevantWhy: "Zaznaczyłeś/zaznaczyłaś, że brakuje Ci jasności co do emocji i relacji.",
    },
    {
      id: "individual",
      title: "Wsparcie indywidualne (psycholog, terapeuta)",
      what: "Praca nad własnymi emocjami i potrzebami, niezależnie od decyzji dotyczącej związku.",
      mayHelp: ["Pomaga uporządkować myśli i emocje.", "Nie wymaga udziału drugiej osoby."],
      consider: ["To wsparcie dla Ciebie — nie musi prowadzić do żadnej konkretnej decyzji."],
      infoNeeded: ["Jakiego rodzaju wsparcia potrzebujesz teraz najbardziej?"],
      relevant: missing.has("emotions") || safety,
      relevantWhy: safety ? "W trudnej i niebezpiecznej sytuacji wsparcie indywidualne jest szczególnie ważne." : "Może pomóc w uporządkowaniu emocji.",
    },
    {
      id: "apart",
      title: "Czas osobno (separacja faktyczna)",
      what: "Zamieszkanie osobno na pewien czas, bez formalnych kroków prawnych.",
      mayHelp: ["Daje dystans i czas do namysłu.", "Pozwala sprawdzić, jak wygląda codzienność osobno."],
      consider: ["Nie zmienia sytuacji prawnej: małżeństwo, wspólność majątkowa i wspólne zobowiązania trwają.", "Warto spisać zasady na ten czas (rachunki, dzieci, kontakt)."],
      infoNeeded: ["Gdzie każde z Was mogłoby mieszkać i ile to kosztuje?"],
      relevant: missing.has("housing") || missing.has("finances"),
      relevantWhy: "Pytania o mieszkanie i finanse są tu kluczowe.",
      link: { href: "/przed-decyzja/koszty-wyprowadzki", label: "Ile kosztuje wyprowadzka?" },
    },
    {
      id: "mediation",
      title: "Mediacja",
      what: "Rozmowy z udziałem neutralnego mediatora, który pomaga wypracować ustalenia.",
      mayHelp: ["Pomaga rozmawiać o trudnych sprawach w bezpiecznej strukturze.", "Ustalenia mogą zostać zatwierdzone przez sąd."],
      consider: ["Jest dobrowolna.", "Nie jest odpowiednia, gdy występuje przemoc lub poważna nierównowaga sił."],
      infoNeeded: ["Jakie sprawy wymagałyby uzgodnienia?"],
      relevant: !safety && (missing.has("children") || missing.has("finances")),
      relevantWhy: "Pomaga przy ustaleniach dotyczących dzieci i finansów.",
      link: { href: "/narzedzia/przed-pozwem", label: "Ustalenia przed pozwem" },
    },
    {
      id: "separation",
      title: "Separacja sądowa",
      what: "Orzeczenie sądu o separacji — małżeństwo trwa formalnie, ale większość skutków jest jak po rozwodzie.",
      mayHelp: ["Pozwala uregulować sprawy prawne bez rozwiązywania małżeństwa.", "Może zostać zniesiona na zgodne żądanie małżonków."],
      consider: ["Powoduje rozdzielność majątkową z mocy prawa.", "Nie można zawrzeć nowego małżeństwa."],
      infoNeeded: ["Czym różni się od rozwodu w Twojej sytuacji?"],
      relevant: missing.has("law"),
      relevantWhy: "Zaznaczyłeś/zaznaczyłaś brak informacji prawnych.",
      link: { href: "/narzedzia/separacja-czy-rozwod", label: "Separacja czy rozwód?" },
    },
    {
      id: "divorce",
      title: "Rozwód",
      what: "Rozwiązanie małżeństwa przez sąd okręgowy, gdy nastąpił zupełny i trwały rozkład pożycia.",
      mayHelp: ["Ostatecznie reguluje status prawny.", "Wiele spraw można wcześniej uzgodnić i przedstawić sądowi."],
      consider: ["Wymaga rozstrzygnięcia spraw dzieci (władza rodzicielska, kontakty, alimenty).", "Rozwód nie zwalnia ze wspólnego kredytu wobec banku."],
      infoNeeded: ["Jakie są koszty i jak wygląda procedura?"],
      relevant: missing.has("law") || missing.has("finances"),
      relevantWhy: "Przyda się wiedza o procedurze i kosztach.",
      link: { href: "/przed-decyzja/koszt-rozwodu", label: "Ile kosztuje rozwód?" },
    },
  ];
  return paths;
}

const VALUE_Q: Record<string, string> = {
  safety: "Co dziś daje Ci poczucie bezpieczeństwa, a co je odbiera?",
  children: "Czego najbardziej potrzebują teraz Twoje dzieci — niezależnie od tego, jaką decyzję podejmiesz?",
  stability: "Jakich informacji o finansach potrzebujesz, żeby czuć się pewniej?",
  peace: "W jakich sytuacjach czujesz spokój, a w jakich napięcie?",
  respect: "Kiedy ostatnio czułeś/czułaś się szanowany/szanowana w tej relacji?",
  closeness: "Czego potrzebujesz, by czuć bliskość — i czy to jest możliwe w tej relacji?",
  independence: "Jak wyglądałaby Twoja niezależność w różnych scenariuszach?",
  family: "Jak różne drogi wpłynęłyby na Twoje relacje z bliskimi?",
  growth: "Jak chcesz, żeby wyglądało Twoje życie za rok?",
};
const ASPECT_Q: Record<AspectKey, string> = {
  communication: "Czy potraficie rozmawiać o trudnych sprawach bez eskalacji? Co mogłoby to zmienić?",
  trust: "Co musiałoby się wydarzyć, żeby zaufanie mogło się odbudować — i czy to realne?",
  safety: "Czy czujesz się bezpiecznie — fizycznie i emocjonalnie? Jeśli nie, z kim możesz o tym porozmawiać?",
  plans: "Czy Wasze plany na przyszłość są jeszcze wspólne? W czym się różnią?",
  finances: "Co wiesz o Waszej sytuacji finansowej, a czego jeszcze nie wiesz?",
  support: "Na kogo możesz liczyć w trudnych chwilach — w związku i poza nim?",
};

export function reflectionQuestions(a: CompassAnswers): string[] {
  const q: string[] = [];
  for (const v of a.values || []) if (VALUE_Q[v]) q.push(VALUE_Q[v]);
  for (const x of lowAspects(a)) q.push(ASPECT_Q[x.key as AspectKey]);
  if (!(a.tried || []).length || a.tried?.includes("nothing")) q.push("Czy jest coś, czego jeszcze nie próbowaliście, a co chcesz sprawdzić, zanim zdecydujesz?");
  q.push("Jaką decyzję podjąłbyś/podjęłabyś, gdyby nie było presji czasu ani opinii innych?");
  return Array.from(new Set(q)).slice(0, 10);
}

export type InfoLink = { label: string; href: string; why: string };
export function infoToGather(a: CompassAnswers): InfoLink[] {
  const m = new Set(a.missing || []);
  const out: InfoLink[] = [];
  if (m.has("finances")) out.push({ label: "Budżet po rozstaniu", href: "/narzedzia/budzet-po-rozstaniu", why: "Jak mogą wyglądać Twoje miesięczne finanse w osobnym gospodarstwie." });
  if (m.has("finances")) out.push({ label: "Ile kosztuje rozwód?", href: "/przed-decyzja/koszt-rozwodu", why: "Opłaty sądowe i inne koszty procedury." });
  if (m.has("housing")) out.push({ label: "Mieszkanie i kredyt po rozstaniu", href: "/narzedzia/mieszkanie-i-kredyt", why: "Możliwe scenariusze dla mieszkania i kredytu." });
  if (m.has("housing")) out.push({ label: "Ile kosztuje wyprowadzka?", href: "/przed-decyzja/koszty-wyprowadzki", why: "Koszty startu w nowym miejscu." });
  if (m.has("children")) out.push({ label: "Plan opieki nad dzieckiem", href: "/narzedzia/plan-opieki-nad-dzieckiem", why: "Jak może wyglądać życie dziecka w dwóch domach." });
  if (m.has("children")) out.push({ label: "Koszty utrzymania dziecka", href: "/narzedzia/koszty-utrzymania-dziecka", why: "Zestawienie wydatków na dziecko." });
  if (m.has("law")) out.push({ label: "Mapa prawnych konsekwencji", href: "/narzedzia/konsekwencje-rozstania", why: "Które kwestie prawne dotyczą Twojej sytuacji." });
  if (m.has("law")) out.push({ label: "Separacja czy rozwód?", href: "/narzedzia/separacja-czy-rozwod", why: "Najważniejsze różnice prawne." });
  if (m.has("emotions")) out.push({ label: "Mój plan wsparcia", href: "/przed-decyzja/plan-wsparcia", why: "Kto i jak może Cię wesprzeć w tym czasie." });
  if (m.has("emotions")) out.push({ label: "Jak przygotować się do rozmowy", href: "/przed-decyzja/rozmowa-o-rozstaniu", why: "Plan trudnej rozmowy z partnerem/partnerką." });
  return out;
}

export function sevenDayPlan(a: CompassAnswers): string[] {
  const m = new Set(a.missing || []);
  const days = [
    "Dzień 1: Zapisz w kilku zdaniach, co czujesz i czego się obawiasz. Bez oceniania.",
    m.has("finances") ? "Dzień 2: Spisz swoje dochody i najważniejsze wydatki (wystarczą przybliżenia)." : "Dzień 2: Wypisz trzy rzeczy, które w ostatnim czasie były dla Ciebie najtrudniejsze.",
    m.has("emotions") ? "Dzień 3: Porozmawiaj z zaufaną osobą lub umów konsultację u psychologa." : "Dzień 3: Porozmawiaj z zaufaną osobą o tym, co przeżywasz.",
    m.has("law") || m.has("housing") ? "Dzień 4: Skorzystaj z jednego narzędzia informacyjnego (mieszkanie, prawo) i zanotuj pytania." : "Dzień 4: Zrób coś, co daje Ci oparcie (ruch, sen, czas na zewnątrz).",
    m.has("children") ? "Dzień 5: Zapisz, czego potrzebują teraz dzieci — w każdym scenariuszu." : "Dzień 5: Wróć do listy wartości i zaznacz trzy najważniejsze.",
    "Dzień 6: Przejrzyj pytania do refleksji i odpowiedz na te, które są najważniejsze.",
    a.time === "urgent" ? "Dzień 7: Zdecyduj, jaki jeden kolejny krok zrobisz w przyszłym tygodniu (np. konsultacja)." : "Dzień 7: Zastanów się, czy potrzebujesz więcej czasu — i ile. Nie musisz decydować dziś.",
  ];
  return days;
}
