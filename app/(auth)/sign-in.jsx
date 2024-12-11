import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100&" }} className="px-10">
        <View style={styles.logoContainer}>
          <Image
            source={images.logoSmall}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>JOY</Text>
        </View>
        <Text className="text-2xl font-psemibold text-white pt-10">
          Sign In
        </Text>
        <FormField title={"Username"} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    // marginLeft: 30,
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
});