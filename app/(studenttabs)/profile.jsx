import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../../components/ProfileCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
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

  console.log(user)

  return (
   
      <SafeAreaView className="flex-1 bg-primary h-full">
        <ScrollView className="flex-1 px-4 py-6">
          <View className="h-full w-full">
            <View className="items-center mb-6">
              {/* <View className="w-24 h-24 bg-primary rounded-full mb-3" /> */}
              <Text className="text-xl font-bold text-gray-800">
                {studentInfo.name}
              </Text>
              <Text className="text-gray-500">{studentInfo.matricNumber}</Text>
            </View>

            <ProfileCard>
              <Text className="text-lg font-psemibold mb-4">
                SIWES Information
              </Text>
              <View className="space-y-3">
                <View>
                  <Text className="text-gray-500">Department</Text>
                  <Text className="text-gray-800 font-pmedium">
                    {studentInfo.department}
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-500">Company</Text>
                  <Text className="text-gray-800 font-pmedium">
                    {studentInfo.company}
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-500">Supervisor</Text>
                  <Text className="text-gray-800 font-pmedium">
                    {studentInfo.supervisor}
                  </Text>
                </View>
              </View>
            </ProfileCard>

            <ProfileCard >
              <Text className="text-lg font-psemibold mb-4">
                Progress Tracking
              </Text>
              <View className="space-y-4">
                <View>
                  <Text className="text-gray-500 mb-1">Supervisor Visits</Text>
                  <View className="flex-row space-x-2">
                    {[1, 2, 3].map((visit) => (
                      <View
                        key={visit}
                        className={`w-8 h-8 rounded-full flex items-center 
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
                  <Text className="text-gray-500 mb-1">Logbook Progress</Text>
                  <View className="w-full bg-gray-200 rounded-full h-4">
                    <View
                      className="bg-secondary-100 h-4 rounded-full"
                      style={{ width: `${studentInfo.progress.logbook}%` }}
                    />
                  </View>
                  <Text className="text-sm text-gry-500 mt-1">
                    {studentInfo.progress.logbook}% Complete
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-500">Technical Report</Text>
                  <Text className="text-gray-700 font-pmedium">
                    {studentInfo.progress.technicalReport}
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-500">Overall Grade</Text>
                  <Text className="text-gray-700 font-pmedium">
                    {studentInfo.progress.overallGrade}
                  </Text>
                </View>
              </View>
            </ProfileCard>
          </View>
        </ScrollView>
      </SafeAreaView>
    
  );
};

export default profile;
