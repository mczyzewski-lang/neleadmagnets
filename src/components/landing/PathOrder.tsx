import { PATH, WHY_ORDER, MEDIATION_ATTEMPT, type Stage } from "@/content/philosophy";
import { Alert } from "@/components/ui/Alert";

/** Pasek ścieżki: Plan → Ustalenia → Pozew i sąd, z zaznaczonym etapem */
export function PathStrip({ current, note }: { current: Stage; note?: string }) {
  return (
    <div className="path" role="group" aria-label="Ścieżka Nowego Etapu: najpierw plan, potem ustalenia, na końcu pozew i sąd">
      <ol className="path__steps">
        {PATH.map((p) => (
          <li key={p.stage} className={`path__step${p.stage === current ? " is-current" : ""}${p.stage < current ? " is-before" : ""}`} aria-current={p.stage === current ? "step" : undefined}>
            <span className="path__num" aria-hidden="true">{p.stage}</span>
            <span className="path__txt">
              <strong>{p.name}</strong>
              <span>{p.short}</span>
            </span>
            {p.stage === current && <span className="path__here">tu jesteś</span>}
          </li>
        ))}
      </ol>
      {note && <p className="path__note">{note}</p>}
    </div>
  );
}

/** Blok: próba mediacji — także gdy druga strona odmówi */
export function MediationAttempt() {
  return (
    <div className="card card--sand med-attempt">
      <h4>{MEDIATION_ATTEMPT.title}</h4>
      <ul className="list-check">{MEDIATION_ATTEMPT.points.map((p) => <li key={p}>{p}</li>)}</ul>
      <Alert tone="safety"><p>{MEDIATION_ATTEMPT.caveat}</p></Alert>
    </div>
  );
}

/** Sekcja landingu: dlaczego najpierw plan, potem ustalenia, a dopiero potem pozew */
export function WhyOrderSection({ current, what = "To narzędzie" }: { current: Stage; what?: string }) {
  const here = PATH.find((p) => p.stage === current)!;
  return (
    <section className="section landing-only" aria-labelledby="why-order-h">
      <div className="container">
        <span className="eyebrow">Nasza filozofia</span>
        <h2 id="why-order-h">Najpierw plan, potem ustalenia — dopiero potem pozew</h2>
        <p className="muted" style={{ maxWidth: "70ch" }}>
          {what} należy do etapu <strong>„{here.name}”</strong>. {here.text}
        </p>
        <PathStrip current={current} />
        <div className="grid grid--2 mt-lg" style={{ gap: 24, alignItems: "start" }}>
          <div>
            <h3 style={{ fontSize: "var(--fs-lg)" }}>Dlaczego ta kolejność ma sens</h3>
            <dl className="why-list">
              {WHY_ORDER.map((w) => <div key={w.title}><dt>{w.title}</dt><dd>{w.text}</dd></div>)}
            </dl>
          </div>
          <MediationAttempt />
        </div>
      </div>
    </section>
  );
}
