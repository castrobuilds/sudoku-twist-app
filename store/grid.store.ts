import { create } from "zustand";
import { GridState } from "@/types/grid";
import { createEmptyGrid, getCellId, updateCell } from "@/lib/grid";

export const useGridStore = create<GridState>((set) => ({
  grid: createEmptyGrid(9),

  selectedCell: null,

  notesMode: false,

  // ACTIONS
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

  setInputForSelected: (value: number | null) => {
    set((state) => {
      const selected = state.selectedCell;

      if (!selected) return state;

      const id = getCellId(selected.row, selected.col);
      const cell = state.grid.cells[id];

      if (!cell || cell.fixed) return state;

      // Clear Case
      if (value === null) {
        return {
          grid: updateCell(state.grid, id, {
            value: null,
            notes: [],
          }),
        };
      }

      // NOTES MODE
      if (state.notesMode) {
        const notes = cell.notes ?? [];

        const exists = notes.includes(value);

        const nextNotes = exists
          ? notes.filter((n) => n !== value)
          : [...notes, value].sort();

        return {
          grid: updateCell(state.grid, id, {
            notes: nextNotes,
          }),
        };
      }

      // VALUE MODE
      if (cell.value === value) return state;

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
