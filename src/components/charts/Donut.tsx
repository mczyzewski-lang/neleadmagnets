import "./charts.css";
import { formatPLN } from "@/lib/format";

export type DonutSlice = { label: string; value: number; color: string };

/** Wykres kołowy (donut) z legendą i ukrytą tabelą danych. */
export function Donut({ slices, title, centerLabel, centerValue }: { slices: DonutSlice[]; title: string; centerLabel?: string; centerValue?: string }) {
  const data = slices.filter((s) => s.value > 0);
  const total = data.reduce((a, s) => a + s.value, 0);
  const R = 80, r = 52, C = 100;
  let acc = 0;
  const arcs = data.map((s) => {
    const start = (acc / total) * Math.PI * 2;
    acc += s.value;
    const end = (acc / total) * Math.PI * 2;
    const large = end - start > Math.PI ? 1 : 0;
    const p = (ang: number, rad: number) => [C + rad * Math.sin(ang), C - rad * Math.cos(ang)];
    if (data.length === 1) return { s, d: "" };
    const [x1, y1] = p(start, R), [x2, y2] = p(end, R), [x3, y3] = p(end, r), [x4, y4] = p(start, r);
    return { s, d: `M${x1} ${y1} A${R} ${R} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${r} ${r} 0 ${large} 0 ${x4} ${y4} Z` };
  });
  const label = `${title}: ` + data.map((s) => `${s.label} ${formatPLN(s.value)} (${Math.round((s.value / total) * 100)}%)`).join(", ");
  if (!total) return <p className="small muted">Uzupełnij kwoty, aby zobaczyć wykres.</p>;
  return (
    <figure className="donut-wrap" style={{ margin: 0 }}>
      <svg viewBox="0 0 200 200" role="img" aria-label={label}>
        {data.length === 1 ? (
          <circle cx={C} cy={C} r={(R + r) / 2} fill="none" stroke={data[0].color} strokeWidth={R - r} />
        ) : (
          arcs.map(({ s, d }) => <path key={s.label} d={d} fill={s.color} stroke="#fff" strokeWidth={1.5} />)
        )}
        {centerValue && <text x={C} y={C + 2} textAnchor="middle" fontSize={19} fontWeight={700} style={{ fill: "var(--green-800)" }}>{centerValue}</text>}
        {centerLabel && <text x={C} y={C + 20} textAnchor="middle" fontSize={11} style={{ fill: "var(--ink-3)" }}>{centerLabel}</text>}
      </svg>
      <figcaption>
        <ul className="legend legend--col" style={{ margin: 0 }}>
          {data.map((s) => (
            <li key={s.label}><span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}><i style={{ background: s.color }} />{s.label}</span><span>{formatPLN(s.value)} · {Math.round((s.value / total) * 100)}%</span></li>
          ))}
        </ul>
      </figcaption>
    </figure>
  );
}
