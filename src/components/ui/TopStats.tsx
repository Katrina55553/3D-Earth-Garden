"use client";

import { useAppContext } from "@/store/AppContext";

export default function TopStats() {
  const { visibleCount, totalCount } = useAppContext();

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex justify-center pt-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 px-8 py-3 backdrop-blur-xl">
        <h1 className="text-center text-xl font-semibold tracking-wider text-white">
          地球花园
        </h1>
        <p className="mt-1 text-center text-sm text-white/60">
          当前展示{" "}
          <span className="font-bold text-emerald-400">{visibleCount}</span>
          {" / "}
          <span className="text-white/40">{totalCount}</span> 种植物
        </p>
      </div>
    </div>
  );
}
