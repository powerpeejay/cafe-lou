# System Audit — Café Lou Website Repo

**Datum:** 2026-07-06 · **Auditor:** Claude (Fable 5) · **Scope:** `c:\Users\peter\Desktop\cafe` · Analyse only, nichts verändert.

---

## Executive Summary

**Gesamtnote: B-.** Dies ist ein fokussiertes, gut dokumentiertes Ein-Projekt-Repo (Client-Website Café Lou), kein gemischtes Arbeitsverzeichnis — Layer A (Knowledge-System) existiert nur als Projekt-Doku und ist überdurchschnittlich gut; das Gewicht des Audits liegt auf Layer B. Die Codequalität, DSGVO-Disziplin und Doku sind für einen Solo-Operator stark. Die Note drückt sich, weil das aktive Arbeitsprodukt — der komplette v2-Relaunch — **nur untracked auf dieser einen Maschine existiert**, weil auf der **Live-Seite ein NAP-Bug** steht (angezeigte Telefonnummer ≠ verlinkte Nummer im Impressum), und weil CLAUDE.md in mindestens vier Punkten nachweislich von der Realität abweicht (Analytics, Farbtoken, Adresse, Seitenliste). **Top-3-Risiken:** (1) Datenverlust von v2/ + CLAUDE.md bei Festplattendefekt, (2) falsche Telefonnummer/NAP-Inkonsistenz live in Produktion, (3) Cold-Start unmöglich, weil `package.json` gitignored ist und der dokumentierte Pflicht-Workflow (Screenshots via Playwright) auf frischem Clone nicht läuft. **Top-3-Chancen:** (1) v2 committen und die v1/v2-Duplikate (Bilder, Fonts, Rechtstexte) auf eine Quelle eindampfen, (2) CLAUDE.md einmal gegen die Realität abgleichen und einchecken, (3) die ohnehin exzellente `v2-check.mjs` zum Pflicht-Gate vor jedem Push machen. Kein einziges Secret gefunden — der Pexels-Key läuft sauber über eine Env-Var.

---

## Phase 1 — Repo Map

**Zweck:** Digitales Schaufenster für Café Lou (Hamburg-Meiendorf). Plain HTML/CSS/JS, kein Build-Step. Deployt via GitHub `powerpeejay/cafe-lou` → Vercel (`cafe-lou.vercel.app`). Aktiv: erste Commits 2026-05-04, letzter Commit 2026-07-01, Screenshots vom 2026-07-01 → **aktiv in Arbeit** (v2-Relaunch läuft).

**Layer A (Knowledge & Content):** existiert nur als Projekt-Doku (INTAKE, PRODUCT, DESIGN, EXTERNAL_ASSETS). Kein Vault, keine Transkripte, keine Content-Pipeline. Eine Zeile genügt: Layer A ist klein, aber gut. Audit-Gewicht liegt auf Layer B.

**Layer B (Software):** die Website selbst (v1 im Root, v2 in `v2/`), Dev-Tooling (`serve.mjs`, Screenshot-/Check-Skripte, `fetch-photos.mjs`), Claude-Code-Konfiguration (CLAUDE.md, vendored Impeccable-Skill).

### Top-Level-Inventar

| Eintrag | Klassifikation | Status | Notiz |
|---|---|---|---|
| `index.html` (1814 Zeilen, 71 KB) | Software (v1, live) | aktiv | Single-File mit Inline-CSS/JS, deployt |
| `impressum.html`, `datenschutz.html` | Software (v1, live) | aktiv | enthalten den Telefon-Bug (s. Findings) |
| `v2/` (HTML, CSS, JS, Fonts, 60+ Bilder) | Software (v2, Relaunch) | **aktiv, UNTRACKED** | kompletter Redesign, nirgends gesichert |
| `assets/`, `fonts/`, `favicon.svg`, `robots.txt`, `sitemap.xml` | Software-Assets | aktiv | tracked, deployt |
| `reference/` | Content (Original-Brand-Assets) | ruhend | tracked, aber in `.gitignore` gelistet — Widerspruch |
| `serve.mjs`, `screenshot*.mjs`, `v2-check.mjs`, `v2-shots.mjs` | Dev-Tooling | aktiv | teils tracked, teils ignoriert — inkonsistent |
| `fetch-photos.mjs`, `pexels-config.json` | Dev-Tooling (Build-Time) | ruhend | sauber, Key via Env-Var |
| `tweaks-panel.jsx` | Dev-Tooling | unklar | tracked → deployt, aber von keiner Seite referenziert |
| `CLAUDE.md`, `DESIGN.md`, `PRODUCT.md`, `INTAKE.md`, `EXTERNAL_ASSETS.md` | Config/Doku | aktiv | CLAUDE.md und DESIGN.md/PRODUCT.md untracked bzw. ignoriert |
| `.agents/skills/impeccable/` (~700 KB) | Claude-Code-Config (vendored Skill) | aktiv, lokal | gitignored, nur auf dieser Maschine |
| `.impeccable/` (design.json, Live-Sessions) | Claude-Code-State | aktiv, lokal | gitignored |
| `screenshots/` (42 Dateien, 27,7 MB) | Archiv-Kandidat | wächst unbegrenzt | gitignored, korrekt |
| `node_modules/` (41,7 MB) | generiert | — | gitignored, korrekt |
| `cafeloudigital.png` (1,8 MB, Root) | Archiv-Kandidat | unklar | untracked, loses Binary im Root |
| `assets/Cafe Lou.png`, `assets/IMG_2156.JPG`, `assets/IMG_2157.JPG`, `assets/img/cafelou.png` | Archiv-Kandidaten | unklar | ~3,3 MB untracked, Zweck ungeklärt, Dateiname mit Leerzeichen |
| `package.json`, `package-lock.json` | Config | **gitignored!** | devDeps (playwright, sharp) nicht reproduzierbar |

### Automation-Inventar

**Keine.** Kein Cron, keine Scheduled Tasks im Repo, keine Hooks, kein `.mcp.json`, kein `.claude/`-Verzeichnis im Projekt (verifiziert: `Test-Path .claude` = False). Alle Skripte sind manuell aufgerufene Dev-Tools. Das ist für dieses Projekt angemessen — ein statisches Site-Repo braucht keine Automation. Dimension gesund, keine weiteren Findings.

### Claude-Code-Layer

- **Projekt-CLAUDE.md:** 7,8 KB (~2.000 Tokens always-loaded) — akzeptable Größe, aber inhaltlich gedriftet (s. Findings) und **nicht committet**.
- **Global-CLAUDE.md** (`~/.claude/CLAUDE.md`): ~4,4 KB Projektübersicht — in Ordnung.
- **Vendored Skill** `.agents/skills/impeccable/` (~700 KB inkl. 203 KB `live-browser.js`): kein Kontext-Kostenfaktor (wird on-demand geladen), aber maschinenlokal — bei Maschinenwechsel weg; das Memory `reference-impeccable-live` verweist auf diese Pfade (verifiziert: Pfade existieren aktuell).
- **Memory:** 1 Eintrag, Pfadangaben aktuell korrekt. Gesund.

### Überraschungen

1. Der komplette v2-Relaunch (der eigentliche aktuelle Arbeitsstand) ist untracked.
2. `package.json` steht in `.gitignore` — ungewöhnlich und folgenreich.
3. `reference/` ist gleichzeitig tracked und in `.gitignore` — und die Produktions-JSON-LD verlinkt Bilder daraus.
4. Im Impressum wird eine andere Telefonnummer angezeigt als verlinkt.

---

## Phase 2 — Audit Report

Sortierung: Severity absteigend. Jede Aussage als **Fakt** (verifiziert, zitiert) oder **Einschätzung** markiert.

### 🔴 Critical

**C1 — v2-Relaunch existiert nur auf dieser Maschine** · Fakt
`git status` zeigt `?? v2/` — der gesamte Relaunch (`v2/index.html` 23 KB, `v2/css/style.css` 35 KB, `v2/js/main.js` 10 KB, 60+ optimierte WebP-Bilder, eigene Rechtsseiten) ist untracked. `v2/index.html:9` setzt bereits `canonical` auf `https://cafe-lou.vercel.app/v2/` — die Seite hält sich für live, ist aber nie deployt worden (nicht committet → nicht auf Vercel). **Konsequenz:** Ein Plattendefekt oder ein versehentliches `git clean -fd` löscht Wochen Arbeit ersatzlos. Das ist das mit Abstand größte Risiko im Repo.

**C2 — Falsche/inkonsistente Telefonnummer live im Impressum** · Fakt
`impressum.html:112` (identisch in `v2/impressum.html:112`): `<a href="tel:+494032848308">+49 17620135776</a>` — angezeigt wird eine Mobilnummer, gewählt wird beim Tippen die Festnetznummer. Commit `6d3be7b` („fix: update impressum contact details") hat offenbar nur den Anzeigetext geändert, nicht den `href`. Root-`impressum.html` ist committet und deployt → **der Bug ist live**. Verstößt zusätzlich gegen die NAP-Regel aus CLAUDE.md („Telefon: +49 40 32848308 … auf allen Seiten identisch"); NAP-Inkonsistenz schadet dem Local-SEO-Ranking, und ein Impressum mit widersprüchlichen Kontaktdaten ist ein § 5 TMG-Risiko.

### 🟠 High

**H1 — Cold-Start unmöglich: `package.json` ist gitignored** · Fakt
`.gitignore:14-15` ignoriert `package.json` und `package-lock.json`; `git ls-files` bestätigt: nicht tracked. Die devDependencies (`playwright ^1.59.1`, `sharp ^0.35.3`) sind aber Voraussetzung für den in CLAUDE.md als **verpflichtend** deklarierten Workflow (`node screenshot.mjs`, Git-Workflow Schritt 2) und für `v2-check.mjs`. **Konsequenz:** Auf einer neuen Maschine oder nach einem Clone ist der dokumentierte Pflicht-Workflow nicht ausführbar; niemand außer dieser einen Maschine kann das Projekt betreiben.

**H2 — CLAUDE.md driftet in mindestens 4 Punkten von der Realität ab und ist selbst untracked** · Fakt
1. *Analytics:* CLAUDE.md fordert „Zero externe Runtime-Requests — kein Analytics", aber `index.html:1862` lädt `/_vercel/insights/script.js` (Commit `9494d94` hat das bewusst eingeführt, `datenschutz.html:98-107` deckt es DSGVO-seitig ab). Die Regel ist überholt, nicht der Code.
2. *Farbtoken:* CLAUDE.md-Tabelle sagt `--sage: #899D7A`; tatsächlich definieren alle sechs Stylesheets `--sage: #889B7D` (z. B. `index.html:190`, `v2/css/style.css:74`) — DESIGN.md hat den richtigen Wert. Wer der CLAUDE.md-Tabelle folgt, führt eine falsche Markenfarbe ein.
3. *Adresse:* CLAUDE.md-JSON-LD-Vorlage sagt `"streetAddress": "Meiendorfer Str. 93"`, live steht `"Saseler Str. 1 / Ecke Meiendorfer Str. 93"` (`index.html:48`).
4. *Seitenstruktur:* „Seiten: index.html · impressum.html · datenschutz.html" und „index.html bleibt Single File" — `v2/` mit externem CSS/JS existiert nicht in der Beschreibung.
Zusätzlich: `git status` zeigt `?? CLAUDE.md` — die Projektanweisungen selbst sind nicht gesichert. **Konsequenz:** Jede neue Session arbeitet mit falschen Fakten (falscher Hex-Wert, „kein Analytics") und die Datei geht bei Maschinenverlust verloren.

**H3 — `.gitignore` widerspricht dem Git-Index; Produktion hängt an „ignorierten" Dateien** · Fakt
`.gitignore:16-17` listet `reference/` und `screenshot-*.mjs`, aber `git ls-files` zeigt `reference/*.jpg`, `reference/index.html`, `reference/logo.png` als tracked (vor der Ignore-Regel committet). Gleichzeitig referenziert die Produktions-JSON-LD `reference/cake.jpg` und `reference/Cafebecher.jpg` als Business-Fotos (`index.html:83-84`). **Konsequenz:** Wer „aufräumt, was gitignored ist" (`git rm -r reference/`), zerstört live ausgelieferte Structured-Data-Bilder. Der Ignore-Status lügt über die tatsächliche Rolle des Ordners.

### 🟡 Medium

**M1 — v1/v2-Duplikate: drei Kopien derselben Wahrheit** · Fakt
`v2/assets/img/*.webp` sind byte-identisch mit `assets/img/*.webp` (Hash-verifiziert an `cake-800.webp`), `v2/fonts/` identisch mit `fonts/` (Hash-verifiziert), `v2/impressum.html`/`v2/datenschutz.html` byte-identisch mit den Root-Versionen. **Konsequenz:** Der Telefon-Bug C2 muss jetzt an 2 Stellen gefixt werden; jede künftige Rechtstext- oder Preisänderung muss synchron in v1 und v2 erfolgen und wird es irgendwann nicht — die Kopien driften. ~2 MB redundante Assets sind das kleinere Problem als die doppelte Pflegepflicht.

**M2 — Dev-Tool `tweaks-panel.jsx` wird nach Produktion deployt** · Fakt
`tweaks-panel.jsx` (18 KB) ist tracked (deployt via Vercel), wird aber von keiner HTML-Seite referenziert (Grep über `index.html`: keine Treffer). Gleiche Inkonsistenz-Familie: `screenshot.mjs`, `v2-check.mjs`, `v2-shots.mjs`, `serve.mjs`, `fetch-photos.mjs`, `pexels-config.json` sind tracked, während `screenshot-*.mjs` und `package.json` ignoriert sind — es gibt keine erkennbare Policy, welches Tooling ins Repo gehört. **Konsequenz:** Totes Zeug in Produktion, und die Hälfte des Toolings fehlt beim Clone (H1).

**M3 — Loses Binary-Treibgut (~5 MB, untracked, teils im Root)** · Fakt (Existenz) / Einschätzung (Bewertung)
`cafeloudigital.png` (1,8 MB) liegt im Root; `assets/Cafe Lou.png` (Leerzeichen im Dateinamen), `assets/IMG_2156.JPG`, `assets/IMG_2157.JPG`, `assets/img/cafelou.png` — alle untracked, Zweck nirgends dokumentiert. **Konsequenz:** Unklar, ob das Quellmaterial für v2 ist (dann gehört es gesichert) oder Abfall (dann weg). Bis zur Entscheidung ist es unversioniertes Einzelstück-Material wie C1.

**M4 — Doku-Drift in EXTERNAL_ASSETS.md und sitemap.xml** · Fakt
`EXTERNAL_ASSETS.md:11`: „Zero externe Runtime-Requests … kein Analytics" — widerspricht dem deployten Vercel-Analytics-Script (das `datenschutz.html` korrekt beschreibt; die beiden Dokumente widersprechen sich also gegenseitig). `sitemap.xml`: alle `lastmod` auf `2026-05-15`, obwohl bis 2026-07-01 substanzielle Inhalts-Commits erfolgten. Kurios außerdem `EXTERNAL_ASSETS.md:57`: ein Pexels-Credit für „Felsformationen … Neuseelands" — ein Küstenfoto in der Attributionsliste eines Cafés, vermutlich ein Fetch-Artefakt ohne zugehöriges verwendetes Bild.

### 🟢 Low

**L1 — `serve.mjs` ohne Pfad-Normalisierung** · Fakt
`serve.mjs:31`: `join(__dir, path)` ohne Traversal-Schutz — `GET /../../…` kann Dateien oberhalb des Roots lesen. Reines localhost-Dev-Tool, daher Low; erwähnenswert nur, falls der Server je länger läuft oder im LAN erreichbar ist.

**L2 — `screenshots/` wächst unbegrenzt (27,7 MB, 42 Einträge)** · Fakt
Korrekt gitignored, aber ohne Aufräum-Muster. Für einen Solo-Operator akzeptabel; gelegentliches Leeren genügt.

**L3 — `INTAKE.md` enthält überholte Platzhalter-Fakten** · Fakt
`INTAKE.md:35` nennt Öffnungszeiten „Mo–Fr 7:00–15:00" als Platzhalter; die bestätigten Zeiten (9–17 Uhr) stehen längst live. INTAKE ist ein Punkt-in-Zeit-Dokument (Datum 2026-05-04 im Kopf) — kein Fix nötig, aber es sollte als abgeschlossen erkennbar sein (Archiv-Kandidat).

### ✅ Strengths — bewahren

1. **DSGVO-Disziplin ist vorbildlich:** self-hosted Fonts, Pexels-Key ausschließlich via Env-Var (`fetch-photos.mjs:30`), saubere Attribution-Pipeline, Datenschutzerklärung, die das Analytics-Script korrekt und konkret beschreibt (`datenschutz.html:98-107`). **Kein einziges Secret im Repo oder in der History gefunden** (Grep über alle mjs/js/json/md/html).
2. **`v2-check.mjs` ist ein exzellenter Smoke-Test** — prüft Overflow bei 375px, Console-Errors, externe Requests, Burger-Menü-Verhalten, Lightbox, Touch-Target-Größen. Das ist mehr automatisierte Qualitätssicherung, als die meisten Solo-Projekte je haben.
3. **Doku-Qualität:** INTAKE.md (Client-Discovery mit Problemliste), PRODUCT.md (klare Produktdefinition mit „done"-Kriterium), DESIGN.md (vollständiges Token-System), EXTERNAL_ASSETS.md (Runtime-Request-Inventar) — ein Fremder versteht das Projekt in 15 Minuten.
4. **Git-Hygiene im Tracked-Bereich:** Remote existiert, master ist synchron mit origin, Commit-Messages sind aussagekräftig und konventionell, Repo ist mit 20 MB schlank, `node_modules`/`screenshots` korrekt ignoriert.
5. **Konsistente NAP überall außer der einen Impressum-Zeile** — JSON-LD, Kontakt-Section und Öffnungszeiten stimmen zwischen v1 und v2 überein.

---

## Phase 3 — Improvement Strategy

### Thema 1: „Was zählt, ist nicht gesichert" (erklärt C1, H2, M3)
Die Versionskontrolle schützt derzeit die *alte* Website, während der *aktuelle* Arbeitsstand (v2, CLAUDE.md, neues Bildmaterial) nur lokal existiert. **Zielzustand:** Alles, was bei Maschinenverlust weh täte, liegt committet auf origin. **Prinzip:** Das Backup-Kriterium ist „tut Verlust weh?", nicht „ist es fertig?". Work-in-Progress gehört auf einen Branch, nicht ins Niemandsland.

### Thema 2: „Zwei Wahrheiten pro Fakt" (erklärt C2, M1, M4, H2)
Telefonnummer, Rechtstexte, Bilder, Fonts, Analytics-Status und Farbtoken existieren jeweils mehrfach — und mindestens eine Kopie ist jeweils falsch oder veraltet. **Zielzustand:** Pro Fakt genau eine Quelle: ein Satz Rechtsseiten, ein Asset-Ordner, ein dokumentierter Analytics-Status, Token-Tabelle nur in DESIGN.md (CLAUDE.md verweist statt kopiert). **Prinzip:** CLAUDE.md beschreibt Regeln und verweist auf Quellen; es dupliziert keine Werte, die woanders gepflegt werden.

### Thema 3: „Der Ignore-Status lügt" (erklärt H1, H3, M2)
`.gitignore` beschreibt eine Repo-Policy, die der Index nicht umsetzt: Ignoriertes ist tracked (`reference/`), Notwendiges ist ignoriert (`package.json`), Totes wird deployt (`tweaks-panel.jsx`). **Zielzustand:** `.gitignore` und `git ls-files` erzählen dieselbe Geschichte; ein frischer Clone plus `npm install` kann den kompletten dokumentierten Workflow ausführen. **Prinzip:** Reproduzierbarkeit vor Ordnerästhetik — `package.json` gehört immer ins Repo.

### Thema 4: „Doku altert schneller als Code" (erklärt H2, M4, L3)
Drei Dokumente behaupten „kein Analytics", eines beschreibt das Analytics korrekt. **Zielzustand:** Nach jedem Feature-Commit, das eine dokumentierte Invariante berührt (externe Requests, NAP, Token), wird das betroffene Dokument im selben Commit angefasst. **Prinzip:** Doku-Änderung ist Teil des Features, nicht Nacharbeit.

### Non-Goals (bewusst nicht fixen)

- **`serve.mjs`-Traversal (L1):** localhost-Dev-Tool eines Solo-Operators — Fix ist eine Zeile, aber kein Handlungsdruck; nur bei LAN-Nutzung relevant.
- **`screenshots/`-Retention (L2):** gitignored, 28 MB, stört niemanden. Gelegentlich manuell leeren reicht.
- **Vendored Impeccable-Skill nach Git bringen:** 700 KB Tooling-Kopie, die vom Skill-Ökosystem neu erzeugbar ist — maschinenlokal ist hier akzeptabel.
- **Repo-Split v1/v2:** kein zweites Repo anlegen — v2 ersetzt v1 im selben Repo; ein Split würde die Duplikate zementieren statt beseitigen.
- **Automation nachrüsten (CI, Hooks):** Für eine statische Ein-Seiten-Site mit manuellem `v2-check.mjs` wäre CI nice-to-have, aber der Pflege-Overhead übersteigt den Nutzen beim aktuellen Release-Takt. Einzige Ausnahme: siehe optionale Task Q4.

### „Done"-Signale (messbar)

1. `git status` ist leer (kein `??` außer bewusst Ignoriertem) und `git log origin/master..master` ist leer.
2. Frischer Clone + `npm install` + `node serve.mjs` + `node v2-check.mjs` läuft ohne manuelle Zusatzschritte durch.
3. `Select-String` nach `17620135776` und `899D7A` über alle Dateien: 0 Treffer (bzw. nur noch die gewollte Nummer überall identisch).
4. Jede Datei existiert genau einmal: kein byte-identisches Duplikat zwischen Root und `v2/` (Hash-Stichprobe).
5. CLAUDE.md, EXTERNAL_ASSETS.md und datenschutz.html machen dieselbe Aussage zum Analytics-Status.
6. Root enthält ≤ 1 loses Binary (nur `favicon.svg`-artige Betriebsdateien).

---

## Phase 4 — Task Plan

### Milestone 0 — Safety Net (vor allem anderen)

| # | Task | Aufwand | Risiko | Abhängig von |
|---|---|---|---|---|
| 0.1 | WIP-Commit des gesamten untracked Stands auf Branch `v2-wip` | S | minimal | — |

**0.1 — Alles Untracked sofort auf einen Branch sichern.**
`git checkout -b v2-wip; git add -A; git commit; git push -u origin v2-wip`. Vorher `.gitignore` temporär NICHT anfassen — einfach `git add -A` nimmt nur Nicht-Ignoriertes (v2/, CLAUDE.md, die 5 losen Bilder). Damit ist C1 sofort entschärft, ohne irgendetwas zu entscheiden. **Akzeptanz:** `git status` leer, Branch auf origin sichtbar. **Bricht:** nichts — reiner Add. *Implementierungsskizze:* (1) Branch anlegen, (2) `git add -A && git status` prüfen, dass nichts Ignoriertes hineinrutscht, (3) committen mit Message „wip: v2 snapshot + untracked assets (Sicherung vor Reorg)", (4) pushen. Gotcha: `assets/Cafe Lou.png` mit Leerzeichen ist für git unproblematisch, nur in Skripten quoten.

### Milestone 1 — Critical / Correctness

| # | Task | Aufwand | Risiko | Abhängig von |
|---|---|---|---|---|
| 1.1 | Telefon-Bug im Impressum fixen (beide Kopien) | S | niedrig | 0.1 |
| 1.2 | CLAUDE.md gegen Realität abgleichen + committen | S | niedrig | 0.1 |
| 1.3 | `package.json`/`package-lock.json` tracken | S | niedrig | 0.1 |

**1.1 — Impressum-Telefonnummer.** Klären, welche Nummer rechtlich gelten soll (Festnetz `+49 40 32848308` laut NAP-Regel, oder die Mobilnummer aus Commit `6d3be7b` — nur der Betreiber weiß das; siehe Open Questions). Dann `href` UND Anzeigetext in `impressum.html:112` und `v2/impressum.html:112` identisch setzen; falls Mobilnummer gewinnt, auch CLAUDE.md-NAP-Block, JSON-LD (`index.html:45`, `v2/index.html:46`) und Kontakt-Sections aktualisieren. **Akzeptanz:** Done-Signal 3. **Bricht:** nichts (Textänderung); Google-Business-Profil sollte dieselbe Nummer zeigen (manuell prüfen). *Skizze:* Grep nach `32848308` und `17620135776`, alle Fundstellen auf eine Nummer vereinheitlichen, `v2-check.mjs` laufen lassen, deployen.

**1.2 — CLAUDE.md-Realitätsabgleich.** Vier konkrete Edits: (a) `--sage` → `#889B7D`, (b) Analytics-Regel ersetzen durch „einzige erlaubte externe Ressource: `/_vercel/insights/script.js` (First-Party-Proxy, in datenschutz.html dokumentiert) — sonst zero", (c) JSON-LD-Vorlage `streetAddress` → „Saseler Str. 1 / Ecke Meiendorfer Str. 93", (d) Seitenliste um `v2/` bzw. nach Task 2.1 um die neue Struktur ergänzen. Danach committen (Datei ist bereits durch 0.1 gesichert, hier geht es um Inhalt). Gleichzeitig `EXTERNAL_ASSETS.md:5-11` (Runtime-Tabelle) um die Analytics-Zeile ergänzen und den Neuseeland-Credit (`EXTERNAL_ASSETS.md:57`) löschen, sofern kein Bild dazu verwendet wird (Grep nach dem Dateinamen). **Akzeptanz:** Done-Signal 5; kein `899D7A` mehr im Repo. **Bricht:** nichts.

**1.3 — `package.json` einchecken.** `.gitignore:14-15` entfernen, beide Dateien committen. **Akzeptanz:** Done-Signal 2 (Clone-Test kann bis M2 warten, aber `git ls-files package.json` liefert Treffer). **Bricht:** nichts — Vercel deployt statische Dateien weiter; falls Vercel wegen `package.json` einen Build erwartet, in den Projekt-Settings „Framework Preset: Other / no build" verifizieren (Gotcha!). *Skizze:* .gitignore editieren → `git add package.json package-lock.json .gitignore` → committen → Vercel-Preview-Deploy prüfen, bevor auf master gemergt wird.

### Milestone 2 — High-Leverage Structure

| # | Task | Aufwand | Risiko | Abhängig von |
|---|---|---|---|---|
| 2.1 | v2-Cutover entscheiden & Duplikate eindampfen | L | mittel | 1.1–1.3 |
| 2.2 | `.gitignore`-Policy mit Index versöhnen | S | mittel | 2.1 |
| 2.3 | Lose Binaries einsortieren oder löschen | S | niedrig | 0.1 |

**2.1 — v2-Cutover.** Entscheidung des Owners nötig (Open Question 1): Wird v2 die Hauptseite? Wenn ja: v2-Inhalte nach Root promoten (`v2/index.html` → `index.html`, `v2/css/`, `v2/js/` nach Root), Duplikat-Ordner `v2/assets/img/`, `v2/fonts/`, `v2/impressum.html`, `v2/datenschutz.html` löschen und auf die Root-Versionen verweisen. **Bricht (vollständige Liste):** (a) `v2/index.html:9,22,26` canonical/OG-URLs `…/v2/` → Root-URLs; (b) relative Pfade in v2-HTML (`assets/img/…`, `css/style.css`, `js/main.js`) — nach Promotion neu prüfen; (c) `v2/css/style.css` Font-Pfade `../fonts/` → `fonts/`; (d) `v2-check.mjs:4` und `v2-shots.mjs` Default-URL `http://localhost:3000/v2/` → `/`; (e) `sitemap.xml` — keine v2-URLs enthalten, bleibt gültig, aber `lastmod` aktualisieren; (f) JSON-LD-Bildreferenzen auf `reference/` (`index.html:83-84`) — durch `assets/img/`-Bilder ersetzen, damit H3 sauber lösbar wird; (g) CLAUDE.md-Seitenliste (Task 1.2d). Kein Skill, kein Cron, kein Memory referenziert `v2/`-Pfade (verifiziert: Memory nennt nur `serve.mjs` und `.agents/`-Pfade). *Skizze:* auf Branch arbeiten → Pfad-Fixes → `node serve.mjs` + `v2-check.mjs` gegen `/` → Screenshots 375/1280 → mergen, deployen, alte v1-Datei bleibt in der Git-History.

**2.2 — Ignore-Policy versöhnen.** Nach 2.1: entweder `reference/` aus `.gitignore` streichen (weil tracked und gebraucht) **oder** — nachdem 2.1(f) die JSON-LD-Referenzen ersetzt hat — `reference/` per `git rm -r --cached` enttracken und wirklich lokal-only führen. Ebenso entscheiden: `screenshot-*.mjs` tracken (Policy „Dev-Tooling gehört ins Repo", empfohlen wegen H1-Logik) und `tweaks-panel.jsx` enttracken oder in einen `tools/`-Ordner verschieben. **Bricht:** `reference/`-Enttrackung bricht die Live-JSON-LD-Bilder, WENN 2.1(f) nicht vorher erledigt ist — harte Abhängigkeit. CLAUDE.md-Screenshot-Workflow referenziert `screenshot.mjs` (bleibt tracked). **Akzeptanz:** Done-Signale 1 und 4; `git ls-files` enthält nichts, was `.gitignore` ausschließt (`git ls-files -i -c --exclude-standard` ist leer).

**2.3 — Binary-Triage.** Für jede der 5 Dateien (`cafeloudigital.png`, `assets/Cafe Lou.png`, `assets/IMG_2156.JPG`, `assets/IMG_2157.JPG`, `assets/img/cafelou.png`) entscheiden: (a) wird auf der Seite gebraucht → nach `assets/img/` mit sprechendem Namen ohne Leerzeichen, referenzieren; (b) Quellmaterial → nach `reference/`; (c) Abfall → löschen (durch 0.1 bleibt es in der Branch-History wiederherstellbar). **Bricht:** nichts — keine Datei wird derzeit von HTML/CSS/Skripten referenziert (Grep-verifiziert für die Root-HTML-Dateien). **Akzeptanz:** Done-Signal 6.

### Milestone 3 — Qualität & Politur

| # | Task | Aufwand | Risiko | Abhängig von |
|---|---|---|---|---|
| 3.1 | `sitemap.xml` `lastmod` aktualisieren | S | minimal | 2.1 |
| 3.2 | INTAKE.md als „abgeschlossen (2026-05)" markieren o. nach `docs/archive/` | S | minimal | — |
| 3.3 | `serve.mjs`: Pfad-Normalisierung (eine Zeile `normalize` + Root-Check) | S | minimal | — |
| 3.4 | `screenshots/` einmalig leeren, Hinweis in CLAUDE.md („gelegentlich leeren") | S | minimal | — |

Bei 3.2 gilt die Pfad-Regel: ein Verschieben nach `docs/archive/` bricht keine Referenzen (Grep: kein Skript, keine HTML-Datei, kein Memory referenziert `INTAKE.md`); nur die CLAUDE.md-Erwähnungen von DESIGN.md/PRODUCT.md dürfen NICHT mitverschoben werden — diese beiden bleiben, wo sie sind, da CLAUDE.md sie per Pfad nennt.

### Quick Wins (hoher Impact, Aufwand S)

1. **0.1** — ein Commit, und das größte Risiko des Repos ist weg. *Zuerst machen.*
2. **1.1** — zwei Zeilen, und die Live-Site zeigt keine widersprüchliche Telefonnummer mehr.
3. **1.3** — zwei .gitignore-Zeilen löschen, und das Projekt ist reproduzierbar.
4. **1.2** — vier Edits, und Claude-Sessions arbeiten wieder mit korrekten Fakten.

### Optional (nur bei Bedarf)

**Q4 — `v2-check.mjs` als Pflicht-Gate dokumentieren:** In CLAUDE.md-Git-Workflow als Schritt aufnehmen („`node v2-check.mjs` muss 0 externe Requests außer `/_vercel/insights` und 0 Overflow melden"). Aufwand S, kein Risiko — nutzt vorhandene Stärke Nr. 2.

---

## Open Questions (nur der Owner kann entscheiden)

1. **v2-Cutover:** Soll v2 die Live-Seite ersetzen (empfohlen: ja, im selben Repo, Root-Promotion) oder parallel unter `/v2/` live gehen? Der `canonical` in `v2/index.html:9` deutet auf Parallel-Deploy — das würde aber Duplicate-Content-Management und doppelte Rechtstexte dauerhaft machen.
2. **Telefonnummer:** Gilt die Festnetznummer `+49 40 32848308` (NAP-Regel, JSON-LD, Kontakt-Section) oder die Mobilnummer `+49 176 20135776` (Impressum-Anzeigetext seit Commit `6d3be7b`)? Die Antwort bestimmt die Fix-Richtung von Task 1.1 und ggf. das Google-Business-Profil.
3. **Lose Binaries (M3):** Sind `cafeloudigital.png`, `IMG_2156/57.JPG`, `Cafe Lou.png`, `cafelou.png` künftiges Website-Material (→ einsortieren) oder Reste (→ löschen)?
4. **`reference/`:** Original-Brand-Assets im Repo behalten (öffentlich auf GitHub + Vercel abrufbar — ist das mit dem Café abgesprochen?) oder nach 2.1(f) enttracken und lokal führen?
5. **Produktions-Domain:** Bleibt `cafe-lou.vercel.app` oder kommt eine eigene Domain (z. B. `cafelou-hamburg.de`)? Betrifft canonical, OG, JSON-LD, sitemap — falls geplant, mit 2.1 in einem Rutsch ändern.
