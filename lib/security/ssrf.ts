import dns from "node:dns/promises";
import net from "node:net";

// Blocks private, loopback, link-local, and other internal IP ranges to
// prevent server-side request forgery (SSRF) if/when live fetching is enabled.

const BLOCKED_V4_RANGES: Array<[string, number]> = [
  ["0.0.0.0", 8],
  ["10.0.0.0", 8],
  ["100.64.0.0", 10],
  ["127.0.0.0", 8],
  ["169.254.0.0", 16],
  ["172.16.0.0", 12],
  ["192.0.0.0", 24],
  ["192.0.2.0", 24],
  ["192.168.0.0", 16],
  ["198.18.0.0", 15],
  ["198.51.100.0", 24],
  ["203.0.113.0", 24],
  ["224.0.0.0", 4],
  ["240.0.0.0", 4],
];

function ipToLong(ip: string): number {
  return ip
    .split(".")
    .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

function isInRange(ip: string, base: string, bits: number): boolean {
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (ipToLong(ip) & mask) === (ipToLong(base) & mask);
}

export function isBlockedIPv4(ip: string): boolean {
  if (!net.isIPv4(ip)) return false;
  return BLOCKED_V4_RANGES.some(([base, bits]) => isInRange(ip, base, bits));
}

export function isBlockedIPv6(ip: string): boolean {
  if (!net.isIPv6(ip)) return false;
  const lower = ip.toLowerCase();
  return (
    lower === "::1" ||
    lower.startsWith("fe80:") || // link-local
    lower.startsWith("fc") ||
    lower.startsWith("fd") || // unique local
    lower === "::"
  );
}

export interface SsrfCheckResult {
  safe: boolean;
  reason?: string;
}

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Validates that a URL is safe to fetch server-side: correct protocol,
 * no credentials embedded, resolves to a public IP address (not internal
 * infrastructure), and is not an obvious localhost alias.
 */
export async function assertSafeToFetch(rawUrl: string): Promise<SsrfCheckResult> {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { safe: false, reason: "Not a valid URL." };
  }

  if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
    return { safe: false, reason: "Only http/https URLs are supported." };
  }

  if (parsed.username || parsed.password) {
    return { safe: false, reason: "URLs with embedded credentials are not allowed." };
  }

  const hostname = parsed.hostname.toLowerCase();
  const localHostNames = ["localhost", "localhost.localdomain", "0.0.0.0", "metadata.google.internal"];
  if (localHostNames.includes(hostname)) {
    return { safe: false, reason: "Local/internal hostnames are not allowed." };
  }

  if (net.isIP(hostname)) {
    if (isBlockedIPv4(hostname) || isBlockedIPv6(hostname)) {
      return { safe: false, reason: "Requests to internal/private IP addresses are not allowed." };
    }
    return { safe: true };
  }

  try {
    const records = await dns.lookup(hostname, { all: true, verbatim: true });
    for (const rec of records) {
      if (rec.family === 4 && isBlockedIPv4(rec.address)) {
        return { safe: false, reason: "Domain resolves to an internal/private IP address." };
      }
      if (rec.family === 6 && isBlockedIPv6(rec.address)) {
        return { safe: false, reason: "Domain resolves to an internal/private IP address." };
      }
    }
  } catch {
    return { safe: false, reason: "Unable to resolve this domain." };
  }

  return { safe: true };
}
