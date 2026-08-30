import { describe, it, expect } from "vitest";
import { checkRateLimit } from "@/lib/rateLimit";

describe("checkRateLimit", () => {
  it("allows requests within the limit", () => {
    const id = `test-user-${Math.random()}`;
    for (let i = 0; i < 12; i++) {
      const { allowed } = checkRateLimit(id);
      expect(allowed).toBe(true);
    }
  });

  it("blocks requests beyond the limit within the same window", () => {
    const id = `test-user-${Math.random()}`;
    for (let i = 0; i < 12; i++) checkRateLimit(id);
    const { allowed } = checkRateLimit(id);
    expect(allowed).toBe(false);
  });

  it("tracks separate identifiers independently", () => {
    const idA = `a-${Math.random()}`;
    const idB = `b-${Math.random()}`;
    for (let i = 0; i < 12; i++) checkRateLimit(idA);
    expect(checkRateLimit(idA).allowed).toBe(false);
    expect(checkRateLimit(idB).allowed).toBe(true);
  });
});
