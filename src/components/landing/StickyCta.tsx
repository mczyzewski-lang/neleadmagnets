"use client";
import { useEffect, useState } from "react";

/** Mobilne CTA pokazywane, gdy przycisk w hero zniknie z ekranu, a narzędzie nie jest jeszcze widoczne. */
export function StickyCta({ label = "Rozpocznij — to bezpłatne" }: { label?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const tool = document.getElementById("narzedzie");
    if (!hero || !tool || !("IntersectionObserver" in window)) return;
    let heroVisible = true, toolVisible = false;
    const update = () => setVisible(!heroVisible && !toolVisible);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroVisible = e.isIntersecting;
        if (e.target === tool) toolVisible = e.isIntersecting;
      }
      update();
    }, { threshold: 0 });
    io.observe(hero); io.observe(tool);
    return () => io.disconnect();
  }, []);
  return (
    <div className={`sticky-cta ${visible ? "is-visible" : ""}`}>
      <a href="#narzedzie" className="btn btn--gold btn--block" style={{ boxShadow: "var(--shadow-lg)" }}>{label}</a>
    </div>
  );
}
