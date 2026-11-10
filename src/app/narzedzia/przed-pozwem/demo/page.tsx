import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/przed-pozwem";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { getTool } from "@/lib/tools";

export const metadata = demoMetadata(base, "/narzedzia/przed-pozwem");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/narzedzia/przed-pozwem" title={getTool("przed-pozwem").cardTitle} />
      <Page />
    </>
  );
}
