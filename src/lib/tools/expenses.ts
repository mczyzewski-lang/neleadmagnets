/** Wspólna logika pozycji wydatków z częstotliwością (narzędzia 2 i 6). */
export type Frequency = "monthly" | "quarterly" | "halfyear" | "yearly" | "once";

export const FREQUENCIES: { value: Frequency; label: string; short: string }[] = [
  { value: "monthly", label: "miesięcznie", short: "/mies." },
  { value: "quarterly", label: "co kwartał", short: "/kw." },
  { value: "halfyear", label: "co pół roku", short: "/pół roku" },
  { value: "yearly", label: "rocznie", short: "/rok" },
  { value: "once", label: "jednorazowo", short: "jednorazowo" },
];

const DIV: Record<Exclude<Frequency, "once">, number> = { monthly: 1, quarterly: 3, halfyear: 6, yearly: 12 };

/** Miesięczny ekwiwalent kwoty. Wydatki jednorazowe zwracają 0 (liczone osobno). */
export function monthlyEquivalent(amount: number | undefined, freq: Frequency): number {
  const v = amount && Number.isFinite(amount) && amount > 0 ? amount : 0;
  if (freq === "once") return 0;
  return v / DIV[freq];
}

export function oneOffAmount(amount: number | undefined, freq: Frequency): number {
  return freq === "once" && amount && amount > 0 ? amount : 0;
}

let counter = 0;
export function uid(prefix = "l") {
  counter += 1;
  return `${prefix}${Date.now().toString(36)}${counter}`;
}

export const round = (v: number) => Math.round(v);
