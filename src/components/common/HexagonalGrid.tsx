import { Cell } from "common";
import { Hexagon } from "./Hexagon";
import { View } from "react-native";
import Svg from "react-native-svg";
import { gridHeight, hexCenter } from "utils";
import { gridWidth } from "utils";

interface HexagonalGridProps {
  rows: number;
  cols: number;
  cellWidth: number;
  grid: Cell[][];
}

export function HexagonalGrid({
  rows,
  cols,
  cellWidth,
  grid,
}: HexagonalGridProps) {
  return (
    <View>
      <Svg
        width={gridWidth(cols, cellWidth) + 10}
        height={gridHeight(rows, cellWidth) + 10}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const center = hexCenter(cell.position, cellWidth);

            return (
              <Hexagon
                key={`hex-${rowIndex}-${colIndex}`}
                position={cell.position}
                center={center}
                width={cellWidth}
                color={cell.color}
              />
            );
          })
        )}
      </Svg>
    </View>
  );
}
