import React from "react";
import { View } from "react-native";
import Svg, { Polygon } from "react-native-svg";

interface PentagonGridProps {
  size: number; // n x n grid
  pentagonSize?: number; // size of each pentagon
  color?: string; // color of pentagons
  strokeWidth?: number;
  strokeColor?: string;
}

export const PentagonGrid: React.FC<PentagonGridProps> = ({
  size,
  pentagonSize = 40,
  color = "#6366f1",
  strokeWidth = 2,
  strokeColor = "#4338ca",
}) => {
  const getPentagonPoints = (centerX: number, centerY: number): string => {
    const points: [number, number][] = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2; // Start from top point
      const x = centerX + (pentagonSize / 2) * Math.cos(angle);
      const y = centerY + (pentagonSize / 2) * Math.sin(angle);
      points.push([x, y]);
    }
    return points.map(([x, y]) => `${x},${y}`).join(" ");
  };

  const totalSize = pentagonSize * size;

  return (
    <View className="items-center justify-center">
      <Svg width={totalSize} height={totalSize}>
        {Array.from({ length: size }, (_, row) =>
          Array.from({ length: size }, (_, col) => {
            const centerX = col * pentagonSize + pentagonSize / 2;
            const centerY = row * pentagonSize + pentagonSize / 2;

            return (
              <Polygon
                key={`${row}-${col}`}
                points={getPentagonPoints(centerX, centerY)}
                fill={color}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
              />
            );
          })
        )}
      </Svg>
    </View>
  );
};
