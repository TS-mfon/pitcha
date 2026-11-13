"use client";

import { useState } from "react";
import LockOverlay from "./LockOverlay";

export default function DemoTimeline({
  idea,
  isPro,
  onUpgradeClick,
  savedDemoScript,
  onSaveDemoScript,
}) {
  const [demoScript, setDemoScript] = useState(savedDemoScript || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Default preview steps shown under the blur overlay for Free users
  const previewSteps = [
    {
      time: "00:00 - 00:25",
      cue: "[STAGE ENTRANCE & HOOK]",
      action: "Walk to center stage, make eye contact with judges, hold hands empty.",
      speech: "Judges, earlier today in Balogun market, Mama Ngozi sold ₦200,000 worth of fabrics...",
      directorNote: "Speak with unhurried conviction. Let the local story land before touching the screen.",
    },
    {
      time: "00:25 - 00:55",
      cue: "[THE BRUTAL PROBLEM]",
      action: "Point to slide showing real merchant notebook vs formal bank denial letter.",
      speech: "She tried getting an inventory loan. The bank demanded collateral she doesn't have...",
      directorNote: "Emphasize the contrast between her real daily cashflow and bank blindness.",
    },
    {
      time: "00:55 - 01:40",
      cue: "[LIVE PRODUCT DEMO]",
      action: "Switch to live screen share or hold up phone running the web app.",
      speech: "Watch this. Mama Ngozi sends a 5-second voice note in Pidgin. Our engine parses it instantly...",
      directorNote: "Show, don't tell. Let the UI update on screen while you speak.",
    },
    {
      time: "01:40 - 02:20",
      cue: "[BUSINESS MODEL & TRACTION]",
      action: "Advance to unit economics slide showing Naira revenue model and pilot numbers.",
      speech: "We charge a 1.5% origination fee on disbursed credit. With 500 pilot merchants...",
      directorNote: "Keep numbers crystal clear. No hypothetical trillions, just realistic monthly revenue.",
    },
    {
      time: "02:20 - 03:00",
      cue: "[THE CLOSING ASK]",
      action: "Direct eye contact with lead judges, display final slide with clear CTA.",
      speech: "We are seeking strategic introductions to microfinance partners. Join us. Thank you!",
      directorNote: "Hold the final pose until applause begins. Do not rush off stage.",
    },
  ];

  async function handleGenerateDemoScript() {
    if (!idea || idea.trim().length < 10) {
      setError("Please provide an idea with at least 10 characters above first.");
      return;
    }

    if (!isPro) {
      onUpgradeClick();
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/demo-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate stage demo script.");
      }

      setDemoScript(data);
      if (onSaveDemoScript) {
        onSaveDemoScript(data);
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const activeSteps = demoScript?.steps || previewSteps;

  return (
    <section className="w-full flex flex-col gap-6 pt-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pitcha-border-subtle pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-white">
              🎬 Second-by-Second Stage Demo Script
            </span>
            <span className="text-xs bg-pitcha-gold/20 text-pitcha-gold border border-pitcha-gold/30 px-2.5 py-0.5 rounded-full font-bold">
              Pro Feature
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete 3-minute stage choreography: presenter actions, exact spoken words, and vocal coaching cues.
          </p>
        </div>

        {isPro && (
          <button
            onClick={handleGenerateDemoScript}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-pitcha-indigo hover:bg-indigo-600 text-white shadow-glow-indigo transition-all active:scale-95 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Choreographing Stage Demo...</span>
              </>
            ) : (
              <>
                <span>{demoScript ? "Regenerate Demo Script" : "Generate Demo Script"}</span>
                <span>⏱️</span>
              </>
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-pitcha-coral/20 border border-pitcha-coral/40 text-pitcha-coral text-xs sm:text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Timeline Container */}
      <div className="relative bg-pitcha-surface border border-pitcha-border rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* If Free user, overlay lock */}
        {!isPro && (
          <LockOverlay
            title="Unlock Second-by-Second Demo Script"
            subtitle="Upgrade to Pro with Polar to generate a bespoke 3-minute stage presentation script with director cues and vocal guidance."
            onUpgradeClick={onUpgradeClick}
            badgeText="Pro Only"
          />
        )}

        {/* Duration / Hook Summary */}
        <div className="mb-8 p-4 bg-pitcha-bg/80 border border-pitcha-border-subtle rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <span className="text-xs sm:text-sm text-slate-300">
              <strong>Target Duration:</strong> 3 Minutes (180 Seconds) • High-Impact Hackathon Presentation
            </span>
          </div>
          {demoScript?.openingHook && (
            <span className="text-xs text-pitcha-emerald font-semibold italic">
              Hook: &ldquo;{demoScript.openingHook}&rdquo;
            </span>
          )}
        </div>

        {/* Vertical Timeline Rail */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-8 sm:space-y-10 my-4">
          {activeSteps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Node Bead */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-pitcha-bg border-2 border-pitcha-emerald shadow-glow-emerald flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-pitcha-emerald" />
              </div>

              {/* Step Card Content */}
              <div className="bg-pitcha-elevated/70 border border-pitcha-border rounded-xl p-5 hover:border-pitcha-border-highlight transition shadow-md">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-pitcha-gold bg-pitcha-gold/15 border border-pitcha-gold/30 px-2.5 py-0.5 rounded-md">
                      ⏱️ {step.time}
                    </span>
                    <span className="text-[11px] font-bold text-pitcha-indigo bg-pitcha-indigo/15 border border-pitcha-indigo/30 px-2 py-0.5 rounded-md uppercase">
                      {step.cue}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono">
                    Step {idx + 1} of {activeSteps.length}
                  </span>
                </div>

                {/* Physical Action Cue */}
                <div className="text-xs text-slate-400 mb-3 flex items-start gap-2 bg-pitcha-bg/60 p-2.5 rounded-lg border border-pitcha-border-subtle">
                  <span className="text-slate-300 font-bold">🎬 STAGE ACTION:</span>
                  <span className="text-slate-300">{step.action}</span>
                </div>

                {/* Spoken Word Lines */}
                <div className="text-sm sm:text-base text-white font-medium leading-relaxed italic bg-pitcha-bg/90 p-3.5 rounded-xl border border-pitcha-border-subtle mb-3">
                  &ldquo;{step.speech}&rdquo;
                </div>

                {/* Director Coaching Note */}
                <div className="text-xs text-pitcha-emerald flex items-start gap-1.5 pt-1">
                  <span>💡</span>
                  <span>
                    <strong>Pitch Coach Note:</strong> {step.directorNote}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
