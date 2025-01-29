import { GridPosition, PlayingField } from "common";
import { _printGrid } from "./debug";

export const hexWidth = (cellSize: number) => cellSize * Math.sqrt(3);
export const verticalSpacing = (cellSize: number) => cellSize * 1.5;
export const horizontalSpacing = (cellSize: number) => hexWidth(cellSize) * 1;

export const gridWidth = (cols: number, cellSize: number) =>
  (cols + 0.5) * horizontalSpacing(cellSize) + 10;
export const gridHeight = (rows: number, cellSize: number) =>
  (rows + 0.5) * verticalSpacing(cellSize) + 10;

export const hexCenter = (position: GridPosition, cellSize: number) => {
  const centerX =
    position.col * horizontalSpacing(cellSize) +
    (position.row % 2 ? hexWidth(cellSize) / 2 : 0) +
    cellSize;
  const centerY = position.row * verticalSpacing(cellSize) + cellSize;

  return { x: centerX, y: centerY };
};

export const playingFieldToGrid = (playingField: PlayingField) => {
  const grid = Array.from({ length: playingField.rows }, (_, row) =>
    Array.from({ length: playingField.cols }, (_, col) => ({
      position: { row, col },
      color: "white",
    }))
  );

  _printGrid(grid);

  playingField.validPositions.forEach((position) => {
    grid[position.row][position.col].color = "green";
  });

  _printGrid(grid);

  return grid;
};
