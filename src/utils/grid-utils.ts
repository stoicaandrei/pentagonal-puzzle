import { LayoutChangeEvent } from "react-native";
import {
  cellHeight,
  computeCellWidth,
  computeCellWidthFromHeight,
} from "./hex-math";
import { useState } from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { Cell, GridPosition, PieceBlock } from "@/common";

interface EmptyGridOptions {
  rows: number;
  cols: number;
  defaultCell?: {
    color?: string;
    disabled?: boolean;
  };
}

export const emptyGrid = ({
  rows,
  cols,
  defaultCell,
}: EmptyGridOptions): Cell[][] => {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      position: { row, col },
      color: defaultCell?.color ?? "white",
      disabled: defaultCell?.disabled,
    }))
  );
};

interface playingFieldToGridOptions {
  fieldColor: string;
}

export const playingFieldToGrid = (
  playingField: Doc<"playingFields">,
  { fieldColor }: playingFieldToGridOptions
) => {
  const grid = emptyGrid({
    rows: playingField.rows,
    cols: playingField.cols,
    defaultCell: {
      disabled: true,
      color: "lightgray",
    },
  });

  playingField.validPositions.forEach((position) => {
    grid[position.row][position.col].color = fieldColor;
    grid[position.row][position.col].disabled = false;
  });

  return grid;
};

export const useResponsiveCellWidth = (cols: number, rows: number) => {
  const [cellWidth, setCellWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const width1 = computeCellWidth(width, cols);
    const width2 = computeCellWidthFromHeight(height, rows);
    const cellWidth = Math.min(width1, width2);
    setCellWidth(cellWidth);
  };

  const viewProps = {
    onLayout: handleLayout,
    style: {
      width: "100%",
      height: "100%",
    } as const,
  };

  return { cellWidth, viewProps };
};

export const gridToValidPositions = (grid: Cell[][], validColor: string) => {
  return grid.flatMap((row) =>
    row.filter((cell) => cell.color === validColor).map((cell) => cell.position)
  );
};

const oddNeighborOffsets = [
  { row: 1, col: -1 },
  { row: 1, col: 0 },
  { row: -1, col: -1 },
  { row: -1, col: 0 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
];

const evenNeighborOffsets = [
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: -1, col: 0 },
  { row: -1, col: 1 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
];

export const gridToPieces = (grid: Cell[][], bgColor: string) => {
  const allColors = grid
    .flatMap((row) => row.map((cell) => cell))
    .filter((cell) => !cell.disabled && cell.color !== bgColor)
    .map((cell) => cell.color);
  const uniqueColors = [...new Set(allColors)];

  const gridChecked = grid.map((row) => row.map((cell) => cell.disabled));

  const pieces: PieceBlock[] = [];

  const getNeighbors = (grid: Cell[][], position: GridPosition): PieceBlock => {
    const currentColor = grid[position.row][position.col].color;
    const offsets =
      position.row % 2 === 1 ? evenNeighborOffsets : oddNeighborOffsets;

    const neighbors: (PieceBlock | null)[] = offsets
      .map((offset) => ({
        row: position.row + offset.row,
        col: position.col + offset.col,
      }))
      .map((neighbor) => {
        if (
          neighbor.row >= 0 &&
          neighbor.row < grid.length &&
          neighbor.col >= 0 &&
          neighbor.col < grid[0].length &&
          grid[neighbor.row][neighbor.col].color === currentColor &&
          !gridChecked[neighbor.row][neighbor.col]
        ) {
          gridChecked[neighbor.row][neighbor.col] = true;
          return getNeighbors(grid, neighbor);
        }

        return null;
      });

    return { neighbors };
  };

  grid.forEach((row) =>
    row.forEach((cell) => {
      if (!gridChecked[cell.position.row][cell.position.col]) {
        pieces.push(getNeighbors(grid, cell.position));
      }
    })
  );

  if (pieces.length > uniqueColors.length) {
    return;
  }

  return pieces;
};
