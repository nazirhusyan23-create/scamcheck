import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getAllGuideSlugs, getGuide } from "@/lib/content/guides";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqSection from "@/components/FaqSection";
import AdSlot from "@/components/AdSlot";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.frontmatter.title,
    description: guide.frontmatter.description,
    alternates: { canonical: `/guides/${slug}` },
    openGraph: {
      type: "article",
      title: guide.frontmatter.title,
      description: guide.frontmatter.description,
      publishedTime: guide.frontmatter.date,
      modifiedTime: guide.frontmatter.updated,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example-scamcheck.com";
  const html = marked.parse(guide.content, { async: false }) as string;

  return (
    <div>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: guide.frontmatter.title, href: `/guides/${slug}` },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.frontmatter.title,
          description: guide.frontmatter.description,
          author: { "@type": "Organization", name: guide.frontmatter.author },
          datePublished: guide.frontmatter.date,
          dateModified: guide.frontmatter.updated,
          mainEntityOfPage: `${siteUrl}/guides/${slug}`,
        }}
      />

      <article className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs font-medium uppercase tracking-wide text-blue-600">
          {guide.frontmatter.category}
        </p>
        <h1 className="mt-1 text-3xl sm:text-4xl font-extrabold text-slate-900">
          {guide.frontmatter.title}
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          By {guide.frontmatter.author} · Updated{" "}
          {new Date(guide.frontmatter.updated).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div
          className="prose prose-slate mt-8 max-w-none"
          // Content is authored by the ScamCheck editorial team from local
          // Markdown files, not user input, so this is safe to render.
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {guide.frontmatter.relatedTools && guide.frontmatter.relatedTools.length > 0 && (
          <div className="mt-10 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <p className="font-semibold text-slate-900 text-sm mb-3">Related Tools</p>
            <div className="flex flex-wrap gap-2">
              {guide.frontmatter.relatedTools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="rounded-full bg-white border border-blue-200 px-4 py-1.5 text-sm text-blue-700 hover:border-blue-400"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      <AdSlot placement="in-content" className="mx-auto max-w-3xl px-4 mb-10" />

      {guide.frontmatter.faq && guide.frontmatter.faq.length > 0 && (
        <FaqSection
          title="Frequently Asked Questions"
          items={guide.frontmatter.faq.map((f) => ({ q: f.q, a: f.a }))}
        />
      )}
    </div>
  );
}
