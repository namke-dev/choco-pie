import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({ value, placeholder, handleChangeText }) => {
  return (
    <View
      className="border-2 border-black-200 w-full 
      h-16 px-4 bg-black-100 rounded-2xl
      focus:border-secondary items-center
      flex flex-row
      space-x-4"
    >
      <TextInput
        className="text-base mt-0 flex-1 font-pregular text-white"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={() => handleChangeText}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="h-5 w-5"></Image>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
