/**
 * Filozofia Nowego Etapu: najpierw PLAN, potem USTALENIA (rozmowy, mediacja),
 * dopiero potem POZEW, SĄD i formalności. Wspólne treści dla materiałów i narzędzi.
 * Stan prawny: patrz LEGAL_VERIFICATION.md (pozycje oznaczone „mediacja — próba”).
 */
import type { SourceRef } from "./types";

export type Stage = 1 | 2 | 3;

export const PATH: { stage: Stage; name: string; short: string; text: string }[] = [
  { stage: 1, name: "Plan", short: "Wiesz, czego chcesz i na czym stoisz", text: "Spisujesz fakty, dokumenty, budżet i potrzeby dzieci. Ustalasz swoje priorytety i granice, zanim zaczniesz negocjować." },
  { stage: 2, name: "Ustalenia", short: "Rozmowy, mediacja, porozumienie", text: "Najpierw rozmawiacie sami. Jeśli to za trudne, pomaga mediator. Każde uzgodnienie to jedna sprawa mniej dla sądu." },
  { stage: 3, name: "Pozew i sąd", short: "Formalności na gotowych ustaleniach", text: "Pozew składasz, wiedząc, o co wnosisz. Sąd może uwzględnić to, co uzgodniliście, i rozstrzyga resztę." },
];

/** Dlaczego ta kolejność ma sens: krótko, bez przepisów w treści (są w źródłach) */
export const WHY_ORDER: { title: string; text: string }[] = [
  { title: "Mniej sporów w sądzie", text: "Sprawy uzgodnione wcześniej, np. porozumienie rodzicielskie, sąd może uwzględnić w wyroku. Zostaje mniej do udowadniania." },
  { title: "Zwykle krócej i taniej", text: "Bez sporu o winę, dzieci i mieszkanie sprawa często kończy się na jednej rozprawie. Przy zgodnym rozwodzie bez orzekania o winie sąd zwraca połowę opłaty od pozwu." },
  { title: "Lepsza pozycja", text: "Z planem wiesz, czego potrzebujesz, i nie zgadzasz się na nic pod presją." },
  { title: "Dzieci poza sporem", text: "Gdy rodzice najpierw ustalają opiekę, dzieci nie stają się przedmiotem sporu na sali sądowej." },
];

/** Rozmowy to nie to samo co mediacja. Próba mediacji ma znaczenie także przy odmowie. */
export const MEDIATION_ATTEMPT = {
  title: "Próba mediacji ma znaczenie, nawet jeśli druga strona odmówi",
  points: [
    "Rozmowy między Wami to jedno, mediacja to drugie: spotkanie z bezstronnym mediatorem, który pomaga wypracować porozumienie.",
    "W pozwie trzeba napisać, czy była próba mediacji lub innego polubownego rozwiązania. Jeśli nie, trzeba wyjaśnić dlaczego.",
    "Mediację zwykle zaczyna zaproszenie: od Ciebie albo od mediatora, którego wybierzesz. Gdy druga strona wyraźnie odmawia, mediator może to potwierdzić na piśmie.",
    "Taka udokumentowana próba pokazuje sądowi Twoją gotowość do porozumienia. Odmowa bez ważnego powodu może też kosztować stronę odmawiającą.",
    "Zachowaj zaproszenie, odpowiedź (albo jej brak) i dokument od mediatora.",
  ],
  caveat: "Mediacja jest dobrowolna. Jeśli doświadczasz przemocy, gróźb lub kontroli, nie musisz jej proponować. Najpierw zadbaj o bezpieczeństwo i porozmawiaj z prawnikiem lub ośrodkiem pomocy. Próba mediacji nie przesądza o wyniku sprawy.",
};

export const PHILOSOPHY_SOURCES: SourceRef[] = [
  { label: "Kodeks postępowania cywilnego: art. 103, art. 183¹–183¹⁵ (mediacja), art. 187 § 1 pkt 3", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640430296", verified: "2026-11-16" },
  { label: "Kodeks rodzinny i opiekuńczy: art. 58 (porozumienie rodzicielskie)", url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU19640090059", verified: "2026-11-16" },
];
