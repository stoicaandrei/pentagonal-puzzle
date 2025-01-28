import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Cell, GridPosition, PlayingField } from "../components/types";

interface GameState {
  grid: Cell[][];
  playingField: PlayingField;
  initializeGrid: (rows: number, cols: number) => void;
  isPlayingCell: (position: GridPosition) => boolean;
  setPlayingCell: (position: GridPosition, isPlaying: boolean) => void;
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

    setPlayingCell: (position: GridPosition, isPlaying: boolean) => {
      set((state) => {
        if (isPlaying) {
          if (state.playingField.validPositions.includes(position)) {
            return;
          }

          state.playingField.validPositions.push(position);
        } else {
          state.playingField.validPositions =
            state.playingField.validPositions.filter(
              (pos) => pos.row !== position.row || pos.col !== position.col
            );
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
