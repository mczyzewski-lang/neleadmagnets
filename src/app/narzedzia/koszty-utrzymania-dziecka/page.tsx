import { ToolLanding } from "@/components/landing/ToolLanding";
import { ChildCostsTool } from "@/components/tools/ChildCostsTool";
import { Donut } from "@/components/charts/Donut";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/toolMetadata";

const SLUG = "koszty-utrzymania-dziecka";
export const metadata = toolMetadata(SLUG);

function Preview() {
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 10px", fontWeight: 600 }}>PODZIAŁ KOSZTÓW · 1 DZIECKO, 7–12 LAT</p>
      <Donut
        title="Przykładowy podział kosztów"
        centerValue="1 860 zł"
        centerLabel="miesięcznie"
        slices={[
          { label: "Żywność", value: 650, color: "#295550" },
          { label: "Mieszkanie i media", value: 400, color: "#4A6D68" },
          { label: "Zajęcia dodatkowe", value: 280, color: "#C9A96E" },
          { label: "Edukacja", value: 220, color: "#7E5B26" },
          { label: "Ubrania", value: 160, color: "#C79B59" },
          { label: "Wakacje", value: 150, color: "#5E8C7F" },
        ]}
      />
      <div className="kpis" style={{ marginTop: 10 }}>
        <div className="kpi"><span className="kpi__label">Rocznie</span><span className="kpi__value" style={{ fontSize: 18 }}>22 320 zł</span></div>
        <div className="kpi"><span className="kpi__label">Scenariusz „nowa szkoła”</span><span className="kpi__value" style={{ fontSize: 18 }}>+240 zł</span></div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={getTool(SLUG)} preview={<Preview />}>
      <ChildCostsTool />
    </ToolLanding>
  );
}
