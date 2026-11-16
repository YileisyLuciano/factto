import { createContext } from "react";
import type { CatalogEntry } from "./types";

export type CatalogData = Omit<CatalogEntry, "id">;

export interface CatalogContextValue {
    entries: CatalogEntry[];
    addEntry: (data: CatalogData) => void;
    updateEntry: (id: string, data: Partial<CatalogData>) => void;
    removeEntry: (id: string) => void;
}

export const CatalogContext = createContext<CatalogContextValue | null>(null);