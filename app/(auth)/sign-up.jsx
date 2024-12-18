import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { Link } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { createUser } from "../../lib/appwrite";
import { useRouter } from "expo-router";

const SignIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    usename: "",
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);
  const formSubmit = async () => {
    setSubmit(true);
    if (
      formData.usename === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      Alert.alert("Error", "Plz fill All fields");
    }
    // console.log(formData.email, formData.password, formData.usename);
    try {
      const res = await createUser(
        formData.email,
        formData.password,
        formData.usename
      );
      console.log(res);
      router.replace("/home");
    } catch (error) {
      Alert.alert("errror", error.message);
    } finally {
      setSubmit(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
      // contentContainerStyle={{ height: "100%" }}
      // className="px-10 py-24"
      >
        <View style={styles.signUpContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={images.logoSmall}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>JOY</Text>
          </View>
          <Text className="text-2xl font-psemibold text-white pt-10">
            Sign Up
          </Text>
          <FormField
            title={"Username"}
            handleChangeText={(e) => setFormData({ ...formData, usename: e })}
          />
          <FormField
            title={"Email"}
            handleChangeText={(e) => setFormData({ ...formData, email: e })}
          />
          <FormField
            title={"Password"}
            handleChangeText={(e) => setFormData({ ...formData, password: e })}
          />
          <CustomButton
            title={"Sign Up"}
            handlePress={() => formSubmit()}
            isLoading={submit}
          />
          <Text className="font-plight text-white pt-10">
            Already have an account?{" "}
            <Link className="text-[#FFA300] " href={"/sign-in"}>
              Login
            </Link>{" "}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  signUpContainer: {
    paddingHorizontal: 30,
    paddingVertical: 24,
  },
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
