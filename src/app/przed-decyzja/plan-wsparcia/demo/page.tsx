import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/plan-wsparcia";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { meta } from "@/lib/decision/plan-wsparcia.meta";

export const metadata = demoMetadata(base, "/przed-decyzja/plan-wsparcia");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/przed-decyzja/plan-wsparcia" title={meta.cardTitle} />
      <Page />
    </>
  );
}
