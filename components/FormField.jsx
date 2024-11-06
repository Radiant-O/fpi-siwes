import { View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  multiline = false,
  keyboard,
  ...props
}) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black-100 font-pmedium">{title}</Text>
      <View
        className="border-2 border-gray-400 w-full px-4 rounded-2xl 
          focus:border-secondary items-center flex-row"
      >
        <TextInput
          className="flex-1 text-black font-p-semibold text-[18px]"
          placeholder={placeholder}
          keyboardType={keyboard}
          multiline={multiline}
          style={multiline ? { height: 100 } : { height: 50}}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
