/**
 * Narzędzie 4: Mapa prawnych konsekwencji rozstania.
 * Deterministyczne składanie kart tematów na podstawie odpowiedzi.
 * Każda karta zależy od rodzaju związku, dzieci, majątku i etapu sprawy (przed pozwem / w toku / po wyroku).
 * Treści informacyjne, nie są poradą prawną. Fakty prawne: LEGAL_VERIFICATION.md.
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

/** Etap sprawy: przed pozwem (w tym rozmowy i mediacja), w toku, po wyroku */
export type CaseStage = "pre" | "filed" | "judgment";

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
  obowiazki: "Obowiązki i sprawy osobiste",
  procedury: "Możliwe procedury",
  dokumenty: "Dokumenty",
  analiza: "Pytania wymagające indywidualnej analizy",
};

const PROCEDURE_TITLES: Record<CaseStage, string> = {
  pre: "Możliwe procedury",
  filed: "W trakcie sprawy",
  judgment: "Sprawy po wyroku",
};

export const stageOf = (a: ConsequencesAnswers): CaseStage =>
  a.steps === "filed" ? "filed" : a.steps === "judgment" ? "judgment" : "pre";

const isMarriage = (a: ConsequencesAnswers) => a.relation === "marriage";
const hasMinor = (a: ConsequencesAnswers) => a.children === "minor";
const hasAdultLearning = (a: ConsequencesAnswers) => a.children === "adultLearning";
const hasChildrenTopic = (a: ConsequencesAnswers) => hasMinor(a) || hasAdultLearning(a);
const hasProperty = (a: ConsequencesAnswers) => a.property === "yes" || a.property === "unsure";

function relevanceFor(id: TopicId, a: ConsequencesAnswers, base: Relevance): Relevance {
  return (a.priorities || []).includes(id) ? "priorytet" : base;
}

export function buildCards(a: ConsequencesAnswers): TopicCard[] {
  const m = isMarriage(a);
  const st = stageOf(a);
  const cards: TopicCard[] = [];

  /* ---------- Dzieci ---------- */
  if (hasChildrenTopic(a)) {
    const know: string[] = [];
    const check: string[] = [];
    const ask: string[] = [];
    if (hasMinor(a)) {
      know.push(
        "Prawa i obowiązki wobec dziecka nie zależą od tego, czy rodzice są małżeństwem.",
        "Władzę rodzicielską mają zwykle oboje rodzice. O ważnych sprawach dziecka (szkoła, leczenie) decydują wspólnie.",
        "Dziecko i każde z rodziców mają prawo do kontaktów, niezależnie od tego, z kim dziecko mieszka.",
      );
      if (st === "pre") {
        know.push(
          m
            ? "W wyroku rozwodowym sąd rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach. Uwzględnia porozumienie rodzicielskie, jeśli jest zgodne z dobrem dziecka."
            : "Jeśli się nie porozumiecie, o miejscu zamieszkania dziecka, kontaktach i alimentach rozstrzyga sąd rejonowy (wydział rodzinny).",
        );
        check.push(
          "Gdzie dziecko będzie mieszkać na co dzień i jak będą wyglądać kontakty z drugim rodzicem.",
          "Jak podzielicie koszty utrzymania dziecka.",
          "Jak powiecie dziecku o zmianach, w sposób dopasowany do jego wieku.",
        );
        ask.push("Jak przygotować porozumienie rodzicielskie, które sąd może uwzględnić?");
      } else if (st === "filed") {
        know.push(
          "W trakcie sprawy nadal możecie uzgodnić porozumienie rodzicielskie, w rozmowach albo w mediacji, i przedstawić je sądowi.",
          "Na czas trwania sprawy można prosić sąd o zabezpieczenie, np. kontaktów albo alimentów.",
        );
        check.push(
          "Jak wygląda opieka nad dzieckiem teraz, w trakcie sprawy, i czy jest stabilna.",
          "Czy dziecko wie o zmianach w sposób dopasowany do wieku.",
        );
        ask.push("Czy w mojej sprawie warto wnioskować o zabezpieczenie na czas trwania sprawy?", "Jak przygotować się do rozprawy w sprawach dziecka?");
      } else {
        know.push(
          m
            ? "Wyrok określa władzę rodzicielską, kontakty i alimenty na dziecko. Teraz liczy się ich wykonywanie w codzienności."
            : "Jeśli sąd wydał orzeczenie w sprawach dziecka, określa ono m.in. kontakty i alimenty. Teraz liczy się jego wykonywanie.",
        );
        check.push(
          "Czy kontakty i alimenty działają tak, jak zostały ustalone.",
          "Czy szkoła, przedszkole i lekarz mają aktualne informacje i dane kontaktowe obojga rodziców.",
        );
        ask.push("Co mogę zrobić, gdy ustalenia nie są wykonywane albo przestały pasować do sytuacji dziecka?");
      }
      if (!m && st === "pre") know.push("Jeśli ojcostwo nie zostało formalnie ustalone (np. przez uznanie ojcostwa w USC), warto to wyjaśnić. Od tego zależą prawa i obowiązki ojca.");
    }
    if (hasAdultLearning(a)) {
      know.push(
        "Obowiązek alimentacyjny rodziców może trwać po 18. urodzinach, jeśli dziecko jeszcze nie może się samo utrzymać (np. bo się uczy). Zależy to od okoliczności.",
        "Pełnoletnie dziecko występuje o alimenty we własnym imieniu. Rodzic nie działa w jego zastępstwie.",
      );
      if (m && st !== "judgment") know.push("Wyrok rozwodowy z urzędu rozstrzyga tylko o dzieciach małoletnich.");
      check.push("Jakie są koszty nauki i utrzymania dziecka i kto je teraz pokrywa.");
      ask.push("Jak w mojej sytuacji może wyglądać obowiązek alimentacyjny wobec pełnoletniego dziecka?");
    }
    cards.push({ id: "dzieci", title: TOPIC_TITLES.dzieci, relevance: relevanceFor("dzieci", a, "dotyczy"), dependsOnDetails: true, know, check, ask });
  }

  /* ---------- Finanse i alimenty ---------- */
  {
    const know: string[] = [];
    const check: string[] =
      st === "judgment"
        ? ["Twój miesięczny budżet po wyroku.", "Wspólne konta, karty i stałe zlecenia: czy zostały zamknięte lub rozdzielone."]
        : ["Twój miesięczny budżet po rozdzieleniu gospodarstw domowych.", "Wspólne konta, karty i stałe zlecenia: kto z nich korzysta i kto je spłaca."];
    const ask: string[] = [];
    if (hasMinor(a)) {
      know.push("Alimenty na dziecko zależą od jego usprawiedliwionych potrzeb i możliwości zarobkowych rodziców. Osobista opieka nad dzieckiem też się liczy. Nie ma ustawowego taryfikatora.");
      if (st === "judgment") check.push("Jak i kiedy przelewane są alimenty. Zachowuj potwierdzenia.");
      else {
        check.push("Zestawienie kosztów utrzymania dziecka (np. w naszym kalkulatorze).");
        ask.push("Co sąd bierze pod uwagę przy alimentach na dziecko w sytuacji podobnej do mojej?");
      }
    }
    if (m) {
      if (st === "judgment") {
        know.push("Alimenty między byłymi małżonkami zależą m.in. od orzeczenia o winie i sytuacji materialnej. To wymaga indywidualnej analizy.");
        ask.push("Czy w mojej sytuacji mogą wchodzić w grę alimenty od byłego małżonka albo na jego rzecz?");
      } else {
        know.push(
          "Dopóki trwa małżeństwo, także po wyprowadzce i w trakcie sprawy, oboje macie obowiązek przyczyniać się do potrzeb rodziny.",
          "Po rozwodzie były małżonek może w pewnych sytuacjach żądać alimentów. Zależy to m.in. od orzeczenia o winie i sytuacji materialnej.",
        );
        ask.push("Czy w mojej sytuacji mogą wchodzić w grę alimenty między małżonkami, teraz i po rozwodzie?");
      }
    } else {
      know.push("Partnerzy, którzy nie są małżeństwem, nie mają wobec siebie ustawowego obowiązku alimentacyjnego.");
    }
    cards.push({ id: "finanse", title: TOPIC_TITLES.finanse, relevance: relevanceFor("finanse", a, "dotyczy"), dependsOnDetails: true, know, check, ask });
  }

  /* ---------- Majątek ---------- */
  {
    const know: string[] = [];
    const check: string[] = [];
    const ask: string[] = [];
    if (m) {
      check.push("Listę majątku i długów z datą nabycia i źródłem pieniędzy (np. sprzed ślubu, darowizna, spadek).", "Czy zawieraliście intercyzę (umowę majątkową).");
      know.push(
        "Bez intercyzy obowiązuje zwykle wspólność ustawowa: to, co nabyliście w trakcie małżeństwa, jest co do zasady wspólne.",
        "Majątek osobisty to m.in. rzeczy sprzed ślubu oraz darowizny i spadki (chyba że darczyńca postanowił inaczej).",
      );
      if (st === "pre") {
        know.push(
          "Wspólność ustaje z uprawomocnieniem wyroku rozwodowego albo orzeczenia separacji. Podzielić majątek można umową (nieruchomość u notariusza), w wyroku rozwodowym albo w osobnej sprawie.",
          "Udziały są co do zasady równe. Nierówne można ustalić tylko z ważnych powodów.",
        );
        ask.push("Czy warto podzielić majątek przed rozwodem, w wyroku czy później?", "Które składniki są w mojej sytuacji wspólne, a które osobiste?");
      } else if (st === "filed") {
        know.push(
          "Sąd może podzielić majątek w wyroku rozwodowym na wniosek jednego z Was, jeśli nie wydłuży to nadmiernie sprawy. Można to też zrobić później, umową albo w osobnej sprawie.",
          "Udziały są co do zasady równe. Nierówne można ustalić tylko z ważnych powodów.",
        );
        ask.push("Czy w mojej sprawie wnioskować o podział majątku w wyroku, czy zostawić go na później?");
      } else {
        know.push(
          "Wspólność ustała z uprawomocnieniem wyroku. Jeśli majątek nie został podzielony, możecie to zrobić umową (nieruchomość u notariusza) albo we wniosku do sądu.",
          "Wniosek o podział majątku kosztuje 1000 zł, a 300 zł, gdy zawiera zgodny projekt podziału.",
        );
        check.push("Czy wyrok obejmował podział majątku, czy ta sprawa jest jeszcze otwarta.");
        ask.push("Jak podzielić majątek, który nie został podzielony w wyroku?");
      }
      if (st !== "judgment") ask.push("Czy powinienem/powinnam rozliczyć nakłady z majątku osobistego na wspólny (lub odwrotnie)?");
    } else {
      check.push("Listę rzeczy kupionych wspólnie albo za pieniądze jednej osoby, z dowodami zakupu.");
      know.push(
        "Każde z Was jest właścicielem tego, co kupiło. Nie macie wspólności majątkowej.",
        "Rzeczy kupione razem są zwykle współwłasnością. Jej zniesienie odbywa się umową albo w sądzie, według Kodeksu cywilnego.",
      );
      ask.push("Jak rozliczyć rzeczy kupione wspólnie lub finansowane przez jedną osobę dla drugiej?");
    }
    cards.push({ id: "majatek", title: TOPIC_TITLES.majatek, relevance: relevanceFor("majatek", a, a.property === "yes" || m ? "dotyczy" : "warto-sprawdzic"), dependsOnDetails: true, know, check, ask });
  }

  /* ---------- Mieszkanie ---------- */
  if (hasProperty(a) || (a.priorities || []).includes("mieszkanie")) {
    const know: string[] = ["Najczęstsze rozwiązania: sprzedaż i podział pieniędzy, pozostanie jednej osoby ze spłatą drugiej, czasowa współwłasność na spisanych zasadach."];
    if (m && st !== "judgment") know.push("W wyroku rozwodowym sąd określa, jak korzystacie ze wspólnego mieszkania, dopóki w nim mieszkacie. To nie jest podział własności.");
    if (m && st === "judgment") know.push("Ustalenie w wyroku o korzystaniu z mieszkania nie przesądza o własności. Własność rozlicza się przy podziale majątku.");
    if (!m) know.push("Gdy oboje jesteście właścicielami, decyzje o nieruchomości wymagają zwykle zgody obojga albo rozstrzygnięcia sądu.");
    cards.push({
      id: "mieszkanie",
      title: TOPIC_TITLES.mieszkanie,
      relevance: relevanceFor("mieszkanie", a, a.property === "yes" ? "dotyczy" : "warto-sprawdzic"),
      dependsOnDetails: true,
      know,
      check: [
        "Kto jest właścicielem według księgi wieczystej i w jakich udziałach.",
        "Orientacyjną wartość nieruchomości.",
        st === "judgment" ? "Kto teraz mieszka w mieszkaniu i kto ponosi koszty." : "Kto mieszka w mieszkaniu w okresie przejściowym i kto ponosi koszty.",
      ],
      ask: ["Jakie rozwiązania dotyczące mieszkania są realne w mojej sytuacji i jakie mają skutki?"],
    });
  }

  /* ---------- Kredyt i zobowiązania ---------- */
  if (a.loan === "joint" || a.loan === "single" || a.debts === "yes" || a.debts === "unsure") {
    const know: string[] = [];
    if (a.loan === "joint")
      know.push(`${m ? "Rozwód" : "Rozstanie"} nie zmienia umowy kredytowej. Współkredytobiorcy odpowiadają wobec banku solidarnie, każdy za całość, dopóki bank nie zgodzi się na zmianę.`);
    if (a.loan === "single") know.push("Kredyt jednej osoby formalnie obciąża tylko ją. Jeśli spłacaliście go ze wspólnych pieniędzy, może pojawić się kwestia rozliczeń.");
    if (a.debts === "yes" || a.debts === "unsure")
      know.push(
        m
          ? "Odpowiedzialność za długi z czasu małżeństwa zależy m.in. od tego, kto je zaciągnął i czy drugi małżonek się zgodził. Trzeba to sprawdzić dla każdej pozycji."
          : "Za dług odpowiada zwykle osoba, która go zaciągnęła. Jeśli umowę podpisaliście oboje, zwykle odpowiadacie razem.",
      );
    cards.push({
      id: "kredyt",
      title: TOPIC_TITLES.kredyt,
      relevance: relevanceFor("kredyt", a, "dotyczy"),
      dependsOnDetails: a.debts !== "no",
      know,
      check: [
        "Listę kredytów, pożyczek, kart i limitów: kto jest stroną umowy.",
        "Raport kredytowy (np. BIK), żeby mieć pełny obraz zobowiązań.",
        ...(a.loan === "joint" ? ["Warunki banku dotyczące zwolnienia jednego kredytobiorcy albo refinansowania."] : []),
      ],
      ask: ["Kto w mojej sytuacji odpowiada za poszczególne długi i jak je rozliczyć?", ...(a.loan === "joint" ? ["Co się stanie, jeśli jedno z nas przestanie spłacać raty?"] : [])],
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
        a.business === "joint"
          ? "Wspólna firma (np. spółka) wymaga osobnych ustaleń. Liczą się przepisy rodzinne, prawo spółek i umowa spółki."
          : "Firma jednego z Was może mieć znaczenie dla rozliczeń i oceny możliwości zarobkowych.",
        ...(m ? ["Składniki firmy nabyte w trakcie wspólności mogą należeć do majątku wspólnego. Zależy to od formy działalności."] : []),
      ],
      check: ["Formę prawną firmy i kto jest właścicielem lub wspólnikiem.", "Umowę spółki i zasady wyjścia wspólnika.", "Czy za długi firmy odpowiada majątek prywatny."],
      ask: [st === "judgment" ? "Jak rozliczyć firmę, jeśli majątek nie został jeszcze podzielony?" : "Jak zabezpieczyć bieżące działanie firmy w okresie przejściowym?"],
    });
  }

  /* ---------- Obowiązki i sprawy osobiste ---------- */
  {
    const know: string[] = [];
    const check: string[] = ["Testament, uposażonych w polisach i pełnomocnictwa (np. do konta): czy nadal odpowiadają Twojej woli."];
    const ask: string[] = [];
    if (m) {
      if (st === "judgment") {
        know.push(
          "Po rozwodzie albo separacji nie dziedziczycie po sobie z ustawy. Testament może stanowić inaczej, dlatego warto go przejrzeć.",
          "Po rozwodzie możesz wrócić do nazwiska sprzed ślubu. Składasz oświadczenie w USC albo u konsula w ciągu roku od uprawomocnienia wyroku. Po separacji ta możliwość nie przysługuje.",
        );
        check.push("Czy chcesz wrócić do nazwiska i ile zostało z rocznego terminu.");
        ask.push("Jakie sprawy osobiste i urzędowe muszę jeszcze zaktualizować po wyroku?");
      } else {
        know.push(
          "Dopóki trwa małżeństwo, także w trakcie sprawy, obowiązują Was obowiązki małżeńskie.",
          "Po rozwodzie byli małżonkowie nie dziedziczą po sobie z ustawy. Tak samo małżonkowie w separacji.",
          "Po rozwodzie można wrócić do nazwiska sprzed ślubu w ciągu roku od uprawomocnienia wyroku.",
        );
        ask.push("Jakie obowiązki wobec współmałżonka mam do czasu zakończenia sprawy?");
      }
    } else {
      know.push("Partnerzy, którzy nie są małżeństwem, nie mają wobec siebie obowiązków małżeńskich i nie dziedziczą po sobie z ustawy.");
    }
    if (hasMinor(a)) know.push("Obowiązki rodzicielskie (troska, utrzymanie, wychowanie) trwają niezależnie od rozstania.");
    cards.push({ id: "obowiazki", title: TOPIC_TITLES.obowiazki, relevance: "warto-sprawdzic", dependsOnDetails: false, know, check, ask });
  }

  /* ---------- Procedury / w trakcie sprawy / po wyroku ---------- */
  {
    const know: string[] = [];
    const check: string[] = [];
    const ask: string[] = [];
    if (m && st === "pre") {
      know.push(
        "Rozwód i separację orzeka wyłącznie sąd okręgowy. Rozwód w urzędzie stanu cywilnego nie obowiązuje.",
        "Do rozwodu potrzebny jest zupełny i trwały rozkład pożycia, do separacji wystarczy zupełny. Na zgodne żądanie małżonków sąd zaniecha orzekania o winie.",
        "Kolejność, która zwykle się sprawdza: najpierw plan, potem ustalenia, dopiero potem pozew. Sprawy uzgodnione wcześniej sąd może uwzględnić w wyroku.",
        "Rozmowy to Wasze próby dogadania się. Mediacja to spotkania z bezstronnym mediatorem. Jest dobrowolna.",
        "W pozwie trzeba napisać, czy była próba mediacji lub innego polubownego rozwiązania, a jeśli nie, dlaczego. Udokumentowana próba ma znaczenie nawet przy odmowie drugiej strony. Przy przemocy lub kontroli nie musisz jej proponować.",
        "Opłata od pozwu o rozwód to 600 zł. Połowę sąd zwraca, gdy rozwód zapada na zgodne żądanie, bez orzekania o winie.",
      );
      if (a.steps === "talks") check.push("Co już uzgodniliście w rozmowach, a co zostaje otwarte. Przy sprawach spornych może pomóc mediacja.");
      else if (a.steps === "mediation") check.push("Co uzgodniliście w mediacji. Ugodę zawartą przed mediatorem może zatwierdzić sąd.");
      else check.push("Które sprawy możecie uzgodnić przed pozwem i czy mediacja jest w Twojej sytuacji bezpieczna. Zwykle zaczyna się od zaproszenia do mediacji, od Ciebie albo od wybranego mediatora. Zachowaj zaproszenie i odpowiedź.");
      check.push("Który sąd byłby właściwy (zwykle ostatniego wspólnego miejsca zamieszkania, jeśli jedno z Was nadal tam mieszka).");
      ask.push("Rozwód czy separacja: jakie są różnice w mojej sytuacji?", "Jak przygotować ustalenia przed złożeniem pozwu?");
    } else if (st === "filed") {
      know.push(
        m
          ? "Sprawa toczy się przed sądem. Nadal możecie rozmawiać albo skorzystać z mediacji i przedstawić sądowi to, co uzgodnicie, np. porozumienie rodzicielskie."
          : "Sprawa toczy się przed sądem. Nadal możecie rozmawiać albo skorzystać z mediacji i przedstawić sądowi to, co uzgodnicie.",
        "Sąd może skierować Was do mediacji. Każde z Was może się temu sprzeciwić w ciągu tygodnia.",
      );
      if (m) know.push("Na zgodne żądanie małżonków sąd zaniecha orzekania o winie. Przy takim rozwodzie sąd zwraca połowę opłaty od pozwu.");
      check.push(
        "Terminy z pism sądowych i daty rozpraw.",
        "Dokumenty na rozprawę: dochody, koszty utrzymania, majątek.",
        hasMinor(a) || m ? `Czy potrzebne jest zabezpieczenie na czas trwania sprawy (np. ${hasMinor(a) ? "kontakty z dzieckiem, alimenty" : "alimenty"}).` : "Czy potrzebne jest zabezpieczenie na czas trwania sprawy.",
      );
      ask.push("Jak przygotować się do rozprawy?", "Czy możemy jeszcze zawrzeć porozumienie i jak przedstawić je sądowi?");
    } else if (st === "judgment") {
      know.push(
        m
          ? "Skutki wyroku liczą się od jego uprawomocnienia. Wyrok staje się prawomocny, gdy minie termin na zaskarżenie i nikt go nie zaskarżył."
          : "Sąd już orzekł. Teraz liczy się wykonywanie orzeczenia w codzienności.",
        m ? "Po wyroku zwykle zostają sprawy do załatwienia: majątek, nazwisko, bank, urzędy." : "Jeśli ustalenia przestaną działać, w pierwszej kolejności możecie próbować rozmów albo mediacji.",
      );
      check.push(m ? "Czy wyrok jest prawomocny i od kiedy." : "Czy orzeczenie jest prawomocne i czy jest wykonywane.");
      if (m) check.push("Listę spraw po wyroku: nazwisko, podział majątku, bank i kredyt, konta i pełnomocnictwa, alimenty, szkoła i lekarz.");
      ask.push(m ? "Co jeszcze muszę załatwić po wyroku i w jakiej kolejności?" : "Co mogę zrobić, gdy orzeczenie nie jest wykonywane?");
    } else {
      // związek nieformalny, przed sprawą
      know.push("Rozstanie bez ślubu nie wymaga sądu. Sąd jest potrzebny, gdy nie porozumiecie się np. co do dzieci albo wspólnych rzeczy.");
      if (hasMinor(a)) know.push("Sprawy dzieci (miejsce zamieszkania, kontakty, alimenty) rozpoznaje sąd rejonowy. Wcześniej możecie spróbować rozmów albo mediacji z bezstronnym mediatorem.");
      if (a.steps === "talks") check.push("Co już uzgodniliście w rozmowach. Warto to spisać.");
      if (a.steps === "mediation") check.push("Co uzgodniliście w mediacji. Ugodę zawartą przed mediatorem może zatwierdzić sąd.");
      ask.push("Czy w mojej sytuacji potrzebny jest sąd, czy wystarczy porozumienie?");
    }
    cards.push({ id: "procedury", title: PROCEDURE_TITLES[st], relevance: relevanceFor("procedury", a, "dotyczy"), dependsOnDetails: false, know, check, ask });
  }

  /* ---------- Dokumenty ---------- */
  {
    const items: string[] = [];
    if (st === "judgment") items.push(m ? "Odpis prawomocnego wyroku." : "Odpis orzeczenia sądu.");
    if (st === "filed") items.push("Pisma z sądu i kopie złożonych pism, uporządkowane według dat.");
    if (m && st === "pre") items.push("Odpis skrócony aktu małżeństwa (można zamówić przez gov.pl).");
    if (hasMinor(a) && st === "pre") items.push("Odpisy skrócone aktów urodzenia dzieci.");
    if (hasProperty(a)) items.push("Akt notarialny i numer księgi wieczystej nieruchomości.");
    if (a.loan === "joint" || a.loan === "single") items.push("Umowa kredytowa i aktualne zaświadczenie o saldzie.");
    if (a.business && a.business !== "none") items.push("Dokumenty firmy: wpis do rejestru, umowa spółki, ostatnie sprawozdania.");
    items.push("Zestawienie dochodów i stałych wydatków (np. wyciągi z ostatnich miesięcy).");
    if (hasChildrenTopic(a)) items.push(st === "judgment" ? "Potwierdzenia wpłat alimentów i dowody kosztów dziecka." : "Dowody kosztów utrzymania dziecka (szkoła, zajęcia, leczenie).");
    if (m && st === "judgment") items.push("Po zmianie nazwiska: dowód osobisty, paszport, prawo jazdy, dane u pracodawcy.");
    cards.push({
      id: "dokumenty",
      title: TOPIC_TITLES.dokumenty,
      relevance: "warto-sprawdzic",
      dependsOnDetails: false,
      know: [
        st === "filed"
          ? "Uporządkowane dokumenty ułatwiają przygotowanie do rozprawy."
          : st === "judgment"
            ? "Po wyroku część dokumentów trzeba zaktualizować."
            : "Uporządkowane dokumenty skracają rozmowy ze specjalistami i ułatwiają ustalenia.",
      ],
      check: items,
      ask: [st === "judgment" ? "Które dokumenty i dane muszę zaktualizować najpierw?" : "Których dokumentów będę potrzebować na początku, a które mogą poczekać?"],
    });
  }

  /* ---------- Indywidualna analiza ---------- */
  {
    const ask: string[] = [];
    if (m && st === "pre") ask.push("Czy w mojej sytuacji warto żądać orzekania o winie i jakie to ma skutki?");
    if (m && st === "filed") ask.push("Jakie skutki w mojej sprawie ma orzekanie o winie albo zgodne żądanie, by sąd od niego odstąpił?");
    if (a.property === "unsure" || a.debts === "unsure") ask.push("Jak ustalić, co jest naszym majątkiem i jakie mamy zobowiązania, jeśli nie mam pełnej wiedzy?");
    if (hasMinor(a)) ask.push("Jak zadbać o stabilną codzienność dziecka w trakcie zmian?");
    if (a.business && a.business !== "none") ask.push("Jak wycenić i rozliczyć działalność gospodarczą?");
    if (st !== "judgment") ask.push("Jakie ryzyka wiążą się z jednostronnymi działaniami (np. wyprowadzką, przelewami ze wspólnego konta)?");
    else ask.push("Czy któreś ustalenia wymagają zmiany i jak się do tego zabrać?");
    cards.push({
      id: "analiza",
      title: TOPIC_TITLES.analiza,
      relevance: "warto-sprawdzic",
      dependsOnDetails: true,
      know: ["Te kwestie zależą od szczegółów, których narzędzie nie zna. Warto omówić je z prawnikiem albo mediatorem."],
      check: [],
      ask,
    });
  }

  const order: Record<Relevance, number> = { priorytet: 0, dotyczy: 1, "warto-sprawdzic": 2 };
  return cards.sort((x, y) => order[x.relevance] - order[y.relevance]);
}

export function summaryLine(a: ConsequencesAnswers): string {
  const st = stageOf(a);
  if (a.relation === "informal") {
    const base = "Nie jesteście małżeństwem, więc nie dotyczy Was rozwód, separacja ani wspólność majątkowa. Wspólne rzeczy rozlicza się według Kodeksu cywilnego.";
    const kids = hasChildrenTopic(a) ? " Prawa i obowiązki wobec dzieci są takie same jak w małżeństwie." : "";
    const stage = st === "filed" ? " Sprawa jest w sądzie, więc pokazujemy, co ma znaczenie w jej trakcie." : st === "judgment" ? " Sąd już orzekł, więc pokazujemy sprawy po orzeczeniu." : "";
    return base + kids + stage;
  }
  if (st === "filed") return "Jesteście małżeństwem, a sprawa jest już w sądzie. Pokazujemy, co ma znaczenie w jej trakcie.";
  if (st === "judgment") return "Jesteście po wyroku. Pokazujemy sprawy, które zwykle zostają do załatwienia.";
  return "Jesteście małżeństwem. Formalne zakończenie związku wymaga wyroku sądu (rozwód albo separacja).";
}
