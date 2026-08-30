import Link from "next/link";
import type { Metadata } from "next";
import Checker from "@/components/Checker";
import AdSlot from "@/components/AdSlot";
import { ShieldCheckIcon } from "@/components/Navbar";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ScamCheck — Is This a Scam? Check Websites, Messages & Emails Free",
  description:
    "Check suspicious websites, messages, emails and online offers before you trust them. Free, no sign-up scam risk checker with clear explanations.",
  alternates: { canonical: "/" },
};

const scamTypes = [
  { title: "Website Scams", href: "/website-scam-checker", desc: "Fake shops, phishing sites, and lookalike domains." },
  { title: "Message Scams", href: "/message-scam-checker", desc: "SMS, WhatsApp, and social-media message scams." },
  { title: "Email Scams", href: "/email-scam-checker", desc: "Phishing emails and business email compromise." },
  { title: "Job Scams", href: "/job-scam-checker", desc: "Fake job offers and work-from-home schemes." },
  { title: "Store Scams", href: "/online-store-checker", desc: "Fraudulent online shops and fake discounts." },
  { title: "Payment Scams", href: "/message-scam-checker", desc: "Suspicious payment and refund requests." },
];

const popularTools = [
  { title: "Website Scam Checker", href: "/website-scam-checker" },
  { title: "Phishing Checker", href: "/phishing-checker" },
  { title: "URL Checker", href: "/url-checker" },
  { title: "Screenshot Scam Checker", href: "/screenshot-scam-checker" },
];

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example-scamcheck.com";
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ScamCheck",
          url: siteUrl,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "ScamCheck",
          applicationCategory: "SecurityApplication",
          operatingSystem: "Any (Web-based)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Free tool to check suspicious websites, messages, emails and job offers for common scam warning signs.",
        }}
      />

      <section className="bg-gradient-to-b from-blue-50 to-white border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 pt-14 pb-10 text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-blue-100 p-3 mb-5">
            <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Is This a Scam?
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Check suspicious websites, messages, emails and online offers before you trust them.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 -mt-6 pb-16">
        <Checker />
      </section>

      <AdSlot placement="in-content" className="mx-auto max-w-6xl px-4 mb-12" />

      <section className="mx-auto max-w-6xl px-4 py-14 border-t border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">How It Works</h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            { step: "1", title: "Paste or upload", desc: "Paste a URL, message, email, or upload a screenshot." },
            { step: "2", title: "We analyze warning signs", desc: "Our engine checks for common scam patterns and explains what it finds." },
            { step: "3", title: "Get your risk assessment", desc: "See a clear risk score plus recommended next steps." },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                {s.step}
              </div>
              <h3 className="font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Common Scam Types We Help You Spot
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scamTypes.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Popular Tools</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {popularTools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-full border border-slate-300 px-5 py-2 text-sm font-medium text-slate-700 hover:border-blue-500 hover:text-blue-700"
            >
              {t.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-14 border-t border-slate-100">
        <div className="rounded-2xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Honest About Our Limitations</h2>
          <p className="text-slate-600">
            We don&apos;t promise perfect detection. Scam tactics change constantly, and no
            automated tool can catch everything. ScamCheck helps you spot common warning signs so
            you can make a more informed decision — it&apos;s not a guarantee, and it&apos;s not a
            replacement for your own judgment or professional advice.
          </p>
        </div>
      </section>

      <FaqSection
        items={[
          {
            q: "What is a scam checker?",
            a: "A scam checker is a tool that reviews a website, message, email, or offer for patterns commonly associated with scams — such as urgency, requests for money or codes, and suspicious links — and explains what it finds so you can decide how to proceed.",
          },
          {
            q: "How can I tell if a website is a scam?",
            a: "Look at the domain name for lookalike spelling, check whether it uses HTTPS, look for real contact information and a clear return/refund policy, and search the site name plus 'reviews' or 'scam' online. Our website checker automates several of these checks for you.",
          },
          {
            q: "Can ScamCheck guarantee that a website is safe?",
            a: "No. ScamCheck provides an informational risk assessment based on common patterns, not a guarantee. Always verify independently, especially before sending money or sharing personal information.",
          },
          {
            q: "How do I check a suspicious message?",
            a: "Paste the message text into our message checker. We'll flag common warning signs like urgency, payment requests, or requests for verification codes, and explain why each one matters.",
          },
          {
            q: "What should I do if I think I've been scammed?",
            a: "Stop all contact and payments immediately, contact your bank or payment provider if money was sent, change any shared passwords, and report the incident to your local consumer protection or cybercrime authority.",
          },
          {
            q: "Can I check a website before buying from it?",
            a: "Yes — use our Online Store Checker before entering payment details on an unfamiliar shopping site.",
          },
        ]}
      />
    </div>
  );
}
