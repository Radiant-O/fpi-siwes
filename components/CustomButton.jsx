import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = (
  {title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading}
) => {
  return (
      <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary-100 rounded-xl min-h-[62px], justify-center items-center ${containerStyles} ${isLoading? 'opacity-40' : ''}`}
      disabled={isLoading}
      >
          <Text className={`text-primary font-psemibold py-3 text-lg ${textStyles}`}>
                        {title}
          </Text>
    </TouchableOpacity>
  );
};

export default CustomButton