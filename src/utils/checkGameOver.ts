import { Coordinate } from "../types/types";

export const checkGameOver = (
  snakeHead: Coordinate,
  boundries: any
): boolean => {
  return (
    snakeHead.x < boundries.xMin ||
    snakeHead.x > boundries.xMax ||
    snakeHead.y < boundries.yMin ||
    snakeHead.y > boundries.yMax
  );
};
