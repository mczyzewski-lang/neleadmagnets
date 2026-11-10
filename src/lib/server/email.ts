import "server-only";
import { serverConfig, emailEnabled } from "./config";
import type { Report } from "@/lib/report";
import { REPORT_DISCLAIMER } from "@/lib/report";
import { SITE } from "@/lib/site";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEmail(to: string, subject: string, html: string, text: string) {
  if (!emailEnabled()) throw new Error("email_not_configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${serverConfig.resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: serverConfig.emailFrom, to: [to], subject, html, text }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`email_provider_${res.status}`);
}

export function renderReportEmail(r: Report) {
  const sections = r.sections
    .map((s) => `<h3 style="color:#263D3A;font-size:16px;margin:24px 0 8px">${esc(s.heading)}</h3><ul style="padding-left:18px;margin:0">${s.items.map((i) => `<li style="margin:4px 0">${esc(i)}</li>`).join("")}</ul>`)
    .join("");
  const html = `<!doctype html><html lang="pl"><body style="margin:0;background:#FCF9F8;font-family:Arial,Helvetica,sans-serif;color:#1f2b29;line-height:1.55">
<div style="max-width:620px;margin:0 auto;padding:24px">
<p style="font-size:12px;letter-spacing:2px;color:#7E5B26;text-transform:uppercase;margin:0 0 4px">Nowy Etap · Poradnia rozwodowa</p>
<h1 style="color:#263D3A;font-size:22px;margin:0 0 12px">${esc(r.title)}</h1>
${r.intro ? `<p>${esc(r.intro)}</p>` : ""}
${sections}
<p style="font-size:12px;color:#5e6b69;margin-top:28px;border-top:1px solid #e2dbd3;padding-top:12px">${esc(REPORT_DISCLAIMER)}</p>
<p style="font-size:12px;color:#5e6b69">Otrzymujesz tę wiadomość, ponieważ poprosiłeś/poprosiłaś o wysłanie podsumowania z narzędzia na stronie ${esc(SITE.url)}. To jednorazowa wysyłka.</p>
</div></body></html>`;
  const text = [r.title, "", r.intro || "", ...r.sections.flatMap((s) => [s.heading.toUpperCase(), ...s.items.map((i) => `• ${i}`), ""]), REPORT_DISCLAIMER].join("\n");
  return { html, text };
}

export function renderSimpleEmail(title: string, paragraphs: string[], link?: { href: string; label: string }) {
  const html = `<!doctype html><html lang="pl"><body style="margin:0;background:#FCF9F8;font-family:Arial,Helvetica,sans-serif;color:#1f2b29;line-height:1.55"><div style="max-width:620px;margin:0 auto;padding:24px">
<p style="font-size:12px;letter-spacing:2px;color:#7E5B26;text-transform:uppercase;margin:0 0 4px">Nowy Etap · Poradnia rozwodowa</p>
<h1 style="color:#263D3A;font-size:22px">${esc(title)}</h1>${paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
${link ? `<p><a href="${esc(link.href)}" style="display:inline-block;background:#295550;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none">${esc(link.label)}</a></p>` : ""}
</div></body></html>`;
  const text = [title, "", ...paragraphs, link ? `${link.label}: ${link.href}` : ""].join("\n\n");
  return { html, text };
}
