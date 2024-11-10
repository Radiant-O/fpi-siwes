import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../../components/ProfileCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants"
import { signOut } from "../../lib/appwrite";
import { router } from "expo-router";

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
      overallGrade: "Not Graded",
    },
  };

  console.log(user)

  const logOut = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/register-type");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary h-full">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="h-full w-full">
          <View className="w-full justify-center flex items-center mb-12 px-4">
            <TouchableOpacity
              onPress={logOut}
              className="w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="-mt-[20%]">
              <View className="w-14 h-14 border border-secondary rounded-full justify-center items-center">
                <Image
                  source={{ uri: user?.avartar }}
                  className="w-[90%] h-[90%] rounded-full"
                  resizeMode="cover"
                />
              </View>
              <Text className="text-2xl font-psemibold text-gray-800 text-center">
                {user?.fullName}
              </Text>
              <Text className="text-gray-600 font-pmedium text-center">
                {user?.matricNumber}
              </Text>
              <Text className="text-gray-600 font-pmedium text-center">{user?.level}</Text>
            </View>
          </View>

          <ProfileCard>
            <Text className="text-lg font-psemibold mb-4">
              SIWES Information
            </Text>
            <View className="space-y-3">
              <View>
                <Text className="text-gray-500">Department</Text>
                <Text className="text-gray-800 font-pmedium">
                  {user?.department}
                </Text>
              </View>
              <View>
                <Text className="text-gray-500">Company</Text>
                <Text className="text-gray-800 font-pmedium">
                  {user?.companyName}
                </Text>
              </View>
              <View>
                <Text className="text-gray-500">Supervisor</Text>
                <Text className="text-gray-800 font-pmedium">
                  {user?.supervisor || "Not Assigned"}
                </Text>
              </View>
            </View>
          </ProfileCard>

          <ProfileCard>
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
