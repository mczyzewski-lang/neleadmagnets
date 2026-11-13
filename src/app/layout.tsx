import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter/index.css";
import "@fontsource/oswald/500.css";
import "@fontsource/caveat/500.css";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Bezpłatne narzędzia przed rozstaniem i rozwodem | Nowy Etap", template: "%s | Nowy Etap" },
  description: "Co jeśli się rozstaniemy? Bezpłatne kalkulatory i kreatory: mieszkanie i kredyt, budżet, plan opieki nad dzieckiem, separacja czy rozwód. Najpierw plan i ustalenia.",
  applicationName: "Nowy Etap",
  icons: { icon: "/favicon.svg" },
  openGraph: { siteName: "Nowy Etap", locale: "pl_PL", type: "website" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#263D3A", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <a href="#tresc" className="skip-link">Przejdź do treści</a>
        <Header />
        <main id="tresc">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
