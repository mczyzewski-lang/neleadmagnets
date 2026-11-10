import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/kompas-decyzji";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { meta } from "@/lib/decision/kompas-decyzji.meta";

export const metadata = demoMetadata(base, "/przed-decyzja/kompas-decyzji");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/przed-decyzja/kompas-decyzji" title={meta.cardTitle} />
      <Page />
    </>
  );
}
