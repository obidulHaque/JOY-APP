import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import SearchInput from "../../components/SearchInput";
import { useAuthContext } from "../../context/useAuthcontext";
import Axios from "../../api/axios";
import VideoCard from "../../components/VideoCard";
import EmptyState from "../../components/EmptyState";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuthContext();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllPost = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      const response = await Axios.get(`/get-all-post?page=${page}&limit=10`);

      setPosts((prev) =>
        page === 1 ? response.data.posts : [...prev, ...response.data.posts]
      );

      setTotalPage(response.data.totalPage);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const bookMark = async (postId) => {
    try {
      setRefreshing(true);
      const userId = user.id;
      await Axios.post(`/book-mark?postId=${postId}`, { userId });
    } catch (error) {
      console.error("Book Mark problem", error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getAllPost();
  }, [page]);

  const loadMore = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts || []}
        keyExtractor={(item, index) => String(item.id || index)}
        renderItem={({ item }) => (
          <View className="items-center">
            <VideoCard post={item} icon={icons.bookmark} fn={bookMark} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="px-10 my-10 space-y-6">
            <View className="flex flex-row items-center justify-between">
              <View>
                <Text className="text-[#CDCDE0] text-xl">Welcome Back </Text>
                <Text className="text-white text-2xl font-semibold">
                  {user.username}
                </Text>
              </View>
              <Image
                source={images.logoSmall}
                resizeMode="contain"
                className="w-8 h-8"
              />
            </View>
            <SearchInput />
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
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size={"large"} /> : null
        }
      />
    </SafeAreaView>
  );
}
