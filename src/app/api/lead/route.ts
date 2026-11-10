import { NextResponse, type NextRequest } from "next/server";
import { emailEnabled, crmEnabled, serverConfig, warnMissingIntegrations } from "@/lib/server/config";
import { sendEmail, renderReportEmail, renderSimpleEmail } from "@/lib/server/email";
import { sendToCrm, newLeadId, type CrmLead } from "@/lib/server/crm";
import { rateLimit } from "@/lib/server/rateLimit";
import { sanitizeReport } from "@/lib/report";
import { CONSENT_TEXT_VERSION, EMAIL_RE, PHONE_RE, SLUG_RE, REQUEST_TYPES, cleanStr, cleanUtm, type RequestType } from "@/lib/leadSchema";
import { TOOLS } from "@/lib/tools";
import { MATERIALS } from "@/content/materials";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bad = (error: string, status = 400) => NextResponse.json({ error }, { status });

/** Informacja dla interfejsu, które integracje są aktywne (bez sekretów). */
export async function GET() {
  warnMissingIntegrations();
  return NextResponse.json({ email: emailEnabled(), crm: crmEnabled() });
}

function sourceName(id: string) {
  return TOOLS.find((t) => t.slug === id)?.cardTitle || MATERIALS.find((m) => m.slug === id)?.coverTitle || (id === "plan-rozwodu" ? "Plan Rozwodu" : id);
}

export async function POST(req: NextRequest) {
  warnMissingIntegrations();
  // Ochrona przed CSRF: akceptujemy tylko żądania z tej samej domeny.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return bad("Niedozwolone źródło żądania.", 403);
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  if (!rateLimit(ip)) return bad("Zbyt wiele prób. Spróbuj ponownie za kilka minut.", 429);

  const len = Number(req.headers.get("content-length") || 0);
  if (len > 64_000) return bad("Zbyt duże zgłoszenie.", 413);
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return bad("Nieprawidłowe dane.");
  }
  // honeypot
  if (cleanStr(body.website, 100)) return NextResponse.json({ ok: true });

  const kind = body.kind;
  const email = cleanStr(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) return bad("Wpisz poprawny adres e-mail.");
  const consents = (body.consents || {}) as Record<string, unknown>;
  const marketing = consents.marketing === true;
  const utm = cleanUtm(body.attribution);
  const sourceId = cleanStr(body.tool ?? body.material ?? body.source, 60);
  if (sourceId && !SLUG_RE.test(sourceId)) return bad("Nieprawidłowe źródło.");

  const baseLead = (requestType: CrmLead["requestType"], extra: Partial<CrmLead> = {}): CrmLead => ({
    id: newLeadId(),
    source: "nowy-etap-narzedzia",
    sourceId: sourceId || "nieznane",
    sourceName: sourceName(sourceId),
    submittedAt: new Date().toISOString(),
    requestType,
    contact: { email },
    consents: { marketingEmail: marketing, contactRequest: false, phoneContact: false, consentTextVersion: CONSENT_TEXT_VERSION },
    utm,
    ...extra,
  });

  /* ---------- 1. Wysłanie podsumowania wyniku ---------- */
  if (kind === "summary") {
    if (consents.delivery !== true) return bad("Brak zgody na wysłanie podsumowania.");
    if (!emailEnabled()) return bad("Wysyłka e-mail nie jest skonfigurowana.", 503);
    const report = sanitizeReport(body.report);
    if (!report) return bad("Brak treści podsumowania.");
    try {
      const { html, text } = renderReportEmail(report);
      await sendEmail(email, `Twoje podsumowanie: ${report.title}`, html, text);
    } catch {
      return bad("Nie udało się wysłać wiadomości. Spróbuj ponownie lub pobierz PDF.", 502);
    }
    // Do CRM tylko przy dobrowolnej zgodzie marketingowej — i tylko dane kontaktowe + zgody (bez treści wyniku).
    if (marketing) await sendToCrm(baseLead("summary_marketing", { consents: { delivery: true, marketingEmail: true, contactRequest: false, phoneContact: false, consentTextVersion: CONSENT_TEXT_VERSION } }));
    return NextResponse.json({ ok: true });
  }

  /* ---------- 2. Materiał do pobrania ---------- */
  if (kind === "material") {
    const m = MATERIALS.find((x) => x.slug === sourceId);
    if (!m) return bad("Nieznany materiał.");
    if (consents.delivery !== true) return bad("Brak zgody na wysłanie materiału.");
    if (!emailEnabled()) return bad("Wysyłka e-mail nie jest skonfigurowana.", 503);
    try {
      const link = `${SITE.url}/materialy/${m.slug}/czytaj`;
      const { html, text } = renderSimpleEmail(`${m.format}: ${m.coverTitle}`, [
        "Dziękujemy za zainteresowanie materiałem Nowego Etapu.",
        "Materiał otworzysz pod poniższym linkiem. Możesz go wydrukować lub zapisać jako PDF (opcja „Drukuj” → „Zapisz jako PDF”).",
        "Materiał ma charakter informacyjny i nie stanowi porady prawnej.",
      ], { href: link, label: "Otwórz materiał" });
      await sendEmail(email, `${m.format}: ${m.coverTitle} — Nowy Etap`, html, text);
    } catch {
      return bad("Nie udało się wysłać wiadomości. Materiał możesz otworzyć od razu na stronie.", 502);
    }
    if (marketing) await sendToCrm(baseLead("material", { consents: { delivery: true, marketingEmail: true, contactRequest: false, phoneContact: false, consentTextVersion: CONSENT_TEXT_VERSION } }));
    return NextResponse.json({ ok: true });
  }

  /* ---------- 3. Prośba o kontakt / Plan Rozwodu / wycena ---------- */
  if (kind === "contact") {
    const requestType = cleanStr(body.requestType, 30) as RequestType;
    if (!REQUEST_TYPES.includes(requestType)) return bad("Wybierz, w czym możemy pomóc.");
    if (consents.contact !== true) return bad("Zaznacz zgodę na kontakt w sprawie zgłoszenia.");
    const name = cleanStr(body.name, 80);
    const phone = cleanStr(body.phone, 20);
    if (phone && !PHONE_RE.test(phone)) return bad("Sprawdź numer telefonu.");
    const phoneContact = Boolean(phone) && consents.phone === true;
    const preferredChannel = body.preferredChannel === "phone" && phoneContact ? "phone" : "email";

    const lead = baseLead(requestType, {
      contact: { email, name: name || undefined, phone: phoneContact ? phone : undefined, preferredChannel },
      consents: { marketingEmail: marketing, contactRequest: true, phoneContact, consentTextVersion: CONSENT_TEXT_VERSION },
    });
    const crm = await sendToCrm(lead);
    let notified = false;
    if (emailEnabled() && serverConfig.notifyEmail) {
      try {
        const { html, text } = renderSimpleEmail("Nowe zgłoszenie z narzędzi Nowego Etapu", [
          `Typ prośby: ${requestType}`,
          `Źródło: ${lead.sourceName}`,
          `Imię: ${name || "—"} · E-mail: ${email} · Telefon: ${phoneContact ? phone : "— (brak zgody/numeru)"}`,
          `Preferowany kontakt: ${preferredChannel}`,
          `Zgoda marketingowa: ${marketing ? "tak" : "nie"}`,
          `UTM: ${Object.entries(utm).map(([k, v]) => `${k}=${v}`).join(", ") || "—"}`,
          `ID zgłoszenia: ${lead.id}`,
        ]);
        await sendEmail(serverConfig.notifyEmail, `Zgłoszenie: ${requestType} (${lead.sourceName})`, html, text);
        notified = true;
      } catch {
        /* zignoruj — sprawdzamy poniżej */
      }
    }
    if (crm !== "sent" && !notified) {
      // Nie udajemy przyjęcia zgłoszenia, jeśli nie trafiło nigdzie.
      return bad("Przyjmowanie zgłoszeń jest chwilowo niedostępne. Spróbuj później.", 503);
    }
    if (emailEnabled()) {
      try {
        const { html, text } = renderSimpleEmail("Otrzymaliśmy Twoje zgłoszenie", [
          "Dziękujemy. Odezwiemy się w sprawie, o którą prosisz, wybranym kanałem kontaktu.",
          "Jeśli zgłoszenie zostało wysłane przez pomyłkę, odpisz na tę wiadomość — usuniemy dane.",
        ]);
        await sendEmail(email, "Nowy Etap — potwierdzenie zgłoszenia", html, text);
      } catch {}
    }
    return NextResponse.json({ ok: true, id: lead.id });
  }

  return bad("Nieznany typ zgłoszenia.");
}
