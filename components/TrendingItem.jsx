import { Image, ImageBackground, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import * as Animatable from "react-native-animatable";
import { ResizeMode, Video } from "expo-av";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.0,
  },
};

const zoomOut = {
  0: {
    scale: 1.0,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, item, style }) => {
  const [play, setPlay] = useState(false);

  // console.log(`--> ${activeItem} vs ${item.$id}`);
  return (
    <Animatable.View
      style={style}
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video_url }}
          className="w-48 h-64 rounded-[35px] my-2
            overflow-hidden shadow-lg shadow-black/40"
          resizeMode={ResizeMode.COVER}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail_url }}
            className="w-48 h-64 rounded-[35px] my-2
            overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="absolute w-12 h-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default TrendingItem;
