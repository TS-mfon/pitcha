"use client";

import { useState, useEffect } from "react";

/**
 * DeckPresenter: An in-browser, full-screen interactive slide presentation engine.
 * Allows founders to present their pitch deck on stage directly from Pitcha.
 */
export default function DeckPresenter({
  slides = [],
  idea = "Startup Pitch",
  marketSize = "",
  pitchScript = "",
  onClose,
}) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);

  const totalSlides = slides.length || 1;
  const currentSlide = slides[currentSlideIndex] || {
    title: "Startup Pitch",
    bullets: ["Problem statement", "Solution demo", "Market size"],
  };

  // Keyboard navigation: ArrowLeft, ArrowRight, Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowRight" || e.key === "Space") {
        e.preventDefault();
        setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Escape") {
        if (onClose) onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalSlides, onClose]);

  // Auto-play timer (advances every 15 seconds if active)
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    }, 12000);

    return () => clearInterval(interval);
  }, [autoPlay, totalSlides]);

  function handlePrev() {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }

  function handleNext() {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }

  // Slide type badges & color hints
  const slideColors = [
    "from-indigo-500/20 to-purple-500/20 border-indigo-500/40 text-indigo-400",
    "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400",
    "from-amber-500/20 to-yellow-500/20 border-amber-500/40 text-amber-400",
    "from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-400",
  ];
  const accentClass = slideColors[currentSlideIndex % slideColors.length];

  return (
    <div className="fixed inset-0 z-50 bg-[#080C14]/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 select-none text-white animate-fadeIn">
      {/* Top Bar Navigation & Controls */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-pitcha-indigo/20 border border-pitcha-indigo/40 flex items-center justify-center text-sm font-bold text-pitcha-indigo">
            🚀
          </span>
          <div>
            <h2 className="text-sm sm:text-base font-black tracking-tight text-white line-clamp-1">
              {idea}
            </h2>
            <p className="text-[11px] text-slate-400">
              Pitcha Live Stage Presenter Mode
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Auto-Play Toggle */}
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all flex items-center gap-1.5 ${
              autoPlay
                ? "bg-pitcha-gold/20 text-pitcha-gold border-pitcha-gold/40 animate-pulse"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            <span>{autoPlay ? "⏸️ Auto-Playing (12s)" : "▶️ Auto-Play"}</span>
          </button>

          {/* Toggle Speaker Notes */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition-all flex items-center gap-1.5 ${
              showNotes
                ? "bg-pitcha-emerald/20 text-pitcha-emerald border-pitcha-emerald/40"
                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            <span>📝 {showNotes ? "Hide Notes" : "Show Notes"}</span>
          </button>

          {/* Close Presenter */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white text-sm font-bold"
            title="Exit Presenter (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Slide Stage Area */}
      <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col justify-center my-auto py-6">
        <div className="bg-gradient-to-br from-pitcha-surface to-pitcha-elevated border border-pitcha-border rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[420px]">
          {/* Top Radiant Accent Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-pitcha-emerald via-pitcha-indigo to-pitcha-gold"></div>

          {/* Slide Header */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-mono font-bold tracking-wider px-3 py-1 rounded-full border bg-gradient-to-r ${accentClass}`}>
                SLIDE {String(currentSlideIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {Math.round(((currentSlideIndex + 1) / totalSlides) * 100)}% Completed
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
              {currentSlide.title}
            </h1>
          </div>

          {/* Slide Body Bullets */}
          <div className="my-auto py-4">
            <div className="grid grid-cols-1 gap-4">
              {currentSlide.bullets &&
                currentSlide.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#080C14]/60 border border-slate-800/80 hover:border-slate-700 transition-all"
                  >
                    <span className="w-8 h-8 rounded-xl bg-pitcha-emerald/15 border border-pitcha-emerald/30 text-pitcha-emerald font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <p className="text-base sm:text-xl text-slate-200 font-medium leading-relaxed">
                      {bullet}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Slide Footer Branding */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-500">
            <span>Pitcha • African Hackathon Pitch Deck</span>
            <span className="font-mono">Use ← and → keyboard arrows</span>
          </div>
        </div>

        {/* Collapsible Speaker Talking Notes Drawer */}
        {showNotes && (
          <div className="mt-4 p-4 rounded-2xl bg-pitcha-bg/90 border border-pitcha-border-subtle flex flex-col gap-1 text-xs sm:text-sm animate-fadeIn">
            <div className="flex items-center gap-2 text-pitcha-gold font-bold uppercase tracking-wider text-[11px]">
              <span>🎙️</span>
              <span>Founder Speaker Cues:</span>
            </div>
            <p className="text-slate-300 leading-relaxed italic">
              Deliver slide {currentSlideIndex + 1} with direct eye contact. Focus on real numbers, zero buzzwords, and why African market dynamics make this problem urgently investable today.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Timeline & Controls */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between border-t border-slate-800 pt-4">
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center gap-2 ${
            currentSlideIndex === 0
              ? "bg-slate-900/50 text-slate-600 border-slate-800 cursor-not-allowed"
              : "bg-pitcha-elevated hover:bg-slate-800 text-white border-pitcha-border active:scale-95"
          }`}
        >
          <span>←</span>
          <span>Previous Slide</span>
        </button>

        {/* Slide Progress Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlideIndex
                  ? "w-8 bg-pitcha-emerald shadow-glow-emerald"
                  : "w-2 bg-slate-700 hover:bg-slate-500"
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlideIndex === totalSlides - 1}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm border transition-all flex items-center gap-2 ${
            currentSlideIndex === totalSlides - 1
              ? "bg-slate-900/50 text-slate-600 border-slate-800 cursor-not-allowed"
              : "bg-gradient-to-r from-pitcha-emerald to-emerald-600 text-white shadow-glow-emerald hover:brightness-110 active:scale-95"
          }`}
        >
          <span>Next Slide</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
