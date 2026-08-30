import Link from "next/link";

const links = [
  { href: "/website-scam-checker", label: "Website Checker" },
  { href: "/message-scam-checker", label: "Message Checker" },
  { href: "/email-scam-checker", label: "Email Checker" },
  { href: "/job-scam-checker", label: "Job Checker" },
  { href: "/guides", label: "Guides" },
];

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-40">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3"
      >
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900 text-lg">
          <ShieldCheckIcon />
          ScamCheck
        </Link>
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-slate-900 transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/#checker"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Check Now
        </Link>
      </nav>
    </header>
  );
}

export function ShieldCheckIcon({ className = "h-6 w-6 text-blue-600" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 3l7 3v5c0 4.75-3.05 8.9-7 10-3.95-1.1-7-5.25-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 12.5l2 2 4-4.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
