import { AnalysisInput, AnalysisResult } from "./types";

/**
 * Optional AI enhancement layer.
 *
 * The product works fully with the local rule engine (see textAnalyzer.ts /
 * urlAnalyzer.ts) with NO API key required. If ANTHROPIC_API_KEY (or another
 * provider key) is set as a server-side environment variable, this module
 * can be extended to call that provider to add nuance to the local
 * rule-based findings (e.g. catching phrasing the regex rules miss).
 *
 * IMPORTANT:
 * - This file must only ever run on the server. Never import it in a
 *   client component.
 * - API keys must only be read from process.env on the server, never
 *   embedded in client bundles.
 * - The AI layer should ENHANCE, not replace, the local engine, so the
 *   product still works with zero external dependencies out of the box.
 */

export function isAiEngineConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export interface AiEnhancement {
  extraNotes: string[];
}

/**
 * Placeholder hook for AI-assisted analysis. Returns null when no provider
 * key is configured so callers can safely fall back to the local engine's
 * result untouched.
 */
export async function tryAiEnhance(
  // Parameters are intentionally unused in this placeholder implementation —
  // see the integration note below.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  input: AnalysisInput,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  localResult: AnalysisResult
): Promise<AiEnhancement | null> {
  if (!isAiEngineConfigured()) return null;

  // Intentionally left as an integration point. When ready, implement a
  // server-side fetch to your AI provider's completions endpoint here,
  // send only the already-pasted user text plus the local findings, and
  // map the response into extraNotes. Wrap in try/catch and fail closed
  // (return null) on any error so the local engine result is always
  // returned to the user.
  return null;
}
