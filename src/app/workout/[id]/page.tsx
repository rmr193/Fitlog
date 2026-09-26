"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";
import { useWorkout } from "@/context/WorkoutContext";
import {
  ArrowLeft,
  CalendarCheck,
  Bookmark,
  Check,
  Star,
  Clock,
  Flame,
  Dumbbell,
  ShieldAlert,
  Layers,
  ChevronRight,
} from "lucide-react";

import { FALLBACK_WORKOUTS } from "@/data/fallbackWorkouts";

interface WorkoutDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function WorkoutDetailPage({ params }: WorkoutDetailPageProps) {
  const resolvedParams = use(params);
  const workoutId = Number(resolvedParams.id);

  const {
    todayPlan,
    addToTodayPlan,
    removeFromTodayPlan,
    addToSaved,
    removeFromSaved,
    isWorkoutInPlan,
    isWorkoutSaved,
  } = useWorkout();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${workoutId}`);
        if (!res.ok) {
          // If live API returns 429 rate limit or not ok, fallback to local dataset
          console.warn(`Fitlog detail API returned ${res.status}. Falling back to cached exercise.`);
          const localWorkout = FALLBACK_WORKOUTS.find((w) => w.id === workoutId);
          if (localWorkout && isMounted) {
            setWorkout(localWorkout);
            return;
          }
          throw new Error(`Exercise not found (HTTP ${res.status})`);
        }
        const data: Workout = await res.json();
        if (isMounted) {
          setWorkout(data);
        }
      } catch (err: unknown) {
        console.warn("Error fetching workout detail, checking fallback:", err);
        const localWorkout = FALLBACK_WORKOUTS.find((w) => w.id === workoutId);
        if (localWorkout && isMounted) {
          setWorkout(localWorkout);
        } else if (isMounted) {
          setError("Failed to load workout details. The exercise might not exist or the server is unavailable.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (workoutId) {
      fetchDetail();
    }
    return () => {
      isMounted = false;
    };
  }, [workoutId]);

  const inPlan = workout ? isWorkoutInPlan(workout.id) : false;
  const isSaved = workout ? isWorkoutSaved(workout.id) : false;
  const isPlanFull = todayPlan.length >= 5;

  return (
    <div className="min-h-screen bg-[#090a0f] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/#library"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#141822] hover:bg-[#1a202e] border border-[#232938] text-gray-300 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Library</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold uppercase tracking-wider">
            <span>Workouts</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-300">{workout ? workout.name : "Details"}</span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#202738] border-t-[#ccff00] rounded-full animate-spin" />
            <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
              Loading exercise specifications...
            </p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && (error || !workout) && (
          <div className="my-16 max-w-md mx-auto p-8 rounded-2xl bg-[#171116] border border-red-900/60 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950/60 text-red-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2
              className="text-2xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-oswald), sans-serif" }}
            >
              Workout Not Found
            </h2>
            <p className="text-sm text-gray-400">{error || "Unable to display this exercise."}</p>
            <Link
              href="/"
              className="inline-block px-5 py-2.5 rounded-lg bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider"
            >
              Return to Catalog
            </Link>
          </div>
        )}

        {/* Two-Column Detail Layout */}
        {!isLoading && workout && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Visual / Media */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl bg-[#12151e] border border-[#222838] overflow-hidden shadow-2xl flex items-center justify-center group">
                {/* Ambient glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1118] via-transparent to-transparent z-10" />

                <Image
                  src={imgError ? "/assets/banner.png" : workout.image}
                  alt={workout.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  onError={() => setImgError(true)}
                />

                {/* Difficulty tag */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-[#0c0e14]/90 text-[#ccff00] border border-[#2d3a24] backdrop-blur-md">
                    {workout.difficulty}
                  </span>
                </div>

                {/* Rating badge */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0c0e14]/90 border border-[#252c3c] text-white text-xs font-extrabold backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
                  <span>{workout.rating} / 5.0</span>
                </div>
              </div>

              {/* Quick Info bar underneath image */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#141822] border border-[#202738] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1b2230] flex items-center justify-center text-[#ccff00]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Duration</p>
                    <p className="text-base font-extrabold text-white">{workout.duration} Minutes</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#141822] border border-[#202738] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1b2230] flex items-center justify-center text-orange-400">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Burn</p>
                    <p className="text-base font-extrabold text-white">{workout.caloriesBurned} Kcal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sections & Details */}
            <div className="lg:col-span-6 flex flex-col space-y-6">
              {/* Category tags */}
              <div className="flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#192212] text-[#ccff00] border border-[#2c3d1f]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              {/* Title & Description */}
              <div>
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight leading-tight"
                  style={{ fontFamily: "var(--font-oswald), sans-serif" }}
                >
                  {workout.name}
                </h1>
                <p className="mt-3 text-gray-300 text-base leading-relaxed">
                  {workout.description}
                </p>
              </div>

              {/* Key Specs Table / Panel */}
              <div className="rounded-2xl bg-[#131720] border border-[#222838] overflow-hidden">
                <div className="px-5 py-3 border-b border-[#1f2533] bg-[#161b26] flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-300 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#ccff00]" />
                    Key Specifications
                  </span>
                  <span className="text-[11px] font-bold uppercase text-gray-400">
                    Target Protocol
                  </span>
                </div>

                <div className="divide-y divide-[#1d2330] text-sm">
                  <div className="grid grid-cols-3 px-5 py-3 items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Equipment
                    </span>
                    <span className="col-span-2 text-right font-semibold text-white flex items-center justify-end gap-1.5">
                      <Dumbbell className="w-3.5 h-3.5 text-gray-400" />
                      {workout.equipment}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 px-5 py-3 items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Difficulty
                    </span>
                    <span className="col-span-2 text-right font-semibold text-[#ccff00]">
                      {workout.difficulty}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 px-5 py-3 items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Target Sets
                    </span>
                    <span className="col-span-2 text-right font-semibold text-white">
                      {workout.sets} Sets
                    </span>
                  </div>

                  <div className="grid grid-cols-3 px-5 py-3 items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Reps per Set
                    </span>
                    <span className="col-span-2 text-right font-semibold text-white">
                      {workout.reps} Reps
                    </span>
                  </div>

                  <div className="grid grid-cols-3 px-5 py-3 items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Duration
                    </span>
                    <span className="col-span-2 text-right font-semibold text-white">
                      {workout.duration} min
                    </span>
                  </div>

                  <div className="grid grid-cols-3 px-5 py-3 items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Est. Calories
                    </span>
                    <span className="col-span-2 text-right font-semibold text-orange-400">
                      {workout.caloriesBurned} kcal
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructions Section (Ordered List of 4 Steps) */}
              <div className="space-y-3">
                <h3
                  className="text-lg font-black uppercase text-white tracking-wider flex items-center gap-2"
                  style={{ fontFamily: "var(--font-oswald), sans-serif" }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
                  Instructions
                </h3>

                <ol className="space-y-2.5">
                  {workout.instructions?.map((step, idx) => (
                    <li
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#141822] border border-[#202738] flex items-start gap-3.5 transition-colors hover:border-[#2f3a50]"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1e2636] border border-[#2e3a50] text-[#ccff00] text-xs font-black flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-gray-300 leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Call-to-Action Buttons */}
              <div className="pt-4 border-t border-[#1c2230] flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Primary Button: Add to Today's Plan */}
                <button
                  onClick={() => {
                    if (inPlan) {
                      removeFromTodayPlan(workout.id);
                    } else {
                      addToTodayPlan(workout);
                    }
                  }}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                    inPlan
                      ? "bg-[#182312] border border-[#3b541d] text-[#ccff00] hover:bg-red-950/40 hover:border-red-800 hover:text-red-400"
                      : isPlanFull
                      ? "bg-[#161a24] border border-[#293244] text-gray-400 hover:bg-[#1a202d] cursor-pointer"
                      : "bg-[#ccff00] hover:bg-[#bbf000] text-[#0c0d11] shadow-[0_0_25px_-5px_rgba(204,255,0,0.4)] hover:shadow-[0_0_30px_-2px_rgba(204,255,0,0.6)]"
                  }`}
                >
                  {inPlan ? (
                    <>
                      <Check className="w-5 h-5 stroke-[3]" />
                      <span>In Today&apos;s Plan (Click to Remove)</span>
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="w-5 h-5 stroke-[2.5]" />
                      <span>{isPlanFull ? "Plan Limit Reached (5/5)" : "Add to Today's Plan"}</span>
                    </>
                  )}
                </button>

                {/* Secondary Button: Save for Later */}
                <button
                  onClick={() => {
                    if (isSaved) {
                      removeFromSaved(workout.id);
                    } else {
                      addToSaved(workout);
                    }
                  }}
                  className={`flex items-center justify-center gap-2 py-4 px-6 rounded-xl border font-bold text-sm uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                    isSaved
                      ? "bg-[#192233] border-[#374662] text-white hover:bg-[#202c42]"
                      : "bg-[#121620] hover:bg-[#181d2a] border-[#252c3c] hover:border-gray-500 text-gray-300 hover:text-white"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isSaved ? "text-[#ccff00] fill-[#ccff00]" : "text-gray-400"}`}
                  />
                  <span>{isSaved ? "Saved" : "Save for Later"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
