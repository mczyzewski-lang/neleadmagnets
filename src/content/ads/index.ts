import type { AdSet } from "./types";
// 8 narzędzi
import { ads as a1 } from "./mieszkanie-i-kredyt";
import { ads as a2 } from "./budzet-po-rozstaniu";
import { ads as a3 } from "./plan-opieki-nad-dzieckiem";
import { ads as a4 } from "./konsekwencje-rozstania";
import { ads as a5 } from "./przed-pozwem";
import { ads as a6 } from "./koszty-utrzymania-dziecka";
import { ads as a7 } from "./separacja-czy-rozwod";
import { ads as a8 } from "./pierwsze-30-dni";
// 10 materiałów
import { ads as m1 } from "./rozwod-krok-po-kroku";
import { ads as m2 } from "./checklista-dokumentow";
import { ads as m3 } from "./jak-powiedziec-dzieciom";
import { ads as m4 } from "./przygotowanie-do-mediacji";
import { ads as m5 } from "./inwentaryzacja-majatku";
import { ads as m6 } from "./rozmowa-z-bankiem";
import { ads as m7 } from "./bezpieczenstwo-cyfrowe-i-finansowe";
import { ads as m8 } from "./komunikacja-z-drugim-rodzicem";
import { ads as m9 } from "./pierwsze-swieta-po-rozstaniu";
import { ads as m10 } from "./przygotowanie-do-konsultacji";
// 10 narzędzi „Przed decyzją”
import { ads as d1 } from "./koszt-rozwodu";
import { ads as d2 } from "./koszty-wyprowadzki";
import { ads as d3 } from "./majatek-wspolny-czy-osobisty";
import { ads as d4 } from "./rozmowa-o-rozstaniu";
import { ads as d5 } from "./kompas-decyzji";
import { ads as d6 } from "./plan-wsparcia";
import { ads as d7 } from "./wina-czy-bez-winy";
import { ads as d8 } from "./porozumienie-przejsciowe";
import { ads as d9 } from "./pozew-rozwodowy-checklista";
import { ads as d10 } from "./mity-o-rozwodzie";

const ALL: AdSet[] = [a1, a2, a3, a4, a5, a6, a7, a8, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10];

export const ADS: Record<string, AdSet> = Object.fromEntries(ALL.map((a) => [a.slug, a]));
