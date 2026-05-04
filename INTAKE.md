# INTAKE.md — Café Lou

**Datum:** 2026-05-04  
**Phase:** 0 — Discovery abgeschlossen

---

## Client-Profil

| Feld | Wert |
|---|---|
| **Name** | Café Lou |
| **Typ** | Café / Bistro — Neighborhood Spot |
| **Adresse** | Saseler Str. 1 Ecke, Meiendorfer Str. 93, 22145 Hamburg |
| **Stadtteil** | Meiendorf (Hamburger Osten) |
| **Angebot** | Coffee · Breakfast · Lunch |
| **Zielgruppe** | Gesamte Nachbarschaft — Jung & Alt, Locals |
| **Primary Goal** | Angebot (Menü) und Öffnungszeiten checken |
| **Sprache** | Deutsch |
| **Scope** | 1 Page (Single-Page), sofort |

---

## Brand-Inventar

**Was vorhanden ist:**
- `logo.png` — Typografisches Wortmarken-Logo: handgeschriebenes "Lou" mit "CAFÉ" in Kapitälchen, Subline "coffee · breakfast · lunch". **Markenfarbe: Sage Green** (exakt der `--sage` aus der Palette). Sehr charaktervoll — die Typografie muss die gleiche Energie spiegeln.
- `Cafebecher.jpg` — Instagram-Story: zwei Take-away-Becher mit Logo vor Kreidetafel-Karte. Bestätigt Sage Green + Creme als Kernpalette. Chalkboard-Speisekarte im Hintergrund sichtbar.
- `cake.jpg` — Interieur-Shot: helle, luftige Atmosphäre. Weiße/creme Stühle, Holztisch, grüner Rosmarintopf (Sage!), Lotus-Cake. Tageslichtfenster. **Café-Stimmung ist klar: frisch, hell, einladend, entspannt.**
- `cafe_lou.jpg` — Logo-Variante (kleineres Format, gleiche Marke)

**Was fehlt:**
- Kein Interieur-Hero-Shot (noch keine Tischaufnahmen)
- Keine Menükarte (Preise, Produkte unbekannt)
- Keine Öffnungszeiten bestätigt (index.html hat Platzhalter: Mo–Fr 7:00–15:00 / Sa–So 8:00–15:00)
- Keine Telefonnummer final bestätigt (index.html: +49 40 32848308)
- Kein Impressum / Datenschutz-Text

---

## Analyse: Vorhandene index.html

Die `reference/index.html` ist eine solide, gut durchdachte Basis. Design-Richtung und Palette sind korrekt.

### Was gut funktioniert — beibehalten
- **Split-Hero** (Sage-Left / Image-Right): auffällig, passt zum Markencharakter
- **Farbpalette** (`--sage`, `--cream`, `--espresso`): exakt aus dem Logo abgeleitet
- **Playfair Display + DM Sans**: gutes Pairing — Playfair bringt editoriales Gewicht, DM Sans hält es modern
- **Specials-Ticker**: energetisch, kein Klick nötig — ideal für Primary Goal "Angebot checken"
- **Menü-Tabs** (Frühstück / Lunch / Gebäck / Kaffee): sauber, funktional
- **Scroll-Reveal**: dezent, nicht übertrieben
- **Kontakt-Section** (dark sage): starker Abschluss

### Was korrigiert werden muss
| Problem | Priorität |
|---|---|
| Google Fonts CDN (`fonts.googleapis.com`) | **KRITISCH — DSGVO-Verstoß** |
| Sprache: alles Englisch, muss Deutsch | Hoch |
| Währung: `$` statt `€` | Hoch |
| `lang="en"` statt `lang="de"` | Hoch |
| React doppelt eingebunden (Head + Body) | Mittel |
| Adress-Subtext: "Corner of Smith St" (falsch) | Hoch |
| Telefon-Placeholder: `+61 400...` (australisch) | Hoch |
| E-Mail: peter@jacobdigital.de (Demo-Platzhalter) | Hoch |
| Footer: fehlt Impressum + Datenschutz | Hoch |
| Placeholder-Images: Schraffur → echte Fotos | Hoch |
| Fehlender Favicon | Mittel |
| Fehlende SEO-Meta (og:, description, JSON-LD) | Mittel |
| Menü-Inhalte auf Englisch + Preise fictiv | Mittel |
| CTA-Texte auf Englisch | Hoch |

---

## Direction Matrix

**Typ:** Café / Bakery / Bistro  
**Primär:** `warm-organic` ✓ (bereits in index.html korrekt umgesetzt)  
**Sekundär:** `editorial-magazine` (Ansatz der Foto-Grid-Layouts bestätigt das)  
**Verboten:** brutalist, neon, dark-mode-default — alle korrekt vermieden

**Design-Richtung ist gelockt:** kein Richtungswechsel nötig. Index.html bleibt Basis — wir verfeinern, übersetzen und fixen DSGVO + Assets.

---

## Empfohlene nächste Schritte (Phase 3 direkt, da Design vorliegt)

Da Peter explizit sagt: "nah am vorgegebenen Design bleiben" und ein vollständiges Design-Dokument (index.html) existiert, überbrücken wir Phase 1 + Phase 2 und gehen direkt in Phase 3 mit folgenden Aufgaben:

1. **Google Fonts → self-hosted woff2** (Playfair Display + DM Sans)
2. **Alle Texte → Deutsch** übersetzen
3. **Echte Assets einbinden**: `Cafebecher.jpg` + `cake.jpg` als Hero / Story-Bilder
4. **DSGVO-Footer**: Impressum + Datenschutz
5. **SEO-Meta**: description, og:, LocalBusiness JSON-LD
6. **Favicon**: SVG aus Logo-Farben generieren
7. **Menü-Inhalte**: sinnvolle deutsche Platzhalter (bis echte Karte kommt)
8. **Öffnungszeiten + Kontakt** finalisieren
9. **Deployment-Struktur** gemäß Memory: GitHub `powerpeejay/cafe-lou` → Vercel

---

## Offene Fragen vor Build-Start

1. **Öffnungszeiten** — stimmt Mo–Fr 7:00–15:00 / Sa–So 8:00–15:00?
2. **Telefon** — ist +49 40 32848308 korrekt?
3. **E-Mail** für Buchungsanfragen — welche Adresse soll erscheinen?
4. **Instagram-URL** — für Footer-Link?
5. **Tischreservierung** — Formular beibehalten oder durch "Ruf uns an"-CTA ersetzen?
