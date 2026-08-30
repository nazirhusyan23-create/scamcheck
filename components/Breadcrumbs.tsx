import Link from "next/link";
import JsonLd from "./JsonLd";

export interface Crumb {
  name: string;
  href: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example-scamcheck.com";
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-4 text-xs text-slate-500">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `${siteUrl}${item.href}`,
          })),
        }}
      />
      <ol className="flex flex-wrap gap-1">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-slate-700">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-blue-600">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
