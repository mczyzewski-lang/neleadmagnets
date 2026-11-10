import { ToolLanding } from "@/components/landing/ToolLanding";
import { MovingCostTool } from "@/components/decision/MovingCostTool";
import { meta } from "@/lib/decision/koszty-wyprowadzki.meta";
import { metaFor } from "@/lib/toolMetadata";

export const metadata = metaFor(meta, "/przed-decyzja/koszty-wyprowadzki");

function Preview() {
  const rows: [string, number, string][] = [["Najem — kaucja i 1. miesiąc", 62, "#295550"], ["Meble i wyposażenie", 22, "#4a6d68"], ["Przeprowadzka", 9, "#C79B59"], ["Media i inne", 7, "#7E5B26"]];
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 8px", fontWeight: 600 }}>KWOTA NA START</p>
      <p style={{ fontSize: 28, fontWeight: 700, color: "var(--green-800)", margin: "0 0 10px" }}>8 050 zł</p>
      <div className="hbar">{rows.map(([l, p, c]) => <div key={l} className="hbar__row"><span style={{ fontSize: 13 }}>{l}</span><div className="hbar__track"><div className="hbar__fill" style={{ width: `${p}%`, background: c }} /></div><span className="hbar__val" style={{ fontSize: 13 }}>{p}%</span></div>)}</div>
      <div className="kpis" style={{ marginTop: 12 }}>
        <div className="kpi"><span className="kpi__label">Miesięcznie</span><span className="kpi__value" style={{ fontSize: 18 }}>3 100 zł</span></div>
        <div className="kpi"><span className="kpi__label">Oszczędności</span><span className="kpi__value" style={{ fontSize: 18 }}>≈ 3,9 mies.</span></div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={meta} hub={{ href: "/przed-decyzja", label: "Przed decyzją" }} preview={<Preview />}>
      <MovingCostTool />
    </ToolLanding>
  );
}
