/**
 * Narzędzie 5 — Czy warto ustalić warunki przed pozwem?
 * Deterministyczna mapa ustaleń. Bezpieczeństwo ma pierwszeństwo:
 * przy sygnale przemocy/zagrożenia nie kierujemy do wspólnej mediacji ani negocjacji.
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
  { value: "alimenty", label: "Koszty utrzymania dzieci / alimenty", needsChildren: true },
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

export type PreFilingResult = {
  mode: "safety" | "standard";
  agreeable: string[]; // kwestie, które można spróbować uzgodnić
  analysis: { topic: string; reason: string }[]; // kwestie wymagające indywidualnej analizy
  mediationSteps: string[];
  documents: string[];
  mediatorQuestions: string[];
  sequence: { title: string; text: string }[];
  readiness: { agreed: number; open: number; contested: number; total: number };
  offers: { key: OfferKey; why: string; cta?: string }[];
  notes: string[];
};

const ANALYSIS_REASON: Record<string, string> = {
  wina: "Decyzja o żądaniu orzekania o winie ma skutki m.in. dla alimentów między małżonkami i przebiegu sprawy — wymaga indywidualnej oceny.",
  alimenty: "Wysokość alimentów zależy od potrzeb dziecka i możliwości rodziców — warto przygotować zestawienie kosztów i skonsultować założenia.",
  majatek: "Podział majątku wymaga ustalenia, co jest majątkiem wspólnym, a co osobistym, oraz ewentualnych nakładów.",
  mieszkanie: "Rozwiązania dotyczące mieszkania zależą od własności, kredytu i możliwości finansowych — często także od zgody banku.",
  kredyt: "Zmiany w kredycie wymagają zgody banku — samo porozumienie stron nie zwalnia nikogo z długu.",
  opieka: "Ustalenia dotyczące dziecka muszą być zgodne z jego dobrem; sąd ocenia porozumienie rodziców.",
  kontakty: "Harmonogram kontaktów warto dopasować do wieku i potrzeb dziecka.",
  przejsciowe: "Zasady przejściowe warto spisać, aby uniknąć nieporozumień do czasu wyroku.",
};

export function buildPreFiling(a: PreFilingAnswers): PreFilingResult {
  const topics = (a.topics || []).filter((t) => availableTopics(a).some((x) => x.value === t));
  const agreed = (a.agreed || []).filter((t) => topics.includes(t));
  const contested = (a.contested || []).filter((t) => topics.includes(t) && !agreed.includes(t));
  const open = topics.filter((t) => !agreed.includes(t) && !contested.includes(t));
  const readiness = { agreed: agreed.length, open: open.length, contested: contested.length, total: topics.length };

  const documents = ["Odpis skrócony aktu małżeństwa."];
  if (a.children === "minor") documents.push("Odpisy skrócone aktów urodzenia dzieci.", "Zestawienie kosztów utrzymania dzieci (szkoła, zajęcia, zdrowie).");
  if (topics.includes("mieszkanie")) documents.push("Akt notarialny i numer księgi wieczystej mieszkania.");
  if (topics.includes("kredyt")) documents.push("Umowa kredytowa i zaświadczenie o saldzie zadłużenia.");
  if (a.finances !== "no" || topics.includes("majatek")) documents.push("Lista majątku i długów (konta, oszczędności, pojazdy, inwestycje).", "Informacje o dochodach (np. zaświadczenia, PIT za ostatni rok).");

  /* ---------- Tryb bezpieczeństwa ---------- */
  if (isSafetyConcern(a)) {
    return {
      mode: "safety",
      agreeable: [],
      analysis: topics.map((t) => ({ topic: topicLabel(t), reason: "W Twojej sytuacji warto omówić ten temat najpierw indywidualnie ze specjalistą, który może reprezentować Twoje interesy." })),
      mediationSteps: [],
      documents: [...documents, "Jeśli to bezpieczne: notatki z datami zdarzeń, wiadomości, zaświadczenia lekarskie lub inne dokumenty — przechowywane w miejscu, do którego druga osoba nie ma dostępu."],
      mediatorQuestions: [],
      sequence: [
        { title: "Bezpieczeństwo", text: "Zadbaj o swoje bezpieczeństwo i bezpieczeństwo dzieci. W nagłej sytuacji dzwoń pod 112." },
        { title: "Wsparcie", text: "Skorzystaj z poufnego wsparcia, np. Niebieskiej Linii (800 120 002) lub lokalnego ośrodka interwencji kryzysowej." },
        { title: "Indywidualna porada", text: "Porozmawiaj z prawnikiem, który może reprezentować wyłącznie Ciebie, o dostępnych krokach i ochronie." },
        { title: "Dokumenty", text: "Bezpiecznie zgromadź najważniejsze dokumenty." },
      ],
      readiness,
      offers: [{ key: "konsultacja", cta: "Poproś o indywidualną rozmowę", why: "Rozmowa wyłącznie z Tobą — bez udziału drugiej strony. Pomożemy uporządkować dalsze kroki." }],
      notes: [
        "Mediacja i wspólne negocjacje nie są dobrym rozwiązaniem, gdy jedna osoba obawia się drugiej albo nie może swobodnie przedstawiać swojego zdania.",
      ],
    };
  }

  /* ---------- Tryb standardowy ---------- */
  const bothOpen = a.openness === "both";
  const agreeable: string[] = [];
  const analysis: { topic: string; reason: string }[] = [];
  for (const t of topics) {
    if (contested.includes(t) || t === "wina") analysis.push({ topic: topicLabel(t), reason: ANALYSIS_REASON[t] || "Temat sporny — warto przygotować się indywidualnie przed rozmową." });
    else agreeable.push(topicLabel(t) + (agreed.includes(t) ? " — wstępnie uzgodnione, warto spisać" : ""));
  }
  // tematy wymagające analizy niezależnie od sporu
  for (const t of ["kredyt", "majatek"]) {
    if (topics.includes(t) && !contested.includes(t)) analysis.push({ topic: topicLabel(t), reason: ANALYSIS_REASON[t] });
  }

  const mediationSteps: string[] = bothOpen || a.openness === "unsure"
    ? [
        "Oboje decydujecie, czy chcecie spróbować mediacji — jest dobrowolna i każde z Was może z niej zrezygnować. Jeśli do mediacji skieruje Was sąd, możecie się temu sprzeciwić w terminie tygodnia.",
        "Wybór mediatora (np. z listy stałych mediatorów prowadzonej przy sądzie okręgowym) i spotkania informacyjne — często najpierw osobno.",
        "Wspólne sesje: mediator jest bezstronny, nie rozstrzyga sporu ani nie doradza żadnej ze stron, pomaga rozmawiać o potrzebach.",
        "Spisanie ugody lub porozumienia. Ugoda zawarta przed mediatorem może zostać zatwierdzona przez sąd.",
        "Przed podpisaniem warto, by każde z Was skonsultowało treść porozumienia z własnym doradcą.",
        "Koszty: w mediacji prywatnej wynagrodzenie ustala mediator. W mediacji prowadzonej na skierowanie sądu wynagrodzenie mediatora określa rozporządzenie Ministra Sprawiedliwości (stawki do sprawdzenia w aktualnych przepisach).",
      ]
    : [
        "Mediacja wymaga zgody obu stron. Jeśli druga strona nie jest gotowa, możesz zaproponować spotkanie informacyjne z mediatorem bez zobowiązań.",
        "Możesz przygotować własną propozycję ustaleń i skonsultować ją ze specjalistą, zanim ją przedstawisz.",
        "Mediacja jest możliwa także po złożeniu pozwu. Jeśli sąd skieruje Was do mediacji, każde z Was może się temu sprzeciwić w terminie tygodnia.",
      ];

  const mediatorQuestions = [
    "Jak wygląda pierwsze spotkanie i czy możemy zacząć od rozmów indywidualnych?",
    "Ile zwykle trwa mediacja w sprawach podobnych do naszej i jakie są koszty?",
    "Jakie tematy możemy uregulować w porozumieniu, a które rozstrzyga sąd?",
    "Jak wygląda zatwierdzenie ugody przez sąd?",
    "Co się dzieje z informacjami, które padną w trakcie mediacji (poufność)?",
  ];
  if (a.children === "minor") mediatorQuestions.push("Jak w mediacji uwzględnić potrzeby i zdanie dziecka, nie obciążając go decyzją?");
  if (contested.length) mediatorQuestions.push("Jak pracować z tematami, w których mamy bardzo różne stanowiska?");

  const sequence: { title: string; text: string }[] = [
    { title: "Uporządkuj informacje", text: "Zbierz dokumenty i spisz najważniejsze fakty: dzieci, mieszkanie, finanse." },
    { title: "Określ swoje priorytety", text: "Co jest dla Ciebie kluczowe, a w czym możesz być elastyczny/elastyczna?" },
  ];
  if (bothOpen) {
    sequence.push({ title: "Wspólna rozmowa lub mediacja", text: "Zacznijcie od tematów najmniej spornych — to buduje zaufanie do procesu." });
  } else {
    sequence.push({ title: "Konsultacja i propozycja", text: "Skonsultuj swoją sytuację i przygotuj propozycję ustaleń, którą można przedstawić drugiej stronie." });
  }
  sequence.push({ title: "Spisanie ustaleń", text: "Ustalenia (np. porozumienie rodzicielskie, zasady dotyczące mieszkania) warto spisać i skonsultować." });
  sequence.push({ title: "Pozew", text: a.decision === "taken" ? "Pozew przygotowany po ustaleniach może zawierać zgodne wnioski stron. Jeśli porozumienie nie jest możliwe, złożenie pozwu również jest właściwym krokiem." : "Gdy decyzja zapadnie, pozew może uwzględniać to, co udało się ustalić. Złożenie pozwu bez wcześniejszych ustaleń także bywa uzasadnione." });

  const offers: { key: OfferKey; why: string; cta?: string }[] = [
    { key: "plan-rozwodu", cta: "Sprawdź koszt i odbierz bezpłatny Plan Rozwodu", why: "Plan Rozwodu porządkuje wszystkie tematy do ustalenia przed pozwem. Dowiesz się też, ile kosztuje pomoc Nowego Etapu." },
  ];
  if (bothOpen && a.decision === "taken") offers.push({ key: "duo", why: "Skoro oboje jesteście otwarci na rozmowę, możecie przygotować ustalenia wspólnie i spokojnie." });
  else if (bothOpen) offers.push({ key: "mediacja", why: "Dowiedz się, jak może wyglądać mediacja i kiedy ma sens." });
  else offers.push({ key: "konsultacja", why: "Porozmawiaj indywidualnie o tym, jak przygotować propozycję ustaleń, gdy druga strona nie jest jeszcze gotowa." });

  const notes = [
    "Mediacja jest dobrowolna — jeśli sąd skieruje Was do mediacji, możesz się temu sprzeciwić w terminie tygodnia.",
    "Nie każda sprawa nadaje się do mediacji. Gdy porozumienie nie jest możliwe, przygotowanie pozwu nie jest błędem.",
  ];
  if (a.safety === "skip") notes.push("Jeśli w którymkolwiek momencie poczujesz się niebezpiecznie, wspólne rozmowy nie są wymagane — możesz skorzystać z indywidualnej pomocy.");

  return { mode: "standard", agreeable, analysis, mediationSteps, documents, mediatorQuestions, sequence, readiness, offers, notes };
}
