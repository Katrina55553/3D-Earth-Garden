"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import plants, { PlantData } from "@/data/plants";

export type ContinentFilter = "全部" | string;
export type TypeFilter = "全部" | string;
export type ClimateFilter = "全部" | string;

interface AppState {
  selectedPlant: PlantData | null;
  continentFilter: ContinentFilter;
  typeFilter: TypeFilter;
  climateFilter: ClimateFilter;
}

interface AppContextValue extends AppState {
  setSelectedPlant: (plant: PlantData | null) => void;
  setContinentFilter: (filter: ContinentFilter) => void;
  setTypeFilter: (filter: TypeFilter) => void;
  setClimateFilter: (filter: ClimateFilter) => void;
  filteredPlants: PlantData[];
  visibleCount: number;
  totalCount: number;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedPlant, setSelectedPlant] = useState<PlantData | null>(null);
  const [continentFilter, setContinentFilter] = useState<ContinentFilter>("全部");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("全部");
  const [climateFilter, setClimateFilter] = useState<ClimateFilter>("全部");

  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      if (continentFilter !== "全部" && plant.continent !== continentFilter)
        return false;
      if (typeFilter !== "全部" && plant.vegetationType !== typeFilter)
        return false;
      if (climateFilter !== "全部" && plant.climateFeature !== climateFilter)
        return false;
      return true;
    });
  }, [continentFilter, typeFilter, climateFilter]);

  const value = useMemo<AppContextValue>(
    () => ({
      selectedPlant,
      continentFilter,
      typeFilter,
      climateFilter,
      setSelectedPlant,
      setContinentFilter,
      setTypeFilter,
      setClimateFilter,
      filteredPlants,
      visibleCount: filteredPlants.length,
      totalCount: plants.length,
    }),
    [
      selectedPlant,
      continentFilter,
      typeFilter,
      climateFilter,
      filteredPlants,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}

// Derived data for filter options
export function getFilterOptions() {
  const continents = [...new Set(plants.map((p) => p.continent))];
  const types = [...new Set(plants.map((p) => p.vegetationType))];
  const climates = [...new Set(plants.map((p) => p.climateFeature))];
  return { continents, types, climates };
}
