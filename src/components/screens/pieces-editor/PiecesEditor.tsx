import {
  HexagonalGrid,
  OnCellTouchedParams,
} from "@/components/common/HexagonalGrid";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { gridToPieces, playingFieldToGrid } from "@/utils";
import { Doc } from "@/convex/_generated/dataModel";
import { Cell } from "@/common";

interface PiecesEditorProps {
  playingField: Doc<"playingFields">;
  pieceColor?: string;
  onGridChange?: (grid: Cell[][]) => void;
}

export function PiecesEditor({
  playingField,
  pieceColor,
  onGridChange,
}: PiecesEditorProps) {
  const [grid, setGrid] = useState(
    playingFieldToGrid(playingField, { fieldColor: "white" })
  );

  useEffect(() => {
    setGrid(playingFieldToGrid(playingField, { fieldColor: "white" }));
  }, [playingField]);

  const handleCellTouch = ({ cell }: OnCellTouchedParams) => {
    const { row, col } = cell.position;
    const newGrid = [...grid];
    newGrid[row][col].color = pieceColor ?? "white";
    setGrid(newGrid);

    const pieces = gridToPieces(newGrid, "white");
    if (pieces) {
      onGridChange?.(newGrid);
    }
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
