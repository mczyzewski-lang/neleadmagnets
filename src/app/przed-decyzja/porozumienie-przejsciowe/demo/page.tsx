import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/porozumienie-przejsciowe";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { meta } from "@/lib/decision/porozumienie-przejsciowe.meta";

export const metadata = demoMetadata(base, "/przed-decyzja/porozumienie-przejsciowe");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/przed-decyzja/porozumienie-przejsciowe" title={meta.cardTitle} />
      <Page />
    </>
  );
}
