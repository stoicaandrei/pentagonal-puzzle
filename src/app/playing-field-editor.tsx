import { PlayingFieldEditorPage } from "@/components/screens/playing-field-editor/PlayingFieldEditorPage";
import { View, Text } from "react-native";

export default function PlayingFieldEditor() {
  return (
    <View className="flex-1 h-full flex-row justify-center items-center container p-4">
      <PlayingFieldEditorPage />
    </View>
  );
}
