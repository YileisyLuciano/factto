import { createContext } from "react";
import type { Settings } from "./types";

export interface SettingsContextValue {
    settings: Settings;
    updateSettings: (patch: Partial<Settings>) => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);