// Pattern dictionaries for the local rule-based analysis engine.
// Every pattern maps to a human-readable, honest explanation.
// Weights are additive contributions to a 0-100 risk score.

export interface PatternRule {
  id: string;
  label: string;
  description: string;
  weight: number;
  category: string;
  test: RegExp;
}

const rx = (pattern: string, flags = "i") => new RegExp(pattern, flags);

export const URGENCY_RULES: PatternRule[] = [
  {
    id: "urgency-deadline",
    label: "Urgent deadline pressure",
    description:
      "The message uses a tight deadline (e.g. 'today', '24 hours', 'immediately') to push you into acting before you can think it through. This is a classic pressure tactic.",
    weight: 12,
    category: "Urgency & Pressure",
    test: rx(
      "\\b(immediately|right away|within (24|12|1) hours?|today only|act now|urgent(ly)?|expires? (today|soon)|last chance|final notice|time[- ]sensitive)\\b"
    ),
  },
  {
    id: "urgency-account-threat",
    label: "Account suspension/deletion threat",
    description:
      "Threatening to suspend, delete, freeze, or limit your account unless you act fast is a very common scare tactic used in phishing.",
    weight: 14,
    category: "Urgency & Pressure",
    test: rx(
      "\\b(account (will be|has been) (suspended|locked|deleted|closed|limited|restricted)|verify your account|confirm your (identity|account)|unusual (activity|sign-?in))\\b"
    ),
  },
  {
    id: "threat-legal",
    label: "Legal or law-enforcement threats",
    description:
      "Threatening arrest, lawsuits, or legal action over text/email/chat is almost never how real legal processes work and is commonly used to intimidate victims.",
    weight: 18,
    category: "Urgency & Pressure",
    test: rx(
      "\\b(arrest warrant|legal action|you will be (sued|arrested|prosecuted)|police report has been filed|failure to (respond|comply) will result)\\b"
    ),
  },
];

export const MONEY_RULES: PatternRule[] = [
  {
    id: "money-request",
    label: "Direct request for money or payment",
    description:
      "A direct ask for money, especially combined with urgency, is one of the strongest scam indicators.",
    weight: 16,
    category: "Money & Payment",
    test: rx(
      "\\b(send money|wire transfer|western union|money ?gram|pay(ment)? (now|immediately)|processing fee|handling fee|activation fee|release fee|customs fee)\\b"
    ),
  },
  {
    id: "money-giftcard",
    label: "Gift card payment request",
    description:
      "Legitimate businesses, government agencies, and employers never ask to be paid in gift cards. This is one of the most reliable scam signals that exists.",
    weight: 25,
    category: "Money & Payment",
    test: rx(
      "\\b(gift card|itunes card|google play card|steam card|amazon card|prepaid card)s?\\b.{0,40}\\b(code|number|pin|redeem|send|share)\\b|\\b(send|share|read me).{0,20}(gift card|itunes|google play|steam) (code|pin|number)\\b"
    ),
  },
  {
    id: "money-crypto",
    label: "Cryptocurrency payment request",
    description:
      "Requests to pay in cryptocurrency (especially to an unfamiliar wallet) are extremely common in scams because crypto payments are very hard to reverse or trace.",
    weight: 18,
    category: "Money & Payment",
    test: rx(
      "\\b(bitcoin|btc|usdt|ethereum|crypto ?wallet|wallet address|send (bitcoin|btc|crypto))\\b"
    ),
  },
  {
    id: "money-advance-fee",
    label: "Advance-fee / 'pay to receive money' pattern",
    description:
      "Being told you must pay a fee before you can receive a much larger sum (prize, inheritance, loan, refund) is the core mechanic of classic advance-fee scams.",
    weight: 20,
    category: "Money & Payment",
    test: rx(
      "\\b(you (have )?won|lottery|inheritance|unclaimed funds|to release your (funds|prize|winnings)|pay a small fee to (receive|claim|unlock))\\b"
    ),
  },
  {
    id: "money-investment",
    label: "Unrealistic investment / guaranteed return promise",
    description:
      "Promises of guaranteed, unusually high, or 'risk-free' investment returns are a hallmark of investment fraud. Legitimate investments never guarantee returns.",
    weight: 16,
    category: "Money & Payment",
    test: rx(
      "\\b(guaranteed (returns?|profit)|double your (money|investment)|risk[- ]free investment|\\d{2,4}% (return|profit)|passive income guaranteed)\\b"
    ),
  },
];

export const CREDENTIAL_RULES: PatternRule[] = [
  {
    id: "cred-otp",
    label: "Request for a one-time code (OTP)",
    description:
      "A one-time passcode is meant to be secret. No legitimate company will ever ask you to read it out or send it to them — this is a takeover attempt.",
    weight: 24,
    category: "Credentials & Security",
    test: rx(
      "\\b(otp|one[- ]time (code|password|pin)|verification code|security code)\\b.{0,40}\\b(share|send|reply|provide|read|tell)\\b|\\b(share|send|reply with|provide) (the |your )?(otp|code|pin)\\b"
    ),
  },
  {
    id: "cred-password",
    label: "Request for your password",
    description:
      "Legitimate services never ask you to send them your password directly. Any message asking for it is attempting credential theft.",
    weight: 24,
    category: "Credentials & Security",
    test: rx(
      "\\b(send|share|provide|confirm|verify) (us |your )?(password|login (details|credentials)|pin number)\\b"
    ),
  },
  {
    id: "cred-click-verify",
    label: "'Click to verify' link with credential harvesting language",
    description:
      "A link paired with 'verify your identity/account' language is the standard structure of a phishing attempt designed to steal your login details.",
    weight: 14,
    category: "Credentials & Security",
    test: rx(
      "\\b(click (here|the link|below) to (verify|confirm|update|reactivate))\\b"
    ),
  },
  {
    id: "cred-bank-details",
    label: "Early request for full bank details",
    description:
      "Being asked for full bank account details, card numbers, or CVV early in an interaction (especially unsolicited) is a strong red flag.",
    weight: 20,
    category: "Credentials & Security",
    test: rx(
      "\\b(card number|cvv|routing number|account number and (pin|password)|full bank details)\\b"
    ),
  },
];

export const IMPERSONATION_RULES: PatternRule[] = [
  {
    id: "imp-brand",
    label: "Claims to be from a well-known brand or bank",
    description:
      "Messages claiming to be from a bank, delivery company, or well-known brand — especially via SMS/WhatsApp — are frequently spoofed. Verify by contacting the company directly through their official site or app.",
    weight: 8,
    category: "Impersonation",
    test: rx(
      "\\b(paypal|amazon|netflix|apple support|microsoft support|irs|hmrc|dhl|fedex|ups delivery|your bank)\\b"
    ),
  },
  {
    id: "imp-generic-greeting",
    label: "Generic greeting instead of your name",
    description:
      "Real account-related messages from companies you have an account with usually use your name. A generic 'Dear Customer/User' greeting can indicate a mass-sent scam message, though some legitimate automated messages also do this.",
    weight: 5,
    category: "Impersonation",
    test: rx("\\b(dear (customer|user|valued (customer|member))|dear sir\\/madam)\\b"),
  },
];

export const LINK_RULES: PatternRule[] = [
  {
    id: "link-shortener",
    label: "Shortened or obscured link",
    description:
      "Link shorteners (bit.ly, tinyurl, etc.) hide the real destination and are often used to disguise malicious links, though they are also used legitimately.",
    weight: 10,
    category: "Links",
    test: rx(
      "\\b(bit\\.ly|tinyurl\\.com|t\\.co|goo\\.gl|is\\.gd|ow\\.ly|rebrand\\.ly|cutt\\.ly)\\b"
    ),
  },
  {
    id: "link-present",
    label: "Contains a link",
    description:
      "The message includes a clickable link. Links combined with urgency or credential requests significantly raise risk — always check where a link actually leads before clicking.",
    weight: 4,
    category: "Links",
    test: rx("https?:\\/\\/|www\\."),
  },
];

export const JOB_RULES: PatternRule[] = [
  {
    id: "job-unrealistic-pay",
    label: "Unrealistic pay for minimal work",
    description:
      "Offers of high pay for very simple tasks (data entry, 'just reply to messages', 'work 2 hours a day') with little to no experience required are a very common job-scam pattern.",
    weight: 15,
    category: "Job Offer",
    test: rx(
      "\\$?\\d{2,4}\\s*(per|\\/)\\s*(day|hour)\\b.{0,60}\\b(no experience|easy work|simple task)"
    ),
  },
  {
    id: "job-equipment-purchase",
    label: "Asked to buy your own equipment from a specific seller",
    description:
      "Being told you must purchase equipment (often a laptop or 'starter kit') from a specific supplier before starting is a well-known job-scam pattern designed to extract money from you.",
    weight: 20,
    category: "Job Offer",
    test: rx(
      "\\b(purchase|buy) (your own |a )?(equipment|starter kit|laptop|work kit) from\\b"
    ),
  },
  {
    id: "job-telegram-only",
    label: "Recruitment only through Telegram/WhatsApp",
    description:
      "Legitimate employers rarely conduct an entire hiring process exclusively over Telegram or WhatsApp with no company email, careers page, or verifiable presence.",
    weight: 14,
    category: "Job Offer",
    test: rx("\\b(contact (us|me) on telegram|add (me|us) on whatsapp|telegram:? @)\\b"),
  },
  {
    id: "job-no-interview",
    label: "No real interview process",
    description:
      "Being hired instantly with no interview, or an interview conducted entirely through chat messages, is a common shortcut used in fake job schemes.",
    weight: 10,
    category: "Job Offer",
    test: rx("\\b(hired immediately|no interview (needed|required)|instant hire)\\b"),
  },
];

export const ALL_TEXT_RULES: PatternRule[] = [
  ...URGENCY_RULES,
  ...MONEY_RULES,
  ...CREDENTIAL_RULES,
  ...IMPERSONATION_RULES,
  ...LINK_RULES,
];

export const ALL_JOB_RULES: PatternRule[] = [...ALL_TEXT_RULES, ...JOB_RULES];
