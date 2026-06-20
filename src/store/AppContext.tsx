"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import countries, { CountryData } from "@/data/countries";

export type ContinentFilter = "全部" | string;

interface AppContextValue {
  selectedCountryId: string | null;
  selectedCountry: CountryData | null;
  continentFilter: ContinentFilter;
  setSelectedCountry: (id: string | null) => void;
  setContinentFilter: (filter: ContinentFilter) => void;
  filteredCountries: CountryData[];
  visibleCount: number;
  totalCount: number;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [continentFilter, setContinentFilter] = useState<ContinentFilter>("全部");

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      if (continentFilter !== "全部" && country.continent !== continentFilter)
        return false;
      return true;
    });
  }, [continentFilter]);

  const selectedCountry = useMemo(
    () =>
      selectedCountryId
        ? countries.find((country) => country.id === selectedCountryId) ?? null
        : null,
    [selectedCountryId]
  );

  useEffect(() => {
    if (!selectedCountryId) return;
    const isVisible = filteredCountries.some(
      (country) => country.id === selectedCountryId
    );
    if (!isVisible) {
      setSelectedCountryId(null);
    }
  }, [filteredCountries, selectedCountryId]);

  const value = useMemo<AppContextValue>(
    () => ({
      selectedCountryId,
      selectedCountry,
      continentFilter,
      setSelectedCountry: setSelectedCountryId,
      setContinentFilter,
      filteredCountries,
      visibleCount: filteredCountries.length,
      totalCount: countries.length,
    }),
    [
      selectedCountryId,
      selectedCountry,
      continentFilter,
      filteredCountries,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}

export function getFilterOptions() {
  const continents = [...new Set(countries.map((country) => country.continent))];
  return { continents };
}
