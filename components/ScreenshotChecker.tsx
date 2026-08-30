"use client";

import { useState } from "react";
import { AnalysisResult } from "@/lib/engine/types";
import ResultPanel from "./ResultPanel";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export default function ScreenshotChecker() {
  const [extractedText, setExtractedText] = useState("");
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const [ocrUnavailable, setOcrUnavailable] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setOcrError(null);
    setResult(null);
    setAnalyzeError(null);
    setExtractedText("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setOcrError("Please upload a PNG, JPEG, or WEBP image.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setOcrError("File is too large. Please upload an image under 8MB.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setOcrLoading(true);

    try {
      // Client-side OCR: the image never leaves the user's browser for text
      // extraction, which keeps sensitive screenshot content private.
      const Tesseract = await import("tesseract.js");
      const { data } = await Tesseract.recognize(file, "eng");
      setExtractedText((data.text || "").trim());
    } catch {
      setOcrUnavailable(true);
      setOcrError(
        "We couldn't automatically read the text from this image. You can type or paste the message text below instead."
      );
    } finally {
      setOcrLoading(false);
    }
  }

  async function handleAnalyze() {
    if (!extractedText.trim()) {
      setAnalyzeError("No text to analyze yet. Extract or type the message text first.");
      return;
    }
    setAnalyzing(true);
    setAnalyzeError(null);
    try {
      const res = await fetch("/api/analyze/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "message", text: extractedText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data);
    } catch (err) {
      setAnalyzeError(
        err instanceof Error ? err.message : "Something went wrong while analyzing this content."
      );
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="screenshot-upload" className="block text-sm font-medium text-slate-700 mb-1">
          Upload a screenshot
        </label>
        <input
          id="screenshot-upload"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
        />
        <p className="mt-1 text-xs text-slate-500">
          PNG, JPEG, or WEBP, up to 8MB. Processed in your browser — the image itself is never
          uploaded to our servers.
        </p>
      </div>

      {previewUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt="Preview of the uploaded screenshot"
          className="max-h-64 rounded-lg border border-slate-200"
        />
      )}

      {ocrLoading && <p className="text-sm text-slate-500">Reading text from the image...</p>}
      {ocrError && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          {ocrError}
        </p>
      )}

      <div>
        <label htmlFor="extracted-text" className="block text-sm font-medium text-slate-700 mb-1">
          Extracted text {ocrUnavailable ? "(type or paste manually)" : "(review and edit if needed)"}
        </label>
        <textarea
          id="extracted-text"
          value={extractedText}
          onChange={(e) => setExtractedText(e.target.value)}
          rows={6}
          maxLength={8000}
          placeholder="Extracted text will appear here — review it for accuracy before checking."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {analyzeError && (
        <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {analyzeError}
        </p>
      )}

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={analyzing || ocrLoading}
        className="w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {analyzing ? "Analyzing..." : "Check Now"}
      </button>

      {result && <ResultPanel result={result} />}
    </div>
  );
}
