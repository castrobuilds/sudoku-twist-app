import { create } from "zustand";
import { GridState } from "@/types/grid";
import { createEmptyGrid, getCellId, updateCell } from "@/lib/grid";
import { validateGrid } from "@/lib/validation/validateGrid";
import { checkWin } from "@/lib/game/checkWin";
import { GameStatus } from "@/types/game";

export const useGridStore = create<GridState>((set, get) => ({
  grid: createEmptyGrid(9),

  selectedCell: null,
  notesMode: false,

  invalidCells: new Set(),

  gameStatus: "not_started",

  // ACTIONS
  setCellValue: (id, value) => {
    set((state) => {
      // Prevent changes if the game is completed
      if (state.gameStatus === "completed") return state;

      // Get target cell
      const cell = state.grid.cells[id];
      if (!cell || cell.fixed) return state;

      // Apply the value to the cell and clear notes
      const updatedGrid = updateCell(state.grid, id, { value, notes: [] });

      // Validate the updated grid
      const validation = validateGrid(updatedGrid);

      // Update Game Status when necessary
      let nextStatus: GameStatus =
        state.gameStatus === "not_started" ? "in_progress" : state.gameStatus;

      // Check for win condition if the game is in progress
      if (state.gameStatus === "in_progress") {
        const isWin = checkWin(updatedGrid, validation.invalid);
        if (isWin) nextStatus = "completed";
      }

      return {
        grid: updatedGrid,
        invalidCells: validation.invalid,
        gameStatus: nextStatus,
      };
    });
  },

  setInputForSelected: (value: number | null) => {
    const { selectedCell, grid, notesMode, setCellValue } = get();

    if (!selectedCell) return;

    const id = getCellId(selectedCell.row, selectedCell.col);
    const cell = grid.cells[id];

    if (!cell || cell.fixed) return;

    // Notes Mode
    if (notesMode && value !== null) {
      set((state) => {
        const current = state.grid.cells[id];
        if (!current) return state;

        const notes = current.notes ?? [];
        const exists = notes.includes(value);

        const nextNotes = exists
          ? notes.filter((n) => n !== value)
          : [...notes, value];

        const updatedGrid = updateCell(state.grid, id, { notes: nextNotes });
        return {
          grid: updatedGrid,
        };
      });
      return;
    }
    // Value / Clear Mode
    setCellValue(id, value);
  },

  resetGrid: () => {
    set({
      grid: createEmptyGrid(9),
      invalidCells: new Set(),
      selectedCell: null,
      notesMode: false,
      gameStatus: "not_started",
    });
  },

  setSelectedCell: (cell) => {
    set({ selectedCell: cell });
  },

  toggleNotesMode: () => {
    set((state) => ({
      notesMode: !state.notesMode,
    }));
  },

  startGame: (grid) => {
    set(() => ({
      grid,
      invalidCells: new Set(),
      selectedCell: null,
      notesMode: false,
      gameStatus: "in_progress",
    }));
  },

  setGameStatus: (status) => {
    set({ gameStatus: status });
  },
}));
