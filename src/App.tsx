import { Text, View, useWindowDimensions } from "react-native";
import "src/global.css";
import { Game } from "./components/Game";

export default function App() {
  const { width, height } = useWindowDimensions();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold mb-4">Honeycomb Grid</Text>
      <Game />
    </View>
  );
}
