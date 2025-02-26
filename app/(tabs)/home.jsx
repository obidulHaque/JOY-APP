import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images, icons } from "../../constants";
import { useAuthContext } from "../../context/useAuthcontext";
import Axios from "../../api/axios";
import VideoScreen from "../../components/VideoScreen";
import EmptyState from "../../components/EmptyState";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]); // Stores all posts
  const [searchResults, setSearchResults] = useState(null); // Stores search results
  const [searchQuery, setSearchQuery] = useState(""); // Stores user input
  const { user } = useAuthContext();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(new Set());

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    const visibleIds = new Set(viewableItems.map((item) => item.item.id));
    setVisiblePosts(visibleIds);
  });

  // ✅ Fetch Posts (Handles Normal & Search)
  const getAllPost = useCallback(async (currentPage = 1, query = "") => {
    try {
      setLoading(true);
      const response = await Axios.get(
        `/get-all-post?page=${currentPage}&limit=10&search=${query}`
      );

      if (query.trim() !== "") {
        setSearchResults(response.data.posts.length ? response.data.posts : []);
      } else {
        setPosts((prev) =>
          currentPage === 1
            ? response.data.posts
            : [...prev, ...response.data.posts]
        );
        setSearchResults(null); // Reset search results
      }

      setTotalPage(response.data.totalPage);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // ✅ Fetch posts when `page` or `searchQuery` changes
  useEffect(() => {
    getAllPost(page, searchQuery);
  }, [page, searchQuery, getAllPost]);

  // ✅ Handle Load More
  const loadMore = () => {
    if (!loading && page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  // ✅ Handle Pull-to-Refresh
  const onRefresh = () => {
    setPage(1);
    setRefreshing(true);
    setSearchQuery("");
    getAllPost(1, searchQuery);
  };
  // Add Book Mark
  const addBookMark = useCallback(async (postId) => {
    try {
      const userId = user.id;
      await Axios.post(`/book-mark?postId=${postId}`, { userId });
    } catch (error) {
      console.error("Book mark Add Error", error);
    }
  });

  // ✅ Handle Search Input
  const handleSearch = () => {
    setSearchResults(null); // Reset before fetching
    setPage(1);
    getAllPost(1, searchQuery);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      {/* 🔹 Search Bar */}
      <View className="px-4 py-2 flex-row items-center bg-gray-800 rounded-md m-4">
        <TextInput
          className="flex-1 text-white px-4 py-2"
          placeholder="Search by title..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} // Runs search when Enter is pressed
        />
        <TouchableOpacity onPress={handleSearch} className="px-4">
          <Text className="text-white">Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchResults !== null ? searchResults : posts || []} // 🔹 Ensure valid array
        keyExtractor={(item, index) => String(item.id || index)}
        renderItem={({ item }) => (
          <View className="items-center">
            <VideoScreen
              post={item}
              icon={icons.bookmark}
              fn={addBookMark}
              isVisible={visiblePosts.has(item.id)}
            />
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="px-10 my-10 space-y-6">
            <View className="flex flex-row items-center justify-between">
              <View>
                <Text className="text-[#CDCDE0] text-xl">Welcome Back</Text>
                <Text className="text-white text-2xl font-semibold">
                  {user?.username}
                </Text>
              </View>
              <Image
                source={images.logoSmall}
                resizeMode="contain"
                className="w-8 h-8"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Try searching for something else"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size={"large"} /> : null
        }
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
    </SafeAreaView>
  );
}
