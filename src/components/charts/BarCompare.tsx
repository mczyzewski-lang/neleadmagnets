import "./charts.css";
import { formatPLN } from "@/lib/format";

export type BarSeries = { key: string; label: string; color: string };
export type BarGroup = { label: string; values: Record<string, number> };

/**
 * Pogrupowany wykres słupkowy (np. dochody vs wydatki w wariantach).
 * Dostępność: role="img" + aria-label i ukryta tabela z danymi dla czytników ekranu.
 */
export function BarCompare({ groups, series, title, height = 220 }: { groups: BarGroup[]; series: BarSeries[]; title: string; height?: number }) {
  const W = 420;
  const H = height;
  const padL = 8, padR = 8, padT = 24, padB = 34;
  const max = Math.max(1, ...groups.flatMap((g) => series.map((s) => Math.max(0, g.values[s.key] || 0))));
  const plotH = H - padT - padB;
  const groupW = (W - padL - padR) / groups.length;
  const barW = Math.min(40, (groupW * 0.7) / series.length);
  const label = `${title}: ` + groups.map((g) => `${g.label} — ${series.map((s) => `${s.label} ${formatPLN(g.values[s.key])}`).join(", ")}`).join("; ");
  return (
    <figure style={{ margin: 0 }}>
      <svg className="bc" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} className="bc__grid" x1={padL} x2={W - padR} y1={padT + plotH * (1 - f)} y2={padT + plotH * (1 - f)} />
        ))}
        <line className="bc__axis" x1={padL} x2={W - padR} y1={padT + plotH} y2={padT + plotH} />
        {groups.map((g, gi) => {
          const gx = padL + gi * groupW + (groupW - barW * series.length - 10 * (series.length - 1)) / 2;
          return (
            <g key={g.label}>
              {series.map((s, si) => {
                const v = Math.max(0, g.values[s.key] || 0);
                const h = (v / max) * plotH;
                const x = gx + si * (barW + 10);
                return (
                  <g key={s.key}>
                    <rect x={x} y={padT + plotH - h} width={barW} height={Math.max(h, v > 0 ? 2 : 0)} rx={5} style={{ fill: s.color }} />
                    <text x={x + barW / 2} y={padT + plotH - h - 6} textAnchor="middle" fontSize={11} fontWeight={600} style={{ fill: "var(--ink-2)" }}>
                      {v >= 1000 ? `${(v / 1000).toLocaleString("pl-PL", { maximumFractionDigits: 1 })} tys.` : Math.round(v)}
                    </text>
                  </g>
                );
              })}
              <text x={padL + gi * groupW + groupW / 2} y={H - 10} textAnchor="middle" fontSize={13} fontWeight={600} style={{ fill: "var(--green-800)" }}>{g.label}</text>
            </g>
          );
        })}
      </svg>
      <ul className="legend" aria-hidden="true">
        {series.map((s) => <li key={s.key}><i style={{ background: s.color }} />{s.label}</li>)}
      </ul>
      <table className="visually-hidden">
        <caption>{title}</caption>
        <thead><tr><th scope="col">Pozycja</th>{series.map((s) => <th key={s.key} scope="col">{s.label}</th>)}</tr></thead>
        <tbody>{groups.map((g) => <tr key={g.label}><th scope="row">{g.label}</th>{series.map((s) => <td key={s.key}>{formatPLN(g.values[s.key])}</td>)}</tr>)}</tbody>
      </table>
    </figure>
  );
}
