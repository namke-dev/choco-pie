import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = (initialQuery) => {
  const pathName = usePathname();
  const [searchterm, setSearchterm] = useState(initialQuery || "");
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
        value={searchterm}
        placeholder="Search videos by keyword"
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setSearchterm(e)}
      />

      <TouchableOpacity
        onPress={() => {
          console.log(`==> search term: ${JSON.stringify(searchterm)}`);
          if (!searchterm) {
            Alert.alert("Please input search value");
          } else if (pathName.startsWith("/search")) {
            router.setParams({ query: searchterm });
          } else {
            router.push(`/search/${searchterm}`);
          }
        }}
      >
        <Image source={icons.search} className="h-5 w-5"></Image>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
