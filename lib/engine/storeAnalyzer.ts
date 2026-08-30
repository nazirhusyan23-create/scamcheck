import { analyzeUrl } from "./urlAnalyzer";
import { AnalysisResult } from "./types";

/**
 * The store checker reuses the URL structural analysis (a store is still a
 * website) and adds store-specific guidance. We deliberately do NOT invent
 * signals we can't verify (return policy, real contact info, payment
 * processor legitimacy) — instead we return a checklist for the user.
 */
export function analyzeStore(rawUrl: string): AnalysisResult {
  const base = analyzeUrl(rawUrl);
  return {
    ...base,
    type: "store",
    unverifiable: [
      ...base.unverifiable,
      "We cannot verify the store's real return/refund policy, business registration, or whether products are ever actually shipped.",
    ],
    recommendations: [
      "Look for a clear, specific return/refund policy — not a vague or missing one.",
      "Check for real contact information: a working email, and ideally a phone number or physical address.",
      "Be cautious of discounts that seem too large (e.g. 80-90% off everything).",
      "Search the store name plus 'reviews' or 'scam' on a search engine.",
      "Pay with a credit card or trusted payment method that offers buyer protection — avoid direct bank transfers to unfamiliar stores.",
      "Check if the store existed more than a few weeks ago using a search engine.",
    ],
  };
}
