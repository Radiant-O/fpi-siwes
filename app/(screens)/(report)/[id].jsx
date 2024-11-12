import { View, Text, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../../components/CustomButton";
import { loadReport, approveWeeklyReport } from "../../../lib/appwrite";
import { useGlobalContext } from "../../../context/GlobalProvider";
import useAppwrite from "../../../lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import FormField from "../../../components/FormField";

const ReviewPage = () => {
  const { id } = useLocalSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [report, setReport] = useState("");

  const { user } = useGlobalContext();
  const { data: reports, isLoading } = useAppwrite(() => loadReport(id));

  reports;
  const approveReport = async () => {
    try {
      setIsSubmitting(true);
      await approveWeeklyReport(id, report);
      alert("Report Approved");
      router.back();
    } catch (e) {
      throw new Error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-primary">
        <View className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Week {reports?.weekNumber} Report
        </Text>

        <View className="bg-gray-50 p-4 rounded-lg mb-6">
          <Text className="text-gray-500 mb-4">
            Submitted: {new Date(reports?.submissiondate).toLocaleDateString()}
          </Text>

          <View className="mb-4">
            <Text className="font-semibold text-gray-800 mb-2">
              Student Matric Number
            </Text>
            <Text className="text-gray-600">{reports?.studentMatric}</Text>
          </View>
          <View className="mb-4">
            <Text className="font-semibold text-gray-800 mb-2">Summary</Text>
            <Text className="text-gray-600">{reports?.summary}</Text>
          </View>

          <View className="mb-4">
            <Text className="font-semibold text-gray-800 mb-2">
              Skills Acquired
            </Text>
            <Text className="text-gray-600">{reports?.skills}</Text>
          </View>

          <View>
            <Text className="font-semibold text-gray-800 mb-2">Challenges</Text>
            <Text className="text-gray-600">{reports?.challenges}</Text>
          </View>
        </View>

        <FormField
          title="Feedback (optional)"
          multiline={true}
          value={report}
          handleChangeText={setReport}
          otherStyles="mb-6 py-2"
        />

        <CustomButton
          title="Approve Report"
          handlePress={approveReport}
          isLoading={isSubmitting}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReviewPage;
