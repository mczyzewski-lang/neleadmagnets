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
      "Lista spraw do ustalenia przed pozwem (dzieci, mieszkanie, finanse) i informacja, jak wygląda współpraca z Nowym Etapem i ile kosztuje.",
    cta: "Sprawdź koszt i odbierz bezpłatny Plan Rozwodu",
    href: "/plan-rozwodu",
    requestType: "plan_rozwodu",
  },
  mediacja: {
    key: "mediacja",
    title: "Mediacja i ustalenia przedsądowe",
    description:
      "Jak wygląda mediacja rodzinna, kiedy ma sens i jak się do niej przygotować. Zwykle zaczyna się od zaproszenia do mediacji. Jest zawsze dobrowolna.",
    cta: "Dowiedz się więcej o mediacji",
    href: "/plan-rozwodu#mediacja",
    requestType: "mediacja",
  },
  duo: {
    key: "duo",
    title: "DUO: wspólna ścieżka dla dwojga",
    description:
      "Dla par, które chcą wspólnie i spokojnie przygotować ustalenia o dzieciach, mieszkaniu i finansach przed pozwem.",
    cta: "Poznaj ścieżkę DUO",
    href: "/plan-rozwodu#duo",
    requestType: "duo",
  },
  konsultacja: {
    key: "konsultacja",
    title: "Rozmowa o Twojej sytuacji",
    description: "Wolisz porozmawiać indywidualnie? Poproś o kontakt. Bez zobowiązań.",
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
