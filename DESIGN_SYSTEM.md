# Design system — Nowy Etap

Implementacja: `src/app/globals.css` (tokeny + komponenty CSS) oraz komponenty React w `src/components`.
Charakter: premium, ale przystępny; spokojny, minimalistyczny, mobile-first. Bez młotków, paragrafów, krzykliwych gradientów i „AI-wyglądu”.

## Kolory (zweryfikowane z logo)

Próbkowanie dostarczonego logo PNG: zieleń napisu **#295550**, złoto schodka **#BE934E / #C39B5D**. Paleta wyjściowa z briefu została zachowana i uzupełniona:

| Token | Wartość | Użycie |
|---|---|---|
| `--green-800` | #263D3A | ciemna zieleń: nagłówki wyników, stopka-sekcje, H1–H3 |
| `--green-700` | #295550 | zieleń logo: przyciski główne, linki, akcenty |
| `--green-600` | #355450 | głęboka zieleń (z briefu) |
| `--green-50/100` | #F1F5F4 / #E3EBE9 | tła zaznaczeń, ikon |
| `--gold-500` | #C79B59 | złoto: CTA „gold”, numeracja, akcenty |
| `--gold-400` | #C9A96E | jasne złoto: akcenty na ciemnym tle |
| `--gold-text` | #7E5B26 | **złoto do tekstu na jasnym tle** (kontrast ≈ 6:1) |
| `--cream` | #FCF9F8 | off-white: tło strony |
| `--sand`, `--sand-2` | #F6F0EA, #EFE6DC | ciepłe tła pomocnicze |
| `--ink`, `--ink-2`, `--ink-3` | #1F2B29, #44514F, #5E6B69 | tekst (ink-3 ≥ 4.5:1 na cream) |

Złota #C79B59 nie używamy jako koloru tekstu na jasnym tle (kontrast < 3:1). Przycisk „gold” ma ciemnozielony tekst (#1C2E2B, kontrast ≈ 7:1).

Kolory semantyczne: `--ok` #2F6B4F, `--warn` #8A5A12, `--danger` #A3352B (+ jasne tła `*-bg`).

## Typografia

- **Inter Variable** (self-hosted, @fontsource) — cały tekst UI; nagłówki 650, letter-spacing ujemny.
- **Oswald 500** — wyłącznie „eyebrow” (kapitaliki z odstępami), nawiązanie do kroju logo.
- Skala płynna: `--fs-3xl` (H1, clamp 32→52 px), `--fs-2xl` (H2), `--fs-xl`, `--fs-lg`, `--fs-md` (17 px, tekst), `--fs-sm`, `--fs-xs`.
- Inputy zawsze 16 px (brak auto-zoomu w iOS).

## Motyw marki

„Schodek” z logo (linia wznosząca się stopniem) — przed eyebrow, na okładkach, w grafikach OG. Używany oszczędnie, jako sygnatura.

## Komponenty

| Komponent | Klasy / plik | Zasady |
|---|---|---|
| Przyciski | `.btn`, `.btn--gold`, `.btn--ghost`, `.btn--link`, `.btn--sm`, `.btn--block` | min. wysokość 48 px; jedno główne CTA (gold) na ekran |
| Karty | `.card`, `.card--sand`, `.card--green`, `.card-link` | zaokrąglenie 18 px, delikatny cień |
| Karty odpowiedzi | `SingleChoice`, `MultiChoice` (`.choice`) | natywne radio/checkbox, cały wiersz klikalny, min. 60 px |
| Pola | `.input`, `MoneyField` (`.input-group` z sufiksem „zł”) | etykieta nad polem, podpowiedź i błąd pod polem, `aria-invalid` |
| Kreator | `Wizard` (`.tool-frame`, `.progress`, `.wizard-nav`) | jedno pytanie na ekran, logika warunkowa, „Wstecz”, przyklejona nawigacja na mobile, fokus na tytule kroku |
| Edycja odpowiedzi | `AnswersSummary` | w wyniku, „Zmień” wraca do konkretnego kroku bez utraty danych |
| Wynik | `.result-head`, `.kpis`/`.kpi`, `.result-section`, `.scenario`, `.list-check`, `.list-dot`, `.list-q` | najpierw liczby/kluczowy wniosek, potem szczegóły, potem akcje |
| Wykresy | `components/charts` (BarCompare, Donut), `.hbar` | SVG, `role="img"` + `aria-label` + ukryta tabela danych |
| Kalendarze | `.week`, `.month`, `.parent-a`, `.parent-b` | kolor + tekst (nie tylko kolor) |
| Komunikaty | `Alert` tone: info / warn / danger / ok / safety | „safety” dla treści o bezpieczeństwie |
| Akcje wyniku | `ResultActions` | PDF/druk, .txt, e-mail (uczciwy stan, gdy brak konfiguracji), „Wyczyść odpowiedzi” |
| Kolejny krok | `NextStep` | maks. 2 oferty, dopasowane do sytuacji; pierwsza wyróżniona |
| Landing | `ToolLanding` | Hero z zapowiedzią wyniku → Jak to działa → Narzędzie → FAQ → Wiarygodność i źródła → Inne narzędzia; `StickyCta` na mobile |
| Okładki | `Cover3D` | makieta CSS 3D do czasu wygenerowania grafik (`src/content/covers.ts`) |
| Nawigacja | `Header` (logo, menu, „Szybkie wyjście”), `Footer` | |

## Druk / PDF

`@media print`: ukrywa nawigację, CTA i formularze (`.no-print`), pokazuje `.print-only`, wymusza kolory kalendarzy i wykresów, unika łamania kart. Każdy wynik i materiał drukuje się jako czytelny dokument A4.

## Dostępność (cel: WCAG 2.2 AA)

Skip link, semantyczne nagłówki (jeden H1), natywne kontrolki formularzy, widoczny fokus, cele dotykowe ≥ 44 px, `prefers-reduced-motion`, komunikaty błędów z `role="alert"`, wykresy z alternatywą tekstową, kontrast tokenów sprawdzony.
