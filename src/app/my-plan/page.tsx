"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import { Workout } from "@/types/workout";
import {
  CalendarCheck,
  Bookmark,
  Clock,
  Flame,
  Star,
  Dumbbell,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Plus,
  ArrowRight,
  TrendingUp,
  Activity,
} from "lucide-react";

function MyPlanInner() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "saved" ? "saved" : "today";

  const [activeTab, setActiveTab] = useState<"today" | "saved">(initialTab);

  // Sync tab with URL search parameter if it changes
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "today") {
      setActiveTab("today");
    }
  }, [searchParams]);

  const {
    todayPlan,
    savedWorkouts,
    completedWorkoutIds,
    removeFromTodayPlan,
    removeFromSaved,
    addToTodayPlan,
    toggleMarkDone,
    metrics,
    isLoaded,
  } = useWorkout();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#090a0f] py-20 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#202738] border-t-[#ccff00] rounded-full animate-spin" />
        <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
          Loading workouts…
        </p>
      </div>
    );
  }

  const currentList = activeTab === "today" ? todayPlan : savedWorkouts;

  return (
    <div className="min-h-screen bg-[#090a0f] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ccff00] mb-2">
            <Activity className="w-4 h-4" />
            <span>Workout Tracker</span>
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight"
            style={{ fontFamily: "var(--font-oswald), sans-serif" }}
          >
            MY PLAN
          </h1>
          <p className="mt-2 text-gray-400 text-base sm:text-lg">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Section - Metrics Summary Card Row (3 Stat Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Exercises */}
          <div className="p-6 rounded-2xl bg-[#141822] border border-[#222838] flex items-center justify-between shadow-md">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Exercises
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span
                  className="text-4xl sm:text-5xl font-black text-white"
                  style={{ fontFamily: "var(--font-oswald), sans-serif" }}
                >
                  {metrics.totalExercises}
                </span>
                <span className="text-xs text-gray-400 font-semibold">/ 5 max</span>
              </div>
              <p className="mt-1 text-xs text-[#ccff00]">
                {metrics.completedExercises} completed today
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#1b2230] border border-[#263144] flex items-center justify-center text-[#ccff00]">
              <Dumbbell className="w-7 h-7" />
            </div>
          </div>

          {/* Card 2: Minutes */}
          <div className="p-6 rounded-2xl bg-[#141822] border border-[#222838] flex items-center justify-between shadow-md">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Minutes
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span
                  className="text-4xl sm:text-5xl font-black text-white"
                  style={{ fontFamily: "var(--font-oswald), sans-serif" }}
                >
                  {metrics.totalMinutes}
                </span>
                <span className="text-xs text-gray-400 font-semibold">mins</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">Estimated duration</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#1b2230] border border-[#263144] flex items-center justify-center text-blue-400">
              <Clock className="w-7 h-7" />
            </div>
          </div>

          {/* Card 3: Calories */}
          <div className="p-6 rounded-2xl bg-[#141822] border border-[#222838] flex items-center justify-between shadow-md">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Calories
              </p>
              <div className="mt-2 flex items-baseline gap-2">
                <span
                  className="text-4xl sm:text-5xl font-black text-white"
                  style={{ fontFamily: "var(--font-oswald), sans-serif" }}
                >
                  {metrics.totalCalories}
                </span>
                <span className="text-xs text-gray-400 font-semibold">kcal</span>
              </div>
              <p className="mt-1 text-xs text-orange-400">Total burn forecast</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-[#1b2230] border border-[#263144] flex items-center justify-center text-orange-400">
              <Flame className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Tabs: Today's Plan / Saved */}
        <div className="border-b border-[#1f2533] flex items-center gap-4">
          <button
            onClick={() => setActiveTab("today")}
            className={`pb-4 px-2 text-base sm:text-lg font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all duration-200 border-b-2 ${
              activeTab === "today"
                ? "border-[#ccff00] text-white"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <CalendarCheck className={`w-5 h-5 ${activeTab === "today" ? "text-[#ccff00]" : ""}`} />
            <span>Today&apos;s Plan</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-black ${
                activeTab === "today"
                  ? "bg-[#ccff00] text-black"
                  : "bg-[#161a24] text-gray-400 border border-[#232938]"
              }`}
            >
              {todayPlan.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`pb-4 px-2 text-base sm:text-lg font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all duration-200 border-b-2 ${
              activeTab === "saved"
                ? "border-[#ccff00] text-white"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <Bookmark className={`w-5 h-5 ${activeTab === "saved" ? "text-[#ccff00]" : ""}`} />
            <span>Saved Workouts</span>
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-black ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-black"
                  : "bg-[#161a24] text-gray-400 border border-[#232938]"
              }`}
            >
              {savedWorkouts.length}
            </span>
          </button>
        </div>

        {/* Workout Cards List */}
        {currentList.length > 0 ? (
          <div className="space-y-4">
            {currentList.map((workout: Workout) => {
              const isDone = completedWorkoutIds.includes(workout.id);

              return (
                <div
                  key={workout.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                    isDone
                      ? "bg-[#11161d] border-[#1e2e1a] opacity-90"
                      : "bg-[#141822] hover:bg-[#171c28] border-[#222838]"
                  }`}
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-center gap-4 sm:gap-6 flex-1 min-w-0">
                    <div className="relative w-24 h-20 sm:w-28 sm:h-24 rounded-xl bg-[#0c0e14] border border-[#232a3a] overflow-hidden flex-shrink-0">
                      <Image
                        src={workout.image || "/assets/banner.png"}
                        alt={workout.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                      {isDone && (
                        <div className="absolute inset-0 bg-[#090b0e]/70 flex items-center justify-center">
                          <span className="p-1 rounded-full bg-[#ccff00] text-black">
                            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {workout.muscleGroups?.map((m) => (
                          <span
                            key={m}
                            className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#1b2230] text-[#ccff00] border border-[#2b3548]"
                          >
                            {m}
                          </span>
                        ))}
                        {isDone && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#1b2b16] text-[#b8f500] border border-[#2e471f]">
                            COMPLETED
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-lg sm:text-xl font-black uppercase tracking-wide truncate ${
                          isDone ? "text-gray-400 line-through" : "text-white"
                        }`}
                        style={{ fontFamily: "var(--font-oswald), sans-serif" }}
                      >
                        {workout.name}
                      </h3>

                      <p className="text-xs text-gray-400 flex items-center gap-1.5 truncate">
                        <Dumbbell className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        <span>{workout.equipment}</span>
                      </p>

                      {/* Stats Row */}
                      <div className="pt-1 flex items-center gap-4 text-xs text-gray-300 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          {workout.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-orange-400" />
                          {workout.caloriesBurned} kcal
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-white">
                          <Star className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
                          {workout.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap md:flex-nowrap justify-end border-t md:border-t-0 border-[#1c2230] pt-3 md:pt-0">
                    {/* View Details button */}
                    <Link
                      href={`/workout/${workout.id}`}
                      className="px-4 py-2.5 rounded-xl border border-[#262e3e] bg-[#121620] hover:bg-[#191f2e] text-gray-300 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                      <span>View Details</span>
                    </Link>

                    {/* Today's Plan actions */}
                    {activeTab === "today" ? (
                      <>
                        {/* Challenge C3: Mark as Done button */}
                        <button
                          onClick={() => toggleMarkDone(workout.id)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95 ${
                            isDone
                              ? "bg-[#182312] border border-[#3b541d] text-[#ccff00] hover:bg-[#202f18]"
                              : "bg-[#1a2232] hover:bg-[#222c40] border border-[#2d3a52] text-gray-200 hover:text-white"
                          }`}
                        >
                          <CheckCircle2
                            className={`w-4 h-4 ${isDone ? "text-[#ccff00]" : "text-gray-400"}`}
                          />
                          <span>{isDone ? "Done" : "Mark Done"}</span>
                        </button>

                        {/* Challenge C3: Remove button */}
                        <button
                          onClick={() => removeFromTodayPlan(workout.id)}
                          title="Remove from Today's Plan"
                          className="p-2.5 rounded-xl border border-[#2e2329] bg-[#1c1418] hover:bg-red-950/60 text-red-400 hover:text-red-300 transition-colors active:scale-95"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Saved Tab Action: Add to Today's Plan */}
                        <button
                          onClick={() => addToTodayPlan(workout)}
                          className="px-4 py-2.5 rounded-xl bg-[#ccff00] hover:bg-[#bbf000] text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors active:scale-95"
                        >
                          <Plus className="w-4 h-4 stroke-[3]" />
                          <span>Load to Plan</span>
                        </button>

                        {/* Remove from Saved */}
                        <button
                          onClick={() => removeFromSaved(workout.id)}
                          title="Remove from Saved"
                          className="p-2.5 rounded-xl border border-[#2e2329] bg-[#1c1418] hover:bg-red-950/60 text-red-400 hover:text-red-300 transition-colors active:scale-95"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 px-6 rounded-3xl bg-[#12151e] border border-[#1f2533] text-center max-w-xl mx-auto space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-[#1b212f] text-[#ccff00] border border-[#283246] flex items-center justify-center mx-auto shadow-inner">
              {activeTab === "today" ? (
                <CalendarCheck className="w-8 h-8" />
              ) : (
                <Bookmark className="w-8 h-8" />
              )}
            </div>

            <div>
              <h2
                className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide"
                style={{ fontFamily: "var(--font-oswald), sans-serif" }}
              >
                NOTHING HERE YET
              </h2>
              <p className="mt-2 text-gray-400 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                {activeTab === "today"
                  ? "Browse the library and add a lift to get today moving."
                  : "Save lifts from the library to build your future training sessions."}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/#library"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#bbf000] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_-3px_rgba(204,255,0,0.35)] transition-all active:scale-95"
              >
                <span>Go to workouts</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090a0f] py-20 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#202738] border-t-[#ccff00] rounded-full animate-spin" />
          <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
            Loading workouts…
          </p>
        </div>
      }
    >
      <MyPlanInner />
    </Suspense>
  );
}
