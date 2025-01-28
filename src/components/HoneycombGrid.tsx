import { View } from "react-native";
import Svg from "react-native-svg";
import { Hexagon } from "./Hexagon";
import { RenderPoint, GridPosition } from "./types";

interface HoneycombGridProps {
  rows: number;
  cols: number;
  cellSize: number;
}

export function HoneycombGrid({ rows, cols, cellSize }: HoneycombGridProps) {
  const hexWidth = cellSize * Math.sqrt(3);
  const verticalSpacing = cellSize * 1.5;
  const horizontalSpacing = hexWidth * 1;

  const hexCenter = (position: GridPosition): RenderPoint => {
    const centerX =
      position.col * horizontalSpacing +
      (position.row % 2 ? hexWidth / 2 : 0) +
      cellSize;
    const centerY = position.row * verticalSpacing + cellSize;

    return { x: centerX, y: centerY };
  };

  const svgWidth = (cols + 0.5) * horizontalSpacing + 10;
  const svgHeight = (rows + 0.5) * verticalSpacing + 10;

  return (
    <View>
      <Svg width={svgWidth} height={svgHeight}>
        {Array.from({ length: rows }, (_, rowIndex) =>
          Array.from({ length: cols }, (_, colIndex) => {
            const position: GridPosition = { row: rowIndex, col: colIndex };
            const center = hexCenter(position);

            return (
              <Hexagon
                key={`hex-${rowIndex}-${colIndex}`}
                position={position}
                center={center}
                width={hexWidth}
              />
            );
          })
        )}
      </Svg>
    </View>
  );
}
