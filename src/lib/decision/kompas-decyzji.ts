/**
 * Przed decyzją: Kompas decyzji. Narzędzie refleksyjne: NIGDY nie rekomenduje
 * pozostania ani rozstania. Porządkuje obraz sytuacji, możliwe drogi i brakujące informacje.
 * Pary niebędące małżeństwem nie widzą separacji sądowej ani rozwodu (COPY_GUIDE.md).
 */
export type CompassAnswers = {
  /** Małżeństwo czy związek nieformalny */
  relation?: "married" | "informal";
  /** Wspólne dzieci */
  kids?: "minor" | "adult" | "none";
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
export const isInformal = (a: CompassAnswers) => a.relation === "informal";
/** Czy pokazywać treści o dzieciach (brak odpowiedzi = tak, dla zgodności) */
export const hasKids = (a: CompassAnswers) => a.kids !== "none";
export const hasMinorKids = (a: CompassAnswers) => a.kids === undefined || a.kids === "minor";

/** Wartości dostępne dla odpowiedzi (bez dzieci nie ma „Dobra dzieci”) */
export function valuesFor(a: CompassAnswers) {
  return hasKids(a) ? VALUES : VALUES.filter((v) => v.value !== "children");
}

export const MISSING: { value: string; label: string }[] = [
  { value: "finances", label: "Finanse: jak sobie poradzę" },
  { value: "housing", label: "Mieszkanie: gdzie będę mieszkać" },
  { value: "children", label: "Dzieci: jak zorganizować opiekę" },
  { value: "law", label: "Prawo: jakie są procedury i skutki" },
  { value: "emotions", label: "Emocje: czego naprawdę chcę" },
];
/** Brakujące informacje dostępne dla odpowiedzi (bez małoletnich dzieci nie ma opieki nad dziećmi) */
export function missingFor(a: CompassAnswers) {
  return hasMinorKids(a) ? MISSING : MISSING.filter((m) => m.value !== "children");
}
/** Odpowiedzi oczyszczone z opcji, które nie pasują do sytuacji (np. po zmianie odpowiedzi o dzieciach) */
function clean(a: CompassAnswers): CompassAnswers {
  const vals = new Set(valuesFor(a).map((v) => v.value));
  const miss = new Set(missingFor(a).map((v) => v.value));
  return { ...a, values: (a.values || []).filter((v) => vals.has(v)), missing: (a.missing || []).filter((v) => miss.has(v)) };
}

export function aspectsList(a: CompassAnswers) {
  return ASPECTS.map((x) => ({ ...x, value: a.aspects?.[x.key] ?? null }));
}

export function lowAspects(a: CompassAnswers) {
  return aspectsList(a).filter((x) => x.value !== null && (x.value as number) <= 2);
}

export function buildPaths(input: CompassAnswers): Path[] {
  const a = clean(input);
  const tried = new Set(a.tried || []);
  const missing = new Set(a.missing || []);
  const safety = isSafety(a);
  const informal = isInformal(a);
  const minor = hasMinorKids(a) && a.kids !== undefined;
  const talkConsider = ["Wymaga gotowości obu stron."];
  if (tried.has("therapy")) talkConsider.push("Terapia par już była. Zastanów się, co wtedy pomogło, a co nie.");
  else if (tried.has("talks")) talkConsider.push("Rozmowy we dwoje już były. Terapeuta par może pomóc rozmawiać inaczej.");
  else talkConsider.push("Pierwsza konsultacja nie zobowiązuje do dalszej terapii.");
  const paths: Path[] = [
    {
      id: "talk",
      title: "Rozmowa lub terapia par",
      what: "Wspólna praca nad relacją: samodzielnie albo z terapeutą par.",
      mayHelp: ["Daje przestrzeń, by usłyszeć drugą osobę.", "Pomaga zrozumieć, co się dzieje, zanim zapadną decyzje."],
      consider: talkConsider,
      infoNeeded: ["Czy druga osoba jest otwarta na taką rozmowę?"],
      relevant: !safety && missing.has("emotions"),
      relevantWhy: "Zaznaczyłeś/zaznaczyłaś, że brakuje Ci jasności co do emocji i relacji.",
    },
    {
      id: "individual",
      title: "Wsparcie indywidualne (psycholog, terapeuta)",
      what: "Praca nad własnymi emocjami i potrzebami, niezależnie od decyzji o związku.",
      mayHelp: ["Pomaga uporządkować myśli i emocje.", "Nie wymaga udziału drugiej osoby."],
      consider: [tried.has("individual") ? "Masz już doświadczenie ze wsparciem indywidualnym. Może warto do niego wrócić." : "To wsparcie dla Ciebie. Nie musi prowadzić do konkretnej decyzji."],
      infoNeeded: ["Jakiego wsparcia potrzebujesz teraz najbardziej?"],
      relevant: missing.has("emotions") || safety,
      relevantWhy: safety ? "W trudnej i niebezpiecznej sytuacji wsparcie indywidualne jest szczególnie ważne." : "Może pomóc w uporządkowaniu emocji.",
    },
    {
      id: "apart",
      title: informal ? "Czas osobno" : "Czas osobno (separacja faktyczna)",
      what: "Zamieszkanie osobno na pewien czas, bez formalnych kroków prawnych.",
      mayHelp: ["Daje dystans i czas do namysłu.", "Pozwala sprawdzić, jak wygląda codzienność osobno."],
      consider: [
        informal ? "Nie zmienia wspólnych umów: najem, kredyt i inne zobowiązania trwają." : "Nie zmienia sytuacji prawnej: małżeństwo, wspólność majątkowa i wspólne zobowiązania trwają.",
        hasMinorKids(a) && a.kids !== undefined ? "Warto spisać zasady na ten czas (rachunki, dzieci, kontakt)." : "Warto spisać zasady na ten czas (rachunki, kontakt).",
        ...(tried.has("time-apart") ? ["Byliście już osobno. Co ten czas pokazał?"] : []),
      ],
      infoNeeded: ["Gdzie każde z Was mogłoby mieszkać i ile to kosztuje?"],
      relevant: missing.has("housing") || missing.has("finances"),
      relevantWhy: "Pytania o mieszkanie i finanse są tu kluczowe.",
      link: { href: "/przed-decyzja/koszty-wyprowadzki", label: "Ile kosztuje wyprowadzka?" },
    },
    {
      id: "mediation",
      title: "Mediacja",
      what: "Spotkania z bezstronnym mediatorem, który pomaga wypracować ustalenia.",
      mayHelp: [
        "Pomaga rozmawiać o trudnych sprawach w bezpiecznej strukturze.",
        "Ugodę zawartą przed mediatorem może zatwierdzić sąd.",
        "Zwykle zaczyna się od zaproszenia do mediacji: od Ciebie albo od wybranego mediatora.",
        ...(informal ? [] : ["Jeśli kiedyś dojdzie do pozwu, próba mediacji ma znaczenie, nawet gdy druga strona odmówi. Mediator może potwierdzić odmowę na piśmie."]),
      ],
      consider: ["Jest dobrowolna.", "Nie jest odpowiednia przy przemocy lub poważnej nierównowadze sił."],
      infoNeeded: ["Jakie sprawy wymagałyby uzgodnienia?"],
      relevant: !safety && (missing.has("children") || missing.has("finances")),
      relevantWhy: minor || missing.has("children") ? "Pomaga przy ustaleniach dotyczących dzieci i finansów." : "Pomaga przy ustaleniach finansowych.",
      link: { href: "/narzedzia/przed-pozwem", label: "Ustalenia przed pozwem" },
    },
  ];
  if (informal) {
    paths.push({
      id: "breakup",
      title: "Rozstanie w związku nieformalnym",
      what: "Związek kończy się bez sprawy w sądzie. Sprawy wspólne ustalacie sami, z mediatorem albo, w razie sporu, w sądzie.",
      mayHelp: ["Nie ma postępowania o rozwiązanie związku.", "Ustalenia możecie spisać w umowie."],
      consider: [
        "Nie łączy Was wspólność majątkowa małżeńska. Rzeczy kupione razem są zwykle współwłasnością.",
        "Wspólny kredyt lub najem trwa, dopóki bank lub wynajmujący nie zgodzi się na zmianę.",
        ...(hasMinorKids(a) && a.kids !== undefined ? ["Opiekę, kontakty i alimenty na dzieci możecie ustalić w porozumieniu rodzicielskim. W sporze rozstrzyga sąd rodzinny."] : []),
      ],
      infoNeeded: ["Co jest Wasze wspólne, a co należy do każdego z Was?"],
      relevant: missing.has("law") || missing.has("housing") || missing.has("finances"),
      relevantWhy: "Przyda się wiedza o tym, jak rozliczyć wspólne sprawy.",
      link: { href: "/narzedzia/konsekwencje-rozstania", label: "Mapa prawnych konsekwencji rozstania" },
    });
    return paths;
  }
  paths.push(
    {
      id: "separation",
      title: "Separacja sądowa",
      what: "Sąd orzeka separację. Małżeństwo trwa formalnie, ale większość skutków jest jak po rozwodzie.",
      mayHelp: ["Reguluje sprawy prawne bez rozwiązywania małżeństwa.", "Można ją znieść na zgodne żądanie małżonków."],
      consider: ["Oznacza rozdzielność majątkową.", "Nie można zawrzeć nowego małżeństwa."],
      infoNeeded: ["Czym różni się od rozwodu w Twojej sytuacji?"],
      relevant: missing.has("law"),
      relevantWhy: "Zaznaczyłeś/zaznaczyłaś brak informacji prawnych.",
      link: { href: "/narzedzia/separacja-czy-rozwod", label: "Separacja czy rozwód?" },
    },
    {
      id: "divorce",
      title: "Rozwód",
      what: "Sąd okręgowy rozwiązuje małżeństwo, gdy nastąpił zupełny i trwały rozkład pożycia.",
      mayHelp: ["Ostatecznie reguluje status prawny.", "Wiele spraw można wcześniej uzgodnić i przedstawić sądowi."],
      consider: [
        ...(hasMinorKids(a) ? ["Przy małoletnich dzieciach sąd rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach."] : []),
        "Rozwód nie zwalnia ze wspólnego kredytu wobec banku.",
        "Jeśli to będzie Twoja droga, zwykle sprawdza się kolejność: najpierw plan, potem ustalenia (rozmowy, mediacja), dopiero potem pozew.",
      ],
      infoNeeded: ["Jakie są koszty i jak wygląda procedura?"],
      relevant: missing.has("law") || missing.has("finances"),
      relevantWhy: "Przyda się wiedza o procedurze i kosztach.",
      link: { href: "/przed-decyzja/koszt-rozwodu", label: "Ile kosztuje rozwód?" },
    },
  );
  return paths;
}

const VALUE_Q: Record<string, string> = {
  safety: "Co dziś daje Ci poczucie bezpieczeństwa, a co je odbiera?",
  children: "Czego najbardziej potrzebują teraz Twoje dzieci, niezależnie od Twojej decyzji?",
  stability: "Jakich informacji o finansach potrzebujesz, żeby czuć się pewniej?",
  peace: "W jakich sytuacjach czujesz spokój, a w jakich napięcie?",
  respect: "Kiedy ostatnio czułeś/czułaś się szanowany/szanowana w tej relacji?",
  closeness: "Czego potrzebujesz, by czuć bliskość? Czy to jest możliwe w tej relacji?",
  independence: "Jak wyglądałaby Twoja niezależność w różnych scenariuszach?",
  family: "Jak różne drogi wpłynęłyby na Twoje relacje z bliskimi?",
  growth: "Jak chcesz, żeby wyglądało Twoje życie za rok?",
};
const ASPECT_Q: Record<AspectKey, string> = {
  communication: "Czy potraficie rozmawiać o trudnych sprawach bez eskalacji? Co mogłoby to zmienić?",
  trust: "Co musiałoby się wydarzyć, żeby zaufanie się odbudowało? Czy to realne?",
  safety: "Czy czujesz się bezpiecznie, fizycznie i emocjonalnie? Jeśli nie, z kim możesz o tym porozmawiać?",
  plans: "Czy Wasze plany na przyszłość są jeszcze wspólne? W czym się różnią?",
  finances: "Co wiesz o Waszej sytuacji finansowej, a czego jeszcze nie wiesz?",
  support: "Na kogo możesz liczyć w trudnych chwilach, w związku i poza nim?",
};

export function reflectionQuestions(input: CompassAnswers): string[] {
  const a = clean(input);
  const q: string[] = [];
  for (const v of a.values || []) if (VALUE_Q[v]) q.push(VALUE_Q[v]);
  for (const x of lowAspects(a)) q.push(ASPECT_Q[x.key as AspectKey]);
  if (!(a.tried || []).length || a.tried?.includes("nothing")) q.push("Czy jest coś, czego jeszcze nie próbowaliście, a co chcesz sprawdzić, zanim zdecydujesz?");
  q.push("Jaką decyzję podjąłbyś/podjęłabyś, gdyby nie było presji czasu ani opinii innych?");
  return Array.from(new Set(q)).slice(0, 10);
}

export type InfoLink = { label: string; href: string; why: string };
export function infoToGather(input: CompassAnswers): InfoLink[] {
  const a = clean(input);
  const informal = isInformal(a);
  const m = new Set(a.missing || []);
  const out: InfoLink[] = [];
  if (m.has("finances")) out.push({ label: "Budżet po rozstaniu", href: "/narzedzia/budzet-po-rozstaniu", why: "Jak mogą wyglądać Twoje miesięczne finanse w osobnym gospodarstwie." });
  if (m.has("finances") && !informal) out.push({ label: "Ile kosztuje rozwód?", href: "/przed-decyzja/koszt-rozwodu", why: "Opłaty sądowe i inne koszty procedury." });
  if (m.has("housing")) out.push({ label: "Mieszkanie i kredyt po rozstaniu", href: "/narzedzia/mieszkanie-i-kredyt", why: "Możliwe scenariusze dla mieszkania i kredytu." });
  if (m.has("housing")) out.push({ label: "Ile kosztuje wyprowadzka?", href: "/przed-decyzja/koszty-wyprowadzki", why: "Koszty startu w nowym miejscu." });
  if (m.has("children")) out.push({ label: "Plan opieki nad dzieckiem", href: "/narzedzia/plan-opieki-nad-dzieckiem", why: "Jak może wyglądać życie dziecka w dwóch domach." });
  if (m.has("children")) out.push({ label: "Koszty utrzymania dziecka", href: "/narzedzia/koszty-utrzymania-dziecka", why: "Zestawienie wydatków na dziecko." });
  if (m.has("law")) out.push({ label: "Mapa prawnych konsekwencji", href: "/narzedzia/konsekwencje-rozstania", why: "Które kwestie prawne dotyczą Twojej sytuacji." });
  if (m.has("law") && !informal) out.push({ label: "Separacja czy rozwód?", href: "/narzedzia/separacja-czy-rozwod", why: "Najważniejsze różnice prawne." });
  if (m.has("emotions")) out.push({ label: "Mój plan wsparcia", href: "/przed-decyzja/plan-wsparcia", why: "Kto i jak może Cię wesprzeć w tym czasie." });
  if (m.has("emotions")) out.push({ label: "Jak przygotować się do rozmowy", href: "/przed-decyzja/rozmowa-o-rozstaniu", why: "Plan trudnej rozmowy z partnerem/partnerką." });
  return out;
}

export function sevenDayPlan(input: CompassAnswers): string[] {
  const a = clean(input);
  const m = new Set(a.missing || []);
  const days = [
    "Dzień 1: Zapisz w kilku zdaniach, co czujesz i czego się obawiasz. Bez oceniania.",
    m.has("finances") ? "Dzień 2: Spisz swoje dochody i najważniejsze wydatki (wystarczą przybliżenia)." : "Dzień 2: Wypisz trzy rzeczy, które w ostatnim czasie były dla Ciebie najtrudniejsze.",
    m.has("emotions") ? "Dzień 3: Porozmawiaj z zaufaną osobą lub umów konsultację u psychologa." : "Dzień 3: Porozmawiaj z zaufaną osobą o tym, co przeżywasz.",
    m.has("law") || m.has("housing") ? "Dzień 4: Skorzystaj z jednego narzędzia informacyjnego (mieszkanie, prawo) i zanotuj pytania." : "Dzień 4: Zrób coś, co daje Ci oparcie (ruch, sen, czas na zewnątrz).",
    m.has("children") ? "Dzień 5: Zapisz, czego potrzebują teraz dzieci, w każdym scenariuszu." : "Dzień 5: Wróć do listy wartości i zaznacz trzy najważniejsze.",
    "Dzień 6: Przejrzyj pytania do refleksji i odpowiedz na te, które są najważniejsze.",
    a.time === "urgent" ? "Dzień 7: Wybierz jeden kolejny krok na przyszły tydzień (np. konsultacja)."
      : a.time === "weeks" ? "Dzień 7: Zapisz, czego chcesz się dowiedzieć w najbliższych tygodniach, i zaplanuj jeden krok na każdy tydzień."
      : "Dzień 7: Nie musisz decydować. Zaplanuj, kiedy wrócisz do tych pytań (np. za miesiąc).",
  ];
  return days;
}
