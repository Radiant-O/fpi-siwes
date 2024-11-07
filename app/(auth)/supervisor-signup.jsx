import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { Link, router } from "expo-router";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";

const SupervisiorReg = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
      mail: "",
      department: "",
    phoneNumber: "",
    password: "",
  });

    const submit = () => {
       router.push(
      '/(supervisortabs)/home'
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
          <Text className="text-2xl font-psemibold text-black-200 mt-6">
            Supervisor Registration
          </Text>

          <FormField
            title="Full Name"
            value={form.name}
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
    </SafeAreaView>
  );
};

export default SupervisiorReg;
