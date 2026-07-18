import { Grid } from "@/types/grid";
import { ValidationResult } from "./types";

import { createValidationResult } from "./createValidationResult";
import { validateRows } from "./validateRows";
import { validateColumns } from "./validateColumns";
import { validateBoxes } from "./validateBoxes";

export function validateGrid(grid: Grid): ValidationResult {
  const result = createValidationResult();

  const rowResult = validateRows(grid);
  const colResult = validateColumns(grid);
  const boxResult = validateBoxes(grid);

  // Merge all invalid cells into one Set
  for (const id of rowResult.invalid) {
    result.invalid.add(id);
  }

  for (const id of colResult.invalid) {
    result.invalid.add(id);
  }

  for (const id of boxResult.invalid) {
    result.invalid.add(id);
  }

  return result;
}
