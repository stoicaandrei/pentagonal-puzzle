import { Polygon } from "react-native-svg";
import { RenderPoint, GridPosition } from "@/common";
import Animated, {
  useAnimatedProps,
  withTiming,
  useSharedValue,
  withDelay,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { useEffect, memo } from "react";
import { hexagonPoints } from "@/utils";

// Create an animated polygon component
const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

interface HexagonProps {
  position: GridPosition;
  center: RenderPoint;
  width: number;
  color: string;
}

export const Hexagon = memo(
  function Hexagon({ position, center, width, color }: HexagonProps) {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
      // Add a small delay based on position to create a cascade effect
      const delay = (position.row + position.col) * 10;
      opacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    }, []);

    useEffect(() => {
      if (color) {
        scale.value = withSequence(
          withSpring(1.05, { damping: 8, stiffness: 150 }),
          withDelay(100, withSpring(1, { damping: 12, stiffness: 150 }))
        );
      }
    }, [color]);

    const animatedProps = useAnimatedProps(() => ({
      points: hexagonPoints(center, width)
        .map(([x, y]) => `${x},${y}`)
        .join(" "),
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    }));

    return (
      <AnimatedPolygon
        key={`hex-${position.row}-${position.col}`}
        animatedProps={animatedProps}
        fill={color}
        stroke="#d1d5db"
        strokeWidth="1"
        origin={`${center.x}, ${center.y}`}
      />
    );
  },
  (prev, next) => {
    return (
      prev.position.row === next.position.row &&
      prev.position.col === next.position.col &&
      prev.center.x === next.center.x &&
      prev.center.y === next.center.y &&
      prev.width === next.width &&
      prev.color === next.color
    );
  }
);
