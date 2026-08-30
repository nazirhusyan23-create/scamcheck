"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log only non-sensitive diagnostic info (message + digest), never
    // request bodies or user-submitted content.
    console.error("Application error:", error.digest || error.message);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold text-slate-900">Something went wrong</h1>
      <p className="mt-3 text-slate-600">
        We hit an unexpected problem loading this page. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
