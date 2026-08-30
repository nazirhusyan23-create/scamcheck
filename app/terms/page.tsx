import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply to your use of ScamCheck's tools and content.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms of Service", href: "/terms" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-slate">
        <h1>Terms of Service</h1>
        <p>
          <em>
            Last updated: [SITE OWNER: insert launch date]. This document is a general-purpose
            template; consider having it reviewed by a qualified professional for your
            jurisdiction before publishing.
          </em>
        </p>

        <h2>1. Acceptance of terms</h2>
        <p>
          By accessing or using ScamCheck (&quot;the Service&quot;), you agree to these Terms of
          Service. If you do not agree, please do not use the Service.
        </p>

        <h2>2. Description of the service</h2>
        <p>
          ScamCheck provides free, informational risk-assessment tools that analyze
          user-submitted URLs, messages, emails, job offers, and screenshots for patterns commonly
          associated with scams. Results are informational only, as described in our{" "}
          <a href="/disclaimer">Disclaimer</a>.
        </p>

        <h2>3. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service to submit unlawful, abusive, or harmful content</li>
          <li>Attempt to interfere with, disrupt, or overload the Service (including automated abuse)</li>
          <li>Attempt to reverse engineer or bypass rate limiting or security controls</li>
          <li>Use the Service to build a competing product by scraping our content or results at scale</li>
        </ul>

        <h2>4. No guarantee of accuracy</h2>
        <p>
          The Service provides automated, rule-based risk indicators. It does not guarantee that
          any website, message, email, or offer is or is not a scam. See our full{" "}
          <a href="/disclaimer">Disclaimer</a>.
        </p>

        <h2>5. Intellectual property</h2>
        <p>
          The Service&apos;s design, code, and original written content are owned by ScamCheck
          [SITE OWNER: insert your legal entity name] unless otherwise noted. You may not
          republish our guide content elsewhere without permission.
        </p>

        <h2>6. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, ScamCheck and its operators are not liable for
          any loss or damage arising from your use of, or reliance on, the Service, including any
          financial loss resulting from a scam that the Service did not detect or a legitimate
          site/message that was flagged as risky.
        </p>

        <h2>7. Changes to the service or terms</h2>
        <p>
          We may modify or discontinue the Service, or update these Terms, at any time. Continued
          use after changes constitutes acceptance of the updated Terms.
        </p>

        <h2>8. Governing law</h2>
        <p>
          [SITE OWNER: specify the governing law/jurisdiction applicable to your business.]
        </p>

        <h2>9. Contact</h2>
        <p>
          Questions about these Terms can be sent via our <a href="/contact">Contact page</a>.
        </p>
      </article>
    </div>
  );
}
