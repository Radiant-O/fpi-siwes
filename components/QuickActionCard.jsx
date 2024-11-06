import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const QuickActionCard = ({ icon: Icon, title, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="bg-white p-4 rounded-xl w-[48%] shadow-sm mb-4">
      <Icon size={24} className="text-secondary-200 mb-3" />
      <Text className="text-base font-psemibold text-gray-700 mb-1">{ title}</Text>
      <Text className="text-sm text-gray-600">{ description }</Text>
    </TouchableOpacity>
  )
}
 
export default QuickActionCard