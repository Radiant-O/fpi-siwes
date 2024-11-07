import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {useState} from "react";
import { useRouter } from "expo-router";
import {
  BellIcon,
  BookOpen,
  Calendar,
  ClipboardCheck,
} from "lucide-react-native";
import QuickActionCard from "../../components/QuickActionCard";
import DocumentCard from "../../components/DocumentCard";

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const quickActions = [
    {
      icon: ClipboardCheck,
      title: "Daily Log",
      description: "Record today's activities",
      route: "(studenttabs)/logtab",
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

  const documents = [
    {
      title: "Attendance",
      description: "Daily Attendance Record",
      status: "Pending",
    },
    {
      title: "Letter of Acceptance",
      description: "Company acceptance letter",
      status: "Submitted",
    },
    {
      title: "ITF Form",
      description: "Siwes form",
      status: "Pending",
    },
  ];

  const calculateDaysLeft = () => {
    // if()

  }

   if (loading) {
     return (
       <SafeAreaView className="flex-1 bg-white">
         <View className="flex-1 justify-center items-center">
           <Text className="text-gray-600">Loading...</Text>
         </View>
       </SafeAreaView>
     );
   }

  return (
    <SafeAreaView className=" flex-1 bg-primary">
      <ScrollView className=" flex-1 px-4 py-6">
        <View className="h-full w-full font-pregular">
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
              Required Documents
            </Text>
            {documents.map((doc, index) => (
              <DocumentCard
                key={index}
                title={doc.title}
                description={doc.description}
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
