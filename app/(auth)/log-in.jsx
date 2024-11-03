import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    matric: "",
    password: "",
  });

  const submit = () => {
    router.push(
      '/home'
    )
  };
  return (
    <SafeAreaView className="bg-primary h-full">
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
            title="Matric Number"
            value={form.matric}
            handleChangeText={(e) =>
              setForm({
                ...form,
                matric: e,
              })
            }
            otherStyles="mt-8"
            placeholder="Enter Matric No"
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
                href="/sign-up"
                className="text-lg font-psemibold text-secondary"
              >
                {" "}
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
