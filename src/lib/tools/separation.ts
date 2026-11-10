/**
 * Narzędzie 7 — Separacja czy rozwód?
 * Porównanie skutków prawnych według prawa polskiego (stan na dzień weryfikacji w SITE.legalReviewDate).
 * Odpowiedzi użytkownika WYŁĄCZNIE porządkują i wyróżniają treści — narzędzie nie wskazuje, co wybrać.
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
  basis: string;
};

export const ROWS: CompareRow[] = [
  {
    id: "przeslanki", label: "Kiedy sąd może orzec",
    separation: "Gdy nastąpił zupełny rozkład pożycia — nie musi on być trwały. Sąd nie orzeknie separacji m.in. wtedy, gdy ucierpiałoby na tym dobro wspólnych małoletnich dzieci lub byłoby to sprzeczne z zasadami współżycia społecznego.",
    divorce: "Gdy nastąpił zupełny i trwały rozkład pożycia. Rozwód jest niedopuszczalny m.in., gdy ucierpiałoby dobro wspólnych małoletnich dzieci, byłoby to sprzeczne z zasadami współżycia społecznego albo żąda go małżonek wyłącznie winny (co do zasady bez zgody drugiego).",
    basis: "art. 61¹ i art. 56 KRO",
  },
  {
    id: "status", label: "Status małżeństwa",
    separation: "Małżeństwo formalnie trwa. Separacja nie rozwiązuje związku małżeńskiego.",
    divorce: "Małżeństwo ustaje z chwilą uprawomocnienia się wyroku rozwodowego.",
    basis: "art. 61⁴ i art. 56 KRO",
  },
  {
    id: "malzenstwo", label: "Nowe małżeństwo",
    separation: "Nie można zawrzeć nowego małżeństwa.",
    divorce: "Po uprawomocnieniu się wyroku można zawrzeć nowe małżeństwo.",
    basis: "art. 61⁴ KRO",
  },
  {
    id: "tryb", label: "Tryb i sąd",
    separation: "Orzeka sąd okręgowy — na pozew jednego małżonka albo na zgodny wniosek obojga. Zgodny wniosek jest możliwy tylko wtedy, gdy małżonkowie nie mają wspólnych małoletnich dzieci; wtedy sąd może nie orzekać o winie.",
    divorce: "Orzeka sąd okręgowy na pozew. Na zgodne żądanie małżonków sąd zaniecha orzekania o winie. Rozwód przed kierownikiem USC nie obowiązuje — projekt takiej zmiany nie wszedł w życie.",
    basis: "art. 61¹ § 3, art. 61³ § 2, art. 57 KRO; art. 17 KPC",
  },
  {
    id: "majatek", label: "Majątek",
    separation: "Z chwilą orzeczenia separacji powstaje z mocy prawa rozdzielność majątkowa. Majątek wspólny można podzielić (umową lub w sądzie).",
    divorce: "Wspólność majątkowa ustaje z chwilą uprawomocnienia się wyroku. Majątek można podzielić umową, w osobnym postępowaniu, a czasem w wyroku rozwodowym (gdy nie spowoduje to nadmiernej zwłoki).",
    same: true,
    basis: "art. 54 § 1, art. 58 § 3 KRO",
  },
  {
    id: "dzieci", label: "Dzieci",
    separation: "Sąd rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach na wspólne małoletnie dzieci — podobnie jak w wyroku rozwodowym. Uwzględnia porozumienie rodziców zgodne z dobrem dziecka.",
    divorce: "Sąd rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach na wspólne małoletnie dzieci. Uwzględnia pisemne porozumienie rodziców zgodne z dobrem dziecka.",
    same: true,
    basis: "art. 58 i art. 61³ KRO",
  },
  {
    id: "ojcostwo", label: "Domniemanie ojcostwa",
    separation: "Domniemania, że ojcem jest mąż matki, nie stosuje się, jeżeli dziecko urodziło się po upływie 300 dni od orzeczenia separacji.",
    divorce: "Domniemanie dotyczy dziecka urodzonego w czasie małżeństwa albo przed upływem 300 dni od jego ustania.",
    basis: "art. 62 § 1 KRO",
  },
  {
    id: "alimenty", label: "Alimenty między małżonkami",
    separation: "Stosuje się zasady zbliżone do obowiązujących po rozwodzie (przepisy o separacji odsyłają do przepisów o rozwodzie). Szczegóły wymagają analizy w konkretnej sprawie.",
    divorce: "Były małżonek może żądać alimentów na zasadach z art. 60 KRO — zależą one m.in. od niedostatku oraz od orzeczenia o winie; w niektórych przypadkach obowiązek jest ograniczony do 5 lat.",
    same: true,
    verify: true,
    basis: "art. 60, art. 61⁴ KRO",
  },
  {
    id: "pomoc", label: "Obowiązek wzajemnej pomocy",
    separation: "Małżonkowie w separacji mają obowiązek wzajemnej pomocy, jeżeli wymagają tego względy słuszności.",
    divorce: "Po rozwodzie nie ma takiego obowiązku (pozostają ewentualne alimenty).",
    basis: "art. 61⁴ § 3 KRO",
  },
  {
    id: "nazwisko", label: "Nazwisko",
    separation: "Separacja nie daje możliwości powrotu do poprzedniego nazwiska w trybie przewidzianym po rozwodzie.",
    divorce: "Można wrócić do nazwiska sprzed ślubu w ciągu 1 roku od uprawomocnienia się wyroku — składając oświadczenie przed kierownikiem USC lub konsulem (termin wydłużony z 3 miesięcy od 8.10.2025).",
    basis: "art. 59 KRO",
  },
  {
    id: "dziedziczenie", label: "Dziedziczenie",
    separation: "Małżonek pozostający w separacji jest wyłączony od dziedziczenia ustawowego po drugim małżonku. Testament nadal może przewidywać inaczej.",
    divorce: "Były małżonek nie dziedziczy z ustawy. Testament sporządzony wcześniej warto przejrzeć.",
    same: true,
    basis: "art. 935¹ KC",
  },
  {
    id: "koszty", label: "Opłata sądowa",
    separation: "Pozew o separację: 600 zł. Zgodny wniosek o separację (bez wspólnych małoletnich dzieci): 100 zł. Przy separacji na zgodny wniosek bez orzekania o winie, po uprawomocnieniu się wyroku, sąd zwraca połowę opłaty.",
    divorce: "Pozew o rozwód: 600 zł. Gdy rozwód zostanie orzeczony na zgodny wniosek, bez orzekania o winie, po uprawomocnieniu się wyroku sąd zwraca połowę opłaty (300 zł).",
    basis: "ustawa o kosztach sądowych w sprawach cywilnych (art. 26, art. 79)",
  },
  {
    id: "powrot", label: "Możliwość powrotu",
    separation: "Na zgodne żądanie małżonków sąd znosi separację — jej skutki ustają. Wraca wspólność ustawowa, chyba że sąd na zgodny wniosek utrzyma rozdzielność majątkową.",
    divorce: "Rozwodu nie da się cofnąć. Byli małżonkowie mogą ponownie zawrzeć małżeństwo.",
    basis: "art. 61⁶ i art. 54 § 2 KRO",
  },
  {
    id: "przejscie", label: "Separacja a późniejszy rozwód",
    separation: "Separacja nie zamyka drogi do rozwodu — później można wnieść pozew o rozwód, jeśli rozkład pożycia stanie się trwały. Gdy jeden małżonek żąda separacji, a drugi rozwodu, sąd orzeka rozwód, jeśli są ku temu podstawy.",
    divorce: "Rozwód kończy sprawę statusu małżeństwa. Nie ma potrzeby wcześniejszej separacji.",
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

export const CORE: SepTopic[] = ["przeslanki", "status", "malzenstwo"];

/** Tematy wyróżnione na podstawie odpowiedzi (bez oceniania, co lepsze). */
export function highlighted(a: SeparationAnswers): Set<SepTopic> {
  const s = new Set<SepTopic>();
  for (const t of a.topics) TOPIC_MAP[t].forEach((x) => s.add(x));
  if (a.children === "minor") { s.add("dzieci"); s.add("tryb"); }
  if (a.property === "yes") s.add("majatek");
  if (a.remarry === "yes" || a.remarry === "unsure") s.add("malzenstwo");
  if (a.reconcile === "yes" || a.reconcile === "maybe") { s.add("powrot"); s.add("przejscie"); }
  if (a.worldview === "yes") s.add("status");
  if (a.agreement === "differ") s.add("przejscie");
  if (a.agreement === "agree") s.add("koszty");
  return s;
}

export type OrderedRow = CompareRow & { relevant: boolean };

/** Wiersze: najpierw kluczowe, potem wyróżnione, potem pozostałe. */
export function orderedRows(a: SeparationAnswers): OrderedRow[] {
  const h = highlighted(a);
  const rank = (r: CompareRow) => (CORE.includes(r.id) ? 0 : h.has(r.id) ? 1 : 2);
  return ROWS.map((r) => ({ ...r, relevant: CORE.includes(r.id) || h.has(r.id) })).sort((x, y) => rank(x) - rank(y) || ROWS.indexOf(x) - ROWS.indexOf(y));
}

export function commonEffects(a: SeparationAnswers): string[] {
  const out = [
    "W obu przypadkach orzeka sąd okręgowy i w obu potrzebny jest zupełny rozkład pożycia.",
    "Ustaje wspólność majątkowa — majątek wspólny można podzielić.",
    "Ustaje wspólne dziedziczenie z ustawy między małżonkami.",
    "Możliwe są alimenty między małżonkami na zbliżonych zasadach (wymaga analizy).",
  ];
  if (a.children !== "none") out.splice(1, 0, "Sąd rozstrzyga o władzy rodzicielskiej, kontaktach i alimentach na wspólne małoletnie dzieci, uwzględniając porozumienie rodziców zgodne z dobrem dziecka.");
  out.push("W obu przypadkach można skorzystać z mediacji. Jest dobrowolna — jeśli sąd skieruje Was do mediacji, możesz się temu sprzeciwić.");
  return out;
}

export function keyDifferences(a: SeparationAnswers): string[] {
  const h = highlighted(a);
  const all: { id: SepTopic; text: string }[] = [
    { id: "status", text: "Separacja nie rozwiązuje małżeństwa — rozwód tak." },
    { id: "malzenstwo", text: "W separacji nie można zawrzeć nowego małżeństwa; po rozwodzie — można." },
    { id: "przeslanki", text: "Do separacji wystarcza zupełny rozkład pożycia; do rozwodu musi być on także trwały." },
    { id: "powrot", text: "Separację można znieść na zgodne żądanie małżonków; rozwodu nie można cofnąć." },
    { id: "pomoc", text: "W separacji może istnieć obowiązek wzajemnej pomocy, jeśli wymagają tego względy słuszności." },
    { id: "nazwisko", text: "Powrót do nazwiska sprzed ślubu (w ciągu 1 roku) przysługuje po rozwodzie, nie po separacji." },
    { id: "tryb", text: "Separację można orzec na zgodny wniosek — ale tylko bez wspólnych małoletnich dzieci." },
    { id: "ojcostwo", text: "Separacja wpływa na domniemanie ojcostwa dziecka urodzonego po 300 dniach od jej orzeczenia." },
  ];
  return all.sort((x, y) => Number(h.has(y.id)) - Number(h.has(x.id))).map((x) => x.text);
}

export function consultIssues(a: SeparationAnswers): string[] {
  const out: string[] = [];
  if (a.children === "minor") out.push("Jakie porozumienie dotyczące dzieci (władza rodzicielska, kontakty, alimenty) warto przygotować i czy jest ono zgodne z dobrem dzieci.");
  if (a.children === "minor") out.push("Przy wspólnych małoletnich dzieciach separacja na zgodny wniosek nie jest dostępna — sprawa toczy się z pozwu.");
  if (a.property === "yes" || a.property === "unsure") out.push("Jak i kiedy podzielić majątek wspólny oraz co z kredytami — niezależnie od wybranej drogi.");
  if (a.reconcile === "yes" || a.reconcile === "maybe") out.push("Jak w praktyce wygląda zniesienie separacji i co dzieje się wtedy z majątkiem.");
  if (a.remarry === "yes" || a.remarry === "unsure") out.push("Jakie są terminy i wymagania, jeśli planujesz w przyszłości nowy związek małżeński.");
  if (a.agreement === "differ") out.push("Co się dzieje, gdy jedno z Was chce separacji, a drugie rozwodu.");
  if (a.worldview === "yes") out.push("Jak przepisy cywilne mają się do Twoich przekonań — separacja i rozwód cywilny nie rozstrzygają kwestii wyznaniowych.");
  out.push("Alimenty między małżonkami — czy i na jakich zasadach mogą przysługiwać w Twojej sytuacji.");
  out.push("Czy w Twojej sprawie może mieć znaczenie orzekanie o winie i jakie ma skutki.");
  out.push("Testament, beneficjenci ubezpieczeń i pełnomocnictwa — co warto zaktualizować.");
  return out;
}

export function specialistQuestions(a: SeparationAnswers): string[] {
  const q = [
    "Czy w mojej sytuacji spełnione są przesłanki separacji lub rozwodu?",
    "Ile może potrwać sprawa w moim sądzie i od czego to zależy?",
    "Jakie dokumenty powinienem/powinnam przygotować?",
  ];
  if (a.agreement === "agree") q.push("Czy zgodny wniosek i brak orzekania o winie są w moim przypadku możliwe i co oznaczają dla kosztów?");
  if (a.children === "minor") q.push("Jak przygotować porozumienie rodzicielskie, które sąd będzie mógł uwzględnić?");
  if (a.property === "yes") q.push("Czy podział majątku przeprowadzić w tej samej sprawie, osobno w sądzie, czy umową u notariusza?");
  if (a.reconcile !== "no") q.push("Jeśli później zmienimy zdanie — jakie kroki trzeba będzie podjąć?");
  q.push("Czy mediacja ma sens w mojej sytuacji i jak się do niej przygotować?");
  return q;
}
