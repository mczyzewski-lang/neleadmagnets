/**
 * Robocza ocena wartości materiału (1–10) dla osoby, która rozważa rozwód
 * lub już podjęła decyzję. Ocena redakcyjna — do weryfikacji danymi
 * (pobrania, wypełnienia online, konwersja do kolejnego kroku).
 */
export type MaterialScore = { score: number; why: string };

export const SCORE_SCALE_HELP =
  "Robocza ocena redakcji Nowego Etapu: jak bardzo materiał pomaga osobie, która rozważa rozwód albo już się zdecydowała. Bierzemy pod uwagę: ilu osób dotyczy, jak szybko daje konkretny efekt (decyzję, komplet dokumentów, oszczędność czasu lub pieniędzy) oraz czy zastępuje pracę, którą inaczej trzeba by wykonać ze specjalistą.";

export const SCORE_BANDS: { min: number; label: string }[] = [
  { min: 9, label: "przydaje się prawie każdemu, od razu" },
  { min: 7, label: "bardzo przydatny w określonej sytuacji" },
  { min: 5, label: "pomocny, ale węższy lub sezonowy" },
  { min: 1, label: "uzupełnienie" },
];

export function scoreBand(score: number) {
  return SCORE_BANDS.find((b) => score >= b.min)!.label;
}

export const MATERIAL_SCORES: Record<string, MaterialScore> = {
  "rozwod-krok-po-kroku": { score: 9, why: "Mapa całego procesu — porządkuje wiedzę na samym starcie, niezależnie od sytuacji." },
  "checklista-dokumentow": { score: 9, why: "Natychmiast do użycia: komplet dokumentów skraca przygotowanie pozwu i konsultacji." },
  "przygotowanie-do-konsultacji": { score: 8, why: "Krótsza i tańsza konsultacja, bo prawnik od razu dostaje fakty i pytania." },
  "inwentaryzacja-majatku": { score: 8, why: "Majątek dotyczy większości małżeństw; spis to podstawa rozmów o podziale." },
  "jak-powiedziec-dzieciom": { score: 8, why: "Tylko dla rodziców, ale dla nich jeden z najtrudniejszych i najważniejszych kroków." },
  "bezpieczenstwo-cyfrowe-i-finansowe": { score: 8, why: "Szybkie, uniwersalne działania, które chronią przed realnymi problemami." },
  "przygotowanie-do-mediacji": { score: 7, why: "Bardzo wartościowy, jeśli rozważasz mediację; mniej, gdy jej nie planujesz." },
  "rozmowa-z-bankiem": { score: 7, why: "Kluczowy przy wspólnym kredycie hipotecznym; poza tym niepotrzebny." },
  "komunikacja-z-drugim-rodzicem": { score: 7, why: "Dla rodziców — procentuje przez lata, choć nie na pierwszym etapie decyzji." },
  "pierwsze-swieta-po-rozstaniu": { score: 6, why: "Sezonowy i dla rodziców, ale w listopadzie i grudniu bardzo aktualny." },
};
