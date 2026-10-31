/* Aggregated stats for the private dashboard. Requires the owner cookie. */
const { redis, hasRedis, isAuthed } = require('./_lib');

const DAY = 864e5;
const PROJECTS = { belong: 'Belong', kwick: 'KwicK', resolveai: 'ResolveAI', outpace: 'Outpace', worth: 'Worth' };

function classify(x) {
  x = String(x || '').toLowerCase().trim();
  if (!x) return 'Direct';
  const rules = [
    [/linkedin|lnkd\.in/, 'LinkedIn'], [/google/, 'Google'], [/bing\./, 'Bing'], [/duckduckgo/, 'DuckDuckGo'],
    [/yahoo/, 'Yahoo'], [/ecosia|brave|startpage/, 'Other search'], [/(^|\.)t\.co$|twitter|(^|\.)x\.com$/, 'X / Twitter'],
    [/facebook|(^|\.)fb\.com|(^|\.)fb$/, 'Facebook'], [/instagram/, 'Instagram'], [/whatsapp|wa\.me/, 'WhatsApp'],
    [/github/, 'GitHub'], [/behance/, 'Behance'], [/dribbble/, 'Dribbble'], [/peerlist/, 'Peerlist'],
    [/naukri/, 'Naukri'], [/indeed/, 'Indeed'], [/glassdoor/, 'Glassdoor'], [/wellfound|angel\.co/, 'Wellfound'],
    [/medium\.com/, 'Medium'], [/reddit/, 'Reddit'], [/youtube|youtu\.be/, 'YouTube'], [/telegram|(^|\.)t\.me$/, 'Telegram'],
    [/mail\.|outlook|gmail|email|newsletter/, 'Email'], [/claude\.ai|anthropic/, 'Claude'], [/figma/, 'Figma'],
  ];
  for (const [re, n] of rules) if (re.test(x)) return n;
  return x.replace(/^www\./, '');
}

function inc(m, k, n = 1) { m.set(k, (m.get(k) || 0) + n); }
function top(m, n = 10) { return [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => ({ k, v })); }
function pageName(p) {
  p = p || '/';
  if (p === '/') return 'Home';
  const m = p.match(/^\/([a-z]+)$/);
  if (m && PROJECTS[m[1]]) return PROJECTS[m[1]] + ' case study';
  const pr = p.match(/^\/prototypes\/([a-z]+)/);
  if (pr) return (PROJECTS[pr[1]] || pr[1]) + ' prototype';
  return p;
}
function projectOf(p) {
  const m = (p || '').match(/^\/([a-z]+)$/);
  return m && PROJECTS[m[1]] ? m[1] : null;
}

function aggregate(events, from, to, tz, withDetail) {
  const sess = new Map(), pages = new Map();
  for (const e of events) {
    if (e.t < from || e.t >= to || e.k !== 'pv') continue;
    let s = sess.get(e.s);
    if (!s) {
      s = { id: e.s, v: e.v, t0: e.t, t1: e.t, c: e.c, rg: e.rg, ci: e.ci, d: e.d, b: e.b, o: e.o, nv: 0, r: e.r, us: e.us, uc: e.uc, um: e.um, lp: e.p, pg: [], acts: [], tm: 0, hasTm: false, sc: 0 };
      sess.set(e.s, s);
    } else if (e.t < s.t0) {
      Object.assign(s, { t0: e.t, c: e.c, rg: e.rg, ci: e.ci, d: e.d, b: e.b, o: e.o, r: e.r, us: e.us, uc: e.uc, um: e.um, lp: e.p });
    }
    if (e.nv) s.nv = 1;
    if (e.t > s.t1) s.t1 = e.t;
    if (!pages.has(e.pid)) { pages.set(e.pid, { p: e.p, s: e.s, v: e.v, t: e.t, tm: 0, sc: 0, hasEx: false }); s.pg.push({ pid: e.pid, p: e.p, t: e.t }); }
  }
  for (const e of events) {
    if (e.t < from || e.t >= to + 36e5 || e.k !== 'ex') continue;
    const pg = pages.get(e.pid); if (!pg) continue;
    const s = sess.get(pg.s);
    pg.hasEx = true; pg.tm += e.tm || 0; pg.sc = Math.max(pg.sc, e.sc || 0);
    s.hasTm = true; s.tm += e.tm || 0; s.sc = Math.max(s.sc, e.sc || 0);
    if (e.t > s.t1) s.t1 = e.t;
    for (const a of e.a || []) s.acts.push({ n: a.n, t: pg.t + a.t * 1000, p: pg.p });
  }

  const S = [...sess.values()];
  for (const s of S) s.tm = Math.min(s.tm, 60 * 60 * 1000);
  const visitors = new Set(S.map((s) => s.v)), newV = new Set(S.filter((s) => s.nv).map((s) => s.v));
  const withT = S.filter((s) => s.hasTm).map((s) => s.tm).sort((a, b) => a - b);
  const avgTime = withT.length ? Math.round(withT.reduce((a, b) => a + b, 0) / withT.length) : 0;
  const medTime = withT.length ? withT[Math.floor(withT.length / 2)] : 0;
  const engaged = S.filter((s) => s.tm >= 15000 || s.pg.length >= 2 || s.acts.some((a) => /^(project:open|prototype|contact|cta)/.test(a.n))).length;
  const hasAct = (s, re) => s.acts.some((a) => re.test(a.n)) || s.pg.some((p) => re.test('page:' + p.p));
  const contactS = S.filter((s) => hasAct(s, /^contact:/)).length;

  const kpis = {
    visitors: visitors.size, sessions: S.length, pageviews: pages.size,
    newVisitors: newV.size, returning: visitors.size - newV.size,
    avgTime, medTime, engagedRate: S.length ? engaged / S.length : 0,
    contactClicks: contactS,
  };
  if (!withDetail) return { kpis };

  /* sources, geo, tech */
  const src = new Map(), camp = new Map(), ctry = new Map(), city = new Map(), dev = new Map(), brw = new Map(), os = new Map(), lang = new Map();
  const hours = new Array(24).fill(0);
  const days = new Map();
  const localDay = (t) => Math.floor((t + tz * 60000) / DAY);
  for (const s of S) {
    inc(src, classify(s.us || s.r));
    if (s.uc) inc(camp, s.uc);
    if (s.c) inc(ctry, s.c);
    if (s.ci) inc(city, s.ci + '|' + (s.c || ''));
    inc(dev, s.d || 'desktop'); inc(brw, s.b || 'Other'); inc(os, s.o || 'Other');
    hours[Math.floor((((s.t0 + tz * 60000) % DAY) + DAY) % DAY / 36e5)]++;
    const dk = localDay(s.t0); let d = days.get(dk); if (!d) { d = { v: new Set(), s: 0, p: 0 }; days.set(dk, d); }
    d.v.add(s.v); d.s++; d.p += s.pg.length;
  }
  const series = [];
  for (let dk = localDay(from); dk <= localDay(to - 1); dk++) {
    const d = days.get(dk);
    series.push({ day: dk * DAY, visitors: d ? d.v.size : 0, sessions: d ? d.s : 0, pageviews: d ? d.p : 0 });
  }

  /* pages */
  const pm = new Map();
  for (const pg of pages.values()) {
    let r = pm.get(pg.p); if (!r) { r = { views: 0, vis: new Set(), tm: 0, tmN: 0, sc: 0, scN: 0 }; pm.set(pg.p, r); }
    r.views++; r.vis.add(pg.v);
    if (pg.hasEx) { r.tm += pg.tm; r.tmN++; r.sc += pg.sc; r.scN++; }
  }
  const pageList = [...pm.entries()].map(([p, r]) => ({ p, name: pageName(p), views: r.views, visitors: r.vis.size, avgTime: r.tmN ? Math.round(r.tm / r.tmN) : 0, avgScroll: r.scN ? Math.round(r.sc / r.scN) : 0 })).sort((a, b) => b.views - a.views).slice(0, 14);

  /* projects: opens, hovers, case-study reads, prototype launches */
  const pr = {}; Object.keys(PROJECTS).forEach((k) => { pr[k] = { name: PROJECTS[k], hover: new Set(), open: new Set(), read: new Set(), readTm: 0, readN: 0, proto: new Set() }; });
  for (const s of S) {
    for (const a of s.acts) {
      let m;
      if ((m = a.n.match(/^project:hover:([a-z]+)/)) && pr[m[1]]) pr[m[1]].hover.add(s.id);
      else if ((m = a.n.match(/^project:open:([a-z]+)/)) && pr[m[1]]) pr[m[1]].open.add(s.id);
      else if ((m = a.n.match(/^prototype:open:([a-z]+)/)) && pr[m[1]]) pr[m[1]].proto.add(s.id);
    }
    for (const p of s.pg) {
      const k = projectOf(p.p); if (k) pr[k].read.add(s.id);
      const m = p.p.match(/^\/prototypes\/([a-z]+)/); if (m && pr[m[1]]) pr[m[1]].proto.add(s.id);
    }
  }
  for (const pg of pages.values()) { const k = projectOf(pg.p); if (k && pg.hasEx) { pr[k].readTm += pg.tm; pr[k].readN++; } }
  const projects = Object.values(pr).map((r) => ({ name: r.name, hovered: r.hover.size, opened: Math.max(r.open.size, r.read.size), proto: r.proto.size, avgRead: r.readN ? Math.round(r.readTm / r.readN) : 0 })).sort((a, b) => b.opened - a.opened || b.hovered - a.hovered);

  /* actions (sessions that did it) */
  const act = new Map();
  for (const s of S) {
    const mine = new Set(s.acts.map((a) => a.n.replace(/^(slide:).*/, 'slide')).filter((n) => !/^(project:hover|section:|slide)/.test(n)));
    mine.forEach((n) => inc(act, n));
  }
  const actions = top(act, 20).filter((x) => !/^project:open/.test(x.k));
  const sections = new Map();
  for (const s of S) new Set(s.acts.filter((a) => a.n.startsWith('section:')).map((a) => a.n)).forEach((n) => inc(sections, n.slice(8)));

  /* who reached out: Email / LinkedIn / copied email / "Get in touch" */
  const reach = { email: { visits: 0, clicks: 0 }, linkedin: { visits: 0, clicks: 0 }, copy: { visits: 0, clicks: 0 }, cta: { visits: 0, clicks: 0 } };
  const rmap = { 'contact:email': 'email', 'contact:linkedin': 'linkedin', 'contact:copy-email': 'copy', 'cta:get-in-touch': 'cta' };
  for (const s of S) {
    const seenR = new Set();
    for (const a of s.acts) { const r = rmap[a.n]; if (!r) continue; reach[r].clicks++; if (!seenR.has(r)) { seenR.add(r); reach[r].visits++; } }
  }
  const rlabel = { email: 'Email', linkedin: 'LinkedIn', copy: 'Copied email', cta: 'Get in touch' };
  const contacts = S.filter((s) => s.acts.some((a) => /^contact:/.test(a.n))).sort((a, b) => b.t1 - a.t1).slice(0, 30).map((s) => {
    const what = []; s.acts.forEach((a) => { const r = rmap[a.n]; if (r && r !== 'cta' && !what.includes(rlabel[r])) what.push(rlabel[r]); });
    const when = s.acts.filter((a) => /^contact:/.test(a.n)).sort((a, b) => a.t - b.t)[0];
    return { t: when ? when.t : s.t0, c: s.c, ci: s.ci, d: s.d, b: s.b, o: s.o, src: classify(s.us || s.r), camp: s.uc || '', nv: s.nv, what, tm: s.hasTm ? s.tm : null };
  });

  /* funnel */
  const sawWork = S.filter((s) => s.acts.some((a) => a.n === 'section:work') || s.lp !== '/').length;
  const openedCase = S.filter((s) => s.acts.some((a) => /^project:open/.test(a.n)) || s.pg.some((p) => projectOf(p.p))).length;
  const openedProto = S.filter((s) => s.acts.some((a) => /^prototype:open/.test(a.n)) || s.pg.some((p) => /^\/prototypes\//.test(p.p))).length;
  const funnel = [
    { k: 'Visited the site', v: S.length },
    { k: 'Browsed the work', v: sawWork },
    { k: 'Opened a case study', v: openedCase },
    { k: 'Launched a prototype', v: openedProto },
    { k: 'Clicked a contact option', v: contactS },
  ];

  /* recent visits */
  const label = (n) => ({ 'contact:email': 'Clicked Email', 'contact:linkedin': 'Clicked LinkedIn', 'contact:copy-email': 'Copied email', 'cta:get-in-touch': 'Get in touch' }[n]
    || (n.startsWith('project:open:') ? 'Opened ' + (PROJECTS[n.slice(13)] || n.slice(13)) : null)
    || (n.startsWith('prototype:open:') ? 'Launched ' + (PROJECTS[n.slice(15)] || n.slice(15)) + ' prototype' : null)
    || (n.startsWith('outbound:') ? 'Left to ' + n.slice(9) : null));
  const recent = S.sort((a, b) => b.t1 - a.t1).slice(0, 60).map((s) => {
    const seen = [], what = [];
    s.pg.sort((a, b) => a.t - b.t).forEach((p) => { const nm = pageName(p.p); if (seen[seen.length - 1] !== nm) seen.push(nm); });
    s.acts.sort((a, b) => a.t - b.t).forEach((a) => { const l = label(a.n); if (l && !what.includes(l)) what.push(l); });
    return { t: s.t0, last: s.t1, c: s.c, ci: s.ci, d: s.d, b: s.b, o: s.o, src: classify(s.us || s.r), camp: s.uc || '', nv: s.nv, tm: s.hasTm ? s.tm : null, sc: s.sc, pages: seen, did: what };
  });

  return {
    kpis, series, hours,
    sources: top(src, 10), campaigns: top(camp, 8), countries: top(ctry, 12),
    cities: top(city, 12).map((x) => { const [c, cc] = x.k.split('|'); return { k: c, cc, v: x.v }; }),
    devices: top(dev), browsers: top(brw, 8), os: top(os, 8),
    pages: pageList, projects, actions, sections: top(sections, 6), funnel, recent, reach, contacts,
  };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (!isAuthed(req)) return res.status(401).json({ error: 'auth' });
  if (!hasRedis()) return res.status(503).json({ error: 'no-storage' });
  try {
    const q = req.query || {};
    const days = [1, 7, 30, 90].includes(parseInt(q.days, 10)) ? parseInt(q.days, 10) : 7;
    const tz = Math.max(-840, Math.min(840, parseInt(q.tz, 10) || 0));
    const now = Date.now();
    const localMid = Math.floor((now + tz * 60000) / DAY) * DAY - tz * 60000; /* start of the visitor's local day */
    const from = localMid - (days - 1) * DAY, to = now + 1;
    const wantPrev = days <= 30;
    const prevFrom = from - days * DAY;
    const start = wantPrev ? prevFrom : from;

    const keys = [];
    for (let t = start - DAY; t <= now + DAY; t += DAY) keys.push('ubad:ev:' + new Date(t).toISOString().slice(0, 10).replace(/-/g, ''));
    const uniq = [...new Set(keys)];
    const lists = await redis(uniq.map((k) => ['LRANGE', k, 0, 7999]));
    const events = [];
    for (const l of lists) for (const raw of l || []) { try { events.push(JSON.parse(raw)); } catch (e) {} }

    const cur = aggregate(events, from, to, tz, true);
    const out = { days, generated: now, from, ...cur };
    if (wantPrev) out.prev = aggregate(events, prevFrom, from, tz, false).kpis;

    /* people on the site right now (last 5 minutes) */
    const live = aggregate(events, now - 5 * 60000, to, tz, true);
    out.live = { count: live.kpis.sessions, where: live.recent.slice(0, 8).map((r) => ({ c: r.c, ci: r.ci, page: r.pages[r.pages.length - 1] || 'Home' })) };
    return res.status(200).json(out);
  } catch (e) {
    return res.status(500).json({ error: 'failed' });
  }
};
