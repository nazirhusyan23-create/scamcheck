import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ScamCheck handles the information you submit and the data we collect.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy-policy" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-slate">
        <h1>Privacy Policy</h1>
        <p>
          <em>
            Last updated: [SITE OWNER: insert launch date]. This document is a template — replace
            bracketed placeholders with your actual details before publishing.
          </em>
        </p>

        <h2>What we collect when you use a checker tool</h2>
        <p>
          When you submit a URL, message, email text, or job offer to one of our checker tools,
          that content is sent to our server, analyzed to generate your risk assessment, and is not
          permanently stored. We do not build a database of submitted content.
        </p>

        <h2>Screenshots</h2>
        <p>
          Uploaded screenshot images are processed for text extraction directly in your browser
          (client-side OCR). The image file itself is not uploaded to our servers. Only the
          extracted text you choose to submit for analysis is sent to our server, and it is handled
          the same way as pasted text above.
        </p>

        <h2>Contact form</h2>
        <p>
          If you use our contact form, we collect the name, email address, and message you provide
          so we can respond to you. [SITE OWNER: describe your actual email provider/storage here,
          e.g. &quot;Messages are delivered via [Provider] and retained in our support inbox for
          [duration].&quot;]
        </p>

        <h2>Analytics</h2>
        <p>
          [SITE OWNER: disclose your actual analytics setup here if you add one, e.g. &quot;We use
          privacy-conscious analytics that record aggregate events such as which tool was used, but
          never the content you submitted.&quot;] We do not send the content of your checks (messages,
          emails, URLs) to any analytics or advertising service.
        </p>

        <h2>Advertising</h2>
        <p>
          This site may display advertising through Google AdSense once configured. Google and its
          partners may use cookies to serve ads based on your visits to this and other sites. You
          can learn more and manage ad personalization at{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          . [SITE OWNER: once AdSense is active, confirm and update this section, including any
          required consent mechanism for your audience&apos;s region, e.g. GDPR/UK consent management.]
        </p>

        <h2>Data we do not do</h2>
        <ul>
          <li>We do not sell your data.</li>
          <li>We do not publicly display content you submit to a checker tool.</li>
          <li>We do not require an account or personal profile to use the free tools.</li>
        </ul>

        <h2>Your choices</h2>
        <p>
          You can use ScamCheck&apos;s core tools without providing any personal information beyond
          the content you choose to check. If you contact us, you can request that we delete any
          record of that correspondence — see our <a href="/contact">Contact page</a>.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy as the product evolves. Material changes will be reflected by
          updating the date at the top of this page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent via our <a href="/contact">Contact page</a>.
        </p>
      </article>
    </div>
  );
}
