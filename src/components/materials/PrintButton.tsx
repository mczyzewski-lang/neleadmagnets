"use client";
import { Icon } from "@/components/ui/Icon";
import { track } from "@/lib/analytics";
export function PrintButton({ slug, label = "Pobierz PDF / drukuj" }: { slug: string; label?: string }) {
  return (
    <button type="button" className="btn no-print" onClick={() => { track("result_print", { material: slug }); window.print(); }}>
      <Icon name="print" width={18} /> {label}
    </button>
  );
}
