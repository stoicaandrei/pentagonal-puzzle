import {
  HexagonalGrid,
  OnCellTouchedParams,
} from "@/components/common/HexagonalGrid";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { emptyGrid, gridToValidPositions } from "@/utils/grid-utils";

interface PlayingFieldEditorProps {
  rows: number;
  cols: number;
  validPositions?: { row: number; col: number }[];
  onValidPositionsChange?: (positions: { row: number; col: number }[]) => void;
}

export function PlayingFieldEditor({
  rows,
  cols,
  validPositions,
  onValidPositionsChange,
}: PlayingFieldEditorProps) {
  const [grid, setGrid] = useState(emptyGrid({ rows: rows, cols: cols }));

  useEffect(() => {
    setGrid(emptyGrid({ rows: rows, cols: cols }));
  }, [rows, cols]);

  const handleCellTouch = ({ cell }: OnCellTouchedParams) => {
    const { row, col } = cell.position;
    const newGrid = [...grid];
    newGrid[row][col].color = "green";
    setGrid(newGrid);

    if (onValidPositionsChange) {
      onValidPositionsChange(gridToValidPositions(newGrid, "green"));
    }
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
