import type { Metadata } from "next";
import { MATERIALS } from "@/content/materials";
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
          <p className="hero__sub">Konkretne materiały do przeczytania, wydrukowania i wypełnienia we własnym tempie. Otworzysz je od razu — bez podawania danych.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="container">
          <div className="grid grid--2 grid--3">
            {MATERIALS.map((m) => <MaterialCard key={m.slug} m={m} />)}
          </div>
        </div>
      </section>
    </>
  );
}
