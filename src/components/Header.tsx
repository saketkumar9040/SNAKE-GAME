import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Colors } from "../globals/colors";

interface HeaderProps {
  reloadGame: () => void;
  pauseGame: () => void;
  children: JSX.Element;
  isPaused: boolean;
}

const Header = ({
  children,
  reloadGame,
  pauseGame,
  isPaused,
}: HeaderProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="reload-circle" size={35} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome
          name={isPaused ? "play-circle" : "pause-circle"}
          size={35}
          color={Colors.primary}
        />
      </TouchableOpacity>
      {children}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex:0.05,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    borderColor:Colors.primary,
    borderWidth:12,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    borderBottomWidth:0,
    padding:15,
    backgroundColor:Colors.background
  },
});

