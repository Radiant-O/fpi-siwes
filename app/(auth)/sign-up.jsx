import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import { Link, router } from "expo-router";
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton"

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        matric: "",
        placementName: "",
        placementAdd: "",
        supervisorName: "",
        password: "",
    })

    const submit = () => {

    }
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
            <Text className="text-3xl font-psemibold text-black-200 mt-10">
              Sign Up
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
              otherStyles="mt-8"
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
              title="Placement Name"
              value={form.placementName}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  placementName: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter Placement Name"
            />
            <FormField
              title="Placement Address"
              value={form.placementAdd}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  placementAdd: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter Placement Address"
            />
            <FormField
              title="Supervisior Name"
              value={form.supervisorName}
              handleChangeText={(e) =>
                setForm({
                  ...form,
                  supervisorName: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter Supervisior Name"
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
}

export default SignUp