"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { setProStatus } from "@/lib/storage";

function SuccessContent() {
  const searchParams = useSearchParams();
  const checkoutId = searchParams.get("checkout_id");

  // Verification states: "verifying" | "paid" | "not_paid" | "error"
  const [state, setState] = useState("verifying");
  const [errorMessage, setErrorMessage] = useState("");
  const [checkoutStatus, setCheckoutStatus] = useState("");

  useEffect(() => {
    // If no checkout ID was provided in the URL
    if (!checkoutId || !checkoutId.trim()) {
      setState("not_paid");
      setErrorMessage("No checkout session ID found in URL parameters.");
      return;
    }

    let isMounted = true;

    async function verifyPayment() {
      try {
        const res = await fetch(`/api/verify?checkout_id=${encodeURIComponent(checkoutId.trim())}`);
        const data = await res.json();

        if (!isMounted) return;

        setCheckoutStatus(data.status || "unknown");

        if (res.ok && data.paid === true) {
          // Strictly unlock Pro ONLY if Polar confirms the payment succeeded
          setProStatus(true);
          setState("paid");
        } else {
          // Explicitly do NOT unlock Pro if cancelled, open, or failed
          setState("not_paid");
          setErrorMessage(
            data.error ||
              `Payment was not completed. Polar session status: ${data.status || "unpaid"}`
          );
        }
      } catch (err) {
        if (!isMounted) return;
        setState("error");
        setErrorMessage(err.message || "Network error while verifying checkout.");
      }
    }

    verifyPayment();

    return () => {
      isMounted = false;
    };
  }, [checkoutId]);

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col justify-between p-6 sm:p-12">
      {/* Top Brand Nav */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between py-4 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tight text-white group-hover:text-emerald-400 transition">
            🚀 Pitcha
          </span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
            Polar Sandbox
          </span>
        </Link>
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1"
        >
          ← Back to Pitcha
        </Link>
      </header>

      {/* Main Status Container */}
      <main className="max-w-2xl mx-auto w-full my-auto py-12">
        {/* 1. VERIFYING STATE */}
        {state === "verifying" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
              <svg
                className="animate-spin h-8 w-8 text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Verifying Your Payment...
            </h1>
            <p className="mt-3 text-slate-400 text-sm max-w-md mx-auto">
              Connecting to Polar sandbox to confirm transaction status. This takes just a moment.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-1.5 w-48 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-emerald-400 to-indigo-500 animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* 2. PAID / CELEBRATION STATE */}
        {state === "paid" && (
          <div className="bg-slate-900/95 border border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Top radiant glow */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />

            {/* Pro badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              PRO BUILDER ACTIVATED • POLAR SANDBOX
            </div>

            {/* Trophy Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-amber-500/10 border border-emerald-500/30 flex items-center justify-center text-4xl shadow-[0_0_35px_-5px_rgba(16,185,129,0.35)]">
              🏆
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              You're Officially Pro!
            </h1>
            <p className="mt-3 text-slate-300 text-base max-w-lg mx-auto">
              Transaction verified successfully. You now possess full, unconstrained access to Pitcha's African startup acceleration suite.
            </p>

            {/* Unlocked Features Checklist */}
            <div className="mt-8 bg-slate-950/60 border border-slate-800 rounded-2xl p-5 text-left max-w-lg mx-auto space-y-3 text-sm">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-800">
                Unlocked Superpowers
              </div>
              <div className="flex items-center gap-3 text-slate-200">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>All 3 AI Judges: Ada (Tech), Tunde (Business), Sarah (UX)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Full 10-Slide Investor Deck outline & jsPDF export</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Second-by-second stage demo script with presenter cues</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>Unlimited brutal Idea X-Rays with deep local market context</span>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-bold text-sm tracking-tight transition shadow-[0_0_25px_-5px_rgba(16,185,129,0.5)] active:scale-[0.98] text-center"
              >
                Launch Dashboard & Practice Pitch →
              </Link>
            </div>
          </div>
        )}

        {/* 3. NOT PAID / CANCELLED STATE */}
        {(state === "not_paid" || state === "error") && (
          <div className="bg-slate-900/90 border border-red-500/40 rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Top red alert bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-red-500" />

            {/* Alert Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
              PAYMENT NOT COMPLETED
            </div>

            {/* Hazard Icon */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-3xl">
              ⚠️
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Payment Incomplete or Cancelled
            </h1>

            <p className="mt-3 text-slate-400 text-sm max-w-md mx-auto">
              We could not verify a successful transaction with Polar. Your account remains on the Free tier.
            </p>

            {/* Reason details */}
            <div className="mt-6 bg-slate-950/80 border border-slate-800 rounded-xl p-4 max-w-md mx-auto text-left text-xs font-mono text-slate-300">
              <div>
                <span className="text-slate-500">Checkout Status: </span>
                <span className="text-amber-400 font-bold uppercase">{checkoutStatus || "unverified"}</span>
              </div>
              {errorMessage && (
                <div className="mt-1 text-red-400">
                  <span className="text-slate-500">Message: </span>
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Return CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition text-center"
              >
                ← Return to Home
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/30 text-center"
              >
                Try Upgrading Again
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto w-full py-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>© 2026 Pitcha. Hackathon Edition.</p>
        <p>Built with Next.js & Polar Sandbox</p>
      </footer>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080C14] text-slate-400 flex items-center justify-center text-sm">
          Loading checkout verification...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
