// v2-Screenshots: scrollt die Seite durch (Reveals + Lazy-Load) und
// speichert Viewport-Ausschnitte je Sektion bei 375px und 1280px.
import { chromium } from 'playwright';
import { mkdirSync, existsSync } from 'fs';

const URL = process.argv[2] || 'http://localhost:3000/v2/';
const dir = 'screenshots/v2';
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const viewports = [
  { name: 'm375', width: 375, height: 812 },
  { name: 'd1280', width: 1280, height: 800 },
];
const sections = ['#hero', '#story', '#ort', '#menu', '#stimmen', '#contact-cta', '#contacts'];

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(URL, { waitUntil: 'networkidle' });
  // langsam bis unten scrollen, damit Reveals und lazy-Bilder ausgelöst werden
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto';
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
  });
  await page.waitForTimeout(900);
  for (const sel of sections) {
    const el = page.locator(sel);
    if (await el.count() === 0) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    await page.screenshot({ path: `${dir}/${vp.name}-${sel.slice(1)}.png` });
  }
  // Burger-Menü offen (nur mobil)
  if (vp.width < 768) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.click('#nav-toggle');
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${dir}/${vp.name}-burger.png` });
  }
  // Konsole auf Fehler prüfen
  await page.close();
}
await browser.close();
console.log('done');
