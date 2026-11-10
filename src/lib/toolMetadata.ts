import type { Metadata } from "next";
import { getTool } from "./tools";
import { absoluteUrl } from "./site";

import type { ToolMeta } from "./tools";

export function toolMetadata(slug: string): Metadata {
  return metaFor(getTool(slug), `/narzedzia/${slug}`);
}

/** Metadane dla dowolnego narzędzia pod wskazaną ścieżką (np. /przed-decyzja/<slug>) */
export function metaFor(t: ToolMeta, path: string, ogImage = `/og/${t.slug}.png`): Metadata {
  const url = absoluteUrl(path);
  return {
    title: t.seo.title,
    description: t.seo.description,
    alternates: { canonical: url },
    openGraph: { title: t.h1, description: t.seo.description, url, type: "website", images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630, alt: t.h1 }] },
    twitter: { card: "summary_large_image", title: t.h1, description: t.seo.description },
  };
}

/** Strony /demo: podgląd z propozycjami reklam — niewidoczne dla wyszukiwarek */
export function demoMetadata(base: Metadata, canonicalPath: string): Metadata {
  return { ...base, title: { absolute: `DEMO · ${typeof base.title === "string" ? base.title : "Nowy Etap"}` }, robots: { index: false, follow: false }, alternates: { canonical: absoluteUrl(canonicalPath) } };
}
