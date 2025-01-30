import { View, Text, FlatList, Pressable, Dimensions } from "react-native";
import { PlayingFieldPreview } from "./PlayingFieldPreview";
import { Doc } from "@/convex/_generated/dataModel";

interface PlayingFieldSelectorListProps {
  playingFields: Doc<"playingFields">[];
  onSelectField?: (field: Doc<"playingFields">) => void;
  onNewField?: () => void;
}

export function PlayingFieldSelectorList({
  playingFields,
  onSelectField,
  onNewField,
}: PlayingFieldSelectorListProps) {
  const renderItem = ({ item }: { item: Doc<"playingFields"> }) => (
    <Pressable
      className="bg-white rounded-xl p-4 shadow-md active:opacity-70"
      onPress={() => onSelectField?.(item)}
    >
      <View className="w-full flex flex-1 justify-center items-center">
        <PlayingFieldPreview playingField={item} previewWidth={200} />
      </View>

      <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
    </Pressable>
  );

  const ListHeaderComponent = () => (
    <Pressable
      className="bg-white rounded-xl p-4 shadow-md active:opacity-70 mb-4"
      onPress={onNewField}
    >
      <View className="w-full flex flex-1 justify-center items-center">
        <View className="w-[200px] h-[100px] bg-gray-100 rounded-lg flex items-center justify-center">
          <Text className="text-4xl text-gray-400">+</Text>
        </View>
      </View>
      <Text className="text-lg font-semibold text-gray-800">
        New Playing Field
      </Text>
    </Pressable>
  );

  return (
    <FlatList
      data={playingFields}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ padding: 16 }}
      ItemSeparatorComponent={() => <View className="h-4" />}
    />
  );
}
