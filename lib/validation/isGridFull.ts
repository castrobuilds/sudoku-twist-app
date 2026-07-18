import { Grid } from "@/types/grid";

export function isGridFull(grid: Grid): boolean {
  const cells = Object.values(grid.cells);

  for (const cell of cells) {
    if (cell.value === null) {
      return false;
    }
  }

  return true;
}
