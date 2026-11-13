import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MATERIALS, getMaterial } from "@/content/materials";
import { absoluteUrl } from "@/lib/site";
import { COVER_IMAGES } from "@/content/covers";
import { MaterialLandingView } from "@/components/materials/MaterialLandingView";
type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MATERIALS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const m = getMaterial((await params).slug);
  if (!m) return {};
  const url = absoluteUrl(`/materialy/${m.slug}`);
  return {
    title: { absolute: m.seo.title },
    description: m.seo.description,
    alternates: { canonical: url },
    openGraph: { title: m.h1, description: m.seo.description, url, images: [{ url: absoluteUrl(COVER_IMAGES[m.slug] || `/covers/${m.slug}-placeholder.png`), width: 1200, height: 1200, alt: m.coverTitle }] },
  };
}

export default async function MaterialLanding({ params }: P) {
  const m = getMaterial((await params).slug);
  if (!m) notFound();
  return <MaterialLandingView m={m} />;
}

