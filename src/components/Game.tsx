import { View } from "react-native";
import { HoneycombGrid } from "./HoneycombGrid";
import { useGameStore } from "../stores/gameStore";
import { useEffect } from "react";

const ROWS = 20;
const COLS = 20;
const CELL_SIZE = 30;

export function Game() {
  const initializeGrid = useGameStore((state) => state.initializeGrid);

  useEffect(() => {
    initializeGrid(ROWS, COLS);
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <HoneycombGrid cellSize={CELL_SIZE} />
    </View>
  );
}
