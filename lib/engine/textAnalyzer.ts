import {
  AnalysisInput,
  AnalysisResult,
  Finding,
  levelFromScore,
  STANDARD_DISCLAIMER,
} from "./types";
import { ALL_TEXT_RULES, ALL_JOB_RULES, PatternRule } from "./patterns";

function runRules(text: string, rules: PatternRule[]): Finding[] {
  const findings: Finding[] = [];
  for (const rule of rules) {
    if (rule.test.test(text)) {
      findings.push({
        id: rule.id,
        label: rule.label,
        description: rule.description,
        weight: rule.weight,
        category: rule.category,
      });
    }
  }
  return findings;
}

function checkSenderDomainMismatch(
  senderAddress: string | undefined,
  text: string
): Finding | null {
  if (!senderAddress) return null;
  const domainMatch = senderAddress.split("@")[1];
  if (!domainMatch) return null;

  const knownBrands: Record<string, string[]> = {
    paypal: ["paypal.com"],
    amazon: ["amazon.com"],
    apple: ["apple.com", "icloud.com"],
    microsoft: ["microsoft.com", "outlook.com"],
    netflix: ["netflix.com"],
  };

  const lowerText = text.toLowerCase();
  for (const [brand, domains] of Object.entries(knownBrands)) {
    if (lowerText.includes(brand)) {
      const matches = domains.some((d) => domainMatch.toLowerCase().endsWith(d));
      if (!matches) {
        return {
          id: "email-domain-mismatch",
          label: "Sender domain does not match the claimed company",
          description: `The email content references "${brand}" but the sender's domain ("${domainMatch}") does not match ${brand}'s official domain. This mismatch is a strong phishing indicator, though free/lookalike domains are sometimes used legitimately by small senders — always verify independently.`,
          weight: 22,
          category: "Impersonation",
        };
      }
    }
  }
  return null;
}

function buildRecommendations(findings: Finding[], type: string): string[] {
  const base = [
    "Don't send money or gift cards based on this message alone.",
    "Never share passwords, PINs, or one-time verification codes with anyone.",
    "Verify the sender independently using an official website or phone number you already trust — not contact info from the message itself.",
  ];
  if (findings.some((f) => f.id.startsWith("link"))) {
    base.push("Don't click links in the message. Type the official website address directly into your browser instead.");
  }
  if (type === "job") {
    base.push("Never pay money, buy equipment, or share bank details to 'start' a job.");
  }
  if (type === "email") {
    base.push("Check the sender's full email address, not just the display name.");
  }
  base.push("If you're unsure, wait and ask a trusted friend, family member, or your bank before acting.");
  return base;
}

export function analyzeText(input: AnalysisInput): AnalysisResult {
  const text = (input.text || "").trim();
  const subject = input.subject || "";
  const combinedText = [subject, text].filter(Boolean).join("\n");

  const rules = input.type === "job" ? ALL_JOB_RULES : ALL_TEXT_RULES;
  const findings = runRules(combinedText, rules);

  if (input.type === "email") {
    const mismatch = checkSenderDomainMismatch(input.senderAddress, combinedText);
    if (mismatch) findings.push(mismatch);
  }

  // De-duplicate by id and sort by weight desc
  const uniqueFindings = Array.from(
    new Map(findings.map((f) => [f.id, f])).values()
  ).sort((a, b) => b.weight - a.weight);

  let score = uniqueFindings.reduce((sum, f) => sum + f.weight, 0);

  // Diminishing returns so many small signals don't blow past 100 unfairly,
  // and a single weak signal doesn't look catastrophic.
  score = Math.round(100 * (1 - Math.exp(-score / 65)));
  score = Math.max(0, Math.min(100, score));

  if (!text) {
    score = 0;
  }

  const { level, label } = levelFromScore(score);

  const unverifiable: string[] = [];
  if (input.type === "email") {
    unverifiable.push(
      "We cannot verify SPF/DKIM/DMARC authentication results or the true originating mail server from pasted text alone."
    );
  }
  unverifiable.push(
    "We cannot confirm whether this specific sender or company is legitimate — only whether the content matches common scam patterns."
  );

  const positiveSignals: Finding[] = [];
  if (text && uniqueFindings.length === 0) {
    positiveSignals.push({
      id: "no-patterns",
      label: "No common scam patterns detected",
      description:
        "We did not detect the language patterns typically associated with scams (urgency, payment requests, credential harvesting, etc.). This does not guarantee the content is legitimate.",
      weight: 0,
      category: "General",
    });
  }

  const summary = !text
    ? "No content was provided to analyze."
    : uniqueFindings.length === 0
    ? "No common scam warning signs were detected in this content. Stay cautious regardless — scam tactics evolve constantly."
    : `${uniqueFindings.length} warning sign${uniqueFindings.length > 1 ? "s" : ""} detected. Review the details below before taking any action.`;

  return {
    type: input.type,
    score,
    level,
    levelLabel: label,
    findings: uniqueFindings,
    positiveSignals,
    unverifiable,
    recommendations: buildRecommendations(uniqueFindings, input.type),
    summary,
    disclaimer: STANDARD_DISCLAIMER,
  };
}
