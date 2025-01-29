import { PlayingFieldEditor } from "components/screens/playing-field-editor/PlayingFieldEditor";
import { View, Text } from "react-native";

export default function PlayingFieldEditorPage() {
  return (
    <View>
      <Text>Playing Field Editor</Text>
      <View className="flex-1 flex-row justify-center items-center">
        <PlayingFieldEditor />
      </View>
    </View>
  );
}
