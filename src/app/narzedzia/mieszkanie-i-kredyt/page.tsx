import { ToolLanding } from "@/components/landing/ToolLanding";
import { HousingTool } from "@/components/tools/HousingTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/toolMetadata";

const SLUG = "mieszkanie-i-kredyt";
export const metadata = toolMetadata(SLUG);

function Preview() {
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 10px", fontWeight: 600 }}>WASZE MOŻLIWE SCENARIUSZE</p>
      {[
        ["01", "Jedna osoba zostaje i rozlicza się z drugą", "Najbliższy odpowiedziom"],
        ["02", "Sprzedaż i rozliczenie środków", "Możliwy"],
        ["03", "Dalsza współwłasność na określony czas", "Możliwy"],
      ].map(([n, t, tag], i) => (
        <div key={n} className={`scenario ${i === 0 ? "scenario--fit" : ""}`} style={{ padding: 12, marginBottom: 8, display: "flex", gap: 12, alignItems: "center" }}>
          <span className="scenario__num" style={{ fontSize: "1.4rem" }}>{n}</span>
          <span style={{ flex: 1, fontWeight: 600, fontSize: 14, lineHeight: 1.3 }}>{t}</span>
          <span className={`tag ${i === 0 ? "tag--ok" : ""}`} style={{ fontSize: 11 }}>{tag}</span>
        </div>
      ))}
      <div className="kpis" style={{ marginTop: 10 }}>
        <div className="kpi"><span className="kpi__label">Wartość − kredyt</span><span className="kpi__value" style={{ fontSize: 18 }}>210 000 zł</span></div>
        <div className="kpi"><span className="kpi__label">LTV</span><span className="kpi__value" style={{ fontSize: 18 }}>58%</span></div>
      </div>
      <p className="xsmall" style={{ margin: "10px 0 0", color: "var(--danger)", fontWeight: 600 }}>⚠ Rozwód nie zwalnia ze wspólnego kredytu</p>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={getTool(SLUG)} preview={<Preview />}>
      <HousingTool />
    </ToolLanding>
  );
}
