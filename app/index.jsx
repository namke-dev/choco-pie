import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const { isLoading, isLogged } = useGlobalContext();

  if (!isLoading && isLogged) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Endless Live Content With
              <Text className="text-secondary-200"> Choco Pie</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[266px] h-[15px] absolute -bottom-3 -right-14"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            The right to look at what AI can do
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyle="w-full mt-7"
            textStyle=""
          />
        </View>
      </ScrollView>
      <ExpoStatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
