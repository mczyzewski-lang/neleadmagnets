import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/separacja-czy-rozwod";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { getTool } from "@/lib/tools";

export const metadata = demoMetadata(base, "/narzedzia/separacja-czy-rozwod");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/narzedzia/separacja-czy-rozwod" title={getTool("separacja-czy-rozwod").cardTitle} />
      <Page />
    </>
  );
}
