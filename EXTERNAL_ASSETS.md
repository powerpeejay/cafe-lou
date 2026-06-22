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

<!-- PEXELS-ATTRIBUTION-START -->
## Pexels-Attribution

Self-hosted Photos in `assets/img/` — DSGVO-clean (kein CDN-Embed). Lizenz: Pexels License (frei kommerziell, Attribution requested).

- "Kostenloses Stock Foto zu blaubeeren, chia pudding, chia samen" — Foto: [AI25.Studio  Studio](https://www.pexels.com/de-de/@ai25studioai) auf [Pexels](https://www.pexels.com/de-de/foto/loffel-blaubeeren-dessert-nachspeise-4397288/)
- "Kostenloses Stock Foto zu ausgewogene ernährung, ballaststoffreich, buntes dessert" — Foto: [Alexey Demidov](https://www.pexels.com/de-de/@alexeydemidov) auf [Pexels](https://www.pexels.com/de-de/foto/lebensmittel-essen-schussel-snack-9550976/)
- "Kostenloses Stock Foto zu ahornsirup, amerikanisches frühstück, backen" — Foto: [Rain Russell](https://www.pexels.com/de-de/@bumuhoska) auf [Pexels](https://www.pexels.com/de-de/foto/lebensmittel-essen-stapel-fruhstuck-9572745/)
- "Pfannkuchen Mit Erdbeere, Blaubeeren Und Ahornsirup" — Foto: [Sydney Troxell](https://www.pexels.com/de-de/@sydney-troxell-223521) auf [Pexels](https://www.pexels.com/de-de/foto/pfannkuchen-mit-erdbeere-blaubeeren-und-ahornsirup-718739/)
- "Atemberaubende Felsformationen und gewaltige Wellen an Punakaiki, der Westküste Neuseelands." — Foto: [Dirk Pothen](https://www.pexels.com/de-de/@dirk-pothen-2149332904) auf [Pexels](https://www.pexels.com/de-de/foto/37212678/)
- "Leckere Schokoladenpfannkuchen mit Erdbeeren, Bananen und Kokosflocken garniert, perfekt für ein süßes Frühstück." — Foto: [Gamze Nur](https://www.pexels.com/de-de/@gamzenurcolakerol) auf [Pexels](https://www.pexels.com/de-de/foto/leckere-schoko-pfannkuchen-mit-beeren-und-banane-30882594/)
- "Bunte Bio-Tomaten auf einem Bauernmarkt in Elk Grove, Kalifornien." — Foto: [D Goug](https://www.pexels.com/de-de/@d-goug-211350543) auf [Pexels](https://www.pexels.com/de-de/foto/frische-bio-tomaten-auf-dem-elk-grove-market-32667567/)
- "Draufsicht auf eine reichhaltige Tomatensuppe mit Croutons in einer doppelten schwarzen Schüssel." — Foto: [Adriano Bragi](https://www.pexels.com/de-de/@adriano-bragi-1288014591) auf [Pexels](https://www.pexels.com/de-de/foto/31779543/)
- "Frische Karotten Auf Dem Display Auf Dem Bauernmarkt" — Foto: [Christian Schröter](https://www.pexels.com/de-de/@christian-schroter-563569351) auf [Pexels](https://www.pexels.com/de-de/foto/frische-karotten-auf-dem-display-auf-dem-bauernmarkt-28545199/)
- "Kostenloses Stock Foto zu appetitlich, aufsicht, blume" — Foto: [cottonbro studio](https://www.pexels.com/de-de/@cottonbro) auf [Pexels](https://www.pexels.com/de-de/foto/lebensmittel-essen-hand-loffel-6853454/)
- "Zwei Ziegen mit Glocken grasen im Sommer auf den grünen Wiesen Bayerns." — Foto: [Studio Lichtfang](https://www.pexels.com/de-de/@studio-lichtfang-2152913672) auf [Pexels](https://www.pexels.com/de-de/foto/zwei-ziegen-grasen-auf-bayerns-saftigen-wiesen-32488124/)
- "Kostenloses Stock Foto zu abendessen, antioxidantien, appetizer" — Foto: [ROMAN ODINTSOV](https://www.pexels.com/de-de/@roman-odintsov) auf [Pexels](https://www.pexels.com/de-de/foto/nahrhaft-gesundes-essen-wasser-im-munde-gemusesalat-4869356/)
- "Kostenloses Stock Foto zu appetitlich, appetizer, blätterteig" — Foto: [Elsa silva](https://www.pexels.com/de-de/@seizoenenblog) auf [Pexels](https://www.pexels.com/de-de/foto/36740665/)
- "Frisch gebackener Flammkuchen mit einer Auswahl an Gourmet-Belägen auf einem Backblech." — Foto: [Elsa silva](https://www.pexels.com/de-de/@seizoenenblog) auf [Pexels](https://www.pexels.com/de-de/foto/kostlicher-hausgemachter-flammkuchen-mit-verschiedenen-toppings-35583100/)
- "Kostenloses Stock Foto zu appetizer, auswahl, brotscheiben" — Foto: [Gonzalo Acuña](https://www.pexels.com/de-de/@gonzalo-acuna-166058093) auf [Pexels](https://www.pexels.com/de-de/foto/brot-lebensmittel-essen-gemuse-12664793/)
- "Kostenloses Stock Foto zu appetit, appetitlich, aufsicht" — Foto: [ROMAN ODINTSOV](https://www.pexels.com/de-de/@roman-odintsov) auf [Pexels](https://www.pexels.com/de-de/foto/lebensmittel-essen-kostlich-lecker-5150307/)
- "Kostenloses Stock Foto zu barista, blue cup, café" — Foto: [Pixabay](https://www.pexels.com/de-de/@pixabay) auf [Pexels](https://www.pexels.com/de-de/foto/459489/)
- "Blaue Keramik Kaffeetasse Auf Untertasse" — Foto: [Pixabay](https://www.pexels.com/de-de/@pixabay) auf [Pexels](https://www.pexels.com/de-de/foto/blaue-keramik-kaffeetasse-auf-untertasse-459306/)
- "Kostenloses Stock Foto zu braun, Café-Stil, cremig" — Foto: [Dennis Roubos](https://www.pexels.com/de-de/@dennis-roubos-20193918) auf [Pexels](https://www.pexels.com/de-de/foto/kaffee-espresso-latte-schaum-6638846/)
- "Selektiver Fokus Fotografie Von Kaffee Latte" — Foto: [Pixabay](https://www.pexels.com/de-de/@pixabay) auf [Pexels](https://www.pexels.com/de-de/foto/selektiver-fokus-fotografie-von-kaffee-latte-531761/)
- "Eine frische, dampfende Tasse Kaffee, serviert in einer blauen Tasse auf einem rustikalen Holztisch im Freien." — Foto: [Sóc Năng Động](https://www.pexels.com/de-de/@soc-nang-d-ng-2150345854) auf [Pexels](https://www.pexels.com/de-de/foto/blaue-tasse-heissen-kaffee-auf-holztisch-33668755/)
- "Ein blauer Chill Garden-Becher mit Strohhalmen auf einem sonnenbeschienenen Tisch, lebendiger Bokeh-Hintergrund." — Foto: [🇻🇳🇻🇳Nguyễn Tiến Thịnh 🇻🇳🇻🇳](https://www.pexels.com/de-de/@nguy-n-ti-n-th-nh-2150376175) auf [Pexels](https://www.pexels.com/de-de/foto/chillige-gartenkaffeetasse-auf-einem-sonnigen-tisch-31317337/)
- "Kostenloses Stock Foto zu #indoor, aufsicht, becher" — Foto: [Laura Cleffmann](https://www.pexels.com/de-de/@cloudett) auf [Pexels](https://www.pexels.com/de-de/foto/kaffee-tasse-becher-getrank-21572307/)
- "Eiskaffee mit Bon Appétit-Etikett auf einem Holztablett, umgeben von Grünpflanzen." — Foto: [Sóc Năng Động](https://www.pexels.com/de-de/@soc-nang-d-ng-2150345854) auf [Pexels](https://www.pexels.com/de-de/foto/erfrischender-eiskaffee-mit-bon-appetit-label-36433599/)
- "Kostenloses Stock Foto zu aromatisch, barista, begrüßungsgetränk" — Foto: [Fariborz MP](https://www.pexels.com/de-de/@fariborzart) auf [Pexels](https://www.pexels.com/de-de/foto/koffein-kaffee-latte-heisses-getrank-9445959/)
- "Nahaufnahmefoto Des Mannes, Der Milch In Kaffee Gießt" — Foto: [Viktoria Alipatova](https://www.pexels.com/de-de/@viktoria-alipatova-1083711) auf [Pexels](https://www.pexels.com/de-de/foto/nahaufnahmefoto-des-mannes-der-milch-in-kaffee-giesst-2074127/)
- "Kostenloses Stock Foto zu accessoire, balance, bangladesch" — Foto: [Mumtahina Tanni](https://www.pexels.com/de-de/@mumtahina-tanni-1080117) auf [Pexels](https://www.pexels.com/de-de/foto/heisses-getrank-tasse-tee-glasartikel-nahansicht-6752755/)
- "Fotografie Der Blauen Keramischen Kaffeetasse" — Foto: [Lisa from Pexels](https://www.pexels.com/de-de/@fotios-photos) auf [Pexels](https://www.pexels.com/de-de/foto/fotografie-der-blauen-keramischen-kaffeetasse-734983/)
<!-- PEXELS-ATTRIBUTION-END -->
