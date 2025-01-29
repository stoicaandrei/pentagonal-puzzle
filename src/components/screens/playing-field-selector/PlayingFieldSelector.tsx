import { View, Text } from "react-native";
import { PlayingFieldSelectorList } from "./PlayingFieldSelectorList";
import { PlayingField } from "common";

const playingFields: PlayingField[] = [
  {
    id: "1",
    title: "Playing Field 1",
    rows: 5,
    cols: 5,
    validPositions: [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
    ],
  },
];

export function PlayingFieldSelector() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-bold mb-4 pt-4">
        Select a playing field
      </Text>
      <PlayingFieldSelectorList playingFields={playingFields} />
    </View>
  );
}
