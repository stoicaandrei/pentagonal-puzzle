import { PlayingField } from "common";
import { HexagonalGrid } from "components/common/HexagonalGrid";
import { HoneycombGrid } from "components/HoneycombGrid";
import { View, Text } from "react-native";
import { playingFieldToGrid } from "utils";

interface PlayingFieldPreviewProps {
  playingField: PlayingField;
}

export function PlayingFieldPreview({
  playingField,
}: PlayingFieldPreviewProps) {
  const grid = playingFieldToGrid(playingField);

  return (
    <HexagonalGrid
      rows={playingField.rows}
      cols={playingField.cols}
      cellSize={10}
      grid={grid}
    />
  );
}
