/**
 * Narzędzie 1: mieszkanie i kredyt po rozstaniu.
 * Logika deterministyczna: scenariusze i listy wynikają wyłącznie z odpowiedzi.
 * Nie jest to prawny podział majątku ani kalkulacja kwoty do wypłaty.
 *
 * LTV (loan-to-value) = saldo kredytu do spłaty / orientacyjna wartość nieruchomości podana przez użytkownika.
 * Liczone tylko, gdy jest kredyt i podano obie kwoty. Próg ostrzeżenia: LTV_HIGH (80%). To orientacyjny
 * punkt odniesienia, nie reguła konkretnego banku: banki liczą LTV od własnej wyceny i mają różne limity.
 */

export type HousingAnswers = {
  relation?: "marriage" | "informal";
  owner?: "both" | "me" | "partner" | "unsure";
  purchase?: "before" | "during" | "unsure";
  regime?: "wspolnosc" | "rozdzielnosc" | "inny" | "unsure";
  ownFunds?: "yes" | "no" | "unsure"; // czy przy zakupie/spłacie użyto pieniędzy z darowizny, spadku lub sprzed ślubu
  loan?: "joint" | "me" | "partner" | "none" | "unsure";
  value?: number;
  balance?: number;
  installment?: number;
  stay?: "me" | "partner" | "both" | "nobody" | "unsure";
  sale?: "yes" | "maybe" | "no";
  afford?: "yes" | "unsure" | "no";
  saleCostPct?: number; // założenie użytkownika, domyślnie 3%
};

export type ScenarioId = "sale" | "buyout" | "coown" | "ownerKeeps";

export type Scenario = {
  id: ScenarioId;
  title: string;
  summary: string;
  score: number;
  fit: "dobre" | "możliwe" | "trudniejsze";
  why: string[];
  steps: string[];
  watch: string[];
};

export type PropertyStatus = { label: string; text: string; certainty: "prawdopodobnie" | "zależy od szczegółów" };

export type Money = {
  value?: number;
  balance?: number;
  equity?: number;
  equityAfterCosts?: number;
  saleCosts?: number;
  ltv?: number;
  negative: boolean;
  halfIllustration?: number;
};

export const DEFAULT_SALE_COST_PCT = 3;
/** Orientacyjny próg „wysokiego” LTV (80%). Banki stosują własne limity i własną wycenę. */
export const LTV_HIGH = 0.8;

/**
 * Usuwa odpowiedzi z kroków, które przy obecnych odpowiedziach są ukryte
 * (np. po zmianie „małżeństwo” na „związek nieformalny” albo „nikt nie zostaje”).
 * Dzięki temu wynik zależy tylko od pytań, które użytkownik faktycznie widzi.
 */
export function normalizeAnswers(a: HousingAnswers): HousingAnswers {
  const n: HousingAnswers = { ...a };
  if (n.relation !== "marriage") { delete n.purchase; delete n.regime; delete n.ownFunds; }
  else if (n.purchase === "before" || n.regime === "rozdzielnosc") delete n.ownFunds;
  if (!(n.loan && n.loan !== "none")) { delete n.balance; delete n.installment; }
  if (!(n.stay === "me" || n.stay === "partner" || n.stay === "both")) delete n.afford;
  return n;
}

export const isMarriage = (a: HousingAnswers) => a.relation === "marriage";
export const hasLoan = (a: HousingAnswers) => !!a.loan && a.loan !== "none";
export const someoneStays = (a: HousingAnswers) => a.stay === "me" || a.stay === "partner" || a.stay === "both";
const singleOwner = (a: HousingAnswers) => a.owner === "me" || a.owner === "partner";

export function propertyStatus(input: HousingAnswers): PropertyStatus {
  const a = normalizeAnswers(input);
  if (a.relation === "informal") {
    if (a.owner === "both")
      return { label: "Współwłasność (Kodeks cywilny)", certainty: "prawdopodobnie", text: "W związku nieformalnym nie ma wspólności majątkowej. Jeśli oboje jesteście właścicielami, to zwykle współwłasność w udziałach z aktu notarialnego. Można ją znieść umową albo w sądzie." };
    if (singleOwner(a))
      return { label: "Własność jednej osoby", certainty: "zależy od szczegółów", text: "Nieruchomość należy do osoby wpisanej jako właściciel. Jeśli druga osoba dokładała się do zakupu lub rat, rozliczenie tych wpłat zależy od okoliczności i wymaga analizy." };
    return { label: "Do ustalenia", certainty: "zależy od szczegółów", text: "Sprawdź w akcie notarialnym lub księdze wieczystej, kto jest właścicielem i w jakich udziałach. Od tego zależą możliwe rozwiązania." };
  }
  // małżeństwo
  if (a.regime === "rozdzielnosc")
    return { label: "Rozdzielność majątkowa", certainty: "zależy od szczegółów", text: a.owner === "both" ? "Przy rozdzielności wspólny zakup to zwykle współwłasność w udziałach. Rozlicza się ją według zasad współwłasności. Znaczenie może mieć data umowy majątkowej." : "Przy rozdzielności każdy małżonek ma własny majątek. Znaczenie ma jednak data umowy i to, z jakich pieniędzy kupiono mieszkanie." };
  if (a.purchase === "before")
    return { label: "Prawdopodobnie majątek osobisty", certainty: "zależy od szczegółów", text: "To, co kupiono przed ślubem, co do zasady należy do majątku osobistego. Jeśli jednak raty spłacano ze wspólnych pieniędzy w trakcie małżeństwa, może pojawić się rozliczenie tych nakładów." };
  if (a.purchase === "during" && (a.regime === "wspolnosc" || a.regime === undefined)) {
    if (a.ownFunds === "yes")
      return { label: "Majątek wspólny lub mieszany", certainty: "zależy od szczegółów", text: "Mieszkanie kupione w trakcie wspólności zwykle należy do majątku wspólnego. Jeśli użyto pieniędzy z darowizny, spadku lub sprzed ślubu, część może być majątkiem osobistym albo podlegać rozliczeniu. To wymaga analizy dokumentów." };
    return { label: "Prawdopodobnie majątek wspólny", certainty: "prawdopodobnie", text: "Mieszkanie kupione w trakcie wspólności co do zasady należy do majątku wspólnego, bez względu na to, kto jest wpisany w księdze wieczystej. Udziały są co do zasady równe, choć są wyjątki." };
  }
  return { label: "Do ustalenia", certainty: "zależy od szczegółów", text: "Status mieszkania zależy od daty zakupu, ustroju majątkowego i źródła pieniędzy. Sprawdź akt notarialny, ewentualną umowę majątkową i historię spłat." };
}

export function computeMoney(input: HousingAnswers): Money {
  const a = normalizeAnswers(input);
  const value = a.value && a.value > 0 ? a.value : undefined;
  const balance = hasLoan(a) && a.balance !== undefined && a.balance >= 0 ? a.balance : hasLoan(a) ? undefined : 0;
  const pct = a.saleCostPct ?? DEFAULT_SALE_COST_PCT;
  if (value === undefined || balance === undefined) return { value, balance, negative: false };
  const equity = value - balance;
  const saleCosts = Math.round((value * pct) / 100);
  const equityAfterCosts = equity - saleCosts;
  // Ilustracja połowy tylko tam, gdzie równe udziały są prawdopodobne i nie zgłoszono pieniędzy osobistych.
  const equalShares = ((a.relation === "marriage" && a.purchase === "during" && a.regime === "wspolnosc") || a.owner === "both") && a.ownFunds !== "yes";
  return {
    value,
    balance,
    equity,
    saleCosts,
    equityAfterCosts,
    ltv: hasLoan(a) && value > 0 ? balance / value : undefined,
    negative: equity < 0,
    halfIllustration: equalShares && equity > 0 ? equity / 2 : undefined,
  };
}

export function buildScenarios(input: HousingAnswers): Scenario[] {
  const a = normalizeAnswers(input);
  const money = computeMoney(a);
  const loan = hasLoan(a);
  const list: Scenario[] = [];

  /* --- Sprzedaż --- */
  {
    let score = 1;
    const why: string[] = [];
    if (a.sale === "yes") { score += 3; why.push("Oboje dopuszczacie sprzedaż."); }
    if (a.sale === "maybe") { score += 1; why.push("Sprzedaż jest dla Was opcją do rozważenia."); }
    if (a.sale === "no") { score -= 3; why.push("Na razie sprzedaż nie jest brana pod uwagę."); }
    if (a.stay === "nobody") { score += 2; why.push("Żadne z Was nie planuje zostać w mieszkaniu."); }
    if (a.afford === "no") { score += 1; why.push("Samodzielna spłata raty może być trudna."); }
    const watch = [
      "Do czasu spłaty kredytu z ceny sprzedaży oboje kredytobiorcy nadal odpowiadają za raty.",
      "Potrzebna jest zgoda wszystkich właścicieli na warunki sprzedaży.",
    ];
    if (money.negative) { score -= 1; watch.unshift("Saldo kredytu przekracza podaną wartość mieszkania. Cena może nie wystarczyć na spłatę kredytu. Trzeba ustalić, kto pokryje różnicę."); }
    if (loan) watch.push("Zapytaj bank o koszty wcześniejszej spłaty. Zależą od umowy i banku.");
    list.push({
      id: "sale",
      title: "Sprzedaż mieszkania i rozliczenie środków",
      summary: `Sprzedajecie mieszkanie${loan ? ", z ceny spłacacie kredyt," : ""} i dzielicie resztę według ustaleń${a.relation === "marriage" ? " lub zasad podziału majątku" : " lub udziałów"}.`,
      score,
      fit: "możliwe",
      why,
      steps: [
        "Ustalcie orientacyjną cenę, np. z wyceny rzeczoznawcy lub ofert w okolicy.",
        loan ? "Zapytajcie bank o saldo do spłaty i o to, jak u nich wygląda sprzedaż mieszkania z hipoteką." : "Przygotujcie akt notarialny i numer księgi wieczystej.",
        "Ustalcie na piśmie, kto płaci raty i opłaty do dnia sprzedaży i jak podzielicie kwotę.",
        ...(a.relation === "marriage" ? ["Zdecydujcie, czy podział pieniędzy ma być częścią podziału całego majątku."] : []),
      ],
      watch,
    });
  }

  /* --- Mieszkanie zostaje przy właścicielu (gdy jedna osoba jest właścicielem i to raczej majątek osobisty) --- */
  const ownerKeepsRelevant = singleOwner(a) && (a.relation === "informal" || a.purchase === "before" || a.regime === "rozdzielnosc");
  if (ownerKeepsRelevant) {
    let score = 2;
    const why = ["Z Twoich odpowiedzi wynika, że nieruchomość jest formalnie własnością jednej osoby."];
    const ownerStays = (a.owner === "me" && a.stay === "me") || (a.owner === "partner" && a.stay === "partner");
    if (ownerStays) { score += 2; why.push("Osoba będąca właścicielem chce zostać w mieszkaniu."); }
    if (a.loan === "joint") why.push("Kredyt jest jednak wspólny. To wymaga ustaleń z bankiem.");
    list.push({
      id: "ownerKeeps",
      title: "Mieszkanie zostaje przy właścicielu, z ewentualnym rozliczeniem wkładów",
      summary: "Właściciel zachowuje mieszkanie. Do wyjaśnienia zostaje, czy druga osoba może rozliczyć swój wkład w zakup lub raty.",
      score,
      fit: "możliwe",
      why,
      steps: [
        "Zbierzcie dokumenty: kto i z jakich pieniędzy płacił wkład własny, raty, remonty.",
        a.relation === "marriage" ? "Sprawdź z prawnikiem, czy spłata rat ze wspólnych pieniędzy daje nakłady do rozliczenia." : "Sprawdź z prawnikiem, czy wpłaty drugiej osoby mogą podlegać rozliczeniu.",
        a.loan === "joint" ? "Zapytaj bank, czy i na jakich warunkach może zwolnić drugiego kredytobiorcę." : "Ustalcie termin wyprowadzki i rozliczenie bieżących opłat.",
      ],
      watch: [
        "Formalna własność nie wyklucza rozliczeń między Wami.",
        ...(a.loan === "joint" ? ["Druga osoba jako współkredytobiorca odpowiada wobec banku, dopóki bank nie zgodzi się na zmianę."] : []),
      ],
    });
  }

  /* --- Jedna osoba zostaje i spłaca drugą --- */
  if (!ownerKeepsRelevant || a.owner === "both") {
    let score = 0;
    const why: string[] = [];
    if (a.stay === "me" || a.stay === "partner") { score += 3; why.push(a.stay === "me" ? "Chcesz zostać w mieszkaniu." : "Druga osoba chce zostać w mieszkaniu."); }
    if (a.stay === "both") { score += 1; why.push("Oboje chcielibyście zostać. Trzeba ustalić, kto zostaje."); }
    if (a.afford === "yes") { score += 2; why.push("Osoba, która zostaje, prawdopodobnie poradzi sobie z ratą."); }
    if (a.afford === "no") { score -= 2; why.push("Samodzielna spłata raty może przekraczać możliwości osoby, która zostaje."); }
    if (a.afford === "unsure") why.push("Nie wiadomo jeszcze, czy jedna osoba udźwignie ratę. Warto to sprawdzić w banku.");
    if (a.sale === "no") score += 1;
    if (a.stay === "nobody") score -= 2;
    const watch = [
      ...(loan ? ["Przejęcie kredytu przez jedną osobę wymaga zgody banku. Bank prawdopodobnie oceni jej zdolność kredytową według własnych zasad. Bez zgody banku oboje odpowiadacie za cały kredyt."] : []),
      "Spłata drugiej osoby wymaga pieniędzy: oszczędności, nowego kredytu albo innego składnika majątku.",
      "Przeniesienie własności wymaga aktu notarialnego lub orzeczenia sądu.",
    ];
    list.push({
      id: "buyout",
      title: "Jedna osoba zostaje w mieszkaniu i rozlicza się z drugą",
      summary: loan ? "Osoba, która zostaje, przejmuje mieszkanie i (jeśli bank się zgodzi) kredyt. Druga osoba dostaje uzgodnioną spłatę albo inny składnik majątku." : "Osoba, która zostaje, przejmuje mieszkanie. Druga osoba dostaje uzgodnioną spłatę albo inny składnik majątku.",
      score,
      fit: "możliwe",
      why,
      steps: [
        loan ? "Zapytaj bank, czy może zwolnić jednego kredytobiorcę albo czy osoba, która zostaje, może przenieść kredyt do innego banku." : "Ustalcie wartość mieszkania, od której liczycie rozliczenie.",
        "Policzcie, ile wynosiłaby spłata drugiej osoby i skąd będą na nią pieniądze.",
        "Ustalcie, czy rozliczenie obejmuje tylko mieszkanie, czy też inne rzeczy (np. samochód, oszczędności).",
        a.relation === "marriage" ? "Podział majątku można zrobić umową (przy nieruchomości u notariusza) albo w sądzie." : "Współwłasność można znieść umową u notariusza albo w sądzie.",
      ],
      watch,
    });
  }

  /* --- Dalsza współwłasność --- */
  if (a.owner !== "me" && a.owner !== "partner") {
    let score = 0;
    const why: string[] = [];
    if (a.sale === "no") { score += 1; why.push("Obecnie nie planujecie sprzedaży."); }
    if (a.afford === "no" && (a.stay === "me" || a.stay === "partner")) { score += 2; why.push("Gdy jedna osoba nie udźwignie raty sama, rozwiązanie przejściowe może dać czas."); }
    if (a.stay === "both") { score += 1; why.push("Oboje chcecie zachować mieszkanie."); }
    if (a.stay === "nobody") { score += 1; why.push("Mieszkanie mogłoby np. zostać wynajęte do czasu decyzji."); }
    list.push({
      id: "coown",
      title: "Dalsza współwłasność i odrębne zasady korzystania",
      summary: "Na razie zostajecie współwłaścicielami. Ustalacie na piśmie, kto korzysta z mieszkania, kto płaci raty i opłaty oraz kiedy wrócicie do tematu.",
      score,
      fit: "możliwe",
      why,
      steps: [
        loan ? "Spiszcie zasady: kto mieszka, kto płaci raty, czynsz, media i remonty." : "Spiszcie zasady: kto mieszka, kto płaci czynsz, media i remonty.",
        "Ustalcie termin, po którym wrócicie do decyzji (np. koniec roku szkolnego).",
        "Określcie, co się stanie, jeśli jedna osoba przestanie płacić swoją część.",
      ],
      watch: [
        ...(a.loan === "joint" ? ["Wspólny kredyt nadal obciąża oboje, także w historii kredytowej. To może utrudnić np. nowy kredyt."] : []),
        "Rozwiązania „na chwilę” często prowadzą do sporów, jeśli zasady nie są spisane.",
      ],
    });
  }

  list.sort((x, y) => y.score - x.score);
  const top = list.slice(0, 3);
  top.forEach((s, i) => {
    s.fit = i === 0 && s.score >= 3 ? "dobre" : s.score >= 1 ? "możliwe" : "trudniejsze";
  });
  return top;
}

export function buildRisks(input: HousingAnswers): string[] {
  const a = normalizeAnswers(input);
  const m = computeMoney(a);
  const r: string[] = [];
  if (a.loan === "joint") r.push("Rozwód ani rozstanie nie zwalnia żadnego z Was z kredytu. Każdy kredytobiorca odpowiada za cały dług, dopóki bank nie zgodzi się na zmianę umowy.");
  if (a.loan === "joint") r.push("Opóźnienia w spłacie obciążają historię kredytową obojga, bez względu na to, kto mieszka w mieszkaniu.");
  if ((a.loan === "me" || a.loan === "partner") && a.owner === "both") r.push("Kredyt jest na jedną osobę, a mieszkanie na dwie. Rozliczenie spłaconych rat może wymagać analizy.");
  if (a.loan === "unsure") r.push("Nie wiesz, czy i na kogo jest kredyt. Sprawdź to w umowie lub w banku, bo od tego zależą scenariusze.");
  if (m.negative) r.push("Saldo kredytu jest wyższe niż podana wartość mieszkania. Sprzedaż może nie pokryć całego długu.");
  if (m.ltv !== undefined && m.ltv > LTV_HIGH && !m.negative) r.push(`Kredyt to ponad ${Math.round(LTV_HIGH * 100)}% podanej wartości mieszkania. Przejęcie lub przeniesienie kredytu przez jedną osobę może być wtedy trudniejsze. Każdy bank ocenia to po swojemu.`);
  if (a.stay === "both") r.push("Oboje chcecie zostać. To częsty punkt sporny. Pomaga ustalenie kryteriów (np. potrzeby dzieci, możliwości finansowe), zanim padną konkretne propozycje.");
  if (hasLoan(a) && (a.afford === "no" || a.afford === "unsure")) r.push("Jeśli osoba, która zostaje, nie ma wystarczającej zdolności kredytowej, bank może nie zgodzić się, by sama odpowiadała za kredyt.");
  if (!hasLoan(a) && a.afford === "no") r.push("Samodzielne utrzymanie mieszkania (czynsz, media, podatek) może być trudne dla osoby, która zostaje.");
  if (a.owner === "unsure" || a.purchase === "unsure" || a.regime === "unsure") r.push("Nie wiadomo, kto jest właścicielem albo jaki jest ustrój majątkowy. Wyjaśnij to na początku, bo zmienia możliwe rozwiązania.");
  if (a.ownFunds === "yes") r.push("Pieniądze z darowizny, spadku lub sprzed ślubu mogą wpływać na rozliczenia. Zachowaj potwierdzenia przelewów i umowy.");
  r.push("Działania na własną rękę (np. wymiana zamków, wstrzymanie płatności) mogą zaostrzyć konflikt i mieć skutki prawne. Najpierw skonsultuj się z prawnikiem.");
  return r;
}

export function bankChecklist(input: HousingAnswers): string[] {
  const a = normalizeAnswers(input);
  if (!hasLoan(a)) return [];
  const l = [
    "Aktualne saldo kredytu i harmonogram spłat.",
    "Kto jest stroną umowy (kredytobiorcy, ewentualni poręczyciele).",
    ...(a.loan === "joint" || a.loan === "unsure" ? ["Czy bank może zwolnić jednego kredytobiorcę z długu i jakich dokumentów wymaga."] : []),
    ...(someoneStays(a) ? ["Jak bank oceni zdolność kredytową osoby, która miałaby zostać z kredytem sama, i jakie LTV dopuszcza."] : []),
    "Warunki i koszty wcześniejszej spłaty (całkowitej lub częściowej).",
    ...(a.sale !== "no" ? ["Jak w tym banku wygląda sprzedaż mieszkania z hipoteką i zgoda na jej wykreślenie."] : []),
    ...(someoneStays(a) ? ["Czy jedna osoba może przenieść kredyt do innego banku (refinansowanie)."] : []),
  ];
  if (a.afford === "no" || a.afford === "unsure") l.push("Czy można czasowo obniżyć ratę lub wydłużyć okres kredytu i ile to kosztuje.");
  return l;
}

export function agreementsToDiscuss(input: HousingAnswers): string[] {
  const a = normalizeAnswers(input);
  const l = [
    "Kto mieszka w mieszkaniu do czasu ostatecznego rozwiązania.",
    hasLoan(a) ? "Kto płaci raty kredytu w okresie przejściowym i jak to rozliczycie." : "Kto ponosi opłaty (czynsz, media, podatek od nieruchomości) w okresie przejściowym.",
    "Jak ustalicie wartość mieszkania (rzeczoznawca, średnia z ofert, wspólna wycena).",
    hasLoan(a) ? "Preferowany scenariusz i plan B, jeśli bank nie zgodzi się na zmianę umowy." : "Preferowany scenariusz i plan B.",
    hasLoan(a) ? "Terminy: kiedy sprawdzicie możliwości w banku i kiedy podejmiecie decyzję." : "Termin, w którym podejmiecie decyzję.",
  ];
  if (a.relation === "marriage") l.push("Czy mieszkanie rozliczacie osobno, czy w ramach podziału całego majątku wspólnego.");
  return l;
}

export function documentsList(input: HousingAnswers): string[] {
  const a = normalizeAnswers(input);
  const l = [
    "Akt notarialny zakupu mieszkania.",
    "Numer księgi wieczystej (odpis pobierzesz online w Elektronicznych Księgach Wieczystych).",
  ];
  if (hasLoan(a)) l.push("Umowa kredytowa z aneksami i aktualny harmonogram spłat.", "Zaświadczenie z banku o saldzie zadłużenia.");
  if (a.relation === "marriage") l.push("Odpis aktu małżeństwa.");
  if (a.regime === "rozdzielnosc" || a.regime === "inny") l.push("Umowa majątkowa małżeńska (intercyza) lub orzeczenie o ustroju majątkowym.");
  if (a.ownFunds === "yes" || a.purchase === "before" || singleOwner(a)) l.push("Dowody, skąd były pieniądze: umowy darowizny, dokumenty spadkowe, potwierdzenia wpłat wkładu i rat.");
  l.push("Faktury i umowy za większe remonty.");
  return l;
}

export function questionsForExperts(input: HousingAnswers): string[] {
  const a = normalizeAnswers(input);
  const q: string[] = [];
  if (a.relation === "marriage") {
    q.push("Czy w mojej sytuacji mieszkanie należy do majątku wspólnego, czy osobistego?");
    q.push("Czy podział majątku zrobić w wyroku rozwodowym, osobno w sądzie, czy umową u notariusza?");
    if (a.purchase === "before" || a.ownFunds === "yes") q.push("Czy spłata rat lub remonty ze wspólnych pieniędzy dają prawo do rozliczenia nakładów?");
    if (someoneStays(a) || a.stay === "unsure") q.push("Czy sąd w wyroku rozwodowym może orzec o korzystaniu ze wspólnego mieszkania i co to znaczy w praktyce?");
  } else {
    if (a.owner === "both") q.push("Jak w praktyce wygląda zniesienie współwłasności: umową i w sądzie?");
    q.push("Czy wpłaty, które przekazywaliśmy na zakup lub raty, mogą podlegać rozliczeniu?");
  }
  if (hasLoan(a)) {
    if (a.loan === "joint" || a.loan === "unsure") q.push("(Bank) Na jakich warunkach jeden z kredytobiorców może zostać zwolniony z długu?");
    if (someoneStays(a)) q.push("(Bank lub doradca kredytowy) Jakie dochody i jakie LTV są potrzebne, żeby jedna osoba została z kredytem sama?");
  }
  q.push("Jak zabezpieczyć ustalenia z okresu przejściowego (raty, opłaty, korzystanie z mieszkania)?");
  return q;
}
