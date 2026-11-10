import { ToolLanding } from "@/components/landing/ToolLanding";
import { MythsQuizTool } from "@/components/decision/MythsQuizTool";
import { meta } from "@/lib/decision/mity-o-rozwodzie.meta";
import { metaFor } from "@/lib/toolMetadata";

export const metadata = metaFor(meta, "/przed-decyzja/mity-o-rozwodzie");

function Preview() {
  const rows: [string, "MIT" | "FAKT"][] = [
    ["Rozwód zwalnia ze wspólnego kredytu", "MIT"],
    ["Opłata od pozwu to 600 zł", "FAKT"],
    ["Mediacja jest obowiązkowa", "MIT"],
    ["Trzeba wrócić do nazwiska sprzed ślubu", "MIT"],
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "6px 0 12px" }}>
        <svg width="64" height="64" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" fill="none" stroke="var(--sand-2)" strokeWidth="10" /><circle cx="50" cy="50" r="40" fill="none" stroke="#C79B59" strokeWidth="10" strokeLinecap="round" strokeDasharray="209 251" transform="rotate(-90 50 50)" /><text x="50" y="58" textAnchor="middle" fontSize="24" fontWeight="700" fill="#263D3A">10/12</text></svg>
        <div><strong style={{ color: "var(--green-800)" }}>10 z 12 trafionych</strong><p className="xsmall muted" style={{ margin: 0 }}>+ wyjaśnienia i źródła</p></div>
      </div>
      {rows.map(([t, v]) => (
        <div key={t} style={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "9px 0", borderTop: "1px solid var(--line)", fontSize: 14 }}>
          <span>{t}</span>
          <span className={`tag ${v === "MIT" ? "tag--danger" : "tag--ok"}`}>{v}</span>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={meta} hub={{ href: "/przed-decyzja", label: "Przed decyzją" }} preview={<Preview />}>
      <MythsQuizTool />
    </ToolLanding>
  );
}
