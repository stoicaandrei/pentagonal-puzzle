import { View, Text, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { PiecesEditor } from "./PiecesEditor";
import { Doc } from "@/convex/_generated/dataModel";

const PIECE_COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Turquoise
  "#45B7D1", // Light Blue
  "#96CEB4", // Mint
  "#FFEEAD", // Light Yellow
  "#D4A5A5", // Dusty Rose
  "#9B59B6", // Purple
  "#3498DB", // Blue
  "#FFB347", // Orange
  "#58D68D", // Green
];

interface PiecePreviewProps {
  color: string;
  isSelected: boolean;
  onSelect: () => void;
}

function PiecePreview({ color, isSelected, onSelect }: PiecePreviewProps) {
  return (
    <Pressable
      onPress={onSelect}
      style={{
        padding: 8,
        backgroundColor: isSelected ? "blue" : "white",
        borderRadius: 8,
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: color,
          borderRadius: 4,
        }}
      />
    </Pressable>
  );
}

interface PiecesEditorPageProps {
  playingField: Doc<"playingFields">;
}

export function PiecesEditorPage({ playingField }: PiecesEditorPageProps) {
  const rows = playingField.rows;
  const cols = playingField.cols;
  const [selectedPieceColor, setSelectedPieceColor] = useState<string>();

  const handlePieceSelect = (color: string) => {
    if (selectedPieceColor === color) {
      setSelectedPieceColor(undefined);
    } else {
      setSelectedPieceColor(color);
    }
  };

  return (
    <View style={{ padding: 16, height: "100%", width: "100%" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
        Select a Piece
      </Text>
      <View style={{ height: 56 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {PIECE_COLORS.map((color) => (
            <PiecePreview
              key={color}
              color={color}
              isSelected={selectedPieceColor === color}
              onSelect={() => handlePieceSelect(color)}
            />
          ))}
        </ScrollView>
      </View>

      <View style={{ marginTop: 24, height: "100%", width: "100%" }}>
        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 12 }}>
          Edit Piece
        </Text>
        <View
          style={{
            backgroundColor: "#f3f4f6",
            borderRadius: 12,
            padding: 16,
            width: "100%",
            height: "100%",
          }}
        >
          <PiecesEditor
            rows={rows}
            cols={cols}
            pieceColor={selectedPieceColor}
          />
        </View>
      </View>
    </View>
  );
}
