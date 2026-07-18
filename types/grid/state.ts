import { GameStatus } from "../game";
import { SelectedCell } from "./cell";
import { Grid } from "./grid";

export type GridState = {
  grid: Grid;

  selectedCell: SelectedCell;
  notesMode: boolean;

  invalidCells: Set<string>;

  // Game status
  gameStatus: GameStatus;

  // Timer state
  timeElapsed: number;
  timerId: ReturnType<typeof setInterval> | null;

  // ACTIONS
  setCellValue: (id: string, value: number | null) => void;
  setInputForSelected: (value: number | null) => void;
  resetGrid: () => void;
  startGame: (grid: Grid) => void;

  setSelectedCell: (cell: SelectedCell) => void;
  toggleNotesMode: () => void;
  setGameStatus: (status: GameStatus) => void;

  // TIMER ACTIONS
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
};
