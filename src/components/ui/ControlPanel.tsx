"use client";

import { useMemo } from "react";
import { useAppContext, getFilterOptions } from "@/store/AppContext";
import type { ContinentFilter, TypeFilter, ClimateFilter } from "@/store/AppContext";
import { motion } from "framer-motion";

export default function ControlPanel() {
  const {
    continentFilter,
    typeFilter,
    climateFilter,
    setContinentFilter,
    setTypeFilter,
    setClimateFilter,
  } = useAppContext();

  const { continents, types, climates } = useMemo(() => getFilterOptions(), []);
  const continentTabs: ContinentFilter[] = useMemo(() => ["全部", ...continents], [continents]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="pointer-events-auto absolute bottom-0 left-0 right-0 z-10 px-4 pb-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-2xl">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {/* Continent tabs */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium tracking-wide text-white/50">
              大洲
            </span>
            <div className="flex gap-1">
              {continentTabs.map((c) => (
                <button
                  key={c}
                  onClick={() => setContinentFilter(c)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    continentFilter === c
                      ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40"
                      : "text-white/50 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Separator */}
          <div className="h-5 w-px bg-white/10" />

          {/* Type filter */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium tracking-wide text-white/50">
              植被
            </span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TypeFilter)}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 outline-none transition-colors hover:border-white/20 focus:border-emerald-500/40"
            >
              <option value="全部" className="bg-zinc-900">
                全部类型
              </option>
              {types.map((t) => (
                <option key={t} value={t} className="bg-zinc-900">
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Climate filter */}
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-xs font-medium tracking-wide text-white/50">
              气候
            </span>
            <select
              value={climateFilter}
              onChange={(e) => setClimateFilter(e.target.value as ClimateFilter)}
              className="appearance-none rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 outline-none transition-colors hover:border-white/20 focus:border-emerald-500/40"
            >
              <option value="全部" className="bg-zinc-900">
                全部气候
              </option>
              {climates.map((c) => (
                <option key={c} value={c} className="bg-zinc-900">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
