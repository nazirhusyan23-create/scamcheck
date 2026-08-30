import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important limitations of ScamCheck's risk assessments and tools.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Disclaimer", href: "/disclaimer" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-slate">
        <h1>Disclaimer</h1>

        <h2>Informational purposes only</h2>
        <p>
          ScamCheck provides an automated, informational risk assessment based on common scam
          patterns. Results such as risk scores, warning labels (&quot;High Risk,&quot;
          &quot;Suspicious,&quot; etc.), and detected findings are <strong>not a guarantee</strong>{" "}
          that any website, message, email, job offer, or online store is, or is not, fraudulent.
        </p>

        <h2>Not a certification or legal service</h2>
        <p>
          ScamCheck is not a law-enforcement service, a financial advisor, a lawyer, or a
          cybersecurity certification authority. Nothing on this site constitutes legal, financial,
          or professional security advice. Our results should never be treated as a professional
          audit or certification of safety.
        </p>

        <h2>No guarantee of detection</h2>
        <p>
          Scam tactics evolve constantly. Our rule-based analysis engine checks for patterns that
          are commonly observed in scams, but it cannot catch every scam, and it may occasionally
          flag legitimate content as risky (a &quot;false positive&quot;) or miss content that is
          actually fraudulent (a &quot;false negative&quot;). Always apply your own judgment.
        </p>

        <h2>Your responsibility</h2>
        <p>
          You are solely responsible for any decisions you make based on ScamCheck&apos;s output,
          including financial transactions, sharing personal information, or engaging with any
          website, sender, or offer. Before sending money or sharing sensitive information, verify
          independently through official channels you already trust.
        </p>

        <h2>If you believe you have been scammed</h2>
        <p>
          Stop all further contact and payments, contact your bank or payment provider immediately
          if money was sent, change any shared passwords, and report the incident to your local
          consumer protection agency or cybercrime authority.
        </p>

        <p>
          For how we handle the information you submit, see our{" "}
          <a href="/privacy-policy">Privacy Policy</a>. For the terms governing use of this site,
          see our <a href="/terms">Terms of Service</a>.
        </p>
      </article>
    </div>
  );
}
