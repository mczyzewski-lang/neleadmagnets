import Link from "next/link";
export default function NotFound() {
  return (
    <section className="section">
      <div className="container container--narrow center">
        <h1 style={{ fontSize: "var(--fs-2xl)" }}>Nie znaleźliśmy tej strony</h1>
        <p>Zobacz wszystkie bezpłatne narzędzia.</p>
        <Link className="btn" href="/narzedzia">Przejdź do narzędzi</Link>
      </div>
    </section>
  );
}
