import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="flex items-center gap-3 mb-6">
        <Image
          src="/assets/logo.png"
          alt="FitLog Logo"
          width={36}
          height={36}
          className="w-9 h-9"
        />
        <span className="text-3xl font-extrabold tracking-wider text-white" style={{ fontFamily: "var(--font-oswald), sans-serif" }}>
          FIT<span className="text-[#ccff00]">LOG</span>
        </span>
      </div>
      <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4" style={{ fontFamily: "var(--font-oswald), sans-serif" }}>
        Train With Intent. Log Every Set.
      </h1>
      <p className="max-w-xl text-gray-400 text-lg">
        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#ccff00] text-black">
          Scaffolding Ready
        </span>
        <span className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border border-[#2d313b] text-gray-300">
          Dark Gym Theme
        </span>
      </div>
    </div>
  );
}
