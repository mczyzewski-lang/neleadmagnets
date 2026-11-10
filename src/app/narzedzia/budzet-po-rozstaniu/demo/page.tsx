import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/budzet-po-rozstaniu";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { getTool } from "@/lib/tools";

export const metadata = demoMetadata(base, "/narzedzia/budzet-po-rozstaniu");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/narzedzia/budzet-po-rozstaniu" title={getTool("budzet-po-rozstaniu").cardTitle} />
      <Page />
    </>
  );
}
