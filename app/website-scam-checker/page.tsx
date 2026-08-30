import type { Metadata } from "next";
import Link from "next/link";
import Checker from "@/components/Checker";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Website Scam Checker — Is This Website a Scam or Legit?",
  description:
    "Free website scam checker. Paste any URL to check for phishing patterns, lookalike domains, missing HTTPS, and other common scam warning signs.",
  alternates: { canonical: "/website-scam-checker" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Website Scam Checker", href: "/website-scam-checker" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8 pb-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Website Scam Checker
        </h1>
        <p className="mt-3 text-slate-600">
          Paste a website address below to check it for common scam and phishing warning signs —
          no sign-up required.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <Checker defaultTab="url" />
      </section>

      <AdSlot placement="in-content" className="mx-auto max-w-3xl px-4 mb-10" />

      <article className="mx-auto max-w-3xl px-4 pb-16 prose prose-slate">
        <h2>How to tell if a website is a scam</h2>
        <p>
          Fake and fraudulent websites have gotten much harder to spot on sight — modern scam
          sites often copy the design of legitimate brands almost perfectly. Instead of judging a
          site purely by how it looks, it helps to check a combination of structural and content
          signals:
        </p>
        <ul>
          <li>
            <strong>The domain name itself.</strong> Scam sites frequently use a domain that is
            close to, but not exactly, a well-known brand&apos;s real domain (for example, adding
            an extra word or using a different, unfamiliar ending).
          </li>
          <li>
            <strong>HTTPS.</strong> A secure connection isn&apos;t proof of legitimacy, but its
            absence on a site asking for payment or login details is a real gap.
          </li>
          <li>
            <strong>Contact information.</strong> Legitimate businesses are usually easy to
            contact. Missing or vague contact details are a warning sign.
          </li>
          <li>
            <strong>Pressure tactics.</strong> Countdown timers, &quot;only 2 left&quot; banners,
            and urgent pop-ups are used to stop you from thinking carefully.
          </li>
          <li>
            <strong>Reviews elsewhere.</strong> Search the site&apos;s name plus &quot;reviews&quot;
            or &quot;scam&quot; on a search engine to see what other people have reported.
          </li>
        </ul>
        <p>
          Our website checker above automatically reviews several structural signals — such as the
          domain format, use of HTTPS, subdomain patterns, and suspicious keyword combinations —
          and explains exactly what it found. We&apos;re upfront when something can&apos;t be
          verified (like domain registration history) rather than guessing.
        </p>
        <p>
          Buying from an online store specifically? Try our{" "}
          <Link href="/online-store-checker">Online Store Checker</Link>, which adds
          shopping-specific guidance on top of the same URL analysis. If you received a suspicious
          link in a message, see our <Link href="/phishing-checker">Phishing Checker</Link> and{" "}
          <Link href="/guides/how-to-check-if-a-website-is-a-scam">
            full guide on checking websites
          </Link>
          .
        </p>
      </article>

      <FaqSection
        title="Website Checker FAQ"
        items={[
          {
            q: "Does this tool guarantee a website is safe?",
            a: "No. It highlights common structural warning signs so you can make a more informed decision. No automated tool can guarantee a website's legitimacy.",
          },
          {
            q: "Do I need to create an account to use it?",
            a: "No. The basic website checker is free and doesn't require sign-up.",
          },
          {
            q: "Does ScamCheck store the URLs I check?",
            a: "No. URLs are analyzed and not permanently stored. See our Privacy Policy for details.",
          },
          {
            q: "What if the checker says 'Unable to verify'?",
            a: "Some information, like domain registration history, requires a data source we don't query in this tool. We say so honestly instead of guessing.",
          },
        ]}
      />
    </div>
  );
}
