import { StyleSheet, Text, View } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, containerStyle, titleStyle }) => {
  return (
    <View className={`flex flex-col ${containerStyle}`}>
      <Text className="text-white text-center font-semibold">{title}</Text>
      <Text className="text-gray-200 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
