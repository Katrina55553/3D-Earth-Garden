"use client";

import { motion } from "framer-motion";
import { useAppContext } from "@/store/AppContext";

export default function TopStats() {
  const { visibleCount, totalCount, selectedCountry, continentFilter } =
    useAppContext();

  const pct =
    totalCount > 0 ? Math.round((visibleCount / totalCount) * 100) : 0;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-4 p-4 md:p-6">
      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pointer-events-none flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
      >
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/30 to-emerald-400/20 ring-1 ring-cyan-300/30">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="text-cyan-200"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
          </svg>
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-[0.22em] text-white">
            GEO EXPLORER
          </h1>
          <p className="mt-0.5 text-[10px] uppercase tracking-[0.3em] text-white/40">
            3D 地理探索地球
          </p>
        </div>
      </motion.div>

      {/* Live stats */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="pointer-events-none flex flex-col items-end gap-2 rounded-2xl border border-white/10 bg-slate-950/45 px-4 py-3 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="uppercase tracking-[0.24em] text-white/45">
            {continentFilter}
          </span>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-semibold tabular-nums text-emerald-300">
            {visibleCount}
          </span>
          <span className="text-sm text-white/40">/ {totalCount}</span>
          <span className="ml-1 text-[10px] uppercase tracking-wider text-white/35">
            国家
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 w-32 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        <p className="max-w-[16rem] text-right text-[11px] leading-4 text-white/45">
          {selectedCountry
            ? `已定位 ${selectedCountry.flagEmoji} ${selectedCountry.name}`
            : "点击地球任意位置匹配最近国家"}
        </p>
      </motion.div>
    </div>
  );
}
