/**
 * Narzędzie 5: Czy można ustalić warunki rozwodu, zanim złożycie pozew?
 * Deterministyczna mapa ustaleń. Wynik ma trzy osobne części:
 *  (a) rozmowy między stronami, (b) mediacja z mediatorem, (c) pozew.
 * Bezpieczeństwo ma pierwszeństwo: przy sygnale przemocy, zagrożenia lub presji
 * nie kierujemy do wspólnych rozmów ani mediacji.
 * Treści bez przepisów w zdaniach (COPY_GUIDE.md); podstawy prawne są w `sources` w src/lib/tools.ts.
 */
import type { OfferKey } from "@/content/types";

export type PreFilingAnswers = {
  safety?: "yes" | "no" | "skip";
  decision?: "taken" | "considering" | "partner";
  openness?: "both" | "me" | "partner" | "none" | "unsure";
  children?: "minor" | "adult" | "none";
  finances?: "yes" | "some" | "no";
  topics?: string[]; // tematy wymagające uzgodnienia
  agreed?: string[]; // tematy już (wstępnie) uzgodnione
  contested?: string[]; // tematy szczególnie sporne
  balance?: "ok" | "unequal" | "unsure"; // czy obie strony mogą swobodnie przedstawiać swoje zdanie
};

export const TOPICS = [
  { value: "opieka", label: "Miejsce zamieszkania dziecka i opieka", needsChildren: true },
  { value: "kontakty", label: "Kontakty z dzieckiem, wakacje, święta", needsChildren: true },
  { value: "alimenty", label: "Koszty utrzymania dzieci, alimenty", needsChildren: true },
  { value: "mieszkanie", label: "Mieszkanie (kto zostaje, sprzedaż)" },
  { value: "kredyt", label: "Kredyt i inne długi" },
  { value: "majatek", label: "Podział majątku (oszczędności, auto, rzeczy)" },
  { value: "wina", label: "Orzekanie o winie" },
  { value: "przejsciowe", label: "Zasady na okres przejściowy (rachunki, wyprowadzka)" },
] as const;

export type TopicValue = (typeof TOPICS)[number]["value"];

export const topicLabel = (v: string) => TOPICS.find((t) => t.value === v)?.label ?? v;

export function availableTopics(a: PreFilingAnswers) {
  return TOPICS.filter((t) => !("needsChildren" in t && t.needsChildren) || a.children === "minor");
}

export const isSafetyConcern = (a: PreFilingAnswers) => a.safety === "yes" || a.balance === "unequal";

/** (a) Rozmowy między stronami: bez mediatora */
export type TalksBlock = {
  /** czy rozmowy wprost są w tej sytuacji realne */
  possible: boolean;
  intro: string;
  points: string[];
  /** jak spisać to, co uzgodnicie */
  writeDown: string[];
};

/** (b) Mediacja: z bezstronnym mediatorem */
export type MediationBlock = {
  intro: string;
  /** kiedy mediacja pomaga w tej sytuacji */
  when: string[];
  /** jak się zaczyna (zwykle zaproszenie do mediacji) */
  start: string[];
  /** jak przebiega i czym się kończy */
  process: string[];
};

export type PreFilingResult = {
  mode: "safety" | "standard";
  agreeable: string[]; // kwestie, które można spróbować uzgodnić
  analysis: { topic: string; reason: string }[]; // kwestie wymagające indywidualnej analizy
  talks: TalksBlock | null;
  mediation: MediationBlock | null;
  /** (c) co napisać w pozwie o próbie porozumienia */
  pozew: string[];
  documents: string[];
  mediatorQuestions: string[];
  sequence: { title: string; text: string }[];
  readiness: { agreed: number; open: number; contested: number; total: number };
  offers: { key: OfferKey; why: string; cta?: string }[];
  notes: string[];
};

const ANALYSIS_REASON: Record<string, string> = {
  wina: "Żądanie orzekania o winie wpływa m.in. na alimenty między małżonkami i przebieg sprawy. Wymaga indywidualnej oceny.",
  alimenty: "Kwota zależy od potrzeb dziecka i możliwości rodziców. Przygotuj zestawienie kosztów i skonsultuj założenia.",
  majatek: "Trzeba ustalić, co jest majątkiem wspólnym, a co osobistym, i czy były nakłady do rozliczenia.",
  mieszkanie: "Rozwiązanie zależy od własności, kredytu i możliwości finansowych, często także od zgody banku.",
  kredyt: "Zmiana w kredycie wymaga zgody banku. Samo porozumienie stron nie zwalnia nikogo z długu.",
  opieka: "Ustalenia muszą służyć dobru dziecka. Sąd ocenia porozumienie rodziców.",
  kontakty: "Harmonogram kontaktów warto dopasować do wieku i potrzeb dziecka.",
  przejsciowe: "Zasady na czas do wyroku warto spisać, żeby uniknąć nieporozumień.",
};

/** Kolejność od tematów zwykle najłatwiejszych do rozmowy */
const EASY_FIRST = ["przejsciowe", "kontakty", "opieka", "alimenty", "majatek", "mieszkanie", "kredyt", "wina"];

export function buildPreFiling(a: PreFilingAnswers): PreFilingResult {
  const topics = (a.topics || []).filter((t) => availableTopics(a).some((x) => x.value === t));
  const agreed = (a.agreed || []).filter((t) => topics.includes(t));
  const contested = (a.contested || []).filter((t) => topics.includes(t) && !agreed.includes(t));
  const open = topics.filter((t) => !agreed.includes(t) && !contested.includes(t));
  const readiness = { agreed: agreed.length, open: open.length, contested: contested.length, total: topics.length };
  const minor = a.children === "minor";

  const documents = ["Odpis skrócony aktu małżeństwa."];
  if (minor) documents.push("Odpisy skrócone aktów urodzenia dzieci.", "Zestawienie kosztów utrzymania dzieci (szkoła, zajęcia, zdrowie).");
  if (topics.includes("mieszkanie")) documents.push("Akt notarialny i numer księgi wieczystej mieszkania.");
  if (topics.includes("kredyt")) documents.push("Umowa kredytowa i zaświadczenie o saldzie zadłużenia.");
  if (a.finances !== "no" || topics.includes("majatek")) documents.push("Lista majątku i długów (konta, oszczędności, pojazdy, inwestycje).", "Informacje o dochodach (np. zaświadczenia, PIT za ostatni rok).");

  const adultChildNote = a.children === "adult"
    ? "Alimenty na pełnoletnie dziecko: dziecko występuje z roszczeniem we własnym imieniu, a nie przez rodzica. Rodzice mogą jednak rozmawiać o tym, jak będą je wspierać."
    : null;

  /* ---------- Tryb bezpieczeństwa ---------- */
  if (isSafetyConcern(a)) {
    const notes = [
      "Wspólne rozmowy i mediacja nie są dobrym rozwiązaniem, gdy jedna osoba boi się drugiej albo nie może swobodnie mówić.",
      "Mediacja jest dobrowolna. Nie musisz jej proponować ani wysyłać zaproszenia do mediacji.",
    ];
    if (adultChildNote) notes.push(adultChildNote);
    return {
      mode: "safety",
      agreeable: [],
      analysis: topics.map((t) => ({ topic: topicLabel(t), reason: "Omów ten temat najpierw indywidualnie ze specjalistą, który reprezentuje tylko Ciebie." })),
      talks: null,
      mediation: null,
      pozew: [
        "W pozwie podaje się, czy była próba mediacji lub innego polubownego rozwiązania sporu, a jeśli nie, to dlaczego.",
        "Względy bezpieczeństwa możesz wskazać jako powód, dla którego nie było próby mediacji. Sformułowanie omów z prawnikiem.",
        "Nie musisz opisywać w pozwie szczegółów, które mogłyby Ci zaszkodzić. Prawnik pomoże zdecydować, co napisać.",
      ],
      documents: [...documents, "Jeśli to bezpieczne: notatki z datami zdarzeń, wiadomości, zaświadczenia lekarskie lub inne dokumenty. Przechowuj je tam, gdzie druga osoba nie ma dostępu."],
      mediatorQuestions: [],
      sequence: [
        { title: "Bezpieczeństwo", text: "Zadbaj o bezpieczeństwo swoje i dzieci. W nagłej sytuacji dzwoń pod 112." },
        { title: "Wsparcie", text: "Skorzystaj z poufnego wsparcia, np. Niebieskiej Linii (800 120 002) lub lokalnego ośrodka interwencji kryzysowej." },
        { title: "Indywidualna porada", text: "Porozmawiaj z prawnikiem, który reprezentuje wyłącznie Ciebie, o krokach i ochronie." },
        { title: "Dokumenty", text: "Bezpiecznie zgromadź najważniejsze dokumenty." },
      ],
      readiness,
      offers: [{ key: "konsultacja", cta: "Poproś o indywidualną rozmowę", why: "Rozmowa tylko z Tobą, bez udziału drugiej strony. Pomożemy uporządkować dalsze kroki." }],
      notes,
    };
  }

  /* ---------- Tryb standardowy ---------- */
  const o = a.openness;
  const bothOpen = o === "both";
  const talksPossible = o === "both" || o === "unsure" || o === "partner";

  const agreeable: string[] = [];
  const analysis: { topic: string; reason: string }[] = [];
  for (const t of topics) {
    if (contested.includes(t) || t === "wina") analysis.push({ topic: topicLabel(t), reason: ANALYSIS_REASON[t] || "Temat sporny. Przygotuj się do niego indywidualnie przed rozmową." });
    else agreeable.push(topicLabel(t) + (agreed.includes(t) ? " (wstępnie uzgodnione, warto spisać)" : ""));
  }
  // tematy wymagające analizy niezależnie od sporu
  for (const t of ["kredyt", "majatek"]) {
    if (topics.includes(t) && !contested.includes(t)) analysis.push({ topic: topicLabel(t), reason: ANALYSIS_REASON[t] });
  }

  const easiest = EASY_FIRST.filter((t) => topics.includes(t) && !contested.includes(t) && t !== "wina").slice(0, 2).map((t) => topicLabel(t).toLowerCase());

  /* (a) Rozmowy między stronami */
  const talkPoints: string[] = [];
  let talksIntro: string;
  if (talksPossible) {
    talksIntro = bothOpen
      ? "Skoro oboje chcecie rozmawiać, zacznijcie sami. Mediator nie jest potrzebny do każdego tematu."
      : o === "partner"
        ? "Druga strona chce rozmawiać, Ty masz wątpliwości. Nie musisz zgadzać się na rozmowę od razu. Najpierw przygotuj się sam(a)."
        : "Nie wiadomo, czy rozmowa się uda. Spróbuj krótko, na jednym prostym temacie.";
    if (o === "partner") talkPoints.push("Przed rozmową ustal swoje priorytety i granice. Możesz je omówić ze specjalistą.");
    if (easiest.length) talkPoints.push(`Zacznijcie od tematów zwykle najmniej spornych: ${easiest.join(", ")}.`);
    if (agreed.length) talkPoints.push(`To, co już uzgodniliście (${agreed.map((t) => topicLabel(t).toLowerCase()).join(", ")}), spiszcie teraz, zanim szczegóły się rozmyją.`);
    talkPoints.push("Jeden temat na rozmowę. Umówcie się na czas i miejsce, w którym nikt Wam nie przeszkodzi.");
    if (minor) talkPoints.push("Rozmawiajcie bez dzieci i nie angażujcie ich w spory.");
    if (contested.length) talkPoints.push("Tematy sporne możecie odłożyć do mediacji. Nie musicie rozwiązać wszystkiego sami.");
    talkPoints.push("Jeśli rozmowa zamienia się w kłótnię, przerwijcie ją. To sygnał, że może pomóc mediator.");
  } else if (o === "me") {
    talksIntro = "Druga strona raczej nie chce teraz rozmawiać. Nie naciskaj.";
    talkPoints.push(
      "Możesz spokojnie przekazać pisemną propozycję ustaleń (np. e-mailem) i dać czas na odpowiedź.",
      "Propozycję przygotuj i skonsultuj, zanim ją wyślesz.",
      "Jeśli rozmowa wprost nie jest możliwa, możesz zaproponować mediację (niżej).",
    );
  } else {
    talksIntro = "Żadne z Was nie chce teraz rozmawiać. To też jest informacja, nie porażka.";
    talkPoints.push(
      "Spisz dla siebie priorytety i to, na co możesz się zgodzić. Przyda się, gdy sytuacja się zmieni.",
      "Do rozmów można wrócić później, także po złożeniu pozwu.",
    );
  }

  const writeDown: string[] = [];
  if (talksPossible || agreed.length) {
    writeDown.push("Zapiszcie, co uzgodniliście: kto, co, od kiedy i na jak długo. Datujcie i podpiszcie oboje.");
    if (minor && (topics.includes("opieka") || topics.includes("kontakty") || topics.includes("alimenty"))) writeDown.push("Ustalenia o dzieciach spiszcie jako porozumienie rodzicielskie: miejsce zamieszkania, kontakty, wakacje i święta, koszty. Sąd uwzględnia je, jeśli służy dobru dziecka.");
    if (topics.includes("przejsciowe")) writeDown.push("Zasady na okres przejściowy (rachunki, wyprowadzka) spiszcie osobno, z datą obowiązywania.");
    if (topics.includes("kredyt")) writeDown.push("Ustalenia o kredycie nie wiążą banku. Zmiana kredytobiorcy wymaga jego zgody.");
    writeDown.push("Spisane ustalenia to nie ugoda zatwierdzona przez sąd. Przed podpisaniem niech każde z Was skonsultuje treść z własnym doradcą.");
  }

  const talks: TalksBlock = { possible: talksPossible, intro: talksIntro, points: talkPoints, writeDown };

  /* (b) Mediacja */
  const when: string[] = [];
  if (contested.length) when.push(`Przy tematach spornych: ${contested.map((t) => topicLabel(t).toLowerCase()).join(", ")}.`);
  if (talksPossible) when.push("Gdy rozmowy utknęły albo kończą się kłótnią.");
  if (o === "me") when.push("Gdy druga strona nie chce rozmawiać z Tobą wprost, ale może zgodzi się na rozmowę przy bezstronnej osobie.");
  if (o === "partner") when.push("Gdy chcesz rozmawiać, ale potrzebujesz kogoś, kto pilnuje zasad i równowagi.");
  if (o === "none") when.push("Gdy któreś z Was zmieni zdanie. Spotkanie informacyjne z mediatorem do niczego nie zobowiązuje.");
  if (minor) when.push("Przy ustaleniach o dzieciach. Mediator pomaga przygotować porozumienie rodzicielskie.");

  const start: string[] = [];
  if (bothOpen) start.push("Możecie razem zgłosić się do wybranego mediatora lub ośrodka mediacji. Wtedy wystarczy wspólna zgoda.");
  start.push(
    bothOpen
      ? "Jeśli to jedno z Was zaczyna, zwykle wysyła się zaproszenie do mediacji. Może je wysłać strona albo, na jej prośbę, wybrany mediator lub ośrodek."
      : "Mediację zwykle zaczyna zaproszenie do mediacji. Możesz je wysłać sam(a) albo poprosić wybranego mediatora lub ośrodek mediacji, żeby wysłał je drugiej stronie.",
    "Mediatora znajdziesz np. na liście stałych mediatorów przy sądzie okręgowym albo w ośrodku mediacji.",
    "Pierwsze spotkanie jest często informacyjne, czasem osobno z każdą stroną.",
  );
  if (!bothOpen) start.push("Gdy druga strona wyraźnie odmówi, mediator lub ośrodek może wydać pisemne oświadczenie o braku zgody na mediację. Zachowaj zaproszenie, odpowiedź (albo informację o jej braku) i to oświadczenie.");
  start.push("Formalny wniosek o przeprowadzenie mediacji, składany do mediatora z odpisem dla drugiej strony, to jedna z możliwych dróg, a nie jedyna. Zwykle zaczyna się od zaproszenia.");

  const process = [
    "Mediator jest bezstronny. Nie rozstrzyga sporu i nie doradza żadnej ze stron. Pomaga rozmawiać o potrzebach.",
    "Mediacja jest dobrowolna i poufna. Każde z Was może z niej zrezygnować na każdym etapie.",
    "Efektem może być ugoda lub porozumienie. Ugodę zawartą przed mediatorem sąd może zatwierdzić.",
    "Przed podpisaniem warto, by każde z Was skonsultowało treść z własnym doradcą.",
    "Koszty: w mediacji prywatnej wynagrodzenie ustala mediator. W mediacji skierowanej przez sąd stawki określają przepisy.",
  ];

  const mediation: MediationBlock = {
    intro: "Mediacja to coś innego niż Wasze rozmowy: spotkania z bezstronnym mediatorem, który pomaga wypracować porozumienie.",
    when,
    start,
    process,
  };

  /* (c) Pozew */
  const pozew: string[] = [
    "W pozwie podaje się, czy była próba mediacji lub innego polubownego rozwiązania sporu. Jeśli nie, trzeba wyjaśnić dlaczego.",
    "Same rozmowy między Wami nie są mediacją. Jeśli doprowadziły do ustaleń, opisz te ustalenia we wnioskach pozwu.",
  ];
  if (o === "me" || o === "unsure") pozew.push("Jeśli druga strona odmówiła mediacji, napisz to i dołącz zaproszenie oraz oświadczenie mediatora, jeśli je masz.");
  if (o === "none") pozew.push("Jeśli nie było żadnej próby, krótko wyjaśnij powód.");
  if (minor) pozew.push("Jeśli macie porozumienie rodzicielskie, dołącz je do pozwu. Sąd oceni, czy służy dobru dziecka.");
  pozew.push("Odmowa mediacji bez uzasadnionego powodu może mieć znaczenie przy rozliczeniu kosztów sprawy.");
  if (a.decision === "partner") pozew.push("Jeśli pozew złoży druga strona, swoje stanowisko o ustaleniach i mediacji przedstawisz w odpowiedzi na pozew. Omów ją z prawnikiem.");
  if (a.decision === "considering") pozew.push("Decyzja o pozwie jeszcze nie zapadła. Rozmowy i mediacja mogą pomóc uporządkować sprawy niezależnie od niej.");
  pozew.push("Gdy porozumienie nie jest możliwe, złożenie pozwu nie jest błędem. Mediacja jest możliwa także w trakcie sprawy.");

  const mediatorQuestions = [
    "Jak wygląda pierwsze spotkanie i czy możemy zacząć od rozmów indywidualnych?",
    "Ile zwykle trwa mediacja w podobnych sprawach i ile kosztuje?",
    "Jakie tematy możemy uregulować w porozumieniu, a które rozstrzyga sąd?",
    "Jak wygląda zatwierdzenie ugody przez sąd?",
    "Co się dzieje z informacjami z mediacji (poufność)?",
  ];
  if (!bothOpen) mediatorQuestions.unshift("Czy wyślecie drugiej stronie zaproszenie do mediacji i co dostanę na piśmie, jeśli odmówi?");
  if (minor) mediatorQuestions.push("Jak uwzględnić potrzeby i zdanie dziecka, nie obciążając go decyzją?");
  if (contested.length) mediatorQuestions.push("Jak pracować z tematami, w których mamy bardzo różne stanowiska?");

  /* Kolejność: plan → rozmowy → mediacja → spisanie → pozew */
  const sequence: { title: string; text: string }[] = [
    { title: "Uporządkuj informacje", text: "Zbierz dokumenty i spisz najważniejsze fakty: dzieci, mieszkanie, finanse." },
    { title: "Określ priorytety", text: "Co jest dla Ciebie kluczowe, a w czym możesz ustąpić?" },
  ];
  if (talksPossible) {
    sequence.push({ title: "Rozmowy między Wami", text: bothOpen ? "Zacznijcie od tematów najmniej spornych. To buduje zaufanie." : "Spróbuj jednej krótkiej rozmowy na prostym temacie. Jeśli się nie uda, nie forsuj." });
    sequence.push({ title: "Mediacja, jeśli potrzebna", text: contested.length ? "Tematy sporne omówcie z mediatorem." : "Jeśli rozmowy utkną, poproście o pomoc mediatora." });
  } else if (o === "me") {
    sequence.push({ title: "Propozycja i zaproszenie do mediacji", text: "Przygotuj i skonsultuj propozycję ustaleń. Zaproponuj mediację przez zaproszenie, wysłane przez Ciebie albo przez mediatora." });
  } else {
    sequence.push({ title: "Konsultacja", text: "Skonsultuj swoją sytuację. Do rozmów albo mediacji można wrócić później." });
  }
  sequence.push({ title: "Spisanie ustaleń", text: minor ? "To, co uzgodnicie, spiszcie, np. porozumienie rodzicielskie, i skonsultujcie." : "To, co uzgodnicie, spiszcie i skonsultujcie." });
  sequence.push({
    title: a.decision === "partner" ? "Pozew lub odpowiedź na pozew" : "Pozew",
    text: a.decision === "considering"
      ? "Gdy decyzja zapadnie, pozew może uwzględnić to, co ustaliliście. Wpiszesz w nim, czy była próba mediacji."
      : "Pozew może zawierać zgodne wnioski. Wpiszesz w nim, czy była próba mediacji lub innego polubownego rozwiązania.",
  });

  const offers: { key: OfferKey; why: string; cta?: string }[] = [
    { key: "plan-rozwodu", cta: "Sprawdź koszt i odbierz bezpłatny Plan Rozwodu", why: "Plan Rozwodu porządkuje wszystkie tematy do ustalenia przed pozwem. Dowiesz się też, ile kosztuje pomoc Nowego Etapu." },
  ];
  if (bothOpen && a.decision === "taken") offers.push({ key: "duo", why: "Skoro oboje chcecie rozmawiać, możecie przygotować ustalenia wspólnie i spokojnie." });
  else if (bothOpen) offers.push({ key: "mediacja", why: "Dowiedz się, jak wygląda mediacja i kiedy ma sens." });
  else offers.push({ key: "konsultacja", why: "Porozmawiaj indywidualnie o propozycji ustaleń i o tym, jak zaprosić drugą stronę do mediacji." });

  const notes = [
    "Mediacja jest dobrowolna. Jeśli sąd skieruje Was do mediacji, każde z Was może się sprzeciwić w ciągu tygodnia.",
    "Nie każda sprawa nadaje się do mediacji. Próba porozumienia nie gwarantuje konkretnego rozstrzygnięcia.",
    "Dlaczego ta kolejność: to, co uzgodnicie przed pozwem, sąd może uwzględnić w wyroku. Zostaje mniej do udowadniania, a sprawa jest zwykle krótsza i tańsza.",
  ];
  if (adultChildNote) notes.push(adultChildNote);
  if (a.safety === "skip") notes.push("Jeśli w którymkolwiek momencie poczujesz się niebezpiecznie, nie musisz rozmawiać ani iść na mediację. Możesz skorzystać z indywidualnej pomocy.");

  return { mode: "standard", agreeable, analysis, talks, mediation, pozew, documents, mediatorQuestions, sequence, readiness, offers, notes };
}
