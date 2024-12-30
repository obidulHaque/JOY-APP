import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { Link } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import Axios from "../../api/axios";
import AwesomeAlert from "react-native-awesome-alerts";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [submit, setSubmit] = useState(false);
  const [alertData, setAlertData] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });
  const formSubmit = async () => {
    setSubmit(true);
    if (
      formData.username === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      setAlertData({
        show: true,
        title: "Error",
        message: "Please fill all fields.",
        success: false,
      });
      setSubmit(false);
      return;
    }

    try {
      // API call to sign-up
      const res = await Axios.post("/sign-up", formData);
      setAlertData({
        show: true,
        title: "Success",
        message: "Sign-up successful! Redirecting...",
        success: true,
      });

      // Redirect after success
      setTimeout(() => {
        setAlertData({ ...alertData, show: false });
        router.replace("/home");
      }, 2000);
    } catch (error) {
      setAlertData({
        show: true,
        title: "Error",
        message: error.response?.data?.message || "Sign-up failed. Try again.",
        success: false,
      });
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
            handleChangeText={(e) => setFormData({ ...formData, username: e })}
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
        {/* Awesome Alert */}
        <AwesomeAlert
          show={alertData.show}
          showProgress={false}
          title={alertData.title}
          message={alertData.message}
          closeOnTouchOutside={!alertData.success}
          closeOnHardwareBackPress={!alertData.success}
          showConfirmButton={true}
          confirmText={alertData.success ? "OK" : "Try Again"}
          confirmButtonColor={alertData.success ? "#28a745" : "#d9534f"}
          onConfirmPressed={() => setAlertData({ ...alertData, show: false })}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

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
