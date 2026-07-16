import { SelectedCell } from "./cell";
import { Grid } from "./grid";

export type GridState = {
  grid: Grid;

  resetGrid: () => void;
  setCellValue: (id: string, value: number | null) => void;
  setInputForSelected: (value: number | null) => void;

  selectedCell: SelectedCell;
  setSelectedCell: (cell: SelectedCell) => void;

  notesMode: boolean;
  toggleNotesMode: () => void;
};
