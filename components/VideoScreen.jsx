import React, { useState, useEffect, useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { images, icons } from "../constants";
import { useVideoPlayer, VideoView } from "expo-video";

const VideoScreen = ({ post, icon, fn, isVisible }) => {
  const [play, setPlay] = useState(false);

  const player = useVideoPlayer(post.videoUrl, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.play();
  });

  const handlePlay = useCallback(() => {
    setPlay(true);
    player.play();
    player.loop = true;
  }, [player]);

  useEffect(() => {
    if (!isVisible) {
      setPlay(false);
      player.pause();
    }
  }, [isVisible]);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={post?.avatar ? { uri: post.avatar } : images.profile}
          style={styles.avatar}
        />

        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {post.title}
          </Text>
          <Text style={styles.userName}>{post.createBy}</Text>
        </View>

        <TouchableOpacity onPress={() => fn?.(post.id)}>
          <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {play ? (
        <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            allowsVideoFrameAnalysis
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={handlePlay}
          style={styles.thumbnailContainer}
        >
          <Image source={{ uri: post.imageUrl }} style={styles.thumbnail} />
          <Image source={icons.play} style={styles.play} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoScreen;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    backgroundColor: "#2C3930",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  userName: {
    fontSize: 12,
    color: "#777",
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#fff",
  },
  videoContainer: {
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 200,
  },
  thumbnailContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  play: {
    width: 40,
    height: 40,
    tintColor: "#fff",
    position: "absolute",
  },
});
