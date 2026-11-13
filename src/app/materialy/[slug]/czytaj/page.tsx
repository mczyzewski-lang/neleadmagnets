import { permanentRedirect } from "next/navigation";
import { MATERIALS } from "@/content/materials";

/** Dawny widok do czytania/druku — materiały wypełnia się teraz online na landingu. */
export function generateStaticParams() {
  return MATERIALS.map((m) => ({ slug: m.slug }));
}

export default async function ReadRedirect({ params }: { params: Promise<{ slug: string }> }) {
  permanentRedirect(`/materialy/${(await params).slug}#wypelnij`);
}
