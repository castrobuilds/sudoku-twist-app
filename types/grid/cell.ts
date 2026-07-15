export type CellId = string; // r1c1

export type Cell = {
  id: CellId;
  row: number;
  col: number;
  box: number;
  value: number | null;

  fixed?: boolean;
  notes?: number[];
  error?: boolean;
};

export type SelectedCell = {
  row: number;
  col: number;
  box: number;
} | null;
