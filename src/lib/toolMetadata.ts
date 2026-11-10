import type { Metadata } from "next";
import { getTool } from "./tools";
import { absoluteUrl } from "./site";

export function toolMetadata(slug: string): Metadata {
  const t = getTool(slug);
  const url = absoluteUrl(`/narzedzia/${slug}`);
  return {
    title: t.seo.title,
    description: t.seo.description,
    alternates: { canonical: url },
    openGraph: { title: t.h1, description: t.seo.description, url, type: "website", images: [{ url: absoluteUrl(`/og/${slug}.png`), width: 1200, height: 630, alt: t.h1 }] },
    twitter: { card: "summary_large_image", title: t.h1, description: t.seo.description },
  };
}
