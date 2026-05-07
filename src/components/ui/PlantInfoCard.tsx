"use client";

import { useAppContext } from "@/store/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export default function PlantInfoCard() {
  const { selectedPlant, setSelectedPlant } = useAppContext();

  return (
    <AnimatePresence>
      {selectedPlant && (
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="pointer-events-auto absolute right-6 top-1/2 z-10 w-72 -translate-y-1/2 rounded-2xl border border-white/15 bg-black/60 p-6 backdrop-blur-2xl"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedPlant(null)}
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
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

          {/* Plant name */}
          <h2 className="text-xl font-bold text-white">
            {selectedPlant.name}
          </h2>
          <p className="mt-0.5 text-xs italic text-white/50">
            {selectedPlant.latinName}
          </p>

          {/* Divider */}
          <div className="my-3 h-px bg-gradient-to-r from-white/15 via-white/10 to-transparent" />

          {/* Info rows */}
          <div className="space-y-2.5 text-sm">
            <InfoRow label="大洲" value={selectedPlant.continent} />
            <InfoRow label="植被类型" value={selectedPlant.vegetationType} />
            <InfoRow label="气候特征" value={selectedPlant.climateFeature} />
            <InfoRow label="坐标" value={`${selectedPlant.latitude.toFixed(1)}°N, ${Math.abs(selectedPlant.longitude).toFixed(1)}°${selectedPlant.longitude >= 0 ? "E" : "W"}`} />
          </div>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {selectedPlant.description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/40">{label}</span>
      <span className="text-white/80">{value}</span>
    </div>
  );
}
