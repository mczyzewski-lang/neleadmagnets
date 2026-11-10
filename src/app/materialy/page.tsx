import type { Metadata } from "next";
import Link from "next/link";
import { MATERIALS } from "@/content/materials";
import { Cover3D } from "@/components/landing/Cover3D";
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
          <p className="hero__sub">Konkretne materiały do przeczytania, wydrukowania i wypełnienia we własnym tempie. Otworzysz je od razu — bez podawania danych.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container">
          <div className="grid grid--2 grid--3">
            {MATERIALS.map((m) => (
              <Link key={m.slug} href={`/materialy/${m.slug}`} className="card card-link">
                <Cover3D m={m} size="sm" />
                <div className="btn-row" style={{ gap: 6 }}><span className="tag tag--gold">{m.format}</span><span className="tag">{m.time}</span></div>
                <h2 className="card__title" style={{ marginTop: 10 }}>{m.coverTitle}</h2>
                <p className="small muted" style={{ margin: 0 }}>{m.promise}</p>
                <span className="card-link__more">Zobacz, co zawiera →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
