import type { ToolMeta } from "./tools";
import { meta as kosztRozwodu } from "./decision/koszt-rozwodu.meta";
import { meta as rozmowa } from "./decision/rozmowa-o-rozstaniu.meta";
import { meta as kompas } from "./decision/kompas-decyzji.meta";
import { meta as majatek } from "./decision/majatek-wspolny-czy-osobisty.meta";
import { meta as wina } from "./decision/wina-czy-bez-winy.meta";
import { meta as przejsciowe } from "./decision/porozumienie-przejsciowe.meta";
import { meta as wyprowadzka } from "./decision/koszty-wyprowadzki.meta";
import { meta as wsparcie } from "./decision/plan-wsparcia.meta";
import { meta as mity } from "./decision/mity-o-rozwodzie.meta";
import { meta as pozew } from "./decision/pozew-rozwodowy-checklista.meta";

/** Dział „Przed decyzją” — 10 narzędzi dla osób rozważających rozstanie (/przed-decyzja/<slug>). */
export const DECISION_TOOLS: ToolMeta[] = [kosztRozwodu, rozmowa, kompas, majatek, wina, przejsciowe, wyprowadzka, wsparcie, mity, pozew];
