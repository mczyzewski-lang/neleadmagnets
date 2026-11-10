import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/koszt-rozwodu";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { meta } from "@/lib/decision/koszt-rozwodu.meta";

export const metadata = demoMetadata(base, "/przed-decyzja/koszt-rozwodu");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/przed-decyzja/koszt-rozwodu" title={meta.cardTitle} />
      <Page />
    </>
  );
}
