import type { ValidationResult } from "./types";
import type { CellId, Grid } from "@/types/grid";

export function getConflicts(grid: Grid): ValidationResult {
  const invalid = new Set<CellId>();
  return { invalid };
}
