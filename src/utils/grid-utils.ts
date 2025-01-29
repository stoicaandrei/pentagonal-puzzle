import { PlayingField } from "common";

interface EmptyGridOptions {
  rows: number;
  cols: number;
  color?: string;
}

export const emptyGrid = ({
  rows,
  cols,
  color = "white",
}: EmptyGridOptions) => {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      position: { row, col },
      color,
    }))
  );
};

export const playingFieldToGrid = (playingField: PlayingField) => {
  const grid = emptyGrid({
    rows: playingField.rows,
    cols: playingField.cols,
    color: "white",
  });

  playingField.validPositions.forEach((position) => {
    grid[position.row][position.col].color = "green";
  });

  return grid;
};
