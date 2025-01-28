import { Polygon } from "react-native-svg";
import { RenderPoint, GridPosition } from "./types";

interface HexagonProps {
  position: GridPosition;
  center: RenderPoint;
  width: number;
}

export function Hexagon({ position, center, width }: HexagonProps) {
  const getHexagonPoints = () => {
    const radius = width / Math.sqrt(3);
    const angle = Math.PI / 3; // 60 degrees
    const points: [number, number][] = [];

    for (let i = 0; i < 6; i++) {
      // Start from -90 degrees (π/2) to rotate the hexagon
      const x = center.x + radius * Math.cos(angle * i - Math.PI / 2);
      const y = center.y + radius * Math.sin(angle * i - Math.PI / 2);
      points.push([x, y]);
    }

    return points.map(([x, y]) => `${x},${y}`).join(" ");
  };

  return (
    <Polygon
      key={`hex-${position.row}-${position.col}`}
      points={getHexagonPoints()}
      fill="#e5e7eb"
      stroke="#d1d5db"
      strokeWidth="1"
    />
  );
}
