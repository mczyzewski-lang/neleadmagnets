import { SITE } from "./site";

export type ReportSection = { heading: string; items: string[] };
export type Report = { title: string; intro?: string; sections: ReportSection[] };

export const REPORT_DISCLAIMER =
  "To zestawienie ma charakter informacyjny i pomocniczy. Nie jest poradą prawną, finansową ani psychologiczną i nie zastępuje indywidualnej analizy Twojej sytuacji przez prawnika, doradcę lub bank.";

export function reportToText(r: Report): string {
  const date = new Date().toLocaleDateString("pl-PL");
  const lines: string[] = [r.title.toUpperCase(), `${SITE.name} — ${SITE.tagline} · wygenerowano ${date}`, ""];
  if (r.intro) lines.push(r.intro, "");
  for (const s of r.sections) {
    if (!s.items.length) continue;
    lines.push(s.heading.toUpperCase());
    for (const i of s.items) lines.push(`• ${i}`);
    lines.push("");
  }
  lines.push(REPORT_DISCLAIMER, `Więcej narzędzi: ${SITE.url}/narzedzia`);
  return lines.join("\n");
}

export function downloadText(filename: string, text: string) {
  const blob = new Blob(["﻿" + text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Walidacja/obcięcie raportu — używana także po stronie serwera */
export function sanitizeReport(input: unknown): Report | null {
  if (!input || typeof input !== "object") return null;
  const o = input as Record<string, unknown>;
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").slice(0, max) : "");
  const title = str(o.title, 160);
  if (!title || !Array.isArray(o.sections)) return null;
  const sections = (o.sections as unknown[]).slice(0, 30).map((s) => {
    const so = (s || {}) as Record<string, unknown>;
    return {
      heading: str(so.heading, 160),
      items: Array.isArray(so.items) ? (so.items as unknown[]).slice(0, 60).map((i) => str(i, 600)).filter(Boolean) : [],
    };
  }).filter((s) => s.heading && s.items.length);
  return { title, intro: str(o.intro, 600) || undefined, sections };
}
