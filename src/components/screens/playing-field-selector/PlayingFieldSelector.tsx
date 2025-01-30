import { View, Text } from "react-native";
import { PlayingFieldSelectorList } from "./PlayingFieldSelectorList";
import { useRouter } from "expo-router";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Doc } from "@/convex/_generated/dataModel";

export function PlayingFieldSelector() {
  const playingFields = useQuery(api.game.listPlayingFields);
  const router = useRouter();

  const handleNewField = () => {
    router.push("/playing-field-editor");
  };

  const handleSelectField = (field: Doc<"playingFields">) => {
    router.push(`/play/${field._id}`);
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-bold mb-4 pt-4">
        Select a playing field
      </Text>
      <PlayingFieldSelectorList
        playingFields={[]}
        onNewField={handleNewField}
        onSelectField={handleSelectField}
      />
    </View>
  );
}
