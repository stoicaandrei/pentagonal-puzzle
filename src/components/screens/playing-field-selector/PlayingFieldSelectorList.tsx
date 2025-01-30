import { View, Text, FlatList, Pressable, Dimensions } from "react-native";
import { PlayingFieldPreview } from "./PlayingFieldPreview";
import { Doc } from "@/convex/_generated/dataModel";

interface PlayingFieldSelectorListProps {
  playingFields: Doc<"playingFields">[];
  onSelectField?: (field: Doc<"playingFields">) => void;
  onNewField?: () => void;
  onDeleteField?: (field: Doc<"playingFields">) => void;
}

export function PlayingFieldSelectorList({
  playingFields,
  onSelectField,
  onNewField,
  onDeleteField,
}: PlayingFieldSelectorListProps) {
  const renderItem = ({ item }: { item: Doc<"playingFields"> }) => (
    <View className="mb-4">
      <Pressable
        className="bg-white rounded-xl p-4 shadow-md active:opacity-70"
        onPress={() => onSelectField?.(item)}
      >
        <View className="w-full flex flex-1 justify-center items-center">
          <PlayingFieldPreview playingField={item} previewWidth={200} />
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold text-gray-800">
            {item.title}
          </Text>
          {onDeleteField && (
            <Pressable
              className="bg-red-500 px-3 py-1 rounded-lg active:opacity-70"
              onPress={(e) => {
                e.stopPropagation();
                onDeleteField(item);
              }}
            >
              <Text className="text-white font-semibold">Delete</Text>
            </Pressable>
          )}
        </View>
      </Pressable>
    </View>
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
