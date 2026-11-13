"use client";

// Pricing section matching DESIGN_SYSTEM.md 5.8
export default function PricingSection({ isPro, onUpgradeClick }) {
  return (
    <section className="w-full flex flex-col gap-8 pt-8 border-t border-pitcha-border-subtle">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto flex flex-col gap-2">
        <span className="text-xs font-bold text-pitcha-gold uppercase tracking-widest">
          Transparent Hackathon Pricing
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Invest in Your Pitch Before You Hit the Stage
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          Built on Polar sandbox payments. Zero recurring subscription traps — one-time hackathon access.
        </p>
      </div>

      {/* 3-Tier Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {/* Tier 1: Free Starter */}
        <div className="bg-pitcha-surface border border-pitcha-border rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Starter Builder
            </span>
            <div className="flex items-baseline gap-1 my-3">
              <span className="text-3xl font-black text-white">₦0</span>
              <span className="text-xs text-slate-500 font-medium">/ Free Forever</span>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Quick sanity check for hackathon brainstorming sessions.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-pitcha-emerald">✓</span>
                <span>1 Idea X-Ray analysis per browser</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pitcha-emerald">✓</span>
                <span>1 Judge question (Ada - Tech Judge)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-pitcha-emerald">✓</span>
                <span>60-second spoken pitch script</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500 line-through">
                <span>✕</span>
                <span>Tunde (Business) & Sarah (UX) judges</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500 line-through">
                <span>✕</span>
                <span>10-Slide Deck PDF export</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-pitcha-border-subtle">
            <span className="block w-full py-2.5 text-center rounded-xl text-xs font-bold bg-slate-800 text-slate-300 border border-pitcha-border">
              {isPro ? "Previous Plan" : "Current Active Plan"}
            </span>
          </div>
        </div>

        {/* Tier 2: Pro (FEATURED) */}
        <div className="relative bg-pitcha-surface border-2 border-pitcha-emerald rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-glow-emerald">
          {/* Top Badge */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-pitcha-gold text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
            POPULAR FOR HACKATHONS
          </div>

          <div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs font-bold text-pitcha-emerald uppercase tracking-wider">
                Hackathon Winner (Pro)
              </span>
              <span className="text-[10px] bg-pitcha-indigo/20 text-pitcha-indigo border border-pitcha-indigo/40 px-2 py-0.5 rounded-full font-bold">
                Polar Sandbox
              </span>
            </div>

            <div className="flex items-baseline gap-1 my-3">
              <span className="text-4xl font-black text-white">$5</span>
              <span className="text-xs text-slate-400 font-mono"> (~₦5,000 one-time)</span>
            </div>
            <p className="text-xs text-slate-300 mb-6 leading-relaxed">
              Complete investor prep suite to dominate your hackathon demo.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-200">
              <li className="flex items-center gap-2 font-medium">
                <span className="text-pitcha-emerald font-bold">✓</span>
                <span><strong>Unlimited</strong> Idea X-Ray evaluations</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-pitcha-emerald font-bold">✓</span>
                <span><strong>All 3 AI Judges</strong> (Ada, Tunde & Sarah)</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-pitcha-emerald font-bold">✓</span>
                <span>Unlimited judge questions & score feedback</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-pitcha-emerald font-bold">✓</span>
                <span>10-Slide investor deck outline</span>
              </li>
              <li className="flex items-center gap-2 font-medium">
                <span className="text-pitcha-emerald font-bold">✓</span>
                <span>Deck PDF generation & stage demo script</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-pitcha-border-subtle">
            {isPro ? (
              <span className="block w-full py-3 text-center rounded-xl text-xs font-bold bg-pitcha-emerald/20 text-pitcha-emerald border border-pitcha-emerald/40 shadow-glow-emerald">
                ✓ Pro Status Active
              </span>
            ) : (
              <button
                onClick={onUpgradeClick}
                className="w-full py-3 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-pitcha-emerald to-emerald-600 hover:brightness-110 text-white shadow-glow-emerald transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Unlock Pro with Polar</span>
                <span>⚡</span>
              </button>
            )}
          </div>
        </div>

        {/* Tier 3: Team / Campus Club */}
        <div className="bg-pitcha-surface/50 border border-slate-800 border-dashed rounded-2xl p-6 flex flex-col justify-between opacity-75">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Campus Hub & Incubator
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-bold">
                Coming Soon
              </span>
            </div>

            <div className="flex items-baseline gap-1 my-3">
              <span className="text-3xl font-black text-slate-400">Custom</span>
            </div>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              For tech societies, GDGs, and university incubators across Africa.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-500">
              <li className="flex items-center gap-2">
                <span>•</span>
                <span>Bulk licenses for 50+ students</span>
              </li>
              <li className="flex items-center gap-2">
                <span>•</span>
                <span>Custom local judge personas</span>
              </li>
              <li className="flex items-center gap-2">
                <span>•</span>
                <span>Live hackathon leaderboard</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-pitcha-border-subtle">
            <button
              disabled
              className="w-full py-2.5 rounded-xl text-xs font-medium bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed"
            >
              Contact Campus Partner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
