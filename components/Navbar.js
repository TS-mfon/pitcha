"use client";

// Navigation bar with logo, plan status, and upgrade trigger
export default function Navbar({ isPro, onUpgradeClick, onTogglePro }) {
  return (
    <header className="w-full border-b border-pitcha-border-subtle bg-pitcha-bg/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            🚀 Pitcha
          </span>
          <span className="hidden sm:inline-block text-xs bg-pitcha-indigo/20 text-pitcha-indigo border border-pitcha-indigo/30 px-2.5 py-0.5 rounded-full font-semibold">
            Hackathon Edition
          </span>
        </div>

        {/* Plan indicator and actions */}
        <div className="flex items-center gap-3">
          {isPro ? (
            <div className="flex items-center gap-2">
              <span className="text-xs bg-pitcha-emerald/20 text-pitcha-emerald border border-pitcha-emerald/40 px-3 py-1 rounded-full font-bold shadow-glow-emerald flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pitcha-emerald animate-pulse" />
                PRO UNLOCKED
              </span>
              <button
                onClick={onTogglePro}
                title="Click to toggle Free/Pro demo mode"
                className="text-[10px] text-slate-500 hover:text-slate-300 underline"
              >
                (Demo Switch)
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <span className="text-xs bg-slate-800 text-slate-300 border border-pitcha-border px-2.5 py-1 rounded-full font-medium">
                Free Tier
              </span>
              <button
                onClick={onUpgradeClick}
                className="text-xs font-bold bg-gradient-to-r from-pitcha-emerald to-emerald-600 hover:brightness-110 text-white px-3.5 py-1.5 rounded-xl shadow-glow-emerald transition-all active:scale-95"
              >
                Upgrade to Pro
              </button>
              <button
                onClick={onTogglePro}
                title="Click to toggle Free/Pro demo mode"
                className="text-[10px] text-slate-500 hover:text-slate-300 underline"
              >
                (Demo Switch)
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
