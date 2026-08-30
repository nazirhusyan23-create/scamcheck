import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example-scamcheck.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ScamCheck — Check Websites, Messages, Emails & Job Offers for Scams",
    template: "%s | ScamCheck",
  },
  description:
    "Check suspicious websites, messages, emails and online offers before you trust them. Free scam risk checker with clear, explainable results.",
  openGraph: {
    type: "website",
    siteName: "ScamCheck",
    title: "ScamCheck — Check Websites, Messages, Emails & Job Offers for Scams",
    description:
      "Check suspicious websites, messages, emails and online offers before you trust them.",
    url: SITE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ScamCheck" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScamCheck — Check Websites, Messages, Emails & Job Offers for Scams",
    description:
      "Check suspicious websites, messages, emails and online offers before you trust them.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:text-blue-700 focus:px-4 focus:py-2 focus:m-2 focus:rounded-lg focus:border"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
