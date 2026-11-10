/**
 * Przed decyzją — Rozwód z orzekaniem o winie czy bez?
 * Narzędzie NIE rekomenduje żadnego wariantu. Odpowiedzi jedynie wyróżniają wiersze tabeli.
 */
export type FaultAnswers = {
  children?: "minor" | "adult" | "none";
  consent?: "yes" | "no" | "unsure";
  hardship?: "me" | "partner" | "none" | "unsure"; // ryzyko niedostatku / istotnego pogorszenia sytuacji
  priorities?: string[]; // speed | costs | justice | coparenting | alimony | privacy
  safety?: "yes" | "no" | "skip";
};

export type FaultRow = {
  id: string;
  topic: string;
  noFault: string;
  withFault: string;
  basis: string;
  verify?: boolean;
  /** Priorytety / sytuacje, dla których wiersz jest szczególnie istotny */
  tags: string[];
};

export const PRIORITIES = [
  { value: "speed", label: "Czas trwania sprawy" },
  { value: "costs", label: "Koszty" },
  { value: "justice", label: "Poczucie sprawiedliwości / ustalenie odpowiedzialności" },
  { value: "coparenting", label: "Relacja rodzicielska po rozwodzie" },
  { value: "alimony", label: "Alimenty między byłymi małżonkami" },
  { value: "privacy", label: "Prywatność — mniej ujawniania spraw osobistych" },
];

export const ROWS: FaultRow[] = [
  {
    id: "grounds",
    topic: "Przesłanki rozwodu",
    noFault: "Sąd ustala, czy nastąpił zupełny i trwały rozkład pożycia (art. 56 § 1 KRO). Na zgodne żądanie obojga małżonków sąd zaniecha orzekania o winie (art. 57 § 2 KRO).",
    withFault: "Te same przesłanki rozkładu pożycia. Dodatkowo sąd ustala, czy i który małżonek ponosi winę: wyłączną jednego, obopólną albo brak winy obojga (art. 57 § 1 KRO).",
    basis: "art. 56 § 1, art. 57 KRO",
    tags: ["justice"],
  },
  {
    id: "consent",
    topic: "Czy potrzebna jest zgoda drugiej strony",
    noFault: "Tak — zaniechanie orzekania o winie wymaga zgodnego żądania obojga. Jeśli jedna strona żąda ustalenia winy, sąd musi ją badać.",
    withFault: "Nie — wystarczy żądanie jednej strony, aby sąd badał winę.",
    basis: "art. 57 KRO",
    tags: ["consent-no", "consent-unsure"],
  },
  {
    id: "evidence",
    topic: "Dowody, świadkowie i prywatność",
    noFault: "Postępowanie dowodowe dotyczy przede wszystkim rozkładu pożycia i spraw dzieci — zwykle w mniejszym zakresie.",
    withFault: "Zwykle więcej czynności dowodowych: świadkowie, dokumenty, korespondencja. Sprawy prywatne mogą być szczegółowo omawiane na rozprawie.",
    basis: "KPC — postępowanie dowodowe",
    tags: ["privacy", "speed", "coparenting"],
  },
  {
    id: "time",
    topic: "Czas i liczba rozpraw",
    noFault: "Często mniej czynności, choć czas zależy od sądu i spraw dzieci. Nie da się zagwarantować terminu.",
    withFault: "Zwykle więcej czynności dowodowych i rozpraw, co może wydłużyć postępowanie. Czas zależy od sądu i stopnia sporu.",
    basis: "praktyka postępowań — bez gwarancji",
    tags: ["speed"],
  },
  {
    id: "costs",
    topic: "Koszty sądowe",
    noFault: "Opłata od pozwu 600 zł. Gdy rozwód zapada bez orzekania o winie na zgodne żądanie, możliwy jest zwrot połowy opłaty (300 zł) po uprawomocnieniu wyroku.",
    withFault: "Opłata od pozwu 600 zł. Zwrot połowy opłaty co do zasady nie przysługuje. Dłuższe postępowanie może oznaczać wyższe koszty pełnomocnika i dowodów (np. opinii).",
    basis: "art. 26 ust. 1 i art. 79 UKSC",
    verify: true,
    tags: ["costs"],
  },
  {
    id: "alimony",
    topic: "Alimenty między byłymi małżonkami",
    noFault: "Gdy żaden nie ponosi winy (także przy zaniechaniu orzekania o winie), każdy może żądać alimentów od drugiego, jeśli znajdzie się w niedostatku (art. 60 § 1). Obowiązek wygasa co do zasady po 5 latach od rozwodu — sąd może ten termin przedłużyć w wyjątkowych okolicznościach (art. 60 § 3).",
    withFault: "Małżonek niewinny może żądać alimentów od wyłącznie winnego, gdy rozwód pociąga istotne pogorszenie jego sytuacji materialnej — nawet bez niedostatku i bez 5-letniego limitu (art. 60 § 2–3). Przy winie obopólnej zasady są zbliżone do art. 60 § 1. Obowiązek wygasa, gdy uprawniony zawrze nowe małżeństwo.",
    basis: "art. 60 KRO",
    tags: ["alimony", "hardship"],
  },
  {
    id: "children",
    topic: "Dzieci w wyroku",
    noFault: "Sąd rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach na dzieci niezależnie od winy, kierując się dobrem dziecka. Uwzględnia pisemne porozumienie rodziców, jeśli jest zgodne z dobrem dziecka (art. 58 § 1).",
    withFault: "Tak samo — orzeczenie o winie nie przesądza o opiece nad dziećmi ani alimentach na dzieci. Sąd kieruje się dobrem dziecka.",
    basis: "art. 58 § 1 KRO",
    tags: ["children", "coparenting"],
  },
  {
    id: "coparenting",
    topic: "Relacja rodzicielska po rozwodzie",
    noFault: "Mniej konfrontacyjny przebieg może ułatwiać późniejszą współpracę rodzicielską — to jednak zależy od Was, nie od formy wyroku.",
    withFault: "Spór o winę bywa obciążający emocjonalnie i może utrudniać późniejsze porozumiewanie się w sprawach dzieci. Nie oznacza to, że współpraca jest niemożliwa.",
    basis: "uwaga praktyczna, nie przepis",
    tags: ["coparenting", "children"],
  },
  {
    id: "negative",
    topic: "Rozwód na żądanie małżonka wyłącznie winnego",
    noFault: "Nie dotyczy — przy zgodnym żądaniu bez orzekania o winie ta przesłanka nie jest badana.",
    withFault: "Rozwód nie jest dopuszczalny, jeżeli żąda go małżonek wyłącznie winny — chyba że drugi małżonek wyrazi zgodę albo jego odmowa jest w danych okolicznościach sprzeczna z zasadami współżycia społecznego (art. 56 § 3).",
    basis: "art. 56 § 3 KRO",
    tags: ["consent-no", "justice"],
  },
  {
    id: "inheritance",
    topic: "Dziedziczenie w trakcie sprawy",
    noFault: "Do uprawomocnienia wyroku małżonkowie co do zasady dziedziczą po sobie ustawowo.",
    withFault: "Małżonek może zostać wyłączony od dziedziczenia, jeśli spadkodawca wystąpił o rozwód z jego winy, a żądanie było uzasadnione — wyłączenia żąda inny spadkobierca w określonym terminie (art. 940 KC).",
    basis: "art. 940 KC",
    verify: true,
    tags: ["justice"],
  },
  {
    id: "name",
    topic: "Nazwisko po rozwodzie",
    noFault: "Możesz wrócić do nazwiska sprzed ślubu w ciągu roku od uprawomocnienia wyroku — oświadczeniem przed kierownikiem USC lub konsulem.",
    withFault: "Tak samo — forma wyroku nie wpływa na tę możliwość.",
    basis: "art. 59 KRO",
    tags: [],
  },
];

export function rowTags(a: FaultAnswers): Set<string> {
  const t = new Set<string>(a.priorities || []);
  if (a.children === "minor" || a.children === "adult") t.add("children");
  if (a.consent === "no") t.add("consent-no");
  if (a.consent === "unsure") t.add("consent-unsure");
  if (a.hardship === "me" || a.hardship === "partner" || a.hardship === "unsure") t.add("hardship");
  return t;
}

/** Wiersze posortowane: najpierw istotne dla odpowiedzi (stabilnie), z flagą highlight */
export function buildRows(a: FaultAnswers): (FaultRow & { highlight: boolean })[] {
  const tags = rowTags(a);
  const rows = ROWS.map((r, i) => ({ ...r, highlight: r.tags.some((x) => tags.has(x)), i }));
  rows.sort((x, y) => Number(y.highlight) - Number(x.highlight) || x.i - y.i);
  return rows.map(({ i: _i, ...r }) => r);
}

export function considerations(a: FaultAnswers): string[] {
  const c: string[] = [];
  if (a.consent === "yes") c.push("Skoro druga strona dopuszcza rozwód bez orzekania o winie, warto potwierdzić to na piśmie lub w rozmowie z udziałem specjalisty — zgodne żądanie musi zostać zgłoszone w sądzie.");
  if (a.consent === "no") c.push("Jeśli druga strona żąda ustalenia winy, sąd będzie ją badał — nawet jeśli Ty wolisz rozwód bez orzekania o winie. Warto przygotować się na postępowanie dowodowe.");
  if (a.consent === "unsure") c.push("Nie wiesz, jakie stanowisko zajmie druga strona. Rozmowa (lub mediacja, jeśli jest bezpieczna) może pomóc to wyjaśnić przed złożeniem pozwu.");
  if (a.hardship === "me") c.push("Jeśli po rozwodzie możesz znaleźć się w trudnej sytuacji materialnej, forma wyroku może mieć znaczenie dla możliwości i czasu trwania alimentów od byłego małżonka (art. 60 KRO). To wymaga indywidualnej analizy.");
  if (a.hardship === "partner") c.push("Jeśli to druga strona może znaleźć się w trudnej sytuacji materialnej, forma wyroku może wpływać na zakres i czas ewentualnego obowiązku alimentacyjnego wobec niej.");
  if (a.hardship === "unsure") c.push("Trudno ocenić sytuację materialną po rozwodzie? Policz budżet po rozstaniu — to pomoże zrozumieć, czy temat alimentów między małżonkami może Cię dotyczyć.");
  if (a.children === "minor") c.push("Przy małoletnich dzieciach sąd zawsze rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach. Pisemne porozumienie rodzicielskie bywa pomocne niezależnie od decyzji o winie.");
  if (a.priorities?.includes("justice")) c.push("Potrzeba ustalenia odpowiedzialności jest zrozumiała. Warto zastanowić się, czego oczekujesz od orzeczenia o winie — i porównać to z kosztami emocjonalnymi i czasowymi.");
  if (a.priorities?.includes("privacy")) c.push("Przy orzekaniu o winie sprawy prywatne mogą być omawiane przy świadkach. Rozprawy w sprawach rozwodowych odbywają się jednak co do zasady przy drzwiach zamkniętych, chyba że obie strony żądają jawności — szczegóły sprawdź z prawnikiem.");
  c.push("Decyzja o żądaniu orzeczenia o winie należy do Ciebie. Zmiana stanowiska w toku sprawy jest możliwa — zapytaj prawnika o skutki procesowe.");
  return c;
}

export function lawyerQuestions(a: FaultAnswers): string[] {
  const q = [
    "Jakie dowody byłyby potrzebne w mojej sprawie, gdybym żądał(a) orzeczenia o winie?",
    "Jak forma wyroku może wpłynąć na alimenty między nami po rozwodzie?",
    "Ile czasu i jakie koszty mogą wiązać się z każdym wariantem w moim sądzie?",
    "Czy możliwy jest zwrot połowy opłaty od pozwu w moim przypadku?",
  ];
  if (a.consent !== "yes") q.push("Co się stanie, jeśli druga strona nie zgodzi się na rozwód bez orzekania o winie?");
  if (a.children === "minor") q.push("Jak przygotować porozumienie rodzicielskie, żeby sąd mógł je uwzględnić?");
  q.push("Czy mogę zmienić stanowisko co do winy w trakcie postępowania?");
  if (a.safety === "yes") q.push("Jak zadbać o moje bezpieczeństwo w trakcie postępowania i jakie środki ochrony są dostępne?");
  return q;
}
