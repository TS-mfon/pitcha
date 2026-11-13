"use client";

// High-impact Problem Score Display (0-10) with verdict badge and visual meter
export default function ProblemScoreGauge({ score = 0 }) {
  const numericScore = typeof score === "number" ? score : parseFloat(score) || 0;

  // Determine tier and styling
  let tierInfo = {
    label: "FATAL GAPS / HIGH RISK",
    badgeClass: "bg-pitcha-coral/20 text-pitcha-coral border-pitcha-coral/40",
    meterClass: "bg-pitcha-coral",
    glowClass: "shadow-glow-coral",
    textColor: "text-pitcha-coral",
  };

  if (numericScore >= 8) {
    tierInfo = {
      label: "INVESTABLE / HACKATHON WINNER",
      badgeClass: "bg-pitcha-emerald/20 text-pitcha-emerald border-pitcha-emerald/40",
      meterClass: "bg-pitcha-emerald",
      glowClass: "shadow-glow-emerald",
      textColor: "text-pitcha-emerald",
    };
  } else if (numericScore >= 5) {
    tierInfo = {
      label: "SURVIVABLE / NEEDS PIVOT",
      badgeClass: "bg-pitcha-gold/20 text-pitcha-gold border-pitcha-gold/40",
      meterClass: "bg-pitcha-gold",
      glowClass: "shadow-glow-gold",
      textColor: "text-pitcha-gold",
    };
  }

  // Calculate percentage for 0-10 scale
  const percentage = Math.min(100, Math.max(0, (numericScore / 10) * 100));

  return (
    <div className="bg-pitcha-surface border border-pitcha-border rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
        Problem Urgency & Viability Score
      </span>

      {/* Big Score Display */}
      <div className="flex items-baseline justify-center gap-1 font-mono my-2">
        <span className="text-6xl sm:text-7xl font-black text-white tracking-tight">
          {numericScore}
        </span>
        <span className="text-2xl text-slate-500 font-bold">/10</span>
      </div>

      {/* Dynamic Verbal Verdict Badge */}
      <div
        className={`inline-block text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border mb-6 ${tierInfo.badgeClass}`}
      >
        {tierInfo.label}
      </div>

      {/* 10-Segmented Meter Bar */}
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mb-1.5">
          <span>0 (FATAL)</span>
          <span>5 (AVERAGE)</span>
          <span>10 (BULLETPROOF)</span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out ${tierInfo.meterClass} ${tierInfo.glowClass}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
