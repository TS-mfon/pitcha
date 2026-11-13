"use client";

import { useState } from "react";
import LockOverlay from "./LockOverlay";

export default function JudgeSimulator({
  idea,
  isPro,
  judgeCount,
  onRecordQuestion,
  onUpgradeClick,
  savedJudgeData,
  onSaveJudgeData,
}) {
  const [selectedJudge, setSelectedJudge] = useState("ada");
  const [question, setQuestion] = useState(savedJudgeData?.question || "");
  const [answer, setAnswer] = useState(savedJudgeData?.answer || "");
  const [scoreResult, setScoreResult] = useState(savedJudgeData?.scoreResult || null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingScore, setLoadingScore] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Judge personas conforming to DESIGN_SYSTEM.md 5.5
  const judges = [
    {
      id: "ada",
      name: "Ada",
      role: "Strict Technical Judge",
      badge: "TECH ARCHITECTURE & SECURITY",
      icon: "⚡",
      accentColor: "border-judge-ada text-judge-ada",
      badgeBg: "bg-cyan-950/60 text-cyan-400 border-cyan-500/40",
      description: "Tears down databases, offline syncing, scalability, and naive architecture.",
      freeAvailable: true,
    },
    {
      id: "tunde",
      name: "Tunde",
      role: "Business & Revenue Judge",
      badge: "UNIT ECONOMICS & CASHFLOW",
      icon: "💼",
      accentColor: "border-judge-tunde text-judge-tunde",
      badgeBg: "bg-amber-950/60 text-amber-400 border-amber-500/40",
      description: "Demands realistic CAC, Naira pricing, collection habits, and immediate margins.",
      freeAvailable: false,
    },
    {
      id: "sarah",
      name: "Sarah",
      role: "Product & Usability Judge",
      badge: "GRASSROOTS UX & SIMPLICITY",
      icon: "🎯",
      accentColor: "border-judge-sarah text-judge-sarah",
      badgeBg: "bg-pink-950/60 text-pink-400 border-pink-500/40",
      description: "Tests if a non-technical trader in Balogun market can use it without a tutorial.",
      freeAvailable: false,
    },
  ];

  const currentJudgeConfig = judges.find((j) => j.id === selectedJudge) || judges[0];
  const isJudgeGated = !isPro && !currentJudgeConfig.freeAvailable;
  const isQuestionLimitReached = !isPro && judgeCount >= 1 && !question;

  // 1. Fetch Question from Judge
  async function handleGetQuestion() {
    if (!idea || idea.trim().length < 10) {
      setErrorMessage("Please enter an idea with at least 10 characters above first.");
      return;
    }
    if (isJudgeGated || isQuestionLimitReached) {
      onUpgradeClick();
      return;
    }

    setLoadingQuestion(true);
    setErrorMessage("");
    setScoreResult(null);

    try {
      const res = await fetch("/api/judge/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim(), judge: selectedJudge }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to get question from judge.");
      }

      setQuestion(data.question);
      setAnswer("");
      onRecordQuestion();

      if (onSaveJudgeData) {
        onSaveJudgeData({
          judge: selectedJudge,
          question: data.question,
          answer: "",
          scoreResult: null,
        });
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoadingQuestion(false);
    }
  }

  // 2. Submit Founder Answer to Judge
  async function handleSubmitAnswer(e) {
    e.preventDefault();
    if (!answer.trim() || loadingScore) return;

    setLoadingScore(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/judge/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: idea.trim(),
          judge: selectedJudge,
          question: question.trim(),
          answer: answer.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to score answer.");
      }

      setScoreResult(data);

      if (onSaveJudgeData) {
        onSaveJudgeData({
          judge: selectedJudge,
          question,
          answer,
          scoreResult: data,
        });
      }
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setLoadingScore(false);
    }
  }

  return (
    <section className="w-full flex flex-col gap-6 pt-4">
      {/* Arena Title */}
      <div className="flex flex-col gap-1 border-b border-pitcha-border-subtle pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-white">
              🥊 AI Judge Simulator
            </span>
            <span className="text-xs bg-pitcha-indigo/20 text-pitcha-indigo border border-pitcha-indigo/30 px-2 py-0.5 rounded-full font-bold">
              The Headline Arena
            </span>
          </div>
          <span className="text-xs text-slate-400">
            {isPro ? "Unlimited Pro Questions" : `Free Questions: ${Math.max(0, 1 - judgeCount)} left`}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Face 3 ruthless African judges with distinct scrutiny angles. Free tier includes Ada; Pro unlocks Tunde & Sarah.
        </p>
      </div>

      {/* 3 Judge Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {judges.map((j) => {
          const isSelected = selectedJudge === j.id;
          const isLocked = !isPro && !j.freeAvailable;

          return (
            <div
              key={j.id}
              onClick={() => {
                if (isLocked) {
                  onUpgradeClick();
                } else {
                  setSelectedJudge(j.id);
                  setQuestion("");
                  setAnswer("");
                  setScoreResult(null);
                }
              }}
              className={`relative cursor-pointer rounded-2xl p-5 border transition-all ${
                isSelected
                  ? `bg-pitcha-surface ${j.accentColor} border-2 shadow-2xl`
                  : "bg-pitcha-surface/60 hover:bg-pitcha-surface border-pitcha-border"
              }`}
            >
              {/* Lock Badge if gated */}
              {isLocked && (
                <div className="absolute top-3 right-3 bg-pitcha-gold/20 text-pitcha-gold border border-pitcha-gold/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span>🔒</span>
                  <span>Pro Only</span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 rounded-xl bg-pitcha-elevated flex items-center justify-center text-xl border border-pitcha-border">
                  {j.icon}
                </span>
                <div>
                  <h4 className="font-extrabold text-white text-base leading-tight">
                    {j.name}
                  </h4>
                  <p className="text-xs text-slate-400">{j.role}</p>
                </div>
              </div>

              <div className={`inline-block text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border mb-3 ${j.badgeBg}`}>
                {j.badge}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {j.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Error alert toast */}
      {errorMessage && (
        <div className="bg-pitcha-coral/15 border border-pitcha-coral/50 text-pitcha-coral p-4 rounded-xl text-xs sm:text-sm flex items-center justify-between gap-3">
          <span>⚠️ {errorMessage}</span>
          <button
            onClick={() => setErrorMessage("")}
            className="text-xs font-bold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Active Judge Arena Box */}
      <div className="relative bg-pitcha-surface border border-pitcha-border rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* If selected judge is locked or free question limit reached */}
        {isJudgeGated ? (
          <LockOverlay
            title={`Unlock ${currentJudgeConfig.name} (${currentJudgeConfig.role})`}
            subtitle="Upgrade to Pro to practice against all 3 judges with unlimited follow-up interrogations."
            onUpgradeClick={onUpgradeClick}
            badgeText="Judge Locked"
          />
        ) : isQuestionLimitReached ? (
          <LockOverlay
            title="Free Judge Question Limit Reached"
            subtitle="You have used your 1 free judge question. Upgrade to Pro to face unlimited questions from Ada, Tunde, and Sarah."
            onUpgradeClick={onUpgradeClick}
            badgeText="1 Free Question Used"
          />
        ) : null}

        {/* Header for Active Judge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-pitcha-border-subtle">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-pitcha-elevated text-xl flex items-center justify-center border border-pitcha-border">
              {currentJudgeConfig.icon}
            </span>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Facing Judge {currentJudgeConfig.name}</span>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${currentJudgeConfig.badgeBg}`}>
                  Active
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {currentJudgeConfig.description}
              </p>
            </div>
          </div>

          {!question && (
            <button
              onClick={handleGetQuestion}
              disabled={loadingQuestion}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-pitcha-indigo hover:bg-indigo-600 text-white shadow-glow-indigo transition-all active:scale-95 flex items-center gap-2"
            >
              {loadingQuestion ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>{currentJudgeConfig.name} is thinking...</span>
                </>
              ) : (
                <>
                  <span>Ask {currentJudgeConfig.name} a Question</span>
                  <span>⚡</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* If question has been retrieved */}
        {question ? (
          <div className="flex flex-col gap-6">
            {/* The Judge's Hard Question */}
            <div className="bg-pitcha-bg/90 border border-pitcha-border-highlight rounded-xl p-5 shadow-inner">
              <span className="text-[10px] uppercase font-bold text-pitcha-indigo tracking-widest block mb-1">
                Question from {currentJudgeConfig.name}:
              </span>
              <p className="text-base sm:text-lg text-white font-semibold leading-relaxed">
                &ldquo;{question}&rdquo;
              </p>
            </div>

            {/* Founder Answer Form */}
            <form onSubmit={handleSubmitAnswer} className="flex flex-col gap-3">
              <label htmlFor="founder-answer" className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Your Answer to {currentJudgeConfig.name}
              </label>
              <textarea
                id="founder-answer"
                rows={3}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Give a direct, concrete answer without buzzwords..."
                className="w-full bg-pitcha-elevated/70 border border-pitcha-border rounded-xl p-4 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-pitcha-emerald focus:ring-1 focus:ring-pitcha-emerald/30 resize-none leading-relaxed"
              />

              <div className="flex items-center justify-between gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleGetQuestion}
                  disabled={loadingQuestion || loadingScore}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Request another question
                </button>

                <button
                  type="submit"
                  disabled={!answer.trim() || loadingScore}
                  className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                    !answer.trim() || loadingScore
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                      : "bg-gradient-to-r from-pitcha-emerald to-emerald-600 text-white shadow-glow-emerald hover:brightness-110 active:scale-95"
                  }`}
                >
                  {loadingScore ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      <span>Scoring Answer...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Answer to {currentJudgeConfig.name}</span>
                      <span>⚖️</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Score & Verdict Results */}
            {scoreResult && (
              <div className="mt-4 pt-6 border-t border-pitcha-border-subtle flex flex-col gap-5 animate-fadeIn">
                {/* Score Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-pitcha-elevated/80 border border-pitcha-border rounded-xl p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black font-mono text-white">
                      {scoreResult.score}/100
                    </span>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                        scoreResult.score >= 80
                          ? "bg-pitcha-emerald/20 text-pitcha-emerald border-pitcha-emerald/40"
                          : scoreResult.score >= 50
                          ? "bg-pitcha-gold/20 text-pitcha-gold border-pitcha-gold/40"
                          : "bg-pitcha-coral/20 text-pitcha-coral border-pitcha-coral/40"
                      }`}
                    >
                      {scoreResult.score >= 80
                        ? "INVESTABLE ANSWER"
                        : scoreResult.score >= 50
                        ? "PASSABLE / GAPS REMAIN"
                        : "FATAL DEFENSE"}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400">
                    Graded by <strong>{currentJudgeConfig.name}</strong>
                  </span>
                </div>

                {/* Judge Feedback Critique */}
                <div className="bg-pitcha-bg/80 border border-pitcha-border-subtle rounded-xl p-4 sm:p-5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                    {currentJudgeConfig.name}&apos;s Brutal Critique:
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {scoreResult.feedback}
                  </p>
                </div>

                {/* Model Winning Answer */}
                {scoreResult.betterAnswer && (
                  <div className="bg-emerald-950/20 border border-pitcha-emerald/40 rounded-xl p-4 sm:p-5">
                    <span className="text-[10px] font-bold text-pitcha-emerald uppercase tracking-widest block mb-1">
                      💡 How a Top Founder Answers:
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed italic">
                      &ldquo;{scoreResult.betterAnswer}&rdquo;
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="py-8 text-center text-slate-400 text-sm">
            Click <strong>&ldquo;Ask {currentJudgeConfig.name} a Question&rdquo;</strong> to start your cross-examination.
          </div>
        )}
      </div>
    </section>
  );
}
