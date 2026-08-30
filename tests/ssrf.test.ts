import { describe, it, expect } from "vitest";
import { isBlockedIPv4, isBlockedIPv6, assertSafeToFetch } from "@/lib/security/ssrf";

describe("SSRF protections", () => {
  it("blocks loopback and private IPv4 ranges", () => {
    expect(isBlockedIPv4("127.0.0.1")).toBe(true);
    expect(isBlockedIPv4("10.0.0.5")).toBe(true);
    expect(isBlockedIPv4("192.168.1.1")).toBe(true);
    expect(isBlockedIPv4("172.16.0.1")).toBe(true);
    expect(isBlockedIPv4("169.254.169.254")).toBe(true); // cloud metadata endpoint
  });

  it("allows public IPv4 addresses", () => {
    expect(isBlockedIPv4("8.8.8.8")).toBe(false);
    expect(isBlockedIPv4("1.1.1.1")).toBe(false);
  });

  it("blocks loopback and unique-local IPv6", () => {
    expect(isBlockedIPv6("::1")).toBe(true);
    expect(isBlockedIPv6("fe80::1")).toBe(true);
    expect(isBlockedIPv6("fd00::1")).toBe(true);
  });

  it("rejects non-http(s) protocols", async () => {
    const result = await assertSafeToFetch("file:///etc/passwd");
    expect(result.safe).toBe(false);
  });

  it("rejects URLs with embedded credentials", async () => {
    const result = await assertSafeToFetch("https://user:pass@example.com");
    expect(result.safe).toBe(false);
  });

  it("rejects localhost hostnames", async () => {
    const result = await assertSafeToFetch("http://localhost:3000/admin");
    expect(result.safe).toBe(false);
  });

  it("rejects direct private IP literals", async () => {
    const result = await assertSafeToFetch("http://127.0.0.1:8080/");
    expect(result.safe).toBe(false);
  });
});
