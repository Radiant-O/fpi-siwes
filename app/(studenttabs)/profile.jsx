import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "../../components/ProfileCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import { signOut } from "../../lib/appwrite";
import { router } from "expo-router";

const profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

 

   const calculateWeeksRemaining = (date) => {
     const end = new Date(date);
     const now = new Date();
     const diffTime = end - now;
     const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
     return `${Math.max(0, diffWeeks)} Weeks`;
   };

  //console.log(user)

  const logOut = async () => {
    console.log("clickedd")
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace("/register-type");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary h-full">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="w-full flex flex-row  mb-3 px-4">
          <View className=" w-full">
            <View className="w-14 h-14 border border-secondary rounded-full justify-center items-center">
              <Image
                source={{ uri: user?.avartar }}
                className="w-[90%] h-[90%] rounded-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-2xl font-psemibold text-gray-800 ">
              {user?.fullName}
            </Text>
            <Text className="text-gray-600 font-pmedium">
              {user?.matricNumber}
            </Text>
            <Text className="text-gray-600 font-pmedium">{user?.level}</Text>
          </View>
          <TouchableOpacity onPress={logOut} className="w-full mb-10 ">
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>

        <ProfileCard>
          <Text className="text-lg font-psemibold mb-4">SIWES Information</Text>
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
                {user?.supervisorName || "Not Assigned"}
              </Text>
            </View>
          </View>
        </ProfileCard>

        <ProfileCard>
          <Text className="text-lg font-psemibold mb-4">Progress Tracking</Text>
          <View className="space-y-4">
            <View>
              <Text className="text-gray-500 mb-1">Weeks Left</Text>

              <Text className="text-sm text-gry-500 mt-1">
                {calculateWeeksRemaining(user?.endDate)}
              </Text>
            </View>
            <View>
              <Text className="text-gray-500">Technical Report</Text>
              <Text className="text-gray-700 font-pmedium">
                {user?.technicalReport}
              </Text>
            </View>
            <View>
              <Text className="text-gray-500">Overall Score</Text>
              <Text className="text-gray-700 font-pmedium">{user?.grades}</Text>
            </View>
            <View>
              <Text className="text-gray-500">Overall Grade</Text>
              <Text className="text-gray-700 font-pmedium">
                {user?.letterGrade}
              </Text>
            </View>
          </View>
        </ProfileCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
