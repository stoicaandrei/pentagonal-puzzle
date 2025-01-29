import { GridPosition, PlayingField } from "common";
import { _printGrid } from "./debug";

export const cellHeight = (cellWidth: number) => (cellWidth * Math.sqrt(3)) / 2;

export const gridWidth = (cols: number, cellWidth: number) =>
  (cols + 0.5) * cellWidth;
export const gridHeight = (rows: number, cellWidth: number) =>
  (rows + 0.5) * cellHeight(cellWidth);

export const hexCenter = (position: GridPosition, cellWidth: number) => {
  const centerX =
    position.col * cellWidth +
    (position.row % 2 ? cellWidth / 2 : 0) +
    cellWidth;
  const centerY = position.row * cellHeight(cellWidth) + cellWidth;

  return { x: centerX, y: centerY };
};

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
