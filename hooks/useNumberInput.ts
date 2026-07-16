"use client";

import { useEffect } from "react";
import { useGridStore } from "@/store/grid.store";

export function useNumberInput() {
  const setInputForSelected = useGridStore((s) => s.setInputForSelected);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore typing inside inputs/textareas
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      // 1–9
      if (e.key >= "1" && e.key <= "9") {
        setInputForSelected(Number(e.key));
        return;
      }

      // Clear (Delete / Backspace / 0)
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        setInputForSelected(null);
        return;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setInputForSelected]);
}
