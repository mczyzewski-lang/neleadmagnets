import "server-only";
import { createHmac, randomUUID } from "node:crypto";
import { serverConfig, crmEnabled } from "./config";

/**
 * Minimalny zakres danych przekazywanych do CRM. NIGDY nie zawiera odpowiedzi z narzędzi,
 * kwot, informacji o dzieciach ani opisu relacji.
 */
export type CrmLead = {
  id: string;
  source: "nowy-etap-narzedzia";
  sourceId: string; // identyfikator narzędzia / materiału / strony
  sourceName: string;
  submittedAt: string;
  requestType: "summary_marketing" | "material" | "plan_rozwodu" | "wycena" | "mediacja" | "duo" | "konsultacja" | "materialy";
  contact: { email: string; name?: string; phone?: string; preferredChannel?: "email" | "phone" };
  consents: { delivery?: boolean; marketingEmail: boolean; contactRequest: boolean; phoneContact: boolean; consentTextVersion: string };
  utm: Record<string, string>;
};

export function newLeadId() {
  return randomUUID();
}

export async function sendToCrm(lead: CrmLead): Promise<"sent" | "disabled" | "failed"> {
  if (!crmEnabled()) return "disabled";
  const body = JSON.stringify(lead);
  const ts = Math.floor(Date.now() / 1000).toString();
  const sig = createHmac("sha256", serverConfig.crmSecret).update(`${ts}.${body}`).digest("hex");
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(serverConfig.crmUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-NE-Timestamp": ts, "X-NE-Signature": `sha256=${sig}`, "X-NE-Lead-Id": lead.id },
        body,
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) return "sent";
    } catch {
      /* ponów raz */
    }
  }
  // Logujemy wyłącznie identyfikator — bez danych osobowych.
  console.error(`[nowy-etap] CRM webhook failed for lead ${lead.id}`);
  return "failed";
}
