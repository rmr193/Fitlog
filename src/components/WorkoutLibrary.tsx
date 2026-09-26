"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Workout, SortOption } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Layers,
  Dumbbell,
} from "lucide-react";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedMuscle, setSelectedMuscle] = useState<string>("ALL");

  // Challenge C1: Sort By state (default: duration)
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const fetchWorkouts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
      if (!res.ok) {
        throw new Error(`Failed to load workouts: ${res.statusText}`);
      }
      const data: Workout[] = await res.json();
      setWorkouts(data);
    } catch (err: unknown) {
      console.error("Error fetching workouts:", err);
      setError("Unable to load workout library from the server. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // Muscle groups for quick filtering
  const muscleGroups = useMemo(() => {
    const list = new Set<string>();
    workouts.forEach((w) => {
      w.muscleGroups?.forEach((m) => list.add(m));
    });
    return ["ALL", ...Array.from(list)];
  }, [workouts]);

  // Processed workouts (filter + search + sort)
  const processedWorkouts = useMemo(() => {
    let result = [...workouts];

    // Filter by muscle group
    if (selectedMuscle !== "ALL") {
      result = result.filter((w) =>
        w.muscleGroups?.some((m) => m.toLowerCase() === selectedMuscle.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.equipment.toLowerCase().includes(q) ||
          w.muscleGroups?.some((m) => m.toLowerCase().includes(q)) ||
          w.description?.toLowerCase().includes(q)
      );
    }

    // Challenge C1: Sort By logic
    result.sort((a, b) => {
      if (sortBy === "duration") {
        return (b.duration || 0) - (a.duration || 0); // High to low or standard
      }
      if (sortBy === "caloriesBurned") {
        return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
      }
      if (sortBy === "rating") {
        return (b.rating || 0) - (a.rating || 0);
      }
      return 0;
    });

    return result;
  }, [workouts, selectedMuscle, searchQuery, sortBy]);

  return (
    <section id="library" className="scroll-mt-20 py-16 sm:py-20 bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1c2230]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ccff00] mb-2">
              <Layers className="w-4 h-4" />
              <span>Full Catalog</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-white tracking-tight"
              style={{ fontFamily: "var(--font-oswald), sans-serif" }}
            >
              THE LIBRARY
            </h2>
            <p className="mt-1.5 text-gray-400 text-sm sm:text-base">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Controls: Search & Challenge C1 Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search lifts or muscles..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#141822] border border-[#232938] text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-[#ccff00] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Challenge C1: Sort By Dropdown */}
            <div className="relative flex items-center gap-2 bg-[#141822] border border-[#232938] px-3.5 py-2 rounded-xl">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#ccff00]" />
              <label htmlFor="sort-select" className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Sort By:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-sm font-semibold text-white focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                <option value="duration" className="bg-[#141822] text-white">
                  Duration (Mins)
                </option>
                <option value="caloriesBurned" className="bg-[#141822] text-white">
                  Calories (Kcal)
                </option>
                <option value="rating" className="bg-[#141822] text-white">
                  Rating (High-Low)
                </option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Quick Muscle Group Filter Tags */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 no-scrollbar">
          {muscleGroups.map((muscle) => {
            const isActive = selectedMuscle.toUpperCase() === muscle.toUpperCase();
            return (
              <button
                key={muscle}
                onClick={() => setSelectedMuscle(muscle)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-[#ccff00] text-[#0c0e14] shadow-[0_0_12px_rgba(204,255,0,0.3)] font-black"
                    : "bg-[#121620] text-gray-400 hover:text-gray-200 border border-[#202736] hover:border-gray-600"
                }`}
              >
                {muscle}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12">
            <div className="flex flex-col items-center justify-center space-y-4 mb-8">
              <div className="w-10 h-10 border-4 border-[#1f2636] border-t-[#ccff00] rounded-full animate-spin" />
              <p className="text-sm font-bold uppercase tracking-wider text-gray-400">
                Loading workouts library...
              </p>
            </div>

            {/* Skeleton Grid (3x4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-[#141822] border border-[#202736] h-80 animate-pulse flex flex-col overflow-hidden"
                >
                  <div className="w-full h-48 bg-[#1c2230]" />
                  <div className="p-5 space-y-3 flex-1">
                    <div className="h-4 bg-[#1f2638] rounded w-1/3" />
                    <div className="h-6 bg-[#1f2638] rounded w-3/4" />
                    <div className="h-3 bg-[#1f2638] rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="my-12 p-8 rounded-2xl bg-[#181114] border border-red-900/50 text-center max-w-lg mx-auto">
            <p className="text-red-400 font-semibold mb-4">{error}</p>
            <button
              onClick={fetchWorkouts}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Retry Loading
            </button>
          </div>
        )}

        {/* Empty Search/Filter State */}
        {!isLoading && !error && processedWorkouts.length === 0 && (
          <div className="my-16 p-12 rounded-2xl bg-[#141822] border border-[#232938] text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#1b2230] text-[#ccff00] flex items-center justify-center mx-auto">
              <Dumbbell className="w-7 h-7" />
            </div>
            <h3
              className="text-xl font-bold uppercase text-white"
              style={{ fontFamily: "var(--font-oswald), sans-serif" }}
            >
              No Workouts Found
            </h3>
            <p className="text-sm text-gray-400">
              No lifts match your filter or search query &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedMuscle("ALL");
              }}
              className="px-4 py-2 rounded-lg bg-[#212836] hover:bg-[#2b3548] text-xs font-bold text-gray-200 uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* 3x4 Responsive Grid of Workouts */}
        {!isLoading && !error && processedWorkouts.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
