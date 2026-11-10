/**
 * Narzędzie 3 — Plan opieki nad dzieckiem.
 * Deterministyczny generator harmonogramu (cykl 14 dni) i treści propozycji planu.
 * Nie rekomenduje modelu opieki — rozpisuje wybrany przez użytkownika.
 * Nie zbiera imion ani danych identyfikujących dzieci.
 */

export type Parent = "A" | "B";
export type ModelId = "main-a-eow" | "main-a-eow-mid" | "223" | "week" | "5225" | "custom";
export type Tbd = "tbd";

export type ParentingAnswers = {
  children?: "1" | "2" | "3+";
  ages: string[]; // "0-3" | "4-6" | "7-12" | "13-18"
  distance?: "near" | "mid" | "far";
  school?: "zlobek" | "przedszkole" | "szkola" | "mixed" | "none";
  labelA: string;
  labelB: string;
  model?: ModelId;
  custom: Parent[]; // 14 nocy
  handover?: "fri-school" | "fri-evening" | "sat-morning" | Tbd;
  returnTime?: "sun-evening" | "mon-school" | Tbd;
  summer?: "half" | "two-weeks" | "custom" | Tbd;
  christmas?: "alternate" | "split" | "fixed" | Tbd;
  easter?: "alternate" | "split" | "fixed" | Tbd;
  birthdays?: "both-short" | "where-falls" | "parents-days" | Tbd;
  transport?: "giver" | "receiver" | "school" | "shared" | Tbd;
  calls?: "daily" | "set-days" | "flexible" | Tbd;
  activities?: "both-agree" | "own-time" | "shared-cost" | Tbd;
  decisions?: "jointly" | "inform" | Tbd;
  safety?: "ok" | "hard" | "unsafe";
  cycleStart?: string; // RRRR-MM-DD (poniedziałek tygodnia 1)
};

export const DAYS_SHORT = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
export const DAYS_LONG = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];

export const MODEL_LABELS: Record<ModelId, { label: string; desc: string }> = {
  "main-a-eow": { label: "Główne miejsce u jednego rodzica + co drugi weekend u drugiego", desc: "Dziecko mieszka na co dzień w jednym domu, co drugi weekend spędza w drugim." },
  "main-a-eow-mid": { label: "Jak wyżej + popołudnie w tygodniu", desc: "Dodatkowo stałe popołudnie (bez nocowania) u drugiego rodzica, np. w środę." },
  "223": { label: "Model 2-2-3", desc: "Dwa dni u jednego, dwa u drugiego, trzy dni (weekend) na zmianę." },
  week: { label: "Tydzień / tydzień", desc: "Pełny tydzień w jednym domu, kolejny w drugim." },
  "5225": { label: "Model 5-2-2-5", desc: "Stałe dni w tygodniu u każdego rodzica, weekendy na zmianę." },
  custom: { label: "Własny układ", desc: "Sam(a) przypiszesz każdą noc w dwutygodniowym cyklu." },
};

export type CycleDay = { night: Parent; visit?: Parent };

export function defaultAnswers(): ParentingAnswers {
  return { ages: [], labelA: "Rodzic A", labelB: "Rodzic B", custom: [...Array(14)].map((_, i) => (i === 11 || i === 12 ? "B" : "A")) };
}

/** Zwraca 14 dni cyklu (indeks 0 = poniedziałek tygodnia 1). Noc przypisana rodzicowi, u którego dziecko nocuje. */
export function buildCycle(a: ParentingAnswers): CycleDay[] {
  const all = (p: Parent): CycleDay[] => [...Array(14)].map(() => ({ night: p }));
  const sundayB = a.returnTime === "mon-school";
  switch (a.model) {
    case "main-a-eow":
    case "main-a-eow-mid": {
      const c = all("A");
      // tydzień 2: piątek (11) i sobota (12) — noce u B; niedziela (13) u B tylko przy powrocie w poniedziałek do szkoły
      if (a.handover !== "sat-morning") c[11] = { night: "B" };
      c[12] = { night: "B" };
      if (sundayB) c[13] = { night: "B" };
      if (a.model === "main-a-eow-mid") {
        c[2] = { night: "A", visit: "B" };
        c[9] = { night: "A", visit: "B" };
      }
      return c;
    }
    case "223": {
      const w1: Parent[] = ["A", "A", "B", "B", "A", "A", "A"];
      const w2: Parent[] = ["B", "B", "A", "A", "B", "B", "B"];
      return [...w1, ...w2].map((night) => ({ night }));
    }
    case "week":
      return [...Array(14)].map((_, i) => ({ night: i < 7 ? "A" : "B" }));
    case "5225": {
      const w1: Parent[] = ["A", "A", "B", "B", "A", "A", "A"];
      const w2: Parent[] = ["A", "A", "B", "B", "B", "B", "B"];
      return [...w1, ...w2].map((night) => ({ night }));
    }
    case "custom":
      return (a.custom.length === 14 ? a.custom : defaultAnswers().custom).map((night) => ({ night }));
    default:
      return all("A");
  }
}

export function countNights(cycle: CycleDay[]) {
  const A = cycle.filter((d) => d.night === "A").length;
  const B = cycle.length - A;
  return { A, B, pctA: Math.round((A / cycle.length) * 100), pctB: Math.round((B / cycle.length) * 100) };
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
export const OPTION_TEXT = {
  handover: { "fri-school": "w piątek — odbiór ze szkoły/przedszkola", "fri-evening": "w piątek wieczorem", "sat-morning": "w sobotę rano" },
  returnTime: { "sun-evening": "w niedzielę wieczorem", "mon-school": "w poniedziałek — odprowadzenie do szkoły/przedszkola" },
  summer: { half: "wakacje dzielone po połowie (np. lipiec / sierpień, na zmianę co roku)", "two-weeks": "wakacje w blokach po dwa tygodnie na zmianę", custom: "wakacje według corocznych ustaleń do określonego terminu (np. do 30 kwietnia)" },
  christmas: { alternate: "Boże Narodzenie (Wigilia i święta) naprzemiennie co roku", split: "podział świąt: Wigilia u jednego rodzica, pierwszy/drugi dzień świąt u drugiego — z zamianą co roku", fixed: "stały podział świąt każdego roku" },
  easter: { alternate: "Wielkanoc naprzemiennie co roku", split: "podział świąt wielkanocnych na dni, z zamianą co roku", fixed: "stały podział Wielkanocy" },
  birthdays: { "both-short": "urodziny dziecka: każdy rodzic spędza z dzieckiem część dnia lub osobne świętowanie", "where-falls": "urodziny dziecka: świętowanie u rodzica, u którego dziecko akurat przebywa, drugi rodzic ma krótkie spotkanie lub telefon", "parents-days": "Dzień Matki, Dzień Ojca i urodziny rodziców — dziecko spędza z danym rodzicem" },
  transport: { giver: "przewozi rodzic, u którego dziecko przebywało (odwozi)", receiver: "przewozi rodzic, do którego dziecko jedzie (odbiera)", school: "przekazanie przez szkołę/przedszkole (jeden odprowadza, drugi odbiera)", shared: "przejazdy dzielone po równo / spotkanie w połowie drogi" },
  calls: { daily: "codzienny krótki kontakt telefoniczny lub wideo z drugim rodzicem o stałej porze", "set-days": "kontakt telefoniczny lub wideo w ustalone dni", flexible: "kontakt elastyczny, z inicjatywy dziecka, bez ustalonych godzin" },
  activities: { "both-agree": "nowe zajęcia dodatkowe po uzgodnieniu obojga rodziców", "own-time": "każdy rodzic organizuje zajęcia w swoim czasie, zajęcia stałe są kontynuowane w obu domach", "shared-cost": "zajęcia uzgadniane wspólnie, koszty dzielone według ustalonej proporcji" },
  decisions: { jointly: "istotne sprawy dziecka (szkoła, leczenie planowe, wyjazdy zagraniczne) rodzice podejmują wspólnie", inform: "bieżące sprawy decyduje rodzic, u którego dziecko przebywa; o istotnych sprawach rodzice informują się i uzgadniają je wspólnie" },
} as const;

const L = <K extends keyof typeof OPTION_TEXT>(k: K, v?: string) => (v && v !== "tbd" ? (OPTION_TEXT[k] as Record<string, string>)[v] : undefined);

export function openPoints(a: ParentingAnswers): string[] {
  const p: string[] = [];
  const check: [keyof ParentingAnswers, string][] = [
    ["handover", "Godzina i sposób przekazania dziecka na weekend"],
    ["returnTime", "Termin powrotu dziecka po weekendzie"],
    ["summer", "Podział wakacji letnich"],
    ["christmas", "Boże Narodzenie i Wigilia"],
    ["easter", "Wielkanoc"],
    ["birthdays", "Urodziny dziecka i inne ważne okazje"],
    ["transport", "Kto przewozi dziecko między domami"],
    ["calls", "Kontakt telefoniczny / wideo z drugim rodzicem"],
    ["activities", "Zajęcia dodatkowe — wybór i koszty"],
    ["decisions", "Sposób podejmowania decyzji o edukacji i zdrowiu"],
  ];
  for (const [k, label] of check) if (a[k] === "tbd") p.push(label);
  if (!a.model) p.push("Podstawowy model opieki w tygodniu");
  p.push("Ferie zimowe, długie weekendy i dni wolne od szkoły");
  if (a.distance === "far") p.push("Logistyka przy dużej odległości — koszty i czas dojazdów, nauka w dniach dojazdów");
  p.push("Co robicie, gdy dziecko jest chore w dniu przekazania lub plan trzeba zmienić");
  p.push("Jak i kiedy wspólnie przeglądacie plan (np. co pół roku lub przy zmianie szkoły)");
  return p;
}

export function ageConsiderations(a: ParentingAnswers): string[] {
  const out: string[] = [];
  if (a.ages.includes("0-3")) out.push("Przy najmłodszych dzieciach często rozważa się krótsze, ale częstsze spotkania z każdym z rodziców oraz stały rytm dnia (sen, karmienie). Dłuższe rozłąki bywają dla nich trudniejsze.");
  if (a.ages.includes("4-6")) out.push("Dzieci w wieku przedszkolnym zwykle dobrze reagują na przewidywalność: stałe dni, wizualny kalendarz w obu domach, krótkie i spokojne przekazania.");
  if (a.ages.includes("7-12")) out.push("Dla dzieci w wieku szkolnym ważna jest ciągłość szkoły, odrabiania lekcji i zajęć — warto, by rytm tygodnia był podobny w obu domach.");
  if (a.ages.includes("13-18")) out.push("Nastolatki mają własne plany i relacje. Ich zdanie warto uwzględniać stosownie do wieku i dojrzałości — bez obarczania ich decyzją ani wyborem między rodzicami.");
  if ((a.children === "2" || a.children === "3+") && a.ages.length > 1) out.push("Przy rodzeństwie w różnym wieku czasem plan jest wspólny, a czasem częściowo różny — warto przemyśleć, co jest dobre dla każdego z dzieci i dla ich relacji ze sobą.");
  if (a.distance === "far" && (a.model === "223" || a.model === "5225" || a.model === "week")) out.push("Przy dużej odległości między domami częste zmiany w tygodniu mogą oznaczać długie dojazdy do szkoły. To kwestia do przemyślenia przy wyborze modelu.");
  out.push("Nie ma jednego modelu dobrego dla każdej rodziny. Najważniejsze są potrzeby i dobro dziecka, jego więzi z obojgiem rodziców oraz realne możliwości każdego z Was.");
  return out;
}

export function arrangementsSummary(a: ParentingAnswers): { label: string; value: string; open: boolean }[] {
  const row = (label: string, v: string | undefined) => ({ label, value: v ?? "do ustalenia", open: !v });
  return [
    row("Model w tygodniu", a.model ? MODEL_LABELS[a.model].label : undefined),
    row("Przekazanie na weekend", L("handover", a.handover)),
    row("Powrót po weekendzie", L("returnTime", a.returnTime)),
    row("Wakacje", L("summer", a.summer)),
    row("Boże Narodzenie", L("christmas", a.christmas)),
    row("Wielkanoc", L("easter", a.easter)),
    row("Urodziny i okazje", L("birthdays", a.birthdays)),
    row("Transport", L("transport", a.transport)),
    row("Kontakt telefoniczny / wideo", L("calls", a.calls)),
    row("Zajęcia dodatkowe", L("activities", a.activities)),
    row("Edukacja i zdrowie", L("decisions", a.decisions)),
  ];
}

export function describeWeek(cycle: CycleDay[], labelA: string, labelB: string, week: 0 | 1): string {
  const name = (p: Parent) => (p === "A" ? labelA : labelB);
  const parts: string[] = [];
  let start = 0;
  for (let i = 1; i <= 7; i++) {
    const cur = cycle[week * 7 + start].night;
    if (i === 7 || cycle[week * 7 + i].night !== cur) {
      const range = start === i - 1 ? DAYS_LONG[start] : `${DAYS_LONG[start]}–${DAYS_LONG[i - 1]}`;
      parts.push(`${range}: noc u ${name(cur)}`);
      start = i;
    }
  }
  const visits = cycle.slice(week * 7, week * 7 + 7).map((d, i) => (d.visit ? `${DAYS_LONG[i]} po południu: spotkanie z ${name(d.visit)} (bez nocowania)` : null)).filter(Boolean) as string[];
  return [...parts, ...visits].join("; ");
}

/** Treść „Wstępnej propozycji planu rodzicielskiego” — sekcje gotowe do druku/raportu. */
export function proposalSections(a: ParentingAnswers): { heading: string; items: string[] }[] {
  const cycle = buildCycle(a);
  const n = countNights(cycle);
  const A = a.labelA || "Rodzic A";
  const B = a.labelB || "Rodzic B";
  const sum = arrangementsSummary(a);
  const get = (label: string) => sum.find((s) => s.label === label)!.value;
  const childrenTxt = a.children === "1" ? "dziecka" : "dzieci";
  return [
    {
      heading: "1. Cel i zasady",
      items: [
        `Propozycja dotyczy organizacji opieki nad ${childrenTxt} po rozstaniu rodziców. Jej celem jest zapewnienie ${childrenTxt} stabilności, poczucia bezpieczeństwa i dobrych relacji z obojgiem rodziców.`,
        "Rodzice zobowiązują się nie angażować dziecka w swoje spory, nie przekazywać przez nie wiadomości i wypowiadać się o sobie nawzajem z szacunkiem.",
        "Plan jest propozycją do rozmowy — nie jest wiążącą umową. Może zostać zmieniony po uzgodnieniu obojga rodziców.",
      ],
    },
    {
      heading: "2. Harmonogram tygodniowy (cykl dwutygodniowy)",
      items: [
        `Model: ${get("Model w tygodniu")}.`,
        `Tydzień 1 — ${describeWeek(cycle, A, B, 0)}.`,
        `Tydzień 2 — ${describeWeek(cycle, A, B, 1)}.`,
        `W cyklu 14 nocy: ${A} — ${n.A} (${n.pctA}%), ${B} — ${n.B} (${n.pctB}%).`,
        `Przekazanie na weekend: ${get("Przekazanie na weekend")}. Powrót: ${get("Powrót po weekendzie")}.`,
      ],
    },
    { heading: "3. Wakacje, święta i ważne okazje", items: [`Wakacje: ${get("Wakacje")}.`, `Boże Narodzenie: ${get("Boże Narodzenie")}.`, `Wielkanoc: ${get("Wielkanoc")}.`, `Urodziny i okazje: ${get("Urodziny i okazje")}.`, "Plan w okresach świątecznych i wakacyjnych ma pierwszeństwo przed harmonogramem tygodniowym."] },
    { heading: "4. Transport i przekazania", items: [`Transport: ${get("Transport")}.`, "Przekazania odbywają się punktualnie i spokojnie; o opóźnieniach rodzic informuje drugiego niezwłocznie."] },
    { heading: "5. Kontakt z drugim rodzicem", items: [`Kontakt: ${get("Kontakt telefoniczny / wideo")}.`, "Rodzic, u którego dziecko przebywa, wspiera jego kontakt z drugim rodzicem."] },
    { heading: "6. Edukacja, zdrowie i zajęcia", items: [`Decyzje: ${get("Edukacja i zdrowie")}.`, `Zajęcia dodatkowe: ${get("Zajęcia dodatkowe")}.`, "Oboje rodzice mają dostęp do informacji ze szkoły/przedszkola i od lekarzy oraz przekazują sobie istotne informacje o zdrowiu dziecka."] },
    { heading: "7. Zmiany i rozwiązywanie nieporozumień", items: ["Zmiany jednorazowe rodzice uzgadniają z wyprzedzeniem, najlepiej na piśmie (np. wiadomością).", "W razie sporu rodzice najpierw próbują porozumieć się sami; mogą skorzystać z pomocy mediatora rodzinnego (mediacja jest dobrowolna).", "Rodzice przeglądają plan w ustalonym terminie lub przy istotnej zmianie (np. zmiana szkoły, przeprowadzka)."] },
    { heading: "8. Punkty do ustalenia", items: openPoints(a) },
  ];
}
