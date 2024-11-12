import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import CustomButton from "../../../components/CustomButton";
import { loadStudentDetails, submitGrade } from "../../../lib/appwrite";
import useAppwrite from "../../../lib/useAppwrite";

const AssessmentForm = () => {
    const { id } = useLocalSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [grades, setGrades] = useState({
    weeklyLogs: 0,
    technicalReport: 0,
    supervisorRemark: 0,
    attendance: 0,
  });

  const { data: student, isLoading } = useAppwrite(() =>
    loadStudentDetails(id)
  );

  const calculateTotalAndGrade = () => {
    const total =
      (parseFloat(grades.weeklyLogs) || 0) +
      (parseFloat(grades.technicalReport) || 0) +
      (parseFloat(grades.supervisorRemark) || 0) +
      (parseFloat(grades.attendance) || 0);

    const aggTotal = total.toFixed(2);

    let letterGrade = "F";
    if (aggTotal >= 75) letterGrade = "A";
    else if (aggTotal >= 70) letterGrade = "AB";
    else if (aggTotal >= 65) letterGrade = "B";
    else if (aggTotal >= 60) letterGrade = "BC";
    else if (aggTotal >= 55) letterGrade = "C";
    else if (aggTotal >= 50) letterGrade = "CD";
    else if (aggTotal >= 45) letterGrade = "D";
    else if (aggTotal >= 40) letterGrade = "E";

    return { aggTotal, letterGrade };
  };

  const approveReport = async () => {
    try {
      setIsSubmitting(true);

      const { aggTotal, letterGrade } = calculateTotalAndGrade();
      await submitGrade(id, aggTotal, letterGrade);
      alert("Grade SUbmitted Successfully");
      router.back();
    } catch (e) {
      throw new Error(e);
    } finally {
      setIsSubmitting(false);
    }
    };
    
    if (student.grades > 0) {
      return (
        <SafeAreaView className="flex-1 bg-primary">
          <View className="bg-white p-8 rounded-lg border border-gray-200 mb-6">
            <Text className="text-2xl font-bold text-gray-800">
              {student?.fullName}
            </Text>
            <Text className="text-gray-500 mt-1">{student?.matricNumber}</Text>
            <Text className="text-gray-500 mt-1">{student?.companyName}</Text>
            
                  <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-lg font-semibold text-gray-800">
              Graded
            </Text>
            <Text className="text-3xl font-bold text-blue-600 mt-2">
              {student?.grades}%
            </Text>
            <Text className="text-xl font-semibold text-gray-600 mt-2">
              Grade: {student?.letterGrade}
            </Text>
          </View>
          </View>
        </SafeAreaView>
      );
    }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <Text className="text-2xl font-bold text-gray-800">
            {student?.fullName}
          </Text>
          <Text className="text-gray-500 mt-1">{student?.matricNumber}</Text>
                  <Text className="text-gray-500 mt-1">{student?.companyName}</Text>
                  
                  
        </View>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-600 mb-2">Weekly Logs (40%)</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4"
              keyboardType="numeric"
              value={grades.weeklyLogs.toString()}
              onChangeText={(text) =>
                setGrades((prev) => ({
                  ...prev,
                  weeklyLogs: Math.min(40, parseFloat(text) || 0),
                }))
              }
              placeholder="Enter score (max: 40)"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Technical Report (30%)</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4"
              keyboardType="numeric"
              value={grades.technicalReport.toString()}
              onChangeText={(text) =>
                setGrades((prev) => ({
                  ...prev,
                  technicalReport: Math.min(30, parseFloat(text) || 0),
                }))
              }
              placeholder="Enter score (max: 30)"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Supervisor Remark (20%)</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4"
              keyboardType="numeric"
              value={grades.supervisorRemark.toString()}
              onChangeText={(text) =>
                setGrades((prev) => ({
                  ...prev,
                  supervisorRemark: Math.min(20, parseFloat(text) || 0),
                }))
              }
              placeholder="Enter score (max: 20)"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2">Industry Remark (10%)</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4"
              keyboardType="numeric"
              value={grades.attendance.toString()}
              onChangeText={(text) =>
                setGrades((prev) => ({
                  ...prev,
                  attendance: Math.min(10, parseFloat(text) || 0),
                }))
              }
              placeholder="Enter score (max: 10)"
            />
          </View>

          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-lg font-semibold text-gray-800">
              Final Grade
            </Text>
            <Text className="text-3xl font-bold text-blue-600 mt-2">
              {calculateTotalAndGrade().aggTotal}%
            </Text>
            <Text className="text-xl font-semibold text-gray-600 mt-2">
              Grade: {calculateTotalAndGrade().letterGrade}
            </Text>
          </View>

          <CustomButton
            title="Submit Grades"
            handlePress={approveReport}
            isLoading= {isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssessmentForm;
