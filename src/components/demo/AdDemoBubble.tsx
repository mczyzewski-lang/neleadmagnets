"use client";
import { useEffect, useState } from "react";
import "./demo.css";
import type { AdSet } from "@/content/ads/types";
import { LIMITS } from "@/content/ads/types";
import { Icon } from "@/components/ui/Icon";

type Tab = "meta" | "dg" | "search";

function Count({ text, max }: { text: string; max: number }) {
  const n = [...text].length;
  return <span className={`ad-count ${n > max ? "ad-count--over" : ""}`} title={n > max ? "Przekroczony limit" : undefined}>{n}/{max}</span>;
}

function CopyBtn({ text }: { text: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button type="button" className="ad-copy" onClick={() => { navigator.clipboard?.writeText(text).then(() => { setOk(true); setTimeout(() => setOk(false), 1200); }).catch(() => {}); }}>
      {ok ? "Skopiowano" : "Kopiuj"}
    </button>
  );
}

function List({ title, items, max }: { title: string; items: string[]; max: number }) {
  return (
    <>
      <p className="ad-h">{title} ({items.length})</p>
      <ul className="ad-list">
        {items.map((t, i) => (
          <li key={i}><span className="txt">{t}</span><Count text={t} max={max} /><CopyBtn text={t} /></li>
        ))}
      </ul>
    </>
  );
}

/** Dymek z propozycjami reklam — wyświetlany wyłącznie na stronach /demo */
export function AdDemoBubble({ ads, landingPath, title }: { ads: AdSet; landingPath: string; title: string }) {
  const [open, setOpen] = useState(true);
  const [tab, setTab] = useState<Tab>("meta");
  const [variant, setVariant] = useState(0);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const v = (arr: string[]) => arr[variant % arr.length] || "";
  const utm = (src: string, med: string) => `${landingPath}?utm_source=${src}&utm_medium=${med}&utm_campaign=${ads.slug}&utm_content=v${(variant % 3) + 1}`;

  return (
    <>
      <div className="demo-banner" role="note">
        <strong>TRYB DEMO</strong> · podgląd landingu z propozycjami reklam · strona nieindeksowana · wersja publiczna: <a href={landingPath} style={{ color: "#fff" }}>{landingPath}</a>
      </div>
      {!open && (
        <button type="button" className="demo-launch" onClick={() => setOpen(true)} aria-expanded={false}>
          <Icon name="message" width={18} /> Propozycje reklam
        </button>
      )}
      {open && (
        <section className="demo-panel" role="dialog" aria-label="Propozycje treści reklam">
          <div className="demo-panel__head">
            <button type="button" className="demo-close" onClick={() => setOpen(false)} aria-label="Zamknij dymek"><Icon name="x" width={18} /></button>
            <p className="ad-h" style={{ marginTop: 0 }}>Propozycje reklam</p>
            <h2 style={{ fontSize: "var(--fs-lg)", margin: "0 40px 6px 0" }}>{title}</h2>
            <p className="xsmall muted" style={{ margin: "0 0 10px" }}><strong>Kąt:</strong> {ads.angle}</p>
            <div className="segmented" role="tablist" aria-label="Kanał">
              {([["meta", "Meta"], ["dg", "Demand Gen"], ["search", "Google Search"]] as [Tab, string][]).map(([k, l]) => (
                <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="demo-panel__body">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <span className="xsmall muted">Podgląd wariantu {(variant % 3) + 1}</span>
              <button type="button" className="ad-copy" onClick={() => setVariant((x) => x + 1)}>Następny wariant ↻</button>
            </div>

            {tab === "meta" && (
              <>
                <div className="ad-mock" aria-label="Podgląd reklamy Meta">
                  <div className="ad-mock__top"><span className="ad-mock__avatar">NE</span><div><div className="ad-mock__name">Nowy Etap · Poradnia rozwodowa</div><div className="ad-mock__sp">Sponsorowane</div></div></div>
                  <div className="ad-mock__text">{v(ads.meta.primaryTexts)}</div>
                  <div className="ad-mock__img ad-mock__img--sq"><small>Bezpłatne narzędzie</small><b>{v(ads.meta.headlines)}</b></div>
                  <div className="ad-mock__bar"><div><div className="u">nowyetap.pl</div><div className="h">{v(ads.meta.headlines)}</div><div className="d">{v(ads.meta.descriptions)}</div></div><span className="ad-mock__cta">{ads.meta.cta}</span></div>
                </div>
                <List title="Tekst główny" items={ads.meta.primaryTexts} max={LIMITS.metaPrimary} />
                <List title="Nagłówki" items={ads.meta.headlines} max={LIMITS.metaHeadline} />
                <List title="Opisy" items={ads.meta.descriptions} max={LIMITS.metaDescription} />
                <p className="ad-h">Kreacja</p><p>{ads.meta.creative}</p>
                <p className="ad-h">Link z UTM</p><p className="xsmall" style={{ wordBreak: "break-all" }}>{utm("meta", "paid_social")} <CopyBtn text={utm("meta", "paid_social")} /></p>
              </>
            )}

            {tab === "dg" && (
              <>
                <div className="ad-mock" aria-label="Podgląd reklamy Demand Gen">
                  <div className="ad-mock__img"><small>Nowy Etap</small><b>{v(ads.demandGen.longHeadlines)}</b></div>
                  <div className="ad-mock__bar"><div><div className="h">{v(ads.demandGen.headlines)}</div><div className="d">Sponsorowane · nowyetap.pl</div></div><span className="ad-mock__cta" style={{ background: "var(--green-700)", color: "#fff" }}>{ads.demandGen.cta}</span></div>
                  <div className="ad-mock__text" style={{ paddingTop: 10 }}>{v(ads.demandGen.descriptions)}</div>
                </div>
                <List title="Nagłówki" items={ads.demandGen.headlines} max={LIMITS.dgHeadline} />
                <List title="Długie nagłówki" items={ads.demandGen.longHeadlines} max={LIMITS.dgLong} />
                <List title="Teksty reklamy" items={ads.demandGen.descriptions} max={LIMITS.dgDescription} />
                <p className="ad-h">Kreacja</p><p>{ads.demandGen.creative}</p>
                <p className="ad-h">Link z UTM</p><p className="xsmall" style={{ wordBreak: "break-all" }}>{utm("google", "demand_gen")} <CopyBtn text={utm("google", "demand_gen")} /></p>
              </>
            )}

            {tab === "search" && (
              <>
                <div className="ad-mock ad-mock--search" aria-label="Podgląd reklamy w wyszukiwarce">
                  <div className="sp">Sponsorowane</div>
                  <div className="url">nowyetap.pl › {ads.search.paths[0]} › {ads.search.paths[1]}</div>
                  <div className="t">{[0, 1, 2].map((i) => ads.search.headlines[(variant + i) % ads.search.headlines.length]).join(" | ")}</div>
                  <div className="ds">{v(ads.search.descriptions)}</div>
                </div>
                <p className="ad-h">Słowa kluczowe (dopasowanie do frazy / ścisłe)</p>
                <p>{ads.search.keywords.map((k) => <span key={k} className="tag" style={{ margin: "0 6px 6px 0" }}>{k}</span>)}</p>
                <List title="Nagłówki RSA" items={ads.search.headlines} max={LIMITS.searchHeadline} />
                <List title="Teksty reklamy" items={ads.search.descriptions} max={LIMITS.searchDescription} />
                <p className="ad-h">Link z UTM</p><p className="xsmall" style={{ wordBreak: "break-all" }}>{utm("google", "cpc")} <CopyBtn text={utm("google", "cpc")} /></p>
              </>
            )}

            <p className="ad-h">Kierowanie</p>
            <p>{ads.targeting}</p>
            <div className="alert alert--warn" style={{ marginTop: 10 }}>
              <div>
                <p style={{ marginBottom: 4 }}><strong>Zasady:</strong> bez sugerowania, że odbiorca się rozstaje (Meta — atrybuty osobiste); bez remarketingu, list klientów i podobnych odbiorców (Google — kategoria wrażliwa); do pikseli trafiają tylko zdarzenia bez treści odpowiedzi.</p>
                {ads.notes?.map((n) => <p key={n} style={{ marginBottom: 4 }}>{n}</p>)}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
