import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/mieszkanie-i-kredyt";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { getTool } from "@/lib/tools";

export const metadata = demoMetadata(base, "/narzedzia/mieszkanie-i-kredyt");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/narzedzia/mieszkanie-i-kredyt" title={getTool("mieszkanie-i-kredyt").cardTitle} />
      <Page />
    </>
  );
}
