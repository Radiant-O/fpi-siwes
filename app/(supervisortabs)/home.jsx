import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useRouter } from "expo-router";
import ProfileCard from "../../components/ProfileCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import useAppwrite from "../../lib/useAppwrite";
import { pendingReports } from "../../lib/appwrite";

const Home = () => {
  const { user } = useGlobalContext();
  
  const router = useRouter();

  const { data: reports } = useAppwrite(pendingReports)
  console.log("reports:", reports)

  const stats = [
    { title: "Students", value: "2" },
    { title: "Pending Reviews", value: reports.length },
    { title: "This Week Report", value: "8" },
    { title: "Visits Due", value: "3" },
  ];

  return (
    <SafeAreaView className=" flex-1 bg-primary h-full">
      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <View className="flex flex-row justify-between items-center">
            <View className="flex  justify-start items-start">
              <Text className="text-gray-500 text-lg"> Welcome back 👋, </Text>
              <Text className="text-2xl font-psemibold text-gray-700">
                {user?.fullName}
              </Text>
            </View>
            {/* <TouchableOpacity>
            <BellIcon className="text-red-600" />
            </TouchableOpacity> */}
          </View>

          {/* <Text className="text-2xl font-bold text-gray-800 mb-6">
            Supervisor Dashboard
          </Text> */}

          <View className="flex-row flex-wrap justify-between mt-5 mb-6">
            {stats.map((stat, index) => (
              <ProfileCard key={index} className="w-[48%] mb-4 p-4">
                <Text className="text-gray-600 mb-1">{stat.title}</Text>
                <Text className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </Text>
              </ProfileCard>
            ))}
          </View>

          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Recent Submitted Reports
            </Text>
            <FlatList
              data={reports}
              keyExtractor={(item) => item.$id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <TouchableOpacity className="bg-gray-50 p-4 rounded-lg mb-3"
                  onPress={() => router.push()}
                >
                  <Text className="text-gray-800">
                    <Text className="font-semibold">
                      Week {item.weekNumber} Report
                    </Text>{" "}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    {item.matricNumber} Subbmitted on{" "}
                    {new Date(item.submissiondate).toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              )}
            />
            {reports.length === 0 && (
              <Text className="text-center text-gray-500">
                No pending reports to review
              </Text>
            )}
          </View>

          <View className="flex-row flex-wrap justify-between">
            <TouchableOpacity
              className="bg-blue-600 w-[48%] py-4 px-6 rounded-lg"
              onPress={() => router.push("/supervisor/students")}
            >
              <Text className="text-white text-center font-semibold">
                View Students
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green-600 w-[48%] py-4 px-6 rounded-lg"
              onPress={() => router.push("/supervisor/schedule")}
            >
              <Text className="text-white text-center font-semibold">
                Schedule Visits
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
