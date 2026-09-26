"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/types/workout";
import { Clock, Flame, Star, Dumbbell, ChevronRight } from "lucide-react";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col h-full rounded-2xl bg-[#141822] hover:bg-[#181d2a] border border-[#222838] hover:border-[#ccff00]/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_20px_-5px_rgba(204,255,0,0.15)] hover:-translate-y-1"
    >
      {/* Thumbnail Container */}
      <div className="relative w-full h-48 bg-[#0c0e14] overflow-hidden flex items-center justify-center border-b border-[#1f2533]">
        {/* Ambient glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141822] via-transparent to-transparent z-10 opacity-70" />

        <Image
          src={imgError ? "/assets/banner.png" : workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={() => setImgError(true)}
        />

        {/* Difficulty badge overlay */}
        <div className="absolute top-3 right-3 z-20">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0c0e14]/85 text-gray-300 border border-[#262e3f] backdrop-blur-sm">
            {workout.difficulty}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Category Tag Pills */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-[#1b2230] text-[#ccff00] border border-[#2b3548]"
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout Name */}
          <h3
            className="text-lg font-black uppercase text-white tracking-wide group-hover:text-[#ccff00] transition-colors leading-snug line-clamp-1"
            style={{ fontFamily: "var(--font-oswald), sans-serif" }}
          >
            {workout.name}
          </h3>

          {/* Equipment line */}
          <p className="mt-1 text-xs text-gray-400 flex items-center gap-1.5 line-clamp-1">
            <Dumbbell className="w-3.5 h-3.5 text-gray-500 shrink-0" />
            <span>{workout.equipment}</span>
          </p>
        </div>

        {/* Stats Row & Navigation indicator */}
        <div className="mt-5 pt-3.5 border-t border-[#1f2533] flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-300 font-medium">
            {/* Duration */}
            <div className="flex items-center gap-1" title="Duration">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              <span>{workout.duration} min</span>
            </div>

            {/* Calories */}
            <div className="flex items-center gap-1" title="Calories Burned">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 font-semibold text-white" title="Rating">
              <Star className="w-3.5 h-3.5 text-[#ccff00] fill-[#ccff00]" />
              <span>{workout.rating}</span>
            </div>
          </div>

          <div className="w-6 h-6 rounded-full bg-[#1c2230] flex items-center justify-center text-gray-400 group-hover:text-black group-hover:bg-[#ccff00] transition-colors">
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
