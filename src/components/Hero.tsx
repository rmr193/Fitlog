import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Flame, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#181d26]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ccff00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#182312] border border-[#2d421a] text-[#ccff00] text-xs font-bold uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" />
              <span>WORKOUT LIBRARY</span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-white tracking-tight leading-[1.08]"
              style={{ fontFamily: "var(--font-oswald), sans-serif" }}
            >
              TRAIN WITH INTENT.{" "}
              <span className="text-[#ccff00] block mt-1 sm:inline sm:mt-0">
                LOG EVERY SET.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s
              plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#library"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#ccff00] hover:bg-[#bbf000] text-[#0c0d11] font-black text-sm uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_-5px_rgba(204,255,0,0.4)] hover:shadow-[0_0_30px_-2px_rgba(204,255,0,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
              >
                <span>BROWSE WORKOUTS</span>
                <ArrowDown className="w-4 h-4 stroke-[3]" />
              </a>

              <Link
                href="/my-plan"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-[#262c3b] hover:border-gray-500 bg-[#121620] hover:bg-[#181d2a] text-gray-300 hover:text-white font-semibold text-sm uppercase tracking-wider transition-all duration-200"
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Open Today&apos;s Plan</span>
              </Link>
            </div>

            {/* Quick Stat Highlights */}
            <div className="pt-4 grid grid-cols-3 gap-6 border-t border-[#1c2230] w-full max-w-lg">
              <div>
                <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-oswald), sans-serif" }}>
                  12
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Compound Lifts</p>
              </div>
              <div>
                <p className="text-2xl font-black text-[#ccff00]" style={{ fontFamily: "var(--font-oswald), sans-serif" }}>
                  5
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Daily Lift Cap</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-oswald), sans-serif" }}>
                  100%
                </p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Free & Local</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Backplate */}
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/3] rounded-2xl bg-gradient-to-b from-[#161a24] to-[#0e1118] border border-[#222838] p-6 flex items-center justify-center overflow-hidden shadow-2xl group">
              {/* Radial gradient spotlight behind model */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(204,255,0,0.15),_transparent_70%)]" />

              {/* Decorative grid pattern */}
              <div
                className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]"
              />

              {/* Main Banner Image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <Image
                  src="/assets/banner.png"
                  alt="FitLog Training Model"
                  width={420}
                  height={420}
                  priority
                  className="max-h-[340px] sm:max-h-[380px] w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Floating aesthetic badge */}
              <div className="absolute bottom-4 left-4 z-20 px-3.5 py-2 rounded-xl bg-[#090b0e]/90 border border-[#252c3c] backdrop-blur-md flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">
                    Anatomy Focused
                  </p>
                  <p className="text-[10px] text-gray-400">Targeted Muscle Engagement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
