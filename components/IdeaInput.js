"use client";

import { MARKETS } from "@/lib/markets";

// Startup idea input section with character validation, target market selector, quick pills, and X-Ray trigger
export default function IdeaInput({
  idea,
  setIdea,
  onSubmit,
  isLoading,
  isPro,
  xrayCount,
  onUpgradeClick,
  selectedMarket = "nigeria",
  onSelectMarket,
}) {
  const charCount = (idea || "").trim().length;
  const isTooShort = charCount < 10;
  const isFreeExhausted = !isPro && xrayCount >= 1;

  const currentMarketConfig = MARKETS[selectedMarket] || MARKETS.nigeria;
  const examplePrompts = currentMarketConfig.examples;

  function handleSubmit(e) {
    e.preventDefault();
    if (isTooShort || isLoading) return;
    if (isFreeExhausted) {
      onUpgradeClick();
      return;
    }
    onSubmit();
  }

  return (
    <section className="w-full flex flex-col gap-3">
      {/* Target Ecosystem / Market Selector Pills */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-pitcha-surface/80 border border-pitcha-border rounded-xl p-2.5 sm:px-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>🎯 Target Market:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {Object.values(MARKETS).map((m) => {
            const isSelected = selectedMarket === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelectMarket && onSelectMarket(m.id)}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-pitcha-emerald/20 text-pitcha-emerald border-pitcha-emerald/50 shadow-sm"
                    : "bg-pitcha-elevated/60 text-slate-400 hover:text-white border-pitcha-border-subtle"
                }`}
              >
                <span>{m.flag}</span>
                <span>{m.name}</span>
                <span className="text-[10px] opacity-75 font-mono">({m.currency.split(" ")[0]})</span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Textarea container with African command-center styling */}
        <div className="relative bg-pitcha-surface/90 border border-pitcha-border rounded-2xl p-4 sm:p-5 shadow-2xl transition-all focus-within:border-pitcha-emerald focus-within:ring-2 focus-within:ring-pitcha-emerald/20">
          <label htmlFor="idea-input" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Pitch Your Startup or Hackathon Idea ({currentMarketConfig.name} Ecosystem)
          </label>

          <textarea
            id="idea-input"
            rows={4}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="e.g. An AI bookkeeping assistant that helps market women in Balogun market record daily inventory via WhatsApp voice notes in Yoruba and Pidgin..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base resize-none focus:outline-none leading-relaxed"
          />

          {/* Bottom metadata bar */}
          <div className="mt-3 pt-3 border-t border-pitcha-border-subtle flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Live Character counter */}
            <div className="flex items-center gap-2">
              <span
                className={`font-mono font-semibold px-2 py-0.5 rounded-md ${
                  isTooShort
                    ? "bg-pitcha-coral/15 text-pitcha-coral border border-pitcha-coral/30"
                    : "bg-pitcha-emerald/15 text-pitcha-emerald border border-pitcha-emerald/30"
                }`}
              >
                {charCount} chars
              </span>
              <span className="text-slate-400">
                {isTooShort ? "At least 10 characters needed" : "Ready for brutal evaluation"}
              </span>
            </div>

            {/* Tier limit indicator */}
            <div className="text-slate-500 text-xs">
              {isPro ? (
                <span className="text-pitcha-emerald font-medium">Unlimited Pro X-Rays</span>
              ) : (
                <span>
                  Free Tier: <strong className="text-slate-300">{Math.max(0, 1 - xrayCount)}</strong> remaining
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick prompt pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Try an example:</span>
          {examplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setIdea(prompt)}
              className="text-xs bg-pitcha-elevated hover:bg-slate-700/80 text-slate-300 hover:text-white px-3 py-1.5 rounded-xl border border-pitcha-border-subtle transition-all active:scale-95 text-left"
            >
              💡 {prompt}
            </button>
          ))}
        </div>

        {/* Submit button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span>⚡ Persona:</span>
            <span className="text-slate-200 font-semibold">
              Brutally honest African venture partner & startup analyst
            </span>
          </div>

          <button
            type="submit"
            disabled={isTooShort || isLoading}
            className={`w-full sm:w-auto h-12 px-8 rounded-xl font-bold text-sm tracking-tight transition-all flex items-center justify-center gap-2 ${
              isTooShort || isLoading
                ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                : "bg-gradient-to-r from-pitcha-emerald to-emerald-600 text-white shadow-glow-emerald hover:brightness-110 active:scale-95"
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Analyzing Pitch...</span>
              </>
            ) : isFreeExhausted ? (
              <>
                <span>🔒 Free X-Ray Used (Upgrade to Pro)</span>
              </>
            ) : (
              <>
                <span>X-Ray My Idea</span>
                <span>🔬</span>
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
