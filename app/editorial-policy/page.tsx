import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "How ScamCheck researches, writes, and maintains its educational guides and tool content.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Editorial Policy", href: "/editorial-policy" }]} />
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-slate">
        <h1>Editorial Policy</h1>

        <h2>Our goal</h2>
        <p>
          ScamCheck&apos;s educational guides exist to genuinely help people recognize and avoid
          scams — not to fill space or chase keywords. Every guide is written to directly answer a
          real question people search for, with practical, actionable advice.
        </p>

        <h2>How we write and update guides</h2>
        <ul>
          <li>Each guide is written or reviewed by a member of the ScamCheck team before publishing.</li>
          <li>We describe scam patterns and tactics generally; we do not fabricate specific statistics, case studies, or quotes.</li>
          <li>Where we reference outside facts, we aim to cite a credible, checkable source.</li>
          <li>Guides are revisited periodically and updated when scam tactics evolve. The &quot;updated&quot; date on each article reflects the last substantive review.</li>
        </ul>

        <h2>What we don&apos;t do</h2>
        <ul>
          <li>We do not publish spun, auto-generated, or duplicate articles.</li>
          <li>We do not use fake reviews, fake statistics, or fake trust badges anywhere on the site.</li>
          <li>We do not accept payment in exchange for favorable coverage of any company, product, or website.</li>
          <li>We do not claim our tools guarantee detection of scams — see our <a href="/disclaimer">Disclaimer</a>.</li>
        </ul>

        <h2>Corrections</h2>
        <p>
          If you find a factual error in one of our guides, please let us know via our{" "}
          <a href="/contact">Contact page</a>. We review and correct genuine errors promptly.
        </p>
      </article>
    </div>
  );
}
