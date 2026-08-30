import Link from "next/link";

const columns = [
  {
    title: "Tools",
    links: [
      { href: "/website-scam-checker", label: "Website Checker" },
      { href: "/message-scam-checker", label: "Message Checker" },
      { href: "/email-scam-checker", label: "Email Checker" },
      { href: "/job-scam-checker", label: "Job Offer Checker" },
      { href: "/online-store-checker", label: "Online Store Checker" },
      { href: "/screenshot-scam-checker", label: "Screenshot Checker" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/guides", label: "All Guides" },
      { href: "/guides/how-to-check-if-a-website-is-a-scam", label: "Is a Website a Scam?" },
      { href: "/guides/how-to-identify-a-phishing-email", label: "Spotting Phishing Emails" },
      { href: "/guides/how-to-recognize-a-job-scam", label: "Recognizing Job Scams" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/editorial-policy", label: "Editorial Policy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-12 grid grid-cols-2 gap-8 md:grid-cols-4">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-slate-900 mb-3">{col.title}</h3>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-600 hover:text-blue-600">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} ScamCheck. All rights reserved.</p>
        <p className="mt-1 max-w-2xl mx-auto px-4">
          ScamCheck provides informational risk analysis only and is not a law-enforcement,
          financial, or legal service. See our{" "}
          <Link href="/disclaimer" className="underline">
            disclaimer
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
