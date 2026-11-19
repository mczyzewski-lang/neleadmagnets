/**
 * Kalkulator kosztów rozwodu / separacji. Teksty bez przepisów (COPY_GUIDE.md), podstawy w meta.sources.
 * Opłaty sądowe wg ustawy o kosztach sądowych w sprawach cywilnych (stan na 10.11.2026).
 * Wynagrodzenia pełnomocników, notariusza i mediacji prywatnej wpisuje użytkownik. Nie zgadujemy stawek.
 */
export type Procedure = "rozwod" | "separacja-pozew" | "separacja-zgodna";
export type PropertyPath = "brak" | "w-wyroku" | "sad" | "notariusz";
export type MediationPath = "brak" | "sad" | "prywatna";

export type CostInput = {
  procedure: Procedure;
  fault: "bez" | "z";
  /** Zgodne żądanie zaniechania orzekania o winie (art. 57 § 2 KRO) */
  jointNoFault: boolean;
  property: PropertyPath;
  propertyAgreed: boolean; // zgodny projekt podziału
  notaryCost?: number;
  mediation: MediationPath;
  mediationKind: "niemajatkowa" | "majatkowa";
  mediationSessions: number;
  mediationValue?: number; // wartość przedmiotu mediacji majątkowej
  mediationPrivate?: number;
  lawyers: 0 | 1 | 2;
  lawyerMin?: number;
  lawyerMax?: number;
  docsCount: number;
  docFee: number; // opłata skarbowa za odpis, do sprawdzenia
  other?: number;
};

export const DEFAULT_DOC_FEE = 22;
export const POA_FEE = 17;

export const DEFAULT_INPUT: CostInput = {
  procedure: "rozwod",
  fault: "bez",
  jointNoFault: true,
  property: "brak",
  propertyAgreed: true,
  mediation: "brak",
  mediationKind: "niemajatkowa",
  mediationSessions: 2,
  lawyers: 0,
  docsCount: 2,
  docFee: DEFAULT_DOC_FEE,
};

export type CostLine = { id: string; label: string; min: number; max: number; group: "sad" | "inne"; note?: string; verify?: boolean };

const n = (v: number | undefined) => (v && v > 0 ? v : 0);

/** Wynagrodzenie mediatora przy skierowaniu przez sąd (rozp. Dz.U. 2026 poz. 170), do weryfikacji */
export function courtMediatorFee(kind: CostInput["mediationKind"], sessions: number, value?: number): number {
  if (kind === "niemajatkowa") {
    const s = Math.max(1, Math.min(20, Math.round(sessions)));
    return Math.min(900, 300 + 200 * (s - 1));
  }
  const v = n(value);
  if (v <= 200_000) return Math.min(4000, Math.max(300, Math.round(v * 0.01)));
  return Math.min(8000, 4000 + Math.round((v - 200_000) * 0.01));
}

export function courtFee(p: Procedure) {
  return p === "separacja-zgodna" ? 100 : 600;
}

export function refundPossible(i: CostInput) {
  if (i.procedure === "separacja-zgodna") return false;
  return i.fault === "bez" && i.jointNoFault;
}

export function buildLines(i: CostInput): CostLine[] {
  const lines: CostLine[] = [];
  const procLabel = i.procedure === "rozwod" ? "Opłata od pozwu o rozwód" : i.procedure === "separacja-pozew" ? "Opłata od pozwu o separację" : "Opłata od zgodnego wniosku o separację";
  const fee = courtFee(i.procedure);
  lines.push({ id: "court", label: procLabel, min: fee, max: fee, group: "sad", note: "Ustawa o kosztach sądowych w sprawach cywilnych" });

  if (i.property === "w-wyroku" || i.property === "sad") {
    const f = i.propertyAgreed ? 300 : 1000;
    lines.push({
      id: "property",
      label: i.property === "w-wyroku" ? `Wniosek o podział majątku w wyroku ${i.procedure === "rozwod" ? "rozwodowym" : "orzekającym separację"}` : "Wniosek o podział majątku wspólnego (osobne postępowanie)",
      min: f, max: f, group: "sad",
      note: i.propertyAgreed ? "300 zł przy zgodnym projekcie podziału" : "1000 zł bez zgodnego projektu",
      verify: i.property === "w-wyroku",
    });
  }
  if (i.property === "notariusz") {
    lines.push({ id: "notary", label: "Umowa podziału majątku u notariusza (taksa, opłaty, podatki)", min: n(i.notaryCost), max: n(i.notaryCost), group: "inne", note: "Kwotę podaje notariusz. Zależy od wartości majątku" });
  }
  if (i.mediation === "sad") {
    const m = courtMediatorFee(i.mediationKind, i.mediationSessions, i.mediationValue);
    lines.push({ id: "mediation", label: "Mediacja na skierowanie sądu (wynagrodzenie mediatora)", min: m, max: m, group: "inne", note: "Według rozporządzenia. Może dojść VAT i zwrot wydatków", verify: true });
  }
  if (i.mediation === "prywatna") {
    lines.push({ id: "mediation", label: "Mediacja prywatna", min: n(i.mediationPrivate), max: n(i.mediationPrivate), group: "inne", note: "Cenę ustala mediator" });
  }
  if (i.lawyers > 0) {
    const mn = n(i.lawyerMin);
    const mx = Math.max(mn, n(i.lawyerMax));
    lines.push({ id: "lawyer", label: i.lawyers === 2 ? "Pełnomocnicy (każde z Was swój)" : "Pełnomocnik", min: mn * i.lawyers, max: mx * i.lawyers, group: "inne", note: "Kwoty wpisane przez Ciebie" });
    lines.push({ id: "poa", label: "Opłata skarbowa od pełnomocnictwa", min: POA_FEE * i.lawyers, max: POA_FEE * i.lawyers, group: "sad" });
  }
  if (i.docsCount > 0) {
    const d = Math.round(i.docsCount) * n(i.docFee);
    lines.push({ id: "docs", label: `Odpisy aktów stanu cywilnego (${Math.round(i.docsCount)} szt.)`, min: d, max: d, group: "inne", note: "Sprawdź aktualną opłatę skarbową", verify: true });
  }
  if (n(i.other)) lines.push({ id: "other", label: "Inne (np. opinie, dojazdy)", min: n(i.other), max: n(i.other), group: "inne" });
  return lines;
}

export type CostSummary = { min: number; max: number; court: number; others: { min: number; max: number }; refund: number; minAfterRefund: number; maxAfterRefund: number };

export function summarize(i: CostInput): CostSummary {
  const lines = buildLines(i);
  const min = lines.reduce((a, l) => a + l.min, 0);
  const max = lines.reduce((a, l) => a + l.max, 0);
  const court = lines.filter((l) => l.group === "sad").reduce((a, l) => a + l.min, 0);
  const refund = refundPossible(i) ? courtFee(i.procedure) / 2 : 0;
  return { min, max, court, others: { min: min - court, max: max - court }, refund, minAfterRefund: min - refund, maxAfterRefund: max - refund };
}

/** Dwie ilustracyjne ścieżki zbudowane z kwot użytkownika, dla wybranej drogi (rozwód albo separacja) */
export function comparePaths(i: CostInput) {
  const divorce = i.procedure === "rozwod";
  const agreed: CostInput = {
    ...i,
    procedure: divorce ? "rozwod" : "separacja-zgodna",
    fault: "bez",
    jointNoFault: true,
    property: i.property === "brak" ? "brak" : i.property === "notariusz" ? "notariusz" : "w-wyroku",
    propertyAgreed: true,
    lawyers: i.lawyers === 2 ? 1 : i.lawyers,
  };
  const disputed: CostInput = {
    ...i,
    procedure: divorce ? "rozwod" : "separacja-pozew",
    fault: "z",
    jointNoFault: false,
    property: i.property === "brak" ? "brak" : "sad",
    propertyAgreed: false,
    mediation: "brak",
    lawyers: i.lawyers === 0 ? 0 : 2,
  };
  const prop = i.property !== "brak";
  const agreedDesc = divorce
    ? `Rozwód bez orzekania o winie na zgodny wniosek${prop ? ", zgodny podział majątku" : ""}, Twoje założenia co do mediacji i pomocy prawnej.`
    : `Separacja na zgodny wniosek (możliwy, gdy nie macie wspólnych małoletnich dzieci)${prop ? ", zgodny podział majątku" : ""}, Twoje założenia co do mediacji i pomocy prawnej.`;
  const disputedDesc = `${divorce ? "Rozwód" : "Separacja"} z orzekaniem o winie${prop ? ", sporny podział majątku w sądzie" : ""}${i.lawyers > 0 ? ", każde z Was z pełnomocnikiem" : ""}.`;
  return [
    { id: "agreed", title: "Porozumienie", desc: agreedDesc, summary: summarize(agreed), lines: buildLines(agreed) },
    { id: "disputed", title: "Spór", desc: disputedDesc, summary: summarize(disputed), lines: buildLines(disputed) },
  ];
}

export function hiddenCosts(i: CostInput): string[] {
  const l = [
    "Czas: dni wolne na rozprawy, spotkania i dokumenty.",
    "Dojazdy do sądu (właściwy sąd może być w innej miejscowości).",
    "Koszty przejściowe: podwójne mieszkanie, przeprowadzka, nowe wyposażenie.",
  ];
  if (i.fault === "z" && i.procedure !== "separacja-zgodna") l.push("Sprawa z orzekaniem o winie zwykle wymaga więcej dowodów i rozpraw. To może podnieść koszt pomocy prawnej.");
  if (i.property !== "brak") l.push("Wycena majątku (np. rzeczoznawca) i ewentualne podatki przy przeniesieniu własności lub spłacie.");
  if (i.mediation === "brak") l.push("Odmowa mediacji też może kosztować: strona, która bez ważnego powodu odmówiła, może zostać obciążona kosztami. Mediację zwykle zaczyna zaproszenie od Ciebie albo od wybranego mediatora. Przy wyraźnej odmowie mediator może to potwierdzić na piśmie.");
  l.push("Apelacja i dodatkowe wnioski (np. o uzasadnienie wyroku) mają osobne opłaty. Sprawdź aktualne stawki.");
  l.push("Pomoc psychologiczna dla Ciebie lub dzieci, jeśli będzie potrzebna.");
  return l;
}
