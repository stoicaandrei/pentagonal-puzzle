import { View } from "react-native";
import { HoneycombGrid } from "./HoneycombGrid";

const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 30;

export function Game() {
  return (
    <View className="flex-1 items-center justify-center">
      <HoneycombGrid rows={ROWS} cols={COLS} cellSize={CELL_SIZE} />
    </View>
  );
}
