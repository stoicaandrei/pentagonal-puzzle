import { HexagonalGrid } from "components/common/HexagonalGrid";
import { useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import {
  computeCellWidth,
  computeCellWidthFromHeight,
  computeCols,
  computeRows,
  emptyGrid,
} from "utils";

interface PlayingFieldEditorProps {
  rows: number;
  cols: number;
}

export function PlayingFieldEditor({ rows, cols }: PlayingFieldEditorProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setWidth(width);
    setHeight(height);
  };

  const width1 = computeCellWidth(width, cols);
  const width2 = computeCellWidthFromHeight(height, rows);
  const cellWidth = Math.min(width1, width2);

  const grid = emptyGrid({ rows: rows, cols: cols });

  return (
    <View className="w-full h-full" onLayout={handleLayout}>
      <HexagonalGrid
        rows={rows}
        cols={cols}
        cellWidth={cellWidth}
        grid={grid}
      />
    </View>
  );
}
