import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UserIcon, UserCog } from "lucide-react-native";
import { router, Link } from 'expo-router';

const RegistrationType = () => {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 justify-center px-6">
          <View className="mb-6">
            <Text className="text-3xl font-psemibold text-gray-800 mb-2">
              Create Account
            </Text>
            <Text className="text-gray-600">Choose account type</Text>
          </View>

          <TouchableOpacity
            className="bg-secondary-100 bg-opacity-10 py-6 rounded-lg mb-4 flex-row items-center px-4"
            onPress={() => router.push("/sign-up")}
          >
            <UserIcon size={24} color="white" />
            <View className="ml-3">
              <Text className="text-primary text-lg font-psemibold">
                I am a Student
              </Text>
              <Text className="text-white text-sm mt-1">
                Create an account to track your SIWES progress
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-secondary-100 bg-opacity-10 py-6 rounded-lg mb-4 flex-row items-center px-4"
            onPress={() => router.push("/supervisor-signup")}
          >
            <UserIcon size={24} color="white" />
            <View className="ml-3">
              <Text className="text-primary text-lg font-psemibold">
                I am a Supervisor
              </Text>
              <Text className="text-primary text-sm mt-1 opacity-80">
                Create an account to manage and assess students
              </Text>
            </View>
          </TouchableOpacity>

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
      </SafeAreaView>
    );
}

export default RegistrationType