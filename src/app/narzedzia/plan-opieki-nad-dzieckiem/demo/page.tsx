import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/plan-opieki-nad-dzieckiem";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { getTool } from "@/lib/tools";

export const metadata = demoMetadata(base, "/narzedzia/plan-opieki-nad-dzieckiem");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/narzedzia/plan-opieki-nad-dzieckiem" title={getTool("plan-opieki-nad-dzieckiem").cardTitle} />
      <Page />
    </>
  );
}
