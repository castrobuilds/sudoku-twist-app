import { Cell } from "@/types/grid";

export function validateGroup(cells: Cell[]): Set<string> {
  const valueMap = new Map<number, string[]>();

  // Collect Values
  for (const cell of cells) {
    if (cell.value === null) continue;

    const list = valueMap.get(cell.value) ?? [];

    list.push(cell.id);
    valueMap.set(cell.value, list);
  }

  // Extract Duplicates
  const duplicates = new Set<string>();

  for (const ids of valueMap.values()) {
    if (ids.length > 1) {
      ids.forEach((id) => duplicates.add(id));
    }
  }

  return duplicates;
}
