import { Grid } from "@/types/grid";
import { Cell } from "@/types/grid";

export function getColumnCells(grid: Grid, col: number): Cell[] {
  const cells: Cell[] = [];

  for (const cell of Object.values(grid.cells)) {
    if (cell.col === col) {
      cells.push(cell);
    }
  }

  return cells;
}
