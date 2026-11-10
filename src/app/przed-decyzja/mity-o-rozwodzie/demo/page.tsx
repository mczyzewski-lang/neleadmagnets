import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/mity-o-rozwodzie";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { meta } from "@/lib/decision/mity-o-rozwodzie.meta";

export const metadata = demoMetadata(base, "/przed-decyzja/mity-o-rozwodzie");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/przed-decyzja/mity-o-rozwodzie" title={meta.cardTitle} />
      <Page />
    </>
  );
}
