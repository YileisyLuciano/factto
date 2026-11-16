import { useEffect, useState, type ReactNode } from "react";
import { CatalogContext, type CatalogContextValue } from "./CatalogContext";
import type { CatalogEntry } from "./types";

const STORAGE_KEY = "factto:catalog";

function loadEntries(): CatalogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CatalogEntry[]) : [];
  } catch {
    return [];
  }
}

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CatalogEntry[]>(loadEntries);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // storage may be unavailable (private mode, quota); ignore
    }
  }, [entries]);

  const value: CatalogContextValue = {
    entries,
    addEntry: (data) =>
      setEntries((prev) => [...prev, { id: crypto.randomUUID(), ...data }]),
    updateEntry: (id, data) =>
      setEntries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...data } : e)),
      ),
    removeEntry: (id) =>
      setEntries((prev) => prev.filter((e) => e.id !== id)),
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}