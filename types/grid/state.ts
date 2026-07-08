import { Grid } from "./grid";

export type GridState = {
  grid: Grid;

  setCellValue: (id: string, value: number | null) => void;
  resetGrid: () => void;
};
