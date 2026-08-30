import { AnalysisResult } from "@/lib/engine/types";
import RiskBadge from "./RiskBadge";

export default function ResultPanel({ result }: { result: AnalysisResult }) {
  return (
    <div className="mt-8 space-y-8" aria-live="polite">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 mb-3">Risk Assessment</h2>
        <RiskBadge level={result.level} label={result.levelLabel} score={result.score} />
        <p className="mt-3 text-slate-600 text-sm max-w-2xl">{result.summary}</p>
      </div>

      {result.findings.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-slate-900 mb-3">Why?</h3>
          <ul className="space-y-3">
            {result.findings.map((f) => (
              <li
                key={f.id}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <p className="font-medium text-slate-900 text-sm">
                  <span className="mr-2 text-amber-600" aria-hidden="true">
                    ⚠
                  </span>
                  {f.label}
                </p>
                <p className="mt-1 text-sm text-slate-600">{f.description}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                  {f.category}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.positiveSignals.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-slate-900 mb-3">Positive Signals</h3>
          <ul className="space-y-3">
            {result.positiveSignals.map((f) => (
              <li key={f.id} className="rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="font-medium text-green-900 text-sm">
                  <span className="mr-2" aria-hidden="true">
                    ✓
                  </span>
                  {f.label}
                </p>
                <p className="mt-1 text-sm text-green-800">{f.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.recommendations.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-slate-900 mb-3">What You Should Do</h3>
          <ul className="space-y-2">
            {result.recommendations.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="text-blue-600" aria-hidden="true">
                  →
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result.unverifiable.length > 0 && (
        <div>
          <h3 className="text-base font-semibold text-slate-900 mb-3">
            Analysis Details &amp; Limitations
          </h3>
          <ul className="space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
            {result.unverifiable.map((u, i) => (
              <li key={i} className="text-sm text-slate-600">
                • {u}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs text-slate-400 border-t border-slate-200 pt-4">{result.disclaimer}</p>
    </div>
  );
}
