import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAppwrite from "../../lib/useAppwrite";
import { fetchStudent } from "../../lib/appwrite";
import { router } from "expo-router";

const StudentScreen = () => {
  const { user } = useGlobalContext();

  const { data: students = [], isLoading } = useAppwrite(() =>
    fetchStudent(user.$id)
  );

  console.log(students);


  const calculateGrade = (grades) => {
    if (!grades) return "Pending";
    const total =
      (grades.weeklyLogs || 0) +
      (grades.technicalReport || 0) +
      (grades.supervisorRemark || 0) +
      (grades.attendance || 0);

    if (total >= 90) return "A";
    if (total >= 85) return "AB";
    if (total >= 80) return "B";
    if (total >= 75) return "BC";
    if (total >= 70) return "C";
    if (total >= 65) return "CD";
    if (total >= 60) return "D";
    if (total >= 55) return "E";
    if (total >= 1) return "F";
    return "Not Graded";
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          My Students
        </Text>

        {students.map((student) => (
          <TouchableOpacity
            key={student.$id}
            className="bg-white p-4 rounded-lg mb-4 border border-gray-200"
            onPress={() => router.push(`/(screens)/(students)/${student.$id}`)}
          >
            <View>
              <Text className="text-lg font-semibold text-gray-800">
                {student.fullName}
              </Text>
              <Text className="text-gray-500">{student.matricNumber}</Text>
              <Text className="text-gray-500">{student.companyName}</Text>

              <View className="mt-3 flex-row justify-between items-center">
                <View>
                  <Text className="text-sm text-gray-600">Current Grade</Text>
                  <Text className="text-lg font-bold text-secondary-200">
                    {student.letterGrade} 
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {students.length === 0 && (
          <Text className="text-center text-gray-500">
            No students assigned yet
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudentScreen;
