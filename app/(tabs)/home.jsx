import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import TrendingCard from "../../components/TrendingCard";
import { getAllPosts, getLastestPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/appwriteHook";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";

const Home = () => {
  const { user } = useGlobalContext();

  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: lastestPosts } = useAppwrite(getLastestPost);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="flex my-3 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user ? user.username : ""}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput placeholder="Search by video topic" />

            <View className="w-full flex-1 pt-0 pb-5">
              <Text className="text-gray-400 text-lg font-pregular mb-3">
                Lasted Videos
              </Text>
              <TrendingCard posts={lastestPosts ?? []} />
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
