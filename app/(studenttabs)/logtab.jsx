import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import { ArrowLeftIcon, CheckIcon } from "lucide-react-native";
import { router } from "expo-router";

const DailyLog = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logData, setLogData] = useState({
    activities: "",
    learnings: "",
    challenges: "",
    logImage: null,
  });

  const openPicker = async (selectType) => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image" ? ImagePicker.MediaTypeOptions.Images : [],
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.canceled) {
      if (selectType === "image") {
        setLogData({ ...logData, logImage: res.assets[0] });
      }
    }
  };

  const submit = () => {};
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4">
          <View className="py-4 font">
            <TouchableOpacity className="mb-4"
            onPress={() => router.push("/home")}>
              <ArrowLeftIcon size={24} className="text-gray-600" />
            </TouchableOpacity>
            <Text className="text-2xl font-psemibold text-gray-700 mb-4">
              Daily Activity Log
            </Text>

            <View>
              <Text className="text-gray-600 font-pmedium">
                Date: {new Date().toLocaleString()}
              </Text>
            </View>

            <FormField
              title="What did you work on today?"
              value={logData.activities}
              handleChangeText={(e) =>
                setLogData({
                  ...logData,
                  activities: e,
                })
              }
              multiline={true}
              otherStyles="mt-5"
              placeholder="Describe your activities..."
            />

            <FormField
              title="What did you learn?"
              value={logData.learnings}
              handleChangeText={(e) =>
                setLogData({
                  ...logData,
                  learnings: e,
                })
              }
              multiline={true}
              otherStyles="mt-5"
              placeholder="Share your learnings..."
            />
            <FormField
              title="Challenges faced (if any)"
              value={logData.challenges}
              handleChangeText={(e) =>
                setLogData({
                  ...logData,
                  challenges: e,
                })
              }
              multiline={true}
              otherStyles="mt-5"
              placeholder="Describe your challenges..."
            />
            <View className="mt-5 space-y-2">
              <Text className="text-base text-black-100 font-pmedium">
                Upload Image
              </Text>

              <TouchableOpacity onPress={() => openPicker("image")}>
                {logData.logImage ? (
                  <Image
                    source={{ uri: logData.logImage.uri }}
                    resizeMode="cover"
                    className="w-full h-64 rounded-3xl"
                  />
                ) : (
                  <View
                    className="w-full h-32 px-4 bg-whitw 
              rounded-2xl justify-center items-center
               border-2 border-gray-400 flex-row space-x-2"
                  >
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      className="w-5 h-5"
                    />
                    <Text className="text-sm text-gray-100 font-pmedium">
                      Choose a file
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <CustomButton
              title="Submit Daily Log"
              containerStyles="mt-7 py-1"
              isLoading={isSubmitting}
              handlePress={submit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DailyLog;
