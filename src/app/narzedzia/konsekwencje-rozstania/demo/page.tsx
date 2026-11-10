import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/konsekwencje-rozstania";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { getTool } from "@/lib/tools";

export const metadata = demoMetadata(base, "/narzedzia/konsekwencje-rozstania");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/narzedzia/konsekwencje-rozstania" title={getTool("konsekwencje-rozstania").cardTitle} />
      <Page />
    </>
  );
}
