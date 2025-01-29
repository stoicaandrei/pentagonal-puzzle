import { PlayingField } from "common";

export const playingFieldToGrid = (playingField: PlayingField) => {
  const grid = Array.from({ length: playingField.rows }, (_, row) =>
    Array.from({ length: playingField.cols }, (_, col) => ({
      position: { row, col },
      color: "white",
    }))
  );

  playingField.validPositions.forEach((position) => {
    grid[position.row][position.col].color = "green";
  });

  return grid;
};
