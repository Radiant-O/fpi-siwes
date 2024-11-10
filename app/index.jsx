import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { router, Redirect } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";
import { useEffect } from "react";

export default function App() {
  const { isLoading, isLoggedIn, user } = useGlobalContext();

  useEffect(() => {
    if (!isLoading && isLoggedIn && user) {
      // Add console.log to debug
      // console.log("Auth State:", { isLoading, isLoggedIn, user });

      if (user.userType === "student") {
        router.replace("/(studenttabs)/home");
      } else if (user.userType === "supervisor") {
        router.replace("/(supervisortabs)/home");
      }
    }
  }, [isLoading, isLoggedIn, user]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full px-5 py-6">
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

          <View className="justify-center items-center mt-[10%]">
            <Image
              source={images.splash1}
              className="max-w-[400px] h-[300px]"
              resizeMode="contain"
            />

            <Text className="text-center">
              Implement policies on the
              <Text className=" uppercase font-psemibold text-secondary-200 ">
                {" "}
                students industrial work experience scheme.
              </Text>
            </Text>
            <View className="w-full mt-[50%]">
              <CustomButton
                title="Continue"
                handlePress={() => router.push("/register-type")}
                containerStyles="w-full"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" barStyle="dark-content" />
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({})
