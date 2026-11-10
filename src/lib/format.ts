const pln = new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 1 });

export function formatPLN(v: number | null | undefined): string {
  if (v === null || v === undefined || !Number.isFinite(v)) return "—";
  return pln.format(Math.round(v)).replace(/ /g, " ");
}
export function formatNum(v: number): string {
  return num.format(v).replace(/ /g, " ");
}
/** Bezpieczne parsowanie kwot wpisanych przez użytkownika („12 500,50”, „12500”). */
export function parseAmount(raw: string | number | null | undefined): number {
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : 0;
  if (!raw) return 0;
  const cleaned = String(raw).replace(/\s| /g, "").replace(",", ".").replace(/[^0-9.\-]/g, "");
  const v = parseFloat(cleaned);
  if (!Number.isFinite(v)) return 0;
  return Math.max(-1e9, Math.min(1e9, v));
}
export function plural(n: number, one: string, few: string, many: string) {
  const abs = Math.abs(n);
  if (abs === 1) return one;
  const d = abs % 10;
  const dd = abs % 100;
  if (d >= 2 && d <= 4 && (dd < 12 || dd > 14)) return few;
  return many;
}
export function todayPL() {
  return new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" });
}
