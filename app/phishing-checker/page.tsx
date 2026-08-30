import type { Metadata } from "next";
import Link from "next/link";
import Checker from "@/components/Checker";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Phishing Checker — Check Links, Emails & Messages for Phishing",
  description:
    "Check a suspicious link, email, or message for phishing warning signs like credential-harvesting language, lookalike domains, and urgency tactics.",
  alternates: { canonical: "/phishing-checker" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Phishing Checker", href: "/phishing-checker" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8 pb-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Phishing Checker
        </h1>
        <p className="mt-3 text-slate-600">
          Check a suspicious link, email, or message for the tell-tale signs of phishing.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <Checker defaultTab="url" />
      </section>

      <AdSlot placement="in-content" className="mx-auto max-w-3xl px-4 mb-10" />

      <article className="mx-auto max-w-3xl px-4 pb-16 prose prose-slate">
        <h2>What is phishing?</h2>
        <p>
          Phishing is an attempt to trick you into handing over sensitive information — passwords,
          verification codes, or payment details — usually by impersonating a trusted brand,
          service, or person. It can arrive as an email, text message, social media DM, or a fake
          website you&apos;re directed to.
        </p>
        <h3>Warning signs to check for</h3>
        <ul>
          <li>A link that doesn&apos;t match the company it claims to be from</li>
          <li>Urgent language pushing you to &quot;verify&quot; or &quot;confirm&quot; your account</li>
          <li>A request to enter your password or a one-time code after clicking a link</li>
          <li>Slightly misspelled domain names designed to look like a real brand</li>
          <li>A generic greeting instead of your actual name on an account-related message</li>
        </ul>
        <p>
          Paste a link above to run it through our structural URL check, or switch to the{" "}
          <strong>Message</strong> or <strong>Email</strong> tab to check the wording itself. See
          also our related tools: <Link href="/url-checker">URL Checker</Link>,{" "}
          <Link href="/email-scam-checker">Email Scam Checker</Link>, and our guide on{" "}
          <Link href="/guides/phishing-warning-signs">Phishing Warning Signs</Link>.
        </p>
      </article>

      <FaqSection
        title="Phishing Checker FAQ"
        items={[
          {
            q: "I clicked a phishing link but didn't enter anything — am I at risk?",
            a: "In most cases simply visiting a link is low-risk, but it's still wise to run a security scan on your device and avoid downloading anything the site prompted.",
          },
          {
            q: "How is phishing different from a general scam?",
            a: "Phishing specifically aims to steal credentials or personal data through impersonation, often as a first step toward a larger scam like account takeover or financial fraud.",
          },
        ]}
      />
    </div>
  );
}
