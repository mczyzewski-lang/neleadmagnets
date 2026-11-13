import type { Material, MaterialBlock } from "@/content/types";
import { MATERIAL_SAMPLES } from "@/content/materialSamples";

const hasTick = (b: MaterialBlock, ticks: Record<string, string>) => b.type === "checklist" && b.items.some((i) => i in ticks);

type Picked = { heading: string; block: MaterialBlock };

function pick(m: Material, ticks: Record<string, string>): Picked[] {
  const all: Picked[] = m.sections.flatMap((s) => s.blocks.map((block) => ({ heading: s.heading, block })));
  const checklists = all.filter((p) => p.block.type === "checklist");
  // Najpierw lista z przykładowymi odhaczeniami (pomijamy np. listy sygnałów ostrzegawczych)
  checklists.sort((a, b) => Number(hasTick(b.block, ticks)) - Number(hasTick(a.block, ticks)));
  const sheets = all.filter((p) => p.block.type === "worksheet");
  return [checklists[0], sheets[0] ?? checklists[1]].filter(Boolean) as Picked[];
}

export function materialStats(m: Material) {
  let checks = 0, fields = 0;
  for (const s of m.sections) for (const b of s.blocks) {
    if (b.type === "checklist") checks += b.items.length;
    if (b.type === "worksheet") fields += b.fields.length;
  }
  return { sections: m.sections.length, checks, fields };
}

const Tick = () => (
  <svg className="hand-tick" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3.5 12.5c1.6 1.4 3.4 3.6 4.6 5.6 2.6-5.4 6.4-10 12.4-14.1" />
  </svg>
);

/** „Rąbek tajemnicy”: kartka z fragmentem materiału i przykładowymi wpisami niebieskim długopisem. */
export function MaterialPeek({ m, fillHref }: { m: Material; fillHref: string }) {
  const sample = MATERIAL_SAMPLES[m.slug] ?? { fields: {}, ticks: {} };
  const parts = pick(m, sample.ticks);
  const st = materialStats(m);
  return (
    <figure className="peek">
      <div className="peek__wrap">
      <div className="peek__stack" aria-hidden="true" />
      <div className="peek__paper">
        <div className="peek__head">
          <span>Nowy Etap · {m.format}</span>
          <span>{m.coverTitle}</span>
        </div>
        {parts.map(({ heading, block }, pi) => (
          <div key={pi} className="peek__part">
            <h3 className="peek__h">{heading}</h3>
            {block.type === "checklist" && (
              <ul className="peek__checks">
                {block.items.slice(0, 6).map((it) => {
                  const on = it in sample.ticks;
                  const note = sample.ticks[it];
                  return (
                    <li key={it} className={on ? "is-on" : ""}>
                      <span className="peek__box">{on && <Tick />}</span>
                      <span>
                        {it}
                        {on && <span className="visually-hidden"> (odhaczone)</span>}
                        {note && <span className="hand peek__note"> — {note}</span>}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
            {block.type === "worksheet" && (
              <div className="peek__sheet">
                {block.title && <strong className="small">{block.title}</strong>}
                {[...new Set(block.fields)].slice(0, 4).map((f) => (
                  <div key={f} className="peek__line">
                    <span className="peek__label">{f}</span>
                    <span className="hand">{sample.fields[f] || " "}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="peek__fade">
          <a href={fillHref} className="btn btn--gold">Wypełnij online</a>
        </div>
      </div>
      </div>
      <figcaption className="xsmall muted">
        Fragment materiału z przykładowymi, fikcyjnymi wpisami. Pełna wersja: {st.sections} części
        {st.checks ? `, ${st.checks} punktów do odhaczenia` : ""}{st.fields ? `, ${st.fields} pól do uzupełnienia` : ""}.
      </figcaption>
    </figure>
  );
}
