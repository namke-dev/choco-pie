import { Image, Text, View } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";

const EmptySearchResult = ({ title, subtitle }) => {
  return (
    <View>
      <Image
        source={images.empty}
        className="w-[270px] h-[125px]"
        resizeMode="cover"
      />
      <Text className="text-white  text-xl text-center font-pregular mt-2">
        {title}
      </Text>
      <Text className="text-white  text-md text-center font-pregular mt-2">
        {subtitle}
      </Text>
      <CustomButton
        title="Back to Explore"
        containerStyle="mt-4"
        handlePress={() => {}}
      />
    </View>
  );
};

export default EmptySearchResult;
