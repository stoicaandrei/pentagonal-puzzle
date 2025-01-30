import { PlayingField } from "common";
import { HexagonalGrid } from "components/common/HexagonalGrid";
import { View } from "react-native";
import { playingFieldToGrid } from "utils";

interface PlayingFieldPreviewProps {
  playingField: PlayingField;
  previewWidth: number;
}

export function PlayingFieldPreview({
  playingField,
  previewWidth,
}: PlayingFieldPreviewProps) {
  const grid = playingFieldToGrid(playingField);

  return (
    <View style={{ width: previewWidth, minHeight: previewWidth }}>
      <HexagonalGrid
        rows={playingField.rows}
        cols={playingField.cols}
        grid={grid}
      />
    </View>
  );
}
