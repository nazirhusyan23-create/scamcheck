import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIdentifier } from "@/lib/rateLimit";

const MAX_LEN = 4000;

function isConfigured(): boolean {
  // Wire this up to your real provider (Resend, Postmark, SES, etc.) using
  // server-side environment variables. See README "Contact form setup".
  return Boolean(process.env.CONTACT_FORM_PROVIDER_API_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const identifier = getClientIdentifier(req.headers);
    const { allowed } = checkRateLimit(identifier);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, message } = (body || {}) as Record<string, unknown>;

    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
    }
    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
    }
    if (name.length > 200 || email.length > 200 || message.length > MAX_LEN) {
      return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
    }

    if (!isConfigured()) {
      // Honest failure: we do NOT pretend to send an email when no provider
      // is configured. The site owner must configure a provider (see
      // README) before this form will actually deliver messages.
      return NextResponse.json(
        {
          error:
            "The contact form isn't fully set up yet on this deployment (no email provider configured). Please try again later.",
        },
        { status: 503 }
      );
    }

    // Integration point: send via your configured provider here, e.g.
    // await resend.emails.send({ ... })
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong while sending your message. Please try again." },
      { status: 500 }
    );
  }
}
