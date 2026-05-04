# EXTERNAL_ASSETS.md — Café Lou

Alle externen Ressourcen, die beim Seitenaufruf durch Besucher ausgelöst werden könnten.

## Runtime-Requests (Besucher-Browser)

| Ressource | Quelle | Grund | DSGVO-Status |
|---|---|---|---|
| Keine | — | Alle Assets (Fonts, Bilder, JS) self-hosted | ✅ Kein externer Request |

**Ergebnis:** Zero externe Runtime-Requests. Kein Google CDN, kein Analytics, keine Tracking-Pixel.

---

## Build-Time-Downloads (nur Entwickler, einmalig)

| Datei | Quelle | Zweck |
|---|---|---|
| `fonts/playfair-normal-latin.woff2` | fonts.gstatic.com (Google) | Playfair Display – Latein |
| `fonts/playfair-normal-latin-ext.woff2` | fonts.gstatic.com | Playfair Display – Latein-Ext |
| `fonts/playfair-italic-latin.woff2` | fonts.gstatic.com | Playfair Display Italic – Latein |
| `fonts/playfair-italic-latin-ext.woff2` | fonts.gstatic.com | Playfair Display Italic – Latein-Ext |
| `fonts/dm-sans-latin.woff2` | fonts.gstatic.com | DM Sans – Latein |
| `fonts/dm-sans-latin-ext.woff2` | fonts.gstatic.com | DM Sans – Latein-Ext |

Fonts wurden einmalig per `curl` heruntergeladen und liegen self-hosted in `fonts/`.
Keine Besucher-IP wird an Google übermittelt.

---

## Fotos

| Datei | Quelle | Attribution |
|---|---|---|
| `reference/cake.jpg` | Café Lou Hamburg (Instagram) | © Café Lou Hamburg |
| `reference/Cafebecher.jpg` | Café Lou Hamburg (Instagram) | © Café Lou Hamburg |
| `reference/logo.png` | Café Lou Hamburg | © Café Lou Hamburg |
| `assets/img/hero.png` | Café Lou Hamburg | © Café Lou Hamburg |

---

## Externe Links (kein Request beim Laden, nur bei Klick)

| Link | Ziel | Grund |
|---|---|---|
| Instagram-Links | instagram.com/cafelou.hamburg | Social Media Profil |
