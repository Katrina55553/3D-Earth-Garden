"use client";

import TopStats from "./TopStats";
import CountryInfoCard from "./CountryInfoCard";
import ControlPanel from "./ControlPanel";

export default function AppUI() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10">
      <TopStats />
      <CountryInfoCard />
      <ControlPanel />
    </div>
  );
}
