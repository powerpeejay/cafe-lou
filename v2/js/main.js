/* Café Lou v2 — Navigation, Reveals, Menü, Lightbox */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Nav: Scroll-Zustand + Lese-Fortschritt ── */
  var nav = document.getElementById('main-nav');
  var progress = document.querySelector('.nav-progress');
  var ticking = false;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      progress.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* ── Burger-Menü: Fullscreen-Panel, Scroll-Lock, Escape, Fokus ── */
  var toggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('nav-links');

  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    document.body.classList.toggle('nav-locked', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
  }
  toggle.addEventListener('click', function () {
    setMenu(!navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  /* ── Scroll-Reveal ── */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Scroll-Spy ── */
  var sectionToNav = {
    hero: 'a[href="#hero"]',
    story: 'a[href="#story"]',
    ort: 'a[href="#story"]',
    menu: 'a[href="#menu"]',
    stimmen: 'a[href="#menu"]',
    'contact-cta': 'a[href="#contacts"]',
    contacts: 'a[href="#contacts"]'
  };
  function setActiveNav(id) {
    navLinks.querySelectorAll('a').forEach(function (a) { a.classList.remove('active'); });
    var sel = sectionToNav[id];
    if (sel) {
      var link = navLinks.querySelector(sel);
      if (link) link.classList.add('active');
    }
  }
  var spySections = Object.keys(sectionToNav)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) setActiveNav(e.target.id); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  spySections.forEach(function (s) { spy.observe(s); });

  /* ── Speisekarte ── */
  var IMG = 'assets/img/';
  function srcset(base) {
    return IMG + base + '-480.webp 480w, ' + IMG + base + '-800.webp 800w';
  }
  var menuItems = [
    { cat: 'bowls',     name: 'Granola Bowl',              desc: 'Hausgranola, Saisonfrüchte, Joghurt, Honig',                               price: '8,90 €',  img: 'granola' },
    { cat: 'bowls',     name: 'Chia Bowl',                 desc: 'Chiapudding, Kokosmilch, frische Früchte, Ahornsirup',                     price: '10,50 €', img: 'chia-bowl' },
    { cat: 'sauerteig', name: 'Avocado',                   desc: 'Sauerteigbrot, Avocado, Tomaten, frische Kräuter',                         price: '10,50 €', img: 'avocado' },
    { cat: 'sauerteig', name: 'Mediterranes Olivengemüse', desc: 'Sauerteigbrot, Olivengemüse, Feta, frische Kräuter',                       price: '11,50 €', img: 'olivengemuese' },
    { cat: 'pancakes',  name: 'Classic',                   desc: 'Mit Butter und Ahornsirup',                                                price: '11,50 €', img: 'pancakes-classic' },
    { cat: 'pancakes',  name: 'Sweet Lou',                 desc: 'Schoko-Creme, frische Banane & selbst gemachter Ahornsirup',               price: '11,50 €', img: 'pancakes-sweet' },
    { cat: 'suppen',    name: 'Tomatensuppe',              desc: 'Frisch, mit Basilikum und frischen Kräutern',                              price: '8,50 €',  img: 'tomatensuppe' },
    { cat: 'suppen',    name: 'Karotten-Ingwer-Suppe',     desc: 'Mit Nusscrunch, Olivenöl & frischen Kräutern',                             price: '7,90 €',  img: 'karottensuppe' },
    { cat: 'salate',    name: 'Avocado-Salat',             desc: 'Avocado, Granatapfelkerne, Tomaten, Gurke, Zwiebel & geröstete Kerne',     price: '12,50 €', img: 'avocado-salat' },
    { cat: 'salate',    name: 'Ziegenkäse-Salat',          desc: 'Karamellisierter Ziegenkäse, Walnüsse, hausgemachtes Dressing',            price: '14,50 €', img: 'ziegenkaese' },
    { cat: 'specials',  name: 'Egg Drop Sandwich',         desc: 'Würziges Rührei, Cheddar, Bacon und hausgemachte Guacamole auf Sauerteig', price: '14,90 €', img: 'egg-drop' },
    { cat: 'specials',  name: 'Flammkuchen',               desc: 'Knusprig, Original oder mit Avocado statt Bacon',                          price: '10,90 €', img: 'flammkuchen' },
    { cat: 'drinks',    name: 'Espresso / Doppelter',      desc: 'Single oder Double Shot',                                                  price: '2,50 €',  img: 'espresso' },
    { cat: 'drinks',    name: 'Cappuccino',                desc: '',                                                                          price: '3,60 €',  img: 'cappuccino' },
    { cat: 'drinks',    name: 'Latte Macchiato',           desc: '',                                                                          price: '4,30 €',  img: 'latte-macchiato' },
    { cat: 'drinks',    name: 'Americano',                 desc: '',                                                                          price: '3,00 €',  img: 'americano' },
    { cat: 'drinks',    name: 'Flat White',                desc: 'Doppelter Ristretto, cremig aufgeschäumte Milch',                          price: '4,20 €',  img: 'flatwhite' },
    { cat: 'drinks',    name: 'Milchkaffee',               desc: '',                                                                          price: '4,30 €',  img: 'milchkaffee' },
    { cat: 'drinks',    name: 'Latte',                     desc: '',                                                                          price: '4,50 €',  img: 'latte' },
    { cat: 'drinks',    name: 'Fresh Tea',                 desc: '',                                                                          price: '4,50 €',  img: 'fresh-tea' },
    { cat: 'drinks',    name: 'Hauslimonade',              desc: 'Zitrone, Minze, Gurke, Sprudelwasser',                                     price: '4,50 €',  img: 'limonade' }
  ];

  var grid = document.getElementById('menu-grid');
  function renderMenu(cat) {
    var items = cat === 'all' ? menuItems : menuItems.filter(function (i) { return i.cat === cat; });
    grid.innerHTML = items.map(function (item, idx) {
      var featured = idx === 0 && cat === 'all';
      var sizes = featured
        ? '(max-width: 480px) 92vw, (max-width: 1024px) 60vw, 800px'
        : '(max-width: 480px) 92vw, (max-width: 1024px) 46vw, 400px';
      return '' +
        '<article class="menu-card' + (featured ? ' featured' : '') + '" style="--i:' + Math.min(idx, 8) + '">' +
          '<div class="menu-card-thumb">' +
            '<img src="' + IMG + item.img + '-480.webp" srcset="' + srcset(item.img) + '" sizes="' + sizes + '" ' +
                 'alt="' + item.name + '" width="800" height="600" loading="lazy" decoding="async">' +
          '</div>' +
          '<div class="menu-card-body">' +
            '<h3 class="menu-card-name">' + item.name + '</h3>' +
            (item.desc ? '<p class="menu-card-desc">' + item.desc + '</p>' : '') +
            '<div class="menu-card-price">' + item.price + '</div>' +
          '</div>' +
        '</article>';
    }).join('');
  }
  renderMenu('all');

  document.getElementById('menu-tabs').addEventListener('click', function (e) {
    var btn = e.target.closest('.menu-tab');
    if (!btn) return;
    document.querySelectorAll('.menu-tab').forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    grid.setAttribute('aria-labelledby', btn.id);
    renderMenu(btn.dataset.cat);
  });

  /* ── Lightbox (vollständige Karte) ── */
  var lightbox = document.getElementById('menu-lightbox');
  var openBtn = document.getElementById('menu-fullcard-btn');
  var closeBtn = document.getElementById('menu-lightbox-close');

  function openLightbox() {
    lightbox.removeAttribute('hidden');
    requestAnimationFrame(function () { lightbox.classList.add('open'); });
    document.body.classList.add('nav-locked');
    closeBtn.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    var done = function () { lightbox.setAttribute('hidden', ''); };
    if (reducedMotion) { done(); } else { setTimeout(done, 260); }
    document.body.classList.remove('nav-locked');
    openBtn.focus();
  }
  openBtn.addEventListener('click', openLightbox);
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lightbox.hasAttribute('hidden')) closeLightbox();
  });
})();
