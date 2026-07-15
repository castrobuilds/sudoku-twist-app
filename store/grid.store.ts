import { create } from "zustand";
import { GridState } from "@/types/grid";
import { createEmptyGrid, getCellId, updateCell } from "@/lib/grid";

export const useGridStore = create<GridState>((set) => ({
  grid: createEmptyGrid(9),

  setCellValue: (id, value) => {
    set((state) => {
      const cell = state.grid.cells[id];

      if (!cell || cell.fixed) return state;

      return {
        grid: {
          ...state.grid,
          cells: {
            ...state.grid.cells,
            [id]: {
              ...cell,
              value,
            },
          },
        },
      };
    });
  },

  setValueForSelected: (value) => {
    set((state) => {
      const selected = state.selectedCell;

      if (!selected) return state;

      const id = getCellId(selected.row, selected.col);

      return {
        grid: updateCell(state.grid, id, {
          value,
          notes: [],
        }),
      };
    });
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
