"use client";

import { useGridStore } from "@/store/grid.store";

export function NumberPad() {
  const setInputForSelected = useGridStore(
    (state) => state.setInputForSelected,
  );

  const notesMode = useGridStore((state) => state.notesMode);
  const toggleNotesMode = useGridStore((state) => state.toggleNotesMode);
  const resetGrid = useGridStore((state) => state.resetGrid);

  const selected = useGridStore((state) => state.selectedCell);

  return (
    <div className="grid grid-cols-9 gap-2 mt-4 w-90">
      {Array.from({ length: 9 }, (_, i) => {
        const value = i + 1;

        return (
          <button
            key={value}
            onClick={() => setInputForSelected(value)}
            disabled={!selected}
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
      <div className="col-span-9 grid grid-cols-3 gap-2">
        <button
          onClick={toggleNotesMode}
          className={`
            h-10 rounded font-medium
            ${notesMode ? "bg-yellow-400 text-black" : "bg-gray-200 hover:bg-gray-300"}
        `}
        >
          Notes
        </button>
        <button
          onClick={() => setInputForSelected(null)}
          className="h-10 bg-red-200 hover:bg-red-300 rounded"
        >
          Clear
        </button>

        <button
          onClick={resetGrid}
          className="
          px-4 py-2
          bg-red-500 text-white font-medium
          rounded
          hover:bg-red-600
          active:scale-95
          transition
        "
        >
          Reset Grid
        </button>
      </div>
    </div>
  );
}
