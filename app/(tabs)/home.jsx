import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import TrandingVideo from "../../components/TrandingVideo";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        keyExtractor={(iteam) => iteam.$id}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 15, color: "white" }}>{item.id} </Text>
        )}
        ListHeaderComponent={() => (
          <View className="px-10 my-16">
            <View className="flex items-center flex-row justify-between">
              <View>
                <Text style={{ color: "#CDCDE0", fontSize: 14 }}>
                  Welcome Back
                </Text>
                <Text
                  style={{ color: "white", fontSize: 24 }}
                  className="font-psemibold"
                >
                  JOY Js Master
                </Text>
              </View>
              <Image
                source={images.logoSmall}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
            <SearchInput />
            <View className="mt-10 space-y-6">
              <Text className="text-[#CDCDE0] ">Treanding Videos</Text>
              <TrandingVideo />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
