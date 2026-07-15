import { useGridStore } from "@/store/grid.store";
import { Cell, CellId } from "@/types/grid";
import { Grid } from "@/types/grid";

const DEFAULT_SIZE = 9;

// ID + HELPERS
export function getCellId(row: number, col: number): CellId {
  return `r${row + 1}c${col + 1}`;
}

export function parseCellId(id: CellId): { row: number; col: number } {
  const match = id.match(/^r(\d+)c(\d+)$/);

  if (!match) throw new Error(`Invalid cell ID: ${id}`);

  return { row: Number(match[1]), col: Number(match[2]) };
}

// GRID CREATION
export function createEmptyGrid(size: number = DEFAULT_SIZE): Grid {
  const cells: Record<CellId, Cell> = {};

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const id = getCellId(row, col);
      cells[id] = {
        id,
        row,
        col,
        box: getBoxIndex(size, row, col),
        value: null,
        fixed: false,
        notes: [],
        error: false,
      };
    }
  }
  return { size, cells };
}

// GETTERS
export function getCell(grid: Grid, id: CellId): Cell {
  return grid.cells[id];
}

export function getRowCells(grid: Grid, row: number): Cell[] {
  const cells: Cell[] = [];
  for (let col = 0; col < grid.size; col++) {
    cells.push(grid.cells[getCellId(row, col)]);
  }
  return cells;
}

export function getColCells(grid: Grid, col: number): Cell[] {
  const cells: Cell[] = [];
  for (let row = 0; row < grid.size; row++) {
    cells.push(grid.cells[getCellId(row, col)]);
  }
  return cells;
}

export function getBoxCells(grid: Grid, row: number, col: number): Cell[] {
  const boxSize = Math.sqrt(grid.size);
  const startRow = Math.floor(row / boxSize) * boxSize;
  const startCol = Math.floor(col / boxSize) * boxSize;

  const cells: Cell[] = [];

  for (let r = 0; r < boxSize; r++) {
    for (let c = 0; c < boxSize; c++) {
      cells.push(grid.cells[getCellId(startRow + r, startCol + c)]);
    }
  }

  return cells;
}

export function getBoxIndex(size: number, row: number, col: number): number {
  const boxSize = Math.sqrt(size);
  return Math.floor(row / boxSize) * boxSize + Math.floor(col / boxSize);
}

// SETTERS
export function setCellValue(
  grid: Grid,
  id: CellId,
  value: number | null,
): Grid {
  return updateCell(grid, id, { value });
}

export function updateCell(
  grid: Grid,
  id: CellId,
  updates: Partial<Cell>,
): Grid {
  const cell = grid.cells[id];

  if (!cell || cell.fixed) return grid;

  return {
    ...grid,
    cells: {
      ...grid.cells,
      [id]: {
        ...cell,
        ...updates,
      },
    },
  };
}

export function toggleNote(grid: Grid, id: CellId, note: number): Grid {
  const cell = grid.cells[id];
  if (!cell || cell.fixed) return grid;

  const notes = new Set(cell.notes ?? []);

  if (notes.has(note)) {
    notes.delete(note);
  } else {
    notes.add(note);
  }

  return {
    ...grid,
    cells: {
      ...grid.cells,
      [id]: {
        ...cell,
        notes: Array.from(notes).sort(),
      },
    },
  };
}

export function setCellError(grid: Grid, id: CellId, error: boolean): Grid {
  const cell = grid.cells[id];
  if (!cell) return grid;

  return {
    ...grid,
    cells: {
      ...grid.cells,
      [id]: {
        ...cell,
        error,
      },
    },
  };
}

// UTILITY
export function forEachCell(grid: Grid, callback: (cell: Cell) => void) {
  Object.values(grid.cells).forEach(callback);
}

export function mapCells(grid: Grid, callback: (cell: Cell) => Cell): Grid {
  const newCells: Record<CellId, Cell> = {};

  for (const id in grid.cells) {
    newCells[id] = callback(grid.cells[id]);
  }

  return { ...grid, cells: newCells };
}
