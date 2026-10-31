/* Lightweight, cookie-free page analytics for the owner's private dashboard.
   - No cookies, no IP addresses, no fingerprinting: a random id lives in localStorage on the visitor's own device.
   - Sends at most 2 tiny beacons per page view (on load, and when the page is left or hidden).
   - Never runs on localhost / file:// (unless ubad_dev is set) and never in the owner's own browser (ubad_me). */
(function () {
  'use strict';
  try {
    var L = location, ls = window.localStorage, ss = window.sessionStorage;
    var local = /^(localhost|127\.|192\.168\.|10\.|\[::1\])/.test(L.hostname) || L.protocol === 'file:';
    if (local && ls.getItem('ubad_dev') !== '1') return;
    if (ls.getItem('ubad_me') === '1' || /[?&]notrack\b/.test(L.search)) return;
    if (navigator.webdriver && ls.getItem('ubad_dev') !== '1') return; /* automated browsers */
  } catch (e) { return; }

  var ENDPOINT = '/api/c';
  var rnd = function (n) {
    var a = new Uint8Array(n), s = '';
    try { crypto.getRandomValues(a); } catch (e) { for (var i = 0; i < n; i++) a[i] = Math.random() * 256; }
    for (var j = 0; j < n; j++) s += (a[j] % 36).toString(36);
    return s;
  };

  var vid, nv = 0, sid;
  try {
    vid = localStorage.getItem('ubad_v');
    if (!vid) { vid = rnd(12); localStorage.setItem('ubad_v', vid); nv = 1; }
  } catch (e) { vid = rnd(12); nv = 1; }
  try {
    sid = sessionStorage.getItem('ubad_s');
    if (!sid) { sid = rnd(10); sessionStorage.setItem('ubad_s', sid); }
  } catch (e) { sid = rnd(10); }

  var pid = rnd(10);
  var path = (L.pathname || '/').replace(/index\.html$/, '').replace(/\.html$/, '') || '/';
  if (path.length > 1 && path.slice(-1) === '/') path = path.slice(0, -1);

  var acts = [], seen = {}, maxScroll = 0, shownMs = 0, shownAt = 0, started = false, sentTime = 0;

  function send(obj) {
    obj.v = vid; obj.s = sid; obj.pid = pid; obj.p = path;
    var body = JSON.stringify(obj);
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'text/plain' }))) return;
    } catch (e) {}
    try { fetch(ENDPOINT, { method: 'POST', body: body, keepalive: true, headers: { 'Content-Type': 'text/plain' } }); } catch (e) {}
  }

  function act(name) {
    if (acts.length >= 40) return;
    acts.push({ n: String(name).slice(0, 60), t: Math.round(performance.now() / 1000) });
  }
  window.__ubadTrack = act;

  function once(name) { if (seen[name]) return; seen[name] = 1; act(name); }

  function tick() {
    if (shownAt) { shownMs += Date.now() - shownAt; shownAt = 0; }
  }
  function resume() { if (!shownAt && document.visibilityState === 'visible') shownAt = Date.now(); }

  function scrollPct() {
    var h = document.documentElement, b = document.body;
    var total = Math.max(h.scrollHeight, b ? b.scrollHeight : 0) - window.innerHeight;
    if (total <= 0) return 100;
    var y = window.pageYOffset || h.scrollTop || 0;
    return Math.min(100, Math.round((y / total) * 100));
  }
  function onScroll() { var p = scrollPct(); if (p > maxScroll) maxScroll = p; }

  function flush() {
    tick();
    var add = Math.min(shownMs, 30 * 60 * 1000) - sentTime;
    if (add <= 0 && !acts.length) return;
    var o = { k: 'ex', tm: Math.max(0, Math.round(add)), sc: maxScroll };
    if (acts.length) { o.a = acts; acts = []; }
    sentTime += Math.max(0, add);
    send(o);
  }

  function refHost() {
    try {
      if (!document.referrer) return '';
      var u = new URL(document.referrer);
      if (u.host === L.host) return '';
      return u.hostname.replace(/^www\./, '');
    } catch (e) { return ''; }
  }

  function begin() {
    if (started) return;
    started = true;
    var q = new URLSearchParams(L.search), o = { k: 'pv', nv: nv, r: refHost(), w: window.innerWidth };
    var us = q.get('utm_source') || q.get('ref') || q.get('source');
    if (us) o.us = us.slice(0, 40);
    if (q.get('utm_medium')) o.um = q.get('utm_medium').slice(0, 40);
    var uc = q.get('utm_campaign') || q.get('for') || q.get('to'); if (uc) o.uc = uc.slice(0, 60);
    try { o.lg = (navigator.language || '').slice(0, 8); } catch (e) {}
    send(o);
    resume();
    onScroll();
  }

  /* ---- what the visitor does ---- */
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var a = t.closest('a');
    var card = t.closest('.card[data-id]');
    if (card && card.closest('#work, .stage, .ring')) { return; } /* project opens are logged via openCase below */
    if (t.closest('#copyEmail')) return act('contact:copy-email');
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (/^mailto:|mail\.google\.com/.test(h)) return act('contact:email');
    if (/linkedin\.com/.test(h)) return act('contact:linkedin');
    if (h === '#contact') return act('cta:get-in-touch');
    if (/prototypes\/([a-z]+)/.test(h)) return act('prototype:open:' + RegExp.$1);
    if (a.dataset && a.dataset.sec) return act('nav:' + a.dataset.sec);
    if (/^https?:/.test(h) && a.host !== L.host) {
      try { act('outbound:' + new URL(h).hostname.replace(/^www\./, '')); } catch (x) {}
    }
  }, true);

  /* project cards: opening a case study, and lingering over a card */
  function wrapOpenCase() {
    if (typeof window.openCase !== 'function' || window.openCase.__ubad) return;
    var og = window.openCase;
    var w = function (id) { try { act('project:open:' + id); flush(); } catch (e) {} return og.apply(this, arguments); };
    w.__ubad = 1; window.openCase = w;
  }
  wrapOpenCase();

  var hoverT = null, hoverId = null, hoverN = {};
  document.addEventListener('pointerover', function (e) {
    var c = e.target && e.target.closest && e.target.closest('.card[data-id]');
    var id = c ? c.getAttribute('data-id') : null;
    if (id === hoverId) return;
    clearTimeout(hoverT); hoverId = id;
    if (id) hoverT = setTimeout(function () {
      hoverN[id] = (hoverN[id] || 0) + 1;
      if (hoverN[id] <= 2) act('project:hover:' + id);
    }, 700);
  }, { passive: true });

  /* sections that actually came into view */
  function observe() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) { once('section:' + (en.target.id || en.target.getAttribute('data-sec'))); io.unobserve(en.target); }
      });
    }, { threshold: 0.35 });
    ['work', 'about', 'contact'].forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* case-study slides: log how many slides were reached */
  function slides() {
    var ss = document.querySelectorAll('section.sl');
    if (!ss.length || !('IntersectionObserver' in window)) return;
    var max = 0, io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        var i = Array.prototype.indexOf.call(ss, en.target) + 1;
        if (i > max) { max = i; if (i % 3 === 0 || i === ss.length) act('slide:' + i + '/' + ss.length); }
      });
    }, { threshold: 0.4 });
    ss.forEach(function (s) { io.observe(s); });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') flush(); else resume();
  });
  window.addEventListener('pagehide', flush);
  window.addEventListener('focus', resume);
  window.addEventListener('blur', tick);

  function go() { begin(); wrapOpenCase(); observe(); slides(); }
  function ready() {
    if (document.prerendering) { document.addEventListener('prerenderingchange', go, { once: true }); return; }
    go();
  }
  if (document.readyState === 'complete') setTimeout(ready, 0);
  else window.addEventListener('load', function () { setTimeout(ready, 0); });
})();
