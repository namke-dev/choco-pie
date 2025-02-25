import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { ResizeMode, Video } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail_url,
    video_url,
    creator: { username, avatar_url },
  },
}) => {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        {/* avatar card */}
        <View
          className="flex 
         flex-row flex-1"
        >
          <View
            className="w-[46px] h-[46px] rounded-lg border 
          border-secondary flex justify-center items-center p-0.5"
          >
            <Image
              source={{ uri: avatar_url }}
              className="h-full w-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex-1 justify-center ml-3 gap-y-1`">
            <Text className="text-base text-white">{title}</Text>
            <Text className="text-sm text-gray-400">{username}</Text>
          </View>

          <View className="pt-2">
            <Image
              source={icons.menu}
              className="w-5 h-5"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video_url }}
          className="w-full h-48 rounded-xl mt-3"
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
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-48 rounded-xl mt-3
        relative justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail_url }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="h-12 w-12 round-xl absolute"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
