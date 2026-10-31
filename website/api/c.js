/* Collects page-view and page-exit beacons. Stores no IP address and sets no cookie. */
const { redis, hasRedis, isBot, parseUA, dayKey } = require('./_lib');

const ID = /^[a-z0-9]{6,16}$/;
const str = (v, n) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f<>]/g, '').slice(0, n) : '');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  const done = () => res.status(204).end();
  if (req.method !== 'POST' || !hasRedis()) return done();
  try {
    /* same-site beacons only */
    const origin = req.headers.origin;
    if (origin) { try { if (new URL(origin).host !== req.headers.host) return done(); } catch (e) { return done(); } }

    const ua = req.headers['user-agent'] || '';
    if (isBot(ua)) return done();

    let b = req.body;
    if (Buffer.isBuffer(b)) b = b.toString('utf8');
    if (typeof b === 'string') { if (b.length > 5000) return done(); b = JSON.parse(b); }
    if (!b || typeof b !== 'object') return done();
    if (!ID.test(b.v || '') || !ID.test(b.s || '') || !ID.test(b.pid || '')) return done();
    if (b.k !== 'pv' && b.k !== 'ex') return done();

    const now = Date.now();
    const rec = { t: now, k: b.k, v: b.v, s: b.s, pid: b.pid, p: str(b.p, 90) || '/' };

    if (b.k === 'pv') {
      const h = req.headers;
      let city = '';
      try { city = decodeURIComponent(h['x-vercel-ip-city'] || ''); } catch (e) { city = h['x-vercel-ip-city'] || ''; }
      const u = parseUA(ua);
      Object.assign(rec, {
        c: str(h['x-vercel-ip-country'] || '', 2).toUpperCase(),
        rg: str(h['x-vercel-ip-country-region'] || '', 12),
        ci: str(city, 40),
        d: u.d, b: u.b, o: u.o,
        nv: b.nv ? 1 : 0,
        r: str(b.r, 80), us: str(b.us, 40), um: str(b.um, 40), uc: str(b.uc, 60),
        w: Math.min(10000, Math.max(0, parseInt(b.w, 10) || 0)),
        lg: str(b.lg, 8),
      });
    } else {
      rec.tm = Math.min(1800000, Math.max(0, parseInt(b.tm, 10) || 0));
      rec.sc = Math.min(100, Math.max(0, parseInt(b.sc, 10) || 0));
      if (Array.isArray(b.a)) {
        rec.a = b.a.slice(0, 40).map((x) => ({ n: str(x && x.n, 60), t: Math.min(86400, Math.max(0, parseInt(x && x.t, 10) || 0)) })).filter((x) => x.n);
      }
    }

    const key = dayKey(now);
    const cmds = [['LPUSH', key, JSON.stringify(rec)], ['EXPIRE', key, 34560000]];
    if (Math.random() < 0.03) cmds.push(['LTRIM', key, 0, 19999]);
    await redis(cmds);
  } catch (e) { /* never break the visitor's page */ }
  return done();
};
