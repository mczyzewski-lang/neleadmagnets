/**
 * Filozofia Nowego Etapu: najpierw PLAN, potem USTALENIA (rozmowy, mediacja),
 * dopiero potem POZEW, SĄD i formalności. Wspólne treści dla materiałów i narzędzi.
 * Stan prawny: patrz LEGAL_VERIFICATION.md (pozycje oznaczone „mediacja — próba”).
 */
import type { SourceRef } from "./types";

export type Stage = 1 | 2 | 3;

export const PATH: { stage: Stage; name: string; short: string; text: string }[] = [
  { stage: 1, name: "Plan", short: "Wiesz, czego chcesz i na czym stoisz", text: "Spisujesz fakty, dokumenty, budżet i potrzeby dzieci. Ustalasz swoje priorytety i granice — zanim zaczniesz negocjować." },
  { stage: 2, name: "Ustalenia", short: "Rozmowa, mediacja, porozumienie", text: "Próbujecie dogadać się w sprawach dzieci, mieszkania, kredytu i majątku — samodzielnie albo z mediatorem. Każde uzgodnienie to jedna sprawa mniej dla sądu." },
  { stage: 3, name: "Pozew i sąd", short: "Formalności na gotowych ustaleniach", text: "Pozew składasz, wiedząc, o co wnosisz. Sąd zatwierdza to, co uzgodniliście, i rozstrzyga tylko to, czego nie udało się ustalić." },
];

/** Dlaczego ta kolejność ma sens — krótkie, sprawdzalne argumenty */
export const WHY_ORDER: { title: string; text: string }[] = [
  { title: "Mniej sporów w sądzie", text: "Sprawy uzgodnione wcześniej (np. porozumienie o wychowaniu dzieci) sąd może uwzględnić w wyroku. Zostaje mniej kwestii do udowadniania." },
  { title: "Krócej i zwykle taniej", text: "Gdy nie ma sporu o winę, dzieci i mieszkanie, sprawa często kończy się na jednej rozprawie. Gdy sąd orzeknie rozwód bez orzekania o winie na zgodny wniosek stron, zwraca z urzędu połowę opłaty od pozwu (art. 79 ust. 1 pkt 3 lit. b ustawy o kosztach sądowych)." },
  { title: "Lepsza pozycja, bo przygotowana", text: "Z planem wiesz, czego potrzebujesz, i nie zgadzasz się na rozwiązania pod presją. Pozew pisany na gotowych ustaleniach jest konkretny." },
  { title: "Dzieci w centrum", text: "Rodzice, którzy najpierw ustalają plan opieki, oszczędzają dzieciom bycia „przedmiotem sporu” na sali sądowej." },
];

/** Próba mediacji — nawet gdy druga strona odmówi */
export const MEDIATION_ATTEMPT = {
  title: "Próba mediacji ma znaczenie — nawet jeśli druga strona odmówi",
  points: [
    "Pozew musi zawierać informację, czy strony próbowały mediacji lub innego polubownego rozwiązania sporu, a jeśli nie — wyjaśnienie, dlaczego (art. 187 § 1 pkt 3 KPC).",
    "Udokumentowana próba (np. wniosek o mediację skierowany do mediatora i doręczony drugiej stronie, odpowiedź lub informacja o braku zgody) pokazuje sądowi Twoją dobrą wolę i gotowość do porozumienia — to bywa istotne, gdy sąd ocenia postawę rodziców w sprawach dzieci.",
    "Sąd może obciążyć kosztami stronę, która w sposób oczywiście nieuzasadniony odmówiła mediacji (art. 103 KPC).",
    "Zachowaj dokumenty: kopię wniosku, dowód doręczenia, korespondencję i pisemną informację od mediatora. Wskaż je w pozwie.",
  ],
  caveat: "Mediacja jest dobrowolna. Jeśli doświadczasz przemocy, gróźb lub kontroli — nie musisz jej proponować; zadbaj najpierw o bezpieczeństwo i skonsultuj się z prawnikiem lub ośrodkiem pomocy. Próba mediacji nie gwarantuje konkretnego rozstrzygnięcia.",
};

export const PHILOSOPHY_SOURCES: SourceRef[] = [
  { label: "Kodeks postępowania cywilnego — art. 103, art. 183¹–183¹⁵ (mediacja), art. 187 § 1 pkt 3", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296", verified: "2026-11-16" },
  { label: "Kodeks rodzinny i opiekuńczy — art. 58 (porozumienie o wychowaniu dzieci)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: "2026-11-16" },
];
