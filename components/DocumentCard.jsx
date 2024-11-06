import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const DocumentCard = ({ title, description, status }) => {
  return (
      <TouchableOpacity className="flex-row justify-between items-center bg-white p-4 rounded-xl mb-3 shadow-sm">
          <View className="flex-1">
              <Text className="text-base font-psemibold text-gray-600">{ title }</Text>
              <Text className="text-sm text-gray-600 mt-2">{ description }</Text>
          </View>
          <View className={`py-2 px-3 rounded-full ${ status === 'Submitted' ? 'bg-secondary-100' : 'bg-orange-100'}`}>
              <Text className={`text-xs font-medium ${status === 'Submitted' ? 'text-primary' : 'text-orange-700'}`}>{status}</Text>
          </View>
    </TouchableOpacity>
  )
}

export default DocumentCard