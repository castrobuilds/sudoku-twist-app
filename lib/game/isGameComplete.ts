import { Grid } from "@/types/grid";
import { isGridFull } from "../validation/isGridFull";

export function isGameComplete(grid: Grid, invalidCells: Set<string>): boolean {
  return isGridFull(grid) && invalidCells.size === 0;
}
