import { ToolLanding } from "@/components/landing/ToolLanding";
import { ParentingTool } from "@/components/tools/ParentingTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/toolMetadata";

const SLUG = "plan-opieki-nad-dzieckiem";
export const metadata = toolMetadata(SLUG);

function Preview() {
  const w1 = ["A", "A", "B", "B", "A", "A", "A"];
  const w2 = ["A", "A", "B", "B", "B", "B", "B"];
  const days = ["Pn", "Wt", "Śr", "Cz", "Pt", "So", "Nd"];
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 10px", fontWeight: 600 }}>WŁASNY RYTM DWUTYGODNIOWY · START: 2-2-5-5</p>
      {[w1, w2].map((w, wi) => (
        <div key={wi} className="week" style={{ marginBottom: 6 }}>
          {w.map((p, i) => (
            <div key={i} className={`week__day ${p === "A" ? "parent-a" : "parent-b"}`} style={{ minHeight: 48 }}>
              <span>{days[i]}</span><span style={{ fontSize: 10 }}>{p === "A" ? "Mama" : "Tata"}</span>
            </div>
          ))}
        </div>
      ))}
      <div className="kpis" style={{ marginTop: 10 }}>
        <div className="kpi"><span className="kpi__label">Noce: Mama</span><span className="kpi__value" style={{ fontSize: 18 }}>7 / 14</span></div>
        <div className="kpi"><span className="kpi__label">Do ustalenia</span><span className="kpi__value" style={{ fontSize: 18 }}>2 punkty</span></div>
      </div>
      <div style={{ marginTop: 10, display: "grid", gap: 6, fontSize: 13 }}>
        <div><span className="tag">Przekazanie</span> piątek 16:00, odbiór ze szkoły</div>
        <div><span className="tag">Wigilia</span> lata parzyste: Mama, nieparzyste: Tata</div>
        <div><span className="tag tag--warn">Ferie zimowe</span> do ustalenia</div>
      </div>
      <p className="xsmall muted" style={{ margin: "10px 0 0" }}>Projekt porozumienia rodzicielskiego · PDF</p>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={getTool(SLUG)} preview={<Preview />}>
      <ParentingTool />
    </ToolLanding>
  );
}
