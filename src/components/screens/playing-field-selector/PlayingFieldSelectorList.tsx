import { PlayingField } from "common";
import { View, Text, FlatList, Pressable } from "react-native";
import { PlayingFieldPreview } from "./PlayingFieldPreview";

interface PlayingFieldSelectorListProps {
  playingFields: PlayingField[];
  onSelectField?: (field: PlayingField) => void;
}

export function PlayingFieldSelectorList({
  playingFields,
  onSelectField,
}: PlayingFieldSelectorListProps) {
  const renderItem = ({ item }: { item: PlayingField }) => (
    <Pressable
      className="bg-white rounded-xl p-4 shadow-md active:opacity-70"
      onPress={() => onSelectField?.(item)}
    >
      <View className="w-full flex flex-1 justify-center items-center">
        <PlayingFieldPreview playingField={item} />
      </View>

      <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
    </Pressable>
  );

  return (
    <FlatList
      data={playingFields}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      ItemSeparatorComponent={() => <View className="h-4" />}
    />
  );
}
