import {
  HexagonalGrid,
  OnCellTouchedParams,
} from "@/components/common/HexagonalGrid";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { emptyGrid, playingFieldToGrid } from "@/utils";
import { Doc } from "@/convex/_generated/dataModel";

interface PiecesEditorProps {
  playingField: Doc<"playingFields">;
  pieceColor?: string;
}

export function PiecesEditor({ playingField, pieceColor }: PiecesEditorProps) {
  const [grid, setGrid] = useState(
    playingFieldToGrid(playingField, { fieldColor: "white" })
  );

  useEffect(() => {
    setGrid(playingFieldToGrid(playingField, { fieldColor: "white" }));
  }, [playingField]);

  const handleCellTouch = ({ cell }: OnCellTouchedParams) => {
    const { row, col } = cell.position;
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]); // Create a deep copy
      newGrid[row][col].color = pieceColor ?? "white";
      return newGrid;
    });
  };

  return (
    <View className="w-full h-full">
      <HexagonalGrid
        rows={playingField.rows}
        cols={playingField.cols}
        grid={grid}
        onCellTouched={handleCellTouch}
      />
    </View>
  );
}
