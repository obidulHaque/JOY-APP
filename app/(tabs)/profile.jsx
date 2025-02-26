import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { useAuthContext } from "../../context/useAuthcontext";
import Axios from "../../api/axios";
import VideoScreen from "../../components/VideoScreen";
import EmptyState from "../../components/EmptyState";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { deleteFile } from "../../lib/deleteingFile";

export default function Profile() {
  const [posts, setPosts] = useState(null);
  const { user, logout } = useAuthContext();
  const [refreshing, setRefreshing] = useState(false);
  const route = useRouter();

  const getAllPost = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await Axios.get(`/get-user-post?userId=${user.id}`);
      setPosts(response.data.getPost);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);
  const deletePost = useCallback(async (postId) => {
    try {
      setRefreshing(true);
      const userId = user.id;
      const res = await Axios.delete(`/create-post?postId=${postId}`, {
        data: { userId },
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data.post);
      await deleteFile(res.data.post.videoUrl);
      await deleteFile(res.data.post.imageUrl);
      getAllPost();
    } catch (error) {
      console.error("Book mark Delete Error", error);
    } finally {
      setRefreshing(false);
    }
  });
  useFocusEffect(
    useCallback(() => {
      getAllPost();
    }, [getAllPost])
  );
  const logOut = () => {
    logout();
    route.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts || []}
        keyExtractor={(item, index) => String(item.id || index)}
        renderItem={({ item }) => (
          <View className="items-center my-4">
            <VideoScreen post={item} icon={icons.deleteIcon} fn={deletePost} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="px-10 my-10 space-y-6">
            {/* Logout Button */}
            <TouchableOpacity onPress={logOut}>
              <View className="w-full flex flex-row justify-end px-4">
                <Image source={icons.logout} style={styles.logout} />
              </View>
            </TouchableOpacity>

            {/* Profile Section */}
            <View className="flex items-center justify-center space-y-2">
              <Image source={{ uri: user?.avatar }} style={styles.avatar} />
              <Text className="text-white text-lg font-semibold">
                {user?.username}
              </Text>
            </View>

            {/* Stats Section */}
            <View className="flex flex-row justify-center items-center gap-10">
              <View className="items-center min-w-20">
                <Text className="text-white text-lg font-semibold">10</Text>
                <Text className="text-gray-400 text-sm">Posts</Text>
              </View>
              <View className="items-center min-w-20">
                <Text className="text-white text-lg font-semibold">12.3K</Text>
                <Text className="text-gray-400 text-sm">Views</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getAllPost} />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 20,
  },
  logout: {
    width: 25,
    height: 25,
  },
});
