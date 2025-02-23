import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import { useAuthContext } from "../../context/useAuthcontext";
import Axios from "../../api/axios";
import EmptyState from "../../components/EmptyState";
import { useFocusEffect } from "@react-navigation/native";
import VideoCard from "../../components/VideoCard";

export default function BookMark() {
  const [posts, setPosts] = useState(null);
  const { user } = useAuthContext();
  const [refreshing, setRefreshing] = useState(false);

  const getAllPost = useCallback(async () => {
    try {
      setRefreshing(true);
      const response = await Axios.get(`/book-mark?userId=${user.id}`);
      setPosts(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);
  const removeBookMark = useCallback(async (postId) => {
    try {
      setRefreshing(true);
      const userId = user.id;
      console.log("user", userId);
      await Axios.delete(`/book-mark?postId=${postId}`, {
        data: { userId },
        headers: { "Content-Type": "application/json" },
      });
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

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts || []}
        keyExtractor={(item, index) => String(item.id || index)}
        renderItem={({ item }) => (
          <View className="items-center my-4">
            <VideoCard post={item} icon={icons.remove} fn={removeBookMark} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex flex-row justify-center items-center px-4 py-10 ">
            <Text className=" text-[#27667B] text-3xl  font-pextrabold">
              Your Book Mark Videos
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No Video Found"}
            subtitle={"you don't bookmark any video"}
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
