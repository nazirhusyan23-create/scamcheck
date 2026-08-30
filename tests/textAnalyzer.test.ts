import { describe, it, expect } from "vitest";
import { analyzeText } from "@/lib/engine/textAnalyzer";

describe("analyzeText", () => {
  it("returns zero score for empty input", () => {
    const result = analyzeText({ type: "message", text: "" });
    expect(result.score).toBe(0);
    expect(result.findings.length).toBe(0);
  });

  it("flags gift card requests as high risk", () => {
    const result = analyzeText({
      type: "message",
      text: "Please send me the gift card code immediately to avoid your account being suspended today.",
    });
    expect(result.findings.some((f) => f.id === "money-giftcard")).toBe(true);
    expect(result.score).toBeGreaterThan(35);
    expect(["caution", "suspicious", "high_risk"]).toContain(result.level);
  });

  it("flags OTP sharing requests", () => {
    const result = analyzeText({
      type: "message",
      text: "We noticed unusual activity. Please reply with the verification code to verify your account.",
    });
    expect(result.findings.some((f) => f.id === "cred-otp" || f.id === "urgency-account-threat")).toBe(
      true
    );
  });

  it("does not flag a neutral, benign message", () => {
    const result = analyzeText({
      type: "message",
      text: "Hey, are we still on for lunch tomorrow at noon?",
    });
    expect(result.findings.length).toBe(0);
    expect(result.score).toBe(0);
  });

  it("detects job-specific equipment-purchase scam pattern", () => {
    const result = analyzeText({
      type: "job",
      text: "Congratulations! You are hired immediately. You must purchase equipment from our approved supplier before starting.",
    });
    expect(result.findings.some((f) => f.id === "job-equipment-purchase")).toBe(true);
  });

  it("flags sender/domain mismatch for email checks", () => {
    const result = analyzeText({
      type: "email",
      text: "Please verify your PayPal account immediately by clicking the link below.",
      senderAddress: "support@totally-not-paypal.ru",
    });
    expect(result.findings.some((f) => f.id === "email-domain-mismatch")).toBe(true);
  });

  it("caps score at 100", () => {
    const result = analyzeText({
      type: "message",
      text:
        "URGENT: your account will be suspended today. Send bitcoin now and reply with your OTP code and password to verify immediately. Click here to verify. Guaranteed 500% returns! You have won the lottery, pay a small fee to claim your prize using a gift card code.",
    });
    expect(result.score).toBeLessThanOrEqual(100);
    expect(result.level).toBe("high_risk");
  });
});
