import type { OfferKey } from "@/content/types";

/**
 * Oferty Nowego Etapu prezentowane jako opcjonalny kolejny krok.
 * UWAGA dla zespołu: opisy usług, w szczególności DUO, oraz informacje o cenach
 * należy potwierdzić z Nowym Etapem przed uruchomieniem kampanii.
 * Celowo nie podajemy cen — formularz „Sprawdź koszt” przekazuje prośbę o wycenę.
 */
export type Offer = {
  key: OfferKey;
  title: string;
  description: string;
  cta: string;
  href: string;
  /** Typ prośby przekazywany do CRM */
  requestType: "plan_rozwodu" | "wycena" | "mediacja" | "materialy" | "duo" | "konsultacja";
};

export const OFFERS: Record<OfferKey, Offer> = {
  "plan-rozwodu": {
    key: "plan-rozwodu",
    title: "Bezpłatny Plan Rozwodu",
    description:
      "Uporządkowana lista spraw do ustalenia przed pozwem — dzieci, mieszkanie, finanse — oraz informacja, jak może wyglądać współpraca z Nowym Etapem i ile kosztuje.",
    cta: "Sprawdź koszt i odbierz bezpłatny Plan Rozwodu",
    href: "/plan-rozwodu",
    requestType: "plan_rozwodu",
  },
  mediacja: {
    key: "mediacja",
    title: "Mediacja i ustalenia przedsądowe",
    description:
      "Informacje o tym, jak może wyglądać mediacja rodzinna, kiedy ma sens i jak się do niej przygotować. Mediacja jest zawsze dobrowolna.",
    cta: "Dowiedz się więcej o mediacji",
    href: "/plan-rozwodu#mediacja",
    requestType: "mediacja",
  },
  duo: {
    key: "duo",
    title: "DUO — wspólna ścieżka dla dwojga",
    description:
      "Dla par, które chcą wspólnie i spokojnie przygotować ustalenia dotyczące dzieci, mieszkania i finansów przed złożeniem pozwu.",
    cta: "Poznaj ścieżkę DUO",
    href: "/plan-rozwodu#duo",
    requestType: "duo",
  },
  konsultacja: {
    key: "konsultacja",
    title: "Rozmowa o Twojej sytuacji",
    description: "Jeśli wolisz porozmawiać o swojej sytuacji indywidualnie, możesz poprosić o kontakt. Bez zobowiązań.",
    cta: "Poproś o kontakt",
    href: "/plan-rozwodu#kontakt",
    requestType: "konsultacja",
  },
  materialy: {
    key: "materialy",
    title: "Bezpłatne materiały",
    description: "Przewodniki, checklisty i arkusze, które pomogą uporządkować sprawy we własnym tempie.",
    cta: "Zobacz bezpłatne materiały",
    href: "/materialy",
    requestType: "materialy",
  },
};
