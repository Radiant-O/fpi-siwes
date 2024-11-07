import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { signIn, getCurrentUser} from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    mail: "",
    password: "",
  });

  const submit = async() => {
    try {
      setIsSubmitting(true);

      await signIn(form.mail, form.password)
      const res = await getCurrentUser();
      // console.log(res)
      setUser(res);
      setIsLoggedIn(true);
       if (res.profile.userType === "student") {
         router.replace("/(studenttabs)/home");
       } else if (res.profile.userType === "supervisor") {
         router.replace("/(app)/(supervisortab)/home");
       }

    } catch (e) {
      // alert('Invalid email or Password');
      throw new Error("Login Error:", e.message);

    } finally {
      setIsSubmitting(false)
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView>
          <View className="w-full h-full px-5 py-6 font-pregular">
            <View className="flex flex-row gap-2 justify-end">
              <Image
                source={images.schLogo}
                className="w-[60px] h-[60px] "
                resizeMode="contain"
              />
              <Image
                source={images.itfLogo}
                className="w-[60px] h-[60px]"
                resizeMode="contain"
              />
            </View>
            <Text className="text-2xl font-psemibold text-black-200 mt-10">
              Welcome back 👋
            </Text>
            <Text className="text-xl font-psemibold text-black-200 mt-2">
              Enter details to login
            </Text>
            <FormField
              title="Email"
              value={form.mail}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  mail: e,
                })
              }
              otherStyles="mt-8"
              placeholder="Enter your email"
              keyboardType="email-address"
            />

            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  password: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter Password"
            />

            <CustomButton
              title="Sign In"
              containerStyles="mt-8"
              isLoading={isSubmitting}
              handlePress={submit}
            />

            <View className="justify-center pt-5 ">
              <Text className="text-center text-lg font-pregular ">
                Don't have an account?
                <Link
                  href="/register-type"
                  className="text-lg font-psemibold text-secondary"
                >
                  {" "}
                  Sign Up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
