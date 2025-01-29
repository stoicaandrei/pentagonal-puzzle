import { View } from "react-native";
import { PlayingFieldSelector } from "../components/screens/playing-field-selector/PlayingFieldSelector";

export default function IndexPage() {
  return (
    <View className="container mx-auto">
      <PlayingFieldSelector />
    </View>
  );
}
