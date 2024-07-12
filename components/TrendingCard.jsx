import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import EmptySearchResult from "./EmptySearchResult";
import { images } from "../constants";

const TrendingCard = ({ posts }) => {
  return (
    <View className="flex justify-center items-center ">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className="text-3xl text-white">{item.id}</Text>
        )}
        horizontal
        ListEmptyComponent={() => (
          <EmptySearchResult title={"No Videos found"} subtitle={" "} />
        )}
      />
    </View>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({});
