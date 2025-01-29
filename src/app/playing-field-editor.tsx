import { PlayingFieldEditor } from "components/screens/playing-field-editor/PlayingFieldEditor";
import { View, Text } from "react-native";

export default function PlayingFieldEditorPage() {
  return (
    <View className="h-full">
      <Text>Playing Field Editor</Text>
      <View className="flex-1 h-full flex-row justify-center items-center container p-4">
        <PlayingFieldEditor rows={20} cols={20} />
      </View>
    </View>
  );
}
