export type CheckType = "url" | "message" | "email" | "job" | "store" | "screenshot";

export type RiskLevel =
  | "low"
  | "probably_safe"
  | "caution"
  | "suspicious"
  | "high_risk";

export interface Finding {
  id: string;
  label: string;
  description: string;
  weight: number; // points added to risk score (0-100 scale contribution)
  category: string;
}

export interface AnalysisInput {
  type: CheckType;
  // Generic text payload (message body, email body, job description, etc.)
  text?: string;
  // URL-specific
  url?: string;
  // Email-specific
  senderAddress?: string;
  subject?: string;
}

export interface AnalysisResult {
  type: CheckType;
  score: number; // 0-100
  level: RiskLevel;
  levelLabel: string;
  findings: Finding[];
  positiveSignals: Finding[];
  unverifiable: string[]; // things we could not check, stated honestly
  recommendations: string[];
  summary: string;
  disclaimer: string;
}

export function levelFromScore(score: number): { level: RiskLevel; label: string } {
  if (score <= 20) return { level: "low", label: "Low Risk" };
  if (score <= 40) return { level: "probably_safe", label: "Probably Safe" };
  if (score <= 60) return { level: "caution", label: "Caution" };
  if (score <= 80) return { level: "suspicious", label: "Suspicious" };
  return { level: "high_risk", label: "High Risk" };
}

export const STANDARD_DISCLAIMER =
  "This is an automated, informational risk assessment based on common scam patterns. It is not a guarantee, legal determination, or professional security certification. Always verify independently before sending money or sharing personal information.";
