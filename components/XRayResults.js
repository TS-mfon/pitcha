"use client";

import { useState } from "react";
import ProblemScoreGauge from "./ProblemScoreGauge";
import DeckPresenter from "./DeckPresenter";
import { generateDeckPDF } from "@/lib/deckPdf";

// Displays the complete Idea X-Ray analysis
export default function XRayResults({
  data,
  idea = "",
  isPro = false,
  onUpgradeClick,
  demoScriptData = null,
}) {
  const [copied, setCopied] = useState(false);
  const [activeSlide, setActiveSlide] = useState(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);

  if (!data) return null;

  const {
    problemScore = 0,
    marketSize = "",
    competitors = [],
    weakness = "",
    suggestion = "",
    pitchScript = "",
    slideOutline = [],
  } = data;

  // Copy pitch script to clipboard
  function handleCopyScript() {
    if (!pitchScript) return;
    navigator.clipboard.writeText(pitchScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Handle PDF Generation (Pro Only)
  function handleDownloadDeck() {
    if (!isPro) {
      if (onUpgradeClick) onUpgradeClick();
      return;
    }

    try {
      setDownloadingPdf(true);
      generateDeckPDF({
        idea: idea || "Startup Pitch",
        xrayData: data,
        demoScriptData,
      });
    } catch (e) {
      alert("Failed to generate PDF: " + e.message);
    } finally {
      setDownloadingPdf(false);
    }
  }

  return (
    <section className="w-full flex flex-col gap-8 animate-fadeIn">
      {/* Section Header */}
      <div className="flex flex-col gap-1 border-b border-pitcha-border-subtle pb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl sm:text-2xl font-black text-white">
            🔬 Idea X-Ray Breakdown
          </span>
          <span className="text-xs bg-pitcha-emerald/20 text-pitcha-emerald border border-pitcha-emerald/30 px-2 py-0.5 rounded-full font-bold">
            Live Analysis
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Brutally honest critique, competitor gap map, and pitch deck outline.
        </p>
      </div>

      {/* 1. Big Score Gauge */}
      <ProblemScoreGauge score={problemScore} />

      {/* 2. Market Size & Opportunity */}
      <div className="bg-pitcha-surface border border-pitcha-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🌍</span>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Market Size & African Local Context
          </h3>
        </div>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {marketSize || "Market context analysis unavailable."}
        </p>
      </div>

      {/* 3. Brutal Flaw vs Concrete Pivot (Side by Side Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fatal Flaw / Weakness */}
        <div className="bg-red-950/20 border border-pitcha-coral/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-pitcha-coral mb-3 font-bold text-sm uppercase tracking-wider">
              <span>⚠️</span>
              <span>Fatal Blindspot / Weakness</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {weakness || "No fatal flaw identified."}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-red-500/20 text-xs text-red-400/80 font-medium">
            Fix this before pitching to serious African investors.
          </div>
        </div>

        {/* Concrete Pivot / Suggestion */}
        <div className="bg-emerald-950/20 border border-pitcha-emerald/40 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-pitcha-emerald mb-3 font-bold text-sm uppercase tracking-wider">
              <span>💡</span>
              <span>10x Unfair Advantage Pivot</span>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {suggestion || "No pivot suggestion provided."}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-500/20 text-xs text-emerald-400/80 font-medium">
            Turn local friction into your competitive moat.
          </div>
        </div>
      </div>

      {/* 4. Competitors & Gaps */}
      {competitors && competitors.length > 0 && (
        <div className="bg-pitcha-surface border border-pitcha-border rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl">⚔️</span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Competitor Landscape & Where They Drop The Ball
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {competitors.map((comp, idx) => (
              <div
                key={idx}
                className="bg-pitcha-elevated/70 border border-pitcha-border-subtle rounded-xl p-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">
                    {comp.name || `Competitor ${idx + 1}`}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-pitcha-gold bg-pitcha-gold/15 px-2 py-0.5 rounded-full">
                    The Gap
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {comp.gap || "Missing specific gap analysis."}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. 60-Second Pitch Script (Teleprompter Card) */}
      <div className="bg-pitcha-surface border border-pitcha-indigo/40 rounded-2xl p-6 sm:p-7 shadow-2xl relative">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-pitcha-border-subtle">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎙️</span>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                60-Second Stage Pitch Script
              </h3>
              <p className="text-xs text-slate-400">
                Spoken-word cadence with an African market hook.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-pitcha-elevated text-slate-300 px-2.5 py-1 rounded-lg border border-pitcha-border-subtle">
              ⏱️ ~60s | {pitchScript.split(" ").length} words
            </span>
            <button
              onClick={handleCopyScript}
              className="text-xs font-bold bg-pitcha-elevated hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl border border-pitcha-border transition active:scale-95 flex items-center gap-1.5"
            >
              <span>{copied ? "✓ Copied!" : "📋 Copy Script"}</span>
            </button>
          </div>
        </div>

        {/* Script text block */}
        <div className="bg-pitcha-bg/90 border border-pitcha-border-subtle rounded-xl p-4 sm:p-5 font-sans text-sm sm:text-base text-slate-200 leading-relaxed italic whitespace-pre-line">
          &ldquo;{pitchScript}&rdquo;
        </div>
      </div>

      {/* 6. 10-Slide Deck Outline */}
      {slideOutline && slideOutline.length > 0 && (
        <div className="bg-pitcha-surface border border-pitcha-border rounded-2xl p-6 sm:p-7 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-pitcha-border-subtle">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>📑</span>
                <span>10-Slide Investor Deck Outline</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                The battle-tested 10-slide sequence for African hackathon pitch decks.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              <span className="text-xs font-mono font-bold bg-pitcha-emerald/15 text-pitcha-emerald border border-pitcha-emerald/30 px-2.5 py-1 rounded-full">
                {slideOutline.length} Slides
              </span>

              {/* Present Deck Live Button */}
              <button
                type="button"
                onClick={() => setIsPresenting(true)}
                className="text-xs font-bold px-3 py-2 rounded-xl bg-pitcha-indigo/20 hover:bg-pitcha-indigo text-pitcha-indigo hover:text-white border border-pitcha-indigo/40 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                title="Open full-screen presentation mode"
              >
                <span>🖥️</span>
                <span>Present Deck</span>
              </button>

              {/* Download Deck PDF Button (Pro Only) */}
              <button
                onClick={handleDownloadDeck}
                disabled={downloadingPdf}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 active:scale-95 ${
                  isPro
                    ? "bg-gradient-to-r from-pitcha-emerald to-emerald-600 hover:brightness-110 text-white shadow-glow-emerald"
                    : "bg-pitcha-elevated hover:bg-slate-700 text-slate-300 border border-pitcha-border"
                }`}
              >
                {downloadingPdf ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Generating PDF...</span>
                  </>
                ) : (
                  <>
                    <span>{isPro ? "📥 Download Deck PDF" : "🔒 Download Deck PDF (Pro)"}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sequential 10-Slide Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slideOutline.map((slide, index) => {
              const slideNumber = index + 1;
              const isExpanded = activeSlide === index;

              return (
                <div
                  key={index}
                  onClick={() => setActiveSlide(isExpanded ? null : index)}
                  className={`cursor-pointer rounded-xl p-4 border transition-all ${
                    isExpanded
                      ? "bg-pitcha-elevated border-pitcha-emerald/50 shadow-lg"
                      : "bg-pitcha-elevated/50 hover:bg-pitcha-elevated border-pitcha-border-subtle"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-pitcha-bg font-mono font-bold text-xs text-pitcha-emerald border border-pitcha-border flex items-center justify-center">
                        {slideNumber}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {slide.title || `Slide ${slideNumber}`}
                      </h4>
                    </div>
                    <span className="text-xs text-slate-500">
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mt-2 pl-2 border-l border-slate-700/60">
                    {slide.bullets && slide.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-300 leading-relaxed flex items-start gap-1.5">
                        <span className="text-pitcha-emerald text-[10px] mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Full-Screen Live Deck Presenter Mode */}
      {isPresenting && (
        <DeckPresenter
          slides={slideOutline}
          idea={idea || "Startup Pitch"}
          marketSize={marketSize}
          pitchScript={pitchScript}
          onClose={() => setIsPresenting(false)}
        />
      )}
    </section>
  );
}
