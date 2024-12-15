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

export default function FormField({ title, handleChangeText }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!showPassword && title === "Password"}
          onChangeText={handleChangeText}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              style={styles.icon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
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
    width: 30,
    height: 30,
  },
});
