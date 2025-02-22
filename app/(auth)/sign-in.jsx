import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { Link } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import AwesomeAlert from "react-native-awesome-alerts";
import Axios from "../../api/axios";
import { useAuthContext } from "../../context/useAuthcontext";

const SignIn = () => {
  const { setUser } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setForm] = useState({
    email: "",
    password: "",
  });
  const [alertData, setAlertData] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });
  const handleSubmit = async () => {
    setLoading(true);
    if (formData.email === "" || formData.password === "") {
      setAlertData({
        show: true,
        title: "Error",
        message: "Please fill all fields.",
        success: false,
      });
      setLoading(false);
      return;
    }

    try {
      // API call to sign-up
      const response = await Axios.post("/sign-in", formData);
      setUser(response.data.user);
      setAlertData({
        show: true,
        title: "Success",
        message: "Sign-In successful! Redirecting...",
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
      setLoading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View style={styles.signInContainer}>
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
          <FormField
            title={"Email"}
            handleChangeText={(e) => setForm({ ...formData, email: e })}
          />
          <FormField
            title={"Password"}
            handleChangeText={(e) => setForm({ ...formData, password: e })}
          />
          <CustomButton
            title={"Log In"}
            handlePress={handleSubmit}
            isLoading={loading}
          />
          <Text className="font-plight text-white pt-10">
            Don't have an account?{" "}
            <Link className="text-[#FFA300] " href={"/sign-up"}>
              Signup
            </Link>{" "}
          </Text>
        </View>
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

export default SignIn;

const styles = StyleSheet.create({
  signInContainer: {
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
