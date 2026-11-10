/**
 * Kalkulator kosztów wyprowadzki. Wszystkie kwoty wpisuje użytkownik — brak domyślnych „cen rynkowych”.
 */
export type MoveCategory = "najem" | "przeprowadzka" | "wyposazenie" | "media" | "przejsciowe" | "dzieci" | "inne";

export const CATEGORIES: { id: MoveCategory; label: string; color: string }[] = [
  { id: "najem", label: "Najem — na start", color: "#295550" },
  { id: "przeprowadzka", label: "Przeprowadzka", color: "#C79B59" },
  { id: "wyposazenie", label: "Meble i wyposażenie", color: "#4a6d68" },
  { id: "media", label: "Media i przyłączenia", color: "#7E5B26" },
  { id: "przejsciowe", label: "Podwójne koszty w okresie przejściowym", color: "#9fb5b1" },
  { id: "dzieci", label: "Pokój i rzeczy dla dzieci", color: "#ead9bb" },
  { id: "inne", label: "Inne", color: "#263D3A" },
];

export type MoveItem = {
  id: string;
  category: Exclude<MoveCategory, "najem" | "przejsciowe">;
  label: string;
  amount?: number;
  on: boolean;
  /** Pozycja, którą zwykle można odłożyć w czasie */
  deferrable?: boolean;
};

export type MoveInput = {
  rent?: number; // czynsz najmu miesięcznie (z opłatami)
  depositMultiplier: number; // kaucja = X × czynsz (założenie użytkownika)
  agencyFee?: number;
  firstMonthUpfront: boolean; // czynsz za pierwszy miesiąc z góry
  monthlyBills?: number; // media, internet, telefon — miesięcznie
  transitionMonths: number;
  transitionMonthly?: number; // dodatkowy koszt miesięczny w okresie przejściowym (np. dalsza rata/czynsz w poprzednim miejscu)
  savings?: number;
  items: MoveItem[];
};

let seq = 0;
const id = () => `m${++seq}`;

export function defaultItems(withKids: boolean): MoveItem[] {
  const base: Omit<MoveItem, "id">[] = [
    { category: "przeprowadzka", label: "Transport / firma przeprowadzkowa", on: true },
    { category: "przeprowadzka", label: "Kartony, materiały, przechowanie rzeczy", on: true },
    { category: "wyposazenie", label: "Łóżko i materac", on: true },
    { category: "wyposazenie", label: "Pościel, ręczniki, podstawowe tekstylia", on: true },
    { category: "wyposazenie", label: "Naczynia i sprzęty kuchenne", on: true },
    { category: "wyposazenie", label: "Pralka / lodówka (jeśli brak w mieszkaniu)", on: false },
    { category: "wyposazenie", label: "Sofa, stół, krzesła", on: true, deferrable: true },
    { category: "wyposazenie", label: "Dekoracje, oświetlenie, dodatki", on: true, deferrable: true },
    { category: "media", label: "Podłączenie internetu / sprzęt", on: true },
    { category: "media", label: "Przepisanie lub nowe umowy (prąd, gaz)", on: true },
    { category: "inne", label: "Wymiana dokumentów, adresu, drobne opłaty", on: true },
  ];
  if (withKids)
    base.push(
      { category: "dzieci", label: "Łóżko i biurko dla dziecka", on: true },
      { category: "dzieci", label: "Drugi komplet ubrań i rzeczy codziennych", on: true },
      { category: "dzieci", label: "Zabawki, książki, wyposażenie pokoju", on: true, deferrable: true },
    );
  return base.map((b) => ({ ...b, id: id() }));
}

const n = (v: number | undefined) => (v && v > 0 ? v : 0);

export type MoveSummary = {
  byCategory: Record<MoveCategory, number>;
  start: number;
  monthly: number;
  deferrable: number;
  startWithoutDeferrable: number;
  savingsAfterStart?: number;
  monthsCovered?: number;
};

export function summarizeMove(i: MoveInput): MoveSummary {
  const by = Object.fromEntries(CATEGORIES.map((c) => [c.id, 0])) as Record<MoveCategory, number>;
  const rent = n(i.rent);
  by.najem = rent * Math.max(0, i.depositMultiplier) + n(i.agencyFee) + (i.firstMonthUpfront ? rent : 0);
  by.przejsciowe = Math.max(0, Math.round(i.transitionMonths)) * n(i.transitionMonthly);
  let deferrable = 0;
  for (const it of i.items) {
    if (!it.on) continue;
    by[it.category] += n(it.amount);
    if (it.deferrable) deferrable += n(it.amount);
  }
  const start = Object.values(by).reduce((a, b) => a + b, 0);
  const monthly = rent + n(i.monthlyBills);
  const res: MoveSummary = { byCategory: by, start, monthly, deferrable, startWithoutDeferrable: start - deferrable };
  if (i.savings !== undefined) {
    res.savingsAfterStart = i.savings - start;
    res.monthsCovered = monthly > 0 ? Math.max(0, res.savingsAfterStart) / monthly : undefined;
  }
  return res;
}

export function postponeList(i: MoveInput): string[] {
  const l = i.items.filter((x) => x.on && x.deferrable).map((x) => x.label);
  l.push("Większe zakupy można rozłożyć na kilka miesięcy lub rozważyć używane meble.");
  if (n(i.agencyFee)) l.push("Zapytaj, czy można wynająć bez pośrednika lub negocjować prowizję.");
  if (i.depositMultiplier > 1) l.push("Kaucję czasem da się negocjować (np. rozłożyć na raty) — zapytaj wynajmującego.");
  return l;
}

export function tips(i: MoveInput, s: MoveSummary): string[] {
  const t: string[] = [];
  if (s.savingsAfterStart !== undefined && s.savingsAfterStart < 0) t.push("Koszty startu przekraczają podane oszczędności — rozważ odłożenie części zakupów lub inne terminy.");
  if (s.monthsCovered !== undefined && s.monthsCovered < 3 && s.savingsAfterStart! >= 0) t.push("Po starcie oszczędności pokryją mniej niż 3 miesiące nowego mieszkania. Sprawdź swój budżet w kalkulatorze „Budżet po rozstaniu”.");
  if (i.transitionMonths > 0 && n(i.transitionMonthly)) t.push("Ustal z drugą osobą na piśmie, kto i do kiedy płaci koszty dotychczasowego mieszkania.");
  t.push("Zachowaj potwierdzenia wydatków — mogą być pomocne przy późniejszych rozliczeniach.");
  t.push("Przed wyprowadzką z mieszkania z dziećmi lub wspólnego lokalu warto skonsultować skutki (np. dla ustaleń dotyczących dzieci i mieszkania).");
  return t;
}
