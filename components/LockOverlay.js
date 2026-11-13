"use client";

// Reusable blurred lock overlay for gating Pro features
export default function LockOverlay({
  title = "Unlock Full Investor Access",
  subtitle = "Unlock all 3 brutal AI judges, unlimited Idea X-Rays, 10-slide deck export, and second-by-second demo scripts.",
  onUpgradeClick,
  badgeText = "Pro Feature",
}) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center p-4 backdrop-blur-md bg-pitcha-bg/85 rounded-2xl">
      <div className="max-w-md w-full bg-pitcha-surface/95 border border-pitcha-indigo/40 rounded-2xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-pitcha-indigo/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pitcha-emerald/20 rounded-full blur-2xl pointer-events-none" />

        {/* Lock icon */}
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pitcha-indigo/20 to-pitcha-gold/20 border border-pitcha-gold/40 flex items-center justify-center text-2xl shadow-glow-gold">
          🔒
        </div>

        {/* Feature badge */}
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-pitcha-gold bg-pitcha-gold/15 border border-pitcha-gold/30 px-3 py-0.5 rounded-full mb-3">
          {badgeText}
        </span>

        {/* Title & subtitle */}
        <h4 className="text-xl font-bold text-white tracking-tight mb-2">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
          {subtitle}
        </p>

        {/* Upgrade CTA button */}
        <button
          onClick={onUpgradeClick}
          className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-pitcha-emerald to-emerald-600 hover:brightness-110 text-white shadow-glow-emerald transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Upgrade to Pro</span>
          <span>⚡</span>
        </button>

        <p className="mt-3 text-[11px] text-slate-500 font-medium">
          Polar Sandbox Enabled • One-time demo unlock
        </p>
      </div>
    </div>
  );
}
