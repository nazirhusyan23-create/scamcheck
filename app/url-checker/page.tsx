import type { Metadata } from "next";
import Link from "next/link";
import Checker from "@/components/Checker";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "URL Checker — Analyze Any Web Address for Warning Signs",
  description:
    "Paste any URL to get a structural analysis: HTTPS status, domain format, suspicious characters, IP-address URLs, shorteners, and more.",
  alternates: { canonical: "/url-checker" },
};

const signals = [
  { title: "HTTPS", desc: "Whether the site uses a secure connection." },
  { title: "Domain format", desc: "Unusual characters, punycode, or lookalike spelling." },
  { title: "Subdomains", desc: "An unusually large number of subdomain segments." },
  { title: "URL length", desc: "Very long addresses that may hide parameters." },
  { title: "IP-address URLs", desc: "A raw IP address used instead of a domain name." },
  { title: "Shorteners", desc: "Shortened links that hide the real destination." },
  { title: "TLD patterns", desc: "Domain endings statistically linked to higher abuse rates." },
  { title: "Suspicious keywords", desc: "Words like 'verify', 'secure', or 'login' stacked in the path." },
];

export default function Page() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "URL Checker", href: "/url-checker" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8 pb-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">URL Checker</h1>
        <p className="mt-3 text-slate-600">
          Get a plain-English structural breakdown of any web address.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <Checker defaultTab="url" />
      </section>

      <AdSlot placement="in-content" className="mx-auto max-w-3xl px-4 mb-10" />

      <article className="mx-auto max-w-3xl px-4 pb-16 prose prose-slate">
        <h2>What our URL checker looks at</h2>
        <p>
          This tool performs a purely structural analysis of the address itself — it does not
          fabricate information like domain age or ownership records it hasn&apos;t actually
          verified. Here&apos;s what it checks:
        </p>
        <div className="not-prose grid gap-3 sm:grid-cols-2">
          {signals.map((s) => (
            <div key={s.title} className="rounded-lg border border-slate-200 p-4">
              <p className="font-semibold text-slate-900 text-sm">{s.title}</p>
              <p className="text-sm text-slate-600 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6">
          Buying something specific? Use the{" "}
          <Link href="/online-store-checker">Online Store Checker</Link> for shopping-specific
          guidance on top of this same analysis. See also{" "}
          <Link href="/guides/how-to-check-if-a-website-is-a-scam">
            how to check if a website is a scam
          </Link>
          .
        </p>
      </article>

      <FaqSection
        title="URL Checker FAQ"
        items={[
          {
            q: "Does this tool visit the website?",
            a: "No. This checker analyzes only the structure of the web address you type in — it does not load or fetch the destination page.",
          },
          {
            q: "Can a URL with no warning signs still be unsafe?",
            a: "Yes. Structural checks catch common patterns but can't verify everything about a site's content or intent. Treat a clean result as one positive data point, not a guarantee.",
          },
        ]}
      />
    </div>
  );
}
