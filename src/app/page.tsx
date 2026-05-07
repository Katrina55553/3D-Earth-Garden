"use client";

import { AppProvider } from "@/store/AppContext";
import EarthScene from "@/components/EarthScene";
import AppUI from "@/components/ui/AppUI";

export default function Home() {
  return (
    <AppProvider>
      <EarthScene />
      <AppUI />
    </AppProvider>
  );
}
