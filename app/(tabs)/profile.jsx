import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import SearchInput from "../../components/SearchInput";
import { getUserPost, searchPost, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/appwriteHook";
import VideoCard from "../../components/VideoCard";
import { router, useLocalSearchParams } from "expo-router";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons, images } from "../../constants";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  console.log("==> get user profile...\n" + JSON.stringify(user));

  const { data: posts } = useAppwrite(() => getUserPost(user.$id));

  const logout = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (error) {
      console.log(error.message);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={() => logout()}
            >
              <Image source={icons.logout} className="h-5 w-6" />
            </TouchableOpacity>
            <View className="h-16 w-16 border border-secondary rounded-full justify-center items-center">
              <Image
                source={{ uri: user.avatar_url }}
                className="h-full w-full rounded-full"
                resizeMode="cover"
              />
            </View>
            <Text className="mt-5 text-sm text-white">{user?.username}</Text>
            <View className="mt-4 flex-row">
              <InfoBox
                title={posts.length}
                subtitle="Posts"
                containerStyle="mr-10"
              />
              <InfoBox title="12k" subtitle="Followers" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Posted"
            subtitle="Share your first video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
