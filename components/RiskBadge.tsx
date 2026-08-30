import { RiskLevel } from "@/lib/engine/types";

const STYLES: Record<RiskLevel, { bg: string; text: string; border: string; icon: string }> = {
  low: { bg: "bg-green-50", text: "text-green-800", border: "border-green-300", icon: "✓" },
  probably_safe: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-300", icon: "✓" },
  caution: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-300", icon: "!" },
  suspicious: { bg: "bg-orange-50", text: "text-orange-800", border: "border-orange-300", icon: "⚠" },
  high_risk: { bg: "bg-red-50", text: "text-red-800", border: "border-red-400", icon: "⛔" },
};

export default function RiskBadge({
  level,
  label,
  score,
}: {
  level: RiskLevel;
  label: string;
  score: number;
}) {
  const s = STYLES[level];
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-xl border-2 ${s.border} ${s.bg} px-5 py-3`}
      role="status"
    >
      <span aria-hidden="true" className={`text-2xl ${s.text}`}>
        {s.icon}
      </span>
      <div>
        <p className={`text-lg font-bold ${s.text}`}>{label}</p>
        <p className={`text-sm ${s.text}`}>Risk score: {score} / 100</p>
      </div>
    </div>
  );
}
