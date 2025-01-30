import {
  HexagonalGrid,
  OnCellTouchedParams,
} from "@/components/common/HexagonalGrid";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { emptyGrid } from "@/utils";

interface PiecesEditorProps {
  rows: number;
  cols: number;
  pieceColor: string;
}

export function PiecesEditor({ rows, cols, pieceColor }: PiecesEditorProps) {
  const [grid, setGrid] = useState(emptyGrid({ rows: rows, cols: cols }));

  useEffect(() => {
    setGrid(emptyGrid({ rows: rows, cols: cols }));
  }, [rows, cols]);

  const handleCellTouch = ({ cell }: OnCellTouchedParams) => {
    const { row, col } = cell.position;
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]); // Create a deep copy
      newGrid[row][col].color = pieceColor;
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
