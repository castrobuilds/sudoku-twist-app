"use client";

import { GameHeader } from "@/components/GameHeader";
import { GameStatus } from "@/components/GameStatus";
import { Grid } from "@/components/Grid";
import { NumberPad } from "@/components/NumberPad";
import { useNumberInput } from "@/hooks/useNumberInput";
import { createEmptyGrid } from "@/lib/grid";
import { useGridStore } from "@/store/grid.store";
import { useEffect } from "react";

export default function Home() {
  useNumberInput();

  const startGame = useGridStore((state) => state.startGame);

  useEffect(() => {
    const grid = createEmptyGrid(9); // Create an empty 9x9 grid
    startGame(grid);
  }, [startGame]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <GameHeader />
      <GameStatus />
      <div className="border-4 border-black">
        <Grid />
      </div>
      <NumberPad />
    </div>
  );
}
