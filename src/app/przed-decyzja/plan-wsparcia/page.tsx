import { ToolLanding } from "@/components/landing/ToolLanding";
import { SupportTool } from "@/components/decision/SupportTool";
import { meta } from "@/lib/decision/plan-wsparcia.meta";
import { metaFor } from "@/lib/toolMetadata";

export const metadata = metaFor(meta, "/przed-decyzja/plan-wsparcia");

function Preview() {
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 10px", fontWeight: 600 }}>MÓJ PLAN WSPARCIA</p>
      <table className="table" style={{ fontSize: 13 }}>
        <tbody>
          <tr><th scope="row">Emocjonalnie</th><td>Przyjaciółka (A.), siostra</td></tr>
          <tr><th scope="row">Przy dzieciach</th><td>Rodzic</td></tr>
          <tr><th scope="row">W kryzysie</th><td>Przyjaciółka (A.) · 116 123</td></tr>
        </tbody>
      </table>
      <div className="script" style={{ marginTop: 10 }}><span className="script__label">Gdy… to…</span><p style={{ margin: "4px 0 0", fontSize: 13 }}>Wieczory w samotności → telefon do bliskiej osoby, spacer</p></div>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={meta} hub={{ href: "/przed-decyzja", label: "Przed decyzją" }} preview={<Preview />}>
      <SupportTool />
    </ToolLanding>
  );
}
