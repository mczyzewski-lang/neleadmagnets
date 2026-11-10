import "server-only";

export const serverConfig = {
  resendKey: process.env.RESEND_API_KEY || "",
  emailFrom: process.env.EMAIL_FROM || "",
  notifyEmail: process.env.LEADS_NOTIFY_EMAIL || "",
  crmUrl: process.env.CRM_WEBHOOK_URL || "",
  crmSecret: process.env.CRM_WEBHOOK_SECRET || "",
};

export const emailEnabled = () => Boolean(serverConfig.resendKey && serverConfig.emailFrom);
export const crmEnabled = () => Boolean(serverConfig.crmUrl && serverConfig.crmSecret);

let warned = false;
/** Jednorazowa instrukcja dla administratora w logach serwera (bez sekretów). */
export function warnMissingIntegrations() {
  if (warned) return;
  warned = true;
  if (!emailEnabled()) console.warn("[nowy-etap] Wysyłka e-mail wyłączona: ustaw RESEND_API_KEY i EMAIL_FROM (zob. README.md → Integracje). Użytkownicy widzą komunikat, że wysyłka nie jest dostępna.");
  if (!crmEnabled()) console.warn("[nowy-etap] CRM wyłączony: ustaw CRM_WEBHOOK_URL i CRM_WEBHOOK_SECRET (zob. README.md → Integracje). Zgłoszenia kontaktowe trafią tylko na LEADS_NOTIFY_EMAIL, jeśli jest ustawiony.");
}
