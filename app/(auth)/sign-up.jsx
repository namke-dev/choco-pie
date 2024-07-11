import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createChocoAccount } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const { setUser, setIsLoggedIn } = useGlobalContext();
  const submitSignUp = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill all the fields");
    }
    setIsSubmitting(true);
    // setIsLoggedIn(true);

    try {
      const result = await createChocoAccount(
        form.email,
        form.password,
        form.username
      );

      console.log("==> Account create successful! \n");
      Alert.alert("Successful", "Account create successful!");

      // setUser(result);
      router.replace("/sign-in");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white font-psemibold mt-10">
            Create Choco-Pie account
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submitSignUp}
            containerStyle="mt-10"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Back to</Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary-100 underline"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
