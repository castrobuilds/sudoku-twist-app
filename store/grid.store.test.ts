import { describe, it, expect, beforeEach } from "vitest";
import { useGridStore } from "./grid.store";
import { createEmptyGrid, getCellId } from "@/lib/grid/grid";

describe("Grid Store", () => {
  beforeEach(() => {
    useGridStore.setState({ grid: createEmptyGrid(9) });
  });

  it("updates cell via store", () => {
    const id = getCellId(0, 0);

    useGridStore.getState().setCellValue(id, 7);

    const cell = useGridStore.getState().grid.cells[id];

    expect(cell.value).toBe(7);
  });

  it("resets grid", () => {
    const id = getCellId(0, 0);

    useGridStore.getState().setCellValue(id, 5);
    useGridStore.getState().resetGrid();

    const cell = useGridStore.getState().grid.cells[id];

    expect(cell.value).toBe(null);
  });
});
