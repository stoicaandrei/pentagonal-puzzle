import { Cell } from "common";

export const _printGrid = (grid: Cell[][]) => {
  console.log(
    grid.map((row) => row.map((cell) => cell.color).join(" ")).join("\n")
  );
};
