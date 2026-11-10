import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MATERIALS, getMaterial } from "@/content/materials";
import { MaterialSections } from "@/components/materials/MaterialBlocks";
import { PrintButton } from "@/components/materials/PrintButton";
import { Sources } from "@/components/landing/Sources";
import { OFFERS } from "@/lib/offers";
import { absoluteUrl, SITE } from "@/lib/site";

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MATERIALS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const m = getMaterial((await params).slug);
  if (!m) return {};
  return {
    title: `${m.coverTitle} — ${m.format.toLowerCase()} (wersja do czytania)`,
    description: m.seo.description,
    alternates: { canonical: absoluteUrl(`/materialy/${m.slug}/czytaj`) },
  };
}

export default async function MaterialRead({ params }: P) {
  const m = getMaterial((await params).slug);
  if (!m) notFound();
  const offer = OFFERS[m.nextOffer];
  return (
    <article className="section" style={{ paddingTop: 24 }}>
      <div className="container container--narrow">
        <div className="no-print small muted" style={{ marginBottom: 12 }}><Link href={`/materialy/${m.slug}`}>← {m.coverTitle}</Link></div>
        <header style={{ borderBottom: "2px solid var(--gold-500)", paddingBottom: 20, marginBottom: 24 }}>
          <img src="/brand/nowy-etap-logo-poradnia.png" alt="Nowy Etap — Poradnia rozwodowa" width={160} height={40} style={{ height: 28, width: "auto", marginBottom: 16 }} />
          <span className="eyebrow">{m.format} · {m.time}</span>
          <h1 style={{ fontSize: "var(--fs-2xl)" }}>{m.coverTitle}</h1>
          <p className="lead">{m.coverSubtitle}</p>
          <div className="btn-row"><PrintButton slug={m.slug} /></div>
        </header>
        <nav aria-label="Spis treści" className="card card--sand no-print" style={{ marginBottom: 24 }}>
          <strong className="small">Spis treści</strong>
          <ol className="small" style={{ margin: "8px 0 0", paddingLeft: 20 }}>{m.sections.map((s, i) => <li key={s.heading}><a href={`#r${i + 1}`}>{s.heading}</a></li>)}</ol>
        </nav>
        <div className="prose">
          <MaterialSections sections={m.sections} />
        </div>
        <footer style={{ marginTop: 40, borderTop: "1px solid var(--line)", paddingTop: 20 }}>
          <h2 style={{ fontSize: "var(--fs-lg)" }}>Źródła</h2>
          <Sources items={m.sources} />
          <p className="xsmall muted">Materiał informacyjny {SITE.name}. Nie stanowi porady prawnej. Stan prawny na {new Date(SITE.legalReviewDate).toLocaleDateString("pl-PL")}. {SITE.url.replace("https://", "")}/materialy/{m.slug}</p>
          <div className="card card--green no-print mt">
            <h2 style={{ fontSize: "var(--fs-lg)" }}>{offer.title}</h2>
            <p className="small">{offer.description}</p>
            <Link className="btn btn--gold" href={offer.href}>{m.ctaLabel}</Link>
          </div>
        </footer>
      </div>
    </article>
  );
}
