import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About ScamCheck",
  description:
    "Learn what ScamCheck does, how our analysis works, our privacy philosophy, and our limitations.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-slate">
        <h1>About ScamCheck</h1>
        <p>
          ScamCheck is a free tool that helps people spot common warning signs in suspicious
          websites, messages, emails, job offers, and online stores. We built it because scam
          tactics are constantly evolving, and it&apos;s genuinely hard for anyone — regardless of
          how careful or experienced they are — to catch every red flag under pressure.
        </p>

        <h2>What ScamCheck does</h2>
        <p>
          When you submit a URL, message, email, or job offer, ScamCheck runs it through a
          rule-based analysis engine that looks for language and structural patterns commonly
          associated with scams: urgency tactics, requests for money or verification codes,
          suspicious domain characteristics, impersonation language, and more. Each result explains
          exactly what was found and why it matters, along with a transparent 0–100 risk score.
        </p>

        <h2>How our analysis works</h2>
        <p>
          Our core analysis runs entirely on a local, rule-based engine — no external AI service is
          required for the tool to work. This keeps the product fast, predictable, and explainable:
          every flagged warning sign traces back to a specific, documented rule, not a black-box
          score. Where a data point can&apos;t be verified (like a domain&apos;s registration
          history), we say so honestly instead of guessing or inventing information.
        </p>

        <h2>Our privacy philosophy</h2>
        <p>
          We designed ScamCheck to need as little of your data as possible. Submitted text and URLs
          are processed to generate your result and are not permanently stored. Screenshot text
          extraction happens directly in your browser, so the image itself never reaches our
          servers. See our <a href="/privacy-policy">Privacy Policy</a> for full details.
        </p>

        <h2>Our limitations</h2>
        <p>
          ScamCheck is not a guarantee, a law-enforcement service, a financial advisor, or a
          cybersecurity certification authority. Scam tactics change constantly, and no automated
          tool — including this one — can catch every scam or clear every legitimate site or
          message with certainty. Always use your own judgment and verify independently, especially
          before sending money or sharing personal information. Read our full{" "}
          <a href="/disclaimer">Disclaimer</a>.
        </p>

        <h2>Reporting an incorrect result</h2>
        <p>
          If you believe a result was clearly wrong — whether a scam was missed or something
          legitimate was flagged too harshly — we&apos;d like to know. Please reach out through our{" "}
          <a href="/contact">Contact page</a> with details, and we&apos;ll review our detection
          rules.
        </p>
      </article>
    </div>
  );
}
