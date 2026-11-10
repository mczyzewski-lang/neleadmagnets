# Nowy Etap — Centrum bezpłatnych narzędzi przed rozstaniem i rozwodem

> „Najpierw plan i ustalenia. Dopiero potem pozew.”

Aplikacja Next.js (App Router, TypeScript) z **18 interaktywnymi narzędziami** (8 w dziale „Co jeśli się rozstaniemy?” i 10 w dziale „Przed decyzją”) z osobnymi landing page'ami oraz **10 materiałami do pobrania** (przewodniki, checklisty, planery) z landingami i okładkami 3D. Każdy z 28 landingów ma wersję **`/demo`** z dymkiem zawierającym propozycje reklam Meta, Google Demand Gen i Google Search. Strony są przygotowane pod kampanie Google Ads (Search, Demand Gen, PMax), Meta Ads i reklamy natywne.

| Ścieżka | Zawartość |
|---|---|
| `/narzedzia` | Strona główna „Co jeśli się rozstaniemy?” — 8 narzędzi + 10 materiałów |
| `/narzedzia/mieszkanie-i-kredyt` | 3 scenariusze dla mieszkania, różnica wartość − kredyt, LTV, ryzyka, pytania do banku |
| `/narzedzia/budzet-po-rozstaniu` | Kalkulator budżetu: obecny + 3 warianty z edytowalnymi założeniami, wykres, poduszka finansowa |
| `/narzedzia/plan-opieki-nad-dzieckiem` | Kreator planu rodzicielskiego: kalendarz 2-tygodniowy i miesięczny, święta, wakacje, PDF |
| `/narzedzia/konsekwencje-rozstania` | Mapa tematów prawnych (osobno małżeństwo / związek nieformalny) |
| `/narzedzia/przed-pozwem` | Mapa ustaleń przed pozwem, mediacja, ścieżka bezpieczeństwa (najmocniej połączone ze sprzedażą) |
| `/narzedzia/koszty-utrzymania-dziecka` | Koszty miesięczne/roczne, kategorie, porównanie scenariuszy (to **nie** kalkulator alimentów) |
| `/narzedzia/separacja-czy-rozwod` | Indywidualna tabela porównawcza, bez podpowiadania decyzji |
| `/narzedzia/pierwsze-30-dni` | Checklista na 4 okresy, odhaczanie, edycja, PDF, opcjonalny zapis lokalny |
| `/przed-decyzja` | **Dział „Zanim podejmiesz decyzję”** — 10 narzędzi dla osób rozważających rozstanie: |
| `/przed-decyzja/koszt-rozwodu` | Kalkulator kosztów rozwodu: opłaty, mediacja, podział majątku, pełnomocnik; porównanie 2 ścieżek |
| `/przed-decyzja/rozmowa-o-rozstaniu` | Plan trudnej rozmowy (z blokadą bezpieczeństwa na początku) |
| `/przed-decyzja/kompas-decyzji` | Refleksja bez rekomendacji: obraz sytuacji, 6 możliwych dróg, plan na 7 dni |
| `/przed-decyzja/majatek-wspolny-czy-osobisty` | Klasyfikator składników majątku: wspólny / osobisty / mieszany / do analizy |
| `/przed-decyzja/wina-czy-bez-winy` | Porównanie rozwodu z orzekaniem o winie i bez — dopasowane do odpowiedzi |
| `/przed-decyzja/porozumienie-przejsciowe` | Generator propozycji zasad na czas przejściowy, z podziałem rachunków |
| `/przed-decyzja/koszty-wyprowadzki` | Kalkulator kosztów wyprowadzki: kwota na start, koszt miesięczny, ile pokryją oszczędności |
| `/przed-decyzja/plan-wsparcia` | Plan wsparcia na czas rozstania (kto, w czym, gdy… to…) |
| `/przed-decyzja/mity-o-rozwodzie` | Quiz „Mity i fakty” z wyjaśnieniami i źródłami |
| `/przed-decyzja/pozew-rozwodowy-checklista` | Który sąd (art. 41 KPC) + lista kontrolna elementów pozwu |
| `<dowolny landing>/demo` | Ten sam landing + dymek z propozycjami reklam (noindex). Spis wszystkich: **`/demo`** |
| `/materialy`, `/materialy/<slug>`, `/materialy/<slug>/czytaj` | 10 materiałów: landing + wersja do czytania/druku |
| `/plan-rozwodu` | Docelowa strona usługi: Plan Rozwodu, wycena, mediacja, DUO, kontakt |
| `/pomoc` | Numery pomocowe (112, Niebieska Linia, 116 123, 116 111, 800 70 2222) |
| `/polityka-prywatnosci`, `/zastrzezenia` | Polityka prywatności i cookies, źródła i zastrzeżenia |

Dokumentacja projektowa:

- `RESEARCH.md` — research rynku PL i zagranicznego, ocena pomysłów, rekomendacje
- `LEGAL_VERIFICATION.md` — weryfikacja stanu prawnego na 10.11.2026 (obowiązujące przepisy vs projekty)
- `MARKETING/ADS.md` — hooki, nagłówki, H1, CTA, scenariusze wideo, briefy grafik dla każdego narzędzia i materiału
- `MARKETING/ADS-DEMO.md` — propozycje reklam dla wszystkich 28 landingów (eksport z `src/content/ads/*.ts`: `node scripts/export-ads.mjs`)
- `MARKETING/COVERS.md` — prompty do okładek 3D (OpenAI) i instrukcja podpięcia
- `DESIGN_SYSTEM.md` — tokeny, komponenty, zasady

## Uruchomienie

```bash
npm install
cp .env.example .env.local   # uzupełnij według potrzeb — wszystko jest opcjonalne
npm run dev                  # http://localhost:3000/narzedzia
npm test                     # testy logiki narzędzi (vitest)
npm run lint                 # kontrola typów
npm run build && npm start   # produkcja
```

Wymagany Node.js 20+. Aplikacja działa w pełni **bez żadnych kluczy** — narzędzia liczą wyniki w przeglądarce.

## Architektura

```
src/
  app/                      strony (App Router), API /api/lead, sitemap, robots
  components/
    tool/Wizard.tsx         kreator krok po kroku: logika warunkowa, pasek postępu, wstecz, edycja odpowiedzi
    tool/ResultActions.tsx  PDF/druk, pobranie .txt, e-mail (tylko gdy skonfigurowany), kolejny krok
    landing/ToolLanding.tsx wspólna struktura landingu (hero + zapowiedź wyniku, jak to działa, FAQ, źródła)
    tools/*Tool.tsx         interfejs każdego narzędzia
    charts/                 dostępne wykresy SVG (z tabelą dla czytników ekranu)
  lib/
    tools/*.ts              DETERMINISTYCZNA logika każdego narzędzia (testowana w tests/)
    tools.ts                metadane narzędzi: H1/H2, SEO, FAQ, źródła, CTA
    offers.ts               oferty Nowego Etapu (Plan Rozwodu, mediacja, DUO, konsultacja, materiały)
    analytics.ts            bezpieczna warstwa zdarzeń (allowlista, zero treści odpowiedzi)
    attribution.ts          UTM/gclid w sessionStorage, przekazywane tylko z dobrowolnym zgłoszeniem
    server/                 e-mail (Resend), webhook CRM (HMAC), rate limit
  content/
    materials/*.ts          treść 10 materiałów (typ `Material`)
    covers.ts               mapowanie wygenerowanych okładek
```

**Zasada:** wyniki są liczone lub składane deterministycznie z odpowiedzi (reguły w `src/lib/tools`). Aplikacja nie używa AI — jeśli w przyszłości dodacie objaśnienia AI, trzymajcie je oddzielnie od obliczeń, a brak klucza nie może wyłączać narzędzi.

## Strony demo z propozycjami reklam

- Treści reklam: `src/content/ads/<slug>.ts` (typ `AdSet`, limity znaków w `src/content/ads/types.ts`), rejestr `src/content/ads/index.ts`.
- `tests/ads.test.ts` pilnuje limitów znaków (Meta, Demand Gen, Search RSA) i blokuje sformułowania sugerujące znajomość sytuacji odbiorcy.
- Dymek: `src/components/demo/AdDemoBubble.tsx` — podgląd reklamy, warianty, kopiowanie, linki z UTM. Strony `/demo` mają `noindex` i są wyłączone w robots.txt i sitemapie.

## Integracje

Status integracji: `GET /api/lead` zwraca `{ "email": bool, "crm": bool }`. Przy starcie serwera brakujące integracje są zgłaszane w logach z instrukcją.

### E-mail (wysyłka wyniku, materiału, potwierdzenia zgłoszenia)

1. Załóż konto w [Resend](https://resend.com) i zweryfikuj domenę nadawcy (SPF/DKIM).
2. Ustaw `RESEND_API_KEY` i `EMAIL_FROM` (np. `Nowy Etap <narzedzia@nowyetap.pl>`).
3. Opcjonalnie `LEADS_NOTIFY_EMAIL` — adres zespołu do powiadomień o zgłoszeniach kontaktowych.

Bez konfiguracji opcja „Wyślij mi na e-mail” pokazuje uczciwy komunikat, że wysyłka nie jest włączona — **aplikacja nie udaje wysyłki**. Inny dostawca: podmień `src/lib/server/email.ts → sendEmail()`.

### CRM (webhook)

Ustaw `CRM_WEBHOOK_URL` i `CRM_WEBHOOK_SECRET`. Zgłoszenia są wysyłane `POST` jako JSON:

```json
{
  "id": "uuid",
  "source": "nowy-etap-narzedzia",
  "sourceId": "przed-pozwem",
  "sourceName": "Czy warto ustalić warunki przed pozwem?",
  "submittedAt": "2026-11-10T12:00:00.000Z",
  "requestType": "plan_rozwodu | wycena | mediacja | duo | konsultacja | materialy | summary_marketing | material",
  "contact": { "email": "...", "name": "...", "phone": "...", "preferredChannel": "email|phone" },
  "consents": { "delivery": true, "marketingEmail": false, "contactRequest": true, "phoneContact": false, "consentTextVersion": "2026-11-10" },
  "utm": { "utm_source": "google", "utm_campaign": "...", "gclid": "..." }
}
```

Nagłówki: `X-NE-Timestamp`, `X-NE-Signature: sha256=HMAC_SHA256(secret, "<timestamp>.<body>")`, `X-NE-Lead-Id`. Odbiorca powinien weryfikować podpis i odrzucać żądania starsze niż 5 minut. Przykład weryfikacji (Node):

```js
const expected = "sha256=" + crypto.createHmac("sha256", SECRET).update(`${ts}.${rawBody}`).digest("hex");
crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader));
```

Kiedy zgłoszenie trafia do CRM:

| Akcja użytkownika | E-mail | CRM |
|---|---|---|
| Tylko korzysta z narzędzia | — | — |
| „Wyślij mi podsumowanie” (bez zgody marketingowej) | jednorazowa wysyłka | **nie** |
| j.w. + zgoda marketingowa | wysyłka | tak: kontakt + zgody (bez treści wyniku) |
| Formularz kontaktowy (Plan Rozwodu, wycena…) | potwierdzenie | tak |

Do CRM **nigdy** nie trafiają odpowiedzi z narzędzi, kwoty, informacje o dzieciach ani opis relacji. Gdy formularz kontaktowy nie może trafić ani do CRM, ani na `LEADS_NOTIFY_EMAIL`, API zwraca błąd 503 zamiast udawać przyjęcie zgłoszenia.

Pomiar „aż do sprzedaży”: każde zgłoszenie ma `id`, `sourceId` (narzędzie/materiał) i UTM/gclid. Status sprzedaży aktualizujcie w CRM, a konwersje offline importujcie do Google Ads/Meta **zgodnie z ich zasadami dla kategorii wrażliwych** (zob. `MARKETING/ADS.md`).

### Analityka (opcjonalnie)

`NEXT_PUBLIC_GTM_ID` włącza baner zgody; GTM ładuje się dopiero po kliknięciu „Zgadzam się”. Do `dataLayer` trafiają tylko zdarzenia z allowlisty (`ne_tool_start`, `ne_tool_step`, `ne_tool_complete`, `ne_result_print`, `ne_result_download`, `ne_email_request`, `ne_lead_submit`, `ne_offer_click`, `ne_material_open`, `ne_quick_exit`…) z parametrami `tool`, `step`, `offer`, `material`. **Nie twórzcie w GTM list remarketingowych na podstawie tych zdarzeń** — temat rozstania to kategoria wrażliwa.

## Prywatność i bezpieczeństwo — co jest zaimplementowane

- Obliczenia w przeglądarce, brak zapisu odpowiedzi na serwerze; brak danych w URL.
- Brak automatycznego zapisu w localStorage; „Pierwsze 30 dni” zapisuje plan tylko po świadomym kliknięciu, z ostrzeżeniem o wspólnych urządzeniach i przyciskiem usuwania.
- „Wyczyść moje odpowiedzi” w każdym narzędziu oraz przycisk „Szybkie wyjście” (czyści sessionStorage i przenosi na neutralną stronę — bez obietnicy czyszczenia historii).
- Odrębne zgody: dostarczenie wyniku / marketing / kontakt handlowy / kontakt telefoniczny.
- Walidacja klient + serwer, honeypot, limit żądań, kontrola `Origin`, limit rozmiaru, brak logowania danych osobowych.
- Nagłówki bezpieczeństwa (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) w `next.config.mjs`.
- Ścieżki mediacyjne: przy sygnale przemocy/zagrożenia narzędzia nie kierują do wspólnych negocjacji i pokazują neutralną informację o pomocy indywidualnej.

## Przed uruchomieniem produkcyjnym — checklista

- [ ] **Akceptacja wszystkich treści i reguł prawnych przez polskiego prawnika rodzinnego** (narzędzia: `src/lib/tools/*.ts`, `src/lib/tools.ts`; materiały: `src/content/materials/*.ts`). Po akceptacji ustaw `legalApproved: true` i datę w `src/lib/site.ts`.
- [ ] Uzupełnienie danych administratora, dostawców i okresów retencji w `/polityka-prywatnosci` (oznaczone „DO UZUPEŁNIENIA”) + przegląd IOD.
- [ ] Potwierdzenie opisów ofert, w tym **DUO**, w `src/lib/offers.ts`.
- [ ] Logo: aplikacja używa wersji „PORADNIA ROZWODOWA” (z dostarczonego PNG: `public/brand/nowy-etap-logo-poradnia*.png`). Dostarczony plik SVG zawiera napis „KANCELARIA ROZWODOWA” — prosimy o wektorową wersję „Poradnia”, aby zastąpić PNG.
- [ ] Konfiguracja Resend + webhook CRM i test end-to-end.
- [ ] Wygenerowanie okładek 3D (`MARKETING/COVERS.md`).
- [ ] Ustawienie `NEXT_PUBLIC_SITE_URL` (canonical, sitemap, OG). Po zmianie treści można odświeżyć grafiki OG: `BASE=http://localhost:3000 node scripts/generate-og.mjs`.
- [ ] Ponowna weryfikacja stanu prawnego (m.in. projekt opieki naprzemiennej UD349, ewentualny nowy projekt rozwodów w USC po wecie z 30.04.2026).

## Testy

- `npm test` — testy jednostkowe logiki narzędzi (scenariusze, kalkulacje, logika bezpieczeństwa).
- `npm run e2e` — test dymny (Playwright) przechodzący przez wszystkie narzędzia na uruchomionym serwerze (`BASE=http://localhost:3000`).
