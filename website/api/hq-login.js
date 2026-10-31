/* Owner sign-in for the private stats page.
   GET    -> { configured, authed }
   POST   -> { password } sets a signed HttpOnly cookie
   DELETE -> sign out */
const crypto = require('crypto');
const { redis, hasRedis, makeToken, isAuthed, cookieHeader, safeEq, DAYS } = require('./_lib');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  const configured = !!process.env.ADMIN_PASSWORD;

  if (req.method === 'GET') {
    return res.status(200).json({ configured, storage: hasRedis(), authed: isAuthed(req) });
  }
  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', cookieHeader('', 0));
    return res.status(200).json({ ok: true });
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
  if (!configured) return res.status(503).json({ error: 'not-configured' });

  const origin = req.headers.origin;
  if (origin) { try { if (new URL(origin).host !== req.headers.host) return res.status(403).json({ error: 'origin' }); } catch (e) { return res.status(403).json({ error: 'origin' }); } }

  let body = req.body;
  if (Buffer.isBuffer(body)) body = body.toString('utf8');
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  const pw = body && typeof body.password === 'string' ? body.password : '';

  /* simple brute-force guard: 8 tries per 15 minutes per visitor */
  let rlKey = null;
  if (hasRedis()) {
    try {
      const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'x';
      rlKey = 'ubad:rl:' + crypto.createHash('sha256').update(ip).digest('hex').slice(0, 20);
      const [n] = await redis([['INCR', rlKey], ['EXPIRE', rlKey, 900]]);
      if (n > 8) return res.status(429).json({ error: 'too-many' });
    } catch (e) { /* storage hiccup: fall through to the delay below */ }
  }
  await sleep(350);

  if (!pw || !safeEq(pw, process.env.ADMIN_PASSWORD)) return res.status(401).json({ error: 'wrong' });

  if (rlKey) { try { await redis([['DEL', rlKey]]); } catch (e) {} }
  res.setHeader('Set-Cookie', cookieHeader(makeToken(), DAYS * 86400));
  return res.status(200).json({ ok: true });
};
