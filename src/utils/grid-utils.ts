import { Cell, PlayingField } from "common";
import { LayoutChangeEvent } from "react-native";
import { computeCellWidth, computeCellWidthFromHeight } from "./hex-math";
import { useState } from "react";

interface EmptyGridOptions {
  rows: number;
  cols: number;
  color?: string;
}

export const emptyGrid = ({
  rows,
  cols,
  color = "white",
}: EmptyGridOptions): Cell[][] => {
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
