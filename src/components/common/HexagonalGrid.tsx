import { Cell } from "@/common";
import { Hexagon } from "./Hexagon";
import { GestureResponderEvent, Platform, View } from "react-native";
import Svg from "react-native-svg";
import {
  gridHeight,
  hexCenter,
  gridWidth,
  useResponsiveCellWidth,
} from "@/utils";
import { useState } from "react";
import { RenderPoint } from "@/components/types";

export type OnCellTouchedParams = {
  cell: Cell;
  isInitialTouch: boolean;
};

interface HexagonalGridProps {
  rows: number;
  cols: number;
  grid: Cell[][];
  onCellTouched?: (options: OnCellTouchedParams) => void;
}

export function HexagonalGrid({
  rows,
  cols,
  grid,
  onCellTouched,
}: HexagonalGridProps) {
  const { cellWidth, viewProps } = useResponsiveCellWidth(cols, rows);

  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (event: GestureResponderEvent) => {
    setIsDragging(true);
    const point = getEventPoint(event);
    const cell = findCellAtPoint(point.x, point.y);
    if (cell) {
      onCellTouched?.({
        cell,
        isInitialTouch: true,
      });
    }
  };

  const handleDragMove = (event: GestureResponderEvent) => {
    if (!isDragging) return;

    const point = getEventPoint(event);
    const cell = findCellAtPoint(point.x, point.y);
    if (cell) {
      onCellTouched?.({
        cell,
        isInitialTouch: false,
      });
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

  const findCellAtPoint = (x: number, y: number): Cell | null => {
    let minDistance = Infinity;
    let closestCell = null;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const position = { row, col };
        const center = hexCenter(position, cellWidth);

        // Calculate distance from point to hexagon center
        const dx = x - center.x;
        const dy = y - center.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If point is within cellSize of center, it's inside the hexagon
        if (distance < minDistance && !grid[row][col].disabled) {
          minDistance = distance;
          closestCell = grid[row][col];
        }
      }
    }

    if (minDistance > cellWidth) {
      return null;
    }

    return closestCell;
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
    <View {...viewProps}>
      <Svg
        width={gridWidth(cols, cellWidth) + 10}
        height={gridHeight(rows, cellWidth) + 10}
        {...eventHandlers}
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
                disabled={cell.disabled}
              />
            );
          })
        )}
      </Svg>
    </View>
  );
}
