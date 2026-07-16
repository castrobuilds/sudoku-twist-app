"use client";

import { Grid } from "@/components/Grid";
import { NumberPad } from "@/components/NumberPad";
import { useNumberInput } from "@/hooks/useNumberInput";

export default function Home() {
  useNumberInput();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="border-4 border-black">
        <Grid />
      </div>
      <NumberPad />
    </div>
  );
}
