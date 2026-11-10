import { ToolLanding } from "@/components/landing/ToolLanding";
import { PreFilingTool } from "@/components/tools/PreFilingTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/toolMetadata";

const SLUG = "przed-pozwem";
export const metadata = toolMetadata(SLUG);

function Preview() {
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 8px", fontWeight: 600 }}>MAPA USTALEŃ PRZED POZWEM</p>
      <div style={{ display: "flex", height: 10, borderRadius: 999, overflow: "hidden", marginBottom: 6 }}>
        <span style={{ width: "40%", background: "#8fc1a5" }} /><span style={{ width: "40%", background: "var(--gold-400)" }} /><span style={{ width: "20%", background: "#e39a8f" }} />
      </div>
      <p className="xsmall muted" style={{ margin: "0 0 10px" }}>2 uzgodnione · 2 do omówienia · 1 sporny</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <div style={{ background: "var(--ok-bg)", borderRadius: 12, padding: 10 }}>
          <strong style={{ fontSize: 12.5 }}>Można uzgodnić</strong>
          <ul style={{ margin: "6px 0 0", paddingLeft: 16, fontSize: 12 }}><li>Kontakty i święta</li><li>Okres przejściowy</li></ul>
        </div>
        <div style={{ background: "var(--warn-bg)", borderRadius: 12, padding: 10 }}>
          <strong style={{ fontSize: 12.5 }}>Do analizy</strong>
          <ul style={{ margin: "6px 0 0", paddingLeft: 16, fontSize: 12 }}><li>Mieszkanie</li><li>Kredyt</li></ul>
        </div>
      </div>
      <ol style={{ margin: "12px 0 0", paddingLeft: 18, fontSize: 12.5 }}>
        <li>Uporządkuj informacje</li><li>Określ priorytety</li><li>Rozmowa lub mediacja</li><li>Spisanie ustaleń → pozew</li>
      </ol>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={getTool(SLUG)} preview={<Preview />}>
      <PreFilingTool />
    </ToolLanding>
  );
}
