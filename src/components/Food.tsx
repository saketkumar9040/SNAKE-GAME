import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Coordinate } from "../types/types";

const Food = ({ x, y }: Coordinate): JSX.Element => {
  return (
    <View>
      <Text style={[{ top: y * 10, left: x * 10 }, styles.food]}>🍎</Text>
    </View>
  );
};

export default Food;

const styles = StyleSheet.create({
  food: {
    width: 20,
    height: 20,
    borderRadius: 12,
    position: "absolute",
  },
});
