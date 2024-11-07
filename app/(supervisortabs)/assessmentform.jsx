import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AssessmentForm = () => {
  const [scores, setScores] = useState({
    logbook: 0,
    technicalReport: 0,
    supervisorRemark: 0,
    industryRemark: 0,
  });

  const calculateGrade = (totalScore) => {
    if (totalScore >= 75) return "A";
    if (totalScore >= 70) return "AB";
    if (totalScore >= 65) return "B";
    if (totalScore >= 60) return "BC";
    if (totalScore >= 55) return "C";
    if (totalScore >= 50) return "CD";
    if (totalScore >= 45) return "D";
    if (totalScore >= 40) return "E";
    return "F";
  };

  const calculateTotal = () => {
    const total =
      scores.logbook * 0.4 +
      scores.technicalReport * 0.3 +
      scores.supervisorRemark * 0.2 +
      scores.industryRemark * 0.1;
    return total.toFixed(2);
  };

  const ScoreInput = ({ label, value, maxScore, onChange }) => (
    <View className="mb-6">
      <Text className="text-gray-600 mb-2 font-medium">{label}</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-4 text-gray-800"
        keyboardType="numeric"
        value={value.toString()}
        onChangeText={(text) => {
          const num = parseFloat(text) || 0;
          if (num <= maxScore) onChange(num);
        }}
        placeholder={`Enter score (max: ${maxScore})`}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Final Assessment Form
        </Text>

        <ScoreInput
          label="Logbook Score (40%)"
          value={scores.logbook}
          maxScore={100}
          onChange={(value) =>
            setScores((prev) => ({ ...prev, logbook: value }))
          }
        />

        <ScoreInput
          label="Technical Report Score (30%)"
          value={scores.technicalReport}
          maxScore={100}
          onChange={(value) =>
            setScores((prev) => ({ ...prev, technicalReport: value }))
          }
        />

        <ScoreInput
          label="Supervisor Remark Score (20%)"
          value={scores.supervisorRemark}
          maxScore={100}
          onChange={(value) =>
            setScores((prev) => ({ ...prev, supervisorRemark: value }))
          }
        />

        <ScoreInput
          label="Industry Remark Score (10%)"
          value={scores.industryRemark}
          maxScore={100}
          onChange={(value) =>
            setScores((prev) => ({ ...prev, industryRemark: value }))
          }
        />

        <View className="bg-gray-50 p-4 rounded-lg mb-6">
          <Text className="text-lg font-semibold text-gray-800">
            Final Score
          </Text>
          <Text className="text-3xl font-bold text-blue-600 mt-2">
            {calculateTotal()}%
          </Text>
          <Text className="text-xl font-semibold text-gray-600 mt-2">
            Grade: {calculateGrade(calculateTotal())}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-blue-600 py-4 px-6 rounded-lg mb-6"
          onPress={() => {
            // Submit assessment to Appwrite
          }}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Submit Assessment
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssessmentForm;
