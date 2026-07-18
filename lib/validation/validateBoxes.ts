import { Grid } from "@/types/grid";
import { ValidationResult } from "./types";
import { createValidationResult } from "./createValidationResult";
import { validateGroup } from "./validateGroup";
import { getBoxCells } from "./getBoxCells";

/**
 * Validates all boxes (e.g. 3x3 subgrids in 9x9 Sudoku)
 */
export function validateBoxes(grid: Grid): ValidationResult {
  const result = createValidationResult();
  const size = grid.size;
  const boxSize = Math.sqrt(size); // e.g. 3
  const totalBoxes = size; // 9 boxes in 9x9

  for (let box = 0; box < totalBoxes; box++) {
    const boxCells = getBoxCells(grid, box);
    const duplicates = validateGroup(boxCells);

    for (const id of duplicates) {
      result.invalid.add(id);
    }
  }

  return result;
}
