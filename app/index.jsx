import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex px-4 items-center h-full">
          <View style={styles.logoContainer}>
            <Image
              source={images.logoSmall}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>JOY</Text>
          </View>
          <Image
            source={images.cards}
            style={styles.cards}
            resizeMode="contain"
          />
          <View>
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless {"\n"} Possibilites with
              <Text className="text-secondary-200 px-2">JOY</Text>
            </Text>
          </View>
          <Text className="text-gray-500 font-pregular text-center mt-10">
            Where Creativity Meets innovation: Embark on a Journey of Limitless
            Exploration with JOY
          </Text>
          <Link href={"/sign-in"}>
            <View className="bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center mt-10 px-10">
              <Text className="font-psemibold text-lg">
                Continue with Email
              </Text>
            </View>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
  logo: {
    width: 50,
    height: 50,
  },
  logoText: {
    marginLeft: 10,
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
  cards: {
    maxWidth: 380,
    width: "100%",
    height: 298,
    marginTop: 20,
  },
  button: {
    width: "100%",
    height: 30,
  },
});

export default App;
