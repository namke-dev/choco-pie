import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import TrendingItem from "./TrendingItem";

const TrendingCard = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <View className="flex justify-center items-center">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item, index }) => (
          <TrendingItem
            activeItem={activeItem}
            item={item}
            style={{
              marginLeft: index === 0 ? 35 : 0,
              marginRight: index === posts.length - 1 ? 35 : 15,
            }}
          />
        )}
        horizontal
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
        contentOffset={{ x: 170 }}
      />
    </View>
  );
};

export default TrendingCard;

const styles = StyleSheet.create({});
