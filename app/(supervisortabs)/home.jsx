import { View, Text, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useRouter } from "expo-router";
import ProfileCard from "../../components/ProfileCard";

const Home = () => {
  const router = useRouter();

  const stats = [
    { title: "Students", value: "12" },
    { title: "Pending Reviews", value: "5" },
    { title: "This Week Report", value: "8" },
    { title: "Visits Due", value: "3" },
  ];

  const recentActivities = [
    {
      id: "1",
      type: "report",
      student: "John Doe",
      action: "submitted daily log",
      time: "2h ago",
    },
    {
      id: "2",
      type: "document",
      student: "Jane Smith",
      action: "uploaded acceptance letter",
      time: "3h ago",
    },
    {
      id: "3",
      type: "visit",
      student: "Mike Johnson",
      action: "scheduled visit",
      time: "5h ago",
    },
  ];

  return (
    <SafeAreaView className=" flex-1 bg-primary h-full">
      <ScrollView className="flex-1 px-4">
        <View className="py-4">
          <Text className="text-2xl font-bold text-gray-800 mb-6">
            Supervisor Dashboard
          </Text>

          <View className="flex-row flex-wrap justify-between mb-6">
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
              Recent Activities
            </Text>
            <FlatList
              data={recentActivities}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View className="bg-gray-50 p-4 rounded-lg mb-3">
                  <Text className="text-gray-800">
                    <Text className="font-semibold">{item.student}</Text>{" "}
                    {item.action}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">
                    {item.time}
                  </Text>
                </View>
              )}
            />
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
