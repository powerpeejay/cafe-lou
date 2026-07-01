// v2-Qualitätscheck: Konsole, Overflow, externe Requests, Interaktionen
import { chromium } from 'playwright';

const URL = process.argv[2] || 'http://localhost:3000/v2/';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 375, height: 812 } });

const consoleErrors = [];
const external = [];
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
page.on('request', r => {
  const u = r.url();
  if (!u.startsWith('http://localhost:3000')) external.push(u);
});

await page.goto(URL, { waitUntil: 'networkidle' });

// 1. Horizontaler Overflow?
const overflow = await page.evaluate(() =>
  document.documentElement.scrollWidth - document.documentElement.clientWidth);

// 2. Burger: öffnen, Link klicken, schließt sich + scrollt
await page.click('#nav-toggle');
await page.waitForTimeout(600);
const menuOpen = await page.evaluate(() => document.getElementById('nav-links').classList.contains('open'));
await page.click('.nav-links a[href="#menu"]');
await page.waitForTimeout(900);
const menuClosed = await page.evaluate(() => !document.getElementById('nav-links').classList.contains('open'));
const scrolledToMenu = await page.evaluate(() => window.scrollY > 500);
const bodyUnlocked = await page.evaluate(() => !document.body.classList.contains('nav-locked'));

// 3. Menü-Tab wechseln
await page.click('#tab-drinks');
await page.waitForTimeout(700);
const drinkCards = await page.locator('.menu-card').count();

// 4. Lightbox öffnen/schließen per Escape
await page.click('#tab-all');
await page.waitForTimeout(400);
await page.locator('#menu-fullcard-btn').scrollIntoViewIfNeeded();
await page.click('#menu-fullcard-btn');
await page.waitForTimeout(500);
const lightboxOpen = await page.evaluate(() => !document.getElementById('menu-lightbox').hasAttribute('hidden'));
await page.keyboard.press('Escape');
await page.waitForTimeout(500);
const lightboxClosed = await page.evaluate(() => document.getElementById('menu-lightbox').hasAttribute('hidden'));

// 5. Touch-Targets: alle interaktiven Elemente >= 44px hoch?
const smallTargets = await page.evaluate(() => {
  const els = document.querySelectorAll('a, button');
  const bad = [];
  els.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && (r.height < 44 || r.width < 44)) {
      bad.push(el.className + ' ' + Math.round(r.width) + 'x' + Math.round(r.height));
    }
  });
  return bad;
});

console.log(JSON.stringify({
  overflow375: overflow,
  consoleErrors,
  externalRequests: external,
  burger: { menuOpen, menuClosed, scrolledToMenu, bodyUnlocked },
  drinkCards,
  lightbox: { lightboxOpen, lightboxClosed },
  smallTouchTargets: smallTargets
}, null, 2));

await browser.close();
