import { PlayingField } from "common";
import { HexagonalGrid } from "components/common/HexagonalGrid";
import { computeCellWidth, playingFieldToGrid } from "utils";

interface PlayingFieldPreviewProps {
  playingField: PlayingField;
  previewWidth: number;
}

export function PlayingFieldPreview({
  playingField,
  previewWidth,
}: PlayingFieldPreviewProps) {
  const grid = playingFieldToGrid(playingField);

  const cellWidth = computeCellWidth(previewWidth, playingField.cols);

  return (
    <HexagonalGrid
      rows={playingField.rows}
      cols={playingField.cols}
      cellWidth={cellWidth}
      grid={grid}
    />
  );
}
