// Simple localStorage helper for Pitcha demo state
// Stores Pro status, free tier usage counts, and cached analysis results.

const STORAGE_KEYS = {
  IS_PRO: "pitcha_is_pro",
  XRAY_COUNT: "pitcha_xray_count",
  JUDGE_COUNT: "pitcha_judge_count",
  LAST_IDEA: "pitcha_last_idea",
  LAST_XRAY: "pitcha_last_xray_result",
  LAST_JUDGE: "pitcha_last_judge_result",
  LAST_DEMO_SCRIPT: "pitcha_last_demo_script",
};

// Safe wrapper for reading localStorage on the client
export function getStoredData() {
  if (typeof window === "undefined") {
    return {
      isPro: false,
      xrayCount: 0,
      judgeCount: 0,
      lastIdea: "",
      lastXray: null,
      lastJudge: null,
      lastDemoScript: null,
    };
  }

  try {
    return {
      isPro: localStorage.getItem(STORAGE_KEYS.IS_PRO) === "true",
      xrayCount: parseInt(localStorage.getItem(STORAGE_KEYS.XRAY_COUNT) || "0", 10),
      judgeCount: parseInt(localStorage.getItem(STORAGE_KEYS.JUDGE_COUNT) || "0", 10),
      lastIdea: localStorage.getItem(STORAGE_KEYS.LAST_IDEA) || "",
      lastXray: JSON.parse(localStorage.getItem(STORAGE_KEYS.LAST_XRAY) || "null"),
      lastJudge: JSON.parse(localStorage.getItem(STORAGE_KEYS.LAST_JUDGE) || "null"),
      lastDemoScript: JSON.parse(localStorage.getItem(STORAGE_KEYS.LAST_DEMO_SCRIPT) || "null"),
    };
  } catch (e) {
    console.error("Failed to read from localStorage:", e);
    return {
      isPro: false,
      xrayCount: 0,
      judgeCount: 0,
      lastIdea: "",
      lastXray: null,
      lastJudge: null,
      lastDemoScript: null,
    };
  }
}

// Save last X-Ray result and update count
export function saveXrayResult(idea, result) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_IDEA, idea);
    localStorage.setItem(STORAGE_KEYS.LAST_XRAY, JSON.stringify(result));
    const currentCount = parseInt(localStorage.getItem(STORAGE_KEYS.XRAY_COUNT) || "0", 10);
    localStorage.setItem(STORAGE_KEYS.XRAY_COUNT, (currentCount + 1).toString());
  } catch (e) {
    console.error("Failed to save X-Ray to localStorage:", e);
  }
}

// Record a judge question asked
export function recordJudgeQuestion() {
  if (typeof window === "undefined") return;
  try {
    const currentCount = parseInt(localStorage.getItem(STORAGE_KEYS.JUDGE_COUNT) || "0", 10);
    localStorage.setItem(STORAGE_KEYS.JUDGE_COUNT, (currentCount + 1).toString());
  } catch (e) {
    console.error("Failed to record judge question:", e);
  }
}

// Save last judge evaluation
export function saveJudgeResult(judgeData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_JUDGE, JSON.stringify(judgeData));
  } catch (e) {
    console.error("Failed to save judge result:", e);
  }
}

// Save last demo script result
export function saveDemoScriptResult(demoData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_DEMO_SCRIPT, JSON.stringify(demoData));
  } catch (e) {
    console.error("Failed to save demo script result:", e);
  }
}

// Set Pro status (for testing or Polar payment redirect)
export function setProStatus(isPro) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.IS_PRO, isPro ? "true" : "false");
  } catch (e) {
    console.error("Failed to set Pro status:", e);
  }
}

// Reset demo usage counters (convenience for demo testing)
export function resetDemoUsage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEYS.XRAY_COUNT);
    localStorage.removeItem(STORAGE_KEYS.JUDGE_COUNT);
    localStorage.removeItem(STORAGE_KEYS.LAST_XRAY);
    localStorage.removeItem(STORAGE_KEYS.LAST_JUDGE);
    localStorage.removeItem(STORAGE_KEYS.LAST_IDEA);
  } catch (e) {
    console.error("Failed to reset usage:", e);
  }
}
