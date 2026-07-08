import { Cell } from "./cell";

export type Grid = {
  cells: Record<string, Cell>;
  size: number;
};
