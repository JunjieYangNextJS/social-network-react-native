import React, { useCallback, useLayoutEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageBackground } from "expo-image";
import useUser from "../../react-query-hooks/useUser/useUser";
import { HeaderBackButton } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useOtherUser from "../../react-query-hooks/useOtherUsers/useOtherUser";
import { useFocusEffect } from "@react-navigation/native";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "OtherUser" | "N_OtherUser"
>;

export default function OtherUser({ route, navigation }: Props) {
  const { data: user } = useUser();
  const { username, profileImage } = route.params;

  const insets = useSafeAreaInsets();

  const {
    data: otherUser,
    status,
    error,
    refetch,
    isError,
  } = useOtherUser(username);

  useLayoutEffect(() => {
    const statusBarHeight = insets.top;

    const MyHeader = () => {
      if (isError) {
        return (
          <ImageBackground
            source={{
              uri: "https://s3.us-west-1.amazonaws.com/priders.net-images-bucket/bfc086cd-a2c4-41af-90b5-ec4b548af0c8.jpeg",
            }}
            style={{ height: 200 }}
          >
            <HeaderBackButton
              canGoBack={true}
              label="Back"
              onPress={() => navigation.goBack()}
              style={{ marginTop: statusBarHeight }}
            />
          </ImageBackground>
        );
      }

      return (
        <ImageBackground
          source={{
            uri: profileImage || otherUser?.profileImage,
          }}
          style={{ height: 200 }}
        >
          <HeaderBackButton
            canGoBack={true}
            label="Back"
            onPress={() => navigation.goBack()}
            style={{ marginTop: statusBarHeight }}
          />
        </ImageBackground>
      );
    };

    navigation.setOptions({
      header: MyHeader,
    });
  }, [navigation, otherUser, isError]);

  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //   }, [refetch])
  // );

  if (error) {
    return <Text>{error?.toString()}</Text>;
  }

  if (!otherUser) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView>
      <Text>{username}</Text>
    </SafeAreaView>
  );
}
