import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackParamList } from "../../navigators/RootStackNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ImageBackground } from "expo-image";
import useUser from "../../react-query-hooks/useUser/useUser";
import { HeaderBackButton } from "@react-navigation/elements";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useOtherUser from "../../react-query-hooks/useOtherUsers/useOtherUser";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "OtherUser" | "N_OtherUser"
>;

export default function OtherUser({ route, navigation }: Props) {
  const { data: user } = useUser();
  const { username, photo } = route.params;

  const insets = useSafeAreaInsets();
  const [errorMessage, setErrorMessage] = useState<string | number>("");

  const {
    data: otherUser,
    status,
    error,
  } = useOtherUser(username, setErrorMessage);

  // console.log(errorMessage);
  console.log(error, "error");

  // const navigateToPrevious = () => {
  //   if (!previousScreen) {
  //     navigation.goBack();
  //   } else {
  //     navigation.navigate(previousScreen);
  //     navigation.pop();

  //     onSetPreviousScreen("");
  //   }
  // };

  useLayoutEffect(() => {
    const statusBarHeight = insets.top;

    const MyHeader = () => (
      <ImageBackground source={{ uri: photo }} style={{ height: 200 }}>
        <HeaderBackButton
          canGoBack={true}
          label="Back"
          onPress={() => navigation.goBack()}
          style={{ marginTop: statusBarHeight }}
        />
      </ImageBackground>
    );

    navigation.setOptions({
      header: MyHeader,
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <Text>{username}</Text>
    </SafeAreaView>
  );
}
