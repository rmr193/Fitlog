import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#181d28] bg-[#08090d] text-gray-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left: Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-[#141822] border border-[#232938] flex items-center justify-center group-hover:border-[#ccff00]/40 transition-colors">
              <Image
                src="/assets/logo.png"
                alt="FitLog Logo"
                width={18}
                height={18}
                className="w-4 h-4 object-contain"
              />
            </div>
            <span
              className="text-xl font-black tracking-wider text-white uppercase"
              style={{ fontFamily: "var(--font-oswald), sans-serif" }}
            >
              FIT<span className="text-[#ccff00]">LOG</span>
            </span>
          </Link>

          {/* Center Links (Subtle & Clean) */}
          <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Workout Library
            </Link>
            <Link href="/my-plan?tab=today" className="hover:text-gray-300 transition-colors">
              Today&apos;s Plan
            </Link>
            <Link href="/my-plan?tab=saved" className="hover:text-gray-300 transition-colors">
              Saved Lifts
            </Link>
          </div>

          {/* Right: Copyright Line */}
          <p className="text-xs text-gray-500 text-center sm:text-right font-medium">
            &copy; 2026 FitLog &mdash; Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
}
