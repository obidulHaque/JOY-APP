import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import { Link } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { signIn } from "../../lib/appwrite";
import { useRouter } from "expo-router";

const SignIn = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    setLoading(true);
    if (form.email === "" || form.password === "") {
      Alert.alert("error", "plz fill all field");
    }
    try {
      await signIn(form.email, form.password);
      route.replace("/home");
    } catch (error) {
      Alert.alert("error", error.message);
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
            handleChangeText={(e) => setForm({ ...form, email: e })}
          />
          <FormField
            title={"Password"}
            handleChangeText={(e) => setForm({ ...form, password: e })}
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
