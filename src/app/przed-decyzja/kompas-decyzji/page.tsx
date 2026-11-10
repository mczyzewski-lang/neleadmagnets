import { ToolLanding } from "@/components/landing/ToolLanding";
import { CompassTool } from "@/components/decision/CompassTool";
import { meta } from "@/lib/decision/kompas-decyzji.meta";
import { metaFor } from "@/lib/toolMetadata";

export const metadata = metaFor(meta, "/przed-decyzja/kompas-decyzji");

function Preview() {
  const rows: [string, number][] = [["Komunikacja", 2], ["Zaufanie", 3], ["Poczucie bezpieczeństwa", 4], ["Wspólne plany", 2], ["Wzajemne wsparcie", 3]];
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 10px", fontWeight: 600 }}>TWÓJ OBRAZ SYTUACJI · TO NIE JEST OCENA</p>
      <div className="hbar">
        {rows.map(([l, v]) => (
          <div key={l} className="hbar__row"><span style={{ fontSize: 13 }}>{l}</span><div className="hbar__track"><div className="hbar__fill" style={{ width: `${v * 20}%`, background: v <= 2 ? "var(--gold-500)" : "var(--green-700)" }} /></div><span className="hbar__val">{v}/5</span></div>
        ))}
      </div>
      <p className="xsmall muted" style={{ margin: "12px 0 6px", fontWeight: 600 }}>MOŻLIWE DROGI</p>
      <div className="btn-row" style={{ gap: 6 }}>
        <span className="tag tag--ok">Terapia par</span><span className="tag">Czas osobno</span><span className="tag">Mediacja</span><span className="tag">Separacja</span><span className="tag">Rozwód</span>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={meta} hub={{ href: "/przed-decyzja", label: "Przed decyzją" }} preview={<Preview />}>
      <CompassTool />
    </ToolLanding>
  );
}
