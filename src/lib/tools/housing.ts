/**
 * Narzędzie 1 — Mieszkanie i kredyt po rozstaniu.
 * Logika deterministyczna: scenariusze i listy wynikają wyłącznie z odpowiedzi.
 * Nie jest to prawny podział majątku ani kalkulacja kwoty do wypłaty.
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

export const isMarriage = (a: HousingAnswers) => a.relation === "marriage";
export const hasLoan = (a: HousingAnswers) => !!a.loan && a.loan !== "none";
export const someoneStays = (a: HousingAnswers) => a.stay === "me" || a.stay === "partner" || a.stay === "both";
const singleOwner = (a: HousingAnswers) => a.owner === "me" || a.owner === "partner";

export function propertyStatus(a: HousingAnswers): PropertyStatus {
  if (a.relation === "informal") {
    if (a.owner === "both")
      return { label: "Współwłasność (Kodeks cywilny)", certainty: "prawdopodobnie", text: "W związku nieformalnym nie ma wspólności majątkowej małżeńskiej. Jeśli oboje figurujecie jako właściciele, zwykle jest to współwłasność w częściach ułamkowych — w udziałach wskazanych w akcie notarialnym. Jej zniesienie może nastąpić umową albo w sądzie." };
    if (singleOwner(a))
      return { label: "Własność jednej osoby", certainty: "zależy od szczegółów", text: "Nieruchomość należy do osoby wpisanej jako właściciel. Jeśli druga osoba dokładała się do zakupu lub spłaty kredytu, możliwość rozliczenia tych wpłat zależy od okoliczności i wymaga indywidualnej analizy." };
    return { label: "Do ustalenia", certainty: "zależy od szczegółów", text: "Sprawdź w akcie notarialnym lub księdze wieczystej, kto jest właścicielem i w jakich udziałach. Od tego zależą możliwe rozwiązania." };
  }
  // małżeństwo
  if (a.regime === "rozdzielnosc")
    return { label: "Rozdzielność majątkowa", certainty: "zależy od szczegółów", text: a.owner === "both" ? "Przy rozdzielności majątkowej wspólny zakup oznacza zwykle współwłasność w częściach ułamkowych. Rozliczenie odbywa się według zasad współwłasności, a znaczenie może mieć data zawarcia umowy majątkowej." : "Przy rozdzielności majątkowej każdy małżonek ma własny majątek. Znaczenie ma jednak, kiedy zawarto umowę i z jakich środków kupiono mieszkanie." };
  if (a.purchase === "before")
    return { label: "Prawdopodobnie majątek osobisty", certainty: "zależy od szczegółów", text: "Przedmioty nabyte przed powstaniem wspólności co do zasady należą do majątku osobistego (art. 33 KRO). Jeśli jednak raty kredytu były spłacane ze wspólnych pieniędzy w trakcie małżeństwa, może pojawić się kwestia rozliczenia nakładów (art. 45 KRO)." };
  if (a.purchase === "during" && (a.regime === "wspolnosc" || a.regime === undefined)) {
    if (a.ownFunds === "yes")
      return { label: "Majątek wspólny lub mieszany", certainty: "zależy od szczegółów", text: "Mieszkanie kupione w trakcie wspólności zwykle wchodzi do majątku wspólnego (art. 31 KRO). Jeśli użyto pieniędzy z darowizny, spadku lub sprzed ślubu, część może być majątkiem osobistym albo podlegać rozliczeniu — to wymaga analizy dokumentów." };
    return { label: "Prawdopodobnie majątek wspólny", certainty: "prawdopodobnie", text: "Mieszkanie kupione w trakcie trwania wspólności majątkowej co do zasady należy do majątku wspólnego (art. 31 KRO) — niezależnie od tego, kto jest wpisany w księdze wieczystej. Udziały w majątku wspólnym są co do zasady równe (art. 43 KRO), z wyjątkami." };
  }
  return { label: "Do ustalenia", certainty: "zależy od szczegółów", text: "Status mieszkania zależy od daty zakupu, ustroju majątkowego i źródła pieniędzy. Warto sprawdzić akt notarialny, ewentualną umowę majątkową i historię spłat." };
}

export function computeMoney(a: HousingAnswers): Money {
  const value = a.value && a.value > 0 ? a.value : undefined;
  const balance = hasLoan(a) && a.balance !== undefined && a.balance >= 0 ? a.balance : hasLoan(a) ? undefined : 0;
  const pct = a.saleCostPct ?? DEFAULT_SALE_COST_PCT;
  if (value === undefined || balance === undefined) return { value, balance, negative: false };
  const equity = value - balance;
  const saleCosts = Math.round((value * pct) / 100);
  const equityAfterCosts = equity - saleCosts;
  const equalShares = (a.relation === "marriage" && a.purchase === "during" && a.regime !== "rozdzielnosc") || a.owner === "both";
  return {
    value,
    balance,
    equity,
    saleCosts,
    equityAfterCosts,
    ltv: value > 0 ? balance / value : undefined,
    negative: equity < 0,
    halfIllustration: equalShares && equity > 0 ? equity / 2 : undefined,
  };
}

export function buildScenarios(a: HousingAnswers): Scenario[] {
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
    if (money.negative) { score -= 1; watch.unshift("Saldo kredytu przekracza podaną wartość mieszkania — cena sprzedaży może nie wystarczyć na spłatę całego kredytu. Trzeba ustalić, kto i jak pokryje różnicę."); }
    if (loan) watch.push("Zapytaj bank o warunki wcześniejszej spłaty i ewentualne prowizje.");
    list.push({
      id: "sale",
      title: "Sprzedaż mieszkania i rozliczenie środków",
      summary: loan ? "Sprzedajecie mieszkanie, z ceny spłacacie kredyt, a pozostałą kwotę dzielicie według ustaleń lub zasad podziału majątku." : "Sprzedajecie mieszkanie i dzielicie uzyskaną kwotę według ustaleń lub zasad podziału majątku.",
      score,
      fit: "możliwe",
      why,
      steps: [
        "Ustalcie wspólnie orientacyjną cenę (np. na podstawie wyceny rzeczoznawcy lub ofert w okolicy).",
        loan ? "Poproście bank o zaświadczenie o saldzie do spłaty i procedurze zwolnienia hipoteki." : "Przygotujcie dokumenty nieruchomości (akt notarialny, numer księgi wieczystej).",
        "Ustalcie na piśmie, kto ponosi raty i opłaty do dnia sprzedaży oraz jak podzielicie kwotę.",
        "Rozważcie, czy podział środków ma być częścią szerszego podziału majątku.",
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
    if (a.loan === "joint") why.push("Kredyt jest jednak wspólny — to wymaga ustaleń z bankiem.");
    list.push({
      id: "ownerKeeps",
      title: "Mieszkanie zostaje przy właścicielu, z ewentualnym rozliczeniem wkładów",
      summary: "Właściciel zachowuje mieszkanie. Do wyjaśnienia pozostaje, czy druga osoba ma roszczenia z tytułu wkładu w zakup lub spłatę kredytu.",
      score,
      fit: "możliwe",
      why,
      steps: [
        "Zbierzcie dokumenty pokazujące, kto i z jakich pieniędzy płacił (wkład własny, raty, remonty).",
        a.relation === "marriage" ? "Sprawdź z prawnikiem, czy spłata rat z majątku wspólnego oznacza nakłady do rozliczenia (art. 45 KRO)." : "Sprawdź z prawnikiem, czy wpłaty drugiej osoby mogą podlegać rozliczeniu.",
        a.loan === "joint" ? "Zapytaj bank, czy możliwe jest zwolnienie drugiego kredytobiorcy i na jakich warunkach." : "Ustalcie termin wyprowadzki i rozliczenie bieżących opłat.",
      ],
      watch: [
        "Formalna własność nie przesądza automatycznie o braku rozliczeń między Wami.",
        ...(a.loan === "joint" ? ["Druga osoba, jako współkredytobiorca, nadal odpowiada wobec banku, dopóki bank nie zgodzi się na zmianę."] : []),
      ],
    });
  }

  /* --- Jedna osoba zostaje i spłaca drugą --- */
  if (!ownerKeepsRelevant || a.owner === "both") {
    let score = 0;
    const why: string[] = [];
    if (a.stay === "me" || a.stay === "partner") { score += 3; why.push(a.stay === "me" ? "Chcesz zostać w mieszkaniu." : "Druga osoba chce zostać w mieszkaniu."); }
    if (a.stay === "both") { score += 1; why.push("Oboje chcielibyście zostać — potrzebne będzie porozumienie, kto zostaje."); }
    if (a.afford === "yes") { score += 2; why.push("Osoba, która zostaje, prawdopodobnie poradzi sobie z ratą."); }
    if (a.afford === "no") { score -= 2; why.push("Samodzielna spłata raty może przekraczać możliwości osoby, która zostaje."); }
    if (a.afford === "unsure") why.push("Nie wiadomo jeszcze, czy jedna osoba udźwignie ratę — warto to sprawdzić w banku.");
    if (a.sale === "no") score += 1;
    if (a.stay === "nobody") score -= 2;
    const watch = [
      ...(loan ? ["Przejęcie kredytu przez jedną osobę wymaga zgody banku. Bank zwykle ponownie bada jej zdolność kredytową. Bez zgody banku oboje nadal odpowiadacie za cały kredyt."] : []),
      "Spłata drugiej osoby wymaga środków (oszczędności, nowego kredytu lub innego składnika majątku).",
      "Przeniesienie własności nieruchomości wymaga formy aktu notarialnego lub orzeczenia sądu.",
    ];
    list.push({
      id: "buyout",
      title: "Jedna osoba zostaje w mieszkaniu i rozlicza się z drugą",
      summary: loan ? "Osoba, która zostaje, przejmuje mieszkanie i — za zgodą banku — kredyt, a drugiej osobie przysługuje uzgodnione rozliczenie (spłata lub inny składnik majątku)." : "Osoba, która zostaje, przejmuje mieszkanie, a drugiej osobie przysługuje uzgodnione rozliczenie (spłata lub inny składnik majątku).",
      score,
      fit: "możliwe",
      why,
      steps: [
        loan ? "Zapytaj bank o możliwość zwolnienia jednego kredytobiorcy lub refinansowania kredytu przez osobę, która zostaje." : "Ustalcie wartość mieszkania, od której liczycie rozliczenie.",
        "Policzcie, ile wynosiłaby spłata drugiej osoby i skąd będą na nią środki.",
        "Ustalcie, czy rozliczenie obejmuje tylko mieszkanie, czy cały majątek (np. samochód, oszczędności).",
        a.relation === "marriage" ? "Podział majątku można przeprowadzić umową (przy nieruchomości — u notariusza) albo w sądzie." : "Zniesienie współwłasności można przeprowadzić umową u notariusza albo w sądzie.",
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
      summary: "Na razie pozostajecie współwłaścicielami i ustalacie na piśmie, kto korzysta z mieszkania, kto płaci raty i opłaty oraz kiedy wrócicie do tematu (np. sprzedaż w określonym terminie).",
      score,
      fit: "możliwe",
      why,
      steps: [
        "Spiszcie zasady: kto mieszka, kto płaci raty, czynsz, media i remonty, jak liczycie te koszty.",
        "Ustalcie termin lub zdarzenie, po którym wrócicie do decyzji (np. koniec roku szkolnego).",
        "Określcie, co się stanie, jeśli jedna osoba przestanie płacić swoją część.",
      ],
      watch: [
        "Wspólny kredyt nadal obciąża oboje — także w raportach kredytowych, co może utrudnić np. wynajem czy nowy kredyt.",
        "Rozwiązania „na chwilę” bywają źródłem sporów, jeśli zasady nie są spisane.",
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

export function buildRisks(a: HousingAnswers): string[] {
  const m = computeMoney(a);
  const r: string[] = [];
  if (a.loan === "joint") r.push("Rozwód lub rozstanie nie zwalnia żadnego z Was z odpowiedzialności wobec banku. Każdy kredytobiorca odpowiada za całość długu (solidarnie), dopóki bank nie zgodzi się na zmianę umowy.");
  if (a.loan === "joint") r.push("Opóźnienia w spłacie obciążają oboje — także Twoją historię kredytową — niezależnie od tego, kto mieszka w mieszkaniu.");
  if ((a.loan === "me" || a.loan === "partner") && a.owner === "both") r.push("Kredyt jest na jedną osobę, a mieszkanie na dwie — rozliczenie spłaconych rat może wymagać analizy.");
  if (m.negative) r.push("Saldo kredytu jest wyższe niż podana wartość mieszkania. Sprzedaż może nie pokryć całego długu.");
  if (m.ltv !== undefined && m.ltv > 0.8 && !m.negative) r.push("Kredyt stanowi ponad 80% wartości mieszkania — refinansowanie przez jedną osobę może być trudniejsze.");
  if (a.stay === "both") r.push("Oboje chcecie zostać — to częsty punkt sporny. Pomocne bywa ustalenie kryteriów (np. potrzeby dzieci, możliwości finansowe) zanim padną konkretne propozycje.");
  if (a.afford === "no" || a.afford === "unsure") r.push("Jeśli jedna osoba nie ma zdolności kredytowej, bank może nie zgodzić się na jej samodzielną odpowiedzialność.");
  if (a.owner === "unsure" || a.purchase === "unsure" || a.regime === "unsure") r.push("Niepewność co do własności lub ustroju majątkowego — warto ją wyjaśnić na początku, bo zmienia dostępne rozwiązania.");
  if (a.ownFunds === "yes") r.push("Pieniądze z darowizny, spadku lub sprzed ślubu mogą wpływać na rozliczenia — zachowaj potwierdzenia przelewów i umowy.");
  r.push("Jednostronne działania (np. wymiana zamków, wstrzymanie płatności) mogą zaostrzyć konflikt i mieć skutki prawne — przed nimi skonsultuj się z prawnikiem.");
  return r;
}

export function bankChecklist(a: HousingAnswers): string[] {
  if (!hasLoan(a)) return [];
  const l = [
    "Aktualne saldo kredytu i harmonogram spłat.",
    "Kto jest stroną umowy (kredytobiorcy, ewentualni poręczyciele).",
    "Czy bank dopuszcza zwolnienie jednego kredytobiorcy z długu i jakie dokumenty są do tego potrzebne.",
    "Jak bank oceni zdolność kredytową osoby, która miałaby zostać z kredytem sama.",
    "Warunki i koszty wcześniejszej spłaty (całkowitej lub częściowej).",
    "Procedura przy sprzedaży mieszkania z hipoteką (promesa, zgoda na wykreślenie hipoteki).",
    "Czy możliwe jest refinansowanie kredytu w innym banku przez jedną osobę.",
  ];
  if (a.afford === "no" || a.afford === "unsure") l.push("Czy możliwe jest czasowe obniżenie raty lub zmiana okresu kredytowania — i jakie są tego koszty.");
  return l;
}

export function agreementsToDiscuss(a: HousingAnswers): string[] {
  const l = [
    "Kto mieszka w mieszkaniu do czasu ostatecznego rozwiązania.",
    hasLoan(a) ? "Kto płaci raty kredytu w okresie przejściowym i jak to rozliczycie." : "Kto ponosi opłaty (czynsz, media, podatek od nieruchomości) w okresie przejściowym.",
    "Jak ustalicie wartość mieszkania (wspólna wycena, rzeczoznawca, średnia z ofert).",
    "Preferowany scenariusz i plan B, jeśli bank nie zgodzi się na zmianę umowy.",
    "Terminy: kiedy sprawdzicie możliwości w banku i kiedy podejmiecie decyzję.",
  ];
  if (a.relation === "marriage") l.push("Czy mieszkanie rozliczacie osobno, czy w ramach podziału całego majątku wspólnego.");
  return l;
}

export function documentsList(a: HousingAnswers): string[] {
  const l = [
    "Akt notarialny zakupu mieszkania.",
    "Numer księgi wieczystej (odpis można pobrać online w systemie Elektronicznych Ksiąg Wieczystych).",
  ];
  if (hasLoan(a)) l.push("Umowa kredytowa z aneksami i aktualny harmonogram spłat.", "Zaświadczenie z banku o saldzie zadłużenia.");
  if (a.relation === "marriage") l.push("Odpis aktu małżeństwa.");
  if (a.regime === "rozdzielnosc" || a.regime === "inny") l.push("Umowa majątkowa małżeńska (intercyza) lub orzeczenie o ustroju majątkowym.");
  if (a.ownFunds === "yes" || a.purchase === "before") l.push("Dowody źródeł finansowania: umowy darowizny, dokumenty spadkowe, potwierdzenia wpłat wkładu własnego i rat.");
  l.push("Dokumenty dotyczące większych remontów i nakładów (faktury, umowy).");
  return l;
}

export function questionsForExperts(a: HousingAnswers): string[] {
  const q: string[] = [];
  if (a.relation === "marriage") {
    q.push("Czy w mojej sytuacji mieszkanie należy do majątku wspólnego, czy osobistego?");
    q.push("Czy podział majątku warto przeprowadzić w wyroku rozwodowym, osobno w sądzie, czy umową u notariusza?");
    if (a.purchase === "before" || a.ownFunds === "yes") q.push("Czy spłata rat lub remonty z pieniędzy wspólnych dają prawo do rozliczenia nakładów?");
    q.push("Czy sąd w wyroku rozwodowym może orzec o sposobie korzystania ze wspólnie zajmowanego mieszkania i co to oznacza w praktyce?");
  } else {
    q.push("Jak w praktyce wygląda zniesienie współwłasności nieruchomości — umownie i sądowo?");
    q.push("Czy wpłaty, które przekazywaliśmy na zakup lub raty, mogą podlegać rozliczeniu?");
  }
  if (hasLoan(a)) {
    q.push("(Bank) Na jakich warunkach jeden z kredytobiorców może zostać zwolniony z długu?");
    q.push("(Bank) Jakie dochody musi wykazać osoba, która chce zostać z kredytem sama?");
  }
  q.push("Jak zabezpieczyć ustalenia z okresu przejściowego (raty, opłaty, korzystanie z mieszkania)?");
  return q;
}
