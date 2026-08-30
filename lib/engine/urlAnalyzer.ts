import { AnalysisResult, Finding, levelFromScore, STANDARD_DISCLAIMER } from "./types";

const SUSPICIOUS_KEYWORDS = [
  "login", "verify", "secure", "account", "update", "confirm", "signin",
  "wallet", "support", "billing", "suspended", "unlock", "reward", "gift",
];

const KNOWN_SHORTENERS = [
  "bit.ly", "tinyurl.com", "t.co", "goo.gl", "is.gd", "ow.ly", "rebrand.ly", "cutt.ly", "buff.ly",
];

const HIGH_RISK_TLDS = new Set([
  "zip", "top", "xyz", "gq", "tk", "ml", "cf", "work", "click", "link", "country", "loan",
]);

function isPunycode(hostname: string): boolean {
  return hostname.split(".").some((label) => label.startsWith("xn--"));
}

function isIpAddressHost(hostname: string): boolean {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) || hostname.includes(":");
}

export function analyzeUrl(rawUrl: string): AnalysisResult {
  const findings: Finding[] = [];
  const unverifiable: string[] = [
    "Domain registration date (WHOIS) was not checked — no verified data source was queried, so we do not display invented dates.",
    "This tool does not check live malware/blacklist databases in this deployment. Consider cross-checking with your browser's built-in protection.",
    "We cannot confirm the business's real-world legitimacy from the URL alone.",
  ];

  let normalized = rawUrl.trim();
  if (!normalized) {
    return {
      type: "url",
      score: 0,
      level: "low",
      levelLabel: "Low Risk",
      findings: [],
      positiveSignals: [],
      unverifiable,
      recommendations: [],
      summary: "No URL was provided to analyze.",
      disclaimer: STANDARD_DISCLAIMER,
    };
  }

  if (!/^https?:\/\//i.test(normalized)) {
    normalized = "http://" + normalized;
  }

  let parsed: URL | null = null;
  try {
    parsed = new URL(normalized);
  } catch {
    findings.push({
      id: "invalid-url",
      label: "Could not parse this as a valid URL",
      description:
        "The text provided doesn't look like a standard, well-formed website address. Malformed or unusual URL structures can sometimes be used to confuse users, but this may also just be a typo.",
      weight: 15,
      category: "URL Structure",
    });
  }

  if (parsed) {
    const hostname = parsed.hostname.toLowerCase();

    if (parsed.protocol !== "https:") {
      findings.push({
        id: "no-https",
        label: "Not using HTTPS",
        description:
          "This site does not use a secure HTTPS connection. Reputable sites, especially anything handling logins or payments, should use HTTPS. This alone doesn't prove a scam, but it's a meaningful gap.",
        weight: 10,
        category: "URL Structure",
      });
    }

    if (isIpAddressHost(hostname)) {
      findings.push({
        id: "ip-address-url",
        label: "Uses a raw IP address instead of a domain name",
        description:
          "Legitimate businesses almost always use a proper domain name. A website address that is just a raw IP number is unusual and often associated with scam or malware infrastructure.",
        weight: 22,
        category: "URL Structure",
      });
    }

    if (isPunycode(hostname)) {
      findings.push({
        id: "punycode",
        label: "Contains Punycode (possible lookalike domain)",
        description:
          "This domain uses Punycode encoding (xn--), which is sometimes used to create characters that visually mimic a trusted brand's domain (an 'IDN homograph' attack).",
        weight: 20,
        category: "URL Structure",
      });
    }

    const subdomainCount = hostname.split(".").length - 2;
    if (subdomainCount >= 3) {
      findings.push({
        id: "excessive-subdomains",
        label: "Unusually many subdomains",
        description:
          "This address has an unusually large number of subdomain segments, a pattern sometimes used to make a fake address look more 'official' or to bury the real domain.",
        weight: 12,
        category: "URL Structure",
      });
    }

    if (normalized.length > 90) {
      findings.push({
        id: "long-url",
        label: "Very long URL",
        description:
          "This is an unusually long web address. Very long URLs are sometimes used to hide suspicious parameters or obscure the true destination.",
        weight: 8,
        category: "URL Structure",
      });
    }

    const shortener = KNOWN_SHORTENERS.find((s) => hostname === s || hostname.endsWith("." + s));
    if (shortener) {
      findings.push({
        id: "url-shortener",
        label: "Uses a link shortener",
        description:
          "This is a shortened link, which hides the real destination until you click it. Shorteners are widely used legitimately, but are also a common way to disguise malicious links.",
        weight: 12,
        category: "URL Structure",
      });
    }

    const tld = hostname.split(".").pop() || "";
    if (HIGH_RISK_TLDS.has(tld)) {
      findings.push({
        id: "high-risk-tld",
        label: `Domain ending (".${tld}") is frequently linked to abuse`,
        description: `The ".${tld}" domain ending is inexpensive and, based on general industry reporting, sees disproportionately high use in spam and scam campaigns. This is a statistical pattern, not proof — many legitimate sites use these endings too.`,
        weight: 10,
        category: "URL Structure",
      });
    }

    const path = (parsed.pathname + parsed.search).toLowerCase();
    const matchedKeywords = SUSPICIOUS_KEYWORDS.filter((k) => path.includes(k) || hostname.includes(k));
    if (matchedKeywords.length >= 2) {
      findings.push({
        id: "suspicious-keywords",
        label: "Contains multiple account/security-related keywords",
        description: `The address contains multiple words commonly used in phishing links (e.g. "${matchedKeywords.slice(0, 3).join('", "')}"). Scammers use these words to imitate login or account-verification pages.`,
        weight: 10,
        category: "URL Structure",
      });
    }

    const hyphenCount = (hostname.match(/-/g) || []).length;
    if (hyphenCount >= 3) {
      findings.push({
        id: "many-hyphens",
        label: "Domain contains many hyphens",
        description:
          "A domain name with many hyphens can be an attempt to mimic a trusted brand name (e.g. 'secure-login-yourbank-verify.com').",
        weight: 8,
        category: "URL Structure",
      });
    }
  }

  const uniqueFindings = Array.from(new Map(findings.map((f) => [f.id, f])).values()).sort(
    (a, b) => b.weight - a.weight
  );

  let score = uniqueFindings.reduce((s, f) => s + f.weight, 0);
  score = Math.round(100 * (1 - Math.exp(-score / 55)));
  score = Math.max(0, Math.min(100, score));

  const { level, label } = levelFromScore(score);

  const positiveSignals: Finding[] = [];
  if (parsed && parsed.protocol === "https:" && uniqueFindings.length === 0) {
    positiveSignals.push({
      id: "https-and-clean",
      label: "Uses HTTPS and shows no structural red flags",
      description:
        "This URL uses a secure connection and doesn't match the structural patterns we check for. This is a positive sign but not proof of legitimacy — always check the site's content, contact information, and reviews too.",
      weight: 0,
      category: "General",
    });
  }

  const recommendations = [
    "Don't enter passwords or payment details unless you're confident this is the real, official site.",
    "Type the company's known website address directly into your browser instead of clicking a link.",
    "Look for consistent contact information, a privacy policy, and clear business details on the site.",
    "Search the domain name plus the word 'scam' or 'reviews' to see what others report.",
  ];

  const summary =
    uniqueFindings.length === 0
      ? "This URL did not match common structural red flags. This does not guarantee it is safe."
      : `${uniqueFindings.length} warning sign${uniqueFindings.length > 1 ? "s" : ""} detected in this URL's structure.`;

  return {
    type: "url",
    score,
    level,
    levelLabel: label,
    findings: uniqueFindings,
    positiveSignals,
    unverifiable,
    recommendations,
    summary,
    disclaimer: STANDARD_DISCLAIMER,
  };
}
