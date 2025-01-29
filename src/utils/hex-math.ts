import { GridPosition, RenderPoint } from "common";

export const cellHeight = (cellWidth: number) => (cellWidth * Math.sqrt(3)) / 2;
export const cellWidth = (cellHeight: number) =>
  (cellHeight * 2) / Math.sqrt(3);

export const gridWidth = (cols: number, cellWidth: number) =>
  (cols + 0.5) * cellWidth;
export const gridHeight = (rows: number, cellWidth: number) =>
  (rows + 0.5) * cellHeight(cellWidth);

export const hexCenter = (position: GridPosition, cellWidth: number) => {
  const centerX =
    position.col * cellWidth +
    (position.row % 2 ? cellWidth / 2 : 0) +
    cellWidth -
    cellWidth / 2.5;
  const centerY =
    position.row * cellHeight(cellWidth) + cellWidth - cellWidth / 2.5;

  return { x: centerX, y: centerY };
};

export const hexagonPoints = (center: RenderPoint, width: number) => {
  const radius = width / Math.sqrt(3);
  const angle = Math.PI / 3; // 60 degrees
  const points: [number, number][] = [];

  for (let i = 0; i < 6; i++) {
    // Start from -90 degrees (π/2) to rotate the hexagon
    const x = center.x + radius * Math.cos(angle * i - Math.PI / 2);
    const y = center.y + radius * Math.sin(angle * i - Math.PI / 2);
    points.push([x, y]);
  }

  return points;
};

export const computeCellWidth = (desiredGridWidth: number, cols: number) => {
  return desiredGridWidth / (cols + 0.5);
};

export const computeCols = (desiredGridWidth: number, cellWidth: number) => {
  return Math.floor(desiredGridWidth / cellWidth - 0.5);
};

export const computeCellWidthFromHeight = (
  desiredGridHeight: number,
  rows: number
) => {
  const height = Math.floor(desiredGridHeight / rows);
  return cellWidth(height);
};

export const computeRows = (desiredGridHeight: number, cellWidth: number) => {
  const height = cellHeight(cellWidth);
  const rows = Math.floor(desiredGridHeight / height);
  return rows;
};
