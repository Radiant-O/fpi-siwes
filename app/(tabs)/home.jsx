import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { BellIcon, BookOpen, Calendar, ClipboardCheck } from "lucide-react-native";

const Home = ({ navigation }) => {

  const quickActions = [
    {
      icon: ClipboardCheck,
      title: "Daily Log",
      description: "Record today's activities",
      route: "DailyLog",
    },
    {
      icon: BookOpen,
      title: "Weekly Report",
      description: "Submit weekly summary",
      route: "WeeklyReport",
    },
    {
      icon: Calendar,
      title: "Monthly Report",
      description: "Submit monthly report",
      route: "MonthlyReport",
    },
  ];

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="h-full w-full px-5 py-6 font-pregular">
          <View className="flex flex-row justify-between items-center">
            <View className="flex  justify-start items-start">
              <Text className="text-gray-500 text-lg"> Welcome back 👋, </Text>
              <Text className="text-2xl font-psemibold text-gray-700">
                Radiant
              </Text>
            </View>
            {/* <TouchableOpacity>
            <BellIcon className="text-red-600" />
            </TouchableOpacity> */}
          </View>

          <View className="mt-4 p-4 border border-secondary-100 rounded-xl shadow-md">
            <Text className="text-xl font-psemibold text-gray-600 mb-4">
              SIWES Status
            </Text>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-base font-pmedium text-gray-600 mb-1">
                  {" "}
                  Supervisor{" "}
                </Text>
                <Text className="text-base font-pbold text-gray-800">
                  Engr Ola S
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-base font-pmedium text-gray-600 mb-1">
                  {" "}
                  Company{" "}
                </Text>
                <Text className="text-base font-pbold text-gray-800">
                  Radiant Tech
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-base font-pmedium text-gray-600 mb-1">
                  {" "}
                  Days Left{" "}
                </Text>
                <Text className="text-base font-pbold text-gray-800">
                  120/180
                </Text>
              </View>
            </View>
          </View>

          <View>
            <Text className="">Quick Actions</Text>
            <View>
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={index}
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  onPress={() => navigation.navigate(action.route)}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
