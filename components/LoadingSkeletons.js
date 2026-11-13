"use client";

// Shimmering skeleton loader for Idea X-Ray analysis matching DESIGN_SYSTEM.md 5.10
export function XRaySkeleton() {
  return (
    <div className="w-full flex flex-col gap-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 border-b border-pitcha-border-subtle pb-4">
        <div className="h-7 w-48 bg-slate-800 rounded-lg" />
        <div className="h-4 w-72 bg-slate-850 rounded" />
      </div>

      {/* Score Gauge Skeleton */}
      <div className="bg-pitcha-surface border border-pitcha-border rounded-2xl p-8 flex flex-col items-center">
        <div className="h-4 w-36 bg-slate-800 rounded mb-4" />
        <div className="h-16 w-32 bg-slate-800 rounded-xl mb-4" />
        <div className="h-6 w-44 bg-slate-800 rounded-full mb-6" />
        <div className="h-3 w-full max-w-md bg-slate-800 rounded-full" />
      </div>

      {/* Market Context Skeleton */}
      <div className="bg-pitcha-surface border border-pitcha-border rounded-2xl p-6">
        <div className="h-5 w-40 bg-slate-800 rounded mb-3" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-slate-800 rounded" />
          <div className="h-4 w-5/6 bg-slate-800 rounded" />
        </div>
      </div>

      {/* Weakness & Pivot Skeleton (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-950/10 border border-red-900/30 rounded-2xl p-6">
          <div className="h-4 w-32 bg-red-900/40 rounded mb-3" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-800 rounded" />
            <div className="h-4 w-4/5 bg-slate-800 rounded" />
          </div>
        </div>

        <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-2xl p-6">
          <div className="h-4 w-32 bg-emerald-900/40 rounded mb-3" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-800 rounded" />
            <div className="h-4 w-4/5 bg-slate-800 rounded" />
          </div>
        </div>
      </div>

      {/* Script Skeleton */}
      <div className="bg-pitcha-surface border border-pitcha-border rounded-2xl p-6">
        <div className="h-5 w-48 bg-slate-800 rounded mb-4" />
        <div className="h-24 bg-slate-900 rounded-xl" />
      </div>
    </div>
  );
}

// Judge question/scoring skeleton
export function JudgeSkeleton() {
  return (
    <div className="w-full bg-pitcha-surface border border-pitcha-border rounded-2xl p-6 flex flex-col gap-4 animate-pulse">
      <div className="h-5 w-44 bg-slate-800 rounded" />
      <div className="h-16 bg-pitcha-elevated rounded-xl" />
      <div className="h-10 w-36 bg-slate-800 rounded-xl ml-auto" />
    </div>
  );
}
