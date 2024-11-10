import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import {
  BellIcon,
  BookOpen,
  Calendar,
  ClipboardCheck,
} from "lucide-react-native";
import QuickActionCard from "../../components/QuickActionCard";
import DocumentCard from "../../components/DocumentCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { fetchWeeklyProgress } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const Home = () => {

   const { user } = useGlobalContext();
  const router = useRouter();
  const [loading, setLoading] = useState(true);


  const { data: reports } = useAppwrite(() => fetchWeeklyProgress(user.$id));

  // console.log(reports)
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-secondary-200';
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-400";
    }
  };

  const quickActions = [
    {
      icon: ClipboardCheck,
      title: "Daily Log",
      description: "Record today's activities",
      route: "(screens)/logtab",
    },
    {
      icon: BookOpen,
      title: "Weekly Report",
      description: "Submit weekly summary",
      route: "/weekly-report",
    },
    // {
    //   icon: Calendar,
    //   title: "Monthly Report",
    //   description: "Submit monthly report",
    //   route: "/monthly-report",
    // },
  ];

  const loadDashboard = async () => { 
  }
  const calculateDaysLeft = () => {
    if (!user?.startDate) return "Not Started";

    const start = new Date(user.startDate);
    const now = new Date();
    const totalDays = 120;
    const daysElapsed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    return `${Math.max(0, totalDays - daysElapsed)}/${totalDays} Days`;
  };

  // if (loading) {
  //   return (
  //     <SafeAreaView className="flex-1 bg-white">
  //       <View className="flex-1 justify-center items-center">
  //         <Text className="text-gray-600">Loading...</Text>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView className=" flex-1 bg-primary">
      <ScrollView className=" flex-1 px-4 py-6">
        <View className="h-full w-full font-pregular">
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
                  {user?.supervisor || "Not Assigned"}
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-base font-pmedium text-gray-600 mb-1">
                  {" "}
                  Company{" "}
                </Text>
                <Text className="text-base font-pbold text-gray-800">
                  {user?.companyName}
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-base font-pmedium text-gray-600 mb-1">
                  {" "}
                  Days Left{" "}
                </Text>
                <Text className="text-base font-pbold text-gray-800">
                  {calculateDaysLeft()}
                </Text>
              </View>
            </View>
          </View>

          <View className="p-4">
            <Text className="text-lg font-bold text-gray mb-4">
              Quick Actions
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={index}
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  onPress={() => router.replace(action.route)}
                />
              ))}
            </View>
          </View>

          <View className="p-4">
            <Text className="text-lg font-bold text-gray mb-4">
              Weekly Update
            </Text>
            {reports.map((doc, index) => (
              <DocumentCard
                key={index}
                title={`Week ${doc.weekNumber} report Submitted`}
                description={ new Date(doc.submissiondate).toLocaleDateString()}
                status={doc.status}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
