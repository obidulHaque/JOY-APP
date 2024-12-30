import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Axios from "../../api/axios";

export default function App() {
  const [videoUri, setVideoUri] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  // Function to pick a video
  const pickVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setVideoUri(result.assets[0].uri);
      setUploadStatus("Video selected!");
    }
  };

  // Function to upload video
  const uploadVideo = async () => {
    if (!videoUri) {
      setUploadStatus("Please select a video first.");
      return;
    }

    const formData = new FormData();
    formData.append("video", {
      uri: videoUri,
      type: "video/mp4", // Change if using a different format
      name: "video.mp4",
    });
    formData.append("title", "My Video");
    formData.append("prompt", "Sample Prompt");

    try {
      const response = await Axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus("Upload successful: " + response.data.url);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("Upload failed: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick a Video" onPress={pickVideo} />
      <Button title="Upload Video" onPress={uploadVideo} />
      <Text style={styles.status}>{uploadStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  status: {
    marginTop: 20,
    textAlign: "center",
    color: "#333",
  },
});
