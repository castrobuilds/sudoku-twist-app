"use client";

import { useGridStore } from "@/store/grid.store";

export function NumberPad() {
  const setInputForSelected = useGridStore(
    (state) => state.setInputForSelected,
  );

  const notesMode = useGridStore((state) => state.notesMode);
  const toggleNotesMode = useGridStore((state) => state.toggleNotesMode);

  return (
    <div className="grid grid-cols-9 gap-2 mt-4 w-90">
      {Array.from({ length: 9 }, (_, i) => {
        const value = i + 1;

        return (
          <button
            key={value}
            onClick={() => setInputForSelected(value)}
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
      <div className="col-span-9 grid grid-cols-2 gap-2">
        {" "}
        <button
          onClick={() => setInputForSelected(null)}
          className="h-10 bg-red-200 hover:bg-red-300 rounded"
        >
          Clear
        </button>
        <button
          onClick={toggleNotesMode}
          className={`
            h-10 rounded font-medium
            ${notesMode ? "bg-yellow-400 text-black" : "bg-gray-200 hover:bg-gray-300"}
        `}
        >
          Notes
        </button>
      </div>
    </div>
  );
}
