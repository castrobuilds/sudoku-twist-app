import { useGridStore } from "@/store/grid.store";
import { formatTime } from "@/lib/time/formatTime";
import { createEmptyGrid } from "@/lib/grid";

export function GameHeader() {
  const timeElapsed = useGridStore((state) => state.timeElapsed);
  const startGame = useGridStore((state) => state.startGame);
  const resetGrid = useGridStore((state) => state.resetGrid);

  const handleNewGame = () => {
    const grid = createEmptyGrid(9);

    resetGrid();
    startGame(grid);
  };

  return (
    <div className="flex items-center justify-between w-full max-w-md mb-4">
      <span>{formatTime(timeElapsed)}</span>
      <button
        onClick={handleNewGame}
        className="px-4 py-2 bg-blue-500 text-white"
      >
        New Game
      </button>
    </div>
  );
}
