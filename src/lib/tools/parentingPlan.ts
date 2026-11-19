/**
 * Narzędzie 3: Plan opieki nad dzieckiem (projekt porozumienia rodzicielskiego).
 * Deterministyczny generator harmonogramu (siatka 14 dni) i treści projektu.
 * Nie rekomenduje modelu opieki. Gotowe układy to tylko punkt startu do edycji.
 * Nie zbiera imion ani danych identyfikujących dzieci.
 */

export type Parent = "A" | "B";
export type Tbd = "tbd";
export type CareForm = "two-homes" | "nesting" | "flexible";
export type PresetId = "week" | "2255" | "223" | "eow-overnight" | "eow-afternoon" | "eow-ext" | "eow" | "distance" | "blank";
export type HandoverHow = "school" | "pickup" | "dropoff" | "meet" | "nest" | "other";
export type Handover = { time: string; how: HandoverHow; place: string };
export type HolidayId = "wigilia" | "bn" | "sylwester" | "wielkanoc" | "urodziny" | "dni-rodzicow" | "dlugie-weekendy" | "ferie" | "wakacje";
export type HolidayMode = "alternate" | "fixed" | "split" | "halves" | "months" | "blocks2" | "shared" | "where" | "own" | "regular" | "other" | Tbd;
export type HolidayRule = { mode: HolidayMode; even: Parent; details: string };
export type ImportantId = "school" | "health" | "therapy" | "residence" | "abroad" | "religion" | "activities";
export type OtherTermId = "activities" | "illness" | "belongings" | "changes" | "disputes" | "review";

export type ParentingAnswers = {
  children?: "1" | "2" | "3+";
  ages: string[]; // "0-3" | "4-6" | "7-12" | "13-18"
  distance?: "near" | "mid" | "far";
  school?: "zlobek" | "przedszkole" | "szkola" | "mixed" | "none";
  labelA: string;
  labelB: string;
  form?: CareForm;
  nestingUntil?: "3m" | "6m" | "school-year" | "other" | Tbd;
  nestingUntilText: string;
  nestingRules: string;
  flexibleRules: string;
  fallback: boolean;
  fallbackText: string;
  preset?: PresetId;
  grid: Parent[]; // 14 nocy; noc i = z dnia i na dzień i+1
  visits: (Parent | null)[]; // popołudnie bez noclegu
  visitFrom: string;
  visitTo: string;
  handovers: Record<number, Handover>; // klucz: indeks dnia (0–13), w którym następuje zmiana
  holidays: Record<HolidayId, HolidayRule>;
  everyday: string;
  important: ImportantId[];
  importantOther: string;
  urgent: string;
  calls?: "free" | "fixed" | Tbd;
  callsText: string;
  other: Record<OtherTermId, string>;
  safety?: "ok" | "hard" | "unsafe";
  cycleStart?: string; // RRRR-MM-DD (poniedziałek tygodnia 1)
};

export const DAYS_SHORT = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
export const DAYS_LONG = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];

export const FORM_LABELS: Record<CareForm, { label: string; desc: string }> = {
  "two-homes": { label: "Dziecko mieszka w dwóch domach według stałego harmonogramu", desc: "Ustalacie dni, noclegi i przekazania. Najczęstsze rozwiązanie." },
  nesting: { label: "Gniazdowanie: dziecko zostaje w jednym domu, zmieniają się rodzice", desc: "Zwykle rozwiązanie przejściowe, np. na kilka miesięcy po rozstaniu." },
  flexible: { label: "Bez szczegółowego harmonogramu: ustalacie kontakty na bieżąco", desc: "Dla rodziców, którzy dobrze współpracują. Przy sporze brakuje jasnych zasad." },
};

export const PRESETS: Record<PresetId, { label: string; desc: string; grid: string; visits?: number[] }> = {
  week: { label: "Tydzień / tydzień", desc: "Pełny tydzień w jednym domu, kolejny w drugim. Zmiana np. w poniedziałek przez szkołę.", grid: "AAAAAAABBBBBBB" },
  "2255": { label: "2-2-5-5", desc: "Stałe dni w tygodniu u każdego rodzica (np. pn i wt u jednego, śr i czw u drugiego), weekendy na zmianę.", grid: "AABBAAAAABBBBB" },
  "223": { label: "2-2-3", desc: "Dwa dni u jednego, dwa u drugiego, trzy (weekend) na zmianę. Częste zmiany, zwykle przy bliskiej odległości.", grid: "AABBAAABBAABBB" },
  "eow-overnight": { label: "Co drugi weekend + nocleg w tygodniu", desc: "Weekend od piątku do niedzieli co dwa tygodnie i jeden nocleg w tygodniu, np. ze środy na czwartek.", grid: "AABAAAAAABABBA" },
  "eow-afternoon": { label: "Co drugi weekend + popołudnie w tygodniu", desc: "Weekend co dwa tygodnie i stałe popołudnie bez noclegu, np. w środę.", grid: "AAAAAAAAAAABBA", visits: [2, 9] },
  "eow-ext": { label: "Co drugi weekend, wydłużony do poniedziałku", desc: "Od piątku po szkole do poniedziałku rano (odprowadzenie do szkoły).", grid: "AAAAAAAAAAABBB" },
  eow: { label: "Co drugi weekend (od piątku do niedzieli)", desc: "Dziecko mieszka na co dzień w jednym domu, co drugi weekend spędza w drugim.", grid: "AAAAAAAAAAABBA" },
  distance: { label: "Weekendy i wakacje (duża odległość)", desc: "Rzadsze, ale dłuższe pobyty: weekendy oraz większa część ferii i wakacji. W siatce pokazujemy co drugi weekend.", grid: "AAAAAAAAAAABBA" },
  blank: { label: "Własny układ od zera", desc: "Wszystkie noce startują u rodzica A. Każdy dzień ustawisz sam(a).", grid: "AAAAAAAAAAAAAA" },
};

export function presetGrid(id: PresetId): { grid: Parent[]; visits: (Parent | null)[] } {
  const p = PRESETS[id];
  const grid = p.grid.split("") as Parent[];
  const visits = grid.map((n, i) => (p.visits?.includes(i) ? other(n) : null));
  return { grid, visits };
}

export const other = (p: Parent): Parent => (p === "A" ? "B" : "A");

/* ---------- święta i wakacje ---------- */
const PARITY_MODES: HolidayMode[] = ["alternate", "split", "halves", "months", "blocks2"];

export const MODE_LABELS: Record<HolidayMode, string> = {
  alternate: "Naprzemiennie: lata parzyste i nieparzyste",
  fixed: "Co roku u tego samego rodzica",
  split: "Podział dni, z zamianą co roku",
  halves: "Po połowie, z zamianą co roku",
  months: "Lipiec i sierpień, z zamianą co roku",
  blocks2: "Bloki po dwa tygodnie na zmianę",
  shared: "Część dnia z każdym z rodziców",
  where: "Świętuje rodzic, u którego dziecko akurat jest",
  own: "Z rodzicem, którego dotyczy święto",
  regular: "Według zwykłego harmonogramu",
  other: "Inaczej (opiszę w szczegółach)",
  tbd: "Do ustalenia",
};

export type HolidayDef = { id: HolidayId; label: string; modes: HolidayMode[]; def: HolidayRule; splitLabel?: string; placeholder: string };

export const HOLIDAYS: HolidayDef[] = [
  { id: "wigilia", label: "Wigilia", modes: ["alternate", "fixed", "other", "tbd"], def: { mode: "alternate", even: "A", details: "od 24 grudnia, godz. 12:00, do 25 grudnia, godz. 12:00" }, placeholder: "np. od 24.12 godz. 12:00 do 25.12 godz. 12:00" },
  { id: "bn", label: "Boże Narodzenie (25 i 26 grudnia)", modes: ["alternate", "split", "fixed", "other", "tbd"], splitLabel: "25 grudnia u jednego, 26 grudnia u drugiego", def: { mode: "split", even: "B", details: "zmiana 26 grudnia o godz. 12:00" }, placeholder: "np. zmiana 26.12 o godz. 12:00" },
  { id: "sylwester", label: "Sylwester i Nowy Rok", modes: ["alternate", "fixed", "other", "tbd"], def: { mode: "alternate", even: "B", details: "od 31 grudnia, godz. 12:00, do 1 stycznia, godz. 18:00" }, placeholder: "np. od 31.12 godz. 12:00 do 1.01 godz. 18:00" },
  { id: "wielkanoc", label: "Wielkanoc", modes: ["split", "alternate", "fixed", "other", "tbd"], splitLabel: "Niedziela u jednego, poniedziałek u drugiego", def: { mode: "split", even: "A", details: "zmiana w poniedziałek o godz. 10:00" }, placeholder: "np. zmiana w poniedziałek o godz. 10:00" },
  { id: "urodziny", label: "Urodziny dziecka", modes: ["shared", "where", "alternate", "other", "tbd"], def: { mode: "shared", even: "A", details: "" }, placeholder: "np. przyjęcie z rówieśnikami organizujemy wspólnie" },
  { id: "dni-rodzicow", label: "Dzień Matki, Dzień Ojca, urodziny rodziców", modes: ["own", "other", "tbd"], def: { mode: "own", even: "A", details: "" }, placeholder: "np. od 10:00 do 18:00, jeśli to dzień szkolny, po lekcjach" },
  { id: "dlugie-weekendy", label: "Długie weekendy i dni wolne od szkoły", modes: ["regular", "alternate", "other", "tbd"], def: { mode: "regular", even: "A", details: "" }, placeholder: "np. majówka naprzemiennie" },
  { id: "ferie", label: "Ferie zimowe", modes: ["halves", "alternate", "other", "tbd"], def: { mode: "halves", even: "A", details: "zmiana w połowie ferii, w sobotę o godz. 12:00" }, placeholder: "np. zmiana w sobotę o godz. 12:00" },
  { id: "wakacje", label: "Wakacje letnie", modes: ["halves", "blocks2", "months", "other", "tbd"], def: { mode: "halves", even: "A", details: "terminy wyjazdów potwierdzamy do 30 kwietnia" }, placeholder: "np. terminy potwierdzamy do 30 kwietnia" },
];

export const holidayDef = (id: HolidayId) => HOLIDAYS.find((h) => h.id === id)!;
export const modeLabel = (id: HolidayId, m: HolidayMode) => (m === "split" && holidayDef(id).splitLabel) || MODE_LABELS[m];
/** Czy tryb wymaga wskazania rodzica (lata parzyste / co roku) */
export const needsParent = (m: HolidayMode) => m === "fixed" || PARITY_MODES.includes(m);

/** Etykieta pola z rodzicem, zależnie od trybu */
export function parentFieldLabel(id: HolidayId, m: HolidayMode): string {
  if (m === "fixed") return "Co roku u";
  if (m === "blocks2") return "W latach parzystych zaczyna";
  if (m === "months") return "W latach parzystych lipiec u";
  if (m === "halves") return id === "ferie" ? "W latach parzystych pierwszy tydzień u" : "W latach parzystych pierwsza połowa u";
  if (m === "split") return id === "bn" ? "W latach parzystych 25 grudnia u" : "W latach parzystych niedziela u";
  return "W latach parzystych u";
}

/** U którego rodzica jest dziecko w danym roku (dla podziałów: pierwsza część). null, gdy tryb nie przypisuje rodzica. */
export function holidayParent(rule: HolidayRule, year: number): Parent | null {
  if (rule.mode === "fixed") return rule.even;
  if (!PARITY_MODES.includes(rule.mode)) return null;
  return year % 2 === 0 ? rule.even : other(rule.even);
}

const PART_NAMES: Partial<Record<HolidayId, Partial<Record<HolidayMode, [string, string]>>>> = {
  bn: { split: ["25 grudnia", "26 grudnia"] },
  wielkanoc: { split: ["niedziela", "poniedziałek"] },
  ferie: { halves: ["pierwszy tydzień", "drugi tydzień"] },
  wakacje: { halves: ["pierwsza połowa", "druga połowa"], months: ["lipiec", "sierpień"], blocks2: ["pierwszy blok", "drugi blok"] },
};

/** Krótki opis przypisania w konkretnym roku, np. „25 grudnia: Rodzic B, 26 grudnia: Rodzic A”. */
export function holidayYearText(id: HolidayId, rule: HolidayRule, year: number, A: string, B: string): string | null {
  const p = holidayParent(rule, year);
  if (!p) return null;
  const name = (x: Parent) => (x === "A" ? A : B);
  const parts = PART_NAMES[id]?.[rule.mode];
  return parts ? `${parts[0]}: ${name(p)}, ${parts[1]}: ${name(other(p))}` : name(p);
}

/** Opis zasady do podsumowania i projektu. undefined = do ustalenia. */
export function describeHoliday(id: HolidayId, rule: HolidayRule, A: string, B: string): string | undefined {
  if (rule.mode === "tbd") return undefined;
  const X = rule.even === "A" ? A : B;
  const Y = rule.even === "A" ? B : A;
  const parts = PART_NAMES[id]?.[rule.mode];
  let base: string;
  switch (rule.mode) {
    case "alternate": base = `w latach parzystych u: ${X}, w nieparzystych u: ${Y}`; break;
    case "fixed": base = `co roku u: ${X}`; break;
    case "blocks2": base = `bloki po dwa tygodnie na zmianę; w latach parzystych zaczyna: ${X}, w nieparzystych: ${Y}`; break;
    case "split": case "halves": case "months": base = `w latach parzystych ${parts![0]} u: ${X}, ${parts![1]} u: ${Y}; w nieparzystych odwrotnie`; break;
    case "shared": base = "dziecko spędza część dnia z każdym z rodziców"; break;
    case "where": base = "świętuje rodzic, u którego dziecko akurat jest; drugi ma krótkie spotkanie lub rozmowę"; break;
    case "own": base = "dziecko spędza ten dzień (lub jego część) z rodzicem, którego dotyczy święto"; break;
    case "regular": base = "według zwykłego harmonogramu"; break;
    default: base = "";
  }
  const d = rule.details.trim();
  if (!base) return d || undefined;
  return d ? `${base} (${d})` : base;
}

/* ---------- decyzje, kontakt, inne ustalenia ---------- */
export const IMPORTANT: { id: ImportantId; label: string }[] = [
  { id: "school", label: "wybór i zmiana żłobka, przedszkola lub szkoły" },
  { id: "health", label: "leczenie planowe i zabiegi" },
  { id: "therapy", label: "terapia i opieka psychologiczna" },
  { id: "residence", label: "zmiana miejsca zamieszkania dziecka" },
  { id: "abroad", label: "wyjazdy za granicę i paszport" },
  { id: "religion", label: "wychowanie religijne" },
  { id: "activities", label: "stałe, kosztowne zajęcia dodatkowe" },
];

export const OTHER_TERMS: { id: OtherTermId; label: string; def: string }[] = [
  { id: "activities", label: "Zajęcia dodatkowe", def: "Zajęcia, na które dziecko już chodzi, są kontynuowane w obu domach. Nowe stałe zajęcia i ich koszty ustalamy wspólnie." },
  { id: "illness", label: "Choroba dziecka i odwołane przekazanie", def: "Gdy dziecko jest chore w dniu przekazania, ustalamy, czy przekazanie się odbywa. Utracony czas można odrobić w uzgodnionym terminie." },
  { id: "belongings", label: "Rzeczy dziecka", def: "Podstawowe ubrania i przybory dziecko ma w obu domach. Rzeczy do szkoły i leki przekazujemy razem z dzieckiem." },
  { id: "changes", label: "Zmiany w planie", def: "Jednorazowe zmiany uzgadniamy z co najmniej tygodniowym wyprzedzeniem, na piśmie (np. wiadomością)." },
  { id: "disputes", label: "Gdy się nie zgadzamy", def: "Najpierw rozmawiamy sami. Jeśli to nie wystarczy, możemy skorzystać z pomocy mediatora rodzinnego." },
  { id: "review", label: "Przegląd planu", def: "Przeglądamy plan co pół roku oraz przy zmianie szkoły lub przeprowadzce." },
];

export const DEFAULT_EVERYDAY = "Bieżące sprawy (codzienna opieka, posiłki, sen, drobne wydatki, wyjścia, odrabianie lekcji) rozstrzyga rodzic, u którego dziecko akurat jest.";
export const DEFAULT_URGENT = "W nagłej sytuacji (np. wypadek, nagła choroba) każdy z rodziców może podjąć konieczne działania. Drugiego rodzica informuje niezwłocznie, najpóźniej tego samego dnia.";

export const NESTING_UNTIL: Record<Exclude<NonNullable<ParentingAnswers["nestingUntil"]>, Tbd>, string> = {
  "3m": "przez około 3 miesiące",
  "6m": "przez około 6 miesięcy",
  "school-year": "do końca roku szkolnego",
  other: "",
};

export function defaultAnswers(): ParentingAnswers {
  const { grid, visits } = presetGrid("eow");
  return {
    ages: [],
    labelA: "Rodzic A",
    labelB: "Rodzic B",
    nestingUntilText: "",
    nestingRules: "Rodzic, który nie jest z dzieckiem, mieszka w osobnym mieszkaniu. Koszty domu dziecka dzielimy po połowie. Szanujemy swoją prywatność.",
    flexibleRules: "Kontakty ustalamy na bieżąco, z wyprzedzeniem kilku dni. Dziecko regularnie spędza czas z każdym z nas, także część weekendów.",
    fallback: true,
    fallbackText: "co drugi weekend od piątku, godz. 17:00, do niedzieli, godz. 18:00, oraz połowa ferii i wakacji",
    grid,
    visits,
    visitFrom: "15:00",
    visitTo: "19:00",
    handovers: {},
    holidays: Object.fromEntries(HOLIDAYS.map((h) => [h.id, { ...h.def }])) as Record<HolidayId, HolidayRule>,
    everyday: DEFAULT_EVERYDAY,
    important: ["school", "health", "therapy", "residence", "abroad"],
    importantOther: "",
    urgent: DEFAULT_URGENT,
    callsText: "",
    other: Object.fromEntries(OTHER_TERMS.map((t) => [t.id, t.def])) as Record<OtherTermId, string>,
  };
}

/* ---------- harmonogram ---------- */
export type CycleDay = { night: Parent; visit?: Parent };

/** 14 dni cyklu (indeks 0 = poniedziałek tygodnia 1). */
export function buildCycle(a: ParentingAnswers): CycleDay[] {
  const grid = a.grid.length === 14 ? a.grid : presetGrid("eow").grid;
  return grid.map((night, i) => {
    const v = a.visits[i];
    return v && v !== night ? { night, visit: v } : { night };
  });
}

export function countNights(cycle: CycleDay[]) {
  const A = cycle.filter((d) => d.night === "A").length;
  const B = cycle.length - A;
  const len = cycle.length || 1;
  return { A, B, pctA: Math.round((A / len) * 100), pctB: Math.round((B / len) * 100), visitsA: cycle.filter((d) => d.visit === "A").length, visitsB: cycle.filter((d) => d.visit === "B").length };
}

export type Transition = { day: number; from: Parent; to: Parent };

/** Dni, w których dziecko przechodzi do drugiego rodzica (z uwzględnieniem przejścia z tygodnia 2 na tydzień 1). */
export function transitions(grid: Parent[]): Transition[] {
  const out: Transition[] = [];
  for (let i = 0; i < grid.length; i++) {
    const prev = grid[(i + grid.length - 1) % grid.length];
    if (grid[i] !== prev) out.push({ day: i, from: prev, to: grid[i] });
  }
  return out;
}

export const dayName = (i: number) => `${DAYS_LONG[i % 7]} (tydzień ${Math.floor(i / 7) + 1})`;

export function defaultHandover(a: ParentingAnswers, t: Transition): Handover {
  const dow = t.day % 7;
  if (a.form === "nesting") return { time: "18:00", how: "nest", place: "" };
  if (dow < 5 && a.school && a.school !== "none") return { time: "16:00", how: "school", place: "" };
  if (dow === 6) return { time: "18:00", how: "dropoff", place: "" };
  if (dow === 5) return { time: "10:00", how: "pickup", place: "" };
  return { time: "17:00", how: "pickup", place: "" };
}

export function handoverFor(a: ParentingAnswers, t: Transition): Handover {
  return a.handovers[t.day] ?? defaultHandover(a, t);
}

const SCHOOL_FROM: Record<string, string> = { zlobek: "ze żłobka", przedszkole: "z przedszkola", szkola: "ze szkoły", mixed: "ze szkoły lub przedszkola" };

export const HOW_LABELS: Record<HandoverHow, string> = {
  school: "Odbiór ze szkoły lub przedszkola",
  pickup: "Odbiera rodzic, do którego dziecko jedzie",
  dropoff: "Przywozi rodzic, u którego dziecko było",
  meet: "Spotkanie w ustalonym miejscu",
  nest: "Zmiana rodziców w domu dziecka",
  other: "Inaczej (opiszę w polu obok)",
};

export function handoverText(a: ParentingAnswers, t: Transition): string {
  const h = handoverFor(a, t);
  const A = a.labelA || "Rodzic A";
  const B = a.labelB || "Rodzic B";
  const from = t.from === "A" ? A : B;
  const to = t.to === "A" ? A : B;
  const how: Record<HandoverHow, string> = {
    school: `odbiór ${SCHOOL_FROM[a.school ?? ""] ?? "ze szkoły lub przedszkola"}, odbiera: ${to}`,
    pickup: `odbiera: ${to}, od: ${from}`,
    dropoff: `przywozi: ${from}, do: ${to}`,
    meet: `spotkanie w ustalonym miejscu, przekazuje: ${from}, odbiera: ${to}`,
    nest: `zmiana w domu dziecka, przychodzi: ${to}, wychodzi: ${from}`,
    other: "",
  };
  const place = h.place.trim();
  const desc = [how[h.how], place].filter(Boolean).join(", ") || "sposób do ustalenia";
  return `${dayName(t.day)}, ${h.time || "godzina do ustalenia"}: ${desc}`;
}

/* ---------- daty (UTC, bez problemów ze zmianą czasu) ---------- */
export function parseISO(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}
export function toISO(d: Date) {
  return d.toISOString().slice(0, 10);
}
export function mondayOf(d: Date): Date {
  const u = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dow = (u.getUTCDay() + 6) % 7; // 0 = pon
  u.setUTCDate(u.getUTCDate() - dow);
  return u;
}
export function cycleIndex(cycleStart: string, date: Date) {
  const diff = Math.round((date.getTime() - parseISO(cycleStart).getTime()) / 86_400_000);
  return ((diff % 14) + 14) % 14;
}

export type MonthCell = { day: number; iso: string; night: Parent; visit?: Parent } | null;

/** Siatka miesiąca (tygodnie od poniedziałku), z przypisaniem nocy wg cyklu. */
export function buildMonth(cycle: CycleDay[], cycleStart: string, year: number, month: number): MonthCell[] {
  const first = new Date(Date.UTC(year, month, 1));
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const lead = (first.getUTCDay() + 6) % 7;
  const cells: MonthCell[] = [...Array(lead)].map(() => null);
  for (let d = 1; d <= days; d++) {
    const date = new Date(Date.UTC(year, month, d));
    const c = cycle[cycleIndex(cycleStart, date)];
    cells.push({ day: d, iso: toISO(date), night: c.night, visit: c.visit });
  }
  while (cells.length % 7) cells.push(null);
  return cells;
}

export function monthNights(cells: MonthCell[]) {
  const real = cells.filter(Boolean) as Exclude<MonthCell, null>[];
  const A = real.filter((c) => c.night === "A").length;
  return { A, B: real.length - A };
}

/* ---------- treści ---------- */
const names = (a: ParentingAnswers) => ({ A: a.labelA || "Rodzic A", B: a.labelB || "Rodzic B" });
const hasSchedule = (a: ParentingAnswers) => a.form === "two-homes" || a.form === "nesting";

export function describeWeek(cycle: CycleDay[], labelA: string, labelB: string, week: 0 | 1, nesting = false): string {
  const name = (p: Parent) => (p === "A" ? labelA : labelB);
  const what = (p: Parent) => (nesting ? `z dzieckiem: ${name(p)}` : `noc u: ${name(p)}`);
  const parts: string[] = [];
  let start = 0;
  for (let i = 1; i <= 7; i++) {
    const cur = cycle[week * 7 + start].night;
    if (i === 7 || cycle[week * 7 + i].night !== cur) {
      const range = start === i - 1 ? DAYS_LONG[start] : `od ${DAYS_LONG[start]} do ${DAYS_LONG[i - 1]}`;
      parts.push(`${range}: ${what(cur)}`);
      start = i;
    }
  }
  const visits = cycle.slice(week * 7, week * 7 + 7).map((d, i) => (d.visit ? `${DAYS_LONG[i]} po południu: spotkanie z: ${name(d.visit)} (bez noclegu)` : null)).filter(Boolean) as string[];
  return [...parts, ...visits].join("; ");
}

export function nestingUntilLabel(a: ParentingAnswers): string | undefined {
  if (a.nestingUntil === "other") return a.nestingUntilText.trim() || undefined;
  return a.nestingUntil && a.nestingUntil !== "tbd" ? NESTING_UNTIL[a.nestingUntil] : undefined;
}

export function careFormText(a: ParentingAnswers): string | undefined {
  if (!a.form) return undefined;
  if (a.form === "nesting") return `gniazdowanie (rozwiązanie przejściowe, ${nestingUntilLabel(a) ?? "czas trwania do ustalenia"})`;
  if (a.form === "flexible") return "kontakty ustalane na bieżąco, bez szczegółowego harmonogramu";
  return a.preset && a.preset !== "blank" ? `dwa domy, układ bazowy: ${PRESETS[a.preset].label}` : "dwa domy, własny układ";
}

export function decisionsText(a: ParentingAnswers) {
  const imp = IMPORTANT.filter((x) => a.important.includes(x.id)).map((x) => x.label);
  if (a.importantOther.trim()) imp.push(a.importantOther.trim());
  return {
    everyday: a.everyday.trim() || undefined,
    important: imp.length ? `Istotne sprawy dziecka rodzice rozstrzygają wspólnie: ${imp.join(", ")}.` : undefined,
    urgent: a.urgent.trim() || undefined,
  };
}

export function callsText(a: ParentingAnswers): string | undefined {
  if (a.calls === "free") return "swobodny kontakt telefoniczny i wideo z drugim rodzicem, bez stałych godzin, z poszanowaniem rytmu dnia dziecka";
  if (a.calls === "fixed") return a.callsText.trim() ? `stałe pory kontaktu: ${a.callsText.trim()}` : undefined;
  return undefined;
}

export function openPoints(a: ParentingAnswers): string[] {
  const p: string[] = [];
  const { A, B } = names(a);
  if (!a.form) p.push("Forma opieki");
  if (a.form === "nesting" && !nestingUntilLabel(a)) p.push("Do kiedy trwa gniazdowanie i co dalej");
  if (a.form === "nesting" && !a.nestingRules.trim()) p.push("Zasady gniazdowania: drugie mieszkanie, koszty, prywatność");
  if (a.form === "flexible" && !a.flexibleRules.trim()) p.push("Zasady ustalania kontaktów na bieżąco");
  if (a.form === "flexible" && a.fallback && !a.fallbackText.trim()) p.push("Rytm zastępczy na wypadek braku porozumienia");
  if (hasSchedule(a)) {
    for (const t of transitions(a.grid)) {
      const h = handoverFor(a, t);
      if (!h.time || (h.how === "other" && !h.place.trim())) p.push(`Przekazanie: ${dayName(t.day)}, godzina lub sposób`);
    }
    if (buildCycle(a).some((d) => d.visit) && (!a.visitFrom || !a.visitTo)) p.push("Godziny popołudni bez noclegu");
  }
  for (const h of HOLIDAYS) if (!describeHoliday(h.id, a.holidays[h.id], A, B)) p.push(h.label);
  const d = decisionsText(a);
  if (!d.everyday) p.push("Kto rozstrzyga bieżące sprawy dziecka");
  if (!d.important) p.push("Lista istotnych spraw rozstrzyganych wspólnie");
  if (!d.urgent) p.push("Postępowanie w nagłych sytuacjach");
  if (!callsText(a)) p.push("Kontakt telefoniczny z drugim rodzicem");
  for (const t of OTHER_TERMS) if (!a.other[t.id].trim()) p.push(t.label);
  if (a.distance === "far") p.push("Logistyka przy dużej odległości: koszty i czas dojazdów, nauka w dniach dojazdów");
  return p;
}

export function ageConsiderations(a: ParentingAnswers): string[] {
  const out: string[] = [];
  if (a.ages.includes("0-3")) out.push("Przy najmłodszych dzieciach często rozważa się krótsze, ale częstsze spotkania z każdym z rodziców oraz stały rytm dnia (sen, karmienie). Dłuższe rozłąki bywają dla nich trudniejsze.");
  if (a.ages.includes("4-6")) out.push("Dzieci w wieku przedszkolnym zwykle dobrze reagują na przewidywalność: stałe dni, wizualny kalendarz w obu domach, krótkie i spokojne przekazania.");
  if (a.ages.includes("7-12")) out.push("Dla dzieci w wieku szkolnym ważna jest ciągłość szkoły, lekcji i zajęć. Warto, by rytm tygodnia był podobny w obu domach.");
  if (a.ages.includes("13-18")) out.push("Nastolatki mają własne plany i relacje. Ich zdanie warto uwzględniać stosownie do wieku i dojrzałości, bez obarczania ich decyzją ani wyborem między rodzicami.");
  if ((a.children === "2" || a.children === "3+") && a.ages.length > 1) out.push("Przy rodzeństwie w różnym wieku plan bywa wspólny albo częściowo różny. Warto przemyśleć, co jest dobre dla każdego dziecka i dla ich relacji ze sobą.");
  if (a.form === "two-homes" && a.distance === "far" && transitions(a.grid).length > 2) out.push("Przy dużej odległości częste zmiany w tygodniu mogą oznaczać długie dojazdy do szkoły. Rzadsze, dłuższe pobyty bywają bardziej realne.");
  if (a.form === "nesting") out.push("Gniazdowanie daje dziecku czas na oswojenie się ze zmianą, ale dla rodziców bywa obciążające: dwa mieszkania, wspólne koszty, mniej prywatności. Warto od razu ustalić, do kiedy trwa i co potem.");
  if (a.form === "flexible") out.push("Ustalanie na bieżąco działa, gdy rodzice dobrze się komunikują. Gdy współpraca się pogorszy, rytm zastępczy daje punkt odniesienia.");
  out.push("Nie ma jednego modelu dobrego dla każdej rodziny. Najważniejsze są potrzeby i dobro dziecka, jego więzi z obojgiem rodziców oraz realne możliwości każdego z Was.");
  return out;
}

export function arrangementsSummary(a: ParentingAnswers): { label: string; value: string; open: boolean }[] {
  const { A, B } = names(a);
  const row = (label: string, v: string | undefined) => ({ label, value: v ?? "do ustalenia", open: !v });
  const d = decisionsText(a);
  const rows = [row("Forma opieki", careFormText(a))];
  if (hasSchedule(a)) {
    const n = countNights(buildCycle(a));
    rows.push(row(a.form === "nesting" ? "Dni z dzieckiem w cyklu 14 dni" : "Noce w cyklu 14 dni", `${A}: ${n.A}, ${B}: ${n.B}`));
    rows.push(row("Przekazania", transitions(a.grid).length ? transitions(a.grid).map((t) => handoverText(a, t)).join("; ") : "brak zmian w cyklu"));
  }
  if (a.form === "flexible") rows.push(row("Rytm zastępczy", a.fallback ? a.fallbackText.trim() || undefined : "nie ustalamy"));
  for (const h of HOLIDAYS) rows.push(row(h.label, describeHoliday(h.id, a.holidays[h.id], A, B)));
  rows.push(row("Bieżące sprawy", d.everyday), row("Istotne sprawy", d.important), row("Sytuacje nagłe", d.urgent), row("Kontakt telefoniczny", callsText(a)));
  for (const t of OTHER_TERMS) rows.push(row(t.label, a.other[t.id].trim() || undefined));
  return rows;
}

const dot = (s: string) => (/[.!?]$/.test(s) ? s : `${s}.`);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Treść projektu porozumienia rodzicielskiego: sekcje gotowe do druku/raportu. */
export function proposalSections(a: ParentingAnswers): { heading: string; items: string[] }[] {
  const { A, B } = names(a);
  const cycle = buildCycle(a);
  const n = countNights(cycle);
  const childrenTxt = a.children === "1" ? "dziecka" : "dzieci";
  const tbd = "do ustalenia";
  const d = decisionsText(a);
  const nesting = a.form === "nesting";

  const schedule: string[] = [];
  if (a.form === "flexible") {
    schedule.push("Rodzice nie ustalają szczegółowego harmonogramu. Kontakty ustalają na bieżąco.");
    if (a.flexibleRules.trim()) schedule.push(dot(a.flexibleRules.trim()));
    schedule.push(a.fallback && a.fallbackText.trim() ? `Jeśli rodzice nie dojdą do porozumienia, obowiązuje rytm zastępczy: ${dot(a.fallbackText.trim())}` : "Rytm zastępczy na wypadek braku porozumienia: nie ustalono.");
  } else if (hasSchedule(a)) {
    if (nesting) {
      schedule.push(`Dziecko mieszka w jednym domu, a rodzice zmieniają się w nim według harmonogramu. To rozwiązanie przejściowe, ${nestingUntilLabel(a) ?? "czas trwania do ustalenia"}.`);
      if (a.nestingRules.trim()) schedule.push(dot(a.nestingRules.trim()));
    } else if (a.preset && a.preset !== "blank") schedule.push(`Układ bazowy: ${PRESETS[a.preset].label} (dostosowany).`);
    schedule.push(`Tydzień 1: ${describeWeek(cycle, A, B, 0, nesting)}.`, `Tydzień 2: ${describeWeek(cycle, A, B, 1, nesting)}.`);
    schedule.push(`W cyklu 14 ${nesting ? "dni" : "nocy"}: ${A}: ${n.A} (${n.pctA}%), ${B}: ${n.B} (${n.pctB}%).`);
    if (cycle.some((x) => x.visit)) schedule.push(`Popołudnia bez noclegu: od ${a.visitFrom || "?"} do ${a.visitTo || "?"}.`);
  } else schedule.push(`Forma opieki: ${tbd}.`);

  const handovers = hasSchedule(a) ? transitions(a.grid).map((t) => dot(cap(handoverText(a, t)))) : [];

  const sections = [
    {
      heading: "1. Cel i zasady",
      items: [
        `Projekt dotyczy opieki nad ${childrenTxt} po rozstaniu rodziców. Ma zapewnić ${childrenTxt} stabilność, poczucie bezpieczeństwa i dobre relacje z obojgiem rodziców.`,
        "Rodzice nie angażują dziecka w swoje spory, nie przekazują przez nie wiadomości i wypowiadają się o sobie z szacunkiem.",
        "To projekt do rozmowy, nie jest wiążącą umową. Możecie go omówić we dwoje albo z mediatorem i zmienić każdy zapis.",
      ],
    },
    { heading: "2. Forma opieki i harmonogram", items: schedule },
    ...(handovers.length ? [{ heading: "3. Przekazania dziecka", items: [...handovers, "Przekazania odbywają się punktualnie i spokojnie. O opóźnieniu rodzic informuje drugiego niezwłocznie."] }] : []),
    {
      heading: "Święta, wakacje i ważne dni",
      items: [...HOLIDAYS.map((h) => `${h.label}: ${describeHoliday(h.id, a.holidays[h.id], A, B) ?? tbd}.`), "Ustalenia na święta i wakacje mają pierwszeństwo przed zwykłym harmonogramem."],
    },
    {
      heading: "Decyzje dotyczące dziecka",
      items: [
        `Bieżące sprawy: ${d.everyday ? d.everyday : tbd}`,
        `Istotne sprawy: ${d.important ? d.important : tbd}`,
        `Sytuacje nagłe: ${d.urgent ? d.urgent : tbd}`,
        "Oboje rodzice mają dostęp do informacji ze szkoły i od lekarzy oraz przekazują sobie ważne informacje o zdrowiu dziecka.",
      ].map(dot),
    },
    { heading: "Kontakt z drugim rodzicem", items: [`Kontakt: ${callsText(a) ?? tbd}.`, "Rodzic, u którego dziecko jest, wspiera jego kontakt z drugim rodzicem."] },
    { heading: "Inne ustalenia", items: OTHER_TERMS.map((t) => `${t.label}: ${dot(a.other[t.id].trim() || tbd)}`) },
    { heading: "Punkty do ustalenia", items: openPoints(a) },
  ];
  return sections.map((s, i) => ({ ...s, heading: `${i + 1}. ${s.heading.replace(/^\d+\.\s*/, "")}` }));
}
