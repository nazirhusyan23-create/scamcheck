"use client";

import { useState } from "react";
import { AnalysisResult, CheckType } from "@/lib/engine/types";
import ResultPanel from "./ResultPanel";
import ScreenshotChecker from "./ScreenshotChecker";

type Tab = "url" | "message" | "email" | "job" | "store" | "screenshot";

const TABS: { id: Tab; label: string; placeholder: string }[] = [
  { id: "url", label: "Website URL", placeholder: "e.g. https://example-shop.com" },
  {
    id: "message",
    label: "Message",
    placeholder: "Paste a suspicious text/WhatsApp/SMS message here...",
  },
  { id: "email", label: "Email", placeholder: "Paste the email body here..." },
  { id: "job", label: "Job Offer", placeholder: "Paste the job offer or recruiter message..." },
  { id: "store", label: "Online Store", placeholder: "e.g. https://example-store.com" },
  { id: "screenshot", label: "Screenshot", placeholder: "" },
];

export default function Checker({ defaultTab = "url" }: { defaultTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [urlValue, setUrlValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [subjectValue, setSubjectValue] = useState("");
  const [senderValue, setSenderValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (tab === "screenshot") return; // handled by ScreenshotChecker itself

    setLoading(true);
    try {
      if (tab === "url" || tab === "store") {
        if (!urlValue.trim()) {
          setError("Please enter a URL to check.");
          setLoading(false);
          return;
        }
        const res = await fetch("/api/analyze/url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: urlValue, mode: tab === "store" ? "store" : "website" }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong.");
        setResult(data);
      } else {
        if (!textValue.trim()) {
          setError("Please paste some content to check.");
          setLoading(false);
          return;
        }
        const res = await fetch("/api/analyze/text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: tab as CheckType,
            text: textValue,
            subject: tab === "email" ? subjectValue : undefined,
            senderAddress: tab === "email" ? senderValue : undefined,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong.");
        setResult(data);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while analyzing this content. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="checker"
      className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4 sm:p-6"
    >
      <div
        role="tablist"
        aria-label="Choose what to check"
        className="flex flex-wrap gap-2 mb-5 border-b border-slate-200 pb-4"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => {
              setTab(t.id);
              setResult(null);
              setError(null);
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 ${
              tab === t.id
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "screenshot" ? (
        <ScreenshotChecker />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "email" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="sender" className="block text-sm font-medium text-slate-700 mb-1">
                  Sender address (optional)
                </label>
                <input
                  id="sender"
                  type="text"
                  value={senderValue}
                  onChange={(e) => setSenderValue(e.target.value)}
                  placeholder="sender@example.com"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
                  Subject (optional)
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subjectValue}
                  onChange={(e) => setSubjectValue(e.target.value)}
                  placeholder="Email subject line"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="main-input" className="block text-sm font-medium text-slate-700 mb-1">
              {TABS.find((t) => t.id === tab)?.label}
            </label>
            {tab === "url" || tab === "store" ? (
              <input
                id="main-input"
                type="text"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                placeholder={TABS.find((t) => t.id === tab)?.placeholder}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            ) : (
              <textarea
                id="main-input"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder={TABS.find((t) => t.id === tab)?.placeholder}
                rows={6}
                maxLength={8000}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            )}
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Analyzing..." : "Check Now"}
          </button>
        </form>
      )}

      {result && <ResultPanel result={result} />}
    </div>
  );
}
