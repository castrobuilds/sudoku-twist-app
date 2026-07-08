export type CellId = string; // r1c1

export type Cell = {
  id: CellId;
  row: number;
  col: number;
  value: number | null;

  fixed?: boolean;
  notes?: number[];
  error?: boolean;
};
