import type { Metadata } from "next";
import Link from "next/link";
import Checker from "@/components/Checker";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Email Scam Checker — Is This Email a Phishing Attempt?",
  description:
    "Paste an email's subject, sender, and body to check for phishing patterns, sender/domain mismatches, and other common scam email warning signs.",
  alternates: { canonical: "/email-scam-checker" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Email Scam Checker", href: "/email-scam-checker" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8 pb-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Email Scam Checker
        </h1>
        <p className="mt-3 text-slate-600">
          Paste the sender address, subject, and body of a suspicious email to check it for
          phishing warning signs.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <Checker defaultTab="email" />
      </section>

      <AdSlot placement="in-content" className="mx-auto max-w-3xl px-4 mb-10" />

      <article className="mx-auto max-w-3xl px-4 pb-16 prose prose-slate">
        <h2>How to identify a phishing email</h2>
        <p>
          Phishing emails aim to either steal your login details or trick you into an unwanted
          payment. A few checks catch the majority of them:
        </p>
        <ol>
          <li>
            <strong>Check the actual sender address</strong>, not just the display name. A message
            that says &quot;PayPal Support&quot; but comes from a random domain is a major red
            flag.
          </li>
          <li>
            <strong>Hover over links before clicking</strong> to see where they actually lead — the
            visible text and the real destination often don&apos;t match.
          </li>
          <li>
            <strong>Be suspicious of urgency</strong>: account suspension threats, invoice
            &quot;overdue&quot; notices, and limited-time offers are common triggers.
          </li>
          <li>
            <strong>Never enter your password after clicking an email link</strong> — go to the
            official site directly instead.
          </li>
        </ol>
        <p>
          Our checker analyzes the subject and body for these patterns and, when you provide a
          sender address, checks whether it&apos;s consistent with any well-known brand mentioned
          in the message. We&apos;re explicit that we can&apos;t verify full email authentication
          (SPF/DKIM/DMARC) from pasted text — that requires the original email headers, which this
          tool doesn&apos;t process.
        </p>
        <p>
          For scams delivered by text or chat instead, see our{" "}
          <Link href="/message-scam-checker">Message Scam Checker</Link>, or read our full guide:{" "}
          <Link href="/guides/how-to-identify-a-phishing-email">
            How to Identify a Phishing Email
          </Link>
          .
        </p>
      </article>

      <FaqSection
        title="Email Checker FAQ"
        items={[
          {
            q: "Can this tool verify SPF/DKIM/DMARC authentication?",
            a: "No. Those checks require the email's raw headers, which this tool doesn't process. We check the visible content and sender address you paste in instead.",
          },
          {
            q: "Is my email content stored?",
            a: "No. Email text is analyzed and not permanently stored.",
          },
          {
            q: "What if I already clicked a link or entered my password?",
            a: "Change that password immediately (and anywhere else you reused it), enable two-factor authentication if available, and monitor the account for unusual activity.",
          },
        ]}
      />
    </div>
  );
}
