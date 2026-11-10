import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/pierwsze-30-dni";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { getTool } from "@/lib/tools";

export const metadata = demoMetadata(base, "/narzedzia/pierwsze-30-dni");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/narzedzia/pierwsze-30-dni" title={getTool("pierwsze-30-dni").cardTitle} />
      <Page />
    </>
  );
}
