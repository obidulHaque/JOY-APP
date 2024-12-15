import { Text, TouchableOpacity, StyleSheet } from "react-native";

const CustomButton = ({ title, handlePress, isLoading }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
      <Text style={styles.buttonText}>
        {isLoading ? "Please Wait..." : title}{" "}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    minHeight: 45,
    paddingHorizontal: 25,
    borderRadius: 30,
    backgroundColor: "#FFA300",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});
