import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "src/global.css";
import { PentagonGrid } from "./components/PentagonGrid";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold mb-4">Pentagon Grid</Text>
      <PentagonGrid size={5} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
