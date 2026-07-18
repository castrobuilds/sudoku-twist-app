import { useGridStore } from "@/store/grid.store";

export function GameStatus() {
  const gameStatus = useGridStore((state) => state.gameStatus);

  if (gameStatus === "not_started") {
    return <div className="text-gray-500">Game not started</div>;
  }

  if (gameStatus === "in_progress") {
    return <div className="text-blue-500">Game in progress</div>;
  }

  if (gameStatus === "completed") {
    return <div className="text-green-500">Game completed!</div>;
  }

  return null;
}
