import { View } from "react-native";
import Svg from "react-native-svg";
import { Hexagon } from "./Hexagon";
import { RenderPoint, GridPosition } from "./types";
import { useGameStore } from "../stores/gameStore";

interface HoneycombGridProps {
  cellSize: number;
}

export function HoneycombGrid({ cellSize }: HoneycombGridProps) {
  const grid = useGameStore((state) => state.grid);

  const rows = grid.length;
  const cols = grid[0]?.length;

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
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const center = hexCenter(cell.position);

            return (
              <Hexagon
                key={`hex-${rowIndex}-${colIndex}`}
                position={cell.position}
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
