import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact ScamCheck",
  description: "Get in touch with the ScamCheck team, report an incorrect result, or ask a question.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-3xl font-extrabold text-slate-900">Contact Us</h1>
        <p className="mt-3 text-slate-600">
          Questions, feedback, or reporting an incorrect result? Send us a message below.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
