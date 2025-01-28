import { GestureResponderEvent, Platform, View } from "react-native";
import Svg, { G } from "react-native-svg";
import { Hexagon } from "./Hexagon";
import { RenderPoint, GridPosition } from "./types";
import { useGameStore } from "../stores/gameStore";
import { useState } from "react";

interface HoneycombGridProps {
  cellSize: number;
}

export function HoneycombGrid({ cellSize }: HoneycombGridProps) {
  const grid = useGameStore((state) => state.grid);
  const setPlayingCell = useGameStore((state) => state.setPlayingCell);
  const isPlayingCell = useGameStore((state) => state.isPlayingCell);

  const [isDragging, setIsDragging] = useState(false);
  const [draggingValue, setDraggingValue] = useState<boolean>(false);

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

  const findHexagonAtPoint = (x: number, y: number): GridPosition | null => {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const position = { row, col };
        const center = hexCenter(position);

        // Calculate distance from point to hexagon center
        const dx = x - center.x;
        const dy = y - center.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If point is within cellSize of center, it's inside the hexagon
        if (distance <= cellSize) {
          return position;
        }
      }
    }
    return null;
  };

  const handleDragStart = (event: GestureResponderEvent) => {
    setIsDragging(true);
    const point = getEventPoint(event);
    const hex = findHexagonAtPoint(point.x, point.y);
    if (hex) {
      const isPlaying = isPlayingCell(hex);
      setDraggingValue(isPlaying);
      setPlayingCell(hex, !isPlaying);
    }
  };

  const handleDragMove = (event: GestureResponderEvent) => {
    if (!isDragging) return;

    const point = getEventPoint(event);
    const hex = findHexagonAtPoint(point.x, point.y);
    if (hex) {
      setPlayingCell(hex, !draggingValue);
    }
  };

  const handleDragEnd = (event: GestureResponderEvent) => {
    setIsDragging(false);
  };

  const getEventPoint = (event: GestureResponderEvent): RenderPoint => {
    const svgElement = event.currentTarget as unknown as SVGSVGElement;
    const rect = svgElement.getBoundingClientRect();

    const clientX = (event as unknown as React.MouseEvent).clientX;
    const clientY = (event as unknown as React.MouseEvent).clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const eventHandlers = Platform.select({
    web: {
      onMouseDown: handleDragStart,
      onMouseMove: handleDragMove,
      onMouseUp: handleDragEnd,
    },
    default: {
      onTouchStart: handleDragStart,
      onTouchMove: handleDragMove,
      onTouchEnd: handleDragEnd,
    },
  });

  return (
    <View>
      <Svg width={svgWidth} height={svgHeight} {...eventHandlers}>
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
