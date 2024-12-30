import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

export default function SearchInput({ title, handleChangeText }) {
  return (
    <View>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleChangeText}
          placeholder="Search for a video topic"
          placeholderTextColor={"#CDCDE0"}
        />
        <TouchableOpacity>
          <Image
            source={icons.search}
            style={styles.icon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  InputContainer: {
    width: "100%",
    height: 50,
    backgroundColor: "#1E1E2D",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5,
  },
  input: {
    color: "white",
    width: "80%",
    height: "100%",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
