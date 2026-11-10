import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/pozew-rozwodowy-checklista";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { meta } from "@/lib/decision/pozew-rozwodowy-checklista.meta";

export const metadata = demoMetadata(base, "/przed-decyzja/pozew-rozwodowy-checklista");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/przed-decyzja/pozew-rozwodowy-checklista" title={meta.cardTitle} />
      <Page />
    </>
  );
}
