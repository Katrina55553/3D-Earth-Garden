"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "@/store/AppContext";

const numberFormatter = new Intl.NumberFormat("zh-CN");

export default function CountryInfoCard() {
  const { selectedCountry, setSelectedCountry } = useAppContext();

  const population = useMemo(
    () =>
      selectedCountry ? `${numberFormatter.format(selectedCountry.population)} 人` : "",
    [selectedCountry]
  );

  const area = useMemo(
    () =>
      selectedCountry ? `${numberFormatter.format(selectedCountry.areaKm2)} 平方公里` : "",
    [selectedCountry]
  );

  return (
    <AnimatePresence>
      {selectedCountry && (
        <motion.aside
          key={selectedCountry.id}
          initial={{ opacity: 0, x: 36, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 36, scale: 0.96 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pointer-events-auto absolute right-4 top-24 z-10 max-h-[calc(100vh-7rem)] w-[20rem] overflow-auto rounded-[28px] border border-cyan-300/20 bg-slate-950/70 p-5 text-white shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl md:right-6 md:w-[22rem] md:p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(74,222,128,0.12),transparent_30%)]" />
          <div className="relative">
            <button
              onClick={() => setSelectedCountry(null)}
              className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/65 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="关闭国家信息"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-start gap-3 pr-10">
              <div className="text-4xl">{selectedCountry.flagEmoji}</div>
              <div>
                <h2 className="text-2xl font-semibold tracking-wide text-white">
                  {selectedCountry.name}
                </h2>
                <p className="mt-1 text-sm text-cyan-100/70">
                  代表位置 {formatCoordinate(selectedCountry.latitude, "N", "S")} /{" "}
                  {formatCoordinate(selectedCountry.longitude, "E", "W")}
                </p>
              </div>
            </div>

            <div className="my-4 h-px bg-gradient-to-r from-cyan-300/30 via-white/10 to-transparent" />

            <div className="grid grid-cols-2 gap-3 text-sm">
              <InfoItem label="首都" value={selectedCountry.capital} />
              <InfoItem label="所属大洲" value={selectedCountry.continent} />
              <InfoItem label="人口" value={population} />
              <InfoItem label="面积" value={area} />
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/45">
                Climate
              </p>
              <p className="mt-2 text-sm leading-6 text-white/80">
                {selectedCountry.climate}
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/80">
              {selectedCountry.description}
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-xs tracking-wide text-white/45">{label}</div>
      <div className="mt-1 text-sm font-medium text-white/90">{value}</div>
    </div>
  );
}

function formatCoordinate(
  value: number,
  positiveSuffix: string,
  negativeSuffix: string
) {
  const suffix = value >= 0 ? positiveSuffix : negativeSuffix;
  return `${Math.abs(value).toFixed(1)}°${suffix}`;
}
