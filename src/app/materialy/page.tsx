import Link from "next/link";
import type { Metadata } from "next";
import { MATERIALS } from "@/content/materials";
import { PATH } from "@/content/philosophy";
import { MaterialCard } from "@/components/materials/MaterialCard";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bezpłatne materiały przed rozwodem i rozstaniem",
  description: "Przewodniki, checklisty, arkusze i planery: dokumenty do rozwodu, rozmowa z dziećmi, mediacja, majątek, kredyt, pierwsze święta po rozstaniu.",
  alternates: { canonical: absoluteUrl("/materialy") },
};

export default function MaterialsHub() {
  return (
    <>
      <section className="hero">
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="eyebrow">Bezpłatne materiały</span>
          <h1>Przewodniki, checklisty i planery na czas rozstania</h1>
          <p className="hero__sub">Checklisty i arkusze do wypełnienia online, z podsumowaniem na końcu. Bez pobierania i bez podawania danych.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container">
          <p className="muted" style={{ maxWidth: "70ch" }}>Materiały ułożyliśmy według naszej ścieżki: <strong>najpierw plan, potem ustalenia (rozmowy, mediacja), dopiero na końcu pozew i sąd</strong>. Zacznij od etapu, na którym jesteś.</p>
          {PATH.map((p) => {
            const items = MATERIALS.filter((m) => m.stage === p.stage);
            if (!items.length && p.stage !== 3) return null;
            return (
              <div key={p.stage} className="stage-group">
                <h2 className="stage-group__h"><span className="path__num" aria-hidden="true">{p.stage}</span> {p.name} <span className="stage-group__sub">· {p.short}</span></h2>
                <p className="small muted" style={{ maxWidth: "70ch" }}>{p.text}</p>
                {items.length > 0 && (
                  <div className="grid grid--2 grid--3">
                    {items.map((m) => <MaterialCard key={m.slug} m={m} />)}
                  </div>
                )}
                {p.stage === 3 && (
                  <Link href="/przed-decyzja/pozew-rozwodowy-checklista" className="card card-link card--sand" style={{ maxWidth: 560, marginTop: 12 }}>
                    <strong>Checklista pozwu rozwodowego</strong>
                    <span className="small muted">Gdy plan i ustalenia są gotowe: co zawiera pozew, jakie załączniki dołączyć i jak opisać próbę mediacji lub innego polubownego rozwiązania.</span>
                    <span className="card-link__more">Przejdź do narzędzia →</span>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
