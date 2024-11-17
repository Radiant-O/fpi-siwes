import { View, Text, Image } from "react-native";
import { Tabs } from 'expo-router'

import { icons } from "../../constants";

const TabIcon = ({ icon, name, color, focused }) => {
  return (
    <View className="items-center justify-center ">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-5 h-5"
      />
      <Text
        className={`${focused ? "font-pregular" : "font-pregular"} text-xs w-20 text-center`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#27AE60",
          tabBarInactiveTintColor: "#A5A3A3",
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            height: 74,
            paddingTop: 10,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="student"
          options={{
            title: "Student",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Students"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabLayout;
