/**
 * Narzędzie 7: Separacja czy rozwód?
 * Porównanie skutków prawnych według prawa polskiego (fakty: LEGAL_VERIFICATION.md).
 * Odpowiedzi porządkują, wyróżniają i ukrywają treści. Narzędzie nie wskazuje, co wybrać.
 * Pole `basis` służy redakcji i weryfikacji. Nie wyświetlamy go w treści (COPY_GUIDE: bez przepisów w treści).
 */

export type SepTopic = "przeslanki" | "status" | "malzenstwo" | "tryb" | "majatek" | "dzieci" | "ojcostwo" | "alimenty" | "pomoc" | "nazwisko" | "dziedziczenie" | "koszty" | "powrot" | "przejscie";

export type UserTopic = "majatek" | "dzieci" | "alimenty" | "nazwisko" | "dziedziczenie" | "koszty" | "powrot";

export type SeparationAnswers = {
  children?: "minor" | "adult" | "none";
  property?: "yes" | "no" | "unsure";
  worldview?: "yes" | "no" | "skip";
  reconcile?: "yes" | "maybe" | "no";
  remarry?: "yes" | "no" | "unsure";
  agreement?: "agree" | "differ" | "unknown";
  topics: UserTopic[];
};

export type CompareRow = {
  id: SepTopic;
  label: string;
  separation: string;
  divorce: string;
  /** Skutek taki sam lub bardzo zbliżony */
  same?: boolean;
  /** Wymaga szczególnej weryfikacji przez prawnika */
  verify?: boolean;
  /** Podstawa prawna: tylko do redakcji i listy źródeł, nie do treści */
  basis: string;
};

export const ROWS: CompareRow[] = [
  {
    id: "przeslanki", label: "Kiedy sąd może orzec",
    separation: "Gdy nastąpił zupełny rozkład pożycia. Nie musi być trwały. Sąd nie orzeknie separacji m.in., gdy ucierpiałoby dobro wspólnych małoletnich dzieci.",
    divorce: "Gdy rozkład pożycia jest zupełny i trwały. Rozwód jest niedopuszczalny m.in., gdy ucierpiałoby dobro wspólnych małoletnich dzieci albo gdy żąda go wyłącznie winny małżonek (co do zasady bez zgody drugiego).",
    basis: "art. 61¹ i art. 56 KRO",
  },
  {
    id: "status", label: "Status małżeństwa",
    separation: "Małżeństwo formalnie trwa.",
    divorce: "Małżeństwo ustaje z uprawomocnieniem wyroku.",
    basis: "art. 61⁴ i art. 56 KRO",
  },
  {
    id: "malzenstwo", label: "Nowe małżeństwo",
    separation: "Nie można zawrzeć nowego małżeństwa.",
    divorce: "Po uprawomocnieniu wyroku można zawrzeć nowe małżeństwo.",
    basis: "art. 61⁴ KRO",
  },
  {
    id: "tryb", label: "Tryb i sąd",
    separation: "Orzeka sąd okręgowy, na pozew jednego z Was albo na zgodny wniosek obojga. Zgodny wniosek jest możliwy tylko bez wspólnych małoletnich dzieci. Wtedy sąd nie orzeka o winie.",
    divorce: "Orzeka sąd okręgowy na pozew. Na zgodne żądanie małżonków sąd zaniecha orzekania o winie. Rozwód w urzędzie stanu cywilnego nie obowiązuje.",
    basis: "art. 61¹ § 3, art. 61³ § 2, art. 57 KRO; art. 17 KPC",
  },
  {
    id: "majatek", label: "Majątek",
    separation: "Z orzeczeniem separacji powstaje rozdzielność majątkowa. Majątek wspólny można podzielić umową albo w sądzie.",
    divorce: "Wspólność ustaje z uprawomocnieniem wyroku. Majątek można podzielić umową, w osobnej sprawie, a czasem w wyroku rozwodowym.",
    same: true,
    basis: "art. 54 § 1, art. 58 § 3 KRO",
  },
  {
    id: "dzieci", label: "Dzieci",
    separation: "Sąd rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach na wspólne małoletnie dzieci. Uwzględnia porozumienie rodzicielskie zgodne z dobrem dziecka.",
    divorce: "Tak samo: sąd rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach. Uwzględnia porozumienie rodzicielskie zgodne z dobrem dziecka.",
    same: true,
    basis: "art. 58 i art. 61³ KRO",
  },
  {
    id: "ojcostwo", label: "Domniemanie ojcostwa",
    separation: "Nie obejmuje dziecka urodzonego po upływie 300 dni od orzeczenia separacji.",
    divorce: "Obejmuje dziecko urodzone w czasie małżeństwa albo przed upływem 300 dni od jego ustania.",
    basis: "art. 62 § 1 KRO",
  },
  {
    id: "alimenty", label: "Alimenty między małżonkami",
    separation: "Zasady są zbliżone do tych po rozwodzie. Szczegóły wymagają analizy w konkretnej sprawie.",
    divorce: "Były małżonek może żądać alimentów. Zależą m.in. od niedostatku i orzeczenia o winie. Czasem obowiązek trwa najwyżej 5 lat.",
    same: true,
    verify: true,
    basis: "art. 60, art. 61⁴ KRO",
  },
  {
    id: "pomoc", label: "Obowiązek wzajemnej pomocy",
    separation: "Istnieje, jeśli wymagają tego względy słuszności.",
    divorce: "Nie istnieje. Pozostają ewentualne alimenty.",
    basis: "art. 61⁴ § 3 KRO",
  },
  {
    id: "nazwisko", label: "Nazwisko",
    separation: "Separacja nie daje możliwości powrotu do nazwiska sprzed ślubu w trybie przewidzianym po rozwodzie.",
    divorce: "Można wrócić do nazwiska sprzed ślubu w ciągu 1 roku od uprawomocnienia wyroku. Składa się oświadczenie w USC albo u konsula.",
    basis: "art. 59 KRO",
  },
  {
    id: "dziedziczenie", label: "Dziedziczenie",
    separation: "Małżonek w separacji nie dziedziczy z ustawy. Testament może stanowić inaczej.",
    divorce: "Były małżonek nie dziedziczy z ustawy. Wcześniejszy testament warto przejrzeć.",
    same: true,
    basis: "art. 935¹ KC",
  },
  {
    id: "koszty", label: "Opłata sądowa",
    separation: "Pozew o separację: 600 zł. Zgodny wniosek (bez wspólnych małoletnich dzieci): 100 zł. Przy separacji na zgodny wniosek, bez orzekania o winie, sąd zwraca połowę opłaty.",
    divorce: "Pozew o rozwód: 600 zł. Przy rozwodzie na zgodny wniosek, bez orzekania o winie, sąd zwraca połowę opłaty (300 zł) po uprawomocnieniu wyroku.",
    basis: "ustawa o kosztach sądowych w sprawach cywilnych (art. 26, art. 79)",
  },
  {
    id: "powrot", label: "Możliwość powrotu",
    separation: "Na zgodne żądanie małżonków sąd znosi separację i jej skutki ustają. Wraca wspólność majątkowa, chyba że sąd na Wasz wniosek utrzyma rozdzielność.",
    divorce: "Rozwodu nie da się cofnąć. Byli małżonkowie mogą ponownie zawrzeć małżeństwo.",
    basis: "art. 61⁶ i art. 54 § 2 KRO",
  },
  {
    id: "przejscie", label: "Separacja a późniejszy rozwód",
    separation: "Separacja nie zamyka drogi do rozwodu, jeśli rozkład pożycia stanie się trwały. Gdy jedno żąda separacji, a drugie rozwodu, sąd orzeka rozwód, jeśli są ku temu podstawy.",
    divorce: "Rozwód zamyka sprawę statusu małżeństwa. Wcześniejsza separacja nie jest potrzebna.",
    basis: "art. 61² KRO",
  },
];

const TOPIC_MAP: Record<UserTopic, SepTopic[]> = {
  majatek: ["majatek"],
  dzieci: ["dzieci", "ojcostwo"],
  alimenty: ["alimenty", "pomoc"],
  nazwisko: ["nazwisko"],
  dziedziczenie: ["dziedziczenie"],
  koszty: ["koszty", "tryb"],
  powrot: ["powrot", "przejscie"],
};

/** Zawsze na górze: to, co odróżnia obie drogi u podstaw */
export const CORE: SepTopic[] = ["przeslanki", "status"];

/** Wiersze, które nie dotyczą sytuacji, są ukrywane całkowicie (nie tylko przesuwane w dół). */
export function hiddenRows(a: SeparationAnswers): Set<SepTopic> {
  const s = new Set<SepTopic>();
  // Sąd rozstrzyga z urzędu tylko o wspólnych małoletnich dzieciach.
  if (a.children !== "minor") s.add("dzieci");
  return s;
}

/** Tematy wyróżnione na podstawie odpowiedzi (bez oceniania, co lepsze). */
export function highlighted(a: SeparationAnswers): Set<SepTopic> {
  const s = new Set<SepTopic>();
  for (const t of a.topics) TOPIC_MAP[t].forEach((x) => s.add(x));
  if (a.children === "minor") { s.add("dzieci"); s.add("tryb"); }
  if (a.property === "yes" || a.property === "unsure") s.add("majatek");
  if (a.remarry === "yes" || a.remarry === "unsure") { s.add("malzenstwo"); s.add("przejscie"); }
  if (a.reconcile === "yes" || a.reconcile === "maybe") { s.add("powrot"); s.add("przejscie"); }
  if (a.worldview === "yes") { s.add("status"); s.add("malzenstwo"); }
  if (a.agreement === "differ") s.add("przejscie");
  if (a.agreement === "agree") { s.add("koszty"); s.add("tryb"); }
  hiddenRows(a).forEach((x) => s.delete(x));
  return s;
}

export type OrderedRow = CompareRow & { relevant: boolean };

/** Widoczne wiersze: najpierw kluczowe, potem wyróżnione, potem pozostałe. Nieistotne są pomijane. */
export function orderedRows(a: SeparationAnswers): OrderedRow[] {
  const h = highlighted(a);
  const hidden = hiddenRows(a);
  const rank = (r: CompareRow) => (CORE.includes(r.id) ? 0 : h.has(r.id) ? 1 : 2);
  return ROWS.filter((r) => !hidden.has(r.id))
    .map((r) => ({ ...r, relevant: CORE.includes(r.id) || h.has(r.id) }))
    .sort((x, y) => rank(x) - rank(y) || ROWS.indexOf(x) - ROWS.indexOf(y));
}

/** Krótkie podsumowanie dopasowane do odpowiedzi. Bez wskazywania wyboru. */
export function situationNotes(a: SeparationAnswers): string[] {
  const out: string[] = [];
  if (a.reconcile === "yes") out.push("Nie wykluczasz powrotu. Separację można znieść na zgodne żądanie obojga, a rozwodu nie da się cofnąć.");
  if (a.reconcile === "maybe") out.push("Nie wiesz jeszcze, czy możliwy jest powrót. Separację można znieść na zgodne żądanie obojga, a rozwodu nie da się cofnąć.");
  if (a.reconcile === "no") out.push("Nie bierzesz pod uwagę powrotu, więc możliwość zniesienia separacji prawdopodobnie ma dla Ciebie mniejsze znaczenie.");
  if (a.remarry === "yes" || a.remarry === "unsure") out.push("Bierzesz pod uwagę nowe małżeństwo. W separacji nie jest to możliwe, po rozwodzie tak. Z separacji można później przejść do rozwodu, jeśli rozkład pożycia stanie się trwały.");
  if (a.worldview === "yes") out.push("Przekonania mają dla Ciebie znaczenie. Separacja nie rozwiązuje małżeństwa. Ani separacja, ani rozwód cywilny nie rozstrzygają kwestii wyznaniowych.");
  if (a.agreement === "agree")
    out.push(
      a.children === "minor"
        ? "Myślicie podobnie. Przy małoletnich dzieciach sprawa toczy się z pozwu, ale na zgodne żądanie sąd zaniecha orzekania o winie."
        : "Myślicie podobnie i nie macie wspólnych małoletnich dzieci. Separację można wtedy orzec na zgodny wniosek, z niższą opłatą.",
    );
  if (a.agreement === "differ") out.push("Macie różne oczekiwania. Gdy jedno żąda separacji, a drugie rozwodu, sąd orzeka rozwód, jeśli są ku temu podstawy.");
  if (a.agreement === "unknown") out.push("Nie wiesz, co myśli druga strona. Od tego może zależeć tryb sprawy, dlatego warto to najpierw sprawdzić w rozmowie.");
  if (a.children === "minor") out.push("W obu drogach sąd rozstrzygnie o władzy rodzicielskiej, kontaktach i alimentach. Uwzględni porozumienie rodzicielskie zgodne z dobrem dzieci.");
  if (a.children === "adult") out.push("Wasze dzieci są pełnoletnie. Sąd z urzędu rozstrzyga tylko o dzieciach małoletnich. Pełnoletnie dziecko o alimenty występuje we własnym imieniu.");
  if (a.property === "yes") out.push("W obu drogach ustaje wspólność majątkowa. Podział majątku trzeba będzie zaplanować niezależnie od wyboru.");
  if (a.property === "unsure") out.push("Nie wiesz, co jest wspólnym majątkiem. Zacznij od spisu, bo wspólność ustaje w obu drogach.");
  return out;
}

export function commonEffects(a: SeparationAnswers): string[] {
  const out = ["W obu przypadkach orzeka sąd okręgowy i potrzebny jest zupełny rozkład pożycia."];
  if (a.children === "minor") out.push("Sąd rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach na małoletnie dzieci. Uwzględnia porozumienie rodzicielskie zgodne z dobrem dziecka.");
  out.push(a.property === "no" ? "Ustaje wspólność majątkowa, także gdy dziś nie macie wspólnego majątku." : "Ustaje wspólność majątkowa. Majątek wspólny można podzielić.");
  out.push("Małżonkowie nie dziedziczą po sobie z ustawy.");
  out.push("Alimenty między małżonkami są możliwe na zbliżonych zasadach (wymaga analizy).");
  if (a.agreement === "agree") out.push("Gdy myślicie podobnie, spiszcie ustalenia z rozmów. Mediacja może pomóc dopracować szczegóły.");
  else if (a.agreement === "differ") out.push("Przy różnych oczekiwaniach może pomóc mediacja, czyli spotkania z bezstronnym mediatorem. To co innego niż Wasze rozmowy we dwoje.");
  else out.push("Warto najpierw zaplanować i spróbować uzgodnić sprawy: w rozmowach albo w mediacji z bezstronnym mediatorem.");
  out.push("W pozwie trzeba napisać, czy była próba mediacji lub innego polubownego rozwiązania, a jeśli nie, dlaczego. Mediacja jest dobrowolna. Przy przemocy lub kontroli nie musisz jej proponować.");
  return out;
}

export function keyDifferences(a: SeparationAnswers): string[] {
  const h = highlighted(a);
  const hidden = hiddenRows(a);
  const all: { id: SepTopic; text: string }[] = [
    { id: "status", text: "Separacja nie rozwiązuje małżeństwa, rozwód tak." },
    { id: "przeslanki", text: "Do separacji wystarcza zupełny rozkład pożycia. Do rozwodu musi być też trwały." },
    { id: "malzenstwo", text: "W separacji nie można zawrzeć nowego małżeństwa, po rozwodzie można." },
    { id: "powrot", text: "Separację można znieść na zgodne żądanie. Rozwodu nie da się cofnąć." },
    { id: "przejscie", text: "Z separacji można później przejść do rozwodu." },
    { id: "pomoc", text: "W separacji może istnieć obowiązek wzajemnej pomocy, jeśli wymagają tego względy słuszności." },
    { id: "nazwisko", text: "Powrót do nazwiska sprzed ślubu (w ciągu 1 roku) jest możliwy po rozwodzie, nie po separacji." },
    {
      id: "tryb",
      text: a.children === "minor"
        ? "Przy małoletnich dzieciach separacja na zgodny wniosek nie jest dostępna. Obie sprawy toczą się z pozwu."
        : "Bez wspólnych małoletnich dzieci separację można orzec na zgodny wniosek, bez orzekania o winie.",
    },
    { id: "koszty", text: "Zgodny wniosek o separację kosztuje 100 zł, pozew o rozwód lub separację 600 zł." },
    { id: "ojcostwo", text: "Domniemanie ojcostwa nie obejmuje dziecka urodzonego po 300 dniach od orzeczenia separacji." },
  ];
  return all.filter((x) => !hidden.has(x.id) && (CORE.includes(x.id) || h.has(x.id))).map((x) => x.text);
}

export function consultIssues(a: SeparationAnswers): string[] {
  const out: string[] = [];
  if (a.children === "minor") {
    out.push("Jakie porozumienie rodzicielskie (władza rodzicielska, kontakty, alimenty) warto przygotować.");
    out.push("Przy wspólnych małoletnich dzieciach separacja na zgodny wniosek nie jest dostępna. Sprawa toczy się z pozwu.");
  }
  if (a.children === "adult") out.push("Alimenty na pełnoletnie dziecko: dziecko występuje o nie we własnym imieniu.");
  if (a.property === "yes" || a.property === "unsure") out.push("Jak i kiedy podzielić majątek wspólny i co z kredytami, niezależnie od wybranej drogi.");
  if (a.reconcile === "yes" || a.reconcile === "maybe") out.push("Jak wygląda zniesienie separacji i co dzieje się wtedy z majątkiem.");
  if (a.remarry === "yes" || a.remarry === "unsure") out.push("Co trzeba zrobić, jeśli w przyszłości zechcesz zawrzeć nowe małżeństwo.");
  if (a.agreement === "differ") out.push("Co się dzieje, gdy jedno z Was chce separacji, a drugie rozwodu.");
  if (a.agreement === "agree" && a.children !== "minor") out.push("Czy w Twojej sytuacji możliwy jest zgodny wniosek o separację.");
  if (a.worldview === "yes") out.push("Jak przepisy cywilne mają się do Twoich przekonań. Separacja i rozwód cywilny nie rozstrzygają kwestii wyznaniowych.");
  if (a.topics.includes("nazwisko")) out.push("Czy i kiedy chcesz wrócić do nazwiska sprzed ślubu.");
  out.push("Czy w Twojej sytuacji mogą przysługiwać alimenty między małżonkami.");
  if (a.agreement !== "agree") out.push("Czy w Twojej sprawie może mieć znaczenie orzekanie o winie.");
  out.push("Testament, uposażeni w polisach i pełnomocnictwa: co zaktualizować.");
  return out;
}

export function specialistQuestions(a: SeparationAnswers): string[] {
  const q = ["Czy w mojej sytuacji mogą być spełnione przesłanki separacji lub rozwodu?", "Ile może potrwać sprawa w moim sądzie?"];
  if (a.agreement === "agree") q.push(a.children === "minor" ? "Co oznacza dla kosztów sprawa bez orzekania o winie?" : "Czy zgodny wniosek o separację jest w moim przypadku możliwy i co oznacza dla kosztów?");
  if (a.agreement === "differ") q.push("Jak wygląda sprawa, gdy mamy różne oczekiwania co do separacji i rozwodu?");
  if (a.children === "minor") q.push("Jak przygotować porozumienie rodzicielskie, które sąd będzie mógł uwzględnić?");
  if (a.children === "adult") q.push("Jak wygląda obowiązek alimentacyjny wobec naszych pełnoletnich dzieci?");
  if (a.property === "yes") q.push("Czy podzielić majątek w tej samej sprawie, osobno w sądzie, czy umową u notariusza?");
  if (a.property === "unsure") q.push("Jak ustalić, co należy do majątku wspólnego?");
  if (a.reconcile === "yes" || a.reconcile === "maybe") q.push("Jeśli później zmienimy zdanie, jakie kroki trzeba będzie podjąć?");
  if (a.remarry === "yes" || a.remarry === "unsure") q.push("Jak wygląda przejście z separacji do rozwodu, jeśli zechcę ponownie wziąć ślub?");
  q.push(a.agreement === "differ" ? "Czy mediacja ma sens przy naszych różnych oczekiwaniach i jak do niej zaprosić drugą stronę?" : "Czy mediacja ma sens w mojej sytuacji i jak się do niej przygotować?");
  return q;
}
