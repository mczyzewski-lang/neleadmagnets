/**
 * Przed decyzją — Mój plan wsparcia na czas rozstania.
 * Narzędzie niekliniczne: porządkuje źródła wsparcia i strategie. Nie zastępuje terapii.
 */
export type HelpType = "emotional" | "children" | "practical" | "financial" | "crisis";

export type SupportAnswers = {
  help?: Partial<Record<HelpType, string[]>>; // role ids per help type
  labels?: Partial<Record<string, string>>; // opcjonalne inicjały/etykiety dla ról (≤20 zn.)
  specialists?: string[];
  strategies?: string[];
  signals?: string[];
  triggers?: string[];
  children?: "yes" | "no";
};

export const ROLES = [
  { value: "friend", label: "Przyjaciel / przyjaciółka" },
  { value: "family", label: "Ktoś z rodziny" },
  { value: "parent", label: "Rodzic" },
  { value: "sibling", label: "Rodzeństwo" },
  { value: "coworker", label: "Osoba z pracy" },
  { value: "neighbor", label: "Sąsiad / sąsiadka" },
  { value: "none", label: "Na razie nikt" },
];

export const HELP_TYPES: { key: HelpType; label: string; q: string }[] = [
  { key: "emotional", label: "Wsparcie emocjonalne", q: "Kto może Cię wysłuchać i wesprzeć emocjonalnie?" },
  { key: "children", label: "Pomoc przy dzieciach", q: "Kto może pomóc przy dzieciach (odbiór, opieka)?" },
  { key: "practical", label: "Pomoc praktyczna", q: "Kto może pomóc praktycznie (przeprowadzka, sprawy domowe)?" },
  { key: "financial", label: "Wsparcie finansowe", q: "Do kogo możesz zwrócić się w razie pilnej potrzeby finansowej?" },
  { key: "crisis", label: "W razie kryzysu", q: "Do kogo zadzwonisz, gdy będzie naprawdę trudno?" },
];

export const SPECIALISTS = [
  { value: "psychologist", label: "Psycholog" },
  { value: "therapist", label: "Psychoterapeuta" },
  { value: "lawyer", label: "Prawnik (adwokat / radca prawny)" },
  { value: "mediator", label: "Mediator" },
  { value: "financial", label: "Doradca finansowy" },
  { value: "group", label: "Grupa wsparcia" },
  { value: "childpsych", label: "Psycholog dziecięcy" },
];

export const STRATEGIES = [
  { value: "move", label: "Ruch, spacer" },
  { value: "sleep", label: "Regularny sen" },
  { value: "talk", label: "Rozmowa z kimś bliskim" },
  { value: "nature", label: "Czas na zewnątrz, natura" },
  { value: "routine", label: "Stała rutyna dnia" },
  { value: "write", label: "Pisanie, notowanie myśli" },
  { value: "breath", label: "Ćwiczenia oddechowe, relaksacja" },
  { value: "hobby", label: "Hobby, coś dla przyjemności" },
  { value: "limit", label: "Ograniczenie wiadomości i social mediów" },
];

export const SIGNALS = [
  { value: "sleep", label: "Problemy ze snem" },
  { value: "isolation", label: "Wycofywanie się z kontaktów" },
  { value: "irritability", label: "Drażliwość, wybuchy złości" },
  { value: "appetite", label: "Zmiany apetytu" },
  { value: "focus", label: "Trudności z koncentracją" },
  { value: "rumination", label: "Ciągłe myślenie o tym samym" },
  { value: "alcohol", label: "Sięganie po alkohol lub inne substancje" },
  { value: "hopeless", label: "Poczucie beznadziei" },
];

export const TRIGGERS = [
  { value: "contact", label: "Kontakt z drugą osobą" },
  { value: "handover", label: "Przekazywanie dzieci" },
  { value: "evenings", label: "Wieczory i weekendy w samotności" },
  { value: "holidays", label: "Święta, rocznice, urodziny" },
  { value: "money", label: "Sprawy finansowe" },
  { value: "family", label: "Pytania rodziny i znajomych" },
  { value: "social", label: "Media społecznościowe" },
  { value: "legal", label: "Pisma i formalności" },
];

const labelOf = (list: { value: string; label: string }[], v: string) => list.find((x) => x.value === v)?.label ?? v;

export function roleName(a: SupportAnswers, role: string) {
  const custom = a.labels?.[role]?.trim();
  const base = labelOf(ROLES, role);
  return custom ? `${base} (${custom.slice(0, 20)})` : base;
}

export type SupportRow = { help: string; who: string[] };
export function supportMatrix(a: SupportAnswers): SupportRow[] {
  return HELP_TYPES.map((h) => ({ help: h.label, who: (a.help?.[h.key] || []).filter((r) => r !== "none").map((r) => roleName(a, r)) }));
}

export function gaps(a: SupportAnswers): string[] {
  return supportMatrix(a).filter((r) => r.who.length === 0).map((r) => r.help);
}

const STRATEGY_FOR_SIGNAL: Record<string, string> = {
  sleep: "Stałe pory snu, bez ekranu godzinę przed snem; jeśli problem trwa ponad 2 tygodnie — porozmawiaj z lekarzem.",
  isolation: "Umów jedno krótkie spotkanie lub rozmowę telefoniczną w tym tygodniu.",
  irritability: "Zrób przerwę przed odpowiedzią na trudną wiadomość — wróć do niej po kilku godzinach.",
  appetite: "Zaplanuj proste, regularne posiłki — nawet małe.",
  focus: "Rozbij zadania na małe kroki i rób jedną rzecz naraz.",
  rumination: "Zapisz myśli na kartce i odłóż je do „czasu na zamartwianie się” (np. 15 minut dziennie).",
  alcohol: "Zwróć uwagę, kiedy i dlaczego sięgasz po alkohol; rozważ rozmowę ze specjalistą.",
  hopeless: "Porozmawiaj z kimś dziś. Jeśli pojawiają się myśli o zrobieniu sobie krzywdy — dzwoń pod 116 123, 800 70 2222 lub 112.",
};

const STRATEGY_FOR_TRIGGER: Record<string, string> = {
  contact: "Ustal stałe pory i kanał kontaktu (np. tylko wiadomości pisemne w sprawach organizacyjnych).",
  handover: "Zaplanuj krótkie, przewidywalne przekazania; po nich — coś dla siebie.",
  evenings: "Zaplanuj wieczory z wyprzedzeniem: telefon do bliskiej osoby, spacer, hobby.",
  holidays: "Zaplanuj trudne daty z wyprzedzeniem i zdecyduj, z kim je spędzisz.",
  money: "Sprawy finansowe załatwiaj w ustalonym czasie, z listą do odhaczenia.",
  family: "Przygotuj jedno zdanie na pytania: „Dziękuję, nie chcę teraz o tym rozmawiać”.",
  social: "Wycisz lub ogranicz konta, które wywołują napięcie.",
  legal: "Pisma otwieraj, gdy masz czas i wsparcie; zapisz pytania do specjalisty.",
};

export type IfThen = { when: string; then: string };
export function ifThenPlan(a: SupportAnswers): IfThen[] {
  const rows: IfThen[] = [];
  for (const s of a.signals || []) if (STRATEGY_FOR_SIGNAL[s]) rows.push({ when: `Zauważam: ${labelOf(SIGNALS, s).toLowerCase()}`, then: STRATEGY_FOR_SIGNAL[s] });
  for (const t of a.triggers || []) if (STRATEGY_FOR_TRIGGER[t]) rows.push({ when: `Trudna sytuacja: ${labelOf(TRIGGERS, t).toLowerCase()}`, then: STRATEGY_FOR_TRIGGER[t] });
  return rows;
}

export function myStrategies(a: SupportAnswers): string[] {
  return (a.strategies || []).map((s) => labelOf(STRATEGIES, s));
}

export function hardDayPlan(a: SupportAnswers): string[] {
  const crisis = supportMatrix(a).find((r) => r.help === "W razie kryzysu")?.who ?? [];
  const strategies = myStrategies(a);
  const plan = [
    "Zatrzymaj się na chwilę: trzy spokojne, głębokie oddechy.",
    strategies.length ? `Sięgnij po jedną ze swoich strategii: ${strategies.slice(0, 3).join(", ").toLowerCase()}.` : "Wybierz jedną małą rzecz, która zwykle Ci pomaga (spacer, prysznic, herbata).",
    crisis.length ? `Odezwij się do: ${crisis.join(", ")}.` : "Zadzwoń do kogoś zaufanego lub na kryzysowy telefon zaufania 116 123.",
    "Odłóż ważne decyzje i trudne wiadomości na jutro.",
    "Jeśli czujesz, że nie dajesz rady albo grozi Ci niebezpieczeństwo — dzwoń pod 112.",
  ];
  return plan;
}

export function childrenPlan(a: SupportAnswers): string[] {
  if (a.children !== "yes") return [];
  return [
    "Zachowaj stałe rytuały dnia dzieci (posiłki, sen, wyjścia).",
    "Poinformuj wychowawcę lub pedagoga szkolnego o zmianach w rodzinie, jeśli uważasz to za pomocne.",
    "Daj dzieciom prawo do wszystkich emocji i zapewnij, że to nie ich wina.",
    "Nie rozmawiaj przy dzieciach o konfliktach i nie proś ich o przekazywanie wiadomości.",
    "Dla dzieci i młodzieży: bezpłatny telefon zaufania 116 111.",
  ];
}

export const WEEKLY_CHECKIN = [
  "Jak spałem/spałam w tym tygodniu?",
  "Z kim rozmawiałem/rozmawiałam o tym, co przeżywam?",
  "Co mi pomogło, a co było najtrudniejsze?",
  "Czy korzystam ze swoich strategii?",
  "Czy potrzebuję dodatkowego wsparcia specjalisty?",
];

export const HELPLINES = [
  { n: "112", t: "Numer alarmowy — zagrożenie życia lub zdrowia" },
  { n: "116 123", t: "Kryzysowy telefon zaufania dla dorosłych" },
  { n: "800 70 2222", t: "Centrum Wsparcia dla osób w stanie kryzysu psychicznego" },
  { n: "800 120 002", t: "Niebieska Linia — pomoc dla osób doznających przemocy domowej" },
];

export function specialistsList(a: SupportAnswers) {
  return (a.specialists || []).map((s) => labelOf(SPECIALISTS, s));
}
