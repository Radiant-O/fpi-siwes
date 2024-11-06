import { View, Text, StatusBar } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const ScreenLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="monthly-report"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="weekly-report"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" barStyle="dark-content" />
    </>
  );
}

export default ScreenLayout;