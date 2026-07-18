import { Grid } from "@/types/grid";
import { ValidationResult } from "./types";
import { createValidationResult } from "./createValidationResult";
import { validateGroup } from "./validateGroup";
import { getColumnCells } from "./getColumnCells";

export function validateColumns(grid: Grid): ValidationResult {
  const result = createValidationResult();
  const size = grid.size;

  for (let col = 0; col < size; col++) {
    const colCells = getColumnCells(grid, col);
    const duplicates = validateGroup(colCells);

    for (const id of duplicates) {
      result.invalid.add(id);
    }
  }

  return result;
}
