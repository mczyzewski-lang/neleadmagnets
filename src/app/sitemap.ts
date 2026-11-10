import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { MATERIALS } from "@/content/materials";
import { absoluteUrl, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE.legalReviewDate);
  return [
    { url: absoluteUrl("/narzedzia"), lastModified, priority: 1 },
    ...TOOLS.map((t) => ({ url: absoluteUrl(`/narzedzia/${t.slug}`), lastModified, priority: 0.9 })),
    { url: absoluteUrl("/materialy"), lastModified, priority: 0.8 },
    ...MATERIALS.flatMap((m) => [
      { url: absoluteUrl(`/materialy/${m.slug}`), lastModified, priority: 0.7 },
      { url: absoluteUrl(`/materialy/${m.slug}/czytaj`), lastModified, priority: 0.5 },
    ]),
    { url: absoluteUrl("/plan-rozwodu"), lastModified, priority: 0.8 },
    { url: absoluteUrl("/pomoc"), lastModified, priority: 0.4 },
    { url: absoluteUrl("/polityka-prywatnosci"), lastModified, priority: 0.2 },
    { url: absoluteUrl("/zastrzezenia"), lastModified, priority: 0.2 },
  ];
}
