import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "src/global.css";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold text-underline">
        Hello NativeWind!
      </Text>
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
