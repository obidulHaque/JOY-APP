import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

export default function FormField({ title }) {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.InputContainer}>
        <TextInput />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#CDCDE0",
    fontSize: 15,
    marginTop: 10,
  },
  InputContainer: {
    width: "100%",
    height: 40,
    backgroundColor: "#1E1E2D",
    borderRadius: 10,
  },
});
