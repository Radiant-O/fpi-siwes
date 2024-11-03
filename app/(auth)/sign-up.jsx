import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from "../../constants"

const SignUp = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-full px-5 py-6">
          <View className="flex flex-row gap-2 justify-end">
            <Image
              source={images.schLogo}
              className="w-[60px] h-[60px] "
              resizeMode="contain"
            />
            <Image
              source={images.itfLogo}
              className="w-[60px] h-[60px]"
              resizeMode="contain"
            />
                  </View>
                  <Text className="text-3xl font-psemibold text-black-200 mt-10">
                      Sign up 
                  </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp