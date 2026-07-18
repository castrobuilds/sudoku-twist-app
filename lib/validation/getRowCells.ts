import { Grid } from "@/types/grid";
import { Cell } from "@/types/grid";

export function getRowCells(grid: Grid, row: number): Cell[] {
  const cells: Cell[] = [];

  for (const cell of Object.values(grid.cells)) {
    if (cell.row === row) {
      cells.push(cell);
    }
  }

  return cells;
}
