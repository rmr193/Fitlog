"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import { Bookmark, Menu, X, CalendarCheck } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts, isLoaded } = useWorkout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const planCount = isLoaded ? todayPlan.length : 0;
  const savedCount = isLoaded ? savedWorkouts.length : 0;

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1f242d] bg-[#0c0d11]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Left: Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
          >
            <div className="relative w-8 h-8 flex items-center justify-center rounded-lg bg-[#171b24] border border-[#262c3b] group-hover:border-[#ccff00]/40 transition-colors">
              <Image
                src="/assets/logo.png"
                alt="FitLog Logo"
                width={22}
                height={22}
                className="w-5 h-5 object-contain"
                priority
              />
            </div>
            <span
              className="text-2xl font-black tracking-wider text-white uppercase"
              style={{ fontFamily: "var(--font-oswald), sans-serif" }}
            >
              FIT<span className="text-[#ccff00]">LOG</span>
            </span>
          </Link>

          {/* Middle: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 bg-[#12151c] px-3 py-1.5 rounded-full border border-[#1f2533]">
            <Link
              href="/"
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                isWorkoutActive
                  ? "bg-[#1c2230] text-white shadow-sm font-bold border border-[#2b3548]"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[#181d27]"
              }`}
            >
              Workout
            </Link>
            <Link
              href="/my-plan"
              className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                isMyPlanActive
                  ? "bg-[#1c2230] text-white shadow-sm font-bold border border-[#2b3548]"
                  : "text-gray-400 hover:text-gray-200 hover:bg-[#181d27]"
              }`}
            >
              My Plan
            </Link>
          </nav>

          {/* Right: Status Badges (Counters) linking to /my-plan */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Plan Badge - Filled pill with accent background (#ccff00) */}
            <Link
              href="/my-plan?tab=today"
              title="View Today's Plan"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00] hover:bg-[#bbf000] text-[#0c0d11] font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_-3px_rgba(204,255,0,0.35)] active:scale-95"
            >
              <CalendarCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Plan</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#0c0d11] text-[#ccff00] text-xs font-black">
                {planCount}
              </span>
            </Link>

            {/* Saved Badge - Pill with outline/border only */}
            <Link
              href="/my-plan?tab=saved"
              title="View Saved Workouts"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2d3546] hover:border-gray-500 bg-[#121620] hover:bg-[#181d2a] text-gray-200 font-semibold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95"
            >
              <Bookmark className="w-3.5 h-3.5 text-gray-400" />
              <span>Saved</span>
              <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#1e2533] text-gray-300 text-xs font-bold border border-[#2d3546]">
                {savedCount}
              </span>
            </Link>
          </div>

          {/* Mobile Right: Compact Badges & Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/my-plan"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ccff00] text-[#0c0d11] font-bold text-xs"
            >
              <span>Plan</span>
              <span className="bg-black text-[#ccff00] px-1 rounded-full text-[10px] font-black">
                {planCount}
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#141720] border border-[#232938] text-gray-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#1f242d] bg-[#0c0d11] px-4 pt-3 pb-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              isWorkoutActive
                ? "bg-[#1c2230] text-[#ccff00] font-bold border border-[#2b3548]"
                : "text-gray-300 hover:bg-[#151922]"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              isMyPlanActive
                ? "bg-[#1c2230] text-[#ccff00] font-bold border border-[#2b3548]"
                : "text-gray-300 hover:bg-[#151922]"
            }`}
          >
            My Plan
          </Link>
          <div className="pt-2 flex items-center gap-3">
            <Link
              href="/my-plan?tab=today"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#ccff00] text-black font-bold text-xs uppercase"
            >
              <CalendarCheck className="w-4 h-4" />
              Plan ({planCount})
            </Link>
            <Link
              href="/my-plan?tab=saved"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-[#2d3546] bg-[#141824] text-gray-200 font-semibold text-xs uppercase"
            >
              <Bookmark className="w-4 h-4 text-gray-400" />
              Saved ({savedCount})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
