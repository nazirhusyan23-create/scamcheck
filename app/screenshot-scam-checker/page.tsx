import type { Metadata } from "next";
import Link from "next/link";
import Checker from "@/components/Checker";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Screenshot Scam Checker — Analyze a Screenshot for Scam Signs",
  description:
    "Upload a screenshot of a WhatsApp, SMS, email, or social-media message. We extract the text in your browser and check it for scam warning signs.",
  alternates: { canonical: "/screenshot-scam-checker" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Screenshot Scam Checker", href: "/screenshot-scam-checker" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8 pb-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Screenshot Scam Checker
        </h1>
        <p className="mt-3 text-slate-600">
          Upload a screenshot — we extract the text in your browser, you review it, then we check
          it for warning signs.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <Checker defaultTab="screenshot" />
      </section>

      <AdSlot placement="in-content" className="mx-auto max-w-3xl px-4 mb-10" />

      <article className="mx-auto max-w-3xl px-4 pb-16 prose prose-slate">
        <h2>How screenshot checking works</h2>
        <p>
          When you upload an image, text is extracted directly in your browser using on-device
          optical character recognition (OCR) — the image file itself is never uploaded to our
          servers. You can review and edit the extracted text before it&apos;s analyzed, since OCR
          isn&apos;t always perfect.
        </p>
        <p>
          This works well for WhatsApp and SMS screenshots, email screenshots, and social-media
          messages or job offers. If OCR can&apos;t read the image clearly (low resolution, unusual
          fonts, or a photo taken at an angle), you can simply type or paste the text manually — the
          analysis works the same way either way.
        </p>
        <p>
          Prefer to paste text directly? Use our{" "}
          <Link href="/message-scam-checker">Message Scam Checker</Link> instead.
        </p>
      </article>

      <FaqSection
        title="Screenshot Checker FAQ"
        items={[
          {
            q: "Is my screenshot uploaded to your servers?",
            a: "No. Text extraction happens locally in your browser. Only the extracted text is sent to our server for the risk analysis step, and it isn't permanently stored.",
          },
          {
            q: "What image formats are supported?",
            a: "PNG, JPEG, and WEBP, up to 8MB per file.",
          },
          {
            q: "What if the text extraction doesn't work well?",
            a: "You can review and manually correct the extracted text, or type it in yourself, before running the check.",
          },
        ]}
      />
    </div>
  );
}
