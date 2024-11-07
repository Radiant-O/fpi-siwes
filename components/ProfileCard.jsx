import { View, Text } from 'react-native'
import React from 'react'

const ProfileCard = ({ children, className }) => {
  return (
    <View className={`bg-primary rounded-lg shadow-sm mb-8 p-4  ${className}`}>
      {children}
    </View>
  );
}

export default ProfileCard