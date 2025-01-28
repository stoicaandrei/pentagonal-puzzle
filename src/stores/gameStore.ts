import { create } from "zustand";
import { Cell } from "../components/types";

interface GameState {
  grid: Cell[][];
  initializeGrid: (rows: number, cols: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  grid: [],

  initializeGrid: (rows: number, cols: number) => {
    const newGrid = Array(rows)
      .fill(null)
      .map((_, rowIndex) =>
        Array(cols)
          .fill(null)
          .map((_, colIndex) => ({
            position: { row: rowIndex, col: colIndex },
          }))
      );
    set({ grid: newGrid });
  },
}));
