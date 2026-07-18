import { Grid } from "@/types/grid";

export function checkWin(
  grid: Grid,
  invalidCells: Set<string> | string[],
): boolean {
  const hasInvalidCells =
    invalidCells instanceof Set
      ? invalidCells.size > 0
      : invalidCells.length > 0;

  if (hasInvalidCells) return false;

  const isFull = Object.values(grid.cells).every((cell) => cell.value !== null);

  return isFull;
}
