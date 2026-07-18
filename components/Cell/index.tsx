"use client";

import { useGridStore } from "@/store/grid.store";
import { shallow } from "zustand/shallow";
import { Cell as CellType, GridState } from "@/types/grid/";
import { useMemo } from "react";
import { useStoreWithEqualityFn } from "zustand/traditional";

type Props = {
  cell: CellType;
  row: number;
  col: number;
  invalidCells: Set<string>;
};

export function Cell({ cell, row, col, invalidCells }: Props) {
  // BORDERS
  const isRightBorder = (col + 1) % 3 === 0 && col !== 8;
  const isBottomBorder = (row + 1) % 3 === 0 && row !== 8;

  // SELECTION
  const selector = useMemo(
    () => makeCellSelector(cell.row, cell.col, cell.box),
    [cell.row, cell.col, cell.box],
  );

  const { isSelected, isSameRow, isSameCol, isSameBox } =
    useStoreWithEqualityFn(useGridStore, selector, shallow);

  const setSelectedCell = useGridStore((s) => s.setSelectedCell);

  const isInvalid = invalidCells.has(cell.id);

  // HANDLERS
  const handleClick = () => {
    setSelectedCell({
      row: cell.row,
      col: cell.col,
      box: cell.box,
    });
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center justify-center
        w-full h-full
        text-lg font-medium
        bg-white
        border border-gray-300
        ${isRightBorder ? "border-r-2 border-r-black" : ""}
        ${isBottomBorder ? "border-b-2 border-b-black" : ""}
        ${cell.fixed ? "font-bold text-black" : "text-blue-600"}
        ${cell.error ? "bg-red-100" : ""}
        hover:bg-gray-100 cursor-pointer
        ${isSelected ? "bg-yellow-200" : ""}
        ${!isSelected && isSameRow ? "bg-yellow-100" : ""}
        ${!isSelected && isSameCol ? "bg-yellow-100" : ""}
        ${!isSelected && isSameBox ? "bg-yellow-50" : ""}
        ${isInvalid ? "bg-red-100!" : ""}
        transition-colors duration-200
      `}
    >
      {cell.value !== null ? (
        cell.value
      ) : cell.notes && cell.notes.length > 0 ? (
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full text-[9px] leading-none">
          {Array.from({ length: 9 }, (_, i) => {
            const n = i + 1;
            const hasNote = cell.notes?.includes(n);

            return (
              <div
                key={n}
                className="flex items-center justify-center text-gray-500"
              >
                {hasNote ? n : ""}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

const makeCellSelector =
  (row: number, col: number, box: number) => (state: GridState) => {
    const selected = state.selectedCell;

    if (!selected) {
      return {
        isSelected: false,
        isSameRow: false,
        isSameCol: false,
        isSameBox: false,
      };
    }

    return {
      isSelected: selected.row === row && selected.col === col,
      isSameRow: selected.row === row,
      isSameCol: selected.col === col,
      isSameBox: selected.box === box,
    };
  };
