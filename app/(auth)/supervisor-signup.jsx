import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { registerSupervisor } from "../../lib/appwrite";
const SupervisiorReg = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
    phoneNumber: "",
    password: "",
  });

  const submit = async () => {
      
    router.push("/(supervisortabs)/home")
      // try {
      //   setIsSubmitting(true);
      //   setError("");

      //   if (
      //     form.fullName === "" ||
      //     form.email === "" ||
      //     form.password === "" ||
      //     form.department === "" ||
      //     form.phoneNumber === ""
      //   ) {
      //     throw new Error(`Please fill in all required fields:`);
      //   }

      //   await registerSupervisor(form);

      //   alert("Registration Successful");

      //   router.replace("/log-in");
      // } catch (e) {
      //   setError(e.message);
      //   Alert.alert("Error", e.message);
      //   throw new Error(e);
      // } finally {
      //   setIsSubmitting(false);
      // }
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
            <Text className="text-2xl font-psemibold text-black-200 mt-6">
              Supervisor Registration
            </Text>

            <FormField
              title="Full Name"
              value={form.fullName}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  name: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter Full Name"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  mail: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter email"
              keyboardType="email-address"
            />
            <FormField
              title="Department"
              value={form.department}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  department: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter your department"
            />
            <FormField
              title="Phone Number"
              value={form.phoneNumber}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  phoneNumber: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter your phone number"
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
              title="Sign Up"
              containerStyles="mt-8"
              isLoading={isSubmitting}
              handlePress={submit}
            />

            <View className="justify-center pt-5 ">
              <Text className="text-center text-lg font-pregular ">
                Already have an account?
                <Link
                  href="/log-in"
                  className="text-lg font-psemibold text-secondary"
                >
                  {" "}
                  Sign In
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SupervisiorReg;
