// Lightweight in-memory rate limiter. Suitable for a single-instance
// deployment. For multi-instance/serverless deployments at scale, replace
// this with a shared store (e.g. Redis/Upstash) — see README.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 12; // requests per window per identifier

// Periodically clear stale buckets so the map doesn't grow unbounded.
setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}, 5 * 60 * 1000).unref?.();

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const bucket = buckets.get(identifier);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  bucket.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - bucket.count };
}

export function getClientIdentifier(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
