import { MetadataRoute } from "next";
import { getAllGuideSlugs } from "@/lib/content/guides";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example-scamcheck.com";

const STATIC_ROUTES = [
  "",
  "/website-scam-checker",
  "/message-scam-checker",
  "/email-scam-checker",
  "/job-scam-checker",
  "/online-store-checker",
  "/phishing-checker",
  "/url-checker",
  "/screenshot-scam-checker",
  "/guides",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/disclaimer",
  "/editorial-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : route.includes("scam-checker") || route === "/url-checker" || route === "/phishing-checker" ? 0.9 : 0.6,
  }));

  const guideEntries: MetadataRoute.Sitemap = getAllGuideSlugs().map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...guideEntries];
}
