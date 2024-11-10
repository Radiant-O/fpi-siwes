import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileCard from '../../../components/ProfileCard'
import CustomButton from '../../../components/CustomButton'

const ReviewPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView className="flex-1 px-4 py-6">
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Week 1 Report
        </Text>

        <View className="bg-gray-50 p-4 rounded-lg mb-6">
          <Text className="text-gray-500 mb-4">
            Submitted: {new Date(report?.submissionDate).toLocaleDateString()}
          </Text>

          <View className="mb-4">
            <Text className="font-semibold text-gray-800 mb-2">Summary</Text>
            <Text className="text-gray-600">{report?.summary}</Text>
          </View>

          <View className="mb-4">
            <Text className="font-semibold text-gray-800 mb-2">
              Skills Acquired
            </Text>
            <Text className="text-gray-600">{report?.skills}</Text>
          </View>

          {report?.challenges && (
            <View>
              <Text className="font-semibold text-gray-800 mb-2">
                Challenges
              </Text>
              <Text className="text-gray-600">{report?.challenges}</Text>
            </View>
          )}
        </View>

        <View className="mb-6">
          <Text className="text-gray-600 mb-2 font-medium">
            Feedback (optional)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 min-h-[100px] text-gray-800"
            multiline
            placeholder="Add your feedback..."
            value={feedback}
            onChangeText={setFeedback}
          />
              </View>
              
              <CustomButton
              title="Approve Report"
              />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ReviewPage