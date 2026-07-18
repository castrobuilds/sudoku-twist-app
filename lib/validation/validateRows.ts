import { Grid } from "@/types/grid";
import { ValidationResult } from "./types";
import { validateGroup } from "./validateGroup";
import { getRowCells } from "../grid";
import { createValidationResult } from "./createValidationResult";

/**
 * Validates all rows in the grid
 */
export function validateRows(grid: Grid): ValidationResult {
  const result = createValidationResult();
  const size = grid.size;

  for (let row = 0; row < size; row++) {
    const rowCells = getRowCells(grid, row);
    const duplicates = validateGroup(rowCells);

    // merge into result
    for (const id of duplicates) {
      result.invalid.add(id);
    }
  }

  return result;
}
