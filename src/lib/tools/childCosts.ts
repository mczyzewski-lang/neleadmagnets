/**
 * Narzędzie 6: kalkulator kosztów utrzymania dzieci.
 * To NIE jest kalkulator alimentów. Liczy wyłącznie zestawienie wydatków podanych przez użytkownika.
 * Obsługuje kilkoro dzieci: każda pozycja ma `childId`, a każde dziecko własny wiek i własną listę wydatków.
 */
import { type Frequency, monthlyEquivalent, oneOffAmount } from "./expenses";

export type ChildCategory =
  | "food" | "clothes" | "housing" | "education" | "care" | "health" | "transport" | "activities" | "holidays" | "other";

export const CHILD_CATEGORY_LABELS: Record<ChildCategory, string> = {
  food: "Żywność",
  clothes: "Ubrania i obuwie",
  housing: "Mieszkanie i media",
  education: "Edukacja",
  care: "Przedszkole, żłobek, opieka",
  health: "Zdrowie",
  transport: "Transport",
  activities: "Zajęcia dodatkowe",
  holidays: "Wakacje i wyjazdy",
  other: "Inne",
};

export const CHILD_CATEGORIES = Object.keys(CHILD_CATEGORY_LABELS) as ChildCategory[];

export const CATEGORY_COLORS: Record<ChildCategory, string> = {
  food: "#295550",
  clothes: "#C79B59",
  housing: "#4A6D68",
  education: "#7E5B26",
  care: "#8FB0AA",
  health: "#A3352B",
  transport: "#263D3A",
  activities: "#C9A96E",
  holidays: "#5E8C7F",
  other: "#9C948A",
};

export type AgeBand = "0-2" | "3-6" | "7-12" | "13-18" | "18+";
export const AGE_BANDS: { value: AgeBand; label: string }[] = [
  { value: "0-2", label: "0–2 lata" },
  { value: "3-6", label: "3–6 lat" },
  { value: "7-12", label: "7–12 lat" },
  { value: "13-18", label: "13–18 lat" },
  { value: "18+", label: "18+ (uczy się)" },
];

/** Dziecko w zestawieniu. Bez danych identyfikujących: nazwa to np. „Dziecko 1” albo „Starsze”. */
export type ChildInfo = { id: string; name: string; age?: AgeBand };

export const MAX_CHILDREN = 6;
export const defaultChildName = (index: number) => `Dziecko ${index + 1}`;
export const childDisplayName = (c: ChildInfo, index: number) => c.name.trim() || defaultChildName(index);
export const ageLabel = (age: AgeBand | undefined) => (age ? AGE_BANDS.find((a) => a.value === age)!.label : undefined);

export type ChildLine = { id: string; category: ChildCategory; label: string; amount?: number; freq: Frequency; custom?: boolean; childId?: string };
export type ChildScenario = { id: string; name: string; lines: ChildLine[] };

export type CategorySum = { category: ChildCategory; label: string; monthly: number; yearly: number; color: string };
export type ScenarioTotals = {
  monthly: number;
  yearly: number;
  oneOff: number;
  yearlyWithOneOff: number;
  byCategory: CategorySum[];
};

export function scenarioTotals(s: ChildScenario): ScenarioTotals {
  const m = new Map<ChildCategory, number>();
  let oneOff = 0;
  for (const l of s.lines) {
    oneOff += oneOffAmount(l.amount, l.freq);
    m.set(l.category, (m.get(l.category) || 0) + monthlyEquivalent(l.amount, l.freq));
  }
  const byCategory = CHILD_CATEGORIES.map((c) => {
    const monthly = m.get(c) || 0;
    return { category: c, label: CHILD_CATEGORY_LABELS[c], monthly, yearly: monthly * 12, color: CATEGORY_COLORS[c] };
  });
  const monthly = byCategory.reduce((a, c) => a + c.monthly, 0);
  return { monthly, yearly: monthly * 12, oneOff, yearlyWithOneOff: monthly * 12 + oneOff, byCategory };
}

export type ChildBreakdown = { child: ChildInfo; index: number; name: string; totals: ScenarioTotals };

/** Pozycje jednego dziecka w scenariuszu. */
export function linesForChild(s: ChildScenario, childId: string): ChildLine[] {
  return s.lines.filter((l) => l.childId === childId);
}

/** Koszty w podziale na dzieci. Suma po dzieciach = scenarioTotals(s), o ile każda pozycja ma childId. */
export function childBreakdown(s: ChildScenario, children: ChildInfo[]): ChildBreakdown[] {
  return children.map((child, index) => ({
    child,
    index,
    name: childDisplayName(child, index),
    totals: scenarioTotals({ ...s, lines: linesForChild(s, child.id) }),
  }));
}

export type Diff = { category: ChildCategory; label: string; values: number[]; delta: number };
/** Porównanie miesięcznych kosztów kategorii między scenariuszami (delta = ostatni − pierwszy). */
export function compareScenarios(list: ChildScenario[]): { totals: ScenarioTotals[]; rows: Diff[] } {
  const totals = list.map(scenarioTotals);
  const rows = CHILD_CATEGORIES.map((c, i) => {
    const values = totals.map((t) => t.byCategory[i].monthly);
    return { category: c, label: CHILD_CATEGORY_LABELS[c], values, delta: values[values.length - 1] - values[0] };
  }).filter((r) => r.values.some((v) => v > 0));
  return { totals, rows };
}

/**
 * Sugerowane pozycje dopasowane do wieku (bez kwot: nie przyjmujemy nieuzasadnionych wartości).
 * Każde dziecko dostaje własną listę, oznaczoną jego `childId`.
 */
export function suggestedLines(age: AgeBand | undefined, mk: () => string, childId?: string): ChildLine[] {
  const L = (category: ChildCategory, label: string, freq: Frequency = "monthly"): ChildLine => ({ id: mk(), category, label, freq, ...(childId ? { childId } : {}) });
  const small = age === "0-2" || age === "3-6";
  const teen = age === "13-18" || age === "18+";
  const lines: ChildLine[] = [
    L("food", "Jedzenie w domu"),
    L("clothes", "Ubrania i buty", "quarterly"),
    L("housing", "Część czynszu i mediów przypadająca na dziecko"),
  ];
  if (age === "0-2") lines.push(L("care", "Żłobek lub opiekunka"), L("other", "Pieluchy, kosmetyki, mleko"));
  else if (age === "3-6") lines.push(L("care", "Przedszkole (opłaty i wyżywienie)"));
  else if (age === "7-12") lines.push(L("education", "Obiady w szkole"), L("care", "Świetlica lub opieka po lekcjach"));
  else if (age === "13-18") lines.push(L("education", "Obiady w szkole"));
  else if (age === "18+") lines.push(L("education", "Opłaty za szkołę lub studia"), L("housing", "Pokój lub akademik w innym mieście"));
  else lines.push(L("care", "Opieka (żłobek, przedszkole, świetlica)"), L("education", "Obiady w szkole lub przedszkolu"));
  lines.push(
    L("education", small ? "Książeczki, zabawki edukacyjne" : "Podręczniki, przybory, wyprawka", "yearly"),
    L("health", "Leki, lekarze, dentysta"),
  );
  if (age !== "0-2") lines.push(L("transport", teen ? "Bilet miesięczny, dojazdy" : "Dojazdy do szkoły, przedszkola, na zajęcia"));
  lines.push(
    L("activities", "Zajęcia dodatkowe (sport, języki, muzyka)"),
    L("holidays", small ? "Wakacje, wyjazdy" : "Wakacje, kolonie, ferie", "yearly"),
    L("other", teen ? "Kieszonkowe, telefon" : "Prezenty, urodziny, drobne wydatki"),
  );
  if (teen) lines.push(L("education", "Korepetycje lub kursy"));
  lines.push(L("other", age === "0-2" ? "Większy zakup (np. wózek, fotelik)" : teen ? "Większy zakup (np. komputer)" : "Większy zakup (np. rower)", "once"));
  return lines;
}
