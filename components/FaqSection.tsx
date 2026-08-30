import JsonLd from "./JsonLd";

export interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection({ items, title = "Frequently Asked Questions" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 border-t border-slate-100">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">{title}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-slate-200 bg-white p-5 open:shadow-sm"
          >
            <summary className="cursor-pointer list-none font-semibold text-slate-900 flex items-center justify-between">
              {item.q}
              <span className="ml-4 text-slate-400 group-open:rotate-45 transition-transform" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
