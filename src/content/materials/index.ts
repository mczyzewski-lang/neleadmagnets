import type { Material } from "../types";
import { material as m1 } from "./rozwod-krok-po-kroku";
import { material as m2 } from "./checklista-dokumentow";
import { material as m3 } from "./jak-powiedziec-dzieciom";
import { material as m4 } from "./przygotowanie-do-mediacji";
import { material as m5 } from "./inwentaryzacja-majatku";
import { material as m6 } from "./rozmowa-z-bankiem";
import { material as m7 } from "./bezpieczenstwo-cyfrowe-i-finansowe";
import { material as m8 } from "./komunikacja-z-drugim-rodzicem";
import { material as m9 } from "./pierwsze-swieta-po-rozstaniu";
import { material as m10 } from "./przygotowanie-do-konsultacji";

export const MATERIALS: Material[] = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10];

export function getMaterial(slug: string) {
  return MATERIALS.find((m) => m.slug === slug);
}
