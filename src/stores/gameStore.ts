import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Cell, GridPosition, PlayingField } from "../components/types";

interface GameState {
  grid: Cell[][];
  playingField: PlayingField;
  initializeGrid: (rows: number, cols: number) => void;
  isPlayingCell: (position: GridPosition) => boolean;
  setPlayingCell: (position: GridPosition) => void;
}

export const useGameStore = create<GameState>()(
  immer((set, get) => ({
    grid: [],

    initializeGrid: (rows: number, cols: number) => {
      set((state) => {
        state.grid = Array(rows)
          .fill(null)
          .map((_, rowIndex) =>
            Array(cols)
              .fill(null)
              .map((_, colIndex) => ({
                position: { row: rowIndex, col: colIndex },
              }))
          );
      });
    },

    playingField: {
      validPositions: [],
    },

    setPlayingCell: (position: GridPosition) => {
      set((state) => {
        const existingIndex = state.playingField.validPositions.findIndex(
          (pos) => pos.row === position.row && pos.col === position.col
        );

        if (existingIndex >= 0) {
          state.playingField.validPositions.splice(existingIndex, 1);
        } else {
          state.playingField.validPositions.push(position);
        }
      });
    },

    isPlayingCell: (position: GridPosition) => {
      return get().playingField.validPositions.some(
        (pos) => pos.row === position.row && pos.col === position.col
      );
    },
  }))
);
