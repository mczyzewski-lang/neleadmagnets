# Okładki 3D — prompty do OpenAI Images

Dla każdego z 10 materiałów poniżej jest gotowy prompt (EN) do wygenerowania okładki 3D (np. `gpt-image-1`, 1024×1024, tło jasne).

**Jak podpiąć grafikę:**
1. Wygeneruj obraz i zapisz jako `public/covers/<slug>.webp` (zalecane 1200×1200, WebP, < 150 KB).
2. W `src/content/covers.ts` dodaj wpis `"<slug>": "/covers/<slug>.webp"`.
3. Strona materiału, karta na /narzedzia i /materialy oraz Open Graph automatycznie użyją nowej okładki (do tego czasu wyświetla się makieta CSS i `public/covers/<slug>-placeholder.png`).

**Wskazówki:** sprawdź poprawność polskich znaków (ą, ę, ś, ł, ż, ź, ć, ń, ó) — modele obrazów potrafią je zniekształcać. W razie problemów wygeneruj okładkę bez tekstu i dodaj tytuł w Figmie/Canvie fontem zbliżonym do logo (np. Oswald) + Inter.

Przykładowe wywołanie API:

```bash
curl https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" -H "Content-Type: application/json" \
  -d '{"model":"gpt-image-1","size":"1024x1024","prompt":"<PROMPT>"}'
```

## Bezpieczeństwo cyfrowe i finansowe — `bezpieczenstwo-cyfrowe-i-finansowe`

- Format: Przewodnik
- Podtytuł: Spokojny przewodnik na czas rozstania
- Ton okładki: green

```text
Photorealistic 3D render of a standing hardcover book at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. Deep green (#295550) cover with dark green (#263D3A) spine and refined gold (#C79B59) accents. Minimalist premium typography. Small wordmark text at the top: "NOWY ETAP · PORADNIA ROZWODOWA". Exact cover title: "Bezpieczeństwo cyfrowe i finansowe". Exact subtitle: "Spokojny przewodnik na czas rozstania". Small label "PRZEWODNIK". A subtle thin gold staircase line motif, optionally combined with a minimal gold keyhole outline. No gavels, no paragraph symbols, no people, no wedding rings, no padlock clipart. Square 1:1 composition, high detail, keep text minimal and exactly as written.
```

## Checklista dokumentów do rozwodu — `checklista-dokumentow`

- Format: Checklista
- Podtytuł: Rozwód · dzieci · majątek · kredyt
- Ton okładki: gold

```text
Photorealistic 3D render of a standing spiral-bound checklist booklet at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is warm gold (#C79B59) with deep green (#295550) typography and a thin dark green (#263D3A) border. Minimalist premium typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top "NOWY ETAP · PORADNIA ROZWODOWA"; main title "Checklista dokumentów do rozwodu"; subtitle "Rozwód · dzieci · majątek · kredyt". A subtle thin staircase line motif (a stylised ascending step line) in deep green near the bottom, with three small elegant check marks. No gavels, no paragraph symbols, no people, no wedding rings, no other text. Square 1:1 composition, high detail, elegant studio lighting.
```

## Inwentaryzacja majątku i długów — `inwentaryzacja-majatku`

- Format: Arkusz
- Podtytuł: Arkusz do podziału majątku po rozstaniu
- Ton okładki: green

```text
Photorealistic 3D render of a standing A4 spiral-bound worksheet planner at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is deep green (#295550) with a dark green (#263D3A) frame and gold (#C79B59) typography and fine ruled-line details suggesting a ledger. Minimalist premium typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top "NOWY ETAP · PORADNIA ROZWODOWA"; main title "Inwentaryzacja majątku i długów"; subtitle "Arkusz do podziału majątku po rozstaniu". A subtle thin gold staircase line motif (a stylised ascending step line) near the bottom. No gavels, no paragraph symbols, no people, no money bills, no house icons, no wedding rings, no other text. Square 1:1 composition, high detail, elegant studio lighting.
```

## Jak powiedzieć dzieciom o rozstaniu — `jak-powiedziec-dzieciom`

- Format: Przewodnik
- Podtytuł: Rozmowa dopasowana do wieku dziecka
- Ton okładki: cream

```text
Photorealistic 3D render of a single standing softcover booklet at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is a light warm cream tone with a deep green (#295550) title, a dark green (#263D3A) spine and delicate gold (#C79B59) accents. Minimalist premium, gentle and calm typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top "NOWY ETAP · PORADNIA ROZWODOWA"; main title "Jak powiedzieć dzieciom o rozstaniu"; subtitle "Rozmowa dopasowana do wieku dziecka". A subtle thin gold staircase line motif (a stylised ascending step line) at the bottom of the cover. No gavels, no paragraph symbols, no people, no children, no wedding rings, no other text. Square 1:1 composition, high detail, soft studio lighting.
```

## Rzeczowe wiadomości — `komunikacja-z-drugim-rodzicem`

- Format: Zestaw szablonów
- Podtytuł: Szablony do drugiego rodzica
- Ton okładki: cream

```text
Photorealistic 3D render of a neat set of premium cards in a slim open box, the front card standing upright at a slight angle, on a warm off-white (#FCF9F8) background with a soft natural shadow. Cards in cream with deep green (#295550) and dark green (#263D3A) typography and fine gold (#C79B59) accents. Minimalist premium typography. Small wordmark text at the top of the front card: "NOWY ETAP · PORADNIA ROZWODOWA". Exact title: "Rzeczowe wiadomości". Exact subtitle: "Szablony do drugiego rodzica". Small label "ZESTAW SZABLONÓW". A subtle thin gold staircase line motif. No gavels, no paragraph symbols, no people, no wedding rings, no speech-bubble clipart. Square 1:1 composition, high detail, keep text minimal and exactly as written.
```

## Pierwsze święta po rozstaniu — `pierwsze-swieta-po-rozstaniu`

- Format: Planer
- Podtytuł: Planer dla rodziców
- Ton okładki: gold

```text
Photorealistic 3D render of a standing spiral-bound planner at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. Cover in warm gold (#C79B59) tones with deep green (#295550) typography and a dark green (#263D3A) band. Minimalist premium typography. Small wordmark text at the top: "NOWY ETAP · PORADNIA ROZWODOWA". Exact cover title: "Pierwsze święta po rozstaniu". Exact subtitle: "Planer dla rodziców". Small label "PLANER". A subtle thin staircase line motif in dark green with a single tiny gold star at its top step, evoking a calm winter season. No gavels, no paragraph symbols, no people, no wedding rings, no Santa or cartoon decorations. Square 1:1 composition, high detail, keep text minimal and exactly as written.
```

## Pierwsza konsultacja — `przygotowanie-do-konsultacji`

- Format: Checklista
- Podtytuł: Jak się przygotować do rozmowy z prawnikiem lub mediatorem
- Ton okładki: green

```text
Photorealistic 3D render of a standing hardcover booklet at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. Deep green (#295550) cover with dark green (#263D3A) details and fine gold (#C79B59) accents, including a few minimal gold checkbox marks. Minimalist premium typography. Small wordmark text at the top: "NOWY ETAP · PORADNIA ROZWODOWA". Exact cover title: "Pierwsza konsultacja". Exact subtitle: "Jak się przygotować do rozmowy z prawnikiem lub mediatorem". Small label "CHECKLISTA". A subtle thin gold staircase line motif. No gavels, no paragraph symbols, no scales of justice, no people, no wedding rings. Square 1:1 composition, high detail, keep text minimal and exactly as written.
```

## Przygotowanie do mediacji — `przygotowanie-do-mediacji`

- Format: Zeszyt ćwiczeń
- Podtytuł: Zeszyt ćwiczeń przed pierwszym spotkaniem
- Ton okładki: dark

```text
Photorealistic 3D render of a standing spiral-bound workbook at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is dark green (#263D3A) with a deep green (#295550) inner panel and gold (#C79B59) typography and accents. Minimalist premium typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top "NOWY ETAP · PORADNIA ROZWODOWA"; main title "Przygotowanie do mediacji"; subtitle "Zeszyt ćwiczeń przed pierwszym spotkaniem". A subtle thin gold staircase line motif (a stylised ascending step line) across the lower third. No gavels, no paragraph symbols, no people, no handshakes, no wedding rings, no other text. Square 1:1 composition, high detail, elegant studio lighting.
```

## Kredyt po rozstaniu — `rozmowa-z-bankiem`

- Format: Skrypt rozmowy
- Podtytuł: Jak przygotować rozmowę z bankiem
- Ton okładki: dark

```text
Photorealistic 3D render of a standing hardcover booklet at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is dark green (#263D3A) with deep green (#295550) panel and fine gold (#C79B59) accents. Minimalist premium typography. Small wordmark text at the top: "NOWY ETAP · PORADNIA ROZWODOWA". Exact cover title: "Kredyt po rozstaniu". Exact subtitle: "Jak przygotować rozmowę z bankiem". Small label "SKRYPT ROZMOWY". A subtle thin gold staircase line motif rising across the lower part of the cover. No gavels, no paragraph symbols, no people, no wedding rings, no house icons with hearts. Square 1:1 composition, high detail, keep text minimal and exactly as written.
```

## Rozwód w Polsce krok po kroku — `rozwod-krok-po-kroku`

- Format: Przewodnik
- Podtytuł: Od decyzji do życia po wyroku
- Ton okładki: green

```text
Photorealistic 3D render of a single standing hardcover book at a slight angle on a warm off-white (#FCF9F8) background with a soft natural shadow. The cover is deep green (#295550) with a slightly darker green (#263D3A) spine and subtle gold (#C79B59) accents. Minimalist premium typography. Render this exact text, spelled exactly, and keep all text minimal: small wordmark at the top "NOWY ETAP · PORADNIA ROZWODOWA"; main title "Rozwód w Polsce krok po kroku"; subtitle "Od decyzji do życia po wyroku". A subtle thin gold staircase line motif (a stylised ascending step line) across the lower part of the cover. No gavels, no paragraph symbols, no people, no wedding rings, no other text. Square 1:1 composition, high detail, elegant studio lighting.
```

