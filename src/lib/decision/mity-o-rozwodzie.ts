/**
 * Mity i fakty o rozwodzie: quiz edukacyjny.
 * Pole source pokazuje nazwę aktu bez numerów przepisów (COPY_GUIDE.md); artykuły są w meta.sources.
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
    source: "Kodeks cywilny",
    topic: { label: "Mieszkanie i kredyt po rozstaniu", href: "/narzedzia/mieszkanie-i-kredyt" },
  },
  {
    id: "osobno",
    text: "Przed złożeniem pozwu trzeba przez jakiś czas mieszkać osobno.",
    answer: "mit",
    explanation: "Przepisy nie wymagają okresu osobnego mieszkania. Sąd bada, czy nastąpił zupełny i trwały rozkład pożycia, czyli zanik więzi uczuciowej, fizycznej i gospodarczej. Wspólne mieszkanie go nie wyklucza.",
    source: "Kodeks rodzinny i opiekuńczy",
    topic: { label: "Rozwód w Polsce krok po kroku", href: "/materialy/rozwod-krok-po-kroku" },
  },
  {
    id: "usc",
    text: "Rozwód można dziś wziąć w urzędzie stanu cywilnego, jeśli oboje się zgadzają.",
    answer: "mit",
    explanation: "Ustawa o rozwodach w USC została zawetowana 30.04.2026 r. i nie weszła w życie. Rozwód orzeka wyłącznie sąd okręgowy.",
    source: "Kodeks postępowania cywilnego, stan na 10.11.2026",
    topic: { label: "Rozwód w Polsce krok po kroku", href: "/materialy/rozwod-krok-po-kroku" },
  },
  {
    id: "oplata",
    text: "Opłata sądowa od pozwu o rozwód wynosi 600 zł.",
    answer: "fakt",
    explanation: "To stała opłata od pozwu o rozwód (i o separację). Przy rozwodzie bez orzekania o winie na zgodne żądanie sąd zwraca połowę. Mogą dojść inne koszty, np. pełnomocnika.",
    source: "Ustawa o kosztach sądowych w sprawach cywilnych",
    topic: { label: "Rozwód w Polsce krok po kroku", href: "/materialy/rozwod-krok-po-kroku" },
  },
  {
    id: "nazwisko",
    text: "Po rozwodzie trzeba wrócić do nazwiska sprzed ślubu.",
    answer: "mit",
    explanation: "To możliwość, nie obowiązek. Kto chce wrócić do poprzedniego nazwiska, składa oświadczenie w USC lub u konsula. Od 8.10.2025 r. ma na to rok od uprawomocnienia wyroku.",
    source: "Kodeks rodzinny i opiekuńczy",
    topic: { label: "Separacja czy rozwód?", href: "/narzedzia/separacja-czy-rozwod" },
  },
  {
    id: "mediacja",
    text: "Mediacja przed rozwodem jest obowiązkowa.",
    answer: "mit",
    explanation: "Mediacja jest dobrowolna. Sąd może skierować strony do mediacji, ale każda może się sprzeciwić w ciągu tygodnia. Warto spróbować przed pozwem, bo w pozwie piszesz, czy była próba mediacji, a jeśli nie, dlaczego. Mediację zwykle zaczyna zaproszenie od strony albo od wybranego mediatora. Przy wyraźnej odmowie mediator może to potwierdzić na piśmie. Przy przemocy lub zagrożeniu nie musisz proponować mediacji.",
    source: "Kodeks postępowania cywilnego",
    topic: { label: "Czy warto ustalić warunki przed pozwem?", href: "/narzedzia/przed-pozwem" },
  },
  {
    id: "separacja-slub",
    text: "Osoba w separacji może zawrzeć nowe małżeństwo.",
    answer: "mit",
    explanation: "Separacja nie rozwiązuje małżeństwa. Osoba w separacji nie może zawrzeć nowego małżeństwa.",
    source: "Kodeks rodzinny i opiekuńczy",
    topic: { label: "Separacja czy rozwód?", href: "/narzedzia/separacja-czy-rozwod" },
  },
  {
    id: "podzial",
    text: "Podział majątku musi zostać przeprowadzony w wyroku rozwodowym.",
    answer: "mit",
    explanation: "Sąd może podzielić majątek w wyroku rozwodowym na wniosek, jeśli nie wydłuży to nadmiernie sprawy. Częściej robi się to osobno: w sądzie albo umową (nieruchomość u notariusza).",
    source: "Kodeks rodzinny i opiekuńczy",
    topic: { label: "Arkusz: majątek i długi", href: "/materialy/inwentaryzacja-majatku" },
  },
  {
    id: "bez-winy",
    text: "Rozwód bez orzekania o winie wymaga zgodnego żądania obojga małżonków.",
    answer: "fakt",
    explanation: "Sąd nie orzeka o winie, gdy oboje małżonkowie zgodnie o to wnoszą. Skutki są wtedy takie, jakby żadne z nich nie ponosiło winy.",
    source: "Kodeks rodzinny i opiekuńczy",
    topic: { label: "Czy warto ustalić warunki przed pozwem?", href: "/narzedzia/przed-pozwem" },
  },
  {
    id: "dziecko-13",
    text: "Dziecko od 13. roku życia samo decyduje, z którym rodzicem zamieszka.",
    answer: "mit",
    explanation: "Przepisy nie wskazują takiego wieku. Sąd bierze pod uwagę zdanie dziecka, zależnie od jego wieku i dojrzałości, ale rozstrzyga według dobra dziecka.",
    source: "Kodeks rodzinny i opiekuńczy",
    topic: { label: "Plan opieki nad dzieckiem", href: "/narzedzia/plan-opieki-nad-dzieckiem" },
  },
  {
    id: "alimenty",
    text: "Małżonek niewinny rozkładu pożycia zawsze dostanie alimenty od byłego małżonka.",
    answer: "mit",
    explanation: "Alimenty między byłymi małżonkami zależą od warunków: m.in. niedostatku albo (gdy drugi małżonek jest wyłącznie winny) istotnego pogorszenia sytuacji. Nie przysługują automatycznie.",
    source: "Kodeks rodzinny i opiekuńczy",
    topic: { label: "Mapa prawnych konsekwencji rozstania", href: "/narzedzia/konsekwencje-rozstania" },
  },
  {
    id: "nieformalny",
    text: "Związek nieformalny daje partnerom takie same prawa majątkowe jak małżeństwo.",
    answer: "mit",
    explanation: "Partnerów nieformalnych nie łączy wspólność majątkowa małżeńska. Wspólnie kupione rzeczy są zwykle współwłasnością na zasadach ogólnych. Prawa i obowiązki wobec dzieci nie zależą jednak od ślubu.",
    source: "Kodeks cywilny, Kodeks rodzinny i opiekuńczy",
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
  if (pct >= 0.5) return "Znasz sporo zasad, ale kilka mitów wciąż krąży. Zobacz wyjaśnienia poniżej.";
  return "Te mity są bardzo popularne, więc nic dziwnego, że się pojawiły. Wyjaśnienia poniżej pomogą uporządkować wiedzę.";
}

/** Tematy do doczytania: unikalne, w kolejności pomyłek */
export function topicsToRead(answers: QuizAnswers) {
  const { missed } = scoreQuiz(answers);
  const seen = new Set<string>();
  return missed.map((s) => s.topic).filter((t) => (seen.has(t.href) ? false : (seen.add(t.href), true)));
}
