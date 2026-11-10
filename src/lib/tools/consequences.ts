/**
 * Narzędzie 4 — Mapa prawnych konsekwencji rozstania.
 * Deterministyczne składanie kart tematów na podstawie odpowiedzi.
 * Treści informacyjne — nie są poradą prawną. Wymagają akceptacji prawnika.
 */

export type ConsequencesAnswers = {
  relation?: "marriage" | "informal";
  children?: "minor" | "adultLearning" | "adult" | "none";
  property?: "yes" | "no" | "unsure";
  loan?: "joint" | "single" | "none";
  business?: "joint" | "one" | "none";
  debts?: "yes" | "no" | "unsure";
  steps?: "none" | "talks" | "mediation" | "filed" | "judgment";
  priorities?: string[];
};

export type TopicId =
  | "dzieci"
  | "finanse"
  | "majatek"
  | "mieszkanie"
  | "kredyt"
  | "dzialalnosc"
  | "obowiazki"
  | "procedury"
  | "dokumenty"
  | "analiza";

export type Relevance = "priorytet" | "dotyczy" | "warto-sprawdzic";

export type TopicCard = {
  id: TopicId;
  title: string;
  relevance: Relevance;
  dependsOnDetails: boolean;
  know: string[];
  check: string[];
  ask: string[];
};

export const PRIORITY_OPTIONS = [
  { value: "dzieci", label: "Dzieci i opieka" },
  { value: "finanse", label: "Pieniądze i alimenty" },
  { value: "mieszkanie", label: "Mieszkanie" },
  { value: "majatek", label: "Podział majątku" },
  { value: "kredyt", label: "Kredyt i długi" },
  { value: "procedury", label: "Jak wygląda procedura" },
] as const;

export const TOPIC_TITLES: Record<TopicId, string> = {
  dzieci: "Dzieci",
  finanse: "Finanse i alimenty",
  majatek: "Majątek",
  mieszkanie: "Mieszkanie",
  kredyt: "Kredyt i zobowiązania",
  dzialalnosc: "Działalność gospodarcza",
  obowiazki: "Obowiązki małżeńskie i rodzicielskie",
  procedury: "Możliwe procedury",
  dokumenty: "Dokumenty",
  analiza: "Pytania wymagające indywidualnej analizy",
};

const isMarriage = (a: ConsequencesAnswers) => a.relation === "marriage";
const hasMinor = (a: ConsequencesAnswers) => a.children === "minor";
const hasChildrenTopic = (a: ConsequencesAnswers) => a.children === "minor" || a.children === "adultLearning";

function relevanceFor(id: TopicId, a: ConsequencesAnswers, base: Relevance): Relevance {
  const p = a.priorities || [];
  if (p.includes(id)) return "priorytet";
  if (id === "kredyt" && p.includes("kredyt")) return "priorytet";
  return base;
}

export function buildCards(a: ConsequencesAnswers): TopicCard[] {
  const m = isMarriage(a);
  const cards: TopicCard[] = [];

  /* ---------- Dzieci ---------- */
  if (hasChildrenTopic(a)) {
    const know: string[] = [];
    const check: string[] = [];
    const ask: string[] = [];
    if (hasMinor(a)) {
      know.push(
        "Prawa i obowiązki rodziców wobec dziecka nie zależą od tego, czy rodzice są małżeństwem.",
        "Władza rodzicielska przysługuje co do zasady obojgu rodzicom. O istotnych sprawach dziecka (np. wybór szkoły, leczenie) rodzice decydują wspólnie.",
        "Rodzice i dziecko mają prawo i obowiązek utrzymywania ze sobą kontaktów — niezależnie od tego, z kim dziecko mieszka.",
      );
      if (m) know.push("W wyroku rozwodowym sąd rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach na dziecko. Uwzględnia pisemne porozumienie rodziców, jeśli jest zgodne z dobrem dziecka.");
      else know.push("Gdy rodzice nie są małżeństwem i nie porozumieją się, o miejscu zamieszkania, kontaktach i alimentach rozstrzyga sąd rejonowy (wydział rodzinny i nieletnich).");
      if (!m) know.push("Jeśli ojcostwo nie zostało formalnie ustalone (np. uznanie ojcostwa w urzędzie stanu cywilnego), warto to wyjaśnić — od tego zależą prawa i obowiązki ojca.");
      check.push("Gdzie dziecko będzie mieszkać na co dzień i jak będą wyglądać kontakty z drugim rodzicem.", "Jak podzielicie koszty utrzymania dziecka.", "Jak dziecko zostanie poinformowane o zmianach — w sposób dopasowany do wieku.");
      ask.push("Jak przygotować porozumienie o sposobie wykonywania władzy rodzicielskiej i kontaktach, które sąd może uwzględnić?", "Jak w mojej sytuacji może wyglądać ustalanie miejsca zamieszkania dziecka?");
    }
    if (a.children === "adultLearning") {
      know.push("Obowiązek alimentacyjny rodziców może trwać także po osiągnięciu przez dziecko pełnoletności, jeśli dziecko nie jest jeszcze w stanie utrzymać się samodzielnie (np. kontynuuje naukę). Zależy to od okoliczności.");
      check.push("Jakie są realne koszty nauki i utrzymania pełnoletniego dziecka i kto je obecnie pokrywa.");
      ask.push("Czy i w jakim zakresie obowiązek alimentacyjny wobec pełnoletniego dziecka dotyczy mojej sytuacji?");
    }
    cards.push({ id: "dzieci", title: TOPIC_TITLES.dzieci, relevance: relevanceFor("dzieci", a, "dotyczy"), dependsOnDetails: true, know, check, ask });
  }

  /* ---------- Finanse i alimenty ---------- */
  {
    const know: string[] = [];
    const check: string[] = ["Twój miesięczny budżet po rozdzieleniu gospodarstw domowych.", "Wspólne konta, karty i stałe zlecenia — kto z nich korzysta i kto je spłaca."];
    const ask: string[] = [];
    if (hasChildrenTopic(a)) {
      know.push("Wysokość alimentów na dziecko zależy od jego usprawiedliwionych potrzeb oraz zarobkowych i majątkowych możliwości rodziców. Osobiste starania o wychowanie dziecka też są formą wykonywania tego obowiązku. Nie ma ustawowego „taryfikatora”.");
      check.push("Zestawienie kosztów utrzymania dziecka (możesz je przygotować w naszym kalkulatorze).");
      ask.push("Jakie okoliczności sąd bierze pod uwagę przy ustalaniu alimentów na dziecko w sytuacji podobnej do mojej?");
    }
    if (m) {
      know.push("W trakcie małżeństwa oboje małżonkowie mają obowiązek przyczyniać się do zaspokajania potrzeb rodziny — także po faktycznym rozstaniu, dopóki trwa małżeństwo.");
      know.push("Po rozwodzie, w określonych sytuacjach, jeden z byłych małżonków może żądać alimentów od drugiego. Zależy to m.in. od orzeczenia o winie i sytuacji materialnej — wymaga indywidualnej analizy.");
      ask.push("Czy w mojej sytuacji mogą wchodzić w grę alimenty między małżonkami — w trakcie małżeństwa i po rozwodzie?");
    } else {
      know.push("Między partnerami w związku nieformalnym nie ma ustawowego obowiązku alimentacyjnego. Obowiązki alimentacyjne dotyczą natomiast dzieci.");
    }
    cards.push({ id: "finanse", title: TOPIC_TITLES.finanse, relevance: relevanceFor("finanse", a, "dotyczy"), dependsOnDetails: true, know, check, ask });
  }

  /* ---------- Majątek ---------- */
  {
    const know: string[] = [];
    const check: string[] = ["Listę składników majątku i długów z datą nabycia i źródłem pieniędzy (np. sprzed ślubu, darowizna, spadek).", "Czy zawieraliście umowy majątkowe (intercyza)."];
    const ask: string[] = [];
    if (m) {
      know.push(
        "Jeśli nie zawieraliście umowy majątkowej, obowiązuje zwykle wspólność ustawowa — majątek nabyty w trakcie małżeństwa jest co do zasady wspólny.",
        "Do majątku osobistego należą m.in. rzeczy nabyte przed ślubem oraz otrzymane w darowiźnie lub spadku (chyba że darczyńca postanowił inaczej).",
        "Wspólność majątkowa ustaje z chwilą uprawomocnienia się wyroku rozwodowego lub orzeczenia separacji. Podziału można dokonać umową (przy nieruchomości — u notariusza), w wyroku rozwodowym (jeśli nie spowoduje to nadmiernej zwłoki) albo w osobnym postępowaniu sądowym.",
        "Udziały w majątku wspólnym są co do zasady równe; ustalenie nierównych udziałów jest możliwe tylko z ważnych powodów.",
      );
      ask.push("Które składniki są w mojej sytuacji majątkiem wspólnym, a które osobistym?", "Czy warto dokonać podziału majątku przed rozwodem, w wyroku czy później?", "Czy powinienem/powinnam rozliczyć nakłady z majątku osobistego na wspólny (lub odwrotnie)?");
    } else {
      know.push(
        "W związku nieformalnym nie ma wspólności majątkowej małżeńskiej. Każdy jest właścicielem tego, co nabył.",
        "Rzeczy kupione wspólnie są zwykle współwłasnością w częściach ułamkowych — jej zniesienie odbywa się według przepisów Kodeksu cywilnego (umową lub w sądzie).",
      );
      ask.push("Jak rozliczyć rzeczy kupione wspólnie lub finansowane przez jedną osobę na rzecz drugiej?");
    }
    cards.push({ id: "majatek", title: TOPIC_TITLES.majatek, relevance: relevanceFor("majatek", a, a.property === "yes" || m ? "dotyczy" : "warto-sprawdzic"), dependsOnDetails: true, know, check, ask });
  }

  /* ---------- Mieszkanie ---------- */
  if (a.property === "yes" || a.property === "unsure" || (a.priorities || []).includes("mieszkanie")) {
    const know: string[] = [
      "Możliwe rozwiązania to najczęściej: sprzedaż i podział środków, pozostanie jednej osoby z rozliczeniem drugiej, albo czasowa współwłasność na spisanych zasadach.",
    ];
    if (m) know.push("Sąd w wyroku rozwodowym orzeka o sposobie korzystania ze wspólnie zajmowanego mieszkania, dopóki małżonkowie w nim mieszkają. To nie jest jeszcze podział własności.");
    else know.push("Gdy oboje jesteście właścicielami, decyzje o nieruchomości wymagają co do zasady porozumienia współwłaścicieli albo rozstrzygnięcia sądu.");
    cards.push({
      id: "mieszkanie",
      title: TOPIC_TITLES.mieszkanie,
      relevance: relevanceFor("mieszkanie", a, a.property === "yes" ? "dotyczy" : "warto-sprawdzic"),
      dependsOnDetails: true,
      know,
      check: ["Kto jest właścicielem według księgi wieczystej i w jakich udziałach.", "Orientacyjną wartość nieruchomości.", "Kto będzie mieszkać w mieszkaniu w okresie przejściowym i kto ponosi koszty."],
      ask: ["Jakie rozwiązania dotyczące mieszkania są realne w mojej sytuacji i jakie mają konsekwencje?"],
    });
  }

  /* ---------- Kredyt i zobowiązania ---------- */
  if (a.loan === "joint" || a.loan === "single" || a.debts === "yes" || a.debts === "unsure") {
    const know: string[] = [];
    if (a.loan === "joint") know.push("Rozwód ani rozstanie nie zmieniają umowy kredytowej. Współkredytobiorcy odpowiadają wobec banku solidarnie — każdy za całość — dopóki bank nie zgodzi się na zmianę.");
    if (a.loan === "single") know.push("Kredyt zaciągnięty przez jedną osobę obciąża formalnie tę osobę. Jeśli spłacano go ze wspólnych pieniędzy, może pojawić się kwestia rozliczeń.");
    if (a.debts === "yes" || a.debts === "unsure") know.push(m ? "Odpowiedzialność za długi zaciągnięte w trakcie małżeństwa zależy m.in. od tego, kto je zaciągnął i czy drugi małżonek wyraził zgodę. To wymaga sprawdzenia dla każdej pozycji." : "Za długi odpowiada co do zasady osoba, która je zaciągnęła — chyba że oboje podpisaliście umowę (wtedy zwykle odpowiadacie wspólnie).");
    cards.push({
      id: "kredyt",
      title: TOPIC_TITLES.kredyt,
      relevance: relevanceFor("kredyt", a, "dotyczy"),
      dependsOnDetails: a.debts !== "no",
      know,
      check: ["Listę kredytów, pożyczek, kart i limitów — kto jest stroną umowy.", "Raport kredytowy (np. BIK), aby mieć pełny obraz zobowiązań.", ...(a.loan === "joint" ? ["Warunki banku dotyczące zwolnienia jednego kredytobiorcy lub refinansowania."] : [])],
      ask: ["Kto w mojej sytuacji odpowiada za poszczególne długi i jak je rozliczyć?", ...(a.loan === "joint" ? ["Co się stanie, jeśli jedna osoba przestanie spłacać raty?"] : [])],
    });
  }

  /* ---------- Działalność gospodarcza ---------- */
  if (a.business === "joint" || a.business === "one") {
    cards.push({
      id: "dzialalnosc",
      title: TOPIC_TITLES.dzialalnosc,
      relevance: "dotyczy",
      dependsOnDetails: true,
      know: [
        a.business === "joint" ? "Wspólna firma (np. spółka) wymaga odrębnych ustaleń — dotyczą jej zarówno przepisy rodzinne, jak i prawo spółek oraz umowa spółki." : "Firma jednego z partnerów może mieć znaczenie dla rozliczeń majątkowych i ustalania możliwości zarobkowych.",
        ...(m ? ["Składniki przedsiębiorstwa nabyte w trakcie wspólności mogą wchodzić do majątku wspólnego — zależy to od formy działalności i sposobu nabycia."] : []),
      ],
      check: ["Formę prawną działalności i kto jest jej właścicielem/wspólnikiem.", "Umowę spółki i zapisy dotyczące wyjścia wspólnika.", "Czy firma ma zobowiązania, za które odpowiada majątek prywatny."],
      ask: ["Jak rozstanie wpływa na firmę i jak zabezpieczyć jej bieżące działanie w okresie przejściowym?"],
    });
  }

  /* ---------- Obowiązki ---------- */
  {
    const know: string[] = [];
    if (m) {
      know.push(
        "Dopóki trwa małżeństwo (także w trakcie sprawy rozwodowej), obowiązują obowiązki małżeńskie, m.in. przyczynianie się do zaspokajania potrzeb rodziny.",
        "Po rozwodzie były małżonek może w ciągu roku od uprawomocnienia się wyroku wrócić do poprzedniego nazwiska (oświadczenie przed kierownikiem USC lub konsulem).",
        "Rozwód wpływa też na dziedziczenie — byli małżonkowie nie dziedziczą po sobie ustawowo. Dotyczy to także małżonków w separacji.",
      );
    } else {
      know.push("Partnerzy nieformalni nie mają wobec siebie ustawowych obowiązków małżeńskich ani nie dziedziczą po sobie ustawowo.");
    }
    if (hasMinor(a)) know.push("Obowiązki rodzicielskie — troska o dziecko, jego utrzymanie i wychowanie — trwają niezależnie od rozstania rodziców.");
    cards.push({
      id: "obowiazki",
      title: TOPIC_TITLES.obowiazki,
      relevance: "warto-sprawdzic",
      dependsOnDetails: false,
      know,
      check: ["Testament, beneficjentów ubezpieczeń na życie i pełnomocnictwa (np. do konta) — czy nadal odpowiadają Twojej woli.", ...(m ? ["Czy i kiedy chcesz wrócić do poprzedniego nazwiska."] : [])],
      ask: ["Jakie obowiązki wobec drugiej strony obowiązują mnie do czasu formalnego zakończenia sprawy?"],
    });
  }

  /* ---------- Procedury ---------- */
  {
    const know: string[] = [];
    const check: string[] = [];
    const ask: string[] = [];
    if (m) {
      know.push(
        "Rozwód orzeka sąd okręgowy. Przesłanką jest zupełny i trwały rozkład pożycia. Na zgodne żądanie małżonków sąd zaniecha orzekania o winie.",
        "Alternatywą jest separacja — małżeństwo formalnie trwa, ale skutki są w dużej mierze podobne do rozwodu.",
        "Mediacja jest dobrowolna i może odbyć się przed złożeniem pozwu lub w trakcie sprawy. Jeśli sąd skieruje Was do mediacji, każde z Was może się temu sprzeciwić w terminie tygodnia.",
        "Opłata od pozwu o rozwód wynosi co do zasady 600 zł. Połowę opłaty sąd zwraca, gdy rozwód zostanie orzeczony bez orzekania o winie na zgodne żądanie małżonków.",
        "Rozwód orzeka obecnie wyłącznie sąd — projekt rozwodu w urzędzie stanu cywilnego nie wszedł w życie.",
      );
      if (a.steps === "filed") know.push("Skoro pozew został już złożony, nadal można prowadzić rozmowy lub mediację i przedstawić sądowi porozumienie, np. w sprawach dzieci.");
      if (a.steps === "judgment") know.push("Po wyroku mogą pozostać sprawy do załatwienia: podział majątku, zmiana nazwiska, sprawy w banku i urzędach.");
      check.push("Który sąd byłby właściwy (zwykle według ostatniego wspólnego miejsca zamieszkania, jeśli jedno z Was nadal tam mieszka).");
      ask.push("Rozwód czy separacja — jakie są różnice w mojej sytuacji?", "Czy i jak warto przygotować ustalenia przed złożeniem pozwu?");
    } else {
      know.push(
        "Rozstanie w związku nieformalnym nie wymaga postępowania sądowego. Sąd jest potrzebny dopiero wtedy, gdy nie uda się porozumieć np. w sprawie dzieci lub majątku.",
        "Sprawy dotyczące dzieci (kontakty, miejsce zamieszkania, alimenty) rozpoznaje sąd rejonowy. Możliwa jest też mediacja.",
      );
      ask.push("Czy w mojej sytuacji potrzebne jest postępowanie sądowe, czy wystarczy porozumienie?");
    }
    cards.push({ id: "procedury", title: TOPIC_TITLES.procedury, relevance: relevanceFor("procedury", a, "dotyczy"), dependsOnDetails: false, know, check, ask });
  }

  /* ---------- Dokumenty ---------- */
  {
    const items: string[] = [];
    if (m) items.push("Odpis skrócony aktu małżeństwa (można zamówić online przez gov.pl).");
    if (hasMinor(a)) items.push("Odpisy skrócone aktów urodzenia dzieci.");
    if (a.property !== "no") items.push("Akt notarialny i numer księgi wieczystej nieruchomości.");
    if (a.loan === "joint" || a.loan === "single") items.push("Umowa kredytowa i aktualne zaświadczenie o saldzie.");
    if (a.business && a.business !== "none") items.push("Dokumenty firmy: wpis do rejestru, umowa spółki, ostatnie sprawozdania.");
    items.push("Zestawienie dochodów i stałych wydatków (np. wyciągi z ostatnich miesięcy).");
    if (hasChildrenTopic(a)) items.push("Dowody kosztów utrzymania dziecka (przedszkole/szkoła, zajęcia, leczenie).");
    cards.push({
      id: "dokumenty",
      title: TOPIC_TITLES.dokumenty,
      relevance: "warto-sprawdzic",
      dependsOnDetails: false,
      know: ["Uporządkowane dokumenty skracają rozmowy ze specjalistami i ułatwiają negocjacje."],
      check: items,
      ask: ["Których dokumentów będę potrzebować na początku, a które mogą poczekać?"],
    });
  }

  /* ---------- Indywidualna analiza ---------- */
  {
    const ask: string[] = [];
    if (m) ask.push("Czy w mojej sytuacji warto żądać orzekania o winie i jakie to ma konsekwencje?");
    if (a.property === "unsure" || a.debts === "unsure") ask.push("Jak ustalić, co jest naszym majątkiem i jakie mamy zobowiązania, jeśli nie mam pełnej wiedzy?");
    if (hasMinor(a)) ask.push("Jak zadbać o dobro dziecka i stabilność jego codzienności w trakcie zmian?");
    if (a.business && a.business !== "none") ask.push("Jak wycenić i rozliczyć działalność gospodarczą?");
    ask.push("Jakie ryzyka wiążą się z jednostronnymi działaniami (np. wyprowadzką, przelewami ze wspólnego konta) przed formalnymi ustaleniami?");
    cards.push({
      id: "analiza",
      title: TOPIC_TITLES.analiza,
      relevance: "warto-sprawdzic",
      dependsOnDetails: true,
      know: ["Te kwestie zależą od szczegółów, których narzędzie nie zna. Warto omówić je z prawnikiem lub mediatorem."],
      check: [],
      ask,
    });
  }

  const order: Record<Relevance, number> = { priorytet: 0, dotyczy: 1, "warto-sprawdzic": 2 };
  return cards.sort((x, y) => order[x.relevance] - order[y.relevance]);
}

export function summaryLine(a: ConsequencesAnswers): string {
  if (a.relation === "informal")
    return "Jesteście w związku nieformalnym — nie dotyczy Was rozwód ani separacja, a sprawy majątkowe regulują przepisy Kodeksu cywilnego. Prawa i obowiązki wobec dzieci są takie same jak w małżeństwie.";
  return "Jesteście małżeństwem — formalne zakończenie związku wymaga orzeczenia sądu (rozwód lub separacja), a sprawy majątkowe regulują przepisy Kodeksu rodzinnego i opiekuńczego.";
}
