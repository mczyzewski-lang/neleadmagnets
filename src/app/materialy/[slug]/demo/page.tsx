import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateMetadata as baseMeta } from "../page";
import { MaterialLandingView } from "@/components/materials/MaterialLandingView";
import { MATERIALS, getMaterial } from "@/content/materials";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import type { AdSet } from "@/content/ads/types";
// Bezpośrednie importy (bez rejestru), aby strony demo materiałów nie zależały od pozostałych zestawów
import { ads as m1 } from "@/content/ads/rozwod-krok-po-kroku";
import { ads as m2 } from "@/content/ads/checklista-dokumentow";
import { ads as m3 } from "@/content/ads/jak-powiedziec-dzieciom";
import { ads as m4 } from "@/content/ads/przygotowanie-do-mediacji";
import { ads as m5 } from "@/content/ads/inwentaryzacja-majatku";
import { ads as m6 } from "@/content/ads/rozmowa-z-bankiem";
import { ads as m7 } from "@/content/ads/bezpieczenstwo-cyfrowe-i-finansowe";
import { ads as m8 } from "@/content/ads/komunikacja-z-drugim-rodzicem";
import { ads as m9 } from "@/content/ads/pierwsze-swieta-po-rozstaniu";
import { ads as m10 } from "@/content/ads/przygotowanie-do-konsultacji";

const MATERIAL_ADS: Record<string, AdSet> = Object.fromEntries([m1, m2, m3, m4, m5, m6, m7, m8, m9, m10].map((a) => [a.slug, a]));

type P = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MATERIALS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { slug } = await params;
  return demoMetadata(await baseMeta({ params }), `/materialy/${slug}`);
}

export default async function MaterialDemo({ params }: P) {
  const { slug } = await params;
  const m = getMaterial(slug);
  const ads = MATERIAL_ADS[slug];
  if (!m || !ads) notFound();
  return (
    <>
      <AdDemoBubble ads={ads} landingPath={`/materialy/${slug}`} title={m.coverTitle} />
      <MaterialLandingView m={m} demo />
    </>
  );
}
