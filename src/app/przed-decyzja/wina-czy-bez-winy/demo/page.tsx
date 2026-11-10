import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/wina-czy-bez-winy";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { meta } from "@/lib/decision/wina-czy-bez-winy.meta";

export const metadata = demoMetadata(base, "/przed-decyzja/wina-czy-bez-winy");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/przed-decyzja/wina-czy-bez-winy" title={meta.cardTitle} />
      <Page />
    </>
  );
}
