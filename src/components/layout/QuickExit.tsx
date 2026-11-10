"use client";
import { track } from "@/lib/analytics";

/** Szybkie wyjście — dla osób, które mogą być obserwowane przez drugą stronę. */
export function QuickExit() {
  return (
    <button
      type="button"
      className="quick-exit"
      title="Natychmiast opuść stronę (otworzy się neutralna strona pogody). Historia przeglądarki nie zostanie wyczyszczona."
      onClick={() => {
        track("quick_exit");
        try { window.sessionStorage.clear(); } catch {}
        window.location.replace("https://www.google.com/search?q=pogoda");
      }}
    >
      Szybkie wyjście ✕
    </button>
  );
}
