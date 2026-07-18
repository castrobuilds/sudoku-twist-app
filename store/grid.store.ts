import { create } from "zustand";
import { GridState } from "@/types/grid";
import { createEmptyGrid, getCellId, updateCell } from "@/lib/grid";
import { validateGrid } from "@/lib/validation/validateGrid";

export const useGridStore = create<GridState>((set, get) => ({
  grid: createEmptyGrid(9),

  selectedCell: null,
  notesMode: false,

  invalidCells: new Set(),

  // ACTIONS
  setCellValue: (id, value) => {
    set((state) => {
      const cell = state.grid.cells[id];
      if (!cell || cell.fixed) return state;

      const updatedGrid = updateCell(state.grid, id, { value, notes: [] });

      const validation = validateGrid(updatedGrid);

      console.log("INVALID CELLS:", validation.invalid);

      return {
        grid: updatedGrid,
        invalidCells: validation.invalid,
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
      selectedCell: null,
      notesMode: false,
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
}));
