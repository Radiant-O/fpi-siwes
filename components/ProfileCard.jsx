import { View, Text } from 'react-native'
import React from 'react'

const ProfileCard = ({ children, className }) => {
  return (
    <View className={`bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}>
      { children}
    </View>
  )
}

export default ProfileCard