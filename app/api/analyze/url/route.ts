import { NextRequest, NextResponse } from "next/server";
import { analyzeUrl } from "@/lib/engine/urlAnalyzer";
import { analyzeStore } from "@/lib/engine/storeAnalyzer";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";

const MAX_URL_LENGTH = 2048;

export async function POST(req: NextRequest) {
  try {
    const identifier = getClientIdentifier(req.headers);
    const { allowed } = checkRateLimit(identifier);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many checks in a short time. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { url, mode } = (body || {}) as Record<string, unknown>;

    if (typeof url !== "string" || url.trim().length === 0) {
      return NextResponse.json({ error: "Please provide a URL to analyze." }, { status: 400 });
    }
    if (url.length > MAX_URL_LENGTH) {
      return NextResponse.json({ error: "URL is too long." }, { status: 400 });
    }

    // NOTE: This analyzer performs purely local, offline structural checks.
    // It intentionally does NOT fetch the target URL server-side for the
    // MVP, which avoids SSRF risk entirely. If live fetching is added later,
    // it must go through lib/security/ssrf.ts's assertSafeToFetch() first.
    const result = mode === "store" ? analyzeStore(url.trim()) : analyzeUrl(url.trim());

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while analyzing this content. Please try again." },
      { status: 500 }
    );
  }
}
