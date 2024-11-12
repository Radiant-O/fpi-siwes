import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Alert,
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
import { useGlobalContext } from "../../context/GlobalProvider";
import { uploadWeeklylog } from "../../lib/appwrite";

const WeeklyReport = () => {
  const { user } = useGlobalContext()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [weekData, setWeekData] = useState({
    weekNumber: "",
    summary: "",
    skills: "",
    challenges: "",
  });

 

   const submit = async () => {
     if (
       !weekData.weekNumber ||
       !weekData.summary ||
       !weekData.skills ||
       !weekData.challenges
     ) {
       return Alert.alert("Error", "Please fill in all the fields");
     }

     setIsSubmitting(true);

     try {
       await uploadWeeklylog({
         ...weekData,
         studentId: user.$id,
         studentMatric: user.matricNumber,
         department: user.department,
       });

       Alert.alert("Weekly Report Submitted successfully");
       router.push("(studenttabs)/home");
     } catch (err) {
       Alert.alert("Error", err.message);
       throw new Error(err);
     } finally {
       setWeekData({
         weekNumber: "",
         summary: "",
         skills: "",
         challenges: "",
       });
     }
   };
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4">
          <View className="py-4 font">
            <TouchableOpacity
              className="mb-4"
              onPress={() => router.push("/home")}
            >
              <ArrowLeftIcon size={24} className="text-gray-600" />
            </TouchableOpacity>
            <Text className="text-2xl font-psemibold text-gray-700">
              Weekly Report
            </Text>

            <FormField
              title="Week Number*"
              value={weekData.weekNumber}
              keyboard="number-pad"
              handleChangeText={(e) =>
                setWeekData({
                  ...weekData,
                  weekNumber: e,
                })
              }
              otherStyles="mt-5"
              placeholder="Enter week number..."
            />
            <FormField
              title="Summary of activities this week*"
              value={weekData.summary}
              handleChangeText={(e) =>
                setWeekData({
                  ...weekData,
                  summary: e,
                })
              }
              multiline={true}
              otherStyles="mt-5"
              placeholder="Provide a detailed summary..."
            />
            <FormField
              title="Skills acquired*"
              value={weekData.skills}
              handleChangeText={(e) =>
                setWeekData({
                  ...weekData,
                  skills: e,
                })
              }
              multiline={true}
              otherStyles="mt-5"
              placeholder="List skills learned"
            />

            <FormField
              title="Challenges and Solutions*"
              value={weekData.challenges}
              handleChangeText={(e) =>
                setWeekData({
                  ...weekData,
                  challenges: e,
                })
              }
              multiline={true}
              otherStyles="mt-5"
              placeholder="Describe challenges and how you solved them..."
            />

            <CustomButton
              title="Submit Weekly Report"
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

export default WeeklyReport;
