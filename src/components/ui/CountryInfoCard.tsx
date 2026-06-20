"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "@/store/AppContext";

const numberFormatter = new Intl.NumberFormat("zh-CN");

export default function CountryInfoCard() {
  const { selectedCountry, setSelectedCountry } = useAppContext();

  const population = useMemo(
    () =>
      selectedCountry
        ? `${numberFormatter.format(selectedCountry.population)} 人`
        : "",
    [selectedCountry]
  );

  const area = useMemo(
    () =>
      selectedCountry
        ? `${numberFormatter.format(selectedCountry.areaKm2)} 平方公里`
        : "",
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
          className="pointer-events-auto absolute right-4 top-24 z-10 max-h-[calc(100vh-7rem)] w-[20rem] overflow-auto rounded-2xl border border-cyan-300/20 bg-slate-950/70 p-5 text-white shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl md:right-6 md:w-[22rem] md:p-6"
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
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-3xl ring-1 ring-white/10">
                {selectedCountry.flagEmoji}
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-xl font-semibold tracking-wide text-white">
                  {selectedCountry.name}
                </h2>
                <p className="mt-1 flex items-center gap-1 text-xs text-cyan-100/70">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  {formatCoordinate(selectedCountry.latitude, "N", "S")} /{" "}
                  {formatCoordinate(selectedCountry.longitude, "E", "W")}
                </p>
              </div>
            </div>

            <div className="my-4 h-px bg-gradient-to-r from-cyan-300/30 via-white/10 to-transparent" />

            <div className="grid grid-cols-2 gap-2.5">
              <InfoItem
                icon={
                  <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" />
                }
                label="首都"
                value={selectedCountry.capital}
              />
              <InfoItem
                icon={
                  <>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
                  </>
                }
                label="所属大洲"
                value={selectedCountry.continent}
              />
              <InfoItem
                icon={
                  <>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </>
                }
                label="人口"
                value={population}
              />
              <InfoItem
                icon={
                  <>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 3v18" />
                  </>
                }
                label="面积"
                value={area}
              />
            </div>

            <div className="mt-3 rounded-xl border border-cyan-300/15 bg-gradient-to-br from-cyan-400/[0.07] to-transparent p-3.5">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.24em] text-cyan-100/55">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                Climate
              </div>
              <p className="mt-1.5 text-sm leading-6 text-white/80">
                {selectedCountry.climate}
              </p>
            </div>

            <p className="mt-3 text-sm leading-7 text-white/75">
              {selectedCountry.description}
            </p>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 transition-colors hover:border-white/20 hover:bg-white/[0.06]">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40">
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-cyan-300/60"
        >
          {icon}
        </svg>
        {label}
      </div>
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
