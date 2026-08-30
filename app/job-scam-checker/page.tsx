import type { Metadata } from "next";
import Link from "next/link";
import Checker from "@/components/Checker";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Job Scam Checker — Is This Job Offer a Scam?",
  description:
    "Paste a job offer or recruiter message to check for unrealistic pay, upfront fees, equipment-purchase requests, and other common job scam signs.",
  alternates: { canonical: "/job-scam-checker" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Job Scam Checker", href: "/job-scam-checker" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8 pb-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Job Scam Checker
        </h1>
        <p className="mt-3 text-slate-600">
          Paste a job offer, recruiter message, or job posting to check it for common
          work-from-home and hiring scam warning signs.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <Checker defaultTab="job" />
      </section>

      <AdSlot placement="in-content" className="mx-auto max-w-3xl px-4 mb-10" />

      <article className="mx-auto max-w-3xl px-4 pb-16 prose prose-slate">
        <h2>How to recognize a fake job offer</h2>
        <p>
          Job scams have surged alongside remote work, and they follow a recognizable script. Watch
          for:
        </p>
        <ul>
          <li>
            <strong>Pay that&apos;s too good for the effort described.</strong> High daily pay for
            &quot;simple data entry&quot; or &quot;just replying to messages&quot; is a classic
            lure.
          </li>
          <li>
            <strong>Being asked to buy your own equipment</strong> from a specific supplier before
            starting — a well-documented scam pattern used to extract an upfront payment.
          </li>
          <li>
            <strong>Requests for bank details very early</strong>, sometimes before any real
            interview.
          </li>
          <li>
            <strong>Hiring with no real interview</strong>, or an &quot;interview&quot; conducted
            entirely over chat with no video or phone call.
          </li>
          <li>
            <strong>Recruitment exclusively through Telegram or WhatsApp</strong>, with no
            verifiable company email or careers page.
          </li>
          <li>
            <strong>Requests for payment in gift cards or cryptocurrency</strong> for
            &quot;training materials&quot; or &quot;registration.&quot;
          </li>
        </ul>
        <p>
          Note: poor grammar in a job listing is a minor signal at best — plenty of legitimate
          postings have typos, and plenty of scams are well-written. We treat it as one small
          factor, never as proof by itself.
        </p>
        <p>
          Paste the offer above for a full breakdown, or read our detailed guide:{" "}
          <Link href="/guides/how-to-recognize-a-job-scam">How to Recognize a Job Scam</Link>. If
          the offer includes a company website, run it through our{" "}
          <Link href="/website-scam-checker">Website Scam Checker</Link> too.
        </p>
      </article>

      <FaqSection
        title="Job Checker FAQ"
        items={[
          {
            q: "A real company would never ask me to pay for anything, right?",
            a: "Legitimate employers do not require you to pay for training, equipment, or 'registration' before you start. Any such request is a strong warning sign.",
          },
          {
            q: "What if the company has a real-looking website?",
            a: "Scammers sometimes copy or quickly build a convincing-looking site. Combine the website check with the other signals above — don't rely on the website alone.",
          },
          {
            q: "I already sent money or bank details — what now?",
            a: "Contact your bank immediately, stop all further payments, and report the incident to your local consumer protection or cybercrime authority.",
          },
        ]}
      />
    </div>
  );
}
