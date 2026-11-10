/**
 * „Majątek wspólny czy osobisty?” — wstępna kwalifikacja składników wg KRO (art. 31, 33, 43, 45).
 * Wynik to „prawdopodobny status” z uzasadnieniem — nie rozstrzygnięcie prawne.
 */
export type Relation = "marriage" | "informal";
export type Regime = "wspolnosc" | "rozdzielnosc-od-poczatku" | "rozdzielnosc-w-trakcie" | "nie-wiem";
export type AssetType = "nieruchomosc" | "dzialka" | "samochod" | "oszczednosci" | "inwestycje" | "firma" | "emerytalne" | "ruchomosci" | "dlug" | "inne";
export type When = "przed" | "w-trakcie" | "po";
export type Funds = "wspolne" | "przedslubne" | "darowizna" | "spadek" | "mieszane" | "nie-wiem";
export type Owner = "razem" | "ja" | "partner" | "nie-wiem"; // dla związku nieformalnego

export type Asset = {
  id: string;
  type: AssetType;
  label?: string;
  value?: number;
  when?: When;
  funds?: Funds;
  donorJoint?: "tak" | "nie" | "nie-wiem";
  laterJointFunds?: "tak" | "nie" | "nie-wiem"; // dla nabytych przed ślubem: spłaty/inwestycje ze wspólnych pieniędzy
  owner?: Owner; // związek nieformalny
};

export type Status = "wspolny" | "osobisty" | "mieszany" | "analiza" | "wspolwlasnosc";
export const STATUS_LABEL: Record<Status, string> = {
  wspolny: "Prawdopodobnie majątek wspólny",
  osobisty: "Prawdopodobnie majątek osobisty",
  mieszany: "Mieszany — możliwe nakłady",
  analiza: "Wymaga analizy",
  wspolwlasnosc: "Współwłasność (Kodeks cywilny)",
};

export const TYPE_LABEL: Record<AssetType, string> = {
  nieruchomosc: "Mieszkanie / dom",
  dzialka: "Działka",
  samochod: "Samochód",
  oszczednosci: "Oszczędności / konto",
  inwestycje: "Inwestycje",
  firma: "Firma / udziały",
  emerytalne: "PPK / IKE / IKZE / OFE",
  ruchomosci: "Ruchomości (sprzęty, meble)",
  dlug: "Dług / kredyt",
  inne: "Inne",
};

export type Classification = { status: Status; reason: string; basis: string; docs: string[]; nakład?: string };

const DOCS: Record<AssetType, string[]> = {
  nieruchomosc: ["Akt notarialny zakupu", "Odpis z księgi wieczystej", "Umowa kredytu i historia spłat"],
  dzialka: ["Akt notarialny", "Odpis z księgi wieczystej"],
  samochod: ["Umowa kupna / faktura", "Dowód rejestracyjny"],
  oszczednosci: ["Wyciągi z rachunków (saldo na dzień ustania wspólności)"],
  inwestycje: ["Potwierdzenia nabycia i wyciągi z rachunku maklerskiego / funduszy"],
  firma: ["Dokumenty firmy (CEIDG/KRS), umowa spółki, sprawozdania", "Ewidencja środków trwałych"],
  emerytalne: ["Zestawienie z instytucji prowadzącej PPK/IKE/IKZE/OFE"],
  ruchomosci: ["Faktury lub potwierdzenia zakupu większych sprzętów"],
  dlug: ["Umowa kredytu/pożyczki, harmonogram, aktualne saldo", "Informacja, na co przeznaczono środki"],
  inne: ["Dokumenty nabycia i potwierdzenia płatności"],
};

export function classify(a: Asset, relation: Relation, regime: Regime): Classification {
  const docs = [...DOCS[a.type]];
  if (a.funds === "darowizna") docs.push("Umowa darowizny lub potwierdzenie przelewu od darczyńcy");
  if (a.funds === "spadek") docs.push("Postanowienie o stwierdzeniu nabycia spadku / akt poświadczenia dziedziczenia");
  if (a.funds === "przedslubne" || a.when === "przed") docs.push("Dowody środków sprzed ślubu (wyciągi, umowy)");

  if (relation === "informal") {
    if (a.owner === "razem") return { status: "wspolwlasnosc", reason: "W związku nieformalnym nie ma wspólności majątkowej. Rzecz kupiona wspólnie to zwykle współwłasność w częściach ułamkowych.", basis: "Kodeks cywilny, art. 195 i n.", docs };
    if (a.owner === "ja" || a.owner === "partner") return { status: "osobisty", reason: "Należy do osoby, która ją nabyła. Ewentualne rozliczenie wkładów drugiej osoby wymaga analizy.", basis: "Kodeks cywilny", docs };
    return { status: "analiza", reason: "Ustal, kto jest właścicielem (np. umowa, faktura, księga wieczysta).", basis: "Kodeks cywilny", docs };
  }

  if (a.type === "dlug") return { status: "analiza", reason: "Długi nie są „dzielone” jak majątek. Kto odpowiada wobec wierzyciela i jak się rozliczyć między sobą — zależy od umowy, celu zadłużenia i zgody drugiego małżonka.", basis: "KRO art. 41, 45; KC art. 366", docs };

  // Rozdzielność od początku — brak majątku wspólnego
  if (regime === "rozdzielnosc-od-poczatku") {
    if (a.funds === "wspolne" || a.funds === "mieszane") return { status: "wspolwlasnosc", reason: "Przy rozdzielności majątkowej nie ma majątku wspólnego. Rzecz kupiona wspólnie może być współwłasnością w częściach ułamkowych.", basis: "KRO art. 51; KC art. 195 i n.", docs };
    return { status: "osobisty", reason: "Przy rozdzielności majątkowej każdy z małżonków ma własny majątek.", basis: "KRO art. 51", docs };
  }

  const special = a.type === "emerytalne" || a.type === "firma";

  if (a.when === "po") {
    if (a.funds === "wspolne" || a.funds === "mieszane") return { status: "analiza", reason: "Nabyte po ustaniu wspólności, ale z pieniędzy, które mogły należeć do majątku wspólnego — wymaga analizy.", basis: "KRO art. 33 pkt 10, art. 45", docs };
    return { status: "osobisty", reason: "Nabyte po ustaniu wspólności (np. po umowie o rozdzielności lub separacji) co do zasady należy do majątku osobistego.", basis: "KRO art. 33, art. 54", docs };
  }

  if (a.when === "przed") {
    if (a.laterJointFunds === "tak") return { status: "mieszany", reason: "Nabyte przed ślubem (majątek osobisty), ale w trakcie małżeństwa spłacane lub ulepszane ze wspólnych pieniędzy.", basis: "KRO art. 33 pkt 1, art. 45", docs, nakład: "Spłaty rat, remonty lub inwestycje ze wspólnych pieniędzy w składnik osobisty — możliwe rozliczenie nakładów." };
    if (a.laterJointFunds === "nie-wiem") return { status: "analiza", reason: "Nabyte przed ślubem — co do zasady majątek osobisty. Sprawdź, czy w trakcie małżeństwa nie finansowano go ze wspólnych środków.", basis: "KRO art. 33 pkt 1, art. 45", docs };
    return { status: "osobisty", reason: "Nabyte przed powstaniem wspólności majątkowej.", basis: "KRO art. 33 pkt 1", docs };
  }

  if (a.when === "w-trakcie") {
    if (regime === "nie-wiem") docs.push("Ewentualna umowa majątkowa (intercyza)");
    let res: Classification;
    switch (a.funds) {
      case "wspolne":
        res = { status: "wspolny", reason: "Nabyte w czasie trwania wspólności ze wspólnych dochodów — niezależnie od tego, kto jest wpisany na fakturze czy w księdze.", basis: "KRO art. 31 § 1", docs };
        break;
      case "przedslubne":
        res = { status: "osobisty", reason: "Nabyte w zamian za składniki majątku osobistego (pieniądze sprzed ślubu).", basis: "KRO art. 33 pkt 10", docs };
        break;
      case "darowizna":
      case "spadek":
        if (a.donorJoint === "tak") res = { status: "wspolny", reason: `${a.funds === "darowizna" ? "Darczyńca" : "Spadkodawca"} postanowił, że składnik ma wejść do majątku wspólnego.`, basis: "KRO art. 33 pkt 2", docs };
        else if (a.donorJoint === "nie-wiem") res = { status: "analiza", reason: `Co do zasady ${a.funds === "darowizna" ? "darowizna" : "spadek"} należy do majątku osobistego — chyba że ${a.funds === "darowizna" ? "darczyńca" : "spadkodawca"} postanowił inaczej. Sprawdź dokumenty (np. darowizna dla obojga).`, basis: "KRO art. 33 pkt 2", docs };
        else res = { status: "osobisty", reason: `Nabyte przez ${a.funds === "darowizna" ? "darowiznę" : "dziedziczenie"} należy do majątku osobistego.`, basis: "KRO art. 33 pkt 2", docs };
        break;
      case "mieszane":
        res = { status: "mieszany", reason: "Sfinansowane częściowo ze wspólnych, a częściowo z osobistych pieniędzy.", basis: "KRO art. 31, 33 pkt 10, art. 45", docs, nakład: "Wkład pieniędzy osobistych w składnik wspólny (lub odwrotnie) — możliwe rozliczenie nakładów." };
        break;
      default:
        res = { status: "analiza", reason: "Nie wiadomo, z jakich środków nabyto składnik — od tego zależy jego status.", basis: "KRO art. 31, 33", docs };
    }
    if (special && res.status !== "osobisty") {
      res = { ...res, status: res.status === "wspolny" ? "analiza" : res.status, reason: `${res.reason} ${a.type === "emerytalne" ? "Zasady podziału środków emerytalnych zależą od produktu (PPK, IKE, IKZE, OFE) — wymagają osobnej analizy." : "Przy firmie znaczenie ma forma działalności i to, co wchodzi do przedsiębiorstwa — wymaga osobnej analizy."}` };
    }
    return res;
  }
  return { status: "analiza", reason: "Uzupełnij, kiedy składnik został nabyty.", basis: "KRO art. 31, 33", docs };
}

export type AssetResult = Asset & Classification;

export function analyze(items: Asset[], relation: Relation, regime: Regime) {
  const results: AssetResult[] = items.map((a) => ({ ...a, ...classify(a, relation, regime) }));
  const totals: Record<Status, number> = { wspolny: 0, osobisty: 0, mieszany: 0, analiza: 0, wspolwlasnosc: 0 };
  const counts: Record<Status, number> = { wspolny: 0, osobisty: 0, mieszany: 0, analiza: 0, wspolwlasnosc: 0 };
  for (const r of results) {
    counts[r.status]++;
    if (r.type !== "dlug" && r.value) totals[r.status] += r.value;
  }
  const debts = results.filter((r) => r.type === "dlug").reduce((a, r) => a + (r.value || 0), 0);
  const nakłady = results.filter((r) => r.nakład).map((r) => `${r.label || TYPE_LABEL[r.type]}: ${r.nakład}`);
  return { results, totals, counts, debts, nakłady };
}

export function lawyerQuestions(relation: Relation, regime: Regime, items: AssetResult[]): string[] {
  if (relation === "informal")
    return [
      "Jak znieść współwłasność rzeczy kupionych razem — umownie i sądowo?",
      "Czy moje wpłaty na rzeczy należące do partnera mogą podlegać rozliczeniu?",
      "Jak udokumentować, kto ile wpłacił?",
    ];
  const q = ["Które składniki w mojej sytuacji należą do majątku wspólnego, a które do osobistego?", "Czy są podstawy do żądania ustalenia nierównych udziałów w majątku wspólnym (art. 43 KRO)?"];
  if (items.some((r) => r.nakład)) q.push("Jak rozliczyć nakłady z majątku wspólnego na osobisty (i odwrotnie) i jak je udokumentować?");
  if (items.some((r) => r.type === "emerytalne")) q.push("Jak dzieli się środki w PPK/IKE/IKZE/OFE w mojej sytuacji?");
  if (items.some((r) => r.type === "firma")) q.push("Co z firmą: które jej składniki wchodzą do majątku wspólnego i jak je wycenić?");
  if (items.some((r) => r.type === "dlug")) q.push("Kto odpowiada za kredyty i długi wobec wierzycieli, a jak rozliczamy je między sobą?");
  if (regime === "rozdzielnosc-w-trakcie" || regime === "nie-wiem") q.push("Od kiedy obowiązuje rozdzielność i co to oznacza dla składników nabytych wcześniej?");
  q.push("Czy podział lepiej przeprowadzić umową (u notariusza przy nieruchomościach), w wyroku rozwodowym czy w osobnym postępowaniu?");
  return q;
}
