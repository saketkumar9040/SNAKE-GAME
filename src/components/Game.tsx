import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Platform,
  Text,
} from "react-native";
import React, { JSX, useEffect, useState } from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Colors } from "../globals/colors";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { checkEatsFood } from "../utils/checkEatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";

const SNAKE_INITIAL_POSITION = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION = { x: 5, y: 20 };
const GAME_BOUNDS = { xMin: 0, xMax: 35, yMin: 0, yMax: 71 };
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;

// const {width,height }= Dimensions.get("screen");
// console.log(width,height)

const Game = (): JSX.Element => {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGamePaused, setIsGamePaused] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (!isGameOver) {
      const intervalID = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalID);
    }
  }, [snake, isGameOver, isPaused]);

  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right);
      } else {
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down);
      } else {
        setDirection(Direction.Up);
      }
    }
  };

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead }; // creating a copy of snake head

    // GAME OVER =================================================================================>

    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver((prev) => !prev);
      Alert.alert("GAME OVER 😭");
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const pauseGame = () => {
    setIsPaused(!isPaused);
  };

  const reloadGame = () => {
    setScore(0);
    setSnake(SNAKE_INITIAL_POSITION);
    setIsGameOver(false);
    setFood(FOOD_INITIAL_POSITION);
    setDirection(Direction.Right);
    setIsPaused(false);
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          isPaused={isPaused}
          pauseGame={pauseGame}
          reloadGame={reloadGame}
        >
          <Text style={{ fontSize: 20, color: Colors.primary }}>{score}</Text>
        </Header>
        <View style={styles.boundries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  boundries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 12,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.background,
  },
});
