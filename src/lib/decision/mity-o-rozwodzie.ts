/**
 * Mity i fakty o rozwodzie — quiz edukacyjny.
 * Stan prawny: 10.11.2026. Treści do akceptacji prawnika przed publikacją.
 */
export type Verdict = "mit" | "fakt";
export type Choice = Verdict | "nie-wiem";

export type Statement = {
  id: string;
  text: string;
  answer: Verdict;
  explanation: string;
  source: string;
  /** Temat do doczytania */
  topic: { label: string; href: string };
};

export const STATEMENTS: Statement[] = [
  {
    id: "kredyt",
    text: "Rozwód zwalnia współkredytobiorcę ze wspólnego kredytu.",
    answer: "mit",
    explanation: "Umowa z bankiem się nie zmienia. Kredytobiorcy odpowiadają solidarnie za cały dług, dopóki bank nie zgodzi się na zmianę (np. zwolnienie jednej osoby lub refinansowanie).",
    source: "Kodeks cywilny, art. 366 i 519",
    topic: { label: "Mieszkanie i kredyt po rozstaniu", href: "/narzedzia/mieszkanie-i-kredyt" },
  },
  {
    id: "osobno",
    text: "Przed złożeniem pozwu trzeba przez jakiś czas mieszkać osobno.",
    answer: "mit",
    explanation: "Przepisy nie wymagają okresu osobnego mieszkania. Sąd bada jednak, czy nastąpił zupełny i trwały rozkład pożycia — czyli zanik więzi uczuciowej, fizycznej i gospodarczej. Wspólne mieszkanie nie wyklucza rozkładu pożycia.",
    source: "Kodeks rodzinny i opiekuńczy, art. 56 § 1",
    topic: { label: "Rozwód w Polsce krok po kroku", href: "/materialy/rozwod-krok-po-kroku" },
  },
  {
    id: "usc",
    text: "Rozwód można dziś wziąć w urzędzie stanu cywilnego, jeśli oboje się zgadzają.",
    answer: "mit",
    explanation: "Ustawa wprowadzająca rozwody przed kierownikiem USC została zawetowana przez Prezydenta 30.04.2026 r. i nie weszła w życie. Rozwód orzeka wyłącznie sąd okręgowy.",
    source: "Kodeks postępowania cywilnego, art. 17 pkt 1; stan na 10.11.2026",
    topic: { label: "Rozwód w Polsce krok po kroku", href: "/materialy/rozwod-krok-po-kroku" },
  },
  {
    id: "oplata",
    text: "Opłata sądowa od pozwu o rozwód wynosi 600 zł.",
    answer: "fakt",
    explanation: "To stała opłata od pozwu o rozwód (i o separację). Przy rozwodzie bez orzekania o winie na zgodne żądanie stron możliwy jest zwrot połowy opłaty. Do tego mogą dojść inne koszty, np. pełnomocnika.",
    source: "Ustawa o kosztach sądowych w sprawach cywilnych, art. 26 ust. 1",
    topic: { label: "Rozwód w Polsce krok po kroku", href: "/materialy/rozwod-krok-po-kroku" },
  },
  {
    id: "nazwisko",
    text: "Po rozwodzie trzeba wrócić do nazwiska sprzed ślubu.",
    answer: "mit",
    explanation: "To możliwość, nie obowiązek. Kto chce wrócić do poprzedniego nazwiska, składa oświadczenie przed kierownikiem USC lub konsulem — od 8.10.2025 r. w ciągu roku od uprawomocnienia wyroku.",
    source: "Kodeks rodzinny i opiekuńczy, art. 59",
    topic: { label: "Separacja czy rozwód?", href: "/narzedzia/separacja-czy-rozwod" },
  },
  {
    id: "mediacja",
    text: "Mediacja przed rozwodem jest obowiązkowa.",
    answer: "mit",
    explanation: "Mediacja jest dobrowolna. Sąd może skierować strony do mediacji — wtedy każda z nich może się temu sprzeciwić w ciągu tygodnia. W sytuacji przemocy lub zagrożenia wspólne negocjacje mogą nie być bezpieczne.",
    source: "Kodeks postępowania cywilnego, art. 183¹ i 183⁸",
    topic: { label: "Czy warto ustalić warunki przed pozwem?", href: "/narzedzia/przed-pozwem" },
  },
  {
    id: "separacja-slub",
    text: "Osoba w separacji może zawrzeć nowe małżeństwo.",
    answer: "mit",
    explanation: "Separacja nie rozwiązuje małżeństwa. Małżonek pozostający w separacji nie może zawrzeć nowego związku małżeńskiego.",
    source: "Kodeks rodzinny i opiekuńczy, art. 61⁴",
    topic: { label: "Separacja czy rozwód?", href: "/narzedzia/separacja-czy-rozwod" },
  },
  {
    id: "podzial",
    text: "Podział majątku musi zostać przeprowadzony w wyroku rozwodowym.",
    answer: "mit",
    explanation: "Sąd może podzielić majątek w wyroku rozwodowym na wniosek, jeśli nie spowoduje to nadmiernej zwłoki. Częściej robi się to osobno — w odrębnym postępowaniu sądowym albo umową (przy nieruchomości u notariusza).",
    source: "Kodeks rodzinny i opiekuńczy, art. 58 § 3",
    topic: { label: "Arkusz: majątek i długi", href: "/materialy/inwentaryzacja-majatku" },
  },
  {
    id: "bez-winy",
    text: "Rozwód bez orzekania o winie wymaga zgodnego żądania obojga małżonków.",
    answer: "fakt",
    explanation: "Sąd zaniecha orzekania o winie na zgodne żądanie małżonków. Wtedy skutki są takie, jakby żadne z nich nie ponosiło winy.",
    source: "Kodeks rodzinny i opiekuńczy, art. 57 § 2",
    topic: { label: "Czy warto ustalić warunki przed pozwem?", href: "/narzedzia/przed-pozwem" },
  },
  {
    id: "dziecko-13",
    text: "Dziecko od 13. roku życia samo decyduje, z którym rodzicem zamieszka.",
    answer: "mit",
    explanation: "Przepisy nie wskazują takiego wieku. Sąd uwzględnia zdanie dziecka stosownie do jego wieku i dojrzałości, ale rozstrzyga, kierując się dobrem dziecka.",
    source: "Kodeks rodzinny i opiekuńczy, art. 58 § 1 i art. 95 § 4",
    topic: { label: "Plan opieki nad dzieckiem", href: "/narzedzia/plan-opieki-nad-dzieckiem" },
  },
  {
    id: "alimenty",
    text: "Małżonek niewinny rozkładu pożycia zawsze dostanie alimenty od byłego małżonka.",
    answer: "mit",
    explanation: "Alimenty między byłymi małżonkami zależą od warunków: m.in. niedostatku albo — gdy drugi małżonek jest wyłącznie winny — istotnego pogorszenia sytuacji materialnej. Nie przysługują automatycznie.",
    source: "Kodeks rodzinny i opiekuńczy, art. 60",
    topic: { label: "Mapa prawnych konsekwencji rozstania", href: "/narzedzia/konsekwencje-rozstania" },
  },
  {
    id: "nieformalny",
    text: "Związek nieformalny daje partnerom takie same prawa majątkowe jak małżeństwo.",
    answer: "mit",
    explanation: "Partnerów nieformalnych nie łączy wspólność majątkowa małżeńska. Wspólnie kupione rzeczy są zwykle współwłasnością według Kodeksu cywilnego. Prawa i obowiązki wobec dzieci nie zależą jednak od ślubu.",
    source: "Kodeks cywilny, art. 195 i n.; KRO art. 31",
    topic: { label: "Mapa prawnych konsekwencji rozstania", href: "/narzedzia/konsekwencje-rozstania" },
  },
];

export type QuizAnswers = Record<string, Choice | undefined>;

export function scoreQuiz(answers: QuizAnswers) {
  let correct = 0;
  let unknown = 0;
  const missed: Statement[] = [];
  for (const s of STATEMENTS) {
    const a = answers[s.id];
    if (a === s.answer) correct++;
    else {
      if (a === "nie-wiem" || a === undefined) unknown++;
      missed.push(s);
    }
  }
  return { correct, unknown, wrong: STATEMENTS.length - correct - unknown, total: STATEMENTS.length, missed };
}

export function scoreMessage(correct: number, total: number) {
  const pct = correct / total;
  if (pct >= 0.85) return "Dobrze orientujesz się w podstawach. Poniżej znajdziesz szczegóły, które warto mieć pod ręką.";
  if (pct >= 0.5) return "Znasz sporo zasad — kilka mitów wciąż krąży. Zobacz wyjaśnienia poniżej.";
  return "Te mity są bardzo popularne, więc nic dziwnego, że się pojawiły. Wyjaśnienia poniżej pomogą uporządkować wiedzę.";
}

/** Tematy do doczytania — unikalne, w kolejności pomyłek */
export function topicsToRead(answers: QuizAnswers) {
  const { missed } = scoreQuiz(answers);
  const seen = new Set<string>();
  return missed.map((s) => s.topic).filter((t) => (seen.has(t.href) ? false : (seen.add(t.href), true)));
}
