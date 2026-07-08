import { describe, it, expect, beforeEach } from "vitest";
import { createEmptyGrid, getCellId, updateCell, getBoxIndex } from "./grid";
import { useGridStore } from "@/store/grid.store";

describe("Grid", () => {
  beforeEach(() => {
    useGridStore.setState({ grid: createEmptyGrid(9) });
  });
  it("creates empty 9x9 grid", () => {
    const grid = createEmptyGrid(9);

    expect(Object.keys(grid.cells)).toHaveLength(81);
    expect(grid.size).toBe(9);
  });

  it("generates correct cell id", () => {
    expect(getCellId(0, 0)).toBe("r1c1");
    expect(getCellId(8, 8)).toBe("r9c9");
  });

  it("updates a cell value", () => {
    const grid = createEmptyGrid(9);
    const id = getCellId(0, 0);

    const updated = updateCell(grid, id, { value: 5 });

    expect(updated.cells[id].value).toBe(5);

    // immutability check
    expect(grid.cells[id].value).toBe(null);
  });

  it("does not update fixed cell", () => {
    const grid = createEmptyGrid(9);
    const id = getCellId(0, 0);

    const fixedGrid = updateCell(grid, id, { fixed: true });
    const updated = updateCell(fixedGrid, id, { value: 9 });

    expect(updated.cells[id].value).toBe(null);
  });

  it("computes correct box index", () => {
    const grid = createEmptyGrid(9);
    expect(getBoxIndex(grid, 0, 0)).toBe(0);
    expect(getBoxIndex(grid, 4, 4)).toBe(4);
    expect(getBoxIndex(grid, 8, 8)).toBe(8);
  });
});
