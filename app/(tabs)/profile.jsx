import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../../components/ProfileCard";

const profile = () => {
  const studentInfo = {
    name: "John Doe",
    matricNumber: "CSC/2019/0123",
    department: "Computer Science",
    company: "Tech Solutions Ltd",
    supervisor: "Dr. Smith Johnson",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    supervisorVisits: 1, // out of 3
    progress: {
      logbook: 75,
      technicalReport: "Not Submitted",
      overallGrade: "Pending",
    },
  };

  return (
    <View>
      <SafeAreaView className="flex-1 bg-primary">
        <ScrollView className="flex-1 px-4 py-6">
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-gray-400 rounded-full mb-3">
              <Text className="text-xl font-bold text-gray-800">
                Hello Name
              </Text>
              <Text className="text-gray-500">2/11/QAE</Text>
            </View>
            <ProfileCard>
              <Text> SIWES Information </Text>
              <View>
                <View>
                  <Text>Department</Text>
                  <Text> Student department</Text>
                </View>
                <View>
                  <Text>Company</Text>
                  <Text>Student Company</Text>
                </View>
                <View>
                  <Text>Supervisor</Text>
                  <Text>Student Supervisor</Text>
                </View>
              </View>
            </ProfileCard>

            <ProfileCard>
              <Text>Progress Tracking</Text>
              <View>
                <View>
                  <Text>Supervisor Visits</Text>
                  <View className="flex-row space-x-2">
                    {[1, 2, 3].map((visit) => (
                      <View
                        key={visit}
                        className={`w-8 h-8 rounded-full flex-items-center 
                          justify-center ${
                            visit <= studentInfo.supervisorVisits
                              ? "bg-secondary-100"
                              : "bg-gray-200"
                          }`}
                      >
                        <Text
                          className={
                            visit <= studentInfo.supervisorVisits
                              ? "text-black"
                              : "text-gray-300"
                          }
                        >
                          {visit}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                <View>
                  <Text>Logbook Progress</Text>
                  <View>
                    <View
                      className="bg-blue-500 h-2.5 rounded-full"
                      style={{ width: `${studentInfo.progress.logbook}%` }}
                    />
                  </View>
                  <Text className="text-sm text-gry-500 mt-1">
                    {studentInfo.progress.logbook}% Complete
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-500">Technical Report</Text>
                  <Text className="text-gray-700 font-pmedium">{ studentInfo.progress.technicalReport }</Text>
                </View>
                <View>
                  <Text className="text-gray-500">Overall Grade</Text>
                  <Text className="text-gray-700 font-pmedium">{ studentInfo.progress.overallGrade }</Text>
                </View>
              </View>
            </ProfileCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default profile;
