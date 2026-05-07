"use client";

import TopStats from "./TopStats";
import PlantInfoCard from "./PlantInfoCard";
import ControlPanel from "./ControlPanel";

export default function AppUI() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <TopStats />
      <PlantInfoCard />
      <ControlPanel />
    </div>
  );
}
