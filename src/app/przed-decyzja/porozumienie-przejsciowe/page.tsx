import { ToolLanding } from "@/components/landing/ToolLanding";
import { InterimTool } from "@/components/decision/InterimTool";
import { meta } from "@/lib/decision/porozumienie-przejsciowe.meta";
import { metaFor } from "@/lib/toolMetadata";

export const metadata = metaFor(meta, "/przed-decyzja/porozumienie-przejsciowe");

function Preview() {
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 8px", fontWeight: 600 }}>PROPOZYCJA DO ROZMOWY</p>
      <div style={{ border: "1px solid var(--line)", borderRadius: 10, padding: 12, fontSize: 13, lineHeight: 1.4 }}>
        <strong style={{ color: "var(--green-800)" }}>Mieszkanie</strong>
        <p style={{ margin: "2px 0 8px" }}>Do czasu decyzji mieszkamy razem, w osobnych pokojach.</p>
        <strong style={{ color: "var(--green-800)" }}>Dzieci</strong>
        <p style={{ margin: "2px 0 8px" }}>Na co dzień oboje, według wspólnego grafiku tygodnia.</p>
        <strong style={{ color: "var(--green-800)" }}>Rachunki — proporcjonalnie</strong>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}><span>Ja (58%)</span><b>1 856 zł</b></div>
        <div style={{ display: "flex", justifyContent: "space-between" }}><span>Druga osoba (42%)</span><b>1 344 zł</b></div>
      </div>
      <div className="btn-row" style={{ gap: 6, marginTop: 10 }}><span className="tag tag--gold">3 sprawy do ustalenia</span><span className="tag">Przegląd za 4 tygodnie</span></div>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={meta} hub={{ href: "/przed-decyzja", label: "Przed decyzją" }} preview={<Preview />}>
      <InterimTool />
    </ToolLanding>
  );
}
