import { ToolLanding } from "@/components/landing/ToolLanding";
import { BudgetTool } from "@/components/tools/BudgetTool";
import { BarCompare } from "@/components/charts/BarCompare";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/toolMetadata";

const SLUG = "budzet-po-rozstaniu";
export const metadata = toolMetadata(SLUG);

function Preview() {
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 6px", fontWeight: 600 }}>DOCHODY I WYDATKI MIESIĘCZNIE</p>
      <BarCompare
        title="Przykład: dochody i wydatki"
        height={180}
        series={[{ key: "i", label: "Dochody", color: "var(--green-700)" }, { key: "e", label: "Wydatki", color: "var(--gold-500)" }]}
        groups={[
          { label: "Teraz", values: { i: 6200, e: 4300 } },
          { label: "Ostrożny", values: { i: 6200, e: 6450 } },
          { label: "Bazowy", values: { i: 6200, e: 5900 } },
          { label: "Optym.", values: { i: 6200, e: 5600 } },
        ]}
      />
      <div className="kpis" style={{ marginTop: 10 }}>
        <div className="kpi"><span className="kpi__label">Saldo po rozstaniu</span><span className="kpi__value" style={{ fontSize: 18 }}>+300 zł</span></div>
        <div className="kpi"><span className="kpi__label">Poduszka</span><span className="kpi__value" style={{ fontSize: 18 }}>2,4 mies.</span></div>
      </div>
      <p className="xsmall" style={{ margin: "10px 0 0", fontWeight: 600, color: "var(--warn)" }}>Największe obciążenie: mieszkanie — 42% dochodów</p>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={getTool(SLUG)} preview={<Preview />}>
      <BudgetTool />
    </ToolLanding>
  );
}
