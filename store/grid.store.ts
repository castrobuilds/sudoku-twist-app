import { create } from "zustand";
import { GridState } from "@/types/grid";
import { createEmptyGrid, updateCell } from "@/lib/grid";

export const useGridStore = create<GridState>((set) => ({
  grid: createEmptyGrid(9),

  setCellValue: (id, value) => {
    set((state) => ({
      grid: updateCell(state.grid, id, { value, notes: [] }),
    }));
  },

  resetGrid: () => {
    set({
      grid: createEmptyGrid(9),
    });
  },

  // SELECTED CELL
  selectedCell: null,

  setSelectedCell: (cell) => {
    set({ selectedCell: cell });
  },

  //
}));
