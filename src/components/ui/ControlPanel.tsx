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
      className="pointer-events-auto absolute bottom-0 left-0 z-10 w-full px-4 pb-4 lg:pr-[24rem]"
    >
      <div className="mx-auto max-w-5xl rounded-[28px] border border-white/10 bg-slate-950/55 px-5 py-5 shadow-2xl shadow-cyan-950/15 backdrop-blur-2xl md:px-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="shrink-0 text-xs font-medium uppercase tracking-[0.28em] text-white/45">
              大洲
            </span>
            <div className="flex flex-wrap gap-1.5">
              {continentTabs.map((c) => (
                <button
                  key={c}
                  onClick={() => setContinentFilter(c)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                    continentFilter === c
                      ? "bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-300/35"
                      : "bg-white/[0.03] text-white/55 hover:bg-white/10 hover:text-white/80"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="h-6 w-px bg-white/10" />

          <div className="min-w-[16rem] flex-1 rounded-2xl border border-cyan-300/10 bg-cyan-400/[0.05] px-4 py-3">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/70">
              Exploration Tip
            </p>
            <p className="mt-1 text-sm leading-6 text-white/78">
              点击地球或发光标记，系统会自动定位最近的国家/地区并展示首都、人口、面积与气候信息。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {selectedCountry && (
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-200">
                已选中 {selectedCountry.flagEmoji} {selectedCountry.name}
              </div>
            )}
            <button
              onClick={() => setSelectedCountry(null)}
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              重置视角
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
