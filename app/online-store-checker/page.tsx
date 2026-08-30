import type { Metadata } from "next";
import Link from "next/link";
import Checker from "@/components/Checker";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Online Store Checker — Is This Shopping Website Legit?",
  description:
    "Check an online store before you buy. Get a structural risk check plus a shopping-specific checklist covering returns, contact info, and payment safety.",
  alternates: { canonical: "/online-store-checker" },
};

const checklist = [
  "Clear, specific return and refund policy (not vague or missing)",
  "Real contact information — working email, ideally a phone number or address",
  "Discounts that are large but not absurd (80-90% off everything is a red flag)",
  "Reviews of the store name findable on independent sites, not just on-site testimonials",
  "Secure checkout using a trusted payment processor, not just a bank transfer request",
  "A domain that has clearly existed for a while, not just registered in the past few weeks",
];

export default function Page() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Online Store Checker", href: "/online-store-checker" }]} />

      <section className="mx-auto max-w-3xl px-4 pt-8 pb-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Online Store Checker
        </h1>
        <p className="mt-3 text-slate-600">
          Check a shopping website before you enter your payment details.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-12">
        <Checker defaultTab="store" />
      </section>

      <AdSlot placement="in-content" className="mx-auto max-w-3xl px-4 mb-10" />

      <article className="mx-auto max-w-3xl px-4 pb-16 prose prose-slate">
        <h2>How to tell if an online store is fake</h2>
        <p>
          Fake stores are usually built quickly around a single viral product or an unrealistic
          discount, then disappear after collecting a batch of payments. Beyond the automatic
          structural check above, manually review this checklist before you buy:
        </p>
        <ul>
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>
          We deliberately don&apos;t claim to verify a store&apos;s return policy, business
          registration, or shipping history automatically — those require checking the actual
          store content and outside sources yourself. Where we can&apos;t verify something, we say
          so rather than guessing.
        </p>
        <p>
          Want to check a specific product link or a message advertising the store? Try our{" "}
          <Link href="/website-scam-checker">Website Scam Checker</Link> or{" "}
          <Link href="/message-scam-checker">Message Scam Checker</Link>, or read our guide on{" "}
          <Link href="/guides/online-shopping-scams">common online shopping scams</Link>.
        </p>
      </article>

      <FaqSection
        title="Online Store Checker FAQ"
        items={[
          {
            q: "Does this tool confirm a store will actually ship my order?",
            a: "No. That can't be verified automatically. Use the checklist above alongside the automated check.",
          },
          {
            q: "Is it safe to pay by bank transfer to a new online store?",
            a: "Generally, no. Prefer a credit card or a payment method that offers buyer protection so you can dispute a charge if the order never arrives.",
          },
          {
            q: "The store has lots of five-star reviews — is that proof it's legit?",
            a: "Not necessarily. On-site reviews can be fabricated. Look for reviews on independent platforms as well.",
          },
        ]}
      />
    </div>
  );
}
