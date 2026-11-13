"use client";

// Toast component conforming to DESIGN_SYSTEM.md 5.11 and WCAG 44px touch targets
export default function Toast({ message, type = "error", onClose }) {
  if (!message) return null;

  let badgeBorder = "border-pitcha-coral/50 shadow-glow-coral";
  let icon = "⚠️";

  if (type === "success") {
    badgeBorder = "border-pitcha-emerald/50 shadow-glow-emerald";
    icon = "✓";
  } else if (type === "info") {
    badgeBorder = "border-pitcha-indigo/50 shadow-glow-indigo";
    icon = "⚡";
  }

  return (
    <div className="fixed top-4 inset-x-4 sm:top-6 sm:inset-x-auto sm:right-6 z-50 max-w-sm w-full animate-fadeIn">
      <div
        className={`p-4 rounded-xl shadow-2xl backdrop-blur-md flex items-start gap-3 border bg-pitcha-surface/95 text-white ${badgeBorder}`}
      >
        <span className="text-lg leading-none mt-0.5">{icon}</span>

        <div className="flex-1 text-xs sm:text-sm leading-relaxed text-slate-200">
          {message}
        </div>

        <button
          onClick={onClose}
          aria-label="Dismiss notification"
          className="w-8 h-8 -mr-1 -mt-1 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
