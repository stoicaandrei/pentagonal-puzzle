import { View, Text, TextInput, Pressable } from "react-native";
import { PlayingFieldEditor } from "./PlayingFieldEditor";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "expo-router";

export function PlayingFieldEditorPage() {
  const router = useRouter();
  const createPlayingField = useMutation(api.game.createPlayingField);

  const [title, setTitle] = useState("Untitled Field");
  const [gridDimensions, setGridDimensions] = useState({ rows: 10, cols: 10 });
  const [inputValues, setInputValues] = useState({
    rows: gridDimensions.rows.toString(),
    cols: gridDimensions.cols.toString(),
  });
  const [validPositions, setValidPositions] = useState<
    {
      row: number;
      col: number;
    }[]
  >([]);

  const handleRowsChange = (text: string) => {
    setInputValues((prev) => ({ ...prev, rows: text }));
  };

  const handleColsChange = (text: string) => {
    setInputValues((prev) => ({ ...prev, cols: text }));
  };

  const handleApply = () => {
    const newRows = Math.max(1, Math.min(20, parseInt(inputValues.rows) || 1));
    const newCols = Math.max(1, Math.min(20, parseInt(inputValues.cols) || 1));
    setGridDimensions({ rows: newRows, cols: newCols });
    setInputValues({
      rows: newRows.toString(),
      cols: newCols.toString(),
    });
  };

  const handleSave = () => {
    createPlayingField({
      data: {
        title,
        rows: gridDimensions.rows,
        cols: gridDimensions.cols,
        validPositions,
      },
    });
    router.push("/");
  };

  return (
    <View className="p-4 w-full h-full">
      <View className="flex-row justify-between items-center mb-4 bg-gray-100 p-3 rounded-lg">
        <View className="flex-1 mr-4">
          <Text className="text-gray-700 mb-1">Title</Text>
          <TextInput
            className="bg-white px-3 py-2 rounded-md border border-gray-300"
            value={title}
            onChangeText={setTitle}
            placeholder="Enter field title"
          />
        </View>
        <Pressable
          onPress={handleSave}
          className="bg-green-500 px-6 py-2 rounded-md active:bg-green-600"
        >
          <Text className="text-white font-medium">Save Field</Text>
        </Pressable>
      </View>

      <View className="flex-row justify-between items-end mb-4 bg-gray-100 p-3 rounded-lg">
        <View className="flex-1 mr-4">
          <Text className="text-gray-700 mb-1">Rows</Text>
          <TextInput
            className="bg-white px-3 py-2 rounded-md border border-gray-300"
            value={inputValues.rows}
            onChangeText={handleRowsChange}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <View className="flex-1 mr-4">
          <Text className="text-gray-700 mb-1">Columns</Text>
          <TextInput
            className="bg-white px-3 py-2 rounded-md border border-gray-300"
            value={inputValues.cols}
            onChangeText={handleColsChange}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
        <Pressable
          onPress={handleApply}
          className="bg-blue-500 px-4 py-2 rounded-md active:bg-blue-600"
        >
          <Text className="text-white font-medium">Apply</Text>
        </Pressable>
      </View>

      <PlayingFieldEditor
        rows={gridDimensions.rows}
        cols={gridDimensions.cols}
        onValidPositionsChange={setValidPositions}
      />
    </View>
  );
}
