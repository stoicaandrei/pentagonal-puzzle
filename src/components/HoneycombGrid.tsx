import { View } from "react-native";
import Svg from "react-native-svg";
import { Hexagon } from "./Hexagon";

interface HoneycombGridProps {
  rows: number;
  cols: number;
  cellSize: number;
}

export function HoneycombGrid({ rows, cols, cellSize }: HoneycombGridProps) {
  const hexWidth = cellSize * Math.sqrt(3);
  const verticalSpacing = cellSize * 1.5;
  const horizontalSpacing = hexWidth * 1;

  const calculateHexagonCenter = (rowIndex: number, colIndex: number) => {
    const centerX =
      colIndex * horizontalSpacing +
      (rowIndex % 2 ? hexWidth / 2 : 0) +
      cellSize;
    const centerY = rowIndex * verticalSpacing + cellSize;

    return { centerX, centerY };
  };

  const renderHexagon = (rowIndex: number, colIndex: number) => {
    const { centerX, centerY } = calculateHexagonCenter(rowIndex, colIndex);

    return (
      <Hexagon
        key={`hex-${rowIndex}-${colIndex}`}
        rowIndex={rowIndex}
        colIndex={colIndex}
        width={hexWidth}
        centerX={centerX}
        centerY={centerY}
      />
    );
  };

  const svgWidth = (cols + 0.5) * horizontalSpacing + 10;
  const svgHeight = (rows + 0.5) * verticalSpacing + 10;

  return (
    <View>
      <Svg width={svgWidth} height={svgHeight}>
        {Array.from({ length: rows }, (_, rowIndex) =>
          Array.from({ length: cols }, (_, colIndex) =>
            renderHexagon(rowIndex, colIndex)
          )
        )}
      </Svg>
    </View>
  );
}
