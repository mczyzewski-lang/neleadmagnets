import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TOOLS } from "@/lib/tools";
import { MATERIALS } from "@/content/materials";
import { Cover3D } from "@/components/landing/Cover3D";
import { Icon } from "@/components/ui/Icon";

/** Szablon grafik Open Graph (1200×630) i okładek zastępczych — renderowany przez scripts/generate-og.mjs. */
export const metadata: Metadata = { robots: { index: false, follow: false } };
type P = { params: Promise<{ slug: string }> };

export default async function OgCard({ params }: P) {
  const { slug } = await params;
  const m = MATERIALS.find((x) => x.slug === slug.replace(/^cover-/, ""));
  if (slug.startsWith("cover-") && m)
    return (
      <div id="og" style={{ width: 460, height: 460, display: "grid", placeItems: "center", background: "radial-gradient(320px 240px at 70% 20%, #f5ecdc, #fcf9f8)" }}>
        <Cover3D m={m} />
      </div>
    );
  const t = TOOLS.find((x) => x.slug === slug);
  const title = t ? t.h1 : slug === "narzedzia" ? "Co jeśli się rozstaniemy?" : m?.h1;
  const sub = t ? t.outcome : slug === "narzedzia" ? "8 bezpłatnych narzędzi: mieszkanie i kredyt, budżet, opieka nad dzieckiem, separacja czy rozwód" : m?.promise;
  if (!title) notFound();
  return (
    <div id="og" style={{ width: 1200, height: 630, background: "#263D3A", color: "#fff", padding: "64px 72px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      <img src="/brand/nowy-etap-logo-poradnia-white.png" alt="" style={{ height: 64, width: "auto", alignSelf: "flex-start" }} />
      <div style={{ marginTop: "auto", maxWidth: 900 }}>
        <p style={{ fontFamily: "var(--font-display)", letterSpacing: "0.16em", textTransform: "uppercase", color: "#C9A96E", fontSize: 22, margin: "0 0 16px" }}>Bezpłatne narzędzie · Nowy Etap</p>
        <h1 style={{ color: "#fff", fontSize: title.length > 60 ? 54 : 64, lineHeight: 1.1, margin: 0 }}>{title}</h1>
        <p style={{ fontSize: 26, color: "#cfdad8", margin: "20px 0 0" }}>{sub}</p>
      </div>
      {t && <span style={{ position: "absolute", right: 64, top: 56, width: 96, height: 96, borderRadius: 24, background: "rgba(255,255,255,.08)", display: "grid", placeItems: "center", color: "#C79B59" }}><Icon name={t.icon} width={52} height={52} /></span>}
    </div>
  );
}
