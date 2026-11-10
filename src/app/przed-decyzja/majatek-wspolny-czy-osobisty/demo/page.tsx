import Page, { metadata as base } from "../page";
import { ads } from "@/content/ads/majatek-wspolny-czy-osobisty";
import { AdDemoBubble } from "@/components/demo/AdDemoBubble";
import { demoMetadata } from "@/lib/toolMetadata";
import { meta } from "@/lib/decision/majatek-wspolny-czy-osobisty.meta";

export const metadata = demoMetadata(base, "/przed-decyzja/majatek-wspolny-czy-osobisty");

export default function Demo() {
  return (
    <>
      <AdDemoBubble ads={ads} landingPath="/przed-decyzja/majatek-wspolny-czy-osobisty" title={meta.cardTitle} />
      <Page />
    </>
  );
}
