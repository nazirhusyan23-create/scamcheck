import { describe, it, expect } from "vitest";
import { levelFromScore } from "@/lib/engine/types";

describe("levelFromScore", () => {
  it("returns Low Risk for scores 0-20", () => {
    expect(levelFromScore(0).label).toBe("Low Risk");
    expect(levelFromScore(20).label).toBe("Low Risk");
  });

  it("returns Probably Safe for scores 21-40", () => {
    expect(levelFromScore(21).label).toBe("Probably Safe");
    expect(levelFromScore(40).label).toBe("Probably Safe");
  });

  it("returns Caution for scores 41-60", () => {
    expect(levelFromScore(41).label).toBe("Caution");
    expect(levelFromScore(60).label).toBe("Caution");
  });

  it("returns Suspicious for scores 61-80", () => {
    expect(levelFromScore(61).label).toBe("Suspicious");
    expect(levelFromScore(80).label).toBe("Suspicious");
  });

  it("returns High Risk for scores 81-100", () => {
    expect(levelFromScore(81).label).toBe("High Risk");
    expect(levelFromScore(100).label).toBe("High Risk");
  });
});
