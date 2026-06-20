"use client";

import { useAppContext } from "@/store/AppContext";

export default function TopStats() {
  const { visibleCount, totalCount, selectedCountry, continentFilter } =
    useAppContext();

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex justify-center pt-6">
      <div className="rounded-[28px] border border-cyan-300/15 bg-slate-950/45 px-8 py-4 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl">
        <h1 className="text-center text-xl font-semibold tracking-[0.28em] text-white">
          地理探索地球
        </h1>
        <p className="mt-1 text-center text-sm text-white/60">
          当前筛选{" "}
          <span className="font-semibold text-cyan-300">{continentFilter}</span>
          {" · "}
          已展示 <span className="font-bold text-emerald-400">{visibleCount}</span>
          {" / "}
          <span className="text-white/40">{totalCount}</span> 个国家/地区
        </p>
        <p className="mt-2 text-center text-xs tracking-wide text-white/45">
          {selectedCountry
            ? `已定位 ${selectedCountry.flagEmoji} ${selectedCountry.name}`
            : "点击地球上的任意位置，系统会为你匹配最近的国家或地区"}
        </p>
      </div>
    </div>
  );
}
