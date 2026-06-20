"use client";

import { useMemo } from "react";
import { useAppContext, getFilterOptions } from "@/store/AppContext";
import type { ContinentFilter } from "@/store/AppContext";
import { motion } from "framer-motion";

export default function ControlPanel() {
  const {
    continentFilter,
    selectedCountry,
    setContinentFilter,
    setSelectedCountry,
  } = useAppContext();

  const { continents } = useMemo(() => getFilterOptions(), []);
  const continentTabs: ContinentFilter[] = useMemo(
    () => ["全部", ...continents],
    [continents]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="pointer-events-auto absolute bottom-0 left-0 z-10 w-full px-4 pb-5 lg:pr-[24rem]"
    >
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 shadow-2xl shadow-cyan-950/15 backdrop-blur-2xl md:px-5">
        {/* Continent filter */}
        <div className="flex items-center gap-2.5">
          <span className="hidden shrink-0 text-[10px] font-medium uppercase tracking-[0.28em] text-white/40 md:inline">
            大洲
          </span>
          <div className="flex flex-wrap gap-1">
            {continentTabs.map((c) => (
              <button
                key={c}
                onClick={() => setContinentFilter(c)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                  continentFilter === c
                    ? "bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/35"
                    : "text-white/55 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Reset / selection */}
        <div className="flex shrink-0 items-center gap-2">
          {selectedCountry && (
            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-200 sm:flex">
              <span className="text-sm">{selectedCountry.flagEmoji}</span>
              <span className="max-w-[8rem] truncate">{selectedCountry.name}</span>
            </div>
          )}
          <button
            onClick={() => setSelectedCountry(null)}
            className="group flex items-center gap-1.5 rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-300 group-hover:-rotate-90"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" />
            </svg>
            重置
          </button>
        </div>
      </div>
    </motion.div>
  );
}
