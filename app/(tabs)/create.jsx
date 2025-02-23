import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer, VideoView } from "expo-video";

import { icons } from "../../constants";
import FormField from "../../components/FormField";
import { uploadFile } from "../../lib/uploadFile";
import { useAuthContext } from "../../context/useAuthcontext";
import CustomButton from "../../components/CustomButton";
import Axios from "../../api/axios";

const Create = () => {
  const { user } = useAuthContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    id: user.id,
    title: "",
    videoUrl: "",
    imageUrl: "",
    prompt: "",
    createBy: user.username,
  });

  const player = useVideoPlayer(form.videoUrl, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.play();
  });

  const handleMediaUpload = async (mediaType) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mediaType,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        return Alert.alert("Upload Canceled", "No file was selected.");
      }

      setUploading(true);
      const fileUri = result.assets[0].uri;
      const uploadedUrl = await uploadFile(fileUri);

      setForm((prevForm) => ({
        ...prevForm,
        [mediaType === ImagePicker.MediaTypeOptions.Images
          ? "imageUrl"
          : "videoUrl"]: uploadedUrl,
      }));

      Alert.alert("Upload Successful", "File uploaded successfully!");
    } catch (error) {
      Alert.alert("Upload Failed", error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    const { title, videoUrl, imageUrl, prompt, createBy } = form;

    if (!title || !videoUrl || !imageUrl || !prompt || !createBy) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    setUploading(true);

    try {
      const response = await Axios.post("/create-post", form);
      console.log("✅ Form Submitted:", response.data);

      Alert.alert("Success", "Your video has been uploaded!");

      setForm((prevForm) => ({
        ...prevForm,
        title: "",
        videoUrl: "",
        imageUrl: "",
        prompt: "",
      }));
    } catch (error) {
      console.error(
        "❌ Submission Error:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Submission Failed",
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.headerText}>Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(text) =>
            setForm((prev) => ({ ...prev, title: text }))
          }
          otherStyles={styles.marginTop}
        />

        {/* Video Upload Section */}
        <UploadSection
          title="Upload Video"
          maxSize="Max 50 MB"
          mediaUrl={form.videoUrl}
          handleUpload={() =>
            handleMediaUpload(ImagePicker.MediaTypeOptions.Videos)
          }
          uploading={uploading}
          player={player}
          isVideo
        />

        {/* Thumbnail Upload Section */}
        <UploadSection
          title="Thumbnail Image"
          maxSize="Max 50 MB"
          mediaUrl={form.imageUrl}
          handleUpload={() =>
            handleMediaUpload(ImagePicker.MediaTypeOptions.Images)
          }
          uploading={uploading}
        />

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(text) =>
            setForm((prev) => ({ ...prev, prompt: text }))
          }
          otherStyles={styles.marginTop}
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={handleSubmit}
          containerStyles={styles.marginTop}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// 🔹 Reusable Upload Section Component
const UploadSection = ({
  title,
  maxSize,
  mediaUrl,
  handleUpload,
  uploading,
  player,
  isVideo = false,
}) => (
  <View style={styles.uploadSection}>
    <View style={styles.uploadHeader}>
      <Text style={styles.uploadTitle}>{title}</Text>
      <Text style={styles.uploadSize}>{maxSize}</Text>
    </View>

    <TouchableOpacity onPress={handleUpload} style={styles.uploadButton}>
      {mediaUrl.length > 0 ? (
        isVideo ? (
          <View style={styles.videoContainer}>
            <VideoView
              style={styles.video}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
          </View>
        ) : (
          <Image source={{ uri: mediaUrl }} style={styles.thumbnail} />
        )
      ) : (
        <View style={styles.placeholder}>
          {uploading ? (
            <Text style={styles.uploadText}>Please wait...</Text>
          ) : (
            <>
              <Image source={icons.upload} style={styles.uploadIcon} />
              <Text style={styles.uploadText}>Choose a file</Text>
            </>
          )}
        </View>
      )}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFF",
  },
  marginTop: {
    marginTop: 20,
  },
  uploadSection: {
    marginTop: 20,
  },
  uploadHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  uploadTitle: {
    fontSize: 16,
    color: "#FFF",
  },
  uploadSize: {
    fontSize: 14,
    color: "#F87171",
  },
  uploadButton: {
    marginTop: 10,
  },
  videoContainer: {
    alignItems: "center",
  },
  video: {
    width: 350,
    height: 200,
  },
  thumbnail: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  placeholder: {
    height: 60,
    borderRadius: 10,
    borderColor: "#444",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  uploadIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  uploadText: {
    color: "#FFF",
  },
});

export default Create;
