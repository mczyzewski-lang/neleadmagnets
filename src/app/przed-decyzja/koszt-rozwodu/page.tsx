import { ToolLanding } from "@/components/landing/ToolLanding";
import { DivorceCostTool } from "@/components/decision/DivorceCostTool";
import { meta } from "@/lib/decision/koszt-rozwodu.meta";
import { metaFor } from "@/lib/toolMetadata";

export const metadata = metaFor(meta, "/przed-decyzja/koszt-rozwodu");

function Preview() {
  const rows: [string, string][] = [["Opłata od pozwu", "600 zł"], ["Podział majątku (zgodny projekt)", "300 zł"], ["Mediacja (2 posiedzenia)", "500 zł"], ["Pełnomocnik", "wg Twojej wyceny"]];
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 8px", fontWeight: 600 }}>TWOJE ZESTAWIENIE KOSZTÓW</p>
      <table className="table" style={{ fontSize: 13 }}>
        <tbody>{rows.map(([a, b]) => <tr key={a}><td>{a}</td><td className="num">{b}</td></tr>)}</tbody>
      </table>
      <div className="kpis" style={{ marginTop: 10 }}>
        <div className="kpi" style={{ borderColor: "var(--green-500)" }}><span className="kpi__label">Porozumienie</span><span className="kpi__value" style={{ fontSize: 18 }}>1 400 zł +</span></div>
        <div className="kpi"><span className="kpi__label">Spór</span><span className="kpi__value" style={{ fontSize: 18 }}>1 634 zł +</span></div>
      </div>
      <p className="xsmall" style={{ margin: "10px 0 0", color: "var(--ok)", fontWeight: 600 }}>Możliwy zwrot połowy opłaty: 300 zł</p>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={meta} hub={{ href: "/przed-decyzja", label: "Przed decyzją" }} preview={<Preview />}>
      <DivorceCostTool />
    </ToolLanding>
  );
}
