import { ToolLanding } from "@/components/landing/ToolLanding";
import { SeparationTool } from "@/components/tools/SeparationTool";
import { getTool } from "@/lib/tools";
import { toolMetadata } from "@/lib/toolMetadata";

const SLUG = "separacja-czy-rozwod";
export const metadata = toolMetadata(SLUG);

function Preview() {
  const rows: [string, string, string][] = [
    ["Małżeństwo", "trwa formalnie", "ustaje"],
    ["Nowy ślub", "niemożliwy", "możliwy"],
    ["Majątek", "rozdzielność", "ustaje wspólność"],
    ["Powrót", "zniesienie separacji", "nie da się cofnąć"],
  ];
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 10px", fontWeight: 600 }}>TWOJA TABELA PORÓWNAWCZA</p>
      <div tabIndex={0} role="region" aria-label="Tabela — przewiń w poziomie, jeśli nie mieści się na ekranie" className="table-wrap">
        <table className="table" style={{ fontSize: 13 }}>
          <thead><tr><th></th><th>Separacja</th><th>Rozwód</th></tr></thead>
          <tbody>{rows.map(([a, b, c]) => <tr key={a}><th scope="row">{a}</th><td>{b}</td><td>{c}</td></tr>)}</tbody>
        </table>
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
        <span className="tag">5 skutków zbliżonych</span>
        <span className="tag tag--gold">8 pytań do specjalisty</span>
      </div>
      <p className="xsmall muted" style={{ margin: "10px 0 0" }}>Bez podpowiadania decyzji · na podstawie KRO i KC</p>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={getTool(SLUG)} preview={<Preview />}>
      <SeparationTool />
    </ToolLanding>
  );
}
