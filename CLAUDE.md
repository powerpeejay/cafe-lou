# CLAUDE.md — Café Lou Website

## Projekt-Kontext

**Client:** Café Lou — Neighborhood Café, Hamburg-Meiendorf
**Stack:** Plain HTML / CSS / JS — kein Framework, kein Tailwind, kein Build-Step
**Seiten:** `index.html` (Single Page) · `impressum.html` · `datenschutz.html`
**Ziel:** Mehr Gäste durch die Tür. Drei Fragen beantworten: Was gibt's? Wann auf? Wo genau?

---

## Always Do First

- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.
- **Read `DESIGN.md`** for the full token system (colors, typography, spacing, components) before touching CSS.

---

## Brand & Design-System

### Farbtokens (aus DESIGN.md — immer diese verwenden, nie erfinden)

| Token | Wert | Verwendung |
|---|---|---|
| `--sage` | `#899D7A` | Primary — Buttons, Ticker, Akzente |
| `--sage-dark` / `nachtwald` | `#2F4A34` | Dark surfaces, Kontakt-Section |
| `--sage-light` | `oklch(74% 0.06 145)` | Hover-States |
| `--sage-pale` / `zartgruen` | `oklch(92% 0.04 145)` | Hintergründe, Cards |
| `--color-bg-soft` / `salbeiweiss` | `#EEF6E8` | Page-Background-Variante |
| `hamburger-morgenlicht` | `oklch(97% 0.014 88)` | Page-Background (Creme-Weiß) |
| `hamburger-linnen` | `oklch(93% 0.016 88)` | Sections |
| `espressobohne` | `oklch(28% 0.04 145)` | Headlines auf hellem BG |

### Typografie

| Rolle | Font | Größe | Gewicht |
|---|---|---|---|
| Display / Headings | Playfair Display (self-hosted) | clamp(38px, 4vw, 58px) | 400 |
| Body | DM Sans (self-hosted) | 16px min | 300 |
| Labels / Caps | DM Sans | 10px | 500, tracking 0.22em |

**Fonts sind lokal in `fonts/` — niemals Google Fonts CDN einbinden (DSGVO-Verstoß).**

### Spacing-Tokens

`xs=16px · sm=24px · md=48px · lg=80px · xl=120px`

---

## Mandatory Checks (Before Every Push)

### SEO Check

- `<html lang="de">` ✓
- `<meta charset="UTF-8">` ✓
- `<meta name="viewport" content="width=device-width, initial-scale=1">` ✓
- `<title>` Muster: `Café Lou – [Keyword] in Hamburg-Meiendorf` (50–60 Zeichen)
- `<meta name="description">` mit Öffnungszeiten oder CTA (120–155 Zeichen)
- `<link rel="canonical">` auf korrekte URL (Produktions-Domain)
- Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Genau ein `<h1>` pro Seite, keine Heading-Ebene überspringen
- Alle `<img>` haben beschreibendes `alt` (nie leer, nie "image")
- Semantisches HTML: `<header>` `<nav>` `<main>` `<section>` `<footer>`
- `robots.txt` und `sitemap.xml` im Root vorhanden ✓
- Below-fold-Bilder: `loading="lazy"`
- Keine render-blockierenden Ressourcen

### GEO / Local SEO Check

**JSON-LD auf jeder Seite** — Schema-Typ `CafeOrCoffeeShop`:

```json
{
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": "Café Lou",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Saseler Str. 1 / Ecke Meiendorfer Str. 93",
    "addressLocality": "Hamburg",
    "addressRegion": "HH",
    "postalCode": "22145",
    "addressCountry": "DE"
  },
  "telephone": "+494032848308",
  "openingHours": ["Mo 09:00-17:00","We-Sa 09:00-17:00","Su 09:30-17:00"],
  "servesCuisine": ["Frühstück", "Mittagessen", "Kaffee"],
  "priceRange": "€",
  "sameAs": ["https://www.instagram.com/cafelou.hamburg"]
}
```

**NAP — muss exakt übereinstimmen auf index.html, impressum.html, datenschutz.html:**
- Name: `Café Lou`
- Adresse: `Saseler Str. 1, Ecke Meiendorfer Str. 93, 22145 Hamburg` (wie Google Business Profile)
- Telefon: Anzeige `040 32848308`, Link `tel:+494032848308` (wie Google Business Profile)
- Öffnungszeiten: Mo, Mi–Sa 9–17 Uhr · So 9:30–17 Uhr · Di geschlossen

**Lokale Keywords natürlich einbauen:** Meiendorf · Hamburg-Meiendorf · Hamburger Osten · Café in der Nähe · Frühstück Hamburg · Kaffee Meiendorf

**GEO-Textstrategie:**
- Erste 2–3 Sätze pro Abschnitt beantworten konkret: Was, Wo, Wann
- Faktische Aussagen statt Marketing-Fluff ("Frisch gebacken, jeden Morgen" > "Beste Qualität")
- FAQPage JSON-LD für FAQ-Bereiche (Öffnungszeiten, Parken, Reservierung)

### Mobile Check

- Test bei 375px und 390px — kein horizontaler Scroll, kein Overflow
- Touch Targets ≥ 44×44px (Buttons, Nav, Links)
- Body-Font ≥ 16px (verhindert iOS-Auto-Zoom bei Input-Fokus)
- Alle Bilder und Media skalieren fluid — keine fixen Breiten
- Kontrast auf Sage-Hintergründen prüfen: Sage-on-Cream und Cream-on-Sage-Dark (WCAG AA)
- Scroll-Reveal respektiert `prefers-reduced-motion` — kein Animation-Flash

### DSGVO / GDPR Check

**Zero externe Runtime-Requests** — keine CDN-Fonts, kein Analytics, kein Tracking-Pixel.
Vor jedem Push prüfen: Browser-DevTools → Network → Reload → 0 externe Requests.

**Seiten-Existenz:**
- `impressum.html` und `datenschutz.html` vorhanden ✓
- Beide in Footer und Navigation verlinkt
- Von jeder Seite in einem Klick erreichbar

**Impressum (§ 5 TMG) — muss enthalten:**
- Vollständiger Name des Betreibers und Anschrift
- Straßenadresse: Meiendorfer Str. 93, 22145 Hamburg
- E-Mail und Telefon
- Verantwortliche Person
- Hinweis auf Kleinunternehmerregelung (§ 19 UStG) falls zutreffend
- EU-Streitschlichtungshinweis

**Datenschutz — muss enthalten:**
- Verantwortliche Stelle
- Welche Daten werden erhoben (Server-Logs, Kontaktformular)
- Rechtsgrundlage (Art. 6 DSGVO)
- Keine Cookies / kein Tracking — explizit so angeben
- Betroffenenrechte (Art. 15–21 DSGVO)
- Externe Ressourcen: **keine** — self-hosted Fonts, keine CDNs (→ `EXTERNAL_ASSETS.md`)
- SSL/TLS-Hinweis
- Aufsichtsbehörde: Hamburgischer Beauftragter für Datenschutz und Informationsfreiheit (HmbBfDI), Hamburg
- Stand-Datum

---

## Screenshot Workflow

- **Immer vom localhost screenshotten** — niemals `file:///` URL
- Server starten: `node serve.mjs` (Root auf `http://localhost:3000`)
- Screenshot: `node screenshot.mjs http://localhost:3000`
- Gespeichert in `./screenshots/screenshot-N.png`
- PNG mit Read-Tool lesen und visuell analysieren
- Mindestens 2 Vergleichsrunden: erst 375px, dann 1280px
- Konkret beschreiben: "Heading ist 32px, Referenz zeigt 24px" — keine vagen Kommentare

---

## Output-Regeln

- **Kein Tailwind, kein Framework** — plain CSS mit Custom Properties aus `DESIGN.md`
- **Kein CDN für Fonts** — `fonts/playfair-*.woff2` und `fonts/dm-sans-*.woff2` bereits vorhanden
- **Kein `transition-all`** — nur `transform` und `opacity` animieren
- Platzhalter-Bilder (`placehold.co`) nur wenn kein echtes Asset verfügbar — `assets/img/` zuerst prüfen
- `index.html` bleibt Single File mit Inline-Styles, sofern nicht anders vereinbart

---

## Anti-Generic Guardrails

- **Niemals** Default-Grüntöne (Tailwind `green-500` etc.) — immer `--sage` und Ableitungen
- **Kein** generisches Café-Klischee: kein Chalkboard-Font, kein Jute-Texture-Overkill
- **Keine** symmetrischen Card-Grids, Gradient-Headings oder Hero-Metriken
- **Schatten:** farbtönend und mehrlagig, nicht flat `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`
- **Animationen:** Spring-Easing, respektiert `prefers-reduced-motion`
- **Hover/Focus/Active** auf jedem interaktiven Element — kein Ausnahme
- **Bilder:** Gradient-Overlay `linear-gradient(to top, rgba(47,74,52,0.6), transparent)` für Tiefe
- **Sprache:** Nachbar-Ton, nicht Werbetext. Konkret und sensorisch, nie abstrakt

---

## Git Workflow

1. `node serve.mjs` starten
2. `node screenshot.mjs http://localhost:3000` — visuell prüfen
3. Mobile (375px) und Desktop (1280px) vergleichen
4. Erst nach bestandenem visuellem Check committen und pushen

---

## Hard Rules

- Niemals Google Fonts CDN — alle Fonts sind self-hosted in `fonts/`
- Niemals externe JS-Libraries ohne explizite Freigabe
- `prefers-reduced-motion` immer berücksichtigen
- Kein `transition-all`
- NAP (Name, Adresse, Telefon) auf allen Seiten identisch halten
- Impressum und Datenschutz müssen jederzeit erreichbar sein

---

## Demo-Status

Die Seite ist noch eine Demo: `index.html` hat `<meta name="robots" content="noindex, nofollow">`. **Vor dem Livegang auf `index, follow` zurückstellen**, sonst wird die Seite nicht indexiert. `robots.txt` bleibt bewusst auf `Allow: /`, damit Google das noindex überhaupt lesen kann.
