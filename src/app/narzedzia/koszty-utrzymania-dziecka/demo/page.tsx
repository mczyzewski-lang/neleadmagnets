import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/koszty-utrzymania-dziecka";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { getTool } from "@/lib/tools";

export const metadata = demoMetadata(base, "/narzedzia/koszty-utrzymania-dziecka");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/narzedzia/koszty-utrzymania-dziecka" title={getTool("koszty-utrzymania-dziecka").cardTitle} />
      <Page />
    </>
  );
}
