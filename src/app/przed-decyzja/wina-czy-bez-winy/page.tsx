import { ToolLanding } from "@/components/landing/ToolLanding";
import { FaultTool } from "@/components/decision/FaultTool";
import { meta } from "@/lib/decision/wina-czy-bez-winy.meta";
import { metaFor } from "@/lib/toolMetadata";

export const metadata = metaFor(meta, "/przed-decyzja/wina-czy-bez-winy");

function Preview() {
  const rows: [string, string, string, boolean][] = [
    ["Alimenty między byłymi", "Przy niedostatku, zwykle do 5 lat", "Niewinny od wyłącznie winnego — szerzej", true],
    ["Dowody i prywatność", "Zwykle mniej czynności", "Świadkowie, dokumenty", true],
    ["Dzieci w wyroku", "Według dobra dziecka", "Według dobra dziecka", false],
    ["Opłata od pozwu", "600 zł, możliwy zwrot 300 zł", "600 zł", false],
  ];
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 10px", fontWeight: 600 }}>TABELA RÓŻNIC · 4 Z 11 KWESTII</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, fontSize: 12, lineHeight: 1.3 }}>
        <span />
        <strong style={{ color: "var(--green-800)" }}>Bez winy</strong>
        <strong style={{ color: "var(--green-800)" }}>Z winą</strong>
        {rows.map(([t, a, b, hl]) => (
          <div key={t} style={{ display: "contents" }}>
            <span style={{ fontWeight: 600, padding: 6, borderRadius: 6, background: hl ? "var(--green-50)" : "transparent", borderLeft: hl ? "3px solid var(--gold-500)" : "3px solid transparent" }}>{t}</span>
            <span style={{ padding: 6, background: hl ? "var(--green-50)" : "var(--cream)", borderRadius: 6 }}>{a}</span>
            <span style={{ padding: 6, background: hl ? "var(--green-50)" : "var(--cream)", borderRadius: 6 }}>{b}</span>
          </div>
        ))}
      </div>
      <p className="xsmall" style={{ margin: "10px 0 0", color: "var(--ink-3)" }}>Porównanie, nie rekomendacja — decyzja należy do Ciebie.</p>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={meta} hub={{ href: "/przed-decyzja", label: "Przed decyzją" }} preview={<Preview />}>
      <FaultTool />
    </ToolLanding>
  );
}
