import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/rozmowa-o-rozstaniu";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { meta } from "@/lib/decision/rozmowa-o-rozstaniu.meta";

export const metadata = demoMetadata(base, "/przed-decyzja/rozmowa-o-rozstaniu");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/przed-decyzja/rozmowa-o-rozstaniu" title={meta.cardTitle} />
      <Page />
    </>
  );
}
