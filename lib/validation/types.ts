import { CellId } from "@/types/grid";

export type ValidationResult = {
  invalid: Set<CellId>;
};
