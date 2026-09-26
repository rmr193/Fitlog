import React from "react";
import Link from "next/link";
import { Dumbbell, ArrowLeft, CalendarCheck } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 min-h-[70vh] flex items-center justify-center p-6 bg-[#090a0f]">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-[#131620] border border-[#222838] text-center shadow-2xl space-y-6">
        {/* Gym themed icon badge */}
        <div className="w-16 h-16 rounded-2xl bg-[#1b2230] border border-[#2b374c] text-[#ccff00] flex items-center justify-center mx-auto shadow-inner">
          <Dumbbell className="w-8 h-8 -rotate-45" />
        </div>

        {/* 404 Text */}
        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-[#ccff00] px-3 py-1 rounded-full bg-[#182312] border border-[#2c3d1f]">
            Error 404
          </span>
          <h1
            className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight pt-2"
            style={{ fontFamily: "var(--font-oswald), sans-serif" }}
          >
            SET FAILED
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Looks like you dropped the barbell. This page doesn&apos;t exist or has been racked away.
          </p>
        </div>

        {/* Navigation Action Buttons */}
        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#ccff00] hover:bg-[#bbf000] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_-3px_rgba(204,255,0,0.35)] transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Workouts</span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-[#262c3b] hover:border-gray-500 bg-[#121620] hover:bg-[#181d2a] text-gray-300 hover:text-white font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            <CalendarCheck className="w-4 h-4 text-gray-400" />
            <span>View Today&apos;s Plan</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
