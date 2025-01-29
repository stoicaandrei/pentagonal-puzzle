import { HexagonalGrid } from "components/common/HexagonalGrid";
import { Dimensions } from "react-native";
import { computeCellWidth, computeCols, emptyGrid } from "utils";

const EDITOR_CELL_WIDTH = 100;

export function PlayingFieldEditor() {
  const editorWidth = Dimensions.get("window").width * 0.5;
  const cols = computeCols(editorWidth, EDITOR_CELL_WIDTH);

  const rows = cols;
  const grid = emptyGrid({ rows: rows, cols: cols });

  return (
    <HexagonalGrid
      rows={rows}
      cols={cols}
      cellWidth={EDITOR_CELL_WIDTH}
      grid={grid}
    />
  );
}
