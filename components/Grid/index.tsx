"use client";

import { useGridStore } from "@/store/grid.store";
import { Cell } from "../Cell";
import { getCellId } from "@/lib/grid";

export function Grid() {
  const grid = useGridStore((state) => state.grid);
  const invalidCells = useGridStore((state) => state.invalidCells);

  if (!grid) return null;

  return (
    <div className="flex flex-col w-90 h-90">
      {Array.from({ length: grid.size }).map((_, row) => (
        <div key={row} className="flex flex-1">
          {Array.from({ length: grid.size }).map((_, col) => {
            const cellId = getCellId(row, col);
            const cell = grid.cells[cellId];

            return (
              <div key={cellId} className="flex-1">
                <Cell
                  key={cellId}
                  cell={cell}
                  row={row}
                  col={col}
                  invalidCells={invalidCells}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
