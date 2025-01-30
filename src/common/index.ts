export type GridPosition = {
  row: number;
  col: number;
};

export type RenderPoint = {
  x: number;
  y: number;
};

export type Cell = {
  position: GridPosition;
  color: string;
  disabled?: boolean;
};

export type PlayingField = {
  id: string;
  rows: number;
  cols: number;
  title: string;
  validPositions: GridPosition[];
};

export type PieceBlock = {
  neighbors: (PieceBlock | null)[];
};
