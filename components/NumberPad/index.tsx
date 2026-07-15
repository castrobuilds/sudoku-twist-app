"use client";

import { useGridStore } from "@/store/grid.store";

export function NumberPad() {
  const setValueForSelected = useGridStore(
    (state) => state.setValueForSelected,
  );

  return (
    <div className="grid grid-cols-9 gap-2 mt-4 w-90">
      {Array.from({ length: 9 }, (_, i) => {
        const value = i + 1;

        return (
          <button
            key={value}
            onClick={() => setValueForSelected(value)}
            className="
              h-10
              bg-gray-200
              hover:bg-gray-300
              rounded
              font-medium
            "
          >
            {value}
          </button>
        );
      })}
      <button
        onClick={() => setValueForSelected(null)}
        className="col-span-9 h-10 bg-red-200 hover:bg-red-300 rounded"
      >
        Clear
      </button>
    </div>
  );
}
