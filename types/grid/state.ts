import { GameStatus } from "../game";
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

  invalidCells: Set<string>;

  gameStatus: GameStatus;
  startGame: (grid: Grid) => void;
  setGameStatus: (status: GameStatus) => void;
};
