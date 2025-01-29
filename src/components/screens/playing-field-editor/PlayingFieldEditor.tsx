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
  const grid = emptyGrid({ rows: rows, cols: cols });

  return (
    <View className="w-full h-full">
      <HexagonalGrid rows={rows} cols={cols} grid={grid} />
    </View>
  );
}
