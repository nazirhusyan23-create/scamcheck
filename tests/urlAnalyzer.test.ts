import { describe, it, expect } from "vitest";
import { analyzeUrl } from "@/lib/engine/urlAnalyzer";

describe("analyzeUrl", () => {
  it("returns zero score for empty input", () => {
    const result = analyzeUrl("");
    expect(result.score).toBe(0);
  });

  it("flags non-HTTPS URLs", () => {
    const result = analyzeUrl("http://example.com");
    expect(result.findings.some((f) => f.id === "no-https")).toBe(true);
  });

  it("flags raw IP-address URLs", () => {
    const result = analyzeUrl("http://192.168.1.100/login");
    expect(result.findings.some((f) => f.id === "ip-address-url")).toBe(true);
  });

  it("flags excessive subdomains", () => {
    const result = analyzeUrl("https://secure.login.account.verify.example.com");
    expect(result.findings.some((f) => f.id === "excessive-subdomains")).toBe(true);
  });

  it("flags known URL shorteners", () => {
    const result = analyzeUrl("https://bit.ly/abc123");
    expect(result.findings.some((f) => f.id === "url-shortener")).toBe(true);
  });

  it("flags high-risk TLDs", () => {
    const result = analyzeUrl("https://free-prize-winner.top");
    expect(result.findings.some((f) => f.id === "high-risk-tld")).toBe(true);
  });

  it("gives a clean result for a simple HTTPS domain", () => {
    const result = analyzeUrl("https://www.example.com");
    expect(result.findings.length).toBe(0);
    expect(result.level).toBe("low");
  });

  it("handles malformed input without throwing", () => {
    expect(() => analyzeUrl("not a url at all !!!")).not.toThrow();
  });
});
