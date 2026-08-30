import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const GUIDES_DIR = path.join(process.cwd(), "content", "guides");

export interface GuideFrontmatter {
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  category: string;
  tags: string[];
  relatedTools?: { label: string; href: string }[];
  faq?: { q: string; a: string }[];
}

export interface Guide {
  slug: string;
  frontmatter: GuideFrontmatter;
  content: string;
}

export function getAllGuideSlugs(): string[] {
  if (!fs.existsSync(GUIDES_DIR)) return [];
  return fs
    .readdirSync(GUIDES_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getGuide(slug: string): Guide | null {
  const filePath = path.join(GUIDES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as GuideFrontmatter, content };
}

export function getAllGuides(): Guide[] {
  return getAllGuideSlugs()
    .map((slug) => getGuide(slug))
    .filter((g): g is Guide => g !== null)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}
