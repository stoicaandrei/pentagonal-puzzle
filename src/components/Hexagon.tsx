import { Polygon } from "react-native-svg";

interface HexagonProps {
  rowIndex: number;
  colIndex: number;
  width: number;
  centerX: number;
  centerY: number;
}

export function Hexagon({
  rowIndex,
  colIndex,
  width,
  centerX,
  centerY,
}: HexagonProps) {
  const getHexagonPoints = () => {
    const radius = width / Math.sqrt(3);
    const angle = Math.PI / 3; // 60 degrees
    const points: [number, number][] = [];

    for (let i = 0; i < 6; i++) {
      // Start from -90 degrees (π/2) to rotate the hexagon
      const x = centerX + radius * Math.cos(angle * i - Math.PI / 2);
      const y = centerY + radius * Math.sin(angle * i - Math.PI / 2);
      points.push([x, y]);
    }

    return points.map(([x, y]) => `${x},${y}`).join(" ");
  };

  return (
    <Polygon
      key={`hex-${rowIndex}-${colIndex}`}
      points={getHexagonPoints()}
      fill="#e5e7eb"
      stroke="#d1d5db"
      strokeWidth="1"
    />
  );
}
