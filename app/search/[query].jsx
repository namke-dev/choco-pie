import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import SearchInput from "../../components/SearchInput";
import { searchPost } from "../../lib/appwrite";
import useAppwrite from "../../lib/appwriteHook";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";
import { images } from "../../constants";

const Search = () => {
  const { user } = useGlobalContext();

  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = useAppwrite(() => searchPost(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-3 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
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

            <SearchInput
              className="mb-8"
              placeholder="Search by video topic"
              initialQuery={query}
            />
            <Text className="font-pmedium text-sm text-gray-100">
              Search result for
            </Text>
            <Text className="text-2xl font-psemibold text-white">{query}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({});
