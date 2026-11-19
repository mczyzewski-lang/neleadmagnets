/**
 * Przed decyzją: Rozwód z orzekaniem o winie czy bez?
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
  { value: "justice", label: "Poczucie sprawiedliwości, ustalenie odpowiedzialności" },
  { value: "coparenting", label: "Relacja rodzicielska po rozwodzie" },
  { value: "alimony", label: "Alimenty między byłymi małżonkami" },
  { value: "privacy", label: "Prywatność: mniej ujawniania spraw osobistych" },
];

/** Priorytety dostępne dla danej odpowiedzi o dzieciach (bez małoletnich dzieci nie pytamy o relację rodzicielską) */
export function prioritiesFor(a: FaultAnswers) {
  return a.children === "minor" ? PRIORITIES : PRIORITIES.filter((p) => p.value !== "coparenting");
}

/** Pole basis to podstawa prawna do wewnętrznej weryfikacji; nie jest wyświetlane (przepisy są w meta.sources). */
export const ROWS: FaultRow[] = [
  {
    id: "grounds",
    topic: "Przesłanki rozwodu",
    noFault: "Sąd ustala, czy nastąpił zupełny i trwały rozkład pożycia. Na zgodne żądanie obojga małżonków nie orzeka o winie.",
    withFault: "Te same przesłanki. Dodatkowo sąd ustala, czy winę ponosi jeden z małżonków, oboje, czy żadne.",
    basis: "art. 56 § 1, art. 57 KRO",
    tags: ["justice"],
  },
  {
    id: "consent",
    topic: "Czy potrzebna jest zgoda drugiej strony",
    noFault: "Tak. Potrzebne jest zgodne żądanie obojga. Jeśli jedna strona chce ustalenia winy, sąd musi ją badać.",
    withFault: "Nie. Wystarczy żądanie jednej strony.",
    basis: "art. 57 KRO",
    tags: ["consent-no", "consent-unsure"],
  },
  {
    id: "evidence",
    topic: "Dowody, świadkowie i prywatność",
    noFault: "Dowody dotyczą głównie rozkładu pożycia i spraw dzieci. Zwykle jest ich mniej.",
    withFault: "Zwykle więcej dowodów: świadkowie, dokumenty, korespondencja. Sprawy prywatne mogą być szczegółowo omawiane.",
    basis: "KPC, postępowanie dowodowe",
    tags: ["privacy", "speed", "coparenting"],
  },
  {
    id: "time",
    topic: "Czas i liczba rozpraw",
    noFault: "Często mniej czynności. Czas zależy od sądu i spraw dzieci, nie da się go zagwarantować.",
    withFault: "Zwykle więcej rozpraw, co może wydłużyć sprawę. Czas zależy od sądu i stopnia sporu.",
    basis: "praktyka, bez gwarancji",
    tags: ["speed"],
  },
  {
    id: "costs",
    topic: "Koszty sądowe",
    noFault: "Opłata od pozwu 600 zł. Przy rozwodzie bez orzekania o winie na zgodne żądanie sąd zwraca połowę (300 zł) po uprawomocnieniu wyroku.",
    withFault: "Opłata od pozwu 600 zł, zwykle bez zwrotu połowy. Dłuższa sprawa może oznaczać wyższe koszty pełnomocnika i dowodów (np. opinii).",
    basis: "art. 26 ust. 1 i art. 79 UKSC",
    verify: true,
    tags: ["costs"],
  },
  {
    id: "alimony",
    topic: "Alimenty między byłymi małżonkami",
    noFault: "Gdy żaden nie ponosi winy (także bez orzekania o winie), każdy może żądać alimentów, jeśli znajdzie się w niedostatku. Obowiązek zwykle wygasa po 5 latach. Sąd może go wyjątkowo przedłużyć.",
    withFault: "Niewinny małżonek może żądać alimentów od wyłącznie winnego, gdy rozwód istotnie pogarsza jego sytuację. Nawet bez niedostatku i bez limitu 5 lat. Przy winie obu stron zasady są jak przy braku winy. Obowiązek wygasa, gdy uprawniony zawrze nowe małżeństwo.",
    basis: "art. 60 KRO",
    tags: ["alimony", "hardship"],
  },
  {
    id: "children",
    topic: "Dzieci w wyroku",
    noFault: "Sąd rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach na dzieci niezależnie od winy, kierując się dobrem dziecka. Uwzględnia porozumienie rodzicielskie, jeśli służy dziecku.",
    withFault: "Tak samo. Wina nie przesądza o opiece nad dziećmi ani o alimentach na dzieci.",
    basis: "art. 58 § 1 KRO",
    tags: ["children", "coparenting"],
  },
  {
    id: "coparenting",
    topic: "Relacja rodzicielska po rozwodzie",
    noFault: "Mniej konfrontacyjna sprawa może ułatwić późniejszą współpracę. To jednak zależy od Was, nie od formy wyroku.",
    withFault: "Spór o winę bywa obciążający i może utrudnić późniejsze rozmowy o dzieciach. Nie znaczy to, że współpraca jest niemożliwa.",
    basis: "uwaga praktyczna, nie przepis",
    tags: ["coparenting", "children"],
  },
  {
    id: "negative",
    topic: "Rozwód na żądanie małżonka wyłącznie winnego",
    noFault: "Nie dotyczy. Przy zgodnym żądaniu bez orzekania o winie sąd tego nie bada.",
    withFault: "Małżonek wyłącznie winny nie dostanie rozwodu, chyba że drugi się zgodzi albo jego odmowa w danych okolicznościach jest sprzeczna z zasadami współżycia społecznego.",
    basis: "art. 56 § 3 KRO",
    tags: ["consent-no", "justice"],
  },
  {
    id: "inheritance",
    topic: "Dziedziczenie w trakcie sprawy",
    noFault: "Do uprawomocnienia wyroku małżonkowie zwykle dziedziczą po sobie ustawowo.",
    withFault: "Małżonek może zostać wyłączony od dziedziczenia, jeśli zmarły wystąpił o rozwód z jego winy, a żądanie było uzasadnione. Wyłączenia żąda inny spadkobierca, w określonym terminie.",
    basis: "art. 940 KC",
    verify: true,
    tags: ["justice"],
  },
  {
    id: "name",
    topic: "Nazwisko po rozwodzie",
    noFault: "Możesz wrócić do nazwiska sprzed ślubu w ciągu roku od uprawomocnienia wyroku. Składasz oświadczenie w USC lub u konsula.",
    withFault: "Tak samo. Forma wyroku nie ma tu znaczenia.",
    basis: "art. 59 KRO",
    tags: [],
  },
];

export function rowTags(a: FaultAnswers): Set<string> {
  const t = new Set<string>((a.priorities || []).filter((p) => p !== "coparenting" || (a.children !== "none" && a.children !== "adult")));
  if (a.children === "minor") t.add("children");
  if (a.consent === "no") t.add("consent-no");
  if (a.consent === "unsure") t.add("consent-unsure");
  if (a.hardship === "me" || a.hardship === "partner" || a.hardship === "unsure") t.add("hardship");
  return t;
}

/** Wiersze posortowane: najpierw istotne dla odpowiedzi (stabilnie), z flagą highlight */
export function buildRows(a: FaultAnswers): (FaultRow & { highlight: boolean })[] {
  const tags = rowTags(a);
  const noMinors = a.children === "none" || a.children === "adult";
  const visible = ROWS.filter((r) => !(noMinors && (r.id === "children" || r.id === "coparenting")));
  const rows = visible.map((r, i) => ({ ...r, highlight: r.tags.some((x) => tags.has(x)), i }));
  rows.sort((x, y) => Number(y.highlight) - Number(x.highlight) || x.i - y.i);
  return rows.map(({ i: _i, ...r }) => r);
}

export function considerations(a: FaultAnswers): string[] {
  const c: string[] = [];
  const unsafe = a.safety === "yes";
  if (a.consent === "yes") c.push("Druga strona dopuszcza rozwód bez orzekania o winie. Warto potwierdzić to wcześniej, bo zgodne żądanie trzeba zgłosić w sądzie.");
  if (a.consent === "no") c.push("Jeśli druga strona żąda ustalenia winy, sąd będzie ją badał, nawet jeśli Ty wolisz rozwód bez winy. Przygotuj się na postępowanie dowodowe.");
  if (a.consent === "no" && !unsafe) c.push("Brak zgody dziś nie zamyka sprawy. Możesz zaproponować mediację: wysłać zaproszenie do mediacji sam/sama albo przez wybranego mediatora. Przy wyraźnej odmowie mediator może to potwierdzić na piśmie. Taką próbę wskażesz w pozwie, a strona, która bez ważnego powodu odmówiła, może ponieść koszty.");
  if (a.consent === "unsure") c.push(unsafe ? "Nie wiesz, jakie stanowisko zajmie druga strona. Jak to sprawdzić bezpiecznie, omów z prawnikiem." : "Nie wiesz, jakie stanowisko zajmie druga strona. Pomóc może rozmowa, a jeśli jest za trudna, mediacja.");
  if (a.hardship === "me") c.push("Jeśli po rozwodzie możesz być w trudnej sytuacji materialnej, forma wyroku może wpłynąć na to, czy i jak długo dostaniesz alimenty od byłego małżonka. To wymaga indywidualnej analizy.");
  if (a.hardship === "partner") c.push("Jeśli to druga strona może być w trudnej sytuacji, forma wyroku może wpłynąć na zakres i czas Twojego ewentualnego obowiązku alimentacyjnego.");
  if (a.hardship === "none") c.push("Jeśli żadne z Was nie będzie w trudnej sytuacji materialnej, różnice w alimentach między małżonkami prawdopodobnie mają dla Was mniejsze znaczenie.");
  if (a.hardship === "unsure") c.push("Trudno ocenić finanse po rozwodzie? Policz budżet po rozstaniu. Zobaczysz, czy temat alimentów między małżonkami może Cię dotyczyć.");
  if (a.children === "minor") c.push("Przy małoletnich dzieciach sąd zawsze rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach. Porozumienie rodzicielskie pomaga niezależnie od decyzji o winie.");
  if (a.children === "adult") c.push("Wyrok rozwodowy nie rozstrzyga o pełnoletnich dzieciach. Pełnoletnie dziecko, które potrzebuje alimentów, występuje o nie we własnym imieniu.");
  if (a.priorities?.includes("justice")) c.push("Potrzeba ustalenia odpowiedzialności jest zrozumiała. Zastanów się, czego oczekujesz od orzeczenia o winie, i porównaj to z kosztem emocjonalnym i czasem.");
  if (a.priorities?.includes("privacy")) c.push("Przy orzekaniu o winie sprawy prywatne mogą być omawiane przy świadkach. Rozprawy rozwodowe zwykle odbywają się przy drzwiach zamkniętych. Szczegóły sprawdź z prawnikiem.");
  if (!unsafe) c.push("Stanowisko co do winy warto ustalić przed pozwem: najpierw plan (czego oczekujesz i dlaczego), potem rozmowa lub mediacja, dopiero potem pozew.");
  else c.push("Przy przemocy lub groźbach nie musisz proponować rozmowy ani mediacji. Mediacja jest dobrowolna. Kolejne kroki omów z prawnikiem lub ośrodkiem pomocy.");
  c.push("Decyzja o żądaniu orzeczenia o winie należy do Ciebie. Stanowisko można zmienić w trakcie sprawy. O skutki zapytaj prawnika.");
  return c;
}

export function lawyerQuestions(a: FaultAnswers): string[] {
  const q = [
    "Jakie dowody byłyby potrzebne w mojej sprawie, gdybym żądał(a) orzeczenia o winie?",
    "Ile czasu i jakie koszty mogą wiązać się z każdym wariantem w moim sądzie?",
    "Czy możliwy jest zwrot połowy opłaty od pozwu w moim przypadku?",
  ];
  if (a.hardship !== "none") q.splice(1, 0, "Jak forma wyroku może wpłynąć na alimenty między nami po rozwodzie?");
  if (a.consent !== "yes") q.push("Co się stanie, jeśli druga strona nie zgodzi się na rozwód bez orzekania o winie?");
  if (a.children === "minor") q.push("Jak przygotować porozumienie rodzicielskie, żeby sąd mógł je uwzględnić?");
  q.push("Czy mogę zmienić stanowisko co do winy w trakcie postępowania?");
  if (a.safety === "yes") q.push("Jak zadbać o moje bezpieczeństwo w trakcie postępowania i jakie środki ochrony są dostępne?");
  return q;
}
