import { ToolLanding } from "@/components/landing/ToolLanding";
import { TalkTool } from "@/components/decision/TalkTool";
import { meta } from "@/lib/decision/rozmowa-o-rozstaniu.meta";
import { metaFor } from "@/lib/toolMetadata";

export const metadata = metaFor(meta, "/przed-decyzja/rozmowa-o-rozstaniu");

function Preview() {
  return (
    <div>
      <p className="xsmall muted" style={{ margin: "6px 0 10px", fontWeight: 600 }}>TWÓJ PLAN ROZMOWY</p>
      <div className="script" style={{ marginTop: 0 }}><span className="script__label">Jak możesz zacząć</span><p style={{ margin: "4px 0 0", fontSize: 14 }}>„Chcę porozmawiać o nas. Nie musimy dziś niczego przesądzać…”</p></div>
      <ul className="list-check" style={{ margin: "10px 0" }}>
        <li>Zorganizuj opiekę nad dziećmi na czas rozmowy</li>
        <li>Zaplanuj czas dla siebie po rozmowie</li>
        <li>Umów kolejną rozmowę w ciągu 72 h</li>
      </ul>
      <div className="btn-row" style={{ gap: 6 }}><span className="tag tag--gold">Mieszkanie — na później</span><span className="tag tag--gold">Pieniądze — na później</span></div>
    </div>
  );
}

export default function Page() {
  return (
    <ToolLanding tool={meta} hub={{ href: "/przed-decyzja", label: "Przed decyzją" }} preview={<Preview />}>
      <TalkTool />
    </ToolLanding>
  );
}
