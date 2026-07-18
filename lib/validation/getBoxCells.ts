import { Grid } from "@/types/grid";
import { Cell } from "@/types/grid";

export function getBoxCells(grid: Grid, box: number): Cell[] {
  const cells: Cell[] = [];

  for (const cell of Object.values(grid.cells)) {
    if (cell.box === box) {
      cells.push(cell);
    }
  }

  return cells;
}
