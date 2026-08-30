import type { Metadata } from "next";
import Link from "next/link";
import Checker from "@/components/Checker";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Message Scam Checker — Is This Text or WhatsApp Message a Scam?",
  description:
    "Paste a suspicious SMS, WhatsApp, or social-media message to check it for urgency tactics, payment requests, and other common scam patterns.",
  alternates: { canonical: "/message-scam-checker" },
};

export default function Page() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Message Scam Checker", href: "/message-scam-checker" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8 pb-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Message Scam Checker
        </h1>
        <p className="mt-3 text-slate-600">
          Paste a suspicious text message, WhatsApp message, or social-media DM to check it for
          common scam warning signs.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <Checker defaultTab="message" />
      </section>

      <AdSlot placement="in-content" className="mx-auto max-w-3xl px-4 mb-10" />

      <article className="mx-auto max-w-3xl px-4 pb-16 prose prose-slate">
        <h2>Common signs of a scam message</h2>
        <p>
          Scam messages rely on a small set of psychological tricks repeated across almost every
          platform — SMS, WhatsApp, Telegram, Instagram, and dating apps. The wording changes, but
          the underlying pattern is usually the same:
        </p>
        <ul>
          <li>
            <strong>Manufactured urgency</strong> — &quot;act now,&quot; &quot;expires today,&quot;
            or a countdown designed to stop you from pausing to think.
          </li>
          <li>
            <strong>A request for money, a gift card, or crypto</strong> — often framed as a fee,
            fine, deposit, or &quot;small payment&quot; to unlock something bigger.
          </li>
          <li>
            <strong>A request for a one-time code (OTP)</strong> — this is one of the clearest scam
            signals that exists. No legitimate company will ever ask you to read out a code sent to
            your phone.
          </li>
          <li>
            <strong>An unfamiliar or shortened link</strong> — designed to get you to a fake page
            before you notice anything is wrong.
          </li>
          <li>
            <strong>Claiming to be someone you know</strong> — a &quot;new number&quot; message
            from a relative, or a friend suddenly asking for money.
          </li>
        </ul>
        <p>
          Paste the message above and our checker will point out exactly which of these patterns
          it finds, and explain why each one matters — not just flag it as &quot;risky&quot; with
          no context.
        </p>
        <p>
          Got a screenshot instead of text you can copy? Use our{" "}
          <Link href="/screenshot-scam-checker">Screenshot Scam Checker</Link>. For scams
          delivered by email specifically, see our <Link href="/email-scam-checker">Email Scam Checker</Link>.
          You can also read our full guide on{" "}
          <Link href="/guides/common-whatsapp-scams">common WhatsApp scams</Link>.
        </p>
      </article>

      <FaqSection
        title="Message Checker FAQ"
        items={[
          {
            q: "Is my message kept or shared?",
            a: "No. Message text is analyzed and not permanently stored. See our Privacy Policy for full details.",
          },
          {
            q: "Can it check messages in other languages?",
            a: "The current detection rules are tuned for English. Messages in other languages may not be fully analyzed.",
          },
          {
            q: "What should I do if the sender is a real contact whose account may be hacked?",
            a: "Contact that person through a different channel (a phone call, for example) to confirm it's really them before acting on the message.",
          },
        ]}
      />
    </div>
  );
}
