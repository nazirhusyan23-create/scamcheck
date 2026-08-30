import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllGuides } from "@/lib/content/guides";

export const metadata: Metadata = {
  title: "Scam Awareness Guides",
  description:
    "Practical, plain-English guides on recognizing website scams, phishing emails, job scams, and more.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();
  return (
    <div>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }]} />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Scam Awareness Guides
        </h1>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Practical, plain-English guides to help you recognize scams before they cost you
          anything.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
                {g.frontmatter.category}
              </p>
              <h2 className="mt-1 font-semibold text-slate-900">{g.frontmatter.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{g.frontmatter.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
