import { Cell } from "common";
import {
  HexagonalGrid,
  OnCellTouchedParams,
} from "components/common/HexagonalGrid";
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
  const [grid, setGrid] = useState(emptyGrid({ rows: rows, cols: cols }));

  const handleCellTouch = ({ cell }: OnCellTouchedParams) => {
    const { row, col } = cell.position;
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]); // Create a deep copy
      newGrid[row][col].color = "red";
      return newGrid;
    });
  };

  return (
    <View className="w-full h-full">
      <HexagonalGrid
        rows={rows}
        cols={cols}
        grid={grid}
        onCellTouched={handleCellTouch}
      />
    </View>
  );
}
