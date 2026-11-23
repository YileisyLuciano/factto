import type { ReactNode } from "react";
import { usePersistentState } from "../../lib/usePersistentState";
import { SettingsContext } from "./SettingsContext";
import { defaultSettings, type Settings } from "./types";

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = usePersistentState<Settings>(
    "factto:settings",
    defaultSettings,
  );

  // Fill in any field missing from older saved data
  const settings: Settings = { ...defaultSettings, ...stored };

  function updateSettings(patch: Partial<Settings>) {
    setStored((prev) => ({ ...defaultSettings, ...prev, ...patch }));
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}