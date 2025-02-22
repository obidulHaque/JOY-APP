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

import { icons } from "../../constants";
import FormField from "../../components/FormField";
import { uploadFile } from "../../lib/uploadFile";
import { useAuthContext } from "../../context/useAuthcontext";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer, VideoView } from "expo-video";
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

  const handleFileUpload = async (mediaType) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mediaType,
        allowsEditing: true,
        quality: 1,
      });

      if (result.canceled) {
        return Alert.alert("Upload Canceled", "No file was selected.");
      }

      const fileUri = result.assets[0].uri;
      setUploading(true);

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

    if ((!title || !videoUrl || !imageUrl || !prompt, !createBy)) {
      return Alert.alert("Validation Error", "All fields are required.");
    }

    setUploading(true);
    try {
      // Replace with actual API submission logic

      const response = await Axios.post("/create-post", form);
      console.log("Form Data Submitted:", form, response);

      Alert.alert("Success", "Your video has been uploaded!");
      setForm({ title: "", videoUrl: "", imageUrl: "", prompt: "" });
    } catch (error) {
      console.error("Error submitting data:", error);
      Alert.alert("Submission Failed", "An error occurred. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <View className="flex flex-row justify-between">
            <Text className="text-base text-gray-100 font-pmedium">
              Upload Video
            </Text>
            <Text className="text-sm  text-red-400 font-pmedium">
              Max 50 MB
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              handleFileUpload(ImagePicker.MediaTypeOptions.Videos)
            }
          >
            {form.videoUrl.length > 0 ? (
              <View style={styles.contentContainer}>
                <VideoView
                  style={styles.video}
                  player={player}
                  allowsFullscreen
                  allowsPictureInPicture
                />
              </View>
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-18 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                  {uploading ? (
                    <Text className=" text-white">please Wait ...</Text>
                  ) : (
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="w-18 h-14"
                    />
                  )}
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <View className="flex flex-row justify-between">
            <Text className="text-base text-gray-100 font-pmedium">
              Thumbnail Image
            </Text>
            <Text className="text-sm text-red-600 font-pmedium">Max 50 MB</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              handleFileUpload(ImagePicker.MediaTypeOptions.Images)
            }
          >
            {form.imageUrl.length > 0 ? (
              <Image
                source={{ uri: form.imageUrl }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                {uploading ? (
                  <Text className="text-sm text-gray-100 font-pmedium">
                    please wait...
                  </Text>
                ) : (
                  <View className="flex-row gap-3">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="w-5 h-5"
                    />
                    <Text className="text-sm text-gray-100 font-pmedium">
                      Choose a file
                    </Text>
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={handleSubmit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 200,
  },
});
