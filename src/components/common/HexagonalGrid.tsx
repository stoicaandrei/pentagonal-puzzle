import { Cell } from "common";
import { Hexagon } from "./Hexagon";
import { GridPosition, RenderPoint } from "components/types";
import { View, Text } from "react-native";
import Svg from "react-native-svg";
import { hexWidth } from "utils";
import { gridHeight, hexCenter } from "utils";
import { gridWidth } from "utils";

interface HexagonalGridProps {
  rows: number;
  cols: number;
  cellSize: number;
  grid: Cell[][];
}

export function HexagonalGrid({
  rows,
  cols,
  cellSize,
  grid,
}: HexagonalGridProps) {
  return (
    <View>
      <Svg
        width={gridWidth(cols, cellSize) + 10}
        height={gridHeight(rows, cellSize) + 10}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const center = hexCenter(cell.position, cellSize);

            return (
              <Hexagon
                key={`hex-${rowIndex}-${colIndex}`}
                position={cell.position}
                center={center}
                width={hexWidth(cellSize)}
                color={cell.color}
              />
            );
          })
        )}
      </Svg>
    </View>
  );
}
