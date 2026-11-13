"use client";

import { useState, useEffect, useRef } from "react";

/**
 * TeleprompterModal: Live 60-second pitch practice suite.
 * Features auto-scrolling, a circular countdown timer, reading pace control,
 * and built-in voice rehearsal audio recording.
 */
export default function TeleprompterModal({
  script = "",
  idea = "Startup Pitch",
  onClose,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [fontSize, setFontSize] = useState(28); // in px
  const [speed, setSpeed] = useState(1.5); // px per frame
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const scrollRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Word count & estimated WPM
  const wordCount = script.trim() ? script.trim().split(/\s+/).length : 0;
  const targetWpm = Math.round((wordCount / 60) * 60);

  // Countdown timer logic
  useEffect(() => {
    let interval = null;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  // Smooth auto-scroll loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    function scrollStep() {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += speed;
      }
      animationFrameRef.current = requestAnimationFrame(scrollStep);
    }

    animationFrameRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, speed]);

  // Keyboard shortcut listener (Space = Play/Pause, Esc = Close)
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setIsPlaying((prev) => !prev);
      } else if (e.key === "Escape") {
        if (onClose) onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Clean up audio blob URL on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Reset teleprompter
  function handleReset() {
    setIsPlaying(false);
    setTimeLeft(60);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }

  // Voice Rehearsal Recorder (MediaRecorder API)
  async function handleToggleRecording() {
    if (isRecording) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
      return;
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Audio recording is not supported on this browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Stop all tracks to release the mic
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);

      // Auto-start teleprompter when recording starts if not already running
      if (!isPlaying && timeLeft > 0) {
        setIsPlaying(true);
      }
    } catch (err) {
      console.error("Mic access error:", err);
      alert("Could not access microphone: " + err.message);
      setIsRecording(false);
    }
  }

  // Timer ring calculation
  const circleRadius = 26;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (timeLeft / 60) * circumference;

  return (
    <div className="fixed inset-0 z-50 bg-[#080C14]/98 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 text-white animate-fadeIn select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 max-w-5xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-pitcha-indigo/20 border border-pitcha-indigo/40 flex items-center justify-center text-xl">
            ⏱️
          </span>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white line-clamp-1">
              60-Second Teleprompter Studio
            </h2>
            <p className="text-xs text-slate-400">
              {idea} • {wordCount} words (~{targetWpm} WPM tempo)
            </p>
          </div>
        </div>

        {/* Top Controls: Font Size, Speed, Exit */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Font Size Adjusters */}
          <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setFontSize((f) => Math.max(20, f - 2))}
              className="px-2 py-1 text-slate-400 hover:text-white"
              title="Smaller font"
            >
              A-
            </button>
            <span className="px-1 text-slate-500 font-mono">{fontSize}px</span>
            <button
              onClick={() => setFontSize((f) => Math.min(42, f + 2))}
              className="px-2 py-1 text-slate-400 hover:text-white"
              title="Larger font"
            >
              A+
            </button>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <button
              onClick={() => setSpeed(1.0)}
              className={`px-2 py-1 rounded font-bold ${
                speed === 1.0 ? "bg-pitcha-indigo text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Slow
            </button>
            <button
              onClick={() => setSpeed(1.5)}
              className={`px-2 py-1 rounded font-bold ${
                speed === 1.5 ? "bg-pitcha-indigo text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setSpeed(2.2)}
              className={`px-2 py-1 rounded font-bold ${
                speed === 2.2 ? "bg-pitcha-indigo text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              Fast
            </button>
          </div>

          {/* Exit Modal Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white font-bold"
            title="Exit Teleprompter (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Teleprompter Text Viewport */}
      <div className="flex-1 max-w-4xl w-full mx-auto relative my-4 overflow-hidden flex flex-col justify-center">
        {/* Eye Level Guide Beam */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-20 bg-gradient-to-r from-pitcha-emerald/10 via-pitcha-indigo/15 to-pitcha-emerald/10 border-y border-pitcha-indigo/30 pointer-events-none z-10 rounded-xl">
          <span className="absolute left-2 top-1 text-[10px] uppercase font-bold text-pitcha-indigo tracking-widest font-mono">
            ▶ Eye Level Guide
          </span>
        </div>

        {/* Auto-scrolling script container */}
        <div
          ref={scrollRef}
          className="h-[440px] overflow-y-auto px-6 sm:px-12 py-48 scroll-smooth text-center"
          style={{ scrollBehavior: "smooth" }}
        >
          <p
            className="font-extrabold text-slate-100 leading-relaxed tracking-wide transition-all select-text"
            style={{ fontSize: `${fontSize}px` }}
          >
            {script || "No pitch script provided."}
          </p>
        </div>
      </div>

      {/* Bottom Floating Dashboard Bar */}
      <div className="max-w-5xl w-full mx-auto border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between gap-4">
        {/* Countdown Timer with SVG Ring */}
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 -rotate-90">
              <circle
                cx="28"
                cy="28"
                r={circleRadius}
                className="stroke-slate-800"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="28"
                cy="28"
                r={circleRadius}
                stroke={timeLeft <= 10 ? "#EF4444" : timeLeft <= 25 ? "#F59E0B" : "#10B981"}
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <span
              className={`absolute text-sm font-black font-mono ${
                timeLeft <= 10 ? "text-red-400 animate-pulse" : "text-white"
              }`}
            >
              {timeLeft}s
            </span>
          </div>

          <div>
            <span className="text-xs font-bold text-white block">
              {timeLeft === 0 ? "Time Expired! Stop Pitching." : "60s Hackathon Pitch Window"}
            </span>
            <span className="text-[11px] text-slate-400">
              Press [Space] to pause or resume
            </span>
          </div>
        </div>

        {/* Play / Pause / Reset Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={timeLeft === 0}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center gap-2 active:scale-95 ${
              isPlaying
                ? "bg-pitcha-gold text-black shadow-glow-gold hover:brightness-110"
                : "bg-gradient-to-r from-pitcha-emerald to-emerald-600 text-white shadow-glow-emerald hover:brightness-110"
            }`}
          >
            <span>{isPlaying ? "⏸️ Pause Prompter" : "▶️ Start Prompter"}</span>
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white transition"
          >
            ↺ Reset
          </button>
        </div>

        {/* Voice Practice Audio Recorder */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleToggleRecording}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs border transition-all flex items-center gap-2 active:scale-95 ${
              isRecording
                ? "bg-red-500/20 text-red-400 border-red-500/50 animate-pulse shadow-lg"
                : "bg-pitcha-elevated hover:bg-slate-800 text-slate-300 hover:text-white border-pitcha-border"
            }`}
          >
            <span className={isRecording ? "w-2 h-2 rounded-full bg-red-400 animate-ping mr-1" : ""}>
              {isRecording ? "⏹️ Stop Recording" : "🎙️ Record Practice"}
            </span>
          </button>

          {/* Audio Player for Rehearsal Review */}
          {audioUrl && (
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl animate-fadeIn">
              <span className="text-xs font-bold text-pitcha-emerald">🎧 Playback:</span>
              <audio src={audioUrl} controls className="h-7 w-44" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
