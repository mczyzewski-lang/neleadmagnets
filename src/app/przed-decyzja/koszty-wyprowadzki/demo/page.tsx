import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/koszty-wyprowadzki";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { meta } from "@/lib/decision/koszty-wyprowadzki.meta";

export const metadata = demoMetadata(base, "/przed-decyzja/koszty-wyprowadzki");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/przed-decyzja/koszty-wyprowadzki" title={meta.cardTitle} />
      <Page />
    </>
  );
}
