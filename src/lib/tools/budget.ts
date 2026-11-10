/**
 * Narzędzie 2 — Budżet po rozstaniu.
 * Deterministyczne przeliczenia na podstawie kwot podanych przez użytkownika.
 * Warianty to WYŁĄCZNIE dane użytkownika skorygowane o widoczne, edytowalne założenia procentowe.
 * Narzędzie nie przewiduje alimentów — kwota alimentów to wyłącznie założenie użytkownika.
 */
import { type Frequency, monthlyEquivalent, oneOffAmount } from "./expenses";

export type BudgetCategory = "income" | "housing" | "bills" | "food" | "transport" | "children" | "debts" | "other" | "oneoff";

export const CATEGORY_LABELS: Record<BudgetCategory, string> = {
  income: "Dochody",
  housing: "Mieszkanie (kredyt, najem, czynsz)",
  bills: "Rachunki i media",
  food: "Żywność i chemia",
  transport: "Transport",
  children: "Dzieci",
  debts: "Zobowiązania finansowe",
  other: "Inne wydatki",
  oneoff: "Koszty jednorazowe (przeprowadzka, kaucja, wyposażenie)",
};

export const EXPENSE_CATEGORIES: BudgetCategory[] = ["housing", "bills", "food", "transport", "children", "debts", "other"];

export type BudgetLine = {
  id: string;
  category: BudgetCategory;
  label: string;
  /** Kwota obecnie (Twoja część obecnego budżetu) */
  now?: number;
  /** Kwota po rozstaniu (Twoje osobne gospodarstwo) */
  after?: number;
  freq: Frequency;
  custom?: boolean;
};

export type Assumptions = {
  /** zmiana dochodów w % (np. -5) */
  income: number;
  /** zmiana kosztów mieszkania w % */
  housing: number;
  /** zmiana pozostałych kosztów miesięcznych w % */
  other: number;
  /** zmiana kosztów jednorazowych w % */
  oneOff: number;
};

export type VariantKey = "cautious" | "base" | "optimistic";

export const VARIANT_LABELS: Record<VariantKey, string> = {
  cautious: "Ostrożny",
  base: "Bazowy",
  optimistic: "Optymistyczny",
};

/** Przykładowe założenia startowe — widoczne i edytowalne. Bazowy = dokładnie Twoje kwoty. */
export const DEFAULT_ASSUMPTIONS: Record<VariantKey, Assumptions> = {
  cautious: { income: 0, housing: 10, other: 10, oneOff: 20 },
  base: { income: 0, housing: 0, other: 0, oneOff: 0 },
  optimistic: { income: 0, housing: 0, other: -5, oneOff: -10 },
};

export type BudgetState = {
  lines: BudgetLine[];
  savings?: number;
  /** Założenie użytkownika: alimenty otrzymywane (miesięcznie) */
  alimonyIn?: number;
  /** Założenie użytkownika: alimenty płacone (miesięcznie) */
  alimonyOut?: number;
  assumptions: Record<VariantKey, Assumptions>;
};

export type CategoryTotal = { category: BudgetCategory; label: string; monthly: number };

export type BudgetSummary = {
  income: number;
  expenses: number;
  balance: number;
  oneOff: number;
  byCategory: CategoryTotal[];
};

export type VariantResult = BudgetSummary & {
  key: VariantKey;
  label: string;
  cushionAfterOneOff: number;
  /** Na ile miesięcy wystarczy poduszka przy deficycie; null, gdy brak deficytu */
  monthsUntilEmpty: number | null;
  /** Ile miesięcy wydatków pokrywa poduszka */
  monthsOfExpenses: number | null;
};

const pos = (v: number | undefined) => (v && Number.isFinite(v) && v > 0 ? v : 0);

export function summarize(lines: BudgetLine[], which: "now" | "after", extras: { alimonyIn?: number; alimonyOut?: number } = {}): BudgetSummary {
  let income = 0;
  let oneOff = 0;
  const cats = new Map<BudgetCategory, number>();
  for (const l of lines) {
    const amt = l[which];
    if (l.category === "income") {
      income += monthlyEquivalent(amt, l.freq);
      continue;
    }
    if (l.category === "oneoff" || l.freq === "once") {
      oneOff += which === "after" ? oneOffAmount(amt, "once") : 0;
      continue;
    }
    cats.set(l.category, (cats.get(l.category) || 0) + monthlyEquivalent(amt, l.freq));
  }
  if (which === "after") {
    income += pos(extras.alimonyIn);
    if (pos(extras.alimonyOut)) cats.set("children", (cats.get("children") || 0) + pos(extras.alimonyOut));
  }
  const byCategory = EXPENSE_CATEGORIES.map((c) => ({ category: c, label: CATEGORY_LABELS[c], monthly: cats.get(c) || 0 }));
  const expenses = byCategory.reduce((s, c) => s + c.monthly, 0);
  return { income, expenses, balance: income - expenses, oneOff, byCategory };
}

export function applyAssumptions(base: BudgetSummary, a: Assumptions): BudgetSummary {
  const f = (pct: number) => 1 + (Number.isFinite(pct) ? pct : 0) / 100;
  const byCategory = base.byCategory.map((c) => ({ ...c, monthly: c.monthly * (c.category === "housing" ? f(a.housing) : f(a.other)) }));
  const expenses = byCategory.reduce((s, c) => s + c.monthly, 0);
  const income = base.income * f(a.income);
  return { income, expenses, balance: income - expenses, oneOff: base.oneOff * f(a.oneOff), byCategory };
}

export function computeVariants(s: BudgetState): VariantResult[] {
  const base = summarize(s.lines, "after", { alimonyIn: s.alimonyIn, alimonyOut: s.alimonyOut });
  const savings = pos(s.savings);
  return (Object.keys(VARIANT_LABELS) as VariantKey[]).map((key) => {
    const r = applyAssumptions(base, s.assumptions[key]);
    const cushionAfterOneOff = savings - r.oneOff;
    const monthsUntilEmpty = r.balance < 0 ? Math.max(0, cushionAfterOneOff) / -r.balance : null;
    const monthsOfExpenses = r.expenses > 0 ? Math.max(0, cushionAfterOneOff) / r.expenses : null;
    return { ...r, key, label: VARIANT_LABELS[key], cushionAfterOneOff, monthsUntilEmpty, monthsOfExpenses };
  });
}

export function biggestBurdens(s: BudgetSummary, n = 3): CategoryTotal[] {
  return [...s.byCategory].filter((c) => c.monthly > 0).sort((a, b) => b.monthly - a.monthly).slice(0, n);
}

export function financialTodo(s: BudgetState, variants: VariantResult[]): string[] {
  const base = variants.find((v) => v.key === "base")!;
  const cautious = variants.find((v) => v.key === "cautious")!;
  const get = (c: BudgetCategory) => base.byCategory.find((x) => x.category === c)?.monthly || 0;
  const t: string[] = [];
  if (base.balance < 0) t.push("W wariancie bazowym wydatki przekraczają dochody. Warto ustalić, które koszty można ograniczyć lub jak sfinansować okres przejściowy.");
  else if (cautious.balance < 0) t.push("W wariancie ostrożnym pojawia się deficyt — sprawdź, które założenia są najbardziej prawdopodobne.");
  if (base.oneOff > pos(s.savings)) t.push("Koszty jednorazowe przekraczają Twoje oszczędności. Zaplanuj, z czego je pokryjesz (np. podział wspólnych oszczędności, rozłożenie w czasie).");
  if (get("housing") > 0 && base.income > 0 && get("housing") / base.income > 0.4) t.push("Koszty mieszkania pochłaniają ponad 40% dochodów. Rozważ, czy rozwiązanie mieszkaniowe jest możliwe do utrzymania.");
  if (get("debts") > 0) t.push("Ustal, kto i w jakiej części spłaca wspólne zobowiązania (kredyty, karty, raty) — wobec wierzyciela mogą odpowiadać oboje.");
  if (get("children") > 0 || pos(s.alimonyIn) || pos(s.alimonyOut)) t.push("Przygotuj zestawienie kosztów dzieci i porozmawiajcie o podziale wydatków. Wysokość alimentów zależy od potrzeb dziecka i możliwości rodziców — w razie sporu ustala ją sąd.");
  if (pos(s.alimonyIn) || pos(s.alimonyOut)) t.push("Kwota alimentów w kalkulatorze to Twoje założenie, nie prognoza. Sprawdź, jak zmieni się budżet bez niej.");
  t.push("Ustal, co dzieje się ze wspólnymi kontami, kartami i stałymi zleceniami.");
  t.push("Sprawdź ubezpieczenia (na życie, mieszkania, samochodu) — kto jest ubezpieczonym, a kto uposażonym.");
  t.push("Sprawdź, jak rozliczysz podatek dochodowy za rok rozstania — wspólne rozliczenie małżonków ma określone warunki.");
  if (pos(s.savings) > 0) t.push("Spisz wspólne oszczędności i inwestycje na dzień rozstania — przyda się przy rozliczeniach.");
  return t;
}

export function defaultBudgetLines(mk: (p?: string) => string): BudgetLine[] {
  const L = (category: BudgetCategory, label: string, freq: Frequency = "monthly"): BudgetLine => ({ id: mk(), category, label, freq });
  return [
    L("income", "Dochód netto (wynagrodzenie)"),
    L("income", "Dodatkowe dochody (premie, zlecenia, świadczenia)"),
    L("housing", "Rata kredytu lub czynsz najmu"),
    L("housing", "Czynsz administracyjny"),
    L("bills", "Prąd, gaz, ogrzewanie, woda"),
    L("bills", "Internet i telefon"),
    L("food", "Żywność i chemia"),
    L("transport", "Paliwo, bilety, parking"),
    L("transport", "Ubezpieczenie i serwis auta", "yearly"),
    L("children", "Koszty utrzymania dzieci"),
    L("debts", "Raty innych kredytów, karty"),
    L("other", "Zdrowie, leki"),
    L("other", "Ubrania, rozrywka, subskrypcje"),
    L("oneoff", "Przeprowadzka i transport rzeczy", "once"),
    L("oneoff", "Kaucja za wynajem", "once"),
    L("oneoff", "Wyposażenie mieszkania", "once"),
  ];
}
