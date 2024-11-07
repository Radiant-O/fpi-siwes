import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { registerStudent } from "../../lib/appwrite.js";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    matric: "",
    mail: "",
    companyName: "",
    companyAdd: "",
    department: "",
    level: "",
    password: "",
  });

  const submit = async () => {
    try {
      setIsSubmitting(true);
      setError("");

      if (
        form.fullName === "" ||
        form.mail === "" ||
        form.password === "" ||
        form.matric === "" ||
        form.companyAdd === "" ||
        form.companyName === "" ||
        form.department === "" ||
        form.level === ""
      ) {
        throw new Error(
          `Please fill in all required fields:`
        )
        }

      // const requiredFields = [
      //   "fullName",
      //   "mail",
      //   "password",
      //   "matric",
      //   "department",
      //   "level",
      //   "companyName",
      //   "companyAdd",
      // ];

      // const missingFields = requiredFields.filter((field) => !FormData[field]);
      // if (missingFields.length > 0) {
      //   throw new Error(
      //     `Please fill in all required fields: ${missingFields.join(", ")}`
      //   );
      // }

      await registerStudent(form);

      alert("Registration Successful");

      router.replace("/log-in");
    } catch (e) {
      setError(e.message);
      Alert.alert("Error", e.message);
      throw new Error(e);
    } finally {
      setIsSubmitting(false);
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
              Student Registratioin
            </Text>

            <FormField
              title="Full Name"
              value={form.fullName}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  fullName: e,
                })
              }
              otherStyles="mt-4"
              placeholder="Enter Full Name"
            />
            <FormField
              title="Matric Number"
              value={form.matric}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  matric: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter Matric No"
            />
            <FormField
              title="Email"
              value={form.mail}
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
              title="Company Name"
              value={form.companyName}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  companyName: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter Company Name"
            />
            <FormField
              title="Company Address"
              value={form.companyAdd}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  companyAdd: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter Company Address"
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
              title="Level"
              value={form.level}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  level: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter your level"
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

export default SignUp;
