"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import IdeaInput from "@/components/IdeaInput";
import XRayResults from "@/components/XRayResults";
import JudgeSimulator from "@/components/JudgeSimulator";
import DemoTimeline from "@/components/DemoTimeline";
import PricingSection from "@/components/PricingSection";
import { XRaySkeleton } from "@/components/LoadingSkeletons";
import Toast from "@/components/Toast";
import {
  getStoredData,
  saveXrayResult,
  recordJudgeQuestion,
  saveJudgeResult,
  saveDemoScriptResult,
  setProStatus,
} from "@/lib/storage";

export default function Home() {
  // Client state
  const [mounted, setMounted] = useState(false);
  const [idea, setIdea] = useState("");
  const [market, setMarket] = useState("nigeria");
  const [isPro, setIsPro] = useState(false);
  const [xrayCount, setXrayCount] = useState(0);
  const [judgeCount, setJudgeCount] = useState(0);
  const [xrayResult, setXrayResult] = useState(null);
  const [savedJudgeData, setSavedJudgeData] = useState(null);
  const [savedDemoScript, setSavedDemoScript] = useState(null);

  // UI state
  const [isLoadingXray, setIsLoadingXray] = useState(false);
  const [toast, setToast] = useState(null);

  // Load persisted demo data from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const data = getStoredData();
    setIsPro(data.isPro);
    setXrayCount(data.xrayCount);
    setJudgeCount(data.judgeCount);
    if (data.lastIdea) setIdea(data.lastIdea);
    if (data.lastXray) setXrayResult(data.lastXray);
    if (data.lastJudge) setSavedJudgeData(data.lastJudge);
    if (data.lastDemoScript) setSavedDemoScript(data.lastDemoScript);
  }, []);

  // Show a notification toast
  function showToast(message, type = "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  }

  // Handle "Upgrade to Pro" button click: initiates Polar Sandbox Checkout
  async function handleUpgradeClick() {
    try {
      showToast("Connecting to Polar sandbox checkout...", "info");
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.url) {
        // Redirect to Polar sandbox checkout page
        window.location.href = data.url;
        return;
      }

      // If credentials missing in .env.local
      showToast(
        data.error || "POLAR_ACCESS_TOKEN / PRODUCT_ID missing in .env.local. Use '(Demo Switch)' to test Pro!",
        "error"
      );
    } catch (err) {
      showToast(
        "Could not initiate checkout. Use the '(Demo Switch)' in the header to preview Pro!",
        "info"
      );
    }
  }

  // Toggle Pro status for instant demo testing
  function handleTogglePro() {
    const nextPro = !isPro;
    setIsPro(nextPro);
    setProStatus(nextPro);
    showToast(
      nextPro ? "Pro mode activated (All judges & unlimited X-Rays unlocked)" : "Free tier mode activated",
      nextPro ? "success" : "info"
    );
  }

  // Execute Idea X-Ray API call
  async function handleRunXray() {
    if (!idea || idea.trim().length < 10) {
      showToast("Idea must be at least 10 characters long.");
      return;
    }

    // Check Free tier limit: 1 X-Ray allowed
    if (!isPro && xrayCount >= 1) {
      handleUpgradeClick();
      return;
    }

    setIsLoadingXray(true);

    try {
      const response = await fetch("/api/xray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim(), market }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze idea.");
      }

      setXrayResult(data);
      const nextCount = xrayCount + 1;
      setXrayCount(nextCount);
      saveXrayResult(idea.trim(), data);
      showToast("Idea X-Ray analysis complete!", "success");
    } catch (err) {
      showToast(err.message || "Something went wrong running Idea X-Ray.");
    } finally {
      setIsLoadingXray(false);
    }
  }

  // Track judge question count
  function handleRecordQuestion() {
    const nextCount = judgeCount + 1;
    setJudgeCount(nextCount);
    recordJudgeQuestion();
  }

  // Save judge interaction
  function handleSaveJudgeData(judgeData) {
    setSavedJudgeData(judgeData);
    saveJudgeResult(judgeData);
  }

  // Save stage demo script
  function handleSaveDemoScript(demoData) {
    setSavedDemoScript(demoData);
    saveDemoScriptResult(demoData);
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-pitcha-bg text-white flex items-center justify-center font-mono text-xs">
        Loading Pitcha...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pitcha-bg text-slate-100 flex flex-col font-sans selection:bg-pitcha-emerald selection:text-slate-950">
      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Top Navigation */}
      <Navbar
        isPro={isPro}
        onUpgradeClick={handleUpgradeClick}
        onTogglePro={handleTogglePro}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-12 sm:gap-16">
        {/* Hero Header */}
        <section className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pitcha-surface border border-pitcha-border text-pitcha-emerald shadow-glow-emerald">
            <span>⚡ Built for African Hackathon Builders & Founders</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Your <span className="text-pitcha-indigo">AI Co-founder</span>,{" "}
            <span className="text-pitcha-emerald">AI Judge</span> &{" "}
            <span className="text-pitcha-gold">AI Salesman</span> in One.
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Stop pitching unvalidated buzzwords. Tear your startup idea apart with honest Nigerian market scrutiny, face 3 ruthless AI judges, and craft a 60-second winning stage pitch.
          </p>
        </section>

        {/* 1. Idea Input Section */}
        <IdeaInput
          idea={idea}
          setIdea={setIdea}
          onSubmit={handleRunXray}
          isLoading={isLoadingXray}
          isPro={isPro}
          xrayCount={xrayCount}
          onUpgradeClick={handleUpgradeClick}
          selectedMarket={market}
          onSelectMarket={setMarket}
        />

        {/* Loading Skeletons */}
        {isLoadingXray && <XRaySkeleton />}

        {/* 2. Idea X-Ray Results (Visible once analyzed or restored from localStorage) */}
        {!isLoadingXray && xrayResult && (
          <XRayResults
            data={xrayResult}
            idea={idea}
            isPro={isPro}
            onUpgradeClick={handleUpgradeClick}
            demoScriptData={savedDemoScript}
          />
        )}

        {/* 3. AI Judge Simulator Arena */}
        <JudgeSimulator
          idea={idea}
          isPro={isPro}
          judgeCount={judgeCount}
          onRecordQuestion={handleRecordQuestion}
          onUpgradeClick={handleUpgradeClick}
          savedJudgeData={savedJudgeData}
          onSaveJudgeData={handleSaveJudgeData}
          market={market}
        />

        {/* 4. Second-by-Second Stage Demo Timeline (Pro Only) */}
        <DemoTimeline
          idea={idea}
          isPro={isPro}
          onUpgradeClick={handleUpgradeClick}
          savedDemoScript={savedDemoScript}
          onSaveDemoScript={handleSaveDemoScript}
          market={market}
        />

        {/* 5. Hackathon Pricing Cards */}
        <PricingSection
          isPro={isPro}
          onUpgradeClick={handleUpgradeClick}
        />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-pitcha-border-subtle bg-pitcha-surface/40 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Pitcha. Engineered for African tech builders & hackathons.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by Google Gemini 3.5 & Polar Sandbox</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
