import { Polygon } from "react-native-svg";
import { RenderPoint, GridPosition } from "./types";
import Animated, {
  useAnimatedProps,
  withTiming,
  useSharedValue,
  withDelay,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useGameStore } from "stores/gameStore";

// Create an animated polygon component
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

interface HexagonProps {
  position: GridPosition;
  center: RenderPoint;
  width: number;
}

export function Hexagon({ position, center, width }: HexagonProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const isPlayingCell = useGameStore((state) => state.isPlayingCell(position));

  useEffect(() => {
    // Add a small delay based on position to create a cascade effect
    const delay = (position.row + position.col) * 10;
    opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
  }, []);

  useEffect(() => {
    if (isPlayingCell) {
      scale.value = withSequence(
        withSpring(1.05, { damping: 8, stiffness: 150 }),
        withDelay(100, withSpring(1, { damping: 12, stiffness: 150 }))
      );
    }
  }, [isPlayingCell]);

  const getHexagonPoints = () => {
    const radius = width / Math.sqrt(3);
    const angle = Math.PI / 3; // 60 degrees
    const points: [number, number][] = [];

    for (let i = 0; i < 6; i++) {
      // Start from -90 degrees (π/2) to rotate the hexagon
      const x = center.x + radius * Math.cos(angle * i - Math.PI / 2);
      const y = center.y + radius * Math.sin(angle * i - Math.PI / 2);
      points.push([x, y]);
    }

    return points.map(([x, y]) => `${x},${y}`).join(" ");
  };

  const animatedProps = useAnimatedProps(() => ({
    points: getHexagonPoints(),
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPolygon
      key={`hex-${position.row}-${position.col}`}
      animatedProps={animatedProps}
      fill={isPlayingCell ? "#f3f4f6" : "#e5e7eb"}
      stroke="#d1d5db"
      strokeWidth="1"
      origin={`${center.x}, ${center.y}`}
    />
  );
}
