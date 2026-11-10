import "server-only";
// Prosty limiter w pamięci procesu (wystarczający dla pojedynczej instancji;
// przy wielu instancjach zastąp np. Upstash/Redis).
const hits = new Map<string, { n: number; reset: number }>();
export function rateLimit(key: string, limit = 8, windowMs = 10 * 60_000) {
  const now = Date.now();
  const h = hits.get(key);
  if (!h || h.reset < now) {
    hits.set(key, { n: 1, reset: now + windowMs });
    if (hits.size > 5000) for (const [k, v] of hits) if (v.reset < now) hits.delete(k);
    return true;
  }
  h.n++;
  return h.n <= limit;
}
