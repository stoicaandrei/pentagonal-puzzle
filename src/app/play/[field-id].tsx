import { PiecesEditorPage } from "@/components/screens/pieces-editor/PiecesEditorPage";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function FieldPage() {
  const params = useLocalSearchParams();

  const playingField = useQuery(api.game.getPlayingField, {
    _id: params["field-id"] as Id<"playingFields">,
  });

  if (!playingField) {
    return <Text>Loading...</Text>;
  }

  return <PiecesEditorPage playingField={playingField} />;
}
