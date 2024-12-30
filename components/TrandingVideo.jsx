import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function TrandingVideo() {
  return (
    <FlatList
      data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <Text style={styles.text}>{item.id} </Text>}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
  },
});
