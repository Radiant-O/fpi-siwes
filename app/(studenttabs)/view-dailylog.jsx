import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { databases, DATABASE_ID, COLLECTIONS } from "../../../lib/appwrite";
import ProfileCard from "../../components/ProfileCard";
import { fetchDailyLog } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const DailyLogs = () => {
  const { user } = useGlobalContext();
  const { data: logs } = useAppwrite(() => fetchDailyLog(user.$id));

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // if (loading) {
  //   return (
  //     <SafeAreaView className="flex-1 bg-white">
  //       <View className="flex-1 justify-center items-center">
  //         <Text>Loading...</Text>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Daily Activity Logs
        </Text>

        {logs.map((log) => (
          <ProfileCard key={log.$id} className="mb-4 p-4">
            <Text className="text-gray-500 flex justify-end items-end text-sm mb-2">
              {new Date(log.$createdAt).toLocaleDateString()}
            </Text>

            <View className="mb-3">
              <Text className="font-semibold text-gray-700 mb-1">
                Activities
              </Text>
              <Text className="text-gray-600">{log.activities}</Text>
            </View>

            <View className="mb-3">
              <Text className="font-semibold text-gray-700 mb-1">
                Learnings
              </Text>
              <Text className="text-gray-600">{log.learnings}</Text>
            </View>

            <View>
              <Text className="font-semibold text-gray-700 mb-1">
                Challenges
              </Text>
              <Text className="text-gray-600">{log.challenges}</Text>
            </View>
          </ProfileCard>
        ))}

        {logs.length === 0 && (
          <Text className="text-center text-gray-500 mt-4">
            No daily logs submitted yet
          </Text>
        )}

        {/* refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyLogs;
