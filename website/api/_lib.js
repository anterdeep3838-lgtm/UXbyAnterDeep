/* Shared helpers for the private analytics API. Files starting with "_" are not exposed as routes by Vercel. */
const crypto = require('crypto');

/* ---------- Redis (Upstash REST; works with the Vercel Marketplace integration) ---------- */
function findEnv(re, notRe) {
  for (const k of Object.keys(process.env)) {
    if (re.test(k) && !(notRe && notRe.test(k)) && process.env[k]) return process.env[k];
  }
  return '';
}
const REDIS_URL = () => findEnv(/(^|_)(KV_REST_API_URL|UPSTASH_REDIS_REST_URL)$/);
const REDIS_TOKEN = () => findEnv(/(^|_)(KV_REST_API_TOKEN|UPSTASH_REDIS_REST_TOKEN)$/, /READ_ONLY/);
const hasRedis = () => !!(REDIS_URL() && REDIS_TOKEN());

async function redis(commands) {
  const url = REDIS_URL(), token = REDIS_TOKEN();
  if (!url || !token) throw new Error('redis-not-configured');
  const r = await fetch(url.replace(/\/$/, '') + '/pipeline', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!r.ok) throw new Error('redis-' + r.status);
  const out = await r.json();
  return out.map((o) => { if (o && o.error) throw new Error(o.error); return o.result; });
}

/* ---------- auth (single owner password, signed HttpOnly cookie) ---------- */
const COOKIE = 'ubad_hq';
const DAYS = 30;
const secret = () => process.env.SESSION_SECRET || crypto.createHash('sha256').update('ubad|' + (process.env.ADMIN_PASSWORD || '')).digest('hex');
const sign = (v) => crypto.createHmac('sha256', secret()).update(v).digest('hex');

function makeToken() {
  const exp = String(Date.now() + DAYS * 864e5);
  return exp + '.' + sign(exp);
}
function parseCookies(req) {
  const out = {};
  String(req.headers.cookie || '').split(';').forEach((p) => {
    const i = p.indexOf('=');
    if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}
function safeEq(a, b) {
  const x = crypto.createHash('sha256').update(String(a)).digest();
  const y = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}
function isAuthed(req) {
  if (!process.env.ADMIN_PASSWORD) return false;
  const t = parseCookies(req)[COOKIE];
  if (!t) return false;
  const [exp, sig] = t.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEq(sig, sign(exp));
}
function cookieHeader(value, maxAge) {
  return `${COOKIE}=${value}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`;
}

/* ---------- small utils ---------- */
const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|pingdom|uptime|monitor|curl|wget|python|node-fetch|axios|go-http|java\/|vercel|pagespeed|gtmetrix|chrome-lighthouse|embedly|whatsapp\/|telegram|discord|skype|slack/i;
const isBot = (ua) => !ua || BOT.test(ua);

function parseUA(ua) {
  ua = ua || '';
  let d = 'desktop';
  if (/ipad|tablet|playbook|silk/i.test(ua) || (/android/i.test(ua) && !/mobile/i.test(ua))) d = 'tablet';
  else if (/mobi|iphone|ipod|android/i.test(ua)) d = 'mobile';
  let b = 'Other';
  if (/LinkedInApp/i.test(ua)) b = 'LinkedIn app';
  else if (/Instagram/i.test(ua)) b = 'Instagram app';
  else if (/FBAN|FBAV/i.test(ua)) b = 'Facebook app';
  else if (/Edg(e|A|iOS)?\//i.test(ua)) b = 'Edge';
  else if (/OPR\/|Opera/i.test(ua)) b = 'Opera';
  else if (/SamsungBrowser/i.test(ua)) b = 'Samsung Internet';
  else if (/Firefox|FxiOS/i.test(ua)) b = 'Firefox';
  else if (/Chrome|CriOS/i.test(ua)) b = 'Chrome';
  else if (/Safari/i.test(ua)) b = 'Safari';
  let o = 'Other';
  if (/Windows/i.test(ua)) o = 'Windows';
  else if (/iPhone|iPad|iPod/i.test(ua)) o = 'iOS';
  else if (/Android/i.test(ua)) o = 'Android';
  else if (/CrOS/i.test(ua)) o = 'ChromeOS';
  else if (/Mac OS X|Macintosh/i.test(ua)) o = 'macOS';
  else if (/Linux/i.test(ua)) o = 'Linux';
  return { d, b, o };
}

const dayKey = (ms) => 'ubad:ev:' + new Date(ms).toISOString().slice(0, 10).replace(/-/g, '');

module.exports = { redis, hasRedis, makeToken, isAuthed, cookieHeader, COOKIE, safeEq, isBot, parseUA, dayKey, DAYS };
