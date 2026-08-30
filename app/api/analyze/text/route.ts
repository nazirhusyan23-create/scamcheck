import { NextRequest, NextResponse } from "next/server";
import { analyzeText } from "@/lib/engine/textAnalyzer";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";
import { CheckType } from "@/lib/engine/types";

const VALID_TYPES: CheckType[] = ["message", "email", "job"];
const MAX_TEXT_LENGTH = 8000;

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

    const { type, text, subject, senderAddress } = (body || {}) as Record<string, unknown>;

    if (typeof type !== "string" || !VALID_TYPES.includes(type as CheckType)) {
      return NextResponse.json({ error: "Invalid check type." }, { status: 400 });
    }
    if (typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json({ error: "Please provide some text to analyze." }, { status: 400 });
    }
    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: `Text is too long. Please limit to ${MAX_TEXT_LENGTH} characters.` },
        { status: 400 }
      );
    }
    if (subject !== undefined && typeof subject !== "string") {
      return NextResponse.json({ error: "Invalid subject field." }, { status: 400 });
    }
    if (senderAddress !== undefined && typeof senderAddress !== "string") {
      return NextResponse.json({ error: "Invalid sender field." }, { status: 400 });
    }

    const result = analyzeText({
      type: type as CheckType,
      text: text.slice(0, MAX_TEXT_LENGTH),
      subject: typeof subject === "string" ? subject.slice(0, 300) : undefined,
      senderAddress: typeof senderAddress === "string" ? senderAddress.slice(0, 300) : undefined,
    });

    // No persistent storage: the request body is processed in-memory only
    // and discarded once this function returns.
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while analyzing this content. Please try again." },
      { status: 500 }
    );
  }
}
